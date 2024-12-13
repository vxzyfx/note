---
title: 数学, 容器适配器, 智能指针
---

## 数学库

C++ 标准库提供了丰富的数学函数库，用于执行各种数学运算。这些函数主要定义在 `<cmath>` 头文件中，此外还有一些特定的数学功能分布在 `<cstdlib>`、`<complex>` 等头文件中。以下是 C++ 数学库的详细介绍和一些常见操作。

### 1. 基本数学函数（<cmath>）

`<cmath>` 头文件提供了常用的数学函数，如三角函数、指数函数、对数函数、幂函数、舍入函数等。

#### 三角函数

- `sin`：正弦函数
- `cos`：余弦函数
- `tan`：正切函数
- `asin`：反正弦函数
- `acos`：反余弦函数
- `atan`：反正切函数
- `atan2`：返回给定 x 和 y 坐标的点的极坐标角度

```cpp
#include <iostream>
#include <cmath>

int main() {
    double angle = 45.0;
    double radians = angle * M_PI / 180.0;

    std::cout << "sin(45) = " << std::sin(radians) << std::endl;
    std::cout << "cos(45) = " << std::cos(radians) << std::endl;
    std::cout << "tan(45) = " << std::tan(radians) << std::endl;

    return 0;
}
```

#### 指数和对数函数

- `exp`：计算 e 的 x 次幂
- `log`：计算自然对数（以 e 为底）
- `log10`：计算以 10 为底的对数
- `sqrt`：计算平方根
- `cbrt`：计算立方根
- `pow`：计算 x 的 y 次幂

```cpp
#include <iostream>
#include <cmath>

int main() {
    double x = 2.0;
    double y = 8.0;

    std::cout << "exp(2) = " << std::exp(x) << std::endl;
    std::cout << "log(8) = " << std::log(y) << std::endl;
    std::cout << "log10(8) = " << std::log10(y) << std::endl;
    std::cout << "sqrt(4) = " << std::sqrt(4.0) << std::endl;
    std::cout << "cbrt(8) = " << std::cbrt(8.0) << std::endl;
    std::cout << "pow(2, 3) = " << std::pow(2.0, 3.0) << std::endl;

    return 0;
}
```

#### 舍入和取整函数

- `ceil`：向上取整
- `floor`：向下取整
- `round`：四舍五入
- `trunc`：截断小数部分

```cpp
#include <iostream>
#include <cmath>

int main() {
    double x = 3.14;
    double y = 2.718;

    std::cout << "ceil(3.14) = " << std::ceil(x) << std::endl;
    std::cout << "floor(3.14) = " << std::floor(x) << std::endl;
    std::cout << "round(3.14) = " << std::round(x) << std::endl;
    std::cout << "trunc(3.14) = " << std::trunc(x) << std::endl;

    return 0;
}
```

#### 其他常用数学函数

- `fabs`：计算绝对值
- `fmod`：计算浮点数取模
- `hypot`：计算欧几里得范数，即 sqrt(x*x + y*y)

```cpp
#include <iostream>
#include <cmath>

int main() {
    double x = -3.14;
    double y = 2.5;

    std::cout << "fabs(-3.14) = " << std::fabs(x) << std::endl;
    std::cout << "fmod(3.14, 2.0) = " << std::fmod(3.14, 2.0) << std::endl;
    std::cout << "hypot(3, 4) = " << std::hypot(3.0, 4.0) << std::endl;

    return 0;
}
```

### 2. 随机数生成（<cstdlib>）

`<cstdlib>` 头文件提供了随机数生成函数，如 `rand` 和 `srand`。

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));

    for (int i = 0; i < 5; ++i) {
        std::cout << "Random number " << i + 1 << ": " << std::rand() << std::endl;
    }

    return 0;
}
```

### 3. 复数运算（<complex>）

`<complex>` 头文件提供了用于复数运算的类模板 `std::complex` 及相关函数。

```cpp
#include <iostream>
#include <complex>

