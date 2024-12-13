---
title: Java基础
---

Java 是一种广泛使用的编程语言，具有简单、面向对象、安全、可移植、高性能等特点。以下是 Java 的一些基础语法介绍：

## 基本结构

Java 程序的基本结构包括类（class）和方法（method）。每个 Java 程序至少有一个类和一个 `main` 方法，这是程序的入口点。

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## 数据类型

Java 有两种数据类型：原始数据类型（Primitive Data Types）和引用数据类型（Reference Data Types）。


### 原始数据类型（Primitive Data Types）

| 数据类型 | 大小    | 默认值  | 范围                                                         |
|----------|---------|---------|-------------------------------------------------------------|
| `byte`   | 8-bit   | 0       | -128 到 127                                                  |
| `short`  | 16-bit  | 0       | -32,768 到 32,767                                            |
| `int`    | 32-bit  | 0       | -2^31 到 2^31-1                                               |
| `long`   | 64-bit  | 0L      | -2^63 到 2^63-1                                               |
| `float`  | 32-bit  | 0.0f    | IEEE 754 标准浮点数                                           |
| `double` | 64-bit  | 0.0d    | IEEE 754 标准浮点数                                           |
| `char`   | 16-bit  | '\u0000'| 0 到 65,535（字符类型用 Unicode 编码表示）                  |
| `boolean`| 1-bit   | false   | 只有两个取值：`true` 和 `false`                              |

### 引用数据类型（Reference Data Types）

引用数据类型的大小不固定，取决于具体实现和系统架构。常见的引用数据类型包括类、接口和数组。

| 数据类型 | 描述                                                   |
|----------|--------------------------------------------------------|
| `String` | 字符串类型，用于存储文本                                |
| `Array`  | 数组类型，用于存储相同类型的数据                        |
| `Class`  | 类类型，用于创建对象                                    |
| `Interface` | 接口类型，用于定义类的行为规范                       |

### 示例代码

```java
public class DataTypeDemo {
    public static void main(String[] args) {
        // 原始数据类型
        byte b = 100;
        short s = 1000;
        int i = 10000;
        long l = 100000L;
        float f = 10.5f;
        double d = 10.5;
        char c = 'A';
        boolean bool = true;

        // 引用数据类型
        String str = "Hello, Java!";
        int[] arr = {1, 2, 3, 4, 5};
        
        // 输出数据
        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + bool);
        System.out.println("String: " + str);
        System.out.println("Array: " + java.util.Arrays.toString(arr));
    }
}
```

## 类型转换

在 Java 中，类型转换（Type Casting）是将一种数据类型转换为另一种数据类型的过程。类型转换分为两种：自动类型转换（implicit conversion，也称为 widening conversion）和强制类型转换（explicit conversion，也称为 narrowing conversion）。

### 1. 自动类型转换

自动类型转换是指将一个较小的数据类型转换为较大的数据类型，这种转换是安全的，不会丢失数据。Java 会自动完成这种类型转换。

#### 示例

```java
public class AutomaticTypeCasting {
    public static void main(String[] args) {
        int intValue = 42;
        long longValue = intValue; // int 自动转换为 long
        double doubleValue = longValue; // long 自动转换为 double

        System.out.println("Int value: " + intValue);
        System.out.println("Long value: " + longValue);
        System.out.println("Double value: " + doubleValue);
    }
}
```

#### 自动类型转换规则

1. `byte` → `short` → `int` → `long` → `float` → `double`
2. `char` → `int` → `long` → `float` → `double`

### 2. 强制类型转换

强制类型转换是指将一个较大的数据类型转换为较小的数据类型，这种转换可能会导致数据丢失。需要使用显式的类型转换操作符（即在需要转换的值前加上目标类型的括号）。

#### 示例

```java
public class ExplicitTypeCasting {
    public static void main(String[] args) {
        double doubleValue = 42.56;
        long longValue = (long) doubleValue; // double 强制转换为 long
        int intValue = (int) longValue; // long 强制转换为 int

        System.out.println("Double value: " + doubleValue);
        System.out.println("Long value (after casting): " + longValue);
        System.out.println("Int value (after casting): " + intValue);
    }
}
```

### 3. 类型转换中的注意事项

- **数据丢失**：强制类型转换时，可能会发生数据丢失。例如，将 `double` 转换为 `int` 会丢失小数部分。
- **类型不兼容**：某些类型之间的转换是不兼容的，例如不能将 `boolean` 类型转换为任何其他基本数据类型。

### 4. 对象类型转换

在 Java 中，对象类型转换主要用于父类与子类之间的转换，分为向上转型（upcasting）和向下转型（downcasting）。

