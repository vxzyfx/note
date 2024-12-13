---
title: WebSocket 协议
---

## 简介

WebSocket是一种**全双工**的协议, 用于解决HTTP的实时性问题, HTTP只能由客户端发起, 如果要实时接收服务端数据, 只能通过客服端不断发送HTTP请求(现在也可以使用EventStream, 实现服务端数据下发)

## 建立连接

1. 客户端发送一个HTTP请求

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

如果请求头检查出异常, 返回状态码**400**并关闭连接, 如果**Sec-WebSocket-Version**不对, 应该在响应头中添加支持的**Sec-WebSocket-Version**


**Sec-WebSocket-Key** 用于生成 **Sec-WebSocket-Accept** 保证安全

2. 服务端返回

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

**258EAFA5-E914-47DA-95CA-C5AB0DC85B11**是由协议规定的魔术字符串

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

**FIN** 是否为最后一帧数据, 1表示是最后一帧

RSV1, RSV2, RSV3保留字段


**opcode**负载数据类型
| opcode | 类型 |
| :-- | :-- |
| 0x0 |  连续 |
| 0x1 |  utf-8文本 |
| 0x2 |  二进制 |
| 0x3-7 |  保留 |
| 0x8 |  关闭连接 |
| 0x9 |  ping |
| 0xA |  pong |
| 0xB-F |  保留 |

**MASK**必须为1, 不为1时, 服务端断开连接

**Payload len**(负荷长度)

读取9到15位, 作为无符号整数s, 如果`s <= 125`, 则s就是长度, 如果`s == 126`, 则从16位开始读区16位(2字节)作为长度, 如果`s == 127, `则从16位开始读区64位(8字节)作为长度

**Masking-key**如果MASK为1, 则有**Masking-key**, 对于客户端到服务端的数据总是有**Masking-key**

## 数据解码

```javascript
const MASK = [1, 2, 3, 4]; // 4字节的Masking-key
const ENCODED = [105, 103, 111, 104, 110]; // 负荷数据

const DECODED = Uint8Array.from(ENCODED, (elt, i) => elt ^ MASK[i % 4]);

```