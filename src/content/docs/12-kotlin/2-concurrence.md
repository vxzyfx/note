---
title: Kotlin并发编程
---

## 进程

多进程编程是一种将任务分割成多个独立进程运行的方法，在多核处理器上特别有用。Kotlin 本身没有直接的多进程支持，但可以利用 Java 的多线程和并发框架实现多进程编程。

Kotlin 的协程提供了一种轻量级的并发方式，但对于真正的多进程，可以使用 Java 的 `ProcessBuilder` 类来创建和管理进程。

### 使用 `ProcessBuilder` 创建新进程

以下是一个简单的示例，展示了如何在 Kotlin 中使用 `ProcessBuilder` 创建一个新进程。

```kotlin
fun main() {
    try {
        val processBuilder = ProcessBuilder("ping", "-c", "3", "google.com")
        processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT)
        processBuilder.redirectError(ProcessBuilder.Redirect.INHERIT)

        val process = processBuilder.start()
        val exitCode = process.waitFor()
        println("Process exited with code: $exitCode")
    } catch (e: Exception) {
        e.printStackTrace()
    }
}
```

在这个示例中，`ProcessBuilder` 被用来运行 `ping` 命令，并将输出和错误流重定向到父进程的输出和错误流。

### 多进程编程示例

下面是一个更复杂的示例，展示了如何使用 `ProcessBuilder` 创建多个进程，并管理它们的输入输出。

```kotlin
import java.io.BufferedReader
import java.io.InputStreamReader

fun main() {
    val commands = listOf("ping -c 3 google.com", "ping -c 3 yahoo.com")

    val processes = commands.map { command ->
        val processBuilder = ProcessBuilder(command.split(" "))
        processBuilder.start()
    }

    processes.forEach { process ->
        BufferedReader(InputStreamReader(process.inputStream)).use { reader ->
            var line: String?
            while (reader.readLine().also { line = it } != null) {
                println(line)
            }
        }
        val exitCode = process.waitFor()
        println("Process exited with code: $exitCode")
    }
}
```

### 多线程编程

虽然上面的示例展示了多进程编程，但在许多情况下，多线程编程可能是更合适的选择。Kotlin 的协程提供了一种简单而强大的并发编程方式。

#### 使用协程进行并发编程

Kotlin 协程是一个轻量级的并发框架，允许你编写异步代码。

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job1 = launch {
        repeat(3) { i ->
            println("Ping $i from job1")
            delay(1000L)
        }
    }

    val job2 = launch {
        repeat(3) { i ->
            println("Ping $i from job2")
            delay(1000L)
        }
    }

    job1.join()
    job2.join()
}
```

## 线程

在 Kotlin 中，多线程编程可以通过多种方式实现，包括使用 Java 的线程、以及并发库如 `java.util.concurrent`。以下是一些实现多线程编程的方式和示例。

### 使用 Java 线程

Kotlin 作为 JVM 语言，可以直接使用 Java 的 `Thread` 类来创建和管理线程。

#### 基本用法

```kotlin
fun main() {
    val thread = Thread {
        println("Thread is running")
    }
    thread.start()
    thread.join()  // 等待线程结束
    println("Main thread is finished")
}
```

在这个示例中，创建并启动了一个新线程，该线程在运行时输出一条消息。`join` 方法确保主线程等待新线程结束后再继续执行。

### 使用 `Runnable` 接口

`Runnable` 接口可以让你将可运行的代码封装在一个对象中，然后通过 `Thread` 类执行。

```kotlin
fun main() {
    val runnable = Runnable {
        println("Runnable is running")
    }
    val thread = Thread(runnable)
    thread.start()
    thread.join()  // 等待线程结束
    println("Main thread is finished")
}
```

### 使用 `ExecutorService`

`ExecutorService` 是 `java.util.concurrent` 包中的一个框架，用于管理和调度线程池。

```kotlin
import java.util.concurrent.Executors

fun main() {
    val executor = Executors.newFixedThreadPool(2)

    val task1 = Runnable {
        println("Task 1 is running")
    }

    val task2 = Runnable {
        println("Task 2 is running")
    }

    executor.submit(task1)
    executor.submit(task2)

    executor.shutdown()  // 关闭线程池
}
```

### 线程同步

在多线程编程中，确保线程安全非常重要。可以使用 `synchronized` 块或者 `ReentrantLock` 实现线程同步。

#### 使用 `synchronized`

```kotlin
var counter = 0

fun main() {
    val threads = List(100) {
        Thread {
            synchronized(this) {
                for (i in 1..1000) {
                    counter++
                }
            }
        }
    }

    threads.forEach { it.start() }
    threads.forEach { it.join() }

    println("Counter: $counter")
}
```

#### 使用 `ReentrantLock`

```kotlin
import java.util.concurrent.locks.ReentrantLock

val lock = ReentrantLock()
var counter = 0

