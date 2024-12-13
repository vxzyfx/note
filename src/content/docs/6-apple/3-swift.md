---
title: Swift语言
---

Swift 是由 Apple 开发的一种现代编程语言，设计用于 iOS、macOS、watchOS 和 tvOS 应用程序的开发。以下是 Swift 语言的一些基本语法介绍：

## 注释
在 Swift 中，注释用于提高代码的可读性和维护性，注释内容不会被编译器执行。Swift 支持单行注释和多行注释。以下是注释的使用方法：

### 单行注释
使用 `//` 开头的注释仅占用一行，从 `//` 开始到该行末尾的内容都是注释。

```swift
// 这是一个单行注释
var message = "Hello, World!" // 也可以在代码后添加注释
```

### 多行注释
使用 `/* ... */` 包围的内容可以跨越多行，适用于需要详细说明的情况。

```swift
/* 这是一个多行注释
   它可以跨越多行
   适用于详细说明
*/
var message = "Hello, World!"
```

### 嵌套注释
Swift 支持多行注释的嵌套，这在调试代码时非常有用，可以注释掉包含其他注释的代码块。

```swift
/* 这是一个多行注释
   /* 这是嵌套在其中的多行注释 */
   这部分注释会被忽略
*/
var message = "Hello, World!"
```

### 文档注释
Swift 还支持使用 `///` 或 `/** ... */` 进行文档注释，用于生成文档或为代码提供更详细的说明。这些注释通常用于描述类、方法、属性等。

#### 使用 `///` 的单行文档注释
```swift
/// 这是一个文档注释
/// 用于描述函数的功能
/// - Parameter name: 用户的名字
/// - Returns: 问候字符串
func greet(name: String) -> String {
    return "Hello, \(name)!"
}
```

#### 使用 `/** ... */` 的多行文档注释
```swift
/**
 这是一个多行文档注释
 用于详细描述类的功能

 - Author: 张三
 - Version: 1.0
 */
class Person {
    var name: String
    var age: Int

    /**
     初始化一个新的 Person 实例
     
     - Parameter name: 人的名字
     - Parameter age: 人的年龄
     - Returns: 一个新的 Person 实例
     */
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    /**
     打印问候语
     */
    func greet() {
        print("Hello, my name is \(name) and I am \(age) years old.")
    }
}
```

## 变量定义

在 Swift 中，变量的定义方式非常灵活且强大。以下是变量定义的几种方式和相关概念：

### 1. 使用 `var` 定义可变变量
使用 `var` 关键字定义的变量，其值可以改变。

```swift
var age: Int = 25
age = 26 // 修改变量值
```

如果不指定类型，Swift 会根据初始值推断变量的类型。

```swift
var name = "Alice" // 类型被推断为 String
name = "Bob"
```

### 2. 使用 `let` 定义不可变常量
使用 `let` 关键字定义的常量，其值一旦设置就不能改变。

```swift
let birthYear: Int = 1995
// birthYear = 1996 // 这行代码会导致编译错误，因为常量值不能修改
```

同样地，如果不指定类型，Swift 会根据初始值推断常量的类型。

```swift
let greeting = "Hello, World!" // 类型被推断为 String
```

### 3. 多变量定义
在一行中可以定义多个变量或常量，只需用逗号分隔。

```swift
var x = 0.0, y = 0.0, z = 0.0
let red = 255, green = 255, blue = 255
```

### 4. 懒加载变量
使用 `lazy` 关键字声明的变量在首次访问时才会被初始化。通常用于计算开销较大的属性。

```swift
class DataManager {
    lazy var data = [String]() // 当首次访问 data 时才会初始化
}

let manager = DataManager()
print(manager.data) // 此时才会初始化 data
```

### 5. 可选变量
使用 `?` 声明可选变量，表示该变量可以包含一个值或者 `nil`。

```swift
var optionalString: String? = "Hello"
optionalString = nil // 变量可以设置为 nil
```

使用 `!` 强制解包可选值，但如果可选值为 `nil`，会导致运行时错误。

```swift
var optionalNumber: Int? = 42
print(optionalNumber!) // 强制解包
```

### 6. 隐式解包可选变量
使用 `!` 声明隐式解包可选变量，在初始化之后可以像普通变量一样使用。

```swift
var implicitlyUnwrappedOptional: String! = "Hello"
print(implicitlyUnwrappedOptional) // 不需要显式解包
implicitlyUnwrappedOptional = nil // 可以设置为 nil
```

### 7. 变量和常量的类型注解
虽然 Swift 通常能够推断变量和常量的类型，但有时为了代码的可读性和明确性，可以显式地指定类型。

```swift
var explicitDouble: Double = 70.0
let explicitInt: Int = 1
```

### 8. 属性观察器
你可以在变量的值改变时执行代码，使用 `willSet` 和 `didSet` 观察器。

```swift
var totalSteps: Int = 0 {
    willSet(newTotalSteps) {
        print("About to set totalSteps to \(newTotalSteps)")
    }
    didSet {
        if totalSteps > oldValue  {
            print("Added \(totalSteps - oldValue) steps")
        }
    }
}

totalSteps = 200
```

## 数据类型
以下是 Swift 常用数据类型的简要表格：

| 数据类型  | 描述                             | 示例                                      |
|-----------|----------------------------------|-------------------------------------------|
| `Int`     | 整数类型，32 或 64 位            | `var age: Int = 25`                       |
| `UInt`    | 无符号整数类型，32 或 64 位      | `var unsignedNumber: UInt = 100`          |
| `Float`   | 32 位浮点数                      | `var pi: Float = 3.14`                    |
| `Double`  | 64 位浮点数                      | `var e: Double = 2.71828`                 |
| `Bool`    | 布尔值，`true` 或 `false`        | `var isSwiftGreat: Bool = true`           |
| `String`  | 字符串，表示一系列字符           | `var greeting: String = "Hello, World!"`  |
| `Character` | 单个字符                      | `var letter: Character = "A"`             |
| `Array`   | 有序集合，可以包含相同类型的元素 | `var numbers: [Int] = [1, 2, 3, 4, 5]`    |
| `Dictionary` | 键值对集合，可以包含相同类型的键和值 | `var userInfo: [String: String] = ["name": "Alice", "city": "Paris"]` |
| `Set`     | 无序集合，包含唯一值              | `var uniqueNumbers: Set<Int> = [1, 2, 3]` |
| `Tuple`   | 元组，可以包含多个类型不同的值    | `var person: (String, Int) = ("Alice", 30)` |
| `Optional` | 可选类型，表示可能有值或为 nil   | `var optionalName: String? = "Alice"`     |
| `Any`     | 可以表示任何类型                 | `var anyValue: Any = 42`                  |
| `AnyObject` | 可以表示任何类类型的实例        | `var anyObject: AnyObject = NSObject()`   |
| `Void`    | 空类型，通常用于无返回值的函数   | `func sayHello() -> Void {}`              |

### 示例代码

```swift
// Int
var age: Int = 25

// UInt
var unsignedNumber: UInt = 100

// Float
var pi: Float = 3.14

// Double
var e: Double = 2.71828

// Bool
var isSwiftGreat: Bool = true

// String
var greeting: String = "Hello, World!"

// Character
var letter: Character = "A"

// Array
var numbers: [Int] = [1, 2, 3, 4, 5]

// Dictionary
var userInfo: [String: String] = ["name": "Alice", "city": "Paris"]

// Set
var uniqueNumbers: Set<Int> = [1, 2, 3]

// Tuple
var person: (String, Int) = ("Alice", 30)

// Optional
var optionalName: String? = "Alice"
optionalName = nil

// Any
var anyValue: Any = 42
anyValue = "A String"

// AnyObject
var anyObject: AnyObject = NSObject()

// Void
func sayHello() -> Void {
    print("Hello")
}
```

## 类型转换
在 Swift 中，类型转换是将一个变量或常量从一种类型转换为另一种类型的过程。类型转换有多种方法，包括显式转换和隐式转换。以下是 Swift 中常用的类型转换方法：

### 1. 简单类型转换
使用 Swift 内置的类型转换函数，可以在整数、浮点数和字符串之间进行转换。

#### 整数和浮点数之间的转换
```swift
let integer: Int = 42
let doubleValue: Double = Double(integer)
let floatValue: Float = Float(integer)

let floatNumber: Float = 3.14
let intValue: Int = Int(floatNumber) // 将浮点数转换为整数时，小数部分会被舍弃
```

