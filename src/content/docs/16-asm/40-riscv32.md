---
title: RISCV32
---

RISC-V 是一种开源的指令集架构，由加州大学伯克利分校的计算机科学家开发。与其他专有架构（如 ARM 或 x86）不同，RISC-V 完全开源，允许任何人使用、修改和扩展。

## 复位

### RISC-V 32
在 RISC-V 32位架构中，处理器在复位后会从一个预定义的启动地址开始执行第一条指令。这个启动地址通常是硬编码的，通常为0x00000000 或 0xFFFFFFF0。复位后的第一条指令通常是用于初始化系统的引导加载程序（Bootloader）的开始。

### RISC-V 64
在 RISC-V 64位架构（riscv64）中，处理器在复位后会从一个预定义的启动地址开始执行第一条指令。这个启动地址通常是硬编码的，通常为0x00000000或其他设计者指定的地址。

## 架构

RISC-V 指令集架构（ISA）是一个模块化和可扩展的指令集，设计上分为基础指令集和多个标准扩展。以下是 RISC-V 指令集各部分的详细说明：

### 基础指令集

#### RV32I 和 RV64I
- **RV32I**：32位整数基本指令集，是所有 RISC-V 实现的基础，包含基本的算术、逻辑、控制流和内存访问指令。
- **RV64I**：64位整数基本指令集，类似于 RV32I，但寄存器和操作数是64位宽。

#### 基础指令分类
- **算术指令**：`ADD`, `SUB`, `ADDI` 等。
- **逻辑指令**：`AND`, `OR`, `XOR`, `ANDI` 等。
- **移位指令**：`SLL`, `SRL`, `SRA`, `SLLI`, `SRLI`, `SRAI` 等。
- **比较指令**：`SLT`, `SLTI`, `SLTU`, `SLTIU` 等。
- **内存访问指令**：`LW`, `SW`, `LB`, `SB`, `LH`, `SH`, `LBU`, `LHU` 等。
- **控制流指令**：`JAL`, `JALR`, `BEQ`, `BNE`, `BLT`, `BGE`, `BLTU`, `BGEU` 等。
- **系统指令**：`ECALL`, `EBREAK` 等。

### 标准扩展

#### M扩展（整数乘除扩展）
- 提供乘法和除法指令，例如 `MUL`, `MULH`, `DIV`, `DIVU`, `REM`, `REMU`。

#### A扩展（原子操作扩展）
- 支持原子读-修改-写指令，用于多处理器同步，例如 `LR.W`, `SC.W`, `AMOSWAP.W`, `AMOADD.W` 等。

#### F扩展（单精度浮点扩展）
- 支持 IEEE 754 单精度浮点运算指令，例如 `FADD.S`, `FSUB.S`, `FMUL.S`, `FDIV.S`, `FSQRT.S`, `FMIN.S`, `FMAX.S` 等。

#### D扩展（双精度浮点扩展）
- 支持 IEEE 754 双精度浮点运算指令，例如 `FADD.D`, `FSUB.D`, `FMUL.D`, `FDIV.D`, `FSQRT.D`, `FMIN.D`, `FMAX.D` 等。

#### Q扩展（四倍精度浮点扩展）
- 支持 IEEE 754 四倍精度浮点运算指令。

#### C扩展（压缩指令集扩展）
- 提供 16 位压缩指令，减少程序的内存占用，例如 `C.ADDI`, `C.LW`, `C.SW`, `C.JAL`, `C.JR` 等。

#### B扩展（位操作扩展）
- 提供位操作指令，例如 `ANDN`, `ORN`, `XNOR`, `CLZ`, `CTZ`, `CPOP`, `SEXT.B`, `SEXT.H`, `ROL`, `ROR` 等。

#### J扩展（动态可插拔指令扩展）
- 支持动态可插拔指令。

#### H扩展（硬件线程扩展）
- 提供硬件线程管理指令。

### 独立的小扩展

#### Z扩展
- 用于独立的小扩展，如：
  - **Zifencei**：指令流 FENCE 扩展，用于确保指令流的一致性。
  - **Zicsr**：控制状态寄存器扩展，提供对 CSR 的访问指令。

### 特殊用途指令

#### 特殊用途寄存器指令
- **CSRRW**：控制状态寄存器读写。
- **CSRRS**：控制状态寄存器读并设置。
- **CSRRC**：控制状态寄存器读并清除。

### 示例代码
以下是一个使用多种 RISC-V 指令的示例程序：

