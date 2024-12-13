---
title: STD 标准库
---

C++ 标准库（C++ Standard Library）是一个集合，包含了众多通用的类和函数，提供了处理数据结构、算法、输入输出等功能的基础。C++ 标准库的主要部分包括：

### 1. 标准模板库（STL）

#### 容器（Containers）

容器是用于存储和管理对象的类模板。主要包括：

- **顺序容器（Sequence Containers）**
  - `vector`：动态数组
  - `deque`：双端队列
  - `list`：双向链表
  - `array`：固定大小数组（C++11 引入）
  - `forward_list`：单向链表（C++11 引入)

- **关联容器（Associative Containers）**
  - `set`：集合
  - `multiset`：允许重复元素的集合
  - `map`：键值对集合（字典）
  - `multimap`：允许重复键的键值对集合

- **无序容器（Unordered Containers，C++11 引入）**
  - `unordered_set`：哈希集合
  - `unordered_multiset`：允许重复元素的哈希集合
  - `unordered_map`：哈希表
  - `unordered_multimap`：允许重复键的哈希表

#### 算法（Algorithms）

STL 提供了一组常用的算法，用于操作容器中的元素。主要包括：

- 排序算法：`sort`、`partial_sort`、`nth_element`
- 结构修改：`copy`、`move`、`swap`、`replace`
- 元素操作：`for_each`、`find`、`accumulate`
- 其他算法：`binary_search`、`merge`、`unique`

#### 迭代器（Iterators）

迭代器是用于遍历容器元素的对象。主要类型包括：

- 输入迭代器（Input Iterator）
- 输出迭代器（Output Iterator）
- 前向迭代器（Forward Iterator）
- 双向迭代器（Bidirectional Iterator）
- 随机访问迭代器（Random Access Iterator）

### 2. 输入输出库（IOStream Library）

提供处理输入输出操作的类和对象。主要包括：

- `iostream`：标准输入输出流
- `istream`：输入流
- `ostream`：输出流
- `ifstream`：文件输入流
- `ofstream`：文件输出流
- `stringstream`：字符串流

### 3. 字符串库（String Library）

提供处理字符串的类和函数。主要包括：

- `string`：标准字符串类
- `wstring`：宽字符字符串类（处理多字节字符）

### 4. 正则表达式库（Regular Expressions, C++11 引入）

提供处理正则表达式的类和函数。主要包括：

- `regex`：正则表达式类
- `smatch`：匹配结果类
- `regex_match`、`regex_search`、`regex_replace`：正则表达式相关函数

### 5. 时间库（Chrono Library, C++11 引入）

提供处理时间和日期的类和函数。主要包括：

- `chrono::duration`：时间段
- `chrono::time_point`：时间点
- `chrono::system_clock`、`chrono::steady_clock`：时钟类

### 6. 多线程库（Thread Library, C++11 引入）

提供处理多线程编程的类和函数。主要包括：

- `thread`：线程类
- `mutex`、`recursive_mutex`：互斥锁
- `lock_guard`、`unique_lock`：锁管理类
- `condition_variable`：条件变量
- `future`、`promise`、`async`：异步操作相关类和函数

### 7. 数学库（Math Library）

提供常用数学函数和数值处理工具。主要包括：

- `cmath`：数学函数（如 `sin`、`cos`、`sqrt` 等）
- `cstdlib`：标准库函数（如 `abs`、`div` 等）
- `complex`：复数类

### 8. 容器适配器（Container Adapters）

容器适配器是对已有容器进行包装，提供不同的接口。主要包括：

- `stack`：栈
- `queue`：队列
- `priority_queue`：优先队列

### 9. 智能指针库（Smart Pointers, C++11 引入）

提供自动内存管理工具。主要包括：

- `unique_ptr`：独占所有权的智能指针
- `shared_ptr`：共享所有权的智能指针
- `weak_ptr`：弱引用

### 10. 其他实用工具库（Utility Library）

包括一组通用实用工具类和函数。主要包括：

- `pair`：成对组合的类
- `tuple`：固定大小的多元组类（C++11 引入）
- `optional`：可选值类型（C++17 引入）
- `any`：存储任意类型的类型安全容器（C++17 引入）
- `variant`：类型安全的联合体（C++17 引入）
- `type_traits`：类型特征库（C++11 引入）
- `functional`：定义函数对象、绑定器和其他函数相关工具
