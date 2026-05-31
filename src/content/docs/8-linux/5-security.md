---
title: linux安全机制
description: Linux DAC、ACL、SELinux 和 AppArmor 的权限边界与高风险命令说明。
---

在 Linux 中，安全机制主要包括自主访问控制 (Discretionary Access Control, DAC) 和强制访问控制 (Mandatory Access Control, MAC)。这两种机制提供不同的安全控制模型，用于限制系统资源访问。实际访问检查会受到内核、LSM、能力集和文件系统特性的共同影响；不要把某一种机制当成唯一边界。

## attr 属性

`lsattr` 是一个 Linux 命令，用于显示文件或目录的属性。它来自 e2fs 工具集，常用于查看 Linux 文件系统属性；具体属性是否生效取决于文件系统。文件属性可以控制文件的某些行为，比如防止文件被删除、修改或重命名。以下是 `lsattr` 命令的基本用法和常见选项：

### 基本用法

```bash
lsattr [选项] [文件或目录]
```

### 常见选项

- `-a`：显示包括隐藏文件在内的所有文件的属性。
- `-d`：如果是目录，仅显示目录本身的属性，而不是目录内容的属性。
- `-R`：递归显示目录及其内容的属性。
- `-v`：显示文件的版本号。

### 属性说明

- `a`：仅允许追加数据到文件（append only）。
- `c`：文件已压缩（compressed）。
- `d`：文件是一个目录（directory）。
- `i`：文件不能被删除、重命名或链接（immutable）。
- `s`：请求删除后清零数据块；该行为依赖文件系统支持，不应当作可靠的数据销毁方式。
- `u`：请求删除时保留内容以便恢复；该行为依赖文件系统支持。

### 示例

1. 显示当前目录中所有文件的属性：

   ```bash
   lsattr
   ```

2. 显示隐藏文件和目录的属性：

   ```bash
   lsattr -a
   ```

3. 显示某个特定文件的属性：

   ```bash
   lsattr filename
   ```

4. 递归显示某个目录及其内容的属性：

   ```bash
   lsattr -R directoryname
   ```

5. 显示目录本身的属性而不是其内容：

   ```bash
   lsattr -d directoryname
   ```

### 修改文件属性

使用 `chattr` 命令可以更改文件或目录的属性。

> 警告：`chattr +a` 和 `chattr +i` 会改变文件写入、删除和重命名行为；设置或清除 `a`、`i` 通常需要 superuser 或 `CAP_LINUX_IMMUTABLE` 能力。对配置文件执行前，先确认有恢复路径。

设置文件为只允许追加数据：

```bash
sudo chattr +a filename
```

将文件设置为不可变（无法删除、修改、重命名）：

```bash
sudo chattr +i filename
```

## 自主访问控制(Discretionary Access Control)

在 Linux 中，权限管理是系统安全的一个关键部分。它通过用户和组的概念以及文件权限的设置来控制对文件和目录的访问。传统 root 或具备相关 Linux capabilities 的进程可以绕过许多 DAC 限制，但仍可能受到 MAC、挂载选项、文件系统属性或内核策略限制。以下是 Linux 权限管理的基础介绍：

### 1. 用户和组

#### 用户

- 每个用户都有一个唯一的用户 ID (UID)。
- 每个用户都属于至少一个组，这个组称为主组。
- 用户可以属于多个组，这些组称为附加组。

##### 组

- 每个组都有一个唯一的组 ID (GID)。
- 组用于将用户集合在一起，以便简化权限管理。

##### 管理用户和组的命令

> 警告：用户和组命令会改变登录身份、文件归属和权限边界。删除用户或组前，先确认其拥有的文件、运行中的服务和定时任务。

- 添加用户：`sudo useradd username`
- 删除用户：`sudo userdel username`
- 修改用户：`sudo usermod -aG groupname username` (将用户添加到附加组)
- 添加组：`sudo groupadd groupname`
- 删除组：`sudo groupdel groupname`

### 2. 文件和目录权限

每个文件和目录都有三个权限集合：

1. **用户权限 (user)**：文件所有者的权限。
2. **组权限 (group)**：文件所属组的权限。
3. **其他权限 (others)**：所有其他用户的权限。

每个权限集合包含三种权限类型：

- **读 (r)**：读取文件内容或列出目录内容。
- **写 (w)**：修改文件内容或在目录中创建、删除文件。
- **执行 (x)**：执行文件或进入目录。

#### 查看权限