```asm
.section .data
num1:   .dword 5       // 定义第一个数
num2:   .dword 10      // 定义第二个数

.section .text
.globl _start
_start:
    li t0, 10          // 将立即数 10 加载到临时寄存器 t0
    li t1, 20          // 将立即数 20 加载到临时寄存器 t1
    add t2, t0, t1     // 将 t0 和 t1 相加，结果存储在 t2
    mv a0, t2          // 将 t2 的值复制到 a0

    // 浮点运算示例
    fmv.s.x ft0, t0    // 将整数 t0 转换为单精度浮点数
    fadd.s ft1, ft0, ft0 // 将两个单精度浮点数相加

    // 原子操作示例
    li t3, 1           // 将 1 加载到 t3
    amoswap.w.aq t4, t3, (t0) // 交换 t0 地址处的值与 t3

    // 退出程序（假设在一个支持的模拟器或操作系统中运行）
    li a7, 93          // ecall 退出系统调用号（Linux）
    ecall              // 执行系统调用
```

## 寄存器

RISC-V 32位架构（riscv32）有32个通用寄存器，每个寄存器都是32位宽。每个寄存器都有特定的用途和惯例名称，以便在汇编编程中使用。以下是 riscv32 寄存器的详细信息：

### 通用寄存器
RISC-V 的通用寄存器由 x0 到 x31 表示，使用惯例名称以帮助识别其典型用途。

1. **x0 (zero)**：值永远为 0，读写该寄存器不会改变它的值。
2. **x1 (ra, return address)**：存储函数返回地址。
3. **x2 (sp, stack pointer)**：指向当前栈顶，用于栈操作。
4. **x3 (gp, global pointer)**：全局指针，用于全局数据访问。
5. **x4 (tp, thread pointer)**：线程指针，用于线程局部存储。
6. **x5-x7 (t0-t2, temporary registers)**：临时寄存器，在函数调用过程中不需要保存。
7. **x8 (s0/fp, saved register/frame pointer)**：保存寄存器/帧指针，在函数调用过程中需要保存。
8. **x9 (s1, saved register)**：保存寄存器，在函数调用过程中需要保存。
9. **x10-x11 (a0-a1, function arguments/return values)**：函数参数和返回值寄存器。
10. **x12-x17 (a2-a7, function arguments)**：函数参数寄存器。
11. **x18-x27 (s2-s11, saved registers)**：保存寄存器，在函数调用过程中需要保存。
12. **x28-x31 (t3-t6, temporary registers)**：临时寄存器，在函数调用过程中不需要保存。

### 寄存器用途和描述

| 寄存器 | 名称    | 用途                          |
|--------|---------|-------------------------------|
| x0     | zero    | 常值 0                         |
| x1     | ra      | 返回地址                       |
| x2     | sp      | 栈指针                         |
| x3     | gp      | 全局指针                       |
| x4     | tp      | 线程指针                       |
| x5     | t0      | 临时寄存器                     |
| x6     | t1      | 临时寄存器                     |
| x7     | t2      | 临时寄存器                     |
| x8     | s0/fp   | 保存寄存器/帧指针              |
| x9     | s1      | 保存寄存器                     |
| x10    | a0      | 函数参数/返回值                |
| x11    | a1      | 函数参数/返回值                |
| x12    | a2      | 函数参数                       |
| x13    | a3      | 函数参数                       |
| x14    | a4      | 函数参数                       |
| x15    | a5      | 函数参数                       |
| x16    | a6      | 函数参数                       |
| x17    | a7      | 函数参数                       |
| x18    | s2      | 保存寄存器                     |
| x19    | s3      | 保存寄存器                     |
| x20    | s4      | 保存寄存器                     |
| x21    | s5      | 保存寄存器                     |
| x22    | s6      | 保存寄存器                     |
| x23    | s7      | 保存寄存器                     |
| x24    | s8      | 保存寄存器                     |
| x25    | s9      | 保存寄存器                     |
| x26    | s10     | 保存寄存器                     |
| x27    | s11     | 保存寄存器                     |
| x28    | t3      | 临时寄存器                     |
| x29    | t4      | 临时寄存器                     |
| x30    | t5      | 临时寄存器                     |
| x31    | t6      | 临时寄存器                     |

### 示例代码
以下是一个简单的 RISC-V 汇编程序，演示了如何使用这些寄存器来进行基本运算：

```asm
.section .data
num1:   .word 5       // 定义第一个数
num2:   .word 10      // 定义第二个数

.section .text
.globl _start
_start:
    lw x10, num1       // 将 num1 加载到寄存器 a0 (x10)
    lw x11, num2       // 将 num2 加载到寄存器 a1 (x11)
    add x12, x10, x11  // 将 a0 和 a1 相加，结果存储在 x12
    // 这里假设程序到此结束
    // 通常你会需要一个系统调用来退出程序，但这是一个简单示例
```

## 指令

