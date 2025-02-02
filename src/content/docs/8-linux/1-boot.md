---
title: 引导系统介绍
---

## 系统启动方式

BIOS (Basic Input/Output System) 和 EFI (Extensible Firmware Interface) 是计算机固件的两种类型。它们在计算机启动和操作系统加载过程中扮演着关键角色。

### BIOS

1. **历史背景**:
   - BIOS 是早期个人电脑使用的固件，最早由 IBM 在 1981 年引入。
   - 它是 IBM PC 兼容系统的标准，一直沿用至今。

2. **功能**:
   - 初始化和测试硬件组件（如内存、硬盘、光驱等）。
   - 查找并启动操作系统。
   - 提供基本的硬件抽象层，让操作系统与硬件设备进行交互。

3. **界面与操作**:
   - 通过键盘（通常是按下特定键如 DEL、F2、F12 等）进入 BIOS 设置界面。
   - 使用文本界面进行配置设置，如系统时钟、启动顺序、硬件配置等。

4. **局限性**:
   - 支持 16 位模式，内存寻址能力有限（1MB 以下）。
   - 启动时间较长，界面和功能较为原始。

### EFI/UEFI

1. **历史背景**:
   - EFI 是由 Intel 在 1998 年推出的，用于替代传统的 BIOS。
   - 后来演变成 UEFI（Unified Extensible Firmware Interface），并由 UEFI Forum 管理。

2. **功能**:
   - 提供更多现代计算机启动过程的灵活性和扩展能力。
   - 支持 32 位和 64 位模式，允许更大的内存寻址。
   - 内置网络功能和图形界面支持，能够直接从固件中启动操作系统。

3. **界面与操作**:
   - 通过键盘（通常是按下特定键如 DEL、F2、ESC 等）进入 UEFI 设置界面。
   - 提供图形用户界面（GUI），更加用户友好，支持鼠标操作。
   - 更强大的设置选项，包括安全启动、固件更新等。

4. **优势**:
   - 更快的启动速度，支持快速启动和安全启动功能。
   - 支持 GPT（GUID Partition Table），允许创建更多分区，支持大于 2TB 的硬盘。
   - 提供更高的安全性，通过数字签名验证启动程序和驱动程序。

#### 比较

- **启动速度**：UEFI 通常比 BIOS 更快。
- **内存和存储支持**：UEFI 支持更多的内存和更大的硬盘分区。
- **用户界面**：UEFI 提供图形用户界面，更加现代和易用。
- **安全性**：UEFI 提供更高的安全性，通过安全启动防止未授权的操作系统和固件运行。


## grub

GRUB（Grand Unified Bootloader）是一个用于启动操作系统的引导加载程序，主要用于GNU/Linux系统，但也可以引导其他操作系统。它是一个灵活而强大的多引导管理器，允许用户从不同的内核或操作系统中进行选择。以下是GRUB的一些关键特性和功能：

### GRUB的主要功能
1. **多操作系统支持**：
   - GRUB可以引导多种操作系统，包括Linux、Windows、BSD等。
   - 用户可以通过引导菜单选择要启动的操作系统。

2. **命令行界面**：
   - GRUB提供了一个命令行界面，用户可以在启动时进行手动控制和故障排除。
   - 支持自动完成和基本的文件系统命令。

3. **配置文件**：
   - GRUB的配置文件（通常是`grub.cfg`）用于定义启动菜单项和启动选项。
   - 配置文件语法简单，支持复杂的启动配置。

4. **引导修复**：
   - GRUB可以修复启动引导问题，比如修复损坏的引导记录。
   - 提供了救援模式，帮助用户在系统无法启动时进行修复。

5. **图形和文本界面**：
   - GRUB支持文本模式和图形模式引导菜单，用户可以自定义引导界面的外观。

6. **模块化设计**：
   - GRUB采用模块化设计，允许加载不同的模块以支持不同的文件系统和功能。
   - 可以根据需要添加或移除模块来优化启动过程。

### GRUB的版本
GRUB有两个主要版本：
1. **GRUB Legacy**：
   - 这是早期版本的GRUB，现在已经很少使用。
   - 配置文件为`menu.lst`或`grub.conf`。

