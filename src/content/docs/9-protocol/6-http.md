---
title: HTTP协议
---

HTTP（HyperText Transfer Protocol，超文本传输协议）是用于传输超文本数据（如 HTML）的应用层协议。它是万维网的基础协议，定义了客户端（如浏览器）与服务器之间的通信规则。以下是 HTTP 协议的一些关键要点：

### HTTP 的特点

1. **无状态**：HTTP 协议是无状态的，每个请求都是独立的，服务器不会保留之前请求的状态。这意味着每次请求之间没有关联，简化了服务器的设计，但也意味着需要额外的机制（如 Cookie）来保持会话状态。

2. **灵活性**：HTTP 允许传输任意类型的数据，通过 MIME 类型来标识数据类型。

3. **简单性**：HTTP 协议设计简单，易于理解和实现，采用请求 - 响应模型。

### HTTP 工作流程

1. **客户端发起请求**：客户端向服务器发送 HTTP 请求，请求包括请求行、请求头和可选的请求体。

   - **请求行**：包含 HTTP 方法（如 GET、POST）、请求的 URL 和 HTTP 版本。
   - **请求头**：包含请求的元数据（如 Host、User-Agent、Accept 等）。
   - **请求体**：包含请求的具体数据（仅在 POST、PUT 等方法中使用）。

2. **服务器处理请求**：服务器接收到请求后，处理请求并生成响应。响应包括状态行、响应头和响应体。

   - **状态行**：包含 HTTP 版本、状态码（如 200 OK、404 Not Found）和状态描述。
   - **响应头**：包含响应的元数据（如 Content-Type、Content-Length、Set-Cookie 等）。
   - **响应体**：包含实际的响应数据（如 HTML 文档、图片等）。

3. **客户端接收响应**：客户端接收并处理服务器的响应，根据响应内容进行相应的操作（如渲染网页、显示错误信息等）。

HTTP 报文格式分为请求报文和响应报文两种，以下分别介绍它们的格式：

### HTTP 请求报文

HTTP 请求报文由以下几部分组成：

1. **请求行**：包含 HTTP 方法、请求目标（URL）和 HTTP 版本。
2. **请求头部**：包含描述客户端或请求的元数据的多个头字段。
3. **空行**：用于分隔头部和请求体。
4. **请求体**：可选，包含请求的具体数据（如表单数据、文件上传等）。

#### 请求报文格式示例

```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive

```

### HTTP 响应报文

HTTP 响应报文由以下几部分组成：

1. **状态行**：包含 HTTP 版本、状态码和状态描述。
2. **响应头部**：包含描述服务器或响应的元数据的多个头字段。
3. **空行**：用于分隔头部和响应体。
4. **响应体**：包含实际的响应数据（如 HTML 文档、图片等）。

#### 响应报文格式示例

```http
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2021 12:28:53 GMT
Server: Apache/2.4.1 (Unix)
Last-Modified: Wed, 22 Jul 2021 19:15:56 GMT
Content-Type: text/html
Content-Length: 88
Connection: close

<html>
<body>
<h1>Hello, World!</h1>
</body>
</html>
```

#### 详细解释

#### 请求报文

1. **请求行**：
   - **方法**：如 GET、POST、PUT、DELETE 等。
   - **请求目标**：通常是 URL 路径。
   - **HTTP 版本**：如 HTTP/1.1。

   示例：

   ```
   GET /index.html HTTP/1.1
   ```

2. **请求头部**：
   - 每个头字段由字段名和字段值组成，冒号分隔。
   - 常见的请求头字段包括 Host、User-Agent、Accept、Accept-Language、Accept-Encoding、Connection 等。

   示例：

   ```http
   Host: www.example.com
   User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
   ```

3. **空行**：
   - 空行用于分隔请求头和请求体。
   - 如果没有请求体，则此空行后即为报文结束。

4. **请求体**：
   - 可选部分，包含请求的具体数据。
   - 仅在 POST、PUT 等方法中使用。

