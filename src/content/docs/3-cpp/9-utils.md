---
title: 实用工具库
---

## pair

在 C++ 标准库中，`std::pair` 是一个模板类，用于存储一对值。这两个值可以是不同类型的。`std::pair` 常用于需要将两个值组合在一起并一起传递或返回的场景。`std::pair` 定义在 `<utility>` 头文件中。

### `std::pair` 的基本使用

#### 1. 定义和初始化

可以通过多种方式来定义和初始化 `std::pair` 对象。

```cpp
#include <iostream>
#include <utility>

int main() {
    // 直接初始化
    std::pair<int, std::string> p1(1, "one");

    // 使用 make_pair 函数
    std::pair<int, std::string> p2 = std::make_pair(2, "two");

    // 列表初始化 (C++11)
    std::pair<int, std::string> p3{3, "three"};

    std::cout << "p1: (" << p1.first << ", " << p1.second << ")\n";
    std::cout << "p2: (" << p2.first << ", " << p2.second << ")\n";
    std::cout << "p3: (" << p3.first << ", " << p3.second << ")\n";

    return 0;
}
```

#### 2. 访问元素

`std::pair` 有两个公开的成员变量：`first` 和 `second`，分别用于存储一对值。

```cpp
#include <iostream>
#include <utility>

int main() {
    std::pair<int, std::string> p(1, "one");

    // 访问元素
    int num = p.first;
    std::string str = p.second;

    std::cout << "First: " << num << ", Second: " << str << std::endl;

    return 0;
}
```

#### 3. 比较操作

`std::pair` 支持比较操作，比较是按字典序进行的，即首先比较 `first` 元素，如果相等则比较 `second` 元素。

```cpp
#include <iostream>
#include <utility>

int main() {
    std::pair<int, std::string> p1(1, "one");
    std::pair<int, std::string> p2(2, "two");

    if (p1 < p2) {
        std::cout << "p1 is less than p2" << std::endl;
    } else {
        std::cout << "p1 is not less than p2" << std::endl;
    }

    return 0;
}
```

#### 4. 修改元素

可以直接修改 `first` 和 `second` 成员变量。

```cpp
#include <iostream>
#include <utility>

int main() {
    std::pair<int, std::string> p(1, "one");

    // 修改元素
    p.first = 2;
    p.second = "two";

    std::cout << "Modified pair: (" << p.first << ", " << p.second << ")" << std::endl;

    return 0;
}
```

### 使用场景

#### 1. 函数返回多值

`std::pair` 常用于函数需要返回多个值的场景。

```cpp
#include <iostream>
#include <utility>

std::pair<int, int> min_max(int a, int b) {
    if (a < b) {
        return std::make_pair(a, b);
    } else {
        return std::make_pair(b, a);
    }
}

int main() {
    auto result = min_max(10, 20);
    std::cout << "Min: " << result.first << ", Max: " << result.second << std::endl;

    return 0;
}
```

#### 2. 结合容器使用

`std::pair` 常与 STL 容器一起使用，例如在 `std::map` 中。

```cpp
#include <iostream>
#include <map>
#include <utility>

int main() {
    std::map<int, std::string> my_map;

    // 插入元素
    my_map.insert(std::make_pair(1, "one"));
    my_map.insert({2, "two"}); // C++11 语法

    // 访问元素
    for (const auto& pair : my_map) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    return 0;
}
```

## tuple

在 C++11 及其后续版本中，`std::tuple` 是一个模板类，用于存储固定大小的不同类型的值。它可以看作是扩展版的 `std::pair`，可以存储任意数量和任意类型的值。`std::tuple` 定义在 `<tuple>` 头文件中。

### 1. 定义和初始化 `std::tuple`

