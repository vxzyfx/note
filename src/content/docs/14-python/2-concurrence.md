---
title: Python并发编程
---

## 多进程

Python多进程编程是指通过使用多个进程来并行执行任务，从而提高程序的执行效率和性能。Python的`multiprocessing`模块提供了一种创建和管理进程的便捷方法。以下是一个简单的多进程编程示例和一些常见的使用模式。

### 基本示例

```python
import multiprocessing
import os

def worker(num):
    """每个进程要执行的任务"""
    print(f"Worker {num} is running in process {os.getpid()}")

if __name__ == '__main__':
    processes = []
    for i in range(5):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()
    
    for p in processes:
        p.join()

    print("All processes have finished.")
```

### 使用`Pool`进行进程池管理

`Pool`对象可以管理一个进程池，通过`apply`, `map`, `starmap`等方法来分配任务。以下是一个使用`Pool`的示例：

```python
from multiprocessing import Pool

def square(n):
    return n * n

if __name__ == '__main__':
    with Pool(4) as p:
        results = p.map(square, [1, 2, 3, 4, 5])
        print(results)
```

### 共享内存

在多进程编程中，进程之间不能直接共享全局变量，但是可以通过`Value`或`Array`来共享内存。以下是一个示例：

```python
from multiprocessing import Process, Value, Array

def worker(num, shared_num, shared_arr):
    shared_num.value += num
    for i in range(len(shared_arr)):
        shared_arr[i] += num

if __name__ == '__main__':
    shared_num = Value('i', 0)
    shared_arr = Array('i', [1, 2, 3, 4, 5])
    
    processes = []
    for i in range(5):
        p = Process(target=worker, args=(i, shared_num, shared_arr))
        processes.append(p)
        p.start()
    
    for p in processes:
        p.join()

    print("shared_num:", shared_num.value)
    print("shared_arr:", list(shared_arr))
```

### 进程间通信

可以使用`Queue`, `Pipe`等方法进行进程间通信。以下是一个使用`Queue`进行进程间通信的示例：

```python
from multiprocessing import Process, Queue

def producer(q):
    for i in range(5):
        q.put(i)
        print(f"Produced {i}")

def consumer(q):
    while not q.empty():
        item = q.get()
        print(f"Consumed {item}")

if __name__ == '__main__':
    q = Queue()
    
    p1 = Process(target=producer, args=(q,))
    p2 = Process(target=consumer, args=(q,))
    
    p1.start()
    p1.join()
    
    p2.start()
    p2.join()
```

## 多线程

Python的多线程编程使用`threading`模块来创建和管理线程。与多进程不同，线程共享相同的内存空间，因此可以更轻量级地并发执行任务。以下是一些使用`threading`模块进行多线程编程的常见模式和示例。

### 基本示例

```python
import threading

def worker(num):
    """每个线程要执行的任务"""
    print(f"Worker {num} is running")

threads = []
for i in range(5):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print("All threads have finished.")
```

### 使用线程池

Python 3.2+ 提供了`concurrent.futures`模块，其中包含`ThreadPoolExecutor`，可以更方便地管理线程池。以下是一个示例：

```python
from concurrent.futures import ThreadPoolExecutor

def square(n):
    return n * n

with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(square, [1, 2, 3, 4, 5]))
    print(results)
```

### 线程同步

由于线程共享全局变量，多个线程同时访问或修改同一个变量可能会导致数据竞争问题。可以使用`Lock`对象来确保线程安全。以下是一个示例：

```python
import threading

counter = 0
lock = threading.Lock()

def increment_counter():
    global counter
    with lock:
        temp = counter
        temp += 1
        counter = temp

threads = []
for i in range(1000):
    t = threading.Thread(target=increment_counter)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print("Final counter value:", counter)
```

### 线程间通信

可以使用`Queue`模块来实现线程间通信。以下是一个示例：

```python
import threading
import queue

def producer(q):
    for i in range(5):
        q.put(i)
        print(f"Produced {i}")

def consumer(q):
    while not q.empty():
        item = q.get()
        print(f"Consumed {item}")

q = queue.Queue()
threads = []

t1 = threading.Thread(target=producer, args=(q,))
t2 = threading.Thread(target=consumer, args=(q,))

threads.append(t1)
threads.append(t2)

t1.start()
t2.start()

for t in threads:
    t.join()
```

### 使用`Thread`子类

可以通过继承`threading.Thread`类来创建线程，并重载其`run`方法。以下是一个示例：

```python
import threading

class MyThread(threading.Thread):
    def __init__(self, num):
        threading.Thread(self)
        self.num = num

    def run(self):
        print(f"Thread {self.num} is running")

threads = []
for i in range(5):
    t = MyThread(i)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print("All threads have finished.")
```

## 异步编程

Python异步编程使用`asyncio`模块，可以在单线程中实现并发，尤其适用于I/O密集型任务。通过`async`和`await`关键字，可以定义和调用异步函数。以下是一些使用`asyncio`模块进行异步编程的基本示例和常见模式。

### 基本示例

```python
import asyncio

async def worker(num):
    print(f"Worker {num} is starting")
    await asyncio.sleep(1)
    print(f"Worker {num} is finished")

async def main():
    tasks = []
    for i in range(5):
        task = asyncio.create_task(worker(i))
        tasks.append(task)
    await asyncio.gather(*tasks)

asyncio.run(main())
```

### 异步I/O操作

异步编程特别适用于I/O密集型操作，例如网络请求。以下是一个示例，展示如何使用`asyncio`进行异步I/O操作：

```python
import asyncio
import aiohttp

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = [
        "http://example.com",
        "http://example.org",
        "http://example.net",
    ]
    tasks = [asyncio.create_task(fetch(url)) for url in urls]
    results = await asyncio.gather(*tasks)
    for result in results:
        print(result)

asyncio.run(main())
```

### 异步队列

可以使用`asyncio.Queue`来实现生产者-消费者模式。以下是一个示例：

```python
import asyncio

async def producer(queue):
    for i in range(5):
        await queue.put(i)
        print(f"Produced {i}")
        await asyncio.sleep(1)

async def consumer(queue):
    while True:
        item = await queue.get()
        print(f"Consumed {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    producer_task = asyncio.create_task(producer(queue))
    consumer_task = asyncio.create_task(consumer(queue))

    await producer_task
    await queue.join()  # 等待所有的项目被处理
    consumer_task.cancel()

asyncio.run(main())
```

### 限制并发数

可以使用`asyncio.Semaphore`来限制并发任务的数量。以下是一个示例：

```python
import asyncio

async def worker(semaphore, num):
    async with semaphore:
        print(f"Worker {num} is starting")
        await asyncio.sleep(1)
        print(f"Worker {num} is finished")

async def main():
    semaphore = asyncio.Semaphore(2)  # 同时最多运行两个任务
    tasks = [asyncio.create_task(worker(semaphore, i)) for i in range(5)]
    await asyncio.gather(*tasks)

asyncio.run(main())
```

### 使用`async`和`await`定义异步函数

以下是如何使用`async`和`await`关键字定义和调用异步函数的示例：

```python
import asyncio

async def say_hello():
    await asyncio.sleep(1)
    print("Hello")

async def main():
    await say_hello()

asyncio.run(main())
```
