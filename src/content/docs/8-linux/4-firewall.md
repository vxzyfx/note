---
title: linux防火墙
---

Linux 防火墙主要通过 Netfilter 框架实现，并通过 iptables 或者更现代的 nftables 工具进行管理和配置。Netfilter 是 Linux 内核的一部分，负责数据包的过滤和网络地址转换 (NAT)。

Netfilter 是一个 Linux 内核模块，提供网络数据包过滤、网络地址转换 (NAT) 和数据包记录的功能。它是 Linux 系统中实现防火墙和其他网络操作的基础组件。

### Netfilter 的主要功能

1. **数据包过滤**：通过设定规则，可以决定哪些数据包可以通过，哪些数据包需要被拒绝或丢弃。这些规则可以根据数据包的源地址、目的地址、端口号、协议类型等进行设置。

2. **网络地址转换 (NAT)**：用于修改数据包的源地址或目的地址，主要应用于共享 Internet 连接的场景，比如家庭路由器。

3. **数据包记录**：可以记录符合特定条件的数据包信息，用于网络监控和审计。

### Netfilter 的工作流程

Netfilter 在 Linux 内核中工作，通过挂载在不同的网络数据包处理点上，执行预定义的规则。Netfilter 主要有以下几个挂载点：

1. **PREROUTING**：数据包刚刚到达网络接口时进行处理。
2. **INPUT**：处理目标是本机的数据包。
3. **FORWARD**：处理经过本机但目标不是本机的数据包。
4. **OUTPUT**：处理从本机发出的数据包。
5. **POSTROUTING**：数据包即将离开网络接口时进行处理。

### 规则链 (Chains)

在每个挂载点，Netfilter 使用规则链来管理数据包的处理。常用的链有：

- **INPUT 链**：处理进入本机的数据包。
- **OUTPUT 链**：处理从本机发出的数据包。
- **FORWARD 链**：处理转发的数据包。
- **PREROUTING 链**：在数据包路由前处理。
- **POSTROUTING 链**：在数据包路由后处理。

每个链由一系列规则组成，这些规则按照顺序依次匹配数据包。如果一个规则匹配成功，数据包就会按照规则中的动作进行处理（如 ACCEPT、DROP、REJECT）。

## iptables

`iptables` 是一个用户空间的命令行工具，用于配置 Netfilter 提供的 IP 包过滤规则。它是 Linux 系统中用于设置和管理防火墙规则的主要工具之一。以下是 `iptables` 的一些关键概念和常用命令。

#### 基本概念

1. **表 (Tables)**：`iptables` 有四个主要表，每个表包含不同类型的规则链。
   - **filter**：默认表，用于数据包过滤。
   - **nat**：用于网络地址转换。
   - **mangle**：用于修改数据包。
   - **raw**：用于数据包处理的原始规则。

2. **链 (Chains)**：每个表包含多个链，链是规则的集合。常见的链有：
   - **INPUT**：处理进入本机的数据包。
   - **FORWARD**：处理转发的数据包。
   - **OUTPUT**：处理从本机发出的数据包。
   - **PREROUTING**：处理到达本机前的数据包（用于 NAT）。
   - **POSTROUTING**：处理离开本机后的数据包（用于 NAT）。

3. **规则 (Rules)**：每个链由一系列规则组成，这些规则根据数据包的属性（如源地址、目的地址、端口号等）决定如何处理数据包。

#### 常用命令

##### 查看规则

查看所有表的规则：
```bash
sudo iptables -L
```

查看特定表的规则：
```bash
sudo iptables -t nat -L
```

##### 添加规则