可以通过多种方式来定义和初始化 `std::tuple` 对象。

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main() {
    // 使用 make_tuple 函数
    std::tuple<int, double, std::string> t1 = std::make_tuple(1, 2.3, "Hello");

    // 直接初始化
    std::tuple<int, double, std::string> t2(1, 2.3, "Hello");

    // 列表初始化 (C++11)
    std::tuple<int, double, std::string> t3{1, 2.3, "Hello"};

    std::cout << "Tuple initialized successfully." << std::endl;

    return 0;
}
```

### 2. 访问 `std::tuple` 元素

可以使用 `std::get` 函数按索引访问 `std::tuple` 的元素。索引从 0 开始。

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main() {
    std::tuple<int, double, std::string> t = std::make_tuple(1, 2.3, "Hello");

    int i = std::get<0>(t);
    double d = std::get<1>(t);
    std::string s = std::get<2>(t);

    std::cout << "Tuple elements: " << i << ", " << d << ", " << s << std::endl;

    return 0;
}
```

### 3. 修改 `std::tuple` 元素

可以使用 `std::get` 函数按索引修改 `std::tuple` 的元素。

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main() {
    std::tuple<int, double, std::string> t = std::make_tuple(1, 2.3, "Hello");

    std::get<0>(t) = 42;
    std::get<1>(t) = 3.14;
    std::get<2>(t) = "World";

    std::cout << "Modified tuple elements: " << std::get<0>(t) << ", " << std::get<1>(t) << ", " << std::get<2>(t) << std::endl;

    return 0;
}
```

### 4. 使用 `std::tie` 解构 `std::tuple`

`std::tie` 可以将 `std::tuple` 的元素解构到多个变量中。

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main() {
    std::tuple<int, double, std::string> t = std::make_tuple(1, 2.3, "Hello");

    int i;
    double d;
    std::string s;
    std::tie(i, d, s) = t;

    std::cout << "Decomposed tuple elements: " << i << ", " << d << ", " << s << std::endl;

    return 0;
}
```

### 5. 忽略 `std::tuple` 的某些元素

在解构 `std::tuple` 时，可以使用 `std::ignore` 忽略某些元素。

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main() {
    std::tuple<int, double, std::string> t = std::make_tuple(1, 2.3, "Hello");

    int i;
    std::string s;
    std::tie(i, std::ignore, s) = t;

    std::cout << "Decomposed tuple elements (ignoring one): " << i << ", " << s << std::endl;

    return 0;
}
```

### 6. 获取 `std::tuple` 的大小

可以使用 `std::tuple_size` 获取 `std::tuple` 的大小。

```cpp
#include <iostream>
#include <tuple>

int main() {
    std::tuple<int, double, std::string> t = std::make_tuple(1, 2.3, "Hello");

    std::cout << "Tuple size: " << std::tuple_size<decltype(t)>::value << std::endl;

    return 0;
}
```

### 7. 拼接 `std::tuple`

可以使用 `std::tuple_cat` 函数拼接两个或多个 `std::tuple`。

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main() {
    std::tuple<int, double> t1 = std::make_tuple(1, 2.3);
    std::tuple<std::string, char> t2 = std::make_tuple("Hello", 'A');

    auto t3 = std::tuple_cat(t1, t2);

    std::cout << "Concatenated tuple elements: "
              << std::get<0>(t3) << ", "
              << std::get<1>(t3) << ", "
              << std::get<2>(t3) << ", "
              << std::get<3>(t3) << std::endl;

    return 0;
}
```

### 使用场景

#### 1. 函数返回多个值

`std::tuple` 常用于函数需要返回多个值的场景。

```cpp
#include <iostream>
#include <tuple>
#include <string>

std::tuple<int, double, std::string> get_values() {
    return std::make_tuple(1, 2.3, "Hello");
}

int main() {
    auto [i, d, s] = get_values();

    std::cout << "Returned tuple elements: " << i << ", " << d << ", " << s << std::endl;

    return 0;
}
```

#### 2. 结合容器使用

`std::tuple` 常与 STL 容器一起使用，例如在 `std::map` 中。

