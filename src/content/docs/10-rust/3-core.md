---
title: 核心trait
---

标记 trait 是一种不包含任何方法的 trait，用于标记或标识某种特性。它们在 Rust 中用于为类型添加元数据或行为约束。

## Send

在 Rust 中，`Send` 是一个标记 trait，用于标记一个类型是否可以在线程之间安全地传递。实现了 `Send` trait 的类型意味着该类型的值可以安全地从一个线程移动到另一个线程，而不会引起数据竞争或其他并发问题。

### `Send` 的定义

`Send` trait 的定义非常简单，它不包含任何方法，只是一个标记：

```rust
unsafe auto trait Send {}
```

这个定义表示 `Send` 是一个自动实现的 trait，编译器会根据类型的内容自动决定类型是否实现 `Send`。通常，所有的基本类型和大多数标准库类型都实现了 `Send`。

### `Send` 的自动实现

以下类型默认实现了 `Send`：

- 所有基本类型，例如 `i32`、`f64`、`bool` 等。
- 标准库中的大多数类型，例如 `String`、`Vec<T>`、`Box<T>` 等。
- 所有实现了 `Send` 的类型的组合，例如包含 `Send` 成员的结构体和枚举。

以下类型默认不实现 `Send`：

- 指针。
- 非线程安全的引用计数类型 `Rc<T>`。
- 包含了 `!Send` 类型的组合类型。

### 如何检查一个类型是否实现了 `Send`

你可以使用 Rust 的类型系统来检查一个类型是否实现了 `Send`。以下是一个示例，展示如何使用静态断言来检查类型是否实现了 `Send`：

```rust
use std::rc::Rc;
use std::sync::Arc;

fn is_send<T: Send>() {}

fn main() {
    // 这些类型实现了 `Send`
    is_send::<i32>();
    is_send::<String>();
    is_send::<Vec<i32>>();
    is_send::<Arc<i32>>();

    // 这些类型不实现 `Send`
    // is_send::<Rc<i32>>(); // 取消注释会导致编译错误
}
```

在这个示例中，`is_send` 函数是一个泛型函数，它只有在泛型类型 `T` 实现了 `Send` 时才会编译通过。

### `Send` 和多线程编程

`Send` 在多线程编程中非常重要，因为它确保了在线程间传递数据的安全性。以下是一个使用 `Send` 的多线程示例：

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```

在这个示例中，`v` 被移动到子线程中并打印。由于 `Vec<T>` 实现了 `Send`，所以它可以安全地从主线程移动到子线程。

### 自定义类型实现 `Send`

通常情况下，你不需要手动实现 `Send`，因为编译器会自动为你做这些工作。然而，如果你有一个自定义类型并且需要确保它实现 `Send`，你可以显式地实现 `Send`。需要注意的是，手动实现 `Send` 通常涉及到 `unsafe` 代码。

```rust
struct MyStruct {
    data: *const u8,
}

// 手动实现 `Send`
unsafe impl Send for MyStruct {}

fn main() {
    let my_struct = MyStruct { data: std::ptr::null() };

    let handle = thread::spawn(move || {
        println!("MyStruct is sent to another thread.");
    });

    handle.join().unwrap();
}
```

## Sync

在 Rust 中，`Sync` 是一个标记 trait，用于标记一个类型是否可以安全地在多个线程中共享引用。实现了 `Sync` trait 的类型意味着其引用可以安全地在多个线程中同时使用，而不会引起数据竞争或其他并发问题。

### `Sync` 的定义

`Sync` trait 的定义非常简单，它不包含任何方法，只是一个标记：

```rust
unsafe auto trait Sync {}
```

这个定义表示 `Sync` 是一个自动实现的 trait，编译器会根据类型的内容自动决定类型是否实现 `Sync`。通常，所有线程安全的类型和大多数标准库类型都实现了 `Sync`。

### `Sync` 的自动实现

以下类型默认实现了 `Sync`：

- 所有不可变的基本类型，例如 `i32`、`f64`、`bool` 等。
- 线程安全的智能指针类型，例如 `Arc<T>`。
- 包含 `Sync` 成员的组合类型，例如结构体和枚举。

以下类型默认不实现 `Sync`：

- 指针。
- 非线程安全的引用计数类型 `Rc<T>`。
- 包含了 `!Sync` 类型的组合类型。

### 如何检查一个类型是否实现了 `Sync`

你可以使用 Rust 的类型系统来检查一个类型是否实现了 `Sync`。以下是一个示例，展示如何使用静态断言来检查类型是否实现了 `Sync`：

```rust
use std::rc::Rc;
use std::sync::Arc;

