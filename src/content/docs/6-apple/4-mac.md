---
title: MAC 笔记
---

## MAC 启动流程

1. **固件阶段（Firmware Stage）**
   - **启动固件 (BootROM)**: 当 Mac 电脑的电源被打开时，首先加载的是启动固件 (BootROM)。它是嵌入在计算机硬件中的低级代码，用于初始化硬件并执行 Power-On Self Test (POST) 检查，确保关键硬件如内存和处理器正常工作。
   - **BootROM** 还会选择一个合适的启动卷，通常是内置硬盘或 SSD。

2. **启动加载程序阶段 (Bootloader Stage)**
   - **EFI (Extensible Firmware Interface)**: 启动固件将控制权交给 EFI 引导加载程序。EFI 是一种引导管理环境，它取代了传统的 BIOS，在这里你可以通过 holding down the Option (Alt) 键来选择不同的启动卷。
   - **Boot.efi**: EFI 加载和执行 `boot.efi` 文件，这个文件位于 macOS 的系统分区中，负责启动 macOS 内核。

3. **内核阶段 (Kernel Stage)**
   - **macOS 内核加载**: `boot.efi` 将 macOS 内核 (XNU) 加载到内存中，并开始初始化系统基础设施，包括内存管理、进程管理、文件系统等。
   - **启动扩展和驱动加载**: 内核加载必要的内核扩展 (Kexts)，这些扩展是设备驱动程序和其他低级别的系统组件。

4. **用户空间阶段 (User Space Stage)**
   - **launchd 启动守护进程**: 当内核初始化完成后，内核会启动第一个用户空间进程 `launchd`。`launchd` 是 macOS 的系统初始化进程，负责加载和管理其他系统守护进程和服务。
   - **启动关键系统服务**: `launchd` 加载和启动所有必要的系统服务和守护进程，包括登录窗口、图形用户界面 (GUI)、网络服务等。

5. **图形用户界面阶段 (GUI Stage)**
   - **登录窗口**: `launchd` 最后启动登录窗口 (loginwindow.app)，这个应用显示用户登录界面，并处理用户认证。
   - **用户登录**: 用户输入凭据登录系统后，登录窗口会初始化用户会话，加载用户特定的设置和应用程序。
   - **桌面显示**: 登录完成后，macOS 会显示桌面环境，启动 Finder 和 Dock，以及其他用户会话的应用程序。


## launchd

`launchd` 是 macOS 和 iOS 操作系统中的一个关键系统进程，负责系统初始化、管理守护进程、以及处理启动和运行时任务。它是苹果公司开发的，用于替代早期的 `init` 系统，并整合了 `inetd`, `cron`, `xinetd`, 和其他守护进程管理工具的功能。

### 主要功能

1. **系统初始化**:
   - `launchd` 是系统启动后执行的第一个用户空间进程，其 PID 永远是 1。它负责加载和启动所有其他系统服务和守护进程。
   - 它启动系统的图形用户界面 (GUI)，包括登录窗口 (loginwindow) 和 Finder。

2. **守护进程管理**:
   - `launchd` 通过称为 "launch agents" 和 "launch daemons" 的配置文件来管理系统中的守护进程和服务。它可以根据需求启动服务，而不仅仅是系统启动时就启动所有服务，从而提高系统性能和响应速度。
   - 它支持守护进程的自动重启，如果某个守护进程崩溃或意外退出，`launchd` 可以自动重新启动它。

3. **事件驱动机制**:
   - `launchd` 支持事件驱动的任务调度。例如，它可以在某个网络端口有连接请求时，启动相应的服务（类似于传统的 `inetd` 功能）。

4. **任务调度**:
   - `launchd` 也可以用来替代 `cron`，负责定时执行任务。通过 `launchd` 的配置文件，你可以指定任务在特定时间或条件下运行。

5. **资源控制**:
   - `launchd` 允许为守护进程和服务配置资源限制，如 CPU 使用、内存使用等。这样可以防止某些进程消耗过多的系统资源。

### 配置文件

`launchd` 的配置文件是基于 XML 格式的 `plist` 文件，通常位于以下目录中：

- **Launch Agents**:
  - 用户特定的守护进程和服务配置文件通常位于 `~/Library/LaunchAgents`。
  - 系统范围内的守护进程和服务配置文件通常位于 `/Library/LaunchAgents`。

- **Launch Daemons**:
  - 系统级别的守护进程和服务配置文件通常位于 `/Library/LaunchDaemons` 和 `/System/Library/LaunchDaemons`。

