---
title: Kubernetes二进制安装方式
---

## 准备工作

- 关闭swap
- 检查MAC地址和product_uuid

### 修改hosts文件

```txt
192.168.1.31 k8s-master01
192.168.1.32 k8s-master02
192.168.1.33 k8s-master03

192.168.1.41 k8s-node01
192.168.1.42 k8s-node02

192.168.1.51 k8s-apiserver
```

`192.168.1.51`应该设置为虚拟ip

### 加载内核模块

```bash
cat >> /etc/modules-load.d/ipvs.conf <<EOF 
ip_vs
ip_vs_rr
ip_vs_wrr
ip_vs_sh
nf_conntrack
br_netfilter
ip_tables
ip_set
xt_set
ipt_set
ipt_rpfilter
ipt_REJECT
ipip
EOF

systemctl restart systemd-modules-load.service
```

- ip_vs: 用于实现负载均衡和高可用性。它通过在前端代理服务器上分发传入请求到后端实际服务器上，提供了高性能和可扩展的网络服务。
- ip_vs_rr: IPVS 的一种调度算法之一，使用轮询方式分发请求到后端服务器，每个请求按顺序依次分发。
- ip_vs_wrr: IPVS 的一种调度算法之一，使用加权轮询方式分发请求到后端服务器，每个请求按照指定的权重比例分发。
- ip_vs_sh: IPVS 的一种调度算法之一，使用哈希方式根据源 IP 地址和目标 IP 地址来分发请求。
- nf_conntrack: 用于跟踪和管理网络连接，包括 TCP、UDP 和 ICMP 等协议。它是实现防火墙状态跟踪的基础。
- ip_tables: 提供了对 Linux 系统 IP 数据包过滤和网络地址转换（NAT）功能的支持。
- ip_set: 扩展了 iptables 的功能，支持更高效的 IP 地址集合操作。
- xt_set: 扩展了 iptables 的功能，支持更高效的数据包匹配和操作。
- ipt_set: 一个用户空间工具，用于配置和管理 xt_set 内核模块。
- ipt_rpfilter: 用于实现反向路径过滤，用于防止 IP 欺骗和 DDoS 攻击。
- ipt_REJECT: 一个 iptables 目标，用于拒绝 IP 数据包，并向发送方发送响应，指示数据包被拒绝。
- ipip: 用于实现 IP 封装在 IP（IP-over-IP）的隧道功能。它可以在不同网络之间创建虚拟隧道来传输 IP 数据包。

### 修改内核参数

```bash
cat <<EOF > /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward=1
net.bridge.bridge-nf-call-iptables=1
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_watches=89100
fs.file-max=52706963
fs.nr_open=52706963
net.netfilter.nf_conntrack_max=2310720

net.ipv4.tcp_keepalive_time=600
net.ipv4.tcp_keepalive_probes=3
net.ipv4.tcp_keepalive_intvl=15
net.ipv4.tcp_max_tw_buckets=36000
net.ipv4.tcp_tw_reuse=1
net.ipv4.tcp_max_orphans=327680
net.ipv4.tcp_orphan_retries=3
net.ipv4.tcp_syncookies=1
net.ipv4.tcp_max_syn_backlog=16384
net.ipv4.ip_conntrack_max=65536
net.ipv4.tcp_max_syn_backlog=16384
net.ipv4.tcp_timestamps=0
net.core.somaxconn=16384

net.ipv6.conf.all.disable_ipv6=0
net.ipv6.conf.default.disable_ipv6=0
net.ipv6.conf.lo.disable_ipv6=0
net.ipv6.conf.all.forwarding=1
EOF


sysctl --system
```

- net.ipv4.ip_forward=1: 允许服务器作为网络路由器转发数据包
- vm.overcommit_memory=1: 该设置允许原始的内存过量分配策略，当系统的内存已经被完全使用时，系统仍然会分配额外的内存。
- vm.panic_on_oom=0: 当系统内存不足（OOM）时，禁用系统崩溃和重启。
- fs.inotify.max_user_watches=89100: 设置系统允许一个用户的inotify实例可以监控的文件数目的上限。
- fs.file-max=52706963: 设置系统同时打开的文件数的上限。
- fs.nr_open=52706963: 设置系统同时打开的文件描述符数的上限。
- net.netfilter.nf_conntrack_max=2310720: 置系统可以创建的网络连接跟踪表项的最大数量。
- net.ipv4.tcp_keepalive_time=600: 设置TCP套接字的空闲超时时间（秒），超过该时间没有活动数据时，内核会发送心跳包。
- net.ipv4.tcp_keepalive_probes=3: 设置未收到响应的TCP心跳探测次数。
- net.ipv4.tcp_keepalive_intvl=15: 设置TCP心跳探测的时间间隔（秒）。
- net.ipv4.tcp_max_tw_buckets=36000: 设置系统可以使用的TIME_WAIT套接字的最大数量。
- net.ipv4.tcp_tw_reuse=1: 启用TIME_WAIT套接字的重新利用，允许新的套接字使用旧的TIME_WAIT套接字。
- net.ipv4.tcp_max_orphans=327680: 设置系统可以同时存在的TCP套接字垃圾回收包裹数的最大数量。
- net.ipv4.tcp_orphan_retries=3: 设置系统对于孤立的TCP套接字的重试次数。
- net.ipv4.tcp_syncookies=1: 启用TCP SYN cookies保护，用于防止SYN洪泛攻击。
- net.ipv4.tcp_max_syn_backlog=16384: 设置新的TCP连接的半连接数（半连接队列）的最大长度。
- net.ipv4.ip_conntrack_max=65536: 设置系统可以创建的网络连接跟踪表项的最大数量。
- net.ipv4.tcp_timestamps=0: 关闭TCP时间戳功能，用于提供更好的安全性。
- net.core.somaxconn=16384: 设置系统核心层的连接队列的最大值。
- net.ipv6.conf.all.disable_ipv6=0:  启用IPv6协议。
- net.ipv6.conf.default.disable_ipv6=0: 启用IPv6协议。
- net.ipv6.conf.lo.disable_ipv6=0: 启用IPv6协议。
- net.ipv6.conf.all.forwarding=1: 允许IPv6数据包转发。