#### 字符串和数值之间的转换
```swift
let numberString: String = "123"
if let number = Int(numberString) {
    print("转换成功: \(number)")
} else {
    print("转换失败")
}

let doubleString: String = "3.14"
if let doubleValue = Double(doubleString) {
    print("转换成功: \(doubleValue)")
} else {
    print("转换失败")
}

let intValue: Int = 100
let intString: String = String(intValue)
let doubleValue: Double = 99.99
let doubleString: String = String(doubleValue)
```

### 2. 强制类型转换（类型检查和转换）
使用 `as` 关键字进行类型转换，可以在继承关系中进行类型检查和转换。

#### 向下类型转换（Downcasting）
当你从父类或协议类型转换为子类类型时，使用 `as?` 或 `as!`。

- `as?` 返回一个可选值，如果转换失败则返回 `nil`。
- `as!` 强制转换，如果转换失败则会触发运行时错误。

```swift
class Animal {
    var name: String
    init(name: String) {
        self.name = name
    }
}

class Dog: Animal {
    func bark() {
        print("Woof!")
    }
}

let animal: Animal = Dog(name: "Buddy")

// 可选类型转换
if let dog = animal as? Dog {
    dog.bark()
}

// 强制类型转换
let forcedDog = animal as! Dog
forcedDog.bark()
```

### 3. Any 和 AnyObject 的类型转换
在 Swift 中，`Any` 可以表示任何类型，而 `AnyObject` 可以表示任何类类型的实例。在使用这些类型时，通常需要进行类型转换。

```swift
let anyValue: Any = "Hello, Swift"
if let stringValue = anyValue as? String {
    print("字符串值: \(stringValue)")
}

let objects: [AnyObject] = [Dog(name: "Rex"), Dog(name: "Max")]
for object in objects {
    if let dog = object as? Dog {
        dog.bark()
    }
}
```

### 4. NSNumber 和 NSValue 的类型转换
在 Swift 和 Objective-C 混合编程时，经常需要在 `NSNumber` 和基础类型之间进行转换。

```swift
let number: NSNumber = 42
let intValue: Int = number.intValue
let doubleValue: Double = number.doubleValue

let value: NSValue = NSValue(cgPoint: CGPoint(x: 10, y: 20))
let point: CGPoint = value.cgPointValue
```

### 示例代码
以下是一些常见的类型转换示例：

```swift
// 整数和浮点数之间的转换
let integer: Int = 42
let doubleValue: Double = Double(integer)
let floatValue: Float = Float(integer)

// 字符串和数值之间的转换
let numberString: String = "123"
if let number = Int(numberString) {
    print("转换成功: \(number)")
} else {
    print("转换失败")
}

let doubleString: String = "3.14"
if let doubleValue = Double(doubleString) {
    print("转换成功: \(doubleValue)")
} else {
    print("转换失败")
}

let intValue: Int = 100
let intString: String = String(intValue)
let doubleValue: Double = 99.99
let doubleString: String = String(doubleValue)

// 向下类型转换
class Animal {
    var name: String
    init(name: String) {
        self.name = name
    }
}

class Dog: Animal {
    func bark() {
        print("Woof!")
    }
}

let animal: Animal = Dog(name: "Buddy")
if let dog = animal as? Dog {
    dog.bark()
}

let forcedDog = animal as! Dog
forcedDog.bark()

// Any 和 AnyObject 的类型转换
let anyValue: Any = "Hello, Swift"
if let stringValue = anyValue as? String {
    print("字符串值: \(stringValue)")
}

let objects: [AnyObject] = [Dog(name: "Rex"), Dog(name: "Max")]
for object in objects {
    if let dog = object as? Dog {
        dog.bark()
    }
}

// NSNumber 和 NSValue 的类型转换
let number: NSNumber = 42
let intValue: Int = number.intValue
let doubleValue: Double = number.doubleValue

let value: NSValue = NSValue(cgPoint: CGPoint(x: 10, y: 20))
let point: CGPoint = value.cgPointValue
```

## 字符串格式化

在Swift中，字符串格式化有几种常见的方法，以下是每种方法的示例：

### 1. 使用字符串插值 (String Interpolation)
这是Swift中最常用和最简洁的字符串格式化方法。

```swift
let name = "Alice"
let age = 30
print("My name is \(name) and I am \(age) years old.")

// 使用表达式
print("Next year, I will be \(age + 1) years old.")
```

### 2. 使用 `String(format:)`
这种方法类似于C语言中的 `printf` 函数，适用于需要控制格式的情况。

```swift
let name = "Alice"
let age = 30
let formattedString = String(format: "My name is %@ and I am %d years old.", name, age)
print(formattedString)
```

### 3. 使用 `NSString(format:)`
这是使用 `NSString` 的格式化方法，和 `String(format:)` 类似。

```swift
let name = "Alice"
let age = 30
let formattedString = NSString(format: "My name is %@ and I am %d years old.", name, age)
print(formattedString)
```

### 4. 使用 `String concatenation` (字符串拼接)
对于简单的字符串拼接，可以直接使用 `+` 运算符。

```swift
let name = "Alice"
let age = 30
let formattedString = "My name is " + name + " and I am " + String(age) + " years old."
print(formattedString)
```

### 5. 使用 `String.init(format:_:)`
这是 `String` 的构造方法之一，可以用于格式化字符串。

```swift
let name = "Alice"
let age = 30
let formattedString = String(format: "My name is %@ and I am %d years old.", name, age)
print(formattedString)
```

### 6. 使用 `Text Output Stream` (文本输出流)
对于复杂的字符串构建，可以使用 `Text Output Stream`。

```swift
var name = "Alice"
var age = 30
var output = ""
print("My name is \(name) and I am \(age) years old.", to: &output)
print(output)
```

## 运算符号
以下是 Swift 中常用运算符的简要表格：

### 算术运算符

| 运算符 | 描述         | 示例           | 结果         |
|--------|--------------|----------------|--------------|
| `+`    | 加法         | `2 + 3`        | `5`          |
| `-`    | 减法         | `5 - 3`        | `2`          |
| `*`    | 乘法         | `2 * 3`        | `6`          |
| `/`    | 除法         | `6 / 2`        | `3`          |
| `%`    | 取模         | `5 % 2`        | `1`          |
| `+`    | 字符串连接   | `"Hello, " + "world!"` | `"Hello, world!"` |

### 赋值运算符

| 运算符 | 描述          | 示例          | 结果         |
|--------|---------------|---------------|--------------|
| `=`    | 赋值          | `var a = 5`   | `a` 的值为 `5` |
| `+=`   | 加法赋值      | `a += 3`      | `a` 的值为 `8` |
| `-=`   | 减法赋值      | `a -= 2`      | `a` 的值为 `6` |
| `*=`   | 乘法赋值      | `a *= 2`      | `a` 的值为 `12` |
| `/=`   | 除法赋值      | `a /= 4`      | `a` 的值为 `3` |
| `%=`   | 取模赋值      | `a %= 2`      | `a` 的值为 `1` |

### 逻辑运算符

| 运算符 | 描述          | 示例          | 结果         |
|--------|---------------|---------------|--------------|
| `&&`   | 逻辑与        | `true && false` | `false`      |
| `\|\|`   | 逻辑或        | `true \|\| false` | `true`       |
| `!`    | 逻辑非        | `!true`         | `false`      |

### 比较运算符

| 运算符 | 描述          | 示例          | 结果         |
|--------|---------------|---------------|--------------|
| `==`   | 等于          | `5 == 5`      | `true`       |
| `!=`   | 不等于        | `5 != 3`      | `true`       |
| `>`    | 大于          | `5 > 3`       | `true`       |
| `<`    | 小于          | `5 < 3`       | `false`      |
| `>=`   | 大于等于      | `5 >= 5`      | `true`       |
| `<=`   | 小于等于      | `5 <= 3`      | `false`      |

### 位运算符

| 运算符 | 描述          | 示例          | 结果         |
|--------|---------------|---------------|--------------|
| `&`    | 与            | `5 & 3`       | `1`          |
| `\|`    | 或            | `5 \| 3`      | `7`          |
| `^`    | 异或          | `5 ^ 3`       | `6`          |
| `~`    | 取反          | `~5`          | `-6`         |
| `<<`   | 左移          | `2 << 1`      | `4`          |
| `>>`   | 右移          | `2 >> 1`      | `1`          |

### 区间运算符

| 运算符 | 描述          | 示例          | 结果         |
|--------|---------------|---------------|--------------|
| `...`  | 闭区间        | `1...5`       | `1, 2, 3, 4, 5` |
| `..<`  | 半开区间      | `1..<5`       | `1, 2, 3, 4` |

### 条件运算符

| 运算符 | 描述          | 示例                      | 结果         |
|--------|---------------|---------------------------|--------------|
| `? :`  | 三元条件运算符 | `a > b ? a : b`          | `a` 或 `b`   |

