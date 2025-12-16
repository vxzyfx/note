---
title: Groovy语言
---


Groovy 是一种面向对象的编程语言，主要在 Java 虚拟机 (JVM) 上运行。它与 Java 完全兼容，能够利用现有的 Java 库，但它也引入了许多便捷和简化的特性，使开发者可以编写更简洁和更易读的代码。以下是 Groovy 的一些主要特点：

1. **语法简洁**：Groovy 的语法比 Java 更加简洁。比如，Groovy 支持省略分号、简化的闭包语法和字符串插值，使代码更容易书写和阅读。

2. **动态类型**：虽然 Groovy 是强类型语言，但它也支持动态类型，这意味着在运行时可以改变变量的类型，从而增加了灵活性。

3. **闭包**：Groovy 的闭包是一种类似于匿名函数的功能，允许代码块作为参数传递并在以后执行。

4. **原生集合处理**：Groovy 提供了对列表、映射等集合类型的直接支持，并带有简洁的语法来处理它们。

5. **内嵌 DSL（领域特定语言）**：Groovy 允许创建自定义的 DSL，这在编写配置文件、构建脚本和其他特定领域的应用程序时非常有用。

6. **与 Java 的无缝集成**：因为 Groovy 运行在 JVM 上，所以可以直接调用 Java 类库，也可以将 Groovy 代码编译成 Java 字节码，供 Java 程序使用。

7. **简化的测试支持**：Groovy 提供了强大的测试框架，比如 Spock，可以用来编写更简洁和可读的测试代码。

8. **元编程**：Groovy 支持元编程，允许程序在运行时动态修改类的结构和行为。


## 注释

在 Groovy 中，注释的使用方式与 Java 相同。注释用于解释代码，使代码更易于理解和维护。Groovy 支持单行注释和多行注释两种形式。

### 1. 单行注释
单行注释以 `//` 开头，注释内容位于同一行。

```groovy
// 这是一个单行注释
def name = "Groovy" // 变量定义后面的单行注释
```

### 2. 多行注释
多行注释以 `/*` 开始，以 `*/` 结束，注释内容可以跨越多行。

```groovy
/*
  这是一个多行注释
  可以用于注释多行内容
*/
def age = 25

/*
  多行注释也可以嵌套单行注释
  // 这是一个嵌套的单行注释
*/
```

### 3. 文档注释
文档注释用于生成 API 文档，以 `/**` 开始，以 `*/` 结束，通常用于注释类、方法和属性。

```groovy
/**
 * 这是一个文档注释
 * 用于描述类的用途
 */
class Person {
    String name
    int age

    /**
     * 这是一个文档注释
     * 用于描述方法的用途
     *
     * @param name 该人的姓名
     * @param age  该人的年龄
     */
    void setDetails(String name, int age) {
        this.name = name
        this.age = age
    }

    /**
     * 获取人的详细信息
     * @return 人的姓名和年龄
     */
    String getDetails() {
        return "Name: $name, Age: $age"
    }
}
```

### 示例代码

以下示例展示了各种注释的使用方法：

```groovy
// 定义一个 Person 类
class Person {
    String name
    int age

    /**
     * 设置人的详细信息
     *
     * @param name 姓名
     * @param age  年龄
     */
    void setDetails(String name, int age) {
        this.name = name
        this.age = age
    }

    /**
     * 获取人的详细信息
     *
     * @return 包含姓名和年龄的字符串
     */
    String getDetails() {
        return "Name: $name, Age: $age"
    }
}

/*
  主程序入口
  创建一个 Person 对象，并设置和获取其详细信息
 */
def main() {
    // 创建一个 Person 对象
    Person person = new Person()

    // 设置详细信息
    person.setDetails("Alice", 30)

    // 获取并打印详细信息
    println person.getDetails()
}

// 调用主程序
main()
```

## 变量的定义

### 1. 动态类型变量
使用 `def` 关键字定义动态类型变量。Groovy 会自动推断变量的类型。

```groovy
def singleQuoteString = 'Single quote string'
def doubleQuoteString = "Double quote string with interpolation: ${name}"
def tripleQuoteString = """Triple quote
string spanning
multiple lines"""  // 动态类型，类型推断为 String
def age = 25         // 动态类型，类型推断为 Integer
def list = [1, 2, 3] // 动态类型，类型推断为 List
def map = [key: 'value'] // 动态类型，类型推断为 Map
```

### 2. 静态类型变量
直接指定变量的类型，如同在 Java 中一样。这样可以提高代码的可读性和类型安全性。

```groovy
String language = "Groovy" // 静态类型
int year = 2024            // 静态类型
List<Integer> numbers = [1, 2, 3] // 静态类型，泛型列表
Map<String, String> info = [name: 'Groovy', type: 'Programming Language'] // 静态类型，泛型映射
```

### 3. 类型推断
虽然可以显式地指定类型，但 Groovy 也会在大多数情况下自动推断类型。

```groovy
def count = 10         // 推断为 Integer
def message = "Hello"  // 推断为 String
```

### 4. 常量
使用 `final` 关键字定义常量，常量的值一旦被赋予就不能改变。

```groovy
final int MAX_SIZE = 100 // 定义一个整型常量
final String GREETING = "Hello, World!" // 定义一个字符串常量
```

### 5. 使用 `var` 关键字（在 JDK 10 及以上版本中）
虽然 `var` 是 Java 10 引入的特性，但在 Groovy 中并不原生支持。不过 Groovy 本身的 `def` 关键字已经提供了类似的动态类型功能。

```groovy
// 在 Groovy 中，`def` 等同于 Java 中的 `var`
def number = 42 // 动态类型变量，推断为 Integer
```

### 6. 多重赋值
Groovy 支持多重赋值，可以同时给多个变量赋值。

```groovy
def (a, b, c) = [1, 2, 3]
println "$a, $b, $c" // 输出：1, 2, 3
```

### 示例代码

