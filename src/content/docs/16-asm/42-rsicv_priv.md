---
title: riscv 特权指令
---

## 特权级别概述
RISC-V特权级别分为四个主要等级：
- **U-mode**（User Mode）：用户模式，执行普通应用程序代码。
- **S-mode**（Supervisor Mode）：管理模式，执行操作系统代码。
- **M-mode**（Machine Mode）：机器模式，最高特权级别，主要用于引导和管理硬件资源。
- **H-mode**（Hypervisor Mode）：虚拟化管理模式，用于管理虚拟机（可选）。

## CSR 地址映射转换


| \[11:10\] | \[9:8\] | \[7:4\] | Hex         |  Use and Accessibility |
| --------- | ------- | ------- | ----------- |  --------------------- |
| Unprivileged and User-Level CSRs |          |     |     |     | 
| `00` | `00` | `XXXX` | `0x000-0x0FF` |  Standard read/write |
| `01` | `00` | `XXXX` | `0x400-0x4FF` |  Standard read/write |
| `10` | `00` | `XXXX` | `0x800-0x8FF` |  Custom read/write |
| `11` | `00` | `0XXX` | `0xC00-0xC7F` |  Standard read-only | 
| `11` | `00` | `10XX` | `0xC80-0xCBF` |  Standard read-only | 
| `11` | `00` | `11XX` | `0xCC0-0xCFF` |  Custom read-only | 
| Supervisor-Level CSRs |     |     |     |     |     | 
| `00` | `01` | `XXXX` | `0x100-0x1FF` |  Standard read/write | 
| `01` | `01` | `0XXX` | `0x500-0x57F` |  Standard read/write | 
| `01` | `01` | `10XX` | `0x580-0x5BF` |  Standard read/write | 
| `01` | `01` | `11XX` | `0x5C0-0x5FF` |  Custom read/write | 
| `10` | `01` | `0XXX` | `0x900-0x97F` |  Standard read/write | 
| `10` | `01` | `10XX` | `0x980-0x9BF` |  Standard read/write | 
| `10` | `01` | `11XX` | `0x9C0-0x9FF` |  Custom read/write | 
| `11` | `01` | `0XXX` | `0xD00-0xD7F` |  Standard read-only | 
| `11` | `01` | `10XX` | `0xD80-0xDBF` |  Standard read-only | 
| `11` | `01` | `11XX` | `0xDC0-0xDFF` |  Custom read-only | 
| Hypervisor and VS CSRs |     |     |     |     |     | 
| `00` | `10` | `XXXX` | `0x200-0x2FF` |  Standard read/write | 
| `01` | `10` | `0XXX` | `0x600-0x67F` |  Standard read/write | 
| `01` | `10` | `10XX` | `0x680-0x6BF` |  Standard read/write | 
| `01` | `10` | `11XX` | `0x6C0-0x6FF` |  Custom read/write | 
| `10` | `10` | `0XXX` | `0xA00-0xA7F` |  Standard read/write | 
| `10` | `10` | `10XX` | `0xA80-0xABF` |  Standard read/write | 
| `10` | `10` | `11XX` | `0xAC0-0xAFF` |  Custom read/write | 
| `11` | `10` | `0XXX` | `0xE00-0xE7F` |  Standard read/write | 
| `11` | `10` | `10XX` | `0xE80-0xEBF` |  Standard read/write | 
| `11` | `10` | `11XX` | `0xEC0-0xEFF` |  Custom read/write | 
| Machine-Level CSRs |     |     |     |     |     | 
| `00` | `11` | `XXXX` | `0x300-0x3FF` |  Standard read/write | 
| `01` | `11` | `0XXX` | `0x700-0x77F` |  Standard read/write | 
| `01` | `11` | `100X` | `0x780-0x79F` |  Standard read/write | 
| `01` | `11` | `1010` | `0x7A0-0x7AF` |  Standard read/write debug CSRs |
| `01` | `11` | `1011` | `0x7B0-0x7BF` |  Debug-mode-only CSRs |    
| `01` | `11` | `11XX` | `0x7C0-0x7FF` |  Custom read/write |    
| `10` | `11` | `0XXX` | `0xB00-0xB7F` |  Standard read/write |    
| `10` | `11` | `10XX` | `0xB80-0xBBF` |  Standard read/write |    
| `10` | `11` | `11XX` | `0xBC0-0xBFF` |  Custom read/write |    
| `11` | `11` | `0XXX` | `0xF00-0xF7F` |  Standard read/write |    
| `11` | `11` | `10XX` | `0xF80-0xFBF` |  Standard read/write |    
| `11` | `11` | `11XX` | `0xFC0-0xFFF` |  Custom read/write |

标准 RISC-V ISA 为最多 4,096 个 CSR 预留了 12 位编码空间 (csr[11:0])。按照惯例，CSR 地址的高 4 位 (csr[11:8]) 用于根据特权级别对 CSR 的读写可访问性进行编码，前两位 (csr[11:8])指示寄存器是读/写（ 00 、 01 或 10 ）还是只读（ 11 ） 。接下来的两位 (csr[9:8]) 编码可以访问 CSR 的最低特权级别。

机器模式标准读写 CSR 0x7A0 - 0x7BF 保留供调试系统使用。在这些 CSR 中， 0x7A0 - 0x7AF 可在机器模式下访问，而 0x7B0 - 0x7BF 仅在调试模式下可见。实现应该在机器模式访问后一组寄存器时引发非法指令异常。