### 安装运行时

[containerd](https://github.com/containerd/containerd)

1. 下载

```bash
wget https://github.com/containerd/containerd/releases/download/v2.0.1/containerd-2.0.1-linux-amd64.tar.gz

curl -sSL -O https://github.com/containerd/containerd/releases/download/v2.0.1/containerd-2.0.1-linux-amd64.tar.gz
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

4. 安装runc

[runc](https://github.com/opencontainers/runc)

```bash
wget https://github.com/opencontainers/runc/releases/download/v1.2.3/runc.amd64

curl -sSL -O https://github.com/opencontainers/runc/releases/download/v1.2.3/runc.amd64

install -m 755 runc.amd64 /usr/local/sbin/runc
```

5. 安装cri

[cri](https://github.com/containernetworking/plugins)

```bash
wget https://github.com/containernetworking/plugins/releases/download/v1.6.1/cni-plugins-linux-amd64-v1.6.1.tgz

curl -sSL -O https://github.com/containernetworking/plugins/releases/download/v1.6.1/cni-plugins-linux-amd64-v1.6.1.tgz

mkdir -p /opt/cni/bin
tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-v1.6.1.tgz
```

6. 开启containerd

```bash
systemctl daemon-reload
systemctl enable --now containerd
```

安装ipvsadm

```bash
apt install ipvsadm ipset sysstat conntrack -y
```

## 主节点安装

以`k8s-master01`为例, apiserver的统一入口设置为`k8s-apiserver`

### 安装ectd

[etcd](https://github.com/etcd-io/etcd)

```bash
wget https://github.com/etcd-io/etcd/releases/download/v3.5.17/etcd-v3.5.17-linux-amd64.tar.gz

curl -sSL -O https://github.com/etcd-io/etcd/releases/download/v3.5.17/etcd-v3.5.17-linux-amd64.tar.gz

tar xf etcd-v3.5.17-linux-amd64.tar.gz
mv etcd-v3.5.17-linux-amd64/etcd* /usr/local/bin/
```


### 安装Kubernetes组件

```bash
version="v1.32.0"

# wget
wget https://dl.k8s.io/${version}/bin/linux/amd64/kube-apiserver -O /usr/local/bin/kube-apiserver
wget https://dl.k8s.io/${version}/bin/linux/amd64/kube-controller-manager -O /usr/local/bin/kube-controller-manager
wget https://dl.k8s.io/${version}/bin/linux/amd64/kube-scheduler -O /usr/local/bin/kube-scheduler
wget https://dl.k8s.io/${version}/bin/linux/amd64/kube-proxy -O /usr/local/bin/kube-proxy
wget https://dl.k8s.io/${version}/bin/linux/amd64/kubelet -O /usr/local/bin/kubelet
wget https://dl.k8s.io/${version}/bin/linux/amd64/kubectl -O /usr/local/bin/kubectl

curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kube-apiserver -o /usr/local/bin/kube-apiserver
curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kube-controller-manager -o /usr/local/bin/kube-controller-manager
curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kube-scheduler -o /usr/local/bin/kube-scheduler
curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kube-proxy -o /usr/local/bin/kube-proxy
curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kubelet -o /usr/local/bin/kubelet
curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl

chmod +x /usr/local/bin/kube-apiserver
chmod +x /usr/local/bin/kube-controller-manager
chmod +x /usr/local/bin/kube-scheduler
chmod +x /usr/local/bin/kube-proxy
chmod +x /usr/local/bin/kubelet
chmod +x /usr/local/bin/kubectl
```

### 生成etcd证书

etcd证书存放目录`/etc/kubernetes/pki/etcd`

```bash
mkdir -p /etc/kubernetes/pki/etcd
cd /etc/kubernetes/pki/etcd
```

生成etcd的ca证书

```bash
openssl ecparam -genkey -name prime256v1 -noout -out ca.key

openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj  "/CN=etcd-ca" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,digitalSignature,keyEncipherment,Certificate Sign"
```

生成`server`证书用于etcd的server端

```bash
openssl ecparam -genkey -name prime256v1 -noout -out server.key
openssl req -x509 -new -nodes -key server.key -sha256 -days 3650 -CA ca.crt -CAkey ca.key -out server.crt -subj "/CN=k8s-master01" -addext "extendedKeyUsage=clientAuth,serverAuth" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,DNS:k8s-master01,IP:192.168.1.31" -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt server.crt
```

生成`peer`证书用于etcd服务端之间的通信

```bash
openssl ecparam -genkey -name prime256v1 -noout -out peer.key
openssl req -x509 -new -nodes -key peer.key -sha256 -days 3650 -CA ca.crt -CAkey ca.key -out peer.crt -subj "/CN=k8s-master01" -addext "extendedKeyUsage=clientAuth,serverAuth" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,DNS:k8s-master01,IP:192.168.1.31" -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt peer.crt
```

生成`kube-apiserver-etcd-client`证书用于kube-apiserver访问etcd

```bash
openssl ecparam -genkey -name prime256v1 -noout -out kube-apiserver-etcd-client.key
openssl req -x509 -new -nodes -key kube-apiserver-etcd-client.key -sha256  -days 3650 -CA ca.crt -CAkey ca.key -out kube-apiserver-etcd-client.crt -subj "/CN=kube-apiserver-etcd-client" -addext "extendedKeyUsage=clientAuth" -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt kube-apiserver-etcd-client.crt
```

### 生成Kubernetes的证书

Kubernetes证书存放目录`/etc/kubernetes/pki`

```bash
mkdir -p /etc/kubernetes/pki
cd /etc/kubernetes/pki
```

生成Kubernetes的CA证书

```bash
openssl ecparam -genkey -name prime256v1 -noout -out ca.key
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/CN=kubernetes" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,digitalSignature,keyEncipherment,Certificate Sign"
``` 

生成apiserver证书用于apiserver服务端

> 将`service_cluster_ip_range`的ip段的第一个ip加入证书中，如`10.10.0.1`.

```bash
openssl ecparam -genkey -name prime256v1 -noout -out apiserver.key
openssl req -x509 -new -nodes -key apiserver.key -sha256 -days 3650 -out apiserver.crt -CA ca.crt -CAkey ca.key -subj  "/CN=kube-apiserver" -addext "subjectAltName=DNS:kubernetes,DNS:kubernetes.default,DNS:kubernetes.default.svc,DNS:kubernetes.default.svc.cluster.local,DNS:localhost,DNS:k8s-apiserver,IP:10.10.0.1,IP:127.0.0.1,DNS:k8s-master01,IP:192.168.1.31" -addext "extendedKeyUsage=serverAuth"  -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt apiserver.crt
```

生成apiserver-kubelet-client证书用于kubelet与apiserver通信

```bash
openssl ecparam -genkey -name prime256v1 -noout -out apiserver-kubelet-client.key
openssl req -x509 -new -nodes -key apiserver-kubelet-client.key -sha256 -days 3650 -out apiserver-kubelet-client.crt -CA ca.crt -CAkey ca.key -subj  "/CN=apiserver-kubelet-client" -addext "extendedKeyUsage=clientAuth"  -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt apiserver-kubelet-client.crt
```

生成kube-controller-manager证书用于kube-controller-manager与apiserver通信

```bash
openssl ecparam -genkey -name prime256v1 -noout -out kube-controller-manager.key
openssl req -x509 -new -nodes -key kube-controller-manager.key -sha256 -days 3650 -out kube-controller-manager.crt -CA ca.crt -CAkey ca.key -subj  "/CN=system:kube-controller-manager" -addext "extendedKeyUsage=clientAuth"  -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt kube-controller-manager.crt
```

生成kube-scheduler证书用于kube-scheduler与apiserver通信

```bash
openssl ecparam -genkey -name prime256v1 -noout -out kube-scheduler.key
openssl req -x509 -new -nodes -key kube-scheduler.key -sha256 -days 3650 -out kube-scheduler.crt -CA ca.crt -CAkey ca.key -subj  "/CN=system:kube-scheduler" -addext "extendedKeyUsage=clientAuth"  -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt kube-scheduler.crt
```

生成kube-proxy证书用于kube-proxy与apiserver通信

```bash
openssl ecparam -genkey -name prime256v1 -noout -out kube-proxy.key
openssl req -x509 -new -nodes -key kube-proxy.key -sha256 -days 3650 -out kube-proxy.crt -CA ca.crt -CAkey ca.key -subj  "/CN=system:kube-proxy" -addext "extendedKeyUsage=clientAuth"  -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt kube-proxy.crt
```

生成admin证书用于admin与apiserver通信

```bash
openssl ecparam -genkey -name prime256v1 -noout -out admin.key
openssl req -x509 -new -nodes -key admin.key -sha256 -days 3650 -out admin.crt -CA ca.crt -CAkey ca.key -subj  "/CN=kubernetes-super-admin/O=system:masters" -addext "extendedKeyUsage=clientAuth"  -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile ca.crt admin.crt
```

生成front-proxy的CA

```bash
openssl ecparam -genkey -name prime256v1 -noout -out front-proxy-ca.key
openssl req -x509 -new -nodes -key front-proxy-ca.key -sha256 -days 3650 -out front-proxy-ca.crt -subj  "/CN=front-proxy-ca" -addext "subjectAltName=DNS:front-proxy-ca" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,digitalSignature,keyEncipherment,Certificate Sign"
```

签发front-proxy-client证书

```bash
openssl ecparam -genkey -name prime256v1 -noout -out front-proxy-client.key
openssl req -x509 -new -nodes -key front-proxy-client.key -sha256  -days 3650 -out front-proxy-client.crt -CA front-proxy-ca.crt -CAkey front-proxy-ca.key -subj  "/CN=front-proxy-client" -addext "extendedKeyUsage=clientAuth" -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"

# 验证证书
openssl verify -CAfile front-proxy-ca.crt front-proxy-client.crt
```

生成ServiceAccount Key

```bash
openssl ecparam -genkey -name prime256v1 -out sa.key
openssl ec -in sa.key -pubout -out sa.pub
```

文件树

```txt
/etc/kubernetes/
└── pki
    ├── admin.crt
    ├── admin.key
    ├── apiserver.crt
    ├── apiserver.key
    ├── apiserver-kubelet-client.crt
    ├── apiserver-kubelet-client.key
    ├── ca.crt
    ├── ca.key
    ├── etcd
    │   ├── ca.crt
    │   ├── ca.key
    │   ├── kube-apiserver-etcd-client.crt
    │   ├── kube-apiserver-etcd-client.key
    │   ├── peer.crt
    │   ├── peer.key
    │   ├── server.crt
    │   └── server.key
    ├── front-proxy-ca.crt
    ├── front-proxy-ca.key
    ├── front-proxy-client.crt
    ├── front-proxy-client.key
    ├── kube-controller-manager.crt
    ├── kube-controller-manager.key
    ├── kube-proxy.crt
    ├── kube-proxy.key
    ├── kube-scheduler.crt
    ├── kube-scheduler.key
    ├── sa.key
    └── sa.pub
```

### 生成kubeconfig文件

生成controller-manager.conf
```bash
kubectl config set-cluster kubernetes \
   --certificate-authority=/etc/kubernetes/pki/ca.crt \
   --embed-certs=true \
   --server=https://k8s-apiserver:6443 \
   --kubeconfig=/etc/kubernetes/controller-manager.conf

kubectl config set-credentials system:kube-controller-manager \
   --client-certificate=/etc/kubernetes/pki/kube-controller-manager.crt \
   --client-key=/etc/kubernetes/pki/kube-controller-manager.key \
   --embed-certs=true \
   --kubeconfig=/etc/kubernetes/controller-manager.conf

kubectl config set-context system:kube-controller-manager@kubernetes \
   --cluster=kubernetes \
   --user=system:kube-controller-manager \
   --kubeconfig=/etc/kubernetes/controller-manager.conf

kubectl config use-context system:kube-controller-manager@kubernetes \
   --kubeconfig=/etc/kubernetes/controller-manager.conf
```

生成scheduler.conf
```bash
kubectl config set-cluster kubernetes \
   --certificate-authority=/etc/kubernetes/pki/ca.crt \
   --embed-certs=true \
   --server=https://k8s-apiserver:6443 \
   --kubeconfig=/etc/kubernetes/scheduler.conf

kubectl config set-credentials system:kube-scheduler \
   --client-certificate=/etc/kubernetes/pki/kube-scheduler.crt \
   --client-key=/etc/kubernetes/pki/kube-scheduler.key \
   --embed-certs=true \
   --kubeconfig=/etc/kubernetes/scheduler.conf

kubectl config set-context system:kube-scheduler@kubernetes \
   --cluster=kubernetes \
   --user=system:kube-scheduler \
   --kubeconfig=/etc/kubernetes/scheduler.conf

kubectl config use-context system:kube-scheduler@kubernetes \
   --kubeconfig=/etc/kubernetes/scheduler.conf
```

生成admin.conf
```bash
kubectl config set-cluster kubernetes \
   --certificate-authority=/etc/kubernetes/pki/ca.crt \
   --embed-certs=true \
   --server=https://k8s-apiserver:6443 \
   --kubeconfig=/etc/kubernetes/admin.conf

kubectl config set-credentials kubernetes-admin \
   --client-certificate=/etc/kubernetes/pki/admin.crt \
   --client-key=/etc/kubernetes/pki/admin.key \
   --embed-certs=true \
   --kubeconfig=/etc/kubernetes/admin.conf

kubectl config set-context kubernetes-admin@kubernetes \
    --cluster=kubernetes \
    --user=kubernetes-admin \
   --kubeconfig=/etc/kubernetes/admin.conf

kubectl config use-context kubernetes-admin@kubernetes \
   --kubeconfig=/etc/kubernetes/admin.conf
```

生成kube-proxy.conf

```bash
kubectl config set-cluster kubernetes \
   --certificate-authority=/etc/kubernetes/pki/ca.crt \
   --embed-certs=true \
   --server=https://k8s-apiserver:6443 \
   --kubeconfig=/etc/kubernetes/kube-proxy.conf

kubectl config set-credentials kube-proxy \
   --client-certificate=/etc/kubernetes/pki/kube-proxy.crt \
   --client-key=/etc/kubernetes/pki/kube-proxy.key \
   --embed-certs=true \
   --kubeconfig=/etc/kubernetes/kube-proxy.conf

kubectl config set-context kube-proxy@kubernetes \
   --cluster=kubernetes \
   --user=kube-proxy \
   --kubeconfig=/etc/kubernetes/kube-proxy.conf

kubectl config use-context kube-proxy@kubernetes \
   --kubeconfig=/etc/kubernetes/kube-proxy.conf
```

生成bootstrap-kubelet.conf
```bash

kubectl config set-cluster bootstrap \
   --certificate-authority=/etc/kubernetes/pki/ca.crt \
   --server=https://k8s-apiserver:6443 \
   --kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf

kubectl config set-credentials kubelet-bootstrap \
   --token=0e5634.55bf9fc480d29395 \
   --kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf

kubectl config set-context bootstrap \
   --user=kubelet-bootstrap \
   --cluster=bootstrap \
   --kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf

kubectl config use-context bootstrap \
   --kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf
```

文件树

```txt
/etc/kubernetes/
├── admin.conf
├── bootstrap-kubelet.conf
├── controller-manager.conf
├── kube-proxy.conf
├── pki
│   ├── admin.crt
│   ├── admin.key
│   ├── apiserver.crt
│   ├── apiserver.key
│   ├── apiserver-kubelet-client.crt
│   ├── apiserver-kubelet-client.key
│   ├── ca.crt
│   ├── ca.key
│   ├── etcd
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── kube-apiserver-etcd-client.crt
│   │   ├── kube-apiserver-etcd-client.key
│   │   ├── peer.crt
│   │   ├── peer.key
│   │   ├── server.crt
│   │   └── server.key
│   ├── front-proxy-ca.crt
│   ├── front-proxy-ca.key
│   ├── front-proxy-client.crt
│   ├── front-proxy-client.key
│   ├── kube-controller-manager.crt
│   ├── kube-controller-manager.key
│   ├── kube-proxy.crt
│   ├── kube-proxy.key
│   ├── kube-scheduler.crt
│   ├── kube-scheduler.key
│   ├── sa.key
│   └── sa.pub
└── scheduler.conf
```

### 设置systemd服务

生成etcd服务
```bash
cat <<EOF > /usr/lib/systemd/system/etcd.service
[Unit]
Description=Etcd Service
Documentation=https://coreos.com/etcd/docs/latest/
After=network.target

[Service]
Type=notify
ExecStart=/usr/local/bin/etcd \\
    --advertise-client-urls=https://192.168.1.31:2379 \\
    --cert-file=/etc/kubernetes/pki/etcd/server.crt \\
    --client-cert-auth=true \\
    --data-dir=/var/lib/etcd \\
    --experimental-initial-corrupt-check=true \\
    --experimental-watch-progress-notify-interval=5s \\
    --initial-advertise-peer-urls=https://192.168.1.31:2380 \\
    --initial-cluster=k8s=https://192.168.1.31:2380 \\
    --key-file=/etc/kubernetes/pki/etcd/server.key \\
    --listen-client-urls=https://127.0.0.1:2379,https://192.168.1.31:2379 \\
    --listen-metrics-urls=http://127.0.0.1:2381,http://192.168.1.31:2381 \\
    --listen-peer-urls=https://192.168.1.31:2380 \\
    --name=k8s \\
    --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt \\
    --peer-client-cert-auth=true \\
    --peer-key-file=/etc/kubernetes/pki/etcd/peer.key \\
    --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt \\
    --snapshot-count=10000 \\
    --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
Restart=on-failure
RestartSec=10
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
Alias=etcd3.service
EOF
```

生成kube-apiserver服务
```bash
cat <<EOF > /usr/lib/systemd/system/kube-apiserver.service
[Unit]
Description=Kubernetes API Server
Documentation=https://github.com/kubernetes/kubernetes
After=network.target

[Service]
ExecStart=/usr/local/bin/kube-apiserver \\
    --advertise-address=192.168.1.31 \\
    --allow-privileged=true \\
    --authorization-mode=Node,RBAC \\
    --client-ca-file=/etc/kubernetes/pki/ca.crt \\
    --enable-admission-plugins=NodeRestriction \\
    --enable-bootstrap-token-auth=true \\
    --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt \\
    --etcd-certfile=/etc/kubernetes/pki/etcd/kube-apiserver-etcd-client.crt \\
    --etcd-keyfile=/etc/kubernetes/pki/etcd/kube-apiserver-etcd-client.key \\
    --etcd-servers=https://127.0.0.1:2379 \\
    --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt \\
    --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key \\
    --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname \\
    --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt \\
    --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key \\
    --requestheader-allowed-names=front-proxy-client \\
    --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt \\
    --requestheader-extra-headers-prefix=X-Remote-Extra- \\
    --requestheader-group-headers=X-Remote-Group \\
    --requestheader-username-headers=X-Remote-User \\
    --secure-port=6443 \\
    --service-account-issuer=https://kubernetes.default.svc.cluster.local \\
    --service-account-key-file=/etc/kubernetes/pki/sa.pub \\
    --service-account-signing-key-file=/etc/kubernetes/pki/sa.key \\
    --service-cluster-ip-range=10.10.0.0/16 \\
    --tls-cert-file=/etc/kubernetes/pki/apiserver.crt \\
    --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
Restart=on-failure
RestartSec=10s
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

生成kube-controller-manager服务

```bash
cat <<EOF > /usr/lib/systemd/system/kube-controller-manager.service
[Unit]
Description=Kubernetes Controller Manager
Documentation=https://github.com/kubernetes/kubernetes
After=network.target

[Service]
ExecStart=/usr/local/bin/kube-controller-manager \\
    --allocate-node-cidrs=true \\
    --authentication-kubeconfig=/etc/kubernetes/controller-manager.conf \\
    --authorization-kubeconfig=/etc/kubernetes/controller-manager.conf \\
    --bind-address=0.0.0.0 \\
    --client-ca-file=/etc/kubernetes/pki/ca.crt \\
    --cluster-cidr=10.11.0.0/16 \\
    --node-cidr-mask-size-ipv4=24 \\
    --node-cidr-mask-size-ipv6=120 \\
    --cluster-name=kubernetes \\
    --cluster-signing-cert-file=/etc/kubernetes/pki/ca.crt \\
    --cluster-signing-key-file=/etc/kubernetes/pki/ca.key \\
    --controllers=*,bootstrapsigner,tokencleaner \\
    --kubeconfig=/etc/kubernetes/controller-manager.conf \\
    --leader-elect=true \\
    --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt \\
    --root-ca-file=/etc/kubernetes/pki/ca.crt \\
    --service-account-private-key-file=/etc/kubernetes/pki/sa.key \\
    --service-cluster-ip-range=10.10.0.0/16 \\
    --use-service-account-credentials=true

Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

生成kube-scheduler服务

```bash
cat <<EOF > /usr/lib/systemd/system/kube-scheduler.service
[Unit]
Description=Kubernetes Scheduler
Documentation=https://github.com/kubernetes/kubernetes
After=network.target

[Service]
ExecStart=/usr/local/bin/kube-scheduler \\
     --authentication-kubeconfig=/etc/kubernetes/scheduler.conf \\
     --authorization-kubeconfig=/etc/kubernetes/scheduler.conf \\
     --bind-address=0.0.0.0 \\
     --kubeconfig=/etc/kubernetes/scheduler.conf \\
     --leader-elect=true

Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

生成kubelet服务

```bash
cat <<EOF > /usr/lib/systemd/system/kubelet.service
[Unit]
Description=Kubernetes Kubelet
Documentation=https://github.com/kubernetes/kubernetes
After=network-online.target firewalld.service containerd.service
Wants=network-online.target
Requires=containerd.service

[Service]
ExecStart=/usr/local/bin/kubelet \
    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf  \
    --kubeconfig=/etc/kubernetes/kubelet.conf \
    --config=/etc/kubernetes/kubelet-conf.yaml \
    --container-runtime-endpoint=unix:///run/containerd/containerd.sock  \
    --node-labels=node.kubernetes.io/node=

[Install]
WantedBy=multi-user.target
EOF
```

生成`/etc/kubernetes/kubelet-conf.yaml`配置文件
```bash
cat <<EOF > /etc/kubernetes/kubelet-conf.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
authentication:
  anonymous:
    enabled: false
  webhook:
    cacheTTL: 0s
    enabled: true
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 0s
    cacheUnauthorizedTTL: 0s
cgroupDriver: systemd
clusterDNS:
- 10.10.0.10
clusterDomain: cluster.local
containerRuntimeEndpoint: ""
cpuManagerReconcilePeriod: 0s
evictionPressureTransitionPeriod: 0s
fileCheckFrequency: 0s
healthzBindAddress: 127.0.0.1
healthzPort: 10248
httpCheckFrequency: 0s
imageMaximumGCAge: 0s
imageMinimumGCAge: 0s
kind: KubeletConfiguration
logging:
  flushFrequency: 0
  options:
    json:
      infoBufferSize: "0"
    text:
      infoBufferSize: "0"
  verbosity: 0
memorySwap: {}
nodeStatusReportFrequency: 0s
nodeStatusUpdateFrequency: 0s
rotateCertificates: true
runtimeRequestTimeout: 0s
shutdownGracePeriod: 0s
shutdownGracePeriodCriticalPods: 0s
staticPodPath: /etc/kubernetes/manifests
streamingConnectionIdleTimeout: 0s
syncFrequency: 0s
volumeStatsAggPeriod: 0s
serverTLSBootstrap: true
EOF
```

生成kube-proxy服务

```bash
cat <<EOF > /usr/lib/systemd/system/kube-proxy.service
[Unit]
Description=Kubernetes Kube Proxy
Documentation=https://github.com/kubernetes/kubernetes
After=network.target

[Service]
ExecStart=/usr/local/bin/kube-proxy \\
  --config=/etc/kubernetes/kube-proxy.yaml \\
  --cluster-cidr=10.11.0.0/16 \\
  --v=2
Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

生成`/etc/kubernetes/kube-proxy.yaml`
```bash
cat <<EOF > /etc/kubernetes/kube-proxy.yaml
apiVersion: kubeproxy.config.k8s.io/v1alpha1
bindAddress: 0.0.0.0
clientConnection:
  acceptContentTypes: ""
  burst: 10
  contentType: application/vnd.kubernetes.protobuf
  kubeconfig: /etc/kubernetes/kube-proxy.conf
  qps: 5
clusterCIDR: 10.11.0.0/16
configSyncPeriod: 15m0s
conntrack:
  max: null
  maxPerCore: 32768
  min: 131072
  tcpCloseWaitTimeout: 1h0m0s
  tcpEstablishedTimeout: 24h0m0s
enableProfiling: false
healthzBindAddress: 0.0.0.0:10256
hostnameOverride: ""
iptables:
  masqueradeAll: false
  masqueradeBit: 14
  minSyncPeriod: 0s
  syncPeriod: 30s
ipvs:
  masqueradeAll: true
  minSyncPeriod: 5s
  scheduler: "rr"
  syncPeriod: 30s
kind: KubeProxyConfiguration
metricsBindAddress: 127.0.0.1:10249
mode: "ipvs"
nodePortAddresses: null
oomScoreAdj: -999
portRange: ""
udpIdleTimeout: 250ms
EOF
```

### 启动主节点

```bash
systemctl enable --now etcd.service 
systemctl enable --now kube-apiserver.service
systemctl enable --now kube-controller-manager.service
systemctl enable --now kube-scheduler.service
systemctl enable --now kube-proxy.service
```

设置TLS bootstrapping

`bootstrapping.yaml`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: bootstrap-token-0e5634
  namespace: kube-system
type: bootstrap.kubernetes.io/token
stringData:
  description: "The default bootstrap token generated by 'kubelet '."
  token-id: "0e5634"
  token-secret: "55bf9fc480d29395"
  usage-bootstrap-authentication: "true"
  usage-bootstrap-signing: "true"
  auth-extra-groups: system:bootstrappers:default-node-token,system:bootstrappers:worker,system:bootstrappers:ingress
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: create-csrs-for-bootstrapping
subjects:
- kind: Group
  name: system:bootstrappers:default-node-token
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: system:node-bootstrapper
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: node-autoapprove-certificate-rotation
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:certificates.k8s.io:certificatesigningrequests:selfnodeclient
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: system:nodes
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: auto-approve-csrs-for-group
subjects:
- kind: Group
  name: system:bootstrappers:default-node-token
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: system:certificates.k8s.io:certificatesigningrequests:nodeclient
  apiGroup: rbac.authorization.k8s.io
```

```bash
kubectl apply -f bootstrapping.yaml
```

启动kubelet

```bash
systemctl enable --now kubelet.service
```

### 配置节点

复制admin.config

```bash
mkdir ~/.kube
cp /etc/kubernetes/admin.conf ~/.kube/config
```

查看证书kubelet证书申请

```bash
kubectl get csr
```

同意其中的证书申请

```bash
kubectl certificate approve <name>
```

### 安装CoreDNS

安装helm

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

安装CoreDNS的helm仓库

```bash
helm repo add coredns https://coredns.github.io/helm
```

```bash
cat <<EOF > coredns-values.yaml
service:
  clusterIP: "10.10.0.10"
```

安装coredns

```bash
helm -n kube-system install coredns coredns/coredns -f coredns-values.yaml
```

### 安装网络插件

#### flannel

[flannel](https://github.com/flannel-io/flannel)

```bash
wget https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml

curl -sSL -O https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```

修改`Network`为podCIDR，如`10.11.0.0`, 安装flannel

```bash
kubectl apply -f kube-flannel.yml 
```


## 工作节点安装

### 复制文件

- `/etc/kubernetes/pki/ca.crt`
- `/etc/kubernetes/bootstrap-kubelet.conf`

### 安装Kubernetes组件

```bash
version="v1.32.0"

# wget
wget https://dl.k8s.io/${version}/bin/linux/amd64/kube-proxy -O /usr/local/bin/kube-proxy
wget https://dl.k8s.io/${version}/bin/linux/amd64/kubelet -O /usr/local/bin/kubelet

curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kube-proxy -o /usr/local/bin/kube-proxy
curl -sSL https://dl.k8s.io/${version}/bin/linux/amd64/kubelet -o /usr/local/bin/kubelet

chmod +x /usr/local/bin/kube-proxy
chmod +x /usr/local/bin/kubectl
```

### 启动systemd服务
生成kubelet服务

```bash
cat <<EOF > /usr/lib/systemd/system/kubelet.service
[Unit]
Description=Kubernetes Kubelet
Documentation=https://github.com/kubernetes/kubernetes
After=network-online.target firewalld.service containerd.service
Wants=network-online.target
Requires=containerd.service

[Service]
ExecStart=/usr/local/bin/kubelet \
    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf  \
    --kubeconfig=/etc/kubernetes/kubelet.conf \
    --config=/etc/kubernetes/kubelet-conf.yaml \
    --container-runtime-endpoint=unix:///run/containerd/containerd.sock  \
    --node-labels=node.kubernetes.io/node=

[Install]
WantedBy=multi-user.target
EOF
```

生成`/etc/kubernetes/kubelet-conf.yaml`配置文件
```bash
cat <<EOF > /etc/kubernetes/kubelet-conf.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
authentication:
  anonymous:
    enabled: false
  webhook:
    cacheTTL: 0s
    enabled: true
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 0s
    cacheUnauthorizedTTL: 0s
cgroupDriver: systemd
clusterDNS:
- 10.10.0.10
clusterDomain: cluster.local
containerRuntimeEndpoint: ""
cpuManagerReconcilePeriod: 0s
evictionPressureTransitionPeriod: 0s
fileCheckFrequency: 0s
healthzBindAddress: 127.0.0.1
healthzPort: 10248
httpCheckFrequency: 0s
imageMaximumGCAge: 0s
imageMinimumGCAge: 0s
kind: KubeletConfiguration
logging:
  flushFrequency: 0
  options:
    json:
      infoBufferSize: "0"
    text:
      infoBufferSize: "0"
  verbosity: 0
memorySwap: {}
nodeStatusReportFrequency: 0s
nodeStatusUpdateFrequency: 0s
rotateCertificates: true
runtimeRequestTimeout: 0s
shutdownGracePeriod: 0s
shutdownGracePeriodCriticalPods: 0s
staticPodPath: /etc/kubernetes/manifests
streamingConnectionIdleTimeout: 0s
syncFrequency: 0s
volumeStatsAggPeriod: 0s
serverTLSBootstrap: true
EOF
```

生成kube-proxy服务

```bash
cat <<EOF > /usr/lib/systemd/system/kube-proxy.service
[Unit]
Description=Kubernetes Kube Proxy
Documentation=https://github.com/kubernetes/kubernetes
After=network.target

[Service]
ExecStart=/usr/local/bin/kube-proxy \\
  --config=/etc/kubernetes/kube-proxy.yaml \\
  --cluster-cidr=10.11.0.0/16 \\
  --v=2
Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

生成`/etc/kubernetes/kube-proxy.yaml`
```bash
cat <<EOF > /etc/kubernetes/kube-proxy.yaml
apiVersion: kubeproxy.config.k8s.io/v1alpha1
bindAddress: 0.0.0.0
clientConnection:
  acceptContentTypes: ""
  burst: 10
  contentType: application/vnd.kubernetes.protobuf
  kubeconfig: /etc/kubernetes/kube-proxy.conf
  qps: 5
clusterCIDR: 10.11.0.0/16
configSyncPeriod: 15m0s
conntrack:
  max: null
  maxPerCore: 32768
  min: 131072
  tcpCloseWaitTimeout: 1h0m0s
  tcpEstablishedTimeout: 24h0m0s
enableProfiling: false
healthzBindAddress: 0.0.0.0:10256
hostnameOverride: ""
iptables:
  masqueradeAll: false
  masqueradeBit: 14
  minSyncPeriod: 0s
  syncPeriod: 30s
ipvs:
  masqueradeAll: true
  minSyncPeriod: 5s
  scheduler: "rr"
  syncPeriod: 30s
kind: KubeProxyConfiguration
metricsBindAddress: 127.0.0.1:10249
mode: "ipvs"
nodePortAddresses: null
oomScoreAdj: -999
portRange: ""
udpIdleTimeout: 250ms
EOF
```