```groovy
// 动态类型变量
def city = "New York"
def population = 8_399_000
def isCapital = false

// 静态类型变量
String country = "USA"
int foundedYear = 1624
boolean isPopular = true

// 类型推断
def temperature = 25.3  // 推断为 Double
def greeting = "Good morning!"  // 推断为 String

// 常量
final double PI = 3.14159

// 多重赋值
def (x, y, z) = [10, 20, 30]
println "x: $x, y: $y, z: $z" // 输出：x: 10, y: 20, z: 30
```


#### 变量和类型
Groovy 变量可以是静态类型或动态类型。使用 `def` 关键字声明动态类型变量。

```groovy
def name = "Groovy" // 动态类型
String language = "Groovy" // 静态类型
```

#### 字符串
Groovy 支持三种类型的字符串：单引号、双引号和三重引号。

```groovy
def singleQuoteString = 'Single quote string'
def doubleQuoteString = "Double quote string with interpolation: ${name}"
def tripleQuoteString = """Triple quote
string spanning
multiple lines"""
```

## 变量类型

| 变量类型   | 说明                           | 示例                                       |
| ---------- | ------------------------------ | ------------------------------------------ |
| `def`      | 动态类型，Groovy 自动推断类型  | `def name = "Groovy"`                      |
| `String`   | 字符串类型                     | `String greeting = "Hello, World!"`        |
| `int`      | 整型                           | `int age = 25`                             |
| `float`    | 单精度浮点型                   | `float pi = 3.14f`                         |
| `double`   | 双精度浮点型                   | `double e = 2.71828`                       |
| `boolean`  | 布尔型                         | `boolean isActive = true`                  |
| `char`     | 字符型                         | `char initial = 'A'`                       |
| `List`     | 列表（动态数组）               | `List<Integer> numbers = [1, 2, 3]`        |
| `Map`      | 映射（字典）                   | `Map<String, String> info = [key: 'value']`|
| `Set`      | 集合                           | `Set<String> names = ['Alice', 'Bob']`     |
| `Date`     | 日期                           | `Date today = new Date()`                  |
| `BigDecimal` | 高精度浮点型                   | `BigDecimal amount = 12345.67`             |
| `Byte`     | 字节型                         | `Byte byteValue = 127`                     |
| `Short`    | 短整型                         | `Short shortValue = 1000`                  |
| `Long`     | 长整型                         | `Long longValue = 100000L`                 |
| `Object`   | 对象类型，任何类型的父类       | `Object obj = new Person()`                |

## 运算符

以下是 Groovy 中常见运算符的表格，包括运算符的类型、符号和示例：

| 运算符类型   | 符号 | 说明                           | 示例                                     |
| ------------ | ---- | ------------------------------ | ---------------------------------------- |
| 赋值运算符   | `=`  | 赋值                           | `a = 5`                                  |
| 算术运算符   | `+`  | 加法                           | `a + b`                                  |
| 算术运算符   | `-`  | 减法                           | `a - b`                                  |
| 算术运算符   | `*`  | 乘法                           | `a * b`                                  |
| 算术运算符   | `/`  | 除法                           | `a / b`                                  |
| 算术运算符   | `%`  | 取模                           | `a % b`                                  |
| 递增运算符   | `++` | 自增                           | `a++` 或 `++a`                           |
| 递减运算符   | `--` | 自减                           | `a--` 或 `--a`                           |
| 关系运算符   | `==` | 等于                           | `a == b`                                 |
| 关系运算符   | `!=` | 不等于                         | `a != b`                                 |
| 关系运算符   | `>`  | 大于                           | `a > b`                                  |
| 关系运算符   | `<`  | 小于                           | `a < b`                                  |
| 关系运算符   | `>=` | 大于等于                       | `a >= b`                                 |
| 关系运算符   | `<=` | 小于等于                       | `a <= b`                                 |
| 逻辑运算符   | `&&` | 逻辑与                         | `a && b`                                 |
| 逻辑运算符   | `\|\|` | 逻辑或                         | `a \|\| b`                                 |
| 逻辑运算符   | `!`  | 逻辑非                         | `!a`                                     |
| 位运算符     | `&`  | 按位与                         | `a & b`                                  |
| 位运算符     | `\|`  | 按位或                         | `a \| b`                                  |
| 位运算符     | `^`  | 按位异或                       | `a ^ b`                                  |
| 位运算符     | `~`  | 按位取反                       | `~a`                                     |
| 位运算符     | `<<` | 左移                           | `a << 2`                                 |
| 位运算符     | `>>` | 右移                           | `a >> 2`                                 |
| 位运算符     | `>>>`| 无符号右移                     | `a >>> 2`                                |
| 三元运算符   | `? :`| 条件运算符                     | `a ? b : c`                              |
| 安全导航运算符 | `?.` | 安全导航（避免空指针异常）      | `a?.b`                                   |
| Elvis 运算符 | `?:` | 如果左侧为空，则返回右侧       | `a ?: b`                                 |
| 比较运算符   | `<=>`| 比较（小于、等于、大于返回-1, 0, 1）| `a <=> b`                           |
| 引用运算符   | `.&` | 方法引用                       | `list.&method`                           |
| 成员运算符   | `.`  | 成员访问                       | `a.b`                                    |
| 范围运算符   | `..` | 创建范围                       | `1..5`                                   |
| 成员运算符   | `*.` | 扩展成员访问                   | `list*.property`                         |
| 强制转换运算符 | `as` | 强制类型转换                   | `a as String`                            |
| 闭包调用运算符 | `.`  | 调用闭包                       | `closure.call()` 或 `closure()`          |

### 示例代码

以下是一个综合示例，展示了各种运算符的使用：

