---
title: Kotlin基础
---

Kotlin 是由 JetBrains 开发的一种现代化的静态类型编程语言[Kotlin 官方文档](https://kotlinlang.org/docs/reference/)，设计上完全与 Java 互操作，因此在 Android 开发和其他基于 Java 的项目中非常受欢迎。以下是 Kotlin 语言的一些基础概念和特性。

## Hello World
```kotlin
fun main() {
    println("Hello, World!")
}
```

## 变量
Kotlin 支持可变 (`var`) 和不可变 (`val`) 变量。
```kotlin
val name: String = "John"  // 不可变变量
var age: Int = 30          // 可变变量
```

## 数据类型

### 数据类型表格

| 数据类型  | 描述                           | 示例                   |
| ---------- | ------------------------------ | ----------------------- |
| `Int`      | 32位整数                       | `val num: Int = 10`     |
| `Long`     | 64位整数                       | `val num: Long = 100L`  |
| `Float`    | 32位浮点数                     | `val num: Float = 10.5F`|
| `Double`   | 64位浮点数                     | `val num: Double = 10.5`|
| `Boolean`  | 布尔类型（true 或 false）       | `val isTrue: Boolean = true` |
| `Char`     | 单个字符                       | `val char: Char = 'A'`  |
| `String`   | 字符串                         | `val text: String = "Hello"` |
| `Byte`     | 8位整数                        | `val byte: Byte = 1`    |
| `Short`    | 16位整数                       | `val short: Short = 10` |

### 示例代码

```kotlin
fun main() {
    // 整数类型
    val intNum: Int = 10
    val longNum: Long = 100L
    val shortNum: Short = 10
    val byteNum: Byte = 1

    // 浮点类型
    val floatNum: Float = 10.5F
    val doubleNum: Double = 10.5

    // 布尔类型
    val isTrue: Boolean = true
    val isFalse: Boolean = false

    // 字符类型
    val char: Char = 'A'

    // 字符串类型
    val text: String = "Hello, Kotlin!"

    // 打印输出
    println("Int: $intNum")
    println("Long: $longNum")
    println("Short: $shortNum")
    println("Byte: $byteNum")
    println("Float: $floatNum")
    println("Double: $doubleNum")
    println("Boolean True: $isTrue")
    println("Boolean False: $isFalse")
    println("Char: $char")
    println("String: $text")
}
```

## 类型转换
在 Kotlin 中，类型转换（Type Conversion）用于将一种类型的变量转换为另一种类型。Kotlin 提供了多种类型转换方式，包括显式类型转换、智能类型转换、安全类型转换等。以下是一些常见的类型转换方法和示例。

### 显式类型转换

Kotlin 提供了一组标准函数用于显式类型转换。这些函数包括 `toInt()`, `toLong()`, `toDouble()`, `toFloat()`, `toChar()`, `toString()` 等。

#### 示例

```kotlin
fun main() {
    val a: Int = 10
    val b: Long = a.toLong()
    val c: Float = a.toFloat()
    val d: String = a.toString()
    val e: Double = d.toDoubleOrNull() ?: 0.0  // 安全的字符串转Double

    println("Int to Long: $b")
    println("Int to Float: $c")
    println("Int to String: $d")
    println("String to Double: $e")
}
```

### 智能类型转换

Kotlin 的智能类型转换基于类型检查（`is` 操作符）和安全类型转换（`as?` 操作符）。在类型检查之后，Kotlin 会自动将变量转换为检查的类型。

#### 类型检查和智能转换

```kotlin
fun main() {
    val obj: Any = "Hello, Kotlin"

    if (obj is String) {
        // obj 自动被转换为 String
        println("String length: ${obj.length}")
    } else {
        println("Not a string")
    }
}
```

#### 安全类型转换

使用 `as?` 操作符进行安全类型转换，如果转换失败，会返回 `null`。

```kotlin
fun main() {
    val obj: Any = "Hello, Kotlin"
    
    val str: String? = obj as? String
    val num: Int? = obj as? Int
    
    println("String: $str")  // 输出: Hello, Kotlin
    println("Number: $num")  // 输出: null
}
```

### 非安全类型转换

使用 `as` 操作符进行非安全类型转换，如果转换失败，会抛出 `ClassCastException`。

```kotlin
fun main() {
    val obj: Any = "Hello, Kotlin"

    try {
        val str: String = obj as String
        println("String: $str")
        
        // 以下转换将失败并抛出 ClassCastException
        val num: Int = obj as Int
        println("Number: $num")
    } catch (e: ClassCastException) {
        println("ClassCastException: ${e.message}")
    }
}
```

### 数组类型转换

Kotlin 提供了一些标准函数用于数组的类型转换，例如 `toIntArray()`, `toTypedArray()` 等。

#### 示例

```kotlin
fun main() {
    val intList = listOf(1, 2, 3)
    val intArray: IntArray = intList.toIntArray()

    val strList = listOf("one", "two", "three")
    val strArray: Array<String> = strList.toTypedArray()

    println("Int Array: ${intArray.joinToString()}")
    println("String Array: ${strArray.joinToString()}")
}
```

### 强制类型转换

强制类型转换使用 `!!` 操作符将可空类型转换为非空类型，如果变量为 `null`，则抛出 `NullPointerException`。

#### 示例

```kotlin
fun main() {
    val str: String? = "Hello, Kotlin"

    try {
        val nonNullStr: String = str!!
        println("Non-null String: $nonNullStr")
        
        // 以下转换将失败并抛出 NullPointerException
        val nullStr: String? = null
        val forcedStr: String = nullStr!!
        println("Forced Non-null String: $forcedStr")
    } catch (e: NullPointerException) {
        println("NullPointerException: ${e.message}")
    }
}
```

### 类型擦除与泛型转换

在 Kotlin 中，由于类型擦除，泛型类型的运行时信息会丢失，因此不能直接转换泛型类型。可以使用 `reified` 关键字和内联函数来解决这个问题。

#### 示例

```kotlin
inline fun <reified T> convert(value: Any): T? {
    return value as? T
}

fun main() {
    val list: List<Any> = listOf("Kotlin", 42, 3.14)

    val stringValue: String? = convert<String>(list[0])
    val intValue: Int? = convert<Int>(list[1])
    val doubleValue: Double? = convert<Double>(list[2])
    val booleanValue: Boolean? = convert<Boolean>(list[0])

    println("String value: $stringValue")  // 输出: Kotlin
    println("Int value: $intValue")        // 输出: 42
    println("Double value: $doubleValue")  // 输出: 3.14
    println("Boolean value: $booleanValue") // 输出: null
}
```

## 运算符

### 算术运算符

| 运算符 | 描述         | 示例                  |
| ------ | ------------ | --------------------- |
| `+`    | 加法         | `val sum = 1 + 2`     |
| `-`    | 减法         | `val diff = 5 - 3`    |
| `*`    | 乘法         | `val prod = 2 * 3`    |
| `/`    | 除法         | `val quotient = 6 / 2`|
| `%`    | 取模（取余） | `val remainder = 7 % 3` |

### 赋值运算符

| 运算符  | 描述                   | 示例                       |
| ------- | ---------------------- | -------------------------- |
| `=`     | 赋值                   | `val a = 10`               |
| `+=`    | 加后赋值               | `var b = 5; b += 3`        |
| `-=`    | 减后赋值               | `var c = 5; c -= 2`        |
| `*=`    | 乘后赋值               | `var d = 3; d *= 2`        |
| `/=`    | 除后赋值               | `var e = 6; e /= 3`        |
| `%=`    | 取模后赋值             | `var f = 7; f %= 4`        |

### 比较运算符

| 运算符 | 描述         | 示例                  |
| ------ | ------------ | --------------------- |
| `==`   | 等于         | `val isEqual = (a == b)` |
| `!=`   | 不等于       | `val isNotEqual = (a != b)` |
| `>`    | 大于         | `val isGreater = (a > b)` |
| `<`    | 小于         | `val isLess = (a < b)` |
| `>=`   | 大于等于     | `val isGreaterOrEqual = (a >= b)` |
| `<=`   | 小于等于     | `val isLessOrEqual = (a <= b)` |

### 逻辑运算符

| 运算符 | 描述         | 示例                  |
| ------ | ------------ | --------------------- |
| `&&`   | 逻辑与       | `val and = (a > b && a < c)` |
| `\|\|`   | 逻辑或       | `val or = (a > b \|\| a < c)` |
| `!`    | 逻辑非       | `val not = !(a > b)`  |

### 一元运算符

| 运算符 | 描述         | 示例                  |
| ------ | ------------ | --------------------- |
| `+`    | 正号         | `val pos = +a`        |
| `-`    | 负号         | `val neg = -a`        |
| `++`   | 自增         | `var x = 5; x++`      |
| `--`   | 自减         | `var y = 5; y--`      |

### 位运算符

| 运算符   | 描述         | 示例                  |
| -------- | ------------ | --------------------- |
| `shl`    | 左移         | `val shiftedLeft = a shl 2`  |
| `shr`    | 右移         | `val shiftedRight = a shr 2` |
| `ushr`   | 无符号右移   | `val ushr = a ushr 2`        |
| `and`    | 位与         | `val bitwiseAnd = a and b`   |
| `or`     | 位或         | `val bitwiseOr = a or b`     |
| `xor`    | 位异或       | `val bitwiseXor = a xor b`   |
| `inv`    | 位非         | `val bitwiseInv = a.inv()`   |

### 示例代码

```kotlin
fun main() {
    // 算术运算
    val sum = 1 + 2
    val diff = 5 - 3
    val prod = 2 * 3
    val quotient = 6 / 2
    val remainder = 7 % 3

    println("Sum: $sum")
    println("Difference: $diff")
    println("Product: $prod")
    println("Quotient: $quotient")
    println("Remainder: $remainder")

    // 赋值运算
    var a = 10
    a += 5
    println("a += 5: $a")

    var b = 10
    b -= 3
    println("b -= 3: $b")

    var c = 10
    c *= 2
    println("c *= 2: $c")

    var d = 10
    d /= 2
    println("d /= 2: $d")

    var e = 10
    e %= 3
    println("e %= 3: $e")

    // 比较运算
    val x = 5
    val y = 10
    println("x == y: ${x == y}")
    println("x != y: ${x != y}")
    println("x > y: ${x > y}")
    println("x < y: ${x < y}")
    println("x >= y: ${x >= y}")
    println("x <= y: ${x <= y}")

    // 逻辑运算
    val condition1 = true
    val condition2 = false
    println("condition1 && condition2: ${condition1 && condition2}")
    println("condition1 || condition2: ${condition1 || condition2}")
    println("!condition1: ${!condition1}")

    // 一元运算
    var z = 5
    println("z++: ${z++}")
    println("++z: ${++z}")
    println("z--: ${z--}")
    println("--z: ${--z}")

    // 位运算
    val num1 = 1 // 0001
    val num2 = 3 // 0011
    println("num1 shl 2: ${num1 shl 2}") // 0100
    println("num2 shr 1: ${num2 shr 1}") // 0001
    println("num1 and num2: ${num1 and num2}") // 0001
    println("num1 or num2: ${num1 or num2}") // 0011
    println("num1 xor num2: ${num1 xor num2}") // 0010
    println("num1.inv(): ${num1.inv()}") // 1110
}
```

## 字符串格式化

在Kotlin中，有几种常见的字符串格式化方式，以下是每种方法的示例：

### 1. 使用字符串模板 (String Templates)
这是Kotlin中最常用和最简洁的字符串格式化方式。

```kotlin
val name = "Alice"
val age = 30
println("My name is $name and I am $age years old.")
```

### 2. 使用 `String.format()`
这种方法类似于Java中的 `String.format()`。

```kotlin
val name = "Alice"
val age = 30
println(String.format("My name is %s and I am %d years old.", name, age))
```

### 3. 使用 `"%...".format()`
这是Kotlin中的扩展函数 `format`，与 `String.format` 类似，但语法更简洁。

```kotlin
val name = "Alice"
val age = 30
println("My name is %s and I am %d years old.".format(name, age))
```

### 4. 使用 `buildString` 和 `append`
对于更复杂的字符串构建，可以使用 `buildString` 函数。

```kotlin
val name = "Alice"
val age = 30
val result = buildString {
    append("My name is ")
    append(name)
    append(" and I am ")
    append(age)
    append(" years old.")
}
println(result)
```

### 5. 使用字符串插值和表达式
Kotlin的字符串模板不仅支持简单的变量插值，还支持任意表达式。

```kotlin
val name = "Alice"
val age = 30
println("My name is $name and I am ${age + 5} years old in five years.")
```

## 控制流

### If 表达式
```kotlin
val max = if (a > b) a else b
```

### When 表达式
```kotlin
when (x) {
    1 -> println("x 是 1")
    2 -> println("x 是 2")
    else -> println("x 不是 1 也不是 2")
}
```

## 循环

### For 循环
```kotlin
for (i in 1..10) {
    println(i)
}
```

### While 循环
```kotlin
var x = 5
while (x > 0) {
    println(x)
    x--
}
```

## 函数

### 函数声明
```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

### 单表达式函数
```kotlin
fun multiply(a: Int, b: Int): Int = a * b
```

### 默认值函数
```kotlin
fun greet(name: String = "Guest", greeting: String = "Hello") {
    println("$greeting, $name!")
}
```

## 类和对象

### 类声明
```kotlin
class Person(val firstName: String, val lastName: String) {
    fun getFullName(): String {
        return "$firstName $lastName"
    }
}
```

### 创建对象
```kotlin
val person = Person("John", "Doe")
println(person.getFullName())
```

## 类的分类

### 普通类（Class）

这是最基本的类类型，用于定义对象的属性和行为。

```kotlin
class Person(val firstName: String, val lastName: String) {
    fun getFullName(): String {
        return "$firstName $lastName"
    }
}

val person = Person("John", "Doe")
println(person.getFullName())  // 输出: John Doe
```

### 数据类（Data Class）

数据类用于存储数据。Kotlin 自动为数据类生成 `equals()`、`hashCode()`、`toString()`、`copy()` 以及解构函数。

```kotlin
data class User(val name: String, val age: Int)

val user1 = User("Alice", 30)
val user2 = user1.copy(name = "Bob")

println(user1)  // 输出: User(name=Alice, age=30)
println(user2)  // 输出: User(name=Bob, age=30)
```

### 枚举类（Enum Class）

枚举类用于定义一组常量。

```kotlin
enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

val direction = Direction.NORTH
println(direction)  // 输出: NORTH
```

### 密封类（Sealed Class）

密封类用于表示受限的类层次结构，所有可能的子类都必须在同一个文件中声明。

```kotlin
sealed class Result

data class Success(val data: String) : Result()
data class Error(val error: String) : Result()

fun handleResult(result: Result) {
    when (result) {
        is Success -> println("Success: ${result.data}")
        is Error -> println("Error: ${result.error}")
    }
}
```

### 内部类（Inner Class）

内部类可以访问其外部类的成员。

```kotlin
class Outer {
    private val bar: Int = 1

    inner class Inner {
        fun foo() = bar
    }
}

val outer = Outer()
val inner = outer.Inner()
println(inner.foo())  // 输出: 1
```

### 嵌套类（Nested Class）

嵌套类与内部类类似，但不能访问其外部类的成员，除非加上 `inner` 关键字。

```kotlin
class Outer {
    private val bar: Int = 1

    class Nested {
        fun foo() = 2
    }
}

val nested = Outer.Nested()
println(nested.foo())  // 输出: 2
```

### 抽象类（Abstract Class）

抽象类不能被实例化，通常包含抽象方法，这些方法必须在子类中实现。

```kotlin
abstract class Animal {
    abstract fun makeSound()
}

class Dog : Animal() {
    override fun makeSound() {
        println("Bark")
    }
}

val dog = Dog()
dog.makeSound()  // 输出: Bark
```

### 接口（Interface）

接口定义一组方法和属性，这些方法和属性必须由实现类实现。

```kotlin
interface Drivable {
    fun drive()
}

class Car : Drivable {
    override fun drive() {
        println("Driving a car")
    }
}

val car = Car()
car.drive()  // 输出: Driving a car
```

### 伴生对象（Companion Object）

伴生对象用于在类中定义静态成员。

```kotlin
class MyClass {
    companion object {
        fun create(): MyClass = MyClass()
    }
}

val instance = MyClass.create()
```

## 继承

在 Kotlin 中，继承相关的限定符主要包括 `open`、`final`、`abstract`、`override` 和 `sealed`。这些限定符用于控制类和成员的继承行为和重写方式。下面是每个限定符的简要说明和示例。

### `open`

默认情况下，Kotlin 中的类和成员（方法、属性）都是不可继承和重写的。要允许继承和重写，必须使用 `open` 关键字。

#### `open` 类
```kotlin
open class Base {
    open fun greet() {
        println("Hello from Base")
    }
}

class Derived : Base() {
    override fun greet() {
        println("Hello from Derived")
    }
}

val derived = Derived()
derived.greet()  // 输出: Hello from Derived
```

### `final`

`final` 关键字用于阻止类和成员的继承或重写。所有类和成员默认都是 `final` 的，如果类或成员是 `open` 的，可以显式标记为 `final` 以防止进一步的继承或重写。

```kotlin
open class Base {
    open fun greet() {
        println("Hello from Base")
    }
}

class Derived : Base() {
    final override fun greet() {
        println("Hello from Derived")
    }
}

// 下面的代码会导致编译错误
// class SubDerived : Derived() {
//     override fun greet() {
//         println("Hello from SubDerived")
//     }
// }
```

### `abstract`

`abstract` 关键字用于定义抽象类和抽象成员。抽象类不能被实例化，抽象成员必须在子类中实现。

```kotlin
abstract class Animal {
    abstract fun makeSound()

    fun sleep() {
        println("Sleeping")
    }
}

class Dog : Animal() {
    override fun makeSound() {
        println("Bark")
    }
}

val dog = Dog()
dog.makeSound()  // 输出: Bark
dog.sleep()      // 输出: Sleeping
```

### `override`

`override` 关键字用于在子类中重写父类的 `open` 或 `abstract` 成员。重写的方法或属性必须具有与父类中定义的成员相同的签名。

```kotlin
open class Base {
    open fun greet() {
        println("Hello from Base")
    }
}

class Derived : Base() {
    override fun greet() {
        println("Hello from Derived")
    }
}

val derived = Derived()
derived.greet()  // 输出: Hello from Derived
```

### `sealed`

`sealed` 关键字用于定义密封类，密封类的所有子类必须在同一个文件中声明。这用于表示受限的类层次结构。

```kotlin
sealed class Result

data class Success(val data: String) : Result()
data class Error(val error: String) : Result()

fun handleResult(result: Result) {
    when (result) {
        is Success -> println("Success: ${result.data}")
        is Error -> println("Error: ${result.error}")
    }
}

val result: Result = Success("Data loaded")
handleResult(result)  // 输出: Success: Data loaded
```

### 示例代码

以下是包含所有这些继承限定符的示例代码：

```kotlin
// 使用 open 允许继承
open class Animal {
    open fun makeSound() {
        println("Animal sound")
    }
}

// 使用 final 阻止进一步继承
open class Dog : Animal() {
    final override fun makeSound() {
        println("Bark")
    }
}

// 使用 abstract 定义抽象类和成员
abstract class Bird {
    abstract fun fly()

    fun chirp() {
        println("Chirp")
    }
}

// 密封类示例
sealed class Response

data class Success(val message: String) : Response()
data class Failure(val error: String) : Response()

fun handleResponse(response: Response) {
    when (response) {
        is Success -> println("Success: ${response.message}")
        is Failure -> println("Error: ${response.error}")
    }
}

fun main() {
    val dog = Dog()
    dog.makeSound()  // 输出: Bark

    val success = Success("Operation completed")
    handleResponse(success)  // 输出: Success: Operation completed
}
```

## 运算符重载
在 Kotlin 中，运算符重载允许你为自定义类定义特定的运算符行为。你可以通过实现特定的方法并使用 `operator` 关键字来实现运算符重载。下面是一些常见运算符及其对应的重载方法的示例。

### 加法运算符 (`+`)

实现加法运算符可以使用 `plus` 方法。

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point {
        return Point(x + other.x, y + other.y)
    }
}

fun main() {
    val point1 = Point(1, 2)
    val point2 = Point(3, 4)
    val result = point1 + point2
    println(result)  // 输出: Point(x=4, y=6)
}
```

### 减法运算符 (`-`)

实现减法运算符可以使用 `minus` 方法。

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun minus(other: Point): Point {
        return Point(x - other.x, y - other.y)
    }
}