RISC-V 32位架构（RV32）的指令集设计简洁、模块化，包含了各种基础指令以及可选的扩展指令。以下是 RISC-V 32位架构的基本指令集（RV32I）的一些常见指令和说明：

### 指令格式
RISC-V 的指令格式分为以下几种主要类型：

1. **R型指令**：用于寄存器到寄存器的运算。
2. **I型指令**：用于立即数运算和内存加载。
3. **S型指令**：用于内存存储。
4. **B型指令**：用于条件分支。
5. **U型指令**：用于加载高位立即数。
6. **J型指令**：用于跳转。

### R型指令
R型指令用于寄存器之间的算术和逻辑运算。格式如下：
```
opcode | rd | funct3 | rs1 | rs2 | funct7
```
- `rd`：目标寄存器。
- `rs1`：第一个源寄存器。
- `rs2`：第二个源寄存器。
- `funct3` 和 `funct7`：指定具体操作。

常见 R型指令：
```asm
add  rd, rs1, rs2  // rd = rs1 + rs2
sub  rd, rs1, rs2  // rd = rs1 - rs2
and  rd, rs1, rs2  // rd = rs1 & rs2
or   rd, rs1, rs2  // rd = rs1 | rs2
xor  rd, rs1, rs2  // rd = rs1 ^ rs2
sll  rd, rs1, rs2  // rd = rs1 << rs2 (逻辑左移)
srl  rd, rs1, rs2  // rd = rs1 >> rs2 (逻辑右移)
sra  rd, rs1, rs2  // rd = rs1 >>> rs2 (算术右移)
```

### I型指令
I型指令用于立即数运算和内存加载。格式如下：
```
opcode | rd | funct3 | rs1 | imm
```
- `imm`：立即数。

常见 I型指令：
```asm
addi  rd, rs1, imm   // rd = rs1 + imm
andi  rd, rs1, imm   // rd = rs1 & imm
ori   rd, rs1, imm   // rd = rs1 | imm
xori  rd, rs1, imm   // rd = rs1 ^ imm
slli  rd, rs1, shamt // rd = rs1 << shamt (逻辑左移)
srli  rd, rs1, shamt // rd = rs1 >> shamt (逻辑右移)
srai  rd, rs1, shamt // rd = rs1 >>> shamt (算术右移)
lw    rd, imm(rs1)   // 从内存地址rs1+imm加载字到rd
lb    rd, imm(rs1)   // 从内存地址rs1+imm加载字节到rd
lh    rd, imm(rs1)   // 从内存地址rs1+imm加载半字到rd
```

### S型指令
S型指令用于内存存储。格式如下：
```
opcode | imm[11:5] | rs2 | rs1 | funct3 | imm[4:0]
```
常见 S型指令：
```asm
sw  rs2, imm(rs1)  // 将rs2存储到内存地址rs1+imm
sb  rs2, imm(rs1)  // 将rs2的低8位存储到内存地址rs1+imm
sh  rs2, imm(rs1)  // 将rs2的低16位存储到内存地址rs1+imm
```

### B型指令
B型指令用于条件分支。格式如下：
```
opcode | imm[12] | imm[10:5] | rs2 | rs1 | funct3 | imm[4:1] | imm[11]
```
常见 B型指令：
```asm
beq   rs1, rs2, offset  // 如果rs1 == rs2，则跳转到当前地址加上offset
bne   rs1, rs2, offset  // 如果rs1 != rs2，则跳转到当前地址加上offset
blt   rs1, rs2, offset  // 如果rs1 < rs2，则跳转到当前地址加上offset
bge   rs1, rs2, offset  // 如果rs1 >= rs2，则跳转到当前地址加上offset
```

### U型指令
U型指令用于加载高位立即数。格式如下：
```
opcode | rd | imm
```
常见 U型指令：
```asm
lui  rd, imm  // 将imm加载到rd的高20位
auipc rd, imm // 将PC+imm加载到rd的高20位
```

### J型指令
J型指令用于跳转。格式如下：
```
opcode | rd | imm
```
常见 J型指令：
```asm
jal  rd, offset  // 跳转到当前地址加上offset，并将返回地址存储到rd
jalr rd, imm(rs1) // 跳转到rs1+imm，并将返回地址存储到rd
```

### 特殊指令
RISC-V 还有一些特殊指令，例如用于系统调用和控制寄存器的指令：
```asm
ecall  // 环境调用，用于系统调用
ebreak // 环境断点，用于调试
csrrw  rd, csr, rs1 // 读写控制状态寄存器
csrrs  rd, csr, rs1 // 读并设置控制状态寄存器
csrrc  rd, csr, rs1 // 读并清除控制状态寄存器
```

