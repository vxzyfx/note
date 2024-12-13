---
title: C++类
---

## 枚举

C 和 C++ 都支持枚举类型（enumeration），用于定义一组命名整型常量。虽然基本概念相同，但 C++ 在枚举方面提供了更多的功能和灵活性。以下是 C 和 C++ 中枚举的详细介绍和对比。

### 1. C 中的枚举

在 C 中，枚举类型使用 `enum` 关键字定义。枚举常量的默认值从 0 开始，依次递增。

#### 定义和使用

```c
#include <stdio.h>

// 定义枚举类型
enum Color {
    RED,    // 0
    GREEN,  // 1
    BLUE    // 2
};

int main() {
    enum Color myColor = GREEN; // 使用枚举类型
    printf("My color is: %d\n", myColor); // 输出 1
    return 0;
}
```

#### 指定枚举值

可以显式地为枚举常量指定值。

```c
#include <stdio.h>

enum Color {
    RED = 1,
    GREEN = 3,
    BLUE = 5
};

int main() {
    enum Color myColor = GREEN;
    printf("My color is: %d\n", myColor); // 输出 3
    return 0;
}
```

### 2. C++ 中的枚举

C++ 继承了 C 的枚举功能，并且引入了增强型枚举（scoped enums），称为 `enum class`，它们提供了更好的类型安全性和作用域控制。

#### 定义和使用传统枚举

```cpp
#include <iostream>

enum Color {
    RED,    // 0
    GREEN,  // 1
    BLUE    // 2
};

int main() {
    Color myColor = GREEN;
    std::cout << "My color is: " << myColor << std::endl; // 输出 1
    return 0;
}
```

#### 定义和使用 `enum class`

`enum class` 提供了类型安全性，枚举常量在其作用域内，不会与其他枚举或常量冲突。

```cpp
#include <iostream>

enum class Color {
    RED,
    GREEN,
    BLUE
};

int main() {
    Color myColor = Color::GREEN; // 使用作用域解析符
    std::cout << "My color is: " << static_cast<int>(myColor) << std::endl; // 输出 1
    return 0;
}
```

### 3. 比较和注意事项

#### 类型安全

- **C 枚举**: 枚举常量是全局符号，可能会与其他符号冲突。
- **C++ 枚举**: `enum class` 引入了作用域，解决了命名冲突问题。

#### 强类型

- **C 枚举**: 枚举常量可以隐式转换为整数。
- **C++ 枚举**: `enum class` 常量不会隐式转换，需要显式转换。

#### 使用便捷性

- **C 枚举**: 语法简单，但可能导致命名冲突和类型安全问题。
- **C++ 枚举**: 语法稍微复杂，但提供了更强的类型安全性和命名空间控制。

### 4. 综合示例

以下是一个综合示例，展示了 C 和 C++ 中枚举的不同用法：

```c
// C 中的枚举示例
#include <stdio.h>

enum Weekday {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
};

int main() {
    enum Weekday today = WEDNESDAY;
    printf("Today is: %d\n", today); // 输出 3
    return 0;
}
```

```cpp
// C++ 中的枚举示例
#include <iostream>

enum class Weekday {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
};

int main() {
    Weekday today = Weekday::WEDNESDAY;
    std::cout << "Today is: " << static_cast<int>(today) << std::endl; // 输出 3
    return 0;
}
```

### 5. C++11 的新增功能

C++11 增加了一些与枚举相关的新功能，包括：

#### 强类型枚举

提供了更好的类型安全性和作用域管理。

```cpp
enum class Color : char {
    RED,
    GREEN,
    BLUE
};
```

#### 基础类型

可以指定枚举的基础类型（如 `char`、`int` 等）。

```cpp
enum class Status : unsigned int {
    OK = 0,
    WARNING = 1,
    ERROR = 2
};
```

## 联合体

联合体（union）是一种特殊的类类型，用于在同一个内存位置存储不同类型的变量。C 和 C++ 都支持联合体，但 C++ 提供了一些增强功能。

