---
title: 配置QEMU开发环境
---

## 问题修复

如果已经安装了ncurses库, 还是提示安装ncurses库, 修改类似`kconfig/lxdialog/check-lxdialog.c`的文件

```c
int main() {}
```

改为

```c
int main() { return 0; }
```

## 编译内核

[下载地址](https://www.kernel.org/pub/)

编译x86_64的内核

```bash
make x86_64_defconfig
make
```

## 编译busybox的文件系统

[下载地址](https://www.busybox.net/downloads/)

勾选编译成静态文件

```bash
make menuconfig
make
make install
```

如果安装了`ncurses`库，还是提示错误，修改`scripts/kconfig/lxdialog/Makefile`注释`always  := $(hostprogs-y) dochecklxdialog`

如果`networking/tc.c`编译报错，将`networking/tc.c`移出`/networking`目录

### 配置网络

```bash
sudo ip link add name br0 type bridge
sudo ip link set dev br0 up
sudo ip addr add 192.168.1.1/24 dev br0
```

## 安装nfs

```bash
apt install nfs-kernel-server
```

修改nfs配置文件

```txt [/etc/exports]
/nfsroot *(rw,sync,no_subtree_check,no_root_squash)
```

重新加载nfs配置

```bash
sudo exportfs -a
sudo systemctl restart nfs-kernel-server
```

## 修改busybox的配置

创建目录

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

```bash
mknod /nfsroot/dev/console c 5 1
mknod /nfsroot/dev/null c 1 3
mknod /nfsroot/dev/tty1 c 4 1
chmod +x /nfsroot/etc/inittab
chmod +x /nfsroot/etc/init.d/rcS
```

## 启动QEMU

允许连接网桥

```txt [/etc/qemu/bridge.conf]
allow br0
```

```bash
qemu-system-x86_64 \
 -kernel ./arch/x86/boot/bzImage  \
 -append "root=/dev/nfs nfsroot=192.168.1.1:/nfsroot,vers=3,intr,nolock,rsize=1024,wsize=1024,tcp ip=192.168.1.10::192.168.1.1:255.255.255.0:clienthostname:eth0:off rw init=/linuxrc console=tty0 console=ttyS0"  \
 --nographic -netdev bridge,id=net0,br=br0 -device e1000,netdev=net0
```

创建`resolv.conf`配置文件

```txt [/etc/resolv.conf]
nameserver 1.1.1.1
```

## 内核的起始位置

x86_64架构下, `0x100200`
