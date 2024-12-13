---
title: AArch64
---

在AArch64（也称为ARM64）架构提供了一组更丰富的寄存器，相比于ARM32架构有更大的寄存器和更强大的功能。以下是ARM64架构中寄存器的详细介绍：

## 寄存器

### 通用寄存器

AArch64架构有31个64位通用寄存器（X0-X30）以及一个特殊的零寄存器（XZR）和程序计数器（PC）。

1. **X0-X30**：这些寄存器用于存储数据、地址或中间结果。
   - **X0-X7**：通常用于函数调用的参数和返回值。
   - **X8**：通常用作间接结果寄存器（例如系统调用号）。
   - **X9-X15**：临时寄存器。
   - **X16-X17**：内部寄存器，用于特定目的（如跳转表）。
   - **X18**：平台寄存器（保留供平台使用）。
   - **X19-X28**：被调用者保存寄存器（callee-saved）。
   - **X29**：帧指针寄存器（FP）。
   - **X30**：链接寄存器（LR），存储返回地址。
   
2. **SP (Stack Pointer)**：栈指针寄存器，用于指向当前栈的顶部。
3. **PC (Program Counter)**：程序计数器，存储当前执行的指令的地址。
4. **XZR (Zero Register)**：零寄存器，读取时返回0，写入时数据被丢弃。

### 状态寄存器

- **NZCV**：包含N（负）、Z（零）、C（进位）和V（溢出）标志。
- **FPCR (Floating-Point Control Register)**：浮点控制寄存器。
- **FPSR (Floating-Point Status Register)**：浮点状态寄存器。

### 32位访问

每个64位寄存器都有对应的低32位部分，使用W0-W30表示。例如，X0的低32位可以用W0访问。

### 示例程序

以下是一个简单的AArch64汇编程序，演示如何使用这些寄存器计算两个数的和：

```asm
.section .data
val1: .word 5  ; 定义第一个数值
val2: .word 3  ; 定义第二个数值

.section .text
.global _start

_start:
    ldr x0, =val1    ; 加载val1的地址到x0
    ldr w1, [x0]     ; 加载val1的值到w1
    ldr x0, =val2    ; 加载val2的地址到x0
    ldr w2, [x0]     ; 加载val2的值到w2

    add w3, w1, w2   ; 将w1和w2的值相加，并存储到w3

    mov x8, #93      ; 系统调用号93（exit）
    mov x0, #0       ; 退出状态码0
    svc 0            ; 调用内核
```

### 常见指令示例

- **mov (move)**：将一个值移动到寄存器。
  ```asm
  mov x0, #1    ; 将常数1加载到寄存器x0
  ```

- **add (add)**：将两个寄存器的值相加，并将结果存储到目的寄存器。
  ```asm
  add x1, x0, #2  ; 将x0的值加上2，并存储到x1
  ```

- **sub (subtract)**：将一个寄存器的值减去另一个寄存器的值。
  ```asm
  sub x2, x1, x0  ; 将x1的值减去x0的值，并存储到x2
  ```

- **ldr (load register)**：从内存加载数据到寄存器。
  ```asm
  ldr x0, [x1]  ; 从x1指向的内存地址加载数据到x0
  ```

- **str (store register)**：将寄存器的数据存储到内存。
  ```asm
  str x0, [x1]  ; 将x0的数据存储到x1指向的内存地址
  ```

- **b (branch)**：无条件跳转到一个标签。
  ```asm
  b loop       ; 跳转到loop标签
  ```

- **bl (branch with link)**：跳转到一个子程序，并将返回地址存储在lr寄存器中。
  ```asm
  bl subroutine  ; 跳转到subroutine子程序
  ```

- **br (branch to register)**：跳转到寄存器地址，通常用于返回主程序。
  ```asm
  br x30        ; 从子程序返回，x30通常是lr
  ```

### 使用条件指令和状态寄存器

```asm
.section .data
val1: .word 5
val2: .word 3

.section .text
.global _start

_start:
    ldr x0, =val1
    ldr w1, [x0]
    ldr x0, =val2
    ldr w2, [x0]

    cmp w1, w2       ; 比较w1和w2
    b.eq equal       ; 如果相等，跳转到equal标签

    b.ne not_equal   ; 如果不等，跳转到not_equal标签

equal:
    mov w3, #0       ; 如果相等，设置w3为0
    b end            ; 跳转到end标签

not_equal:
    mov w3, #1       ; 如果不等，设置w3为1

end:
    mov x8, #93      ; 系统调用号93（exit）
    mov x0, #0       ; 退出状态码0
    svc 0
```

