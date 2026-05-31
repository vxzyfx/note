---
title: kubeadm安装k8s
description: 使用 kubeadm 安装 Kubernetes 控制平面前的前置检查、运行时准备和高风险命令说明。
---

## 安装要求

本文示例按 Kubernetes 官方当前稳定文档核验，包仓库示例使用 `pkgs.k8s.io`。如果要安装其他 Kubernetes 小版本，需要把仓库 URL 中的 minor version 改为目标版本，并阅读对应版本的官方文档。

- 兼容的 Linux 主机。
- 控制平面节点至少 2 GiB 内存、2 核 CPU。
- 集群中所有机器之间网络可达。
- 每个节点有唯一的主机名、MAC 地址和 `product_uuid`。
- Kubernetes 组件和网络插件所需端口已开放。

### 检查主机标识

```bash
hostname
ip link
sudo cat /sys/class/dmi/id/product_uuid
```

### 需要开放的端口

控制平面节点：

| 协议 | 端口范围 | 介绍 | 使用者 |
| --- | --- | --- | --- |
| TCP | 6443 | kube API Server | 所有与集群的通信 |
| TCP | 2379 | etcd 服务端与客户端通信 | kube API Server |
| TCP | 2380 | etcd 服务端间通信 | etcd |
| TCP | 10250 | kubelet API | 本机或其他控制平面节点 |
| TCP | 10257 | kube-controller-manager | 本机 |
| TCP | 10259 | kube-scheduler | 本机 |

工作节点：

| 协议 | 端口范围 | 介绍 | 使用者 |
| --- | --- | --- | --- |
| TCP | 10250 | kubelet API | 本机或控制平面节点 |
| TCP | 10256 | kube-proxy | 本机或负载均衡器 |
| TCP | 30000-32767 | NodePort | 需要访问 NodePort 的客户端 |

### Swap 配置

默认情况下，kubelet 检测到 swap 会启动失败。可以关闭 swap，或在 kubelet 配置中设置 `failSwapOn: false` 并按官方 `swapBehavior` 说明配置工作负载是否可用 swap。

> 警告：`swapoff -a` 会立即关闭当前系统的 swap，可能增加内存压力并触发进程 OOM。执行前确认节点内存充足；永久关闭还需要检查 `/etc/fstab`、`systemd.swap` 或发行版使用的 swap 管理方式。

```bash
sudo swapoff -a
```

## 安装容器运行时

Kubernetes 通过 CRI 使用容器运行时。未指定运行时时，kubeadm 会尝试自动检测已知端点；如果检测到多个或没有检测到运行时，需要显式指定。

### 开启 IPv4 包转发

> 警告：下面命令会写入 `/etc/sysctl.d/k8s.conf` 并重新加载 sysctl 配置，影响本机网络转发行为。执行前确认该节点用于 Kubernetes，并保留已有自定义 sysctl 配置。

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward = 1
EOF
sudo sysctl --system
```

### containerd 示例

> 待核验：以下 containerd、runc、CNI 插件手动安装版本是示例值。生产环境应按目标 Kubernetes 版本、CPU 架构和发行版包管理策略选择版本，并校验下载文件来源。

下载并安装 containerd：

```bash
wget https://github.com/containerd/containerd/releases/download/v2.0.1/containerd-2.0.1-linux-amd64.tar.gz
sudo tar Cxzvf /usr/local containerd-2.0.1-linux-amd64.tar.gz
```

> 警告：下面命令会创建 systemd 服务文件并启用系统服务。不要覆盖发行版包管理器已经安装的 `containerd.service`，否则可能导致升级和排障混乱。

```bash
cat <<EOF | sudo tee /lib/systemd/system/containerd.service
[Unit]
Description=containerd container runtime
Documentation=https://containerd.io
After=network.target local-fs.target dbus.service

[Service]
ExecStartPre=-/sbin/modprobe overlay
ExecStart=/usr/local/bin/containerd
Type=notify
Delegate=yes
KillMode=process
Restart=always
RestartSec=5
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
OOMScoreAdjust=-999

