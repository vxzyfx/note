---
title: GCC
---

## 介绍
GCC，全称GNU Compiler Collection，是GNU项目开发的编译器系统，支持多种编程语言。它是开源软件，由自由软件基金会（FSF）维护和发布。GCC最初是为C语言设计的，但现已扩展支持C++、Fortran、Ada、Go等多种语言。以下是GCC的一些主要特点和功能介绍：

### 主要特点

1. **多语言支持**：GCC支持C、C++、Fortran、Ada、Go和D语言等，能够编译多种不同的编程语言。
2. **跨平台**：GCC可以在多种操作系统和硬件平台上运行，包括Linux、Windows、macOS等。
3. **优化**：GCC提供多种优化选项，可以在编译时优化代码的性能和大小。
4. **开放源代码**：GCC是开源软件，任何人都可以查看、修改和分发其源代码。
5. **扩展性**：由于其模块化设计，GCC易于扩展，可以添加新的语言前端和优化后端。

### 主要组件

1. **编译器前端**：负责将源代码转换为中间表示（IR），不同的语言有不同的前端。
2. **优化器**：对中间表示进行各种优化，以提高生成代码的性能。
3. **编译器后端**：将优化后的中间表示转换为特定平台的机器代码。
4. **汇编器和链接器**：负责将机器代码汇编成可执行文件，并解决符号引用。

### 使用示例

编译一个简单的C程序：

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

编译上述程序：

```sh
gcc -o hello hello.c
```

生成的可执行文件`hello`可以通过以下命令运行：

```sh
./hello
```

### 常用选项

- `-o <filename>`：指定输出文件名。
- `-Wall`：启用所有常见的警告。
- `-O[level]`：设置优化级别，`-O2`通常是一个常见的优化级别。
- `-g`：生成调试信息，便于使用调试器调试程序。

### 扩展和插件

GCC支持插件，可以通过插件扩展其功能。例如，可以编写插件来添加新的优化、检查代码质量或集成其他工具。

## 常用选项

| 选项            | 描述                                                                                                                                              |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `-o <filename>` | 指定输出文件名。例如：`gcc -o myprogram myprogram.c`。                                                                                            |
| `-c`            | 只编译，不链接。生成目标文件（.o文件）。例如：`gcc -c myprogram.c`。                                                                              |
| `-Wall`         | 启用所有常见的警告信息。                                                                                                                          |
| `-Werror`       | 将所有警告视为错误。                                                                                                                              |
| `-O`            | 启用优化。没有级别时，等价于`-O1`。                                                                                                               |
| `-O0`           | 不进行优化（默认）。                                                                                                                              |
| `-O1`           | 启用基本优化。                                                                                                                                    |
| `-O2`           | 启用大多数优化，不会增加编译时间。                                                                                                                |
| `-O3`           | 启用所有优化，包括一些可能会增加编译时间的优化。                                                                                                  |
| `-Og`           | 为调试生成优化。                                                                                                                                  |
| `-g`            | 生成调试信息。                                                                                                                                    |
| `-I <dir>`      | 添加头文件搜索路径。例如：`gcc -I /path/to/include myprogram.c`。                                                                                  |
| `-L <dir>`      | 添加库文件搜索路径。例如：`gcc -L /path/to/lib myprogram.c`。                                                                                      |
| `-l <library>`  | 链接库文件。例如：`gcc -o myprogram myprogram.o -lm`（链接math库）。                                                                               |
| `-shared`       | 生成共享库。                                                                                                                                      |
| `-fPIC`         | 生成位置无关代码，用于创建共享库。                                                                                                                |
| `-std=<standard>` | 指定C/C++标准，例如`-std=c99`或`-std=c++11`。                                                                                                     |
| `-D <macro>`    | 定义预处理宏。例如：`gcc -DDEBUG myprogram.c`。                                                                                                   |
| `-E`            | 只运行预处理器，不编译。                                                                                                                          |
| `-S`            | 将源代码编译为汇编代码，不进行汇编。                                                                                                              |
| `-fopenmp`      | 启用OpenMP支持，用于并行编程。                                                                                                                    |
| `-pthread`      | 启用POSIX线程支持。                                                                                                                               |
| `-Wextra`       | 启用额外的警告信息。                                                                                                                              |
| `-Wpedantic`    | 启用严格的标准符合性警告。                                                                                                                        |
| `-v`            | 输出编译器的详细信息。                                                                                                                            |
| `--version`     | 显示GCC版本信息。                                                                                                                                |
| `--help`        | 显示GCC的帮助信息。                                                                                                                              |

## GCC组件

| 类别       | 软件组件             | 描述                                                                  |
|------------|----------------------|-----------------------------------------------------------------------|
| 编译器前端 | `gcc`                | C语言编译器                                                           |
| 编译器前端 | `g++`                | C++语言编译器                                                         |
| 编译器前端 | `gfortran`           | Fortran语言编译器                                                     |
| 编译器前端 | `gccgo`              | Go语言编译器                                                          |
| 编译器前端 | `gnat`               | Ada语言编译器                                                         |
| 编译器前端 | `gcc-d`              | D语言编译器（有些版本中可能包含）                                     |
| 库         | `libgcc`             | GCC运行时库，提供基本的低级别支持功能                                |
| 库         | `libstdc++`          | C++标准库，实现了C++标准库的功能                                     |
| 库         | `libgfortran`        | Fortran运行时库，提供Fortran程序运行所需的支持                        |
| 库         | `libgo`              | Go语言运行时库                                                        |
| 库         | `libgnat`            | Ada语言运行时库                                                       |
| 工具       | `cpp`                | C预处理器，用于宏替换、文件包含和条件编译                            |
| 工具       | `as`                 | 汇编器，将汇编语言代码转换为目标代码                                  |
| 工具       | `ld`                 | 链接器，将目标文件和库文件链接成可执行文件                            |
| 工具       | `ar`                 | 归档工具，用于创建、修改和提取静态库（.a文件）                       |
| 工具       | `nm`                 | 列出目标文件的符号表                                                  |
| 工具       | `strip`              | 去除目标文件和可执行文件中的符号表和调试信息                          |
| 工具       | `objdump`            | 显示目标文件的详细信息                                                |
| 工具       | `ranlib`             | 生成静态库的索引                                                      |
| 工具       | `addr2line`          | 将地址转换为源代码文件名和行号                                        |
| 工具       | `c++filt`            | 用于解码被编译器“修饰”的C++符号名称                                  |
| 工具       | `gcov`               | 代码覆盖率分析工具                                                    |
| 工具       | `gprof`              | 性能分析工具，用于生成程序的性能分析报告                              |
| 支持文件   | `specs文件`          | 配置文件，用于指定编译器的默认行为和选项                              |
| 支持文件   | `配置脚本`           | 用于定制和编译GCC时的配置                                             |

## 拓展c语言

GCC在C语言的基础上提供了一些扩展和增强功能，这些扩展有助于提高编程的灵活性、性能和代码可读性。以下是一些常见的GCC C语言扩展：

### 语法扩展

1. **嵌套函数（Nested Functions）**
```c
void func() {
    void nested_func(int x) {
        printf("x = %d\n", x);
    }
    nested_func(5);
}
```

2. **变量声明在语句之间（Mixed Declarations and Code）**
```c
int main() {
    int x = 10;
    printf("x = %d\n", x);
    int y = 20; // 在代码中间声明变量
    printf("y = %d\n", y);
    return 0;
}
```

3. **数组大小灵活初始化（Flexible Array Members）**
```c
struct flexible_array {
    int size;
    int data[];
};
```