```groovy
// 赋值运算符
def a = 10
def b = 5

// 算术运算符
println "a + b = ${a + b}"  // 输出: 15
println "a - b = ${a - b}"  // 输出: 5
println "a * b = ${a * b}"  // 输出: 50
println "a / b = ${a / b}"  // 输出: 2
println "a % b = ${a % b}"  // 输出: 0

// 递增和递减运算符
a++
println "a++ = ${a}"        // 输出: 11
b--
println "b-- = ${b}"        // 输出: 4

// 关系运算符
println "a == b = ${a == b}"// 输出: false
println "a != b = ${a != b}"// 输出: true
println "a > b = ${a > b}"  // 输出: true
println "a < b = ${a < b}"  // 输出: false
println "a >= b = ${a >= b}"// 输出: true
println "a <= b = ${a <= b}"// 输出: false

// 逻辑运算符
def x = true
def y = false
println "x && y = ${x && y}"// 输出: false
println "x || y = ${x || y}"// 输出: true
println "!x = ${!x}"        // 输出: false

// 位运算符
def c = 2
def d = 3
println "c & d = ${c & d}"  // 输出: 2
println "c | d = ${c | d}"  // 输出: 3
println "c ^ d = ${c ^ d}"  // 输出: 1
println "~c = ${~c}"        // 输出: -3
println "c << 1 = ${c << 1}"// 输出: 4
println "c >> 1 = ${c >> 1}"// 输出: 1
println "c >>> 1 = ${c >>> 1}" // 输出: 1

// 三元运算符
def result = (a > b) ? "a is greater" : "b is greater"
println result             // 输出: a is greater

// 安全导航运算符
def person = null
println person?.name       // 输出: null

// Elvis 运算符
def name = null
def displayName = name ?: "Anonymous"
println displayName        // 输出: Anonymous

// 比较运算符
println "a <=> b = ${a <=> b}" // 输出: 1

// 引用运算符
def list = [1, 2, 3]
def doubledList = list.collect { it * 2 }
println doubledList         // 输出: [2, 4, 6]

// 成员运算符
class Person {
    String name
    int age
}

def p = new Person(name: 'Alice', age: 25)
println p.name             // 输出: Alice
println p.age              // 输出: 25

// 范围运算符
def range = 1..5
println range              // 输出: [1, 2, 3, 4, 5]

// 扩展成员访问
def people = [new Person(name: 'Alice', age: 25), new Person(name: 'Bob', age: 30)]
def names = people*.name
println names              // 输出: [Alice, Bob]

// 强制转换运算符
def str = a as String
println str                // 输出: 11

// 闭包调用运算符
def closure = { println "Hello, Groovy!" }
closure.call()             // 输出: Hello, Groovy!
closure()                  // 输出: Hello, Groovy!
```

## 控制结构

在 Groovy 中，控制结构包括条件语句、循环结构和异常处理。以下是对这些控制结构的详细介绍和示例：

### 1. 条件语句

#### if 语句
if 语句用于根据条件执行不同的代码块。

```groovy
def number = 10

if (number > 0) {
    println "Number is positive"
} else if (number < 0) {
    println "Number is negative"
} else {
    println "Number is zero"
}
```

#### 三元运算符
三元运算符是 if-else 的简写形式。

```groovy
def result = (number > 0) ? "positive" : "not positive"
println result
```

#### switch 语句
switch 语句用于多分支选择。

```groovy
def day = "Monday"

switch (day) {
    case "Monday":
        println "Start of the work week"
        break
    case "Friday":
        println "End of the work week"
        break
    case ["Saturday", "Sunday"]:
        println "Weekend"
        break
    default:
        println "Midweek"
}
```

### 2. 循环结构

#### for 循环
for 循环用于重复执行代码块。

```groovy
for (int i = 1; i <= 5; i++) {
    println "Iteration $i"
}

// 使用 Groovy 的范围 (Range)
for (i in 1..5) {
    println "Range iteration $i"
}
```

#### each 循环
each 循环用于遍历集合。

```groovy
def list = [1, 2, 3, 4, 5]

list.each { item ->
    println "Item: $item"
}
```

#### while 循环
while 循环在条件为真时重复执行代码块。

```groovy
def count = 5

while (count > 0) {
    println "Count: $count"
    count--
}
```

#### do-while 循环
do-while 循环类似于 while 循环，但至少执行一次。

```groovy
def count = 0

do {
    println "Count: $count"
    count++
} while (count < 5)
```

### 示例代码

以下是一个完整的示例代码，展示了各种控制结构的使用：

```groovy
// if 语句
def number = -5
if (number > 0) {
    println "Number is positive"
} else if (number < 0) {
    println "Number is negative"
} else {
    println "Number is zero"
}

// 三元运算符
def result = (number > 0) ? "positive" : "not positive"
println result

// switch 语句
def day = "Saturday"
switch (day) {
    case "Monday":
        println "Start of the work week"
        break
    case "Friday":
        println "End of the work week"
        break
    case ["Saturday", "Sunday"]:
        println "Weekend"
        break
    default:
        println "Midweek"
}

// for 循环
for (int i = 1; i <= 3; i++) {
    println "Iteration $i"
}

// each 循环
def list = ['Apple', 'Banana', 'Cherry']
list.each { item ->
    println "Fruit: $item"
}

// while 循环
def count = 3
while (count > 0) {
    println "Count: $count"
    count--
}

// do-while 循环
count = 0
do {
    println "Count: $count"
    count++
} while (count < 3)
```

## 闭包

闭包是 Groovy 中一个非常强大的特性。闭包是一种可以捕获其定义环境中的变量的代码块，可以像函数一样传递和调用。闭包在 Groovy 中被广泛使用，特别是在处理集合和构建 DSL（领域特定语言）时。

### 闭包的定义和调用

#### 定义闭包
闭包可以使用花括号 `{}` 定义，箭头符号 `->` 用于分隔参数列表和闭包体。

```groovy
// 无参数闭包
def noParamClosure = { println "Hello, Groovy!" }

// 一个参数闭包
def oneParamClosure = { name -> println "Hello, $name!" }

// 多个参数闭包
def twoParamClosure = { name, age -> println "$name is $age years old" }
```

#### 调用闭包
使用 `call` 方法或直接调用闭包。

```groovy
noParamClosure() // 输出: Hello, Groovy!
noParamClosure.call() // 等同于上面一行

oneParamClosure("Alice") // 输出: Hello, Alice!
oneParamClosure.call("Alice") // 等同于上面一行

twoParamClosure("Bob", 30) // 输出: Bob is 30 years old
twoParamClosure.call("Bob", 30) // 等同于上面一行
```

### 闭包的常见用法