```cpp
#include <iostream>
#include <map>
#include <tuple>
#include <string>

int main() {
    std::map<int, std::tuple<std::string, double>> my_map;

    // 插入元素
    my_map.insert({1, std::make_tuple("Alice", 85.5)});
    my_map.insert({2, std::make_tuple("Bob", 92.3)});

    // 访问元素
    for (const auto& [key, value] : my_map) {
        std::cout << "Key: " << key << ", Name: " << std::get<0>(value) << ", Score: " << std::get<1>(value) << std::endl;
    }

    return 0;
}
```

## optional

在 C++17 中，`std::optional` 是一种有用的工具，用于表示一个值可能存在也可能不存在的情况。它在 `<optional>` 头文件中定义，通过这种方式可以避免使用裸指针或其他不安全的方式来表示可选值。

### 定义和初始化 `std::optional`

#### 1. 包含头文件

要使用 `std::optional`，首先需要包含 `<optional>` 头文件。

```cpp
#include <optional>
#include <iostream>
```

#### 2. 定义和初始化 `std::optional`

可以通过多种方式来定义和初始化 `std::optional` 对象。

```cpp
#include <optional>
#include <iostream>
#include <string>

int main() {
    // 未初始化的 optional
    std::optional<int> opt1;

    // 初始化为一个值
    std::optional<int> opt2 = 42;
    std::optional<int> opt3 {42};

    // 使用 make_optional 函数
    std::optional<int> opt4 = std::make_optional(42);

    // 输出可选值
    if (opt2.has_value()) {
        std::cout << "opt2: " << opt2.value() << std::endl;
    }

    return 0;
}
```

### 访问和修改 `std::optional` 的值

#### 1. 访问值

- `has_value()`：检查 `std::optional` 是否包含值。
- `value()`：访问 `std::optional` 的值，如果 `std::optional` 不包含值，则抛出 `std::bad_optional_access` 异常。
- `value_or(default_value)`：如果 `std::optional` 包含值，则返回该值，否则返回 `default_value`。

```cpp
#include <optional>
#include <iostream>
#include <string>

int main() {
    std::optional<int> opt = 42;

    if (opt.has_value()) {
        std::cout << "Value: " << opt.value() << std::endl;
    }

    // 使用 value_or 提供默认值
    std::optional<int> emptyOpt;
    int value = emptyOpt.value_or(0);
    std::cout << "Value or default: " << value << std::endl;

    return 0;
}
```

#### 2. 修改值

- `reset()`：将 `std::optional` 重置为空。
- 赋值运算符：可以直接给 `std::optional` 赋值。

```cpp
#include <optional>
#include <iostream>
#include <string>

int main() {
    std::optional<int> opt = 42;
    std::cout << "Initial value: " << opt.value() << std::endl;

    opt = 100;
    std::cout << "Modified value: " << opt.value() << std::endl;

    opt.reset();
    if (!opt.has_value()) {
        std::cout << "Value has been reset." << std::endl;
    }

    return 0;
}
```

### 作为函数返回值

`std::optional` 常用于函数返回值，以表示一个函数可能返回一个有效值，也可能不返回值。

```cpp
#include <optional>
#include <iostream>
#include <string>

std::optional<std::string> findName(int id) {
    if (id == 1) {
        return "Alice";
    } else if (id == 2) {
        return "Bob";
    } else {
        return std::nullopt; // 表示没有值
    }
}

int main() {
    auto name = findName(1);
    if (name.has_value()) {
        std::cout << "Found name: " << name.value() << std::endl;
    } else {
        std::cout << "Name not found." << std::endl;
    }

    name = findName(3);
    std::cout << "Found name: " << name.value_or("Unknown") << std::endl;

    return 0;
}
```

### 使用 `std::optional` 避免裸指针

在某些情况下，`std::optional` 可以替代裸指针，用于表示一个值可能不存在的情况，从而提高代码的安全性和可读性。