### 寄存器分类

1. WPRI(Reserved Writes Preserve Values, Reads Ignore Values ): 一些完整的读/写字段被保留以供将来使用。软件应忽略从这些字段读取的值，并且在将值写入同一寄存器的其他字段时应保留这些字段中保存的值。为了向前兼容，不提供这些字段的实现必须将它们设置为只读零。这些字段在寄存器描述中标记为 WPRI。
2. WLRL(Write/Read Only Legal Values): 一些读/写 CSR 字段仅指定可能位编码的子集的行为，并保留其他位编码。软件不应向此类字段写入除合法值以外的任何内容，并且不应假设读取将返回合法值，除非最后一次写入具有合法值，或者自其他操作（例如重置）以来尚未写入寄存器将寄存器设置为合法值。这些字段在寄存器描述中标记为 WLRL。
3. WARL(Write Any Values, Reads Legal Values): 某些读/写 CSR 字段仅针对位编码的子集进行定义，但允许写入任何值，同时保证每次读取时都返回合法值。假设写入 CSR 没有其他副作用，则可以通过尝试写入所需设置然后读取以查看该值是否保留来确定支持的值的范围。这些字段在寄存器描述中标记为 WARL。

### 通用csr寄存器

| 编号 | 权限 | 名称 | 描述 |
| --- | --- | --- | --- |
| 非特权浮点控制状态寄存器 |     |     |     |
| `0x001`  <br>`0x002`  <br>`0x003` | URW  <br>URW  <br>URW | `fflags`  <br>`frm`  <br>`fcsr` | 浮点累积异常  <br>浮点动态舍入模式  <br>浮点控制和状态寄存器 (`frm` +`fflags`) |
| 非特权计数器/定时器 |     |     |     |
| `0xC00`  <br>`0xC01`  <br>`0xC02`  <br>`0xC03`  <br>`0xC04`  <br>   <br>`0xC1F`  <br>`0xC80`  <br>`0xC81`  <br>`0xC82`  <br>`0xC83`  <br>`0xC84`  <br>   <br>`0xC9F` | URO  <br>URO  <br>URO  <br>URO  <br>URO  <br>   <br>URO  <br>URO  <br>URO  <br>URO  <br>URO  <br>URO  <br>   <br>URO | `cycle`  <br>`time`  <br>`instret`  <br>`hpmcounter3`  <br>`hpmcounter4`  <br>⋮  <br>`hpmcounter31`  <br>`cycleh`  <br>`timeh`  <br>`instreth`  <br>`hpmcounter3h`  <br>`hpmcounter4h`  <br>⋮  <br>`hpmcounter31h` | RDCYCLE 指令的循环计数器  <br>RDTIME 指令的定时器  <br>RDINSTRET 指令的已退休指令计数器  <br>性能监控计数器  <br>性能监控计数器  <br>   <br>性能监控计数器  <br>`cycle` 的高 32 位，仅适用于 RV32  <br>`time` 的高 32 位，仅适用于 RV32  <br>`instret` 的高 32 位，仅适用于 RV32  <br>`hpmcounter3` 的高 32 位，仅适用于 RV32  <br>`hpmcounter4` 的高 32 位，仅适用于 RV32  <br>   <br>`hpmcounter31` 的高 32 位，仅适用于 RV32 |

### 管理程序的寄存器

| 编号 | 权限 | 名称 | 描述 |
| --- | --- | --- | --- |
| 虚拟机陷阱设置 |     |     |     |
| `0x600`  <br>`0x602`  <br>`0x603`  <br>`0x604`  <br>`0x606`  <br>`0x607`  <br>`0x612` | HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW | `hstatus`  <br>`hedeleg`  <br>`hideleg`  <br>`hie`  <br>`hcounteren`  <br>`hgeie`  <br>`hedelegh` | 虚拟机状态寄存器  <br>虚拟机异常委托寄存器  <br>虚拟机中断委托寄存器  <br>虚拟机中断使能寄存器  <br>虚拟机计数器使能  <br>虚拟机客体外部中断使能寄存器  <br>`hedeleg` 的高 32 位，仅适用于 RV32 |
| 虚拟机陷阱处理 |     |     |     |
| `0x643`  <br>`0x644`  <br>`0x645`  <br>`0x64A`  <br>`0xE12` | HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRO | `htval`  <br>`hip`  <br>`hvip`  <br>`htinst`  <br>`hgeip` | 虚拟机错误客体物理地址  <br>虚拟机中断挂起  <br>虚拟机虚拟中断挂起  <br>虚拟机陷阱指令（转换后）  <br>虚拟机客体外部中断挂起 |
| 虚拟机配置 |     |     |     |
| `0x60A`  <br>`0x61A` | HRW  <br>HRM | `henvcfg`  <br>`henvcfgh` | 虚拟机环境配置寄存器  <br>`henvcfg` 的高 32 位，仅适用于 RV32 |
| 虚拟机保护和翻译 |     |     |     |
| `0x680` | HRW | `hgatp` | 虚拟机客体地址翻译和保护 |
| 调试/跟踪寄存器 |     |     |     |
| `0x6A8` | HRW | `hcontext` | 虚拟机模式上下文寄存器 |
| 虚拟机计数器/定时器虚拟化寄存器 |     |     |     |
| `0x605`  <br>`0x615` | HRW  <br>HRW | `htimedelta`  <br>`htimedeltah` | VS/VU 模式定时器的增量  <br>`htimedelta` 的高 32 位，仅适用于 RV32 |
| 虚拟机状态使能寄存器 |     |     |     |
| `0x60C`  <br>`0x60D`  <br>`0x60E`  <br>`0x60F`  <br>`0x61C`  <br>`0x61D`  <br>`0x61E`  <br>`0x61F` | HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW | `hstateen0`  <br>`hstateen1`  <br>`hstateen2`  <br>`hstateen3`  <br>`hstateen0h`  <br>`hstateen1h`  <br>`hstateen2h`  <br>`hstateen3h` | 虚拟机状态使能 0 寄存器  <br>虚拟机状态使能 1 寄存器  <br>虚拟机状态使能 2 寄存器  <br>虚拟机状态使能 3 寄存器  <br>虚拟机状态使能 0 寄存器的高 32 位，仅适用于 RV32  <br>虚拟机状态使能 1 寄存器的高 32 位，仅适用于 RV32  <br>虚拟机状态使能 2 寄存器的高 32 位，仅适用于 RV32  <br>虚拟机状态使能 3 寄存器的高 32 位，仅适用于 RV32 |
| 虚拟监督寄存器 |     |     |     |
| `0x200`  <br>`0x204`  <br>`0x205`  <br>`0x240`  <br>`0x241`  <br>`0x242`  <br>`0x243`  <br>`0x244`  <br>`0x280` | HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW  <br>HRW | `vsstatus`  <br>`vsie`  <br>`vstvec`  <br>`vsscratch`  <br>`vsepc`  <br>`vscause`  <br>`vstval`  <br>`vsip`  <br>`vsatp` | 虚拟监督状态寄存器  <br>虚拟监督中断使能寄存器  <br>虚拟监督陷阱处理器基地址  <br>虚拟监督暂存寄存器  <br>虚拟监督异常程序计数器  <br>虚拟监督陷阱原因  <br>虚拟监督错误地址或指令  <br>虚拟监督中断挂起  <br>虚拟监督地址翻译和保护 |


