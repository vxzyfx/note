---
title: C++并发编程
---

## 进程

在 C++ 中，标准库并没有直接提供对进程控制的支持。但是，C++ 可以通过调用操作系统提供的 API 来实现进程管理。不同的操作系统有不同的 API 来管理进程，例如在 Unix/Linux 系统中使用 `fork` 和 `exec` 系列函数，在 Windows 系统中使用 `CreateProcess` 函数。

对于跨平台的进程管理，Boost 库提供了 `Boost.Process`，这是一个跨平台的 C++ 库，用于创建和管理进程。

### 使用 POSIX API 管理进程（适用于 Unix/Linux 系统）

#### 示例：使用 `fork` 和 `exec` 创建和管理进程

```cpp
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        std::cerr << "Fork failed!" << std::endl;
        return 1;
    } else if (pid == 0) {
        // 子进程
        std::cout << "Child process: " << getpid() << std::endl;
        execlp("/bin/ls", "ls", nullptr);
    } else {
        // 父进程
        std::cout << "Parent process: " << getpid() << std::endl;
        wait(nullptr); // 等待子进程结束
    }

    return 0;
}
```

在这个示例中，`fork` 函数创建一个新进程。`execlp` 函数在子进程中执行新的程序。在父进程中，`wait` 函数等待子进程结束。

### 使用 Windows API 管理进程（适用于 Windows 系统）

#### 示例：使用 `CreateProcess` 创建和管理进程

```cpp
#include <windows.h>
#include <iostream>

int main() {
    STARTUPINFO si;
    PROCESS_INFORMATION pi;

    ZeroMemory(&si, sizeof(si));
    si.cb = sizeof(si);
    ZeroMemory(&pi, sizeof(pi));

    // 创建新进程
    if (!CreateProcess(nullptr,   // No module name (use command line)
        "C:\\Windows\\System32\\notepad.exe", // Command line
        nullptr,           // Process handle not inheritable
        nullptr,           // Thread handle not inheritable
        FALSE,             // Set handle inheritance to FALSE
        0,                 // No creation flags
        nullptr,           // Use parent's environment block
        nullptr,           // Use parent's starting directory 
        &si,               // Pointer to STARTUPINFO structure
        &pi)               // Pointer to PROCESS_INFORMATION structure
    ) {
        std::cerr << "CreateProcess failed (" << GetLastError() << ").\n";
        return 1;
    }

    // 等待子进程结束
    WaitForSingleObject(pi.hProcess, INFINITE);

    // 关闭进程和线程句柄
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    return 0;
}
```

在这个示例中，`CreateProcess` 函数创建一个新进程。`WaitForSingleObject` 函数等待子进程结束。`CloseHandle` 函数关闭进程和线程句柄。

### 使用 Boost.Process 库（跨平台）

Boost.Process 是一个跨平台的库，提供了统一的接口来创建和管理进程。需要先安装 Boost 库。

#### 安装 Boost 库

可以通过包管理器或从 Boost 官网下载和安装 Boost 库。

#### 示例：使用 Boost.Process 创建和管理进程

```cpp
#include <boost/process.hpp>
#include <iostream>

namespace bp = boost::process;

int main() {
    try {
        bp::ipstream is;
        bp::child c("ls", bp::std_out > is);

        std::string line;
        while (std::getline(is, line) && !line.empty()) {
            std::cout << line << std::endl;
        }

        c.wait(); // 等待进程结束
    } catch (const std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    return 0;
}
```

在这个示例中，使用 `boost::process::child` 创建一个新进程，并使用 `boost::process::ipstream` 获取子进程的输出。`c.wait()` 等待子进程结束。


## 线程

在 C++11 及其后续版本中，标准库引入了多线程支持，包括 `std::thread` 类和其他相关的同步机制。C++ 的多线程库提供了丰富的工具来创建和管理线程，以及在线程之间同步数据。

### 1. 创建和管理线程

