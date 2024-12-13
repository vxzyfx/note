---
title: C++基础语法
---

## 入口函数

在 C++ 中，程序的入口函数是 `main` 函数。所有 C++ 程序都从 `main` 函数开始执行。`main` 函数有几种不同的签名，最常见的有两种：不带参数和带参数的形式。

#### 1. 无参数的 `main` 函数

这种形式的 `main` 函数没有参数，是最简单的形式。

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

#### 2. 带参数的 `main` 函数

这种形式的 `main` 函数接受两个参数：`argc` 和 `argv`，用于处理命令行参数。

- `int argc`: 表示命令行参数的数量。
- `char* argv[]`: 是一个数组，包含命令行参数的字符串。

```cpp
#include <iostream>

int main(int argc, char* argv[]) {
    std::cout << "Number of arguments: " << argc << std::endl;
    for (int i = 0; i < argc; ++i) {
        std::cout << "Argument " << i << ": " << argv[i] << std::endl;
    }
    return 0;
}
```

#### 3. `main` 函数返回值

`main` 函数的返回值类型是 `int`，通常返回 0 表示程序正常结束，返回其他值表示程序出现错误。

- `return 0;`: 表示程序成功执行。
- `return 1;`: 通常表示程序执行过程中遇到错误。

#### 4. `main` 函数的命令行参数

命令行参数允许用户在运行程序时传递参数，`main` 函数可以通过 `argc` 和 `argv` 访问这些参数。

##### 示例

假设有一个程序 `example.cpp`：

```cpp
#include <iostream>

int main(int argc, char* argv[]) {
    std::cout << "Program name: " << argv[0] << std::endl;
    if (argc > 1) {
        std::cout << "Arguments passed to the program:" << std::endl;
        for (int i = 1; i < argc; ++i) {
            std::cout << "Argument " << i << ": " << argv[i] << std::endl;
        }
    } else {
        std::cout << "No arguments passed to the program." << std::endl;
    }
    return 0;
}
```

编译并运行：

```sh
g++ example.cpp -o example
./example arg1 arg2 arg3
```

## C++ 中定义变量

在 C++ 中，定义变量的基本格式如下：

```cpp
type variable_name = value;
```

#### 基本变量类型定义

1. **整数类型**:
   - `int`: 通常用于整数。
   - `short`: 短整型。
   - `long`: 长整型。
   - `long long`: 超长整型。

```cpp
int a = 10;
short b = 20;
long c = 30L;
long long d = 40LL;
```

2. **浮点类型**:
   - `float`: 单精度浮点数。
   - `double`: 双精度浮点数。
   - `long double`: 长双精度浮点数。

```cpp
float e = 3.14f;
double f = 3.14159;
long double g = 3.141592653589793L;
```

3. **字符类型**:
   - `char`: 字符类型，用于存储单个字符。
   - `wchar_t`: 宽字符类型，用于存储宽字符。

```cpp
char h = 'A';
wchar_t i = L'B';
```

4. **布尔类型**:
   - `bool`: 布尔类型，用于存储真或假。

```cpp
bool j = true;
bool k = false;
```

#### 常量定义

使用 `const` 关键字定义常量：

```cpp
const int l = 50;
const float m = 3.14f;
```

#### 枚举类型

使用 `enum` 定义枚举类型：

```cpp
enum Color { RED, GREEN, BLUE };
Color myColor = RED;
```

#### 指针变量

指针是存储内存地址的变量：

```cpp
int n = 100;
int* ptr = &n; // 指针变量 ptr 存储 n 的地址
```

#### 引用变量

引用是另一个变量的别名：

```cpp
int o = 200;
int& ref = o; // ref 是 o 的引用
```

#### 数组变量

数组用于存储相同类型的元素集合：

```cpp
int arr[5] = {1, 2, 3, 4, 5};
```

#### 字符串

在 C++ 中，字符串可以使用字符数组或 `std::string` 定义：

```cpp
char str1[] = "Hello";
std::string str2 = "World";
```

### 变量初始化

#### 1. 默认初始化 (Default Initialization)

对于局部变量，如果没有显式初始化，局部变量的默认值是不确定的，即它们会包含垃圾值。对于全局变量和静态变量，默认初始化会将它们设置为零。

```cpp
int globalVar;      // 全局变量，默认初始化为 0
static int staticVar; // 静态变量，默认初始化为 0

void function() {
    int localVar;    // 局部变量，未初始化，值不确定
}
```

#### 2. 拷贝初始化 (Copy Initialization)

