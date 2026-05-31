---
title: 服务器使用笔记
description: 服务器安装、远程桌面和软件仓库配置命令的安全边界说明。
---

## Windows 服务器装 Linux

> 待核验：以下 EasyBCD/NeoGrub 启动方式依赖具体 Windows 磁盘布局和引导模式，未在本任务中找到当前官方来源。执行前应确认机器是固件启动模式、磁盘分区号和 ISO 标签，避免破坏现有引导。

### 准备工作

下载 Arch Linux ISO 镜像，提取 `boot/x86_64` 下的 `vmlinuz-linux` 和 `initramfs-linux.img`，或从可信镜像站下载对应文件，放入 `C:\` 根目录。

1. 下载 EasyBCD 软件。
2. 打开 EasyBCD 添加 NeoGrub 引导。
3. 编辑 `C:\NST\menu.lst`。

```txt [C:\NST\menu.lst]
title Install ArchLinux
root (hd0,0)
kernel /vmlinuz-linux archisolabel=archlinux
initrd /initramfs-linux.img
boot
```

1. 重启电脑等待进入 shell。
2. 手动加载 ISO。

> 警告：`mount`、`losetup` 和修改 `/dev/disk/by-label` 会改变当前安装环境的块设备视图。执行前确认 `/dev/sda1`、ISO 文件名和 loop 设备未被占用；不要在生产磁盘上试错。

```bash
mkdir /tmpmnt
mount -r -t ntfs /dev/sda1 /tmpmnt
modprobe loop
losetup /dev/loop6 /tmpmnt/archlinux.iso
ln -s /dev/loop6 /dev/disk/by-label/archlinux
exit
```

进入 Arch Linux 安装流程后，以 Arch 官方 Installation guide 为准继续分区、联网和安装。

## Debian 12 安装远程桌面

### 1. 更新系统

> 警告：`apt upgrade -y` 会升级系统包，可能重启服务或改变远程连接行为。远程服务器执行前应确认有控制台或快照回滚方式。

```sh
sudo apt update
sudo apt upgrade -y
```

### 2. 安装远程桌面服务

> 警告：安装并启动远程桌面服务会新增远程登录入口。开放公网访问前应设置强密码、限制来源 IP，并优先使用 VPN 或堡垒机。

```sh
sudo apt install xrdp -y
```

### 3. 安装桌面环境

如果 Debian 系统没有安装桌面环境，可以安装 Xfce：

```sh
sudo apt install xfce4 xfce4-goodies -y
```

### 4. 配置远程桌面服务使用 Xfce

创建或编辑 `.xsession` 文件以使用 Xfce 作为桌面环境：

```sh
echo xfce4-session > ~/.xsession
```

> 警告：下面命令会原地修改 `/etc/xrdp/startwm.sh` 并保留 `.bak` 备份。执行前先查看目标文件内容，确认正则匹配符合当前版本。

```sh
sudo sed -i.bak '/^#.*XSession/ {s/#//; s/startwm\.sh/xfce4-session/}' /etc/xrdp/startwm.sh
```

### 5. 启动和启用远程桌面服务服务

> 警告：`systemctl start/enable` 会启动服务并设置开机自启。确认远程桌面服务配置和认证方式正确后再启用。

```sh
sudo systemctl start xrdp
sudo systemctl enable xrdp
```

### 6. 配置防火墙

> 警告：`ufw allow 3389/tcp` 会允许 RDP 端口入站访问；如果服务器在公网，建议只允许可信来源地址段，而不是向全网开放。

```sh
sudo ufw allow 3389/tcp
```

### 7. 连接远程桌面

使用 RDP 客户端连接 Debian 12 系统。输入服务器 IP 地址和用户凭据前，先确认防火墙只暴露给可信来源。

### 注意事项

- 确保网络连接稳定。
- 检查远程桌面服务日志文件 `/var/log/xrdp.log` 和 `/var/log/xrdp-sesman.log` 进行故障排除。

## 安装 Chrome

### 1. 下载 Google Chrome `.deb` 包

```sh
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

### 2. 安装 Google Chrome

> 警告：`dpkg -i` 会安装本地软件包并可能新增 Google Chrome 的系统集成文件。确认下载来源和包名后再执行。

```sh
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

### 3. 解决依赖问题

```sh
sudo apt --fix-broken install
```

### 4. 启动 Google Chrome

```sh
google-chrome
```

也可以从应用程序菜单启动。

### 5. 更新 Google Chrome

> 警告：`apt-key` 已过时，不要再使用 `wget ... | sudo apt-key add -`。应把签名密钥放入 `/etc/apt/keyrings/`，并在源列表中使用 `signed-by` 限定该仓库。

```sh
sudo install -d -m 0755 /etc/apt/keyrings
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /etc/apt/keyrings/google-linux-signing-key.gpg
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google-linux-signing-key.gpg] https://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update
sudo apt upgrade -y
```

### 一键安装桌面环境

> 警告：该脚本会升级系统、安装软件、创建用户、修改 sudo 组、启动远程桌面服务，并下载 Chrome 安装包。执行前修改 `username`，确认是在新机器或已备份环境中运行；不要在未知生产服务器上直接粘贴执行。

```sh
#!/usr/bin/env bash

username=shug

sudo apt update
sudo apt install xrdp xfce4 xfce4-goodies -y
sudo useradd -m -s /bin/bash "$username"
sudo passwd "$username"
sudo su - "$username" -c 'echo xfce4-session > ~/.xsession'
sudo gpasswd -a "$username" sudo
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb -y
sudo systemctl start xrdp
```

## 参考资料

1. [Arch Linux Installation guide](https://wiki.archlinux.org/title/Installation_guide)（访问日期：2026-05-31）
2. [systemctl - systemd manual](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)（访问日期：2026-05-31）
3. [ufw(8) - Ubuntu manpage](https://manpages.ubuntu.com/manpages/noble/en/man8/ufw.8.html)（访问日期：2026-05-31）
4. [Google Linux Software Repositories](https://www.google.com/linuxrepositories/)（访问日期：2026-05-31）
5. [Debian apt-key(8)](https://manpages.debian.org/bookworm/apt/apt-key.8.en.html)（访问日期：2026-05-31）
