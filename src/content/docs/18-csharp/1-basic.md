---
title: C#基础
---

## .net框架

### 1. **公共语言运行时（CLR - Common Language Runtime）**
CLR是.NET框架的核心，负责管理代码的执行。它提供了以下功能：
- 内存管理
- 线程管理
- 异常处理
- 安全管理
- 垃圾回收

### 2. **.NET框架类库（FCL - Framework Class Library）**
FCL是一个庞大的类库集合，为应用程序开发提供了大量的功能。主要包括：
- 基础类库：如集合、文件I/O、字符串处理等。
- 数据访问：如ADO.NET，用于数据库操作。
- 网络：如System.Net命名空间，用于网络编程。
- Web应用：如ASP.NET，用于开发动态Web应用程序。
- Windows窗体：用于桌面应用程序开发。
- WPF（Windows Presentation Foundation）：用于构建用户界面丰富的桌面应用程序。

### 3. **ADO.NET**
ADO.NET是一个数据访问技术，用于在.NET应用程序中与数据源（如数据库、XML文件）进行交互。它支持连接数据库、执行命令、处理数据等操作。

### 4. **ASP.NET**
ASP.NET是一个用于构建动态Web应用程序的框架。它包括：
- Web Forms：传统的ASP.NET Web开发模式。
- ASP.NET MVC：基于Model-View-Controller模式的Web开发框架。
- ASP.NET Web API：用于构建RESTful服务的框架。
- ASP.NET Core：跨平台的高性能Web框架，适用于现代Web应用程序开发。

### 5. **Windows Communication Foundation（WCF）**
WCF是一个用于构建面向服务的应用程序的框架，支持各种网络协议和消息格式。它用于开发和配置分布式系统。

### 6. **Windows Presentation Foundation（WPF）**
WPF是一个用于构建用户界面丰富的桌面应用程序的框架。它提供了强大的图形和多媒体功能，并支持XAML（可扩展应用程序标记语言）用于UI设计。

### 7. **Windows Workflow Foundation（WF）**
WF是一个用于构建工作流和业务流程自动化的框架。它提供了一个可扩展的工作流引擎和图形化设计工具。

### 8. **Entity Framework**
Entity Framework是一个ORM（对象关系映射）框架，简化了数据访问层的开发。它允许开发人员使用面向对象的编程方法操作数据库。

### 9. **LINQ（Language Integrated Query）**
LINQ是.NET中的一组语言扩展，允许使用类似SQL的查询语法来操作集合、数据库、XML等数据源。主要包括：
- LINQ to Objects
- LINQ to SQL
- LINQ to XML
- LINQ to Entities

### 10. **Windows Forms**
Windows Forms是一个用于构建传统桌面应用程序的GUI框架。它提供了大量的控件和组件，用于创建用户界面。

### 11. **Xamarin**
Xamarin是一个用于跨平台移动应用开发的框架，允许使用C#和.NET在iOS、Android和Windows平台上构建应用程序。

### 12. **.NET Core**
.NET Core是一个开源的、跨平台的版本，用于构建现代的云端和跨平台应用。它包括了ASP.NET Core、Entity Framework Core等组件。

### 13. **NuGet**
NuGet是.NET的包管理器，允许开发人员轻松地下载、安装和管理第三方库和工具。

## 注释

在C#中，注释是用于在代码中加入描述性文字，这些文字在程序运行时会被编译器忽略。注释有助于提高代码的可读性和可维护性。C#支持三种类型的注释：

### 1. 单行注释
单行注释以`//`开头，注释内容位于`//`之后的同一行。

```csharp
// 这是一个单行注释
int x = 10; // 声明一个整数变量并赋值为10
```

### 2. 多行注释
多行注释以`/*`开头，以`*/`结尾，可以跨越多行。

```csharp
/*
这是一个多行注释
它可以跨越多行
用于描述复杂的代码块或提供详细的说明
*/
int y = 20;
```

### 3. 文档注释
文档注释以`///`开头，通常用于生成代码文档。它们使用XML格式，可以包含各种标签以描述代码元素（如类、方法、属性等）。

```csharp
/// <summary>
/// 这是一个示例方法，它做了一些事情。
/// </summary>
/// <param name="a">第一个整数参数。</param>
/// <param name="b">第二个整数参数。</param>
/// <returns>返回两个整数的和。</returns>
public int Add(int a, int b)
{
    return a + b;
}
```

### 使用文档注释的常见XML标签

- `<summary>`：提供一个简短的描述。
- `<param>`：描述方法的参数。
- `<returns>`：描述方法的返回值。
- `<remarks>`：提供附加说明或注释。
- `<example>`：提供示例代码。
- `<exception>`：描述方法可能抛出的异常。