```cpp
#include <optional>
#include <iostream>
#include <string>

struct Person {
    std::string name;
    std::optional<int> age; // 年龄可能不存在
};

int main() {
    Person alice{"Alice", 30};
    Person bob{"Bob", std::nullopt};

    std::cout << alice.name << "'s age: " << alice.age.value_or(-1) << std::endl;
    std::cout << bob.name << "'s age: " << bob.age.value_or(-1) << std::endl;

    return 0;
}
```

## any

C++17 引入了 `std::any`，这是一个类型安全的容器，用于存储任意类型的值。它提供了一种机制，可以在运行时存储和检索不同类型的值，而无需知道这些值的具体类型。`std::any` 在 `<any>` 头文件中定义。

### `std::any` 的基本使用

#### 1. 包含头文件

要使用 `std::any`，首先需要包含 `<any>` 头文件。

```cpp
#include <any>
#include <iostream>
#include <string>
```

#### 2. 定义和初始化 `std::any`

可以通过多种方式来定义和初始化 `std::any` 对象。

```cpp
#include <any>
#include <iostream>
#include <string>

int main() {
    // 未初始化的 any
    std::any a;

    // 初始化为一个整数
    a = 42;

    // 使用构造函数初始化
    std::any b(std::string("Hello"));

    // 使用 make_any 函数
    std::any c = std::make_any<double>(3.14);

    std::cout << "Initialized any objects." << std::endl;

    return 0;
}
```

### 访问 `std::any` 的值

可以使用 `std::any_cast` 来访问 `std::any` 存储的值。如果类型不匹配，`std::any_cast` 会抛出 `std::bad_any_cast` 异常。

#### 1. 安全地访问值

```cpp
#include <any>
#include <iostream>
#include <string>

int main() {
    std::any a = 42;
    try {
        int value = std::any_cast<int>(a);
        std::cout << "Value: " << value << std::endl;
    } catch (const std::bad_any_cast& e) {
        std::cout << "Bad any cast: " << e.what() << std::endl;
    }

    return 0;
}
```

#### 2. 检查类型并访问值

可以使用 `has_value()` 检查 `std::any` 是否包含值，使用 `type()` 获取存储值的类型信息。

```cpp
#include <any>
#include <iostream>
#include <string>
#include <typeinfo>

int main() {
    std::any a = std::string("Hello");

    if (a.has_value()) {
        std::cout << "Type of a: " << a.type().name() << std::endl;
    }

    try {
        auto value = std::any_cast<std::string>(a);
        std::cout << "Value: " << value << std::endl;
    } catch (const std::bad_any_cast& e) {
        std::cout << "Bad any cast: " << e.what() << std::endl;
    }

    return 0;
}
```

### 修改 `std::any` 的值

可以直接给 `std::any` 赋新值来修改它所存储的内容。

```cpp
#include <any>
#include <iostream>
#include <string>

int main() {
    std::any a = 42;
    a = std::string("Hello");

    try {
        auto value = std::any_cast<std::string>(a);
        std::cout << "New value: " << value << std::endl;
    } catch (const std::bad_any_cast& e) {
        std::cout << "Bad any cast: " << e.what() << std::endl;
    }

    return 0;
}
```

### 清空 `std::any`

可以使用 `reset()` 方法来清空 `std::any` 对象，使其不再包含任何值。

```cpp
#include <any>
#include <iostream>

int main() {
    std::any a = 42;
    a.reset();

    if (!a.has_value()) {
        std::cout << "any object is empty." << std::endl;
    }

    return 0;
}
```

### 使用 `std::any` 存储用户定义的类型

`std::any` 可以存储用户定义的类型，但需要注意对象的生命周期和内存管理。