### S-mode寄存器

| 编号 | 权限 | 名称 | 描述 |
| --- | --- | --- | --- |
| Supervisor Trap Setup |     |     |     |
| `0x100`  <br>`0x104`  <br>`0x105`  <br>`0x106` | SRW  <br>SRW  <br>SRW  <br>SRW | `sstatus`  <br>`sie`  <br>`stvec`  <br>`scounteren` | 监督状态寄存器  <br>监督中断使能寄存器  <br>监督陷阱处理器基地址  <br>监督计数器使能 |
| Supervisor Configuration |     |     |     |
| `0x10A` | SRW | `senvcfg` | 监督环境配置寄存器 |
| Supervisor Counter Setup |     |     |     |
| `0x120` | SRW | `scountinhibit` | 监督计数器禁止寄存器 |
| Supervisor Trap Handling |     |     |     |
| `0x140`  <br>`0x141`  <br>`0x142`  <br>`0x143`  <br>`0x144`  <br>`0xDA0` | SRW  <br>SRW  <br>SRW  <br>SRW  <br>SRW  <br>SRO | `sscratch`  <br>`sepc`  <br>`scause`  <br>`stval`  <br>`sip`  <br>`scountovf` | 监督陷阱处理器的暂存寄存器  <br>监督异常程序计数器  <br>监督陷阱原因  <br>监督错误地址或指令  <br>监督中断挂起  <br>监督计数溢出 |
| Supervisor Protection and Translation |     |     |     |
| `0x180` | SRW | `satp` | 监督地址翻译和保护 |
| Debug/Trace Registers |     |     |     |
| `0x5A8` | SRW | `scontext` | 监督模式上下文寄存器 |
| Supervisor State Enable Registers |     |     |     |
| `0x10C`  <br>`0x10D`  <br>`0x10E`  <br>`0x10F` | SRW  <br>SRW  <br>SRW  <br>SRW | `sstateen0`  <br>`sstateen1`  <br>`sstateen2`  <br>`sstateen3` | 监督状态使能 0 寄存器  <br>监督状态使能 1 寄存器  <br>监督状态使能 2 寄存器  <br>监督状态使能 3 寄存器 |

### M-mode寄存器