### 1. C 中的联合体

在 C 中，联合体使用 `union` 关键字定义。联合体中的所有成员共用同一块内存，所以联合体的大小等于其最大成员的大小。只能同时使用一个成员。

#### 定义和使用

```c
#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;

    data.i = 10;
    printf("data.i: %d\n", data.i);

    data.f = 220.5;
    printf("data.f: %.2f\n", data.f);

    snprintf(data.str, sizeof(data.str), "C Programming");
    printf("data.str: %s\n", data.str);

    // 注意：联合体中最后赋值的成员才是有效的，其他成员的值会被覆盖
    return 0;
}
```

### 2. C++ 中的联合体

C++ 中联合体的基本用法与 C 相同，但 C++ 提供了更多的功能，例如允许联合体包含构造函数、析构函数和成员函数。此外，C++ 中联合体可以嵌套使用。

#### 基本定义和使用

```cpp
#include <iostream>
#include <cstring>

union Data {
    int i;
    float f;
    char str[20];

    Data() { // 构造函数
        std::cout << "Data constructed" << std::endl;
    }

    ~Data() { // 析构函数
        std::cout << "Data destructed" << std::endl;
    }
};

int main() {
    Data data;

    data.i = 10;
    std::cout << "data.i: " << data.i << std::endl;

    data.f = 220.5;
    std::cout << "data.f: " << data.f << std::endl;

    std::strncpy(data.str, "C++ Programming", sizeof(data.str));
    std::cout << "data.str: " << data.str << std::endl;

    // 注意：联合体中最后赋值的成员才是有效的，其他成员的值会被覆盖
    return 0;
}
```

#### 联合体中的成员函数

```cpp
#include <iostream>

union Data {
    int i;
    float f;
    char str[20];

    Data() : i(0) {} // 初始化第一个成员

    void print() {
        std::cout << "Union contains integer: " << i << std::endl;
    }
};

int main() {
    Data data;
    data.i = 10;
    data.print();
    return 0;
}
```

### 3. 匿名联合体

C++ 和 C 都支持匿名联合体，它们没有名字，成员在包含它们的作用域内直接可用。

#### C 中的匿名联合体

```c
#include <stdio.h>

struct Example {
    int type;
    union {
        int i;
        float f;
    };
};

int main() {
    struct Example e;
    e.type = 0;
    e.i = 10;
    printf("e.i: %d\n", e.i);
    return 0;
}
```

#### C++ 中的匿名联合体

```cpp
#include <iostream>

struct Example {
    int type;
    union {
        int i;
        float f;
    };
};

int main() {
    Example e;
    e.type = 0;
    e.i = 10;
    std::cout << "e.i: " << e.i << std::endl;
    return 0;
}
```

### 4. 注意事项

- **内存管理**：由于联合体的所有成员共享相同的内存位置，在修改一个成员后，其他成员的值会被破坏，因此不能同时使用多个成员。
- **类型安全**：使用联合体时要注意类型安全，因为访问未被正确初始化的成员可能会导致未定义行为。
- **构造函数和析构函数**：在 C++ 中，可以在联合体中定义构造函数和析构函数，但要注意管理好对象的生命周期。


## 命名空间

在 C++ 中，命名空间（namespace）用于将标识符（如变量、函数、类等）进行逻辑分组，以避免命名冲突。命名空间提供了一种在大型项目中组织代码的有效方法，使代码更加清晰和模块化。

### 1. 定义命名空间

可以使用 `namespace` 关键字定义命名空间。

#### 语法

```cpp
namespace namespace_name {
    // declarations
}
```

#### 示例

```cpp
#include <iostream>

namespace MyNamespace {
    void myFunction() {
        std::cout << "Hello from MyNamespace!" << std::endl;
    }
}

int main() {
    MyNamespace::myFunction(); // 使用命名空间
    return 0;
}
```