#### 向上转型（Upcasting）

向上转型是指将子类对象转换为父类类型。向上转型是安全的，自动进行。

```java
class Animal {
    void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}

public class UpcastingExample {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Animal animal = dog; // 向上转型，自动进行

        animal.makeSound();
        // animal.bark(); // 编译错误，父类不能调用子类特有的方法
    }
}
```

#### 向下转型（Downcasting）

向下转型是指将父类引用转换为子类类型。向下转型需要显式进行，并且在运行时可能会导致 `ClassCastException`，因此需要使用 `instanceof` 进行类型检查。

```java
public class DowncastingExample {
    public static void main(String[] args) {
        Animal animal = new Dog(); // 向上转型，自动进行

        if (animal instanceof Dog) {
            Dog dog = (Dog) animal; // 向下转型，需要显式进行
            dog.bark();
        }
    }
}
```

### 5. 字符串与基本数据类型之间的转换

Java 提供了多种方法将字符串转换为基本数据类型，反之亦然。

#### 字符串转换为基本数据类型

可以使用包装类的静态方法实现，如 `Integer.parseInt()`、`Double.parseDouble()` 等。

```java
public class StringToPrimitive {
    public static void main(String[] args) {
        String intStr = "123";
        String doubleStr = "45.67";

        int intValue = Integer.parseInt(intStr);
        double doubleValue = Double.parseDouble(doubleStr);

        System.out.println("Integer value: " + intValue);
        System.out.println("Double value: " + doubleValue);
    }
}
```

#### 基本数据类型转换为字符串

可以使用 `String.valueOf()` 方法或使用字符串连接运算符。

```java
public class PrimitiveToString {
    public static void main(String[] args) {
        int intValue = 123;
        double doubleValue = 45.67;

        String intStr = String.valueOf(intValue);
        String doubleStr = String.valueOf(doubleValue);

        System.out.println("Integer string: " + intStr);
        System.out.println("Double string: " + doubleStr);

        // 使用字符串连接运算符
        String intStr2 = intValue + "";
        String doubleStr2 = doubleValue + "";

        System.out.println("Integer string (using +): " + intStr2);
        System.out.println("Double string (using +): " + doubleStr2);
    }
}
```

### 6. 包装类类型转换

Java 提供了对应于每种基本数据类型的包装类，如 `Integer`、`Double` 等。包装类提供了丰富的方法进行类型转换和操作。

#### 基本类型与包装类之间的转换

自动装箱和拆箱是 Java 提供的简化基本类型与包装类之间转换的机制。

```java
public class BoxingUnboxing {
    public static void main(String[] args) {
        // 自动装箱
        Integer intObject = 123; // 等价于 Integer.valueOf(123)
        
        // 自动拆箱
        int intValue = intObject; // 等价于 intObject.intValue()

        System.out.println("Integer object: " + intObject);
        System.out.println("Primitive int value: " + intValue);
    }
}
```

## 字符串格式化

在Java中，字符串格式化可以通过多种方式实现，以下是几种常见的方法：

### 1. 使用 `String.format()`
这是Java中最常用的字符串格式化方法，类似于C语言中的 `printf`。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 30;
        String formattedString = String.format("My name is %s and I am %d years old.", name, age);
        System.out.println(formattedString);
    }
}
```

### 2. 使用 `System.out.printf()`
这种方法适用于直接输出格式化的字符串。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 30;
        System.out.printf("My name is %s and I am %d years old.%n", name, age);
    }
}
```

### 3. 使用 `MessageFormat`
`MessageFormat` 类提供了另一种格式化字符串的方法，尤其适用于本地化消息。

```java
import java.text.MessageFormat;

public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 30;
        String pattern = "My name is {0} and I am {1} years old.";
        String formattedString = MessageFormat.format(pattern, name, age);
        System.out.println(formattedString);
    }
}
```

