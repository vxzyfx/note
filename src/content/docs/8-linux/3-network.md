---
title: linux网络管理
---

## NetworkManager

NetworkManager 是一个开源的网络管理工具，旨在简化Linux和其他Unix类系统上的网络配置和管理。它提供了一个统一的接口来管理各种网络连接，包括有线网络、无线网络、移动宽带、VPN等。以下是NetworkManager的一些关键特性和常见用法：

#### 主要特性

1. **自动网络配置**：
   - NetworkManager能够自动检测并配置网络连接。当您连接到一个新网络时，它会自动处理配置细节，如IP地址、DNS服务器等。

2. **支持多种网络类型**：
   - 支持以太网（有线网络）、Wi-Fi（无线网络）、移动宽带（3G/4G）、蓝牙、VPN等多种类型的网络连接。

3. **用户友好的图形界面**：
   - NetworkManager附带了多个图形前端，如GNOME的nm-applet和KDE的plasma-nm，使用户可以方便地通过图形界面管理网络连接。

4. **命令行工具**：
   - 提供了nmcli和nmtui两个命令行工具，供在终端中进行网络配置和管理。

5. **配置文件管理**：
   - 支持通过配置文件管理网络连接设置，允许在不同的网络环境中快速切换配置。

#### 安装与启动

在大多数Linux发行版中，NetworkManager默认是预装的。如果没有，可以通过包管理器进行安装。例如，在Debian或Ubuntu系统上可以使用以下命令安装：

```bash
sudo apt-get install network-manager
```

在CentOS或Fedora系统上，可以使用：

```bash
sudo yum install NetworkManager
```

安装完成后，可以使用以下命令启动NetworkManager服务：

```bash
sudo systemctl start NetworkManager
sudo systemctl enable NetworkManager  # 开机自启动
```

#### 常用命令

##### nmcli
`nmcli` 是NetworkManager的命令行工具，用于管理网络连接。以下是一些常用命令：

- **显示网络状态**：
  ```bash
  nmcli general status
  ```

- **列出所有连接**：
  ```bash
  nmcli connection show
  ```

- **激活一个连接**：
  ```bash
  nmcli connection up <connection_name>
  ```

- **禁用一个连接**：
  ```bash
  nmcli connection down <connection_name>
  ```

- **连接到一个Wi-Fi网络**：
  ```bash
  nmcli device wifi connect <SSID> password <password>
  ```

##### nmtui
`nmtui` 是一个基于文本的用户界面，允许在终端中以图形方式管理网络连接。

- **启动nmtui**：
  ```bash
  nmtui
  ```

## Netplan

  Netplan 是一种网络配置工具，主要用于配置Ubuntu等基于Debian的系统上的网络。它使用YAML文件定义网络设置，并通过systemd-networkd或NetworkManager来应用这些设置。Netplan提供了一种简洁、统一的方式来管理网络配置。

#### Netplan 主要特性

1. **简单的YAML配置文件**：使用YAML文件来定义网络接口、IP地址、网关、DNS等配置。
2. **统一管理**：支持多种网络管理后台，包括systemd-networkd和NetworkManager。
3. **动态和静态配置**：支持动态（DHCP）和静态网络配置。
4. **支持多种网络类型**：包括以太网、有线网络、无线网络等。

#### Netplan 配置文件

Netplan 的配置文件位于 `/etc/netplan/` 目录下，通常命名为 `*.yaml` 文件。默认情况下，Ubuntu会创建一个默认的Netplan配置文件，例如 `/etc/netplan/01-netcfg.yaml`。

#### Netplan 配置示例

以下是一些常见的Netplan配置示例：

##### 1. 使用 DHCP 配置以太网接口

```yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: true
```

##### 2. 配置静态 IP 地址的以太网接口

```yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
```

##### 3. 配置无线网络（使用 WPA-PSK）

```yaml
network:
  version: 2
  wifis:
    wlan0:
      access-points:
        "MySSID":
          password: "mypassword"
      dhcp4: true
```