#### 响应报文

1. **状态行**：
   - **HTTP 版本**：如 HTTP/1.1。
   - **状态码**：如 200、404、500 等。
   - **状态描述**：如 OK、Not Found、Internal Server Error 等。

   示例：

   ```http
   HTTP/1.1 200 OK
   ```

2. **响应头部**：
   - 每个头字段由字段名和字段值组成，冒号分隔。
   - 常见的响应头字段包括 Date、Server、Last-Modified、Content-Type、Content-Length、Connection 等。

   示例：

   ```http
   Date: Mon, 27 Jul 2021 12:28:53 GMT
   Server: Apache/2.4.1 (Unix)
   Content-Type: text/html
   Content-Length: 88
   ```

3. **空行**：
   - 空行用于分隔响应头和响应体。
   - 如果没有响应体，则此空行后即为报文结束。

4. **响应体**：
   - 包含实际的响应数据。
   - 例如 HTML 文档、JSON 数据、图片等。

   示例：

   ```html
   <html>
   <body>
   <h1>Hello, World!</h1>
   </body>
   </html>
   ```

### HTTP 方法

HTTP 定义了多种请求方法，每种方法表示不同的操作：

- **GET**：请求资源，不包含请求体，通常用于获取数据。
- **POST**：提交数据给服务器，包含请求体，通常用于表单提交或上传文件。
- **PUT**：更新指定资源，包含请求体。
- **DELETE**：删除指定资源。
- **HEAD**：与 GET 类似，但不返回响应体，仅获取响应头。
- **OPTIONS**：获取服务器支持的 HTTP 方法。
- **PATCH**：对资源进行部分修改。

### HTTP 状态码

以下是 HTTP 状态码的表格：

| **状态码** | **类别**       | **描述**                        |
|------------|----------------|---------------------------------|
| **1xx**    | **信息**       | **请求已接收，继续处理**        |
| 100        | Continue       | 继续                            |
| 101        | Switching Protocols | 切换协议                 |
| 102        | Processing     | 处理                            |
| **2xx**    | **成功**       | **请求已成功处理**              |
| 200        | OK             | 成功                            |
| 201        | Created        | 已创建                          |
| 202        | Accepted       | 已接受                          |
| 203        | Non-Authoritative Information | 非权威信息   |
| 204        | No Content     | 无内容                          |
| 205        | Reset Content  | 重置内容                        |
| 206        | Partial Content | 部分内容                       |
| 207        | Multi-Status   | 多状态                          |
| 208        | Already Reported | 已报告                        |
| 226        | IM Used        | IM 使用                         |
| **3xx**    | **重定向**     | **进一步操作以完成请求**        |
| 300        | Multiple Choices | 多种选择                     |
| 301        | Moved Permanently | 永久移动                    |
| 302        | Found          | 临时移动                        |
| 303        | See Other      | 查看其他                        |
| 304        | Not Modified   | 未修改                          |
| 305        | Use Proxy      | 使用代理                        |
| 306        | (Unused)       | 未使用                          |
| 307        | Temporary Redirect | 临时重定向                 |
| 308        | Permanent Redirect | 永久重定向                 |
| **4xx**    | **客户端错误** | **请求有错误**                  |
| 400        | Bad Request    | 错误请求                        |
| 401        | Unauthorized   | 未授权                          |
| 402        | Payment Required | 需要付款                     |
| 403        | Forbidden      | 禁止                            |
| 404        | Not Found      | 未找到                          |
| 405        | Method Not Allowed | 方法不允许                 |
| 406        | Not Acceptable | 不可接受                        |
| 407        | Proxy Authentication Required | 需要代理认证  |
| 408        | Request Timeout | 请求超时                      |
| 409        | Conflict       | 冲突                            |
| 410        | Gone           | 已消失                          |
| 411        | Length Required | 需要长度                      |
| 412        | Precondition Failed | 先决条件失败             |
| 413        | Payload Too Large | 负载过大                    |
| 414        | URI Too Long   | URI 过长                         |
| 415        | Unsupported Media Type | 不支持的媒体类型      |
| 416        | Range Not Satisfiable | 范围无法满足           |
| 417        | Expectation Failed | 预期失败                  |
| 418        | I'm a teapot   | 我是茶壶                        |
| 421        | Misdirected Request | 误导请求                 |
| 422        | Unprocessable Entity | 不可处理的实体          |
| 423        | Locked         | 已锁定                          |
| 424        | Failed Dependency | 依赖失败                   |
| 425        | Too Early      | 太早                            |
| 426        | Upgrade Required | 需要升级                   |
| 428        | Precondition Required | 需要先决条件          |
| 429        | Too Many Requests | 请求过多                   |
| 431        | Request Header Fields Too Large | 请求头字段过大 |
| 451        | Unavailable For Legal Reasons | 因法律原因不可用 |
| **5xx**    | **服务器错误** | **服务器处理请求时发生错误**    |
| 500        | Internal Server Error | 内部服务器错误           |
| 501        | Not Implemented | 未实现                         |
| 502        | Bad Gateway    | 错误网关                        |
| 503        | Service Unavailable | 服务不可用                |
| 504        | Gateway Timeout | 网关超时                      |
| 505        | HTTP Version Not Supported | 不支持的 HTTP 版本    |
| 506        | Variant Also Negotiates | 变体也协商              |
| 507        | Insufficient Storage | 存储空间不足             |
| 508        | Loop Detected  | 检测到循环                      |
| 510        | Not Extended   | 未扩展                          |
| 511        | Network Authentication Required | 需要网络认证   |