使用赋值符号 `=` 进行初始化。这种方式创建一个临时对象，然后将其拷贝给变量。

```cpp
int a = 10;
std::string str = "Hello";
```

#### 3. 直接初始化 (Direct Initialization)

直接调用构造函数进行初始化。与拷贝初始化不同，这种方式不会创建临时对象。

```cpp
int b(20);
std::string str2("World");
```

#### 4. 列表初始化 (List Initialization)

C++11 引入了列表初始化，可以使用大括号 `{}` 来初始化变量。列表初始化分为两种：统一初始化和聚合初始化。

##### 统一初始化 (Uniform Initialization)

这种方式适用于所有变量，包括内置类型和用户自定义类型。

```cpp
int c{30};
std::string str3{"C++"};
```

##### 聚合初始化 (Aggregate Initialization)

用于初始化聚合类型，如数组和结构体。

```cpp
int arr[3] = {1, 2, 3};
struct Point {
    int x;
    int y;
};
Point p = {4, 5};
```

#### 5. 值初始化 (Value Initialization)

C++ 中的值初始化会将变量初始化为其类型的默认值（零或空）。这种方式通常用于类的默认构造函数调用。

```cpp
int d{}; // d 被初始化为 0
std::string str4{}; // str4 被初始化为空字符串
```

#### 6. 零初始化 (Zero Initialization)

零初始化会将变量设置为零。这通常在静态或全局范围内的变量以及在 new 操作符中使用。

```cpp
int globalVar2 = {};  // 全局变量，零初始化为 0
static int staticVar2 = {}; // 静态变量，零初始化为 0

int* ptr = new int{}; // 使用 new 操作符，零初始化为 0
```

#### 7. 延迟初始化 (Lazy Initialization)

延迟初始化是在第一次使用变量时进行初始化。这通常用于提高程序的性能和资源管理。

```cpp
class LazyInit {
    int* data;
public:
    LazyInit() : data(nullptr) {}
    ~LazyInit() { delete data; }
    
    void initialize() {
        if (!data) {
            data = new int(10); // 延迟初始化
        }
    }
    
    int getData() {
        initialize();
        return *data;
    }
};
```

#### 示例

综合示例展示了不同类型的初始化：

```cpp
#include <iostream>
#include <string>
#include <vector>

struct Point {
    int x;
    int y;
};

int main() {
    // 默认初始化
    int globalVar; // 未初始化
    static int staticVar; // 初始化为 0
    
    // 拷贝初始化
    int a = 10;
    std::string str = "Hello";
    
    // 直接初始化
    int b(20);
    std::string str2("World");
    
    // 列表初始化
    int c{30};
    std::string str3{"C++"};
    int arr[3] = {1, 2, 3};
    Point p = {4, 5};
    
    // 值初始化
    int d{}; // 初始化为 0
    std::string str4{}; // 初始化为空字符串
    
    // 零初始化
    int* ptr = new int{}; // 零初始化为 0
    
    // 延迟初始化
    LazyInit lazy;
    std::cout << "Lazy Initialized Data: " << lazy.getData() << std::endl;

    return 0;
}
```

### 范围内变量和全局变量

#### 局部变量

局部变量在函数或块内部定义，只在该范围内有效：

```cpp
void function() {
    int localVar = 10; // 局部变量
}
```

#### 全局变量

全局变量在所有函数外部定义，在整个程序中有效：

```cpp
int globalVar = 20;

void function() {
    std::cout << globalVar << std::endl;
}
```

## 类型转换
在C++中，类型转换（Type Conversion）是将一种数据类型的值转换为另一种数据类型的值的过程。类型转换可以分为隐式转换（implicit conversion）和显式转换（explicit conversion）。

### 隐式转换

隐式转换由编译器自动完成，不需要显式指定。常见的隐式转换包括：

- 从较小范围的数据类型转换为较大范围的数据类型。例如，`int` 可以隐式转换为 `double`。
- 从 `char` 转换为 `int`。

```cpp
int a = 10;
double b = a; // 隐式转换 int 到 double
```

### 显式转换

显式转换需要程序员明确指定。常用的显式转换方式有：

1. C风格的强制类型转换
2. C++风格的强制类型转换

#### 1. C风格的强制类型转换

```cpp
int a = 10;
double b = (double)a; // C风格的强制类型转换
```

#### 2. C++风格的强制类型转换

C++提供了四种专门的类型转换运算符，分别是：

- `static_cast`
- `dynamic_cast`
- `const_cast`
- `reinterpret_cast`