### 2. 嵌套命名空间

命名空间可以嵌套定义，用于更细粒度的逻辑分组。

#### 示例

```cpp
#include <iostream>

namespace OuterNamespace {
    namespace InnerNamespace {
        void myFunction() {
            std::cout << "Hello from InnerNamespace!" << std::endl;
        }
    }
}

int main() {
    OuterNamespace::InnerNamespace::myFunction();
    return 0;
}
```

### 3. 使用命名空间

可以通过 `namespace` 和作用域解析运算符 `::` 来访问命名空间中的成员。

#### 示例

```cpp
#include <iostream>

namespace MyNamespace {
    int myVar = 10;

    void myFunction() {
        std::cout << "MyVar: " << myVar << std::endl;
    }
}

int main() {
    std::cout << "MyNamespace::myVar: " << MyNamespace::myVar << std::endl;
    MyNamespace::myFunction();
    return 0;
}
```

### 4. 命名空间别名

可以为命名空间创建别名，以简化访问。

#### 语法

```cpp
namespace alias = original_namespace;
```

#### 示例

```cpp
#include <iostream>

namespace VeryLongNamespaceName {
    void myFunction() {
        std::cout << "Hello from VeryLongNamespaceName!" << std::endl;
    }
}

namespace VNSN = VeryLongNamespaceName;

int main() {
    VNSN::myFunction();
    return 0;
}
```

### 5. 匿名命名空间

匿名命名空间用于定义只在当前文件中可见的标识符，避免外部链接。

#### 示例

```cpp
#include <iostream>

namespace {
    void myFunction() {
        std::cout << "Hello from an anonymous namespace!" << std::endl;
    }
}

int main() {
    myFunction();
    return 0;
}
```

### 6. 使用 `using` 声明

`using` 声明允许在当前作用域中使用命名空间中的成员，而无需每次都指定命名空间。

#### 语法

```cpp
using namespace_name::member_name;
```

#### 示例

```cpp
#include <iostream>

namespace MyNamespace {
    void myFunction() {
        std::cout << "Hello from MyNamespace!" << std::endl;
    }
}

int main() {
    using MyNamespace::myFunction;
    myFunction(); // 直接调用，不需要命名空间前缀
    return 0;
}
```

### 7. 使用 `using` 指令

`using` 指令使整个命名空间中的所有成员在当前作用域中可见。

#### 语法

```cpp
using namespace namespace_name;
```

#### 示例

```cpp
#include <iostream>

namespace MyNamespace {
    void myFunction() {
        std::cout << "Hello from MyNamespace!" << std::endl;
    }
    int myVar = 42;
}

int main() {
    using namespace MyNamespace;
    myFunction();
    std::cout << "MyVar: " << myVar << std::endl;
    return 0;
}
```

### 8. 标准命名空间 `std`

C++ 标准库的所有组件都在 `std` 命名空间中，因此需要使用 `std::` 前缀或 `using` 声明来访问它们。

#### 示例

```cpp
#include <iostream>
#include <vector>

int main() {
    std::cout << "Hello, World!" << std::endl;

    std::vector<int> vec = {1, 2, 3};
    for (int i : vec) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

## 类

在 C++ 中，类是用于创建用户自定义类型的基本构造。类封装了数据和操作数据的函数，提供了数据抽象和封装的功能。类是面向对象编程的核心概念之一。

### 1. 定义类

一个类定义包括类名、数据成员和成员函数。类的定义以 `class` 关键字开始。

#### 语法

```cpp
class ClassName {
public:
    // 数据成员
    // 成员函数
};
```

#### 示例

```cpp
#include <iostream>

class Person {
public:
    // 数据成员
    std::string name;
    int age;

    // 成员函数
    void introduce() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};

