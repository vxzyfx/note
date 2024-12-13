---
title: Java并发编程
---

## 多进程

在 Java 中，多线程编程是实现并发任务的主要方式，而多进程编程相对较少使用。然而，有时需要启动和管理多个进程，例如在分布式系统或需要隔离执行环境时。

### 启动和管理多进程

Java 提供了 `Process` 和 `ProcessBuilder` 类来启动和管理外部进程。以下是一些基本用法示例：

#### 使用 `Runtime.getRuntime().exec()`

```java
public class MultiProcessExample {
    public static void main(String[] args) {
        try {
            // 启动一个外部进程
            Process process = Runtime.getRuntime().exec("ping -c 3 www.google.com");

            // 等待进程完成并获取退出值
            int exitCode = process.waitFor();
            System.out.println("Process exited with code: " + exitCode);

            // 读取进程的输出
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

#### 使用 `ProcessBuilder`

`ProcessBuilder` 提供了更强大的功能和更好的控制来启动和管理进程。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class MultiProcessExample {
    public static void main(String[] args) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("ping", "-c", "3", "www.google.com");

        try {
            // 启动进程
            Process process = processBuilder.start();

            // 读取进程的输出
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }

            // 等待进程完成并获取退出值
            int exitCode = process.waitFor();
            System.out.println("Process exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### 处理多个进程

在实际应用中，可能需要同时启动和管理多个进程。这可以通过循环或线程来实现，以便并发地启动和管理多个进程。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class MultiProcessExample {
    public static void main(String[] args) {
        List<String> commands = Arrays.asList("ping -c 3 www.google.com", "ping -c 3 www.bing.com");

        for (String command : commands) {
            new Thread(() -> {
                try {
                    // 使用 ProcessBuilder 启动进程
                    ProcessBuilder processBuilder = new ProcessBuilder(command.split(" "));
                    Process process = processBuilder.start();

                    // 读取进程的输出
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            System.out.println(line);
                        }
                    }

                    // 等待进程完成并获取退出值
                    int exitCode = process.waitFor();
                    System.out.println("Process exited with code: " + exitCode);
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

### 多进程通信

对于进程间通信（IPC），Java 提供了多种方式，包括使用标准输入输出流、文件、数据库等。常用的方法是通过进程的标准输入输出流来实现简单的通信。

#### 示例：父进程向子进程发送数据

```java
import java.io.*;

public class ParentChildProcessExample {
    public static void main(String[] args) {
        try {
            // 启动子进程
            ProcessBuilder processBuilder = new ProcessBuilder("java", "ChildProcess");
            Process process = processBuilder.start();

            // 向子进程发送数据
            try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()))) {
                writer.write("Hello from parent process");
                writer.newLine();
                writer.flush();
            }

            // 读取子进程的输出
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("Parent received: " + line);
                }
            }

            // 等待子进程完成
            int exitCode = process.waitFor();
            System.out.println("Child process exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

// 子进程代码
class ChildProcess {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Child received: " + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 多线程

在 Java 中，多线程编程是通过 `java.lang.Thread` 类和 `java.util.concurrent` 包来实现的。多线程允许程序同时执行多个任务，从而提高程序的性能和响应能力。以下是 Java 多线程编程的一些关键概念和用法。

### 创建和启动线程

有两种主要方式创建线程：

1. 继承 `Thread` 类
2. 实现 `Runnable` 接口

#### 继承 `Thread` 类

```java
public class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running");
    }

    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // 启动线程，调用 run() 方法
    }
}
```

#### 实现 `Runnable` 接口

```java
public class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Thread is running");
    }

    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start(); // 启动线程，调用 run() 方法
    }
}
```

### 线程的生命周期

线程的生命周期包括以下几个状态：

- **新建（New）**：线程对象被创建，但还未调用 `start()` 方法。
- **就绪（Runnable）**：调用 `start()` 方法后，线程进入就绪状态，等待 CPU 调度。
- **运行（Running）**：线程获取 CPU 时间片后开始执行 `run()` 方法。
- **阻塞（Blocked）**：线程由于某种原因进入阻塞状态，等待特定条件（如锁、I/O 完成等）。
- **死亡（Dead）**：线程执行完 `run()` 方法或被中断后，进入死亡状态。

### 线程同步

为了避免多个线程同时访问共享资源导致数据不一致问题，需要进行线程同步。Java 提供了多种同步机制。

#### 同步方法

使用 `synchronized` 关键字修饰方法，确保同一时刻只有一个线程可以执行该方法。

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

public class SynchronizedMethodExample {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        };

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("Final count: " + counter.getCount());
    }
}
```

#### 同步代码块

使用 `synchronized` 关键字修饰代码块，指定锁对象，控制对共享资源的访问。

```java
class Counter {
    private int count = 0;

