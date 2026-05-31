---
title: ssh使用
description: OpenSSH 客户端常用参数和端口转发的安全边界。
---

## ssh 命令参数

```text
-p port 连接到远程主机上的端口
-N 不执行远程命令，常用于只建立端口转发
-C 启用压缩；慢速链路可能有用，快速网络可能降低性能
-f 认证后转入后台；常与 -N 或远程占位命令配合
-n 从 /dev/null 重定向标准输入；后台运行 ssh 时常用
-q 安静模式，减少警告和诊断消息
-g 允许远程主机连接到本地转发端口
-T 禁用伪终端分配
-D [bind_address:]port 开启本地动态 SOCKS4/SOCKS5 转发
-L [bind_address:]port:host:hostport 将本地监听转发到远端可访问的目标
-R [bind_address:]port:host:hostport 将远端监听转发到本地可访问的目标
```

## ssh 代理

> 警告：端口转发会把本机或远端网络服务暴露给其他网络位置。使用 `0.0.0.0`、空地址、`*`、`-g` 或服务端 `GatewayPorts yes` 前，先确认防火墙、监听地址和认证边界，避免把内网服务暴露到公网。

### 本地转发

```bash
ssh -L 127.0.0.1:PortB:HostC:PortC user@HostC
```

访问本机 `127.0.0.1:PortB` 相当于通过 SSH 连接访问 `HostC:PortC`。如果确实需要让其他主机访问本地转发端口，再显式改成 `0.0.0.0:PortB`，并配合防火墙限制来源。

### 反向转发

> 警告：反向转发会在 SSH 服务端侧开启监听端口。OpenSSH 默认远程 TCP 转发通常绑定到服务端 loopback；只有服务端启用 `GatewayPorts` 且命令指定非 loopback 监听地址时，才可能对其他主机开放。

```bash
ssh -R 127.0.0.1:PortC:HostB:PortB user@HostC
```

访问 `HostC` 上的 `127.0.0.1:PortC` 就相当于访问客户端侧可达的 `HostB:PortB`。

> 警告：`GatewayPorts yes` 会允许远程转发端口绑定到非 loopback 地址，可能扩大暴露面。仅在明确需要外部访问反向转发端口，并已用防火墙限制来源时启用。

```text
GatewayPorts yes
```

### 动态代理

```bash
ssh -D 127.0.0.1:1080 user@HostB
```

该命令会在本机 `127.0.0.1:1080` 开启 SOCKS4/SOCKS5 代理。不要把动态代理绑定到 `0.0.0.0`，除非已确认访问控制和日志审计。

## 参考资料

1. [ssh(1) - OpenBSD manual pages](https://man.openbsd.org/ssh.1)（访问日期：2026-05-31）
2. [sshd_config(5) - OpenBSD manual pages](https://man.openbsd.org/sshd_config)（访问日期：2026-05-31）
3. [ssh_config(5) - OpenBSD manual pages](https://man.openbsd.org/ssh_config)（访问日期：2026-05-31）
