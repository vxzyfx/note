---
title: gdb
---

## 基础

GDB (GNU Debugger) 是一个强大的调试工具，广泛用于调试C和C++程序。以下是GDB的基本使用教程，帮助你入门并有效地使用GDB进行调试。

### 安装GDB

在大多数Linux发行版中，你可以通过包管理器安装GDB。例如：

```bash
sudo apt-get install gdb    # Debian/Ubuntu
sudo yum install gdb        # CentOS/RHEL
sudo pacman -S gdb          # Arch Linux
```

### 编译带调试信息的程序

在使用GDB调试程序之前，需要使用 `-g` 选项编译你的程序，以包含调试信息：

```bash
gcc -g -o myprogram myprogram.c
```

### 启动GDB

在终端中运行以下命令启动GDB并加载你的程序：

```bash
gdb myprogram
```

### 常用GDB命令

#### 启动和运行程序

- `run` (或 `r`): 启动程序并运行到断点或程序结束。
- `run [args]`: 运行程序并传递命令行参数。

#### 设置断点

- `break [location]` (或 `b [location]`): 在指定位置设置断点。
  - `break main`: 在 `main` 函数开始处设置断点。
  - `break myprogram.c:10`: 在 `myprogram.c` 文件的第10行设置断点。

#### 控制执行

- `continue` (或 `c`): 继续执行程序，直到下一个断点或程序结束。
- `next` (或 `n`): 执行下一行源代码，不进入函数调用。
- `step` (或 `s`): 执行下一行源代码，如果是函数调用则进入函数。
- `finish`: 执行当前函数直到返回。

#### 检查程序状态

- `print [expression]` (或 `p [expression]`): 打印表达式的值。
  - `print x`: 打印变量 `x` 的值。
- `info locals`: 打印当前函数中的所有局部变量。
- `backtrace` (或 `bt`): 打印当前的调用堆栈。
- `list [location]` (或 `l [location]`): 显示源代码。
  - `list 10`: 显示第10行附近的源代码。

#### 修改变量值

- `set var [variable] = [value]`: 修改变量的值。
  - `set var x = 10`: 将变量 `x` 的值设置为10。

#### 调试多线程程序

- `info threads`: 显示所有线程的信息。
- `thread [num]`: 切换到指定线程。

#### 退出GDB

- `quit` (或 `q`): 退出GDB。

### 示例调试流程

1. **启动GDB并加载程序**

   ```bash
   gdb myprogram
   ```

2. **设置断点**

   ```bash
   (gdb) break main
   ```

3. **运行程序**

   ```bash
   (gdb) run
   ```

4. **查看变量值**

   ```bash
   (gdb) print x
   ```

5. **单步执行代码**

   ```bash
   (gdb) next
   ```

6. **继续执行到下一个断点**

   ```bash
   (gdb) continue
   ```

7. **查看调用堆栈**

   ```bash
   (gdb) backtrace
   ```

8. **退出GDB**

   ```bash
   (gdb) quit
   ```

## gdbinit

在使用GDB时，你可以通过`.gdbinit`文件自动加载GDB命令，使每次启动GDB时自动执行这些命令。以下是配置和使用GDB自动加载命令的步骤：

### 创建 `.gdbinit` 文件

1. **在当前目录创建 `.gdbinit` 文件**：在你要调试的程序所在的目录下创建一个名为 `.gdbinit` 的文件。如果你希望这些命令在所有GDB会话中都生效，可以在你的主目录中创建该文件。

    ```bash
    touch .gdbinit
    ```

2. **编辑 `.gdbinit` 文件**：使用你喜欢的文本编辑器打开 `.gdbinit` 文件，并添加你希望自动加载的GDB命令。例如：

    ```plaintext
    # 设置一个断点在 main 函数
    break main
    
    # 运行程序
    run
    
    # 打印局部变量
    info locals
    ```

### 示例 `.gdbinit` 文件

以下是一个示例 `.gdbinit` 文件，它包含一些常用的GDB命令：