### 4. 使用 `StringBuilder` 或 `StringBuffer`
对于更复杂的字符串构建，可以使用 `StringBuilder` 或 `StringBuffer`。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 30;
        StringBuilder sb = new StringBuilder();
        sb.append("My name is ").append(name).append(" and I am ").append(age).append(" years old.");
        System.out.println(sb.toString());
    }
}
```

### 5. 使用 `+` 运算符进行字符串拼接
对于简单的字符串拼接，可以直接使用 `+` 运算符，但这种方式在性能上不如 `StringBuilder`。

```java
public class Main {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 30;
        String formattedString = "My name is " + name + " and I am " + age + " years old.";
        System.out.println(formattedString);
    }
}
```

## 变量

变量是内存中的存储位置，用于存储数据。变量必须先声明后使用。

```java
int age = 25;
String name = "John";
MyClass obj = new MyClass();
final int MAX_AGE = 100;  // 使用 final 关键字声明常量，常量的值在初始化后不可改变：
```

## 操作符

以下是 Java 中常见的操作符表格，涵盖了算术操作符、关系操作符、逻辑操作符、位操作符、赋值操作符和其他操作符：

### 算术操作符（Arithmetic Operators）

| 操作符 | 描述      | 示例      | 结果          |
|--------|-----------|-----------|---------------|
| `+`    | 加法      | `a + b`   | `a` 加 `b`    |
| `-`    | 减法      | `a - b`   | `a` 减 `b`    |
| `*`    | 乘法      | `a * b`   | `a` 乘 `b`    |
| `/`    | 除法      | `a / b`   | `a` 除以 `b`  |
| `%`    | 取模      | `a % b`   | `a` 除以 `b` 的余数|

### 关系操作符（Relational Operators）

| 操作符 | 描述      | 示例      | 结果          |
|--------|-----------|-----------|---------------|
| `==`   | 等于      | `a == b`  | 如果 `a` 等于 `b`，则为 `true` 否则为 `false` |
| `!=`   | 不等于    | `a != b`  | 如果 `a` 不等于 `b`，则为 `true` 否则为 `false` |
| `>`    | 大于      | `a > b`   | 如果 `a` 大于 `b`，则为 `true` 否则为 `false` |
| `<`    | 小于      | `a < b`   | 如果 `a` 小于 `b`，则为 `true` 否则为 `false` |
| `>=`   | 大于等于  | `a >= b`  | 如果 `a` 大于等于 `b`，则为 `true` 否则为 `false` |
| `<=`   | 小于等于  | `a <= b`  | 如果 `a` 小于等于 `b`，则为 `true` 否则为 `false` |

### 逻辑操作符（Logical Operators）

| 操作符 | 描述      | 示例      | 结果          |
|--------|-----------|-----------|---------------|
| `&&`   | 逻辑与    | `a && b`  | 如果 `a` 和 `b` 都为 `true`，则为 `true` |
| `\|\|`   | 逻辑或    | `a \|\| b`  | 如果 `a` 或 `b` 有一个为 `true`，则为 `true` |
| `!`    | 逻辑非    | `!a`      | 如果 `a` 为 `true`，则为 `false` 反之亦然 |

### 位操作符（Bitwise Operators）

| 操作符 | 描述      | 示例      | 结果          |
|--------|-----------|-----------|---------------|
| `&`    | 位与      | `a & b`   | 按位与        |
| `\|`    | 位或      | `a \| b`  | 按位或        |
| `^`    | 位异或    | `a ^ b`   | 按位异或      |
| `~`    | 位非      | `~a`      | 按位取反      |
| `<<`   | 左移      | `a << 2`  | 左移两位      |
| `>>`   | 右移      | `a >> 2`  | 右移两位      |
| `>>>`  | 无符号右移| `a >>> 2` | 无符号右移两位|

### 赋值操作符（Assignment Operators）

| 操作符 | 描述      | 示例      | 结果          |
|--------|-----------|-----------|---------------|
| `=`    | 赋值      | `a = b`   | 将 `b` 的值赋给 `a` |
| `+=`   | 加后赋值  | `a += b`  | `a = a + b`   |
| `-=`   | 减后赋值  | `a -= b`  | `a = a - b`   |
| `*=`   | 乘后赋值  | `a *= b`  | `a = a * b`   |
| `/=`   | 除后赋值  | `a /= b`  | `a = a / b`   |
| `%=`   | 取模后赋值| `a %= b`  | `a = a % b`   |
| `&=`   | 位与后赋值| `a &= b`  | `a = a & b`   |
| `\|=`   | 位或后赋值| `a \|= b` | `a = a \| b`  |
| `^=`   | 位异或后赋值| `a ^= b` | `a = a ^ b`   |
| `<<=`  | 左移后赋值| `a <<= 2` | `a = a << 2`  |
| `>>=`  | 右移后赋值| `a >>= 2` | `a = a >> 2`  |
| `>>>=` | 无符号右移后赋值| `a >>>= 2` | `a = a >>> 2` |

### 其他操作符（Other Operators）

| 操作符 | 描述      | 示例      | 结果          |
|--------|-----------|-----------|---------------|
| `?:`   | 三元操作符| `a ? b : c` | 如果 `a` 为 `true`，则结果为 `b` 否则为 `c` |
| `instanceof` | 类型检查 | `obj instanceof Class` | 如果 `obj` 是 `Class` 类的实例，则为 `true` |

### 示例代码

```java
public class OperatorDemo {
    public static void main(String[] args) {
        // 算术操作符
        int a = 10;
        int b = 5;
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));

        // 关系操作符
        System.out.println("a == b: " + (a == b));
        System.out.println("a != b: " + (a != b));
        System.out.println("a > b: " + (a > b));
        System.out.println("a < b: " + (a < b));
        System.out.println("a >= b: " + (a >= b));
        System.out.println("a <= b: " + (a <= b));

        // 逻辑操作符
        boolean x = true;
        boolean y = false;
        System.out.println("x && y: " + (x && y));
        System.out.println("x || y: " + (x || y));
        System.out.println("!x: " + (!x));

        // 位操作符
        int p = 6;  // 110 in binary
        int q = 4;  // 100 in binary
        System.out.println("p & q: " + (p & q));  // 100 in binary, 4 in decimal
        System.out.println("p | q: " + (p | q));  // 110 in binary, 6 in decimal
        System.out.println("p ^ q: " + (p ^ q));  // 010 in binary, 2 in decimal
        System.out.println("~p: " + (~p));        // 001 in binary, -7 in decimal
        System.out.println("p << 1: " + (p << 1)); // 1100 in binary, 12 in decimal
        System.out.println("p >> 1: " + (p >> 1)); // 011 in binary, 3 in decimal
        System.out.println("p >>> 1: " + (p >>> 1)); // 011 in binary, 3 in decimal

        // 赋值操作符
        int r = 10;
        r += 5;
        System.out.println("r += 5: " + r);
        r -= 3;
        System.out.println("r -= 3: " + r);
        r *= 2;
        System.out.println("r *= 2: " + r);
        r /= 2;
        System.out.println("r /= 2: " + r);
        r %= 3;
        System.out.println("r %= 3: " + r);

        // 三元操作符
        int result = (a > b) ? a : b;
        System.out.println("Result of ternary operator: " + result);

        // instanceof 操作符
        String str = "Hello, Java!";
        boolean isString = str instanceof String

