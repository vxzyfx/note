---
title: 库函数
---

Kotlin标准库包含了大量的库函数，这些函数覆盖了常见的编程需求，帮助开发者编写简洁高效的代码。以下是一些常用的Kotlin库函数分类及其示例：

### 集合操作

- **map**：对集合中的每个元素应用给定的函数。
- **filter**：过滤集合，返回包含所有满足条件的元素的集合。
- **forEach**：对集合中的每个元素执行给定的操作。
- **reduce**：将集合中的所有元素结合起来，使用给定的函数。
- **groupBy**：将集合分组，返回一个映射。

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val squares = numbers.map { it * it }
val evenNumbers = numbers.filter { it % 2 == 0 }
numbers.forEach { println(it) }
val sum = numbers.reduce { acc, i -> acc + i }
val groupedByParity = numbers.groupBy { it % 2 == 0 }
```

### 字符串操作

- **substring**：提取字符串的子字符串。
- **split**：根据给定的分隔符分割字符串。
- **replace**：替换字符串中的字符或子字符串。
- **trim**：移除字符串两端的空白字符。

```kotlin
val str = "Hello, World!"
val subStr = str.substring(0, 5)
val parts = str.split(", ")
val replacedStr = str.replace("World", "Kotlin")
val trimmedStr = "   Hello   ".trim()
```

### 数学函数

- **max**：返回两个值中的最大值。
- **min**：返回两个值中的最小值。
- **abs**：返回给定值的绝对值。
- **sqrt**：计算平方根。

```kotlin
val maxVal = max(10, 20)
val minVal = min(10, 20)
val absoluteValue = abs(-10)
val squareRoot = sqrt(16.0)
```

### 文件操作

- **readText**：读取文件的全部内容。
- **writeText**：将文本写入文件。
- **listFiles**：列出目录中的所有文件。

```kotlin
import java.io.File

val file = File("example.txt")
val content = file.readText()
file.writeText("Hello, Kotlin!")
val files = File(".").listFiles()
```

### 日期和时间

- **LocalDate**：表示日期（年、月、日）。
- **LocalTime**：表示时间（时、分、秒）。
- **LocalDateTime**：表示日期和时间。
- **Duration**：表示时间段。

```kotlin
import java.time.LocalDate
import java.time.LocalTime
import java.time.LocalDateTime
import java.time.Duration

val date = LocalDate.now()
val time = LocalTime.now()
val dateTime = LocalDateTime.now()
val duration = Duration.ofHours(5)
```

### 异常处理

- **runCatching**：捕获可能抛出的异常。
- **getOrElse**：获取值或默认值（如果异常发生）。
- **getOrThrow**：获取值或抛出异常。

```kotlin
val result = runCatching { "123".toInt() }
val valueOrDefault = result.getOrElse { 0 }
val valueOrThrow = result.getOrThrow()
```

### 扩展函数

- **let**：对一个对象执行代码块，并返回其结果。
- **apply**：对一个对象执行代码块，并返回对象本身。
- **also**：对一个对象执行代码块，并返回对象本身。
- **run**：对一个对象执行代码块，并返回其结果。

```kotlin
val str = "Hello"
val length = str.let { it.length }
val result = str.apply { println(this) }
val result2 = str.also { println(it) }
val upperCaseStr = str.run { toUpperCase() }
```