**`static_cast`**

`static_cast` 用于在相关类型之间进行转换，如基本数据类型之间的转换和类层次结构中的上行转换（子类到父类的转换）。

```cpp
int a = 10;
double b = static_cast<double>(a); // static_cast 转换 int 到 double
```

**`dynamic_cast`**

`dynamic_cast` 主要用于处理类层次结构中的下行转换（父类到子类的转换）。它要求基类必须是多态类型（即包含虚函数）。

```cpp
class Base {
    virtual void func() {}
};

class Derived : public Base {};

Base* basePtr = new Derived();
Derived* derivedPtr = dynamic_cast<Derived*>(basePtr);
```

**`const_cast`**

`const_cast` 用于增加或移除变量的 `const` 属性。

```cpp
const int a = 10;
int* b = const_cast<int*>(&a); // 移除 const 属性
```

**`reinterpret_cast`**

`reinterpret_cast` 用于在不同类型的指针或引用之间进行转换，几乎不做任何类型检查。

```cpp
int a = 10;
void* ptr = reinterpret_cast<void*>(&a); // int* 转换为 void*
int* intPtr = reinterpret_cast<int*>(ptr); // void* 转换回 int*
```

### 示例

以下是一个综合使用上述类型转换的示例：

```cpp
#include <iostream>

class Base {
    virtual void func() {}
};

class Derived : public Base {
    void func() override {
        std::cout << "Derived::func()" << std::endl;
    }
};

int main() {
    int a = 10;
    double b = static_cast<double>(a); // 使用 static_cast 进行类型转换
    std::cout << "b: " << b << std::endl;

    Base* basePtr = new Derived();
    Derived* derivedPtr = dynamic_cast<Derived*>(basePtr); // 使用 dynamic_cast 进行类型转换
    if (derivedPtr) {
        derivedPtr->func();
    }

    const int c = 20;
    int* d = const_cast<int*>(&c); // 使用 const_cast 移除 const 属性
    *d = 30;
    std::cout << "c: " << c << ", *d: " << *d << std::endl;

    int e = 40;
    void* f = reinterpret_cast<void*>(&e); // 使用 reinterpret_cast 进行类型转换
    int* g = reinterpret_cast<int*>(f);
    std::cout << "e: " << *g << std::endl;

    delete basePtr;
    return 0;
}
```

## 字符串格式化

在C++中，字符串格式化有几种常见的方法，以下是每种方法的示例：

### 1. 使用 `sprintf`
这是C语言中常用的字符串格式化函数，C++也可以使用。

```cpp
#include <cstdio>

int main() {
    char buffer[100];
    const char* name = "Alice";
    int age = 30;
    sprintf(buffer, "My name is %s and I am %d years old.", name, age);
    printf("%s\n", buffer);
    return 0;
}
```

### 2. 使用 `std::stringstream`
这是C++中更常用的方法，利用字符串流来进行格式化。

```cpp
#include <iostream>
#include <sstream>

int main() {
    std::string name = "Alice";
    int age = 30;
    std::stringstream ss;
    ss << "My name is " << name << " and I am " << age << " years old.";
    std::string formattedString = ss.str();
    std::cout << formattedString << std::endl;
    return 0;
}
```

### 3. 使用 `std::format` (C++20)
从C++20开始，标准库中引入了 `std::format`，类似于Python的 `str.format`。

```cpp
#include <iostream>
#include <format>

int main() {
    std::string name = "Alice";
    int age = 30;
    std::string formattedString = std::format("My name is {} and I am {} years old.", name, age);
    std::cout << formattedString << std::endl;
    return 0;
}
```

### 4. 使用 `boost::format`
如果使用Boost库，可以使用 `boost::format` 进行字符串格式化。

```cpp
#include <iostream>
#include <boost/format.hpp>

int main() {
    std::string name = "Alice";
    int age = 30;
    std::string formattedString = (boost::format("My name is %s and I am %d years old.") % name % age).str();
    std::cout << formattedString << std::endl;
    return 0;
}
```

### 5. 使用 `std::snprintf`
类似于 `sprintf`，但更加安全，因为可以指定缓冲区的大小。

```cpp
#include <cstdio>
#include <string>

int main() {
    char buffer[100];
    const char* name = "Alice";
    int age = 30;
    std::snprintf(buffer, sizeof(buffer), "My name is %s and I am %d years old.", name, age);
    std::string formattedString(buffer);
    std::cout << formattedString << std::endl;
    return 0;
}
```

## 条件判断语句

