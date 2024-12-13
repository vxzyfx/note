---
title: ARM汇编
---

- [ARM Developer Documentation](https://developer.arm.com/documentation)

ARM汇编语言是一种针对ARM处理器架构设计的低级编程语言。它直接操作硬件，因此比高级编程语言（如C、Python）更高效，但也更复杂。下面是一些ARM汇编语言的基本概念和指令介绍。

## 基本概念

1. **寄存器 (Registers)**：ARM处理器通常有16个通用寄存器（R0-R15），用于存储临时数据、地址和操作数。
2. **条件码 (Condition Codes)**：用于决定是否执行某条指令，常见的条件码有EQ（等于）、NE（不等于）、GT（大于）、LT（小于）等。
3. **指令格式**：ARM指令通常是固定长度的32位指令，分为数据处理、数据传输、控制流等类别。

## arm复位

ARM处理器启动后执行的第一段代码地址通常由复位向量（reset vector）确定。复位向量是在处理器上电或复位时自动加载到程序计数器（PC）中的地址，它指向启动代码的入口地址。

### ARMv7（32位）架构

在ARMv7架构中，复位向量通常位于内存地址0x00000000或0xFFFF0000（取决于系统配置）。默认情况下，大多数系统会将复位向量设置为0x00000000。

### ARMv8（64位）架构

在ARMv8架构中（也称为AArch64），复位向量的地址也是由系统设计决定的，但常见的复位向量地址是0x00000000。在复位后，处理器将从这个地址开始执行第一条指令。

### 复位向量表

复位向量表是包含各种异常和中断处理程序地址的表，复位向量是其中的一个条目。表中每个条目通常对应一种特定的异常或中断类型。

### 示例：复位向量的实现

下面是一个简单的复位向量实现示例，展示复位向量如何跳转到启动代码：

#### ARMv7（32位）示例

```asm
.section .vectors
.global _start

_vectors:
    .word _start          /* Reset Vector */
    .word undefined_handler
    .word swi_handler
    .word prefetch_abort_handler
    .word data_abort_handler
    .word unused_handler
    .word irq_handler
    .word fiq_handler

.section .text
_start:
    /* 禁用中断 */
    cpsid i

    /* 初始化栈指针 */
    ldr sp, =stack_top

    /* 调用硬件初始化代码 */
    bl hardware_init

    /* 加载内核映像 */
    bl load_kernel

    /* 跳转到内核入口点 */
    ldr pc, =kernel_entry

hardware_init:
    /* 硬件初始化代码 */
    bx lr

load_kernel:
    /* 加载内核映像到内存 */
    bx lr

.section .bss
stack_top:
    .word 0x8000   /* 设置栈顶地址 */
```

#### ARMv8（64位）示例

```asm
.section .vectors
.global _start

_vectors:
    .xword _start          /* Reset Vector */
    .xword undefined_handler
    .xword swi_handler
    .xword prefetch_abort_handler
    .xword data_abort_handler
    .xword unused_handler
    .xword irq_handler
    .xword fiq_handler

.section .text
_start:
    /* 禁用中断 */
    msr daifset, #3

    /* 初始化栈指针 */
    ldr x0, =stack_top
    mov sp, x0

    /* 调用硬件初始化代码 */
    bl hardware_init

    /* 加载内核映像 */
    bl load_kernel

    /* 跳转到内核入口点 */
    ldr x0, =kernel_entry
    br x0

hardware_init:
    /* 硬件初始化代码 */
    ret

load_kernel:
    /* 加载内核映像到内存 */
    ret

.section .bss
stack_top:
    .xword 0x80000   /* 设置栈顶地址 */
```

## 寄存器

ARM32架构中的寄存器分为通用寄存器、特殊寄存器和状态寄存器。以下是对这些寄存器的详细介绍：

### 通用寄存器

ARM32处理器有16个通用寄存器（R0-R15），它们可以用于存储数据、地址或中间结果。

1. **R0-R12**：这13个寄存器是通用的，可以用于任何目的。
2. **R13 (SP)**：栈指针寄存器，用于指向当前栈的顶部。通常用来管理函数调用的栈帧。
3. **R14 (LR)**：链接寄存器，存储子程序调用的返回地址。当执行BL（Branch with Link）指令时，将返回地址存储在LR中。
4. **R15 (PC)**：程序计数器，存储当前正在执行的指令的地址。每执行一条指令，PC的值会自动递增。

### 特殊寄存器

除了通用寄存器，ARM32还包含几个特殊寄存器：

- **CPSR (Current Program Status Register)**：当前程序状态寄存器，存储当前程序的状态信息，包括条件标志、中断禁用位、处理器模式等。

### 寄存器的使用示例

以下是一个简单的ARM汇编程序，演示如何使用这些寄存器：

```asm
.section .data
val1: .word 5  ; 定义第一个数值
val2: .word 3  ; 定义第二个数值

.section .text
.global _start

_start:
    ldr r0, =val1    ; 加载val1的地址到r0
    ldr r1, [r0]     ; 加载val1的值到r1
    ldr r0, =val2    ; 加载val2的地址到r0
    ldr r2, [r0]     ; 加载val2的值到r2

    add r3, r1, r2   ; 将r1和r2的值相加，并存储到r3

    mov r7, #1       ; 系统调用号1（exit）
    swi 0            ; 调用内核
```

### 当前程序状态寄存器 (CPSR)

CPSR包含多个标志位，用于反映指令执行后的结果和当前处理器的状态。常用的标志位包括：

- **N (Negative)**：当指令的结果为负数时置位。
- **Z (Zero)**：当指令的结果为零时置位。
- **C (Carry)**：当指令执行产生进位或借位时置位。
- **V (Overflow)**：当指令执行产生溢出时置位。

### 示例：使用条件指令和状态寄存器

```asm
.section .data
val1: .word 5
val2: .word 3

.section .text
.global _start

_start:
    ldr r0, =val1
    ldr r1, [r0]
    ldr r0, =val2
    ldr r2, [r0]

    cmp r1, r2       ; 比较r1和r2
    beq equal        ; 如果相等，跳转到equal标签

    bne not_equal    ; 如果不等，跳转到not_equal标签

equal:
    mov r3, #0       ; 如果相等，设置r3为0
    b end            ; 跳转到end标签

not_equal:
    mov r3, #1       ; 如果不等，设置r3为1

end:
    mov r7, #1
    swi 0
```

这个程序比较两个数值，并根据比较结果设置寄存器R3。条件跳转指令（BEQ和BNE）会根据CPSR的Z标志位决定是否跳转。

## 指令

### 数据处理指令

#### MOV (Move)
将一个值从一个寄存器或立即数加载到目标寄存器中。
```asm
mov r0, #1    ; 将常数1加载到寄存器r0
mov r1, r0    ; 将寄存器r0的值加载到寄存器r1
```

#### ADD (Add)
将两个寄存器或一个寄存器和一个立即数的值相加，并将结果存储到目标寄存器中。
```asm
add r0, r1, r2  ; 将r1和r2的值相加，并存储到r0
add r0, r1, #10 ; 将r1和10相加，并存储到r0
```

#### SUB (Subtract)
将一个寄存器的值减去另一个寄存器或立即数的值，并将结果存储到目标寄存器中。
```asm
sub r0, r1, r2  ; 将r1的值减去r2的值，并存储到r0
sub r0, r1, #10 ; 将r1的值减去10，并存储到r0
```

#### MUL (Multiply)
将两个寄存器的值相乘，并将结果存储到目标寄存器中。
```asm
mul r0, r1, r2 ; 将r1和r2的值相乘，并存储到r0
```

### 数据传输指令

#### LDR (Load Register)
从内存中加载数据到寄存器。
```asm
ldr r0, [r1]     ; 从r1指向的内存地址加载数据到r0
ldr r0, [r1, #4] ; 从r1指向的内存地址偏移4字节处加载数据到r0
```

#### STR (Store Register)
将寄存器中的数据存储到内存。
```asm
str r0, [r1]     ; 将r0的数据存储到r1指向的内存地址
str r0, [r1, #4] ; 将r0的数据存储到r1指向的内存地址偏移4字节处
```

### 逻辑指令

#### AND
将两个寄存器的值进行按位与操作，并将结果存储到目标寄存器中。
```asm
and r0, r1, r2 ; 将r1和r2的值进行按位与操作，并存储到r0
```

#### ORR
将两个寄存器的值进行按位或操作，并将结果存储到目标寄存器中。
```asm
orr r0, r1, r2 ; 将r1和r2的值进行按位或操作，并存储到r0
```

#### EOR (Exclusive OR)
将两个寄存器的值进行按位异或操作，并将结果存储到目标寄存器中。
```asm
eor r0, r1, r2 ; 将r1和r2的值进行按位异或操作，并存储到r0
```

#### BIC (Bit Clear)
将一个寄存器的值与另一个寄存器的按位反值进行按位与操作，并将结果存储到目标寄存器中。
```asm
bic r0, r1, r2 ; 将r1和r2按位反值进行按位与操作，并存储到r0
```

### 控制流指令

#### B (Branch)
无条件跳转到指定的标签。
```asm
b loop ; 跳转到loop标签
```

#### BL (Branch with Link)
跳转到子程序，并将返回地址存储在LR寄存器中。
```asm
bl subroutine ; 跳转到subroutine子程序
```

#### BX (Branch and Exchange)
跳转到寄存器地址，通常用于从子程序返回。
```asm
bx lr ; 从子程序返回，lr通常存储返回地址
```

### 条件执行指令

ARM汇编指令可以根据条件码有选择地执行，条件码包括：

- **EQ**：等于（Zero flag设置）
- **NE**：不等于（Zero flag清除）
- **GT**：大于（Signed）
- **LT**：小于（Signed）
- **GE**：大于等于（Signed）
- **LE**：小于等于（Signed）

#### BEQ (Branch if Equal)
当条件码为EQ时跳转。
```asm
beq equal_label ; 当等于时跳转到equal_label
```

#### BNE (Branch if Not Equal)
当条件码为NE时跳转。
```asm
bne not_equal_label ; 当不等于时跳转到not_equal_label
```

### 示例程序

以下是一个简单的ARM汇编程序，计算两个数的和，并根据结果设置条件跳转：

```asm
.section .data
val1: .word 5
val2: .word 3

.section .text
.global _start

_start:
    ldr r0, =val1
    ldr r1, [r0]
    ldr r0, =val2
    ldr r2, [r0]

    add r3, r1, r2   ; 将r1和r2的值相加，并存储到r3

    cmp r3, #8       ; 比较r3和8
    beq equal        ; 如果相等，跳转到equal标签

    bne not_equal    ; 如果不等，跳转到not_equal标签

equal:
    mov r4, #1       ; 如果相等，设置r4为1
    b end            ; 跳转到end标签

not_equal:
    mov r4, #0       ; 如果不等，设置r4为0

end:
    mov r7, #1       ; 系统调用号1（exit）
    swi 0            ; 调用内核
```

这个程序从内存中加载两个数值，将它们相加，并根据结果设置寄存器R4的值。条件跳转指令（BEQ和BNE）根据比较结果决定是否跳转。

## 架构版本

ARM架构主要分为以下几种类别，每种类别都有其特定的用途和特点：

### 1. ARMv6
ARMv6架构主要用于嵌入式系统和移动设备，支持高效的指令集和低功耗设计。

### 2. ARMv7
ARMv7是广泛使用的一代架构，包含三个子集：
1. ARMv7-R
- 实现具有多种模式的传统ARM架构。
- 支持基于内存管理单元 (MMU) 的虚拟内存系统架构 (VMSA)。 ARMv7-A 实现可以称为 VMSAv7 实现。
- 支持ARM和Thumb指令集。

2. ARMv7-R
- 实现具有多种模式的传统ARM架构。
- 支持基于内存保护单元 (MPU) 的受保护内存系统架构 (PMSA)。 ARMv7-R 实现可以称为 PMSAv7 实现。
- 支持ARM和Thumb指令集。

3. ARMv7-M
- 实现专为低延迟中断处理而设计的程序员模型，具有寄存器的硬件堆栈并支持用高级语言编写中断处理程序。
- 实现 ARMv7 PMSA 的变体。
- 支持 Thumb 指令集的变体。

### 3. ARMv8
ARMv8架构引入了64位支持，包括以下子集：
- **ARMv8-A**：支持64位和32位指令集，用于高性能计算和服务器。
- **ARMv8-R**：用于实时系统，增强了安全性和虚拟化支持。
- **ARMv8-M**：用于安全的嵌入式系统，集成了TrustZone技术。

### 4. ARMv9
ARMv9是最新的架构版本，着重于性能、安全性和AI处理能力的提升，包括以下特点：
- **增强的安全性**：集成了Confidential Compute架构（CCA），提供更高级别的数据保护。
- **AI和机器学习加速**：优化了对AI和ML工作的处理能力。
- **更高的计算性能**：改进了指令集和架构设计，提供更高的计算性能。

### ARM架构分类总结
- **ARMv6**：嵌入式系统，低功耗。
- **ARMv7**：高性能应用处理器、实时系统和微控制器。
- **ARMv8**：64位和32位支持，高性能计算、安全性和嵌入式系统。
- **ARMv9**：增强的安全性、AI处理能力和计算性能。

## 文档

- [ARMv7-M](https://developer.arm.com/documentation/ddi0403/ee/)
- [ARMv7-A&ARMv7-R](https://developer.arm.com/documentation/ddi0406/cd/)

## armv7内核寄存器

- 13个32位通用寄存器, r0-r12
- 3个特殊的32位寄存器, SP, LR, PC, 描述为r13-r15

### SP(堆栈寄存器)

处理器使用 SP 作为指向活动堆栈的指针。

在Thumb指令集中，大多数指令不能访问SP。唯一可以访问 SP 的指令是那些设计为使用 SP 作为堆栈指针的指令。

ARM指令集提供了对SP更通用的访问，并且它可以用作通用寄存器。但是，ARM 不赞成将 SP 用于除堆栈指针以外的任何用途。

### LR(链接寄存器)

链接寄存器是一个特殊的寄存器，可以保存返回链接信息。某些情况需要使用 LR。当软件不需要LR进行链接时，它可以将其用于其他目的。可以将LR称为R14。

### PC(程序计数器)

当执行ARM指令时，PC读取的是当前指令的地址加8。

当执行Thumb指令时，PC读取当前指令的地址加4。

大多数 Thumb 指令无法访问 PC。

ARM指令集提供了对PC更通用的访问，许多ARM指令可以将PC用作通用寄存器。然而，ARM 不赞成将 PC 用于程序计数器以外的任何用途。