这个程序比较两个数值，并根据比较结果设置寄存器W3。条件跳转指令（B.EQ和B.NE）会根据NZCV标志位决定是否跳转。

## 指令

AArch64（也称为ARM64）架构提供了一组丰富而强大的指令集，用于64位处理器。以下是一些常用的AArch64汇编指令及其详细讲解。

### 数据处理指令

#### MOV (Move)
将一个值从一个寄存器或立即数加载到目标寄存器中。
```asm
mov x0, #1    ; 将常数1加载到寄存器x0
mov x1, x0    ; 将寄存器x0的值加载到寄存器x1
```

#### ADD (Add)
将两个寄存器或一个寄存器和一个立即数的值相加，并将结果存储到目标寄存器中。
```asm
add x0, x1, x2  ; 将x1和x2的值相加，并存储到x0
add x0, x1, #10 ; 将x1和10相加，并存储到x0
```

#### SUB (Subtract)
将一个寄存器的值减去另一个寄存器或立即数的值，并将结果存储到目标寄存器中。
```asm
sub x0, x1, x2  ; 将x1的值减去x2的值，并存储到x0
sub x0, x1, #10 ; 将x1的值减去10，并存储到x0
```

#### MUL (Multiply)
将两个寄存器的值相乘，并将结果存储到目标寄存器中。
```asm
mul x0, x1, x2 ; 将x1和x2的值相乘，并存储到x0
```

### 数据传输指令

#### LDR (Load Register)
从内存中加载数据到寄存器。
```asm
ldr x0, [x1]     ; 从x1指向的内存地址加载数据到x0
ldr x0, [x1, #4] ; 从x1指向的内存地址偏移4字节处加载数据到x0
```

#### STR (Store Register)
将寄存器中的数据存储到内存。
```asm
str x0, [x1]     ; 将x0的数据存储到x1指向的内存地址
str x0, [x1, #4] ; 将x0的数据存储到x1指向的内存地址偏移4字节处
```

### 逻辑指令

#### AND
将两个寄存器的值进行按位与操作，并将结果存储到目标寄存器中。
```asm
and x0, x1, x2 ; 将x1和x2的值进行按位与操作，并存储到x0
```

#### ORR
将两个寄存器的值进行按位或操作，并将结果存储到目标寄存器中。
```asm
orr x0, x1, x2 ; 将x1和x2的值进行按位或操作，并存储到x0
```

#### EOR (Exclusive OR)
将两个寄存器的值进行按位异或操作，并将结果存储到目标寄存器中。
```asm
eor x0, x1, x2 ; 将x1和x2的值进行按位异或操作，并存储到x0
```

#### BIC (Bit Clear)
将一个寄存器的值与另一个寄存器的按位反值进行按位与操作，并将结果存储到目标寄存器中。
```asm
bic x0, x1, x2 ; 将x1和x2按位反值进行按位与操作，并存储到x0
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

#### BR (Branch to Register)
跳转到寄存器地址，通常用于从子程序返回。
```asm
br x30 ; 从子程序返回，x30通常是lr
```

### 条件执行指令

AArch64汇编指令可以根据条件码有选择地执行，条件码包括：

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

以下是一个简单的AArch64汇编程序，计算两个数的和，并根据结果设置条件跳转：

```asm
.section .data
val1: .word 5
val2: .word 3

.section .text
.global _start

_start:
    ldr x0, =val1
    ldr w1, [x0]
    ldr x0, =val2
    ldr w2, [x0]

    add w3, w1, w2   ; 将w1和w2的值相加，并存储到w3

    cmp w3, #8       ; 比较w3和8
    b.eq equal       ; 如果相等，跳转到equal标签

    b.ne not_equal   ; 如果不等，跳转到not_equal标签

equal:
    mov w4, #1       ; 如果相等，设置w4为1
    b end            ; 跳转到end标签

not_equal:
    mov w4, #0       ; 如果不等，设置w4为0

end:
    mov x8, #93      ; 系统调用号93（exit）
    mov x0, #0       ; 退出状态码0
    svc 0            ; 调用内核
```
