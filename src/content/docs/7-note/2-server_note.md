---
title: 服务器使用笔记
---

## windows 服务器装linux

### 准备工作

> 下载最新的archlinux的iso镜像, 提取boot/x86_64下的vmlinuz-linux和initramfs-linux.img(或者直接去[ustc mirrors](https://mirrors.ustc.edu.cn/archlinux/iso/latest/arch/boot/x86_64/)下载), 放入C盘根目录

1. 下载EasyBCD软件
2. 打开EasyBCD添加NeoGrub引导
3. 编辑`C:\NST\menu.lst`

```txt [C:\NST\menu.lst]
title Install ArchLinux
root (hd0,0)
kernel /vmlinuz-linux archisolabel=archlinux
initrd /initramfs-linux.img
boot
```

4. 重启电脑等待进入shell(会报错)
5. 手动加载iso
```bash
mkdir /tmpmnt
mount -r -t ntfs /dev/sda1 /tmpmnt
modprobe loop
losetup /dev/loop6 /tmpmnt/archlinux.iso
ln -s /dev/loop6 /dev/disk/by-label/archlinux
exit
```
进入archlinux的安装

## debian 12安装远程桌面

### 1. 更新系统

首先，确保你的系统是最新的：

```sh
sudo apt update
sudo apt upgrade -y
```

### 2. 安装 Xrdp

安装 Xrdp 包：

```sh
sudo apt install xrdp -y
```

### 3. 安装桌面环境

如果你的 Debian 系统没有安装桌面环境，你需要安装一个。例如，安装 Xfce 桌面环境：

```sh
sudo apt install xfce4 xfce4-goodies -y
```

### 4. 配置 Xrdp 使用 Xfce

创建或编辑 `.xsession` 文件以使用 Xfce 作为桌面环境：

```sh
echo xfce4-session > ~/.xsession
```

设置 Xrdp 使用 Xfce：

```sh
sudo sed -i.bak '/^#.*XSession/ {s/#//; s/startwm\.sh/xfce4-session/}' /etc/xrdp/startwm.sh
```

### 5. 启动和启用 Xrdp 服务

启动 Xrdp 服务：

```sh
sudo systemctl start xrdp
```

设置 Xrdp 服务开机自启：

```sh
sudo systemctl enable xrdp
```

### 6. 配置防火墙

确保防火墙允许 RDP 连接（默认端口是 3389）：

```sh
sudo ufw allow 3389/tcp
```

### 7. 连接远程桌面

现在你可以使用任何 RDP 客户端（例如 Windows 自带的远程桌面连接或 Remmina 等）连接到你的 Debian 12 系统。输入 Debian 12 系统的 IP 地址和你的用户凭证进行登录。

### 注意事项

- 确保你使用的是一个稳定的网络连接，以获得最佳的远程桌面体验。
- 检查 Xrdp 的日志文件（位于 `/var/log/xrdp.log` 和 `/var/log/xrdp-sesman.log`），以便在出现问题时进行故障排除。

## 安装chrome

### 1. 下载 Google Chrome .deb 包

打开终端，使用 wget 命令从 Google 官方下载 Google Chrome 的 .deb 包：

```sh
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

### 2. 安装 Google Chrome

使用 dpkg 命令安装下载的 .deb 包：

```sh
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

### 3. 解决依赖问题

在安装过程中，如果有依赖错误，可以使用以下命令来修复：

```sh
sudo apt --fix-broken install
```

### 4. 启动 Google Chrome

安装完成后，可以通过以下命令启动 Google Chrome：

```sh
google-chrome
```

或者你可以在应用程序菜单中找到 Google Chrome 并点击启动。

### 5. 更新 Google Chrome

为了确保你安装的 Google Chrome 始终是最新版本，可以通过添加 Google 的存储库来自动更新。首先，创建一个新的源列表文件：

```sh
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
```

然后，添加 Google 的 GPG 密钥：

```sh
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
```

最后，更新软件包列表并升级 Google Chrome：

```sh
sudo apt update
sudo apt upgrade -y
```
### 一键安装桌面环境

```sh
#!/usr/bin/env bash

username=shug

sudo apt update
sudo apt install xrdp xfce4 xfce4-goodies -y
sudo useradd -m -s /bin/bash $username
sudo passwd $username
sudo su - anli -c 'echo xfce4-session > ~/.xsession'
sudo gpasswd -a $username sudo
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb -y
sudo systemctl start xrdp
```