int main() {
    Person person; // 创建对象
    person.name = "John";
    person.age = 30;
    person.introduce(); // 调用成员函数
    return 0;
}
```

### 2. 构造函数和析构函数

构造函数用于在创建对象时初始化对象，析构函数用于在对象被销毁时执行清理操作。

#### 构造函数

构造函数的名称与类名相同，没有返回类型。

```cpp
class Person {
public:
    std::string name;
    int age;

    // 构造函数
    Person(std::string n, int a) {
        name = n;
        age = a;
    }

    void introduce() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};
```

#### 析构函数

析构函数的名称与类名相同，在前面加上 `~` 符号，没有参数和返回类型。

```cpp
class Person {
public:
    std::string name;
    int age;

    // 构造函数
    Person(std::string n, int a) : name(n), age(a) {}

    // 析构函数
    ~Person() {
        std::cout << "Destructor called for " << name << std::endl;
    }

    void introduce() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};
```
### 3. 类的初始化方式

在 C++ 中，类的初始化有多种方式，每种方式适用于不同的场景。了解这些初始化方式对于编写高效、可读性强的代码非常重要。以下是 C++ 类的几种主要初始化方式的详细介绍：

#### 1. 默认初始化

如果类没有定义任何构造函数，编译器会提供一个默认的无参数构造函数。默认初始化会调用该构造函数。

```cpp
class Example {
public:
    int value;
    // 编译器会提供一个默认的构造函数
};

int main() {
    Example obj; // 默认初始化
    std::cout << "Value: " << obj.value << std::endl; // 输出未定义的值
    return 0;
}
```

#### 2. 值初始化

值初始化使用大括号 `{}` 或圆括号 `()` 进行初始化。对于基本数据类型，值初始化会将它们初始化为零或空值。

```cpp
class Example {
public:
    int value;
};

int main() {
    Example obj{}; // 值初始化，将 value 初始化为 0
    std::cout << "Value: " << obj.value << std::endl; // 输出 0
    return 0;
}
```

#### 3. 显式初始化

显式初始化是在定义对象时直接为其成员变量赋值。这种方式通常用于简单的数据类型。

```cpp
class Example {
public:
    int value;

    Example() : value(10) {} // 使用初始化列表显式初始化 value
};

int main() {
    Example obj; // 调用显式初始化的构造函数
    std::cout << "Value: " << obj.value << std::endl; // 输出 10
    return 0;
}
```

#### 4. 初始化列表

初始化列表是在构造函数中初始化成员变量的最佳方式，特别是对于常量成员、引用成员或没有默认构造函数的类成员。

```cpp
class Example {
public:
    int value;
    const int constant;
    int& ref;

    Example(int val, int& r) : value(val), constant(100), ref(r) {} // 使用初始化列表
};

int main() {
    int refValue = 20;
    Example obj(10, refValue);
    std::cout << "Value: " << obj.value << ", Constant: " << obj.constant << ", Ref: " << obj.ref << std::endl; // 输出 10, 100, 20
    return 0;
}
```

#### 5. 聚合初始化

聚合初始化使用大括号 `{}` 直接初始化类的成员。要求类不能有用户定义的构造函数、私有或受保护的非静态数据成员、基类或虚函数。

```cpp
class Example {
public:
    int value;
    double d;
};

int main() {
    Example obj = {10, 20.5}; // 聚合初始化
    std::cout << "Value: " << obj.value << ", Double: " << obj.d << std::endl; // 输出 10, 20.5
    return 0;
}
```

#### 6. 动态初始化

动态初始化使用 `new` 关键字在堆上创建对象。需要手动管理对象的生命周期。

```cpp
class Example {
public:
    int value;

    Example(int val) : value(val) {}
};

int main() {
    Example* obj = new Example(10); // 动态初始化
    std::cout << "Value: " << obj->value << std::endl; // 输出 10
    delete obj; // 手动释放内存
    return 0;
}
```

#### 7. 委托构造函数 (C++11)

委托构造函数允许一个构造函数调用另一个构造函数，以简化初始化代码。

```cpp
class Example {
public:
    int value;
    double d;

