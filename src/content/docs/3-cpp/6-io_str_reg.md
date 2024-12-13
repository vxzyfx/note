---
title: 输入输出, 字符串, 正则, 时间
---

## 输入输出库

C++ 输入输出库（IOStream Library）提供了一组用于处理输入输出操作的类和函数，使得在 C++ 中进行数据流处理变得简单和直观。输入输出库主要包含以下几个部分：

### 1. 基本输入输出流类

#### 1.1 `iostream` 类

- `std::cin`：标准输入流，通常连接到键盘。
- `std::cout`：标准输出流，通常连接到屏幕。
- `std::cerr`：标准错误流，用于输出错误信息，通常连接到屏幕，不带缓冲。
- `std::clog`：标准日志流，用于输出日志信息，通常连接到屏幕，带缓冲。

#### 示例

```cpp
#include <iostream>

int main() {
    std::cout << "Enter your name: ";
    std::string name;
    std::cin >> name;

    std::cout << "Hello, " << name << "!" << std::endl;
    std::cerr << "This is an error message." << std::endl;
    std::clog << "This is a log message." << std::endl;

    return 0;
}
```

### 2. 文件输入输出流类

#### 2.1 `fstream` 类

- `std::ifstream`：文件输入流类，用于从文件读取数据。
- `std::ofstream`：文件输出流类，用于向文件写入数据。
- `std::fstream`：文件读写流类，同时支持文件的读取和写入。

#### 示例

```cpp
#include <iostream>
#include <fstream>

int main() {
    // 写入文件
    std::ofstream outFile("example.txt");
    if (outFile.is_open()) {
        outFile << "Hello, file!" << std::endl;
        outFile.close();
    } else {
        std::cerr << "Unable to open file for writing" << std::endl;
    }

    // 从文件读取
    std::ifstream inFile("example.txt");
    if (inFile.is_open()) {
        std::string line;
        while (std::getline(inFile, line)) {
            std::cout << line << std::endl;
        }
        inFile.close();
    } else {
        std::cerr << "Unable to open file for reading" << std::endl;
    }

    return 0;
}
```

### 3. 字符串流类

#### 3.1 `sstream` 类

- `std::istringstream`：字符串输入流类，用于从字符串读取数据。
- `std::ostringstream`：字符串输出流类，用于向字符串写入数据。
- `std::stringstream`：字符串读写流类，同时支持字符串的读取和写入。

#### 示例

```cpp
#include <iostream>
#include <sstream>

int main() {
    std::string input = "123 45.67 Hello";

    // 从字符串读取数据
    std::istringstream iss(input);
    int a;
    float b;
    std::string c;
    iss >> a >> b >> c;
    std::cout << "Integer: " << a << ", Float: " << b << ", String: " << c << std::endl;

    // 向字符串写入数据
    std::ostringstream oss;
    oss << "Number: " << 123 << ", String: " << "Hello, world!";
    std::string output = oss.str();
    std::cout << "Output string: " << output << std::endl;

    return 0;
}
```

### 4. 格式化输入输出

C++ 输入输出库提供了多种格式化输入输出的方法，包括设置流格式、控制符、操纵器等。

#### 4.1 设置流格式

使用流成员函数设置流格式，如 `std::ios::setf` 和 `std::ios::unsetf`。

```cpp
#include <iostream>
#include <iomanip>

int main() {
    int num = 255;

    // 十进制输出
    std::cout << "Decimal: " << num << std::endl;

    // 十六进制输出
    std::cout << std::hex << "Hexadecimal: " << num << std::endl;

    // 八进制输出
    std::cout << std::oct << "Octal: " << num << std::endl;

    return 0;
}
```

#### 4.2 控制符和操纵器