#### 1.1 基本的线程创建

使用 `std::thread` 类可以轻松创建和管理线程。

```cpp
#include <iostream>
#include <thread>

void print_message(const std::string& message) {
    std::cout << message << std::endl;
}

int main() {
    std::thread t(print_message, "Hello from thread!");
    t.join(); // 等待线程结束
    return 0;
}
```

#### 1.2 使用 lambda 表达式创建线程

可以使用 lambda 表达式来创建线程，而不需要单独定义函数。

```cpp
#include <iostream>
#include <thread>

int main() {
    std::thread t([]{
        std::cout << "Hello from lambda thread!" << std::endl;
    });
    t.join(); // 等待线程结束
    return 0;
}
```

#### 1.3 线程分离

使用 `detach` 方法将线程从当前线程分离，使其在后台运行。

```cpp
#include <iostream>
#include <thread>
#include <chrono>

void background_task() {
    std::this_thread::sleep_for(std::chrono::seconds(2));
    std::cout << "Background task finished!" << std::endl;
}

int main() {
    std::thread t(background_task);
    t.detach(); // 分离线程
    std::cout << "Main thread continues..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(3)); // 等待背景任务完成
    return 0;
}
```

### 2. 数据共享与同步

#### 2.1 使用 `std::mutex` 互斥锁

互斥锁用于保护共享数据免受多线程同时访问的影响。

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;
int counter = 0;

void increment() {
    for (int i = 0; i < 10000; ++i) {
        std::lock_guard<std::mutex> lock(mtx);
        ++counter;
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);

    t1.join();
    t2.join();

    std::cout << "Final counter value: " << counter << std::endl;
    return 0;
}
```

#### 2.2 使用 `std::lock_guard` 和 `std::unique_lock`

`std::lock_guard` 和 `std::unique_lock` 是管理互斥锁的 RAII 方式。

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void print_with_lock_guard(const std::string& message) {
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << message << std::endl;
}

void print_with_unique_lock(const std::string& message) {
    std::unique_lock<std::mutex> lock(mtx);
    std::cout << message << std::endl;
}

int main() {
    std::thread t1(print_with_lock_guard, "Hello from lock_guard!");
    std::thread t2(print_with_unique_lock, "Hello from unique_lock!");

    t1.join();
    t2.join();

    return 0;
}
```

#### 2.3 使用 `std::condition_variable` 条件变量

条件变量用于在线程之间同步事件。

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void print_message() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; }); // 等待 ready 变为 true
    std::cout << "Hello from the other thread!" << std::endl;
}

int main() {
    std::thread t(print_message);

    std::this_thread::sleep_for(std::chrono::seconds(1));

    {
        std::lock_guard<std::mutex> lock(mtx);
        ready = true;
    }
    cv.notify_one(); // 通知等待线程

    t.join();
    return 0;
}
```

### 3. 使用 `std::future` 和 `std::async`

`std::future` 和 `std::async` 提供了一种便捷的方式来启动异步任务并获取其结果。

#### 示例：异步任务

```cpp
#include <iostream>
#include <future>

int compute_square(int x) {
    return x * x;
}

int main() {
    std::future<int> result = std::async(std::launch::async, compute_square, 5);

    std::cout << "Computing square..." << std::endl;
    std::cout << "Result: " << result.get() << std::endl; // 等待并获取结果

    return 0;
}
```

### 4. 使用 `std::thread::hardware_concurrency`

`std::thread::hardware_concurrency` 可以获取系统支持的并发线程数量。

#### 示例

```cpp
#include <iostream>
#include <thread>