;
        System.out.println("str is an instance of String: " + isString);
    }
}
```

## 控制结构

### 条件语句

- `if` 语句
- `if-else` 语句
- `switch` 语句

```java
int number = 10;
if (number > 0) {
    System.out.println("Positive number");
} else {
    System.out.println("Negative number");
}

char grade = 'B';
switch (grade) {
    case 'A':
        System.out.println("Excellent");
        break;
    case 'B':
        System.out.println("Good");
        break;
    default:
        System.out.println("Invalid grade");
        break;
}
```

### 循环语句

- `for` 循环
- `while` 循环
- `do-while` 循环

```java
for (int i = 0; i < 5; i++) {
    System.out.println("Value of i: " + i);
}

int j = 0;
while (j < 5) {
    System.out.println("Value of j: " + j);
    j++;
}

int k = 0;
do {
    System.out.println("Value of k: " + k);
    k++;
} while (k < 5);
```

## 数组

数组是存储相同类型数据的容器。

```java
int[] numbers = new int[5];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
numbers[4] = 5;

for (int num : numbers) {
    System.out.println(num);
}
```

## 方法

方法是执行特定任务的代码块。

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(5, 3);
        System.out.println("Sum: " + result);
    }
}
```

## Lambda 表达式

在 Java 中，匿名函数主要通过 Lambda 表达式来实现。Lambda 表达式是一种简洁的函数表示法，允许你在不需要定义明确类和方法的情况下传递行为。

### Lambda 表达式的语法

Lambda 表达式的基本语法如下：

```java
(parameters) -> expression
```

或

```java
(parameters) -> { statements }
```

### 示例和用法

以下是一些使用 Lambda 表达式的常见场景和示例：

#### 1. 使用 Lambda 表达式实现接口

通常，Lambda 表达式用于实现只有一个抽象方法的接口（即函数式接口）。Java 提供了几个内置的函数式接口，例如 `Runnable`，`Callable`，`Comparator` 等。

**示例：使用 `Runnable` 接口**

```java
public class LambdaExample {
    public static void main(String[] args) {
        // 使用匿名内部类
        Runnable runnable1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("Runnable using anonymous inner class");
            }
        };

        // 使用 Lambda 表达式
        Runnable runnable2 = () -> System.out.println("Runnable using Lambda expression");

        // 运行任务
        runnable1.run();
        runnable2.run();
    }
}
```

#### 2. 使用 Lambda 表达式进行集合操作

Lambda 表达式与 Java 8 引入的 `Stream API` 结合使用，可以简化对集合的操作。