使用标准库提供的控制符和操纵器进行格式化输出，如 `std::setw`、`std::setprecision`、`std::fixed` 等。

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.141592653589793;

    // 设置输出宽度和对齐方式
    std::cout << std::setw(10) << std::left << "Pi: " << pi << std::endl;

    // 设置精度和固定浮点数格式
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Pi (fixed, precision 2): " << pi << std::endl;

    return 0;
}
```

### 5. 文件模式和错误处理

#### 5.1 文件模式

打开文件时，可以指定文件模式，如 `std::ios::in`、`std::ios::out`、`std::ios::binary`、`std::ios::app` 等。

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ofstream outFile("example.txt", std::ios::out | std::ios::app);
    if (outFile.is_open()) {
        outFile << "Appending a new line." << std::endl;
        outFile.close();
    } else {
        std::cerr << "Unable to open file for writing" << std::endl;
    }

    return 0;
}
```

#### 5.2 错误处理

使用流的成员函数如 `std::ios::good`、`std::ios::fail`、`std::ios::bad` 和 `std::ios::eof` 检查流的状态。

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ifstream inFile("example.txt");
    if (inFile.is_open()) {
        std::string line;
        while (std::getline(inFile, line)) {
            if (inFile.bad()) {
                std::cerr << "Error reading file" << std::endl;
                break;
            }
            std::cout << line << std::endl;
        }
        inFile.close();
    } else {
        std::cerr << "Unable to open file for reading" << std::endl;
    }

    return 0;
}
```

## 字符串库

C++ 字符串库提供了丰富的功能，用于创建和操作字符串。主要包含两种字符串类型：`std::string`（用于处理单字节字符的字符串）和 `std::wstring`（用于处理宽字符的字符串）。以下是 C++ 字符串库的详细介绍和一些常见操作。

### 1. `std::string` 类

`std::string` 是用于处理单字节字符（如 ASCII 字符）的字符串类。它在 `<string>` 头文件中定义。

#### 基本操作

```cpp
#include <iostream>
#include <string>

int main() {
    // 创建字符串
    std::string str1 = "Hello";
    std::string str2("World");
    std::string str3(str1);

    // 拼接字符串
    std::string str4 = str1 + " " + str2;

    // 输出字符串
    std::cout << str4 << std::endl; // 输出: Hello World

    // 获取字符串长度
    std::cout << "Length: " << str4.length() << std::endl;

    // 访问字符
    std::cout << "First character: " << str4[0] << std::endl;

    // 修改字符
    str4[0] = 'h';
    std::cout << str4 << std::endl; // 输出: hello World

    return 0;
}
```

#### 字符串常见成员函数

- `length()` 或 `size()`：返回字符串长度。
- `empty()`：检查字符串是否为空。
- `clear()`：清空字符串内容。
- `append()`：在字符串末尾添加内容。
- `insert()`：在指定位置插入内容。
- `erase()`：删除指定位置的字符或子字符串。
- `substr()`：返回子字符串。
- `find()`：查找子字符串或字符的位置。
- `replace()`：替换子字符串。

#### 示例

```cpp
#include <iostream>
#include <string>

int main() {
    std::string str = "Hello, World!";

    // 查找子字符串
    size_t pos = str.find("World");
    if (pos != std::string::npos) {
        std::cout << "Found 'World' at position: " << pos << std::endl;
    }

    // 提取子字符串
    std::string sub = str.substr(7, 5);
    std::cout << "Substring: " << sub << std::endl; // 输出: World

    // 替换子字符串
    str.replace(7, 5, "C++");
    std::cout << "After replacement: " << str << std::endl; // 输出: Hello, C++!

    return 0;
}
```

### 2. `std::wstring` 类

`std::wstring` 是用于处理宽字符（如 Unicode 字符）的字符串类。它在 `<string>` 头文件中定义。

#### 示例

```cpp
#include <iostream>
#include <string>