#### 处理集合
闭包在集合操作中非常有用，例如 `each`、`collect`、`find` 等方法。

```groovy
def list = [1, 2, 3, 4, 5]

// each 方法
list.each { println it } // 输出每个元素

// collect 方法
def squaredList = list.collect { it * it }
println squaredList // 输出: [1, 4, 9, 16, 25]

// find 方法
def firstEven = list.find { it % 2 == 0 }
println firstEven // 输出: 2
```

#### 闭包作为参数
闭包可以作为方法的参数，用于实现灵活的回调机制。

```groovy
def greet(String name, Closure closure) {
    closure(name)
}

greet("Alice") { println "Hello, $it!" } // 输出: Hello, Alice!
```

#### 闭包作用域
闭包可以访问其定义作用域中的变量，包括全局变量和闭包外的局部变量。

```groovy
def greeting = "Hello"

def closure = {
    println "$greeting, Groovy!"
}

closure() // 输出: Hello, Groovy!

def outerVariable = "Outer"

def outerClosure = {
    def innerVariable = "Inner"
    println outerVariable // 输出: Outer

    def innerClosure = {
        println innerVariable // 输出: Inner
    }
    innerClosure()
}

outerClosure()
```

#### 默认参数
如果闭包没有显式声明参数，它会默认有一个参数 `it`。

```groovy
def defaultParamClosure = { println "Hello, $it!" }
defaultParamClosure("Groovy") // 输出: Hello, Groovy!
```

### 闭包的高级用法

#### 闭包的柯里化
闭包可以进行柯里化，即固定部分参数，返回一个新的闭包。

```groovy
def sum = { a, b -> a + b }
def addFive = sum.curry(5)

println addFive(10) // 输出: 15
```

#### 闭包的委托
闭包的 `delegate` 属性允许在运行时改变闭包的执行上下文。

```groovy
class Person {
    String name
    def introduce = { "My name is $name" }
}

def alice = new Person(name: 'Alice')
def bob = new Person(name: 'Bob')

println alice.introduce() // 输出: My name is Alice
alice.introduce.delegate = bob
println alice.introduce() // 输出: My name is Bob
```

### 示例代码

以下是一个综合示例，展示了闭包的各种用法：

```groovy
// 定义闭包
def greet = { name -> println "Hello, $name!" }
greet("Groovy") // 输出: Hello, Groovy!

// 集合操作
def numbers = [1, 2, 3, 4, 5]
numbers.each { println it } // 输出每个元素

def evenNumbers = numbers.findAll { it % 2 == 0 }
println evenNumbers // 输出: [2, 4]

def squaredNumbers = numbers.collect { it * it }
println squaredNumbers // 输出: [1, 4, 9, 16, 25]

// 闭包作为参数
def performOperation(int a, int b, Closure operation) {
    return operation(a, b)
}

def addition = { x, y -> x + y }
def multiplication = { x, y -> x * y }

println performOperation(3, 4, addition) // 输出: 7
println performOperation(3, 4, multiplication) // 输出: 12

// 闭包作用域
def globalVar = "Global"
def closureScope = {
    def localVar = "Local"
    println globalVar // 输出: Global
    println localVar  // 输出: Local
}
closureScope()

// 默认参数
def defaultClosure = { println "Default parameter: $it" }
defaultClosure("Groovy") // 输出: Default parameter: Groovy

// 闭包的柯里化
def multiply = { a, b -> a * b }
def doubleIt = multiply.curry(2)
println doubleIt(5) // 输出: 10

// 闭包的委托
class Greeter {
    String name
    def greet = { "Hello, $name" }
}

def aliceGreeter = new Greeter(name: 'Alice')
def bobGreeter = new Greeter(name: 'Bob')

println aliceGreeter.greet() // 输出: Hello, Alice
aliceGreeter.greet.delegate = bobGreeter
println aliceGreeter.greet() // 输出: Hello, Bob
```

## 类和对象

在 Groovy 中，类和对象的定义和使用与 Java 类似，但 Groovy 提供了更多的简化和增强功能，使代码更简洁和易读。下面是关于类和对象的详细介绍和示例。

### 类的定义

#### 基本类定义

Groovy 中的类定义类似于 Java，但可以省略一些常规代码，如 getter 和 setter 方法，Groovy 会自动生成这些方法。

```groovy
class Person {
    String name
    int age

    void displayInfo() {
        println "Name: $name, Age: $age"
    }
}

// 创建对象
def person = new Person(name: 'Alice', age: 25)
person.displayInfo() // 输出: Name: Alice, Age: 25
```

#### 构造方法

Groovy 类的构造方法可以通过默认构造方法和自定义构造方法定义。

```groovy
class Person {
    String name
    int age

    // 自定义构造方法
    Person(String name, int age) {
        this.name = name
        this.age = age
    }

    void displayInfo() {
        println "Name: $name, Age: $age"
    }
}

// 使用自定义构造方法创建对象
def person = new Person('Bob', 30)
person.displayInfo() // 输出: Name: Bob, Age: 30
```

#### 默认构造方法和 Map 构造方法

Groovy 提供了方便的 Map 构造方法，可以直接用键值对来创建对象。

```groovy
class Person {
    String name
    int age
}

def person = new Person(name: 'Charlie', age: 35)
println person.name  // 输出: Charlie
println person.age   // 输出: 35
```

### 属性和方法

#### 属性

Groovy 类的属性可以直接定义，Groovy 会自动生成 getter 和 setter 方法。

```groovy
class Person {
    String name
    int age
}

def person = new Person(name: 'Dave', age: 40)
println person.name  // 输出: Dave
person.name = 'David'
println person.name  // 输出: David
```

#### 方法

方法定义和调用与 Java 类似，但可以省略返回类型和参数类型。

```groovy
class Calculator {
    int add(int a, int b) {
        return a + b
    }

    def subtract(a, b) {
        return a - b
    }
}

def calc = new Calculator()
println calc.add(5, 3)       // 输出: 8
println calc.subtract(10, 4) // 输出: 6
```

### 继承和接口

#### 继承

Groovy 支持单继承，子类使用 `extends` 关键字继承父类。

