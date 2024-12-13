---
title: ssh使用
---

## ssh 命令参数
```text
-p port 连接到远程主机上的端口
-N 不执行远程命令。对于仅转发端口很有用
-C 启用压缩
-f 将 ssh 命令放在后台
-n 从 /dev/null 重定向标准输入（实际上，防止从标准输入读取),在后台运行ssh时必须使用此选项
-q 安静模式。阻止大多数警告和诊断消息。
-g 允许远程主机连接到本地转发的端口
-T 禁用伪终端分配
-p [port] 要连接到远程主机上的端口
-D [bind_address:]port 指定本地“动态”应用程序级端口转发
-R [bind_address:]port:host:hostport 指定与远程（服务器）主机上给定的TCP端口或Unix套接字的连接将转发到本地
```

## ssh 代理
1. 本地代理

```bash
ssh -L 0.0.0.0:PortB:HostC:PortC user@HostC
```
这时访问 HostB:PortB 相当于访问 HostC:PortC

2. 反向代理
```bash
ssh -R HostC:PortC:HostB:PortB  user@HostC
```
访问 HostC:PortC 就相当于访问 HostB:PortB, 需要修改Hostc的`/etc/ssh/sshd_config`

```text
GatewayPorts yes
```

3. 动态代理

```bash
ssh -D localhost:1080  HostB
```
在本机1080端口开启一个socks5服务