---
title: AES(Advanced Encryption Standard)
---

## AES简介

**AES（Advanced Encryption Standard，先进加密标准）** 是一种对称密钥加密算法，广泛用于保护敏感数据。它由比利时密码学家 Joan Daemen 和 Vincent Rijmen 设计，1997 年作为 Rijndael 算法被选中，并在 2001 年被美国国家标准与技术研究院（NIST）采用为新的联邦信息处理标准（FIPS 197），取代了老旧的 DES 算法。

## AES的主要特点

- **对称加密**：AES 使用相同的密钥进行加密和解密，密钥必须保密。
- **块加密**：AES 以固定长度的块（128 位，即 16 字节）处理数据。
- **可变密钥长度**：AES 支持三种密钥长度：128 位、192 位和 256 位，分别称为 AES-128、AES-192 和 AES-256。

## AES的工作原理

AES 采用了 **Substitution-Permutation Network（SPN）** 结构，通过多个轮次（rounds）的操作对数据进行加密。具体步骤如下：

### 1. **密钥扩展**
AES 的密钥扩展算法将初始密钥扩展为多个轮密钥（round keys），这些密钥用于每一轮的加密操作。轮数取决于密钥的长度：
- **AES-128**：10 轮
- **AES-192**：12 轮
- **AES-256**：14 轮

### 2. **初始轮**
- **AddRoundKey**：将数据块与第一个轮密钥进行异或操作。

### 3. **主要轮（每轮包括四个步骤）**
- **SubBytes**：使用一个固定的 S-Box 对数据块中的每个字节进行替换，这是一种非线性替换操作。
- **ShiftRows**：对数据块中的字节进行行位移操作，各行字节按照不同的偏移量循环移位。
- **MixColumns**：对数据块的列进行线性混合，将列视为多项式，并在有限域上进行乘法操作（AES 最后的轮次不执行此步骤）。
- **AddRoundKey**：将当前数据块与当前轮密钥进行异或操作。

### 4. **最后一轮**
最后一轮与前几轮类似，但不包括 **MixColumns** 操作。

## AES的优势

- **安全性高**：AES 目前被认为是安全的，使用的密钥长度和轮次使得暴力破解几乎不可能。
- **速度快**：AES 在硬件和软件中都能实现高效的加密操作，适用于广泛的应用场景。
- **灵活性强**：支持多种密钥长度，适应不同的安全需求。

## AES的使用场景

AES 被广泛应用于各种安全应用和协议中，例如：
- **VPN**：虚拟专用网络使用 AES 保护通信数据。
- **TLS/SSL**：用于保护网络通信中的 HTTPS 协议。
- **磁盘加密**：如 BitLocker 和 FileVault 使用 AES 加密存储设备上的数据。
- **无线通信**：WPA2 安全协议使用 AES 加密无线网络通信。