```groovy
class Animal {
    String name

    void speak() {
        println "$name makes a sound"
    }
}

class Dog extends Animal {
    void speak() {
        println "$name barks"
    }
}

def dog = new Dog(name: 'Buddy')
dog.speak() // 输出: Buddy barks
```

#### 接口

Groovy 中的接口使用 `interface` 关键字定义，类使用 `implements` 关键字实现接口。

```groovy
interface Drawable {
    void draw()
}

class Circle implements Drawable {
    void draw() {
        println "Drawing a circle"
    }
}

def circle = new Circle()
circle.draw() // 输出: Drawing a circle
```

### 多态

Groovy 支持多态，允许父类引用指向子类对象。

```groovy
class Animal {
    void makeSound() {
        println "Some generic animal sound"
    }
}

class Cat extends Animal {
    void makeSound() {
        println "Meow"
    }
}

Animal animal = new Cat()
animal.makeSound() // 输出: Meow
```

### 示例代码

以下是一个综合示例，展示了类和对象的定义、属性和方法、继承和接口的使用：

```groovy
// 定义 Person 类
class Person {
    String name
    int age

    // 自定义构造方法
    Person(String name, int age) {
        this.name = name
        this.age = age
    }

    // 显示信息的方法
    void displayInfo() {
        println "Name: $name, Age: $age"
    }
}

// 定义 Employee 类，继承 Person 类
class Employee extends Person {
    String jobTitle

    // 自定义构造方法
    Employee(String name, int age, String jobTitle) {
        super(name, age) // 调用父类构造方法
        this.jobTitle = jobTitle
    }

    // 重写显示信息的方法
    void displayInfo() {
        println "Name: $name, Age: $age, Job Title: $jobTitle"
    }
}

// 定义 Drawable 接口
interface Drawable {
    void draw()
}

// 定义 Circle 类，实现 Drawable 接口
class Circle implements Drawable {
    void draw() {
        println "Drawing a circle"
    }
}

// 主程序
def main() {
    // 创建 Person 对象
    def person = new Person('Alice', 25)
    person.displayInfo() // 输出: Name: Alice, Age: 25

    // 创建 Employee 对象
    def employee = new Employee('Bob', 30, 'Developer')
    employee.displayInfo() // 输出: Name: Bob, Age: 30, Job Title: Developer

    // 创建 Circle 对象并调用 draw 方法
    def circle = new Circle()
    circle.draw() // 输出: Drawing a circle
}

// 调用主程序
main()
```

## 操作符重载

Groovy 允许重载运算符，使得我们可以定义自定义类的行为与内置类型类似。运算符重载是通过定义特定方法来实现的，这些方法在运算符使用时会被调用。以下是常用运算符及其对应的方法：

### 常用运算符及对应的方法

| 运算符 | 方法名          | 示例                   |
| ------ | --------------- | ---------------------- |
| `+`    | `plus`          | `a + b`                |
| `-`    | `minus`         | `a - b`                |
| `*`    | `multiply`      | `a * b`                |
| `/`    | `div`           | `a / b`                |
| `%`    | `mod`           | `a % b`                |
| `**`   | `power`         | `a ** b`               |
| `<<`   | `leftShift`     | `a << b`               |
| `>>`   | `rightShift`    | `a >> b`               |
| `>>>`  | `rightShiftUnsigned` | `a >>> b`       |
| `&`    | `and`           | `a & b`                |
| `\|`    | `or`            | `a \| b`                |
| `^`    | `xor`           | `a ^ b`                |
| `-`    | `negative`      | `-a`                   |
| `+`    | `positive`      | `+a`                   |
| `++`   | `next`          | `a++`                  |
| `--`   | `previous`      | `a--`                  |
| `[]`   | `getAt`         | `a[b]`                 |
| `[]=`  | `putAt`         | `a[b] = c`             |
| `()`   | `call`          | `a()`                  |
| `==`   | `equals`        | `a == b`               |
| `<=>`  | `compareTo`     | `a <=> b`              |

### 示例代码

以下是一个示例类，展示如何重载常见运算符：

```groovy
class Complex {
    double real
    double imaginary

    Complex(double real, double imaginary) {
        this.real = real
        this.imaginary = imaginary
    }

    // 重载加法运算符
    Complex plus(Complex other) {
        return new Complex(this.real + other.real, this.imaginary + other.imaginary)
    }

    // 重载减法运算符
    Complex minus(Complex other) {
        return new Complex(this.real - other.real, this.imaginary - other.imaginary)
    }

    // 重载乘法运算符
    Complex multiply(Complex other) {
        double realPart = this.real * other.real - this.imaginary * other.imaginary
        double imaginaryPart = this.real * other.imaginary + this.imaginary * other.real
        return new Complex(realPart, imaginaryPart)
    }

    // 重载除法运算符
    Complex div(Complex other) {
        double denominator = other.real * other.real + other.imaginary * other.imaginary
        double realPart = (this.real * other.real + this.imaginary * other.imaginary) / denominator
        double imaginaryPart = (this.imaginary * other.real - this.real * other.imaginary) / denominator
        return new Complex(realPart, imaginaryPart)
    }

    // 重载取模运算符
    double mod() {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary)
    }

    // 重载比较运算符
    int compareTo(Complex other) {
        return this.mod() <=> other.mod()
    }

    // 重载等于运算符
    boolean equals(Complex other) {
        return this.real == other.real && this.imaginary == other.imaginary
    }

    // 重载 toString 方法
    String toString() {
        return "${real} + ${imaginary}i"
    }
}

// 创建两个复数对象
def c1 = new Complex(3, 4)
def c2 = new Complex(1, 2)

// 测试重载的运算符
println "c1 + c2 = ${c1 + c2}"         // 输出: 4.0 + 6.0i
println "c1 - c2 = ${c1 - c2}"         // 输出: 2.0 + 2.0i
println "c1 * c2 = ${c1 * c2}"         // 输出: -5.0 + 10.0i
println "c1 / c2 = ${c1 / c2}"         // 输出: 2.2 + 0.4i
println "c1 % = ${c1.mod()}"           // 输出: 5.0
println "c1 == c2 = ${c1 == c2}"       // 输出: false
println "c1 <=> c2 = ${c1 <=> c2}"     // 输出: 1
```