使用 `ls -l` 命令查看文件和目录的权限：

```bash
ls -l
```

输出示例：

```bash
-rwxr-xr--
```

解释：

- 第一个字符表示文件类型（`-` 为普通文件，`d` 为目录）。
- 接下来的九个字符表示权限，每三个字符为一组（用户、组、其他）。
  - `r` 表示读权限。
  - `w` 表示写权限。
  - `x` 表示执行权限。
  - `-` 表示没有该权限。

##### 修改权限

使用 `chmod` 命令修改文件和目录的权限：

符号模式：

- 给文件所有者添加执行权限：`chmod u+x filename`
- 去掉组写权限：`chmod g-w filename`
- 设置其他用户为只读：`chmod o=r filename`

数字模式：

- 权限可以用一个三位的八进制数表示，每一位分别表示用户、组和其他用户的权限。
  - 读权限 (r) = 4
  - 写权限 (w) = 2
  - 执行权限 (x) = 1
- 例如，设置文件的权限为 `rwxr-xr--`：

  ```bash
  chmod 754 filename
  ```

### 3. 改变文件所有者和组

> 警告：`chown` 会改变文件所有权，可能扩大或切断访问权限。递归修改目录前先用 `ls -l` 或 `find` 确认目标范围。

使用 `chown` 命令改变文件的所有者和组：

- 改变文件所有者：`sudo chown newowner filename`
- 改变文件组：`sudo chown :newgroup filename`
- 同时改变文件所有者和组：`sudo chown newowner:newgroup filename`

### 4. 特殊权限

#### set-user-ID

- 当可执行文件设置了 set-user-ID 位时，用户在执行该文件时将拥有该文件所有者的权限。
- 设置 set-user-ID：`chmod u+s filename`
- 示例：`-rwsr-xr-x`

#### set-group-ID

- 当目录设置了 set-group-ID 位时，所有在该目录下创建的文件将继承该目录的组。
- 设置 set-group-ID：`chmod g+s directory`
- 示例：`drwxrwsr-x`

##### Sticky Bit

- 当目录设置了 sticky bit 时，只有文件所有者和目录所有者才能删除该目录下的文件。
- 设置 sticky bit：`chmod +t directory`
- 示例：`drwxrwxrwt`

### 访问控制列表(Access Control List)

ACL 提供了比传统权限更细粒度的控制。

安装 ACL 工具包：

> 警告：安装软件包会修改系统包状态；在生产服务器执行前确认发行版和维护窗口。

```bash
sudo apt-get install acl
sudo yum install acl
```

#### 检查文件的 ACL

```bash
getfacl filename
```

##### 设置文件的 ACL

> 警告：`setfacl` 会改变文件访问控制列表，可能授予或撤销用户权限。执行前先用 `getfacl filename` 保存当前 ACL。

```bash
setfacl -m u:username:rw filename
```

##### 删除文件的 ACL

```bash
setfacl -x u:username filename
```

## 强制访问控制(Mandatory Access Control)

Mandatory Access Control (MAC) 是一种访问控制策略，通过强制执行安全策略来限制用户和进程对系统资源的访问。与传统的基于用户和组的自主访问控制 (Discretionary Access Control, DAC) 不同，MAC 强制执行由系统管理员定义的安全策略，用户和进程不能随意更改这些策略。Linux 系统中常见的 MAC 实现包括 SELinux 和 AppArmor。

### SELinux (Security-Enhanced Linux)

SELinux 是由美国国家安全局 (NSA) 开发的一种强制访问控制机制。它通过定义安全策略来控制对文件、进程和系统资源的访问。

#### SELinux 模式

SELinux 有三种模式：

1. **Enforcing**：强制执行 SELinux 策略，禁止未授权的访问。
2. **Permissive**：不强制执行 SELinux 策略，但记录未授权的访问，主要用于调试和策略开发。
3. **Disabled**：禁用 SELinux。

#### 查看和设置 SELinux 模式

> 警告：安装、切换 SELinux 模式或修改策略会影响系统访问控制。不要为了绕过报错直接关闭 SELinux；优先查看审计日志并修正策略。

安装 SELinux 工具包

#### 在 CentOS/RHEL 系统上

使用 `yum` 命令安装 `policycoreutils` 包：

```bash
sudo yum install policycoreutils
```

如果还需要安装额外的 SELinux 管理工具，可以安装 `policycoreutils-python-utils` 或 `policycoreutils-python` 包：

```bash
sudo yum install policycoreutils-python-utils
```