### HTTP 请求头

| **请求头字段**       | **描述**                                                                                                                                         |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Accept**           | 指定客户端能够接收的内容类型。                                                                                                                   |
| **Accept-Charset**   | 指定客户端接受的字符集。                                                                                                                         |
| **Accept-Encoding**  | 指定客户端能够理解的内容编码（通常用于数据压缩）。                                                                                               |
| **Accept-Language**  | 指定客户端接受的语言。                                                                                                                           |
| **Authorization**    | 包含用于服务器验证客户端身份的凭据。                                                                                                             |
| **Cache-Control**    | 用于指定请求和响应的缓存机制。                                                                                                                   |
| **Connection**       | 控制连接的方式，例如 `keep-alive` 或 `close`。                                                                                                      |
| **Content-Length**   | 请求体的长度（以字节为单位）。                                                                                                                   |
| **Content-Type**     | 请求体的 MIME 类型。                                                                                                                               |
| **Cookie**           | 包含客户端的 Cookie 数据。                                                                                                                         |
| **Host**             | 指定请求的主机名和端口号，通常是服务器的域名。                                                                                                   |
| **If-Match**         | 只有在实体标签匹配时才会进行请求。                                                                                                               |
| **If-Modified-Since**| 如果请求的资源自指定日期以来未修改，则返回 304 状态码。                                                                                             |
| **If-None-Match**    | 只有在实体标签不匹配时才会进行请求。                                                                                                             |
| **If-Range**         | 如果实体未修改，则返回指定范围的内容。                                                                                                           |
| **If-Unmodified-Since**| 只有在指定日期以来未修改的情况下才会进行请求。                                                                                                  |
| **Range**            | 请求资源的字节范围。                                                                                                                             |
| **Referer**          | 包含发出请求的页面的 URL。                                                                                                                         |
| **User-Agent**       | 包含发出请求的用户代理（通常是浏览器）的标识信息。                                                                                               |
| **Upgrade**          | 用于指定升级到其他协议。                                                                                                                         |
| **Via**              | 显示消息通过的中间节点。                                                                                                                         |
| **Warning**          | 用于在代理服务器中附加额外的警告信息。                                                                                                           |

### HTTP 响应头