```plaintext
# 设置一个断点在 main 函数
break main

# 运行程序
run

# 打印局部变量
info locals

# 设置一个条件断点
break myfile.c:42 if x == 10

# 打印变量值
print x

# 切换布局为源代码视图
layout src
```

### 安全提示

GDB默认会自动加载当前目录下的 `.gdbinit` 文件，但为了安全起见，它不会自动加载主目录中的 `.gdbinit` 文件，除非你明确允许。你可以通过以下方式允许自动加载：

1. **在GDB启动时使用 `-x` 选项指定加载 `.gdbinit` 文件**：

    ```bash
    gdb -x ~/.gdbinit myprogram
    ```

2. **修改GDB配置文件 `~/.gdbinit`，允许加载主目录中的 `.gdbinit` 文件**：

    在 `~/.gdbinit` 文件中添加以下命令：

    ```plaintext
    add-auto-load-safe-path ~/
    ```

### 自动加载示例

假设你的主目录中有一个 `.gdbinit` 文件，内容如下：

```plaintext
# 设置一个断点在 main 函数
break main

# 运行程序
run
```

你可以通过以下步骤确保GDB会自动加载并执行这些命令：

1. **确保GDB配置允许加载主目录中的 `.gdbinit` 文件**：

    ```plaintext
    add-auto-load-safe-path ~/
    ```

2. **启动GDB并加载程序**：

    ```bash
    gdb myprogram
    ```

## break

`break` 命令用于设置断点，使程序在执行到特定位置时暂停

### 基本用法

1. **在函数入口设置断点**

   ```bash
   (gdb) break function_name
   ```

   例如：

   ```bash
   (gdb) break main
   ```

2. **在文件的特定行设置断点**

   ```bash
   (gdb) break filename:line_number
   ```

   例如：

   ```bash
   (gdb) break myfile.c:10
   ```

3. **在特定的行设置断点（当前文件）**

   ```bash
   (gdb) break line_number
   ```

   例如：

   ```bash
   (gdb) break 25
   ```

### 高级用法

4. **在条件满足时设置断点**

   ```bash
   (gdb) break function_name if condition
   ```

   例如：

   ```bash
   (gdb) break myfunc if x == 5
   ```

5. **在特定地址设置断点**

   ```bash
   (gdb) break *address
   ```

   例如：

   ```bash
   (gdb) break *0x08048450
   ```

### 断点管理

6. **查看所有断点**

   ```bash
   (gdb) info breakpoints
   ```

7. **删除断点**

   ```bash
   (gdb) delete breakpoint_number
   ```

   例如：

   ```bash
   (gdb) delete 1
   ```

8. **禁用断点**

   ```bash
   (gdb) disable breakpoint_number
   ```

   例如：

   ```bash
   (gdb) disable 2
   ```

9. **启用断点**

   ```bash
   (gdb) enable breakpoint_number
   ```

   例如：

   ```bash
   (gdb) enable 2
   ```
9. **启用断点**

   ```bash
   (gdb) tbreak [location]
   ```

   例如：

   ```bash
   (gdb) tbreak main
   ```

### 示例

以下是一些使用 `break` 命令的实际示例：

1. **在 `main` 函数入口设置断点并运行程序**

   ```bash
   (gdb) break main
   (gdb) run
   ```

2. **在 `myfile.c` 文件的第20行设置断点**

   ```bash
   (gdb) break myfile.c:20
   (gdb) run
   ```

3. **在当前文件的第50行设置断点**

   ```bash
   (gdb) break 50
   ```

4. **在 `myfunc` 函数中，当变量 `x` 等于10时设置断点**

   ```bash
   (gdb) break myfunc if x == 10
   ```

5. **查看所有断点**

   ```bash
   (gdb) info breakpoints
   ```

6. **删除第一个断点**

   ```bash
   (gdb) delete 1
   ```

7. **禁用第二个断点**

   ```bash
   (gdb) disable 2
   ```