    Example() : Example(0, 0.0) {} // 调用委托构造函数
    Example(int val, double doub) : value(val), d(doub) {}
};

int main() {
    Example obj; // 调用无参数构造函数，实际上委托给另一个构造函数
    std::cout << "Value: " << obj.value << ", Double: " << obj.d << std::endl; // 输出 0, 0.0
    return 0;
}
```

#### 8. 列表初始化 (C++11)

C++11 引入了列表初始化，使得类对象的初始化更加简洁和灵活。

```cpp
class Example {
public:
    int value;
    double d;

    Example(int val, double doub) : value(val), d(doub) {}
};

int main() {
    Example obj{10, 20.5}; // 列表初始化
    std::cout << "Value: " << obj.value << ", Double: " << obj.d << std::endl; // 输出 10, 20.5
    return 0;
}
```

### 4. 访问控制

C++ 提供了三种访问控制类型：`public`、`private` 和 `protected`。

- **public**: 公有成员可以在类的外部访问。
- **private**: 私有成员只能在类的内部访问。
- **protected**: 保护成员在派生类中可以访问，但在类的外部不能访问。

```cpp
class Person {
private:
    std::string name;
    int age;

public:
    void setName(std::string n) {
        name = n;
    }

    void setAge(int a) {
        age = a;
    }

    void introduce() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};
```

### 5. 成员函数

成员函数是在类的内部定义的函数，可以操作类的对象和数据成员。

```cpp
class Person {
public:
    std::string name;
    int age;

    void introduce() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};
```

### 6. 常量成员函数

常量成员函数不能修改类的成员变量。使用 `const` 关键字声明。

```cpp
class Person {
public:
    std::string name;
    int age;

    void introduce() const {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};
```

### 7. 静态成员

静态成员变量和函数属于类而不是类的对象。使用 `static` 关键字声明。

```cpp
class Person {
public:
    static int count; // 静态成员变量

    Person() {
        count++;
    }