int main() {
    std::complex<double> c1(1.0, 2.0);
    std::complex<double> c2(2.0, 1.0);

    std::complex<double> c3 = c1 + c2;
    std::complex<double> c4 = c1 * c2;

    std::cout << "c1 + c2 = " << c3 << std::endl;
    std::cout << "c1 * c2 = " << c4 << std::endl;
    std::cout << "abs(c1) = " << std::abs(c1) << std::endl;
    std::cout << "arg(c1) = " << std::arg(c1) << std::endl;
    std::cout << "norm(c1) = " << std::norm(c1) << std::endl;
    std::cout << "conj(c1) = " << std::conj(c1) << std::endl;

    return 0;
}
```

### 4. 数学常量（C++20 引入）

C++20 引入了 `<numbers>` 头文件，提供了一些常用的数学常量。

```cpp
#include <iostream>
#include <numbers>

int main() {
    std::cout << "Pi = " << std::numbers::pi << std::endl;
    std::cout << "Euler's number (e) = " << std::numbers::e << std::endl;
    std::cout << "Golden ratio = " << std::numbers::phi << std::endl;

    return 0;
}
```

## 容器适配器

在 C++ 标准模板库（STL）中，容器适配器（Container Adapters）是一组用于修改或限制其他标准容器接口的类模板。容器适配器本质上是对基础容器进行封装，提供不同的接口或行为，使其更符合特定的需求。C++ 提供了三种主要的容器适配器：`stack`、`queue` 和 `priority_queue`。

### 1. `stack`

`stack` 是一种后进先出（LIFO, Last-In-First-Out）的数据结构，只允许在栈顶进行插入和删除操作。`stack` 默认使用 `deque` 作为底层容器，但也可以使用 `vector` 或 `list`。

#### 常用成员函数

- `push`：向栈顶添加元素。
- `pop`：移除栈顶元素。
- `top`：返回栈顶元素。
- `empty`：检查栈是否为空。
- `size`：返回栈中元素的个数。

#### 示例

```cpp
#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;

    s.push(10);
    s.push(20);
    s.push(30);

    std::cout << "Stack size: " << s.size() << std::endl;

    while (!s.empty()) {
        std::cout << "Top element: " << s.top() << std::endl;
        s.pop();
    }

    return 0;
}
```

### 2. `queue`

`queue` 是一种先进先出（FIFO, First-In-First-Out）的数据结构，只允许在队列的末尾插入元素，在队列的前端移除元素。`queue` 默认使用 `deque` 作为底层容器，但也可以使用 `list`。

#### 常用成员函数

- `push`：向队列末尾添加元素。
- `pop`：移除队列前端元素。
- `front`：返回队列前端元素。
- `back`：返回队列末尾元素。
- `empty`：检查队列是否为空。
- `size`：返回队列中元素的个数。

#### 示例

```cpp
#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;

    q.push(10);
    q.push(20);
    q.push(30);

    std::cout << "Queue size: " << q.size() << std::endl;

    while (!q.empty()) {
        std::cout << "Front element: " << q.front() << std::endl;
        q.pop();
    }

    return 0;
}
```

### 3. `priority_queue`

`priority_queue` 是一种优先级队列，元素按优先级顺序排序（默认是最大优先级在前）。`priority_queue` 默认使用 `vector` 作为底层容器，并使用 `std::make_heap`、`std::push_heap` 和 `std::pop_heap` 维护堆的性质。

#### 常用成员函数

- `push`：向优先级队列中添加元素。
- `pop`：移除优先级最高的元素。
- `top`：返回优先级最高的元素。
- `empty`：检查优先级队列是否为空。
- `size`：返回优先级队列中元素的个数。

#### 示例

```cpp
#include <iostream>
#include <queue>
#include <vector>

int main() {
    std::priority_queue<int> pq;

    pq.push(30);
    pq.push(10);
    pq.push(20);

    std::cout << "Priority queue size: " << pq.size() << std::endl;

    while (!pq.empty()) {
        std::cout << "Top element: " << pq.top() << std::endl;
        pq.pop();
    }

    return 0;
}
```

### 4. 自定义比较函数的 `priority_queue`

可以通过提供自定义比较函数来改变 `priority_queue` 的排序行为，例如将其变为最小优先级队列。

#### 示例

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <functional>

int main() {
    // 使用 greater<int> 创建最小优先级队列
    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;

    pq.push(30);
    pq.push(10);
    pq.push(20);

    std::cout << "Priority queue size: " << pq.size() << std::endl;

    while (!pq.empty()) {
        std::cout << "Top element: " << pq.top() << std::endl;
        pq.pop();
    }

    return 0;
}
```