4. **语句表达式（Statement Expressions）**
```c
#define square(x) ({ int _x = (x); _x * _x; })
```

### 预处理器扩展

1. **宏变量参数（Variadic Macros）**
```c
#define debug(format, ...) printf(format, ##__VA_ARGS__)
```

2. **宏嵌套（Macro Nesting）**
```c
#define XSTR(x) STR(x)
#define STR(x) #x
```

### 关键字扩展

1. **`__attribute__`**
```c
void my_function() __attribute__((noreturn));
```

2. **`__builtin`**
```c
int count = __builtin_popcount(0xF0F0);
```

### 内联汇编（Inline Assembly）

```c
int x = 10;
int y;
asm ("movl %1, %0\n\t"
     "addl $1, %0"
     : "=r" (y)
     : "r" (x));
```

### 原子操作（Atomic Operations）

```c
int val = 0;
__atomic_add_fetch(&val, 1, __ATOMIC_SEQ_CST);
```

### 内存模型和对齐（Memory Model and Alignment）

1. **对齐指定**
```c
int x __attribute__((aligned(16)));
```

2. **内存屏障**
```c
__sync_synchronize();
```

### 内存分配控制

1. **栈保护（Stack Protection）**
```c
int __attribute__((stack_protect)) secure_function(int x) {
    // Function implementation
}
```

2. **栈大小调整**
```c
int large_array[10000] __attribute__((section(".large_stack")));
```

### 诊断控制

1. **控制警告和错误**
```c
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-variable"
int unused_variable;
#pragma GCC diagnostic pop
```

## 内联汇编

GCC内联汇编（Inline Assembly）是一个强大的功能，允许在C/C++代码中嵌入汇编指令，从而实现对硬件的细粒度控制、优化性能和执行一些标准C/C++无法完成的操作。下面是对GCC内联汇编的详细解释：

### 基本语法

GCC内联汇编的基本语法如下：

```c
asm ("assembly code" : output operands : input operands : clobbered registers);
```

- **assembly code**: 汇编指令字符串，可以包含占位符。
- **output operands**: 输出操作数，指定汇编指令的输出。
- **input operands**: 输入操作数，指定汇编指令的输入。
- **clobbered registers**: 被破坏的寄存器，指定哪些寄存器在汇编指令执行后被修改。

### 操作数约束

操作数约束用于描述汇编指令中操作数的类型。常见的约束符包括：

- **`r`**: 通用寄存器
- **`m`**: 内存位置
- **`i`**: 立即数
- **`a`**: `eax`寄存器
- **`b`**: `ebx`寄存器
- **`c`**: `ecx`寄存器
- **`d`**: `edx`寄存器
- **`S`**: `esi`寄存器
- **`D`**: `edi`寄存器
- **`+`**: 既作为输入也作为输出使用
- **`=`**: 仅写操作数

没有`+`和`=`的约束经作为输入

### 常见的Clobbered Registers

1. **通用寄存器**
   - `"eax"`, `"ebx"`, `"ecx"`, `"edx"`, `"esi"`, `"edi"`, `"esp"`, `"ebp"`等
   - 例如：`"eax"`

2. **条件码寄存器**
   - `"cc"`表示条件码寄存器（condition codes）被修改
   - 例如：`"cc"`

3. **内存**
   - `"memory"`表示内存可能被修改，这对于涉及内存操作的汇编代码尤其重要
   - 例如：`"memory"`


### 基本示例

#### 示例1: 基本加法操作

```c
#include <stdio.h>

int main() {
    int a = 10, b = 20, result;
    asm ("addl %1, %0" : "=r" (result) : "r" (b), "0" (a));
    printf("Result: %d\n", result);
    return 0;
}
```

在这个示例中：
- `"addl %1, %0"`: `addl`指令将`b`（`%1`）加到`a`（`%0`）中，并将结果存储在`result`中。
- `=r` (result): `result`是输出操作数，使用通用寄存器。
- `r` (b), "0" (a): `b`和`a`是输入操作数，使用通用寄存器。

#### 示例2: 移动立即数到寄存器

```c
#include <stdio.h>

int main() {
    int result;
    asm ("movl $42, %0" : "=r" (result));
    printf("Result: %d\n", result);
    return 0;
}
```

在这个示例中：
- `"movl $42, %0"`: 将立即数42移动到`result`中。
- `=r` (result): `result`是输出操作数，使用通用寄存器。

### 详细示例

#### 使用内联汇编进行位操作

```c
#include <stdio.h>

int main() {
    unsigned int a = 5; // 0b0101
    unsigned int result;
    asm ("bsfl %1, %0" : "=r" (result) : "r" (a));
    printf("The index of the least significant set bit is: %u\n", result);
    return 0;
}
```

在这个示例中：
- `"bsfl %1, %0"`: `bsfl`指令查找`a`中最低位的1的索引，并将结果存储在`result`中。
- `=r` (result): `result`是输出操作数，使用通用寄存器。
- `r` (a): `a`是输入操作数，使用通用寄存器。

#### 原子操作

```c
#include <stdio.h>

int main() {
    int value = 5;
    int increment = 3;
    asm volatile ("lock; xaddl %0, %1"
                  : "+r" (increment), "+m" (value)
                  : 
                  : "memory");
    printf("Value: %d, Increment: %d\n", value, increment);
    return 0;
}
```

在这个示例中：
- `"lock; xaddl %0, %1"`: `xadd`指令执行一个原子加操作，将`increment`的值加到`value`中，并将原始的`value`值存储在`increment`中。
- `+r` (increment): `increment`是输入输出操作数，使用通用寄存器。
- `+m` (value): `value`是输入输出操作数，使用内存位置。
- `"memory"`: 声明内存可能被修改。

### 内联汇编中使用内存约束

当使用内存约束时，可以直接操作内存地址。例如：

```c
#include <stdio.h>

int main() {
    int array[5] = {1, 2, 3, 4, 5};
    int index = 2;
    int result;
    asm ("movl (%1,%2,4), %0"
         : "=r" (result)
         : "r" (array), "r" (index));
    printf("Result: %d\n", result);
    return 0;
}
```

在这个示例中：
- `movl (%1,%2,4), %0`: 将数组`array`中第`index`个元素的值移动到`result`中。
- `=r` (result): `result`是输出操作数，使用通用寄存器。
- `r` (array), `r` (index): `array`和`index`是输入操作数，使用通用寄存器。

### Volatile 关键字

使用`volatile`关键字可以防止编译器对内联汇编代码进行优化。例如：

```c
#include <stdio.h>

int main() {
    int value = 10;
    asm volatile ("nop" ::: "memory");
    printf("Value: %d\n", value);
    return 0;
}
```

在这个示例中：
- `"nop"`: `nop`指令不执行任何操作，但`volatile`关键字防止编译器优化掉这条指令。

## g++

`g++` 和 `gcc` 是 GCC（GNU Compiler Collection）中用于编译不同语言的两个不同命令。尽管它们都属于GCC家族，但它们的主要区别在于默认的编译行为和处理方式。以下是详细的区别和用法：

### 主要区别

#### 1. 默认语言

- **gcc**: `gcc` 默认用于编译 C 语言代码。当处理 .c 文件时，`gcc` 会将其作为 C 语言文件进行编译。
- **g++**: `g++` 默认用于编译 C++ 语言代码。当处理 .cpp 文件时，`g++` 会将其作为 C++ 语言文件进行编译。

#### 2. 链接器行为