#### 应用配置

编辑完配置文件后，可以使用以下命令来应用配置：

```bash
sudo netplan apply
```

##### 验证配置

在应用配置之前，可以使用以下命令来验证配置文件的语法是否正确：

```bash
sudo netplan try
```

此命令将暂时应用配置，并在90秒后回滚，以防配置错误导致网络中断。

##### 常用命令

- **列出当前配置**：
  ```bash
  netplan show
  ```

- **生成配置文件（如果有变动）**：
  ```bash
  sudo netplan generate
  ```

## systemd-networkd

[转到systemd](/linux/service_manager#networkctl使用)

## ifupdown

`ifupdown` 是一个传统的 Linux 网络管理工具集，包含 `ifup` 和 `ifdown` 命令，用于启动和关闭网络接口。它们主要与 `/etc/network/interfaces` 文件配合使用，以定义和管理网络接口的配置。以下是关于 `ifupdown` 的详细介绍。

#### 安装 ifupdown

在大多数 Linux 发行版中，`ifupdown` 通常是预装的。如果没有，可以通过包管理器进行安装。例如，在 Debian 或 Ubuntu 系统上，可以使用以下命令进行安装：

```bash
sudo apt-get install ifupdown
```

#### /etc/network/interfaces 文件

`/etc/network/interfaces` 文件用于定义网络接口的配置。以下是一个示例配置文件：

```ini
# Loopback 网络接口
auto lo
iface lo inet loopback

# 以太网接口 eth0，使用 DHCP 配置
auto eth0
iface eth0 inet dhcp

# 以太网接口 eth1，使用静态 IP 配置
auto eth1
iface eth1 inet static
  address 192.168.1.100
  netmask 255.255.255.0
  gateway 192.168.1.1
  dns-nameservers 8.8.8.8 8.8.4.4
```

##### 关键字解释

- **auto**：指示系统在启动时自动启动指定的网络接口。
- **iface**：定义网络接口的配置。
  - **inet**：表示接口使用 IPv4 协议。
  - **dhcp**：表示接口通过 DHCP 获取 IP 地址。
  - **static**：表示接口使用静态 IP 地址。

#### ifup 和 ifdown 基本用法

##### ifup

`ifup` 命令用于启动并配置网络接口。它会读取 `/etc/network/interfaces` 文件中的配置，并应用到指定的网络接口。

```bash
# 启动指定接口
sudo ifup eth0

# 启动所有配置的接口
sudo ifup -a
```

##### ifdown

`ifdown` 命令用于关闭并取消配置网络接口。它会读取 `/etc/network/interfaces` 文件中的配置，并关闭指定的网络接口。

```bash
# 关闭指定接口
sudo ifdown eth0

# 关闭所有配置的接口
sudo ifdown -a
```

#### 高级配置示例

##### 配置多 IP 地址

一个接口可以配置多个 IP 地址：

```ini
auto eth0
iface eth0 inet static
  address 192.168.1.100
  netmask 255.255.255.0

iface eth0 inet static
  address 192.168.1.101
  netmask 255.255.255.0
```

##### 配置 VLAN

配置 VLAN 接口：

```ini
auto eth0.10
iface eth0.10 inet static
  address 192.168.10.1
  netmask 255.255.255.0
  vlan-raw-device eth0
```

##### 配置桥接

配置网络桥接：

```ini
auto br0
iface br0 inet static
  address 192.168.1.10
  netmask 255.255.255.0
  bridge_ports eth0 eth1
```

#### 使用 ifquery

`ifquery` 是 `ifupdown` 包的一部分，用于查询和调试接口配置。

```bash
# 显示接口配置
ifquery eth0

# 验证配置文件
ifquery --list
```

## wpa_supplicant

`wpa_supplicant` 是一个用户空间的网络工具，用于在 Linux 和其他操作系统上管理无线网络连接，特别是使用 WPA 和 WPA2 加密的无线网络。它可以与不同的无线工具和网络管理守护进程（如 `NetworkManager`）配合使用。以下是 `wpa_supplicant` 的安装、配置和使用方法。

#### 安装 wpa_supplicant

在大多数 Linux 发行版上，可以通过包管理器安装 `wpa_supplicant`。

##### 在 Debian/Ubuntu 系统上安装 wpa_supplicant

```bash
sudo apt-get update
sudo apt-get install wpasupplicant
```

##### 在 CentOS/RHEL 系统上安装 wpa_supplicant

```bash
sudo yum install wpa_supplicant
```

##### 在 Fedora 系统上安装 wpa_supplicant

```bash
sudo dnf install wpa_supplicant
```

##### 在 Arch Linux 系统上安装 wpa_supplicant

```bash
sudo pacman -S wpa_supplicant
```

#### 配置 wpa_supplicant

`wpa_supplicant` 使用配置文件 `/etc/wpa_supplicant/wpa_supplicant.conf` 来存储无线网络的配置信息。以下是一个示例配置文件：

```ini
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="YourNetworkSSID"
    psk="YourNetworkPassword"
    key_mgmt=WPA-PSK
}
```

##### 解释配置文件中的条目

- `ctrl_interface`：控制接口，用于与 `wpa_cli` 或其他管理工具通信。
- `update_config`：允许 `wpa_supplicant` 更新配置文件。
- `country`：设置国家代码。
- `network`：定义一个无线网络配置块。
  - `ssid`：无线网络的 SSID。
  - `psk`：无线网络的预共享密钥（密码）。
  - `key_mgmt`：密钥管理协议（例如 WPA-PSK）。

#### 使用 wpa_supplicant 连接无线网络

##### 1. 创建配置文件

首先，确保 `/etc/wpa_supplicant/wpa_supplicant.conf` 文件已正确配置。

##### 2. 启动 wpa_supplicant

使用以下命令启动 `wpa_supplicant` 并指定配置文件：

```bash
sudo wpa_supplicant -B -i <interface> -c /etc/wpa_supplicant/wpa_supplicant.conf
```

示例：

```bash
sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf
```

选项解释：
- `-B`：在后台运行 `wpa_supplicant`。
- `-i`：指定无线接口。
- `-c`：指定配置文件。

##### 3. 获取 IP 地址

使用 `dhclient` 获取 IP 地址：

```bash
sudo dhclient wlan0
```

#### 使用 wpa_cli 管理 wpa_supplicant

`wpa_cli` 是一个用于与 `wpa_supplicant` 交互的命令行工具。可以用它来动态管理无线网络连接。

##### 启动 wpa_cli

```bash
sudo wpa_cli
```

进入 `wpa_cli` 命令行后，可以使用以下命令：

##### 扫描无线网络

```bash
scan
scan_results
```

##### 连接到无线网络

添加一个新网络：

```bash
add_network
```

设置 SSID：

```bash
set_network 0 ssid "YourNetworkSSID"
```

设置 PSK：

```bash
set_network 0 psk "YourNetworkPassword"
```

启用网络：

```bash
enable_network 0
```

保存配置：

```bash
save_config
```

#### 使用 NetworkManager 配合 wpa_supplicant

`wpa_supplicant` 通常与 `NetworkManager` 一起使用，以提供更方便的网络管理功能。`NetworkManager` 会自动调用 `wpa_supplicant` 来处理无线网络连接。

##### 安装 NetworkManager

在 Debian/Ubuntu 系统上：

```bash
sudo apt-get install network-manager
```

在 CentOS/RHEL 系统上：

```bash
sudo yum install NetworkManager
```

在 Fedora 系统上：

```bash
sudo dnf install NetworkManager
```

在 Arch Linux 系统上：

```bash
sudo pacman -S networkmanager
```

##### 启用并启动 NetworkManager

```bash
sudo systemctl start NetworkManager
sudo systemctl enable NetworkManager
```

##### 使用 nmcli 连接无线网络

`nmcli` 是 `NetworkManager` 的命令行工具，用于配置和管理网络连接。

##### 查看可用网络

```bash
nmcli device wifi list
```

##### 连接到无线网络

```bash
nmcli device wifi connect <SSID> password <password>
```

示例：

```bash
nmcli device wifi connect YourNetworkSSID password YourNetworkPassword
```

##### 查看当前连接状态

```bash
nmcli connection show
```


## iwd

`iwd`（iNet wireless daemon）是一个用于管理无线网络连接的现代工具。`iwd` 是由 Intel 开发的，它的目标是提供更简洁、高效和现代化的无线网络管理。`iwd` 通常用于替代传统的 `wpa_supplicant`。以下是关于 `iwd` 的安装、配置和使用的一些基本介绍。

#### 安装 iwd

在大多数 Linux 发行版上，可以通过包管理器安装 `iwd`。

##### 在 Debian/Ubuntu 系统上安装 `iwd`

```bash
sudo apt-get update
sudo apt-get install iwd
```

##### 在 CentOS/RHEL 系统上安装 `iwd`

```bash
sudo yum install iwd
```

##### 在 Fedora 系统上安装 `iwd`

```bash
sudo dnf install iwd
```

##### 在 Arch Linux 系统上安装 `iwd`

```bash
sudo pacman -S iwd
```

#### 启动和启用 iwd

安装完成后，需要启动 `iwd` 服务并设置开机自启动。

```bash
sudo systemctl start iwd
sudo systemctl enable iwd
```

#### 配置 iwd

`iwd` 的配置文件通常位于 `/etc/iwd` 目录下。创建或编辑配置文件 `main.conf`：

```bash
sudo nano /etc/iwd/main.conf
```

在文件中添加以下内容（根据需要修改）：

```ini
[General]
EnableNetworkConfiguration=true

[Network]
NameResolvingService=systemd
```

#### 使用 iwd 进行 WiFi 管理

`iwd` 提供了一个命令行工具 `iwctl`，用于管理无线网络连接。

##### 进入 iwctl 命令行

```bash
sudo iwctl
```

在 `iwctl` 命令行中，可以使用以下命令管理 WiFi 连接：

##### 扫描可用网络

```bash
device list
station <device_name> scan
station <device_name> get-networks
```

例如：

```bash
device list
station wlan0 scan
station wlan0 get-networks
```

##### 连接到 WiFi 网络

```bash
station <device_name> connect <SSID>
```

例如：

```bash
station wlan0 connect MySSID
```

连接时，系统可能会提示您输入 WiFi 密码。

##### 断开连接

```bash
station <device_name> disconnect
```

例如：

```bash
station wlan0 disconnect
```

##### 显示当前连接状态

```bash
station <device_name> show
```

例如：

```bash
station wlan0 show
```

##### 列出已保存的网络

```bash
known-networks list
```

##### 删除已保存的网络

```bash
known-networks remove <SSID>
```

## dns管理工具

### 直接修改

您可以使用文本编辑器直接编辑 `/etc/resolv.conf` 文件来配置 DNS 服务器。以下是一个示例文件：

```ini
# /etc/resolv.conf 文件示例

# 使用 Google 的公共 DNS 服务器
nameserver 8.8.8.8
nameserver 8.8.4.4

# 使用 Cloudflare 的公共 DNS 服务器
nameserver 1.1.1.1
nameserver 1.0.0.1

# 设置搜索域
search example.com
```

使用 `nano` 或 `vim` 编辑文件：

```bash
sudo nano /etc/resolv.conf
# 或者
sudo vim /etc/resolv.conf
```

在某些情况下，系统或网络管理工具可能会覆盖 `/etc/resolv.conf` 文件。可以通过以下方法防止文件被覆盖：

**设置不可变属性**：

```bash
sudo chattr +i /etc/resolv.conf
```

使用 `lsattr` 命令查看文件属性：

```bash
lsattr /etc/resolv.conf
```

要取消不可变属性，可以使用以下命令：

```bash
sudo chattr -i /etc/resolv.conf
```

### systemd-resolved

[systemd](/linux/service_manager#resolvectl使用)

1. **启用并启动 systemd-resolved**：

```bash
sudo systemctl enable systemd-resolved
sudo systemctl start systemd-resolved
```

2. **链接 /etc/resolv.conf 到 systemd-resolved**：

确保 `/etc/resolv.conf` 链接到 `systemd-resolved` 的生成文件：

```bash
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
```

### resolvconf


在一些系统上，`/etc/resolv.conf` 文件可能由 `resolvconf` 工具动态管理。`resolvconf` 会根据不同的网络配置自动生成该文件。要使用 `resolvconf` 管理 DNS 配置，可以按照以下步骤操作：

1. **安装 resolvconf**：

```bash
sudo apt-get install resolvconf
```

2. **配置网络接口**：

在 `/etc/network/interfaces` 文件中添加 DNS 服务器配置：

```ini
# /etc/network/interfaces 文件示例

auto eth0
iface eth0 inet dhcp
  dns-nameservers 8.8.8.8 8.8.4.4
  dns-search example.com
```

3. **启用并启动 resolvconf**：

```bash
sudo systemctl enable resolvconf
sudo systemctl start resolvconf
```

4. **更新 resolvconf**：

```bash
sudo resolvconf -u
```

## 命令行管理工具

### ifconfig

`ifconfig` 是一个传统的网络管理工具，用于配置、管理和查询 Linux 系统上的网络接口。虽然在许多现代系统中已经被 `ip` 命令取代，但 `ifconfig` 仍然在许多系统中可用，并且在某些情况下仍然非常有用。以下是 `ifconfig` 的一些基本用法和示例。

#### 安装 ifconfig

在一些 Linux 发行版中，`ifconfig` 可能未默认安装，可以通过包管理器进行安装。例如，在 Debian 或 Ubuntu 系统上，可以使用以下命令：

```bash
sudo apt-get install net-tools
```

#### ifconfig 基本用法

##### 查看网络接口状态

显示所有网络接口及其当前状态：

```bash
ifconfig
```

显示特定网络接口的状态：

```bash
ifconfig eth0
```

##### 配置 IP 地址

为网络接口配置静态 IP 地址：

```bash
sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0
```

##### 启用或禁用网络接口

启用网络接口：

```bash
sudo ifconfig eth0 up
```

禁用网络接口：

```bash
sudo ifconfig eth0 down
```

##### 配置网络接口的广播地址和子网掩码

配置广播地址：

```bash
sudo ifconfig eth0 broadcast 192.168.1.255
```

配置子网掩码：

```bash
sudo ifconfig eth0 netmask 255.255.255.0
```

##### 配置多 IP 地址

为一个接口配置多个 IP 地址：

```bash
sudo ifconfig eth0:0 192.168.1.101 netmask 255.255.255.0
sudo ifconfig eth0:1 192.168.1.102 netmask 255.255.255.0
```

##### 查看和配置 MAC 地址

查看网络接口的 MAC 地址：

```bash
ifconfig eth0
```

更改网络接口的 MAC 地址：

```bash
sudo ifconfig eth0 hw ether 00:11:22:33:44:55
```

##### 清空 IP 配置

清除网络接口上的 IP 地址：

```bash
sudo ifconfig eth0 0.0.0.0
```

#### 示例

1. **查看所有网络接口信息**

```bash
ifconfig
```

输出示例：

```
eth0      Link encap:Ethernet  HWaddr 00:0c:29:68:8c:35
          inet addr:192.168.1.100  Bcast:192.168.1.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:123456 errors:0 dropped:0 overruns:0 frame:0
          TX packets:123456 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:12345678 (12.3 MB)  TX bytes:12345678 (12.3 MB)
```

2. **为 eth0 配置静态 IP 地址**

```bash
sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0
```

3. **启用和禁用网络接口 eth0**

启用：

```bash
sudo ifconfig eth0 up
```

禁用：

```bash
sudo ifconfig eth0 down
```

4. **为 eth0 配置广播地址**

```bash
sudo ifconfig eth0 broadcast 192.168.1.255
```

5. **更改 eth0 的 MAC 地址**

```bash
sudo ifconfig eth0 hw ether 00:11:22:33:44:55
```

### route

`route` 命令是一个传统的网络路由管理工具，用于查看和配置Linux系统中的IP路由表。虽然现代系统中通常使用 `ip route` 命令来替代 `route` 命令，但在一些系统中，`route` 仍然是一个有用的工具。以下是 `route` 命令的一些基本用法和示例。

安装命令
```bash
sudo apt-get install net-tools
sudo yum install net-tools
```

#### 查看当前路由表

```bash
route -n
```

选项解释：
- `-n`：以数字形式显示地址而不是尝试解析主机名。

#### 添加静态路由

##### 添加到特定网络的静态路由

```bash
sudo route add -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.1.1
```

选项解释：
- `-net`：表示目标是一个网络。
- `192.168.2.0`：目标网络地址。
- `netmask 255.255.255.0`：子网掩码。
- `gw 192.168.1.1`：网关地址。

##### 添加到特定主机的静态路由

```bash
sudo route add -host 192.168.2.10 gw 192.168.1.1
```

选项解释：
- `-host`：表示目标是一个主机。
- `192.168.2.10`：目标主机地址。
- `gw 192.168.1.1`：网关地址。

#### 删除静态路由

##### 删除到特定网络的静态路由

```bash
sudo route del -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.1.1
```

##### 删除到特定主机的静态路由

```bash
sudo route del -host 192.168.2.10 gw 192.168.1.1
```

#### 设置默认网关

```bash
sudo route add default gw 192.168.1.1
```

#### 示例

##### 查看路由表示例

```bash
route -n
```

输出示例：

```
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    0      0        0 eth0
192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0
```

##### 添加和删除静态路由示例

1. **添加到网络 `192.168.2.0/24` 的静态路由**

```bash
sudo route add -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.1.1
```

2. **添加到主机 `192.168.2.10` 的静态路由**

```bash
sudo route add -host 192.168.2.10 gw 192.168.1.1
```

3. **删除到网络 `192.168.2.0/24` 的静态路由**

```bash
sudo route del -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.1.1
```

4. **删除到主机 `192.168.2.10` 的静态路由**

```bash
sudo route del -host 192.168.2.10 gw 192.168.1.1
```

##### 设置默认网关示例

```bash
sudo route add default gw 192.168.1.1
```

#### 使用 `ip route` 替代 `route`

现代 Linux 系统中，`ip route` 命令通常替代 `route` 命令使用。以下是 `ip route` 命令的基本用法示例：

##### 查看路由表

```bash
ip route show
```

##### 添加静态路由

```bash
sudo ip route add 192.168.2.0/24 via 192.168.1.1
```

##### 删除静态路由

```bash
sudo ip route del 192.168.2.0/24
```

##### 设置默认网关

```bash
sudo ip route add default via 192.168.1.1
```

### ip

`ip` 命令是一个现代化且功能强大的网络管理工具，用于配置和查看网络接口、路由、隧道等。`ip` 命令取代了传统的 `ifconfig` 和 `route` 命令，并提供了更丰富的功能。以下是 `ip` 命令的一些基本用法和示例：

安装命令
```bash
sudo apt-get install iproute2
sudo yum install iproute
```

##### 查看所有网络接口

```bash
ip addr show
```

或简写：

```bash
ip a
```

##### 查看特定网络接口

```bash
ip addr show dev eth0
```

#### 配置网络接口

##### 分配 IP 地址

为网络接口 `eth0` 分配静态 IP 地址：

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

##### 删除 IP 地址

从网络接口 `eth0` 删除 IP 地址：

```bash
sudo ip addr del 192.168.1.100/24 dev eth0
```

##### 启用或禁用网络接口

启用网络接口 `eth0`：

```bash
sudo ip link set eth0 up
```

禁用网络接口 `eth0`：

```bash
sudo ip link set eth0 down
```

##### 配置 MTU

设置网络接口 `eth0` 的最大传输单元 (MTU)：

```bash
sudo ip link set eth0 mtu 1400
```

#### 查看和配置路由

##### 查看路由表

```bash
ip route show
```

或简写：

```bash
ip r
```

##### 添加静态路由

添加到目标网络 `192.168.2.0/24` 的静态路由，通过网关 `192.168.1.1`：

```bash
sudo ip route add 192.168.2.0/24 via 192.168.1.1
```

##### 删除静态路由

删除到目标网络 `192.168.2.0/24` 的静态路由：

```bash
sudo ip route del 192.168.2.0/24
```

#### 查看和配置邻居 (ARP) 表

##### 查看邻居表

```bash
ip neigh show
```

或简写：

```bash
ip n
```

##### 添加邻居 (ARP) 表项

为 IP 地址 `192.168.1.2` 添加一个静态 ARP 表项，MAC 地址为 `00:11:22:33:44:55`：

```bash
sudo ip neigh add 192.168.1.2 lladdr 00:11:22:33:44:55 dev eth0
```

##### 删除邻居 (ARP) 表项

删除 IP 地址 `192.168.1.2` 的 ARP 表项：

```bash
sudo ip neigh del 192.168.1.2 dev eth0
```

#### 创建和删除网络设备

##### 创建虚拟以太网设备 (veth)

创建一对虚拟以太网设备 `veth0` 和 `veth1`：

```bash
sudo ip link add veth0 type veth peer name veth1
```

##### 删除虚拟以太网设备

删除虚拟以太网设备 `veth0` 和 `veth1`：

```bash
sudo ip link del veth0
```

#### 配置网络命名空间

##### 创建网络命名空间

创建网络命名空间 `ns1`：

```bash
sudo ip netns add ns1
```

##### 删除网络命名空间

删除网络命名空间 `ns1`：

```bash
sudo ip netns del ns1
```

##### 在网络命名空间中执行命令

在网络命名空间 `ns1` 中运行 `ip` 命令查看接口：

```bash
sudo ip netns exec ns1 ip addr show
```

### netstat

`netstat` 是一个用于显示网络连接、路由表、接口统计信息等的命令行工具。尽管在现代系统中，`ss` 和 `ip` 命令更为常用，但 `netstat` 仍然在许多场景下非常有用。以下是 `netstat` 命令的一些基本用法和示例。

#### 安装 net-tools

在某些系统中，`netstat` 可能未默认安装，可以通过安装 `net-tools` 包来获取该工具。例如，在 Debian 或 Ubuntu 系统上，可以使用以下命令进行安装：

```bash
sudo apt-get install net-tools
```

#### 基本用法和选项

##### 查看所有网络连接

```bash
netstat -a
```

##### 查看所有监听的端口

```bash
netstat -l
```

##### 查看所有 TCP 连接

```bash
netstat -t
```

##### 查看所有 UDP 连接

```bash
netstat -u
```

##### 查看所有 UNIX 套接字

```bash
netstat -x
```

#### 高级用法和示例

##### 查看详细的网络连接信息

```bash
netstat -v
```

##### 查看网络接口的统计信息

```bash
netstat -i
```

##### 查看路由表

```bash
netstat -r
```

##### 显示网络连接和进程信息

```bash
netstat -p
```

##### 持续更新网络连接信息

```bash
netstat -c
```

#### 组合选项

您可以组合多个选项来获取更详细的信息。例如，查看所有 TCP 连接及其对应的进程信息：

```bash
netstat -tp
```

#### 常用选项总结

- `-a`：显示所有网络连接，包括监听和非监听。
- `-l`：只显示监听的套接字。
- `-t`：显示 TCP 连接。
- `-u`：显示 UDP 连接。
- `-x`：显示 UNIX 套接字。
- `-v`：显示详细信息。
- `-i`：显示网络接口统计信息。
- `-r`：显示路由表。
- `-p`：显示进程信息。
- `-c`：持续更新显示。

#### 示例总结

1. **查看所有网络连接**：

```bash
netstat -a
```

2. **查看所有监听的端口**：

```bash
netstat -l
```

3. **查看所有 TCP 连接**：

```bash
netstat -t
```

4. **查看所有 UDP 连接**：

```bash
netstat -u
```

5. **查看路由表**：

```bash
netstat -r
```

6. **查看网络接口的统计信息**：

```bash
netstat -i
```

7. **查看所有网络连接及其对应的进程信息**：

```bash
netstat -p
```

8. **持续更新网络连接信息**：

```bash
netstat -c
```

#### 现代替代工具

尽管 `netstat` 仍然有用，但在现代 Linux 系统中，推荐使用以下工具：

1. **ss**：用于显示套接字统计信息，是 `netstat` 的现代替代品。

```bash
ss -a
```

2. **ip**：用于管理网络接口和路由，是 `ifconfig` 和 `route` 的现代替代品。

```bash
ip addr show
ip route show
```

### ss

`ss` 命令是一个强大的网络实用程序，用于显示套接字统计信息。它是 `netstat` 命令的现代替代品，速度更快，功能更强大。`ss` 可以显示 TCP、UDP、UNIX 套接字的详细信息，帮助管理员诊断网络问题和监控网络活动。

安装命令
```bash
sudo apt-get install iproute2
sudo yum install iproute
```

#### 基本用法和示例

##### 查看所有连接

```bash
ss -a
```

##### 查看所有监听套接字

```bash
ss -l
```

##### 查看所有 TCP 连接

```bash
ss -t
```

##### 查看所有 UDP 连接

```bash
ss -u
```

##### 查看所有 UNIX 套接字

```bash
ss -x
```

#### 高级用法和示例

##### 查看详细信息

使用 `-e` 选项可以查看详细信息，例如套接字的内存使用情况等。

```bash
ss -e
```

##### 查看进程相关信息

使用 `-p` 选项可以显示与每个套接字关联的进程。

```bash
ss -p
```

##### 查看特定状态的连接

查看所有处于 `ESTABLISHED` 状态的 TCP 连接：

```bash
ss -t state established
```

查看所有处于 `LISTEN` 状态的 TCP 连接：

```bash
ss -t state listen
```

##### 按端口过滤

查看所有连接到特定端口的连接，例如端口 80：

```bash
ss -t sport = :80
ss -t dport = :80
```

##### 显示摘要统计信息

使用 `-s` 选项显示所有套接字的摘要统计信息。

```bash
ss -s
```

##### 查看网络命名空间中的套接字

使用 `-N` 选项可以查看特定网络命名空间中的套接字。

```bash
sudo ss -N /var/run/netns/mynamespace
```

#### 组合选项

您可以组合多个选项来获取更精确的信息。例如，查看所有与端口 22 相关的监听套接字，并显示进程信息：

```bash
ss -tlp sport = :22
```

#### 常用选项总结

- `-a`：显示所有套接字，包括监听和非监听。
- `-l`：只显示监听套接字。
- `-t`：显示 TCP 套接字。
- `-u`：显示 UDP 套接字。
- `-x`：显示 UNIX 套接字。
- `-e`：显示详细信息。
- `-p`：显示进程信息。
- `-s`：显示摘要统计信息。
- `-N`：查看特定网络命名空间中的套接字。

#### 示例总结

1. **查看所有 TCP 连接**：

```bash
ss -t
```

2. **查看所有监听的 TCP 套接字**：

```bash
ss -tl
```

3. **查看所有 UDP 连接**：

```bash
ss -u
```

4. **查看所有连接的详细信息**：

```bash
ss -e
```

5. **查看所有连接及其关联的进程**：

```bash
ss -p
```

6. **查看所有处于 ESTABLISHED 状态的 TCP 连接**：

```bash
ss -t state established
```

7. **查看端口 80 的所有连接**：

```bash
ss -t sport = :80
```

8. **显示套接字的摘要统计信息**：

```bash
ss -s
```