fun main() {
    val point1 = Point(5, 6)
    val point2 = Point(3, 4)
    val result = point1 - point2
    println(result)  // 输出: Point(x=2, y=2)
}
```

### 乘法运算符 (`*`)

实现乘法运算符可以使用 `times` 方法。

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun times(scale: Int): Point {
        return Point(x * scale, y * scale)
    }
}

fun main() {
    val point = Point(2, 3)
    val result = point * 2
    println(result)  // 输出: Point(x=4, y=6)
}
```

### 除法运算符 (`/`)

实现除法运算符可以使用 `div` 方法。

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun div(scale: Int): Point {
        return Point(x / scale, y / scale)
    }
}

fun main() {
    val point = Point(6, 8)
    val result = point / 2
    println(result)  // 输出: Point(x=3, y=4)
}
```

### 取模运算符 (`%`)

实现取模运算符可以使用 `rem` 方法。

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun rem(scale: Int): Point {
        return Point(x % scale, y % scale)
    }
}

fun main() {
    val point = Point(5, 8)
    val result = point % 3
    println(result)  // 输出: Point(x=2, y=2)
}
```

### 相等运算符 (`==`)

实现相等运算符可以重写 `equals` 方法并且应该同时重写 `hashCode` 方法。

```kotlin
data class Point(val x: Int, val y: Int)

fun main() {
    val point1 = Point(1, 2)
    val point2 = Point(1, 2)
    val point3 = Point(3, 4)
    
    println(point1 == point2)  // 输出: true
    println(point1 == point3)  // 输出: false
}
```