**示例：对列表进行过滤和迭代**

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // 过滤名字长度大于3的名字
        List<String> filteredNames = names.stream()
                                          .filter(name -> name.length() > 3)
                                          .collect(Collectors.toList());

        // 输出过滤后的名字
        filteredNames.forEach(name -> System.out.println(name));
    }
}
```

#### 3. 使用自定义函数式接口

你可以创建自己的函数式接口，并使用 Lambda 表达式来实现它们。

**示例：自定义函数式接口**

```java
@FunctionalInterface
interface MathOperation {
    int operation(int a, int b);
}

public class CustomFunctionalInterfaceExample {
    public static void main(String[] args) {
        // 使用 Lambda 表达式实现加法操作
        MathOperation addition = (a, b) -> a + b;

        // 使用 Lambda 表达式实现减法操作
        MathOperation subtraction = (a, b) -> a - b;

        // 执行操作并输出结果
        System.out.println("10 + 5 = " + operate(10, 5, addition));
        System.out.println("10 - 5 = " + operate(10, 5, subtraction));
    }

    private static int operate(int a, int b, MathOperation mathOperation) {
        return mathOperation.operation(a, b);
    }
}
```

#### 4. 使用内置函数式接口

Java 8 提供了一些通用的函数式接口，如 `Predicate`，`Function`，`Consumer`，`Supplier` 等。

**示例：使用 `Predicate` 进行过滤**

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class PredicateExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 使用 Predicate 过滤偶数
        Predicate<Integer> isEven = number -> number % 2 == 0;
        List<Integer> evenNumbers = numbers.stream()
                                           .filter(isEven)
                                           .collect(Collectors.toList());

        // 输出过滤后的偶数
        evenNumbers.forEach(System.out::println);
    }
}
```

## 面向对象编程（OOP）

Java 是一种面向对象编程语言，主要包括以下概念：

- 类（Class）：描述对象的蓝图。
- 对象（Object）：类的实例。
- 继承（Inheritance）：一个类可以继承另一个类的属性和方法。
- 多态（Polymorphism）：对象可以以多种形式出现。
- 封装（Encapsulation）：隐藏对象的实现细节。
- 抽象（Abstraction）：只暴露对象的功能，而隐藏实现细节。

```java
public class Animal {
    public void eat() {
        System.out.println("This animal eats food.");
    }
}

public class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("The dog eats bones.");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        myDog.eat();
    }
}
```

### 单继承

Java 中的类只能有一个直接父类，也就是说 Java 不支持多继承。每个类只能继承一个类，但可以实现多个接口。

```java
class A {
    // 父类
}

class B extends A {
    // 子类
}
```

### 访问修饰符的继承规则

- **public**：公共成员可以被任何类访问和继承。
- **protected**：受保护成员可以被同一包中的类和任何子类访问和继承。
- **default**（无修饰符）：默认成员仅限于同一包中的类访问和继承。
- **private**：私有成员不能被其他类访问和继承，即使是子类也不能直接访问父类的私有成员，但可以通过公共或保护的方法访问。

```java
class Parent {
    public int publicField = 1;
    protected int protectedField = 2;
    int defaultField = 3;
    private int privateField = 4;
}

class Child extends Parent {
    public void accessFields() {
        System.out.println(publicField);    // 可以访问
        System.out.println(protectedField); // 可以访问
        System.out.println(defaultField);   // 可以访问
        // System.out.println(privateField); // 无法访问，编译错误
    }
}
```

### final 关键字

使用 `final` 关键字修饰的类不能被继承，使用 `final` 关键字修饰的方法不能被子类重写。

- **final 类**：不能被继承。

```java
final class FinalClass {
    // 类的内容
}

// class SubClass extends FinalClass { // 编译错误
// }
```

- **final 方法**：不能被重写。

```java
class Parent {
    public final void finalMethod() {
        // 方法的内容
    }
}

class Child extends Parent {
    // @Override
    // public void finalMethod() { // 编译错误
    //     // 不能重写
    // }
}
```

### 构造器的继承

构造器不能被继承，但是子类的构造器可以调用父类的构造器。调用父类构造器使用 `super` 关键字，必须在子类构造器的第一行。

```java
class Parent {
    public Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {
    public Child() {
        super(); // 调用父类构造器
        System.out.println("Child constructor");
    }
}
```

### 多重继承的替代：接口

虽然 Java 不支持类的多重继承，但可以通过接口来实现。一个类可以实现多个接口，从而在一定程度上达到多重继承的效果。