## AES128示例
```c
#include <stdio.h>
#include <string.h>
#include <stdint.h>

// 定义AES密钥结构体，包含加密密钥和解密密钥
typedef struct{
    uint32_t eK[44], dK[44];    // encKey, decKey：加密密钥和解密密钥
} AesKey;

#define BLOCKSIZE 16  // 定义AES的块大小为16字节（128位）
#define KEYBLOCKSIZE 16  // 定义AES KEY的块大小为16字节（128位）

// 宏定义，用于从字节数组中加载32位整数
#define LOAD32H(x, y) \
  do { (x) = ((uint32_t)((y)[0] & 0xff)<<24) | ((uint32_t)((y)[1] & 0xff)<<16) | \
             ((uint32_t)((y)[2] & 0xff)<<8)  | ((uint32_t)((y)[3] & 0xff));} while(0)

// 宏定义，用于将32位整数存储到字节数组中
#define STORE32H(x, y) \
  do { (y)[0] = (uint8_t)(((x)>>24) & 0xff); (y)[1] = (uint8_t)(((x)>>16) & 0xff);   \
       (y)[2] = (uint8_t)(((x)>>8) & 0xff); (y)[3] = (uint8_t)((x) & 0xff); } while(0)

// 提取一个字节
#define BYTE(x, n) (((x) >> (8 * (n))) & 0xff)

// 用于密钥扩展的宏定义，进行S-Box替换和混合操作
#define MIX(x) (((S[BYTE(x, 2)] << 24) & 0xff000000) ^ ((S[BYTE(x, 1)] << 16) & 0xff0000) ^ \
                ((S[BYTE(x, 0)] << 8) & 0xff00) ^ (S[BYTE(x, 3)] & 0xff))

// 左旋转32位整数
#define ROF32(x, n)  (((x) << (n)) | ((x) >> (32-(n))))

// 右旋转32位整数
#define ROR32(x, n)  (((x) >> (n)) | ((x) << (32-(n))))

// AES算法中使用的Rcon常量，用于密钥扩展
static const uint32_t rcon[10] = {
    0x01000000UL, 0x02000000UL, 0x04000000UL, 0x08000000UL, 0x10000000UL,
    0x20000000UL, 0x40000000UL, 0x80000000UL, 0x1B000000UL, 0x36000000UL
};

// S-Box用于SubBytes步骤中的字节替换
unsigned char S[256] = {
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16
};

// 逆S-Box，用于解密过程中的逆SubBytes步骤
unsigned char inv_S[256] = {
    0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
    0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
    0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
    0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
    0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
    0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
    0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
    0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
    0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
    0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
    0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
    0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
    0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
    0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
    0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D
};

/* 从字节数组 in[16] 复制到状态矩阵 state[4][4] 中 */
int loadStateArray(uint8_t (*state)[4], const uint8_t *in) {
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[j][i] = *in++;
        }
    }
    return 0;
}

/* 从状态矩阵 state[4][4] 复制到字节数组 out[16] 中 */
int storeStateArray(const uint8_t (*state)[4], uint8_t *out) {
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            *out++ = state[j][i];
        }
    }
    return 0;
}

/* 密钥扩展函数，将128位密钥扩展为44个32位子密钥 */
int keyExpansion(const uint8_t *key, uint32_t keyLen, AesKey *aesKey) {

    if (NULL == key || NULL == aesKey){
        printf("keyExpansion 参数为 NULL\n");
        return -1;
    }

    if (keyLen != KEYBLOCKSIZE){
        printf("keyExpansion keyLen = %d，不支持。\n", keyLen);
        return -1;
    }

    uint32_t *w = aesKey->eK;
    uint32_t *v = aesKey->dK;

    /* 处理W[0-3] */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(w[i], key + 4*i);
    }

    /* 处理W[4-43] */
    for (int i = 0; i < 10; ++i) {
        w[4] = w[0] ^ MIX(w[3]) ^ rcon[i];
        w[5] = w[1] ^ w[4];
        w[6] = w[2] ^ w[5];
        w[7] = w[3] ^ w[6];
        w += 4;
    }

    w = aesKey->eK + 44 - 4;
    for (int j = 0; j < 11; ++j) {

        for (int i = 0; i < 4; ++i) {
            v[i] = w[i];
        }
        w -= 4;
        v += 4;
    }

    return 0;
}

/* 将子密钥 key 与状态矩阵 state 进行异或运算 */
int addRoundKey(uint8_t (*state)[4], const uint32_t *key) {
    uint8_t k[4][4];

    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            k[i][j] = (uint8_t) BYTE(key[j], 3 - i);  /* 将 uint32 key[4] 复制到 uint8 k[4][4] */
            state[i][j] ^= k[i][j];
        }
    }

    return 0;
}

/* AES加密中的SubBytes步骤，通过S-Box替换字节 */
int subBytes(uint8_t (*state)[4]) {
    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = S[state[i][j]];
        }
    }

    return 0;
}

/* AES解密中的逆SubBytes步骤，通过逆S-Box替换字节 */
int invSubBytes(uint8_t (*state)[4]) {
    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = inv_S[state[i][j]];
        }
    }

    return 0;
}

/* AES加密中的ShiftRows步骤，循环移位状态矩阵中的行 */
int shiftRows(uint8_t (*state)[4]) {
    uint32_t block[4] = {0};

    /* i: 行 */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(block[i], state[i]);
        block[i] = ROF32(block[i], 8*i);
        STORE32H(block[i], state[i]);
    }

    return 0;
}

/* AES解密中的逆ShiftRows步骤，逆向循环移位状态矩阵中的行 */
int invShiftRows(uint8_t (*state)[4]) {
    uint32_t block[4] = {0};

    /* i: 行 */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(block[i], state[i]);
        block[i] = ROR32(block[i], 8*i);
        STORE32H(block[i], state[i]);
    }

    return 0;
}

/* 在伽罗瓦域(256)中对两个字节进行乘法 */
uint8_t GMul(uint8_t u, uint8_t v) {
    uint8_t p = 0;

    for (int i = 0; i < 8; ++i) {
        if (u & 0x01) {
            p ^= v;
        }

        int flag = (v & 0x80);
        v <<= 1;
        if (flag) {
            v ^= 0x1B; /* x^8 + x^4 + x^3 + x + 1 */
        }

        u >>= 1;
    }

    return p;
}

/* AES加密中的MixColumns步骤，混合列数据 */
int mixColumns(uint8_t (*state)[4]) {
    uint8_t tmp[4][4];
    uint8_t M[4][4] = {{0x02, 0x03, 0x01, 0x01},
                       {0x01, 0x02, 0x03, 0x01},
                       {0x01, 0x01, 0x02, 0x03},
                       {0x03, 0x01, 0x01, 0x02}};

    /* 将 state[4][4] 复制到 tmp[4][4] */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j){
            tmp[i][j] = state[i][j];
        }
    }

    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = GMul(M[i][0], tmp[0][j]) ^ GMul(M[i][1], tmp[1][j])
                        ^ GMul(M[i][2], tmp[2][j]) ^ GMul(M[i][3], tmp[3][j]);
        }
    }

    return 0;
}

/* AES解密中的逆MixColumns步骤，逆向混合列数据 */
int invMixColumns(uint8_t (*state)[4]) {
    uint8_t tmp[4][4];
    uint8_t M[4][4] = {{0x0E, 0x0B, 0x0D, 0x09},
                       {0x09, 0x0E, 0x0B, 0x0D},
                       {0x0D, 0x09, 0x0E, 0x0B},
                       {0x0B, 0x0D, 0x09, 0x0E}};

    /* 将 state[4][4] 复制到 tmp[4][4] */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j){
            tmp[i][j] = state[i][j];
        }
    }

    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = GMul(M[i][0], tmp[0][j]) ^ GMul(M[i][1], tmp[1][j])
                          ^ GMul(M[i][2], tmp[2][j]) ^ GMul(M[i][3], tmp[3][j]);
        }
    }

    return 0;
}
/**
 * 
 * @param key 16字节的密钥
 * @param pt 明文数据
 * @param ct 加密后数据输出位置
 * @param len 加密数据长度
 * @return 错误状态
 */
int aesEncrypt(const uint8_t *key, const uint8_t *pt, uint8_t *ct, uint32_t len) {

    AesKey aesKey;
    uint8_t *pos = ct;
    const uint32_t *rk = aesKey.eK;
    uint8_t actualKey[KEYBLOCKSIZE] = {0};
    uint8_t state[4][4] = {0};

    if (NULL == key || NULL == pt || NULL == ct){
        printf("参数错误。\n");
        return -1;
    }

    if (len % 16){
        printf("输入长度无效。\n");
        return -1;
    }

    memcpy(actualKey, key, KEYBLOCKSIZE);
    keyExpansion(actualKey, KEYBLOCKSIZE, &aesKey);

    for (int i = 0; i < len; i += BLOCKSIZE) {

        loadStateArray(state, pt);
        addRoundKey(state, rk);

        for (int j = 1; j < 10; ++j) {
            rk += 4;
            subBytes(state);
            shiftRows(state);
            mixColumns(state);
            addRoundKey(state, rk);
        }

        subBytes(state);
        shiftRows(state);
        addRoundKey(state, rk+4);

        storeStateArray(state, pos);

        pos += BLOCKSIZE;
        pt += BLOCKSIZE;
        rk = aesKey.eK;
    }
    return 0;
}

/* AES解密函数 */
/**
 * 
 * @param key 16字节的密钥
 * @param pt 明文数据
 * @param ct 加密后数据输出位置
 * @param len 加密数据长度
 * @return 错误状态
 */
int aesDecrypt(const uint8_t *key, const uint8_t *ct, uint8_t *pt, uint32_t len) {
    AesKey aesKey;
    uint8_t *pos = pt;
    const uint32_t *rk = aesKey.dK;
    uint8_t actualKey[KEYBLOCKSIZE] = {0};
    uint8_t state[4][4] = {0};

    if (NULL == key || NULL == ct || NULL == pt){
        printf("参数错误。\n");
        return -1;
    }

    if (len % BLOCKSIZE){
        printf("输入长度无效。\n");
        return -1;
    }

    memcpy(actualKey, key, KEYBLOCKSIZE);
    keyExpansion(actualKey, KEYBLOCKSIZE, &aesKey);

    for (int i = 0; i < len; i += BLOCKSIZE) {
        loadStateArray(state, ct);
        addRoundKey(state, rk);

        for (int j = 1; j < 10; ++j) {
            rk += 4;
            invShiftRows(state);
            invSubBytes(state);
            addRoundKey(state, rk);
            invMixColumns(state);
        }

        invSubBytes(state);
        invShiftRows(state);
        addRoundKey(state, rk+4);

        storeStateArray(state, pos);
        pos += BLOCKSIZE;
        ct += BLOCKSIZE;
        rk = aesKey.dK;
    }
    return 0;
}

/* 打印字节数组为十六进制 */
void printHex(const uint8_t *ptr, int len, char *tag) {
    printf("%s\ndata[%d]: ", tag, len);
    for (int i = 0; i < len; ++i) {
        printf("%.2X ", *ptr++);
    }
    printf("\n");
}

/* 打印状态矩阵 */
void printState(uint8_t (*state)[4], char *tag) {
    printf("%s\n", tag);
    for (int i = 0; i < 4; ++i) {
        printf("%.2X %.2X %.2X %.2X\n", state[i][0], state[i][1], state[i][2], state[i][3]);
    }
    printf("\n");
}

/* 主函数 */
int main() {
    // ECB模式
    const uint8_t key[16] = {0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30};
    const uint8_t pt[32] = "12345678901234561234567890123456";
    uint8_t ct[32] = {0};
    uint8_t plain[32] = {0};

    aesEncrypt(key, pt, ct, 32);
    printHex(pt, 32, "明文数据:");
    printf("预期密文: 60 D4 B3 D9 53 AB 1C CC EC 0E 67 A1 90 5E 44 F6 60 D4 B3 D9 53 AB 1C CC EC 0E 67 A1 90 5E 44 F6\n");

    printHex(ct, 32, "加密后的密文:");

    aesDecrypt(key, ct, plain, 32);
    printHex(plain, 32, "解密后的明文:");
    return 0;
}

```