### 示例代码
下面是一个简单的 RISC-V 汇编程序示例，它实现了两个数的加法并将结果存储在一个寄存器中：
```asm
.section .data
num1:   .word 5       // 定义第一个数
num2:   .word 10      // 定义第二个数

.section .text
.globl _start
_start:
    lw x10, num1       // 加载num1到寄存器x10
    lw x11, num2       // 加载num2到寄存器x11
    add x12, x10, x11  // 将x10和x11相加，结果存储到x12

    // 退出程序（假设在一个支持的模拟器或操作系统中运行）
    li a7, 93          // ecall退出系统调用号（Linux）
    ecall              // 执行系统调用
```

## 伪指令

RISC-V 伪指令（Pseudo Instructions）是一种便于编程的汇编指令，它们不是直接在硬件上执行的指令，而是由汇编器（Assembler）翻译成一个或多个实际的机器指令。伪指令简化了汇编编程，使代码更易读、易写。以下是一些常见的 RISC-V 32位伪指令及其等效的真实指令：

### 常见伪指令及其等效指令

1. **`li rd, imm`（加载立即数）**
   - 加载一个立即数到寄存器 `rd`。
   - 等效指令：
     ```asm
     li rd, imm    // 当 imm 可以用 12 位表示时
     ```
     或
     ```asm
     lui rd, imm[31:12]
     addi rd, rd, imm[11:0]
     ```

2. **`mv rd, rs`（寄存器间移动）**
   - 将寄存器 `rs` 的值复制到寄存器 `rd`。
   - 等效指令：
     ```asm
     addi rd, rs, 0
     ```

3. **`nop`（空操作）**
   - 不执行任何操作。
   - 等效指令：
     ```asm
     addi x0, x0, 0
     ```

4. **`j offset`（无条件跳转）**
   - 跳转到当前地址加上偏移量 `offset`。
   - 等效指令：
     ```asm
     jal x0, offset
     ```

5. **`jr rs`（寄存器无条件跳转）**
   - 跳转到寄存器 `rs` 所指向的地址。
   - 等效指令：
     ```asm
     jalr x0, 0(rs)
     ```

6. **`ret`（返回）**
   - 从子程序返回。
   - 等效指令：
     ```asm
     jalr x0, 0(ra)
     ```

7. **`call label`（调用子程序）**
   - 调用子程序并保存返回地址。
   - 等效指令：
     ```asm
     auipc ra, %pcrel_hi(label)
     jalr ra, %pcrel_lo(label)(ra)
     ```

8. **`tail label`（尾调用）**
   - 跳转到子程序，不保存返回地址。
   - 等效指令：
     ```asm
     auipc x0, %pcrel_hi(label)
     jalr x0, %pcrel_lo(label)(x0)
     ```
9. **`la`(加载地址)**
   - 加载符号的地址

### 示例代码
以下是一个使用伪指令的简单 RISC-V 汇编程序示例：

```asm
.section .text
.globl _start
_start:
    li t0, 10       // 将立即数 10 加载到临时寄存器 t0
    li t1, 20       // 将立即数 20 加载到临时寄存器 t1
    add t2, t0, t1  // 将 t0 和 t1 相加，结果存储在 t2
    mv a0, t2       // 将 t2 的值复制到 a0

    // 退出程序（假设在一个支持的模拟器或操作系统中运行）
    li a7, 93       // ecall退出系统调用号（Linux）
    ecall           // 执行系统调用
```

在这个示例中，伪指令 `li` 和 `mv` 被使用来简化代码的编写和阅读。

## 测试环境

需要的软件
 - qemu
 - gcc
 - gdb-multiarch

main.c
```c
#define UART_BASE 0x10000000  // UART 基地址

volatile char *uart = (volatile char *)UART_BASE;

void uart_putc(char c) {
    *(volatile char *)uart = c;
}

void uart_puts(const char *s) {
    while (*s) {
        uart_putc(*s++);
    }
}

void main() {
    uart_puts("Hello, RISC-V!\n");
    while (1); // 无限循环，防止程序退出
}
```

start.s
```asm
.section .text
.global _start

_start:
    la sp, stack_top     # 设置栈指针
    call main            # 调用 main 函数
    nop                  # 如果 main 返回，停在这里

.section .bss
    .align 12
    .space 4096          # 定义一个简单的栈
stack_top:
```

编译
```bash
riscv64-linux-gnu-gcc -g -nostdlib -Ttext=0x80000000 -no-pie -o hello.elf start.s main.c
```

在qemu中运行
```bash
qemu-system-riscv64 -nographic -machine virt -bios none -serial mon:stdio -S -s -kernel hello.elf -S -s
```

.gdbinit

```
target remote :1234
```

```bash
gdb-multiarch -x .gdbinit hello.elf
```