```cpp
#include <any>
#include <iostream>
#include <string>

struct Person {
    std::string name;
    int age;

    Person(const std::string& name, int age) : name(name), age(age) {}
};

int main() {
    std::any a = Person("Alice", 30);

    try {
        auto p = std::any_cast<Person>(a);
        std::cout << "Person: " << p.name << ", " << p.age << std::endl;
    } catch (const std::bad_any_cast& e) {
        std::cout << "Bad any cast: " << e.what() << std::endl;
    }

    return 0;
}
```

## variant

C++17 引入了 `std::variant`，这是一种类型安全的联合体（union），可以存储多种类型中的一种。与 `std::any` 不同，`std::variant` 的类型集合是固定的，并且可以在编译时知道具体存储了哪种类型。`std::variant` 提供了一种更安全和更高效的方式来处理多种可能类型的值。

### 定义和初始化 `std::variant`

#### 1. 包含头文件

要使用 `std::variant`，首先需要包含 `<variant>` 头文件。

```cpp
#include <variant>
#include <iostream>
#include <string>
```

#### 2. 定义和初始化 `std::variant`

可以通过多种方式来定义和初始化 `std::variant` 对象。

```cpp
#include <variant>
#include <iostream>
#include <string>

int main() {
    // 定义一个可以存储 int、double 或 std::string 的 variant
    std::variant<int, double, std::string> v;

    // 初始化为 int 类型
    v = 42;
    std::cout << "Value: " << std::get<int>(v) << std::endl;

    // 初始化为 double 类型
    v = 3.14;
    std::cout << "Value: " << std::get<double>(v) << std::endl;

    // 初始化为 std::string 类型
    v = std::string("Hello, World!");
    std::cout << "Value: " << std::get<std::string>(v) << std::endl;

    return 0;
}
```

### 访问和修改 `std::variant` 的值

#### 1. 使用 `std::get` 访问值

可以使用 `std::get` 函数按类型或索引访问 `std::variant` 的值。如果类型不匹配，`std::get` 会抛出 `std::bad_variant_access` 异常。

```cpp
#include <variant>
#include <iostream>
#include <string>

int main() {
    std::variant<int, double, std::string> v = 42;

    try {
        int i = std::get<int>(v);
        std::cout << "Integer: " << i << std::endl;
    } catch (const std::bad_variant_access& e) {
        std::cout << "Bad variant access: " << e.what() << std::endl;
    }

    return 0;
}
```

#### 2. 使用 `std::holds_alternative` 检查类型

可以使用 `std::holds_alternative` 检查 `std::variant` 当前是否持有某种类型的值。

```cpp
#include <variant>
#include <iostream>
#include <string>

int main() {
    std::variant<int, double, std::string> v = 3.14;

    if (std::holds_alternative<double>(v)) {
        std::cout << "Variant holds a double: " << std::get<double>(v) << std::endl;
    } else {
        std::cout << "Variant does not hold a double." << std::endl;
    }

    return 0;
}
```

#### 3. 使用 `std::visit` 访问值

`std::visit` 提供了一种更灵活的方式来访问 `std::variant` 的值，可以通过一个访问者函数对象来处理不同类型的值。

```cpp
#include <variant>
#include <iostream>
#include <string>

struct Visitor {
    void operator()(int i) const {
        std::cout << "Integer: " << i << std::endl;
    }

    void operator()(double d) const {
        std::cout << "Double: " << d << std::endl;
    }

    void operator()(const std::string& s) const {
        std::cout << "String: " << s << std::endl;
    }
};

int main() {
    std::variant<int, double, std::string> v = std::string("Hello");

    std::visit(Visitor{}, v);

    return 0;
}
```

### 修改 `std::variant` 的值

可以直接给 `std::variant` 赋新值来修改它所存储的内容。

```cpp
#include <variant>
#include <iostream>
#include <string>

int main() {
    std::variant<int, double, std::string> v = 42;

    v = 3.14;
    std::cout << "New value: " << std::get<double>(v) << std::endl;

    v = std::string("Hello, Variant!");
    std::cout << "New value: " << std::get<std::string>(v) << std::endl;

    return 0;
}
```

