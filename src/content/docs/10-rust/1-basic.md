---
title: Rust基础
---

## Rust简介

Rust是一种系统编程语言，注重安全性、速度和并发性。它旨在防止许多类型的错误，特别是与内存管理相关的错误。Rust的语法类似于C++，但提供了更好的内存安全性，同时保持高性能。[Rust官方文档](https://doc.rust-lang.org/book/)

## 设置Rust环境

**安装Rust：**

Rust可以通过[Rustup](https://www.rust-lang.org/learn/get-started)安装程序进行安装：

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

按照提示完成安装。安装完成后，可以使用以下命令验证安装：

```sh
rustc --version
```

**创建第一个项目：**

1. 使用Cargo（Rust的包管理和构建系统）创建新项目：

```sh
cargo new hello_rust
```

2. 进入项目目录：

```sh
cd hello_rust
```

3. 构建并运行项目：

```sh
cargo build
cargo run
```

## 基本语法

**Hello, World!**

在`src`目录下创建一个新的文件`main.rs`，并添加以下代码：

```rust
fn main() {
    println!("Hello, world!");
}
```

使用以下命令运行程序：

```sh
cargo run
```

**变量和可变性**

```rust
fn main() {
    let x = 5;
    println!("x的值是: {}", x);

    let mut y = 5;
    println!("y的值是: {}", y);
    y = 6;
    println!("y的值是: {}", y);
}
```

**数据类型**

Rust是静态类型语言，意味着编译时必须知道所有变量的类型。常见类型包括：

- 标量类型：整数、浮点数、布尔值和字符。
- 复合类型：元组和数组。

### Rust 数据类型

以下是Rust中的主要数据类型，以表格形式列出：

| 数据类型     | 描述                                                   | 示例                                         |
| ------------ | ------------------------------------------------------ | -------------------------------------------- |
| **标量类型** |                                                        |                                              |
| 整数         | 有符号和无符号，大小从8位到128位                       | `i8`, `u8`, `i16`, `u16`, `i32`, `u32`, `i64`, `u64`, `i128`, `u128` |
| 浮点数       | 单精度和双精度                                         | `f32`, `f64`                                 |
| 布尔         | 只有两个可能的值：`true` 或 `false`                    | `bool`                                       |
| 字符         | 表示单个Unicode字符，4个字节                           | `char`                                       |
| **复合类型** |                                                        |                                              |
| 元组         | 可以包含多种类型的多个值                               | `(i32, f64, bool)`                           |
| 数组         | 每个元素类型相同，固定长度                             | `[i32; 3]`                                   |


```rust
fn main() {
    let integer: i32 = 42;
    let float: f64 = 3.14;
    let boolean: bool = true;
    let character: char = 'R';

    let tuple: (i32, f64, bool) = (500, 6.4, true);
    let array: [i32; 3] = [1, 2, 3];

    println!("integer: {}, float: {}, boolean: {}, character: {}", integer, float, boolean, character);
    println!("tuple: ({}, {}, {})", tuple.0, tuple.1, tuple.2);
    println!("array: {:?}", array);
}
```

**控制流**

Rust具有常见的控制流结构：`if`、`else`、`loop`、`while`和`for`。

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("数字能被4整除");
    } else if number % 3 == 0 {
        println!("数字能被3整除");
    } else {
        println!("数字不能被3或4整除");
    }

    let mut count = 0;
    let result = loop {
        count += 1;

        if count == 10 {
            break count * 2;
        }
    };
    println!("结果是: {}", result);

    let array = [10, 20, 30, 40, 50];
    for element in array.iter() { // array.iter()的返回值实现了Iterator这个trait
        println!("值是: {}", element);
    }
}
```

## 类型转换
在Rust中，类型转换是一项重要的操作，涉及将一种数据类型的值转换为另一种数据类型。Rust提供了几种不同的类型转换方式，包括隐式转换、显式转换和使用标准库提供的转换特性。

### 隐式转换

Rust是强类型语言，不支持隐式类型转换。例如，不能将 `u32` 类型的值直接赋值给 `u8` 类型的变量：

```rust
let x: u32 = 5;
let y: u8 = x; // 编译错误
```

### 显式转换

显式转换使用 `as` 关键字将一个值转换为另一种类型：

```rust
fn main() {
    let x: u32 = 5;
    let y: u8 = x as u8; // 使用 `as` 进行显式转换
    println!("y: {}", y);
}
```

### 使用标准库进行类型转换

Rust标准库提供了一些特性和方法来进行类型转换，例如 `From`、`Into`、`TryFrom` 和 `TryInto`。

#### `From` 和 `Into`

`From` 特性用于定义类型的转换方式，`Into` 特性是 `From` 的逆操作。如果实现了 `From`，则自动实现 `Into`。

```rust
use std::convert::From;