8. **启用第二个断点**

   ```bash
   (gdb) enable 2
   ```

## watch

`watch` 命令用于设置监视点，使程序在指定变量或内存位置的值发生变化时暂停执行。`watch` 命令非常有用，特别是在调试涉及复杂数据结构或需要监控变量变化的程序时。

### 基本用法

1. **设置监视点**

   ```bash
   (gdb) watch variable
   ```

   例如：

   ```bash
   (gdb) watch x
   ```

   这将设置一个监视点，当变量 `x` 的值发生变化时，程序会暂停执行。

2. **设置条件监视点**

   ```bash
   (gdb) watch variable if condition
   ```

   例如：

   ```bash
   (gdb) watch x if x > 10
   ```

   这将设置一个条件监视点，当变量 `x` 的值发生变化并且满足条件 `x > 10` 时，程序会暂停执行。

### 其他类型的监视点

3. **读取监视点**

   ```bash
   (gdb) rwatch variable
   ```

   例如：

   ```bash
   (gdb) rwatch x
   ```

   这将设置一个读取监视点，当变量 `x` 被读取时，程序会暂停执行。

4. **访问监视点**

   ```bash
   (gdb) awatch variable
   ```

   例如：

   ```bash
   (gdb) awatch x
   ```

   这将设置一个访问监视点，当变量 `x` 被读取或写入时，程序会暂停执行。

### 管理监视点

5. **查看所有监视点**

   ```bash
   (gdb) info watchpoints
   ```

6. **删除监视点**

   ```bash
   (gdb) delete watchpoint_number
   ```

   例如：

   ```bash
   (gdb) delete 2
   ```

7. **禁用监视点**

   ```bash
   (gdb) disable watchpoint_number
   ```

   例如：

   ```bash
   (gdb) disable 2
   ```

8. **启用监视点**

   ```bash
   (gdb) enable watchpoint_number
   ```

   例如：

   ```bash
   (gdb) enable 2
   ```

### 示例

以下是一些使用 `watch` 命令的实际示例：

1. **设置变量 `x` 的监视点**

   ```bash
   (gdb) watch x
   ```

2. **设置变量 `x` 的条件监视点，当 `x > 10` 时**

   ```bash
   (gdb) watch x if x > 10
   ```

3. **设置变量 `x` 的读取监视点**

   ```bash
   (gdb) rwatch x
   ```

4. **设置变量 `x` 的访问监视点**

   ```bash
   (gdb) awatch x
   ```

5. **查看所有监视点**

   ```bash
   (gdb) info watchpoints
   ```

6. **删除第一个监视点**

   ```bash
   (gdb) delete 1
   ```

7. **禁用第二个监视点**

   ```bash
   (gdb) disable 2
   ```

8. **启用第二个监视点**

   ```bash
   (gdb) enable 2
   ```

## info

`info` 命令用于显示调试过程中各种有用的信息，例如断点、变量、寄存器、线程等。

### 常用 `info` 命令

1. **查看断点信息**

   ```bash
   (gdb) info breakpoints
   ```

   显示当前所有断点的信息，包括断点编号、类型、使能状态、位置和命中次数。

2. **查看本地变量**

   ```bash
   (gdb) info locals
   ```

   显示当前函数中的所有本地变量及其值。

3. **查看程序状态**

   ```bash
   (gdb) info program
   ```

   显示程序的当前状态，包括是否在运行、暂停位置等。

4. **查看寄存器**

   ```bash
   (gdb) info registers
   ```

   显示所有CPU寄存器的内容。

5. **查看线程**

   ```bash
   (gdb) info threads
   ```

   显示当前所有线程的信息，包括线程编号、状态和函数调用栈。

6. **查看堆栈帧信息**

   ```bash
   (gdb) info frame
   ```

   显示当前堆栈帧的信息，包括函数名、源码文件、行号和参数值。

7. **查看堆栈**

   ```bash
   (gdb) info stack
   ```

   显示当前的调用堆栈。

