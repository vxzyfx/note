---
title: openssl 自签名证书
description: 使用 OpenSSL 生成测试用自签名证书、私钥、CSR 和 X.509 扩展的安全说明。
---

## 生成证书

> 警告：以下命令会生成私钥和自签名证书。私钥文件不要提交到仓库或发送给他人；`-noenc` 会生成未加密私钥，只适合本地测试或有额外文件权限保护的场景。OpenSSL 3.0 中 `-nodes` 已弃用，使用 `-noenc`。

```bash
openssl req -x509 -noenc -days 365 -newkey rsa:2048 -keyout server.key -out server.crt -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.mywebsite.com" -addext "subjectAltName=DNS:www.mywebsite.com,DNS:mywebsite.com"
```

## RSA 生成证书

### 生成私钥

> 警告：私钥是身份凭据，生成后应限制文件权限并妥善备份。生产环境优先使用带口令或受密钥管理系统保护的私钥。

```bash
openssl genrsa -out ca.key 2048
```

添加密码保护：

```bash
openssl genrsa -aes256 -out ca.key 2048
```

### 生成 CA 证书

> 警告：CA 私钥可以签发其他证书。不要在业务服务器上长期保存测试 CA 私钥，也不要把测试 CA 导入生产信任库。

```bash
openssl req -x509 -days 3650 -key ca.key -out ca.crt -subj "/CN=MyTestCA" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,keyCertSign,cRLSign"
```

### 查看证书

```bash
openssl x509 -text -noout -in ca.crt
```

### 生成域名证书

> 警告：下面会生成域名私钥和证书请求。`subjectAltName` 应写入实际 DNS 名称或 IP，浏览器和 TLS 客户端通常不再只依赖 `CN` 做主机名匹配。

```bash
openssl genrsa -out www.example.com.key 2048
```

生成请求：

```bash
openssl req -new -key www.example.com.key -out www.example.com.csr -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.example.com" -addext "subjectAltName=DNS:www.example.com"
```

查看请求文件：

```bash
openssl req -text -noout -verify -in www.example.com.csr
```

生成证书：

```bash
openssl x509 -req -days 365 -in www.example.com.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out www.example.com.crt -extfile <(printf "subjectAltName=DNS:www.example.com")
```

验证证书：

```bash
openssl verify -CAfile ca.crt www.example.com.crt
```

## ECC 证书

### 生成私钥

> 警告：ECC 私钥同样是敏感凭据。示例使用 `prime256v1`，是否符合你的合规要求需要结合目标环境核验。

带密码保护：

```bash
openssl ecparam -genkey -noout -name prime256v1 | openssl ec -aes256 -out ca.key
```

无密码保护：

```bash
openssl ecparam -genkey -name prime256v1 -noout -out ca.key
```

### 生成 CA 证书

通过配置文件生成：

```text [openssl.cnf]
[ req ]
default_bits       = 2048
default_md         = sha256
distinguished_name = req_distinguished_name
x509_extensions    = v3_ca
prompt             = no

[ req_distinguished_name ]
C  = CN
ST = Beijing
L  = Beijing
O  = MyCompany
OU = MyDivision
CN = MyCA

[ v3_ca ]
basicConstraints = critical,CA:TRUE
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
```

> 警告：该命令会用 `ca.key` 创建 CA 证书。执行前确认配置文件中的 `CN`、`basicConstraints` 和 `keyUsage` 符合用途。

```bash
openssl req -x509 -new -noenc -key ca.key -sha256 -days 365 -out ca.crt -config openssl.cnf
```

命令行生成：

```bash
openssl req -x509 -new -noenc -key ca.key -sha256 -days 365 -out ca.crt -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=MyCA" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,digitalSignature,cRLSign,keyCertSign"
```

### 签名证书

生成证书私钥：

```bash
openssl ecparam -genkey -name prime256v1 -noout -out www.example.com.key
```

生成证书请求：

```bash
openssl req -new -key www.example.com.key -out www.example.com.csr -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.example.com" -addext "subjectAltName=DNS:www.example.com"
```

生成证书：

```bash
openssl x509 -req -days 365 -in www.example.com.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out www.example.com.crt -extfile <(printf "subjectAltName=DNS:www.example.com")
```

查看私钥：

> 警告：查看私钥会在终端输出敏感材料。只在受控终端中操作，不要把输出复制到聊天、日志或工单系统。

```bash
openssl ec -text -noout -in ca.key
```

## 简化命令

通过已有 CA 证书和 CA 私钥，为已有 `server.key` 签发测试证书：

> 警告：该命令使用 CA 私钥签发证书，并生成未加密输出证书。执行前确认 `server.key` 已存在且 SAN、EKU、Key Usage 与用途一致。

```bash
openssl req -x509 -new -noenc -key server.key -sha256 -days 365 -CA ca.crt -CAkey ca.key -out server.crt -subj "/CN=localhost" -addext "extendedKeyUsage=clientAuth,serverAuth" -addext "subjectAltName=IP:127.0.0.1,DNS:localhost" -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment"
```

## `-addext` 选项

- `basicConstraints`：指定证书是否可以作为证书颁发机构，以及路径长度等限制。常见值如 `critical,CA:TRUE,pathlen:0` 或 `critical,CA:FALSE`。
- `keyUsage`：定义证书公钥的用途。常见值包括 `digitalSignature`、`keyEncipherment`、`keyAgreement`、`keyCertSign`、`cRLSign`。CA 证书通常需要 `keyCertSign` 和 `cRLSign`；服务端证书不要设置 `CA:TRUE`。
- `extendedKeyUsage`：进一步限定证书用途，例如 `serverAuth`、`clientAuth`、`emailProtection`、`codeSigning`、`OCSPSigning`、`timeStamping`。

## 参考资料

1. [openssl-req(1) - OpenSSL 3.0 Documentation](https://docs.openssl.org/3.0/man1/openssl-req/)（访问日期：2026-05-31）
2. [openssl-x509(1) - OpenSSL 3.0 Documentation](https://docs.openssl.org/3.0/man1/openssl-x509/)（访问日期：2026-05-31）
3. [x509v3_config(5) - OpenSSL 3.0 Documentation](https://docs.openssl.org/3.0/man5/x509v3_config/)（访问日期：2026-05-31）
4. [openssl-genrsa(1) - OpenSSL 3.0 Documentation](https://docs.openssl.org/3.0/man1/openssl-genrsa/)（访问日期：2026-05-31）
5. [OpenSSL EC parameter command - OpenSSL 3.0 Documentation](https://docs.openssl.org/3.0/man1/openssl-ecparam/)（访问日期：2026-05-31）