### 示例代码

```swift
// 算术运算符
let sum = 2 + 3            // sum = 5
let difference = 5 - 3     // difference = 2
let product = 2 * 3        // product = 6
let quotient = 6 / 2       // quotient = 3
let remainder = 5 % 2      // remainder = 1
let concatenatedString = "Hello, " + "world!" // "Hello, world!"

// 赋值运算符
var a = 5
a += 3                    // a = 8
a -= 2                    // a = 6
a *= 2                    // a = 12
a /= 4                    // a = 3
a %= 2                    // a = 1

// 逻辑运算符
let andResult = true && false  // false
let orResult = true || false   // true
let notResult = !true          // false

// 比较运算符
let isEqual = 5 == 5           // true
let isNotEqual = 5 != 3        // true
let isGreater = 5 > 3          // true
let isLesser = 5 < 3           // false
let isGreaterOrEqual = 5 >= 5  // true
let isLesserOrEqual = 5 <= 3   // false

// 位运算符
let andBitwise = 5 & 3         // 1
let orBitwise = 5 | 3          // 7
let xorBitwise = 5 ^ 3         // 6
let notBitwise = ~5            // -6
let leftShift = 2 << 1         // 4
let rightShift = 2 >> 1        // 1

// 区间运算符
let closedRange = 1...5        // 1, 2, 3, 4, 5
let halfOpenRange = 1..<5      // 1, 2, 3, 4

// 条件运算符
let max = (a > b) ? a : b
```

#### 字符串插值
Swift 支持字符串插值，允许将变量和常量的值插入到字符串中。

```swift
let name = "world"
let greeting = "Hello, \(name)!"
```

#### 条件语句
Swift 支持常见的条件语句，如 `if`、`else` 和 `switch`。

```swift
let score = 85

if score >= 90 {
    print("Excellent")
} else if score >= 80 {
    print("Good")
} else {
    print("Needs Improvement")
}

let number = 3

switch number {
case 1:
    print("One")
case 2:
    print("Two")
case 3:
    print("Three")
default:
    print("Other")
}
```

#### 循环
Swift 支持 `for`、`while` 和 `repeat-while` 循环。

```swift
for i in 1...5 {
    print(i)
}

var count = 5
while count > 0 {
    print(count)
    count -= 1
}

repeat {
    print("This is a repeat-while loop")
} while false
```

#### 函数
使用 `func` 关键字定义函数。

```swift
func greet(person: String) -> String {
    return "Hello, \(person)!"
}

let greetingMessage = greet(person: "John")
print(greetingMessage)
```

#### 闭包
闭包是一种可以在代码中传递和使用的自包含块代码。它们类似于匿名函数。

```swift
let numbers = [1, 2, 3, 4, 5]
let squaredNumbers = numbers.map { $0 * $0 }
print(squaredNumbers)
```

#### 类和结构体
Swift 支持面向对象编程，可以定义类和结构体。

```swift
class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func greet() {
        print("Hello, my name is \(name) and I am \(age) years old.")
    }
}

let person = Person(name: "Alice", age: 30)
person.greet()

struct Point {
    var x: Int
    var y: Int

    func display() {
        print("Point is at (\(x), \(y))")
    }
}

let point = Point(x: 3, y: 4)
point.display()
```

## 流程控制

在 Swift 中，流程控制语句用于控制代码的执行顺序。以下是 Swift 中常用的流程控制语句：

### 1. 条件语句

#### `if` 语句
用于根据一个条件来执行代码块。

```swift
let temperature = 30

if temperature > 25 {
    print("It's hot outside.")
}
```

#### `if-else` 语句
用于根据一个条件来执行不同的代码块。

```swift
let temperature = 20

if temperature > 25 {
    print("It's hot outside.")
} else {
    print("It's not hot outside.")
}
```

#### `if-else if-else` 语句
用于根据多个条件来执行不同的代码块。

```swift
let temperature = 15

if temperature > 25 {
    print("It's hot outside.")
} else if temperature > 15 {
    print("It's warm outside.")
} else {
    print("It's cold outside.")
}
```

#### 三元条件运算符
简化的条件判断。

```swift
let temperature = 20
let message = temperature > 25 ? "It's hot outside." : "It's not hot outside."
print(message)
```

### 2. `switch` 语句
用于根据一个值来执行不同的代码块。`switch` 语句在 Swift 中非常强大，支持多种匹配模式。

```swift
let letter = "a"

switch letter {
case "a":
    print("The letter is a.")
case "b", "c":
    print("The letter is b or c.")
case let x where x.hasSuffix("z"):
    print("The letter ends with z.")
default:
    print("Some other letter.")
}
```

### 3. 循环语句

#### `for-in` 循环
用于遍历集合中的所有元素。

```swift
let numbers = [1, 2, 3, 4, 5]

for number in numbers {
    print(number)
}

for index in 1...5 {
    print(index)
}
```

#### `while` 循环
只要条件为真，就重复执行代码块。

```swift
var count = 5

while count > 0 {
    print(count)
    count -= 1
}
```

#### `repeat-while` 循环
先执行代码块，然后只要条件为真，就重复执行。

```swift
var count = 5

repeat {
    print(count)
    count -= 1
} while count > 0
```

### 4. 控制转移语句

#### `break`
用于立即退出循环或 `switch` 语句。

```swift
let numbers = [1, 2, 3, 4, 5]

for number in numbers {
    if number == 3 {
        break
    }
    print(number)
}
```

#### `continue`
用于立即跳过当前循环迭代，开始下一个迭代。

```swift
let numbers = [1, 2, 3, 4, 5]

for number in numbers {
    if number == 3 {
        continue
    }
    print(number)
}
```

#### `fallthrough`
用于在 `switch` 语句中，强制执行下一个 case 代码块。

```swift
let number = 3

switch number {
case 1:
    print("One")
case 3:
    print("Three")
    fallthrough
case 4:
    print("Four")
default:
    print("Other")
}
```

#### `return`
用于退出函数，并返回一个值。

```swift
func greet(person: String) -> String {
    return "Hello, \(person)!"
}

print(greet(person: "Alice"))
```

#### `throw`
用于抛出一个错误。

```swift
enum PrinterError: Error {
    case outOfPaper
    case noToner
}

func printDocument(pages: Int) throws {
    if pages > 100 {
        throw PrinterError.outOfPaper
    }
    print("Printing \(pages) pages")
}

do {
    try printDocument(pages: 200)
} catch PrinterError.outOfPaper {
    print("Out of paper")
} catch {
    print("Unknown error")
}
```

#### `guard`
用于提前退出代码块，

```swift
guard condition else {
    // 条件不满足时执行的代码
    return  // 或者 break、continue、throw 等，根据上下文
}

// 条件满足时，继续执行后续的代码

func validate(age: Int?) {
    guard let age = age, age > 0 else {
        print("Invalid age.")
        return
    }
    print("Valid age: \(age)")
}

validate(age: 25)  // 输出：Valid age: 25
validate(age: nil) // 输出：Invalid age.
validate(age: -5)  // 输出：Invalid age.

// 用于在循环中跳过不满足条件的项。
let numbers = [10, -3, 20, -5, 0]

for number in numbers {
    guard number > 0 else {
        print("Skipping non-positive number: \(number)")
        continue
    }
    print("Processing number: \(number)")
}
```


### 示例代码

```swift
// 条件语句
let temperature = 15

if temperature > 25 {
    print("It's hot outside.")
} else if temperature > 15 {
    print("It's warm outside.")
} else {
    print("It's cold outside.")
}

// 三元条件运算符
let message = temperature > 25 ? "It's hot outside." : "It's not hot outside."
print(message)

// switch 语句
let letter = "a"

switch letter {
case "a":
    print("The letter is a.")
case "b", "c":
    print("The letter is b or c.")
case let x where x.hasSuffix("z"):
    print("The letter ends with z.")
default:
    print("Some other letter.")
}

// for-in 循环
let numbers = [1, 2, 3, 4, 5]

for number in numbers {
    print(number)
}

for index in 1...5 {
    print(index)
}

// while 循环
var count = 5

while count > 0 {
    print(count)
    count -= 1
}

// repeat-while 循环
count = 5

repeat {
    print(count)
    count -= 1
} while count > 0

// break 和 continue
for number in numbers {
    if number == 3 {
        break
    }
    print(number)
}

for number in numbers {
    if number == 3 {
        continue
    }
    print(number)
}

// fallthrough
let number = 3

switch number {
case 1:
    print("One")
case 3:
    print("Three")
    fallthrough
case 4:
    print("Four")
default:
    print("Other")
}

// return
func greet(person: String) -> String {
    return "Hello, \(person)!"
}

print(greet(person: "Alice"))

// throw
enum PrinterError: Error {
    case outOfPaper
    case noToner
}

func printDocument(pages: Int) throws {
    if pages > 100 {
        throw PrinterError.outOfPaper
    }
    print("Printing \(pages) pages")
}

do {
    try printDocument(pages: 200)
} catch PrinterError.outOfPaper {
    print("Out of paper")
} catch {
    print("Unknown error")
}
```