8. **查看全局和静态变量**

   ```bash
   (gdb) info variables
   ```

   显示当前程序中的全局和静态变量。

9. **查看源文件信息**

   ```bash
   (gdb) info sources
   ```

   显示已加载的源文件列表。

10. **查看共享库信息**

    ```bash
    (gdb) info sharedlibrary
    ```

    显示已加载的共享库的信息。

11. **查看符号信息**

    ```bash
    (gdb) info functions
    ```

    显示已加载的所有函数符号。

    ```bash
    (gdb) info address symbol_name
    ```

    显示指定符号的地址。

12. **查看内存映射**

    ```bash
    (gdb) info proc mappings
    ```

    显示当前进程的内存映射（仅在Linux上可用）。

13. **查看线程库信息**

    ```bash
    (gdb) info threads
    ```

    显示当前所有线程的信息。

### 示例

以下是一些使用 `info` 命令的实际示例：

1. **查看断点信息**

   ```bash
   (gdb) info breakpoints
   ```

2. **查看当前函数中的本地变量**

   ```bash
   (gdb) info locals
   ```

3. **查看程序的当前状态**

   ```bash
   (gdb) info program
   ```

4. **查看所有寄存器的内容**

   ```bash
   (gdb) info registers
   ```

5. **查看当前所有线程的信息**

   ```bash
   (gdb) info threads
   ```

6. **查看当前堆栈帧的信息**

   ```bash
   (gdb) info frame
   ```

7. **查看当前的调用堆栈**

   ```bash
   (gdb) info stack
   ```

8. **查看全局和静态变量**

   ```bash
   (gdb) info variables
   ```

9. **查看已加载的源文件列表**

   ```bash
   (gdb) info sources
   ```

10. **查看已加载的共享库信息**

    ```bash
    (gdb) info sharedlibrary
    ```

11. **查看已加载的所有函数符号**

    ```bash
    (gdb) info functions
    ```

12. **显示指定符号的地址**

    ```bash
    (gdb) info address myfunc
    ```

13. **查看当前进程的内存映射（仅在Linux上可用）**

    ```bash
    (gdb) info proc mappings
    ```

## 控制执行

1. continue
设置忽略断点的次数

```bash
(gdb) continue [count]
```

2. next
执行多步

```bash
(gdb) next [count]
```

3. step
执行多步

```bash
(gdb) step [count]
```

4. finish
执行当前函数直到返回

```bash
(gdb) finish
```

## print

`print` 命令用于显示表达式的值。该命令在调试过程中非常有用，因为它允许你检查变量、数组、结构体等的数据状态，从而更好地理解程序的运行情况和发现问题。

### 基本用法

1. **打印变量值**

   ```bash
   (gdb) print variable
   ```

   例如：

   ```bash
   (gdb) print x
   ```

   这将显示变量 `x` 的当前值。

2. **打印表达式的值**

   ```bash
   (gdb) print expression
   ```

   例如：

   ```bash
   (gdb) print x + y
   ```

   这将计算并显示表达式 `x + y` 的值。

3. **打印指针的值和解引用**

   ```bash
   (gdb) print pointer
   (gdb) print *pointer
   ```

   例如：

   ```bash
   (gdb) print ptr
   (gdb) print *ptr
   ```

   这将分别显示指针 `ptr` 的地址和值。

### 打印数组和结构体

4. **打印数组**

   ```bash
   (gdb) print array
   ```

   例如：

   ```bash
   int arr[5] = {1, 2, 3, 4, 5};
   (gdb) print arr
   ```

   这将显示数组 `arr` 的所有元素。

5. **打印结构体**

   ```bash
   (gdb) print struct
   ```

   例如：

   ```bash
   struct Point {
       int x;
       int y;
   };
   struct Point p = {10, 20};
   (gdb) print p
   ```

   这将显示结构体 `p` 的所有成员变量及其值。

### 打印指定格式