2. **GRUB 2**：
   - 这是当前主流版本，具有更多的功能和更好的支持。
   - 配置文件为`grub.cfg`，并且使用`grub-mkconfig`工具生成。

### 安装和配置
1. **安装**：
   - 在大多数Linux发行版中，可以通过包管理器安装GRUB，如`apt-get install grub2`或`yum install grub2`。
   - 安装完成后，需要将GRUB安装到硬盘的主引导记录（MBR）或EFI分区。

2. **配置**：
   - 使用`grub-mkconfig`命令生成或更新GRUB配置文件。
   - 手动编辑`/etc/default/grub`文件来设置默认启动项和启动参数，然后运行`update-grub`更新配置。

3. **启动项管理**：
   - 可以通过`/etc/grub.d/`目录中的脚本添加、删除或修改启动项。
   - 使用`grub-customizer`等图形化工具进行更直观的配置管理。

### 常见问题和解决方法
1. **找不到操作系统**：
   - 确保操作系统分区未损坏，并且正确配置了启动项。
   - 使用GRUB命令行中的`ls`命令检查分区和文件系统。

2. **引导失败或进入救援模式**：
   - 使用GRUB的命令行手动引导系统，找出问题所在。
   - 可以尝试使用Live CD或其他工具修复GRUB引导。


## systemd-boot

systemd-boot使用systemd的一部分, 参考systemd的文档

[systemd-boot](/linux/service_manager#bootctl使用)

## uboot

U-Boot（Universal Boot Loader，通用引导加载程序）是一款开源、跨平台的引导加载程序，常用于嵌入式系统中，以初始化硬件并加载操作系统内核。以下是U-Boot的一些主要功能和特性：

1. **板级初始化：** U-Boot可以初始化各种硬件组件，如内存、存储、网络接口及其他外设。

2. **引导操作系统：** U-Boot能够加载各种操作系统，包括Linux、FreeBSD及其他自定义内核。

3. **引导配置：** 它允许配置引导参数和环境变量，以定制特定需求的引导过程。

4. **网络引导：** U-Boot支持使用TFTP、NFS和BOOTP等协议进行网络引导，这对无盘嵌入式系统非常有用。

5. **闪存支持：** 它可以读取和写入各种类型的闪存，非常适合依赖闪存存储的嵌入式设备。

6. **命令行界面：** U-Boot提供了一个强大的命令行界面（CLI），用户可以执行各种任务，如调试、测试和系统配置。

7. **可扩展性：** U-Boot高度模块化，可以通过添加自定义命令和功能进行扩展，以满足特定需求。

8. **设备树支持：** U-Boot支持使用设备树来描述系统的硬件布局，有助于代码的可移植性和维护。

#### 基本使用

以下是使用U-Boot引导嵌入式系统的典型步骤：

1. **编译：**
   - 使用特定板级配置来配置U-Boot。
   - 编译U-Boot以生成引导加载程序二进制文件。

   ```bash
   make <board_name>_defconfig
   make
   ```

2. **烧录：**
   - 将U-Boot二进制文件烧录到目标硬件上的适当存储设备（如NAND、NOR闪存或SD卡）。

3. **引导：**
   - 上电时，U-Boot会初始化硬件并显示命令提示符。
   - 使用U-Boot命令加载操作系统内核并引导它。

   ```bash
   bootm <kernel_address>
   ```

#### 示例命令

- **打印环境变量：**
  ```bash
  printenv
  ```

- **设置环境变量：**
  ```bash
  setenv bootcmd 'tftpboot 0x80000000 kernel.img; bootm 0x80000000'
  saveenv
  ```

- **通过TFTP加载内核：**
  ```bash
  tftpboot 0x80000000 kernel.img
  ```

- **引导内核：**
  ```bash
  bootm 0x80000000
  ```

#### 资源

- **官方U-Boot仓库：** [https://github.com/u-boot/u-boot](https://github.com/u-boot/u-boot)
- **文档：** U-Boot源码树中包含了大量文档，位于`doc`目录下。
- **社区：** U-Boot有一个活跃的邮件列表和社区，用于支持和开发讨论。