## 函数

在 Swift 中，函数是代码的基本构建块之一。函数可以接收输入参数、执行特定的任务并返回结果。Swift 中的函数有多种分类和使用方式。以下是一些常见的函数分类和示例：

### 1. 基本函数

#### 无参数、无返回值函数
```swift
func greet() {
    print("Hello, World!")
}

greet() // 调用函数
```

#### 带参数、无返回值函数
```swift
func greet(person: String) {
    print("Hello, \(person)!")
}

greet(person: "Alice") // 调用函数
```

#### 带参数、带返回值函数
```swift
func greet(person: String) -> String {
    return "Hello, \(person)!"
}

let message = greet(person: "Bob") // 调用函数并获取返回值
print(message)
```

### 2. 内嵌函数
在函数内部定义的函数称为内嵌函数。这种函数只能在其定义的函数内使用。

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}

var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)

print(moveNearerToZero(currentValue)) // 调用内嵌函数
```

### 3. 多参数函数
函数可以接受多个参数。

```swift
func add(a: Int, b: Int) -> Int {
    return a + b
}

let sum = add(a: 3, b: 5) // 调用函数
print(sum)
```

### 4. 可变参数函数
使用可变参数，函数可以接受多个输入参数，输入参数的数量是不确定的。

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}

let mean = arithmeticMean(1, 2, 3, 4, 5)
print(mean)
```

### 5. 默认参数值函数
函数参数可以有默认值。

```swift
func greet(person: String, from hometown: String = "Unknown") {
    print("Hello, \(person) from \(hometown)!")
}

greet(person: "Alice") // 使用默认参数值
greet(person: "Bob", from: "New York") // 使用指定参数值
```

### 6. 输入输出参数函数
使用 `inout` 关键字，函数可以修改传入的参数值。

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var x = 10
var y = 20
swapTwoInts(&x, &y) // 传入参数的引用
print("x: \(x), y: \(y)")
```

### 7. 函数类型
函数本身也是一种类型，可以作为参数或返回值。

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}

func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}

var mathFunction: (Int, Int) -> Int = addTwoInts
print("Result: \(mathFunction(2, 3))")

mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
```

### 8. 函数作为参数
函数可以作为另一个函数的参数。

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}

printMathResult(addTwoInts, 3, 5)
```

### 9. 函数作为返回值
函数可以返回另一个函数。

```swift
func stepForward(_ input: Int) -> Int {
    return input + 1
}

func stepBackward(_ input: Int) -> Int {
    return input - 1
}

func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}

var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)

print(moveNearerToZero(currentValue)) // 调用返回的函数
```

### 10. 闭包
闭包是可以捕获其上下文的自包含代码块，类似于匿名函数。

```swift
let numbers = [1, 2, 3, 4, 5]
let mappedNumbers = numbers.map { $0 * 2 }
print(mappedNumbers)
```

## 结构体

在 Swift 中，结构体（struct）是一种强大且灵活的数据类型。与类（class）相比，结构体是值类型（value type），这意味着当你将一个结构体实例赋值给另一个变量或常量，或者传递给一个函数时，实际上是对该实例进行了一份拷贝。以下是 Swift 中结构体的相关概念和示例：

### 1. 定义结构体

结构体使用 `struct` 关键字定义，包含属性和方法。

```swift
struct Person {
    var name: String
    var age: Int

    func greet() {
        print("Hello, my name is \(name) and I am \(age) years old.")
    }
}

let person = Person(name: "Alice", age: 30)
person.greet()
```

### 2. 结构体的成员初始化器

结构体自动提供一个成员初始化器，用于初始化所有属性。

```swift
struct Point {
    var x: Int
    var y: Int
}

let point = Point(x: 10, y: 20)
print("Point is at (\(point.x), \(point.y))")
```

### 3. 值类型

结构体是值类型，赋值和传递时会进行拷贝。

```swift
var originalPoint = Point(x: 0, y: 0)
var copiedPoint = originalPoint
copiedPoint.x = 10

print("Original Point: (\(originalPoint.x), \(originalPoint.y))") // (0, 0)
print("Copied Point: (\(copiedPoint.x), \(copiedPoint.y))")     // (10, 0)
```

### 4. 计算属性

结构体可以包含计算属性，这些属性不直接存储值，而是提供一个 getter 和可选的 setter。

```swift
struct Rectangle {
    var width: Double
    var height: Double

    var area: Double {
        return width * height
    }
}

let rect = Rectangle(width: 5.0, height: 10.0)
print("Area of rectangle: \(rect.area)")
```

### 5. 方法

结构体可以包含方法，包括实例方法和类型方法。

```swift
struct Circle {
    var radius: Double

    func circumference() -> Double {
        return 2 * .pi * radius
    }

    static func description() -> String {
        return "A circle is a round shape."
    }
}

let circle = Circle(radius: 5.0)
print("Circumference: \(circle.circumference())")
print(Circle.description())
```

### 6. 变异方法（Mutating Methods）

结构体中的方法默认不能修改属性，使用 `mutating` 关键字可以允许方法修改属性。

```swift
struct Counter {
    var count = 0

    mutating func increment() {
        count += 1
    }

    mutating func reset() {
        count = 0
    }
}

var counter = Counter()
counter.increment()
print("Counter: \(counter.count)") // 1
counter.reset()
print("Counter: \(counter.count)") // 0
```

### 7. 嵌套类型

结构体可以包含嵌套类型。

```swift
struct Chessboard {
    struct Square {
        var row: Int
        var column: Int

        func isValid() -> Bool {
            return row >= 1 && row <= 8 && column >= 1 && column <= 8
        }
    }

    var squares: [Square]

    init() {
        squares = []
        for row in 1...8 {
            for column in 1...8 {
                squares.append(Square(row: row, column: column))
            }
        }
    }
}

let board = Chessboard()
print(board.squares.count) // 64
print(board.squares[0].isValid()) // true
```

### 8. 构造器

自定义构造器用于初始化结构体实例。

```swift
struct Temperature {
    var celsius: Double

    init(fromFahrenheit fahrenheit: Double) {
        celsius = (fahrenheit - 32) / 1.8
    }

    init(fromKelvin kelvin: Double) {
        celsius = kelvin - 273.15
    }
}

let boilingPointOfWater = Temperature(fromFahrenheit: 212.0)
print("Boiling point of water: \(boilingPointOfWater.celsius) °C")

let freezingPointOfWater = Temperature(fromKelvin: 273.15)
print("Freezing point of water: \(freezingPointOfWater.celsius) °C")
```


## 类

在 Swift 中，类（Class）是面向对象编程的核心构造。类不仅可以用于定义对象的属性和行为，还支持继承、多态等特性。以下是 Swift 中各种类型的类及其示例：

### 1. 基本类

定义一个简单的类，包括属性和方法。

```swift
class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func greet() {
        print("Hello, my name is \(name) and I am \(age) years old.")
    }
}

let person = Person(name: "Alice", age: 30)
person.greet()
```

### 2. 子类和继承

子类可以继承父类的属性和方法，并且可以重写父类的方法。

```swift
class Employee: Person {
    var jobTitle: String

    init(name: String, age: Int, jobTitle: String) {
        self.jobTitle = jobTitle
        super.init(name: name, age: age)
    }

    override func greet() {
        print("Hello, my name is \(name), I am \(age) years old, and I work as a \(jobTitle).")
    }
}

let employee = Employee(name: "Bob", age: 25, jobTitle: "Software Engineer")
employee.greet()
```

### 3. 扩展类（Extensions）

扩展类可以添加新的功能，比如新的方法或计算属性，而无需修改原始类的定义。

```swift
extension Person {
    func sayGoodbye() {
        print("Goodbye from \(name).")
    }
}

person.sayGoodbye()
```

### 4. 协议（Protocols）

类可以遵循协议，协议定义了必须实现的方法和属性。

```swift
protocol Greetable {
    func greet()
}

class FriendlyPerson: Greetable {
    var name: String

    init(name: String) {
        self.name = name
    }

    func greet() {
        print("Hi, I'm \(name). Nice to meet you!")
    }
}