#### 示例

```csharp
/// <summary>
/// 计算两个整数的和。
/// </summary>
/// <param name="a">第一个整数参数。</param>
/// <param name="b">第二个整数参数。</param>
/// <returns>返回两个整数的和。</returns>
/// <remarks>
/// 这是一个简单的加法方法。
/// </remarks>
/// <example>
/// <code>
/// int result = Add(5, 3);
/// Console.WriteLine(result); // 输出: 8
/// </code>
/// </example>
/// <exception cref="ArgumentOutOfRangeException">
/// 当参数超出范围时抛出此异常。
/// </exception>
public int Add(int a, int b)
{
    if (a < 0 || b < 0)
    {
        throw new ArgumentOutOfRangeException("参数不能为负数");
    }
    return a + b;
}
```

## 变量定义

在 C# 中，变量可以通过多种方式定义，具体取决于变量的类型和使用场景。以下是几种常见的变量定义方式：

1. 显式类型定义

这种方式需要在定义变量时指定变量的类型。

```csharp
int number = 10;
string name = "Alice";
bool isActive = true;
double price = 99.99;
```

2. 使用 `var` 隐式类型推断

在 C# 中，编译器可以根据变量的初始值推断出变量的类型，这时可以使用 `var` 关键字。

```csharp
var number = 10;         // 编译器推断为 int
var name = "Alice";      // 编译器推断为 string
var isActive = true;     // 编译器推断为 bool
var price = 99.99;       // 编译器推断为 double
```

注意：`var` 只能用于局部变量或方法中的变量定义，不能用于字段或属性定义。

3. 常量定义

使用 `const` 关键字可以定义常量。常量的值在编译时必须指定，并且在运行时不能更改。

```csharp
const int MaxValue = 100;
const string Greeting = "Hello, World!";
```

4. 只读变量

使用 `readonly` 关键字可以定义只读字段。只读字段在构造函数执行完毕后不能被修改。

```csharp
public class Example
{
    public readonly int readonlyField;

    public Example(int value)
    {
        readonlyField = value;
    }
}
```

5. 静态变量

使用 `static` 关键字定义的变量是属于类的，而不是属于类的实例。静态变量在类的所有实例之间共享。

```csharp
public class Example
{
    public static int staticField = 42;
}
```

6. 局部变量

局部变量是在方法、构造函数或代码块中定义的变量，其作用范围限于该方法或代码块。

```csharp
public void ExampleMethod()
{
    int localVar = 10; // 只能在 ExampleMethod 中访问
}
```

7. 成员变量（字段）

成员变量是类或结构体的字段，作用范围是整个类或结构体，可以在类的所有方法中访问。

```csharp
public class Example
{
    private int instanceField;
    public string Name;

    public void ExampleMethod()
    {
        instanceField = 10;
        Name = "Bob";
    }
}
```

8. 自动属性

在 C# 中，属性（Property）是对字段的封装。可以使用自动属性来定义带有 `get` 和 `set` 访问器的变量。

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

9. 静态局部函数中的局部变量

在 C# 8.0 及更高版本中，可以在静态局部函数中定义局部变量。这些变量只能在函数内部使用。

```csharp
public void ExampleMethod()
{
    static void LocalFunction()
    {
        int localVariable = 5;
        Console.WriteLine(localVariable);
    }
    LocalFunction();
}
```

10. 动态类型

使用 `dynamic` 关键字可以定义动态类型变量。编译器不会在编译时检查其类型，类型会在运行时决定。

```csharp
dynamic dynamicVar = 10;
dynamicVar = "Hello"; // 动态变量可以在运行时改变类型
```

11. 解构赋值

```bash
var myTuple = (Id: 1, Name: "John", IsActive: true); // 为元组的元素命名

(int number, string text, bool flag) myTuple = (1, "Hello", true);
var (number, text, flag) = myTuple;
```

## 变量类型

