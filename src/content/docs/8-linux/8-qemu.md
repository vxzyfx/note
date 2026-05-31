---
title: 配置QEMU开发环境
description: 使用 QEMU、BusyBox、NFS 和 Linux 内核搭建本地实验环境的操作笔记。
---

> 操作提醒：本页是本地实验环境笔记，包含创建网桥、配置 NFS、写 `/etc/exports`、创建设备节点和启动虚拟机的命令。不要在生产主机直接复制执行；先确认路径、网段、导出目录和权限边界。

## 问题修复

如果已经安装了 ncurses 库, 还是提示安装 ncurses 库, 修改类似 `kconfig/lxdialog/check-lxdialog.c` 的文件

```c
int main() {}
```

改为

```c
int main() { return 0; }
```

## 编译内核

[下载地址](https://www.kernel.org/pub/)

编译 x86_64 的内核

```bash
make x86_64_defconfig
make
```

## 编译 busybox 的文件系统

[下载地址](https://www.busybox.net/downloads/)

勾选编译成静态文件

```bash
make menuconfig
make
make install
```

如果安装了 `ncurses` 库，还是提示错误，修改 `scripts/kconfig/lxdialog/Makefile` 注释 `always  := $(hostprogs-y) dochecklxdialog`

如果 `networking/tc.c` 编译报错，将 `networking/tc.c` 移出 `/networking` 目录

### 配置网络

> 影响范围：下面命令会在宿主机创建并启用 `br0` 网桥，还会添加 `192.168.1.1/24` 地址。执行前确认该网段没有和现有网络冲突。

```bash
sudo ip link add name br0 type bridge
sudo ip link set dev br0 up
sudo ip addr add 192.168.1.1/24 dev br0
```

## 安装 nfs

```bash
sudo apt install nfs-kernel-server
```

修改 nfs 配置文件

> 高风险：`no_root_squash` 会让客户端 root 保留 root 权限写入导出目录，仅适合隔离实验网络。生产环境应限制客户端地址并避免对可写目录使用该选项。

```txt [/etc/exports]
/nfsroot *(rw,sync,no_subtree_check,no_root_squash)
```

重新加载 nfs 配置

```bash
sudo exportfs -a
sudo systemctl restart nfs-kernel-server
```

## 修改 busybox 的配置

创建目录

> 影响范围：以下命令假定当前目录就是 BusyBox 安装后的 `nfsroot`。如果目录不对，会在错误位置创建系统目录。

```bash
mkdir etc dev mnt proc tmp sys
mkdir -p etc/init.d/
```

```txt [/nfsroot/etc/inittab]
::sysinit:/etc/init.d/rcS
::respawn:-/bin/sh
::askfirst:-/bin/sh
::shutdown:/bin/umount -a -r
```

```txt [/nfsroot/etc/init.d/rcS]
/bin/mount -a
mount -o remount,rw /
mkdir -p /dev/pts
mount -t devpts devpts /dev/pts
echo /sbin/mdev > /proc/sys/kernel/hotplug
mdev -s
```

```txt [nfsroot/etc/fstab]
proc  /proc proc  defaults 0 0
tmpfs  /tmp  tmpfs  defaults 0 0
none  /tmp  ramfs defaults 0 0
sysfs /sys  sysfs defaults 0 0
mdev  /dev  ramfs defaults 0 0
```

> 影响范围：`mknod` 和 `chmod` 会修改 NFS 根文件系统中的设备节点和脚本权限，需要 root 权限；确认 `/nfsroot` 是实验根目录。

```bash
mknod /nfsroot/dev/console c 5 1
mknod /nfsroot/dev/null c 1 3
mknod /nfsroot/dev/tty1 c 4 1
chmod +x /nfsroot/etc/inittab
chmod +x /nfsroot/etc/init.d/rcS
```

## 启动 QEMU

允许连接网桥

```txt [/etc/qemu/bridge.conf]
allow br0
```

> 前提条件：启动前需要已编译内核、准备好 `/nfsroot`、配置 NFS 导出、允许 QEMU 使用 `br0`，并确认该虚拟机网络只连接到授权实验网络。

```bash
qemu-system-x86_64 \
 -kernel ./arch/x86/boot/bzImage  \
 -append "root=/dev/nfs nfsroot=192.168.1.1:/nfsroot,vers=3,intr,nolock,rsize=1024,wsize=1024,tcp ip=192.168.1.10::192.168.1.1:255.255.255.0:clienthostname:eth0:off rw init=/linuxrc console=tty0 console=ttyS0"  \
 -nographic -netdev bridge,id=net0,br=br0 -device e1000,netdev=net0
```

创建 `resolv.conf` 配置文件

```txt [/etc/resolv.conf]
nameserver 1.1.1.1
```

## 内核的起始位置

x86_64 架构下, `0x100200`

## 参考资料

1. [QEMU System Emulation documentation](https://www.qemu.org/docs/master/system/)（访问日期：2026-05-31）
1. [Linux kernel documentation](https://docs.kernel.org/)（访问日期：2026-05-31）
1. [exports(5) Linux man page](https://man7.org/linux/man-pages/man5/exports.5.html)（访问日期：2026-05-31）
1. [ip-link(8) Linux man page](https://man7.org/linux/man-pages/man8/ip-link.8.html)（访问日期：2026-05-31）