let friendlyPerson = FriendlyPerson(name: "Charlie")
friendlyPerson.greet()
```

### 5. 泛型类（Generics）

使用泛型类，可以创建更加通用和灵活的类。

```swift
class Box<T> {
    var value: T

    init(value: T) {
        self.value = value
    }

    func getValue() -> T {
        return value
    }
}

let intBox = Box(value: 123)
print(intBox.getValue())

let stringBox = Box(value: "Hello, Swift")
print(stringBox.getValue())
```

### 6. Final 类

使用 `final` 关键字修饰的类不能被继承，这有助于保护类的实现不被修改。

```swift
final class Animal {
    var name: String

    init(name: String) {
        self.name = name
    }

    func makeSound() {
        print("\(name) makes a sound.")
    }
}

let animal = Animal(name: "Lion")
animal.makeSound()

// 下面的代码会导致错误，因为 Animal 类是 final 的，不能被继承
// class Dog: Animal {}
```

### 7. 抽象类（Abstract Classes）

Swift 没有直接支持抽象类，但可以通过定义一个包含必须被子类重写的方法的协议来模拟抽象类的行为。

```swift
protocol Vehicle {
    var speed: Int { get set }
    func description() -> String
}

class Car: Vehicle {
    var speed: Int

    init(speed: Int) {
        self.speed = speed
    }

    func description() -> String {
        return "A car moving at \(speed) km/h"
    }
}

let car = Car(speed: 120)
print(car.description())
```

### 8. 嵌套类

可以在类的内部定义另一个类，这样做可以将相关的类组织在一起。

```swift
class OuterClass {
    class NestedClass {
        func nestedMethod() {
            print("This is a nested class method.")
        }
    }

    func outerMethod() {
        print("This is an outer class method.")
    }
}

let outer = OuterClass()
outer.outerMethod()

let nested = OuterClass.NestedClass()
nested.nestedMethod()
```

### 9. 类与结构体的对比

类与结构体在 Swift 中有许多相似之处，但也有一些关键区别。

- 类是引用类型，而结构体是值类型。
- 类支持继承，而结构体不支持。
- 类可以定义析构器，而结构体不能。

```swift
struct StructExample {
    var value: Int

    init(value: Int) {
        self.value = value
    }
}

let structInstance = StructExample(value: 10)
print(structInstance.value)
```

## 类的特殊方法

在 Swift 中，类（class）可以包含多种特殊方法，提供额外的功能和灵活性。以下是一些类中常见的特殊方法及其用途：

### 1. 构造器（Initializers）

构造器用于初始化类的实例。

#### 默认构造器
如果类的所有属性都有默认值，Swift 会自动提供一个默认构造器。

```swift
class Person {
    var name: String = "Unnamed"
    var age: Int = 0
}

let person = Person()
print(person.name) // 输出 "Unnamed"
```

#### 自定义构造器
你可以定义自定义构造器以设置初始属性值。

```swift
class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

let person = Person(name: "Alice", age: 30)
print(person.name) // 输出 "Alice"
```

#### 便利构造器（Convenience Initializers）
便利构造器是对主要构造器的一种补充，使用 `convenience` 关键字定义。

```swift
class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    convenience init(name: String) {
        self.init(name: name, age: 0)
    }
}

let person = Person(name: "Bob")
print(person.age) // 输出 0
```

### 2. 析构器（Deinitializers）

析构器用于在类实例被释放之前执行清理操作。使用 `deinit` 关键字定义。

```swift
class BankAccount {
    var balance: Double

    init(balance: Double) {
        self.balance = balance
        print("Account created with balance: \(balance)")
    }

    deinit {
        print("Account with balance \(balance) is being closed.")
    }
}

var account: BankAccount? = BankAccount(balance: 1000.0)
account = nil // 输出 "Account with balance 1000.0 is being closed."
```

### 3. 类方法和静态方法（Class and Static Methods）

使用 `class` 和 `static` 关键字定义类级别的方法。

#### 类方法
类方法可以被子类重写。

```swift
class SomeClass {
    class func classMethod() {
        print("This is a class method.")
    }
}

SomeClass.classMethod() // 输出 "This is a class method."
```

#### 静态方法
静态方法不能被子类重写。

```swift
class SomeClass {
    static func staticMethod() {
        print("This is a static method.")
    }
}

SomeClass.staticMethod() // 输出 "This is a static method."
```

### 4. 可失败构造器（Failable Initializers）

可失败构造器在初始化失败时返回 `nil`。使用 `init?` 定义。

```swift
class Animal {
    var species: String

    init?(species: String) {
        if species.isEmpty {
            return nil
        }
        self.species = species
    }
}

if let animal = Animal(species: "") {
    print("Animal created with species: \(animal.species)")
} else {
    print("Failed to create animal.") // 输出 "Failed to create animal."
}
```

### 5. 重写方法（Overriding Methods）

子类可以重写父类的方法，属性或构造器。使用 `override` 关键字。

```swift
class Vehicle {
    func describe() {
        print("This is a vehicle.")
    }
}

class Car: Vehicle {
    override func describe() {
        print("This is a car.")
    }
}

let car = Car()
car.describe() // 输出 "This is a car."
```

### 6. 下标（Subscripts）

下标允许类像数组一样通过索引访问值。使用 `subscript` 关键字定义。

```swift
class Matrix {
    let rows: Int, columns: Int
    var grid: [Double]

    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }

    subscript(row: Int, column: Int) -> Double {
        get {
            return grid[(row * columns) + column]
        }
        set {
            grid[(row * columns) + column] = newValue
        }
    }
}

var matrix = Matrix(rows: 2, columns: 2)
matrix[0, 1] = 1.5
print(matrix[0, 1]) // 输出 1.5
```

### 7. 类属性（Class Properties）

类属性是属于类本身而不是类实例的属性。使用 `class` 或 `static` 关键字定义。

```swift
class SomeClass {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 1
    }

    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}

print(SomeClass.storedTypeProperty) // 输出 "Some value."
print(SomeClass.computedTypeProperty) // 输出 1
print(SomeClass.overrideableComputedTypeProperty) // 输出 107
```

## 扩展
在 Swift 中，扩展（Extensions）可以为现有的类、结构体、枚举和协议添加新的功能。扩展可以添加新的方法、属性、下标，甚至可以为协议添加实现。通过使用扩展，开发者可以在不需要访问原始代码的情况下，对现有类型进行增强和定制。以下是 Swift 中使用扩展的一些示例和应用场景：

### 1. 添加计算属性

扩展可以为现有类型添加计算属性，但不能添加存储属性。

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}

let distance = 42.0.km
print("Distance in meters: \(distance.m)") // 输出 "Distance in meters: 42000.0"
```

### 2. 添加实例方法和类型方法

扩展可以为现有类型添加实例方法和类型方法。

```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}

3.repetitions {
    print("Hello!") // 输出 "Hello!" 三次
}
```

### 3. 添加下标

扩展可以为现有类型添加下标。

```swift
extension String {
    subscript(index: Int) -> Character {
        return self[self.index(self.startIndex, offsetBy: index)]
    }
}

let string = "Hello"
print(string[1]) // 输出 "e"
```

### 4. 添加初始化器

扩展可以为现有类型添加新的初始化器，但不能添加带有存储属性的初始化器。

```swift
struct Size {
    var width = 0.0, height = 0.0
}

struct Point {
    var x = 0.0, y = 0.0
}

struct Rect {
    var origin = Point()
    var size = Size()
}

extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}

let centerRect = Rect(center: Point(x: 4.0, y: 4.0), size: Size(width: 3.0, height: 3.0))
print(centerRect.origin.x) // 输出 "2.5"
print(centerRect.origin.y) // 输出 "2.5"
```

### 5. 添加协议遵从

扩展可以使现有类型遵从一个或多个协议。

```swift
protocol Togglable {
    mutating func toggle()
}

extension Bool: Togglable {
    mutating func toggle() {
        self = !self
    }
}

var lightSwitch = false
lightSwitch.toggle()
print(lightSwitch) // 输出 "true"
```

### 6. 扩展嵌套类型

扩展可以为现有类型添加新的嵌套类型。

```swift
extension Int {
    enum Kind {
        case negative, zero, positive
    }

    var kind: Kind {
        switch self {
        case 0:
            return .zero
        case let x where x > 0:
            return .positive
        default:
            return .negative
        }
    }
}

func printIntegerKinds(_ numbers: [Int]) {
    for number in numbers {
        switch number.kind {
        case .negative:
            print("- ", terminator: "")
        case .zero:
            print("0 ", terminator: "")
        case .positive:
            print("+ ", terminator: "")
        }
    }
    print("")
}

printIntegerKinds([3, 19, -27, 0, -6, 0, 7]) // 输出 "+ + - 0 - 0 + "
```