### 比较运算符 (`<`, `>`, `<=`, `>=`)

实现比较运算符可以使用 `compareTo` 方法。

```kotlin
data class Point(val x: Int, val y: Int) : Comparable<Point> {
    override fun compareTo(other: Point): Int {
        return (x + y) - (other.x + other.y)
    }
}

fun main() {
    val point1 = Point(1, 2)
    val point2 = Point(3, 4)
    
    println(point1 < point2)  // 输出: true
    println(point1 > point2)  // 输出: false
}
```

### 索引访问运算符 (`[]`)

实现索引访问运算符可以使用 `get` 和 `set` 方法。

```kotlin
class Matrix(val rows: Int, val cols: Int) {
    private val data = Array(rows) { IntArray(cols) }

    operator fun get(row: Int, col: Int): Int {
        return data[row][col]
    }

    operator fun set(row: Int, col: Int, value: Int) {
        data[row][col] = value
    }
}

fun main() {
    val matrix = Matrix(3, 3)
    matrix[0, 0] = 1
    println(matrix[0, 0])  // 输出: 1
}
```

### 调用运算符 (`()`)

实现调用运算符可以使用 `invoke` 方法。

```kotlin
class Greeter(val greeting: String) {
    operator fun invoke(name: String) {
        println("$greeting, $name!")
    }
}

fun main() {
    val greeter = Greeter("Hello")
    greeter("Kotlin")  // 输出: Hello, Kotlin!
}
```