在 C++ 中，判断语句用于根据条件的真或假来执行不同的代码块。常用的判断语句有 `if` 语句、`else if` 语句、`else` 语句和 `switch` 语句。

### 1. `if` 语句

`if` 语句用于在条件为真时执行某个代码块。

```cpp
#include <iostream>

int main() {
    int a = 10;
    
    if (a > 5) {
        std::cout << "a is greater than 5" << std::endl;
    }
    
    return 0;
}
```

### 2. `else if` 语句

`else if` 语句用于在前面的 `if` 或 `else if` 条件为假时，测试另一个条件。

```cpp
#include <iostream>

int main() {
    int a = 10;
    
    if (a > 10) {
        std::cout << "a is greater than 10" << std::endl;
    } else if (a == 10) {
        std::cout << "a is equal to 10" << std::endl;
    } else {
        std::cout << "a is less than 10" << std::endl;
    }
    
    return 0;
}
```

### 3. `else` 语句

`else` 语句用于在所有前面的 `if` 和 `else if` 条件都为假时执行一个代码块。

```cpp
#include <iostream>

int main() {
    int a = 5;
    
    if (a > 10) {
        std::cout << "a is greater than 10" << std::endl;
    } else if (a == 10) {
        std::cout << "a is equal to 10" << std::endl;
    } else {
        std::cout << "a is less than 10" << std::endl;
    }
    
    return 0;
}
```

#### 分支选择

```cpp
#include <iostream>
 
int main()
{
    // simple if-statement with an else clause
    int i = 2;
    if (i > 2)
        std::cout << i << " is greater than 2\n";
    else
        std::cout << i << " is not greater than 2\n";
 
    // nested if-statement
    int j = 1;
    if (i > 1)
        if (j > 2)
            std::cout << i << " > 1 and " << j << " > 2\n";
        else // this else is part of if (j > 2), not of if (i > 1)
            std::cout << i << " > 1 and " << j << " <= 2\n";
 
    // declarations can be used as conditions with dynamic_cast
    struct Base
    {
        virtual ~Base() {}
    };
 
    struct Derived : Base
    {
        void df() { std::cout << "df()\n"; }
    };
 
    Base* bp1 = new Base;
    Base* bp2 = new Derived;
 
    if (Derived* p = dynamic_cast<Derived*>(bp1)) // cast fails, returns nullptr
        p->df(); // not executed
 
    if (auto p = dynamic_cast<Derived*>(bp2)) // cast succeeds
        p->df(); // executed
}
```

#### 带初始化的if

```cpp [c++17]
std::map<int, std::string> m;
std::mutex mx;
extern bool shared_flag; // guarded by mx
 
int demo()
{
    if (auto it = m.find(10); it != m.end())
        return it->second.size();
 
    if (char buf[10]; std::fgets(buf, 10, stdin))
        m[0] += buf;
 
    if (std::lock_guard lock(mx); shared_flag)
    {
        unsafe_ping();
        shared_flag = false;
    }
 
    if (int s; int count = ReadBytesWithSignal(&s))
    {
        publish(count);
        raise(s);
    }
 
    if (const auto keywords = {"if", "for", "while"};
        std::ranges::any_of(keywords, [&tok](const char* kw) { return tok == kw; }))
    {
        std::cerr << "Token must not be a keyword\n";
    }
}
```
#### constexpr if

```cpp
#include <cmath>
#include <cstdint>
#include <cstring>
#include <iostream>
 
constexpr bool is_constant_evaluated() noexcept
{
    if consteval { return true; } else { return false; }
}
 
constexpr bool is_runtime_evaluated() noexcept
{
    if not consteval { return true; } else { return false; }
}
 
consteval std::uint64_t ipow_ct(std::uint64_t base, std::uint8_t exp)
{
    if (!base) return base;
    std::uint64_t res{1};
    while (exp)
    {
        if (exp & 1) res *= base;
        exp /= 2;
        base *= base;
    }
    return res;
}
 
constexpr std::uint64_t ipow(std::uint64_t base, std::uint8_t exp)
{
    if consteval // use a compile-time friendly algorithm
    {
        return ipow_ct(base, exp);
    }
    else // use runtime evaluation
    {
        return std::pow(base, exp);
    }
}
 
int main(int, const char* argv[])
{
    static_assert(ipow(0, 10) == 0 && ipow(2, 10) == 1024);
    std::cout << ipow(std::strlen(argv[0]), 3) << '\n';
}
```

### 4. `switch` 语句

