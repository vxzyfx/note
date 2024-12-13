---
title: 标准库
---

Golang的标准库非常丰富，涵盖了很多常用的功能模块。以下是Golang标准库中的主要模块分类及部分示例：

### 基础包

- `fmt`：格式化I/O
  ```go
  import "fmt"
  fmt.Println("Hello, World!")
  ```
- `errors`：创建和操作错误
  ```go
  import "errors"
  var err = errors.New("error message")
  ```
- `log`：简单的日志服务
  ```go
  import "log"
  log.Println("This is a log message")
  ```

### 数学包

- `math`：基本数学函数
  ```go
  import "math"
  result := math.Sqrt(16)
  ```
- `math/rand`：伪随机数生成
  ```go
  import "math/rand"
  num := rand.Intn(100)
  ```

### 字符串处理包

- `strings`：字符串操作
  ```go
  import "strings"
  s := strings.ToUpper("hello")
  ```
- `strconv`：字符串与基本数据类型的转换
  ```go
  import "strconv"
  num, err := strconv.Atoi("123")
  ```

### 时间处理包

- `time`：时间操作
  ```go
  import "time"
  now := time.Now()
  ```

### I/O包

- `io`：基本I/O原语
  ```go
  import "io"
  ```
- `io/ioutil`：I/O工具函数
  ```go
  import "io/ioutil"
  data, err := ioutil.ReadFile("file.txt")
  ```
- `os`：操作系统功能
  ```go
  import "os"
  file, err := os.Open("file.txt")
  ```

### 文件系统包

- `path`：路径操作
  ```go
  import "path"
  p := path.Join("dir", "file.txt")
  ```
- `path/filepath`：文件路径操作
  ```go
  import "path/filepath"
  p, err := filepath.Abs("file.txt")
  ```

### 网络包

- `net`：基本网络操作
  ```go
  import "net"
  conn, err := net.Dial("tcp", "google.com:80")
  ```
- `net/http`：HTTP客户端和服务器
  ```go
  import "net/http"
  resp, err := http.Get("http://example.com")
  ```

### 数据结构包

- `container/list`：双向链表
  ```go
  import "container/list"
  l := list.New()
  l.PushBack("element")
  ```
- `container/ring`：环形链表
  ```go
  import "container/ring"
  r := ring.New(5)
  ```

### 压缩包

- `compress/gzip`：gzip压缩
  ```go
  import "compress/gzip"
  ```

### 加密包

- `crypto`：通用加密包
  ```go
  import "crypto"
  ```
- `crypto/md5`：MD5哈希算法
  ```go
  import "crypto/md5"
  hash := md5.Sum([]byte("data"))
  ```
- `crypto/sha256`：SHA256哈希算法
  ```go
  import "crypto/sha256"
  hash := sha256.Sum256([]byte("data"))
  ```

### 并发包

- `sync`：基本同步原语
  ```go
  import "sync"
  var mu sync.Mutex
  ```
- `sync/atomic`：低级原子操作
  ```go
  import "sync/atomic"
  var counter int64
  atomic.AddInt64(&counter, 1)
  ```

### 反射包

- `reflect`：运行时反射
  ```go
  import "reflect"
  t := reflect.TypeOf(123)
  ```

### 编码和解码包

- `encoding/json`：JSON编码和解码
  ```go
  import "encoding/json"
  jsonStr, _ := json.Marshal(map[string]string{"hello": "world"})
  ```
- `encoding/xml`：XML编码和解码
  ```go
  import "encoding/xml"
  ```

### 测试包

- `testing`：测试框架
  ```go
  import "testing"
  ```

### 数据库包

- `database/sql`：SQL数据库
  ```go
  import "database/sql"
  import _ "github.com/go-sql-driver/mysql"
  ```

### 其他常用包

- `flag`：命令行参数解析
  ```go
  import "flag"
  name := flag.String("name", "default", "name description")
  flag.Parse()
  ```
- `regexp`：正则表达式
  ```go
  import "regexp"
  re := regexp.MustCompile(`\d+`)
  ```

### 标准库模块总结

| 分类           | 包名称                | 功能描述                       |
|----------------|-----------------------|--------------------------------|
| 基础包         | `fmt`, `errors`, `log`| 格式化I/O、错误处理、日志服务  |
| 数学包         | `math`, `math/rand`   | 数学函数、伪随机数生成         |
| 字符串处理包   | `strings`, `strconv`  | 字符串操作、类型转换           |
| 时间处理包     | `time`                | 时间操作                       |
| I/O包          | `io`, `io/ioutil`, `os`| 基本I/O操作、文件系统操作     |
| 文件系统包     | `path`, `path/filepath`| 路径操作、文件路径操作        |
| 网络包         | `net`, `net/http`     | 网络操作、HTTP客户端和服务器  |
| 数据结构包     | `container/list`, `container/ring`| 数据结构              |
| 压缩包         | `compress/gzip`       | gzip压缩                       |
| 加密包         | `crypto`, `crypto/md5`, `crypto/sha256`| 加密和哈希算法       |
| 并发包         | `sync`, `sync/atomic` | 并发和同步原语                 |
| 反射包         | `reflect`             | 运行时反射                     |
| 编码和解码包   | `encoding/json`, `encoding/xml`| JSON和XML编码解码      |
| 测试包         | `testing`             | 测试框架                       |
| 数据库包       | `database/sql`        | SQL数据库操作                 |
| 其他常用包     | `flag`, `regexp`      | 命令行解析、正则表达式         |