### 自增和自减运算符 (`++`, `--`)

实现自增和自减运算符可以使用 `inc` 和 `dec` 方法。

```kotlin
data class Counter(var value: Int) {
    operator fun inc(): Counter {
        value++
        return this
    }

    operator fun dec(): Counter {
        value--
        return this
    }
}

fun main() {
    var counter = Counter(0)
    counter++
    println(counter.value)  // 输出: 1
    counter--
    println(counter.value)  // 输出: 0
}
```

### 一元运算符 (`+`, `-`, `!`)

实现一元运算符可以使用 `unaryPlus`, `unaryMinus`, `not` 方法。

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun unaryPlus(): Point {
        return this
    }

    operator fun unaryMinus(): Point {
        return Point(-x, -y)
    }

    operator fun not(): Boolean {
        return x == 0 && y == 0
    }
}

fun main() {
    val point = Point(1, -1)
    println(+point)  // 输出: Point(x=1, y=-1)
    println(-point)  // 输出: Point(x=-1, y=1)
    println(!point)  // 输出: false
}
```

## 空安全
Kotlin 提供空安全特性，以帮助避免空指针异常。

#### 可空类型
```kotlin
var nullableString: String? = "Hello"
nullableString = null  // 这是允许的
```

#### 安全调用
```kotlin
val length = nullableString?.length  // 如果不为空返回长度，否则返回 null
```

#### Elvis 操作符
```kotlin
val length = nullableString?.length ?: 0  // 如果不为空返回长度，否则返回 0
```

## 集合

### List
```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
numbers.forEach { println(it) }
```

### Mutable List
```kotlin
val mutableNumbers = mutableListOf(1, 2, 3)
mutableNumbers.add(4)
```

### Map
```kotlin
val map = mapOf("key1" to "value1", "key2" to "value2")
println(map["key1"])
```

## 扩展函数

Kotlin 中的扩展函数是一种允许在不修改现有类的情况下向其添加新功能的机制。通过扩展函数，可以为任何现有类添加方法，从而提高代码的可读性和可维护性。以下是 Kotlin 扩展函数的详细说明和示例。

### 扩展函数的定义

扩展函数是通过接收者类型和函数定义来实现的。接收者类型是你希望扩展的类。

#### 定义扩展函数

以下示例向 `String` 类添加一个 `addExclamation` 函数，该函数返回原字符串并在末尾添加一个感叹号。

```kotlin
fun String.addExclamation(): String {
    return this + "!"
}