### 获取 `std::variant` 的当前类型索引

可以使用 `index` 成员函数获取 `std::variant` 当前持有值的类型索引。

```cpp
#include <variant>
#include <iostream>
#include <string>

int main() {
    std::variant<int, double, std::string> v = 42;

    std::cout << "Type index: " << v.index() << std::endl;

    v = 3.14;
    std::cout << "Type index: " << v.index() << std::endl;

    v = std::string("Hello, Variant!");
    std::cout << "Type index: " << v.index() << std::endl;

    return 0;
}
```

### 使用 `std::monostate`

`std::monostate` 是一种特殊类型，可以用作 `std::variant` 的第一个类型，以表示一种默认的无效状态。

```cpp
#include <variant>
#include <iostream>
#include <string>

int main() {
    std::variant<std::monostate, int, std::string> v;

    if (std::holds_alternative<std::monostate>(v)) {
        std::cout << "Variant is in a monostate." << std::endl;
    }

    v = 42;
    std::cout << "New value: " << std::get<int>(v) << std::endl;

    return 0;
}
```

## type_traits

C++ 标准库中的 `<type_traits>` 头文件提供了一组模板类和模板变量，用于在编译时检查和操作类型信息。这些工具被称为“类型特征”，广泛用于元编程、模板编程和类型安全编程。

### 常用的类型特征

以下是一些常用的类型特征模板：

#### 1. 基础类型特征

- `std::is_integral<T>`：如果 `T` 是整型，则为 `true`。
- `std::is_floating_point<T>`：如果 `T` 是浮点型，则为 `true`。
- `std::is_arithmetic<T>`：如果 `T` 是算术类型（整型或浮点型），则为 `true`。
- `std::is_void<T>`：如果 `T` 是 `void`，则为 `true`。

#### 示例

```cpp
#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::boolalpha;
    std::cout << "is_integral<int>: " << std::is_integral<int>::value << std::endl;
    std::cout << "is_integral<float>: " << std::is_integral<float>::value << std::endl;
    std::cout << "is_floating_point<double>: " << std::is_floating_point<double>::value << std::endl;
    std::cout << "is_arithmetic<char>: " << std::is_arithmetic<char>::value << std::endl;
    std::cout << "is_void<void>: " << std::is_void<void>::value << std::endl;

    return 0;
}
```

#### 2. 复合类型特征

- `std::is_pointer<T>`：如果 `T` 是指针类型，则为 `true`。
- `std::is_reference<T>`：如果 `T` 是引用类型，则为 `true`。
- `std::is_array<T>`：如果 `T` 是数组类型，则为 `true`。
- `std::is_function<T>`：如果 `T` 是函数类型，则为 `true`。
- `std::is_enum<T>`：如果 `T` 是枚举类型，则为 `true`。

#### 示例

```cpp
#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::boolalpha;
    std::cout << "is_pointer<int*>: " << std::is_pointer<int*>::value << std::endl;
    std::cout << "is_reference<int&>: " << std::is_reference<int&>::value << std::endl;
    std::cout << "is_array<int[]>: " << std::is_array<int[]>::value << std::endl;
    std::cout << "is_function<void()>: " << std::is_function<void()>::value << std::endl;

    enum class Color { Red, Green, Blue };
    std::cout << "is_enum<Color>: " << std::is_enum<Color>::value << std::endl;

    return 0;
}
```

#### 3. 资格修饰符特征

- `std::is_const<T>`：如果 `T` 是 `const` 限定的，则为 `true`。
- `std::is_volatile<T>`：如果 `T` 是 `volatile` 限定的，则为 `true`。
- `std::is_trivially_copyable<T>`：如果 `T` 是平凡可复制的，则为 `true`。

#### 示例

