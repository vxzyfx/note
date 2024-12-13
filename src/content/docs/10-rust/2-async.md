---
title: Rust并发编程
---


## Rust 多进程编程

在 Rust 中，多进程编程可以通过使用标准库中的 `std::process` 模块来实现。`std::process` 模块提供了创建和管理子进程的功能，允许你从 Rust 程序中启动和控制其他进程。

### 创建子进程

使用 `std::process::Command` 可以创建和管理子进程。以下是一个简单的示例，展示如何启动一个子进程并等待其完成。

```rust
use std::process::Command;

fn main() {
    let mut child = Command::new("echo")
        .arg("Hello, world!")
        .spawn()
        .expect("Failed to start child process");

    let result = child.wait().expect("Child process wasn't running");

    println!("Child process exited with: {}", result);
}
```

### 传递输入和获取输出

可以通过 `stdin`, `stdout` 和 `stderr` 管道与子进程进行交互。以下是一个示例，展示如何向子进程发送输入并读取其输出。

```rust
use std::process::{Command, Stdio};
use std::io::Write;
use std::io::Read;

fn main() {
    let mut child = Command::new("grep")
        .arg("hello")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn()
        .expect("Failed to start child process");

    {
        let stdin = child.stdin.as_mut().expect("Failed to open stdin");
        stdin.write_all(b"hello world\nhello rust\n").expect("Failed to write to stdin");
    }

    let mut output = String::new();
    child.stdout.unwrap().read_to_string(&mut output).expect("Failed to read stdout");

    let result = child.wait().expect("Child process wasn't running");

    println!("Child process exited with: {}", result);
    println!("Output: {}", output);
}
```

### 多进程示例：并行计算

以下示例展示了如何创建多个子进程来并行计算。假设我们有一个计算密集型任务，我们可以将任务拆分为多个子任务，并将每个子任务分配给不同的子进程。

```rust
use std::process::{Command, Stdio};
use std::io::Write;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let num_processes = 4;
    let results = Arc::new(Mutex::new(vec![]));

    let handles: Vec<_> = (0..num_processes)
        .map(|i| {
            let results = Arc::clone(&results);
            thread::spawn(move || {
                let mut child = Command::new("python3")
                    .arg("-c")
                    .arg(format!("print({} ** 2)", i))
                    .stdout(Stdio::piped())
                    .spawn()
                    .expect("Failed to start child process");

                let mut output = String::new();
                child.stdout.as_mut().unwrap().read_to_string(&mut output).expect("Failed to read stdout");

                let mut results = results.lock().unwrap();
                results.push(output.trim().to_string());

                let _ = child.wait().expect("Child process wasn't running");
            })
        })
        .collect();

    for handle in handles {
        handle.join().expect("Thread panicked");
    }

    let results = results.lock().unwrap();
    for result in results.iter() {
        println!("Result: {}", result);
    }
}
```

## Rust 多线程编程

Rust 提供了强大的多线程编程功能，使得你可以利用多核处理器的并行计算能力。Rust 的多线程编程主要依靠标准库中的 `std::thread` 模块。

### 创建线程

可以使用 `std::thread::spawn` 创建新线程。

```rust
use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("Hello from the spawned thread! {}", i);
            thread::sleep(std::time::Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("Hello from the main thread! {}", i);
        thread::sleep(std::time::Duration::from_millis(1));
    }

    handle.join().unwrap();
}
```

在这个示例中，主线程和新线程将并行执行各自的代码。

### 线程间通信

Rust 使用消息传递的方式进行线程间通信。`std::sync::mpsc` 模块提供了一个简单的多生产者单消费者（multi-producer, single-consumer）通道。

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
        println!("Sent message from spawned thread");
    });

    let received = rx.recv().unwrap();
    println!("Received message in main thread: {}", received);
}
```

在这个示例中，子线程通过发送通道发送消息，主线程通过接收通道接收消息。

### 使用 `Arc` 和 `Mutex` 进行共享状态

当需要在线程间共享数据时，可以使用 `std::sync::Arc` 和 `std::sync::Mutex`。`Arc` 提供线程安全的引用计数，`Mutex` 提供互斥锁以保证数据一致性。

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

## Rust 使用异步编程 (`async`)

Rust 提供了强大的异步编程功能，可以使用 `async` 和 `await` 关键字来编写异步代码。这些关键字使得你可以编写非阻塞的并发代码，从而更高效地利用系统资源。

### 1. 基本概念

- **`async` 关键字**：用于声明异步函数或块，返回一个实现 `Future` 的类型。
- **`await` 关键字**：用于等待异步操作完成。

### 2. 使用 `async` 和 `await`

以下是一个基本示例，展示如何定义和使用异步函数：

```rust
use std::time::Duration;
use tokio::time::sleep;

