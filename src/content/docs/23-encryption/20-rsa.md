---
title: RSA（Rivest-Shamir-Adleman）
---

RSA（Rivest-Shamir-Adleman）是一种广泛使用的非对称加密算法，由罗纳德·李维斯特（Ronald Rivest）、阿迪·萨米尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）在1977年共同提出。RSA的安全性基于大整数分解的数学难题，即将一个大数分解为两个质数的乘积在计算上非常困难，因此RSA被广泛用于数据加密和数字签名。

## 主要概念与过程：

1. **密钥生成**：
   - **选择两个大质数** \( p \) 和 \( q \)，计算它们的乘积 \( n = p \times q \)。这个 \( n \) 是加密和解密过程中使用的模数。
   - 计算 \( \phi(n) = (p - 1) \times (q - 1) \)，其中 \( \phi \) 是欧拉函数。
   - 选择一个整数 \( e \) 作为公钥指数，使 \( 1 < e < \phi(n) \) 并且 \( e \) 与 \( \phi(n) \) 互质。
   - 计算私钥指数 \( d \)，使得 \( d \times e \equiv 1 \ (\text{mod} \ \phi(n)) \)，即 \( d \) 是 \( e \) 在模 \( \phi(n) \) 下的乘法逆元。

   最终，公钥是 \( (n, e) \)，私钥是 \( (n, d) \)。

2. **加密**：
   - 将明文消息 \( M \) 转换为数字 \( m \)，其中 \( m < n \)。
   - 使用公钥 \( e \) 对消息进行加密，计算密文 \( c \)：
     \[
     c = m^e \ (\text{mod} \ n)
     \]
   
3. **解密**：
   - 使用私钥 \( d \) 对密文 \( c \) 进行解密，恢复原始消息 \( m \)：
     \[
     m = c^d \ (\text{mod} \ n)
     \]
   - 将数字 \( m \) 转换回原始消息 \( M \)。

## 应用场景：

- **数据加密**：RSA用于在不安全的网络上安全地传输数据，例如SSL/TLS协议用于HTTPS中的加密通信。
- **数字签名**：RSA可用于生成和验证数字签名，确保消息的完整性和真实性。
- **密钥交换**：RSA在密钥交换协议中用于安全地传递对称加密密钥。

## 安全性：

RSA的安全性依赖于大整数分解问题的难度。虽然随着计算能力的提升，较短的RSA密钥（如1024位）已经不再足够安全，2048位或更长的密钥目前仍被认为是安全的。

## 代码实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 计算最大公约数
int gcd(int a, int b) {
    while (b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}

// 计算乘法逆元 (e * d) % phi = 1
int modInverse(int e, int phi) {
    e = e % phi;
    for (int d = 1; d < phi; d++) {
        if ((e * d) % phi == 1) {
            return d;
        }
    }
    return -1;
}

// 执行幂模运算 base^exp % mod
long long modExp(long long base, long long exp, long long mod) {
    long long result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        exp = exp >> 1;
        base = (base * base) % mod;
    }
    return result;
}

int main() {
    // 选择两个质数 p 和 q
    int p = 61;
    int q = 53;
    int n = p * q; // n = p * q
    int phi = (p - 1) * (q - 1); // φ(n) = (p-1)*(q-1)

    // 选择一个公钥指数 e (1 < e < φ(n))，且 gcd(e, φ(n)) = 1
    int e = 17; // 一般选取较小的质数作为 e
    while (gcd(e, phi) != 1) {
        e++;
    }

    // 计算私钥指数 d
    int d = modInverse(e, phi);

    // 输出生成的密钥对
    printf("Public Key: (e = %d, n = %d)\n", e, n);
    printf("Private Key: (d = %d, n = %d)\n", d, n);

    // 模拟一个明文消息 (m < n)
    int message = 42;
    printf("Original Message: %d\n", message);

    // 加密: c = m^e % n
    long long encryptedMessage = modExp(message, e, n);
    printf("Encrypted Message: %lld\n", encryptedMessage);

    // 解密: m = c^d % n
    long long decryptedMessage = modExp(encryptedMessage, d, n);
    printf("Decrypted Message: %lld\n", decryptedMessage);

    return 0;
}
```