```cpp
#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::boolalpha;
    std::cout << "is_const<const int>: " << std::is_const<const int>::value << std::endl;
    std::cout << "is_volatile<volatile int>: " << std::is_volatile<volatile int>::value << std::endl;
    std::cout << "is_trivially_copyable<int>: " << std::is_trivially_copyable<int>::value << std::endl;

    return 0;
}
```

#### 4. 类型关系特征

- `std::is_same<T, U>`：如果 `T` 和 `U` 是相同类型，则为 `true`。
- `std::is_base_of<Base, Derived>`：如果 `Base` 是 `Derived` 的基类，则为 `true`。
- `std::is_convertible<From, To>`：如果 `From` 类型的值可以隐式转换为 `To` 类型，则为 `true`。

#### 示例

```cpp
#include <iostream>
#include <type_traits>

class Base {};
class Derived : public Base {};

int main() {
    std::cout << std::boolalpha;
    std::cout << "is_same<int, int>: " << std::is_same<int, int>::value << std::endl;
    std::cout << "is_same<int, float>: " << std::is_same<int, float>::value << std::endl;
    std::cout << "is_base_of<Base, Derived>: " << std::is_base_of<Base, Derived>::value << std::endl;
    std::cout << "is_convertible<int, double>: " << std::is_convertible<int, double>::value << std::endl;

    return 0;
}
```

### 5. 类型变换特征

- `std::remove_const<T>`：去掉 `const` 限定符。
- `std::remove_volatile<T>`：去掉 `volatile` 限定符。
- `std::remove_reference<T>`：去掉引用限定符。
- `std::add_const<T>`：添加 `const` 限定符。
- `std::add_pointer<T>`：将类型 `T` 变为指针类型 `T*`。

#### 示例

```cpp
#include <iostream>
#include <type_traits>

int main() {
    using T = std::remove_const<const int>::type;
    using U = std::remove_reference<int&>::type;
    using V = std::add_pointer<int>::type;

    std::cout << std::boolalpha;
    std::cout << "T is const int: " << std::is_same<T, int>::value << std::endl;
    std::cout << "U is int: " << std::is_same<U, int>::value << std::endl;
    std::cout << "V is int*: " << std::is_same<V, int*>::value << std::endl;

    return 0;
}
```

### 6. 辅助类型别名

C++14 引入了辅助类型别名，简化了类型特征的使用。例如，`std::is_same_v<T, U>` 是 `std::is_same<T, U>::value` 的简写形式。

#### 示例

```cpp
#include <iostream>
#include <type_traits>

int main() {
    std::cout << std::boolalpha;
    std::cout << "is_same_v<int, int>: " << std::is_same_v<int, int> << std::endl;
    std::cout << "is_same_v<int, float>: " << std::is_same_v<int, float> << std::endl;

    return 0;
}
```

### 类型特征的高级应用

类型特征在模板编程中非常有用，可以用于启用或禁用模板的特定实例化。一个常见的用法是通过 `std::enable_if` 实现 SFINAE（Substitution Failure Is Not An Error）。

#### 示例：使用 `std::enable_if`

```cpp
#include <iostream>
#include <type_traits>

template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
add(T a, T b) {
    return a + b;
}

template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
add(T a, T b) {
    return a + b + 0.5; // For example purpose
}

int main() {
    std::cout << "Integral add: " << add(1, 2) << std::endl;
    std::cout << "Floating point add: " << add(1.0, 2.0) << std::endl;

    return 0;
}
```

## functional

C++ 标准库中的 `<functional>` 头文件提供了一组函数对象和辅助工具，用于支持函数式编程。这些工具包括标准函数对象、`std::function` 类模板、绑定器（`std::bind`）、函数包装器（`std::ref`）、以及用于调用成员函数和成员变量的工具。

### 1. `std::function`

`std::function` 是一个通用的、多态的函数包装器，它可以存储、复制和调用任何可调用目标（如函数、lambda 表达式、绑定器、函数对象和其他 `std::function` 对象）。

#### 示例：使用 `std::function`