## AES192示例
```c
#include <stdio.h>
#include <string.h>
#include <stdint.h>

// 定义AES密钥结构体，包含加密密钥和解密密钥
typedef struct{
    uint32_t eK[52], dK[52];    // encKey, decKey：加密密钥和解密密钥
} AesKey;

#define BLOCKSIZE 16  // 定义AES的块大小为16字节（128位）
#define KEYBLOCKSIZE 24  // 定义AES KEY的块大小为24字节（192位）

// 宏定义，用于从字节数组中加载32位整数
#define LOAD32H(x, y) \
  do { (x) = ((uint32_t)((y)[0] & 0xff)<<24) | ((uint32_t)((y)[1] & 0xff)<<16) | \
             ((uint32_t)((y)[2] & 0xff)<<8)  | ((uint32_t)((y)[3] & 0xff));} while(0)

// 宏定义，用于将32位整数存储到字节数组中
#define STORE32H(x, y) \
  do { (y)[0] = (uint8_t)(((x)>>24) & 0xff); (y)[1] = (uint8_t)(((x)>>16) & 0xff);   \
       (y)[2] = (uint8_t)(((x)>>8) & 0xff); (y)[3] = (uint8_t)((x) & 0xff); } while(0)

// 提取一个字节
#define BYTE(x, n) (((x) >> (8 * (n))) & 0xff)

// 用于密钥扩展的宏定义，进行S-Box替换和混合操作
#define MIX(x) (((S[BYTE(x, 2)] << 24) & 0xff000000) ^ ((S[BYTE(x, 1)] << 16) & 0xff0000) ^ \
                ((S[BYTE(x, 0)] << 8) & 0xff00) ^ (S[BYTE(x, 3)] & 0xff))

// 左旋转32位整数
#define ROF32(x, n)  (((x) << (n)) | ((x) >> (32-(n))))

// 右旋转32位整数
#define ROR32(x, n)  (((x) >> (n)) | ((x) << (32-(n))))

// AES算法中使用的Rcon常量，用于密钥扩展
static const uint32_t rcon[15] = {
    0x01000000UL, 0x02000000UL, 0x04000000UL, 0x08000000UL,
    0x10000000UL, 0x20000000UL, 0x40000000UL, 0x80000000UL,
    0x1B000000UL, 0x36000000UL, 0x6C000000UL, 0xD8000000UL,
    0xAB000000UL, 0x4D000000UL, 0x9A000000UL
};
// S-Box用于SubBytes步骤中的字节替换
unsigned char S[256] = {
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16
};

// 逆S-Box，用于解密过程中的逆SubBytes步骤
unsigned char inv_S[256] = {
    0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
    0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
    0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
    0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
    0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
    0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
    0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
    0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
    0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
    0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
    0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
    0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
    0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
    0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
    0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D
};

/* 从字节数组 in[16] 复制到状态矩阵 state[4][4] 中 */
int loadStateArray(uint8_t (*state)[4], const uint8_t *in) {
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[j][i] = *in++;
        }
    }
    return 0;
}

/* 从状态矩阵 state[4][4] 复制到字节数组 out[16] 中 */
int storeStateArray(const uint8_t (*state)[4], uint8_t *out) {
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            *out++ = state[j][i];
        }
    }
    return 0;
}

/* 密钥扩展函数，将192位密钥扩展为52个32位子密钥 */
int keyExpansion(const uint8_t *key, uint32_t keyLen, AesKey *aesKey) {

    if (NULL == key || NULL == aesKey){
        printf("keyExpansion 参数为 NULL\n");
        return -1;
    }

    if (keyLen != KEYBLOCKSIZE){
        printf("keyExpansion keyLen = %d，不支持。\n", keyLen);
        return -1;
    }

    uint32_t *w = aesKey->eK;
    uint32_t *v = aesKey->dK;

    /* 处理W[0-5] */
    for (int i = 0; i < 6; ++i) {
        LOAD32H(w[i], key + 4*i);
    }

    /* 处理W[6-51] */
    for (int i = 0; i < 8; ++i) {
        w[6] = w[0] ^ MIX(w[5]) ^ rcon[i];
        w[7] = w[1] ^ w[6];
        w[8] = w[2] ^ w[7];
        w[9] = w[3] ^ w[8];
        w[10] = w[4] ^ w[9];
        w[11] = w[5] ^ w[10];
        w += 6;
    }

    w = aesKey->eK + 52 - 4;
    for (int j = 0; j < 13; ++j) {

        for (int i = 0; i < 4; ++i) {
            v[i] = w[i];
        }
        w -= 4;
        v += 4;
    }

    return 0;
}

/* 将子密钥 key 与状态矩阵 state 进行异或运算 */
int addRoundKey(uint8_t (*state)[4], const uint32_t *key) {
    uint8_t k[4][4];

    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            k[i][j] = (uint8_t) BYTE(key[j], 3 - i);  /* 将 uint32 key[4] 复制到 uint8 k[4][4] */
            state[i][j] ^= k[i][j];
        }
    }

    return 0;
}

/* AES加密中的SubBytes步骤，通过S-Box替换字节 */
int subBytes(uint8_t (*state)[4]) {
    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = S[state[i][j]];
        }
    }

    return 0;
}

/* AES解密中的逆SubBytes步骤，通过逆S-Box替换字节 */
int invSubBytes(uint8_t (*state)[4]) {
    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = inv_S[state[i][j]];
        }
    }

    return 0;
}

/* AES加密中的ShiftRows步骤，循环移位状态矩阵中的行 */
int shiftRows(uint8_t (*state)[4]) {
    uint32_t block[4] = {0};

    /* i: 行 */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(block[i], state[i]);
        block[i] = ROF32(block[i], 8*i);
        STORE32H(block[i], state[i]);
    }

    return 0;
}

/* AES解密中的逆ShiftRows步骤，逆向循环移位状态矩阵中的行 */
int invShiftRows(uint8_t (*state)[4]) {
    uint32_t block[4] = {0};

    /* i: 行 */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(block[i], state[i]);
        block[i] = ROR32(block[i], 8*i);
        STORE32H(block[i], state[i]);
    }

    return 0;
}

/* 在伽罗瓦域(256)中对两个字节进行乘法 */
uint8_t GMul(uint8_t u, uint8_t v) {
    uint8_t p = 0;

    for (int i = 0; i < 8; ++i) {
        if (u & 0x01) {
            p ^= v;
        }

        int flag = (v & 0x80);
        v <<= 1;
        if (flag) {
            v ^= 0x1B; /* x^8 + x^4 + x^3 + x + 1 */
        }

        u >>= 1;
    }

    return p;
}

/* AES加密中的MixColumns步骤，混合列数据 */
int mixColumns(uint8_t (*state)[4]) {
    uint8_t tmp[4][4];
    uint8_t M[4][4] = {{0x02, 0x03, 0x01, 0x01},
                       {0x01, 0x02, 0x03, 0x01},
                       {0x01, 0x01, 0x02, 0x03},
                       {0x03, 0x01, 0x01, 0x02}};

    /* 将 state[4][4] 复制到 tmp[4][4] */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j){
            tmp[i][j] = state[i][j];
        }
    }

    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = GMul(M[i][0], tmp[0][j]) ^ GMul(M[i][1], tmp[1][j])
                        ^ GMul(M[i][2], tmp[2][j]) ^ GMul(M[i][3], tmp[3][j]);
        }
    }

    return 0;
}

/* AES解密中的逆MixColumns步骤，逆向混合列数据 */
int invMixColumns(uint8_t (*state)[4]) {
    uint8_t tmp[4][4];
    uint8_t M[4][4] = {{0x0E, 0x0B, 0x0D, 0x09},
                       {0x09, 0x0E, 0x0B, 0x0D},
                       {0x0D, 0x09, 0x0E, 0x0B},
                       {0x0B, 0x0D, 0x09, 0x0E}};

    /* 将 state[4][4] 复制到 tmp[4][4] */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j){
            tmp[i][j] = state[i][j];
        }
    }

    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = GMul(M[i][0], tmp[0][j]) ^ GMul(M[i][1], tmp[1][j])
                          ^ GMul(M[i][2], tmp[2][j]) ^ GMul(M[i][3], tmp[3][j]);
        }
    }

    return 0;
}

/* AES加密函数 */
int aesEncrypt(const uint8_t *key, const uint8_t *pt, uint8_t *ct, uint32_t len) {

    AesKey aesKey;
    uint8_t *pos = ct;
    const uint32_t *rk = aesKey.eK;
    uint8_t actualKey[KEYBLOCKSIZE] = {0};
    uint8_t state[4][4] = {0};

    if (NULL == key || NULL == pt || NULL == ct){
        printf("参数错误。\n");
        return -1;
    }

    if (len % 16){
        printf("输入长度无效。\n");
        return -1;
    }

    memcpy(actualKey, key, KEYBLOCKSIZE);
    keyExpansion(actualKey, KEYBLOCKSIZE, &aesKey);

    for (int i = 0; i < len; i += BLOCKSIZE) {

        loadStateArray(state, pt);
        addRoundKey(state, rk);

        for (int j = 1; j < 12; ++j) {
            rk += 4;
            subBytes(state);
            shiftRows(state);
            mixColumns(state);
            addRoundKey(state, rk);
        }

        subBytes(state);
        shiftRows(state);
        addRoundKey(state, rk+4);

        storeStateArray(state, pos);

        pos += BLOCKSIZE;
        pt += BLOCKSIZE;
        rk = aesKey.eK;
    }
    return 0;
}

/* AES解密函数 */
int aesDecrypt(const uint8_t *key, const uint8_t *ct, uint8_t *pt, uint32_t len) {
    AesKey aesKey;
    uint8_t *pos = pt;
    const uint32_t *rk = aesKey.dK;
    uint8_t actualKey[KEYBLOCKSIZE] = {0};
    uint8_t state[4][4] = {0};

    if (NULL == key || NULL == ct || NULL == pt){
        printf("参数错误。\n");
        return -1;
    }

    if (len % BLOCKSIZE){
        printf("输入长度无效。\n");
        return -1;
    }

    memcpy(actualKey, key, KEYBLOCKSIZE);
    keyExpansion(actualKey, KEYBLOCKSIZE, &aesKey);

    for (int i = 0; i < len; i += BLOCKSIZE) {
        loadStateArray(state, ct);
        addRoundKey(state, rk);

        for (int j = 1; j < 12; ++j) {
            rk += 4;
            invShiftRows(state);
            invSubBytes(state);
            addRoundKey(state, rk);
            invMixColumns(state);
        }

        invSubBytes(state);
        invShiftRows(state);
        addRoundKey(state, rk+4);

        storeStateArray(state, pos);
        pos += BLOCKSIZE;
        ct += BLOCKSIZE;
        rk = aesKey.dK;
    }
    return 0;
}

/* 打印字节数组为十六进制 */
void printHex(const uint8_t *ptr, int len, char *tag) {
    printf("%s\ndata[%d]: ", tag, len);
    for (int i = 0; i < len; ++i) {
        printf("%.2X ", *ptr++);
    }
    printf("\n");
}

/* 打印状态矩阵 */
void printState(uint8_t (*state)[4], char *tag) {
    printf("%s\n", tag);
    for (int i = 0; i < 4; ++i) {
        printf("%.2X %.2X %.2X %.2X\n", state[i][0], state[i][1], state[i][2], state[i][3]);
    }
    printf("\n");
}

/* 主函数 */
int main() {

    // ECB模式
    // 示例测试用例
    const uint8_t key[24] = {0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30,
                             0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30};
    const uint8_t pt[32] = "12345678901234561234567890123456";
    uint8_t ct[32] = {0};
    uint8_t plain[32] = {0};

    aesEncrypt(key, pt, ct, 32);
    printHex(pt, 32, "明文数据:");
    printf("预期密文: 43 95 72 0B C2 61 34 02 DA 37 4E A4 37 8E 6B DE 43 95 72 0B C2 61 34 02 DA 37 4E A4 37 8E 6B DE\n");
    printHex(ct, 32, "加密后的密文:");

    aesDecrypt(key, ct, plain, 32);
    printHex(plain, 32, "解密后的明文:");
    return 0;
}

```