- **gcc**: `gcc` 在链接阶段不自动链接 C++ 标准库（如 `libstdc++`）。如果需要链接 C++ 标准库，则需要显式指定。
  ```sh
  gcc -o myprogram myprogram.o -lstdc++
  ```

- **g++**: `g++` 在链接阶段会自动链接 C++ 标准库。使用 `g++` 编译和链接 C++ 程序时，不需要手动指定链接 C++ 标准库。
  ```sh
  g++ -o myprogram myprogram.o
  ```

#### 3. 预处理器定义

- **gcc**: 使用 `gcc` 编译 C 代码时，预处理器会定义 `__GNUC__` 和 `__STDC__` 等宏。
- **g++**: 使用 `g++` 编译 C++ 代码时，预处理器会定义 `__GNUC__` 和 `__cplusplus` 等宏。

### 示例

#### 编译 C 代码

```c
#include <stdio.h>

int main() {
    printf("Hello, C!\n");
    return 0;
}
```

- 使用 `gcc` 编译：
  ```sh
  gcc -o hello_c hello.c
  ./hello_c  # 输出：Hello, C!
  ```

- 使用 `g++` 编译（不推荐）：
  ```sh
  g++ -o hello_c hello.c
  ./hello_c  # 输出：Hello, C!
  ```

#### 编译 C++ 代码

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

- 使用 `g++` 编译：
  ```sh
  g++ -o hello_cpp hello.cpp
  ./hello_cpp  # 输出：Hello, C++!
  ```

- 使用 `gcc` 编译（需要显式链接 C++ 标准库）：
  ```sh
  gcc -o hello_cpp hello.cpp -lstdc++
  ./hello_cpp  # 输出：Hello, C++!
  ```

### 编译混合代码

在一些项目中，可能会有混合使用 C 和 C++ 的代码。在这种情况下，可以混合使用 `gcc` 和 `g++`：

```sh
gcc -c c_code.c
g++ -c cpp_code.cpp
g++ -o myprogram c_code.o cpp_code.o
```

## cpp

`cpp` 是 GNU C 预处理器（C Preprocessor），用于在编译 C 或 C++ 程序之前处理宏、文件包含和条件编译等预处理指令。`cpp` 是 GCC 编译器链中的一个关键工具，可以独立使用，也可以与 `gcc` 一起使用。它的主要任务是对源代码进行文本替换和扩展，然后将处理后的代码传递给编译器进行编译。

### 基本使用

`cpp` 的基本语法如下：

```sh
cpp [options] [input-file [output-file]]
```

- `options`：指定要执行的操作。
- `input-file`：输入的源代码文件。
- `output-file`：输出的预处理后文件（如果未指定，默认输出到标准输出）。

### 常用选项

- `-Dname`：定义宏 `name`。
- `-Dname=value`：定义宏 `name` 并赋值 `value`。
- `-Uname`：取消宏 `name` 的定义。
- `-Idir`：添加目录 `dir` 到头文件搜索路径。
- `-E`：仅运行预处理器，不进行编译。
- `-P`：抑制生成的输出中包含行号信息。
- `-C`：保留注释。
- `-nostdinc`：不搜索标准头文件目录。
- `-o file`：将输出写入 `file`。

### 示例

#### 示例 1: 基本使用

假设我们有一个简单的 C 文件 `example.c`：

```c
#include <stdio.h>
#define PI 3.14

int main() {
    printf("PI is %f\n", PI);
    return 0;
}
```

使用 `cpp` 预处理文件：

```sh
cpp example.c
```

输出将类似于：

```c
# 1 "example.c"
# 1 "<built-in>"
# 1 "<command-line>"
# 1 "example.c"

int main() {
    printf("PI is %f\n", 3.14);
    return 0;
}
```

#### 示例 2: 定义宏

使用 `-D` 选项定义宏：

```sh
cpp -DDEBUG example.c
```

如果在 `example.c` 中使用了 `#ifdef DEBUG`，可以根据定义情况进行条件编译：

```c
#include <stdio.h>

#define PI 3.14

int main() {
#ifdef DEBUG
    printf("Debug mode\n");
#endif
    printf("PI is %f\n", PI);
    return 0;
}
```

#### 示例 3: 添加头文件搜索路径

使用 `-I` 选项添加头文件搜索路径：

```sh
cpp -I./include example.c
```

#### 示例 4: 取消宏定义

使用 `-U` 选项取消宏定义：

```sh
cpp -UPI example.c
```

#### 示例 5: 保留注释

使用 `-C` 选项保留注释：

```sh
cpp -C example.c
```

#### 示例 6: 输出到文件

使用 `-o` 选项指定输出文件：

```sh
cpp example.c -o example.i
```

### 高级用法

#### 示例 7: 结合 `gcc` 使用

通常情况下，`cpp` 与 `gcc` 一起使用。可以使用 `-E` 选项仅运行预处理器：

```sh
gcc -E example.c -o example.i
```

#### 示例 8: 条件编译

条件编译在大型项目中非常有用，可以根据特定条件编译代码的不同部分：

```c
#include <stdio.h>

#define WINDOWS

int main() {
#ifdef WINDOWS
    printf("Compiled for Windows\n");
#else
    printf("Compiled for another OS\n");
#endif
    return 0;
}
```

使用 `cpp` 定义不同的宏：

```sh
cpp -DWINDOWS example.c
```

#### 示例 9: 使用环境变量

可以在编译时传递环境变量来控制预处理器行为：

```sh
export DEBUG=1
cpp -DDEBUG=$DEBUG example.c
```

### 在脚本中使用

`cpp` 可以在脚本中使用，以自动化预处理任务。例如：

```sh
#!/bin/bash

# 定义宏和头文件搜索路径
CPPFLAGS="-DDEBUG -I./include"

# 预处理文件
cpp $CPPFLAGS example.c -o example.i
```

## as

GNU Assembler（简称`as`）是GNU Binutils的一部分，用于将汇编语言代码转换为目标文件（通常是`.o`文件）。`as`是一个功能强大且灵活的汇编器，支持多种处理器架构。

以下是一些使用`as`的基本方法和示例：

### 基本使用

#### 汇编代码示例

假设我们有一个简单的汇编代码文件`hello.s`：

```asm
.section .data
hello:
    .string "Hello, World!\n"

.section .text
.global _start

_start:
    # Write the string to stdout
    movl $4, %eax         # syscall number (sys_write)
    movl $1, %ebx         # file descriptor (stdout)
    movl $hello, %ecx     # pointer to string
    movl $13, %edx        # length of string
    int $0x80             # call kernel

    # Exit the program
    movl $1, %eax         # syscall number (sys_exit)
    xorl %ebx, %ebx       # exit status
    int $0x80             # call kernel
```

### 编译和链接

1. **使用`as`编译汇编代码**

   ```sh
   as -o hello.o hello.s
   ```

   这将生成目标文件`hello.o`。

2. **使用`ld`链接目标文件**

   ```sh
   ld -o hello hello.o
   ```

   这将生成可执行文件`hello`。

3. **运行生成的可执行文件**

   ```sh
   ./hello
   ```

   输出将是：

   ```
   Hello, World!
   ```

### `as` 常用选项

- `-o <file>`：指定输出文件名。
- `-g`：生成调试信息。
- `--32`：生成32位代码（适用于x86架构）。
- `--64`：生成64位代码（适用于x86_64架构）。
- `-a`：生成汇编代码的列表文件。

### 示例：带调试信息的编译

```sh
as -g -o hello.o hello.s
```

### 高级使用

#### 使用宏