```cpp
#include <functional>
#include <iostream>

void free_function(int x) {
    std::cout << "Free function called with " << x << std::endl;
}

int main() {
    std::function<void(int)> func = free_function;
    func(10);

    // 使用 lambda 表达式
    func = [](int x) {
        std::cout << "Lambda called with " << x << std::endl;
    };
    func(20);

    return 0;
}
```

### 2. `std::bind`

`std::bind` 用于创建函数对象，该对象将某些参数绑定到特定值。它返回一个新的函数对象，可以使用 `std::function` 进行存储。

#### 示例：使用 `std::bind`

```cpp
#include <functional>
#include <iostream>

void add(int a, int b) {
    std::cout << "Sum: " << (a + b) << std::endl;
}

int main() {
    // 绑定第一个参数为 2
    auto add_with_2 = std::bind(add, 2, std::placeholders::_1);
    add_with_2(3); // 输出: Sum: 5

    return 0;
}
```

### 3. 标准函数对象

`<functional>` 提供了一些标准函数对象（如 `std::plus`、`std::minus`、`std::multiplies` 等），用于基本的算术运算和比较运算。

#### 示例：使用标准函数对象

```cpp
#include <functional>
#include <iostream>

int main() {
    std::plus<int> add;
    std::minus<int> subtract;
    std::multiplies<int> multiply;
    std::divides<int> divide;
    std::modulus<int> mod;
    std::negate<int> negate;

    std::cout << "10 + 5 = " << add(10, 5) << std::endl;
    std::cout << "10 - 5 = " << subtract(10, 5) << std::endl;
    std::cout << "10 * 5 = " << multiply(10, 5) << std::endl;
    std::cout << "10 / 5 = " << divide(10, 5) << std::endl;
    std::cout << "10 % 5 = " << mod(10, 5) << std::endl;
    std::cout << "Negate 10 = " << negate(10) << std::endl;

    return 0;
}
```

### 4. `std::ref` 和 `std::cref`

`std::ref` 和 `std::cref` 用于创建对象的引用包装器，可以将引用传递给函数对象。

#### 示例：使用 `std::ref` 和 `std::cref`

```cpp
#include <functional>
#include <iostream>

void print(int& x) {
    std::cout << "Value: " << x << std::endl;
}

int main() {
    int n = 10;
    std::function<void()> func = std::bind(print, std::ref(n));
    func();

    n = 20;
    func(); // 输出: Value: 20

    return 0;
}
```

### 5. 调用成员函数和访问成员变量

`<functional>` 提供了 `std::mem_fn`、`std::invoke` 和 `std::invoke_result` 等工具，用于调用成员函数和访问成员变量。

#### 示例：调用成员函数和访问成员变量

```cpp
#include <functional>
#include <iostream>

struct MyClass {
    void memberFunction(int x) {
        std::cout << "Member function called with " << x << std::endl;
    }

    int dataMember = 42;
};

int main() {
    MyClass obj;
    auto func = std::mem_fn(&MyClass::memberFunction);
    func(obj, 10); // 输出: Member function called with 10

    auto data = std::mem_fn(&MyClass::dataMember);
    std::cout << "Data member: " << data(obj) << std::endl; // 输出: Data member: 42

    return 0;
}
```

### 6. `std::invoke`

`std::invoke` 可以用于调用可调用对象（如函数指针、成员函数指针、函数对象、lambda 表达式等）。

#### 示例：使用 `std::invoke`

```cpp
#include <functional>
#include <iostream>

struct MyClass {
    void memberFunction(int x) {
        std::cout << "Member function called with " << x << std::endl;
    }
};

void free_function(int x) {
    std::cout << "Free function called with " << x << std::endl;
}

int main() {
    MyClass obj;

    // 调用成员函数
    std::invoke(&MyClass::memberFunction, obj, 10); // 输出: Member function called with 10

    // 调用普通函数
    std::invoke(free_function, 20); // 输出: Free function called with 20

    return 0;
}
```

