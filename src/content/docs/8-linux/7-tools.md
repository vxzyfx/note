---
title: linux 工具
---

## tcpdump

tcpdump虽然名称带有tcp, 但是它不只是用于tcp, 而是支持所有协议.

tcpdump参数

```txt
-l：使标准输出变为缓冲行形式；
-c：抓包次数；
-nn：直接以 IP 及 Port Number 显示，而非主机名与服务名称；
-s ：<数据包大小> 设置每个数据包的大小；
-i：指定监听的网络接口；
-r：从指定的文件中读取包；
-w：输出信息保存到指定文件；
-a：将网络地址和广播地址转变成名字；
-d：将匹配信息包的代码以人们能够理解的汇编格式给出；
-e：在输出行打印出数据链路层的头部信息；
-f：将外部的Internet地址以数字的形式打印出来；
-t：在输出的每一行不打印时间戳；
-v ：输出稍微详细的报文信息；--vv则输出更详细信息。

```

tcpdump 通过表达式过滤报文, 如果没有任何表达式, 将抓取所有的报文. 表达式支持的关键字

1. host

> 表示主机地址, host 192.168.1.1 表示抓取192.168.1.1的报文

2. net
> net 192.168.1.0/24 表示抓取192.168.1.0/24网段的报文

3. port
> port 80 表示抓取80端口的报文

4. dst
> dst 192.168.1.1 表示抓取192.168.1.1作为目的地的报文

5. src
> src 192.168.1.1 表示抓取192.168.1.1作为源地的报文

6. ip, ip6
> ip 表示抓取所有ip报文, ip6表示抓取所有ipv6报文

7. arp
> arp 表示抓取arp报文

8. tcp
> tcp 表示抓取tcp报文

9. udp
> udp 表示抓取udp报文

10. icmp
> icmp 表示抓取icmp报文

11. and
> and 表示与操作, 例如 host 192.168.1.1 and port 80 表示抓取192.168.1.1作为源地, 80端口的报文

12. or
> or 表示或操作, 例如 host 192.168.1.1 or port 80 表示抓取192.168.1.1作为源地, 80端口的报文或者 192.168.1.1作为目的地, 80端口的报文

13. !
> ! 表示非操作, 例如 !host 192.168.1.1 表示抓取不是192.168.1.1的报文

使用

```bash
tcpdump -i any # 抓取所有报文
```

```bash
tcpdump -i eth0 # 抓取eth0网卡报文
```

```bash
tcpdump -i eth0 -w /tmp/tcpdump.pcap # 抓取eth0网卡报文, 并保存到/tmp/tcpdump.pcap
```

```bash
tcpdump -r /tmp/tcpdump.pcap # 从/tmp/tcpdump.pcap文件中读取报文
```

```bash
tcpdump -ttttnnvvS # 详细输出
```

## iperf3


#### 服务器选项

- **-s, --server**
  启动 iPerf3 服务器模式。
  ```sh
  iperf3 -s
  ```

- **-B, --bind <host>**
  绑定到指定的接口。
  ```sh
  iperf3 -s -B 192.168.1.1
  ```

- **-D, --daemon**
  以守护进程模式运行服务器。
  ```sh
  iperf3 -s -D
  ```

- **-p, --port <port>**
  设置服务器端口（默认 5201）。
  ```sh
  iperf3 -s -p 5000
  ```

#### 客户端选项

- **-c, --client <host>**
  启动 iPerf3 客户端模式，连接到指定的服务器。
  ```sh
  iperf3 -c server_ip
  ```

- **-t, --time <time>**
  设置测试持续时间（秒），默认 10 秒。
  ```sh
  iperf3 -c server_ip -t 60
  ```

- **-P, --parallel <num>**
  设置并行客户端流的数量。
  ```sh
  iperf3 -c server_ip -P 4
  ```

- **-u, --udp**
  使用 UDP 而不是 TCP。
  ```sh
  iperf3 -c server_ip -u
  ```

- **-b, --bandwidth <bandwidth>**
  设置 UDP 流的目标带宽（例如，10M，1G），默认是 1 Mbit/sec。
  ```sh
  iperf3 -c server_ip -u -b 10M
  ```