| **响应头字段**       | **描述**                                                                                                                                      |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Accept-Ranges**    | 指示服务器是否接受范围请求（例如字节范围请求）。                                                                                              |
| **Age**              | 从原始服务器生成响应以来的秒数。                                                                                                              |
| **Allow**            | 对资源允许的 HTTP 方法。                                                                                                                        |
| **Cache-Control**    | 用于指定缓存机制的指令。                                                                                                                      |
| **Connection**       | 控制连接的方式，例如 `keep-alive` 或 `close`。                                                                                                   |
| **Content-Encoding** | 表示资源的编码方式（例如 gzip）。                                                                                                              |
| **Content-Language** | 表示资源的语言。                                                                                                                              |
| **Content-Length**   | 响应体的长度（以字节为单位）。                                                                                                                |
| **Content-Location** | 替代资源的 URL。                                                                                                                              |
| **Content-Range**    | 指定返回部分响应时使用的范围。                                                                                                                |
| **Content-Type**     | 响应体的 MIME 类型。                                                                                                                            |
| **Date**             | 响应生成的日期和时间。                                                                                                                        |
| **ETag**             | 资源的实体标签，用于缓存验证。                                                                                                                |
| **Expires**          | 资源的过期时间。                                                                                                                              |
| **Last-Modified**    | 资源的最后修改时间。                                                                                                                          |
| **Location**         | 用于重定向或创建新资源时的资源 URL。                                                                                                           |
| **Pragma**           | 与 HTTP/1.0 缓存机制相关的指令。                                                                                                                |
| **Proxy-Authenticate** | 要求客户端进行代理身份验证。                                                                                                                |
| **Retry-After**      | 告诉客户端应该在多长时间后再次尝试请求。                                                                                                      |
| **Server**           | 服务器的软件信息。                                                                                                                            |
| **Set-Cookie**       | 设置 Cookie。                                                                                                                                  |
| **Trailer**          | 表示响应结束时可能存在的头字段。                                                                                                              |
| **Transfer-Encoding** | 表示响应体的传输编码方式（例如 chunked）。                                                                                                    |
| **Vary**             | 指示缓存服务器如何判断请求的响应。                                                                                                            |
| **Via**              | 显示消息通过的中间节点。                                                                                                                      |
| **Warning**          | 附加额外的警告信息。                                                                                                                          |
| **WWW-Authenticate** | 要求客户端进行身份验证。                                                                                                                      |

### HTTP 版本

- **HTTP/1.0**：早期版本，不支持持久连接，每次请求后都需要重新建立连接。
- **HTTP/1.1**：广泛使用的版本，支持持久连接和管道化，性能更好。
- **HTTP/2**：引入二进制分帧层、头部压缩和多路复用，进一步提高性能。
- **HTTP/3**：基于 QUIC 协议，提供更快的连接建立和数据传输。

### 安全性

- **HTTP**：数据明文传输，易受中间人攻击和窃听。
- **HTTPS**：在 HTTP 基础上加入 TLS（Transport Layer Security）加密层，提供数据加密和身份验证，增强安全性。

## HTTP/1.0

HTTP/1.0 是超文本传输协议的早期版本，于 1996 年发布，作为 RFC 1945 标准化。它定义了 Web 浏览器和 Web 服务器之间的通信方式。以下是 HTTP/1.0 的一些关键特点和特性：

### 关键特点

1. **无状态协议**：HTTP/1.0 是一个无状态协议，即每个请求和响应都是独立的，服务器不会保留之前请求的任何信息。每次请求都必须包含足够的信息来完成独立的事务。

2. **简单性**：HTTP/1.0 设计简单，易于理解和实现。它采用请求 - 响应模型，其中客户端发起请求，服务器返回响应。

3. **请求方法**：HTTP/1.0 支持三种主要的请求方法：
   - **GET**：请求指定资源。通常用于获取数据。
   - **POST**：向指定资源提交数据。通常用于表单提交或数据上传。
   - **HEAD**：类似于 GET，但服务器仅返回响应头部，不返回响应体。用于获取资源的元信息。