## 异常处理

在 Groovy 中，异常处理与 Java 非常相似，但由于 Groovy 的动态特性和简洁的语法，异常处理变得更加简单和灵活。下面详细介绍如何在 Groovy 中进行异常处理，包括 `try-catch` 语句、`finally` 语句、捕获特定异常以及自定义异常。

### 基本异常处理

#### try-catch 语句

`try-catch` 语句用于捕获和处理异常。`try` 块中包含可能抛出异常的代码，`catch` 块中包含处理异常的代码。

```groovy
try {
    int result = 10 / 0
} catch (ArithmeticException e) {
    println "Cannot divide by zero"
}
```

#### finally 语句

`finally` 语句块无论是否发生异常都会执行，通常用于清理资源，例如关闭文件或数据库连接。

```groovy
try {
    int result = 10 / 0
} catch (ArithmeticException e) {
    println "Cannot divide by zero"
} finally {
    println "This is the finally block"
}
```

### 捕获特定异常

可以使用多个 `catch` 块来捕获特定的异常类型。

```groovy
try {
    int[] array = [1, 2, 3]
    println array[5]
} catch (ArrayIndexOutOfBoundsException e) {
    println "Array index is out of bounds"
} catch (Exception e) {
    println "An unexpected error occurred: ${e.message}"
}
```

### 多异常捕获

在 Groovy 中，可以使用多异常捕获来简化代码，这在 Java 7 及以上版本中也支持。

```groovy
try {
    int result = 10 / 0
} catch (ArithmeticException | NullPointerException e) {
    println "An error occurred: ${e.message}"
}
```

### 自定义异常

Groovy 允许你定义自己的异常类，继承自 `Exception` 类或其子类。

```groovy
class CustomException extends Exception {
    CustomException(String message) {
        super(message)
    }
}

try {
    throw new CustomException("This is a custom exception")
} catch (CustomException e) {
    println "Caught custom exception: ${e.message}"
}
```

### 重新抛出异常

在捕获异常后，仍可以选择将其重新抛出以便在更高层次处理。

```groovy
def someMethod() {
    try {
        int result = 10 / 0
    } catch (ArithmeticException e) {
        println "Handling exception in someMethod"
        throw e // 重新抛出异常
    }
}

try {
    someMethod()
} catch (ArithmeticException e) {
    println "Caught exception in main method: ${e.message}"
}
```

### 示例代码

以下是一个综合示例，展示了如何在 Groovy 中处理各种异常情况：

```groovy
class CustomException extends Exception {
    CustomException(String message) {
        super(message)
    }
}

def divide(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Division by zero is not allowed")
    }
    return a / b
}

def processArray(int[] array, int index) {
    try {
        println array[index]
    } catch (ArrayIndexOutOfBoundsException e) {
        println "Array index is out of bounds: ${index}"
    }
}

def main() {
    try {
        // 捕获特定异常
        int result = divide(10, 0)
        println result
    } catch (ArithmeticException e) {
        println "Error: ${e.message}"
    } finally {
        println "Division attempt finished"
    }

    // 捕获自定义异常
    try {
        throw new CustomException("This is a custom exception")
    } catch (CustomException e) {
        println "Caught custom exception: ${e.message}"
    }

    // 处理数组访问异常
    int[] array = [1, 2, 3]
    processArray(array, 5)

    // 重新抛出异常
    try {
        someMethod()
    } catch (ArithmeticException e) {
        println "Caught exception in main method: ${e.message}"
    }
}

def someMethod() {
    try {
        int result = 10 / 0
    } catch (ArithmeticException e) {
        println "Handling exception in someMethod"
        throw e // 重新抛出异常
    }
}

main()
```

## 列表
在 Groovy 中，列表（List）是最常用的数据结构之一。Groovy 提供了丰富的列表操作方法，使得处理和操作列表变得非常方便。下面介绍 Groovy 列表的定义、常用操作和一些示例代码。

### 列表的定义

Groovy 列表使用方括号 `[]` 定义，可以包含任意类型的元素。

```groovy
// 定义一个包含整数的列表
def numbers = [1, 2, 3, 4, 5]

// 定义一个包含字符串的列表
def fruits = ["Apple", "Banana", "Cherry"]

// 定义一个包含混合类型元素的列表
def mixed = [1, "Groovy", true, 3.14]
```

### 常用操作

#### 添加元素

```groovy
def list = [1, 2, 3]

// 添加单个元素
list << 4
list.add(5)
println list // 输出: [1, 2, 3, 4, 5]

// 添加多个元素
list.addAll([6, 7])
println list // 输出: [1, 2, 3, 4, 5, 6, 7]
```

#### 访问元素

```groovy
def list = ["A", "B", "C", "D"]

// 通过索引访问元素
println list[0]  // 输出: A
println list[2]  // 输出: C

// 使用 get 方法
println list.get(1) // 输出: B

// 获取子列表
def sublist = list[1..3]
println sublist // 输出: [B, C, D]
```

#### 修改元素

```groovy
def list = [10, 20, 30, 40]

// 修改单个元素
list[1] = 25
println list // 输出: [10, 25, 30, 40]

// 修改多个元素
list[2..3] = [35, 45]
println list // 输出: [10, 25, 35, 45]
```

#### 删除元素

```groovy
def list = [100, 200, 300, 400, 500]

// 删除单个元素
list.remove(2)
println list // 输出: [100, 200, 400, 500]

// 删除多个元素
list.removeAll([200, 500])
println list // 输出: [100, 400]
```

#### 查找元素

```groovy
def list = ["Groovy", "Java", "Kotlin", "Scala"]

// 查找元素是否存在
println list.contains("Java")  // 输出: true
println list.contains("Python") // 输出: false

// 查找元素索引
println list.indexOf("Kotlin") // 输出: 2
println list.indexOf("Python") // 输出: -1

// 查找符合条件的第一个元素
def found = list.find { it.startsWith("S") }
println found // 输出: Scala

// 查找符合条件的所有元素
def foundAll = list.findAll { it.length() > 5 }
println foundAll // 输出: [Groovy, Kotlin]
```