#### Agents和Daemons区别

1. **运行环境**
   - **LaunchAgents**:
     - `LaunchAgents` 主要用于用户级别的守护进程和服务。
     - 它们在用户登录时启动，并在用户的上下文中运行。换句话说，它们具有访问用户图形界面的权限，可以与桌面应用交互。
     - `LaunchAgents` 运行在用户的会话中，并且可以访问用户的环境变量。

   - **LaunchDaemons**:
     - `LaunchDaemons` 主要用于系统级别的守护进程和服务。
     - 它们在系统启动时启动，并在系统的上下文中运行，而不依赖于任何用户是否登录。
     - `LaunchDaemons` 通常在后台运行，不与图形用户界面交互。这些守护进程通常用于提供系统范围内的服务，如网络、设备管理等。

2. **启动时机**
   - **LaunchAgents**:
     - 仅在用户登录后启动，并在用户注销时停止。如果有多个用户登录，每个用户会话可以拥有自己的 `LaunchAgents` 实例。
     - 适合那些需要与用户交互或者在用户环境下运行的任务或应用程序。

   - **LaunchDaemons**:
     - 在系统启动时自动启动，无需用户登录。它们在系统启动过程的早期阶段运行，并且在没有用户登录的情况下也能运行。
     - 适合那些需要系统范围的控制、后台服务，或与用户无关的服务。

3. **文件位置**
   - **LaunchAgents**:
     - 用户级别的 `LaunchAgents` 配置文件通常位于 `~/Library/LaunchAgents`，只对该用户有效。
     - 系统范围内的 `LaunchAgents` 配置文件通常位于 `/Library/LaunchAgents`，对所有用户有效。

   - **LaunchDaemons**:
     - 系统范围内的 `LaunchDaemons` 配置文件通常位于 `/Library/LaunchDaemons` 或 `/System/Library/LaunchDaemons`，对系统的所有用户有效。

4. **权限和特权**
   - **LaunchAgents**:
     - 运行时使用的是当前登录用户的权限，因此它们受到用户权限的限制。
     - 适合运行需要访问用户资源（如桌面、文件、环境变量）的进程。

   - **LaunchDaemons**:
     - 运行时使用的是系统级权限（通常是 root），拥有更高的权限和特权。这意味着它们能够执行更低级别的系统任务。
     - 适合运行需要高权限、系统范围内控制的进程。


### launchctl

launchctl是与 launchd 交互的命令行工具。你可以使用 launchctl 来加载或卸载守护进程和服务，检查它们的状态，或者启动/停止服务。

1. **`launchctl load`**
   - **功能**: 加载一个指定的服务配置文件（.plist 文件），使服务在系统中启动。
   - **用法**: 
     ```bash
     sudo launchctl load /path/to/service.plist
     ```
   - **注意**: 从 macOS 10.11 (El Capitan) 开始，`load` 和 `unload` 被标记为过时，更推荐使用 `bootstrap` 和 `bootout`。

2. **`launchctl unload`**
   - **功能**: 卸载一个指定的服务配置文件，停止该服务。
   - **用法**:
     ```bash
     sudo launchctl unload /path/to/service.plist
     ```

3. **`launchctl start`**
   - **功能**: 启动一个已经加载的服务。
   - **用法**:
     ```bash
     sudo launchctl start service_label
     ```
   - **示例**: `service_label` 通常是 `.plist` 文件中 `Label` 字段指定的名称。

4. **`launchctl stop`**
   - **功能**: 停止一个已经加载的服务。
   - **用法**:
     ```bash
     sudo launchctl stop service_label
     ```

5. **`launchctl list`**
   - **功能**: 列出当前加载的服务。
   - **用法**:
     ```bash
     launchctl list
     ```
   - **结果**: 会显示一个服务列表，包括服务的 PID（进程 ID），状态，以及 `Label`。

6. **`launchctl print`**
   - **功能**: 显示指定服务的详细信息，包括配置、状态等。
   - **用法**:
     ```bash
     sudo launchctl print system/service_label
     ```

7. **`launchctl bootstrap`**
   - **功能**: 加载一个服务并将其引导到指定的域中，通常用来替代 `load`。
   - **用法**:
     ```bash
     sudo launchctl bootstrap system /path/to/service.plist
     ```
    ```bash
     sudo launchctl bootstrap gui/$(id -u) /path/to/service.plist
     ```
   - **域**: 可以是 `system`、`user/UID` 或 `gui/UID`，其中 `UID` 是用户的 ID。