val text = "Hello"
println(text.addExclamation())  // 输出: Hello!
```

### 使用扩展函数

扩展函数的调用与普通成员函数的调用方式相同。

```kotlin
fun main() {
    val message = "Kotlin is fun"
    println(message.addExclamation())  // 输出: Kotlin is fun!
}
```

### 扩展属性

除了扩展函数，Kotlin 还支持扩展属性。这允许你为现有类添加新的属性。不过，扩展属性并不实际存储值，它们只是提供了更方便的访问器。

```kotlin
val String.wordCount: Int
    get() = this.split(" ").size

val text = "Kotlin is amazing"
println("Word count: ${text.wordCount}")  // 输出: Word count: 3
```

### 扩展泛型类

你还可以为泛型类定义扩展函数。例如，为 `List<T>` 定义一个扩展函数来查找列表中最大元素的索引。

```kotlin
fun <T> List<T>.maxElementIndex(): Int? where T : Comparable<T> {
    if (this.isEmpty()) return null
    var maxIndex = 0
    for (i in indices) {
        if (this[i] > this[maxIndex]) maxIndex = i
    }
    return maxIndex
}

val numbers = listOf(1, 2, 3, 2, 1)
println("Index of max element: ${numbers.maxElementIndex()}")  // 输出: Index of max element: 2
```

### 作用域函数

Kotlin 提供了五个常用的作用域函数：`let`、`run`、`with`、`apply` 和 `also`。这些函数可以用于简化对象的初始化和操作。

#### `let`

`let` 函数允许你在一个作用域内执行一个代码块，并返回代码块的结果。

```kotlin
val name = "Kotlin"
name.let {
    println("The length of the name is ${it.length}")
}
```

#### `run`

`run` 函数结合了 `let` 和 `with` 的功能，可以在一个对象的作用域内执行代码，并返回代码块的结果。

```kotlin
val result = "Kotlin".run {
    length
}
println("Length: $result")  // 输出: Length: 6
```

#### `with`

`with` 函数用于在对象的作用域内执行代码，而不需要返回结果。

```kotlin
val name = "Kotlin"
with(name) {
    println("Length: $length")
}
```

#### `apply`

`apply` 函数用于在对象的作用域内执行代码，并返回对象本身。通常用于对象的初始化。

```kotlin
val person = Person().apply {
    firstName = "John"
    lastName = "Doe"
}
println("Name: ${person.firstName} ${person.lastName}")
```

#### `also`

`also` 函数用于在对象的作用域内执行代码，并返回对象本身。通常用于进行额外的操作，而不改变对象的状态。

```kotlin
val name = "Kotlin"
name.also {
    println("The name is $it")
}
```

### 示例代码

完整的示例代码如下：

```kotlin
fun String.addExclamation(): String {
    return this + "!"
}