int main() {
    // 创建宽字符串
    std::wstring wstr1 = L"Hello";
    std::wstring wstr2(L"World");
    std::wstring wstr3(wstr1);

    // 拼接宽字符串
    std::wstring wstr4 = wstr1 + L" " + wstr2;

    // 输出宽字符串
    std::wcout << wstr4 << std::endl; // 输出: Hello World

    // 获取宽字符串长度
    std::wcout << L"Length: " << wstr4.length() << std::endl;

    // 访问字符
    std::wcout << L"First character: " << wstr4[0] << std::endl;

    // 修改字符
    wstr4[0] = L'h';
    std::wcout << wstr4 << std::endl; // 输出: hello World

    return 0;
}
```

### 3. 字符串转换

C++ 提供了一些函数用于在字符串和其他数据类型之间进行转换。常见的转换函数包括：

- `std::to_string()`：将数值转换为 `std::string`。
- `std::stoi()`、`std::stol()`、`std::stoll()`：将 `std::string` 转换为整数类型。
- `std::stof()`、`std::stod()`、`std::stold()`：将 `std::string` 转换为浮点数类型。

#### 示例

```cpp
#include <iostream>
#include <string>

int main() {
    int num = 42;
    double pi = 3.14159;

    // 数值转换为字符串
    std::string str_num = std::to_string(num);
    std::string str_pi = std::to_string(pi);

    std::cout << "String number: " << str_num << std::endl;
    std::cout << "String pi: " << str_pi << std::endl;

    // 字符串转换为数值
    std::string str = "123";
    int value = std::stoi(str);
    std::cout << "Integer value: " << value << std::endl;

    return 0;
}
```

### 4. C 字符串与 C++ 字符串转换

C++ 提供了方便的方法在 C 风格字符串（即字符数组）和 C++ 字符串之间进行转换。

#### 示例

```cpp
#include <iostream>
#include <string>

int main() {
    // C 字符串转换为 C++ 字符串
    const char* cstr = "Hello, C++";
    std::string cppstr = cstr;
    std::cout << "C++ string: " << cppstr << std::endl;

    // C++ 字符串转换为 C 字符串
    std::string cppstr2 = "Hello, C";
    const char* cstr2 = cppstr2.c_str();
    std::cout << "C string: " << cstr2 << std::endl;

    return 0;
}
```

### 5. 字符串流

C++ 提供了字符串流类，用于将字符串作为输入或输出流进行操作。常见的字符串流类包括 `std::istringstream`、`std::ostringstream` 和 `std::stringstream`。

#### 示例

```cpp
#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::string input = "42 3.14 Hello";

    // 从字符串读取数据
    std::istringstream iss(input);
    int a;
    float b;
    std::string c;
    iss >> a >> b >> c;
    std::cout << "Integer: " << a << ", Float: " << b << ", String: " << c << std::endl;

    // 向字符串写入数据
    std::ostringstream oss;
    oss << "Number: " << 123 << ", String: " << "Hello, world!";
    std::string output = oss.str();
    std::cout << "Output string: " << output << std::endl;

    return 0;
}
```

## 正则库

C++11 引入了正则表达式库，用于支持正则表达式的匹配、搜索和替换操作。C++ 正则表达式库位于 `<regex>` 头文件中，提供了一组类和函数来处理正则表达式。

### 1. 正则表达式库的主要组件

#### 1.1 `std::regex`

`std::regex` 类表示一个正则表达式对象，可以用于匹配字符串。

#### 1.2 `std::smatch` 和 `std::cmatch`

- `std::smatch`：用于存储字符串匹配结果的类。
- `std::cmatch`：用于存储 C 风格字符串匹配结果的类。

#### 1.3 `std::regex_match` 和 `std::regex_search`

- `std::regex_match`：用于整个字符串的匹配。
- `std::regex_search`：用于搜索字符串中的模式。

#### 1.4 `std::regex_replace`

用于将正则表达式匹配的部分替换为新的字符串。

### 2. 使用示例

#### 2.1 匹配整个字符串

`std::regex_match` 用于检查整个字符串是否与正则表达式匹配。

```cpp
#include <iostream>
#include <regex>