fn main() {
    let my_str = "hello";
    let my_string = String::from(my_str); // 使用 `From` 进行转换
    println!("my_string: {}", my_string);
}
```

自定义类型的实现：

```rust
use std::convert::From;

#[derive(Debug)]
struct MyNumber {
    value: i32,
}

impl From<i32> for MyNumber {
    fn from(item: i32) -> Self {
        MyNumber { value: item }
    }
}

fn main() {
    let num = MyNumber::from(10);
    println!("MyNumber: {:?}", num);

    let int_num: i32 = 20;
    let my_num: MyNumber = int_num.into(); // 使用 `Into` 进行转换
    println!("MyNumber: {:?}", my_num);
}
```

#### `TryFrom` 和 `TryInto`

`TryFrom` 和 `TryInto` 特性用于可能失败的转换，返回 `Result` 类型。

```rust
use std::convert::TryFrom;
use std::convert::TryInto;

fn main() {
    let num: i32 = 10;
    let result: Result<u8, _> = u8::try_from(num);
    match result {
        Ok(n) => println!("Converted number: {}", n),
        Err(e) => println!("Failed to convert: {}", e),
    }

    let num: i32 = 256; // 超出 u8 范围
    let result: Result<u8, _> = num.try_into();
    match result {
        Ok(n) => println!("Converted number: {}", n),
        Err(e) => println!("Failed to convert: {}", e),
    }
}
```

### 字符串与数值类型之间的转换

字符串与数值类型之间的转换可以使用标准库中的 `parse` 方法和 `to_string` 方法。

```rust
fn main() {
    let num_str = "42";
    let num: i32 = num_str.parse().expect("Not a number!");
    println!("Parsed number: {}", num);

    let num = 42;
    let num_str = num.to_string();
    println!("Number as string: {}", num_str);
}
```

### 自定义类型之间的转换

可以通过实现 `From`、`Into`、`TryFrom` 和 `TryInto` 特性来定义自定义类型之间的转换。

```rust
use std::convert::From;

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl From<(i32, i32)> for Point {
    fn from(coords: (i32, i32)) -> Self {
        Point { x: coords.0, y: coords.1 }
    }
}

fn main() {
    let coords = (10, 20);
    let point: Point = coords.into();
    println!("Point: {:?}", point);
}
```

## 字符串格式化

在Rust中，字符串格式化有几种常见的方法，以下是每种方法的示例：

### 1. 使用 `format!` 宏
这是Rust中最常用的字符串格式化方法，类似于Python的 `str.format()`。

```rust
fn main() {
    let name = "Alice";
    let age = 30;
    let formatted_string = format!("My name is {} and I am {} years old.", name, age);
    println!("{}", formatted_string);
}
```

### 2. 使用 `println!` 宏
这种方法适用于直接输出格式化的字符串。

```rust
fn main() {
    let name = "Alice";
    let age = 30;
    println!("My name is {} and I am {} years old.", name, age);
}
```

### 3. 使用 `write!` 和 `writeln!` 宏
这两种宏适用于将格式化字符串写入到实现了 `std::fmt::Write` 特性的对象中，比如 `String` 或 `Vec<u8>`。

```rust
use std::fmt::Write;

fn main() {
    let name = "Alice";
    let age = 30;
    let mut output = String::new();
    write!(&mut output, "My name is {} and I am {} years old.", name, age).unwrap();
    println!("{}", output);
}
```

### 4. 自定义格式化实现
如果需要自定义格式化，可以实现 `std::fmt::Display` 或 `std::fmt::Debug` 特性。

```rust
use std::fmt;

struct Person {
    name: String,
    age: u32,
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "My name is {} and I am {} years old.", self.name, self.age)
    }
}

fn main() {
    let person = Person { name: "Alice".to_string(), age: 30 };
    println!("{}", person);
}
```

### 5. 使用 `std::format_args!`
这种方法适用于复杂的格式化场景，可以将格式化参数传递给实现了 `std::fmt::Write` 特性的对象。

```rust
use std::fmt::Write;

fn main() {
    let name = "Alice";
    let age = 30;
    let mut output = String::new();
    write!(&mut output, "{}", format_args!("My name is {} and I am {} years old.", name, age)).unwrap();
    println!("{}", output);
}
```

## 所有权和借用

**所有权：**

Rust中的每个值都有一个唯一的所有者，当所有者超出作用域时，值将被删除。这确保了内存安全而无需垃圾回收。

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1被移动到s2
    println!("s2: {}", s2);
    // println!("s1: {}", s1); // 这会导致错误，因为s1不再有效
}
```

**借用：**