## AES256示例
```c
#include <stdio.h>
#include <string.h>
#include <stdint.h>

// 定义AES密钥结构体，包含加密密钥和解密密钥
typedef struct{
    uint32_t eK[60], dK[60];    // encKey, decKey：加密密钥和解密密钥
} AesKey;

#define BLOCKSIZE 16  // 定义AES的块大小为16字节（128位）
#define KEYBLOCKSIZE 32  // 定义AES KEY的块大小为32字节（256位）

// 宏定义，用于从字节数组中加载32位整数
#define LOAD32H(x, y) \
  do { (x) = ((uint32_t)((y)[0] & 0xff)<<24) | ((uint32_t)((y)[1] & 0xff)<<16) | \
             ((uint32_t)((y)[2] & 0xff)<<8)  | ((uint32_t)((y)[3] & 0xff));} while(0)

// 宏定义，用于将32位整数存储到字节数组中
#define STORE32H(x, y) \
  do { (y)[0] = (uint8_t)(((x)>>24) & 0xff); (y)[1] = (uint8_t)(((x)>>16) & 0xff);   \
       (y)[2] = (uint8_t)(((x)>>8) & 0xff); (y)[3] = (uint8_t)((x) & 0xff); } while(0)

// 提取一个字节
#define BYTE(x, n) (((x) >> (8 * (n))) & 0xff)

// 用于密钥扩展的宏定义，进行S-Box替换和混合操作
#define MIX(x) ((S[x>>24]<<24) +(S[(x>>16)&0xFF]<<16) +(S[(x>>8)&0xFF]<<8) +S[x&0xFF])


// 左旋转32位整数
#define ROF32(x, n)  (((x) << (n)) | ((x) >> (32-(n))))

// 右旋转32位整数
#define ROR32(x, n)  (((x) >> (n)) | ((x) << (32-(n))))

// AES算法中使用的Rcon常量，用于密钥扩展
static const uint32_t rcon[15] = {
    0x01000000UL, 0x02000000UL, 0x04000000UL, 0x08000000UL,
    0x10000000UL, 0x20000000UL, 0x40000000UL, 0x80000000UL,
    0x1B000000UL, 0x36000000UL, 0x6C000000UL, 0xD8000000UL,
    0xAB000000UL, 0x4D000000UL, 0x9A000000UL
};

// S-Box用于SubBytes步骤中的字节替换
unsigned char S[256] = {
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16
};

// 逆S-Box，用于解密过程中的逆SubBytes步骤
unsigned char inv_S[256] = {
    0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
    0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
    0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
    0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
    0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
    0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
    0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
    0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
    0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
    0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
    0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
    0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
    0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
    0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
    0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D
};

/* 从字节数组 in[16] 复制到状态矩阵 state[4][4] 中 */
int loadStateArray(uint8_t (*state)[4], const uint8_t *in) {
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[j][i] = *in++;
        }
    }
    return 0;
}

/* 从状态矩阵 state[4][4] 复制到字节数组 out[16] 中 */
int storeStateArray(const uint8_t (*state)[4], uint8_t *out) {
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            *out++ = state[j][i];
        }
    }
    return 0;
}

/* 密钥扩展函数，将256位密钥扩展为60个32位子密钥 */
int keyExpansion(const uint8_t *key, uint32_t keyLen, AesKey *aesKey) {
    if (NULL == key || NULL == aesKey){
        printf("keyExpansion 参数为 NULL\n");
        return -1;
    }

    if (keyLen != KEYBLOCKSIZE){
        printf("keyExpansion keyLen = %d，不支持。\n", keyLen);
        return -1;
    }

    uint32_t *w = aesKey->eK;
    uint32_t *v = aesKey->dK;

    /* 处理W[0-7] */
    for (int i = 0; i < 8; ++i) {
        LOAD32H(w[i], key + 4*i);
    }

    /* 处理W[8-59] */
    for (int i = 0; i < 7; ++i) {
        w[8] = w[0] ^ MIX(ROF32(w[7], 8)) ^ rcon[i];
        w[9] = w[1] ^ w[8];
        w[10] = w[2] ^ w[9];
        w[11] = w[3] ^ w[10];
        w[12] = MIX(w[11]) ^ w[4];
        w[13] = w[5] ^ w[12];
        w[14] = w[6] ^ w[13];
        w[15] = w[7] ^ w[14];
        w += 8;
    }

    w = aesKey->eK + 60 - 4;
    for (int j = 0; j < 15; ++j) {
        for (int i = 0; i < 4; ++i) {
            v[i] = w[i];
        }
        w -= 4;
        v += 4;
    }
    return 0;
}

/* 将子密钥 key 与状态矩阵 state 进行异或运算 */
int addRoundKey(uint8_t (*state)[4], const uint32_t *key) {
    uint8_t k[4][4];

    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            k[i][j] = (uint8_t) BYTE(key[j], 3 - i);  /* 将 uint32 key[4] 复制到 uint8 k[4][4] */
            state[i][j] ^= k[i][j];
        }
    }

    return 0;
}

/* AES加密中的SubBytes步骤，通过S-Box替换字节 */
int subBytes(uint8_t (*state)[4]) {
    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = S[state[i][j]];
        }
    }

    return 0;
}

/* AES解密中的逆SubBytes步骤，通过逆S-Box替换字节 */
int invSubBytes(uint8_t (*state)[4]) {
    /* i: 行, j: 列 */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = inv_S[state[i][j]];
        }
    }

    return 0;
}

/* AES加密中的ShiftRows步骤，循环移位状态矩阵中的行 */
int shiftRows(uint8_t (*state)[4]) {
    uint32_t block[4] = {0};

    /* i: 行 */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(block[i], state[i]);
        block[i] = ROF32(block[i], 8*i);
        STORE32H(block[i], state[i]);
    }

    return 0;
}

/* AES解密中的逆ShiftRows步骤，逆向循环移位状态矩阵中的行 */
int invShiftRows(uint8_t (*state)[4]) {
    uint32_t block[4] = {0};

    /* i: 行 */
    for (int i = 0; i < 4; ++i) {
        LOAD32H(block[i], state[i]);
        block[i] = ROR32(block[i], 8*i);
        STORE32H(block[i], state[i]);
    }

    return 0;
}

/* 在伽罗瓦域(256)中对两个字节进行乘法 */
uint8_t GMul(uint8_t u, uint8_t v) {
    uint8_t p = 0;

    for (int i = 0; i < 8; ++i) {
        if (u & 0x01) {
            p ^= v;
        }

        int flag = (v & 0x80);
        v <<= 1;
        if (flag) {
            v ^= 0x1B; /* x^8 + x^4 + x^3 + x + 1 */
        }

        u >>= 1;
    }

    return p;
}

/* AES加密中的MixColumns步骤，混合列数据 */
int mixColumns(uint8_t (*state)[4]) {
    uint8_t tmp[4][4];
    uint8_t M[4][4] = {{0x02, 0x03, 0x01, 0x01},
                       {0x01, 0x02, 0x03, 0x01},
                       {0x01, 0x01, 0x02, 0x03},
                       {0x03, 0x01, 0x01, 0x02}};

    /* 将 state[4][4] 复制到 tmp[4][4] */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j){
            tmp[i][j] = state[i][j];
        }
    }

    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = GMul(M[i][0], tmp[0][j]) ^ GMul(M[i][1], tmp[1][j])
                        ^ GMul(M[i][2], tmp[2][j]) ^ GMul(M[i][3], tmp[3][j]);
        }
    }

    return 0;
}

/* AES解密中的逆MixColumns步骤，逆向混合列数据 */
int invMixColumns(uint8_t (*state)[4]) {
    uint8_t tmp[4][4];
    uint8_t M[4][4] = {{0x0E, 0x0B, 0x0D, 0x09},
                       {0x09, 0x0E, 0x0B, 0x0D},
                       {0x0D, 0x09, 0x0E, 0x0B},
                       {0x0B, 0x0D, 0x09, 0x0E}};

    /* 将 state[4][4] 复制到 tmp[4][4] */
    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j){
            tmp[i][j] = state[i][j];
        }
    }

    for (int i = 0; i < 4; ++i) {
        for (int j = 0; j < 4; ++j) {
            state[i][j] = GMul(M[i][0], tmp[0][j]) ^ GMul(M[i][1], tmp[1][j])
                          ^ GMul(M[i][2], tmp[2][j]) ^ GMul(M[i][3], tmp[3][j]);
        }
    }

    return 0;
}
/**
 *
 * @param key 16字节的密钥
 * @param pt 明文数据
 * @param ct 加密后数据输出位置
 * @param len 加密数据长度
 * @return 错误状态
 */
int aesEncrypt(const uint8_t *key, const uint8_t *pt, uint8_t *ct, uint32_t len) {

    AesKey aesKey;
    uint8_t *pos = ct;
    const uint32_t *rk = aesKey.eK;
    uint8_t actualKey[KEYBLOCKSIZE] = {0};
    uint8_t state[4][4] = {0};

    if (NULL == key || NULL == pt || NULL == ct){
        printf("参数错误。\n");
        return -1;
    }

    if (len % 16){
        printf("输入长度无效。\n");
        return -1;
    }

    memcpy(actualKey, key, KEYBLOCKSIZE);
    keyExpansion(actualKey, KEYBLOCKSIZE, &aesKey);

    for (int i = 0; i < len; i += BLOCKSIZE) {
        loadStateArray(state, pt);
        addRoundKey(state, rk);

        for (int j = 1; j < 14; ++j) {
            rk += 4;
            subBytes(state);
            shiftRows(state);
            mixColumns(state);
            addRoundKey(state, rk);
        }

        subBytes(state);
        shiftRows(state);
        addRoundKey(state, rk+4);

        storeStateArray(state, pos);

        pos += BLOCKSIZE;
        pt += BLOCKSIZE;
        rk = aesKey.eK;
    }
    return 0;
}

/* AES解密函数 */
/**
 *
 * @param key 16字节的密钥
 * @param pt 明文数据
 * @param ct 加密后数据输出位置
 * @param len 加密数据长度
 * @return 错误状态
 */
int aesDecrypt(const uint8_t *key, const uint8_t *ct, uint8_t *pt, uint32_t len) {
    AesKey aesKey;
    uint8_t *pos = pt;
    const uint32_t *rk = aesKey.dK;
    uint8_t actualKey[KEYBLOCKSIZE] = {0};
    uint8_t state[4][4] = {0};

    if (NULL == key || NULL == ct || NULL == pt){
        printf("参数错误。\n");
        return -1;
    }

    if (len % BLOCKSIZE){
        printf("输入长度无效。\n");
        return -1;
    }

    memcpy(actualKey, key, KEYBLOCKSIZE);
    keyExpansion(actualKey, KEYBLOCKSIZE, &aesKey);

    for (int i = 0; i < len; i += BLOCKSIZE) {
        loadStateArray(state, ct);
        addRoundKey(state, rk);

        for (int j = 1; j < 14; ++j) {
            rk += 4;
            invShiftRows(state);
            invSubBytes(state);
            addRoundKey(state, rk);
            invMixColumns(state);
        }

        invSubBytes(state);
        invShiftRows(state);
        addRoundKey(state, rk+4);

        storeStateArray(state, pos);
        pos += BLOCKSIZE;
        ct += BLOCKSIZE;
        rk = aesKey.dK;
    }
    return 0;
}

/* 打印字节数组为十六进制 */
void printHex(const uint8_t *ptr, int len, char *tag) {
    printf("%s\ndata[%d]: ", tag, len);
    for (int i = 0; i < len; ++i) {
        printf("%.2X ", *ptr++);
    }
    printf("\n");
}

/* 主函数 */
int main() {
    // ECB模式
    const uint8_t key[32] = {0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30, 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30 , 0x30};
    const uint8_t pt[32] = "12345678901234561234567890123456";
    uint8_t ct[32] = {0};
    uint8_t plain[32] = {0};

    aesEncrypt(key, pt, ct, 32);
    printHex(pt, 32, "明文数据:");
    printf("预期密文: 48 08 EA 1A 2C 27 6B 83 75 A5 D4 FB C5 02 E9 A9 48 08 EA 1A 2C 27 6B 83 75 A5 D4 FB C5 02 E9 A9\n");

    printHex(ct, 32, "加密后的密文:");

    aesDecrypt(key, ct, plain, 32);
    printHex(plain, 32, "解密后的明文:");
    return 0;
}

```