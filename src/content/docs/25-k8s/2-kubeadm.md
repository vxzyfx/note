---
title: kubeadm安装k8s
---

## 安装要求

- 基于Debian或Red Hat的Linux发行版
- 至少2G内存
- 至少2核CPU
- 集群中所有计算机之间可以通信
- 每个节点有唯一的主机名，MAC地址，product_uuid
- 使用的端口是打开的

1. 检查主机名

```bash
hostname
```

2. 检查MAC地址

```bash
ip link
```

3. 检查product_uuid

```bash
cat /sys/class/dmi/id/product_uuid
```

4. 需要打开的端口

Master
| 协议 | 端口范围 | 介绍 | 使用者 |
|------|----------|------|--------|
| TCP | 6443 | kube-apiserver | 所有与集群的通信 |
| TCP | 2379 | etcd服务端与客户端通信 | kube-apiserver |
| TCP | 2380 | etcd服务端间通信 | ectd |
| TCP | 10250 | kubelet API | 本机，或其他Master |
| TCP | 10257 | kube-controller-manager | 本机 |
| TCP | 10259 | kube-scheduler | 本机 |

工作节点Node
| 协议 | 端口范围 | 介绍 | 使用者 |
|------|----------|------|--------|
| TCP | 10250 | kubelet API | 本机或控制节点 |
| TCP | 10256 | kube-proxy | 本机或负载均衡器 |
| TCP | 30000-32767 | NodePort | 所有 |

5. 关闭swap

默认情况下kubelet会检查swap,当启用了swap时，kubelet将无法启动，可以通过修改kubeet的配置文件`failSwapOn: false`运行kubelet启动，但是swap不会被使用，通过修改`swapBehavior`可以定义swap的不同行为。

[swapBehavior的介绍](https://kubernetes.io/docs/concepts/architecture/nodes/#swap-memory)

关闭swap

```bash
swapoff -a
```

要永久关闭swap还需修改`/etc/fstab`或`systemd-swap`

## 安装容器运行时

开启IPv4包转发

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward = 1
EOF
```

```bash
sudo sysctl --system
```

容器运行是安装一种即可

### containerd

[containerd](https://github.com/containerd/containerd)

1. 下载

```bash
wget https://github.com/containerd/containerd/releases/download/v2.0.1/containerd-2.0.1-linux-amd64.tar.gz
```

2. 安装

```bash
tar Cxzvf /usr/local containerd-2.0.1-linux-amd64.tar.gz
```

3. 设置systemd服务

```bash
cat <<EOF > /lib/systemd/system/containerd.service
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

4. 开启SystemdCgroup

```bash
mkdir /etc/containerd
containerd config default > /etc/containerd/config.toml
```

5. 安装runc

[runc](https://github.com/opencontainers/runc)

```bash
wget https://github.com/opencontainers/runc/releases/download/v1.2.3/runc.amd64
install -m 755 runc.amd64 /usr/local/sbin/runc
```

6. 安装cri

[cri](https://github.com/containernetworking/plugins)

```bash
wget https://github.com/containernetworking/plugins/releases/download/v1.6.1/cni-plugins-linux-amd64-v1.6.1.tgz
mkdir -p /opt/cni/bin
tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-v1.6.1.tgz
```

7. 开启containerd

```bash
systemctl daemon-reload
systemctl enable --now containerd
```

## 安装kubeadm

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

sudo systemctl enable --now kubelet
```

### 命令行创建

```bash
kubeadm init
```

命令行参数

- --apiserver-advertise-address 字符串 API 服务器将公布其正在监听的 IP 地址。如果未设置，则将使用默认网络接口。
- --apiserver-bind-port int32 API 服务器绑定到的端口。（默认值为 6443）
- --apiserver-cert-extra-sans 字符串用于 API 服务器服务证书的可选额外主题备用名称 (SAN)。可以是 IP 地址和 DNS 名称。
- --cert-dir 字符串保存和存储证书的路径。（默认值为“/etc/kubernetes/pki”）
- --certificate-key 字符串用于加密 kubeadm-certs Secret 中的控制平面证书的密钥。证书密钥是一个十六进制编码的字符串，是大小为 32 字节的 AES 密钥。
- --config 字符串 kubeadm 配置文件的路径。
- --control-plane-endpoint 字符串为控制平面指定一个稳定的 IP 地址或 DNS 名称。
- --cri-socket 字符串 要连接的 CRI 套接字的路径。如果为空，kubeadm 将尝试自动检测此值；仅当您安装了多个 CRI 或拥有非标准 CRI 套接字时才使用此选项。
- --dry-run 不应用任何更改；仅输出将执行的操作。
- --feature-gates 字符串 一组键=值对，用于描述各种功能的功能门控。
- --ignore-preflight-errors 字符串 将显示为警告的检查列表。示例：“IsPrivilegedUser,Swap”。值“all”将忽略所有检查的错误。
- --image-repository 字符串 选择要从中提取控制平面映像的容器注册表（默认“registry.k8s.io”）
- --kubernetes-version 字符串 为控制平面选择特定的 Kubernetes 版本。 （默认“stable-1”）
- --node-name 字符串 指定节点名称。
- --patches 字符串 包含名为“target[suffix][+patchtype].extension”的文件的目录的路径。例如，“kube-apiserver0+merge.yaml”或只是“etcd.json”。 “target”可以是“kube-apiserver”、“kube-controller-manager”、“kube-scheduler”、“etcd”、“kubeletconfiguration”、“corednsdeployment”之一。 “patchtype”可以是“strategic”、“merge”或“json”之一，它们与 kubectl 支持的补丁格式匹配。默认的“patchtype”是“strategic”。 “extension”必须是“json”或“yaml”。 “suffix”是一个可选字符串，可用于确定首先应用哪些补丁（按字母数字顺序）。
- --pod-network-cidr 字符串 指定 pod 网络的 IP 地址范围。如果设置，控制平面将自动为每个节点分配 CIDR。
- --service-cidr 字符串 使用服务 VIP 的备用 IP 地址范围。（默认值为“10.96.0.0/12”）
- --service-dns-domain 字符串 使用服务的备用域，例如“myorg.internal”。（默认值为“cluster.local”）
- --skip-certificate-key-print 不打印用于加密控制平面证书的密钥。
- --skip-phases 字符串 要跳过的阶段列表
- --skip-token-print 跳过打印“kubeadm init”生成的默认引导令牌。
- --token 字符串 用于在节点和控制平面节点之间建立双向信任的令牌。格式为 [a-z0-9]{6}\.[a-z0-9]{16} - 例如abcdef.0123456789abcdef
- --token-ttl duration 令牌自动删除前的持续时间（例如 1s、2m、3h）。如果设置为“0”，则令牌永不过期（默认 24h0m0s）
- --upload-certs 将控制平面证书上传到 kubeadm-certs Secret。

### 配置文件创建

```bash
kubeadm config print init-defaults > kubeadm.yaml
```

```bash
kubeadm init --config=kubeadm.yaml
```