val String.wordCount: Int
    get() = this.split(" ").size

fun <T> List<T>.maxElementIndex(): Int? where T : Comparable<T> {
    if (this.isEmpty()) return null
    var maxIndex = 0
    for (i in indices) {
        if (this[i] > this[maxIndex]) maxIndex = i
    }
    return maxIndex
}

fun main() {
    val message = "Kotlin is fun"
    println(message.addExclamation())  // 输出: Kotlin is fun!
    
    val text = "Kotlin is amazing"
    println("Word count: ${text.wordCount}")  // 输出: Word count: 3
    
    val numbers = listOf(1, 2, 3, 2, 1)
    println("Index of max element: ${numbers.maxElementIndex()}")  // 输出: Index of max element: 2
    
    // 使用 let
    val name = "Kotlin"
    name.let {
        println("The length of the name is ${it.length}")
    }
    
    // 使用 run
    val result = "Kotlin".run {
        length
    }
    println("Length: $result")  // 输出: Length: 6
    
    // 使用 with
    with(name) {
        println("Length: $length")
    }
    
    // 使用 apply
    val person = Person().apply {
        firstName = "John"
        lastName = "Doe"
    }
    println("Name: ${person.firstName} ${person.lastName}")
    
    // 使用 also
    name.also {
        println("The name is $it")
    }
}

