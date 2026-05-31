---
title: 分组密码模式
head:
  - tag: link
    attrs:
      rel: canonical
      href: /23-encryption/41-block-modes/
  - tag: meta
    attrs:
      property: og:url
      content: /23-encryption/41-block-modes/
description: 说明 ECB、CBC、CFB、OFB、CTR、GCM 等模式的边界和选择建议。
---

分组密码模式（block cipher mode of operation）定义如何把固定块大小的分组密码用于更长的数据。模式选择会影响保密性、并行能力、错误传播和是否提供认证。

## 选择原则

- 新系统优先使用带认证的 AEAD 模式，例如 AES-GCM；它同时提供保密性和完整性校验，但要求 nonce/IV 不能在同一密钥下重复。
- CBC、CFB、OFB、CTR 只提供保密性，通常还需要独立 MAC 或协议层认证；不要把“加密成功”当成“数据未被篡改”。
- ECB 会泄露相同明文块的模式，除非常小且协议明确的特殊场景外，不应用于一般数据加密。

## 常见模式

### ECB

ECB（Electronic Codebook）对每个明文块独立加密。相同明文块会得到相同密文块，因此会泄露重复结构。它适合教学说明模式风险，不适合作为通用数据加密模式。

### CBC

CBC（Cipher Block Chaining）在加密每个明文块前先与前一个密文块异或，第一个块使用 IV。IV 需要不可预测，并且解密端需要正确处理填充和认证失败。没有认证保护的 CBC 容易在错误处理不当时引入填充 Oracle 类问题。

### CFB 与 OFB

CFB（Cipher Feedback）和 OFB（Output Feedback）把分组密码转换成类似流密码的用法，可以处理非整块长度的数据。它们仍依赖 IV/反馈状态管理，通常不单独提供完整性保护。

### CTR

CTR（Counter）把 nonce 与计数器组合后加密，生成密钥流再与明文异或。CTR 可以并行处理，也不需要传统填充；但同一密钥下重复使用 nonce/计数器组合会破坏安全性。

### GCM

GCM（Galois/Counter Mode）基于计数器模式加密，并用 GHASH 生成认证标签。它可以认证附加数据（AAD），常见于 TLS 等协议。GCM 的核心前提是同一密钥下 nonce/IV 必须唯一；标签验证失败时，不应继续使用解密结果。

## 历史或少见模式

PCBC、Belt CTR 等模式在通用应用中不常作为默认选择。若某个协议或地区标准要求使用，应以该协议标准为准，并在页面中补充来源；当前笔记不把它们列为新系统推荐方案。

## 参考资料

1. [NIST SP 800-38A: Recommendation for Block Cipher Modes of Operation](https://csrc.nist.gov/publications/detail/sp/800-38a/final)（访问日期：2026-05-31）
2. [NIST SP 800-38D: Galois/Counter Mode (GCM) and GMAC](https://csrc.nist.gov/publications/detail/sp/800-38d/final)（访问日期：2026-05-31）
3. [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](https://datatracker.ietf.org/doc/html/rfc8446)（访问日期：2026-05-31）