`as`支持宏定义和使用，下面是一个简单的示例：

```asm
.macro PRINT str
    movl $4, %eax
    movl $1, %ebx
    movl \str, %ecx
    movl $13, %edx
    int $0x80
.endm

.section .data
hello:
    .string "Hello, World!\n"

.section .text
.global _start

_start:
    PRINT hello
    movl $1, %eax
    xorl %ebx, %ebx
    int $0x80
```

在这个示例中，我们定义了一个宏`PRINT`，用于打印字符串。

#### 使用条件汇编

`as`支持条件汇编，可以根据条件编译不同的代码段：

```asm
#ifdef DEBUG
    movl $4, %eax
    int $0x80
#endif
```

#### 包含其他文件

你可以使用`.include`指令来包含其他文件：

```asm
.include "other.s"
```

### 示例：汇编和C代码混合使用

有时我们需要将汇编代码与C代码混合使用。下面是一个简单的示例，展示如何在C程序中调用汇编代码。

1. **汇编代码文件`func.s`**

```asm
.section .text
.global my_func

my_func:
    movl $42, %eax
    ret
```

2. **C代码文件`main.c`**

```c
#include <stdio.h>

extern int my_func();

int main() {
    int result = my_func();
    printf("Result from assembly: %d\n", result);
    return 0;
}
```

3. **编译和链接**

```sh
as -o func.o func.s
gcc -o main main.c func.o
```

4. **运行程序**

```sh
./main
```

输出将是：

```
Result from assembly: 42
```

## ld
`ld` 是 GNU 链接器，用于将多个目标文件和库文件链接成一个可执行文件、共享库或静态库。`ld` 是 GNU Binutils 工具集的一部分，功能强大且灵活。以下是对 `ld` 使用的详细介绍和一些常见示例。

### 基本使用

假设我们有两个目标文件 `main.o` 和 `func.o`，我们希望将它们链接成一个可执行文件 `program`：

```sh
ld -o program main.o func.o
```

### 选项说明

- `-o <file>`：指定输出文件名。
- `<input files>`：一个或多个输入目标文件或库文件。

### 示例

#### 示例 1: 链接目标文件

假设我们有两个目标文件 `main.o` 和 `func.o`：

1. **main.c**

    ```c
    #include <stdio.h>

    extern void func();

    int main() {
        func();
        return 0;
    }
    ```

2. **func.c**

    ```c
    #include <stdio.h>

    void func() {
        printf("Hello from func!\n");
    }
    ```

3. **编译成目标文件**

    ```sh
    gcc -c main.c
    gcc -c func.c
    ```

4. **使用 `ld` 链接**

    ```sh
    ld -o program main.o func.o -lc -dynamic-linker /lib64/ld-linux-x86-64.so.2 -e main
    ```

    其中，`-lc` 链接 C 标准库，`-dynamic-linker` 指定动态链接器，`-e main` 指定程序的入口点为 `main` 函数。

5. **运行可执行文件**

    ```sh
    ./program
    ```

    输出：

    ```
    Hello from func!
    ```

### 链接静态库

假设我们有一个静态库 `libmylib.a` 和一个目标文件 `main.o`，我们希望将它们链接成一个可执行文件：

1. **创建静态库**

    ```sh
    ar rcs libmylib.a func.o
    ```

2. **使用 `ld` 链接**

    ```sh
    ld -o program main.o -L. -lmylib -lc -dynamic-linker /lib64/ld-linux-x86-64.so.2 -e main
    ```

    其中，`-L.` 指定库文件所在目录，`-lmylib` 指定库名（不包含前缀 `lib` 和后缀 `.a`）。

### 链接共享库

假设我们有一个共享库 `libmylib.so` 和一个目标文件 `main.o`，我们希望将它们链接成一个可执行文件：

1. **创建共享库**

    ```sh
    gcc -shared -o libmylib.so func.o
    ```

2. **使用 `ld` 链接**

    ```sh
    ld -o program main.o -L. -lmylib -lc -dynamic-linker /lib64/ld-linux-x86-64.so.2 -e main
    ```

GCC（GNU Compiler Collection）支持使用链接脚本来自定义链接器行为。链接脚本是提供给链接器（通常是 `ld`）的脚本文件，用于控制输出文件的地址、内存布局和其他链接选项。可以通过 `-T` 选项来指定链接脚本。

以下是一些基本的链接脚本语法和示例：

### 链接脚本基本语法
链接脚本主要包含以下几部分：
1. **MEMORY**：定义内存区域。
2. **SECTIONS**：定义输出文件中的各个段及其属性。
3. **ENTRY**：指定程序的入口点。
4. **PHDRS**：定义程序头部。

### 示例链接脚本

#### 示例1：简单链接脚本
这是一个简单的链接脚本，将代码段放在地址 `0x10000`，数据段紧随其后。

```
ENTRY(_start)

SECTIONS
{
  . = 0x10000;             /* 设置起始地址 */

  .text : {
    *(.text)              /* 将所有 .text 段放在一起 */
  }

  .data : {
    *(.data)              /* 将所有 .data 段放在一起 */
  }

  .bss : {
    *(.bss)               /* 将所有 .bss 段放在一起 */
  }
}
```

#### 示例2：使用 MEMORY 定义内存布局
使用 MEMORY 指令定义内存区域，然后在 SECTIONS 中引用这些内存区域。

```
ENTRY(_start)

MEMORY
{
  ROM (rx) : ORIGIN = 0x10000, LENGTH = 256K
  RAM (rwx) : ORIGIN = 0x20000, LENGTH = 128K
}

SECTIONS
{
  .text : {
    *(.text)
  } > ROM                   /* 将 .text 段放到 ROM 中 */

  .data : {
    *(.data)
  } > RAM AT > ROM          /* 将 .data 段放到 RAM 中，但其加载地址在 ROM 中 */

  .bss : {
    *(.bss)
  } > RAM                   /* 将 .bss 段放到 RAM 中 */
}
```

### 使用链接脚本编译

假设链接脚本文件名为 `linker.ld`，编译和链接的命令如下：

```sh
gcc -o output.elf -T linker.ld source.c
```

在这个命令中：
- `-o output.elf`：指定输出文件名。
- `-T linker.ld`：指定链接脚本文件。

#### 更多链接脚本指令

- **ENTRY(symbol)**：指定入口点。
- **PROVIDE(symbol = value)**：提供一个符号及其值。
- **PHDRS**：定义程序头部。
- **ASSERT(condition, message)**：在链接时进行断言检查。
- **KEEP(section)**：强制保留某个段，即使它未被使用。