fun main() {
    val threads = List(100) {
        Thread {
            lock.lock()
            try {
                for (i in 1..1000) {
                    counter++
                }
            } finally {
                lock.unlock()
            }
        }
    }

    threads.forEach { it.start() }
    threads.forEach { it.join() }

    println("Counter: $counter")
}
```

### 综合示例

以下是一个综合示例，展示了使用 `ExecutorService` 和 `ReentrantLock` 进行多线程编程和线程同步。

```kotlin
import java.util.concurrent.Executors
import java.util.concurrent.locks.ReentrantLock

val lock = ReentrantLock()
var counter = 0

fun main() {
    val executor = Executors.newFixedThreadPool(10)

    val tasks = List(100) {
        Runnable {
            lock.lock()
            try {
                for (i in 1..1000) {
                    counter++
                }
            } finally {
                lock.unlock()
            }
        }
    }

    tasks.forEach { executor.submit(it) }

    executor.shutdown()
    while (!executor.isTerminated) {
        // 等待所有任务完成
    }

    println("Counter: $counter")
}
```

## 协程


Kotlin 的协程是一种轻量级的并发框架，能够简化异步编程。协程通过挂起和恢复函数的执行，实现非阻塞的并发操作。以下是 Kotlin 协程的使用方法和示例。

### 基本使用

要使用 Kotlin 协程，需要在项目中添加协程库依赖。对于 Gradle 项目，可以在 `build.gradle.kts` 文件中添加以下内容：

```groovy
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.0")
```

### 创建协程

协程可以通过 `launch` 和 `async` 等构建器来创建。

#### `launch` 构建器

`launch` 是一个用于启动新协程的构建器，它不会阻塞当前线程，并且返回一个 `Job` 对象。

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
    job.join()  // 等待协程完成
}
```

在这个示例中，`launch` 启动了一个新协程，该协程延迟 1 秒后打印 "World!"。`runBlocking` 是一个阻塞当前线程的协程构建器，常用于主函数或测试中。

#### `async` 构建器

`async` 用于启动新协程，并返回一个 `Deferred` 对象，可以通过 `await` 方法获取其结果。

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val deferred = async {
        delay(1000L)
        "World!"
    }
    println("Hello,")
    println(deferred.await())  // 获取协程结果
}
```

### 协程作用域

协程需要在某个作用域内启动。Kotlin 提供了多种协程作用域，如 `GlobalScope`、`CoroutineScope` 和 `runBlocking`。

#### `GlobalScope`

`GlobalScope` 启动的协程在整个应用程序的生命周期内运行，通常不推荐在实际应用中使用。

```kotlin
import kotlinx.coroutines.*

fun main() {
    GlobalScope.launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
    Thread.sleep(2000L)  // 等待协程完成
}
```

#### 自定义 `CoroutineScope`

使用自定义 `CoroutineScope` 可以更好地控制协程的生命周期。

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val scope = CoroutineScope(Dispatchers.Default)

    scope.launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
    delay(2000L)  // 等待协程完成
}
```

### 协程上下文和调度器

协程上下文和调度器决定了协程在哪个线程或线程池中执行。常用的调度器有 `Dispatchers.Default`、`Dispatchers.IO` 和 `Dispatchers.Main`。

#### 调度器示例

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch(Dispatchers.Default) {
        println("Default dispatcher - Thread: ${Thread.currentThread().name}")
    }

    launch(Dispatchers.IO) {
        println("IO dispatcher - Thread: ${Thread.currentThread().name}")
    }

    launch(Dispatchers.Main) {
        println("Main dispatcher - Thread: ${Thread.currentThread().name}")
    }
}
```

### 协程取消和超时

协程可以通过 `Job` 对象取消，也可以使用 `withTimeout` 设置超时。

#### 取消协程

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        repeat(1000) { i ->
            println("Job: $i")
            delay(500L)
        }
    }
    delay(2000L)  // 等待一段时间
    println("Canceling job")
    job.cancelAndJoin()  // 取消并等待协程完成
    println("Job cancelled")
}
```

#### 协程超时

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    try {
        withTimeout(2000L) {
            repeat(1000) { i ->
                println("Job: $i")
                delay(500L)
            }
        }
    } catch (e: TimeoutCancellationException) {
        println("Timed out")
    }
}
```

### 使用通道进行协程间通信

通道是一种用于协程之间通信的方式，类似于阻塞队列。

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.Channel

fun main() = runBlocking {
    val channel = Channel<Int>()

    launch {
        for (x in 1..5) {
            channel.send(x * x)
        }
        channel.close()
    }

    for (y in channel) {
        println(y)
    }
}
```

### 综合示例

以下是一个综合示例，展示了协程的基本用法、调度器、取消和超时。

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job1 = launch(Dispatchers.Default) {
        repeat(5) { i ->
            println("Job1: $i - Thread: ${Thread.currentThread().name}")
            delay(500L)
        }
    }

    val job2 = async(Dispatchers.IO) {
        delay(2000L)
        "Result from job2 - Thread: ${Thread.currentThread().name}"
    }

    val job3 = launch {
        withTimeout(1500L) {
            repeat(5) { i ->
                println("Job3: $i - Thread: ${Thread.currentThread().name}")
                delay(500L)
            }
        }
    }

    println("Waiting for job2 result: ${job2.await()}")
    job1.join()
    job3.join()
}
```