async fn say_hello() {
    sleep(Duration::from_secs(1)).await;
    println!("Hello, world!");
}

#[tokio::main]
async fn main() {
    say_hello().await;
}
```

在这个示例中，`say_hello` 函数是异步的，并在调用 `sleep` 函数时暂停执行 1 秒钟。`main` 函数也使用 `#[tokio::main]` 属性宏，标记为异步函数。

### 3. 并行执行异步任务

可以使用 `tokio::join!` 宏并行执行多个异步任务：

```rust
use tokio::time::{sleep, Duration};

async fn task1() {
    sleep(Duration::from_secs(1)).await;
    println!("Task 1 completed");
}

async fn task2() {
    sleep(Duration::from_secs(2)).await;
    println!("Task 2 completed");
}

#[tokio::main]
async fn main() {
    tokio::join!(task1(), task2());
}
```

在这个示例中，`task1` 和 `task2` 并行执行，`task1` 会在 1 秒后完成，而 `task2` 会在 2 秒后完成。

### 4. 处理异步结果

异步函数可以返回 `Result` 类型，并使用 `?` 运算符处理错误：

```rust
use tokio::fs::File;
use tokio::io::{self, AsyncReadExt};

async fn read_file() -> io::Result<String> {
    let mut file = File::open("hello.txt").await?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).await?;
    Ok(contents)
}

#[tokio::main]
async fn main() {
    match read_file().await {
        Ok(contents) => println!("File contents: {}", contents),
        Err(e) => println!("Error reading file: {}", e),
    }
}
```

在这个示例中，`read_file` 异步函数读取文件内容并返回一个 `Result<String, io::Error>` 类型。

### 5. 使用 `select!` 宏

`select!` 宏允许在多个异步任务中等待第一个完成的任务：

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let task1 = async {
        sleep(Duration::from_secs(1)).await;
        "task1"
    };

    let task2 = async {
        sleep(Duration::from_secs(2)).await;
        "task2"
    };

    tokio::select! {
        result = task1 => println!("First completed: {}", result),
        result = task2 => println!("First completed: {}", result),
    }
}
```

## 异步运行时

在Rust中，异步运行时（Async Runtime）用于执行异步任务。异步运行时管理任务的调度、任务之间的并发和异步I/O操作。Rust中常用的异步运行时有`Tokio`和`async-std`。以下是对这两个运行时的介绍和使用示例：

### Tokio

`Tokio`是一个强大且流行的异步运行时，广泛用于构建高性能网络应用。

#### 安装

在你的`Cargo.toml`文件中添加以下依赖：

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
```

#### 使用示例

以下是一个简单的示例，展示了如何使用`Tokio`运行时来执行异步任务：

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let task1 = async {
        println!("Task 1: Start");
        sleep(Duration::from_secs(2)).await;
        println!("Task 1: End");
    };

    let task2 = async {
        println!("Task 2: Start");
        sleep(Duration::from_secs(1)).await;
        println!("Task 2: End");
    };

    tokio::join!(task1, task2);
}
```

在这个示例中，我们创建了两个异步任务`task1`和`task2`，并使用`tokio::join!`并行执行它们。

### async-std

`async-std`是另一个流行的异步运行时，旨在提供与标准库类似的异步编程体验。

#### 安装

在你的`Cargo.toml`文件中添加以下依赖：

```toml
[dependencies]
async-std = "1.10"
```

#### 使用示例

以下是一个简单的示例，展示了如何使用`async-std`运行时来执行异步任务：

```rust
use async_std::task;
use std::time::Duration;

async fn task1() {
    println!("Task 1: Start");
    task::sleep(Duration::from_secs(2)).await;
    println!("Task 1: End");
}

async fn task2() {
    println!("Task 2: Start");
    task::sleep(Duration::from_secs(1)).await;
    println!("Task 2: End");
}

fn main() {
    task::block_on(async {
        let t1 = task1();
        let t2 = task2();
        futures::join!(t1, t2);
    });
}
```

在这个示例中，我们定义了两个异步函数`task1`和`task2`，并使用`futures::join!`并行执行它们。`task::block_on`用于在主函数中运行异步代码。

### 选择异步运行时

选择异步运行时时，可以根据项目的需求和偏好来决定。`Tokio`通常用于构建高性能、复杂的网络应用，而`async-std`提供了与标准库一致的API，更加易于上手和使用。
