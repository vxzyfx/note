---
title: 苹果使用
---

## MAC 路由
持久路由设置命令`networksetup`

查看网络连接方式
```bash
networksetup -listallnetworkservices
```

查看某个网络连接方式的路由, 如查看Wi-Fi的路由

```bash
networksetup -getadditionalroutes Wi-Fi
```

添加路由

```bash
networksetup -setadditionalroutes Wi-Fi 11.33.0.0 255.255.255.0 11.136.167.254
```

> 11.33.0.0 是目的地址, 255.255.255.0 是子网掩码, 11.136.167.254 是网关

删除路由

```bash
networksetup -setadditionalroutes Wi-Fi
```