8. **`launchctl bootout`**
   - **功能**: 从指定的域中卸载一个服务，通常用来替代 `unload`。
   - **用法**:
     ```bash
     sudo launchctl bootout system /path/to/service.plist
     ```

9. **`launchctl kickstart`**
   - **功能**: 强制重新启动一个服务。
   - **用法**:
     ```bash
     sudo launchctl kickstart -k system/service_label
     ```

10. **`launchctl kill`**
    - **功能**: 发送信号给一个进程来终止或控制它。
    - **用法**:
      ```bash
      sudo launchctl kill TERM system/service_label
      ```
    - **信号**: `TERM` 可以替换为其他 UNIX 信号，如 `HUP`、`INT` 等。

#### 高级命令

1. **`launchctl blame`**
   - **功能**: 显示详细的服务启动信息，有助于调试服务加载问题。
   - **用法**:
     ```bash
     sudo launchctl blame system/service_label
     ```

2. **`launchctl dumpstate`**
   - **功能**: 显示 `launchd` 的当前状态，包括所有的服务和守护进程信息。
   - **用法**:
     ```bash
     sudo launchctl dumpstate
     ```

3. **`launchctl log`**
   - **功能**: 配置 `launchd` 的日志级别和模式。
   - **用法**:
     ```bash
     sudo launchctl log level debug
     ```

### plist文件选项

1. **`Label`**
   - 描述: 唯一标识符，标识这个守护进程或服务。
   - 类型: `String`
   - 示例:
     ```xml
     <key>Label</key>
     <string>com.example.myapp</string>
     ```

2. **`Program`**
   - 描述: 需要执行的程序或命令的完整路径。
   - 类型: `String`
   - 示例:
     ```xml
     <key>Program</key>
     <string>/usr/local/bin/myapp</string>
     ```

3. **`ProgramArguments`**
   - 描述: 包含要执行的程序和其参数的数组。`ProgramArguments` 比 `Program` 更常用，因为它能细粒度地控制程序及其参数。
   - 类型: `Array of Strings`
   - 示例:
     ```xml
     <key>ProgramArguments</key>
     <array>
         <string>/usr/local/bin/myapp</string>
         <string>--option1</string>
         <string>value1</string>
     </array>
     ```

4. **`RunAtLoad`**
   - 描述: 指定守护进程是否在加载 `plist` 文件时立即启动。
   - 类型: `Boolean`
   - 示例:
     ```xml
     <key>RunAtLoad</key>
     <true/>
     ```

5. **`KeepAlive`**
   - 描述: 指定当守护进程退出后是否应自动重启。可以是简单的布尔值或复杂的字典，指定特定条件下重启。
   - 类型: `Boolean` 或 `Dictionary`
   - 示例:
     - 简单使用:
       ```xml
       <key>KeepAlive</key>
       <true/>
       ```
     - 更复杂的条件重启:
       ```xml
       <key>KeepAlive</key>
       <dict>
           <key>SuccessfulExit</key>
           <false/>
       </dict>
       ```

6. **`StartInterval`**
   - 描述: 指定以秒为单位的间隔时间，自动重复运行进程。
   - 类型: `Integer`
   - 示例:
     ```xml
     <key>StartInterval</key>
     <integer>3600</integer> <!-- 每小时运行一次 -->
     ```

7. **`StartCalendarInterval`**
   - 描述: 以指定的日期和时间间隔启动进程，类似于 `cron` 的调度功能。可以指定小时、分钟、星期、月份等。
   - 类型: `Dictionary` 或 `Array of Dictionaries`
   - 示例:
     - 每天早上 8 点运行:
       ```xml
       <key>StartCalendarInterval</key>
       <dict>
           <key>Hour</key>
           <integer>8</integer>
           <key>Minute</key>
           <integer>0</integer>
       </dict>
       ```

     - 每周一上午 8 点运行:
       ```xml
       <key>StartCalendarInterval</key>
       <dict>
           <key>Weekday</key>
           <integer>2</integer> <!-- 1=Sunday, 2=Monday, ... -->
           <key>Hour</key>
           <integer>8</integer>
           <key>Minute</key>
           <integer>0</integer>
       </dict>
       ```

8. **`StandardOutPath` 和 `StandardErrorPath`**
   - 描述: 指定标准输出和错误日志的路径。
   - 类型: `String`
   - 示例:
     ```xml
     <key>StandardOutPath</key>
     <string>/var/log/myapp_stdout.log</string>
     <key>StandardErrorPath</key>
     <string>/var/log/myapp_stderr.log</string>
     ```