```java
interface InterfaceA {
    void methodA();
}

interface InterfaceB {
    void methodB();
}

class MultiInherit implements InterfaceA, InterfaceB {
    public void methodA() {
        System.out.println("Method A");
    }

    public void methodB() {
        System.out.println("Method B");
    }
}
```

### 抽象类和抽象方法

- **抽象类**：不能被实例化，只能被继承。抽象类可以包含抽象方法（没有方法体的方法）和非抽象方法。

```java
abstract class AbstractClass {
    abstract void abstractMethod(); // 抽象方法

    void concreteMethod() { // 非抽象方法
        System.out.println("Concrete method");
    }
}

class ConcreteClass extends AbstractClass {
    void abstractMethod() {
        System.out.println("Abstract method implementation");
    }
}
```

### 方法的重写（Override）

子类可以重写父类的方法，但必须保持方法签名（方法名称和参数列表）一致，同时不能缩小访问权限。

```java
class Parent {
    public void display() {
        System.out.println("Parent display method");
    }
}

class Child extends Parent {
    @Override
    public void display() {
        System.out.println("Child display method");
    }
}
```

## 泛型编程

### 泛型类

泛型类是具有一个或多个类型参数的类。类型参数用尖括号 `<>` 括起来，并且可以在类声明中使用。

```java
public class GenericBox<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public static void main(String[] args) {
        GenericBox<Integer> integerBox = new GenericBox<>();
        integerBox.setValue(10);
        System.out.println("Integer Value: " + integerBox.getValue());

        GenericBox<String> stringBox = new GenericBox<>();
        stringBox.setValue("Hello");
        System.out.println("String Value: " + stringBox.getValue());
    }
}
```

在上述代码中，`GenericBox` 是一个泛型类，`T` 是类型参数。可以创建不同类型的 `GenericBox` 实例，如 `GenericBox<Integer>` 和 `GenericBox<String>`。

### 泛型方法

泛型方法是在方法声明中使用类型参数的方法。类型参数可以用在方法的返回类型和参数列表中。

```java
public class GenericMethodExample {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3, 4, 5};
        String[] stringArray = {"A", "B", "C", "D"};

        printArray(intArray);    // 输出：1 2 3 4 5
        printArray(stringArray); // 输出：A B C D
    }
}
```

在上述代码中，`printArray` 方法是一个泛型方法，`<T>` 是类型参数，方法可以处理任何类型的数组。

### 有界类型参数

有界类型参数允许你限制类型参数必须是某种类型的子类（或实现某个接口）。可以使用关键字 `extends` 定义有界类型参数。

```java
public class BoundedTypeExample {
    public static <T extends Number> void printNumber(T number) {
        System.out.println("Number: " + number);
    }

    public static void main(String[] args) {
        printNumber(10);        // 输出：Number: 10
        printNumber(10.5);      // 输出：Number: 10.5
        // printNumber("10");   // 编译错误，String 不是 Number 的子类
    }
}
```

在上述代码中，`printNumber` 方法的类型参数 `T` 被限制为 `Number` 类或其子类。

### 泛型接口

泛型接口是具有类型参数的接口。实现泛型接口的类可以指定具体的类型参数。

```java
interface GenericInterface<T> {
    void setValue(T value);
    T getValue();
}

class GenericClass<T> implements GenericInterface<T> {
    private T value;

    @Override
    public void setValue(T value) {
        this.value = value;
    }

    @Override
    public T getValue() {
        return value;
    }

    public static void main(String[] args) {
        GenericClass<Integer> integerInstance = new GenericClass<>();
        integerInstance.setValue(100);
        System.out.println("Value: " + integerInstance.getValue());
    }
}
```

在上述代码中，`GenericInterface` 是一个泛型接口，`GenericClass` 实现了该接口。

### 通配符

通配符（wildcards）用于表示不确定的类型，有三种常见的使用方式：

- 无界通配符 `<?>`：表示任何类型。

```java
public static void printList(List<?> list) {
    for (Object element : list) {
        System.out.println(element);
    }
}
```

- 有界通配符（上界） `<? extends T>`：表示类型是 `T` 或 `T` 的子类。

```java
public static void printNumbers(List<? extends Number> list) {
    for (Number number : list) {
        System.out.println(number);
    }
}
```

- 有界通配符（下界） `<? super T>`：表示类型是 `T` 或 `T` 的父类。

```java
public static void addNumbers(List<? super Integer> list) {
    list.add(10);
    list.add(20);
}
```

### 泛型的类型擦除

Java 的泛型在编译时会进行类型擦除，这意味着在运行时，所有的类型参数都会被替换为它们的上界（如果没有指定上界，则替换为 `Object`）。因此，无法在运行时获取泛型的实际类型参数。