| 变量类型       | 说明                                              | 默认值          | 范围                                                                                                   |
| --------------- | ------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `int`           | 整数类型                                          | 0               | -2,147,483,648 到 2,147,483,647                                                                        |
| `long`          | 长整数类型                                        | 0L              | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807                                                |
| `float`         | 单精度浮点类型                                    | 0.0f            | ±1.5e−45 到 ±3.4e38, 7位精度                                                                           |
| `double`        | 双精度浮点类型                                    | 0.0d            | ±5.0e−324 到 ±1.7e308, 15-16位精度                                                                     |
| `decimal`       | 高精度小数类型                                    | 0.0m            | ±1.0e−28 到 ±7.9e28, 28-29位精度                                                                       |
| `char`          | 字符类型                                          | '\0'            | 任意单个16位Unicode字符                                                                                |
| `string`        | 字符串类型                                        | null            | 任意长度的Unicode字符序列                                                                             |
| `bool`          | 布尔类型                                          | false           | true 或 false                                                                                         |
| `byte`          | 8位无符号整数类型                                 | 0               | 0 到 255                                                                                              |
| `sbyte`         | 8位有符号整数类型                                 | 0               | -128 到 127                                                                                           |
| `short`         | 16位有符号整数类型                                | 0               | -32,768 到 32,767                                                                                     |
| `ushort`        | 16位无符号整数类型                                | 0               | 0 到 65,535                                                                                           |
| `uint`          | 32位无符号整数类型                                | 0u              | 0 到 4,294,967,295                                                                                    |
| `ulong`         | 64位无符号整数类型                                | 0UL             | 0 到 18,446,744,073,709,551,615                                                                       |
| `object`        | 所有类型的基类                                    | null            | 任意类型                                                                                              |
| `dynamic`       | 动态类型（编译时类型检查被推迟到运行时）          | null            | 任意类型                                                                                              |

## 类型转换

在C#中，类型转换分为隐式转换和显式转换（也称为强制转换）。以下是关于C#类型转换的详细说明：

### 隐式转换

隐式转换是指编译器可以自动完成的转换，无需显式地指定转换方式。这通常发生在不会导致数据丢失的情况下，例如将一个小范围类型转换为一个大范围类型。

```csharp
int num = 12345;
long bigNum = num; // 隐式转换：int 转换为 long
float numFloat = num; // 隐式转换：int 转换为 float
```

### 显式转换（强制转换）

显式转换是指需要明确指定转换方式的转换，因为它可能会导致数据丢失或转换失败。这通常发生在将大范围类型转换为小范围类型，或者在类型之间没有直接关系的情况下。

#### 使用强制转换运算符 `(type)`

```csharp
double num = 12345.67;
int intNum = (int)num; // 显式转换：double 转换为 int，会丢失小数部分
```

#### 使用转换方法

C#提供了一些方法进行类型转换，例如 `Convert` 类中的方法。

```csharp
string str = "12345";
int intNum = Convert.ToInt32(str); // 使用 Convert 类的方法将 string 转换为 int

double doubleNum = Convert.ToDouble(str); // 将 string 转换为 double
```

### 类型转换异常处理

在进行类型转换时，如果转换不成功，会抛出异常。例如，将字符串转换为数字时，如果字符串不包含有效的数字格式，会抛出 `FormatException`。

```csharp
try
{
    string str = "12345abc";
    int intNum = Convert.ToInt32(str); // 这行代码会抛出 FormatException
}
catch (FormatException e)
{
    Console.WriteLine("字符串格式错误: " + e.Message);
}
```

### `as` 和 `is` 关键字

这两个关键字用于引用类型之间的转换。

- `as` 关键字尝试进行转换，如果失败则返回 `null`。

```csharp
object obj = "Hello, World!";
string str = obj as string;
if (str != null)
{
    Console.WriteLine(str);
}
else
{
    Console.WriteLine("转换失败");
}
```

- `is` 关键字用于检查对象是否可以转换为特定类型。

```csharp
object obj = "Hello, World!";
if (obj is string)
{
    string str = (string)obj;
    Console.WriteLine(str);
}
else
{
    Console.WriteLine("对象不是字符串类型");
}
```

### 用户自定义类型转换

在自定义类中，可以通过 `implicit` 和 `explicit` 关键字定义自己的类型转换运算符。

```csharp
class Meter
{
    public double Value { get; set; }

    public static implicit operator Meter(double d)
    {
        return new Meter { Value = d };
    }

    public static explicit operator double(Meter m)
    {
        return m.Value;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Meter m = 5.0; // 隐式转换：double 转换为 Meter
        double d = (double)m; // 显式转换：Meter 转换为 double
    }
}
```

## 字符串格式化

C#中的字符串格式化可以通过多种方式实现，包括使用字符串插值、格式化字符串方法、以及`StringBuilder`类。以下是一些常用的字符串格式化方法：

### 字符串插值

字符串插值是C# 6.0引入的一种简洁且易读的字符串格式化方式。它通过在字符串中嵌入表达式，并在表达式前加上 `$` 符号来实现。

```csharp
int age = 30;
string name = "Alice";

string message = $"Hello, my name is {name} and I am {age} years old.";
Console.WriteLine(message); // 输出：Hello, my name is Alice and I am 30 years old.
```

### `String.Format` 方法

`String.Format` 方法是另一种常用的字符串格式化方式，它使用格式项 `{index}` 指定要插入的位置。