`switch` 语句用于当有多个条件分支时，简化多重 `if-else if-else` 结构。它可以对一个变量的多个可能值进行判断，并执行对应的代码块。

```cpp
#include <iostream>

int main() {
    int a = 2;
    
    switch (a) {
        case 1:
            std::cout << "a is 1" << std::endl;
            break;
        case 2:
            std::cout << "a is 2" << std::endl;
            break;
        case 3:
            std::cout << "a is 3" << std::endl;
            break;
        default:
            std::cout << "a is not 1, 2, or 3" << std::endl;
            break;
    }
    
    return 0;
}
```

#### 注意事项

1. **大括号**: `if`, `else if`, `else` 语句中的代码块应使用 `{}` 包围，虽然对于单行代码可以省略，但为了代码的可读性和维护性，推荐始终使用 `{}`。

2. **`switch` 语句中的 `break`**: 每个 `case` 分支末尾应使用 `break` 语句来防止程序继续执行下一个 `case` 代码块。`default` 分支是可选的，但它能处理所有未列出的 `case` 情况，提供更健壮的程序行为。

#### 综合示例

以下示例展示了判断语句的使用：

```cpp
#include <iostream>

int main() {
    int number;
    std::cout << "Enter a number: ";
    std::cin >> number;

    // if-else if-else 语句
    if (number > 0) {
        std::cout << "The number is positive." << std::endl;
    } else if (number < 0) {
        std::cout << "The number is negative." << std::endl;
    } else {
        std::cout << "The number is zero." << std::endl;
    }

    // switch 语句
    switch (number) {
        case 0:
            std::cout << "You entered zero." << std::endl;
            break;
        case 1:
            std::cout << "You entered one." << std::endl;
            break;
        case 2:
            std::cout << "You entered two." << std::endl;
            break;
        default:
            std::cout << "You entered a number other than 0, 1, or 2." << std::endl;
            break;
    }

    return 0;
}
```

### 5. for循环

```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i) {
        std::cout << "i: " << i << std::endl;
    }
    return 0;
}
```

### 6. while循环

```cpp
#include <iostream>

int main() {
    int i = 0;
    while (i < 5) {
        std::cout << "i: " << i << std::endl;
        ++i;
    }
    return 0;
}
```


### 7. do-while循环

```cpp
#include <iostream>

int main() {
    int i = 0;
    do {
        std::cout << "i: " << i << std::endl;
        ++i;
    } while (i < 5);
    return 0;
}
```

### 8. range-for循环

在 C++ 中，要使一个类能够与范围 for 循环（range-based for loop）一起使用，类必须实现以下两种方法之一：

+ 提供 begin() 和 end() 成员函数，这些函数返回迭代器或指针。
+ 提供自定义的迭代器类，该类实现 operator*, operator!= 和 operator++ 操作符。

```cpp
#include <iostream>
#include <vector>
 
int main()
{
    std::vector<int> v = {0, 1, 2, 3, 4, 5};
 
    for (const int& i : v) // access by const reference
        std::cout << i << ' ';
    std::cout << '\n';
 
    for (auto i : v) // access by value, the type of i is int
        std::cout << i << ' ';
    std::cout << '\n';
 
    for (auto&& i : v) // access by forwarding reference, the type of i is int&
        std::cout << i << ' ';
    std::cout << '\n';
 
    const auto& cv = v;
 
    for (auto&& i : cv) // access by f-d reference, the type of i is const int&
        std::cout << i << ' ';
    std::cout << '\n';
 
    for (int n : {0, 1, 2, 3, 4, 5}) // the initializer may be a
                                     // braced-enclosed initializer list
        std::cout << n << ' ';
    std::cout << '\n';
 
    int a[] = {0, 1, 2, 3, 4, 5};
    for (int n : a) // the initializer may be an array
        std::cout << n << ' ';
    std::cout << '\n';
 
    for ([[maybe_unused]] int n : a)  
        std::cout << 1 << ' '; // the loop variable need not be used
    std::cout << '\n';
 
    for (auto n = v.size(); auto i : v) // the init-statement (C++20)
        std::cout << --n + i << ' ';
    std::cout << '\n';
 
    for (typedef decltype(v)::value_type elem_t; elem_t i : v)
    // typedef declaration as init-statement (C++20)
        std::cout << i << ' ';
    std::cout << '\n';
 
    for (using elem_t = decltype(v)::value_type; elem_t i : v)
    // alias declaration as init-statement (C++23)
        std::cout << i << ' ';
    std::cout << '\n';
}
```
### 9. 循环控制语句