9. **`EnvironmentVariables`**
   - 描述: 定义进程启动时所使用的环境变量。
   - 类型: `Dictionary`
   - 示例:
     ```xml
     <key>EnvironmentVariables</key>
     <dict>
         <key>PATH</key>
         <string>/usr/local/bin:/usr/bin:/bin</string>
         <key>MY_VAR</key>
         <string>my_value</string>
     </dict>
     ```

10. **`WorkingDirectory`**
   - 描述: 指定进程的工作目录。
   - 类型: `String`
   - 示例:
     ```xml
     <key>WorkingDirectory</key>
     <string>/usr/local/myapp</string>
     ```

11. **`UserName`**
   - 描述: 指定进程应以哪个用户身份运行。这个选项通常用于系统范围内的 `Launch Daemons`。
   - 类型: `String`
   - 示例:
     ```xml
     <key>UserName</key>
     <string>username</string>
     ```

12. **`SessionCreate`**
   - 描述: 指定守护进程是否需要一个新的登录会话。这个选项适用于需要 GUI 环境的应用。
   - 类型: `Boolean`
   - 示例:
     ```xml
     <key>SessionCreate</key>
     <true/>
     ```

13. **`ThrottleInterval`**
   - 描述: 设置两个连续启动尝试之间的最短时间间隔（秒），防止进程频繁重启。
   - 类型: `Integer`
   - 示例:
     ```xml
     <key>ThrottleInterval</key>
     <integer>60</integer>
     ```

#### 完整示例

以下是一个完整的 `Launch Agent` `plist` 文件示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.example.myapp</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/myapp</string>
        <string>--option1</string>
        <string>value1</string>
    </array>

    <key>RunAtLoad</key>
    <true/>

    <key>KeepAlive</key>
    <true/>

    <key>StartInterval</key>
    <integer>600</integer>

    <key>StandardOutPath</key>
    <string>/var/log/myapp_stdout.log</string>

    <key>StandardErrorPath</key>
    <string>/var/log/myapp_stderr.log</string>
</dict>
</plist>
```

## log

在 macOS 中，`log` 命令是一个强大的工具，用于查看、筛选、分析系统日志和诊断信息。它取代了早期的 `syslog` 和 `asl` 工具，提供了更丰富的功能和灵活性。以下是 `log` 命令的常用用法和一些示例。

### 基本用法

#### 1. **查看实时日志**
   - 查看系统的实时日志输出，可以使用以下命令：
     ```bash
     log stream
     ```
   - 如果你只想查看特定的日志类别（如应用日志），可以使用：
     ```bash
     log stream --predicate 'eventMessage contains "keyword"'
     ```
   - 示例：查看包含“error”的日志信息：
     ```bash
     log stream --predicate 'eventMessage contains "error"'
     ```

#### 2. **查看系统日志历史**
   - 你可以查看过去的系统日志条目：
     ```bash
     log show
     ```
   - 由于日志数量可能非常庞大，通常可以配合 `--info` 或 `--debug` 选项来精简输出，或者使用谓词筛选：
     ```bash
     log show --predicate 'eventMessage contains "keyword"'
     ```
   - 示例：查看过去一小时内的所有错误日志：
     ```bash
     log show --predicate 'eventMessage contains "error"' --info --start "$(date -v-1H +"%Y-%m-%d %H:%M:%S")"
     ```

#### 3. **过滤特定进程的日志**
   - 如果你只想查看某个进程的日志，可以使用 `--predicate` 选项筛选进程名称：
     ```bash
     log show --predicate 'process == "process_name"'
     ```
   - 示例：查看 Safari 浏览器的日志：
     ```bash
     log show --predicate 'process == "Safari"'
     ```

#### 4. **查看崩溃日志**
   - 查看系统崩溃相关的日志，可以筛选崩溃报告：
     ```bash
     log show --predicate 'eventMessage contains "crash"' --info
     ```
   - 也可以直接查看崩溃日志的保存位置，如：
     ```bash
     cat ~/Library/Logs/DiagnosticReports/
     ```

#### 5. **导出日志**
   - 如果需要将日志导出为文件，可以使用 `--output` 选项：
     ```bash
     log show --predicate 'process == "process_name"' --output ~/Desktop/output.log
     ```

#### 6. **统计日志事件**
   - 你可以使用 `log stats` 命令来查看系统日志的统计信息：
     ```bash
     log stats
     ```

### 常用选项总结

- **`--predicate`**: 用于筛选日志的条件，可以基于进程名、事件消息内容、类别等。
- **`--info` / `--debug`**: 控制日志详细程度，`--info` 会显示所有信息日志，`--debug` 会显示调试日志。
- **`--start` / `--end`**: 指定日志显示的时间范围，使用 ISO 8601 格式的时间。
- **`--style compact/json`**: 控制日志的输出格式，`compact` 更易读，`json` 适合进一步处理。
- **`--output`**: 将日志导出到指定文件。

### 示例命令

1. **实时查看指定关键字日志**：
   ```bash
   log stream --predicate 'eventMessage contains "network"'
   ```

2. **查看特定时间段内的错误日志**：
   ```bash
   log show --predicate 'eventMessage contains "error"' --start "2024-08-09 09:00:00" --end "2024-08-09 10:00:00"
   ```

3. **查看和保存某个进程的所有日志**：
   ```bash
   log show --predicate 'process == "MyApp"' --output ~/Desktop/myapp_log.log
   ```

## plist文件

`plist`（Property List）文件是一种常见于 macOS 和 iOS 中的文件格式，用于存储结构化数据。`plist` 文件可以以 XML 或者二进制格式保存，其中 XML 格式更容易阅读和编辑。

### XML 格式的 `plist` 文件结构

#### 基本结构

一个典型的 XML 格式 `plist` 文件包含以下结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- 在这里放置键值对 -->
</dict>
</plist>
```