## 智能指针

在 C++ 中，智能指针是一种用于自动管理动态分配内存的工具，它通过自动管理对象的生命周期来防止内存泄漏和未定义行为。C++11 标准引入了三种主要的智能指针：`std::unique_ptr`、`std::shared_ptr` 和 `std::weak_ptr`。它们都在 `<memory>` 头文件中定义。

### 1. `std::unique_ptr`

`std::unique_ptr` 是一种独占所有权的智能指针，表示某一时刻只有一个智能指针可以拥有所指向对象的所有权。它不能被复制，但可以通过移动语义转移所有权。

#### 主要成员函数

- `operator*` 和 `operator->`：访问所指向的对象。
- `get`：返回原始指针。
- `release`：放弃所有权并返回原始指针。
- `reset`：释放当前对象并可选择重新管理一个新对象。

#### 示例

```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> ptr1 = std::make_unique<int>(10);
    std::cout << "Value: " << *ptr1 << std::endl;

    // 转移所有权
    std::unique_ptr<int> ptr2 = std::move(ptr1);
    if (ptr1 == nullptr) {
        std::cout << "ptr1 is null" << std::endl;
    }
    std::cout << "Value: " << *ptr2 << std::endl;

    // 重置指针
    ptr2.reset();
    if (ptr2 == nullptr) {
        std::cout << "ptr2 is null" << std::endl;
    }

    return 0;
}
```

### 2. `std::shared_ptr`

`std::shared_ptr` 是一种共享所有权的智能指针，多个智能指针可以共享同一个对象。当最后一个共享所有权的智能指针被销毁时，对象才会被释放。

#### 主要成员函数

- `operator*` 和 `operator->`：访问所指向的对象。
- `get`：返回原始指针。
- `use_count`：返回共享的智能指针数量。
- `reset`：释放当前对象并可选择重新管理一个新对象。

#### 示例

```cpp
#include <iostream>
#include <memory>

int main() {
    std::shared_ptr<int> ptr1 = std::make_shared<int>(20);
    std::cout << "Value: " << *ptr1 << std::endl;
    std::cout << "Use count: " << ptr1.use_count() << std::endl;

    {
        std::shared_ptr<int> ptr2 = ptr1;
        std::cout << "Value: " << *ptr2 << std::endl;
        std::cout << "Use count: " << ptr1.use_count() << std::endl;
    }

    std::cout << "Use count after ptr2 is out of scope: " << ptr1.use_count() << std::endl;

    return 0;
}
```

### 3. `std::weak_ptr`

`std::weak_ptr` 是一种不控制对象生命周期的智能指针，它必须与 `std::shared_ptr` 一起使用。`std::weak_ptr` 主要用于打破循环引用，因为它不增加引用计数。

#### 主要成员函数

- `lock`：创建一个 `std::shared_ptr`，如果对象已经被销毁，返回一个空的 `std::shared_ptr`。
- `expired`：检查对象是否已被销毁。
- `use_count`：返回共享的智能指针数量。

#### 示例

```cpp
#include <iostream>
#include <memory>

int main() {
    std::shared_ptr<int> sptr = std::make_shared<int>(30);
    std::weak_ptr<int> wptr = sptr;

    std::cout << "Use count: " << sptr.use_count() << std::endl;

    if (auto temp_sptr = wptr.lock()) {
        std::cout << "Value: " << *temp_sptr << std::endl;
        std::cout << "Use count: " << temp_sptr.use_count() << std::endl;
    } else {
        std::cout << "The object has been destroyed." << std::endl;
    }

    sptr.reset();
    if (wptr.expired()) {
        std::cout << "The object has been destroyed." << std::endl;
    }

    return 0;
}
```

### 使用场景

- **`std::unique_ptr`**：适用于唯一所有权的资源管理，如动态分配的数组或对象，避免内存泄漏。
- **`std::shared_ptr`**：适用于需要共享所有权的资源管理，如共享的资源或对象池。
- **`std::weak_ptr`**：适用于打破循环引用，辅助 `std::shared_ptr` 管理对象生命周期。