6. **指定打印格式**

   ```bash
   (gdb) print /format expression
   ```

   格式选项包括：
   - `d`：十进制
   - `x`：十六进制
   - `o`：八进制
   - `t`：二进制
   - `a`：地址
   - `c`：字符
   - `f`：浮点数

   例如：

   ```bash
   (gdb) print /x x
   ```

   这将以十六进制格式显示变量 `x` 的值。

### 示例

假设你在调试一个简单的C程序：

```c
#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    int a = 5;
    int b = 10;
    int arr[3] = {1, 2, 3};
    struct Point p = {20, 30};

    printf("Hello, World!\n");
    return 0;
}
```

在GDB中调试该程序并打印变量、数组和结构体的值：

1. **打印变量 `a` 和 `b` 的值**

   ```bash
   (gdb) print a
   $1 = 5
   (gdb) print b
   $2 = 10
   ```

2. **打印表达式 `a + b` 的值**

   ```bash
   (gdb) print a + b
   $3 = 15
   ```

3. **打印数组 `arr` 的值**

   ```bash
   (gdb) print arr
   $4 = {1, 2, 3}
   ```

4. **打印结构体 `p` 的值**

   ```bash
   (gdb) print p
   $5 = {x = 20, y = 30}
   ```

5. **打印变量 `a` 的十六进制值**

   ```bash
   (gdb) print /x a
   $6 = 0x5
   ```

## backtrace

`backtrace` 命令用于显示当前调用堆栈（call stack），帮助你了解程序执行的路径。通过 `backtrace` 命令，你可以看到当前函数是由哪些函数调用的，以及这些调用链中的每个函数。

### 基本用法

1. **显示完整调用堆栈**

   ```bash
   (gdb) backtrace
   ```

   或者简写形式：

   ```bash
   (gdb) bt
   ```

   这将显示从当前函数开始的完整调用堆栈，包括每个栈帧的函数名、源文件名和行号。

### 带参数的用法

2. **显示指定深度的调用堆栈**

   ```bash
   (gdb) backtrace [n]
   ```

   例如：

   ```bash
   (gdb) backtrace 3
   ```

   这将显示从当前栈帧开始的前3个栈帧。

3. **显示从指定深度开始的调用堆栈**

   ```bash
   (gdb) backtrace [n] [m]
   ```

   例如：

   ```bash
   (gdb) backtrace 3 5
   ```

   这将显示从第3个栈帧开始的5个栈帧。

### 示例

假设你在调试一个简单的C程序：

```c
#include <stdio.h>

void foo() {
    printf("Inside foo\n");
}

void bar() {
    foo();
}

int main() {
    bar();
    return 0;
}
```

在GDB中调试该程序并查看调用堆栈：

1. **在 `foo` 函数中设置断点并运行程序**

   ```bash
   (gdb) break foo
   (gdb) run
   ```

   输出：

   ```bash
   Breakpoint 1, foo () at myfile.c:4
   4       printf("Inside foo\n");
   ```

2. **显示完整调用堆栈**

   ```bash
   (gdb) backtrace
   ```

   输出：

   ```bash
   #0  foo () at myfile.c:4
   #1  0x000000000040114d in bar () at myfile.c:9
   #2  0x0000000000401157 in main () at myfile.c:14
   ```

   这显示了当前栈帧（`foo` 函数）和调用链中的其他函数（`bar` 和 `main`）。

3. **显示前2个栈帧**

   ```bash
   (gdb) backtrace 2
   ```

   输出：

   ```bash
   #0  foo () at myfile.c:4
   #1  0x000000000040114d in bar () at myfile.c:9
   ```

4. **显示从第1个栈帧开始的2个栈帧**

   ```bash
   (gdb) backtrace 1 2
   ```

   输出：

   ```bash
   #1  0x000000000040114d in bar () at myfile.c:9
   #2  0x0000000000401157 in main () at myfile.c:14
   ```

## list

`list` 命令用于显示源代码片段。你可以使用 `list` 命令查看当前调试位置附近的源代码，或者指定文件和行号、函数名等来查看特定位置的代码。