int main() {
    std::string str = "abc123";
    std::regex re("abc[0-9]+");

    if (std::regex_match(str, re)) {
        std::cout << "The string matches the regular expression." << std::endl;
    } else {
        std::cout << "The string does not match the regular expression." << std::endl;
    }

    return 0;
}
```

#### 2.2 搜索字符串中的模式

`std::regex_search` 用于搜索字符串中是否包含匹配正则表达式的子串。

```cpp
#include <iostream>
#include <regex>

int main() {
    std::string str = "This is a test string with numbers 123 and 456.";
    std::regex re("[0-9]+");
    std::smatch match;

    if (std::regex_search(str, match, re)) {
        std::cout << "The first match is: " << match.str() << std::endl;
    } else {
        std::cout << "No match found." << std::endl;
    }

    return 0;
}
```

#### 2.3 搜索所有匹配的模式

可以使用 `std::regex_search` 的迭代器版本来查找字符串中的所有匹配项。

```cpp
#include <iostream>
#include <regex>

int main() {
    std::string str = "This is a test string with numbers 123 and 456.";
    std::regex re("[0-9]+");
    auto words_begin = std::sregex_iterator(str.begin(), str.end(), re);
    auto words_end = std::sregex_iterator();

    for (std::sregex_iterator i = words_begin; i != words_end; ++i) {
        std::smatch match = *i;
        std::cout << "Match: " << match.str() << std::endl;
    }

    return 0;
}
```

#### 2.4 替换匹配的子串

`std::regex_replace` 用于将正则表达式匹配的部分替换为新的字符串。

```cpp
#include <iostream>
#include <regex>

int main() {
    std::string str = "This is a test string with numbers 123 and 456.";
    std::regex re("[0-9]+");
    std::string result = std::regex_replace(str, re, "NUM");

    std::cout << "After replacement: " << result << std::endl;

    return 0;
}
```

### 3. 正则表达式的标志

正则表达式库提供了一些标志，用于修改正则表达式的行为：

- `std::regex_constants::icase`：忽略大小写。
- `std::regex_constants::nosubs`：不保存匹配结果。
- `std::regex_constants::optimize`：优化匹配速度。
- `std::regex_constants::collate`：使用区域设置的规则进行字符比较。

#### 示例：忽略大小写的匹配

```cpp
#include <iostream>
#include <regex>

int main() {
    std::string str = "Hello, World!";
    std::regex re("hello", std::regex_constants::icase);

    if (std::regex_search(str, re)) {
        std::cout << "Match found (case insensitive)." << std::endl;
    } else {
        std::cout << "No match found." << std::endl;
    }

    return 0;
}
```

### 4. 使用命名捕获组（C++20 引入）

C++20 引入了命名捕获组功能，使得匹配结果的管理更加方便。

#### 示例

```cpp
#include <iostream>
#include <regex>

int main() {
    std::string str = "My name is John, and I am 30 years old.";
    std::regex re(R"((?<name>\w+), and I am (?<age>\d+) years old.)");

    std::smatch match;
    if (std::regex_search(str, match, re)) {
        std::cout << "Name: " << match["name"].str() << std::endl;
        std::cout << "Age: " << match["age"].str() << std::endl;
    } else {
        std::cout << "No match found." << std::endl;
    }

    return 0;
}
```

## 时间库

C++11 引入了 `<chrono>` 头文件，提供了强大而灵活的时间库，用于处理时间点、时间段和时钟。C++ 时间库通过类型安全的方式处理时间和日期，避免了传统 C 风格的时间处理中的许多陷阱。以下是 C++ 时间库的详细介绍和一些常见操作。

### 1. 基本组件

C++ 时间库主要由以下三个基本组件构成：

1. **时钟（Clocks）**：获取当前时间点的来源。
2. **时间点（Time Points）**：特定时间点的表示。
3. **时间段（Durations）**：时间段或时间间隔的表示。

#### 1.1 时钟

时钟是获取当前时间点的来源。C++ 提供了几种常用的时钟：

- `std::chrono::system_clock`：系统时钟，表示当前的壁钟时间。
- `std::chrono::steady_clock`：单调时钟，不受系统时间调整影响。
- `std::chrono::high_resolution_clock`：高精度时钟，通常是 `system_clock` 或 `steady_clock` 的别名。

#### 示例：获取当前时间点

```cpp
#include <iostream>
#include <chrono>