```csharp
int age = 30;
string name = "Alice";

string message = string.Format("Hello, my name is {0} and I am {1} years old.", name, age);
Console.WriteLine(message); // 输出：Hello, my name is Alice and I am 30 years old.
```

### `StringBuilder` 类

`StringBuilder` 类适用于需要频繁修改字符串的情况，可以提高性能。

```csharp
using System.Text;

int age = 30;
string name = "Alice";

StringBuilder sb = new StringBuilder();
sb.AppendFormat("Hello, my name is {0} and I am {1} years old.", name, age);
Console.WriteLine(sb.ToString()); // 输出：Hello, my name is Alice and I am 30 years old.
```

### 数字格式化

可以在字符串插值或 `String.Format` 中指定数字的格式。例如，格式化为货币或百分比。

```csharp
double price = 1234.56;

string message = $"The price is {price:C2}."; // "C2" 表示货币格式，保留两位小数
Console.WriteLine(message); // 输出：The price is $1,234.56.

double percentage = 0.1234;
string percentageMessage = string.Format("The success rate is {0:P2}.", percentage); // "P2" 表示百分比格式，保留两位小数
Console.WriteLine(percentageMessage); // 输出：The success rate is 12.34%.
```

### 日期和时间格式化

日期和时间也可以使用特定的格式字符串进行格式化。

```csharp
DateTime now = DateTime.Now;

string dateMessage = $"Today is {now:MMMM dd, yyyy}."; // "MMMM dd, yyyy" 表示月份全称、日期和年份
Console.WriteLine(dateMessage); // 输出：Today is August 07, 2024.

string timeMessage = string.Format("The current time is {0:hh:mm tt}.", now); // "hh:mm tt" 表示小时、分钟和 AM/PM
Console.WriteLine(timeMessage); // 输出：The current time is 01:23 PM.
```

### 自定义格式化

可以自定义格式化字符串，以满足特定需求。

```csharp
int number = 1234;

string customFormat = number.ToString("00000"); // 自定义格式化字符串，补零至五位数
Console.WriteLine(customFormat); // 输出：01234
```

## 条件控制

在C#中，条件控制语句用于根据特定条件来执行不同的代码段。常见的条件控制语句包括`if`、`else if`、`else`、`switch`等。以下是每种条件控制语句的详细说明和示例：

### `if` 语句

`if`语句用于在条件为`true`时执行代码块。

```csharp
int age = 20;

if (age >= 18)
{
    Console.WriteLine("You are an adult.");
}
```

### `if-else` 语句

`if-else`语句用于在条件为`false`时执行另一段代码块。

```csharp
int age = 16;

if (age >= 18)
{
    Console.WriteLine("You are an adult.");
}
else
{
    Console.WriteLine("You are not an adult.");
}
```

### `if-else if-else` 语句

`if-else if-else`语句用于检查多个条件，并在其中一个条件为`true`时执行相应的代码块。

```csharp
int age = 20;

if (age < 13)
{
    Console.WriteLine("You are a child.");
}
else if (age < 18)
{
    Console.WriteLine("You are a teenager.");
}
else
{
    Console.WriteLine("You are an adult.");
}
```

### `switch` 语句

`switch`语句用于根据一个变量的多个可能值执行不同的代码块。它可以替代多个`if-else if`语句，使代码更简洁。

```csharp
int day = 3;

switch (day)
{
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    case 3:
        Console.WriteLine("Wednesday");
        break;
    case 4:
        Console.WriteLine("Thursday");
        break;
    case 5:
        Console.WriteLine("Friday");
        break;
    case 6:
        Console.WriteLine("Saturday");
        break;
    case 7:
        Console.WriteLine("Sunday");
        break;
    default:
        Console.WriteLine("Invalid day");
        break;
}
// switch表达式
int number = 2;
string result = number switch
{
    1 => "Number is 1",
    2 => "Number is 2",
    3 => "Number is 3",
    _ => "Number is not 1, 2, or 3"
};

```

### 三元运算符

三元运算符是`if-else`语句的简写形式，用于在条件为`true`或`false`时返回不同的值。

```csharp
int age = 20;
string message = (age >= 18) ? "You are an adult." : "You are not an adult.";
Console.WriteLine(message);
```

### 嵌套条件

条件语句可以嵌套使用，以处理更复杂的逻辑。

```csharp
int age = 25;
bool hasID = true;

if (age >= 18)
{
    if (hasID)
    {
        Console.WriteLine("You are allowed to enter.");
    }
    else
    {
        Console.WriteLine("You need an ID to enter.");
    }
}
else
{
    Console.WriteLine("You are not allowed to enter.");
}
```

