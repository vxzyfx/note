---
title: WebSocket 协议
---

## 简介

WebSocket 是一种**全双工**的协议, 用于解决 HTTP 的实时性问题, HTTP 只能由客户端发起, 如果要实时接收服务端数据, 只能通过客服端不断发送 HTTP 请求(现在也可以使用 EventStream, 实现服务端数据下发)

## 建立连接

1. 客户端发送一个 HTTP 请求

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

如果请求头检查出异常，服务端可以返回状态码 **400** 并关闭连接；如果 **Sec-WebSocket-Version** 不受支持，RFC 6455 要求返回 **426 Upgrade Required**，并在响应头中添加服务端支持的 **Sec-WebSocket-Version**。

**Sec-WebSocket-Key** 用于生成 **Sec-WebSocket-Accept**，目的是证明服务端理解 WebSocket 握手，而不是提供加密或认证安全；需要保密性和身份认证时应使用基于 TLS 的 `wss://`。

1. 服务端返回

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

**Sec-WebSocket-Accept** 计算方式

```bash
Sec-WebSocket-Accept = base64(sha1(Sec-WebSocket-Key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))
```

**258EAFA5-E914-47DA-95CA-C5AB0DC85B11** 是由协议规定的魔术字符串

## 数据格式

```txt
      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+

```

**FIN** 是否为最后一帧数据, 1 表示是最后一帧

RSV1, RSV2, RSV3 保留字段

**opcode** 负载数据类型

| opcode | 类型 |
| :-- | :-- |
| 0x0 |  连续 |
| 0x1 |  utf-8 文本 |
| 0x2 |  二进制 |
| 0x3-7 |  保留 |
| 0x8 |  关闭连接 |
| 0x9 |  ping |
| 0xA |  pong |
| 0xB-F |  保留 |

**MASK** 必须为 1, 不为 1 时, 服务端断开连接

**Payload len** (负荷长度)

读取 9 到 15 位, 作为无符号整数 s, 如果 `s <= 125` , 则 s 就是长度, 如果 `s == 126` , 则从 16 位开始读区 16 位(2 字节)作为长度, 如果 `s == 127,` 则从 16 位开始读区 64 位(8 字节)作为长度

**Masking-key** 如果 MASK 为 1, 则有 **Masking-key** , 对于客户端到服务端的数据总是有 **Masking-key**

## 数据解码

```javascript
const MASK = [1, 2, 3, 4]; // 4字节的Masking-key
const ENCODED = [105, 103, 111, 104, 110]; // 负荷数据

const DECODED = Uint8Array.from(ENCODED, (elt, i) => elt ^ MASK[i % 4]);

```

## 参考资料

1. [RFC 6455: The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)（访问日期：2026-05-31）