- **-R, --reverse**
  以反向模式运行测试（服务器向客户端发送数据）。
  ```sh
  iperf3 -c server_ip -R
  ```

- **-i, --interval <interval>**
  设置周期性带宽报告的间隔。
  ```sh
  iperf3 -c server_ip -i 1
  ```

#### 报告选项

- **--get-server-output**
  检索并显示来自服务器的输出。
  ```sh
  iperf3 -c server_ip --get-server-output
  ```

- **--json**
  以 JSON 格式输出结果。
  ```sh
  iperf3 -c server_ip --json
  ```

- **--logfile <file>**
  将结果写入指定文件。
  ```sh
  iperf3 -c server_ip --logfile results.txt
  ```

#### 高级选项

- **-A, --affinity <affinity>**
  设置 CPU 亲和力（例如，1,3 表示 CPU 1 和 3）。
  ```sh
  iperf3 -c server_ip -A 1
  ```

- **-w, --window <window>**
  设置 TCP 窗口大小（例如，1M，512K）。
  ```sh
  iperf3 -c server_ip -w 512K
  ```

- **-M, --set-mss <mss>**
  设置 TCP 最大段大小。
  ```sh
  iperf3 -c server_ip -M 1400
  ```

- **--bidir**
  同时进行双向测试。
  ```sh
  iperf3 -c server_ip --bidir
  ```

- **-N, --nodelay**
  设置 TCP 无延迟，禁用 Nagle 算法。
  ```sh
  iperf3 -c server_ip -N
  ```

- **-V, --verbose**
  启用详细模式以获得更多详细输出。
  ```sh
  iperf3 -c server_ip -V
  ```

#### 安全选项

- **--username <username>**
  设置用于认证的用户名。
  ```sh
  iperf3 -c server_ip --username user
  ```

- **--rsa-private-key-path <path>**
  指定 RSA 私钥路径。
  ```sh
  iperf3 -c server_ip --rsa-private-key-path /path/to/key
  ```

服务端

```bash
iperf3 -s -p 5001 -i 1 -f m # 监听5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出
iperf3 -s -p 5001 -i 1 -f k # 监听5001端口, 输出每秒传输的带宽, 并以Kbps为单位输出
iperf3 -s -p 5001 -i 1 -f b # 监听5001端口, 输出每秒传输的带宽, 并以bps为单位输出
iperf3 -s -p 5001 -i 1 -f m -P 4 # 监听5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出, 并开启4个线程
iperf3 -s -p 5001 -i 1 -f m -P 4 -w 128k # 监听5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出, 并开启4个线程, 并设置窗口大小为128k
iperf3 -s -p 5001 -i 1 -f m -P 4 -w 128k -t 10 # 监听5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出, 并开启4个线程, 并设置窗口大小为128k, 并设置持续时间为10秒
iperf3 -s -p 5001 -i 1 -f m -P 4 -w 128k -t 10 -l 1000 # 监听5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出, 并开启4个线程, 并设置窗口大小为128k, 并设置持续时间为10秒, 并设置包大小为1000字节
```

客服端
```bash
iperf3 -c 192.168.1.1 -p 5001 -i 1 -t 10 # 连接到192.168.1.1的5001端口, 输出每秒传输的带宽, 并设置持续时间为10秒
iperf3 -c 192.168.1.1 -u -p 5001 -i 1 -t 10 # 通过udp连接到192.168.1.1的5001端口, 输出每秒传输的带宽, 并设置持续时间为10秒
iperf3 -c 192.168.1.1 -p 5001 -i 1 -f m -P 4 -w 128k -t 10 -l 1000 # 连接192.168.1.1的5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出, 并开启4个线程, 并设置窗口大小为128k, 并设置持续时间为10秒, 并设置包大小为1000字节
iperf3 -c 192.168.1.1 -p 5001 -i 1 -f m -P 4 -w 128k -t 10 -l 1000 -R # 连接192.168.1.1的5001端口, 输出每秒传输的带宽, 并以Mbps为单位输出, 并开启4个线程, 并设置窗口大小为128k, 并设置持续时间为10秒, 并设置包大小为1000字节, 并开启反向模式
```