### 迭代和操作

Groovy 提供了多种迭代和操作列表的方法，如 `each`、`collect`、`find`、`findAll` 等。

```groovy
def list = [1, 2, 3, 4, 5]

// each 方法
list.each { println it } // 输出每个元素

// collect 方法
def squaredList = list.collect { it * it }
println squaredList // 输出: [1, 4, 9, 16, 25]

// find 方法
def firstEven = list.find { it % 2 == 0 }
println firstEven // 输出: 2

// findAll 方法
def allEvens = list.findAll { it % 2 == 0 }
println allEvens // 输出: [2, 4]
```

### 示例代码

以下是一个综合示例，展示了 Groovy 列表的各种操作：

```groovy
def numbers = [1, 2, 3, 4, 5]

// 添加元素
numbers << 6
numbers.add(7)
numbers.addAll([8, 9])
println "After adding elements: $numbers" // 输出: After adding elements: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 访问元素
println "First element: ${numbers[0]}"    // 输出: First element: 1
println "Third element: ${numbers[2]}"    // 输出: Third element: 3
println "Sublist: ${numbers[1..3]}"       // 输出: Sublist: [2, 3, 4]

// 修改元素
numbers[4] = 50
numbers[5..6] = [60, 70]
println "After modifying elements: $numbers" // 输出: After modifying elements: [1, 2, 3, 4, 50, 60, 70, 8, 9]

// 删除元素
numbers.remove(2)
numbers.removeAll([8, 9])
println "After removing elements: $numbers" // 输出: After removing elements: [1, 2, 4, 50, 60, 70]

// 查找元素
println "Contains 50: ${numbers.contains(50)}" // 输出: Contains 50: true
println "Index of 70: ${numbers.indexOf(70)}"  // 输出: Index of 70: 5
println "First element greater than 10: ${numbers.find { it > 10 }}" // 输出: First element greater than 10: 50

// 迭代和操作
numbers.each { println "Element: $it" }
def doubled = numbers.collect { it * 2 }
println "Doubled list: $doubled" // 输出: Doubled list: [2, 4, 8, 100, 120, 140]
def evenNumbers = numbers.findAll { it % 2 == 0 }
println "Even numbers: $evenNumbers" // 输出: Even numbers: [2, 4, 60, 70]
```

## 映射

在 Groovy 中，映射（Map）是一种键值对数据结构，用于存储和管理关联数据。Groovy 提供了许多方便的特性和方法来操作映射，使得处理映射变得非常方便和高效。下面介绍 Groovy 中映射的定义、常用操作和一些示例代码。

### 映射的定义

#### 基本定义

Groovy 映射使用花括号 `{}` 定义，键值对之间使用冒号 `:` 分隔。

```groovy
// 定义一个简单的映射
def map = [name: 'Alice', age: 25, city: 'New York']

// 定义一个空映射
def emptyMap = [:]
```

### 常用操作

#### 访问元素

可以通过键来访问映射中的值。

```groovy
def map = [name: 'Alice', age: 25, city: 'New York']

println map.name  // 输出: Alice
println map['age'] // 输出: 25
println map.get('city') // 输出: New York
```

#### 修改元素

可以通过键来修改映射中的值。

```groovy
def map = [name: 'Alice', age: 25, city: 'New York']

// 修改元素
map.name = 'Bob'
map['age'] = 30
map.put('city', 'Los Angeles')

println map // 输出: [name:Bob, age:30, city:Los Angeles]
```

#### 添加元素

可以通过键来添加新的键值对。

```groovy
def map = [name: 'Alice', age: 25]

// 添加新元素
map.city = 'New York'
map['country'] = 'USA'
map.put('profession', 'Developer')

println map // 输出: [name:Alice, age:25, city:New York, country:USA, profession:Developer]
```

#### 删除元素

可以通过键来删除映射中的键值对。

```groovy
def map = [name: 'Alice', age: 25, city: 'New York']

// 删除元素
map.remove('age')
map.remove('city')

println map // 输出: [name:Alice]
```

### 映射的遍历

Groovy 提供了多种遍历映射的方法，例如 `each`、`eachWithIndex` 等。

```groovy
def map = [name: 'Alice', age: 25, city: 'New York']

// 使用 each 方法遍历映射
map.each { key, value ->
    println "$key: $value"
}

// 使用 eachWithIndex 方法遍历映射
map.eachWithIndex { entry, index ->
    println "$index: $entry.key = $entry.value"
}
```

### 映射操作

Groovy 提供了许多有用的方法来操作映射，如 `findAll`、`collect`、`inject` 等。

```groovy
def map = [name: 'Alice', age: 25, city: 'New York', country: 'USA']

// findAll 方法返回符合条件的键值对
def result = map.findAll { key, value -> key.startsWith('c') }
println result // 输出: [city:New York, country:USA]

// collect 方法用于转换映射
def keys = map.collect { key, value -> key }
println keys // 输出: [name, age, city, country]

def values = map.collect { key, value -> value }
println values // 输出: [Alice, 25, New York, USA]

// inject 方法用于累计操作
def concatenatedKeys = map.inject('') { acc, key, value -> acc + key }
println concatenatedKeys // 输出: nameagecitycountry
```

### 示例代码

以下是一个综合示例，展示了 Groovy 中映射的各种操作：

