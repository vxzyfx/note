---
title: 系统服务管理
---

## init

init（Initialization）脚本系统是一种传统的服务和进程管理方式，主要用于 Unix 和类 Unix 操作系统。它负责系统启动过程中的初始化任务和服务管理。init 系统在系统启动时执行一系列预定义的脚本，启动必要的服务和进程，并根据系统的运行级别（runlevel）来管理这些服务和进程。

### init 脚本系统的主要概念和功能

#### 运行级别（Runlevel）

运行级别是 init 系统用来定义系统状态和服务集合的一种机制。不同的运行级别对应不同的系统状态和启动的服务。常见的运行级别包括：

- `0`：关机（Shutdown）
- `1`：单用户模式（Single-user mode）
- `2`：多用户模式，无网络（Multi-user mode without networking）
- `3`：多用户模式，有网络（Multi-user mode with networking）
- `4`：用户自定义（Unused/User-definable）
- `5`：多用户模式，有网络和图形界面（Multi-user mode with networking and GUI）
- `6`：重启（Reboot）

系统启动时，init 会根据配置文件（通常是 `/etc/inittab`）中定义的默认运行级别来确定启动哪些服务。

#### init 脚本

init 脚本通常存放在 `/etc/init.d` 目录下。每个脚本对应一个服务，并包含启动、停止、重启和检查服务状态的命令。这些脚本通常使用 shell 脚本编写，并遵循一定的规范，以便 init 系统能够正确调用它们。

#### 常见的 init 脚本命令

- `start`：启动服务
- `stop`：停止服务
- `restart`：重启服务
- `status`：查看服务状态

#### 示例 init 脚本

下面是一个简单的 init 脚本示例：

```sh
#!/bin/sh
# /etc/init.d/example_service

case "$1" in
    start)
        echo "Starting example_service"
        # 启动服务的命令
        ;;
    stop)
        echo "Stopping example_service"
        # 停止服务的命令
        ;;
    restart)
        echo "Restarting example_service"
        $0 stop
        $0 start
        ;;
    status)
        echo "Checking the status of example_service"
        # 检查服务状态的命令
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0
```

### init 系统的工作流程

1. **系统启动**：系统电源开启后，启动加载程序（如 GRUB）加载操作系统内核。
2. **加载 init**：内核初始化完成后，启动 init 进程（通常是 `/sbin/init`），这是系统的第一个进程，PID 为 1。
3. **读取配置**：init 进程读取配置文件（如 `/etc/inittab`）以确定默认运行级别。
4. **执行脚本**：init 根据运行级别，按顺序执行相应的 init 脚本，启动必要的服务和进程。
5. **管理运行级别**：系统运行过程中，可以使用 `init` 或 `telinit` 命令来切换运行级别，例如 `init 3` 切换到运行级别 3。

### init 系统的优缺点

**优点**：
- **简单可靠**：init 系统非常稳定和可靠，经过多年使用和测试。
- **广泛支持**：几乎所有的 Unix 和类 Unix 系统都支持 init 系统。

**缺点**：
- **启动速度慢**：由于 init 系统是顺序启动服务，启动速度较慢。
- **缺乏并行性**：不能并行启动服务，导致系统启动时间较长。
- **复杂性**：管理大量的 init 脚本和依赖关系可能变得复杂。

### 现代替代品

由于传统 init 系统的一些缺点，现代操作系统引入了更先进的替代品，如 Upstart 和 systemd，这些系统提供了并行启动、依赖管理和更好的服务监控功能。

总的来说，init 脚本系统是一种历史悠久且广泛使用的服务管理方法，尽管它在某些方面已经被更现代的系统所取代，但它依然在许多场景中发挥着重要作用。

## Upstart

Upstart 是一种事件驱动的 init 系统，旨在替代传统的 SysVinit 系统，用于更快、更可靠地管理系统启动和服务。它最初由 Canonical Ltd. 开发，并在 Ubuntu 中广泛使用。Upstart 的设计目的是解决传统 init 系统的一些缺点，如启动速度慢和缺乏并行性。

### Upstart 的主要特点

1. **事件驱动**：
   - Upstart 基于事件来管理服务和任务。事件可以是系统状态的变化（如硬件添加或移除、网络连接变化等），这使得 Upstart 更加灵活和动态。

2. **并行启动**：
   - Upstart 能够并行启动服务，提高系统启动速度。

3. **依赖管理**：
   - Upstart 可以处理服务之间的依赖关系，确保服务按正确的顺序启动和停止。

4. **服务监控**：
   - Upstart 提供服务监控和自动重启功能，当服务崩溃或异常退出时，能够自动重启服务。

5. **兼容性**：
   - Upstart 兼容传统的 SysVinit 脚本，允许系统在过渡到 Upstart 时继续使用现有的 init 脚本。

### Upstart 配置文件

Upstart 使用配置文件来定义任务和服务。配置文件通常存放在 `/etc/init` 目录下，文件扩展名为 `.conf`。

#### 示例配置文件

下面是一个简单的 Upstart 配置文件示例，定义了一个名为 `example_service` 的服务：

```text
# /etc/init/example_service.conf

description "Example Service"

start on filesystem and net-device-up IFACE!=lo
stop on runlevel [!2345]

respawn
exec /usr/bin/example_service
```

#### 解析示例配置文件

- `description`：描述服务的功能。
- `start on`：定义服务的启动条件。当文件系统准备好并且网络设备启动（但不包括 `lo` 设备）时启动服务。
- `stop on`：定义服务的停止条件。当系统进入非 2、3、4、5 级别时停止服务。
- `respawn`：服务崩溃后自动重启。
- `exec`：执行服务的命令。

### Upstart 的基本使用

#### 启动服务
```sh
sudo start example_service
```

#### 停止服务
```sh
sudo stop example_service
```

#### 重启服务
```sh
sudo restart example_service
```

#### 查看服务状态
```sh
sudo status example_service
```

### Upstart 的工作流程

1. **系统启动**：系统启动后，内核加载 Upstart 作为 init 系统。
2. **读取配置**：Upstart 读取 `/etc/init` 目录下的配置文件。
3. **监听事件**：Upstart 监听系统中的各种事件，如硬件变化、网络状态变化等。
4. **响应事件**：根据配置文件中定义的条件，启动或停止相应的服务。
5. **管理服务**：Upstart 根据依赖关系和事件管理服务的启动和停止，提供服务监控和自动重启功能。

### Upstart 的优缺点

**优点**：
- **快速启动**：通过并行启动服务，减少系统启动时间。
- **灵活性**：基于事件驱动，能够灵活响应系统状态的变化。
- **服务监控**：提供自动重启功能，提高系统可靠性。

**缺点**：
- **复杂性**：事件驱动模型和配置文件语法可能比较复杂，需要学习和适应。
- **过渡难度**：从传统的 SysVinit 过渡到 Upstart 需要一些工作，特别是在维护现有的 init 脚本时。

### 现代替代品

尽管 Upstart 曾经在 Ubuntu 等系统中广泛使用，但随着 systemd 的兴起，许多发行版已经转向使用 systemd 作为默认的 init 系统。systemd 提供了更强大的功能和更广泛的支持，使其成为现代 Linux 发行版中的首选 init 系统。

总的来说，Upstart 是一种强大且灵活的 init 系统，通过事件驱动和并行启动等特性，解决了传统 init 系统的一些问题，虽然现在它在许多系统中已经被 systemd 所取代。

## openrc

OpenRC 是一个用于 Unix 和类 Unix 操作系统的服务管理系统。它主要设计用于在 Gentoo Linux 以及其他一些 Linux 发行版上，但也可以在其他操作系统上使用。OpenRC 的设计目的是提供一个简单、快速且功能强大的服务管理框架，既可以兼容传统的 init 脚本系统，也能提供更现代的功能。

### OpenRC 的主要特点包括：

1. **轻量级和高效**：
   - OpenRC 旨在保持轻量级和高效的特性，尽量减少启动时的开销，并且在不需要运行服务时尽量减少内存占用。

2. **兼容性**：
   - OpenRC 兼容传统的 init 脚本，这意味着它可以与 SysVinit 一起工作，也可以作为系统启动管理器使用。

3. **并行启动**：
   - 支持并行启动服务，可以减少系统启动时间。

4. **依赖管理**：
   - OpenRC 能够自动处理服务之间的依赖关系，确保按正确的顺序启动和关闭服务。

5. **服务监控**：
   - 提供基本的服务监控和管理功能，可以在服务异常退出时重新启动服务。

6. **跨平台支持**：
   - 除了 Linux 之外，OpenRC 还可以运行在其他 Unix 系统上，如 FreeBSD。

### 基本使用

#### 启动服务
```sh
rc-service <service_name> start
```

#### 停止服务
```sh
rc-service <service_name> stop
```

#### 重启服务
```sh
rc-service <service_name> restart
```

#### 查看服务状态
```sh
rc-service <service_name> status
```

#### 添加服务到默认运行级别
```sh
rc-update add <service_name> default
```

#### 删除服务的默认运行级别
```sh
rc-update del <service_name> default
```

### 配置文件

OpenRC 的配置文件通常位于 `/etc/rc.conf` 和 `/etc/conf.d` 目录下。主要配置文件是 `/etc/rc.conf`，这个文件包含了 OpenRC 的全局配置选项。

#### 示例 `/etc/rc.conf` 文件
```sh
# 启动时使用的默认运行级别
rc_default_runlevel="default"

# 启动时是否并行启动服务
rc_parallel="YES"
```

### 运行级别

OpenRC 使用运行级别（runlevel）的概念来管理不同的服务集合。默认的运行级别包括：

- `boot`：系统启动时执行的服务。
- `default`：系统启动完成后执行的服务。
- `shutdown`：系统关机时执行的服务。

在 OpenRC 中，服务脚本位于 `/etc/init.d` 目录下，这些脚本用来管理各种系统服务。OpenRC 服务脚本使用特定的格式和关键字来定义服务的行为和依赖关系。以下是一些常见的配置和关键字：

### OpenRC脚本

一个典型的 OpenRC 服务脚本结构如下：

```sh
#!/sbin/openrc-run

command="/path/to/your/command"
command_args="your arguments"
pidfile="/var/run/yourservice.pid"
name="Your Service Name"
description="A brief description of your service"

depend() {
    need net
    use logger dns
    after firewall
}
```

##### 关键配置选项