## 反射
Java 的反射机制允许在运行时检查和操作类、方法、字段和构造器等。这使得程序能够在运行时动态地发现和使用类的成员。反射主要用于框架、工具、库等需要动态加载和操作类的场景。以下是 Java 反射的一些关键概念和用法：

### 获取类对象

反射的起点是获取 `Class` 对象，可以通过以下三种方式之一获得：

```java
public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 方式1：通过类名
            Class<?> clazz1 = Class.forName("java.util.ArrayList");

            // 方式2：通过对象的 `getClass` 方法
            Class<?> clazz2 = new ArrayList<>().getClass();

            // 方式3：通过类的 .class 属性
            Class<?> clazz3 = ArrayList.class;

            System.out.println(clazz1);
            System.out.println(clazz2);
            System.out.println(clazz3);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

### 创建实例

使用反射创建类的实例：

```java
public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 获取 Class 对象
            Class<?> clazz = Class.forName("java.util.ArrayList");

            // 创建实例
            Object instance = clazz.getDeclaredConstructor().newInstance();
            System.out.println(instance.getClass().getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 获取和操作字段

通过反射获取类的字段并操作它们：

```java
import java.lang.reflect.Field;

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 创建一个类的实例
            Person person = new Person("John", 30);

            // 获取 Class 对象
            Class<?> clazz = person.getClass();

            // 获取字段
            Field nameField = clazz.getDeclaredField("name");
            Field ageField = clazz.getDeclaredField("age");

            // 允许访问私有字段
            nameField.setAccessible(true);
            ageField.setAccessible(true);

            // 获取字段值
            String name = (String) nameField.get(person);
            int age = ageField.getInt(person);

            System.out.println("Name: " + name);
            System.out.println("Age: " + age);

            // 修改字段值
            nameField.set(person, "Jane");
            ageField.set(person, 25);

            System.out.println("Updated Name: " + person.getName());
            System.out.println("Updated Age: " + person.getAge());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

### 获取和调用方法

通过反射获取类的方法并调用它们：

```java
import java.lang.reflect.Method;

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 创建一个类的实例
            Person person = new Person("John", 30);

            // 获取 Class 对象
            Class<?> clazz = person.getClass();

            // 获取方法
            Method getNameMethod = clazz.getDeclaredMethod("getName");
            Method setNameMethod = clazz.getDeclaredMethod("setName", String.class);

            // 调用方法
            String name = (String) getNameMethod.invoke(person);
            System.out.println("Name: " + name);

            setNameMethod.invoke(person, "Jane");
            System.out.println("Updated Name: " + person.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }
}
```

### 获取和调用构造器

通过反射获取类的构造器并调用它们：

```java
import java.lang.reflect.Constructor;

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 获取 Class 对象
            Class<?> clazz = Class.forName("Person");

            // 获取构造器
            Constructor<?> constructor = clazz.getDeclaredConstructor(String.class, int.class);

            // 创建实例
            Person person = (Person) constructor.newInstance("John", 30);

            System.out.println("Name: " + person.getName());
            System.out.println("Age: " + person.getAge());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

### 获取类信息

