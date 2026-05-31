---
title: 分组密码填充
head:
  - tag: link
    attrs:
      rel: canonical
      href: /23-encryption/40-padding/
  - tag: meta
    attrs:
      property: og:url
      content: /23-encryption/40-padding/
description: 说明分组密码常见填充方式及其使用边界。
---

分组密码一次处理固定大小的数据块。明文长度不是块大小整数倍时，需要先定义填充规则，让解密端可以还原原始长度。填充只解决长度对齐问题，不提供认证或防篡改能力。

## 常见填充方式

### PKCS#7 填充

PKCS#7 填充会在末尾追加 `N` 个字节，每个字节的值都等于 `N`。如果块大小为 8 字节，明文还差 7 字节补齐，则追加 `07 07 07 07 07 07 07`；如果明文刚好对齐，也会追加一个完整填充块，避免解密端无法区分“真实末尾”和“填充末尾”。

### ANSI X.923 填充

ANSI X.923 填充把除最后一个填充字节外的内容置为 `00`，最后一个字节记录填充长度。例如还差 7 字节时，可以追加 `00 00 00 00 00 00 07`。

### ISO/IEC 7816-4 风格填充

这种写法在数据后追加 `80`，再用 `00` 补齐到块边界。例如还差 7 字节时，可以追加 `80 00 00 00 00 00 00`。它常见于智能卡/报文格式语境，具体适用性应按协议规范确认。

### Zero Padding

零填充用 `00` 补齐最后一个块。它只能在明文格式能可靠区分末尾零字节时使用；如果原始数据本身可能以 `00` 结尾，解密端无法仅凭密文判断哪些字节是填充。

### No Padding

不填充只适用于调用方已经保证数据长度是块大小整数倍，或使用 CTR、GCM 等不需要传统块填充的模式。不要把“不填充”当成通用默认值。

## 使用注意

- 填充错误不应被应用层暴露成可区分的错误消息，否则可能引入填充 Oracle 风险。
- 新设计优先选用经过认证的 AEAD 模式或高层密码库接口，避免手写“模式 + 填充 + MAC”的组合。
- ISO 10126 等历史/变体填充在不同库中的支持不一致；如果必须兼容旧格式，应写清协议来源并单独测试。

## 参考资料

1. [RFC 5652: Cryptographic Message Syntax](https://datatracker.ietf.org/doc/html/rfc5652)（访问日期：2026-05-31）
2. [NIST SP 800-38A: Recommendation for Block Cipher Modes of Operation](https://csrc.nist.gov/publications/detail/sp/800-38a/final)（访问日期：2026-05-31）
3. [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)（访问日期：2026-05-31）