- `command`：定义服务启动时要执行的命令。
- `command_args`：传递给 `command` 的参数。
- `pidfile`：定义服务的 PID 文件路径，用于跟踪服务的进程 ID。
- `name`：服务的名称。
- `description`：服务的描述。

##### 依赖关系配置

- `depend()`：定义服务的依赖关系和启动顺序。常见的依赖关系关键字包括：
  - `need`：指定服务所需的其他服务。如果依赖的服务未启动，当前服务也不会启动。
  - `use`：指定当前服务可选的依赖服务。当前服务在依赖的服务之前或之后启动均可。
  - `after`：指定当前服务在所列服务之后启动。
  - `before`：指定当前服务在所列服务之前启动。
  - `provide`：指定当前服务提供的功能名称，可以用在其他服务的 `need` 或 `use` 中。

##### 控制函数

OpenRC 服务脚本可以定义一些函数来控制服务的行为。这些函数通常包括：

- `start()`：定义服务启动时的操作。
- `stop()`：定义服务停止时的操作。
- `restart()`：定义服务重启时的操作。
- `status()`：定义检查服务状态时的操作。

这些函数可以根据需要进行自定义，例如：

```sh
start() {
    ebegin "Starting Your Service"
    start-stop-daemon --start --exec $command -- $command_args
    eend $?
}

stop() {
    ebegin "Stopping Your Service"
    start-stop-daemon --stop --exec $command
    eend $?
}
```

##### 示例：创建一个自定义服务脚本

假设我们有一个简单的服务脚本 `/usr/local/bin/hello-world.sh`，内容如下：

```sh
#!/bin/bash

while true; do
    echo "Hello, World!"
    sleep 60
done
```

确保脚本是可执行的：

```sh
sudo chmod +x /usr/local/bin/hello-world.sh
```

接下来，创建一个 OpenRC 服务脚本 `/etc/init.d/hello-world`：

```sh
#!/sbin/openrc-run

command="/usr/local/bin/hello-world.sh"
pidfile="/var/run/hello-world.pid"
name="Hello World Service"
description="A simple Hello World service managed by OpenRC"

depend() {
    need net
}

start() {
    ebegin "Starting Hello World Service"
    start-stop-daemon --start --background --make-pidfile --pidfile $pidfile --exec $command
    eend $?
}

stop() {
    ebegin "Stopping Hello World Service"
    start-stop-daemon --stop --pidfile $pidfile
    eend $?
}
```

确保脚本是可执行的：

```sh
sudo chmod +x /etc/init.d/hello-world
```

### 添加和管理服务

将服务添加到默认运行级别并启动：

```sh
sudo rc-update add hello-world default
sudo rc-service hello-world start
```

检查服务状态：

```sh
sudo rc-service hello-world status
```

停止服务：

```sh
sudo rc-service hello-world stop
```

## systemd

### 介绍systemd

**systemd** 是一种用于Linux操作系统的系统和服务管理器。它是Unix System V和BSD init系统的替代品，被设计用于解决传统init系统的一些缺点和局限性。systemd通过提供并行化服务启动、更高效的服务管理、更好的依赖关系处理等功能，提高了系统启动速度和管理效率。

systemd 由多个组件组成，每个组件都有特定的功能，协同工作以实现系统和服务管理。以下是systemd的一些主要组件及其功能：

### 核心组件

1. **systemd**：systemd守护进程，作为init系统的替代品，负责系统启动和服务管理。
2. **systemctl**：用于控制systemd管理的系统和服务的命令行工具。
3. **journald**：systemd的日志管理系统，负责收集、存储和转发日志信息。
4. **logind**：负责管理用户登录、会话和用户切换的守护进程。

### 配置和管理工具

1. **systemd-analyze**：用于分析和优化系统启动性能的工具。
2. **timedatectl**：用于配置系统时间和日期的工具。
3. **hostnamectl**：用于设置和查询系统主机名的工具。
4. **localectl**：用于配置系统区域设置的工具。
5. **machinectl**：用于管理虚拟机和容器的工具。

### 其他重要组件

1. **systemd-udevd**：设备管理守护进程，处理设备的动态管理。
2. **systemd-networkd**：用于管理网络配置和连接的守护进程。
3. **systemd-resolved**：DNS解析守护进程，提供网络名解析和DNS缓存服务。
4. **systemd-timedated**：时间和日期管理守护进程，提供时间同步服务。
5. **systemd-hostnamed**：主机名管理守护进程。
6. **systemd-localed**：本地化设置管理守护进程。
7. **systemd-machined**：虚拟机和容器管理守护进程。
8. **systemd-homed**：用于管理和保护用户主目录。
9. **systemd-boot**：简单的EFI引导管理器。

### 辅助工具

1. **journalctl**：用于查看和管理由journald收集的日志信息的工具。
2. **coredumpctl**：用于收集和查看进程崩溃转储信息的工具。
3. **loginctl**：用于管理和查询用户登录会话的工具。
4. **networkctl**：用于管理和查询网络链接的工具。

### 配置文件

配置文件在`/etc/systemd/`目录下面

#### system.conf