    public void increment() {
        synchronized (this) {
            count++;
        }
    }

    public int getCount() {
        return count;
    }
}

public class SynchronizedBlockExample {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        };

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("Final count: " + counter.getCount());
    }
}
```

### 线程通信

线程之间可以通过 `wait()`、`notify()` 和 `notifyAll()` 方法进行通信，这些方法必须在同步代码块或方法中调用。

```java
class SharedResource {
    private int value;
    private boolean available = false;

    public synchronized void produce(int value) throws InterruptedException {
        while (available) {
            wait();
        }
        this.value = value;
        available = true;
        notify();
    }

    public synchronized int consume() throws InterruptedException {
        while (!available) {
            wait();
        }
        available = false;
        notify();
        return value;
    }
}

public class ThreadCommunicationExample {
    public static void main(String[] args) {
        SharedResource resource = new SharedResource();

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    resource.produce(i);
                    System.out.println("Produced: " + i);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    int value = resource.consume();
                    System.out.println("Consumed: " + value);
                    Thread.sleep(1500);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}
```

### 高级线程管理

Java `java.util.concurrent` 包提供了高级的并发工具，如线程池、信号量、阻塞队列等。

#### 线程池

线程池通过 `ExecutorService` 接口实现，可以更高效地管理和复用线程。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        for (int i = 0; i < 10; i++) {
            Runnable task = () -> {
                System.out.println("Thread: " + Thread.currentThread().getName() + " is running");
            };
            executor.submit(task);
        }

        executor.shutdown();
    }
}
```

## Future异步编程

异步编程是一种编程范式，它允许程序在等待某些操作（如 I/O 操作、网络请求等）完成时，不会阻塞主线程或其他线程，从而提高程序的响应性和性能。在 Java 中，异步编程通常使用 `Future`、`CompletableFuture` 和其他并发工具来实现。

### 使用 `Future` 和 `ExecutorService`

`Future` 是 Java 中用于表示异步计算结果的接口，可以通过 `ExecutorService` 提交任务来获取 `Future` 对象。

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class FutureExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Callable<Integer> task = () -> {
            Thread.sleep(1000);
            return 123;
        };

        Future<Integer> future = executor.submit(task);

        try {
            // 执行其他任务
            System.out.println("Doing other tasks...");

            // 获取异步结果
            Integer result = future.get();
            System.out.println("Result: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
    }
}
```

### 使用 `CompletableFuture`

`CompletableFuture` 是 Java 8 引入的更强大的异步编程工具，支持链式调用和组合多个异步操作。

#### 基本使用

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 123;
        });

        try {
            // 执行其他任务
            System.out.println("Doing other tasks...");

            // 获取异步结果
            Integer result = future.get();
            System.out.println("Result: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

#### 链式调用

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureChainExample {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 123;
        }).thenApply(result -> result * 2)
          .thenAccept(result -> System.out.println("Result: " + result))
          .join(); // 阻塞等待所有阶段完成
    }
}
```

#### 组合多个异步操作

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureCombineExample {
    public static void main(String[] args) {
        CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 123;
        });

        CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 456;
        });

        future1.thenCombine(future2, Integer::sum)
               .thenAccept(result -> System.out.println("Combined Result: " + result))
               .join(); // 阻塞等待所有阶段完成
    }
}
```

### 异步异常处理

`CompletableFuture` 支持异步异常处理，可以使用 `exceptionally` 方法处理异常。

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureExceptionHandlingExample {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            if (true) {
                throw new RuntimeException("Something went wrong!");
            }
            return 123;
        }).exceptionally(ex -> {
            System.out.println("Exception: " + ex.getMessage());
            return null; // 返回一个默认值或 null
        }).thenAccept(result -> {
            if (result != null) {
                System.out.println("Result: " + result);
            }
        }).join(); // 阻塞等待所有阶段完成
    }
}
```

### 使用 `Executor` 自定义线程池

可以通过 `Executor` 接口为 `CompletableFuture` 提供自定义线程池。

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CompletableFutureWithCustomExecutorExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 123;
        }, executor).thenApplyAsync(result -> result * 2, executor)
          .thenAcceptAsync(result -> System.out.println("Result: " + result), executor)
          .join(); // 阻塞等待所有阶段完成

        executor.shutdown();
    }
}
```

## 虚拟线程

Java 虚拟线程（Virtual Threads）是 Project Loom 引入的一种新型线程实现，旨在简化并发编程并提高程序的并发性能。虚拟线程提供了轻量级的线程模型，使每个任务可以运行在自己的线程中，而不会产生传统线程的高昂开销。

### 什么是虚拟线程

虚拟线程与传统的操作系统线程不同，它们是由 JVM 管理的，具有更低的创建和上下文切换成本。虚拟线程在 JVM 内部被映射到更少的操作系统线程上，从而实现高效的并发处理。

### 创建和使用虚拟线程

虚拟线程的创建和使用与传统线程类似，但更加轻量级。以下是一些示例代码，展示了如何创建和使用虚拟线程。

#### 创建虚拟线程

```java
import java.util.concurrent.Executors;

public class VirtualThreadExample {
    public static void main(String[] args) {
        var executor = Executors.newVirtualThreadPerTaskExecutor();

        executor.execute(() -> {
            System.out.println("Hello from virtual thread");
        });

        executor.shutdown();
    }
}
```

在这个示例中，我们使用 `Executors.newVirtualThreadPerTaskExecutor()` 创建了一个虚拟线程执行器，然后在虚拟线程中执行任务。

#### 使用虚拟线程运行大量并发任务

虚拟线程特别适合运行大量并发任务，例如处理 I/O 密集型任务。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class VirtualThreadExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

        for (int i = 0; i < 10000; i++) {
            executor.submit(() -> {
                try {
                    Thread.sleep(1000); // 模拟 I/O 操作
                    System.out.println("Task completed by " + Thread.currentThread());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        executor.shutdown();
    }
}
```

在这个示例中，我们使用虚拟线程执行了 10000 个并发任务，每个任务在执行时都会睡眠 1 秒，模拟 I/O 操作。虚拟线程的低开销使得同时运行大量任务成为可能。

### 对比传统线程

与传统线程相比，虚拟线程具有以下优点：

1. **低开销**：虚拟线程的创建和上下文切换成本低，可以支持大量并发任务。
2. **简化并发编程**：虚拟线程使得每个任务运行在自己的线程中，简化了编写并发代码的复杂性。
3. **资源利用率高**：由于虚拟线程是由 JVM 管理的，可以更高效地利用系统资源。

### 注意事项

虽然虚拟线程带来了很多优点，但在使用时仍需注意以下几点：

1. **限制和兼容性**：虚拟线程是 Java 新特性，需要确保使用的 JVM 版本支持虚拟线程。
2. **线程安全**：尽管虚拟线程简化了并发编程，但编写并发代码时仍需注意线程安全问题，如共享数据的访问控制。
3. **性能调优**：在某些场景下，虚拟线程的性能可能需要进一步调优，例如调整线程池的大小和任务的划分。