- `break`：立即终止循环。
- `continue`：跳过当前迭代，继续下一次迭代。
- `goto`：跳转到标记的代码位置（不推荐使用）。

#### `break` 示例

```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 10; ++i) {
        if (i == 5) {
            break; // 终止循环
        }
        std::cout << "i: " << i << std::endl;
    }
    return 0;
}
```

#### `continue` 示例

```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 10; ++i) {
        if (i == 5) {
            continue; // 跳过当前迭代
        }
        std::cout << "i: " << i << std::endl;
    }
    return 0;
}
```

#### `goto` 示例

```cpp
#include <iostream>

int main() {
    int i = 0;
    while (i < 10) {
        if (i == 5) {
            goto skip; // 跳转到标记的代码位置
        }
        std::cout << "i: " << i << std::endl;
        ++i;
    }
    skip:
    std::cout << "Skipped to here" << std::endl;
    return 0;
}
```

## 函数

在 C++ 中，函数是执行特定任务的自包含代码块。函数的定义包括返回类型、函数名、参数列表和函数体。函数的声明告诉编译器函数的名称、返回类型和参数类型，定义则提供了函数的具体实现。

### 1. 函数声明

函数声明（原型）通常出现在头文件中或函数定义之前，告诉编译器函数的名称和参数类型。

```cpp
return_type function_name(parameter_list);
```

#### 示例

```cpp
int add(int a, int b); // 函数声明
```

### 2. 函数定义

函数定义提供了函数的具体实现。

```cpp
return_type function_name(parameter_list) {
    // function body
}
```

#### 示例

```cpp
int add(int a, int b) {
    return a + b;
}
```

### 3. 函数调用

定义函数后，可以在程序中调用它。

```cpp
int main() {
    int result = add(3, 4); // 函数调用
    std::cout << "Result: " << result << std::endl;
    return 0;
}
```

### 4. 函数参数

函数可以接受任意数量的参数。参数可以是值传递、引用传递或指针传递。

#### 值传递

参数的值传递，函数内部修改参数不会影响实参。

```cpp
void printValue(int x) {
    std::cout << "Value: " << x << std::endl;
}
```

#### 引用传递

参数的引用传递，函数内部修改参数会影响实参。

```cpp
void increment(int& x) {
    x++;
}
```

#### 指针传递

参数的指针传递，函数内部可以修改指针所指向的变量。

```cpp
void setValue(int* x) {
    *x = 10;
}
```

### 5. 函数返回值

函数可以返回一个值，也可以返回多个值（通过引用参数或返回结构体）。

#### 返回单个值

```cpp
int multiply(int a, int b) {
    return a * b;
}
```

#### 返回多个值（通过引用）

```cpp
void divide(int a, int b, int& quotient, int& remainder) {
    quotient = a / b;
    remainder = a % b;
}
```

#### 返回结构体

```cpp
struct Result {
    int quotient;
    int remainder;
};

Result divide(int a, int b) {
    Result result;
    result.quotient = a / b;
    result.remainder = a % b;
    return result;
}
```

### 6. 函数重载

C++ 支持函数重载，即可以定义多个同名函数，但参数列表必须不同。

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

### 7. 内联函数

内联函数使用 `inline` 关键字定义，建议编译器将函数体插入到每个调用该函数的地方，减少函数调用的开销。

```cpp
inline int square(int x) {
    return x * x;
}
```

### 8. 默认参数

函数参数可以有默认值，如果调用时未提供参数，则使用默认值。

```cpp
void printMessage(std::string message = "Hello, World!") {
    std::cout << message << std::endl;
}
```

### 9. 变参函数

在 C++ 中，可变参数函数允许函数接受可变数量的参数。主要有两种实现方式：一种是使用 C 风格的 `...` 语法（也称为 variadic functions），另一种是使用 C++11 引入的 `std::initializer_list` 或模板参数包（template parameter pack）。以下是对这两种方法的详细介绍和示例。

#### 1. 使用 C 风格的可变参数函数

这种方法使用 `stdarg.h` 头文件中的宏来处理可变参数。这种方法适用于需要向后兼容 C 代码的情况。

##### 语法

```cpp
#include <cstdarg>

return_type function_name(fixed_parameters, ...);
```

##### 示例