允许某个端口的入站流量（例如允许 SSH 端口 22）：
```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

拒绝某个端口的入站流量（例如拒绝 HTTP 端口 80）：
```bash
sudo iptables -A INPUT -p tcp --dport 80 -j REJECT
```

丢弃某个端口的入站流量（例如丢弃 HTTP 端口 80）：
```bash
sudo iptables -A INPUT -p tcp --dport 80 -j DROP
```

##### 删除规则

删除规则可以通过指定规则的内容或者规则的编号来完成。

通过规则内容删除（例如删除允许 SSH 的规则）：
```bash
sudo iptables -D INPUT -p tcp --dport 22 -j ACCEPT
```

通过规则编号删除（例如删除链中的第1条规则）：
```bash
sudo iptables -D INPUT 1
```

##### 保存和恢复规则

保存当前规则：
```bash
sudo iptables-save > /etc/iptables/rules.v4
```

恢复规则：
```bash
sudo iptables-restore < /etc/iptables/rules.v4
```

##### 清空所有规则

清空所有链中的规则：
```bash
sudo iptables -F
```

##### 设置默认策略

将默认策略设置为拒绝：
```bash
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT DROP
```

#### 示例

##### 配置一个基本防火墙

1. 允许本机发出的流量：
   ```bash
   sudo iptables -A OUTPUT -j ACCEPT
   ```

2. 允许已经建立的连接和相关流量：
   ```bash
   sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
   ```

3. 允许本地回环接口的流量：
   ```bash
   sudo iptables -A INPUT -i lo -j ACCEPT
   ```

4. 允许 SSH 连接：
   ```bash
   sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
   ```

5. 拒绝其他所有入站流量：
   ```bash
   sudo iptables -P INPUT DROP
   ```

## nftables

nftables 是iptables的替代, 提供更多的功能.

nftables中的hook

ipv4/ipv6/inet 地址簇
| hook | 描述 |
| :-- | :-- |
| prerouting | 所有进入系统的数据包都由预路由钩子处理。它在路由过程之前调用，用于早期过滤或更改影响路由的数据包属性。|
| input | 传送到本地系统的数据包由输入挂钩处理。|
| forward | 转发到不同主机的数据包由转发钩子处理。|
| output | 本地进程发送的数据包由输出挂钩处理。|
| postrouting | 所有离开系统的数据包都由 postrouting 挂钩处理。|
| ingress | 所有进入系统的数据包都由该钩子处理。它在第 3 层协议处理程序之前调用，因此在预路由挂钩之前调用，并且它可用于过滤和监管。 Ingress 仅适用于 Inet 系列（自 Linux 内核 5.10 起）。|

arp地址簇
| hook | 描述 |
| :-- | :--|
| input | 传送到本地系统的数据包由输入挂钩处理。 |
| output | 本地系统发送的数据包由输出挂钩处理。 |

bridge 地址簇
与ipv4/ipv6/inet相同

netdev地址簇
| hook | 描述 |
| :-- | :--|
| ingress | 所有进入系统的数据包都由该钩子处理。它在网络分流（即 tcpdump）之后、tc 入口之后和第 3 层协议处理程序之前调用，它可用于早期过滤和监管。 |
| egress | 所有离开系统的数据包都由该钩子处理。它在第 3 层协议处理程序之后和 tc 出口之前调用。它可用于后期过滤和监管。 |

查看规则
```bash
nft list ruleset
```

nftables每个表只有一个地址簇, 只用与该地址簇的数据包

| nftables簇 | iptables工具 |
|:--|:--|
| ip | iptables |
| ip6 | ip6tables |
| inet | iptables和ip6tables |
| arp | arptables |
| bridge | ebtables |

inet同时包含ipv4和ipv6


创建一个inet簇的表, 表名为filter
```bash
nft add table inet filter
```

nftables的链分两种, 常规链和基本链, 常规链不需要指定钩子类型和优先级, 是规则在逻辑上的分类, 基本链是数据的入口, 需要指定钩子类型和优先级.

在inet簇的filter表中创建一个常规链, 链名为common_input
```bash
nft add chain inet filter common_input
```

在inet簇的filter表中创建基本链, 链名为input, 链类型为filter, 默认动作为accept

```bash
nft add chain inet filter input { type filter hook input priority 0; policy accept; }
```
基本链的类型
| 类型     |      支持的表 |  作用 |
|----------|:-------------:|------:|
| filter | arp, bridge, ip, ip6, inet | 过滤数据包 |
| route  | ip, ip6, inet   |   如果ip头字段或数据包标记被修改, 用于重新路由数据, 仅可用于输出钩子 |
| nat    | ip, ip6, inet |    用于nat, 只有流的第一个数据包会经过, 后面的数据包会绕过 |

priority 0表示优先级为0, 默认优先级为0, 值越小优先级越高, 可以是负数. 

policy指定默认动作, 有accept和drop两种选项, 不设置默认是accept

| nftables  | Typical hooks   | _nft_ Keyword | Value | Netfilter Internal Priority         | Description                                                                                                   |
|---------------------------------------|------------------|----------------|-------|----------------------------------|---------------------------------------------------------------------------------------------------------------|
|                                       | prerouting       |                | -450  | NF_IP_PRI_RAW_BEFORE_DEFRAG      |                                                                                                               |
| inet, ip, ip6                         | prerouting       |                | -400  | NF_IP_PRI_CONNTRACK_DEFRAG       | Packet defragmentation / datagram reassembly                                                                  |
| inet, ip, ip6                         | all              | **raw**        | -300  | NF_IP_PRI_RAW                    | Traditional priority of the raw table placed before connection tracking operation                              |
|                                       |                  |                | -225  | NF_IP_PRI_SELINUX_FIRST          | SELinux operations                                                                                             |
| inet, ip, ip6                         | prerouting, output|                | -200  | NF_IP_PRI_CONNTRACK              |processes run early in prerouting and output hooks to associate packets with tracked connections. |
| inet, ip, ip6                         | all              | **mangle**     | -150  | NF_IP_PRI_MANGLE                 | Mangle operation                                                                                              |
| inet, ip, ip6                         | prerouting       | **dstnat**     | -100  | NF_IP_PRI_NAT_DST                | Destination NAT                                                                                               |
| inet, ip, ip6, arp, netdev            | all              | **filter**     | 0     | NF_IP_PRI_FILTER                 | Filtering operation, the filter table                                                                         |
| inet, ip, ip6                         | all              | **security**   | 50    | NF_IP_PRI_SECURITY               | Place of security table, where secmark can be set for example                                                 |
| inet, ip, ip6                         | postrouting      | **srcnat**     | 100   | NF_IP_PRI_NAT_SRC                | Source NAT                                                                                                    |
|                                       | postrouting      |                | 225   | NF_IP_PRI_SELINUX_LAST           | SELinux at packet exit                                                                                        |
| inet, ip, ip6                         | postrouting      |                | 300   | NF_IP_PRI_CONNTRACK_HELPER       | Connection tracking helpers, which identify expected and related packets.                                      |
| inet, ip, ip6                         | input, postrouting|                | INT_MAX | NF_IP_PRI_CONNTRACK_CONFIRM      | Connection tracking adds new tracked connections at final step in input & postrouting hooks.                   |
| bridge                                | prerouting       | **dstnat**     | -300  | NF_BR_PRI_NAT_DST_BRIDGED        |                                                                                                               |
| bridge                                | all              | **filter**     | -200  | NF_BR_PRI_FILTER_BRIDGED         |                                                                                                               |
| bridge                                |                  |                | 0     | NF_BR_PRI_BRNF                   |                                                                                                               |
| bridge                                | output           | **out**        | 100   | NF_BR_PRI_NAT_DST_OTHER          |                                                                                                               |
| bridge                                |                  |                | 200   | NF_BR_PRI_FILTER_OTHER           |                                                                                                               |
| bridge                                | postrouting      | **srcnat**     | 300   | NF_BR_PRI_NAT_SRC                |                                                                                                               |

创建规则

允许ssh连接
```bash
nft add rule inet filter input tcp dport ssh accept
```

add 表示添加到链的末尾, insert表示添加到链的开头, 插入到指定位置使用index

插入到第一个规则后面
```bash
nft add rule inet filter input index 0 tcp dport ssh accept 
```
插入到第一个规则前面
```bash
nft insert rule inet filter input index 0 tcp dport ssh accept 
```

通过handle将规则插入到指定位置

查看handle

```bash
nft --handle list ruleset
```

插入到第handle 6 后面
```bash
nft add rule inet filter input handle 6 tcp dport ssh accept 
```
插入到handle 6 前面
```bash
nft insert rule inet filter input handle 6 tcp dport ssh accept 
```

建议使用handle, index在插入时会变化, handle除非删除, 不会变化

删除规则只能通过handle

删除handle 6对应的规则
```bash
nft delete rule inet filter input handle 6
```

列出fliter表的规则

```bash
nft list table inet filter
```
列出input链的规则
```bash
nft list chain inet filter input
```

meta数据

```text
meta {length | nfproto | l4proto | protocol | priority}
[meta] {mark | iif | iifname | iiftype | oif | oifname | oiftype | skuid | skgid | nftrace | rtclassid | ibrname | obrname | pkttype | cpu | iifgroup | oifgroup | cgroup | random | ipsec | iifkind | oifkind | time | hour | day }
```

meta类型
| **Keyword** | **Description** | **Type** |
|-------------|-----------------|----------|
| length      | 数据包的长度（字节） | integer (32-bit) |
| nfproto     | 实际钩子协议族，仅在 inet 表中有用 | integer (32 bit) |
| l4proto     | 第四层协议，跳过 ipv6 扩展头 | integer (8 bit) |
| protocol    | EtherType 协议值 | ether_type |
| priority    | TC 数据包优先级 | tc_handle |
| mark        | 数据包标记 | mark |
| iif         | 输入接口索引 | iface_index |
| iifname     | 输入接口名称 | ifname |
| iiftype     | 输入接口类型 | iface_type |
| oif         | 输出接口索引 | iface_index |
| oifname     | 输出接口名称 | ifname |
| oiftype     | 输出接口硬件类型 | iface_type |
| sdif        | 从设备输入接口索引 | iface_index |
| sdifname    | 从设备接口名称 | ifname |
| skuid       | 与原始套接字关联的 UID | uid |
| skgid       | 与原始套接字关联的 GID | gid |
| rtclassid   | 路由领域 | realm |
| ibrname     | 输入桥接接口名称 | ifname |
| obrname     | 输出桥接接口名称 | ifname |
| pkttype     | 数据包类型 | pkt_type |
| cpu         | 处理数据包的 CPU 号 | integer (32 bit) |
| iifgroup    | 输入设备组 | devgroup |
| oifgroup    | 输出设备组 | devgroup |
| cgroup      | 控制组 ID | integer (32 bit) |
| random      | 伪随机数 | integer (32 bit) |
| ipsec       | 如果数据包是 ipsec 加密的，则为 true | boolean (1 bit) |
| iifkind     | 输入接口种类 | |
| oifkind     | 输出接口种类 | |
| time        | 数据包接收的绝对时间 | Integer (32 bit) or string |
| day         | 星期几 | Integer (8 bit) or string |
| hour        | 一天中的小时 | String |

meta特殊类型
| **Type**      | **Description**                                                                                                               |
|---------------|-------------------------------------------------------------------------------------------------------------------------------|
| iface_index   | 接口索引（32位数字）。可以用数字或现有接口的名称指定。                                                                          |
| ifname        | 接口名称（16字节字符串）。不必存在。                                                                                           |
| iface_type    | 接口类型（16位数字）。                                                                                                       |
| uid           | 用户ID（32位数字）。可以用数字或用户名指定。                                                                                   |
| gid           | 组ID（32位数字）。可以用数字或组名指定。                                                                                      |
| realm         | 路由领域（32位数字）。可以用数字或在 /etc/iproute2/rt_realms 中定义的符号名称指定。                                             |
| devgroup_type | 设备组（32位数字）。可以用数字或在 /etc/iproute2/group 中定义的符号名称指定。                                                  |
| pkt_type      | 数据包类型：**host**（发往本地主机），**broadcast**（广播），**multicast**（组播），**other**（发往其他主机）。                   |
| ifkind        | 接口种类（16字节字符串）。参见 [ip-link](https://www.man7.org/linux/man-pages/man8/ip-link.8.html) (8) 中的类型列表。          |
| time          | 可以是整数或 ISO 格式的日期。例如："2019-06-06 17:00"。小时和秒是可选的，如果需要可以省略。如果省略，将假定为午夜。以下三种形式是等效的："2019-06-06"、"2019-06-06 00:00" 和 "2019-06-06 00:00:00"。当给出一个整数时，假定它是一个 UNIX 时间戳。 |
| day           | 可以是星期几（"Monday"、"Tuesday" 等），也可以是0到6之间的整数。不区分大小写匹配，不需要完全匹配（例如 "Mon" 可以匹配 "Monday"）。当给出一个整数时，0 是星期天，6 是星期六。 |
| hour          | 表示24小时格式的字符串。可以选择性地指定秒。例如，17:00 和 17:00:00 是等效的。                                                  |

通过`nft monitor`查看追踪
```text
table inet filter {
	chain input {
		type filter hook input priority filter; policy accept;
                tcp dport 80 meta nftrace set 1
	}
}
```

将meta中的nftrace设为1, 然后运行`nft monitor`即可看到追踪日志


集合, 可以用来匹配多个ip地址, 端口, 网卡或其他条件

集合是nftables中一个重要的概念, 可以用来匹配多个ip地址, 端口, 网卡或其他条件. 集合可以定义为静态集合, 也可以定义为动态集合. 静态集合是预先定义好就不能变的集合, 动态集合是运行时动态变化的集合. 

静态集合的使用
```bash
nft add rule inet filter input tcp dport { http, nfs, ssh } accept
```

```text
table inet filter {
  chain filter {
    type filter hook input priority filter; policy accept;
    tcp dport { ssh, http, https } accept
  }
}
```

静态集合使用级联
```bash
nft add rule inet filter input ip saddr . meta l4proto . udp dport { 10.30.30.30 . udp . bootps } accept
```


动态集合的使用

动态集合支持的类型

+ ipv4_addr: ipv4地址
+ ipv6_addr: ipv6地址
+ ether_addr: 以太网地址(MAC地址)
+ inet_proto: 网络协议(如tcp)
+ inet_service: 网络服务(如ssh)
+ mark: 标记(32位无符号整数)

创建一个空的命名集合, 不支持区间
```bash
nft add set inet filter my_addr { type ipv4_addr \; }
```

添加ip地址到集合
```bash
nft add element inet filter my_addr { 192.168.1.1, 192.168.1.2 }
```

使用命名集合

```bash
nft add rule inet filter input ip saddr @my_addr accept
```

创建一个支持区间的集合
```bash
nft add set inet filter my_addr1 { type ipv4_addr \; flags interval \; }
```

添加元素
```bash
nft add element inet filter my_addr1 { 192.168.1.1-192.168.1.2, 192.168.2.0/24 }
```

集合支持级联, 通过.分割

同时匹配ip地址和协议和端口
```bash
nft add set inet filter my_concat_set  { type ipv4_addr . inet_proto . inet_service \; }
```

添加元素

```bash
nft add element inet filter my_concat_set { 10.30.30.30 . tcp . telnet }
```

使用级联的集合
```bash
nft add rule inet filter input ip saddr . meta l4proto . tcp dport @my_concat_set accept
```

字典是nftables的高级特性, 可以把不同类型的数据映射到某一个规则上面. 

将tcp和udp数据映射到不同的规则上面. 

```bash
nft add chain inet filter input_tcp
nft add chain inet filter input_udp
nft add rule inet filter input meta l4proto vmap { tcp:  jump input_tcp, udp: jump input_udp }
```

统计tcp和udp的数据
```text
table inet example_table {
  chain tcp_packets {
    counter
  }

  chain udp_packets {
    counter
  }

  chain incoming_traffic {
    type filter hook input priority filter; policy accept;
    ip protocol vmap { tcp : jump tcp_packets, udp : jump udp_packets }
  }
}
```

命名字典
```bash
nft add map inet filter my_vmap { type ipv4_addr : verdict \; }
```

添加元素
```bash
nft add element inet my_table my_vmap { 192.168.0.10 : drop, 192.168.0.11 : accept }
```

```text
table ip example_table {
  map example_map {
    type ipv4_addr : verdict
    elements = { 192.0.2.2 : drop, 192.0.2.3 : accept }
  }

  chain example_chain {
    type filter hook input priority filter; policy accept;
    ip saddr vmap @example_map
  }
}
```

comment 添加注释

counter 计数器

创建代计数器的规则
```bash
nft add rule inet example_table example_chain tcp dport 22 counter accept
```
已经存在的规则添加计数器
```bash
nft replace rule inet example_table example_chain handle 4 tcp dport 22 counter accept
```

log 日志

```text
log [prefix quoted_string] [level syslog-level] [flags log-flags]
log group nflog_group [prefix quoted_string] [queue-threshold value] [snaplen size]
log level audit
```

limit限制

```text
limit rate [over] packet_number / TIME_UNIT [burst packet_number packets]
limit rate [over] byte_number BYTE_UNIT / TIME_UNIT [burst byte_number BYTE_UNIT]