### 7. 扩展泛型类型

扩展可以为泛型类型添加新的功能。

```swift
extension Array where Element: Equatable {
    func containsDuplicate() -> Bool {
        var seen = [Element]()
        for element in self {
            if seen.contains(element) {
                return true
            }
            seen.append(element)
        }
        return false
    }
}

let numbers = [1, 2, 3, 1]
print(numbers.containsDuplicate()) // 输出 "true"
```

### 8. 扩展协议（Protocol Extensions）

协议扩展可以为协议提供默认实现。

```swift
protocol Describable {
    func describe() -> String
}

extension Describable {
    func describe() -> String {
        return "This is an object that conforms to Describable."
    }
}

struct MyStruct: Describable {}

let myStruct = MyStruct()
print(myStruct.describe()) // 输出 "This is an object that conforms to Describable."
```

## 泛型

在 Swift 中，泛型（Generics）是一个强大的特性，它允许你编写灵活且可重用的函数和类型，从而避免代码重复，并能够处理任意类型的数据。泛型使得你的代码更加抽象和通用，适用于多种类型，而不仅仅是某一种具体的类型。

### 1. 泛型函数

泛型函数可以处理不同类型的参数，使用占位类型名（如 `T`）来代替实际类型名。

```swift
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var a = 3
var b = 5
swapTwoValues(&a, &b)
print("a: \(a), b: \(b)") // 输出 "a: 5, b: 3"

var x = "hello"
var y = "world"
swapTwoValues(&x, &y)
print("x: \(x), y: \(y)") // 输出 "x: world, y: hello"
```

### 2. 泛型类型

泛型不仅可以应用于函数，还可以应用于类、结构体和枚举。

#### 泛型类

```swift
class Stack<Element> {
    var items = [Element]()
    
    func push(_ item: Element) {
        items.append(item)
    }
    
    func pop() -> Element {
        return items.removeLast()
    }
}

var intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
print(intStack.pop()) // 输出 2

var stringStack = Stack<String>()
stringStack.push("hello")
stringStack.push("world")
print(stringStack.pop()) // 输出 "world"
```

#### 泛型结构体

```swift
struct Pair<T, U> {
    var first: T
    var second: U
}

let pair = Pair(first: "Swift", second: 5)
print(pair.first) // 输出 "Swift"
print(pair.second) // 输出 5
```

### 3. 约束泛型

可以使用 `where` 关键字为泛型添加约束，使其只能用于特定类型。

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}

let integers = [1, 2, 3, 4, 5]
if let index = findIndex(of: 3, in: integers) {
    print("Index of 3: \(index)") // 输出 "Index of 3: 2"
}

let strings = ["apple", "banana", "cherry"]
if let index = findIndex(of: "banana", in: strings) {
    print("Index of banana: \(index)") // 输出 "Index of banana: 1"
}
```

### 4. 关联类型

关联类型用于为协议中的泛型类型指定占位符名称。使用 `associatedtype` 关键字定义关联类型。

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

struct IntStack: Container {
    var items = [Int]()
    
    mutating func push(_ item: Int) {
        items.append(item)
    }
    
    mutating func pop() -> Int {
        return items.removeLast()
    }
    
    // Container 协议的实现
    mutating func append(_ item: Int) {
        self.push(item)
    }
    
    var count: Int {
        return items.count
    }
    
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```

### 5. 泛型扩展

可以对泛型类型进行扩展，并为其添加新的方法或计算属性。

```swift
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}

if let topItem = intStack.topItem {
    print("Top item: \(topItem)") // 输出 "Top item: 1"
}
```

### 6. 泛型协议

协议中可以包含泛型类型约束，使得协议更加通用。

```swift
protocol EquatableContainer: Container where Item: Equatable {
    func contains(_ item: Item) -> Bool
}

extension IntStack: EquatableContainer {
    func contains(_ item: Int) -> Bool {
        return items.contains(item)
    }
}

var myStack = IntStack()
myStack.push(1)
myStack.push(2)
print(myStack.contains(2)) // 输出 "true"
print(myStack.contains(3)) // 输出 "false"
```

## 错误处理

在 Swift 中，错误处理是用来应对程序执行过程中可能发生的错误情况的机制。Swift 提供了一种现代化的、清晰的、编译器强类型检查的错误处理方法，主要通过 `do`、`try`、`catch` 和 `throw` 关键字来实现。以下是 Swift 中错误处理的几个关键概念和使用方法：

### 1. 定义错误类型

在 Swift 中，错误类型必须遵循 `Error` 协议。通常使用枚举来定义错误类型，因为枚举可以方便地分组相关的错误情况。

```swift
enum PrinterError: Error {
    case outOfPaper
    case noToner
    case onFire
}
```

### 2. 抛出错误

使用 `throw` 关键字来抛出错误。

```swift
func checkPrinterStatus() throws {
    throw PrinterError.outOfPaper
}
```

### 3. 处理错误

错误处理使用 `do`、`try` 和 `catch` 关键字来完成。

#### 捕获和处理错误

```swift
do {
    try checkPrinterStatus()
    print("Printer is working fine.")
} catch PrinterError.outOfPaper {
    print("The printer is out of paper.")
} catch PrinterError.noToner {
    print("The printer is out of toner.")
} catch PrinterError.onFire {
    print("The printer is on fire!")
} catch {
    print("An unknown error occurred.")
}
```

#### 多重捕获块

可以在 `catch` 中使用多个捕获块，分别处理不同的错误类型。

```swift
do {
    try checkPrinterStatus()
} catch PrinterError.outOfPaper {
    print("The printer is out of paper.")
} catch PrinterError.noToner {
    print("The printer is out of toner.")
} catch PrinterError.onFire {
    print("The printer is on fire!")
} catch {
    print("An unknown error occurred.")
}
```

### 4. 使用 `try?` 和 `try!`

#### `try?`

`try?` 会将错误转换为可选值。如果抛出错误，结果为 `nil`；否则，结果是包含函数返回值的可选值。

```swift
func checkPrinterStatus() throws -> String {
    throw PrinterError.outOfPaper
}

let printerStatus = try? checkPrinterStatus()
print(printerStatus) // 输出 "nil"
```

#### `try!`

`try!` 用于确认不会抛出错误。如果实际抛出了错误，则会引发运行时错误，导致程序崩溃。

```swift
let printerStatus = try! checkPrinterStatus() // 如果抛出错误，会导致运行时崩溃
print(printerStatus)
```

### 5. 传递错误

错误可以被传递到调用函数的作用域中，使用 `throws` 关键字标记函数以表明它可以抛出错误。

```swift
func sendJobToPrinter(job: String) throws {
    try checkPrinterStatus()
    print("Job sent to printer.")
}

do {
    try sendJobToPrinter(job: "MyDocument")
} catch {
    print("Failed to send job to printer.")
}
```

### 6. 清理操作：`defer`

`defer` 语句用来在当前作用域退出前执行一段代码。可以用于进行资源清理或其他必要的收尾工作。

```swift
func processFile(filename: String) throws {
    print("Opening file: \(filename)")
    defer {
        print("Closing file: \(filename)")
    }
    
    // 假设在这里发生错误
    throw PrinterError.noToner
}

do {
    try processFile(filename: "myfile.txt")
} catch {
    print("An error occurred: \(error)")
}

// 输出顺序:
// Opening file: myfile.txt
// Closing file: myfile.txt
// An error occurred: noToner
```

## 标准库

Swift 的标准库包含许多模块，每个模块提供特定的功能。这些模块包括基本数据类型、集合、字符串处理、错误处理、并发等。以下是一些主要模块及其功能概述和示例：

### 1. `Foundation`

`Foundation` 是一个核心库，提供了许多基本的数据类型和功能，如字符串处理、日期和时间、文件处理、网络编程等。

```swift
import Foundation

// 日期和时间
let currentDate = Date()
print("Current date: \(currentDate)")

// 格式化日期
let formatter = DateFormatter()
formatter.dateStyle = .short
let dateString = formatter.string(from: currentDate)
print("Formatted date: \(dateString)")

// 文件处理
let fileManager = FileManager.default
let currentPath = fileManager.currentDirectoryPath
print("Current path: \(currentPath)")
```

### 2. `UIKit`

`UIKit` 是用于 iOS 和 tvOS 应用程序开发的用户界面框架，提供了创建和管理应用程序用户界面的功能。

```swift
import UIKit

// 创建一个简单的按钮
let button = UIButton(type: .system)
button.setTitle("Press me", for: .normal)
button.addTarget(self, action: #selector(buttonPressed), for: .touchUpInside)

@objc func buttonPressed() {
    print("Button was pressed")
}
```