4. **响应状态码**：HTTP/1.0 定义了一系列状态码，用于指示请求的结果。这些状态码分为三类：
   - **1xx**：信息性响应（HTTP/1.0 中未使用）。
   - **2xx**：成功响应，如 200 OK。
   - **3xx**：重定向，如 301 Moved Permanently。
   - **4xx**：客户端错误，如 404 Not Found。
   - **5xx**：服务器错误，如 500 Internal Server Error。

### 限制和不足

1. **每次请求一个连接**：HTTP/1.0 每次请求都需要建立一个新的 TCP 连接，这导致了较高的连接开销和延迟，特别是在加载包含多种资源的网页时（如图像、脚本、样式表等）。

2. **缺乏持久连接**：HTTP/1.0 默认不支持持久连接，即使是同一页面的多个资源请求也需要分别建立和关闭连接。这在网络开销和性能上都表现得不够理想。

3. **缓存控制有限**：HTTP/1.0 对缓存控制的支持较为有限，主要通过 Expires 头来控制缓存的有效期。更高级的缓存控制机制在 HTTP/1.1 中得到了增强。

4. **Host 头缺乏**：在 HTTP/1.0 中，Host 头不是必需的，这使得在同一 IP 地址上托管多个虚拟主机变得困难，因为服务器无法确定请求的具体目标主机。HTTP/1.1 引入了 Host 头，解决了这个问题。

## HTTP/1.1

HTTP/1.1 是超文本传输协议的一个改进版本，于 1997 年作为 RFC 2068 发布，并在 1999 年作为 RFC 2616 标准化。HTTP/1.1 对 HTTP/1.0 进行了许多改进和增强，主要解决了性能、连接管理和缓存控制等问题。以下是 HTTP/1.1 的一些关键特点和特性：

### 关键特点

1. **持久连接（Persistent Connections）**：HTTP/1.1 默认启用了持久连接，即在完成一个请求后，TCP 连接不会立即关闭，可以复用同一个连接处理后续的多个请求。这显著减少了连接建立和关闭的开销，提升了性能。

2. **管道化（Pipelining）**：HTTP/1.1 支持管道化，即客户端可以在收到前一个请求的响应之前，继续发送后续请求。这进一步提高了传输效率，但需要服务器和中间设备的良好支持。

3. **Host 头**：HTTP/1.1 要求所有请求必须包含 Host 头字段，以指定目标主机名。这使得在同一 IP 地址上托管多个虚拟主机变得更加容易。

4. **缓存控制**：HTTP/1.1 引入了更为灵活的缓存控制机制，包括 Cache-Control 头，用于指定缓存策略，如 no-cache、no-store、max-age 等。

5. **内容协商（Content Negotiation）**：通过 Accept、Accept-Language、Accept-Encoding 等头字段，HTTP/1.1 支持内容协商，允许客户端和服务器就最佳内容格式进行协商。

6. **分块传输编码（Chunked Transfer Encoding）**：HTTP/1.1 支持分块传输编码，使得服务器可以在响应生成的同时开始发送响应体，而不需要提前知道响应的总长度。这对于动态生成的内容特别有用。

7. **范围请求（Range Requests）**：HTTP/1.1 支持范围请求，通过 Range 头字段，客户端可以请求资源的部分内容。这对于断点续传和大型文件的分段下载非常有用。

8. **额外的方法**：除了 HTTP/1.0 的 GET、POST 和 HEAD 方法，HTTP/1.1 还引入了 PUT、DELETE、OPTIONS、TRACE 和 CONNECT 等方法，扩展了协议的功能。

### HTTP/1.1 状态码

HTTP/1.1 扩展和细化了状态码体系，以下是一些新增和改进的状态码：