| 编号 | 权限 | 名称 | 描述 |
| --- | --- | --- | --- |
| 机器信息寄存器 |     |     |     |
| `0xF11`  <br>`0xF12`  <br>`0xF13`  <br>`0xF14`  <br>`0xF15` | MRO  <br>MRO  <br>MRO  <br>MRO  <br>MRO | `mvendorid`  <br>`marchid`  <br>`mimpid`  <br>`mhartid`  <br>`mconfigptr` | 供应商 ID  <br>架构 ID  <br>实现 ID  <br>硬件线程 ID  <br>指向配置数据结构的指针 |
| 机器陷阱设置 |     |     |     |
| `0x300`  <br>`0x301`  <br>`0x302`  <br>`0x303`  <br>`0x304`  <br>`0x305`  <br>`0x306`  <br>`0x310`  <br>`0x312` | MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW | `mstatus`  <br>`misa`  <br>`medeleg`  <br>`mideleg`  <br>`mie`  <br>`mtvec`  <br>`mcounteren`  <br>`mstatush`  <br>`medelegh` | 机器状态寄存器  <br>ISA 和扩展  <br>机器异常委托寄存器  <br>机器中断委托寄存器  <br>机器中断使能寄存器  <br>机器陷阱处理器基地址  <br>机器计数器使能  <br>附加机器状态寄存器，仅适用于 RV32  <br>`medeleg` 的高 32 位，仅适用于 RV32 |
| 机器陷阱处理 |     |     |     |
| `0x340`  <br>`0x341`  <br>`0x342`  <br>`0x343`  <br>`0x344`  <br>`0x34A`  <br>`0x34B` | MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW | `mscratch`  <br>`mepc`  <br>`mcause`  <br>`mtval`  <br>`mip`  <br>`mtinst`  <br>`mtval2` | 机器陷阱处理器的暂存寄存器  <br>机器异常程序计数器  <br>机器陷阱原因  <br>机器错误地址或指令  <br>机器中断挂起  <br>机器陷阱指令（转换后）  <br>机器错误的客体物理地址 |
| 机器配置 |     |     |     |
| `0x30A`  <br>`0x31A`  <br>`0x747`  <br>`0x757` | MRW  <br>MRW  <br>MRW  <br>MRW | `menvcfg`  <br>`menvcfgh`  <br>`mseccfg`  <br>`mseccfgh` | 机器环境配置寄存器  <br>`menvcfg` 的高 32 位，仅适用于 RV32  <br>机器安全配置寄存器  <br>`mseccfg` 的高 32 位，仅适用于 RV32 |
| 机器内存保护 |     |     |     |
| `0x3A0`  <br>`0x3A1`  <br>`0x3A2`  <br>`0x3A3`  <br>   <br>`0x3AE`  <br>`0x3AF`  <br>`0x3B0`  <br>`0x3B1`  <br>   <br>`0x3EF` | MRW  <br>MRW  <br>MRW  <br>MRW  <br>   <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>   <br>MRW | `pmpcfg0`  <br>`pmpcfg1`  <br>`pmpcfg2`  <br>`pmpcfg3`  <br>⋯  <br>`pmpcfg14`  <br>`pmpcfg15`  <br>`pmpaddr0`  <br>`pmpaddr1`  <br>⋯  <br>`pmpaddr63` | 物理内存保护配置  <br>物理内存保护配置，仅适用于 RV32  <br>物理内存保护配置  <br>物理内存保护配置，仅适用于 RV32  <br>   <br>物理内存保护配置  <br>物理内存保护配置，仅适用于 RV32  <br>物理内存保护地址寄存器  <br>物理内存保护地址寄存器  <br>   <br>物理内存保护地址寄存器 |
| 机器状态使能寄存器 |     |     |     |
| `0x30C`  <br>`0x30D`  <br>`0x30E`  <br>`0x30F`  <br>`0x31C`  <br>`0x31D`  <br>`0x31E`  <br>`0x31F` | MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW | `mstateen0`  <br>`mstateen1`  <br>`mstateen2`  <br>`mstateen3`  <br>`mstateen0h`  <br>`mstateen1h`  <br>`mstateen2h`  <br>`mstateen3h` | 机器状态使能 0 寄存器  <br>机器状态使能 1 寄存器  <br>机器状态使能 2 寄存器  <br>机器状态使能 3 寄存器  <br>机器状态使能 0 寄存器的高 32 位，仅适用于 RV32  <br>机器状态使能 1 寄存器的高 32 位，仅适用于 RV32  <br>机器状态使能 2 寄存器的高 32 位，仅适用于 RV32  <br>机器状态使能 3 寄存器的高 32 位，仅适用于 RV32 |


| 编号 | 权限 | 名称 | 描述 |
| --- | --- | --- | --- |
| 机器不可屏蔽中断处理 |     |     |     |
| `0x740`  <br>`0x741`  <br>`0x742`  <br>`0x744` | MRW  <br>MRW  <br>MRW  <br>MRW | `mnscratch`  <br>`mnepc`  <br>`mncause`  <br>`mnstatus` | 可恢复的 NMI 暂存寄存器  <br>可恢复的 NMI 程序计数器  <br>可恢复的 NMI 原因  <br>可恢复的 NMI 状态 |
| 机器计数器/定时器 |     |     |     |
| `0xB00`  <br>`0xB02`  <br>`0xB03`  <br>`0xB04`  <br>   <br>`0xB1F`  <br>`0xB80`  <br>`0xB82`  <br>`0xB83`  <br>`0xB84`  <br>   <br>`0xB9F` | MRW  <br>MRW  <br>MRW  <br>MRW  <br>   <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW  <br>   <br>MRW | `mcycle`  <br>`minstret`  <br>`mhpmcounter3`  <br>`mhpmcounter4`  <br>⋮  <br>`mhpmcounter31`  <br>`mcycleh`  <br>`minstreth`  <br>`mhpmcounter3h`  <br>`mhpmcounter4h`  <br>⋮  <br>`mhpmcounter31h` | 机器循环计数器  <br>机器已退休指令计数器  <br>机器性能监控计数器  <br>机器性能监控计数器  <br>   <br>机器性能监控计数器  <br>`mcycle` 的高 32 位，仅适用于 RV32  <br>`minstret` 的高 32 位，仅适用于 RV32  <br>`mhpmcounter3` 的高 32 位，仅适用于 RV32  <br>`mhpmcounter4` 的高 32 位，仅适用于 RV32  <br>   <br>`mhpmcounter31` 的高 32 位，仅适用于 RV32 |
| 机器计数器设置 |     |     |     |
| `0x320`  <br>`0x323`  <br>`0x324`  <br>   <br>`0x33F`  <br>`0x723`  <br>`0x724`  <br>   <br>`0x73F` | MRW  <br>MRW  <br>MRW  <br>   <br>MRW  <br>MRW  <br>MRW  <br>   <br>MRW | `mcountinhibit`  <br>`mhpmevent3`  <br>`mhpmevent4`  <br>⋮  <br>`mhpmevent31`  <br>`mhpmevent3h`  <br>`mhpmevent4h`  <br>⋮  <br>`mhpmevent31h` | 机器计数器禁止寄存器  <br>机器性能监控事件选择器  <br>机器性能监控事件选择器  <br>   <br>机器性能监控事件选择器  <br>`mhpmevent3` 的高 32 位，仅适用于 RV32  <br>`mhpmevent4` 的高 32 位，仅适用于 RV32  <br>   <br>`mhpmevent31` 的高 32 位，仅适用于 RV32 |
| 调试/跟踪寄存器（与调试模式共享） |     |     |     |
| `0x7A0`  <br>`0x7A1`  <br>`0x7A2`  <br>`0x7A3`  <br>`0x7A8` | MRW  <br>MRW  <br>MRW  <br>MRW  <br>MRW | `tselect`  <br>`tdata1`  <br>`tdata2`  <br>`tdata3`  <br>`mcontext` | 调试/跟踪触发器选择寄存器  <br>第一个调试/跟踪触发器数据寄存器  <br>第二个调试/跟踪触发器数据寄存器  <br>第三个调试/跟踪触发器数据寄存器  <br>机器模式上下文寄存器 |
| 调试模式寄存器 |     |     |     |
| `0x7B0`  <br>`0x7B1`  <br>`0x7B2`  <br>`0x7B3` | DRW  <br>DRW  <br>DRW  <br>DRW | `dcsr`  <br>`dpc`  <br>`dscratch0`  <br>`dscratch1` | 调试控制和状态寄存器  <br>调试程序计数器  <br>调试暂存寄存器 0  <br>调试暂存寄存器 1 |