### 3. `SwiftUI`

`SwiftUI` 是一种现代的用户界面框架，用于跨 Apple 平台构建用户界面。它采用声明式语法，使 UI 代码更加简洁和易于维护。

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
            .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

### 4. `Combine`

`Combine` 是一个用于处理异步事件流的框架。它提供了声明式的 Swift API，用于处理事件、数据流和响应变化。

```swift
import Combine

// 简单的发布者和订阅者示例
let publisher = Just("Hello, Combine")
let subscriber = Subscribers.Sink<String, Never>(
    receiveCompletion: { completion in
        print("Received completion: \(completion)")
    },
    receiveValue: { value in
        print("Received value: \(value)")
    }
)

publisher.subscribe(subscriber)
```

### 5. `CoreData`

`CoreData` 是一个对象图管理和持久化框架，用于在 iOS 和 macOS 应用程序中管理和存储数据。

```swift
import CoreData

// 创建一个简单的 Core Data 实体
class Person: NSManagedObject {
    @NSManaged var name: String
    @NSManaged var age: Int16
}

// 设置 Core Data 堆栈
let container = NSPersistentContainer(name: "Model")
container.loadPersistentStores { storeDescription, error in
    if let error = error {
        print("Unresolved error \(error)")
    }
}

// 创建和保存一个 Person 实体
let context = container.viewContext
let person = Person(context: context)
person.name = "Alice"
person.age = 30

do {
    try context.save()
} catch {
    print("Failed to save context: \(error)")
}
```

### 6. `Dispatch`

`Dispatch`（GCD）是用于并发编程的框架，提供了管理异步任务和线程的工具。

```swift
import Dispatch

// 创建一个全局并发队列
let queue = DispatchQueue.global(qos: .userInitiated)

// 异步执行任务
queue.async {
    print("This is running on a background queue")
}

// 主队列上执行任务
DispatchQueue.main.async {
    print("This is running on the main queue")
}
```

### 7. `MapKit`

`MapKit` 提供了地图和位置服务的功能，可以在 iOS 和 macOS 应用程序中集成地图视图和位置处理。

```swift
import MapKit

// 创建一个地图视图
let mapView = MKMapView(frame: CGRect(x: 0, y: 0, width: 300, height: 300))

// 设置地图的中心点
let coordinate = CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194)
mapView.setCenter(coordinate, animated: true)
```

### 8. `AVFoundation`

`AVFoundation` 提供了处理音频和视频的功能，可以用于播放、录制和编辑多媒体内容。

```swift
import AVFoundation

// 播放一个音频文件
let url = URL(fileURLWithPath: "path/to/audio/file.mp3")
let player = try! AVAudioPlayer(contentsOf: url)
player.play()
```

### 9. `SceneKit`

`SceneKit` 是一个高性能的 3D 图形框架，用于在 iOS 和 macOS 应用程序中创建 3D 内容。

```swift
import SceneKit

// 创建一个 3D 场景
let scene = SCNScene()

// 添加一个立方体节点
let box = SCNBox(width: 1.0, height: 1.0, length: 1.0, chamferRadius: 0.0)
let boxNode = SCNNode(geometry: box)
scene.rootNode.addChildNode(boxNode)
```

### 10. `SpriteKit`

`SpriteKit` 是一个用于创建 2D 游戏和动画的框架。

```swift
import SpriteKit

// 创建一个 SpriteKit 场景
class GameScene: SKScene {
    override func didMove(to view: SKView) {
        let label = SKLabelNode(text: "Hello, SpriteKit!")
        label.position = CGPoint(x: self.frame.midX, y: self.frame.midY)
        self.addChild(label)
    }
}

// 配置视图以显示游戏场景
let scene = GameScene(size: CGSize(width: 640, height: 480))
let skView = SKView(frame: CGRect(x: 0, y: 0, width: 640, height: 480))
skView.presentScene(scene)
```

## 并发编程

### 多进程

在 Swift 中，多进程编程通常涉及启动和管理多个独立的进程。这与多线程编程不同，因为每个进程都有其独立的内存空间和资源管理。多进程编程在需要隔离任务或增强稳定性（如防止某个任务崩溃影响主应用）时非常有用。`Process` 类主要用于 macOS 和 Linux 平台。在 iOS 上，Process 类不可用，因为 iOS 应用程序不允许启动子进程。这是因为 iOS 的安全沙盒限制不允许应用程序执行外部命令或启动新的进程。

1. **使用 `Process` 类启动子进程**
   Swift 提供了 `Process` 类（在 Foundation 框架中）来启动和管理子进程。你可以使用它来运行命令行工具或执行其他二进制文件。

   ```swift
   import Foundation

   let process = Process()
   process.executableURL = URL(fileURLWithPath: "/bin/echo")
   process.arguments = ["Hello, World!"]

   let pipe = Pipe()
   process.standardOutput = pipe

   do {
       try process.run()
       process.waitUntilExit()

       let data = pipe.fileHandleForReading.readDataToEndOfFile()
       if let output = String(data: data, encoding: .utf8) {
           print("子进程输出: \(output)")
       }
   } catch {
       print("子进程启动失败: \(error)")
   }
   ```

   在这个示例中：
   - `Process()` 类用于启动一个新的进程。
   - `executableURL` 设置要运行的可执行文件的路径（在此示例中为 `echo` 命令）。
   - `arguments` 是传递给可执行文件的参数。
   - `Pipe()` 用于捕获子进程的输出。

2. **在子进程中执行其他命令**
   你可以启动任何可以从命令行运行的命令或脚本。

   ```swift
   process.executableURL = URL(fileURLWithPath: "/usr/bin/env")
   process.arguments = ["ls", "-la", "/path/to/directory"]
   ```

   这个示例中，`env` 命令用来运行 `ls` 命令并列出指定目录的内容。

3. **与子进程通信**
   你可以通过 `Pipe` 与子进程通信，读取它的输出或将数据写入它的输入。

   ```swift
   let inputPipe = Pipe()
   let outputPipe = Pipe()

   process.standardInput = inputPipe
   process.standardOutput = outputPipe

   let inputData = "Some input data\n".data(using: .utf8)!
   inputPipe.fileHandleForWriting.write(inputData)
   ```

4. **管理多个子进程**
   如果你需要同时管理多个子进程，可以创建多个 `Process` 实例并在不同的线程或队列中运行它们。

   ```swift
   let process1 = Process()
   process1.executableURL = URL(fileURLWithPath: "/path/to/first/command")
   
   let process2 = Process()
   process2.executableURL = URL(fileURLWithPath: "/path/to/second/command")

   let queue = DispatchQueue(label: "com.example.processes", attributes: .concurrent)
   
   queue.async {
       do {
           try process1.run()
           process1.waitUntilExit()
       } catch {
           print("Process 1 failed: \(error)")
       }
   }
   
   queue.async {
       do {
           try process2.run()
           process2.waitUntilExit()
       } catch {
           print("Process 2 failed: \(error)")
       }
   }
   ```

### 多线程

#### Thread
在 Swift 中，`Thread` 类是一个更底层的 API，允许你手动创建和管理线程。尽管在现代 iOS 和 macOS 开发中，`DispatchQueue` 和 `OperationQueue` 是更常用和推荐的方式，但 `Thread` 依然可以用于多线程编程。

1. 创建并启动线程

```swift
import Foundation

// 定义在线程中执行的函数
func runTask() {
    for i in 1...5 {
        print("任务执行中：\(i) - \(Thread.current)")
        sleep(1) // 模拟耗时任务
    }
}

// 创建并启动线程
let thread = Thread {
    runTask()
}

thread.start() // 开始线程
```

2. 使用自定义的类方法

你可以创建一个自定义的类，继承自 `Thread`，并在 `main()` 方法中实现你希望在线程中执行的代码。

```swift
import Foundation

class MyThread: Thread {
    override func main() {
        for i in 1...5 {
            print("自定义线程任务：\(i) - \(Thread.current)")
            sleep(1) // 模拟耗时任务
        }
    }
}

let myThread = MyThread()
myThread.start() // 开始自定义线程
```

3. 检查线程状态

你可以检查线程的状态，比如它是否在执行、是否已经被取消等：

```swift
if thread.isExecuting {
    print("线程正在执行")
}

if thread.isFinished {
    print("线程已经完成")
}

if thread.isCancelled {
    print("线程已被取消")
}
```

4. 取消线程

你可以使用 `cancel()` 方法来标记线程为已取消状态，但需要在线程任务中手动检查并处理取消状态。