    static void showCount() { // 静态成员函数
        std::cout << "Count: " << count << std::endl;
    }
};

// 定义并初始化静态成员变量
int Person::count = 0;

int main() {
    Person p1, p2;
    Person::showCount(); // 调用静态成员函数
    return 0;
}
```

### 8. 继承

继承允许创建一个新的类，该类继承一个或多个现有类的属性和方法。使用 `:` 符号定义派生类。

#### 基本继承

```cpp
class Base {
public:
    void baseFunction() {
        std::cout << "Base function" << std::endl;
    }
};

class Derived : public Base {
public:
    void derivedFunction() {
        std::cout << "Derived function" << std::endl;
    }
};

int main() {
    Derived d;
    d.baseFunction();
    d.derivedFunction();
    return 0;
}
```

#### 多重继承

C++ 支持一个类从多个基类继承。

```cpp
class Base1 {
public:
    void base1Function() {
        std::cout << "Base1 function" << std::endl;
    }
};

class Base2 {
public:
    void base2Function() {
        std::cout << "Base2 function" << std::endl;
    }
};

class Derived : public Base1, public Base2 {
public:
    void derivedFunction() {
        std::cout << "Derived function" << std::endl;
    }
};

int main() {
    Derived d;
    d.base1Function();
    d.base2Function();
    d.derivedFunction();
    return 0;
}
```

### 9. 虚函数和多态

虚函数允许在运行时调用派生类的实现，提供了动态多态性。

```cpp
class Base {
public:
    virtual void show() {
        std::cout << "Base show" << std::endl;
    }
};

class Derived : public Base {
public:
    void show() override {
        std::cout << "Derived show" << std::endl;
    }
};

int main() {
    Base* b = new Derived();
    b->show(); // 调用 Derived 类的 show() 方法
    delete b;
    return 0;
}
```

## 符号重载

在 C++ 中，符号重载（operator overloading）允许程序员定义或扩展运算符的行为，使其能够用于用户定义的类型（如类和结构体）。这增强了语言的灵活性和可读性，使得自定义类型可以像内置类型一样方便地进行操作。

在 C++ 中，大多数运算符可以被重载，但也有一些运算符是不能重载的。以下是可以重载和不能重载的运算符列表：

#### 可重载的运算符

| 运算符    | 名称                     | 示例               |
|-----------|--------------------------|--------------------|
| `+`       | 加法                     | `a + b`            |
| `-`       | 减法                     | `a - b`            |
| `*`       | 乘法                     | `a * b`            |
| `/`       | 除法                     | `a / b`            |
| `%`       | 取模                     | `a % b`            |
| `++`      | 前置/后置递增            | `++a, a++`         |
| `--`      | 前置/后置递减            | `--a, a--`         |
| `==`      | 等于                     | `a == b`           |
| `!=`      | 不等于                   | `a != b`           |
| `>`       | 大于                     | `a > b`            |
| `<`       | 小于                     | `a < b`            |
| `>=`      | 大于等于                 | `a >= b`           |
| `<=`      | 小于等于                 | `a <= b`           |
| `!`       | 逻辑非                   | `!a`               |
| `&&`      | 逻辑与                   | `a && b`           |
| `\|\|`      | 逻辑或                   | `a \|\| b`           |
| `&`       | 按位与                   | `a & b`            |
| `\|`       | 按位或                   | `a \| b`            |
| `^`       | 按位异或                 | `a ^ b`            |
| `~`       | 按位非                   | `~a`               |
| `<<`      | 左移                     | `a << b`           |
| `>>`      | 右移                     | `a >> b`           |
| `+=`      | 加法赋值                 | `a += b`           |
| `-=`      | 减法赋值                 | `a -= b`           |
| `*=`      | 乘法赋值                 | `a *= b`           |
| `/=`      | 除法赋值                 | `a /= b`           |
| `%=`      | 取模赋值                 | `a %= b`           |
| `&=`      | 按位与赋值               | `a &= b`           |
| `\|=`      | 按位或赋值               | `a \|= b`           |
| `^=`      | 按位异或赋值             | `a ^= b`           |
| `<<=`     | 左移赋值                 | `a <<= b`          |
| `>>=`     | 右移赋值                 | `a >>= b`          |
| `=`       | 赋值                     | `a = b`            |
| `[]`      | 下标                     | `a[b]`             |
| `()`      | 函数调用                 | `a()`              |
| `->`      | 成员访问（指针）         | `a->b`             |
| `->*`     | 成员指针访问             | `a->*b`            |
| `,`       | 逗号                     | `a, b`             |
| `new`     | 动态分配内存             | `new Type`         |
| `new[]`   | 动态分配数组             | `new Type[]`       |
| `delete`  | 动态释放内存             | `delete a`         |
| `delete[]`| 动态释放数组             | `delete[] a`       |
| `*`       | 指针解引用               | `*a`               |
| `&`       | 取地址                   | `&a`               |
| `+=`      | 加法赋值                 | `a += b`           |
| `->*`     | 指向成员的指针运算符     | `ptr->*mem_ptr`    |

#### 不能重载的运算符

| 运算符   | 名称                         |
|----------|------------------------------|
| `::`     | 作用域解析运算符              |
| `.`      | 成员访问运算符                |
| `.*`     | 成员指针访问运算符            |
| `?:`     | 条件运算符（三元运算符）      |
| `sizeof` | 对象大小运算符                |
| `typeid` | 类型信息运算符（运行时类型识别） |
| `alignof`| 对齐要求运算符                |
| `noexcept` | 异常说明符                  |


### 1. 什么是符号重载

符号重载是在类内部或类外部定义运算符函数，以便这些运算符可以作用于类对象。可以重载的大多数运算符包括算术运算符、比较运算符和赋值运算符等，但某些运算符（如 `::`、`.`、`.*` 和 `?:`）不能被重载。

### 2. 成员函数形式的符号重载

成员函数形式的符号重载是将运算符函数作为类的成员函数来定义。重载的运算符的第一个操作数必须是类的对象。

#### 语法

```cpp
return_type operator symbol (parameter_list) {
    // 函数体
}
```

#### 示例：重载 `+` 运算符

```cpp
#include <iostream>

class Complex {
public:
    double real, imag;

    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}