### 使用布尔运算符

可以结合使用布尔运算符如`&&`（逻辑与）、`||`（逻辑或）和`!`（逻辑非）来构建复杂的条件表达式。

```csharp
int age = 20;
bool hasTicket = true;

if (age >= 18 && hasTicket)
{
    Console.WriteLine("You can watch the movie.");
}
else
{
    Console.WriteLine("You cannot watch the movie.");
}
```

## 循环语句

在C#中，循环语句用于反复执行一段代码，直到特定的条件不再满足。常见的循环语句包括`for`循环、`foreach`循环、`while`循环和`do-while`循环。以下是每种循环语句的详细说明和示例：

### `for` 循环

`for`循环通常用于需要知道循环计数的场合。它由三个部分组成：初始化表达式、条件表达式和迭代表达式。

```csharp
for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"Iteration {i}");
}
```

### `foreach` 循环

`foreach`循环用于遍历数组或集合中的每个元素，而不需要使用计数器变量。

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

### `while` 循环

`while`循环在条件为`true`时反复执行代码块。条件在每次迭代开始时检查。

```csharp
int count = 0;

while (count < 5)
{
    Console.WriteLine($"Count is {count}");
    count++;
}
```

### `do-while` 循环

`do-while`循环类似于`while`循环，不同之处在于它在每次迭代结束时检查条件。因此，`do-while`循环至少执行一次。

```csharp
int count = 0;

do
{
    Console.WriteLine($"Count is {count}");
    count++;
} while (count < 5);
```

### 跳出循环

#### `break` 语句

`break`语句用于立即终止循环。

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 5)
    {
        break; // 终止循环
    }
    Console.WriteLine(i);
}
```

#### `continue` 语句

`continue`语句用于跳过当前迭代并开始下一次迭代。

```csharp
for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0)
    {
        continue; // 跳过当前迭代
    }
    Console.WriteLine(i);
}
```

### 嵌套循环

循环可以嵌套在其他循环内部，以处理多维数据或更复杂的逻辑。

```csharp
for (int i = 0; i < 3; i++)
{
    for (int j = 0; j < 3; j++)
    {
        Console.WriteLine($"i = {i}, j = {j}");
    }
}
```

### 无限循环

可以创建一个永远不会终止的循环，通常需要结合`break`语句或其他条件来退出循环。

```csharp
while (true)
{
    Console.WriteLine("This is an infinite loop.");
    break; // 使用 break 退出循环
}
```

### 迭代器块（`yield return` 和 `yield break`）

`yield return`和`yield break`用于迭代器方法，使其可以逐个返回元素。

```csharp
IEnumerable<int> GetNumbers()
{
    for (int i = 0; i < 5; i++)
    {
        yield return i;
    }
}

foreach (int number in GetNumbers())
{
    Console.WriteLine(number);
}
```

## 函数

在C#中，函数（也称为方法）是组织代码的一种方式，它允许你将代码逻辑封装在一个可重复使用的块中。函数可以有参数，可以返回值，也可以没有参数或返回值。以下是C#中函数的详细说明和示例：

### 函数的定义和调用

#### 无返回值的函数

使用`void`关键字定义一个不返回值的函数。

```csharp
class Program
{
    static void Main(string[] args)
    {
        Greet(); // 调用函数
    }

    static void Greet()
    {
        Console.WriteLine("Hello, World!");
    }
}
```

#### 有返回值的函数

指定返回类型并使用`return`语句返回值。

```csharp
class Program
{
    static void Main(string[] args)
    {
        int result = Add(5, 3); // 调用函数并获取返回值
        Console.WriteLine($"The result is {result}");
    }

    static int Add(int a, int b)
    {
        return a + b; // 返回两个数的和
    }
}
```

### 函数参数

#### 带有参数的函数

可以定义带有参数的函数，以便调用时传递数据。

```csharp
class Program
{
    static void Main(string[] args)
    {
        PrintMessage("Hello, C#!"); // 调用函数时传递参数
    }

    static void PrintMessage(string message)
    {
        Console.WriteLine(message); // 打印传递的消息
    }
}
```

#### 可选参数和命名参数

可以为参数指定默认值，从而使参数成为可选的。同时可以使用命名参数以更灵活地传递参数。

```csharp
class Program
{
    static void Main(string[] args)
    {
        DisplayInfo("Alice"); // 使用默认年龄
        DisplayInfo("Bob", 25); // 提供年龄参数
        DisplayInfo(age: 30, name: "Charlie"); // 使用命名参数
    }