- **`<?xml version="1.0" encoding="UTF-8"?>`**: 这是 XML 文件的声明，表示文件使用 XML 1.0 版本，并采用 UTF-8 编码。
- **`<!DOCTYPE plist PUBLIC ...>`**: 这是文档类型声明 (DOCTYPE)，指定了 `plist` 文件的 DTD (Document Type Definition)，用于定义文件的合法结构。
- **`<plist version="1.0">`**: 这是 `plist` 文件的根元素，必须包含在文件中，并且需要指定版本号。
- **`<dict>`**: 这是字典 (Dictionary) 的元素，通常作为 `plist` 文件的主要结构，存储键值对。

#### 常用数据类型

1. **字典 (Dictionary)**
   - 表示键值对的集合。每个键值对由 `<key>` 和对应的值（可以是任何支持的类型）组成。
   ```xml
   <dict>
       <key>ExampleKey</key>
       <string>ExampleValue</string>
   </dict>
   ```

2. **数组 (Array)**
   - 表示有序的值列表，每个值可以是任何支持的类型。
   ```xml
   <array>
       <string>Item1</string>
       <string>Item2</string>
   </array>
   ```

3. **字符串 (String)**
   - 表示文本字符串。
   ```xml
   <string>Hello, World!</string>
   ```

4. **整数 (Integer)**
   - 表示整数值。可以为十进制或十六进制。
   ```xml
   <integer>42</integer>
   ```

5. **布尔值 (Boolean)**
   - 表示布尔值，只有 `<true/>` 和 `<false/>` 两种形式。
   ```xml
   <true/>
   <false/>
   ```

6. **日期 (Date)**
   - 表示日期和时间。采用 ISO 8601 格式，通常为 `YYYY-MM-DDTHH:MM:SSZ`。
   ```xml
   <date>2024-08-09T10:45:00Z</date>
   ```

7. **数据 (Data)**
   - 表示二进制数据，以 Base64 编码表示。
   ```xml
   <data>
   SGVsbG8sIFdvcmxkIQ==
   </data>
   ```

8. **浮点数 (Real)**
   - 表示浮点数值。
   ```xml
   <real>3.14</real>
   ```

#### 示例 `plist` 文件

以下是一个简单的 `plist` 文件示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Name</key>
    <string>John Doe</string>
    <key>Age</key>
    <integer>30</integer>
    <key>IsStudent</key>
    <true/>
    <key>Grades</key>
    <array>
        <integer>85</integer>
        <integer>90</integer>
        <integer>78</integer>
    </array>
    <key>Birthdate</key>
    <date>1994-07-15T00:00:00Z</date>
</dict>
</plist>
```

### 二进制格式

`plist` 文件也可以保存为二进制格式，二进制格式更加紧凑，适合在性能要求较高的场合使用。不过，二进制格式不容易直接阅读和编辑，因此通常会通过 macOS 的 `plutil` 工具将其转换为 XML 格式进行查看和编辑：

- 将 `plist` 文件转换为 XML：
  ```bash
  plutil -convert xml1 file.plist
  ```

- 将 `plist` 文件转换为二进制：
  ```bash
  plutil -convert binary1 file.plist
  ```