函数可以通过引用借用值，而不是获取所有权：

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // s1被借用
    println!("'{}'的长度是: {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

## 函数

Rust 中的函数是基本的代码组织单元。函数可以接受参数、执行计算并返回值。Rust 的函数具有静态类型，因此所有参数和返回值的类型在编译时必须明确。

### 函数定义

函数的定义使用 `fn` 关键字，后面跟随函数名称、参数列表和函数体：

```rust
fn main() {
    println!("Hello, world!");
}
```

这是一个简单的 `main` 函数，打印 "Hello, world!"。

### 带参数的函数

函数可以接受参数，并且每个参数都需要指定类型：

```rust
fn main() {
    let result = add(5, 3);
    println!("The sum is: {}", result);
}

fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

在这个例子中，函数 `add` 接受两个 `i32` 类型的参数，并返回它们的和。

### 返回值的函数

函数可以返回一个值，返回值的类型需要在箭头 `->` 之后指定：

```rust
fn main() {
    let result = square(4);
    println!("The square is: {}", result);
}

fn square(x: i32) -> i32 {
    x * x
}
```

函数 `square` 返回参数 `x` 的平方。

### 代码块和表达式

Rust 中的函数体是一个代码块，代码块由花括号包围，最后一个表达式的值会作为函数的返回值，无需使用 `return` 关键字：

```rust
fn main() {
    let result = square(4);
    println!("The square is: {}", result);
}

fn square(x: i32) -> i32 {
    x * x // 这里没有分号，因此这是一个表达式，返回值是 x * x
}
```

如果使用 `return` 关键字，必须显式地指定返回值，并且返回语句以分号结束：

```rust
fn main() {
    let result = square(4);
    println!("The square is: {}", result);
}

fn square(x: i32) -> i32 {
    return x * x; // 显式返回
}
```

### 函数的可变参数

Rust 不支持直接定义可变参数的函数，但可以通过传递一个包含所有参数的集合（如数组或向量）来实现：

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let result = sum(&numbers);
    println!("The sum is: {}", result);
}

fn sum(numbers: &Vec<i32>) -> i32 {
    let mut total = 0;
    for &num in numbers.iter() {
        total += num;
    }
    total
}
```

### 泛型函数

Rust 支持泛型函数，可以接受不同类型的参数。泛型参数用尖括号包围，并在函数名称后面指定：

```rust
fn main() {
    let int_result = largest(3, 7);
    let float_result = largest(2.3, 5.8);

    println!("Largest integer: {}", int_result);
    println!("Largest float: {}", float_result);
}

fn largest<T: PartialOrd>(x: T, y: T) -> T {
    if x > y {
        x
    } else {
        y
    }
}
```

在这个例子中，`largest` 函数使用泛型参数 `T`，它要求 `T` 实现了 `PartialOrd` trait（表示可以比较大小）。


## 结构体和枚举

**结构体：**

结构体用于创建自定义数据类型。

```rust
// 常规结构体
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

// 元组结构体
struct Point(i32, i32, i32);

// 单元结构体不包含任何字段，通常用于实现某些特定功能。
struct AlwaysEqual;

fn main() {
    let user1 = User {
        username: String::from("user1"),
        email: String::from("user1@example.com"),
        sign_in_count: 1,
        active: true,
    };

    println!("用户名: {}", user1.username);
}
```

为结构体实现方法和关联函数：

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 关联函数
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }

    // 方法
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // 带有多个参数的方法
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle::new(30, 50);
    let rect2 = Rectangle::new(10, 40);
    let rect3 = Rectangle::new(60, 45);

    println!("The area of rect1 is: {} square pixels", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}
```

### Rust 结构体的初始化

在 Rust 中，结构体的初始化是指创建结构体实例并为其字段分配值。结构体的初始化可以通过直接赋值、构建函数或简便初始化语法来完成。

#### 1. 直接初始化

直接初始化结构体实例时，需要为每个字段赋值：

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let user1 = User {
        username: String::from("user1"),
        email: String::from("user1@example.com"),
        sign_in_count: 1,
        active: true,
    };

    println!("Username: {}", user1.username);
    println!("Email: {}", user1.email);
    println!("Sign in count: {}", user1.sign_in_count);
    println!("Active: {}", user1.active);
}
```

#### 2. 使用构建函数初始化

可以通过定义一个实现结构体的构建函数来初始化结构体实例。这种方法有助于封装初始化逻辑，并使代码更加简洁。

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

impl User {
    fn new(username: String, email: String) -> User {
        User {
            username,
            email,
            sign_in_count: 1,
            active: true,
        }
    }
}