### 基本用法

1. **显示当前执行位置的源代码**

   ```bash
   (gdb) list
   ```

   这将显示当前执行位置附近的源代码。

### 带参数的用法

2. **指定行号**

   ```bash
   (gdb) list line_number
   ```

   例如：

   ```bash
   (gdb) list 10
   ```

   这将显示文件中第10行附近的源代码。

3. **指定文件和行号**

   ```bash
   (gdb) list filename:line_number
   ```

   例如：

   ```bash
   (gdb) list myfile.c:10
   ```

   这将显示 `myfile.c` 文件中第10行附近的源代码。

4. **指定函数**

   ```bash
   (gdb) list function_name
   ```

   例如：

   ```bash
   (gdb) list main
   ```

   这将显示 `main` 函数的源代码。

5. **显示下一部分源代码**

   ```bash
   (gdb) list
   ```

   再次使用 `list` 命令，将显示上一条 `list` 命令之后的源代码。

6. **显示指定范围的源代码**

   ```bash
   (gdb) list line_number_start,line_number_end
   ```

   例如：

   ```bash
   (gdb) list 10,20
   ```

   这将显示从第10行到第20行的源代码。

### 示例

假设你在调试一个简单的C程序：

```c
#include <stdio.h>

void foo() {
    printf("Inside foo\n");
}

void bar() {
    foo();
}

int main() {
    printf("Start of main\n");
    bar();
    printf("End of main\n");
    return 0;
}
```

在GDB中调试该程序并查看源代码：

1. **显示当前执行位置的源代码**

   ```bash
   (gdb) list
   ```

   输出可能如下：

   ```bash
   5       void foo() {
   6           printf("Inside foo\n");
   7       }
   8
   9       void bar() {
   10          foo();
   11      }
   ```

2. **显示第15行附近的源代码**

   ```bash
   (gdb) list 15
   ```

   输出可能如下：

   ```bash
   12
   13      int main() {
   14          printf("Start of main\n");
   15          bar();
   16          printf("End of main\n");
   17          return 0;
   18      }
   ```

3. **显示 `main` 函数的源代码**

   ```bash
   (gdb) list main
   ```

   输出可能如下：

   ```bash
   13      int main() {
   14          printf("Start of main\n");
   15          bar();
   16          printf("End of main\n");
   17          return 0;
   18      }
   ```

4. **显示 `myfile.c` 文件中第5行到第10行的源代码**

   ```bash
   (gdb) list myfile.c:5,10
   ```

   输出可能如下：

   ```bash
   5       void foo() {
   6           printf("Inside foo\n");
   7       }
   8
   9       void bar() {
   10          foo();
   ```

5. **显示下一部分源代码**

   在运行 `list` 命令后，使用 `list` 可以显示下一部分源代码：

   ```bash
   (gdb) list
   ```

   输出可能如下：

   ```bash
   11      }
   12
   13      int main() {
   14          printf("Start of main\n");
   15          bar();
   ```

## set

GDB 中的 `set` 命令用于修改调试器的内部状态、变量的值、设置断点的条件、调整调试选项等。`set` 命令非常灵活，涵盖了许多不同的用法。以下是一些常见的 `set` 命令及其用法示例：

### 基本用法

1. **修改变量的值**

   ```bash
   (gdb) set variable variable_name = value
   ```

   例如：

   ```bash
   (gdb) set var x = 42
   ```

   这将把变量 `x` 的值设置为 `42`。

2. **设置断点的条件**

   ```bash
   (gdb) break function_name
   (gdb) condition breakpoint_number condition
   ```

   例如：

   ```bash
   (gdb) break foo
   (gdb) condition 1 x == 10
   ```

   这将在 `foo` 函数设置一个断点，并在 `x` 等于 `10` 时触发。

### 调整调试选项

3. **设置显示格式**

   ```bash
   (gdb) set print [option]
   ```

   例如：

   ```bash
   (gdb) set print elements 10
   ```

   这将限制打印数组时显示的元素数为 10 个。

