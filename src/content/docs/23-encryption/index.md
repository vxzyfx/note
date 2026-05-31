---
title: 加密算法介绍
description: 汇总常见密码学算法、填充方式和分组模式的入口页。
---

加密页面现在作为密码学主题的总览和导航页。算法页保留在当前合集下，填充与分组模式从原来的长页中拆出为独立子页，避免一个页面同时承担概念总览、模式细节和算法清单。

## 阅读顺序

1. 先读本页，确认对称加密、非对称加密、哈希和校验码的边界。
2. 需要分组密码输入长度处理时，读 [分组密码填充](40-padding)。
3. 需要选择分组模式或理解 IV、nonce、认证标签时，读 [分组密码模式](41-block-modes)。
4. 具体算法继续进入对应子页，例如 [AES](2-aes)、[RSA](20-rsa)、[SHA-2](32-sha2)。

## 主题边界

- 对称加密使用同一密钥完成加密和解密，典型算法包括 [AES](2-aes)。旧的 [DES/3DES](1-des) 只适合作为历史兼容材料，不应作为新系统首选。
- 非对称密码学使用公钥和私钥，常见用途包括密钥交换、数字签名和有限场景下的数据加密；本合集包含 [RSA](20-rsa) 与 [ECC](21-ecc)。
- 哈希函数用于摘要和完整性构件，不等同于加密；本合集包含 [MD5](30-md5)、[SHA-1](31-sha1)、[SHA-2](32-sha2) 和 [SHA-3](33-sha3)。
- [CRC](34-crc) 是随机错误检测机制，不提供抗篡改认证，不能替代 MAC 或数字签名。

## 结构变更记录

原 `src/content/docs/23-encryption/index.md` 中的填充章节已迁移到 [分组密码填充](40-padding)，分组模式章节已迁移到 [分组密码模式](41-block-modes)。旧路由 `/23-encryption/` 保留为合集 hub，不直接承载长篇模式细节。

## 参考资料

1. [NIST FIPS 197: Advanced Encryption Standard (AES)](https://csrc.nist.gov/publications/detail/fips/197/final)（访问日期：2026-05-31）
2. [NIST SP 800-38A: Recommendation for Block Cipher Modes of Operation](https://csrc.nist.gov/publications/detail/sp/800-38a/final)（访问日期：2026-05-31）
3. [NIST SP 800-38D: Galois/Counter Mode (GCM) and GMAC](https://csrc.nist.gov/publications/detail/sp/800-38d/final)（访问日期：2026-05-31）
4. [NIST SP 800-131A Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-131a/rev-2/final)（访问日期：2026-05-31）