## M-mode寄存器

### misa(Machine ISA Register)

```
  MXLEN-1    MXLEN-2 MXLEN-3   26 25               0
  +-----------------+-----------+------------------+
  | MXL(WARL)       |  0(WARL)  | extensions(WARL) |
  +-----------------+-----------+------------------+
```

- MXL: 标识XLEN

| MXL | XLEM |
|--|--| 
| 1 | 32 | 
| 2 | 64 | 
| 3 | 128 | 

- extensions: 支持的拓展

| Bit | Character | Description |
| -- | -- | -- |
| 0 | A  | Atomic extension |
| 1 | B  | B extension  |
| 2 | C |  Compressed extension |
| 3 | D |  Double-precision floating-point extension |
| 4 | E |  RV32E/64E base ISA |
| 5 | F |  Single-precision floating-point extension |
| 6 | G |  Reserved |
| 7 | H |  Hypervisor extension |
| 8 | I |  RV32I/64I/128I base ISA |
| 9 | J |  Reserved |
| 10 | K |  Reserved |
| 11 | L |  Reserved |
| 12 | M |  Integer Multiply/Divide extension |
| 13 | N |  Tentatively reserved for User-Level Interrupts extension |
| 14 | O |  Reserved |
| 15 | P |  Tentatively reserved for Packed-SIMD extension |
| 16 | Q |  Quad-precision floating-point extension |
| 17 | R |  Reserved |
| 18 | S |  Supervisor mode implemented |
| 19 | T |  Reserved |
| 20 | U |  User mode implemented |
| 21 | V |  Vector extension |
| 22 | W |  Reserved |
| 23 | X |  Non-standard extensions present |
| 24 | Y |  Reserved |
| 25 | Z |  Reserved |

如果存在任何非标准扩展，则将设置“X”位。

当“B”位为 1 时，实现支持 Zba、Zbb 和 Zbs 扩展提供的指令。当“B”位为 0 时，表示该实现可能不支持 Zba、Zbb 或 Zbs 扩展中的一项或多项。


### mvendorid(Machine Vendor ID Register)

mvendorid CSR 是一个 32 位只读寄存器，提供内核提供商的 JEDEC 制造商 ID。该寄存器在任何实现中都必须可读，但可以返回值 0 以指示该字段未实现或者这是非商业实现。

```
  31                            7 6                0
  +-----------------------------+------------------+
  | Bank                        | Offset           |
  +-----------------------------+------------------+
```

### marchid(Machine Architecture ID Register)

 marchid CSR 是一个 MXLEN 位只读寄存器，用于编码 hart 的基本微架构。该寄存器在任何实现中都必须可读，但可以返回 0 值以指示该字段未实现。 mvendorid 和 marchid 的组合应唯一标识所实现的 hart 微体系结构的类型。

```
  MXLEN-1                                         0
  +-----------------------------------------------+
  | Architecture ID                               |
  +-----------------------------------------------+
```

### mimpid(Machine Implementation ID Register)

mimpid CSR 提供​​处理器实现版本的唯一编码。该寄存器在任何实现中都必须可读，但可以返回 0 值以指示该字段未实现。实现值应反映 RISC-V 处理器本身的设计，而不是任何周围系统的设计。

```
  MXLEN-1                                         0
  +-----------------------------------------------+
  | implementation                                |
  +-----------------------------------------------+
```

### mhartid(Hart ID Register)

mhartid CSR 是一个 MXLEN 位只读寄存器，包含运行代码的硬件线程的整数 ID。该寄存器在任何实现中都必须可读。在多处理器系统中，Hart ID 不一定是连续编号的，但至少有一个 Hart 的 Hart ID 必须为零。 Hart ID 在执行环境中必须是唯一的。