class Person {
    var firstName: String = ""
    var lastName: String = ""
}
```

## 反射

在 Kotlin 中，反射（Reflection）是指在运行时访问或修改程序结构的能力，比如类、对象、方法和属性。Kotlin 的反射功能基于 Java 的反射机制，但提供了更简洁和类型安全的 API。

### 导入反射库

首先，确保你在项目中导入了 Kotlin 的反射库。如果你使用的是 Gradle，你可以在 `build.gradle` 文件中添加以下依赖：

```groovy
implementation "org.jetbrains.kotlin:kotlin-reflect"
```

### 获取类引用

你可以使用 `::class` 获取类的引用，并使用 `.java` 获取 Java 类的引用。

```kotlin
val kClass = String::class  // Kotlin 类引用
val jClass = String::class.java  // Java 类引用

println("Kotlin class: $kClass")
println("Java class: $jClass")
```

### 创建类实例

你可以使用反射创建类的实例。首先，你需要获取类的构造函数，然后调用它来创建实例。

```kotlin
import kotlin.reflect.full.createInstance

class Example(val message: String) {
    fun greet() = println(message)
}

fun main() {
    val exampleClass = Example::class
    val instance = exampleClass.createInstance()
    instance.greet()  // 输出: Hello, World!
}
```

注意，`createInstance()` 只能用于没有参数的构造函数。对于带参数的构造函数，你需要使用 `primaryConstructor` 或 `constructors`。

```kotlin
import kotlin.reflect.full.primaryConstructor

class Example(val message: String)

fun main() {
    val exampleClass = Example::class
    val constructor = exampleClass.primaryConstructor
    val instance = constructor?.call("Hello, Kotlin!")
    println(instance?.message)  // 输出: Hello, Kotlin!
}
```

### 访问和修改属性

你可以使用反射访问和修改对象的属性。

```kotlin
import kotlin.reflect.full.memberProperties
import kotlin.reflect.jvm.isAccessible

class Person(var name: String, var age: Int)

fun main() {
    val person = Person("John", 30)

    // 获取属性引用
    val kClass = person::class
    val nameProperty = kClass.memberProperties.find { it.name == "name" }
    nameProperty?.isAccessible = true

    // 获取属性值
    val nameValue = nameProperty?.get(person)
    println("Name: $nameValue")  // 输出: Name: John

    // 修改属性值
    if (nameProperty is KMutableProperty<*>) {
        nameProperty.setter.call(person, "Doe")
    }
    println("Updated Name: ${person.name}")  // 输出: Updated Name: Doe
}
```

### 调用方法

你可以使用反射调用对象的方法。

```kotlin
import kotlin.reflect.full.declaredFunctions

class Example {
    fun greet() = println("Hello, Kotlin!")
}

fun main() {
    val example = Example()

    // 获取方法引用
    val kClass = example::class
    val greetFunction = kClass.declaredFunctions.find { it.name == "greet" }
    greetFunction?.call(example)  // 输出: Hello, Kotlin!
}
```

### 获取私有属性

```kotlin
import kotlin.reflect.full.memberProperties
import kotlin.reflect.jvm.isAccessible

class Person(private val name: String, private var age: Int)

fun main() {
    val person = Person("John", 30)

    // 获取类引用
    val kClass = person::class

    // 获取私有属性
    val nameProperty = kClass.memberProperties.find { it.name == "name" }
    val ageProperty = kClass.memberProperties.find { it.name == "age" }

    // 设置可访问性
    nameProperty?.isAccessible = true
    ageProperty?.isAccessible = true

    // 获取属性值
    val nameValue = nameProperty?.get(person)
    val ageValue = ageProperty?.get(person)

    println("Name: $nameValue")  // 输出: Name: John
    println("Age: $ageValue")    // 输出: Age: 30

    // 修改属性值
    if (ageProperty is KMutableProperty<*>) {
        ageProperty.setter.call(person, 35)
    }

    // 获取修改后的属性值
    val updatedAgeValue = ageProperty?.get(person)
    println("Updated Age: $updatedAgeValue")  // 输出: Updated Age: 35
}
```

### 获取私有方法

```kotlin
import kotlin.reflect.full.declaredFunctions
import kotlin.reflect.jvm.isAccessible

class Person(private val name: String, private var age: Int) {
    private fun greet() {
        println("Hello, my name is $name and I am $age years old.")
    }
}

fun main() {
    val person = Person("John", 30)

    // 获取类引用
    val kClass = person::class

    // 获取私有方法
    val greetFunction = kClass.declaredFunctions.find { it.name == "greet" }

    // 设置可访问性
    greetFunction?.isAccessible = true

    // 调用私有方法
    greetFunction?.call(person)  // 输出: Hello, my name is John and I am 30 years old.
}
```

### 反射示例总结

以下是一个综合示例，展示了如何使用 Kotlin 的反射功能来创建实例、访问和修改属性以及调用方法。

```kotlin
import kotlin.reflect.full.createInstance
import kotlin.reflect.full.declaredFunctions
import kotlin.reflect.full.memberProperties
import kotlin.reflect.full.primaryConstructor
import kotlin.reflect.jvm.isAccessible

class Example(var message: String) {
    fun greet() = println(message)
}