```cpp
#include <iostream>
#include <cstdarg>

// 可变参数函数示例：计算多个数的和
int sum(int count, ...) {
    va_list args;
    va_start(args, count);

    int total = 0;
    for (int i = 0; i < count; ++i) {
        total += va_arg(args, int);
    }

    va_end(args);
    return total;
}

int main() {
    std::cout << "Sum of 1, 2, 3: " << sum(3, 1, 2, 3) << std::endl;
    std::cout << "Sum of 5, 10, 15, 20: " << sum(4, 5, 10, 15, 20) << std::endl;
    return 0;
}
```

#### 2. 使用 `std::initializer_list`

这种方法使用 C++11 引入的 `std::initializer_list` 来处理可变参数。它提供了类型安全并且易于使用。

##### 语法

```cpp
#include <initializer_list>

return_type function_name(std::initializer_list<type> args);
```

##### 示例

```cpp
#include <iostream>
#include <initializer_list>

// 可变参数函数示例：计算多个数的和
int sum(std::initializer_list<int> args) {
    int total = 0;
    for (int value : args) {
        total += value;
    }
    return total;
}

int main() {
    std::cout << "Sum of 1, 2, 3: " << sum({1, 2, 3}) << std::endl;
    std::cout << "Sum of 5, 10, 15, 20: " << sum({5, 10, 15, 20}) << std::endl;
    return 0;
}
```

#### 3. 使用模板参数包

模板参数包是 C++11 引入的一种更强大的处理可变参数的方法，它适用于需要处理不同类型的可变参数。

##### 语法

```cpp
template<typename... Args>
return_type function_name(Args... args);
```

##### 示例

```cpp
#include <iostream>

// 可变参数函数示例：打印多个参数
template<typename... Args>
void print(Args... args) {
    (std::cout << ... << args) << std::endl; // C++17 折叠表达式
}

int main() {
    print(1, 2, 3);
    print("Hello", ", ", "world", "!");
    print("The answer is: ", 42);
    return 0;
}
```

#### 综合示例

以下是一个综合示例，展示了这三种方法的使用：

```cpp
#include <iostream>
#include <cstdarg>
#include <initializer_list>

// C 风格可变参数函数
int sum_c_style(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; ++i) {
        total += va_arg(args, int);
    }
    va_end(args);
    return total;
}

// 使用 std::initializer_list
int sum_initializer_list(std::initializer_list<int> args) {
    int total = 0;
    for (int value : args) {
        total += value;
    }
    return total;
}

// 使用模板参数包
template<typename... Args>
void print(Args... args) {
    (std::cout << ... << args) << std::endl;
}

int main() {
    // C 风格可变参数函数调用
    std::cout << "C style sum of 1, 2, 3: " << sum_c_style(3, 1, 2, 3) << std::endl;
    std::cout << "C style sum of 5, 10, 15, 20: " << sum_c_style(4, 5, 10, 15, 20) << std::endl;

    // 使用 std::initializer_list
    std::cout << "Initializer list sum of 1, 2, 3: " << sum_initializer_list({1, 2, 3}) << std::endl;
    std::cout << "Initializer list sum of 5, 10, 15, 20: " << sum_initializer_list({5, 10, 15, 20}) << std::endl;

    // 使用模板参数包
    print(1, 2, 3);
    print("Hello", ", ", "world", "!");
    print("The answer is: ", 42);

    return 0;
}
```

### 10. 示例程序

以下是一个综合示例，展示了上述概念的应用：

```cpp
#include <iostream>
#include <string>

// 函数声明
int add(int a, int b);
void printValue(int x);
void increment(int& x);
void setValue(int* x);
struct Result divide(int a, int b);
inline int square(int x);
void printMessage(std::string message = "Hello, World!");

// 主函数
int main() {
    // 值传递
    int a = 5;
    printValue(a);

    // 引用传递
    increment(a);
    printValue(a);

    // 指针传递
    int b = 7;
    setValue(&b);
    printValue(b);

    // 返回结构体
    Result result = divide(10, 3);
    std::cout << "Quotient: " << result.quotient << ", Remainder: " << result.remainder << std::endl;

    // 内联函数
    std::cout << "Square of 4: " << square(4) << std::endl;

    // 默认参数
    printMessage();
    printMessage("Custom Message");

    return 0;
}

// 函数定义
int add(int a, int b) {
    return a + b;
}

void printValue(int x) {
    std::cout << "Value: " << x << std::endl;
}

void increment(int& x) {
    x++;
}

void setValue(int* x) {
    *x = 10;
}

struct Result divide(int a, int b) {
    Result result;
    result.quotient = a / b;
    result.remainder = a % b;
    return result;
}

inline int square(int x) {
    return x * x;
}

void printMessage(std::string message) {
    std::cout << message << std::endl;
}
```