```
  MXLEN-1                                         0
  +-----------------------------------------------+
  | Hart ID                                       |
  +-----------------------------------------------+
```

### mstatus,mstatush(Machine Status Registers)

mstatus 寄存器是一个 MXLEN 位读/写寄存器，其格式如图 7（RV32）和图 8（RV64）所示。 mstatus 寄存器跟踪并控制hart的当前操作状态。 mstatus 的受限视图在 S 级 ISA 中显示为 sstatus 寄存器。

mstatus在RV32中
```
  31  31 30  23   22    21   20    19    18     17    16  15    14  13     12  11      10  9     8      7     6     5     4      3      2     1      0
  +-----+------+-----+-----+-----+-----+-----+------+---------+---------+----------+----------+-----+------+-----+------+------+-----+------+-----+------+
  |  SD | WPRI | TSR | TW  | TVM | MXR | SUM | MPRV | XS[1:0] | FS[1:0] | MPP[1:0] | VS[1:0]  | SPP | MPIE | UBE | SPIE | WPRI | MIE | WPRI | SIE | WPRI |
  +-----+------+-----+-----+-----+-----+-----+------+---------+---------+----------+----------+-----+------+-----+------+------+-----+------+-----+------+
```

mstatus在RV64中
```
      63 62          38  37    36     35  34    33   32
  +-----+--------------+-----+-----+----------+----------+
  |  SD |   WPRI       | MBE | SBE | SXL[1:0] | UXL[1:0] |
  +-----+--------------+-----+-----+----------+----------+


  31         23   22    21   20    19    18     17    16  15    14  13     12  11      10  9     8      7     6     5     4      3      2     1      0
  +------------+-----+-----+-----+-----+-----+------+---------+---------+----------+----------+-----+------+-----+------+------+-----+------+-----+------+
  |  WPRI      | TSR | TW  | TVM | MXR | SUM | MPRV | XS[1:0] | FS[1:0] | MPP[1:0] | VS[1:0]  | SPP | MPIE | UBE | SPIE | WPRI | MIE | WPRI | SIE | WPRI |
  +------------+-----+-----+-----+-----+-----+------+---------+---------+----------+----------+-----+------+-----+------+------+-----+------+-----+------+
```

mstatush在RV32

```
 31                   6   5    4    3     0
  +--------------------+-----+-----+------+
  |      WPRI          | MBE | SBE | WPRI |
  +--------------------+-----+-----+------+

```

全局中断使能位 MIE 和 SIE 分别为 M 模式和 S 模式提供。这些位主要用于保证当前特权模式下中断处理程序的原子性。

为了支持嵌套陷阱，每个可以响应中断的特权模式 x 都有一个中断使能位和特权模式的两级堆栈。 xPIE 保存陷阱之前有效的中断使能位的值，xPP 保存之前的特权模式。 xPP 字段只能保存最多 x 的特权模式，因此 MPP 是两位宽，SPP 是一位宽。当陷阱从特权模式 y 进入特权模式 x 时，xPIE 被设置为 xIE 的值； xIE设置为0； xPP 设置为 y。


### mtvec(Machine Trap-Vector Base-Address Register)

 mtvec 寄存器是一个 MXLEN 位 WARL 读/写寄存器，用于保存陷阱向量配置，由向量基地址 (BASE) 和向量模式 (MODE) 组成。

 ```
 MXLEN-1                          2 1            0
  +--------------------------------+-------------+
  |      BASE[MXLEN-1:2](WARL)     |  MODE(WPRL) |
  +--------------------------------+-------------+
```

| MODE | Name | 描述 |
|--|--|--|
| 0 | Direct | 所有进入机器模式的陷阱都会导致 pc 设置为 BASE 字段中的地址。 |
| 1 |  Vectored | 所有进入机器模式的同步异常都会导致 pc 设置为 BASE 字段中的地址，而中断则导致 pc 设置为 BASE 字段中的地址。 BASE 字段加上中断原因编号的四倍。|
| >=2 |--| Reserved |

### medeleg, mideleg(Machine Trap Delegation Registers)

默认情况下，任何特权级别的所有陷阱都在机器模式下处理，尽管机器模式处理程序可以使用 MRET 指令将陷阱重定向回适当的级别。为了提高性能，实现可以在 medeleg 和 mideleg 中提供单独的读/写位，以指示某些异常和中断应由较低特权级别直接处理。机器异常委托寄存器（ medeleg ）是一个64位读/写寄存器。机器中断委托寄存器( mideleg )是一个MXLEN位读/写寄存器。

当陷阱被委托给 S 模式时， scause 寄存器将写入陷阱原因； sepc 寄存器写入捕获陷阱的指令的虚拟地址； stval 寄存器写入异常特定数据； mstatus 的SPP字段是用陷阱发生时的活动特权模式写入的； mstatus 的SPIE字段写入陷阱时SIE字段的值； mstatus 的SIE字段被清零。 mcause 、 mepc 和 mtval 寄存器以及 mstatus 的 MPP 和 MPIE 字段不会被写入。

当 XLEN=32 时， medelegh 是一个 32 位读/写寄存器，别名 medeleg 的位 63:32。当XLEN=64时，寄存器 medelegh 不存在。

medeleg
 ```
 63                                             0
  +---------------------------------------------+
  |      Synchronous Exceptions(WARL)           |
  +---------------------------------------------+
```