fn is_sync<T: Sync>() {}

fn main() {
    // 这些类型实现了 `Sync`
    is_sync::<i32>();
    is_sync::<String>();
    is_sync::<Vec<i32>>();
    is_sync::<Arc<i32>>();

    // 这些类型不实现 `Sync`
    // is_sync::<Rc<i32>>(); // 取消注释会导致编译错误
}
```

在这个示例中，`is_sync` 函数是一个泛型函数，它只有在泛型类型 `T` 实现了 `Sync` 时才会编译通过。

### `Sync` 和多线程编程

`Sync` 在多线程编程中非常重要，因为它确保了在多个线程中共享数据的安全性。以下是一个使用 `Sync` 的多线程示例：

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let v = Arc::new(vec![1, 2, 3]);

    let mut handles = vec![];

    for _ in 0..10 {
        let v = Arc::clone(&v);
        let handle = thread::spawn(move || {
            println!("{:?}", v);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

在这个示例中，`Arc<T>` 是一个线程安全的引用计数类型，实现了 `Sync`，因此可以安全地在多个线程中共享。

### 自定义类型实现 `Sync`

通常情况下，你不需要手动实现 `Sync`，因为编译器会自动为你做这些工作。然而，如果你有一个自定义类型并且需要确保它实现 `Sync`，你可以显式地实现 `Sync`。需要注意的是，手动实现 `Sync` 通常涉及到 `unsafe` 代码。

```rust
struct MyStruct {
    data: *const u8,
}

// 手动实现 `Sync`
unsafe impl Sync for MyStruct {}

fn main() {
    let my_struct = MyStruct { data: std::ptr::null() };

    let handle1 = thread::spawn(move || {
        println!("MyStruct is accessed from thread 1.");
    });

    let handle2 = thread::spawn(move || {
        println!("MyStruct is accessed from thread 2.");
    });

    handle1.join().unwrap();
    handle2.join().unwrap();
}
```

## Unpin


在 Rust 中，`Unpin` 是一个标记 trait，用于表示某个类型可以安全地移动。对于大多数类型，它们在内存中的位置并不重要，可以在内存中自由移动。然而，对于某些类型（特别是那些包含自引用或需要固定内存位置的类型），移动它们可能会导致内存安全问题。这些类型不会自动实现 `Unpin`。

### `Unpin` 的定义

`Unpin` 是一个标记 trait，其定义非常简单，不包含任何方法：

```rust
pub auto trait Unpin {}
```

这个定义表示 `Unpin` 是一个自动实现的 trait，编译器会根据类型的内容自动决定类型是否实现 `Unpin`。如果一个类型实现了 `Unpin`，那么它可以在内存中安全地移动。

### `Unpin` 的自动实现

以下类型默认实现了 `Unpin`：

- 所有基本类型，例如 `i32`、`f64`、`bool` 等。
- 大多数标准库类型，例如 `String`、`Vec<T>`、`Box<T>` 等。
- 组合类型（如结构体和枚举），只要其所有字段都实现了 `Unpin`。

以下类型默认不实现 `Unpin`(即实现了!Unpin)：

- 指针。
- async块
- async函数返回值
- 包含自引用的类型。
- 明确使用 `PhantomPinned` 防止自动实现 `Unpin` 的类型。

### 如何检查一个类型是否实现了 `Unpin`

你可以使用 Rust 的类型系统来检查一个类型是否实现了 `Unpin`。以下是一个示例，展示如何使用静态断言来检查类型是否实现了 `Unpin`：

```rust
use std::marker::Unpin;

fn is_unpin<T: Unpin>() {}