fn main() {
    let user1 = User::new(String::from("user1"), String::from("user1@example.com"));

    println!("Username: {}", user1.username);
    println!("Email: {}", user1.email);
    println!("Sign in count: {}", user1.sign_in_count);
    println!("Active: {}", user1.active);
}
```

#### 3. 简便初始化语法（字段初始化简写）

当结构体的字段名与变量名相同时，可以使用简写语法进行初始化：

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let username = String::from("user1");
    let email = String::from("user1@example.com");

    let user1 = User {
        username,
        email,
        sign_in_count: 1,
        active: true,
    };

    println!("Username: {}", user1.username);
    println!("Email: {}", user1.email);
    println!("Sign in count: {}", user1.sign_in_count);
    println!("Active: {}", user1.active);
}
```

#### 4. 使用更新语法初始化

如果需要基于现有实例创建新实例，可以使用更新语法：

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let user1 = User {
        username: String::from("user1"),
        email: String::from("user1@example.com"),
        sign_in_count: 1,
        active: true,
    };

    let user2 = User {
        email: String::from("user2@example.com"),
        ..user1 // 复制 user1 的其他字段
    };

    println!("Username: {}", user2.username);
    println!("Email: {}", user2.email);
    println!("Sign in count: {}", user2.sign_in_count);
    println!("Active: {}", user2.active);
}
```

需要注意的是，`user1` 中的 `username` 和 `sign_in_count` 字段的值被移动到 `user2`，因此 `user1` 在此之后将无法使用。

**枚举：**

枚举允许通过列举其可能的值来定义一个类型。

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg1 = Message::Write(String::from("hello"));

    match msg1 {
        Message::Quit => println!("退出消息"),
        Message::Move { x, y } => println!("移动到 ({}, {})", x, y),
        Message::Write(text) => println!("写消息: {}", text),
        Message::ChangeColor(r, g, b) => println!("更改颜色到 ({}, {}, {})", r, g, b),
    }
}
```


## 错误处理

Rust使用`Result`和`Option`类型进行错误处理。

```rust
fn main() {
    let result = divide(10, 2);
    match result {
        Ok(v) => println!("结果: {}", v),
        Err(e) => println!("错误: {}", e),
    }
}

fn divide_proxy(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("不能除以零"))
    } else {
        Ok(a / b)
    }
}

fn divide(a: i32, b: i32) -> Result<i32, String> {
    let result = divide_proxy(a, b)?;
    // 语法糖, 相当于
    //
    //  let result = divide_proxy(a, b) {
    //    Ok(v) => v,
    //    Err(e) => {
    //        return Err(r.into())
    //    },
    //  }
    // 
    Ok(result)
}
```

## Trait

在 Rust 中，trait 是一种定义共享行为的方法。它可以看作是其他语言中的接口，定义了类型必须实现的方法集合。Trait 允许在不同类型之间共享功能，而无需在每个类型中重复实现这些功能。

### 定义 Trait

定义一个 trait 使用 `trait` 关键字，后面跟着 trait 名称和方法签名：

```rust
trait Summary {
    fn summarize(&self) -> String;
}
```

### 实现 Trait

实现一个 trait 使用 `impl` 关键字，并指定要实现的类型和方法：

```rust
struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
```

你也可以为一个类型实现多个 trait：

```rust
struct Tweet {
    username: String,
    content: String,
    reply: bool,
    retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

trait Display {
    fn display(&self) -> String;
}

impl Display for Tweet {
    fn display(&self) -> String {
        format!("Tweet by {}: {}", self.username, self.content)
    }
}
```

### 默认实现

Trait 方法可以有默认实现，如果某个类型不需要自定义实现，可以使用默认实现：

```rust
trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}

struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {}
```

在这个例子中，`NewsArticle` 没有提供 `summarize` 方法的自定义实现，因此会使用默认实现。

### Trait 约束

在函数中使用 trait 时，可以对泛型类型参数进行 trait 约束，确保这些类型实现了指定的 trait：

```rust
fn notify(item: impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

使用 `impl Trait` 语法，这种方式在参数类型前加上 `impl` 关键字和 trait 名称，表示任何实现了该 trait 的类型都可以作为参数传递。

可以使用泛型参数和 `where` 从句来实现更复杂的 trait 约束：

```rust
fn notify<T: Summary>(item: T) {
    println!("Breaking news! {}", item.summarize());
}

fn notify_multiple<T, U>(item1: T, item2: U)
where
    T: Summary,
    U: Summary,
{
    println!("Breaking news! {}", item1.summarize());
    println!("More news! {}", item2.summarize());
}
```

### Trait 对象

Trait 对象允许在运行时进行动态分发。可以使用指向 trait 对象的引用 (`&dyn Trait`) 或智能指针 (`Box<dyn Trait>`)：

```rust
fn notify(item: &dyn Summary) {
    println!("Breaking news! {}", item.summarize());
}

fn main() {
    let article = NewsArticle {
        headline: String::from("Rust 1.52 Released"),
        location: String::from("Internet"),
        author: String::from("Rust Team"),
        content: String::from("Rust 1.52 is now officially released..."),
    };

    notify(&article);
}
```
