---
title: 并发编程
---

## 多进程

在 Go 语言中，通常使用 goroutine 来实现并发编程，而不是多进程编程。Go 原生支持轻量级的 goroutine，使得并发编程更加高效和简单。然而，如果你确实需要使用多进程编程，可以通过以下几种方式实现：

1. **os/exec 包**：使用 `os/exec` 包来启动和管理外部进程。
2. **syscall 包**：使用 `syscall` 包直接与底层操作系统交互，管理进程。
3. **go-syscall 模块**：使用更高层次的库如 `go-syscall` 提供的多进程支持。

以下是一个使用 `os/exec` 包的简单示例，演示如何启动一个外部进程：

```go
package main

import (
    "fmt"
    "os/exec"
)

func main() {
    // 创建一个新的命令来运行外部程序
    cmd := exec.Command("ls", "-la")

    // 获取命令的标准输出
    output, err := cmd.Output()
    if err != nil {
        fmt.Println("Error executing command:", err)
        return
    }

    // 打印命令的输出
    fmt.Println(string(output))
}
```

这个示例代码启动了一个 `ls -la` 命令，并打印其输出。

### 示例：多进程计算

以下示例展示了如何使用多个进程来并行计算某个任务（例如计算斐波那契数列的多个值）：

```go
package main

import (
    "fmt"
    "os/exec"
    "strconv"
    "sync"
)

// 计算斐波那契数列的函数
func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

// 启动子进程并计算斐波那契数列
func startProcess(n int, wg *sync.WaitGroup) {
    defer wg.Done()
    cmd := exec.Command("go", "run", "child.go", strconv.Itoa(n))
    output, err := cmd.Output()
    if err != nil {
        fmt.Println("Error executing child process:", err)
        return
    }
    fmt.Printf("Fibonacci(%d) = %s", n, string(output))
}

func main() {
    var wg sync.WaitGroup

    // 启动多个子进程计算不同的斐波那契值
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go startProcess(i*10, &wg)
    }

    wg.Wait()
    fmt.Println("All processes completed.")
}
```

在这个示例中，`main.go` 将启动多个子进程，运行 `child.go` 并传递不同的参数。`child.go` 文件如下：

```go
package main

import (
    "fmt"
    "os"
    "strconv"
)

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: go run child.go <number>")
        return
    }

    n, err := strconv.Atoi(os.Args[1])
    if err != nil {
        fmt.Println("Invalid number:", os.Args[1])
        return
    }

    result := fibonacci(n)
    fmt.Println(result)
}
```

## goroutine

在 Go 语言中，goroutine 是实现并发的主要方式，相较于传统的线程，goroutine 更加轻量级和高效。以下是一些关于在 Go 中使用 goroutine 来实现多线程编程的基本示例和概念。

### Goroutine 基础示例

Goroutine 是由 Go 运行时管理的轻量级线程。你可以使用 `go` 关键字来启动一个新的 goroutine。

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")
}
```

在这个示例中，`say` 函数被调用了两次，一次在主 goroutine 中，另一次在新的 goroutine 中。因此，你会看到两个 goroutine 的输出交替出现。

### 等待 Goroutine 完成

使用 `sync.WaitGroup` 可以等待一组 goroutine 完成。

```go
package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    // 模拟工作
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait()
    fmt.Println("All workers completed.")
}
```

在这个示例中，`worker` 函数启动了 5 个 goroutine，`sync.WaitGroup` 用于等待所有 goroutine 完成。

### 处理并发安全性

使用 `sync.Mutex` 可以保护共享资源避免竞态条件。

```go
package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    c.value++
    c.mu.Unlock()
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    var wg sync.WaitGroup
    counter := Counter{}

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    wg.Wait()
    fmt.Println("Counter value:", counter.Value())
}
```

在这个示例中，`Counter` 结构体使用 `sync.Mutex` 来保护 `value` 字段，确保并发安全。

### 使用通道 (Channels)

Go 语言中的通道提供了一种在 goroutine 之间进行通信的方式。

```go
package main

import (
    "fmt"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, j)
        results <- j * 2
    }
}

func main() {
    const numJobs = 5
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    for a := 1; a <= numJobs; a++ {
        <-results
    }
}
```