fn main() {
    // 这些类型实现了 `Unpin`
    is_unpin::<i32>();
    is_unpin::<String>();
    is_unpin::<Vec<i32>>();
    is_unpin::<Box<i32>>();

    // 这些类型不实现 `Unpin`
    // is_unpin::<SelfReferentialStruct>(); // 假设 SelfReferentialStruct 没有实现 Unpin
}
```

在这个示例中，`is_unpin` 函数是一个泛型函数，它只有在泛型类型 `T` 实现了 `Unpin` 时才会编译通过。

### 自引用类型和 `Unpin`

自引用类型通常不会自动实现 `Unpin`，因为它们需要固定的内存位置。例如：

```rust
use std::pin::Pin;
use std::marker::PhantomPinned;

struct SelfReferential {
    data: String,
    pointer: *const String,
    _marker: PhantomPinned,
}

impl SelfReferential {
    fn new(data: String) -> Self {
        Self {
            data,
            pointer: std::ptr::null(),
            _marker: PhantomPinned,
        }
    }

    fn init_pointer(self: Pin<&mut Self>) {
        let self_ptr: *const String = &self.data;
        let this = unsafe { self.get_unchecked_mut() };
        this.pointer = self_ptr;
    }
}

fn main() {
    let mut instance = SelfReferential::new(String::from("hello"));
    let mut pinned_instance = Box::pin(instance);

    pinned_instance.as_mut().init_pointer();

    println!("{}", pinned_instance.data);
}
```

在这个示例中，`SelfReferential` 结构体包含一个指向自身数据的指针，因此需要确保其内存地址不变。使用 `PhantomPinned` 防止类型实现 `Unpin`。

### 手动实现 `Unpin`

如果你确定某个类型可以安全地移动，即使它包含某些特殊的字段，你可以手动为其实现 `Unpin`。需要注意的是，手动实现 `Unpin` 通常涉及到 `unsafe` 代码。

```rust
use std::marker::Unpin;

struct MyStruct {
    data: *const u8,
}

// 手动实现 `Unpin`
unsafe impl Unpin for MyStruct {}

fn main() {
    let my_struct = MyStruct { data: std::ptr::null() };
}
```


## Sized

在 Rust 中，`Sized` 是一个标记 trait，用于表示一个类型的大小在编译时是已知的。默认情况下，Rust 假设所有类型都是 `Sized`，这意味着类型的大小在编译时是固定的，可以被准确地计算和管理。

### `Sized` 的定义

`Sized` trait 的定义非常简单：

```rust
pub trait Sized {}
```

### `Sized` 的默认实现

大多数类型默认实现了 `Sized`，包括：

- 所有基本类型，例如 `i32`、`f64`、`bool` 等。
- 结构体、枚举和元组，只要它们的所有字段或变体都是 `Sized`。

以下是一些默认实现了 `Sized` 的类型示例：

```rust
fn main() {
    let x: i32 = 5;        // `i32` 是 `Sized`
    let y: f64 = 3.14;     // `f64` 是 `Sized`
    let z: bool = true;    // `bool` 是 `Sized`
    let s: String = String::from("hello"); // `String` 是 `Sized`

    println!("{}, {}, {}, {}", x, y, z, s);
}
```

### `Sized` 和动态大小类型（DST）

某些类型在编译时大小未知，因此它们不实现 `Sized`。这些类型通常被称为动态大小类型（Dynamically Sized Types，DST）。常见的 DST 包括：

- **`[T]`**：切片类型，例如 `[i32]`。
- **`str`**：字符串切片类型，例如 `&str`。

由于这些类型的大小在编译时未知，它们不能直接作为函数参数或变量。通常需要将它们放在某种指针类型（例如引用或智能指针）中，以便编译器可以处理它们。

```rust
fn main() {
    let s: &str = "hello"; // `&str` 是动态大小类型 `str` 的引用
    let a: &[i32] = &[1, 2, 3]; // `&[i32]` 是动态大小类型 `[i32]` 的引用

    println!("{}, {:?}", s, a);
}
```

### `Sized` 在泛型中的使用

在泛型编程中，Rust 默认要求泛型类型参数实现 `Sized`。如果希望泛型参数可以是动态大小类型，需要显式地放宽这一限制。

```rust
// 默认情况下，T 必须实现 Sized
fn generic_function<T>(value: T) {
    // ...
}