mideleg
 ```
 63                                             0
  +---------------------------------------------+
  |      Synchronous Exceptions(WARL)           |
  +---------------------------------------------+
```

### mip,mie(Machine Interrupt Registers)

mip 寄存器是包含待处理中断信息的 MXLEN 位读/写寄存器，而 mie 是包含中断使能位的相应 MXLEN 位读/写寄存器。中断原因编号 i 与 mip 和 mie 中的位 i 相对应。位 15:0 仅分配给标准中断原因，而位 16 及以上指定供平台使用。

mip
 ```
 MXLEN-1                                        0
  +---------------------------------------------+
  |      Interrupts(WARL)                       |
  +---------------------------------------------+
```

mie
 ```
 MXLEN-1                                        0
  +---------------------------------------------+
  |      Interrupts(WARL)                       |
  +---------------------------------------------+
```

如果满足以下所有条件，则中断 i 将陷入 M 模式（导致特权模式更改为 M 模式）： 
1. 当前特权模式为 M 
2. mstatus 和 mie 中均被设置
3. 如果寄存器 mideleg 存在，则 mideleg 中的位 i 不会被设置。

寄存器 mip 和 mie 的标准部分（位15:0）

mip[15:0]
```
  15      14    13     12      11     10    9      8      7     6     5     4      3      2     1      0
  +---------+--------+------+------+-----+------+-----+------+-----+------+-----+------+-----+------+-----+
  | 0       | LCOFIP | 0    | MEIP | 0   | SEIP |  0  | MTIP | 0   | STIP | 0   | MSIP | 0   | SSIP | 0   |
  +---------+--------+------+------+-----+------+-----+------+-----+------+-----+------+-----+------+-----+
```

mie[15:0]
```
  15      14    13     12      11     10    9      8      7     6     5     4      3      2     1      0
  +---------+--------+------+------+-----+------+-----+------+-----+------+-----+------+-----+------+-----+
  | 0       | LCOFIP | 0    | MEIP | 0   | SEIP |  0  | MTIE | 0   | STIE | 0   | MSIE | 0   | SSIE | 0   |
  +---------+--------+------+------+-----+------+-----+------+-----+------+-----+------+-----+------+-----+
```

位 mip .MEIP 和 mie .MEIE 是机器级外部中断的中断待处理位和中断使能位。 MEIP 在 mip 中是只读的，并由特定于平台的中断控制器设置和清除。

位 mip .MTIP 和 mie .MTIE 是机器定时器中断的中断待处理位和中断使能位。 MTIP 在 mip 中是只读的，并通过写入内存映射机器模式定时器比较寄存器来清除。

位 mip .MSIP 和 mie .MSIE 是机器级软件中断的中断待处理位和中断使能位。 MSIP 在 mip 中是只读的，并通过访问内存映射控制寄存器来写入，远程 Hart 使用这些寄存器来提供机器级处理器间中断。 Hart 可以使用相同的内存映射控制寄存器写入自己的 MSIP 位。如果系统只有一个 HART，或者平台标准支持通过外部中断 (MEI) 传递机器级处理器间中断，则 mip .MSIP 和 mie .MSIE都可以是只读零。

### mcounteren(Machine Counter-Enable Register)

计数器使能寄存器 mcounteren 是一个32位寄存器，用于控制硬件性能监控计数器对下一个较低特权模式的可用性。

```
  31            30     29                                              5     4      3      2     1      0
  +---------+--------+-------+------+-----+------+-----+------+-----+------+------+------+-----+------+-----+
  | HPM31   | HPM30  | HPM29 | ....                                 | HPM5 | HPM4 | HPM3 | IR  | TM   | CY  |
  +---------+--------+-------+------+-----+------+-----+------+-----+------+------+------+-----+------+-----+
```

### mcountinhibit(Machine Counter-Inhibit)

计数器禁止寄存器 mcountinhibit 是一个 32 位 WARL 寄存器，用于控制哪个硬件性能监控计数器递增。该寄存器中的设置仅控制计数器是否递增；它们的可访问性不受该寄存器设置的影响。

```
  31            30     29                                              5     4      3      2     1      0
  +---------+--------+-------+------+-----+------+-----+------+-----+------+------+------+-----+------+-----+
  | HPM31   | HPM30  | HPM29 | ....                                 | HPM5 | HPM4 | HPM3 | IR  | 0    | CY  |
  +---------+--------+-------+------+-----+------+-----+------+-----+------+------+------+-----+------+-----+
```

### mscratch(Machine Scratch Register)

mscratch 寄存器是专用于机器模式的MXLEN位读/写寄存器。通常，它用于保存指向机器模式 hart 本地上下文空间的指针，并在进入 M 模式陷阱处理程序时与用户寄存器交换。

 ```
 MXLEN-1                                        0
  +---------------------------------------------+
  |      mscratch                               |
  +---------------------------------------------+
```

### mepc(Machine Exception Program Counter)
当陷阱进入 M 模式时， mepc 会写入被中断或遇到异常的指令的虚拟地址。否则， mepc 永远不会由实现编写，尽管它可能是由软件显式编写的。
 ```
 MXLEN-1                                        0
  +---------------------------------------------+
  |      mepc                                   |
  +---------------------------------------------+
```

### mcause(Machine Cause Register)