| **状态码** | **描述**                         |
|------------|----------------------------------|
| 100        | Continue                         |
| 101        | Switching Protocols              |
| 200        | OK                               |
| 201        | Created                          |
| 202        | Accepted                         |
| 203        | Non-Authoritative Information    |
| 204        | No Content                       |
| 205        | Reset Content                    |
| 206        | Partial Content                  |
| 300        | Multiple Choices                 |
| 301        | Moved Permanently                |
| 302        | Found                            |
| 303        | See Other                        |
| 304        | Not Modified                     |
| 305        | Use Proxy                        |
| 307        | Temporary Redirect               |
| 400        | Bad Request                      |
| 401        | Unauthorized                     |
| 402        | Payment Required                 |
| 403        | Forbidden                        |
| 404        | Not Found                        |
| 405        | Method Not Allowed               |
| 406        | Not Acceptable                   |
| 407        | Proxy Authentication Required    |
| 408        | Request Timeout                  |
| 409        | Conflict                         |
| 410        | Gone                             |
| 411        | Length Required                  |
| 412        | Precondition Failed              |
| 413        | Payload Too Large                |
| 414        | URI Too Long                     |
| 415        | Unsupported Media Type           |
| 416        | Range Not Satisfiable            |
| 417        | Expectation Failed               |
| 426        | Upgrade Required                 |
| 500        | Internal Server Error            |
| 501        | Not Implemented                  |
| 502        | Bad Gateway                      |
| 503        | Service Unavailable              |
| 504        | Gateway Timeout                  |
| 505        | HTTP Version Not Supported       |

## HTTP/2

HTTP/2 是超文本传输协议的一个重大版本更新，于 2015 年作为 RFC 7540 标准化。它是在 HTTP/1.1 的基础上进行了许多性能和效率方面的改进，旨在提升 Web 页面的加载速度和整体性能。以下是 HTTP/2 的一些关键特点和特性：

### 关键特点

1. **二进制分帧**：HTTP/2 采用二进制分帧层，而不是 HTTP/1.x 的文本格式。所有的 HTTP/2 通信都分解为更小的消息和帧，这些消息和帧通过一个或多个连接传输。这种方式减少了解析开销，提高了传输效率。

2. **多路复用**：HTTP/2 支持多路复用，即在单个 TCP 连接上可以同时发送多个请求和响应。这样可以避免 HTTP/1.1 中队头阻塞的问题，大大提升了传输效率。

3. **头部压缩**：HTTP/2 使用 HPACK 算法对头部信息进行压缩，减少了每次请求和响应中的冗余数据传输。这在请求和响应头部信息较大的情况下，能够显著减少带宽消耗。

4. **服务器推送**：HTTP/2 引入了服务器推送功能，允许服务器在客户端请求之前发送资源。这样可以减少页面加载时间，因为一些资源可以在客户端请求之前就已经准备好。

5. **流优先级**：HTTP/2 允许客户端为各个流分配优先级，服务器可以根据这些优先级优化资源的传输顺序，提高重要资源的传输速度。

### 浏览器判断服务器是否支持 HTTP/2

#### 1. 初始连接和协议协商

当浏览器向服务器发起连接时，它会尝试使用 HTTP/2 进行通信。这是通过以下几种方式之一来完成的：

##### 1.1. HTTP/2 over TLS (ALPN)

当浏览器与服务器使用 TLS（HTTPS）连接时，它会使用 ALPN（Application-Layer Protocol Negotiation）扩展来协商协议。以下是过程：

- 浏览器向服务器发送一个包含支持的协议列表（如 `h2` 表示 HTTP/2，`http/1.1` 表示 HTTP/1.1）的 TLS ClientHello 消息。
- 服务器检查其支持的协议，并在 TLS ServerHello 消息中回应选择的协议。如果服务器支持 HTTP/2，它会选择 `h2`。

##### 1.2. HTTP Upgrade

在不使用 TLS 的情况下（纯 HTTP），浏览器可以通过发送一个带有 `Upgrade` 头的初始 HTTP 请求来尝试升级连接到 HTTP/2：

```http
GET / HTTP/1.1
Host: example.com
Connection: Upgrade, HTTP2-Settings
Upgrade: h2c
HTTP2-Settings: <settings>
```

如果服务器支持 HTTP/2，它会回应一个 101 Switching Protocols 状态码，并开始使用 HTTP/2 通信。