// 允许 T 是一个动态大小类型
fn generic_function_unsized<T: ?Sized>(value: &T) {
    // ...
}
```

在第二个示例中，`T: ?Sized` 表示 `T` 可以是一个动态大小类型，并且函数参数 `value` 是一个对 `T` 的引用。

### 自定义类型和 `Sized`

当定义一个结构体或枚举时，如果包含动态大小类型的字段，结构体或枚举本身也会变成动态大小类型，需要放在某种指针类型中使用。

```rust
struct MyStruct<T: ?Sized> {
    data: T,
}

fn main() {
    // 错误：无法直接创建动态大小类型的实例
    // let s = MyStruct { data: [1, 2, 3] };

    // 正确：使用引用或智能指针
    let s: &MyStruct<[i32]> = &MyStruct { data: [1, 2, 3] };

    println!("{:?}", s.data);
}
```

## Copy

在 Rust 中，`Copy` 是一个标记 trait，用于表示一个类型的值可以按位复制（bitwise copy）。实现了 `Copy` trait 的类型在赋值或传递时会进行浅拷贝，而不是移动。这使得该类型的值在赋值和传递时更加方便和高效。

### `Copy` 的定义

`Copy` trait 的定义非常简单：

```rust
pub trait Copy : Clone { }
```

这个定义表示 `Copy` 是一个标记 trait，且所有实现了 `Copy` 的类型也必须实现 `Clone`。

### 自动实现 `Copy` 的类型

以下类型默认实现了 `Copy`：

- 所有的基本类型，例如 `i32`、`u32`、`f64`、`bool`、`char` 等。
- 包含所有字段都实现了 `Copy` 的结构体。
- 固定大小的数组，例如 `[i32; 3]`。

以下是一些实现了 `Copy` 的类型示例：

```rust
fn main() {
    // 基本类型
    let x: i32 = 5;
    let y = x; // x 被复制到 y

    println!("x: {}, y: {}", x, y);

    // 固定大小的数组
    let arr: [i32; 3] = [1, 2, 3];
    let arr2 = arr; // arr 被复制到 arr2

    println!("arr: {:?}, arr2: {:?}", arr, arr2);

    // 实现了 Copy 的结构体
    #[derive(Copy, Clone)]
    struct Point {
        x: i32,
        y: i32,
    }

    let p1 = Point { x: 0, y: 0 };
    let p2 = p1; // p1 被复制到 p2

    println!("p1: ({}, {}), p2: ({}, {})", p1.x, p1.y, p2.x, p2.y);
}
```

### 手动实现 `Copy`

如果你有一个自定义类型，并且希望它实现 `Copy`，可以使用 `#[derive(Copy, Clone)]` 属性来自动生成 `Copy` 和 `Clone` 实现。

```rust
#[derive(Copy, Clone)]
struct MyStruct {
    a: i32,
    b: f64,
}

fn main() {
    let s1 = MyStruct { a: 42, b: 3.14 };
    let s2 = s1; // s1 被复制到 s2

    println!("s1: ({}, {}), s2: ({}, {})", s1.a, s1.b, s2.a, s2.b);
}
```

在这个示例中，`MyStruct` 通过 `#[derive(Copy, Clone)]` 自动实现了 `Copy` 和 `Clone`。

### `Copy` 和 `Clone` 的区别

虽然 `Copy` 和 `Clone` 都可以用于复制值，但它们有一些重要区别：

- **`Copy`**：类型的值可以按位复制，赋值时会自动进行复制操作。`Copy` 是一种浅拷贝，适用于简单的值类型。
- **`Clone`**：需要显式调用 `clone` 方法进行复制，适用于需要深拷贝的复杂类型。

```rust
#[derive(Clone)]
struct ComplexType {
    data: Vec<i32>,
}

fn main() {
    let c1 = ComplexType { data: vec![1, 2, 3] };
    let c2 = c1.clone(); // 需要显式调用 clone 方法

    println!("c1: {:?}, c2: {:?}", c1.data, c2.data);
}
```

在这个示例中，`ComplexType` 通过 `#[derive(Clone)]` 实现了 `Clone`，但由于它包含 `Vec`（一个未实现 `Copy` 的类型），所以不能实现 `Copy`。

### 何时使用 `Copy`