fun main() {
    // 获取类引用
    val exampleClass = Example::class

    // 创建类实例
    val constructor = exampleClass.primaryConstructor
    val instance = constructor?.call("Hello, Kotlin!")
    
    // 获取并调用方法
    val greetFunction = exampleClass.declaredFunctions.find { it.name == "greet" }
    greetFunction?.call(instance)  // 输出: Hello, Kotlin!
    
    // 获取并修改属性
    val messageProperty = exampleClass.memberProperties.find { it.name == "message" }
    messageProperty?.isAccessible = true
    
    // 获取属性值
    val messageValue = messageProperty?.get(instance)
    println("Message: $messageValue")  // 输出: Message: Hello, Kotlin!
    
    // 修改属性值
    if (messageProperty is KMutableProperty<*>) {
        messageProperty.setter.call(instance, "Hello, Reflection!")
    }
    println("Updated Message: ${instance?.message}")  // 输出: Updated Message: Hello, Reflection!
}
```

## 异常处理

在 Kotlin 中，异常处理主要依赖于异常机制。你可以使用 `try-catch-finally` 语句来捕获和处理异常，确保程序在遇到错误时能够优雅地处理并继续执行。以下是 Kotlin 中异常处理的详细说明和示例。

### try-catch 语句

`try-catch` 语句用于捕获和处理异常。可以在 `try` 块中编写可能抛出异常的代码，在 `catch` 块中处理这些异常。

#### 基本用法

```kotlin
fun main() {
    try {
        val result = 10 / 0  // 可能抛出异常的代码
        println("Result: $result")
    } catch (e: ArithmeticException) {
        println("Caught an exception: ${e.message}")
    }
}
```

在这个示例中，除以零会抛出 `ArithmeticException`，然后在 `catch` 块中捕获并处理该异常。

### finally 块

`finally` 块中的代码无论是否发生异常都会执行。通常用于释放资源或执行清理操作。

```kotlin
fun main() {
    try {
        val result = 10 / 0  // 可能抛出异常的代码
        println("Result: $result")
    } catch (e: ArithmeticException) {
        println("Caught an exception: ${e.message}")
    } finally {
        println("This block is always executed.")
    }
}
```

### 多个 catch 块

你可以使用多个 `catch` 块来捕获不同类型的异常。每个 `catch` 块用于处理特定类型的异常。

```kotlin
fun main() {
    try {
        val array = arrayOf(1, 2, 3)
        println(array[5])  // 可能抛出异常的代码
    } catch (e: ArrayIndexOutOfBoundsException) {
        println("Array index out of bounds: ${e.message}")
    } catch (e: Exception) {
        println("Caught an exception: ${e.message}")
    } finally {
        println("This block is always executed.")
    }
}
```

### 自定义异常

你可以定义自己的异常类来表示特定的错误情况。自定义异常类需要继承自 `Exception` 或其子类。

```kotlin
class CustomException(message: String) : Exception(message)

fun main() {
    try {
        throw CustomException("This is a custom exception")
    } catch (e: CustomException) {
        println("Caught a custom exception: ${e.message}")
    }
}
```

### 抛出异常

你可以使用 `throw` 关键字显式抛出异常。

```kotlin
fun validateAge(age: Int) {
    if (age < 18) {
        throw IllegalArgumentException("Age must be at least 18")
    }
}

fun main() {
    try {
        validateAge(15)
    } catch (e: IllegalArgumentException) {
        println("Caught an exception: ${e.message}")
    }
}
```

### 重新抛出异常

在某些情况下，你可能需要在捕获异常后重新抛出它。可以在 `catch` 块中使用 `throw` 关键字重新抛出捕获的异常。

```kotlin
fun main() {
    try {
        try {
            val result = 10 / 0  // 可能抛出异常的代码
        } catch (e: ArithmeticException) {
            println("Caught an exception: ${e.message}")
            throw e  // 重新抛出异常
        }
    } catch (e: Exception) {
        println("Caught rethrown exception: ${e.message}")
    }
}
```

### 示例代码总结

以下是一个综合示例，展示了 Kotlin 中的异常处理，包括 `try-catch-finally` 语句、自定义异常以及重新抛出异常。

```kotlin
class CustomException(message: String) : Exception(message)

fun validateInput(input: String) {
    if (input.isEmpty()) {
        throw CustomException("Input cannot be empty")
    }
}

fun main() {
    try {
        validateInput("")  // 可能抛出自定义异常
    } catch (e: CustomException) {
        println("Caught a custom exception: ${e.message}")
    } catch (e: Exception) {
        println("Caught an exception: ${e.message}")
    } finally {
        println("This block is always executed.")
    }

    try {
        val result = 10 / 0  // 可能抛出异常的代码
        println("Result: $result")
    } catch (e: ArithmeticException) {
        println("Caught an exception: ${e.message}")
    } finally {
        println("This block is always executed.")
    }

    try {
        try {
            val array = arrayOf(1, 2, 3)
            println(array[5])  // 可能抛出异常的代码
        } catch (e: ArrayIndexOutOfBoundsException) {
            println("Array index out of bounds: ${e.message}")
            throw e  // 重新抛出异常
        }
    } catch (e: Exception) {
        println("Caught rethrown exception: ${e.message}")
    }
}
```