## 错误处理

C++ 提供了多种错误处理机制，以确保程序能够正确处理异常情况和错误。主要的错误处理机制包括异常（exceptions）、错误代码（error codes）以及断言（assertions）。

### 1. 异常处理

异常处理是 C++ 中一种常见的错误处理机制，允许程序在运行时捕获和处理错误。异常处理使用 `try`、`catch` 和 `throw` 关键字。

#### 1.1 基本异常处理

```cpp
#include <iostream>
#include <stdexcept>

int main() {
    try {
        throw std::runtime_error("An error occurred");
    } catch (const std::runtime_error& e) {
        std::cout << "Caught runtime_error: " << e.what() << std::endl;
    } catch (...) {
        std::cout << "Caught an unknown exception" << std::endl;
    }

    return 0;
}
```

#### 1.2 自定义异常

可以定义自己的异常类型，以提供更具体的错误信息。

```cpp
#include <iostream>
#include <exception>
#include <string>

class MyException : public std::exception {
public:
    MyException(const std::string& message) : message_(message) {}
    const char* what() const noexcept override {
        return message_.c_str();
    }
private:
    std::string message_;
};

int main() {
    try {
        throw MyException("A custom error occurred");
    } catch (const MyException& e) {
        std::cout << "Caught MyException: " << e.what() << std::endl;
    }

    return 0;
}
```

### 2. 错误代码

使用错误代码是一种更传统的错误处理方式，通常用于返回值来指示操作是否成功。

#### 2.1 使用返回值指示错误

```cpp
#include <iostream>

int divide(int a, int b, int& result) {
    if (b == 0) {
        return -1; // 错误代码
    }
    result = a / b;
    return 0; // 成功
}

int main() {
    int result;
    int error = divide(10, 0, result);
    if (error != 0) {
        std::cout << "Division by zero error" << std::endl;
    } else {
        std::cout << "Result: " << result << std::endl;
    }

    return 0;
}
```

#### 2.2 使用 `std::optional` 返回可选值

在 C++17 中，可以使用 `std::optional` 来返回一个可选值，以指示操作是否成功。

```cpp
#include <iostream>
#include <optional>

std::optional<int> divide(int a, int b) {
    if (b == 0) {
        return std::nullopt; // 错误
    }
    return a / b; // 成功
}

int main() {
    auto result = divide(10, 0);
    if (result) {
        std::cout << "Result: " << *result << std::endl;
    } else {
        std::cout << "Division by zero error" << std::endl;
    }

    return 0;
}
```

### 3. 断言

断言用于在开发过程中捕获程序中的逻辑错误。断言在调试版本中有效，但在发布版本中通常被禁用。

#### 示例：使用 `assert`

```cpp
#include <iostream>
#include <cassert>

int main() {
    int x = 5;
    int y = 0;

    assert(y != 0 && "Division by zero"); // 检查 y 是否为 0

    int result = x / y;
    std::cout << "Result: " << result << std::endl;

    return 0;
}
```

### 4. 标准库中的错误处理类

#### 4.1 `std::error_code` 和 `std::error_condition`

C++11 引入了 `std::error_code` 和 `std::error_condition`，用于表示和处理错误代码。这些类通常与标准库中的 I/O 库一起使用。

#### 示例：使用 `std::error_code`

```cpp
#include <iostream>
#include <system_error>

int main() {
    std::error_code ec = std::make_error_code(std::errc::file_exists);
    std::cout << "Error message: " << ec.message() << std::endl;

    if (ec == std::errc::file_exists) {
        std::cout << "File already exists." << std::endl;
    }

    return 0;
}
```

#### 4.2 `std::exception_ptr` 和 `std::rethrow_exception`

C++11 引入了 `std::exception_ptr` 和 `std::rethrow_exception`，用于捕获和重新抛出异常，通常用于异步编程和多线程编程。

#### 示例：使用 `std::exception_ptr`

```cpp
#include <iostream>
#include <exception>
#include <thread>

void thread_function(std::exception_ptr& eptr) {
    try {
        throw std::runtime_error("Error in thread");
    } catch (...) {
        eptr = std::current_exception();
    }
}

int main() {
    std::exception_ptr eptr;
    std::thread t(thread_function, std::ref(eptr));
    t.join();

    if (eptr) {
        try {
            std::rethrow_exception(eptr);
        } catch (const std::exception& e) {
            std::cout << "Caught exception: " << e.what() << std::endl;
        }
    }

    return 0;
}
```