`Copy` 适用于小而简单的值类型，例如：

- 基本类型（整数、浮点数、布尔值、字符）。
- 实现了 `Copy` 的类型的组合（例如结构体或数组）。

对于包含堆分配数据或需要复杂管理的类型，应使用 `Clone` 而不是 `Copy`。


## Clone

在 Rust 中，`Clone` 是一个 trait，用于表示一个类型可以显式地复制自身。与 `Copy` 不同，`Clone` 可以用于复杂的类型，允许深拷贝，即在堆上分配的数据也会被复制。

### `Clone` 的定义

`Clone` trait 的定义如下：

```rust
pub trait Clone {
    fn clone(&self) -> Self;
    fn clone_from(&mut self, source: &Self) { ... }
}
```

- `clone` 方法：用于创建一个类型的副本。
- `clone_from` 方法：允许在已有的实例上复制数据，通常用于优化。

### 自动实现 `Clone`

许多标准库类型默认实现了 `Clone`，包括：

- 所有基本类型，例如 `i32`、`f64`、`bool` 等。
- 标准库中的大多数集合类型，例如 `String`、`Vec<T>`、`HashMap<K, V>` 等。
- 包含所有字段都实现了 `Clone` 的结构体和枚举。

可以使用 `#[derive(Clone)]` 来自动为自定义类型实现 `Clone`。

```rust
#[derive(Clone)]
struct MyStruct {
    a: i32,
    b: String,
}

fn main() {
    let s1 = MyStruct {
        a: 42,
        b: String::from("hello"),
    };
    let s2 = s1.clone();

    println!("s1: ({}, {}), s2: ({}, {})", s1.a, s1.b, s2.a, s2.b);
}
```

在这个示例中，`MyStruct` 通过 `#[derive(Clone)]` 自动实现了 `Clone`，可以调用 `clone` 方法来创建一个副本。

### `Clone` 和 `Copy` 的区别

虽然 `Clone` 和 `Copy` 都可以用于复制值，但它们有一些重要区别：

- **`Copy`**：浅拷贝，赋值时会自动进行复制操作。适用于简单的值类型。
- **`Clone`**：需要显式调用 `clone` 方法进行复制，适用于需要深拷贝的复杂类型。

```rust
#[derive(Copy, Clone)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 0, y: 0 };
    let p2 = p1; // 自动复制（Copy）

    let p3 = p1.clone(); // 显式复制（Clone）

    println!("p1: ({}, {}), p2: ({}, {}), p3: ({}, {})", p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}
```

在这个示例中，`Point` 既实现了 `Copy` 也实现了 `Clone`，可以自动复制或显式地调用 `clone` 方法。

### 自定义 `Clone` 实现

在某些情况下，你可能需要自定义 `Clone` 的实现方式。例如，如果类型包含指针或其他需要手动管理的资源。

```rust
struct MyStruct {
    data: Vec<i32>,
}

impl Clone for MyStruct {
    fn clone(&self) -> Self {
        MyStruct {
            data: self.data.clone(),
        }
    }
}

fn main() {
    let s1 = MyStruct { data: vec![1, 2, 3] };
    let s2 = s1.clone();

    println!("s1: {:?}, s2: {:?}", s1.data, s2.data);
}
```

在这个示例中，`MyStruct` 包含一个 `Vec<i32>`，我们自定义了 `clone` 方法，以便正确地复制 `Vec` 的内容。

### 使用 `clone_from`

`clone_from` 方法允许在已有的实例上复制数据，通常用于减少内存分配，提高性能。

```rust
#[derive(Clone)]
struct MyStruct {
    data: Vec<i32>,
}

fn main() {
    let s1 = MyStruct { data: vec![1, 2, 3] };
    let mut s2 = MyStruct { data: vec![4, 5, 6] };

    s2.clone_from(&s1);

    println!("s1: {:?}, s2: {:?}", s1.data, s2.data);
}
```

## Future

在 Rust 中，`Future` 是异步编程的核心概念之一。它代表一个可能在未来某个时间点完成的值或计算。`Future` 允许你编写非阻塞代码，这在 I/O 操作和并发编程中非常有用。

### 什么是 `Future`？