```swift
class MyThread: Thread {
    override func main() {
        for i in 1...10 {
            if self.isCancelled {
                print("线程已取消")
                break
            }
            print("线程任务执行中：\(i)")
            sleep(1)
        }
    }
}

let myThread = MyThread()
myThread.start()

// 取消线程
DispatchQueue.global().asyncAfter(deadline: .now() + 3) {
    myThread.cancel()
}
```

5. 线程间通信

与其他线程通信通常需要通过使用 `DispatchQueue.main.async` 将任务提交到主线程来更新 UI 或与主线程交互。

```swift
class MyThread: Thread {
    override func main() {
        for i in 1...5 {
            print("后台任务 \(i)")
            sleep(1)
            
            // 回到主线程更新UI
            DispatchQueue.main.async {
                print("更新UI \(i)")
            }
        }
    }
}

let myThread = MyThread()
myThread.start()
```

#### **使用 Grand Central Dispatch (GCD)**
GCD 是 Apple 提供的一种用于管理多线程的底层 API。它通过 `DispatchQueue` 类来调度任务，分为串行队列和并发队列。

**并发队列和串行队列**
- **并发队列（Concurrent Queue）**: 允许多个任务并发执行（但不一定同时执行），任务可以同时启动，但结束时间取决于各自的执行时间。
- **串行队列（Serial Queue）**: 任务按顺序执行，一个任务完成后，下一个任务才会开始。

```swift
import Foundation

// 创建并发队列
let concurrentQueue = DispatchQueue(label: "com.example.concurrentQueue", attributes: .concurrent)

// 在并发队列中异步执行任务
concurrentQueue.async {
    for i in 0..<5 {
        print("并发任务 1 - \(i)")
    }
}

concurrentQueue.async {
    for i in 0..<5 {
        print("并发任务 2 - \(i)")
    }
}

// 创建串行队列
let serialQueue = DispatchQueue(label: "com.example.serialQueue")

// 在串行队列中异步执行任务
serialQueue.async {
    for i in 0..<5 {
        print("串行任务 1 - \(i)")
    }
}

serialQueue.async {
    for i in 0..<5 {
        print("串行任务 2 - \(i)")
    }
}
```

##### **主队列**
主队列是一个特殊的串行队列，专门用于执行与 UI 相关的任务。所有 UI 更新必须在主队列中进行。

```swift
DispatchQueue.main.async {
    // 更新UI的代码必须在主队列中执行
    self.updateUI()
}
```

##### **延迟执行任务**
你可以使用 `asyncAfter` 方法在指定的时间后执行任务。

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
    print("任务在延迟2秒后执行")
}
```

#### **使用 OperationQueue**
`OperationQueue` 是一个更高级的 API，相比 GCD，它提供了更多的功能和更强的灵活性。你可以使用 `OperationQueue` 来管理并发任务、设置任务之间的依赖关系，并更容易地取消和暂停任务。

```swift
import Foundation

let operationQueue = OperationQueue()

let operation1 = BlockOperation {
    for i in 0..<5 {
        print("Operation 1 - \(i)")
    }
}

let operation2 = BlockOperation {
    for i in 0..<5 {
        print("Operation 2 - \(i)")
    }
}

// 设置依赖关系，确保 operation1 先执行
operation2.addDependency(operation1)

operationQueue.addOperation(operation1)
operationQueue.addOperation(operation2)
```

##### **取消操作**
你可以随时取消一个 `Operation`，如果它还没有开始执行或正在进行中。

```swift
operation1.cancel()
```

##### **线程同步**
在多线程环境中，如果多个线程同时访问共享资源，你需要确保线程安全。常见的线程同步方法包括使用 `DispatchSemaphore`、`DispatchBarrier` 或锁（如 `NSLock`）。
 
**使用 DispatchSemaphore**

`DispatchSemaphore` 用于控制并发的任务数，确保只有指定数量的任务可以同时执行。

```swift
let semaphore = DispatchSemaphore(value: 1)

DispatchQueue.global().async {
    semaphore.wait()  // 请求信号量
    // 访问共享资源的代码
    print("线程1执行")
    semaphore.signal()  // 释放信号量
}

DispatchQueue.global().async {
    semaphore.wait()  // 请求信号量
    // 访问共享资源的代码
    print("线程2执行")
    semaphore.signal()  // 释放信号量
}
```

**使用 DispatchBarrier**

`DispatchBarrier` 可以用于并发队列中，在一个屏障任务完成之前，确保没有其他任务正在运行。

```swift
let concurrentQueue = DispatchQueue(label: "com.example.concurrentQueue", attributes: .concurrent)

concurrentQueue.async {
    print("任务 1")
}

concurrentQueue.async(flags: .barrier) {
    print("屏障任务")
}

concurrentQueue.async {
    print("任务 2")
}
```

**使用 NSLock**

`NSLock` 是一种基础的锁机制，用于保护临界区，以确保同一时间只有一个线程能访问共享资源。

```swift
let lock = NSLock()

DispatchQueue.global().async {
    lock.lock()
    // 访问共享资源
    print("线程1执行")
    lock.unlock()
}

DispatchQueue.global().async {
    lock.lock()
    // 访问共享资源
    print("线程2执行")
    lock.unlock()
}
```

### await/async

1. **基本的 `async/await` 用法**

在 SwiftUI 中，你可以使用 `async/await` 处理异步操作，并将结果直接绑定到视图中。为了演示这个，我们可以创建一个简单的视图，在该视图中，按下按钮时异步获取数据。

```swift
import SwiftUI

struct ContentView: View {
    @State private var data: String = "未获取数据"
    @State private var isLoading: Bool = false

    var body: some View {
        VStack {
            Text(data)
                .padding()
            
            if isLoading {
                ProgressView("Loading...")
            }
            
            Button("获取数据") {
                Task {
                    isLoading = true
                    data = await fetchData()
                    isLoading = false
                }
            }
            .padding()
        }
    }
    
    func fetchData() async -> String {
        // 模拟异步网络请求
        try? await Task.sleep(nanoseconds: 2 * 1_000_000_000)
        return "数据已获取"
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

2. **在 `onAppear` 中使用 `async/await`**

通常，你可能希望在视图首次加载时就启动异步任务，这可以在 `onAppear` 修饰符中实现。

```swift
import SwiftUI

struct ContentView: View {
    @State private var data: String = "加载中..."

    var body: some View {
        Text(data)
            .padding()
            .onAppear {
                Task {
                    data = await fetchData()
                }
            }
    }
    
    func fetchData() async -> String {
        // 模拟异步网络请求
        try? await Task.sleep(nanoseconds: 2 * 1_000_000_000)
        return "数据已加载"
    }
}
```

在这个例子中，视图加载时立即启动一个异步任务，并将结果显示在文本中。

3. **错误处理**

当你使用 `async/await` 时，通常需要处理可能的错误。你可以在 SwiftUI 的视图中结合 `do-catch` 语句处理这些错误。

```swift
import SwiftUI

struct ContentView: View {
    @State private var data: String = "加载中..."
    @State private var showAlert: Bool = false

    var body: some View {
        Text(data)
            .padding()
            .onAppear {
                Task {
                    do {
                        data = try await fetchData()
                    } catch {
                        data = "数据加载失败"
                        showAlert = true
                    }
                }
            }
            .alert(isPresented: $showAlert) {
                Alert(title: Text("错误"), message: Text("无法加载数据"), dismissButton: .default(Text("确定")))
            }
    }
    
    func fetchData() async throws -> String {
        // 模拟一个可能失败的异步操作
        try? await Task.sleep(nanoseconds: 2 * 1_000_000_000)
        throw URLError(.badServerResponse)
    }
}
```

4. **结合 `@StateObject` 和 `@ObservedObject` 使用**

当你需要处理较为复杂的异步逻辑时，可以将这些逻辑封装到一个 `ObservableObject` 中，并使用 `@StateObject` 或 `@ObservedObject` 在视图中观察它。

```swift
import SwiftUI

class DataFetcher: ObservableObject {
    @Published var data: String = "加载中..."
    
    func loadData() async {
        do {
            data = try await fetchData()
        } catch {
            data = "加载失败"
        }
    }
    
    private func fetchData() async throws -> String {
        try? await Task.sleep(nanoseconds: 2 * 1_000_000_000)
        return "数据已加载"
    }
}

struct ContentView: View {
    @StateObject private var fetcher = DataFetcher()

    var body: some View {
        Text(fetcher.data)
            .padding()
            .onAppear {
                Task {
                    await fetcher.loadData()
                }
            }
    }
}
```

在这个例子中，`DataFetcher` 类负责处理数据加载逻辑，视图只需在适当的时候调用 `loadData()` 方法即可。