    static void DisplayInfo(string name, int age = 18)
    {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
}
```

### 参数传递方式

#### 值传递

默认情况下，参数通过值传递，即传递参数的副本。

```csharp
class Program
{
    static void Main(string[] args)
    {
        int x = 10;
        Increment(x);
        Console.WriteLine($"x after Increment: {x}"); // x remains 10
    }

    static void Increment(int number)
    {
        number++;
    }
}
```

#### 引用传递

使用`ref`或`out`关键字可以通过引用传递参数，允许在函数内修改参数的值。

```csharp
class Program
{
    static void Main(string[] args)
    {
        int x = 10;
        Increment(ref x);
        Console.WriteLine($"x after Increment: {x}"); // x is now 11
    }

    static void Increment(ref int number)
    {
        number++;
    }
}
```

#### `out` 参数

`out`参数用于返回多个值或保证参数在函数内被初始化。

```csharp
class Program
{
    static void Main(string[] args)
    {
        int result;
        bool success = TryParse("123", out result);
        Console.WriteLine($"Parsing succeeded: {success}, result: {result}");
    }

    static bool TryParse(string str, out int number)
    {
        return int.TryParse(str, out number);
    }
}
```

### 局部函数

C# 7.0引入了局部函数，允许在另一个函数内部定义函数。

```csharp
class Program
{
    static void Main(string[] args)
    {
        int result = CalculateSum(5, 3);
        Console.WriteLine($"Sum is {result}");

        int CalculateSum(int a, int b)
        {
            return a + b;
        }
    }
}
```

### 匿名函数和Lambda表达式

匿名函数和Lambda表达式是定义内联函数的一种方式。

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 匿名函数
        Func<int, int, int> add = delegate (int a, int b) { return a + b; };
        Console.WriteLine($"Sum using anonymous function: {add(2, 3)}");

        // Lambda表达式
        Func<int, int, int> multiply = (a, b) => a * b;
        Console.WriteLine($"Product using lambda: {multiply(2, 3)}");
    }
}
```

### 异步函数

C#支持异步编程，可以使用`async`和`await`关键字定义异步函数。

```csharp
class Program
{
    static async Task Main(string[] args)
    {
        await PrintMessageAsync("Hello, Async World!");
    }

    static async Task PrintMessageAsync(string message)
    {
        await Task.Delay(1000); // 模拟异步操作
        Console.WriteLine(message);
    }
}
```

## 类

在C#中，类（class）是面向对象编程（OOP）的基本构建块。类是对象的蓝图，它定义了对象的属性和行为。以下是关于C#类的详细说明和示例：

### 类的定义和实例化

#### 定义类

一个类通常包含字段、属性、方法、构造函数等。

```csharp
public class Person
{
    // 字段
    private string name;
    private int age;

    // 属性
    public string Name
    {
        get { return name; }
        set { name = value; }
    }

    public int Age
    {
        get { return age; }
        set { age = value; }
    }

    // 构造函数
    public Person(string name, int age)
    {
        this.name = name;
        this.age = age;
    }

    // 方法
    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {name} and I am {age} years old.");
    }
}
```

#### 实例化类

使用`new`关键字创建类的实例。

```csharp
class Program
{
    static void Main(string[] args)
    {
        Person person = new Person("Alice", 30); // 创建Person对象
        person.Greet(); // 调用对象的方法
    }
}
```

### 类的成员

#### 字段

字段是类中定义的变量，可以是私有的（private）或公开的（public）。

```csharp
public class Car
{
    public string make;
    public string model;
}
```

#### 属性

属性是字段的封装，可以提供对字段的访问控制。

```csharp
public class Car
{
    private string make;

    public string Make
    {
        get { return make; }
        set { make = value; }
    }
}
```

#### 自动属性

自动属性简化了属性的定义，编译器会自动生成私有的后台字段。

```csharp
public class Car
{
    public string Make { get; set; }
    public string Model { get; set; }
}
```

#### 方法

方法是类的行为，定义了类可以执行的操作。

```csharp
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}
```

### 构造函数

构造函数用于初始化类的实例。可以定义多个构造函数（重载构造函数）以提供不同的初始化方式。

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    // 无参数构造函数
    public Person()
    {
        Name = "Unknown";
        Age = 0;
    }

    // 带参数构造函数
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```

### 终结器
终结器（以前称为析构器）用于在垃圾回收器收集类实例时执行任何必要的最终清理操作。

- 无法在结构中定义终结器。 它们仅用于类。
- 一个类只能有一个终结器。
- 不能继承或重载终结器。
- 不能手动调用终结器。 可以自动调用它们。
- 终结器不使用修饰符或参数。

```csharp
class Car
{
    ~Car()  // finalizer
    {
        // cleanup statements...
    }
}
```

### 继承

继承是面向对象编程的一个重要特性，允许一个类从另一个类继承属性和方法。

```csharp
public class Animal
{
    public void Eat()
    {
        Console.WriteLine("Eating...");
    }
}

public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Barking...");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Dog dog = new Dog();
        dog.Eat(); // 继承自 Animal 类的方法
        dog.Bark(); // Dog 类的方法
    }
}
```

阻止继承

```csharp
class A {}
sealed class B : A {} // B不能再被继承