[Install]
WantedBy=multi-user.target
EOF
```

生成配置：

```bash
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
```

安装 runc 和 CNI 插件：

```bash
wget https://github.com/opencontainers/runc/releases/download/v1.2.3/runc.amd64
sudo install -m 755 runc.amd64 /usr/local/sbin/runc
wget https://github.com/containernetworking/plugins/releases/download/v1.6.1/cni-plugins-linux-amd64-v1.6.1.tgz
sudo mkdir -p /opt/cni/bin
sudo tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-v1.6.1.tgz
```

启动 containerd：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now containerd
```

## 安装 kubeadm

> 警告：以下命令会新增 Kubernetes APT 仓库、安装 `kubelet`、`kubeadm`、`kubectl`，并用 `apt-mark hold` 阻止它们随系统升级自动升级。升级 Kubernetes 需要按官方升级流程单独处理。

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.36/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.36/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
sudo systemctl enable --now kubelet
```

## 创建集群

### 命令行创建

> 警告：`kubeadm init` 会在本机初始化控制平面、生成证书和 kubeconfig，并改变节点状态。先运行预检、确认容器运行时、网络 CIDR、API Server 地址和证书 SAN 后再执行；不要在已有集群节点上重复初始化。

```bash
sudo kubeadm init
```

常用命令行参数：

- `--apiserver-advertise-address`：API Server 公布的监听 IP；未设置时使用默认网络接口。
- `--apiserver-bind-port`：API Server 绑定端口，默认 `6443`。
- `--apiserver-cert-extra-sans`：API Server 证书额外 SAN，可为 IP 或 DNS 名称。
- `--cert-dir`：保存证书的路径，默认 `/etc/kubernetes/pki`。
- `--certificate-key`：用于加密 `kubeadm-certs` Secret 中控制平面证书的 32 字节 AES 密钥，十六进制编码。
- `--config`：kubeadm 配置文件路径。
- `--control-plane-endpoint`：为控制平面指定稳定 IP 或 DNS 名称。
- `--cri-socket`：CRI 套接字路径；仅在多个运行时或非标准套接字时显式指定。
- `--dry-run`：只输出将执行的操作，不应用更改。
- `--ignore-preflight-errors`：忽略指定预检错误；不要用 `all` 掩盖未知环境问题。
- `--image-repository`：控制平面镜像仓库，默认 `registry.k8s.io`。
- `--kubernetes-version`：控制平面 Kubernetes 版本。
- `--node-name`：指定节点名称。
- `--pod-network-cidr`：Pod 网络 CIDR；是否需要设置取决于网络插件。
- `--service-cidr`：Service VIP 网段，默认 `10.96.0.0/12`。
- `--skip-certificate-key-print`：不打印控制平面证书密钥。
- `--skip-token-print`：不打印默认引导令牌。
- `--token`：节点和控制平面建立双向信任的令牌，格式为 `[a-z0-9]{6}.[a-z0-9]{16}`。
- `--token-ttl`：令牌自动删除前的持续时间；`0` 表示永不过期，默认 `24h0m0s`。
- `--upload-certs`：上传控制平面证书到 `kubeadm-certs` Secret。

### 配置文件创建

> 警告：配置文件会影响证书、网络、镜像仓库和组件参数。生成默认配置后先审阅和提交到安全位置，再执行初始化。

```bash
kubeadm config print init-defaults > kubeadm.yaml
sudo kubeadm init --config=kubeadm.yaml
```

## 参考资料

1. [Installing kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)（访问日期：2026-05-31）
2. [Creating a cluster with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)（访问日期：2026-05-31）
3. [kubeadm init reference](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/)（访问日期：2026-05-31）
4. [Kubernetes Nodes documentation](https://kubernetes.io/docs/concepts/architecture/nodes/)（访问日期：2026-05-31）
5. [containerd Getting started](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)（访问日期：2026-05-31）
6. [Open Container Initiative runc releases](https://github.com/opencontainers/runc/releases)（访问日期：2026-05-31）