TIME_UNIT := second | minute | hour | day
BYTE_UNIT := bytes | kbytes | mbytes
```
通过基于数据包的限制，存储桶恰好容纳突发数据包，默认情况下为 5 个。如果指定数据包突发，则它必须是非零值。对于基于字节的限制，存储桶的最小大小是给定速率的字节值，突发值会添加到该值，默认情况下为零字节。

每分钟允许来自一个ip的两个tcp连接
```text
table inet filter {
	chain output {
		type filter hook output priority filter; policy accept;
                tcp sport 80 meter ratemeter size 65535 { ip daddr timeout 5m limit rate over 200 kbytes/second burst 2 mbytes } drop
	}
}
```


给日志添加前缀
log prefix "Prefix: "

nftables的日志将输出到syslog, 如需将日志输出到文件, 需要配置rsyslog


```text [/etc/rsyslog.d/01-nftables.conf]
:msg,regex,"Invalid-Input: " -/var/log/nftables/invalid.log
:msg,regex,"New SSH connection: " -/var/log/nftables/ssh.log
```

`Invalid-Input: `和`New SSH connection: `是log定义的前缀, 创建2个日志文件, `/var/log/nftables/ssh.log`和`/var/log/nftables/invalid.log`,
在`/etc/logrotate.d/nftables`中管理日志

```text [/etc/logrotate.d/nftables]
/var/log/nftables/* { rotate 5 daily maxsize 50M missingok notifempty delaycompress compress postrotate invoke-rc.d rsyslog rotate > /dev/null endscript }
```

nftables实现nat

masquerade和snat的区别
1. masquerade自动使用出口网卡的ip, 如果出口网卡是动态ip, 使用masquerade更方便
2. snat将源ip设置成指定ip, 不用查找出口网卡的ip, 速度更快
3. masquerade在postrouting中使用, snat在prerouting和postrouting中都可以使用

dnat可以重写目标地址和端口

redirect特殊的dnat, 将数据重定向到本地端口

配置masquerade

```text
table inet filter {
	chain postrouting {
		type nat hook postrouting priority srcnat; policy accept;
                oifname "ens3" masquerade
        }
}
```

配置snat

```text
table inet filter {
	chain postrouting {
		type nat hook postrouting priority srcnat; policy accept;
                oifname "ens3" snat to 192.0.2.1
        }
}
```

配置dnat

```text
table inet filter {
	chain prerouting {
		type nat hook prerouting priority dstnat; policy accept;
                iifname ens3 tcp dport { 80, 443 } dnat to 192.0.2.1
        }
	chain postrouting {
		type nat hook postrouting priority srcnat; policy accept;
                oifname "ens3" masquerade
        }
}
```

配置redirect

```text
table inet filter {
	chain prerouting {
		type nat hook prerouting priority dstnat; policy accept;
                tcp dport 22 redirect to 2222
        }
}
```

nftables配置flowtable

flowtable基于快速路径功能的数据包加速机制
+ 使用连接跟踪来绕过典型的数据包转发路径
+ 避免通过绕过经典数据包处理来重新访问路表
+ 只可用于tcp和udp协议
+ 硬件独立软件快速路径

```text
table inet example-table {
    	flowtable example-flowtable {
     	   hook ingress priority filter
           devices = { enp1s0, enp7s0 }
    	}

    	chain example-forwardchain {
           type filter hook forward priority filter; policy accept;
           ct state established flow add @example-flowtable
    }
}
```

## UFW (Uncomplicated Firewall)
UFW 是一个简化的防火墙管理工具，主要用于 Ubuntu 和其他 Debian 系列发行版。它是 iptables 的前端，旨在让防火墙的管理变得更加容易。

#### UFW 的基本使用
- **启用和禁用 UFW**：
  ```bash
  sudo ufw enable
  sudo ufw disable
  ```
- **查看状态**：
  ```bash
  sudo ufw status
  ```
- **允许和拒绝端口**：
  ```bash
  sudo ufw allow 22/tcp
  sudo ufw deny 80/tcp
  ```

## firewalld

在 CentOS 中，默认的防火墙管理工具是 `firewalld`，它是一个动态管理防火墙的守护进程，提供了比 `iptables` 更加简化和现代化的界面。然而，`iptables` 也可以在 CentOS 中使用。

#### 使用 `firewalld`

`firewalld` 是 CentOS 7 及以后版本默认的防火墙管理工具。

##### 启动和停止 `firewalld`

启动 `firewalld` 服务：
```bash
sudo systemctl start firewalld
```

启用 `firewalld` 开机自启：
```bash
sudo systemctl enable firewalld
```

停止 `firewalld` 服务：
```bash
sudo systemctl stop firewalld
```

禁用 `firewalld` 开机自启：
```bash
sudo systemctl disable firewalld
```

##### 基本命令

查看 `firewalld` 状态：
```bash
sudo firewall-cmd --state
```

查看所有可用区域：
```bash
sudo firewall-cmd --get-zones
```

查看当前活动区域及其规则：
```bash
sudo firewall-cmd --get-active-zones
```

##### 配置防火墙规则

添加允许端口（例如允许 HTTP 端口 80）：
```bash
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
sudo firewall-cmd --reload
```

删除允许端口：
```bash
sudo firewall-cmd --zone=public --remove-port=80/tcp --permanent
sudo firewall-cmd --reload
```

允许某个服务（例如允许 SSH）：
```bash
sudo firewall-cmd --zone=public --add-service=ssh --permanent
sudo firewall-cmd --reload
```

##### 配置区域

将接口添加到区域：
```bash
sudo firewall-cmd --zone=public --add-interface=eth0 --permanent
sudo firewall-cmd --reload
```

更改默认区域：
```bash
sudo firewall-cmd --set-default-zone=public
```