#### 2. 协议确定和使用

一旦协议协商完成，浏览器就知道是否可以使用 HTTP/2。此时：

- 如果协议协商成功（通过 ALPN 或 HTTP Upgrade），浏览器会切换到 HTTP/2 通信模式。
- 如果协议协商失败，浏览器会回退到使用 HTTP/1.1（或其他支持的协议）。

### HTTP/2 的结构

HTTP/2 将所有通信分解为帧，通过流传输。每个流都有一个唯一的标识符，可以携带任意数量的帧。以下是一些主要的帧类型：

- **DATA**：用于传输 HTTP 请求或响应的主体数据。
- **HEADERS**：用于传输 HTTP 头部信息。
- **PRIORITY**：用于指定流的优先级。
- **RST_STREAM**：用于重置流。
- **SETTINGS**：用于交换连接设置。
- **PUSH_PROMISE**：用于服务器推送。
- **PING**：用于连接健康检查。
- **GOAWAY**：用于终止连接。

### HTTP/2 的优势

1. **更高效的连接管理**：多路复用和二进制分帧减少了连接建立和管理的开销，提高了传输效率。

2. **更快的页面加载**：服务器推送和头部压缩减少了等待时间和带宽使用，加快了页面加载速度。

3. **更好的性能**：优先级控制和流管理使得重要资源能够更快地传输，提高了用户体验。

### 示例

#### 请求报文示例

由于 HTTP/2 采用二进制格式，无法直接展示 HTTP/2 请求报文的原始数据。不过，可以通过工具（如 Wireshark）来查看 HTTP/2 的通信。以下是一个通过 Wireshark 捕获的 HTTP/2 请求报文的简化示例：

```http
HEADERS
:method: GET
:path: /index.html
:scheme: https
:authority: www.example.com
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.5
```

#### 响应报文示例

类似地，HTTP/2 响应报文的原始数据也是二进制格式，通过 Wireshark 捕获的 HTTP/2 响应报文简化示例如下：

```http
HEADERS
:status: 200
date: Mon, 27 Jul 2021 12:28:53 GMT
content-type: text/html
content-length: 88
last-modified: Wed, 22 Jul 2021 19:15:56 GMT
```

## HTTP/3

HTTP/3 是超文本传输协议的最新版本，于 2020 年作为 RFC 9114 标准化。HTTP/3 是 HTTP/2 的继任者，它解决了 HTTP/2 的一些性能问题，特别是在高延迟和不可靠网络环境下的性能问题。HTTP/3 最大的不同之处在于，它不再基于 TCP，而是基于 QUIC 协议。以下是 HTTP/3 的一些关键特点和特性：

### 关键特点

1. **基于 QUIC 协议**：HTTP/3 使用 QUIC（Quick UDP internet Connections）作为其传输层协议。QUIC 是一个基于 UDP 的传输协议，提供了类似于 TCP 的可靠传输，同时还集成了 TLS 加密。

2. **快速连接建立**：QUIC 减少了连接建立的时间，可以在一个 RTT（Round-Trip Time）内完成连接和加密握手，而 TCP 通常需要两个 RTT。这使得 HTTP/3 在高延迟网络下的性能显著提升。

3. **多路复用**：HTTP/3 的多路复用功能避免了 HTTP/2 中的队头阻塞（Head-of-Line Blocking）问题。在 HTTP/2 中，单个 TCP 流中的一个数据包丢失会阻塞整个流，而在 QUIC 中，数据包丢失只会影响对应的流，不会阻塞其他流的数据传输。

4. **基于 TLS 1.3 的安全握手**：HTTP/3 运行在 QUIC 之上，QUIC 的握手集成 TLS 1.3，用于建立受保护的连接。

5. **更好的连接迁移**：QUIC 支持连接迁移，这意味着当客户端的 IP 地址发生变化（例如从 Wi-Fi 切换到移动数据网络）时，连接可以保持不变，从而提高连接的可靠性和稳定性。