    // 成员函数形式的运算符重载
    Complex operator + (const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    void display() const {
        std::cout << "Real: " << real << ", Imag: " << imag << std::endl;
    }
};

int main() {
    Complex c1(3.0, 4.0), c2(1.0, 2.0);
    Complex c3 = c1 + c2; // 使用重载的 + 运算符
    c3.display();
    return 0;
}
```

### 3. 非成员函数形式的符号重载

非成员函数形式的符号重载是将运算符函数作为独立于类的友元函数或普通函数来定义。

#### 语法

```cpp
return_type operator symbol (const ClassName& lhs, const ClassName& rhs) {
    // 函数体
}
```

#### 示例：重载 `-` 运算符

```cpp
#include <iostream>

class Complex {
public:
    double real, imag;

    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}

    void display() const {
        std::cout << "Real: " << real << ", Imag: " << imag << std::endl;
    }

    // 声明友元函数重载
    friend Complex operator - (const Complex& lhs, const Complex& rhs);
};

// 友元函数形式的运算符重载
Complex operator - (const Complex& lhs, const Complex& rhs) {
    return Complex(lhs.real - rhs.real, lhs.imag - rhs.imag);
}

int main() {
    Complex c1(3.0, 4.0), c2(1.0, 2.0);
    Complex c3 = c1 - c2; // 使用重载的 - 运算符
    c3.display();
    return 0;
}
```

### 4. 其他常见的符号重载

#### 重载 `<<` 和 `>>` 运算符

通常用于输入输出流的重载。

```cpp
#include <iostream>

class Complex {
public:
    double real, imag;

    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}

    // 重载 << 运算符
    friend std::ostream& operator << (std::ostream& os, const Complex& c) {
        os << "Real: " << c.real << ", Imag: " << c.imag;
        return os;
    }

    // 重载 >> 运算符
    friend std::istream& operator >> (std::istream& is, Complex& c) {
        is >> c.real >> c.imag;
        return is;
    }
};

int main() {
    Complex c1;
    std::cout << "Enter real and imaginary parts: ";
    std::cin >> c1; // 使用重载的 >> 运算符
    std::cout << "You entered: " << c1 << std::endl; // 使用重载的 << 运算符
    return 0;
}
```

#### 重载 `==` 和 `!=` 运算符

用于比较对象的相等性。

```cpp
#include <iostream>

class Complex {
public:
    double real, imag;

    Complex(double r = 0.0, double i = 0.0) : real(r), imag(i) {}

    // 重载 == 运算符
    bool operator == (const Complex& other) const {
        return real == other.real && imag == other.imag;
    }

    // 重载 != 运算符
    bool operator != (const Complex& other) const {
        return !(*this == other);
    }
};

int main() {
    Complex c1(3.0, 4.0), c2(3.0, 4.0), c3(1.0, 2.0);
    if (c1 == c2) {
        std::cout << "c1 is equal to c2" << std::endl;
    }
    if (c1 != c3) {
        std::cout << "c1 is not equal to c3" << std::endl;
    }
    return 0;
}
```

### 5. 重要注意事项

- **返回值类型**：确保运算符重载函数的返回类型是合理的。例如，算术运算符通常返回新的对象，而赋值运算符返回引用。
- **对称性**：对于某些运算符（如 `+` 和 `-`），对称性非常重要。确保你的重载函数在处理不同类型的操作数时表现一致。
- **避免副作用**：运算符重载函数应尽量避免产生副作用（如修改全局状态），以确保它们的行为可预测且易于理解。
