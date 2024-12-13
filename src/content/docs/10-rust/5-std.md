---
title: 标准库
---

Rust 的标准库（`std`）提供了一组核心模块和类型，用于处理各种常见的编程任务。标准库包含了基本类型、集合、文件 I/O、并发处理、错误处理等功能。

以下是一些重要的标准库模块及其功能介绍：

## 基本模块

- **`std::prelude`**：预导入的模块，包含常用的类型和函数，可以直接使用而无需显式导入。
- **`std::primitive`**：基本类型（如整数、浮点数、字符等）的相关功能。

## 集合类型

Rust 标准库提供了一些常用的集合类型，用于存储和操作数据。

- **`std::vec::Vec`**：动态数组，可以存储可变数量的元素。
  ```rust
  let mut v = Vec::new();
  v.push(1);
  v.push(2);
  v.push(3);
  ```

- **`std::collections::HashMap`**：哈希映射，用于存储键值对。
  ```rust
  use std::collections::HashMap;

  let mut map = HashMap::new();
  map.insert("key1", "value1");
  map.insert("key2", "value2");
  ```

- **`std::collections::HashSet`**：哈希集合，用于存储唯一值的集合。
  ```rust
  use std::collections::HashSet;

  let mut set = HashSet::new();
  set.insert(1);
  set.insert(2);
  set.insert(3);
  ```

## 文件 I/O

Rust 标准库提供了文件输入/输出功能，用于读写文件和处理文件系统操作。

- **`std::fs::File`**：用于文件操作。
  ```rust
  use std::fs::File;
  use std::io::prelude::*;

  let mut file = File::create("hello.txt").expect("Unable to create file");
  file.write_all(b"Hello, world!").expect("Unable to write to file");
  ```

- **`std::fs`**：文件系统操作。
  ```rust
  use std::fs;

  let contents = fs::read_to_string("hello.txt").expect("Unable to read file");
  println!("{}", contents);
  ```

## 并发处理

Rust 标准库提供了多线程和并发编程的支持。

- **`std::thread`**：用于创建和管理线程。
  ```rust
  use std::thread;

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
  ```

- **`std::sync`**：同步原语和线程安全的共享数据结构。
  ```rust
  use std::sync::{Mutex, Arc};
  use std::thread;

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
  ```

## 错误处理

Rust 标准库提供了强大的错误处理机制，包括 `Result` 和 `Option` 类型。

- **`std::result::Result`**：用于处理可能失败的操作。
  ```rust
  use std::fs::File;
  use std::io::{self, Read};

  fn read_username_from_file() -> Result<String, io::Error> {
      let mut file = File::open("hello.txt")?;
      let mut username = String::new();
      file.read_to_string(&mut username)?;
      Ok(username)
  }
  ```

- **`std::option::Option`**：用于处理可能为空的值。
  ```rust
  let some_number = Some(5);
  let some_string = Some("a string");

  if let Some(x) = some_number {
      println!("The number is: {}", x);
  } else {
      println!("No number found");
  }
  ```

## 网络编程

Rust 标准库提供了基本的网络编程支持。

- **`std::net`**：用于处理 TCP 和 UDP 网络通信。
  ```rust
  use std::net::TcpStream;
  use std::io::{self, Write};

  fn main() -> io::Result<()> {
      let mut stream = TcpStream::connect("127.0.0.1:8080")?;
      stream.write_all(b"Hello, world!")?;
      Ok(())
  }
  ```

