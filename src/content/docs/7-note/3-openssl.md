---
title: openssl 自签名证书
---

## 生成证书

一键生成证书

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.mywebsite.com" -addext "subjectAltName=DNS:www.mywebsite.com,DNS:mywebsite.com"
```

## RSA生成证书

### 生成私钥

```bash
openssl genrsa -out ca.key 2048
```

添加密码

支持的加密方式`-aes128, -aes192, -aes256, -aria128, -aria192, -aria256, -camellia128, -camellia192, -camellia256, -des, -des3, -idea`

```bash
openssl genrsa -aes256 -out ca.key 2048
```

### 生成CA证书
```bash
openssl req -x509 -days 3650 -key ca.key -out ca.crt
```

### 查看证书

```bash
openssl x509 -text -noout -in ca.crt
```

### 生成域名证书

```bash
openssl genrsa -out www.example.com.key 2048
```

生成请求
```bash
openssl req -new -key www.example.com.key -out www.example.com.csr -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.example.com" -addext "subjectAltName=DNS:www.example.com"
```

查看请求文件
```bash
openssl req -text -noout -verify -in www.example.com.csr
```

生成证书
```bash
openssl x509 -req -days 365 -in www.example.com.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out www.example.com.crt -extfile <(printf "subjectAltName=DNS:www.example.com")
```

验证证书

```bash
openssl verify -CAfile ca.crt www.example.com.crt
```


## ECC证书

### 生成私钥

带密码保护的
```bash
openssl ecparam -genkey  -noout -name prime256v1 | openssl ec -aes256 -out ca.key
```

无密码的

```bash
openssl ecparam -genkey -name prime256v1 -noout -out ca.key
```

### 生成CA证书

通过配置文件
openssl.cnf
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

```bash
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt -config openssl.cnf
```

命令行
```bash
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.mywebsite.com" -addext "subjectAltName=DNS:www.mywebsite.com,DNS:mywebsite.com"
```

### 签名证书

生成证书私钥
```bash
openssl ecparam -genkey -name prime256v1 -noout -out www.example.com.key
```

生成证书请求

```bash
openssl req -new -key www.example.com.key -out www.example.com.csr -subj "/C=CN/ST=Beijing/L=Beijing/O=MyCompany/OU=MyDivision/CN=www.example.com" -addext "subjectAltName=DNS:www.example.com"
```

生成证书
```bash
openssl x509 -req -days 365 -in www.example.com.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out www.example.com.crt -extfile <(printf "subjectAltName=DNS:www.example.com")
```

查看私钥
```bash
openssl ec -text -noout  -in ca_ecc.key
```

## 简化命令

通过CA证书和密钥，生成证书的密钥，一键生成证书
```bash
openssl req -x509 -new -nodes -key server.key -sha256 -days 365 -CA ca.crt -CAkey ca.key -out server.crt -subj  "/CN=localhost" -addext "extendedKeyUsage=clientAuth,serverAuth" -addext "subjectAltName=IP:127.0.0.1,DNS:localhost" -addext "basicConstraints=critical,CA:FALSE" -addext "keyUsage=critical,digitalSignature,keyEncipherment" 
```

## addext选项
- basicConstraints: 指定证书是否可以作为证书颁发机构 (Certificate Authority, CA) 的证书，并且可以签发其他证书。它还可以限制证书的使用层次（证书链中的深度）。
可选值`critical,CA:TRUE,pathlen:0`, critical使用这个证书时必须理解并遵守这些限制, CA表示是否可以作为证书颁发机构, pathlen表示证书的层级
- keyUsage: 定义证书持有者的公钥可以执行的具体操作
可选值:
  - critical: 使用这个证书时必须理解并遵守这些限制，否则证书将被视为无效。
  - digitalSignature: 该公钥可以用于生成数字签名，通常用于验证数据的完整性和来源。例如，用于签名软件、文件或电子邮件。
  - keyEncipherment: 该公钥可以用于加密对称密钥或其他机密数据，通常在 SSL/TLS 握手过程中用来加密传输对称密钥。
  - Certificate Sign: 该公钥可以用于签发其他证书。这意味着该证书持有者（如 CA）可以签名并颁发子证书。
  - nonRepudiation: 用于确保数据签名不可否认，即签名者不能否认曾签署数据。
  - dataEncipherment: 用于直接加密数据而不是密钥。
  - keyAgreement：用于密钥交换协议，例如 Diffie-Hellman。
  - cRLSign：用于签署证书吊销列表 (CRL)。
- extendedKeyUsage: 用于定义证书的公钥可以执行的更具体的用途，通常用于限定证书的应用场景。
  - clientAuth: 证书可以用于客户端身份验证。当用户或设备通过 TLS 连接到服务器时，服务器会要求客户端提供证书以证明其身份，确保客户端是可信的。
  - serverAuth: 用于服务器身份验证，通常用于 HTTPS 网站证书。
  - emailProtection: 用于电子邮件加密和签名，确保电子邮件的内容保密和真实性。
  - codeSigning: 用于签署软件代码，确保软件的来源可信，且未被篡改。
  - OCSPSigning: 用于在线证书状态协议 (OCSP) 的签名，以验证证书是否被吊销。
  - timeStamping: 用于时间戳服务，确保数据在特定时间未被更改。
