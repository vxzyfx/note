---
title: linux安全机制
---

在 Linux 中，安全机制主要包括自主访问控制 (Discretionary Access Control, DAC) 和强制访问控制 (Mandatory Access Control, MAC)。这两种机制提供了不同的安全控制模型，用于保护系统资源免受未经授权的访问。在验证权限过程中先使用DAC检查, 如果DAC已经拒绝访问, 则不会调用MAC的规则

## attr属性

`lsattr` 是一个 Linux 命令，用于显示文件或目录的属性。它特别适用于 ext2、ext3 和 ext4 文件系统。文件属性可以控制文件的某些行为，比如防止文件被删除、修改或重命名。以下是 `lsattr` 命令的基本用法和常见选项：

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
- `s`：文件被删除后，其数据块被置零（secure deletion）。
- `u`：文件内容被删除时会保存原始数据（undeletable）。

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
使用 `chattr` 命令可以更改文件或目录的属性。例如，设置文件为只允许追加数据：
```bash
chattr +a filename
```

将文件设置为不可变（无法删除、修改、重命名）：
```bash
chattr +i filename
```

##  自主访问控制(Discretionary Access Control)

在 Linux 中，权限管理是系统安全的一个关键部分。它通过用户和组的概念以及文件权限的设置来控制对文件和目录的访问。`root用户不受DAC的影响`以下是 Linux 权限管理的详细介绍：

### 1. 用户和组

##### 用户
- 每个用户都有一个唯一的用户 ID (UID)。
- 每个用户都属于至少一个组，这个组称为主组。
- 用户可以属于多个组，这些组称为附加组。

##### 组
- 每个组都有一个唯一的组 ID (GID)。
- 组用于将用户集合在一起，以便简化权限管理。

##### 管理用户和组的命令
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

##### 查看权限
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

使用 `chown` 命令改变文件的所有者和组：
- 改变文件所有者：`sudo chown newowner filename`
- 改变文件组：`sudo chown :newgroup filename`
- 同时改变文件所有者和组：`sudo chown newowner:newgroup filename`

### 4. 特殊权限

##### Setuid
- 当可执行文件设置了 setuid 位时，用户在执行该文件时将拥有该文件所有者的权限。
- 设置 setuid：`chmod u+s filename`
- 示例：`-rwsr-xr-x`

##### Setgid
- 当目录设置了 setgid 位时，所有在该目录下创建的文件将继承该目录的组。
- 设置 setgid：`chmod g+s directory`
- 示例：`drwxrwsr-x`

##### Sticky Bit
- 当目录设置了 sticky bit 时，只有文件所有者和目录所有者才能删除该目录下的文件。
- 设置 sticky bit：`chmod +t directory`
- 示例：`drwxrwxrwt`

### 访问控制列表(Access Control List)

ACL 提供了比传统权限更细粒度的控制。

安装ACL工具包

```bash
sudo apt-get install acl
sudo yum install acl
```

##### 检查文件的 ACL
```bash
getfacl filename
```

##### 设置文件的 ACL
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

设置模式（需要重启）：
```bash
sudo setenforce Enforcing   # 切换到 Enforcing 模式
sudo setenforce Permissive  # 切换到 Permissive 模式
```

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

更改文件的 SELinux 安全上下文：
```bash
sudo chcon -t httpd_sys_content_t /var/www/html/index.html
```

#### 策略管理

加载和卸载 SELinux 策略：
```bash
sudo semodule -i mymodule.pp  # 安装策略模块
sudo semodule -r mymodule     # 卸载策略模块
```

管理布尔值（布尔值用于临时修改策略的某些方面）：
```bash
sudo getsebool -a            # 查看所有布尔值
sudo setsebool httpd_enable_cgi on   # 启用某个布尔值
sudo setsebool -P httpd_enable_cgi on  # 永久启用布尔值
```

### AppArmor

AppArmor 是一种基于 MAC 的访问控制系统，通过配置文件定义程序可以访问的资源，使用路径名来定义权限。

#### 安装 AppArmor 工具包

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

权限字符用于定义应用程序对文件或目录的访问类型。常见权限包括：

- `r`：读权限
- `w`：写权限
- `m`：内存映射
- `x`：执行权限
- `u`：Unix 域套接字权限
- `l`：链接权限
- `k`：键权限
- `a`：文件属性更改权限
- `i`：继承权限
- `p`：连接权限
- `c`：创建权限
- `d`：删除权限
- `r`：重新命名权限

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

修改配置文件后，需要重新加载以应用更改：

```bash
sudo apparmor_parser -r /etc/apparmor.d/usr.bin.myapp
```

##### 设置模式

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

将程序加入 AppArmor 配置中：
```bash
sudo aa-genprof /usr/bin/myapp
```

查看和管理配置文件的状态：
```bash
sudo aa-status
```