```groovy
def person = [name: 'Alice', age: 25, city: 'New York']

// 访问元素
println "Name: ${person.name}"   // 输出: Name: Alice
println "Age: ${person['age']}"  // 输出: Age: 25
println "City: ${person.get('city')}" // 输出: City: New York

// 修改元素
person.name = 'Bob'
person['age'] = 30
person.put('city', 'Los Angeles')
println "Modified Map: $person"  // 输出: Modified Map: [name:Bob, age:30, city:Los Angeles]

// 添加元素
person.country = 'USA'
person['profession'] = 'Developer'
person.put('hobby', 'Photography')
println "Extended Map: $person"  // 输出: Extended Map: [name:Bob, age:30, city:Los Angeles, country:USA, profession:Developer, hobby:Photography]

// 删除元素
person.remove('age')
person.remove('hobby')
println "Reduced Map: $person"   // 输出: Reduced Map: [name:Bob, city:Los Angeles, country:USA, profession:Developer]

// 遍历映射
person.each { key, value ->
    println "$key: $value"
}

// 使用 findAll 方法
def filtered = person.findAll { key, value -> key.contains('i') }
println "Filtered Map: $filtered" // 输出: Filtered Map: [city:Los Angeles]

// 使用 collect 方法
def upperCaseKeys = person.collect { key, value -> key.toUpperCase() }
println "Uppercase Keys: $upperCaseKeys" // 输出: Uppercase Keys: [NAME, CITY, COUNTRY, PROFESSION]

// 使用 inject 方法
def concatenatedValues = person.inject('') { acc, key, value -> acc + value + ' ' }
println "Concatenated Values: $concatenatedValues" // 输出: Concatenated Values: Bob Los Angeles USA Developer
```

## 集合

在 Groovy 中，集合（Set）是一种数据结构，用于存储不重复的元素。Groovy 提供了丰富的集合操作方法，使得处理和操作集合变得非常方便和高效。下面介绍 Groovy 中集合的定义、常用操作和一些示例代码。

### 集合的定义

Groovy 集合使用方括号 `[]` 定义，并通过 `as Set` 转换为集合。

```groovy
// 定义一个包含整数的集合
def numbers = [1, 2, 3, 4, 5] as Set

// 定义一个包含字符串的集合
def fruits = ['Apple', 'Banana', 'Cherry'] as Set

// 定义一个空集合
def emptySet = [] as Set
```

### 常用操作

#### 添加元素

可以使用 `add` 方法或 `<<` 运算符向集合中添加元素。

```groovy
def set = [1, 2, 3] as Set

// 添加单个元素
set << 4
set.add(5)
println set // 输出: [1, 2, 3, 4, 5]

// 添加多个元素
set.addAll([6, 7])
println set // 输出: [1, 2, 3, 4, 5, 6, 7]
```

#### 访问元素

集合通常不支持按索引访问，但可以通过迭代访问所有元素。

```groovy
def set = ['A', 'B', 'C', 'D'] as Set

// 迭代访问集合中的元素
set.each { println it }
```

#### 删除元素

可以使用 `remove` 方法删除集合中的元素。

```groovy
def set = [100, 200, 300, 400, 500] as Set

// 删除单个元素
set.remove(300)
println set // 输出: [100, 200, 400, 500]

// 删除多个元素
set.removeAll([200, 500])
println set // 输出: [100, 400]
```

### 集合操作

Groovy 提供了丰富的方法来操作集合，如 `contains`、`find`、`findAll`、`each`、`collect` 等。

```groovy
def set = ['Groovy', 'Java', 'Kotlin', 'Scala'] as Set

// 检查元素是否存在
println set.contains('Java')  // 输出: true
println set.contains('Python') // 输出: false

// 查找符合条件的第一个元素
def found = set.find { it.startsWith('S') }
println found // 输出: Scala

// 查找符合条件的所有元素
def foundAll = set.findAll { it.length() > 5 }
println foundAll // 输出: [Groovy, Kotlin]

// 转换集合元素
def upperCaseSet = set.collect { it.toUpperCase() }
println upperCaseSet // 输出: [GROOVY, JAVA, KOTLIN, SCALA]

// 迭代集合
set.each { println "Language: $it" }
```

### 集合运算

Groovy 支持集合之间的基本运算，如并集、交集和差集。

```groovy
def set1 = [1, 2, 3, 4] as Set
def set2 = [3, 4, 5, 6] as Set

// 并集
def unionSet = set1 + set2
println "Union: $unionSet" // 输出: Union: [1, 2, 3, 4, 5, 6]

// 交集
def intersectionSet = set1.intersect(set2)
println "Intersection: $intersectionSet" // 输出: Intersection: [3, 4]

// 差集
def differenceSet = set1 - set2
println "Difference: $differenceSet" // 输出: Difference: [1, 2]
```

### 示例代码

以下是一个综合示例，展示了 Groovy 中集合的各种操作：

```groovy
def languages = ['Groovy', 'Java', 'Kotlin', 'Scala'] as Set

// 添加元素
languages << 'Python'
languages.add('Ruby')
println "Languages after adding elements: $languages" // 输出: Languages after adding elements: [Groovy, Java, Kotlin, Scala, Python, Ruby]

// 检查元素是否存在
println "Contains Java: ${languages.contains('Java')}" // 输出: Contains Java: true
println "Contains C++: ${languages.contains('C++')}"   // 输出: Contains C++: false

// 删除元素
languages.remove('Scala')
println "Languages after removing Scala: $languages" // 输出: Languages after removing Scala: [Groovy, Java, Kotlin, Python, Ruby]

// 查找元素
def found = languages.find { it.startsWith('P') }
println "First language starting with P: $found" // 输出: First language starting with P: Python

// 查找符合条件的所有元素
def longNames = languages.findAll { it.length() > 4 }
println "Languages with names longer than 4 characters: $longNames" // 输出: Languages with names longer than 4 characters: [Groovy, Kotlin, Python]

// 转换集合元素
def upperCaseLanguages = languages.collect { it.toUpperCase() }
println "Languages in uppercase: $upperCaseLanguages" // 输出: Languages in uppercase: [GROOVY, JAVA, KOTLIN, PYTHON, RUBY]

// 集合运算
def moreLanguages = ['C++', 'Python', 'Ruby'] as Set

// 并集
def union = languages + moreLanguages
println "Union of sets: $union" // 输出: Union of sets: [Groovy, Java, Kotlin, Python, Ruby, C++]

// 交集
def intersection = languages.intersect(moreLanguages)
println "Intersection of sets: $intersection" // 输出: Intersection of sets: [Python, Ruby]

// 差集
def difference = languages - moreLanguages
println "Difference of sets: $difference" // 输出: Difference of sets: [Groovy, Java, Kotlin]
```