int main() {
    unsigned int n = std::thread::hardware_concurrency();
    std::cout << "Number of concurrent threads supported: " << n << std::endl;
    return 0;
}
```

## 协程

C++20 引入了协程（Coroutines），这是一种用于编写异步代码和生成器的语言特性。协程允许函数在执行过程中暂停和恢复，使得编写复杂的异步操作和生成序列变得更加简洁和高效。

### 协程的基本概念

- **协程**：可以暂停和恢复的函数。
- **协程句柄（coroutine handle）**：用于控制协程的对象。
- **协程承诺（promise）**：管理协程状态的对象。

### 示例：生成器

生成器是一个典型的协程用例，可以逐步生成序列中的每个值。

#### 生成器示例

```cpp
#include <iostream>
#include <coroutine>
#include <memory>

// 定义一个协程类型
template<typename T>
struct Generator {
    struct promise_type {
        T current_value;

        auto get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }

        std::suspend_always initial_suspend() {
            return {};
        }

        std::suspend_always final_suspend() noexcept {
            return {};
        }

        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }

        void return_void() {}
        void unhandled_exception() {
            std::exit(1);
        }
    };

    std::coroutine_handle<promise_type> handle;

    Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() {
        if (handle) handle.destroy();
    }

    bool next() {
        handle.resume();
        return !handle.done();
    }

    T value() const {
        return handle.promise().current_value;
    }
};

// 定义一个生成器协程
Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i;
    }
}

int main() {
    auto gen = range(1, 10);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    std::cout << std::endl;
    return 0;
}
```

### 示例：异步操作

协程的另一个常见用例是异步操作。使用协程可以简化异步编程，使代码看起来像同步代码。

#### 异步操作示例

```cpp
#include <iostream>
#include <coroutine>
#include <future>
#include <thread>

struct Task {
    struct promise_type {
        Task get_return_object() {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }

        std::suspend_never initial_suspend() {
            return {};
        }

        std::suspend_always final_suspend() noexcept {
            return {};
        }

        void return_void() {}
        void unhandled_exception() {
            std::exit(1);
        }
    };

    std::coroutine_handle<promise_type> handle;

    Task(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Task() {
        if (handle) handle.destroy();
    }

    void wait() const {
        handle.resume();
    }
};

Task async_print() {
    std::cout << "Start async task" << std::endl;
    co_await std::suspend_always{};
    std::cout << "Async task resumed" << std::endl;
}

int main() {
    Task task = async_print();
    std::cout << "Task created" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(2));
    task.wait();
    std::cout << "Task completed" << std::endl;
    return 0;
}
```

### 协程的核心机制

- **`co_await`**：用于等待异步操作的完成，可以在协程中暂停执行。
- **`co_yield`**：用于生成值，可以在协程中暂停并返回值。
- **`co_return`**：用于从协程中返回值。

### 协程的类型

协程的类型包括：
- **任务（Task）**：用于表示异步操作的协程。
- **生成器（Generator）**：用于生成序列的协程。

### 使用自定义 Awaiter

自定义 Awaiter 可以实现更多的控制逻辑。

#### 示例：自定义 Awaiter

```cpp
#include <iostream>
#include <coroutine>

struct MyAwaiter {
    bool await_ready() const noexcept {
        return false;
    }

    void await_suspend(std::coroutine_handle<> handle) const noexcept {
        std::cout << "Suspend coroutine" << std::endl;
        handle.resume();
    }

    void await_resume() const noexcept {
        std::cout << "Resume coroutine" << std::endl;
    }
};

struct MyTask {
    struct promise_type {
        MyTask get_return_object() {
            return MyTask{std::coroutine_handle<promise_type>::from_promise(*this)};
        }

        std::suspend_never initial_suspend() {
            return {};
        }

        std::suspend_never final_suspend() noexcept {
            return {};
        }

        void return_void() {}
        void unhandled_exception() {
            std::exit(1);
        }
    };

    std::coroutine_handle<promise_type> handle;

    MyTask(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~MyTask() {
        if (handle) handle.destroy();
    }
};

MyTask async_task() {
    std::cout << "Start async task" << std::endl;
    co_await MyAwaiter{};
    std::cout << "Async task completed" << std::endl;
}

int main() {
    async_task();
    return 0;
}
```