4. **设置调试信息**

   ```bash
   (gdb) set logging [option]
   ```

   例如：

   ```bash
   (gdb) set logging on
   ```

   这将开启 GDB 的日志记录。

### 调整运行时参数

5. **设置程序的命令行参数**

   ```bash
   (gdb) set args [arguments]
   ```

   例如：

   ```bash
   (gdb) set args arg1 arg2
   ```

   这将设置程序运行时的命令行参数为 `arg1` 和 `arg2`。

6. **设置环境变量**

   ```bash
   (gdb) set environment VARIABLE = value
   ```

   例如：

   ```bash
   (gdb) set environment PATH = /usr/bin
   ```

   这将设置环境变量 `PATH` 为 `/usr/bin`。

### 设置调试器选项

7. **设置自动显示源代码**

   ```bash
   (gdb) set listsize [number]
   ```

   例如：

   ```bash
   (gdb) set listsize 20
   ```

   这将设置每次显示源代码的行数为 20 行。

8. **设置分页**

   ```bash
   (gdb) set pagination [on|off]
   ```

   例如：

   ```bash
   (gdb) set pagination off
   ```

   这将关闭分页功能，使输出不再分页显示。

### 示例

假设你在调试一个简单的C程序：

```c
#include <stdio.h>

int main() {
    int x = 5;
    int y = 10;
    printf("x = %d, y = %d\n", x, y);
    return 0;
}
```

在GDB中调试该程序并使用 `set` 命令：

1. **修改变量 `x` 的值**

   ```bash
   (gdb) break main
   (gdb) run
   Breakpoint 1, main () at myfile.c:4
   4       int main() {
   (gdb) set var x = 42
   ```

2. **设置断点的条件**

   ```bash
   (gdb) break main
   (gdb) condition 1 x == 5
   ```

3. **设置命令行参数**

   ```bash
   (gdb) set args arg1 arg2
   (gdb) run
   ```

4. **设置环境变量**

   ```bash
   (gdb) set environment PATH = /usr/local/bin
   ```

5. **调整显示格式**

   ```bash
   (gdb) set print elements 5
   ```

6. **开启日志记录**

   ```bash
   (gdb) set logging on
   ```

7. **设置自动显示源代码的行数**

   ```bash
   (gdb) set listsize 15
   ```

8. **关闭分页**

   ```bash
   (gdb) set pagination off
   ```

## thread

`thread` 命令用于调试多线程程序。通过 `thread` 命令，你可以查看和切换不同的线程，检查每个线程的状态，控制线程的执行等。

### 基本用法

1. **查看所有线程**

   ```bash
   (gdb) info threads
   ```

   这将显示当前所有线程的信息，包括线程编号、状态和函数调用栈。

2. **切换到指定线程**

   ```bash
   (gdb) thread thread_number
   ```

   例如：

   ```bash
   (gdb) thread 2
   ```

   这将切换到编号为 `2` 的线程。

3. **查看当前线程**

   ```bash
   (gdb) info thread
   ```

   这将显示当前线程的详细信息。

### 高级用法

4. **对所有线程执行命令**

   ```bash
   (gdb) thread apply all command
   ```

   例如：

   ```bash
   (gdb) thread apply all bt
   ```

   这将对所有线程执行 `bt`（backtrace）命令，显示每个线程的调用堆栈。

5. **对特定线程执行命令**

   ```bash
   (gdb) thread apply thread_number command
   ```

   例如：

   ```bash
   (gdb) thread apply 2 bt
   ```

   这将对编号为 `2` 的线程执行 `bt` 命令，显示该线程的调用堆栈。

### 示例

假设你在调试一个多线程的C程序：

```c
#include <stdio.h>
#include <pthread.h>

void* thread_function(void* arg) {
    printf("Thread %d\n", *(int*)arg);
    return NULL;
}

int main() {
    pthread_t threads[3];
    int thread_args[3];
    for (int i = 0; i < 3; i++) {
        thread_args[i] = i;
        pthread_create(&threads[i], NULL, thread_function, &thread_args[i]);
    }
    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }
    return 0;
}
```