### 浏览器判断服务器是否支持 HTTP/3

#### 1. DNS 记录

服务器可以在 DNS 中发布 HTTPS 资源记录（HTTPS RR，基于 SVCB）来提示 HTTP/3 支持。浏览器在解析域名时可以查询这些记录：

- `HTTPS` 记录可以携带 `alpn`、`port`、`ipv4hint`、`ipv6hint` 等服务参数；其中 `alpn=h3` 可提示 HTTP/3 支持，地址提示不是对最终连接地址的强制保证。
- 如果浏览器在 DNS 解析过程中获得了 `HTTPS` 记录并且其中包含 `h3`，则浏览器知道该服务器支持 HTTP/3。

#### 1. Alt-Svc 头

服务器在响应 HTTP/2 或 HTTP/1.1 请求时，可以通过 `Alt-Svc` 头告知浏览器其支持 HTTP/3。`Alt-Svc` 头部指示浏览器可以使用另一种协议来与服务器通信。例如：

```http
Alt-Svc: h3=":443"; ma=86400
```

这表示服务器在端口 443 上支持 HTTP/3，`ma=86400` 表示这个信息可以缓存 86400 秒（即 1 天）。

### HTTP/3 的结构

HTTP/3 将所有通信分解为帧，通过流传输。每个流都有一个唯一的标识符，可以携带任意数量的帧。以下是一些主要的帧类型：

- **HEADERS**：用于传输 HTTP 头部信息。
- **DATA**：用于传输 HTTP 请求或响应的主体数据。
- **SETTINGS**：用于交换连接设置。
- **PRIORITY**：用于指定流的优先级。
- **CANCEL_PUSH**：用于取消服务器推送。
- **GOAWAY**：用于终止连接。
- **MAX_PUSH_ID**：限制服务器推送的最大 ID。
- **DUPLICATE_PUSH**：指示服务器重复推送。

### HTTP/3 的优势

1. **更快的连接建立**：QUIC 减少了连接和加密握手的时间，提高了页面加载速度，特别是在首次访问时。

2. **更好的多路复用**：QUIC 的多路复用功能消除了队头阻塞的问题，使得数据传输更加流畅和高效。

3. **集成 TLS 1.3**：HTTP/3 通过 QUIC 使用 TLS 1.3 保护连接，但证书、协议版本和密码套件等安全配置仍需要正确维护。

4. **连接迁移**：在网络环境变化时保持连接稳定，提高了用户体验。

5. **改进的错误恢复**：QUIC 提供了更好的错误恢复机制，使得在不可靠网络环境下性能更佳。

### 示例

#### 请求报文示例

由于 HTTP/3 采用二进制格式，无法直接展示 HTTP/3 请求报文的原始数据。不过，可以通过工具（如 Wireshark）来查看 HTTP/3 的通信。以下是一个通过 Wireshark 捕获的 HTTP/3 请求报文的简化示例：

```http
HEADERS
:method: GET
:path: /index.html
:scheme: https
:authority: www.example.com
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.5
```

#### 响应报文示例

类似地，HTTP/3 响应报文的原始数据也是二进制格式，通过 Wireshark 捕获的 HTTP/3 响应报文简化示例如下：

```http
HEADERS
:status: 200
date: Mon, 27 Jul 2021 12:28:53 GMT
content-type: text/html
content-length: 88
last-modified: Wed, 22 Jul 2021 19:15:56 GMT
```

## 参考资料

1. [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)（访问日期：2026-05-31）
2. [RFC 9114: HTTP/3](https://datatracker.ietf.org/doc/html/rfc9114)（访问日期：2026-05-31）
3. [RFC 9001: Using TLS to Secure QUIC](https://datatracker.ietf.org/doc/html/rfc9001)（访问日期：2026-05-31）
4. [RFC 9460: Service Binding and Parameter Specification via the DNS](https://datatracker.ietf.org/doc/html/rfc9460)（访问日期：2026-05-31）
