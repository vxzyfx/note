---
title: 网络协议基础
description: 收录 OSI 各层协议、HTTP、应用层协议和 WebSocket 笔记。
---

## 网络协议

按照 OSI 模型（Open Systems Interconnection Model）从底层到高层进行的协议排序：

### 物理层 (Layer 1)

- **没有具体的网络协议**，主要包括各种物理介质标准（如电缆、光纤、无线电波等）。

### 数据链路层 (Layer 2) [数据链路层协议介绍](1-data_link)

1. **Ethernet**：用于局域网的数据帧传输标准。
2. **PPP (Point-to-Point Protocol)**：用于点对点连接的协议。
3. **HDLC (High-Level Data Link Control)**：用于点对点和多点连接的协议。
4. **LLC (Logical Link Control)**：以太网和其他链路层的逻辑链路控制协议。
5. **MAC (Media Access Control)**：负责网络设备间的介质访问控制。

### 网络层 (Layer 3) [网络层协议介绍](2-network)

1. **IP (Internet Protocol)**：负责数据包的寻址和路由。
   - **IPv4**
   - **IPv6**
2. **ICMP (Internet Control Message Protocol)**：用于网络诊断和错误报告。
3. **IGMP (Internet Group Management Protocol)**：用于管理多播组成员。
4. **ARP (Address Resolution Protocol)**：将 IP 地址解析为 MAC 地址。
5. **RARP (Reverse Address Resolution Protocol)**：将 MAC 地址解析为 IP 地址。
6. **IPsec (Internet Protocol Security)**：用于保护 IP 通信的协议套件。

### 传输层 (Layer 4) [传输层协议介绍](3-transmission)

1. **TCP (Transmission Control Protocol)**：面向连接的协议，提供可靠的数据传输。
2. **UDP (User Datagram Protocol)**：无连接的协议，提供不可靠的数据传输。

### 会话层 (Layer 5) [会话层协议介绍](4-session)

- **NetBIOS (Network Basic Input/Output System)**：用于网络通信和资源共享。
- **PPTP (Point-to-Point Tunneling Protocol)**：用于实现虚拟专用网络（VPN）。

### 表示层 (Layer 6) [表示层协议介绍](5-presentation)

- **TLS/SSL (Transport Layer Security/Secure Sockets Layer)**：用于加密网络通信，确保数据传输的安全性。
- **MIME (Multipurpose internet Mail Extensions)**：用于描述电子邮件内容类型。

### 应用层 (Layer 7)

1. **HTTP (HyperText Transfer Protocol)**：用于网页数据的传输。[HTTP 协议介绍](6-http)
2. [部分应用层协议](7-application)
3. [WebSocket 协议](8-websocket)
4. **HTTPS (HTTP Secure)**：安全的 HTTP 协议，使用 SSL/TLS 加密数据传输。
5. **FTP (File Transfer Protocol)**：用于文件传输。
6. **SMTP (Simple Mail Transfer Protocol)**：用于电子邮件传输。
7. **POP3 (Post Office Protocol 3)**：用于从邮件服务器接收电子邮件。
8. **IMAP (Internet Message Access Protocol)**：用于从邮件服务器读取电子邮件。
9. **DNS (Domain Name System)**：将域名解析为 IP 地址。
10. **DHCP (Dynamic Host Configuration Protocol)**：用于动态分配 IP 地址。
11. **Telnet**：用于远程登录到网络设备。
12. **SSH (Secure Shell)**：安全的远程登录协议。
13. **NTP (Network Time Protocol)**：用于同步网络中计算机的时钟。
14. **SNMP (Simple Network Management Protocol)**：用于网络设备的管理和监控。
15. **LDAP (Lightweight Directory Access Protocol)**：用于访问和维护分布式目录信息服务。

### 无线网络协议（跨多层）

- **Wi-Fi (IEEE 802.11)**：无线局域网标准（物理层和数据链路层）。
- **Bluetooth**：短距离无线通信协议（物理层和数据链路层）。
- **Zigbee**：用于低功耗、短距离无线通信的协议（物理层和数据链路层）。
