---
title: STL(标准模版库)
---

C++ 标准模板库（STL，Standard Template Library）是 C++ 标准库的重要组成部分，提供了常用的数据结构和算法，使开发者能够更高效地编写代码。STL 主要包括以下几个部分：容器（Containers）、算法（Algorithms）、迭代器（Iterators）和函数对象（Function Objects）。

## 1. 容器（Containers）

容器是用于存储和管理对象的类模板。STL 提供了几种常用的容器类型：

### 顺序容器（Sequence Containers）

- `vector`：动态数组，支持快速随机访问，插入和删除在末尾是常数时间复杂度。
  
  ```cpp
  #include <vector>
  #include <iostream>

  int main() {
      std::vector<int> vec = {1, 2, 3, 4, 5};
      vec.push_back(6);
      for (int v : vec) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `deque`：双端队列，支持在两端快速插入和删除。
  
  ```cpp
  #include <deque>
  #include <iostream>

  int main() {
      std::deque<int> deq = {1, 2, 3, 4, 5};
      deq.push_front(0);
      deq.push_back(6);
      for (int v : deq) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `list`：双向链表，支持快速的插入和删除，但不支持快速随机访问。
  
  ```cpp
  #include <list>
  #include <iostream>

  int main() {
      std::list<int> lst = {1, 2, 3, 4, 5};
      lst.push_front(0);
      lst.push_back(6);
      for (int v : lst) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `array`：定长数组，提供静态数组的功能，但具有 STL 容器的接口。（C++11 引入）
  
  ```cpp
  #include <array>
  #include <iostream>

  int main() {
      std::array<int, 5> arr = {1, 2, 3, 4, 5};
      for (int v : arr) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `forward_list`：单向链表，仅支持单向遍历和插入。（C++11 引入）

  ```cpp
  #include <forward_list>
  #include <iostream>

  int main() {
      std::forward_list<int> flst = {1, 2, 3, 4, 5};
      flst.push_front(0);
      for (int v : flst) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

### 关联容器（Associative Containers）

- `set`：集合，存储唯一的元素，元素按特定顺序排序。

  ```cpp
  #include <set>
  #include <iostream>

  int main() {
      std::set<int> s = {3, 1, 4, 1, 5, 9};
      for (int v : s) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `multiset`：允许重复元素的集合，元素按特定顺序排序。

  ```cpp
  #include <set>
  #include <iostream>

  int main() {
      std::multiset<int> ms = {3, 1, 4, 1, 5, 9};
      for (int v : ms) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `map`：键值对集合（字典），按键排序，键是唯一的。

  ```cpp
  #include <map>
  #include <iostream>

  int main() {
      std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};
      for (const auto& pair : m) {
          std::cout << pair.first << ": " << pair.second << std::endl;
      }
      return 0;
  }
  ```

- `multimap`：允许重复键的键值对集合，按键排序。

  ```cpp
  #include <map>
  #include <iostream>

  int main() {
      std::multimap<int, std::string> mm = {{1, "one"}, {2, "two"}, {2, "second two"}};
      for (const auto& pair : mm) {
          std::cout << pair.first << ": " << pair.second << std::endl;
      }
      return 0;
  }
  ```

### 无序容器（Unordered Containers, C++11 引入）

- `unordered_set`：哈希集合，元素按哈希值存储，查找和插入操作平均时间复杂度为常数时间。

  ```cpp
  #include <unordered_set>
  #include <iostream>

  int main() {
      std::unordered_set<int> us = {3, 1, 4, 1, 5, 9};
      for (int v : us) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `unordered_multiset`：允许重复元素的哈希集合。

  ```cpp
  #include <unordered_set>
  #include <iostream>

  int main() {
      std::unordered_multiset<int> ums = {3, 1, 4, 1, 5, 9};
      for (int v : ums) {
          std::cout << v << " ";
      }
      return 0;
  }
  ```

- `unordered_map`：哈希表，键值对集合，键是唯一的。

  ```cpp
  #include <unordered_map>
  #include <iostream>

  int main() {
      std::unordered_map<int, std::string> um = {{1, "one"}, {2, "two"}, {3, "three"}};
      for (const auto& pair : um) {
          std::cout << pair.first << ": " << pair.second << std::endl;
      }
      return 0;
  }
  ```

- `unordered_multimap`：允许重复键的哈希表。

  ```cpp
  #include <unordered_map>
  #include <iostream>

  int main() {
      std::unordered_multimap<int, std::string> umm = {{1, "one"}, {2, "two"}, {2, "second two"}};
      for (const auto& pair : umm) {
          std::cout << pair.first << ": " << pair.second << std::endl;
      }
      return 0;
  }
  ```

## 2. 算法（Algorithms）

STL 提供了一组常用的算法，用于操作容器中的元素。这些算法是独立于容器的，主要包括：

- 排序：`sort`、`stable_sort`、`partial_sort`、`nth_element`
- 搜索：`find`、`binary_search`、`search`、`find_if`
- 修改：`copy`、`swap`、`replace`、`fill`、`transform`
- 结构修改：`remove`、`unique`、`reverse`、`rotate`
- 数值算法：`accumulate`、`inner_product`、`adjacent_difference`

### 示例

```cpp
#include <vector>
#include <algorithm>
#include <numeric>
#include <iostream>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 使用算法对容器进行操作
    std::reverse(vec.begin(), vec.end());
    std::for_each(vec.begin(), vec.end(), [](int v) { std::cout << v << " "; });

    int sum = std::accumulate(vec.begin(), vec.end(), 0);
    std::cout << "\nSum: " << sum << std::endl;

    return 0;
}
```

## 3. 迭代器（Iterators）

在 C++ 中，迭代器（Iterator）是一种用于遍历容器元素的对象，它提供了统一的接口来访问容器中的元素。迭代器可以看作是指向容器元素的指针，通过迭代器，程序员可以以一种独立于容器实现方式的方式遍历和操作容器中的元素。C++ 标准模板库（STL）提供了多种迭代器，每种迭代器适用于不同类型的容器和遍历需求。

### 迭代器类型

根据迭代器的功能和特性，STL 迭代器分为五种类型：

1. **输入迭代器（Input Iterator）**：只能读取元素，支持只读的单向遍历。
2. **输出迭代器（Output Iterator）**：只能写入元素，支持只写的单向遍历。
3. **前向迭代器（Forward Iterator）**：支持读写操作和单向遍历。
4. **双向迭代器（Bidirectional Iterator）**：支持读写操作和双向遍历。
5. **随机访问迭代器（Random Access Iterator）**：支持读写操作、双向遍历和随机访问。

### 迭代器操作

不同类型的迭代器支持不同的操作，但所有迭代器至少支持以下操作：

- `*it`：解引用迭代器，访问迭代器指向的元素。
- `++it`：前进到下一个元素。
- `it++`：后缀递增操作，前进到下一个元素。
- `it != it2`：比较两个迭代器是否不相等。

### 迭代器示例

以下是一些常见的迭代器使用示例：

#### 1. 向量迭代器（`vector` Iterator）

`vector` 是一个动态数组，支持随机访问迭代器。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 使用迭代器遍历 vector
    for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    // 使用范围 for 循环遍历 vector
    for (int value : vec) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

#### 2. 列表迭代器（`list` Iterator）

`list` 是一个双向链表，支持双向迭代器。

```cpp
#include <iostream>
#include <list>

int main() {
    std::list<int> lst = {1, 2, 3, 4, 5};

    // 使用迭代器遍历 list
    for (std::list<int>::iterator it = lst.begin(); it != lst.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    // 使用范围 for 循环遍历 list
    for (int value : lst) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

#### 3. 集合迭代器（`set` Iterator）

`set` 是一个有序集合，支持双向迭代器。

```cpp
#include <iostream>
#include <set>

int main() {
    std::set<int> s = {1, 2, 3, 4, 5};

    // 使用迭代器遍历 set
    for (std::set<int>::iterator it = s.begin(); it != s.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    // 使用范围 for 循环遍历 set
    for (int value : s) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

#### 4. 映射迭代器（`map` Iterator）

`map` 是一个键值对集合，支持双向迭代器。

```cpp
#include <iostream>
#include <map>

int main() {
    std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};

    // 使用迭代器遍历 map
    for (std::map<int, std::string>::iterator it = m.begin(); it != m.end(); ++it) {
        std::cout << it->first << ": " << it->second << std::endl;
    }

    // 使用范围 for 循环遍历 map
    for (const auto& pair : m) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    return 0;
}
```

### 迭代器适配器

STL 还提供了几种迭代器适配器，用于将现有的迭代器转换为具有特定行为的新迭代器：

- **插入迭代器（Insert Iterator）**：如 `std::back_inserter`、`std::front_inserter` 和 `std::inserter`，用于在容器中插入元素。
  
  ```cpp
  #include <iostream>
  #include <vector>
  #include <iterator>

  int main() {
      std::vector<int> vec = {1, 2, 3};
      std::vector<int> vec2;

      // 使用 back_inserter 适配器
      std::copy(vec.begin(), vec.end(), std::back_inserter(vec2));

      for (int v : vec2) {
          std::cout << v << " ";
      }
      std::cout << std::endl;

      return 0;
  }
  ```

- **流迭代器（Stream Iterator）**：如 `std::istream_iterator` 和 `std::ostream_iterator`，用于从输入流读取或向输出流写入数据。
  
  ```cpp
  #include <iostream>
  #include <iterator>
  #include <vector>

  int main() {
      std::vector<int> vec = {1, 2, 3, 4, 5};

      // 使用 ostream_iterator 将数据写入标准输出
      std::copy(vec.begin(), vec.end(), std::ostream_iterator<int>(std::cout, " "));
      std::cout << std::endl;

      return 0;
  }
  ```

- **反向迭代器（Reverse Iterator）**：如 `std::reverse_iterator`，用于反向遍历容器。
  
  ```cpp
  #include <iostream>
  #include <vector>

  int main() {
      std::vector<int> vec = {1, 2, 3, 4, 5};

      // 使用反向迭代器遍历 vector
      for (std::vector<int>::reverse_iterator rit = vec.rbegin(); rit != vec.rend(); ++rit) {
          std::cout << *rit << " ";
      }
      std::cout << std::endl;

      return 0;
  }
  ```

### 自定义迭代器

有时需要为自定义容器实现迭代器。以下是一个简单的示例，展示如何为自定义容器实现迭代器：

```cpp
#include <iostream>

class CustomContainer {
public:
    CustomContainer(int* data, size_t size) : data(data), size(size) {}

    class Iterator {
    public:
        Iterator(int* ptr) : ptr(ptr) {}

        int& operator*() const {
            return *ptr;
        }

        Iterator& operator++() {
            ++ptr;
            return *this;
        }

        bool operator!=(const Iterator& other) const {
            return ptr != other.ptr;
        }

    private:
        int* ptr;
    };

    Iterator begin() const {
        return Iterator(data);
    }

    Iterator end() const {
        return Iterator(data + size);
    }

private:
    int* data;
    size_t size;
};

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    CustomContainer container(arr, 5);

    // 使用自定义迭代器遍历容器
    for (int value : container) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