通过反射获取类的基本信息，如字段、方法、构造器和父类等。

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            // 获取 Class 对象
            Class<?> clazz = Class.forName("Person");

            // 获取类名
            System.out.println("Class Name: " + clazz.getName());

            // 获取父类名
            System.out.println("Superclass Name: " + clazz.getSuperclass().getName());

            // 获取字段
            Field[] fields = clazz.getDeclaredFields();
            System.out.println("Fields:");
            for (Field field : fields) {
                System.out.println(" " + field.getName());
            }

            // 获取方法
            Method[] methods = clazz.getDeclaredMethods();
            System.out.println("Methods:");
            for (Method method : methods) {
                System.out.println(" " + method.getName());
            }

            // 获取构造器
            Constructor<?>[] constructors = clazz.getDeclaredConstructors();
            System.out.println("Constructors:");
            for (Constructor<?> constructor : constructors) {
                System.out.println(" " + constructor.getName());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class Person {
    private String name;
    private int age;

    public Person() {
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

### 获取私有属性和方法

在 Java 中，通过反射可以访问和操作私有属性和方法。为了访问私有属性和方法，需要将其设置为可访问状态。以下是详细的示例，展示了如何使用反射获取和操作私有属性和方法：

#### 示例类

```java
class Person {
    private String name;
    private int age;

    private Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    private String getName() {
        return name;
    }

    private void setName(String name) {
        this.name = name;
    }

    private int getAge() {
        return age;
    }

    private void setAge(int age) {
        this.age = age;
    }

    private void printInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}
```

#### 获取和操作私有属性

```java
import java.lang.reflect.Field;

public class AccessPrivateField {
    public static void main(String[] args) {
        try {
            // 创建 Person 对象实例
            Person person = new Person("John", 30);

            // 获取 Class 对象
            Class<?> clazz = person.getClass();

            // 获取私有字段 "name"
            Field nameField = clazz.getDeclaredField("name");
            // 设置可访问
            nameField.setAccessible(true);

            // 获取私有字段值
            String name = (String) nameField.get(person);
            System.out.println("Name: " + name);

            // 修改私有字段值
            nameField.set(person, "Jane");
            System.out.println("Updated Name: " + nameField.get(person));

            // 获取私有字段 "age"
            Field ageField = clazz.getDeclaredField("age");
            // 设置可访问
            ageField.setAccessible(true);

            // 获取私有字段值
            int age = ageField.getInt(person);
            System.out.println("Age: " + age);

            // 修改私有字段值
            ageField.set(person, 25);
            System.out.println("Updated Age: " + ageField.getInt(person));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### 获取和调用私有方法

```java
import java.lang.reflect.Method;

public class AccessPrivateMethod {
    public static void main(String[] args) {
        try {
            // 获取 Class 对象
            Class<?> clazz = Class.forName("Person");

            // 创建 Person 对象实例
            Person person = (Person) clazz.getDeclaredConstructor(String.class, int.class).newInstance("John", 30);

            // 获取私有方法 "getName"
            Method getNameMethod = clazz.getDeclaredMethod("getName");
            // 设置可访问
            getNameMethod.setAccessible(true);

            // 调用私有方法
            String name = (String) getNameMethod.invoke(person);
            System.out.println("Name: " + name);

            // 获取私有方法 "setName"
            Method setNameMethod = clazz.getDeclaredMethod("setName", String.class);
            // 设置可访问
            setNameMethod.setAccessible(true);

            // 调用私有方法
            setNameMethod.invoke(person, "Jane");
            System.out.println("Updated Name: " + getNameMethod.invoke(person));

            // 获取并调用无参私有方法 "printInfo"
            Method printInfoMethod = clazz.getDeclaredMethod("printInfo");
            printInfoMethod.setAccessible(true);
            printInfoMethod.invoke(person);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 异常处理
在 Java 中，异常处理是确保程序在运行时能够正确处理错误和异常情况的重要机制。通过使用异常处理，可以在错误发生时提供适当的反馈和采取相应的措施，而不是让程序崩溃。

### 异常处理的基本概念

1. **异常**：异常是指程序执行过程中发生的异常情况，可能是程序错误、用户输入错误或其他无法预见的情况。
2. **异常类**：所有异常类都继承自 `java.lang.Throwable`。异常类分为两类：`Error` 和 `Exception`。
   - `Error`：表示严重错误，通常由 JVM 抛出，程序不应该捕获这些错误。
   - `Exception`：表示程序可以捕获并处理的异常。

### 捕获和处理异常

Java 提供了 `try`、`catch`、`finally` 和 `throw` 关键字来捕获和处理异常。

#### 基本语法

```java
try {
    // 可能抛出异常的代码
} catch (ExceptionType1 e1) {
    // 处理异常1
} catch (ExceptionType2 e2) {
    // 处理异常2
} finally {
    // 始终执行的代码
}
```

#### 示例代码

```java
public class ExceptionHandlingExample {
    public static void main(String[] args) {
        try {
            int[] numbers = {1, 2, 3};
            System.out.println(numbers[5]); // 可能抛出 ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index is out of bounds!");
        } catch (Exception e) {
            System.out.println("An unexpected error occurred: " + e.getMessage());
        } finally {
            System.out.println("This block is always executed.");
        }
    }
}
```

### 自定义异常

可以通过继承 `Exception` 类来创建自定义异常。

#### 自定义异常类

```java
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}
```

#### 抛出自定义异常

```java
public class CustomExceptionExample {
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (CustomException e) {
            System.out.println("Caught custom exception: " + e.getMessage());
        }
    }

    public static void validateAge(int age) throws CustomException {
        if (age < 18) {
            throw new CustomException("Age must be 18 or older.");
        } else {
            System.out.println("Age is valid.");
        }
    }
}
```

### 使用 `throws` 声明异常

如果一个方法可能会抛出异常，但不处理它，可以使用 `throws` 关键字在方法声明中指出该异常。

```java
public class ThrowsExample {
    public static void main(String[] args) {
        try {
            riskyMethod();
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }

    public static void riskyMethod() throws Exception {
        throw new Exception("This is a risky method.");
    }
}
```