`Future` 是一个 trait，它定义了一个异步计算的接口。`Future` 有一个核心方法 `poll`，它尝试推进 `Future` 到一个新的状态。

以下是 `Future` trait 的定义（简化版）：

```rust
use std::task::{Context, Poll};

pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```

- `poll` 方法：尝试推进 `Future`，可能返回 `Poll::Pending`（表示计算尚未完成）或 `Poll::Ready(T)`（表示计算已经完成，`T` 是结果）。
- `Output` 类型：表示 `Future` 计算完成后的结果类型。

### 使用 `Future`

通常你不会直接实现 `Future` trait，而是使用 `async`/`await` 语法，因为它可以自动生成实现了 `Future` 的状态机。

以下是一个简单的异步函数，它返回一个 `Future`：

```rust
async fn hello() -> String {
    "Hello, world!".to_string()
}

#[tokio::main]
async fn main() {
    let greeting = hello().await;
    println!("{}", greeting);
}
```

在这个例子中，`hello` 函数返回一个 `Future`，当你在 `main` 函数中 `await` 它时，Rust 会自动处理 `Future` 的状态转换。

### 手动实现 `Future`

尽管通常使用 `async`/`await` 语法，你也可以手动实现 `Future`。以下是一个简单的示例，展示如何手动实现一个计时器 `Future`：

```rust
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::{Duration, Instant};
use tokio::time::sleep;

struct Timer {
    when: Instant,
}

impl Timer {
    fn new(duration: Duration) -> Self {
        Timer {
            when: Instant::now() + duration,
        }
    }
}

impl Future for Timer {
    type Output = ();

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        if Instant::now() >= self.when {
            Poll::Ready(())
        } else {
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}

#[tokio::main]
async fn main() {
    let timer = Timer::new(Duration::from_secs(2));
    timer.await;
    println!("Timer completed");
}
```

### `Future` 的关键概念

- **异步计算**：`Future` 代表一个可能尚未完成的计算。
- **非阻塞**：`poll` 方法应该是非阻塞的，这意味着它应该立即返回，而不是等待计算完成。
- **状态机**：使用 `async`/`await` 语法时，编译器会自动将异步函数转换为状态机，以管理 `Future` 的状态。

## Stream

在Rust编程语言中，`Stream` 是异步编程中的一个重要概念，类似于迭代器，但用于异步操作。`Stream` 是一个持续产生值的异步序列，类似于标准库中的 `Iterator` 特征，但 `Stream` 特征是异步的。

以下是一些基础知识和示例，帮助你了解并使用 `Stream`：

### 基本概念

- **Stream**：可以被认为是一个异步版本的迭代器，允许你按顺序生成一系列值。
- **async-std**：一个常用的异步标准库，提供了 `Stream` 特征。
- **futures**：另一个常用库，定义了 `Stream` 特征和许多辅助工具。

### `Stream` 特征