在GDB中调试该程序并查看和切换线程：

1. **启动GDB并运行程序**

   ```bash
   (gdb) run
   ```

2. **查看所有线程**

   ```bash
   (gdb) info threads
   ```

   输出可能如下：

   ```bash
   Id   Target Id         Frame 
   1    Thread 0x7ffff7fbc740 (LWP 12345) "program" 0x00007ffff7a81400 in __GI___libc_read ()
   2    Thread 0x7ffff7dbd700 (LWP 12346) "program" thread_function (arg=0x55555575e2c0) at myfile.c:7
   3    Thread 0x7ffff7fbe700 (LWP 12347) "program" thread_function (arg=0x55555575e2c0) at myfile.c:7
   4    Thread 0x7ffff7dbd700 (LWP 12348) "program" thread_function (arg=0x55555575e2c0) at myfile.c:7
   ```

3. **切换到编号为 `2` 的线程**

   ```bash
   (gdb) thread 2
   ```

   输出可能如下：

   ```bash
   [Switching to thread 2 (Thread 0x7ffff7dbd700 (LWP 12346))]
   #0  thread_function (arg=0x55555575e2c0) at myfile.c:7
   7       printf("Thread %d\n", *(int*)arg);
   ```

4. **查看当前线程的调用堆栈**

   ```bash
   (gdb) backtrace
   ```

   输出可能如下：

   ```bash
   #0  thread_function (arg=0x55555575e2c0) at myfile.c:7
   #1  0x00007ffff7a7ea5a in start_thread (arg=0x7ffff7dbd700) at pthread_create.c:333
   #2  0x00007ffff7b1740f in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:105
   ```

5. **对所有线程执行 `backtrace` 命令**

   ```bash
   (gdb) thread apply all bt
   ```

   输出可能如下：

   ```bash
   Thread 1 (Thread 0x7ffff7fbc740 (LWP 12345)):
   #0  0x00007ffff7a81400 in __GI___libc_read () from /lib/x86_64-linux-gnu/libc.so.6
   #1  0x00007ffff79a8124 in _IO_file_read () from /lib/x86_64-linux-gnu/libc.so.6
   #2  0x00007ffff79a8f27 in _IO_new_file_underflow () from /lib/x86_64-linux-gnu/libc.so.6
   #3  0x00007ffff79a9a06 in __GI__IO_default_uflow () from /lib/x86_64-linux-gnu/libc.so.6
   #4  0x00007ffff799a228 in __GI__IO_getline_info () from /lib/x86_64-linux-gnu/libc.so.6
   #5  0x00007ffff799c11c in __GI__IO_fgets () from /lib/x86_64-linux-gnu/libc.so.6
   #6  0x00005555555548b6 in main () at myfile.c:14

   Thread 2 (Thread 0x7ffff7dbd700 (LWP 12346)):
   #0  thread_function (arg=0x55555575e2c0) at myfile.c:7
   #1  0x00007ffff7a7ea5a in start_thread (arg=0x7ffff7dbd700) at pthread_create.c:333
   #2  0x00007ffff7b1740f in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:105

   Thread 3 (Thread 0x7ffff7fbe700 (LWP 12347)):
   #0  thread_function (arg=0x55555575e2c0) at myfile.c:7
   #1  0x00007ffff7a7ea5a in start_thread (arg=0x7ffff7fbe700) at pthread_create.c:333
   #2  0x00007ffff7b1740f in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:105

   Thread 4 (Thread 0x7ffff7dbd700 (LWP 12348)):
   #0  thread_function (arg=0x55555575e2c0) at myfile.c:7
   #1  0x00007ffff7a7ea5a in start_thread (arg=0x7ffff7dbd700) at pthread_create.c:333
   #2  0x00007ffff7b1740f in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:105
   ```
