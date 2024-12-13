---
title: CRC（Cyclic Redundancy Check）
---

CRC（Cyclic Redundancy Check，循环冗余校验）是一种用于检测数据传输或存储过程中错误的校验算法。它通过对数据生成一个固定长度的校验码，来检查数据在传输或存储时是否发生了错误。CRC 广泛应用于网络通信、存储设备、文件传输等领域。

## CRC 的工作原理

CRC 基于二进制除法原理来进行校验。它的核心思想是将数据视为一个二进制数，然后使用一个预先定义的生成多项式（也是一个二进制数）对数据进行模除运算。得到的余数就是 CRC 校验码。

1. **生成多项式**：
   - CRC 的生成多项式是一个预定义的二进制多项式，例如常见的 CRC-32 生成多项式为 `0x04C11DB7`。生成多项式的位数决定了 CRC 校验码的位数。

2. **数据处理**：
   - 输入数据被视为一个二进制数，将生成多项式的最高位与数据对齐后进行二进制除法。得到的余数即为 CRC 校验码。

3. **校验**：
   - 在接收端，接收到的数据与生成多项式再次进行相同的除法运算。如果余数为零，则表示数据没有发生错误；否则，说明数据在传输或存储中发生了错误。

## 常见的 CRC 多项式

不同的应用场景可能使用不同的生成多项式。以下是一些常见的 CRC 多项式：

- **CRC-8**：
  - 生成多项式：`x^8 + x^2 + x + 1`（0x07）
  - 用于低位数校验，如小型通信协议。

- **CRC-16-IBM**：
  - 生成多项式：`x^16 + x^15 + x^2 + 1`（0x8005）
  - 广泛用于串口通信等场合。

- **CRC-32**：
  - 生成多项式：`x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1`（0x04C11DB7）
  - 用于网络通信、文件校验等场合，如在以太网、ZIP 文件格式中。

## CRC 的优点和局限性

**优点**：
- **高效性**：CRC 计算简单且效率高，非常适合硬件实现，因此在实时数据校验中应用广泛。
- **强大的检测能力**：CRC 能够有效检测单比特错误、双比特错误、奇数个比特错误以及某些特定类型的突发错误。

**局限性**：
- **不能纠错**：CRC 只能检测错误，不能纠正错误。因此，在检测到错误后通常需要重新传输数据。
- **存在弱点**：CRC 主要用于检测传输过程中可能出现的随机错误，但对于特定类型的系统性错误（如数据丢失）则可能不够有效。

## CRC 的应用

1. **网络通信**：CRC 广泛应用于网络通信协议中，如以太网（Ethernet）帧校验中使用的 CRC-32。
2. **数据存储**：在存储设备中，如硬盘、光盘等，使用 CRC 校验来检测和校验数据完整性。
3. **文件传输**：CRC 经常用于文件传输过程中，如 ZIP 文件的校验，以确保文件在传输过程中没有损坏。
4. **嵌入式系统**：许多嵌入式系统使用 CRC 来确保数据传输的可靠性，特别是在资源受限的环境中。

## CRC-8示例

```c
#include <stdio.h>
#include <stdint.h>

uint8_t crc8(uint8_t *data, size_t length) {
    uint8_t crc = 0x00;  // 初始化CRC值
    uint8_t polynomial = 0x07;  // CRC-8多项式

    for (size_t i = 0; i < length; i++) {
        crc ^= data[i];  // 将当前数据字节与CRC寄存器进行异或

        for (uint8_t j = 0; j < 8; j++) {  // 对每个字节的每一位进行处理
            if (crc & 0x80) {  // 检查最高位
                crc = (crc << 1) ^ polynomial;  // 左移并异或多项式
            } else {
                crc <<= 1;  // 仅左移
            }
        }
    }

    return crc;
}

int main() {
    uint8_t data[] = {0x31, 0x31, 0x31, 0x31, 0x31, 0x31, 0x31, 0x31};  // 示例数据
    size_t length = sizeof(data) / sizeof(data[0]);

    uint8_t crc = crc8(data, length);
    printf("CRC-8: 0x%02X\n", crc);

    return 0;
}

```

## CRC-16-MODBUS示例

```c
#include <stdio.h>
#include <stdint.h>

uint16_t crc16_modbus(uint8_t *data, size_t length) {
    uint16_t crc = 0xFFFF;  // CRC初始值

    for (size_t i = 0; i < length; i++) {
        crc ^= data[i];  // 将当前字节与CRC寄存器异或

        for (uint8_t j = 0; j < 8; j++) {  // 对每个字节的每一位进行处理
            if (crc & 0x0001) {  // 检查最低位
                crc = (crc >> 1) ^ 0xA001;  // 右移并异或多项式
            } else {
                crc >>= 1;  // 仅右移
            }
        }
    }

    return crc;
}

int main() {
    uint8_t data[] = {0x31, 0x31, 0x31, 0x31, 0x31, 0x31, 0x31, 0x31};  // 示例数据
    size_t length = sizeof(data) / sizeof(data[0]);

    uint16_t crc = crc16_modbus(data, length);
    printf("CRC-16-MODBUS: 0x%04X\n", crc);

    return 0;
}

```