#### 在 Fedora 系统上

使用 `dnf` 命令安装 `policycoreutils` 包：

```bash
sudo dnf install policycoreutils
```

#### 在 Ubuntu/Debian 系统上

使用 `apt-get` 命令安装 `selinux-utils` 包：

```bash
sudo apt-get install selinux-utils
```

#### 在 Arch Linux 系统上

使用 `pacman` 命令安装 `selinux-utils` 包：

```bash
sudo pacman -S selinux-utils
```

查看当前模式：

```bash
sestatus
```

> 警告：`setenforce` 会立即切换 SELinux 运行模式。`Permissive` 会记录但不阻止策略违规，不能当作长期安全配置。

设置模式：

```bash
sudo setenforce 1  # 切换到 Enforcing 模式
sudo setenforce 0  # 切换到 Permissive 模式
```

> 警告：修改 `/etc/selinux/config` 会影响重启后的 SELinux 状态。将 `SELINUX=disabled` 会关闭 SELinux，不应作为常规排障手段。

要永久更改 SELinux 模式，可以编辑 `/etc/selinux/config` 文件：

```bash
sudo vi /etc/selinux/config
```

修改 `SELINUX` 参数：

```bash
SELINUX=enforcing  # enforcing, permissive, or disabled
```

#### 基本命令

查看文件的 SELinux 安全上下文：

```bash
ls -Z filename
```

> 警告：`chcon` 会改变文件安全上下文，可能导致服务无法读取文件或扩大访问范围。生产环境优先使用持久化的 `semanage fcontext` 规则。

更改文件的 SELinux 安全上下文：

```bash
sudo chcon -t httpd_sys_content_t /var/www/html/index.html
```

#### 策略管理

> 警告：`semodule -i/-r` 会安装或卸载 SELinux 策略模块，可能立即影响进程访问。执行前确认模块来源可信并保留回滚命令。

加载和卸载 SELinux 策略：

```bash
sudo semodule -i mymodule.pp  # 安装策略模块
sudo semodule -r mymodule     # 卸载策略模块
```

> 警告：`setsebool -P` 会持久修改 SELinux 布尔值。先查看当前值和策略说明，再决定是否永久启用。

管理布尔值（布尔值用于临时修改策略的某些方面）：

```bash
sudo getsebool -a            # 查看所有布尔值
sudo setsebool httpd_enable_cgi on   # 启用某个布尔值
sudo setsebool -P httpd_enable_cgi on  # 永久启用布尔值
```

### AppArmor

AppArmor 是一种基于 MAC 的访问控制系统，通过配置文件定义程序可以访问的资源，使用路径名来定义权限。

#### 安装 AppArmor 工具包

> 警告：安装和启用 AppArmor 会影响进程可访问的文件、网络和能力。切换模式前应确认发行版默认配置和服务兼容性。

##### 在 Ubuntu/Debian 系统上

```bash
sudo apt-get update
sudo apt-get install apparmor apparmor-utils
```

##### 在 Fedora 系统上

```bash
sudo dnf install apparmor apparmor-utils
```

##### 在 openSUSE 系统上

```bash
sudo zypper install apparmor apparmor-utils
```

##### 在 Arch Linux 系统上

```bash
sudo pacman -S apparmor
```

#### AppArmor 模式

AppArmor 也有两种模式：

1. **Enforce**：强制执行 AppArmor 策略。
2. **Complain**：记录但不阻止违反 AppArmor 策略的操作。

#### 查看和设置 AppArmor 模式

查看 AppArmor 状态：

```bash
sudo aa-status
```

将应用程序设置为 Complaining 模式：

```bash
sudo aa-complain /usr/bin/myapp
```

将应用程序设置为 Enforcing 模式：

```bash
sudo aa-enforce /usr/bin/myapp
```

#### AppArmor 配置文件基本格式

AppArmor 配置文件规则通过定义应用程序可以访问的文件、目录、网络资源和系统调用，来实现细粒度的访问控制。每个配置文件通常位于 `/etc/apparmor.d/` 目录下，并针对特定的应用程序进行设置。以下是 AppArmor 配置文件规则的详细介绍：

一个 AppArmor 配置文件的基本格式如下：

```plaintext
#include <tunables/global>

/path/to/application {
  #include <abstractions/base>
  
  /path/to/file_or_directory permissions,
}
```

#### 权限说明

权限字符用于定义应用程序对文件或目录的访问类型。常见文件权限包括：