[wiki](https://man.archlinux.org/man/systemd-system.conf.5.en)

##### [Manager] 部分

- **LogLevel**: 设置日志记录级别（例如 `info`, `debug`）。
- **LogTarget**: 日志目标（例如 `journal`, `console`, `kmsg`）。
- **LogColor**: 是否在日志中使用颜色。
- **LogLocation**: 是否记录日志的源代码位置。
- **LogTime**: 是否在日志中包含时间戳。
- **DumpCore**: 是否在服务崩溃时生成核心转储。
- **ShowStatus**: 是否在启动和停止时显示状态信息。
- **CrashChangeVT**: 服务崩溃时切换到特定虚拟终端。
- **CrashShell**: 服务崩溃时启动一个调试shell。
- **CrashReboot**: 服务崩溃时自动重启。
- **CtrlAltDelBurstAction**: 定义快速按下Ctrl+Alt+Del组合键的行为。
- **CPUAffinity**: 设置系统进程的CPU亲和性。
- **NUMAPolicy**: 设置NUMA内存分配策略。
- **NUMAMask**: 设置NUMA节点掩码。
- **RuntimeWatchdogSec**: 运行时看门狗超时时间。
- **RuntimeWatchdogPreSec**: 预看门狗超时时间。
- **RuntimeWatchdogPreGovernor**: 预看门狗CPU调度策略。
- **RebootWatchdogSec**: 重启看门狗超时时间。
- **KExecWatchdogSec**: kexec看门狗超时时间。
- **WatchdogDevice**: 设定看门狗设备。
- **CapabilityBoundingSet**: 设置进程的能力边界集。
- **NoNewPrivileges**: 禁止新特权。
- **SystemCallArchitectures**: 允许的系统调用架构。
- **TimerSlackNSec**: 设置定时器松弛时间。
- **StatusUnitFormat**: 设置状态单元格式。
- **DefaultTimerAccuracySec**: 定时器精度。
- **DefaultStandardOutput**: 默认标准输出目标。
- **DefaultStandardError**: 默认标准错误目标。
- **DefaultTimeoutStartSec**: 服务启动超时时间。
- **DefaultTimeoutStopSec**: 服务停止超时时间。
- **DefaultTimeoutAbortSec**: 服务中止超时时间。
- **DefaultDeviceTimeoutSec**: 设备操作超时时间。
- **DefaultRestartSec**: 服务重启等待时间。
- **DefaultStartLimitIntervalSec**: 服务启动限制时间间隔。
- **DefaultStartLimitBurst**: 服务启动限制突发次数。
- **DefaultEnvironment**: 默认环境变量。
- **DefaultCPUAccounting**: 启用CPU使用计量。
- **DefaultIOAccounting**: 启用IO使用计量。
- **DefaultIPAccounting**: 启用IP使用计量。
- **DefaultMemoryAccounting**: 启用内存使用计量。
- **DefaultTasksAccounting**: 启用任务计量。
- **DefaultTasksMax**: 最大任务数限制。
- **DefaultLimitCPU**: 默认CPU时间限制。
- **DefaultLimitFSIZE**: 默认文件大小限制。
- **DefaultLimitDATA**: 默认数据段大小限制。
- **DefaultLimitSTACK**: 默认栈大小限制。
- **DefaultLimitCORE**: 默认核心转储大小限制。
- **DefaultLimitRSS**: 默认常驻内存限制。
- **DefaultLimitNOFILE**: 默认打开文件数限制。
- **DefaultLimitAS**: 默认地址空间大小限制。
- **DefaultLimitNPROC**: 默认进程数限制。
- **DefaultLimitMEMLOCK**: 默认锁定内存大小限制。
- **DefaultLimitLOCKS**: 默认文件锁定数限制。
- **DefaultLimitSIGPENDING**: 默认挂起信号数限制。
- **DefaultLimitMSGQUEUE**: 默认消息队列大小限制。
- **DefaultLimitNICE**: 默认调度优先级限制。
- **DefaultLimitRTPRIO**: 默认实时优先级限制。
- **DefaultLimitRTTIME**: 默认实时CPU时间限制。
- **DefaultOOMPolicy**: 默认内存不足策略。
- **DefaultSmackProcessLabel**: 设置默认Smack进程标签。

#### journald.conf
[wiki](https://man.archlinux.org/man/journald.conf.5)

##### 常规选项

- **Storage**：指定日志数据的存储位置（`auto`, `volatile`, `persistent`, `none`）。
- **Compress**：启用或禁用日志文件压缩。
- **Seal**：为日志文件添加完整性保护（密封）。
- **SplitMode**：定义日志文件的分割方式（`uid`, `none`）。
- **SyncIntervalSec**：日志数据同步到磁盘的间隔时间。
- **RateLimitIntervalSec**：日志速率限制的时间间隔。
- **RateLimitBurst**：在应用速率限制前允许的日志条目数量。

##### 系统和运行时存储

- **SystemMaxUse**：系统日志存储的最大使用空间。
- **SystemKeepFree**：系统日志存储中保持的最小空闲空间。
- **SystemMaxFileSize**：单个系统日志文件的最大大小。
- **SystemMaxFiles**：系统日志文件的最大数量。
- **RuntimeMaxUse**：运行时日志存储的最大使用空间。
- **RuntimeKeepFree**：运行时日志存储中保持的最小空闲空间。
- **RuntimeMaxFileSize**：单个运行时日志文件的最大大小。
- **RuntimeMaxFiles**：运行时日志文件的最大数量。

##### 转发和输出选项

- **MaxRetentionSec**：日志的最大保留时间。
- **MaxFileSec**：单个日志文件的最大保留时间。
- **ForwardToSyslog**：启用或禁用日志转发到 syslog。
- **ForwardToKMsg**：启用或禁用日志转发到内核消息。
- **ForwardToConsole**：启用或禁用日志转发到控制台。
- **ForwardToWall**：启用或禁用日志转发到 `wall` 命令。
- **TTYPath**：日志转发到控制台的设备路径。
- **MaxLevelStore**：存储的最大日志级别。
- **MaxLevelSyslog**：转发到 syslog 的最大日志级别。
- **MaxLevelKMsg**：转发到内核消息的最大日志级别。
- **MaxLevelConsole**：转发到控制台的最大日志级别。
- **MaxLevelWall**：转发到 `wall` 命令的最大日志级别。
- **LineMax**：日志条目的最大行长度。
- **ReadKMsg**：启用或禁用读取内核消息。
- **Audit**：启用或禁用审计日志记录。

#### logind.conf

[wiki](https://man.archlinux.org/man/logind.conf.5)

##### 常规选项

- **NAutoVTs**: 自动生成的虚拟终端数量。
- **ReserveVT**: 保留的虚拟终端编号。
- **KillUserProcesses**: 用户退出时终止其所有进程。
- **KillOnlyUsers**: 指定终止进程的用户。
- **KillExcludeUsers**: 排除不终止进程的用户。
- **InhibitDelayMaxSec**: 最大延迟时间以防止挂起、关机等操作。
- **UserStopDelaySec**: 用户退出后延迟终止进程的时间。
- **HandlePowerKey**: 电源键按下时的操作。
- **HandlePowerKeyLongPress**: 电源键长按时的操作。
- **HandleRebootKey**: 重启键按下时的操作。
- **HandleRebootKeyLongPress**: 重启键长按时的操作。
- **HandleSuspendKey**: 挂起键按下时的操作。
- **HandleSuspendKeyLongPress**: 挂起键长按时的操作。
- **HandleHibernateKey**: 休眠键按下时的操作。
- **HandleHibernateKeyLongPress**: 休眠键长按时的操作。
- **HandleLidSwitch**: 笔记本盖合上时的操作。
- **HandleLidSwitchExternalPower**: 外接电源时盖合上时的操作。
- **HandleLidSwitchDocked**: 底座模式下盖合上时的操作。
- **PowerKeyIgnoreInhibited**: 忽略电源键禁止操作。
- **SuspendKeyIgnoreInhibited**: 忽略挂起键禁止操作。
- **HibernateKeyIgnoreInhibited**: 忽略休眠键禁止操作。
- **LidSwitchIgnoreInhibited**: 忽略盖合上禁止操作。
- **RebootKeyIgnoreInhibited**: 忽略重启键禁止操作。
- **HoldoffTimeoutSec**: 系统闲置后延迟执行操作的时间。
- **IdleAction**: 系统闲置后的操作（如挂起、关机等）。
- **IdleActionSec**: 系统闲置时间。
- **RuntimeDirectorySize**: 用户运行时目录的大小限制。
- **RuntimeDirectoryInodesMax**: 用户运行时目录的最大 inode 数量。
- **RemoveIPC**: 用户退出时删除 IPC 对象。
- **InhibitorsMax**: 最大抑制器数量。
- **SessionsMax**: 最大会话数量。
- **StopIdleSessionSec**: 空闲会话终止时间。

#### networkd.conf

[wiki](https://man.archlinux.org/man/networkd.conf.5)

##### [Network] 部分

- **SpeedMeter**: 启用或禁用速度测量。
- **SpeedMeterIntervalSec**: 速度测量的时间间隔。
- **ManageForeignRoutingPolicyRules**: 是否管理外部路由策略规则。
- **ManageForeignRoutes**: 是否管理外部路由。
- **RouteTable**: 设置路由表。

##### [DHCPv4] 部分

- **DUIDType**: 设置 DHCPv4 的 DUID 类型（如 `vendor`）。
- **DUIDRawData**: 指定原始 DUID 数据。

##### [DHCPv6] 部分

- **DUIDType**: 设置 DHCPv6 的 DUID 类型（如 `vendor`）。
- **DUIDRawData**: 指定原始 DUID 数据。

#### resolved.conf
[wiki](https://man.archlinux.org/man/resolved.conf.5)

##### [Resolve] 部分

- **DNS**：指定用于DNS解析的DNS服务器。
- **FallbackDNS**：指定备用DNS服务器。
- **Domains**：设置用于DNS解析的域名。
- **DNSSEC**：启用或禁用DNS安全扩展（`yes`, `no`）。
- **DNSOverTLS**：启用或禁用DNS over TLS（`yes`, `no`）。
- **MulticastDNS**：启用或禁用多播DNS（`yes`, `no`）。
- **LLMNR**：启用或禁用链路本地多播名称解析（`yes`, `no`）。
- **Cache**：启用或禁用DNS缓存（`yes`, `no`）。
- **CacheFromLocalhost**：是否缓存本地主机发出的请求（`yes`, `no`）。
- **DNSStubListener**：启用或禁用DNS存根监听器（`yes`, `no`）。
- **DNSStubListenerExtra**：配置额外的DNS存根监听器地址。
- **ReadEtcHosts**：是否读取 `/etc/hosts` 文件（`yes`, `no`）。
- **ResolveUnicastSingleLabel**：启用或禁用单标签域名的单播解析（`yes`, `no`）。

#### pstore.conf

[wiki](https://man.archlinux.org/man/pstore.conf.5)

##### [PStore] 部分

- **Storage**：指定存储类型（如 `external`）。决定 `pstore` 后端的存储方式。
- **Unlink**：是否在读取后删除存储的数据（`yes` 或 `no`）。默认设置为 `yes`，表示读取后删除存储的数据。

#### sleep.conf
[wiki](https://man.archlinux.org/man/systemd-sleep.conf.5.en)

##### [Sleep] 部分

- **AllowSuspend**：是否允许系统进入挂起状态（`yes`, `no`）。
- **AllowHibernation**：是否允许系统进入休眠状态（`yes`, `no`）。
- **AllowSuspendThenHibernate**：是否允许系统先挂起后休眠（`yes`, `no`）。
- **AllowHybridSleep**：是否允许系统进入混合睡眠状态（`yes`, `no`）。
- **SuspendMode**：定义挂起模式。
- **SuspendState**：定义挂起状态（如 `mem`, `standby`, `freeze`）。
- **HibernateMode**：定义休眠模式（如 `platform`, `shutdown`）。
- **HibernateState**：定义休眠状态（如 `disk`）。
- **HybridSleepMode**：定义混合睡眠模式（如 `suspend`, `platform`, `shutdown`）。
- **HybridSleepState**：定义混合睡眠状态（如 `disk`）。
- **HibernateDelaySec**：休眠延迟时间。
- **SuspendEstimationSec**：挂起估计时间。

#### timesyncd.conf
[wiki](https://man.archlinux.org/man/systemd/timesyncd.conf.5.en)

##### [Time] 部分

- **NTP**：指定用于时间同步的NTP服务器。
- **FallbackNTP**：备用NTP服务器列表。
- **RootDistanceMaxSec**：允许的最大根距离时间。
- **PollIntervalMinSec**：最小轮询间隔时间。
- **PollIntervalMaxSec**：最大轮询间隔时间。
- **ConnectionRetrySec**：重试连接的时间间隔。
- **SaveIntervalSec**：保存时间数据的间隔时间。

#### user.conf

[wiki](https://man.archlinux.org/man/systemd/systemd-user.conf.5.en)

配置项喝system.conf一样, 当作为系统实例运行时，systemd 解释配置文件 system.conf 和 system.conf.d 目录中的文件；当作为用户实例运行时，它解释配置文件 user.conf （按优先级顺序，位于用户的主目录中，位于 /etc/systemd/、/run/systemd/ 和 /usr/lib/systemd/ 下） ）和 user.conf.d 目录中的文件。这些配置文件包含一些控制基本管理器操作的设置。


### systemd-analyze使用

`systemd-analyze` 是一个命令行工具，用于分析和优化 `systemd` 的启动性能。以下是 `systemd-analyze` 的一些常见用法：

##### 基本用法

- **显示启动时间**：
  ```sh
  systemd-analyze
  ```

- **显示启动过程的时间图**：
  ```sh
  systemd-analyze blame
  ```

- **显示关键链条**：
  ```sh
  systemd-analyze critical-chain
  ```

##### 高级用法

- **显示设备的依赖关系**：
  ```sh
  systemd-analyze dot | dot -Tsvg > systemd.dot.svg
  ```

- **比较两次引导的时间**：
  ```sh
  systemd-analyze plot > boot.svg
  ```

- **查看指定服务的时间**：
  ```sh
  systemd-analyze time [SERVICE_NAME]
  ```


### systemctl使用

`systemctl` 是用于控制 systemd 管理的系统和服务的命令行工具。它有许多命令和选项，可以执行各种管理任务。[archlinux wiki说明](https://man.archlinux.org/man/systemctl.1.en)

#### 基本命令

##### 服务管理

- `start [UNIT]`：启动指定的服务单位。
- `stop [UNIT]`：停止指定的服务单位。
- `restart [UNIT]`：重新启动指定的服务单位。
- `reload [UNIT]`：重新加载指定服务的配置文件（如果支持）。
- `reload-or-restart [UNIT]`：重新加载配置文件，如果不支持则重新启动服务。
- `status [UNIT]`：显示指定单位的状态信息。
- `is-active [UNIT]`：检查指定单位是否处于活动状态。
- `is-enabled [UNIT]`：检查指定单位是否已启用。
- `enable [UNIT]`：启用指定单位，使其在启动时自动启动。
- `disable [UNIT]`：禁用指定单位，使其在启动时不自动启动。
- `mask [UNIT]`：屏蔽指定单位，防止其被启动。
- `unmask [UNIT]`：解除屏蔽指定单位。

##### 系统管理

- `isolate [TARGET]`：切换到指定的目标，停止所有其他不必要的服务。
- `set-default [TARGET]`：设置系统的默认目标（启动级别）。
- `get-default`：显示当前的默认目标。
- `halt`：停止系统，但不关闭电源。
- `poweroff`：关闭系统并关闭电源。
- `reboot`：重新启动系统。
- `suspend`：将系统挂起到内存（S3）。
- `hibernate`：将系统休眠到磁盘（S4）。
- `hybrid-sleep`：将系统混合睡眠（挂起到内存和磁盘）。

##### 单位文件管理

- `list-units`：列出当前加载的单位。
- `list-unit-files`：列出所有已安装的单位文件。
- `cat [UNIT]`：显示指定单位文件的内容。
- `edit [UNIT]`：编辑指定单位文件。
- `daemon-reload`：重新加载 systemd 管理器配置文件。
- `reset-failed [UNIT]`：重置指定单位的失败状态。

#### 高级命令

##### 定时任务

- `list-timers`：列出所有活动的定时任务。
- `start [TIMER]`：启动指定的定时任务。
- `stop [TIMER]`：停止指定的定时任务。

##### 设备管理

- `list-devices`：列出所有已识别的设备。
- `status [DEVICE]`：显示指定设备的状态信息。

##### 挂载点管理

- `list-mounts`：列出所有挂载点。
- `status [MOUNT]`：显示指定挂载点的状态信息。
- `start [MOUNT]`：挂载指定挂载点。
- `stop [MOUNT]`：卸载指定挂载点。

##### 自动挂载管理

- `status [AUTOMOUNT]`：显示指定自动挂载点的状态信息。
- `start [AUTOMOUNT]`：启用指定自动挂载点。
- `stop [AUTOMOUNT]`：禁用指定自动挂载点。

##### 交换管理

- `status [SWAP]`：显示指定交换设备的状态信息。
- `start [SWAP]`：启用指定交换设备。
- `stop [SWAP]`：禁用指定交换设备。

##### 切片管理

- `status [SLICE]`：显示指定切片的状态信息。
- `start [SLICE]`：启用指定切片。
- `stop [SLICE]`：禁用指定切片。

##### 其他命令

- `show [UNIT]`：显示指定单位的详细属性。
- `set-property [UNIT] [PROPERTY]=[VALUE]`：设置指定单位的属性。
- `list-dependencies [UNIT]`：列出指定单位的所有依赖关系。

##### 示例

以下是一些常见的 `systemctl` 使用示例：

```sh
# 启动httpd服务
sudo systemctl start httpd

# 停止httpd服务
sudo systemctl stop httpd

# 重新启动httpd服务
sudo systemctl restart httpd

# 查看httpd服务状态
systemctl status httpd

# 启用httpd服务，使其开机自动启动
sudo systemctl enable httpd

# 禁用httpd服务，使其开机不自动启动
sudo systemctl disable httpd

# 屏蔽httpd服务，防止其被启动
sudo systemctl mask httpd

# 解除屏蔽httpd服务
sudo systemctl unmask httpd

# 列出所有当前加载的单位
systemctl list-units

# 列出所有已安装的单位文件
systemctl list-unit-files

# 查看指定单位的日志
journalctl -u httpd

# 重新加载 systemd 配置文件
sudo systemctl daemon-reload

# 重置指定单位的失败状态
sudo systemctl reset-failed httpd

# 切换到多用户目标
sudo systemctl isolate multi-user.target

# 设置默认目标为图形界面
sudo systemctl set-default graphical.target

# 重启系统
sudo systemctl reboot
```

### journalctl使用

`journalctl` 是用于查看 `systemd` 日志的命令行工具。以下是 `journalctl` 的一些常见用法：

##### 基本用法

- **查看所有日志**：
  ```sh
  journalctl
  ```

- **查看当前引导的日志**：
  ```sh
  journalctl -b
  ```

- **查看特定服务的日志**：
  ```sh
  journalctl -u [service-name]
  ```

- **实时查看日志**：
  ```sh
  journalctl -f
  ```

##### 过滤日志

- **按时间过滤**：
  ```sh
  journalctl --since "2023-07-01 00:00:00" --until "2023-07-01 23:59:59"
  ```

- **按优先级过滤**：
  ```sh
  journalctl -p err
  ```

- **按引导过滤**：
  ```sh
  journalctl -b -1  # 查看上一次引导的日志
  ```

##### 高级用法

- **导出日志到文件**：
  ```sh
  journalctl -o export > /path/to/file
  ```

- **查看内核日志**：
  ```sh
  journalctl -k
  ```

通过这些命令，可以有效地查看和管理 `systemd` 的日志。更多详细信息请参考 [journalctl 手册](https://man.archlinux.org/man/journalctl.1)。

### timedatectl使用

`timedatectl` 是一个命令行工具，用于管理和查询系统时间、日期和时区设置。以下是 `timedatectl` 的一些常见用法：

##### 基本用法

- **查看当前时间和日期**：
  ```sh
  timedatectl
  ```

- **设置系统时间**：
  ```sh
  sudo timedatectl set-time 'YYYY-MM-DD HH:MM:SS'
  ```

- **设置时区**：
  ```sh
  sudo timedatectl set-timezone [TIMEZONE]
  ```
  例如，设置时区为`UTC`：
  ```sh
  sudo timedatectl set-timezone UTC
  ```

- **启用或禁用网络时间同步**：
  ```sh
  sudo timedatectl set-ntp true  # 启用
  sudo timedatectl set-ntp false # 禁用
  ```

- **列出所有可用的时区**：
  ```sh
  timedatectl list-timezones
  ```

##### 高级用法

- **查看详细状态**：
  ```sh
  timedatectl status
  ```

### hostnamectl使用

`hostnamectl` 是一个命令行工具，用于查询和设置系统的主机名以及相关设置。以下是 `hostnamectl` 的一些常见用法：

##### 基本用法

- **查看当前主机名和相关信息**：
  ```sh
  hostnamectl
  ```

- **设置静态主机名**：
  ```sh
  sudo hostnamectl set-hostname [NEW_HOSTNAME]
  ```

- **设置主机名的其他类型**：
  ```sh
  sudo hostnamectl set-hostname [NEW_HOSTNAME] --static
  sudo hostnamectl set-hostname [NEW_HOSTNAME] --pretty
  sudo hostnamectl set-hostname [NEW_HOSTNAME] --transient
  ```

##### 高级用法

- **设置主机名以及相关元数据**：
  ```sh
  sudo hostnamectl set-icon-name [ICON_NAME]
  sudo hostnamectl set-chassis [CHASSIS]
  sudo hostnamectl set-deployment [DEPLOYMENT]
  sudo hostnamectl set-location [LOCATION]
  ```

这些命令可以帮助你有效地管理和查询系统的主机名及相关信息。

### localectl使用
`localectl` 是一个命令行工具，用于查询和设置系统的本地化配置，如语言、键盘布局和字符集。以下是 `localectl` 的一些常见用法：

##### 基本用法

- **查看当前本地化设置**：
  ```sh
  localectl
  ```

- **设置系统语言**：
  ```sh
  sudo localectl set-locale LANG=[LANGUAGE]
  ```
  例如，设置系统语言为英文：
  ```sh
  sudo localectl set-locale LANG=en_US.UTF-8
  ```

- **设置键盘布局**：
  ```sh
  sudo localectl set-keymap [KEYMAP]
  ```
  例如，设置键盘布局为美国英语：
  ```sh
  sudo localectl set-keymap us
  ```

- **设置X11键盘布局**：
  ```sh
  sudo localectl set-x11-keymap [LAYOUT] [MODEL] [VARIANT] [OPTIONS]
  ```

##### 高级用法

- **查看所有可用的语言和键盘布局**：
  ```sh
  localectl list-locales
  localectl list-keymaps
  ```

### machinectl使用

`machinectl` 是一个命令行工具，用于管理和查询由 `systemd-machined` 管理的本地和远程容器及虚拟机。以下是 `machinectl` 的一些常见用法：

##### 基本用法

- **列出所有机器**：
  ```sh
  machinectl list
  ```

- **显示特定机器的详细信息**：
  ```sh
  machinectl status [MACHINE_NAME]
  ```

- **登录到特定机器**：
  ```sh
  machinectl login [MACHINE_NAME]
  ```

- **启动和停止机器**：
  ```sh
  machinectl start [MACHINE_NAME]
  machinectl poweroff [MACHINE_NAME]
  ```

##### 高级用法

- **导出和导入容器**：
  ```sh
  machinectl export-tar [MACHINE_NAME] [FILE_NAME]
  machinectl import-tar [FILE_NAME] [MACHINE_NAME]
  ```

- **终止机器**：
  ```sh
  machinectl terminate [MACHINE_NAME]
  ```

### portablectl使用
`portablectl` 是一个命令行工具，用于管理 `systemd` 的便携服务。以下是 `portablectl` 的一些常见用法：

##### 基本用法

- **列出所有便携服务**：
  ```sh
  portablectl list
  ```

- **附加便携服务到系统**：
  ```sh
  sudo portablectl attach [IMAGE_PATH]
  ```

- **分离便携服务**：
  ```sh
  sudo portablectl detach [NAME]
  ```

- **启用便携服务**：
  ```sh
  sudo portablectl enable [NAME]
  ```

- **禁用便携服务**：
  ```sh
  sudo portablectl disable [NAME]
  ```

##### 高级用法

- **验证便携服务的内容**：
  ```sh
  portablectl verify [IMAGE_PATH]
  ```

- **显示便携服务的详细信息**：
  ```sh
  portablectl status [NAME]
  ```

### coredumpctl使用

`coredumpctl` 是一个命令行工具，用于管理和调试系统崩溃转储。以下是 `coredumpctl` 的一些常见用法：

- **列出所有崩溃转储**：
  ```sh
  coredumpctl
  ```

- **查看特定崩溃转储的详细信息**：
  ```sh
  coredumpctl info [PID|COREDUMP_ID]
  ```

- **检索并启动调试器**：
  ```sh
  coredumpctl gdb [PID|COREDUMP_ID]
  ```

- **列出特定程序的崩溃转储**：
  ```sh
  coredumpctl list [PROGRAM_NAME]
  ```

- **导出崩溃转储到文件**：
  ```sh
  coredumpctl dump [PID|COREDUMP_ID] > /path/to/file
  ```

### loginctl 使用

`loginctl` 是一个命令行工具，用于管理和查询用户登录会话。以下是 `loginctl` 的一些常见用法：

##### 基本用法

- **列出当前会话**：
  ```sh
  loginctl list-sessions
  ```

- **列出当前登录的用户**：
  ```sh
  loginctl list-users
  ```

- **显示特定会话的详细信息**：
  ```sh
  loginctl show-session [SESSION_ID]
  ```

- **显示特定用户的详细信息**：
  ```sh
  loginctl show-user [USER]
  ```

- **终止特定会话**：
  ```sh
  loginctl terminate-session [SESSION_ID]
  ```

- **终止特定用户的所有会话**：
  ```sh
  loginctl terminate-user [USER]
  ```

##### 高级用法

- **锁定会话**：
  ```sh
  loginctl lock-session [SESSION_ID]
  ```

- **解锁会话**：
  ```sh
  loginctl unlock-session [SESSION_ID]
  ```

- **锁定用户的所有会话**：
  ```sh
  loginctl lock-user [USER]
  ```

- **解锁用户的所有会话**：
  ```sh
  loginctl unlock-user [USER]
  ```

### networkctl使用

`networkctl` 是一个命令行工具，用于管理和查询 `systemd-networkd` 管理的网络连接。以下是 `networkctl` 的一些常见用法：

`systemd-networkd` 是 `systemd` 的网络管理服务，用于配置和管理网络设备。以下是 `systemd-networkd` 的一些基本用法和配置方法：

#### 基本用法

**启动和启用 `systemd-networkd`**：
   ```sh
   sudo systemctl start systemd-networkd
   sudo systemctl enable systemd-networkd
   ```

#### 配置文件

`systemd-networkd` 使用以下几种配置文件：

- **.network** 文件：用于配置网络连接[wiki](https://man.archlinux.org/man/systemd.network.5)。
- **.netdev** 文件：用于配置虚拟网络设备[wiki](https://man.archlinux.org/man/systemd.netdev.5.en)。
- **.link** 文件：用于配置网络设备属性[wiki](https://man.archlinux.org/man/systemd.link.5.en)。

这些配置文件通常位于 `/etc/systemd/network/` 目录下。

#### 示例配置文件

#### 配置静态IP地址 (`/etc/systemd/network/10-static.network`)

```ini
[Match]
Name=eth0

[Network]
Address=192.168.1.10/24
Gateway=192.168.1.1
DNS=8.8.8.8
```

#### 配置DHCP (`/etc/systemd/network/10-dhcp.network`)

```ini
[Match]
Name=eth0

[Network]
DHCP=yes
```

##### 管理和调试

- **重启 `systemd-networkd`**：
  ```sh
  sudo systemctl restart systemd-networkd
  ```

- **查看日志**：
  ```sh
  journalctl -u systemd-networkd
  ```

##### 基本用法

- **列出所有网络链接**：
  ```sh
  networkctl list
  ```

- **显示特定网络链接的详细信息**：
  ```sh
  networkctl status [INTERFACE_NAME]
  ```

- **显示所有链接的状态**：
  ```sh
  networkctl status
  ```

- **列出所有可用的网络设备**：
  ```sh
  networkctl list
  ```

##### 高级用法

- **启用网络设备**：
  ```sh
  networkctl up [INTERFACE_NAME]
  ```

- **禁用网络设备**：
  ```sh
  networkctl down [INTERFACE_NAME]
  ```

- **查看网络链接日志**：
  ```sh
  networkctl log [INTERFACE_NAME]
  ```

### resolvectl使用

`resolvectl` 是一个命令行工具，用于管理 `systemd-resolved` 提供的网络名称解析服务。以下是 `resolvectl` 的一些常见用法：

##### 基本用法

- **查询DNS记录**：
  ```sh
  resolvectl query [DOMAIN]
  ```

- **显示当前DNS配置**：
  ```sh
  resolvectl status
  ```

- **列出所有接口的DNS服务器**：
  ```sh
  resolvectl dns
  ```

- **设置特定接口的DNS服务器**：
  ```sh
  sudo resolvectl dns [INTERFACE] [DNS_SERVER]
  ```

##### 高级用法

- **清除DNS缓存**：
  ```sh
  sudo resolvectl flush-caches
  ```

- **显示DNS缓存条目**：
  ```sh
  resolvectl statistics
  ```

### bootctl使用

[wiki](https://wiki.archlinux.org/title/Systemd-boot)

#### 基本用法

1. **安装 `systemd-boot`**：
   ```sh
   bootctl install
   ```

2. **创建引导条目**：
   在 `/boot/loader/entries/` 目录下创建一个 `.conf` 文件，定义引导条目。

示例引导条目配置文件 (`/boot/loader/entries/example.conf`)：
```ini
title   My Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=/dev/sda1 rw
```

##### 配置文件

- **loader.conf**: 位于 `/boot/loader/`，定义全局设置，例如默认条目和超时。
- **entries**: 位于 `/boot/loader/entries/`，包含具体的引导条目配置文件。

##### 维护

- **更新 `systemd-boot`**：
  ```sh
  bootctl update
  ```

### 服务文件和单位文件

systemd 的单元文件目录主要有几个位置，每个位置都存放不同类型的单元文件：

#### 系统级单元文件搜索路径
1. `/etc/systemd/system.control/*`
2. `/run/systemd/system.control/*`
3. `/run/systemd/transient/*`
4. `/run/systemd/generator.early/*`
5. `/etc/systemd/system/*`
6. `/etc/systemd/system.attached/*`
7. `/run/systemd/system/*`
8. `/run/systemd/system.attached/*`
9. `/run/systemd/generator/*`
10. `/usr/local/lib/systemd/system/*`
11. `/usr/lib/systemd/system/*`
12. `/run/systemd/generator.late/*`

#### 用户级单元文件搜索路径
1. `~/.config/systemd/user.control/*`
2. `$XDG_RUNTIME_DIR/systemd/user.control/*`
3. `$XDG_RUNTIME_DIR/systemd/transient/*`
4. `$XDG_RUNTIME_DIR/systemd/generator.early/*`
5. `~/.config/systemd/user/*`
6. `$XDG_CONFIG_DIRS/systemd/user/*`
7. `/etc/systemd/user/*`
8. `$XDG_RUNTIME_DIR/systemd/user/*`
9. `/run/systemd/user/*`
10. `$XDG_RUNTIME_DIR/systemd/generator/*`
11. `$XDG_DATA_HOME/systemd/user/*`
12. `$XDG_DATA_DIRS/systemd/user/*`
13. `/usr/local/lib/systemd/user/*`
14. `/usr/lib/systemd/user/*`
15. `$XDG_RUNTIME_DIR/systemd/generator.late/*`


systemd使用单位文件（Unit Files）来描述服务、挂载点、设备等系统资源。常见的单位文件类型包括：

1. **service**：服务单位文件，描述一个服务。
2. **socket**：socket单位文件，描述一个套接字。
3. **device**：设备单位文件，描述一个设备。
4. **mount**：挂载点单位文件，描述一个挂载点。
5. **automount**：自动挂载单位文件，描述一个自动挂载点。
6. **swap**：交换单位文件，描述一个交换分区。
7. **target**：目标单位文件，用于分组和管理一组单位文件。
8. **path**：路径单位文件，描述一个文件或目录路径。
9. **timer**：定时器单位文件，描述一个定时任务。
9. **scope**：scope单位文件（，用于管理由外部创建的进程组。
9. **slice**：slice单位文件，用于管理和分配系统资源。

### service文件

在systemd中，服务单位文件（.service文件）定义了服务的行为和配置。一个.service文件通常包含多个部分，每个部分包含特定类型的选项。[archlinux wiki说明](https://man.archlinux.org/man/systemd.service.5.en)

##### [Unit]部分

- **Description**：描述服务的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **After**：定义服务在指定服务或目标启动后再启动。
- **Before**：定义服务在指定服务或目标启动前启动。
- **Requires**：指定服务的硬性依赖项，如果依赖项未启动或失败，当前服务也会失败。
- **Wants**：指定服务的软性依赖项，不会因为依赖项未启动或失败而影响当前服务的启动。
- **Conflicts**：指定与当前服务有冲突的服务，当当前服务启动时，冲突的服务将停止。
- **Condition...** 和 **Assert...**：定义服务启动的条件，例如ConditionPathExists=/some/path表示只有在指定路径存在时才启动服务。

##### [Service]部分

- **Type**：定义服务的启动类型，常见类型包括：
  - **simple**：默认类型，ExecStart启动的进程是服务的主进程。
  - **forking**：ExecStart启动的进程会派生一个子进程，父进程会退出，子进程成为服务的主进程。
  - **oneshot**：服务一次性执行任务，完成后立即退出，通常用于启动脚本。
  - **dbus**：服务通过D-Bus启动，并且只有在获得D-Bus名称后才被认为启动成功。
  - **notify**：服务在启动完成后会发送通知。
  - **idle**：服务启动会延迟到所有其他任务完成后。
- **ExecStart**：指定服务启动的命令或脚本。
- **ExecStartPre**：在ExecStart之前执行的命令或脚本。
- **ExecStartPost**：在ExecStart之后执行的命令或脚本。
- **ExecReload**：服务重载时执行的命令或脚本。
- **ExecStop**：服务停止时执行的命令或脚本。
- **ExecStopPost**：服务停止后执行的命令或脚本。
- **Restart**：定义服务在退出后的重启策略，例如always、on-failure、on-abnormal等。
- **RestartSec**：服务重启前的延迟时间。
- **User**：指定以哪个用户身份运行服务。
- **Group**：指定以哪个组身份运行服务。
- **WorkingDirectory**：指定服务的工作目录。
- **Environment**：设置环境变量。
- **PIDFile**：指定服务的PID文件路径。
- **TimeoutStartSec** 和 **TimeoutStopSec**：定义启动和停止服务的超时时间。

##### [Install]部分

- **WantedBy**：定义服务的目标，例如multi-user.target，表示服务在多用户模式下启动。
- **RequiredBy**：定义服务的硬性依赖目标。
- **Alias**：为服务定义别名。
- **Also**：在启用或禁用当前服务时，同时启用或禁用其他单位文件。

##### 示例

以下是一个完整的nginx.service示例：

```ini
[Unit]
Description=NGINX Web Server
Documentation=man:nginx(8)
After=network.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/usr/sbin/nginx -s quit
PrivateTmp=true
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

- **[Unit]部分**描述了服务的基本信息和依赖关系。
- **[Service]部分**定义了服务的启动类型、启动、重载、停止命令以及重启策略。
- **[Install]部分**指定了服务的目标，以便在相应的目标中启用服务。


### socket文件

在systemd中，socket单位文件（.socket文件）用于定义和管理网络套接字或IPC套接字。它们通常与.service文件配合使用，实现按需启动服务的功能，即只有在有连接请求时才启动服务，从而节省资源。[archlinux wiki说明](https://man.archlinux.org/man/systemd.socket.5.en)

##### socket单位文件的结构

socket单位文件与service单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与service文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该套接字的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。

##### [Socket]部分

定义与套接字相关的配置选项。

- **ListenStream**：定义监听的TCP套接字。例如，`ListenStream=80`表示监听80端口。
- **ListenDatagram**：定义监听的UDP套接字。
- **ListenSequentialPacket**：定义监听的SCTP套接字。
- **ListenFIFO**：定义监听的FIFO（命名管道）。
- **ListenSpecial**：定义监听的特殊设备文件。
- **SocketUser**：指定套接字的用户。
- **SocketGroup**：指定套接字的组。
- **SocketMode**：指定套接字的权限模式。
- **Accept**：设置为`true`时，每个传入连接将启动一个新实例的服务。
- **MaxConnections**：限制同时进行的最大连接数。
- **Service**：指定与套接字关联的服务单位文件。
- **ExecStartPre**：在启动套接字之前执行的命令或脚本。
- **ExecStartPost**：在启动套接字之后执行的命令或脚本。
- **ExecStopPre**：在停止套接字之前执行的命令或脚本。
- **ExecStopPost**：在停止套接字之后执行的命令或脚本。

##### [Install]部分

与service文件相同，用于定义安装时的行为。

- **WantedBy**：定义套接字的目标，例如`multi-user.target`。
- **RequiredBy**：定义套接字的硬性依赖目标。
- **Alias**：为套接字定义别名。
- **Also**：在启用或禁用当前套接字时，同时启用或禁用其他单位文件。

##### 示例

以下是一个简单的example.socket文件示例：

```ini
[Unit]
Description=Example Socket

[Socket]
ListenStream=8080
Accept=false
Service=example.service

[Install]
WantedBy=sockets.target
```

与该套接字关联的example.service文件：

```ini
[Unit]
Description=Example Service

[Service]
ExecStart=/usr/bin/example-app
```

在这个示例中：

1. **example.socket**定义了一个监听8080端口的TCP套接字。
2. **Service=example.service**表示当有连接请求时，将启动example.service。
3. **example.service**文件定义了启动`/usr/bin/example-app`应用。

##### 启用和启动

启用和启动socket单位文件：

```sh
sudo systemctl enable example.socket
sudo systemctl start example.socket
```

查看状态：

```sh
sudo systemctl status example.socket
```

使用socket单位文件后, service单元文件中会添加3个环境变量

+ LISTEN_PID 服务进程的PID
+ LISTEN_FDS 当前监听的套接字数量
+ LISTEN_FDNAMES 当前监听的套接字名字，多个socket时使用冒号分隔

监听套接字的方法, socket在LISTEN_FDNAMES中的索引加3, 因为文件描述符0,1,2对应标准输入、标准输出和标准错误

```go
if os.Getenv("LISTEN_PID") == strconv.Itoa(os.Getpid()) {
  if os.Getenv("LISTEN_FDS") != "3" {
    panic("LISTEN_FDS should be 3")
  }
  names := strings.Split(os.Getenv("LISTEN_FDNAMES"), ":")
  for i, name := range names {
    switch name {
    case "http":
      f1 := os.NewFile(uintptr(i+3), "http port")
      ln80, err = net.FileListener(f1)
    case "https":
      f2 := os.NewFile(uintptr(i+3), "https port")
      ln443, err = net.FileListener(f2)
    case "quic":
      f3 := os.NewFile(uintptr(i+3), "quic port")
      lnUDP, err = net.FilePacketConn(f3)
    }
  }
}
```

通过配置socket单位文件，可以灵活管理网络和IPC套接字，实现按需启动服务，提高系统资源利用率。

### device文件

systemd中的设备单位文件（.device文件）用于管理和表示系统中的设备。设备单位文件通常由udev自动生成，反映系统硬件的状态变化。这类文件主要用于配置设备依赖关系，确保在设备可用时启动相关服务或执行特定操作。[archlinux wiki说明](https://man.archlinux.org/man/systemd.device.5.en)

##### 设备单位文件的结构

设备单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该设备的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **BindsTo**：当指定单位文件停止时，当前单位文件也会停止，常用于设备和其依赖的服务之间。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义设备单位文件的启动条件，例如ConditionPathExists=/some/device表示只有在指定设备存在时才启动。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义设备的目标，例如`multi-user.target`。
- **RequiredBy**：定义设备的硬性依赖目标。
- **Alias**：为设备定义别名。
- **Also**：在启用或禁用当前设备时，同时启用或禁用其他单位文件。

##### 示例

设备单位文件通常不需要手动编写，因为udev和systemd会自动处理设备的检测和管理。然而，理解设备单位文件的结构有助于配置设备相关的服务依赖。

假设我们有一个设备单位文件`dev-sda.device`，其内容可能如下：

```ini
[Unit]
Description=SCSI Disk Device
BindsTo=dev-sda1.device
After=dev-sda1.device

[Install]
WantedBy=multi-user.target
```

在这个示例中：

- **Description**：描述该设备是一个SCSI磁盘设备。
- **BindsTo**：表示当前设备依赖`dev-sda1.device`，当`dev-sda1.device`停止时，`dev-sda.device`也会停止。
- **After**：表示在`dev-sda1.device`之后启动当前设备。
- **WantedBy**：指定设备的目标是`multi-user.target`，表示该设备在多用户模式下可用。

##### 使用设备单位文件

尽管设备单位文件通常由systemd和udev自动管理，用户仍然可以通过systemctl命令来查看和操作设备单位：

- 查看设备状态：

  ```sh
  systemctl status dev-sda.device
  ```

- 启用设备：

  ```sh
  sudo systemctl enable dev-sda.device
  ```

- 禁用设备：

  ```sh
  sudo systemctl disable dev-sda.device
  ```

##### 设备依赖关系

设备单位文件的一个重要用途是配置设备与服务之间的依赖关系。例如，确保某个服务仅在特定设备可用时启动，可以通过在服务的[Unit]部分添加以下指令来实现：

```ini
[Unit]
Requires=dev-sda.device
After=dev-sda.device
```

这种配置确保服务在指定设备可用时启动，并在设备不可用时停止。

通过理解和配置设备单位文件，用户可以更精确地管理系统硬件和相关服务，确保系统在设备变化时作出适当反应。

### mount文件

在systemd中，mount单位文件（.mount文件）用于定义和管理文件系统挂载点。mount文件替代了传统的`/etc/fstab`配置方式，提供了更灵活和强大的挂载管理功能。每个mount单位文件对应一个挂载点，可以设置其挂载选项、依赖关系等。[archlinux wiki说明](https://man.archlinux.org/man/systemd.mount.5.en)

##### mount单位文件的结构

mount单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该挂载点的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **BindsTo**：当指定单位文件停止时，当前单位文件也会停止，常用于挂载点和其依赖的设备之间。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义挂载点的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Mount]部分

定义与挂载点相关的配置选项。

- **What**：指定要挂载的设备或文件系统源。
- **Where**：指定挂载点，即挂载到哪个目录。
- **Type**：指定文件系统类型，如ext4、xfs等。
- **Options**：指定挂载选项，类似于`/etc/fstab`中的选项，如`defaults`、`ro`（只读）、`noatime`等。
- **TimeoutSec**：指定挂载操作的超时时间。
- **DirectoryMode**：指定挂载点目录的权限模式（如果目录需要创建）。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义挂载点的目标，例如`multi-user.target`。
- **RequiredBy**：定义挂载点的硬性依赖目标。
- **Alias**：为挂载点定义别名。
- **Also**：在启用或禁用当前挂载点时，同时启用或禁用其他单位文件。

##### 示例

以下是一个简单的挂载点单位文件`data.mount`的示例：

```ini
[Unit]
Description=Mount Data Directory
Documentation=man:fstab(5) man:systemd.mount(5)
After=network.target

[Mount]
What=/dev/sdb1
Where=/mnt/data
Type=ext4
Options=defaults

[Install]
WantedBy=multi-user.target
```

在这个示例中：

- **[Unit]部分**描述了挂载点的基本信息和依赖关系。
- **[Mount]部分**定义了挂载点的具体配置，如设备路径、挂载点、文件系统类型和挂载选项。
- **[Install]部分**指定了挂载点的目标，以便在相应的目标中启用挂载点。

##### 启用和启动

启用和启动mount单位文件：

```sh
sudo systemctl enable data.mount
sudo systemctl start data.mount
```

查看状态：

```sh
sudo systemctl status data.mount
```

##### 自动生成mount单位文件

systemd可以根据`/etc/fstab`自动生成对应的mount单位文件。例如，如果`/etc/fstab`中有以下条目：

```text
/dev/sdb1 /mnt/data ext4 defaults 0 2
```

那么systemd会自动生成一个类似于上述示例的`data.mount`文件。

通过使用mount单位文件，用户可以更灵活地管理挂载点，设置复杂的依赖关系和挂载选项，提升系统的挂载管理能力。

### automount文件

在systemd中，automount单位文件（.automount文件）用于配置和管理自动挂载点。自动挂载点是指在访问某个路径时自动触发挂载操作，而不是在系统启动时立即挂载。这种机制可以提高系统启动速度，并且仅在需要时才挂载特定文件系统，节省资源。[archlinux wiki说明](https://man.archlinux.org/man/systemd.automount.5.en)

##### automount单位文件的结构

automount单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该自动挂载点的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **BindsTo**：当指定单位文件停止时，当前单位文件也会停止，常用于挂载点和其依赖的设备之间。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义自动挂载点的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Automount]部分

定义与自动挂载点相关的配置选项。

- **Where**：指定自动挂载点，即挂载到哪个目录。
- **DirectoryMode**：指定自动挂载点目录的权限模式（如果目录需要创建）。
- **TimeoutIdleSec**：指定在最后一次访问后的空闲超时时间，超时后自动卸载文件系统。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义自动挂载点的目标，例如`multi-user.target`。
- **RequiredBy**：定义自动挂载点的硬性依赖目标。
- **Alias**：为自动挂载点定义别名。
- **Also**：在启用或禁用当前自动挂载点时，同时启用或禁用其他单位文件。

##### 示例

以下是一个简单的自动挂载点单位文件`data.automount`的示例：

```ini
[Unit]
Description=Automount Data Directory
Documentation=man:fstab(5) man:systemd.automount(5)
After=network.target

[Automount]
Where=/mnt/data
TimeoutIdleSec=300

[Install]
WantedBy=multi-user.target
```

与之对应的挂载点单位文件`data.mount`：

```ini
[Unit]
Description=Mount Data Directory
Documentation=man:fstab(5) man:systemd.mount(5)
After=network.target

[Mount]
What=/dev/sdb1
Where=/mnt/data
Type=ext4
Options=defaults

[Install]
WantedBy=multi-user.target
```

在这个示例中：

1. **data.automount**定义了一个自动挂载点，挂载路径为`/mnt/data`，设置了300秒的空闲超时。
2. **data.mount**定义了对应的挂载点，指定设备路径、挂载点、文件系统类型和挂载选项。

##### 启用和启动

启用和启动automount单位文件：

```sh
sudo systemctl enable data.automount
sudo systemctl start data.automount
```

查看状态：

```sh
sudo systemctl status data.automount
```

自动挂载点会在第一次访问`/mnt/data`目录时自动触发挂载操作，并在空闲300秒后自动卸载。

通过使用automount单位文件，可以实现按需挂载，提高系统启动速度和资源利用率。

### swap文件

在systemd中，swap单位文件（.swap文件）用于定义和管理交换分区或交换文件。swap单位文件提供了一种配置交换空间的机制，类似于传统的`/etc/fstab`方式，但更加灵活和可管理。[archlinux wiki说明](https://man.archlinux.org/man/systemd.swap.5.en)

##### swap单位文件的结构

swap单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该交换分区的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **BindsTo**：当指定单位文件停止时，当前单位文件也会停止，常用于交换分区和其依赖的设备之间。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义交换分区的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Swap]部分

定义与交换分区相关的配置选项。

- **What**：指定交换分区或交换文件的路径。
- **Priority**：指定交换空间的优先级，数值越高优先级越高。
- **Options**：指定挂载交换分区的选项，类似于`/etc/fstab`中的选项。
- **TimeoutSec**：指定激活交换分区的超时时间。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义交换分区的目标，例如`multi-user.target`。
- **RequiredBy**：定义交换分区的硬性依赖目标。
- **Alias**：为交换分区定义别名。
- **Also**：在启用或禁用当前交换分区时，同时启用或禁用其他单位文件。

##### 示例

以下是一个简单的交换分区单位文件`swapfile.swap`的示例：

```ini
[Unit]
Description=Swap File
Documentation=man:systemd.swap(5) man:swapon(8) man:swapoff(8)
Requires=systemd-swapfile-create.service
After=systemd-swapfile-create.service

[Swap]
What=/swapfile
Priority=10

[Install]
WantedBy=multi-user.target
```

在这个示例中：

- **[Unit]部分**描述了交换分区的基本信息和依赖关系。
- **[Swap]部分**定义了交换分区的具体配置，如交换文件路径和优先级。
- **[Install]部分**指定了交换分区的目标，以便在相应的目标中启用交换分区。

##### 启用和启动

启用和启动swap单位文件：

```sh
sudo systemctl enable swapfile.swap
sudo systemctl start swapfile.swap
```

查看状态：

```sh
sudo systemctl status swapfile.swap
```

##### 自动生成swap单位文件

systemd可以根据`/etc/fstab`自动生成对应的swap单位文件。例如，如果`/etc/fstab`中有以下条目：

```text
/swapfile none swap sw 0 0
```

那么systemd会自动生成一个类似于上述示例的`swapfile.swap`文件。

通过使用swap单位文件，可以灵活地管理交换分区，设置复杂的依赖关系和挂载选项，提升系统的交换空间管理能力。

### target文件

在systemd中，target单位文件（.target文件）用于定义一组逻辑上相关的单位文件，以便对其进行批量管理和控制。target文件类似于传统的Unix init系统中的运行级别（runlevels），但更灵活和细粒度。target文件通常用于协调系统启动和关闭时的不同阶段，以及管理服务和资源的依赖关系。[archlinux wiki说明](https://man.archlinux.org/man/systemd.target.5.en)

##### target单位文件的结构

target单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该target的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义target的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义target的目标，例如`multi-user.target`。
- **RequiredBy**：定义target的硬性依赖目标。
- **Alias**：为target定义别名。
- **Also**：在启用或禁用当前target时，同时启用或禁用其他单位文件。

##### 常用的target示例

系统中常见的target包括：

- **default.target**：默认target，通常是`multi-user.target`或`graphical.target`。
- **multi-user.target**：相当于传统的运行级别3，提供多用户、网络和非图形界面的环境。
- **graphical.target**：相当于传统的运行级别5，提供图形用户界面（X11或Wayland）。
- **rescue.target**：相当于单用户模式，用于系统救援和修复。
- **emergency.target**：提供最低级别的救援模式，只有基本的系统组件被加载。
- **halt.target**：用于停止系统。
- **poweroff.target**：用于关机。
- **reboot.target**：用于重启系统。
- **suspend.target**：用于挂起系统。
- **hibernate.target**：用于休眠系统。
- **hybrid-sleep.target**：用于混合睡眠（挂起到RAM和磁盘）。

##### 自定义target示例

以下是一个自定义的target单位文件`custom.target`的示例：

```ini
[Unit]
Description=Custom Target
Documentation=man:systemd.target(5)

[Install]
WantedBy=multi-user.target
```

在这个示例中：

- **[Unit]部分**描述了自定义target的基本信息和文档引用。
- **[Install]部分**指定了该target的目标为`multi-user.target`，意味着它将在多用户模式下可用。

##### 启用和启动

启用和启动target单位文件：

```sh
sudo systemctl enable custom.target
sudo systemctl start custom.target
```

查看状态：

```sh
sudo systemctl status custom.target
```

##### 使用target管理系统状态

切换到不同的target：

```sh
sudo systemctl isolate multi-user.target
sudo systemctl isolate graphical.target
```

设置默认target：

```sh
sudo systemctl set-default multi-user.target
sudo systemctl set-default graphical.target
```

查看当前默认target：

```sh
systemctl get-default
```

通过使用target单位文件，可以灵活地管理系统的启动过程和运行状态，设置复杂的依赖关系和系统级任务，提升系统的管理和控制能力。

### path文件

在systemd中，path单位文件（.path文件）用于监视文件或目录的状态变化，并在检测到变化时触发相应的服务或其他单位文件。path单位文件通常与service单位文件配合使用，实现按需启动服务的功能，例如文件创建、修改或删除时自动执行某个服务。[archlinux wiki说明](https://man.archlinux.org/man/systemd.path.5.en)

##### path单位文件的结构

path单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该path单位的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义path单位的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Path]部分

定义与监视路径相关的配置选项。

- **PathExists**：指定要监视的文件或目录路径，如果路径存在则触发。
- **PathExistsGlob**：指定要监视的文件或目录的glob模式。
- **PathChanged**：指定要监视的文件或目录路径，如果路径内容改变则触发。
- **PathModified**：指定要监视的文件或目录路径，如果路径属性改变则触发。
- **DirectoryNotEmpty**：指定要监视的目录路径，如果目录不为空则触发。
- **Unit**：指定要在监视路径发生变化时触发的单位文件，通常是一个service单位文件.
- **MakeDirectory**：如果设置为true，在路径不存在时创建目录。
- **DirectoryMode**：指定在路径不存在时创建的目录的权限模式。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义path单位的目标，例如`multi-user.target`。
- **RequiredBy**：定义path单位的硬性依赖目标。
- **Alias**：为path单位定义别名。
- **Also**：在启用或禁用当前path单位时，同时启用或禁用其他单位文件。

##### 示例

以下是一个简单的path单位文件`example.path`的示例：

```ini
[Unit]
Description=Monitor /tmp/example Directory

[Path]
PathExists=/tmp/example
PathChanged=/tmp/example
Unit=example.service

[Install]
WantedBy=multi-user.target
```

与之对应的service单位文件`example.service`：

```ini
[Unit]
Description=Example Service

[Service]
ExecStart=/usr/bin/example-command
```

在这个示例中：

1. **example.path**定义了一个监视路径`/tmp/example`的path单位文件，监视该目录是否存在以及是否有内容变化。
2. **Unit=example.service**表示当监视路径发生变化时，将触发`example.service`。
3. **example.service**定义了触发时执行的命令或服务。

##### 启用和启动

启用和启动path单位文件：

```sh
sudo systemctl enable example.path
sudo systemctl start example.path
```

查看状态：

```sh
sudo systemctl status example.path
```

##### 使用path单位文件

path单位文件常用于以下场景：

- 监视日志文件的变化并触发日志处理服务。
- 监视配置文件的变化并触发重新加载服务。
- 监视目录的变化并触发文件同步或备份服务。

通过使用path单位文件，可以实现灵活的事件驱动机制，按需触发服务，提高系统的响应能力和资源利用率。

### timer文件

在systemd中，timer单位文件（.timer文件）用于定义和管理定时任务。timer单位文件通常与service单位文件配合使用，实现基于时间的任务调度，类似于cron。timer文件定义了何时触发相应的service文件，提供了灵活和强大的定时任务管理功能。[archlinux wiki说明](https://man.archlinux.org/man/systemd.timer.5.en)


##### timer单位文件的结构

timer单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该timer的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义timer的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Timer]部分

定义与定时任务相关的配置选项。

- **OnActiveSec**：在激活后经过指定时间触发。
- **OnBootSec**：在系统启动后经过指定时间触发。
- **OnStartupSec**：在系统启动后经过指定时间触发（包括从休眠中恢复）。
- **OnUnitActiveSec**：在上一次单位激活后经过指定时间触发。
- **OnUnitInactiveSec**：在上一次单位未激活后经过指定时间触发。
- **OnCalendar**：基于日历时间触发，格式类似于cron表达式。
- **Persistent**：如果设置为true，确保即使系统在计划时间之前关机，定时任务也会在系统启动后立即执行。
- **Unit**：指定要触发的单位文件，通常是一个service单位文件。
- **AccuracySec**：定时任务的精度。
- **RandomizedDelaySec**：指定一个随机延迟时间，以防止所有定时任务同时触发。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义timer的目标，例如`multi-user.target`。
- **RequiredBy**：定义timer的硬性依赖目标。
- **Alias**：为timer定义别名。
- **Also**：在启用或禁用当前timer时，同时启用或禁用其他单位文件。

##### 示例

以下是一个简单的timer单位文件`example.timer`的示例：

```ini
[Unit]
Description=Run Example Service Every Minute

[Timer]
OnBootSec=5min
OnUnitActiveSec=1min
Unit=example.service

[Install]
WantedBy=timers.target
```

与之对应的service单位文件`example.service`：

```ini
[Unit]
Description=Example Service

[Service]
ExecStart=/usr/bin/example-command
```

在这个示例中：

1. **example.timer**定义了一个定时任务，在系统启动5分钟后首次触发，并每分钟触发一次。
2. **Unit=example.service**表示当定时任务触发时，将启动`example.service`。
3. **example.service**定义了触发时执行的命令或服务。

##### 启用和启动

启用和启动timer单位文件：

```sh
sudo systemctl enable example.timer
sudo systemctl start example.timer
```

查看状态：

```sh
sudo systemctl status example.timer
```

##### 使用timer单位文件

timer单位文件常用于以下场景：

- 定期备份数据。
- 定期清理临时文件。
- 定期同步时间。
- 定期检查系统状态并发送报告。

通过使用timer单位文件，可以实现灵活的时间驱动机制，按需触发服务，提高系统的自动化管理能力和效率。

### scope文件

在systemd中，scope单位文件（.scope文件）用于管理由外部创建的进程组。与服务单位（.service文件）不同，scope单位文件是为那些由外部管理（而不是由systemd启动）的进程组设计的。这通常用于在运行时管理由用户或其他进程启动的任务，例如在容器管理器或虚拟化环境中使用。

##### scope单位文件的结构

scope单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该scope的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义scope的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Scope]部分

scope单位文件的[Scope]部分通常没有额外的配置选项，因为scope单位主要是由外部进程创建和管理的。[archlinux wiki说明](https://man.archlinux.org/man/systemd.scope.5.en)

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义scope的目标，例如`multi-user.target`。
- **RequiredBy**：定义scope的硬性依赖目标。
- **Alias**：为scope定义别名。
- **Also**：在启用或禁用当前scope时，同时启用或禁用其他单位文件。

##### 创建和管理scope单位

scope单位通常不是通过编写配置文件来创建的，而是通过systemd的API或命令行工具来动态创建。例如，使用`systemd-run`命令可以创建一个新的scope单位。

##### 例子

假设我们有一个任务需要在一个新的scope中运行，可以使用`systemd-run`命令：

```sh
systemd-run --scope --description="My Custom Scope" /usr/bin/my-task
```

这个命令将启动`/usr/bin/my-task`进程，并将其放置在一个新的scope中，scope的描述为"My Custom Scope"。

##### 查看scope单位

可以使用`systemctl`命令查看scope单位的状态：

```sh
systemctl status my-task.scope
```

##### 示例：动态创建scope

假设我们有一个Python脚本，需要在scope中运行，我们可以通过以下方式动态创建scope：

```python
import subprocess

# 创建并运行新的scope
subprocess.run(['systemd-run', '--scope', '--description=My Python Task', 'python3', '/path/to/my_script.py'])
```

这个脚本将使用`systemd-run`命令创建一个新的scope，并在其中运行指定的Python脚本。

通过使用scope单位文件，可以在运行时动态管理和控制外部创建的进程组，提供更灵活的进程管理和资源控制能力。这在容器管理、虚拟化环境以及其他需要动态进程管理的场景中非常有用。

### slice文件
在systemd中，slice单位文件（.slice文件）用于管理和分配系统资源，如CPU、内存、IO等，给一组相关的服务或进程。slice单位文件通过控制组（cgroups）机制实现资源控制和限制，帮助系统管理员更好地管理资源分配和系统性能。

##### slice单位文件的结构

slice单位文件的结构与其他单位文件类似，包含多个部分，每个部分包含特定类型的选项。

##### [Unit]部分

与其他单位文件相同，用于描述和配置该单位文件的元数据。

- **Description**：描述该slice的简短文字说明。
- **Documentation**：指定文档的URL，供用户参考。
- **Requires**：定义必须存在的其他单位文件。
- **Wants**：定义推荐存在的其他单位文件。
- **Before**：定义在指定单位文件之前启动。
- **After**：定义在指定单位文件之后启动。
- **Conflicts**：定义与当前单位文件有冲突的单位文件。
- **Condition...** 和 **Assert...**：定义slice的启动条件，例如`ConditionPathExists=/some/path`表示只有在指定路径存在时才启动。

##### [Slice]部分

slice单位文件的[Slice]部分通常没有额外的配置选项，因为资源控制和分配是通过cgroups配置实现的。

##### [Install]部分

与其他单位文件相同，用于定义安装时的行为。

- **WantedBy**：定义slice的目标，例如`multi-user.target`。
- **RequiredBy**：定义slice的硬性依赖目标。
- **Alias**：为slice定义别名。
- **Also**：在启用或禁用当前slice时，同时启用或禁用其他单位文件。

##### 配置和使用slice单位文件

slice单位文件主要用于分配和限制资源。例如，可以为不同的服务组创建不同的slice，以确保它们在资源使用上的隔离和控制。

##### 例子

以下是一个简单的slice单位文件`example.slice`的示例：

```ini
[Unit]
Description=Example Slice
Documentation=man:systemd.slice(5)

[Slice]
# 这里可以定义资源控制的选项

[Install]
WantedBy=multi-user.target
```

在这个示例中，`example.slice`是一个简单的slice单位文件，没有特别的资源控制选项配置。要实现资源控制，需要通过cgroups配置。

##### 配置资源控制

在slice单位文件中，资源控制的配置通常是通过在[Service]或其他单位文件中指定。例如：

```ini
[Service]
Slice=example.slice
CPUQuota=20%
MemoryLimit=500M
```

##### 使用slice单位文件

启用和启动slice单位文件：

```sh
sudo systemctl enable example.slice
sudo systemctl start example.slice
```

查看状态：

```sh
sudo systemctl status example.slice
```

##### 实例：为Web服务配置资源限制

假设我们有一个web服务，希望限制其CPU和内存使用，可以创建一个`web.slice`：

```ini
[Unit]
Description=Web Services Slice
Documentation=man:systemd.slice(5)

[Slice]
# 在这里可以添加更多的资源控制选项

[Install]
WantedBy=multi-user.target
```

然后在web服务的单位文件中指定使用该slice，并配置资源限制：

```ini
[Service]
Slice=web.slice
CPUQuota=50%
MemoryLimit=1G
ExecStart=/usr/bin/my-web-server
```

通过这种方式，web服务将被限制在使用50%的CPU和1GB的内存以内，确保其他服务和进程的资源不会被过度占用。


### special文件

systemd的special文件是一组预定义的目标（targets）和服务（services），用于协调系统的启动和停止过程，管理特定的系统状态和服务。这些special文件在系统启动和运行过程中扮演着重要角色，确保系统按预期方式运行。[archlinux wiki说明](https://man.archlinux.org/man/systemd.special.7.en)

以下是一些常见的special文件及其用途：

##### 常用特殊target

1. **default.target**
   - 默认目标，通常是`multi-user.target`或`graphical.target`。
   - 可以通过`systemctl set-default`命令设置默认目标。

2. **graphical.target**
   - 提供完整的图形用户界面，类似于传统的运行级别5。
   - 依赖于`multi-user.target`。

3. **multi-user.target**
   - 提供多用户命令行界面，类似于传统的运行级别3。
   - 依赖于基本系统服务（如网络、cron等）。

4. **rescue.target**
   - 提供单用户模式，主要用于系统救援和修复。
   - 仅启动最小的服务集。

5. **emergency.target**
   - 提供最低级别的救援模式，只有基本的系统组件被加载。
   - 主要用于紧急修复系统。

6. **halt.target**
   - 用于停止系统，但不关闭电源。
   - 用于需要手动关闭系统的场景。

7. **poweroff.target**
   - 用于关机并关闭电源。

8. **reboot.target**
   - 用于重启系统。

9. **suspend.target**
   - 用于将系统挂起到内存（S3）。

10. **hibernate.target**
    - 用于将系统休眠到磁盘（S4）。

11. **hybrid-sleep.target**
    - 用于混合睡眠（将系统挂起到内存和磁盘）。

##### 常用特殊service

1. **getty@.service**
   - 管理虚拟控制台登录提示符（getty）。

2. **dbus.service**
   - 管理D-Bus消息总线系统。

3. **systemd-journald.service**
   - 管理系统日志。

4. **systemd-logind.service**
   - 管理用户登录和会话。

5. **systemd-udevd.service**
   - 管理设备事件和热插拔设备。

### 示例：设置默认目标

要设置默认目标为`graphical.target`，可以使用以下命令：

```sh
sudo systemctl set-default graphical.target
```

要查看当前默认目标：

```sh
systemctl get-default
```

##### 示例：切换目标

要切换到`multi-user.target`：

```sh
sudo systemctl isolate multi-user.target
```

要切换到`graphical.target`：

```sh
sudo systemctl isolate graphical.target
```

##### 使用场景

1. **系统启动**：special文件在系统启动过程中确定系统的目标状态（如多用户模式、图形界面等），并协调服务的启动顺序。
   
2. **系统管理**：通过special文件，可以轻松切换系统运行级别（如从图形界面切换到命令行界面），进行系统救援和修复操作。
   
3. **电源管理**：special文件用于管理系统的电源状态（如挂起、休眠、关机和重启），确保系统按预期方式关闭和恢复。



### 常见命令

- `systemctl start [service]`：启动指定服务。
- `systemctl stop [service]`：停止指定服务。
- `systemctl restart [service]`：重新启动指定服务。
- `systemctl enable [service]`：设置服务开机自动启动。
- `systemctl disable [service]`：取消服务开机自动启动。
- `systemctl status [service]`：查看服务状态。
- `journalctl -u [service]`：查看指定服务的日志。

### 例子

假设我们有一个名为`nginx`的服务，以下是一些常见的管理操作：

- 启动nginx服务：`sudo systemctl start nginx`
- 停止nginx服务：`sudo systemctl stop nginx`
- 重新启动nginx服务：`sudo systemctl restart nginx`
- 查看nginx服务状态：`sudo systemctl status nginx`
- 设置nginx服务开机自动启动：`sudo systemctl enable nginx`
- 取消nginx服务开机自动启动：`sudo systemctl disable nginx`