mcause 寄存器是一个 MXLEN 位读写寄存器。当陷阱进入 M 模式时， mcause 会写入指示事件的代码这导致了陷阱。否则， mcause 永远不会由实现编写，尽管它可能是由软件显式编写的。

 ```
 MXLEN-1        MXLEN-2                            0
  +-----------+------------------------------------+
  | interrupt |   Exception Code(WLRL)             |
  +-----------+------------------------------------+
```

| 中断 | 异常代码 | 描述 |
| --- | --- | --- |
| 1  <br>1  <br>1  <br>1 | 0  <br>1  <br>2  <br>3 | _保留_  <br>监督软件中断  <br>_保留_  <br>机器软件中断 |
| 1  <br>1  <br>1  <br>1 | 4  <br>5  <br>6  <br>7 | _保留_  <br>监督计时器中断  <br>_保留_  <br>机器计时器中断 |
| 1  <br>1  <br>1  <br>1 | 8  <br>9  <br>10  <br>11 | _保留_  <br>监督外部中断  <br>_保留_  <br>机器外部中断 |
| 1  <br>1  <br>1  <br>1 | 12  <br>13  <br>14-15  <br>≥16 | _保留_  <br>计数器溢出中断  <br>_保留_  <br>_平台指定使用_ |
| 0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0  <br>0 | 0  <br>1  <br>2  <br>3  <br>4  <br>5  <br>6  <br>7  <br>8  <br>9  <br>10  <br>11  <br>12  <br>13  <br>14  <br>15  <br>16-17  <br>18  <br>19  <br>20-23  <br>24-31  <br>32-47  <br>48-63  <br>≥64 | 指令地址未对齐  <br>指令访问错误  <br>非法指令  <br>断点  <br>加载地址未对齐  <br>加载访问错误  <br>存储/AMO 地址未对齐  <br>存储/AMO 访问错误  <br>来自 U 模式的环境调用  <br>来自 S 模式的环境调用  <br>_保留_  <br>来自 M 模式的环境调用  <br>指令页面错误  <br>加载页面错误  <br>_保留_  <br>存储/AMO 页面错误  <br>_保留_  <br>软件检查  <br>硬件错误  <br>_保留_  <br>_自定义使用指定_  <br>_保留_  <br>_自定义使用指定_  <br>_保留_ |

### mtval(Machine Trap Value Register)

mtval 寄存器是一个 MXLEN 位读写寄存器。当陷阱进入 M 模式时， mtval 要么设置为零，要么写入帮助软件处理陷阱的异常特定信息。否则， mtval 永远不会由实现编写，尽管它可能是由软件显式编写的。硬件平台将指定哪些异常必须以信息方式设置 mtval ，哪些异常可以无条件将其设置为零，哪些异常可以表现出任一行为，具体取决于导致异常的基础事件。如果硬件平台指定没有异常将 mtval 设置为非零值，则 mtval 为只读零。

 ```
 MXLEN-1                                        0
  +---------------------------------------------+
  |      mtval                                  |
  +---------------------------------------------+
```

### mconfigptr(Machine Configuration Pointer Register)

mconfigptr 是一个 MXLEN 位只读 CSR，它保存配置数据结构的物理地址。软件可以遍历这个数据结构来发现有关硬件、平台及其配置的信息。
 ```
 MXLEN-1                                        0
  +---------------------------------------------+
  |      mconfigptr                             |
  +---------------------------------------------+
```

### menvcfg(Machine Environment Configuration Register)

 menvcfg CSR 是一个 64 位读/写寄存器，它控制特权低于 M 的模式的执行环境的某些特征。

```
  63            62     61     60     59    33 32   31        8    7     6      5     4   3      1       0
  +---------+--------+------+------+---------+------+----------+------+-------+--------+---------+------+
  | STCE    | PBMTE  | ADUE | CDE  | WPRI    | PMM  |  WPRI    | CBZE | CBCFE |  CBIE  | WPRI    | FIOM | 
  +---------+--------+------+------+---------+------+----------+------+-------+--------+---------+------+
```

### mseccfg(Machine Security Configuration Register)

mseccfg 是一个可选的 64 位读/写寄存器，用于控制安全功能。

```
  63      34 33   32 31   10    9       8       7    3    2        1        0
  +---------+------+--------+-------+---------+-------+--------+---------+------+
  | WPRI    | PMM  | WPRI   | SSEED | USEED   | WPRI  |  RLB   | MMWP    | MML  | 
  +---------+------+--------+-------+---------+-------+--------+---------+------+
```

### mtime,mtimecmp(Machine Timer Registers)

平台提供实时计数器，作为内存映射机器模式读写寄存器 mtime 公开。 mtime 必须以恒定频率递增，并且平台必须提供一种机制来确定 mtime 刻度周期。如果计数溢出， mtime 寄存器将回绕。

mtime 寄存器在所有 RV32 和 RV64 系统上都具有 64 位精度。平台提供 64 位内存映射机器模式定时器比较寄存器 ( mtimecmp )。每当 mtime 包含大于或等于 mtimecmp 的值时，机器计时器中断就会处于挂起状态，并将这些值视为无符号整数。中断保持发布状态，直到 mtimecmp 变得大于 mtime （通常是写入 mtimecmp 的结果）。仅当中断使能并且 mie 寄存器中的 MTIE 位被置位时，才会产生中断。

 ```
 63                                             0
  +---------------------------------------------+
  |      mtime                                  |
  +---------------------------------------------+
```


 ```
 63                                             0
  +---------------------------------------------+
  |      mtimecmp                               |
  +---------------------------------------------+
```