- `r`：读权限。
- `w`：写权限；对目录可表示创建、删除或重命名目录项。
- `a`：追加写。
- `l`：链接权限。
- `k`：文件锁权限。
- `m`：允许以可执行映射方式映射文件。
- `ix`、`px`、`cx`、`ux`：不同执行转换模式；具体语义应查 AppArmor 配置文件手册。

待核验：不同发行版和 AppArmor 版本支持的权限组合可能不同，复杂策略不要只按本页示例编写。

#### 规则示例

##### 允许读写文件

允许应用程序读取 `/etc/myapp/config` 文件，并写入 `/var/log/myapp.log` 文件：

```plaintext
/etc/myapp/config r,
/var/log/myapp.log rw,
```

##### 允许访问目录

允许应用程序读取和写入 `/tmp/` 目录下的所有文件：

```plaintext
/tmp/** rw,
```

##### 递归规则

递归规则用于指定对目录及其所有子目录和文件的访问权限：

```plaintext
/etc/myapp/** r,
```

##### 网络权限

允许应用程序使用网络套接字：

```plaintext
network inet stream,
network inet dgram,
```

#### 预定义的抽象和变量

AppArmor 提供了一些预定义的抽象和变量，可以在配置文件中包含和使用，以简化规则编写。

##### 抽象

抽象是一些预定义的权限集合，可以在配置文件中包含：

```plaintext
#include <abstractions/base>
#include <abstractions/nameservice>
#include <abstractions/user-tmp>
```

##### 变量

变量用于定义路径和其他可重用的值：

```plaintext
#include <tunables/global>

@{HOME}/** r,
@{PROC}/sys/kernel/shmmax r,
```

#### 示例配置文件

以下是一个完整的示例配置文件，为 `/usr/bin/myapp` 应用程序定义访问规则：

```plaintext
#include <tunables/global>

/usr/bin/myapp {
  #include <abstractions/base>
  
  # 定义应用程序本身的权限
  /usr/bin/myapp mr,
  # 允许读取配置文件
  /etc/myapp/config r,
  
  # 允许写入日志文件
  /var/log/myapp.log rw,
  
  # 允许访问临时目录
  /tmp/** rw,
  
  # 允许读取和写入用户主目录中的特定文件
  @{HOME}/.myapp/** rw,
  
  # 允许访问网络资源
  network inet stream,
  network inet dgram,
}
```

#### 应用和调试配置

##### 加载和重新加载配置文件

> 警告：重新加载 AppArmor 配置会立即影响受限程序。执行前用测试环境验证规则，避免把关键服务切到不可用状态。

修改配置文件后，需要重新加载以应用更改：

```bash
sudo apparmor_parser -r /etc/apparmor.d/usr.bin.myapp
```

##### 设置模式

> 警告：`aa-enforce` 会开始阻止违反策略的访问，`aa-complain` 会记录但不阻止。生产服务切换前先查看日志并确认策略完整。

将应用程序设置为 Enforcing 模式：

```bash
sudo aa-enforce /usr/bin/myapp
```

将应用程序设置为 Complain 模式：

```bash
sudo aa-complain /usr/bin/myapp
```

##### 调试

在 Complain 模式下运行应用程序，可以记录未授权的访问，帮助调试和完善配置文件：

```bash
sudo aa-logprof
```

#### 基本命令

> 警告：`aa-genprof` 会为程序生成/调整 AppArmor 配置，需要人工审阅学习到的访问。不要直接接受不理解的规则。

将程序加入 AppArmor 配置中：

```bash
sudo aa-genprof /usr/bin/myapp
```

查看和管理配置文件的状态：

```bash
sudo aa-status
```

## 参考资料

1. [Linux file attributes manual page](https://man7.org/linux/man-pages/man1/chattr.1.html)（访问日期：2026-05-31）
2. [chmod(1) - Linux manual page](https://man7.org/linux/man-pages/man1/chmod.1.html)（访问日期：2026-05-31）
3. [setfacl(1) - Linux manual page](https://man7.org/linux/man-pages/man1/setfacl.1.html)（访问日期：2026-05-31）
4. [selinux(8) - Linux manual page](https://man7.org/linux/man-pages/man8/selinux.8.html)（访问日期：2026-05-31）
5. [AppArmor documentation](https://apparmor.net/)（访问日期：2026-05-31）
6. [apparmor.d(5)](https://apparmor.net/man/master/apparmor.d/)（访问日期：2026-05-31）