int main() {
    auto now = std::chrono::system_clock::now();
    std::time_t now_time = std::chrono::system_clock::to_time_t(now);
    std::cout << "Current time: " << std::ctime(&now_time) << std::endl;

    return 0;
}
```

#### 1.2 时间点

时间点表示特定的时间点，通常与时钟关联。

#### 示例：获取当前时间点并格式化输出

```cpp
#include <iostream>
#include <chrono>
#include <ctime>

int main() {
    auto now = std::chrono::system_clock::now();
    std::time_t now_time = std::chrono::system_clock::to_time_t(now);
    std::cout << "Current time: " << std::ctime(&now_time);

    return 0;
}
```

#### 1.3 时间段

时间段表示一段时间或时间间隔。可以通过减去两个时间点来获得时间段。

#### 示例：计算程序执行时间

```cpp
#include <iostream>
#include <chrono>

int main() {
    auto start = std::chrono::high_resolution_clock::now();

    // 模拟一些工作
    for (int i = 0; i < 1000000; ++i);

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = end - start;

    std::cout << "Execution time: " << duration.count() << " seconds" << std::endl;

    return 0;
}
```

### 2. 时间段操作

C++ 时间库提供了多种时间段类型（如秒、毫秒、微秒等）和操作时间段的方法。

#### 示例：时间段类型和操作

```cpp
#include <iostream>
#include <chrono>

int main() {
    using namespace std::chrono;

    // 定义不同时间段
    seconds sec(1);
    milliseconds ms(1000);
    microseconds us(1000000);

    std::cout << "1 second is " << sec.count() << " seconds" << std::endl;
    std::cout << "1000 milliseconds is " << ms.count() << " milliseconds" << std::endl;
    std::cout << "1000000 microseconds is " << us.count() << " microseconds" << std::endl;

    // 时间段之间的转换
    auto sec_from_ms = duration_cast<seconds>(ms);
    std::cout << "1000 milliseconds is " << sec_from_ms.count() << " seconds" << std::endl;

    return 0;
}
```

### 3. 时钟和时间点操作

可以通过时钟获取当前时间点，通过时间点计算时间间隔或进行比较。

#### 示例：时钟和时间点操作

```cpp
#include <iostream>
#include <chrono>

int main() {
    using namespace std::chrono;

    // 获取当前时间点
    auto now = system_clock::now();

    // 获取当前时间点的时间戳
    std::time_t now_time = system_clock::to_time_t(now);
    std::cout << "Current time: " << std::ctime(&now_time);

    // 添加时间段到时间点
    auto future = now + hours(1);
    std::time_t future_time = system_clock::to_time_t(future);
    std::cout << "Future time (1 hour later): " << std::ctime(&future_time);

    return 0;
}
```

### 4. 其他常见操作

#### 4.1 睡眠

`std::this_thread::sleep_for` 和 `std::this_thread::sleep_until` 用于使线程休眠指定的时间段或直到指定的时间点。

```cpp
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    using namespace std::chrono_literals;

    std::cout << "Sleeping for 3 seconds..." << std::endl;
    std::this_thread::sleep_for(3s); // C++14 语法
    std::cout << "Awake!" << std::endl;

    return 0;
}
```

#### 4.2 定时器

可以使用时钟和时间点实现简单的定时器功能。

```cpp
#include <iostream>
#include <chrono>
#include <thread>

void timer(int seconds) {
    std::cout << "Timer started for " << seconds << " seconds." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(seconds));
    std::cout << "Timer ended." << std::endl;
}

int main() {
    timer(5); // 定时器设置为 5 秒
    return 0;
}
```