class X
{
    protected virtual void F() { Console.WriteLine("X.F"); }
    protected virtual void F2() { Console.WriteLine("X.F2"); }
}

class Y : X
{
    sealed protected override void F() { Console.WriteLine("Y.F"); } // 不能再被重写
    protected override void F2() { Console.WriteLine("Y.F2"); }
}

class Z : Y
{
    protected override void F2() { Console.WriteLine("Z.F2"); }
}
```

### 多态

多态允许你通过基类引用来调用派生类的实现。可以使用虚方法（virtual）和重写方法（override）实现多态。

```csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Animal sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Bark");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Meow");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        myDog.MakeSound(); // 输出：Bark
        myCat.MakeSound(); // 输出：Meow
    }
}
```

### 封装

封装是将对象的状态（字段）私有化，通过公共的方法和属性来访问和修改对象的状态。

```csharp
public class BankAccount
{
    private decimal balance;

    public decimal Balance
    {
        get { return balance; }
        private set { balance = value; }
    }

    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
        }
    }

    public void Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
        }
    }
}
```

### 静态成员

静态成员属于类本身而不是类的实例。

```csharp
public class MathHelper
{
    public static int Add(int a, int b)
    {
        return a + b;
    }
}

class Program
{
    static void Main(string[] args)
    {
        int result = MathHelper.Add(5, 3); // 通过类名调用静态方法
        Console.WriteLine($"Result: {result}");
    }
}
```

## 异常处理

在C#中，异常处理是处理程序运行时出现的错误的一种机制。它使用`try`、`catch`、`finally`和`throw`关键字来捕获和处理异常，确保程序能够优雅地处理错误并继续运行。以下是关于C#异常处理的详细说明和示例：

### 基本异常处理

#### `try` 和 `catch`

`try`块中的代码可能会抛出异常，`catch`块用于捕获并处理这些异常。

```csharp
class Program
{
    static void Main(string[] args)
    {
        try
        {
            int[] numbers = { 1, 2, 3 };
            Console.WriteLine(numbers[5]); // 这行代码将抛出一个异常
        }
        catch (IndexOutOfRangeException ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
    }
}
```

#### 多个 `catch` 块

可以有多个`catch`块来处理不同类型的异常。

```csharp
class Program
{
    static void Main(string[] args)
    {
        try
        {
            int a = 10;
            int b = 0;
            Console.WriteLine(a / b); // 这行代码将抛出一个异常
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine("Cannot divide by zero: " + ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
    }
}
```

#### `finally` 块

`finally`块用于在`try`块中的代码执行完毕后，始终执行的代码。无论是否发生异常，`finally`块中的代码都会被执行，通常用于释放资源。

```csharp
class Program
{
    static void Main(string[] args)
    {
        try
        {
            int[] numbers = { 1, 2, 3 };
            Console.WriteLine(numbers[5]); // 这行代码将抛出一个异常
        }
        catch (IndexOutOfRangeException ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
        finally
        {
            Console.WriteLine("This will always execute.");
        }
    }
}
```

### 抛出异常

#### 使用 `throw` 关键字

可以使用`throw`关键字显式地抛出异常。

```csharp
class Program
{
    static void Main(string[] args)
    {
        try
        {
            ValidateAge(15);
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
    }

    static void ValidateAge(int age)
    {
        if (age < 18)
        {
            throw new ArgumentException("Age must be at least 18.");
        }
    }
}
```

### 自定义异常

可以定义自己的异常类，以提供更具体的错误信息。自定义异常类应该继承自`Exception`类。

```csharp
public class InvalidAgeException : Exception
{
    public InvalidAgeException(string message) : base(message) { }
}

class Program
{
    static void Main(string[] args)
    {
        try
        {
            ValidateAge(15);
        }
        catch (InvalidAgeException ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
    }

    static void ValidateAge(int age)
    {
        if (age < 18)
        {
            throw new InvalidAgeException("Age must be at least 18.");
        }
    }
}
```

### 内置异常类

C#提供了许多内置的异常类，以下是一些常见的内置异常类：

- `System.Exception`：所有异常的基类。
- `System.ArgumentException`：传递给方法的一个或多个参数无效。
- `System.ArgumentNullException`：传递给方法的一个参数为`null`。
- `System.ArgumentOutOfRangeException`：传递给方法的参数超出了允许范围。
- `System.IndexOutOfRangeException`：尝试访问数组的无效索引。
- `System.InvalidOperationException`：方法调用无效。
- `System.NullReferenceException`：尝试访问对象引用为`null`的成员。
- `System.DivideByZeroException`：尝试除以零。
- `System.IO.IOException`：I/O操作失败。
- `System.NotSupportedException`：调用的方法不支持请求的操作。

### 示例：综合异常处理

下面是一个综合示例，演示了如何使用`try`、`catch`、`finally`以及自定义异常处理实际应用中的错误。

```csharp
using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            ReadFile("nonexistentfile.txt");
        }
        catch (FileNotFoundException ex)
        {
            Console.WriteLine("File error: " + ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("An unexpected error occurred: " + ex.Message);
        }
        finally
        {
            Console.WriteLine("Execution completed.");
        }
    }

    static void ReadFile(string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("The specified file was not found.");
        }

        string content = File.ReadAllText(filePath);
        Console.WriteLine(content);
    }
}
```

## 标准库

C# 的标准库（也称为 .NET 类库或 .NET 标准库）提供了大量的类、接口和值类型，这些类型和类是 .NET 应用程序开发的基础。以下是一些重要的命名空间及其用途，它们在标准库中非常常见并且非常有用。

### 常用命名空间

#### `System`

`System` 命名空间包含基本的类和基元类型。

- `System.Console`：用于控制台输入和输出。
- `System.Math`：提供常用的数学函数和常量。
- `System.String`：表示文本作为一系列 Unicode 字符。
- `System.DateTime`：表示日期和时间。

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine($"Today's date is {DateTime.Now}");
        Console.WriteLine($"The square root of 16 is {Math.Sqrt(16)}");
    }
}
```

#### `System.Collections` 和 `System.Collections.Generic`

`System.Collections` 和 `System.Collections.Generic` 命名空间包含用于操作集合的类。

- `System.Collections.ArrayList`：动态数组。
- `System.Collections.Hashtable`：基于键/值对的集合。
- `System.Collections.Generic.List<T>`：泛型列表。
- `System.Collections.Generic.Dictionary<TKey, TValue>`：泛型字典。

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        List<string> names = new List<string> { "Alice", "Bob", "Charlie" };
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }

        Dictionary<int, string> idToName = new Dictionary<int, string>
        {
            { 1, "Alice" },
            { 2, "Bob" },
            { 3, "Charlie" }
        };
        Console.WriteLine($"ID 1 corresponds to {idToName[1]}");
    }
}
```

#### `System.IO`

`System.IO` 命名空间包含处理输入和输出的类。

- `System.IO.File`：提供用于创建、复制、删除、移动和打开文件的静态方法。
- `System.IO.StreamReader` 和 `System.IO.StreamWriter`：用于读写文本文件。
- `System.IO.Directory`：提供用于创建、移动和枚举目录和子目录的静态方法。

```csharp
using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        string path = "example.txt";
        File.WriteAllText(path, "Hello, World!");
        string content = File.ReadAllText(path);
        Console.WriteLine(content);
    }
}
```

#### `System.Linq`

`System.Linq` 命名空间提供用于查询数据的类和方法。

- `System.Linq.Enumerable`：提供用于操作实现 `IEnumerable<T>` 的对象的静态方法。
- `System.Linq.Queryable`：提供用于操作实现 `IQueryable<T>` 的数据结构的静态方法。

```csharp
using System;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        int[] numbers = { 1, 2, 3, 4, 5, 6 };
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        foreach (var num in evenNumbers)
        {
            Console.WriteLine(num);
        }
    }
}
```

#### `System.Threading`

`System.Threading` 命名空间包含支持多线程编程的类。

- `System.Threading.Thread`：表示一个线程。
- `System.Threading.Tasks.Task`：表示一个异步操作。
- `System.Threading.Mutex`：同步基元，可用于跨进程同步。

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main(string[] args)
    {
        Task task = Task.Run(() =>
        {
            Thread.Sleep(1000);
            Console.WriteLine("Task completed");
        });

        task.Wait();
        Console.WriteLine("Main thread completed");
    }
}
```

#### `System.Net`

`System.Net` 命名空间提供用于处理网络请求的类。

- `System.Net.Http.HttpClient`：用于发送 HTTP 请求并从 URL 获取响应。
- `System.Net.WebClient`：提供用于发送和接收数据的常用方法。

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        using (HttpClient client = new HttpClient())
        {
            string response = await client.GetStringAsync("https://api.github.com/");
            Console.WriteLine(response);
        }
    }
}
```