链接脚本的语法和功能非常强大，可以精确控制程序的内存布局和初始化过程。可以参考 [GNU ld 手册](https://sourceware.org/binutils/docs-2.36/ld/)

### 常用选项

- `-L<dir>`：添加库搜索路径。
- `-l<library>`：链接指定的库。
- `-T <script>`：使用指定的链接脚本。
- `-e <entry>`：指定程序的入口点。
- `-rpath <dir>`：指定运行时库搜索路径。
- `-Bstatic`：强制链接静态库。
- `-Bdynamic`：强制链接共享库。

### 示例：自定义入口点

```sh
ld -o program main.o func.o -lc -dynamic-linker /lib64/ld-linux-x86-64.so.2 -e custom_entry
```

### 常见问题

1. **找不到库**

   如果在链接时找不到库文件，可以使用 `-L` 选项指定库文件所在目录。

   ```sh
   ld -o program main.o -L/path/to/lib -lmylib
   ```

2. **未定义的引用**

   如果在链接时出现未定义的引用错误，确保所有依赖的目标文件和库文件都已正确包含。

## ar

`ar`（GNU Archive）是一个用于创建、修改和提取静态库文件的工具。静态库是由多个目标文件（.o 文件）组成的归档文件，通常用于在链接时将多个目标文件组合成一个单独的库文件。

### 基本使用

`ar` 命令的基本语法如下：

```sh
ar [options] archive-file file...
```

- `options`：指定要执行的操作。
- `archive-file`：要创建或修改的静态库文件。
- `file...`：要添加到静态库中的目标文件。

### 常用选项

- `r`：添加文件到静态库（若库文件不存在则创建）。
- `c`：创建一个新的静态库，即使文件已经存在。
- `t`：显示静态库中的文件列表。
- `x`：从静态库中提取文件。
- `d`：从静态库中删除文件。
- `q`：快速添加文件到静态库（不排序）。
- `s`：创建或更新静态库索引。

### 示例

#### 创建静态库

假设我们有两个目标文件 `foo.o` 和 `bar.o`，我们希望将它们打包成一个静态库 `libmylib.a`：

1. **编译目标文件**

    ```sh
    gcc -c foo.c
    gcc -c bar.c
    ```

2. **创建静态库**

    ```sh
    ar rcs libmylib.a foo.o bar.o
    ```

    其中：
    - `r`：添加文件到静态库。
    - `c`：创建静态库（如果不存在）。
    - `s`：创建静态库索引。

#### 显示静态库中的文件列表

```sh
ar t libmylib.a
```

#### 从静态库中提取文件

```sh
ar x libmylib.a foo.o
```

#### 从静态库中删除文件

```sh
ar d libmylib.a foo.o
```

#### 快速添加文件到静态库

```sh
ar q libmylib.a baz.o
```

#### 更新静态库索引

有时需要手动更新静态库的索引以确保其包含最新的文件信息：

```sh
ar s libmylib.a
```

### 实战示例

#### 示例 1: 创建和使用静态库

假设我们有以下文件：

1. **foo.c**

    ```c
    void foo() {
        // Function implementation
    }
    ```

2. **bar.c**

    ```c
    void bar() {
        // Function implementation
    }
    ```

3. **main.c**

    ```c
    void foo();
    void bar();

    int main() {
        foo();
        bar();
        return 0;
    }
    ```

**步骤：**

1. **编译目标文件**

    ```sh
    gcc -c foo.c
    gcc -c bar.c
    gcc -c main.c
    ```

2. **创建静态库**

    ```sh
    ar rcs libmylib.a foo.o bar.o
    ```

3. **链接静态库**

    ```sh
    gcc -o myprogram main.o -L. -lmylib
    ```

4. **运行可执行文件**

    ```sh
    ./myprogram
    ```

#### 示例 2: 更新静态库

假设我们修改了 `foo.c` 并重新编译：

1. **重新编译 `foo.c`**

    ```sh
    gcc -c foo.c
    ```

2. **更新静态库**

    ```sh
    ar r libmylib.a foo.o
    ```

3. **确保索引更新**

    ```sh
    ar s libmylib.a
    ```

## nm

`nm` 是一个命令行工具，用于显示目标文件、静态库或可执行文件中的符号表信息。符号表包含了程序中定义的所有变量、函数以及其他符号的信息。使用 `nm` 可以帮助开发者调试程序、理解程序结构以及解决链接器错误。

### 基本使用

`nm` 的基本语法如下：

```sh
nm [options] file...
```

- `options`：指定要执行的操作。
- `file...`：要显示符号表信息的目标文件、静态库或可执行文件。

### 常用选项

- `-a`：显示所有符号（默认）。
- `-g`：只显示外部符号（全局符号）。
- `-u`：只显示未定义的符号。
- `-A` 或 `--print-file-name`：在每个符号前显示文件名。
- `-n` 或 `--numeric-sort`：按符号地址排序，而不是按符号名称排序。
- `-p` 或 `--no-sort`：不排序，按符号在文件中的顺序显示。
- `-l` 或 `--line-numbers`：显示每个符号的行号。
- `-S` 或 `--print-size`：显示符号的大小。
- `-r` 或 `--reverse-sort`：以相反的顺序排序。
- `--help`：显示帮助信息。

### 示例

#### 示例 1: 显示目标文件的符号表

假设我们有一个简单的 C 文件 `example.c`：

```c
#include <stdio.h>

void func1() {
    printf("This is func1\n");
}

void func2() {
    printf("This is func2\n");
}

int main() {
    func1();
    func2();
    return 0;
}
```

编译该文件：

```sh
gcc -c example.c -o example.o
```

使用 `nm` 显示符号表：

```sh
nm example.o
```

输出将类似于：

```
0000000000000000 T func1
0000000000000010 T func2
0000000000000020 T main
                 U printf
```

在这个输出中：
- `T` 表示符号在代码段（text section）中定义。
- `U` 表示符号是未定义的（引用了外部符号，例如 `printf`）。

#### 示例 2: 显示可执行文件的符号表

编译生成可执行文件：

```sh
gcc example.c -o example
```

使用 `nm` 显示可执行文件的符号表：

```sh
nm example
```

输出将包含更多的符号，包括由链接器和运行时库添加的符号。

#### 示例 3: 只显示外部符号

使用 `-g` 选项：

```sh
nm -g example.o
```

#### 示例 4: 按符号地址排序

使用 `-n` 选项：

```sh
nm -n example.o
```

#### 示例 5: 显示符号大小

使用 `-S` 选项：

```sh
nm -S example.o
```

#### 示例 6: 显示符号行号

使用 `-l` 选项（需要目标文件包含调试信息）：

```sh
gcc -g -c example.c -o example.o
nm -l example.o
```

### 符号类型

以下是 `nm` 输出中的一些常见符号类型：

- `A`：绝对符号。
- `B` 或 `b`：BSS段符号（未初始化数据）。
- `D` 或 `d`：数据段符号（已初始化数据）。
- `T` 或 `t`：代码段符号（文本段）。
- `U`：未定义符号。
- `W` 或 `w`：弱符号（可以被其他同名全局符号覆盖）。
- `V` 或 `v`：弱符号（可被其他同名全局符号覆盖，针对 C++）。

### 高级示例

#### 示例 7: 分析静态库

假设我们有一个静态库 `libmylib.a`：

```sh
ar rcs libmylib.a example.o
```

使用 `nm` 显示静态库的符号表：

```sh
nm libmylib.a
```

#### 示例 8: 显示未定义的符号

使用 `-u` 选项：

```sh
nm -u example.o
```

## strip

`strip` 是一个用于移除可执行文件、目标文件和静态库中符号表信息的工具。通过移除符号表信息，可以减小文件大小，并在发布软件时提高安全性和隐私。`strip` 是 GNU Binutils 工具集的一部分。

### 基本使用

`strip` 的基本语法如下：

```sh
strip [options] file...
```

- `options`：指定要执行的操作。
- `file...`：要处理的可执行文件、目标文件或静态库。

### 常用选项

- `-s`：移除所有符号信息（默认行为）。
- `-g`：仅移除调试信息。
- `-p`：保留符号表信息，移除调试信息和行号信息。
- `-d`：移除调试信息，但保留局部符号表信息。
- `--strip-unneeded`：仅移除非必要的符号信息。
- `-o <file>`：将输出写入指定文件，而不是原文件。
- `--help`：显示帮助信息。

### 示例

#### 示例 1: 移除所有符号信息

假设我们有一个可执行文件 `example`：

```sh
strip example
```

这将移除 `example` 文件中的所有符号信息。

#### 示例 2: 仅移除调试信息

假设我们有一个可执行文件 `example`，并且希望仅移除其中的调试信息：

```sh
strip -g example
```

#### 示例 3: 保留符号表信息，移除调试信息和行号信息

```sh
strip -p example
```

#### 示例 4: 移除非必要的符号信息

```sh
strip --strip-unneeded example
```

#### 示例 5: 将输出写入指定文件

假设我们有一个可执行文件 `example`，并且希望将处理后的输出写入另一个文件 `example_stripped`：

```sh
strip -o example_stripped example
```

### 详细示例

#### 示例 6: 创建和处理目标文件和静态库

1. **创建目标文件**

    假设我们有以下 C 文件 `example.c`：

    ```c
    #include <stdio.h>

    void foo() {
        printf("This is foo\n");
    }

    int main() {
        foo();
        return 0;
    }
    ```

    编译为目标文件：

    ```sh
    gcc -c example.c -o example.o
    ```

2. **创建静态库**

    创建静态库 `libexample.a`：

    ```sh
    ar rcs libexample.a example.o
    ```

3. **使用 `strip` 处理目标文件和静态库**

    移除目标文件中的所有符号信息：

    ```sh
    strip example.o
    ```

    移除静态库中的所有符号信息：

    ```sh
    strip libexample.a
    ```

#### 示例 7: 查看文件大小变化

使用 `strip` 处理文件后，可以通过 `ls -lh` 命令查看文件大小的变化：

```sh
ls -lh example example_stripped
```

这将显示 `example` 和 `example_stripped` 文件的大小，通常 `example_stripped` 会显著小于 `example`。

#### 示例 8: 在编译时自动移除调试信息

在编译阶段可以使用 `-s` 选项直接生成不包含调试信息的可执行文件：

```sh
gcc -o example example.c -s
```

### 注意事项

- 使用 `strip` 后，调试信息将被移除，可能会使调试和排错变得更加困难。
- 在发布软件时，移除调试信息和符号表信息可以减小文件大小，提高安全性和隐私。
- 在处理共享库时，移除符号信息可能会影响库的使用，建议谨慎操作。

## objdump

`objdump` 是 GNU Binutils 工具集的一部分，用于显示目标文件、静态库和可执行文件的详细信息。它可以反汇编代码、显示符号表、查看节信息等，是分析和调试二进制文件的强大工具。

### 基本使用

`objdump` 的基本语法如下：

```sh
objdump [options] file...
```

- `options`：指定要执行的操作。
- `file...`：要处理的目标文件、静态库或可执行文件。

### 常用选项

- `-a` 或 `--archive-headers`：显示归档文件（静态库）的头信息。
- `-d` 或 `--disassemble`：反汇编可执行文件或目标文件。
- `-D` 或 `--disassemble-all`：反汇编所有节。
- `-f` 或 `--file-headers`：显示文件头信息。
- `-h` 或 `--section-headers` 或 `--headers`：显示节头信息。
- `-t` 或 `--syms` 或 `--symbols`：显示符号表。
- `-r` 或 `--reloc`：显示重定位信息。
- `-s` 或 `--full-contents`：显示所有节的完整内容。
- `-g` 或 `--debugging`：显示调试信息。
- `-e` 或 `--debugging-tags`：显示调试信息的详细标签。
- `-x` 或 `--all-headers`：显示所有头信息。
- `--disassemble-zeroes`：反汇编零字节。
- `-S`：反汇编同时显示源代码（需要调试信息）。
- `-j <name>` 或 `--section <name>`：仅显示指定的节。

### 示例

#### 示例 1: 显示文件头信息

```sh
objdump -f example.o
```

输出示例：

```
example.o:     file format elf64-x86-64
architecture: i386:x86-64, flags 0x00000011:
HAS_RELOC, HAS_SYMS
start address 0x0000000000000000
```

#### 示例 2: 显示节头信息

```sh
objdump -h example.o
```

输出示例：

```
Sections:
Idx Name          Size      VMA               LMA               File off  Algn
  0 .text         00000016  0000000000000000  0000000000000000  00000040  2**4
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
  1 .data         00000004  0000000000000000  0000000000000000  00000056  2**2
                  CONTENTS, ALLOC, LOAD, DATA
  2 .bss          00000004  0000000000000000  0000000000000000  00000060  2**2
                  ALLOC
```

#### 示例 3: 反汇编代码

```sh
objdump -d example.o
```

输出示例：

```
example.o:     file format elf64-x86-64


Disassembly of section .text:

0000000000000000 <func1>:
   0:   b8 01 00 00 00          mov    $0x1,%eax
   5:   c3                      retq   

0000000000000006 <func2>:
   6:   b8 02 00 00 00          mov    $0x2,%eax
   b:   c3                      retq   
```

#### 示例 4: 显示符号表

```sh
objdump -t example.o
```

输出示例：

```
SYMBOL TABLE:
0000000000000000 l    df *ABS*  0000000000000000 example.c
0000000000000000 g     F .text  0000000000000006 func1
0000000000000006 g     F .text  0000000000000006 func2
```

#### 示例 5: 显示重定位信息

```sh
objdump -r example.o
```

输出示例：

```
RELOCATION RECORDS FOR [.text]:
OFFSET           TYPE              VALUE 
0000000000000001 R_X86_64_32       .data
0000000000000007 R_X86_64_32       .data
```

#### 示例 6: 显示所有节的完整内容

```sh
objdump -s example.o
```

输出示例：

```
Contents of section .text:
 0000 b8010000 00c3b802 000000c3                 ............
Contents of section .data:
 0000 00000000                                ....
Contents of section .bss:
```

### 高级用法

#### 示例 7: 反汇编特定的节

```sh
objdump -d -j .text example.o
```

#### 示例 8: 显示带有源代码的反汇编

如果编译时包含了调试信息（使用 `-g` 选项编译）：

```sh
gcc -g -c example.c -o example.o
objdump -S example.o
```

#### 示例 9: 显示调试信息

```sh
objdump -g example.o
```

### 结合使用选项

可以组合多个选项以获得更详细的信息。例如，反汇编代码并显示符号表：

```sh
objdump -d -t example.o
```

## ranlib

`ranlib` 是 GNU Binutils 工具集的一部分，用于生成或更新静态库（归档文件）的索引。这些索引加速了链接器查找库中符号的过程。`ar` 工具创建的静态库在某些情况下可能没有索引，运行 `ranlib` 可以确保静态库的索引是最新的。

### 基本使用

`ranlib` 的基本语法如下：

```sh
ranlib [options] archive
```

- `options`：指定要执行的操作。
- `archive`：要处理的静态库文件。

### 常用选项

- `-t`：显示处理文件的时间戳。
- `-v` 或 `--verbose`：详细模式，显示处理过程的详细信息。
- `-D`：使用新的 GNU 格式（默认行为）。
- `-V` 或 `--version`：显示版本信息并退出。
- `-h` 或 `--help`：显示帮助信息并退出。

### 示例

#### 创建静态库并生成索引

假设我们有两个目标文件 `foo.o` 和 `bar.o`，希望将它们打包成一个静态库 `libmylib.a`：

1. **编译目标文件**

    ```sh
    gcc -c foo.c
    gcc -c bar.c
    ```

2. **使用 `ar` 创建静态库**

    ```sh
    ar rcs libmylib.a foo.o bar.o
    ```

3. **使用 `ranlib` 生成索引**

    ```sh
    ranlib libmylib.a
    ```

    这将生成或更新 `libmylib.a` 的索引。

#### 查看详细信息

使用 `-v` 选项可以查看详细的处理信息：

```sh
ranlib -v libmylib.a
```

输出示例：

```
libmylib.a: creating index
```

### 高级用法

#### 检查时间戳

使用 `-t` 选项可以显示处理文件的时间戳：

```sh
ranlib -t libmylib.a
```

### 集成到构建系统

在一些构建系统（如Makefile）中，可以集成 `ranlib` 以确保静态库索引始终是最新的。例如：

```makefile
# Makefile example
libmylib.a: foo.o bar.o
    ar rcs libmylib.a foo.o bar.o
    ranlib libmylib.a
```

## addr2line

`addr2line` 是 GNU Binutils 工具集的一部分，用于将程序计数器值（地址）转换为源代码文件名和行号。它在调试和分析程序时非常有用，特别是在分析崩溃报告或从堆栈跟踪中定位问题时。

### 基本使用

`addr2line` 的基本语法如下：

```sh
addr2line [options] address...
```

- `options`：指定要执行的操作。
- `address...`：要解析的地址列表。

### 常用选项

- `-e <filename>`：指定要解析地址的可执行文件或目标文件。
- `-f`：显示函数名。
- `-C`：将函数名解码为人类可读的格式（C++函数名解码）。
- `-s`：禁用函数名显示（与`-f`相反）。
- `-i`：显示内联函数信息。
- `-p`：生成更详细的输出，包含文件名、函数名和行号。
- `-a`：显示地址。
- `--help`：显示帮助信息并退出。

### 示例

#### 示例 1: 基本使用

假设我们有一个简单的 C 程序 `example.c`：

```c
#include <stdio.h>

void func() {
    printf("This is func\n");
}

int main() {
    func();
    return 0;
}
```

编译该程序并生成调试信息：

```sh
gcc -g -o example example.c
```

假设我们从调试器或崩溃报告中获得了一个地址 `0x40052d`，我们希望将该地址转换为源代码文件名和行号：

```sh
addr2line -e example 0x40052d
```

输出示例：

```
/path/to/example.c:4
```

这表示地址 `0x40052d` 对应于 `example.c` 文件的第 4 行。

#### 示例 2: 显示函数名

使用 `-f` 选项可以显示函数名：

```sh
addr2line -e example -f 0x40052d
```

输出示例：

```
func
/path/to/example.c:4
```

#### 示例 3: C++ 函数名解码

对于 C++ 程序，使用 `-C` 选项可以将函数名解码为人类可读的格式：

```cpp
#include <iostream>

void foo() {
    std::cout << "This is foo" << std::endl;
}

int main() {
    foo();
    return 0;
}
```

编译该程序并生成调试信息：

```sh
g++ -g -o example_cpp example.cpp
```

假设我们从调试器或崩溃报告中获得了一个地址 `0x40060d`，我们希望将该地址转换为源代码文件名和行号：

```sh
addr2line -e example_cpp -C -f 0x40060d
```

输出示例：

```
foo()
/path/to/example.cpp:4
```

#### 示例 4: 处理多个地址

可以一次性处理多个地址：

```sh
addr2line -e example_cpp -C -f 0x40060d 0x400620
```

输出示例：

```
foo()
/path/to/example.cpp:4
main
/path/to/example.cpp:8
```

#### 示例 5: 详细输出

使用 `-p` 选项生成更详细的输出：

```sh
addr2line -e example_cpp -C -f -p 0x40060d
```

输出示例：

```
foo() at /path/to/example.cpp:4
```

### 高级用法

#### 示例 6: 显示内联函数信息

使用 `-i` 选项可以显示内联函数信息：

```sh
addr2line -e example_cpp -C -f -i 0x40060d
```

#### 示例 7: 禁用函数名显示

使用 `-s` 选项可以禁用函数名显示：

```sh
addr2line -e example_cpp -s 0x40060d
```

### 在脚本中使用

`addr2line` 可以在脚本中使用，以自动化调试和分析任务。例如：

```sh
#!/bin/bash
addr_list=(0x40052d 0x40053d 0x40054d)

for addr in "${addr_list[@]}"; do
    addr2line -e example -f -C "$addr"
done
```

## c++filt

`c++filt` 是 GNU Binutils 工具集的一部分，用于将被编译器“修饰”的（mangled）C++符号名称解码为人类可读的格式。这在调试和分析C++程序时非常有用，因为编译器在编译C++代码时会对函数和变量名称进行修饰，以支持函数重载和其他C++特性。

### 基本使用

`c++filt` 的基本语法如下：

```sh
c++filt [options] [mangled_names...]
```

- `options`：指定要执行的操作。
- `mangled_names...`：一个或多个被修饰的符号名称。

### 常用选项

- `-n`：仅解码修饰的名称（默认行为）。
- `-t`：仅显示类型信息。
- `-p`：解码并解析函数参数。
- `-i`：交互模式，从标准输入读取被修饰的名称。
- `-j`：以C++中修饰名称的格式输出。

### 示例

#### 示例 1: 基本使用

假设我们有一个被修饰的符号名称 `_Z3fooi`，我们希望将其解码为人类可读的格式：

```sh
c++filt _Z3fooi
```

输出示例：

```
foo(int)
```

#### 示例 2: 解码多个名称

我们可以一次性解码多个被修饰的符号名称：

```sh
c++filt _Z3fooi _Z3barv
```

输出示例：

```
foo(int)
bar()
```

#### 示例 3: 从标准输入读取名称

使用 `-i` 选项可以从标准输入读取被修饰的符号名称，并逐行解码：

```sh
echo "_Z3fooi" | c++filt -i
```

输出示例：

```
foo(int)
```

#### 示例 4: 结合 `nm` 使用

在调试和分析二进制文件时，`c++filt` 通常与 `nm` 结合使用。`nm` 显示符号表，`c++filt` 解码被修饰的符号名称：

```sh
nm example | c++filt
```

#### 示例 5: 结合 `addr2line` 使用

在调试时，可以结合 `addr2line` 和 `c++filt` 使用，以便显示更加可读的调试信息：

```sh
addr2line -e example 0x40052d | c++filt
```

### 高级用法

#### 示例 6: 解码并解析函数参数

使用 `-p` 选项可以解码并解析函数参数：

```sh
c++filt -p _Z3fooi
```

输出示例：

```
foo(int)
```

#### 示例 7: 显示类型信息

使用 `-t` 选项可以仅显示类型信息：

```sh
c++filt -t _Z3fooi
```

输出示例：

```
int foo(int)
```

#### 示例 8: 从文件中读取修饰名称

可以将修饰名称存储在一个文件中，然后使用 `cat` 和 `c++filt` 结合解码：

假设我们有一个文件 `mangled_names.txt`，内容如下：

```
_Z3fooi
_Z3barv
```

我们可以使用以下命令解码文件中的所有名称：

```sh
cat mangled_names.txt | c++filt
```

输出示例：

```
foo(int)
bar()
```

### 在脚本中使用

`c++filt` 可以在脚本中使用，以自动化名称解码任务。例如：

```sh
#!/bin/bash
mangled_names=("_Z3fooi" "_Z3barv")

for name in "${mangled_names[@]}"; do
    demangled_name=$(c++filt "$name")
    echo "Demangled name: $demangled_name"
done
```

## gcov

`gcov` 是 GCC（GNU Compiler Collection）提供的一个代码覆盖率分析工具，用于测试代码中哪些部分被执行了，哪些部分没有被执行。通过分析代码覆盖率，开发者可以确定测试的有效性和找出未覆盖的代码路径，从而改进测试用例。

### 基本使用步骤

#### 1. 编译代码

为了使用 `gcov`，需要在编译时使用 `-fprofile-arcs` 和 `-ftest-coverage` 选项：

```sh
gcc -fprofile-arcs -ftest-coverage -o example example.c
```

这些选项会生成必要的覆盖率数据文件（`.gcno` 和 `.gcda` 文件）。

#### 2. 运行程序

运行生成的可执行文件，以便生成覆盖率数据：

```sh
./example
```

运行程序后，会生成 `.gcda` 文件，这些文件包含程序运行时收集的覆盖率数据。

#### 3. 生成覆盖率报告

使用 `gcov` 生成覆盖率报告：

```sh
gcov example.c
```

这会生成一个 `example.c.gcov` 文件，包含每一行代码的覆盖率信息。

### 示例

假设我们有一个简单的 C 程序 `example.c`：

```c
#include <stdio.h>

void func1() {
    printf("This is func1\n");
}

void func2() {
    printf("This is func2\n");
}

int main() {
    func1();
    return 0;
}
```

#### 编译代码

```sh
gcc -fprofile-arcs -ftest-coverage -o example example.c
```

#### 运行程序

```sh
./example
```

#### 生成覆盖率报告

```sh
gcov example.c
```

运行上述命令后，生成的 `example.c.gcov` 文件可能如下所示：

```
        -:    0:Source:example.c
        -:    0:Graph:example.gcno
        -:    0:Data:example.gcda
        -:    0:Runs:1
        -:    0:Programs:1
        -:    1:#include <stdio.h>
        -:    2:
        1:    3:void func1() {
        1:    4:    printf("This is func1\n");
        1:    5:}
        -:    6:
        -:    7:void func2() {
    #####:    8:    printf("This is func2\n");
        -:    9:}
        -:   10:
        1:   11:int main() {
        1:   12:    func1();
        1:   13:    return 0;
        1:   14:}
```

在这个输出中：
- 数字表示该行代码被执行的次数。
- `#####` 表示该行代码从未执行过。

### 常用选项

- `-b`：显示分支覆盖率信息。
- `-c`：显示每条执行路径的覆盖率信息。
- `-f`：显示函数级别的覆盖率信息。
- `-n`：不创建图形文件（`.gcov` 文件）。
- `-o <directory>`：指定生成的覆盖率数据文件的目录。

### 高级用法

#### 显示分支覆盖率信息

```sh
gcov -b example.c
```

#### 显示函数级别的覆盖率信息

```sh
gcov -f example.c
```

### 在脚本中使用

`gcov` 可以在脚本中使用，以自动化覆盖率分析任务。例如：

```sh
#!/bin/bash

# 编译代码
gcc -fprofile-arcs -ftest-coverage -o example example.c

# 运行程序
./example

# 生成覆盖率报告
gcov example.c
```

### 与 lcov 配合使用

`lcov` 是一个更高级的覆盖率工具，可以生成HTML格式的覆盖率报告。

#### 安装 lcov

```sh
sudo apt-get install lcov
```

#### 使用 lcov 生成覆盖率报告

```sh
# 生成初始覆盖率数据
lcov --capture --initial --directory . --output-file coverage.info

# 运行程序
./example

# 生成运行后的覆盖率数据
lcov --capture --directory . --output-file coverage.info

# 生成HTML报告
genhtml coverage.info --output-directory out

# 打开HTML报告
xdg-open out/index.html
```

## gprof

`gprof` 是 GNU Profiler 工具，用于分析程序性能。它可以帮助开发者找出程序中哪些部分消耗了最多的时间和资源，从而进行性能优化。`gprof` 的基本工作流程包括编译、运行程序以生成性能数据文件（`gmon.out`），然后使用 `gprof` 分析性能数据并生成报告。

### 基本使用步骤

#### 1. 编译代码

为了使用 `gprof`，需要在编译时使用 `-pg` 选项：

```sh
gcc -pg -o example example.c
```

#### 2. 运行程序

运行生成的可执行文件，以便生成性能数据文件 `gmon.out`：

```sh
./example
```

运行程序后，当前目录下会生成 `gmon.out` 文件，包含程序运行时收集的性能数据。

#### 3. 生成性能报告

使用 `gprof` 分析性能数据并生成报告：

```sh
gprof example gmon.out > analysis.txt
```

这会将分析结果输出到 `analysis.txt` 文件中。

### 示例

假设我们有一个简单的 C 程序 `example.c`：

```c
#include <stdio.h>

void func1() {
    for (int i = 0; i < 1000000; i++);
}

void func2() {
    for (int i = 0; i < 10000000; i++);
}

int main() {
    func1();
    func2();
    return 0;
}
```

#### 编译代码

```sh
gcc -pg -o example example.c
```

#### 运行程序

```sh
./example
```

#### 生成性能报告

```sh
gprof example gmon.out > analysis.txt
```

### 解释性能报告

性能报告通常包括两个主要部分：

1. **平面分析（Flat Profile）**：显示每个函数的调用次数和总耗时。
2. **调用图（Call Graph）**：显示函数的调用关系和各自的耗时。

#### 平面分析示例

平面分析报告的示例：

```
Flat profile:

Each sample counts as 0.01 seconds.
 no time accumulated

  %   cumulative   self              self     total           
 time   seconds   seconds    calls  Ts/call  Ts/call  name    
  0.00      0.00     0.00        1     0.00     0.00  main
  0.00      0.00     0.00        1     0.00     0.00  func1
  0.00      0.00     0.00        1     0.00     0.00  func2
```

#### 调用图示例

调用图报告的示例：

```
Call graph

granularity: each sample hit covers 2 byte(s) for 0.01% of 0.00 seconds

index % time    self  children    called     name
                0.00    0.00       1/1           main [1]
[1]      0.0    0.00    0.00       1         main [1]
                0.00    0.00       1/1           func1 [2]
                0.00    0.00       1/1           func2 [3]
-----------------------------------------------
                0.00    0.00       1/1           func1 [2]
[2]      0.0    0.00    0.00       1         func1 [2]
-----------------------------------------------
                0.00    0.00       1/1           func2 [3]
[3]      0.0    0.00    0.00       1         func2 [3]
-----------------------------------------------
```

### 常用选项

- `-b`：抑制冗长的说明性输出，仅显示性能数据。
- `-p`：生成平面分析报告。
- `-q`：生成调用图报告。
- `-i`：交互模式。
- `-z`：包括没有调用的函数。

### 高级用法

#### 显示平面分析报告

仅显示平面分析报告：

```sh
gprof -p example gmon.out
```

#### 显示调用图报告

仅显示调用图报告：

```sh
gprof -q example gmon.out
```

### 在脚本中使用

`gprof` 可以在脚本中使用，以自动化性能分析任务。例如：

```sh
#!/bin/bash

# 编译代码
gcc -pg -o example example.c

# 运行程序
./example

# 生成性能报告
gprof example gmon.out > analysis.txt
```

### 与图形化工具结合使用

可以使用图形化工具（如 `kcachegrind`）查看和分析 `gprof` 生成的性能数据。首先，将 `gprof` 数据转换为 `callgrind` 格式：

```sh
gprof2dot -f callgrind example gmon.out | dot -Tpng -o callgraph.png
```

然后使用 `kcachegrind` 打开生成的 `callgrind` 文件：

```sh
kcachegrind callgraph.png
```