`Stream` 特征定义如下：

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Stream {
    type Item;

    fn poll_next(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>>;
}
```

- `poll_next` 方法：异步地尝试从 `Stream` 中获取下一个值。
- `Pin`：确保对象的内存位置不会被移动。
- `Context`：提供Waker，允许 `Stream` 在准备好时通知执行器（executor）。
- `Poll`：表示一个操作的状态，可以是 `Poll::Pending` 或 `Poll::Ready(Some(Item))` 或 `Poll::Ready(None)`。

### 使用 `Stream`

要使用 `Stream`，通常需要配合异步运行时，如 Tokio 或 async-std。

以下是一个简单的示例，演示如何使用 `Stream`：

#### 使用 `async-std` 和 `futures`

```rust
use async_std::stream::Stream;
use futures::stream;
use futures::StreamExt;

#[async_std::main]
async fn main() {
    let my_stream = stream::iter(vec![1, 2, 3]);

    my_stream.for_each(|x| async move {
        println!("Got: {}", x);
    }).await;
}
```

#### 自定义 `Stream`

你也可以创建自定义的 `Stream`。以下是一个简单的例子：

```rust
use std::pin::Pin;
use std::task::{Context, Poll};
use futures::stream::Stream;

struct Counter {
    count: usize,
    max: usize,
}

impl Counter {
    fn new(max: usize) -> Self {
        Counter { count: 0, max }
    }
}

impl Stream for Counter {
    type Item = usize;

    fn poll_next(mut self: Pin<&mut Self>, _: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        if self.count < self.max {
            self.count += 1;
            Poll::Ready(Some(self.count))
        } else {
            Poll::Ready(None)
        }
    }
}

#[tokio::main]
async fn main() {
    let mut counter = Counter::new(5);

    while let Some(value) = counter.next().await {
        println!("Got: {}", value);
    }
}
```

### 常用的 `Stream` 操作符

- `next()`: 获取 `Stream` 中的下一个值。
- `filter()`: 过滤 `Stream` 中的元素。
- `map()`: 映射 `Stream` 中的元素。
- `fold()`: 对 `Stream` 中的元素进行累积操作。

## Iterator

`Iterator` 是一个 trait，它定义了一系列方法，用于遍历和处理元素。最基本的方法是 `next`，它返回迭代器中的下一个元素。

以下是 `Iterator` trait 的定义：

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // 其他方法
}
```

- **`type Item`**：表示迭代器生成的元素类型。
- **`fn next(&mut self) -> Option<Self::Item>`**：返回迭代器的下一个元素，如果迭代器已经结束，则返回 `None`。

### 使用迭代器

你可以通过调用集合类型上的 `iter` 方法来创建迭代器。例如，`Vec` 类型有一个 `iter` 方法，可以创建一个元素的迭代器。

```rust
fn main() {
    let v = vec![1, 2, 3];
    let mut iter = v.iter();

    assert_eq!(iter.next(), Some(&1));
    assert_eq!(iter.next(), Some(&2));
    assert_eq!(iter.next(), Some(&3));
    assert_eq!(iter.next(), None);
}
```

### 自定义迭代器

你可以实现自己的迭代器，方法是为一个结构体实现 `Iterator` trait。

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let mut counter = Counter::new();

    while let Some(value) = counter.next() {
        println!("{}", value);
    }
}
```

在这个示例中，`Counter` 结构体实现了 `Iterator` trait，并生成从 1 到 5 的数字。

### 迭代器适配器

迭代器适配器是 `Iterator` trait 上定义的方法，这些方法可以对迭代器进行转换或组合。常见的迭代器适配器包括 `map`、`filter`、`take`、`collect` 等。

- **`map`**：对每个元素应用一个函数，并返回一个新的迭代器。
  ```rust
  let v = vec![1, 2, 3];
  let v2: Vec<_> = v.iter().map(|x| x + 1).collect();
  assert_eq!(v2, vec![2, 3, 4]);
  ```

- **`filter`**：过滤掉不符合条件的元素，并返回一个新的迭代器。
  ```rust
  let v = vec![1, 2, 3, 4, 5];
  let v2: Vec<_> = v.iter().filter(|&&x| x % 2 == 0).collect();
  assert_eq!(v2, vec![2, 4]);
  ```

- **`take`**：只取前 `n` 个元素，并返回一个新的迭代器。
  ```rust
  let v = vec![1, 2, 3, 4, 5];
  let v2: Vec<_> = v.iter().take(3).collect();
  assert_eq!(v2, vec![&1, &2, &3]);
  ```

- **`collect`**：将迭代器转换为集合，例如 `Vec`、`HashSet` 等。
  ```rust
  let v = vec![1, 2, 3];
  let v2: Vec<_> = v.iter().collect();
  assert_eq!(v2, vec![&1, &2, &3]);
  ```

### 消耗适配器

消耗适配器是一些会消耗迭代器的方法，通常会遍历整个迭代器并产生一个值。例如：

- **`sum`**：计算所有元素的和。
  ```rust
  let v = vec![1, 2, 3, 4];
  let sum: i32 = v.iter().sum();
  assert_eq!(sum, 10);
  ```

- **`count`**：计算元素的个数。
  ```rust
  let v = vec![1, 2, 3, 4];
  let count = v.iter().count();
  assert_eq!(count, 4);
  ```

- **`fold`**：将元素组合为一个值。
  ```rust
  let v = vec![1, 2, 3, 4];
  let sum = v.iter().fold(0, |acc, &x| acc + x);
  assert_eq!(sum, 10);
  ```
