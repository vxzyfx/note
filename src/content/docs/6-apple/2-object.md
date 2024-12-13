---
title: Object-C编程语言
---

Objective-C（常简称为Obj-C）是一种面向对象的编程语言，最初由Brad Cox和Tom Love在20世纪80年代初开发。它在Apple的macOS和iOS开发中曾被广泛使用，但现在大部分已被Swift替代。Objective-C在C语言的基础上增加了Smalltalk风格的消息传递机制，使得编程更加动态和灵活。

## 注释

1. **单行注释**：
   - 使用`//`来表示单行注释。`//`后的内容会被编译器忽略。
   - 单行注释通常用于对代码行进行简短说明。

   ```objc
   int age = 30;  // 定义一个整数变量age并赋值为30
   ```

2. **多行注释**：
   - 使用`/*`和`*/`来表示多行注释。`/*`和`*/`之间的所有内容都会被编译器忽略。
   - 多行注释适合用于对大段代码或复杂逻辑进行详细解释。

   ```objc
   /*
   这是一个多行注释的示例。
   可以用来解释多个代码行的功能，
   或者提供详细的说明。
   */
   NSString *name = @"Alice";
   ```

3. **嵌套注释**：
   - 需要注意的是，在Objective-C中，多行注释不能嵌套使用。如果在一个多行注释中包含另一个多行注释，编译器会报错。
   - 如果需要临时注释掉一段包含注释的代码，可以使用单行注释，或修改现有的注释块。

   错误的嵌套注释例子：
   ```objc
   /*
   这是一个多行注释的开始。
   /*
   这是错误的嵌套注释，编译器会报错。
   */
   多行注释的结束。
   */
   ```

## 变量定义

在Objective-C中，变量的定义与其他C语言系语言（如C、C++）相似。变量是用于存储数据的命名存储位置，可以是基本数据类型或对象类型。变量定义时需要指定类型，并可以选择性地初始化。

### 变量的基本定义语法：

```objc
类型 变量名;
```

### 变量的定义示例：

1. **定义基本数据类型的变量**：
   - 定义一个整数变量`age`并赋值为30：
     ```objc
     int age = 30;
     ```

   - 定义一个浮点数变量`height`并赋值为5.9：
     ```objc
     float height = 5.9f;
     ```

   - 定义一个字符变量`initial`并赋值为`'A'`：
     ```objc
     char initial = 'A';
     ```

2. **定义对象类型的变量**：
   - 定义一个指向NSString对象的指针变量`name`并赋值为`@"Alice"`：
     ```objc
     NSString *name = @"Alice";
     ```

   在Objective-C中，类的对象是通过指针来操作的，所以定义对象类型的变量时通常会加上`*`，表示这是一个指针。

3. **定义多个变量**：
   - 可以在一行中定义多个相同类型的变量：
     ```objc
     int x = 10, y = 20, z = 30;
     ```

4. **局部变量和全局变量**：
   - **局部变量**：在函数或方法内部定义的变量，只在该函数或方法中可见。
     ```objc
     - (void)exampleMethod {
         int localVariable = 5;
         NSLog(@"局部变量值: %d", localVariable);
     }
     ```

   - **全局变量**：在函数或方法之外定义的变量，对所有函数或方法可见。
     ```objc
     int globalVariable = 100;

     - (void)exampleMethod {
         NSLog(@"全局变量值: %d", globalVariable);
     }
     ```

5. **静态变量**：
   - `static`关键字用于声明静态变量，静态变量的生命周期贯穿整个程序运行期间，但作用域限制在定义它的块内（比如函数或方法内）。
     ```objc
     - (void)exampleMethod {
         static int count = 0;
         count++;
         NSLog(@"方法调用次数: %d", count);
     }
     ```
   - 在上面的例子中，每次调用`exampleMethod`方法时，`count`变量的值都会在上次调用的基础上递增。

## 数据类型

| 数据类型       | 描述                                                            | 示例代码                          |
|---------------|-----------------------------------------------------------------|-----------------------------------|
| **基本数据类型**  |                                                                 |
| `int`         | 整数类型，通常占用4字节，存储整数。                                | `int age = 30;`                   |
| `short`       | 短整型，通常占用2字节，存储较小范围的整数。                         | `short count = 10;`               |
| `long`        | 长整型，通常占用4或8字节，存储较大范围的整数。                      | `long distance = 100000L;`        |
| `long long`   | 更长的整型，通常占用8字节，存储非常大的整数。                       | `long long largeNumber = 100000LL;`|
| `unsigned int`| 无符号整型，通常占用4字节，只能存储非负整数。                        | `unsigned int positiveNumber = 50;`|
| `float`       | 单精度浮点型，通常占用4字节，存储带小数的数值。                      | `float height = 5.9f;`            |
| `double`      | 双精度浮点型，通常占用8字节，存储带小数的数值，精度比`float`更高。    | `double pi = 3.14159;`            |
| `char`        | 字符类型，通常占用1字节，存储单个字符。                             | `char initial = 'A';`             |
| `bool`        | 布尔类型，存储`YES`或`NO`，Objective-C中的布尔值。                   | `bool isTrue = YES;`              |
| `BOOL`        | Objective-C中定义的布尔类型，存储`YES`或`NO`。                      | `BOOL isFinished = NO;`           |
| **对象数据类型** |                                                                 |
| `NSString *`  | 字符串对象类型，用于存储字符串。                                   | `NSString *name = @"Alice";`      |
| `NSNumber *`  | 用于包装数字类型的对象，包括`int`、`float`、`double`等。            | `NSNumber *age = @30;`            |
| `NSArray *`   | 数组对象类型，用于存储有序的对象集合。                              | `NSArray *array = @[@"A", @"B"];` |
| `NSDictionary *`| 字典对象类型，用于存储键值对。                                     | `NSDictionary *dict = @{@"key": @"value"};` |
| `NSObject *`  | 所有Objective-C对象的基类。                                        | `NSObject *obj = [[NSObject alloc] init];` |

## 类型转换

在Objective-C中，类型转换（Type Casting）用于将一个变量从一种数据类型转换为另一种数据类型。类型转换有两种主要形式：隐式转换（implicit casting）和显式转换（explicit casting）。

### 隐式转换（Implicit Casting）

隐式转换是指编译器自动将一个变量从一种类型转换为另一种兼容类型，通常发生在将一个较小类型的数据赋值给一个较大类型的变量时。这种转换不会造成数据丢失。

```objc
int intValue = 42;
float floatValue = intValue;  // int 自动转换为 float
```

在上面的示例中，`int` 类型的 `intValue` 自动转换为 `float` 类型的 `floatValue`。

### 显式转换（Explicit Casting）

显式转换是由开发者手动进行的类型转换，通常用于将一个较大类型的数据转换为较小类型的数据。显式转换可能会造成数据丢失，因此需要谨慎使用。

#### 基本数据类型的显式转换：

```objc
float floatValue = 3.14;
int intValue = (int)floatValue;  // float 显式转换为 int
```

在这个例子中，`float` 类型的 `floatValue` 被显式转换为 `int` 类型的 `intValue`，结果会丢失小数部分，只保留整数部分。

#### 对象类型的显式转换：

在Objective-C中，类之间的类型转换使用的是指针类型转换。例如，父类和子类之间的类型转换。需要确保转换是安全的，否则会导致运行时错误。

```objc
NSObject *object = [[NSString alloc] initWithString:@"Hello"];
NSString *string = (NSString *)object;  // 将 NSObject 显式转换为 NSString
```

在这个例子中，我们将 `NSObject` 类型的 `object` 显式转换为 `NSString` 类型。因为 `object` 实际上是一个 `NSString` 对象，所以这个转换是安全的。

### 特殊的类型转换：`NSNumber` 和 基本数据类型

`NSNumber` 是 Objective-C 中用于包装基本数据类型的对象类型，可以将基本数据类型与 `NSNumber` 之间进行转换。

```objc
int intValue = 42;
NSNumber *number = [NSNumber numberWithInt:intValue];  // int 转换为 NSNumber

float floatValue = [number floatValue];  // NSNumber 转换为 float
```

## 字符串格式化

在Objective-C中，字符串格式化是通过`NSString`类中的`stringWithFormat:`方法实现的。这种方法类似于C语言中的`printf`函数，允许你创建包含变量值的字符串。字符串格式化在构建动态字符串时非常有用。

### 基本用法

```objc
NSString *formattedString = [NSString stringWithFormat:@"Hello, %@! You are %d years old.", @"Alice", 30];
```

在这个例子中，`stringWithFormat:`方法使用了一个格式字符串，其中包含格式说明符`%@`和`%d`。这些说明符分别被后面的字符串`@"Alice"`和整数`30`替换。

### 常用的格式说明符

以下是一些常见的格式说明符及其含义：

| 格式说明符 | 描述                                               | 示例                                      |
|------------|----------------------------------------------------|-------------------------------------------|
| `%@`       | 对象类型（通常用于字符串对象`NSString`）             | `NSString *name = @"Alice";`<br>`NSString *formattedString = [NSString stringWithFormat:@"Hello, %@!", name];`  |
| `%d`       | 整数（`int`类型）                                    | `int age = 30;`<br>`NSString *formattedString = [NSString stringWithFormat:@"Age: %d", age];`  |
| `%ld`      | 长整型（`long`类型）                                 | `long count = 100000L;`<br>`NSString *formattedString = [NSString stringWithFormat:@"Count: %ld", count];`  |
| `%f`       | 浮点数（`float`类型）                                | `float height = 5.9f;`<br>`NSString *formattedString = [NSString stringWithFormat:@"Height: %f", height];`  |
| `%.2f`     | 指定精度的浮点数                                     | `float price = 9.99f;`<br>`NSString *formattedString = [NSString stringWithFormat:@"Price: %.2f", price];`  |
| `%x`       | 十六进制整数                                         | `int value = 255;`<br>`NSString *formattedString = [NSString stringWithFormat:@"Hex value: %x", value];`  |
| `%p`       | 指针地址                                             | `NSString *name = @"Alice";`<br>`NSString *formattedString = [NSString stringWithFormat:@"Pointer: %p", name];`  |
| `%%`       | 字符`%`（输出一个百分号）                             | `NSString *formattedString = [NSString stringWithFormat:@"Progress: 100%%"];`  |

### 示例代码

1. **字符串与整数结合格式化**：
    ```objc
    NSString *name = @"Alice";
    int age = 30;
    NSString *formattedString = [NSString stringWithFormat:@"Name: %@, Age: %d", name, age];
    NSLog(@"%@", formattedString);
    ```
    输出：`Name: Alice, Age: 30`

2. **格式化浮点数**：
    ```objc
    float price = 9.99;
    NSString *formattedString = [NSString stringWithFormat:@"The price is: %.2f", price];
    NSLog(@"%@", formattedString);
    ```
    输出：`The price is: 9.99`

3. **十六进制表示**：
    ```objc
    int value = 255;
    NSString *formattedString = [NSString stringWithFormat:@"Hexadecimal: %x", value];
    NSLog(@"%@", formattedString);
    ```
    输出：`Hexadecimal: ff`

4. **包含百分号的字符串**：
    ```objc
    NSString *formattedString = [NSString stringWithFormat:@"Complete: 100%%"];
    NSLog(@"%@", formattedString);
    ```
    输出：`Complete: 100%`

### 多行字符串格式化

Objective-C还支持使用多行格式化字符串，使用`\`符号表示字符串在下一行继续：

```objc
NSString *formattedString = [NSString stringWithFormat:@"Name: %@, \
                              Age: %d, \
                              Height: %.2f", 
                              @"Alice", 30, 5.9f];
NSLog(@"%@", formattedString);
```

## 运算符

### 算术运算符

| 运算符 | 描述          | 示例                            | 结果          |
|--------|---------------|---------------------------------|---------------|
| `+`    | 加法          | `int result = 5 + 3;`           | `result = 8`  |
| `-`    | 减法          | `int result = 5 - 3;`           | `result = 2`  |
| `*`    | 乘法          | `int result = 5 * 3;`           | `result = 15` |
| `/`    | 除法          | `int result = 6 / 3;`           | `result = 2`  |
| `%`    | 取余（模）     | `int result = 5 % 3;`           | `result = 2`  |
| `++`   | 自增          | `int a = 5; a++;`               | `a = 6`       |
| `--`   | 自减          | `int a = 5; a--;`               | `a = 4`       |

### 关系运算符

| 运算符 | 描述               | 示例                           | 结果            |
|--------|--------------------|--------------------------------|-----------------|
| `==`   | 等于               | `int result = (5 == 3);`       | `result = 0` (假) |
| `!=`   | 不等于             | `int result = (5 != 3);`       | `result = 1` (真) |
| `>`    | 大于               | `int result = (5 > 3);`        | `result = 1` (真) |
| `<`    | 小于               | `int result = (5 < 3);`        | `result = 0` (假) |
| `>=`   | 大于或等于         | `int result = (5 >= 3);`       | `result = 1` (真) |
| `<=`   | 小于或等于         | `int result = (5 <= 3);`       | `result = 0` (假) |

### 逻辑运算符

| 运算符 | 描述                | 示例                            | 结果            |
|--------|---------------------|---------------------------------|-----------------|
| `&&`   | 逻辑与（AND）        | `int result = (5 > 3 && 8 > 5);`| `result = 1` (真) |
| `\|\|` | 逻辑或（OR）         | `int result = (5 > 3 \|\| 3 > 8);`| `result = 1` (真) |
| `!`    | 逻辑非（NOT）        | `int result = !(5 == 3);`       | `result = 1` (真) |

### 位运算符

| 运算符 | 描述                | 示例                          | 结果             |
|--------|---------------------|-------------------------------|------------------|
| `&`    | 按位与              | `int result = 5 & 3;`         | `result = 1`     |
| `\|`   | 按位或              | `int result = 5 \| 3;`        | `result = 7`     |
| `^`    | 按位异或（XOR）     | `int result = 5 ^ 3;`         | `result = 6`     |
| `~`    | 按位取反（NOT）     | `int result = ~5;`            | `result = -6`    |
| `<<`   | 左移                | `int result = 5 << 1;`        | `result = 10`    |
| `>>`   | 右移                | `int result = 5 >> 1;`        | `result = 2`     |

### 赋值运算符

| 运算符 | 描述                   | 示例                           | 结果               |
|--------|------------------------|--------------------------------|--------------------|
| `=`    | 赋值                   | `int a = 5;`                   | `a = 5`            |
| `+=`   | 加且赋值               | `int a = 5; a += 3;`           | `a = 8`            |
| `-=`   | 减且赋值               | `int a = 5; a -= 3;`           | `a = 2`            |
| `*=`   | 乘且赋值               | `int a = 5; a *= 3;`           | `a = 15`           |
| `/=`   | 除且赋值               | `int a = 6; a /= 3;`           | `a = 2`            |
| `%=`   | 取余且赋值             | `int a = 5; a %= 3;`           | `a = 2`            |
| `<<=`  | 左移且赋值             | `int a = 5; a <<= 1;`          | `a = 10`           |
| `>>=`  | 右移且赋值             | `int a = 5; a >>= 1;`          | `a = 2`            |
| `&=`   | 按位与且赋值           | `int a = 5; a &= 3;`           | `a = 1`            |
| `\|=`  | 按位或且赋值           | `int a = 5; a \|= 3;`          | `a = 7`            |
| `^=`   | 按位异或且赋值         | `int a = 5; a ^= 3;`           | `a = 6`            |

### 条件（三元）运算符

| 运算符 | 描述                          | 示例                              | 结果             |
|--------|-------------------------------|-----------------------------------|------------------|
| `? :`  | 条件运算符（Ternary Operator）| `int result = (5 > 3) ? 10 : 20;` | `result = 10`    |

### 其他运算符

| 运算符 | 描述                 | 示例                                | 结果            |
|--------|----------------------|-------------------------------------|-----------------|
| `sizeof`| 获取变量的大小        | `int size = sizeof(int);`           | `size = 4` (取决于系统) |
| `&`    | 取地址运算符          | `int a = 5; int *p = &a;`           | `p`存储`a`的地址 |
| `*`    | 指针运算符（解引用）   | `int a = 5; int *p = &a; int b = *p;`| `b = 5`        |
| `()`   | 强制类型转换          | `float f = 3.14; int a = (int)f;`   | `a = 3`         |

## 流程控制

在Objective-C中，流程控制语句用于控制程序的执行顺序和逻辑流。常见的流程控制结构包括条件语句、循环语句和跳转语句。下面是这些结构的介绍及其使用示例。

### 1. 条件语句

#### `if` 语句
用于根据条件表达式的结果执行特定的代码块。

```objc
int age = 20;
if (age >= 18) {
    NSLog(@"You are an adult.");
}
```

#### `if-else` 语句
当`if`条件为`false`时，执行`else`分支的代码。

```objc
int age = 16;
if (age >= 18) {
    NSLog(@"You are an adult.");
} else {
    NSLog(@"You are a minor.");
}
```

#### `else if` 语句
用于检查多个条件，逐个判断并执行第一个满足条件的代码块。

```objc
int score = 85;
if (score >= 90) {
    NSLog(@"Grade: A");
} else if (score >= 80) {
    NSLog(@"Grade: B");
} else if (score >= 70) {
    NSLog(@"Grade: C");
} else {
    NSLog(@"Grade: F");
}
```

#### 三元运算符 `? :`
简化的条件判断，用于返回两个值中的一个。

```objc
int age = 20;
NSString *status = (age >= 18) ? @"Adult" : @"Minor";
NSLog(@"%@", status);
```

#### `switch` 语句
用于在多个可能的条件分支中选择一个执行。适合用于枚举类型或有限范围的整数判断。

```objc
int day = 3;
switch (day) {
    case 1:
        NSLog(@"Monday");
        break;
    case 2:
        NSLog(@"Tuesday");
        break;
    case 3:
        NSLog(@"Wednesday");
        break;
    default:
        NSLog(@"Unknown day");
        break;
}
```

### 2. 循环语句

#### `for` 循环
用于执行固定次数的循环操作。

```objc
for (int i = 0; i < 5; i++) {
    NSLog(@"Iteration %d", i);
}
```

#### `while` 循环
当条件为真时重复执行代码块。适合用于需要先判断条件再执行的情况。

```objc
int count = 0;
while (count < 5) {
    NSLog(@"Count is %d", count);
    count++;
}
```

#### `do-while` 循环
与`while`循环类似，但至少执行一次代码块，然后再判断条件。

```objc
int count = 0;
do {
    NSLog(@"Count is %d", count);
    count++;
} while (count < 5);
```

### 3. 跳转语句

#### `break` 语句
用于立即退出当前循环或`switch`语句。

```objc
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // 退出循环
    }
    NSLog(@"Iteration %d", i);
}
```

#### `continue` 语句
跳过当前循环的剩余部分，直接进入下一次循环迭代。

```objc
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过当前循环
    }
    NSLog(@"Odd number: %d", i);
}
```

#### `return` 语句
用于从方法或函数中返回，并且可以返回一个值。

```objc
- (int)addNumbers:(int)a with:(int)b {
    return a + b;  // 返回两个数字的和
}
```

#### `goto` 语句
跳转到代码中的特定标签位置。`goto`的使用在现代编程中很少见，因为它可能导致代码难以理解和维护。

```objc
int count = 0;
while (count < 10) {
    if (count == 5) {
        goto endLoop;  // 跳转到标签endLoop
    }
    count++;
}

endLoop:
NSLog(@"Exited loop at count %d", count);
```

### 4. `@try-@catch-@finally` 结构（异常处理）

用于处理在程序运行时发生的异常。`@try`块中执行可能引发异常的代码，`@catch`块处理异常，`@finally`块执行清理代码（无论是否发生异常）。

```objc
@try {
    NSArray *array = @[@"A", @"B"];
    NSLog(@"%@", array[2]);  // 访问越界，将引发异常
}
@catch (NSException *exception) {
    NSLog(@"Caught an exception: %@", exception.reason);
}
@finally {
    NSLog(@"Finally block executed.");
}
```

## 函数

在Objective-C中，函数（在Objective-C中通常称为方法，特别是在类的上下文中）是用于执行特定任务的代码块。函数可以接受输入（参数）、执行操作并返回结果（返回值）。Objective-C的函数分为C风格的函数和类中的方法。

### 1. C风格的函数

C风格的函数与C语言中的函数定义类似，可以在类之外使用。它们是全局的，可以在代码中的任何地方调用。

#### 函数的定义

```objc
返回类型 函数名(参数类型 参数名, ...) {
    // 函数体
    return 返回值;  // 可选，视返回类型而定
}
```

#### 示例：

```objc
int addTwoNumbers(int a, int b) {
    return a + b;
}
```

在这个示例中，`addTwoNumbers`函数接受两个整数参数`a`和`b`，并返回它们的和。

#### 函数的调用

```objc
int sum = addTwoNumbers(5, 10);
NSLog(@"Sum: %d", sum);  // 输出：Sum: 15
```

### 2. 类中的方法

在Objective-C中，方法是定义在类中的函数。方法分为实例方法和类方法。

#### 实例方法

实例方法是需要通过类的实例来调用的方法，通常用于操作或访问对象的属性。

##### 定义实例方法：

```objc
- (返回类型)方法名:(参数类型)参数名 {
    // 方法体
    return 返回值;  // 可选，视返回类型而定
}
```

##### 示例：

```objc
@interface MyClass : NSObject
- (void)sayHello;
- (int)addNumber:(int)a toNumber:(int)b;
@end

@implementation MyClass
- (void)sayHello {
    NSLog(@"Hello, World!");
}

- (int)addNumber:(int)a toNumber:(int)b {
    return a + b;
}
@end
```

在这个示例中，`MyClass`类定义了两个实例方法：`sayHello`和`addNumber:toNumber:`。

##### 调用实例方法：

```objc
MyClass *myObject = [[MyClass alloc] init];
[myObject sayHello];  // 输出：Hello, World!
int sum = [myObject addNumber:5 toNumber:10];
NSLog(@"Sum: %d", sum);  // 输出：Sum: 15
```

#### 类方法

类方法是通过类本身而不是类的实例来调用的方法，通常用于处理与类相关的任务。

##### 定义类方法：

```objc
+ (返回类型)方法名:(参数类型)参数名 {
    // 方法体
    return 返回值;  // 可选，视返回类型而定
}
```

##### 示例：

```objc
@interface MyClass : NSObject
+ (void)classMethodExample;
@end

@implementation MyClass
+ (void)classMethodExample {
    NSLog(@"This is a class method.");
}
@end
```

在这个示例中，`MyClass`类定义了一个类方法`classMethodExample`。

##### 调用类方法：

```objc
[MyClass classMethodExample];  // 输出：This is a class method.
```

### 3. 方法中的参数和返回值

#### 参数

方法可以接受多个参数，这些参数可以是基本数据类型、对象类型或指针类型。

```objc
- (void)setFirstName:(NSString *)firstName lastName:(NSString *)lastName;
```

这个方法接受两个字符串参数`firstName`和`lastName`。

#### 返回值

方法可以返回值，这些返回值可以是基本数据类型、对象类型或指针类型。

```objc
- (NSString *)fullName {
    return [NSString stringWithFormat:@"%@ %@", self.firstName, self.lastName];
}
```

这个方法返回一个包含全名的字符串。

### 4. 方法的命名规范

Objective-C的方法名通常是描述性的，以便于理解。例如：

```objc
- (void)setFirstName:(NSString *)firstName lastName:(NSString *)lastName;
```

这种命名方式使得方法调用看起来像自然语言：

```objc
[person setFirstName:@"John" lastName:@"Doe"];
```

### 5. 方法的作用域

在Objective-C中，方法可以在类的接口部分声明，在实现部分定义。声明部分通常在`.h`文件中，而实现部分在`.m`文件中。

```objc
// MyClass.h
@interface MyClass : NSObject
- (void)sayHello;
@end

// MyClass.m
@implementation MyClass
- (void)sayHello {
    NSLog(@"Hello, World!");
}
@end
```

### 6. 块(Blocks)

在Objective-C中，**块（Blocks）**是类似于匿名函数或闭包的结构，允许你将代码块封装成对象，并在需要时执行。块可以捕获和存储周围的变量，使它们在块内部的代码中可用。块在处理异步操作、回调、集合操作和其他需要将代码传递给方法的场景中非常有用。

#### 1. 块的基本语法

块的语法与普通的函数定义类似，但它是用`^`符号定义的。

```objc
^returnType (parameterTypes) {
    // 块的代码
};
```

#### 2. 简单的块示例

下面是一个定义和使用块的简单示例。

```objc
// 定义一个没有参数和返回值的块
void (^simpleBlock)(void) = ^{
    NSLog(@"This is a simple block.");
};

// 调用块
simpleBlock();  // 输出：This is a simple block.
```

在这个例子中，`simpleBlock`是一个无参数、无返回值的块。通过调用`simpleBlock()`执行其中的代码。

#### 3. 带参数和返回值的块

块可以接收参数并返回值，类似于函数。

```objc
// 定义一个带有参数和返回值的块
int (^sumBlock)(int, int) = ^(int a, int b) {
    return a + b;
};

// 调用块
int result = sumBlock(3, 5);
NSLog(@"Result: %d", result);  // 输出：Result: 8
```

在这个例子中，`sumBlock`是一个接收两个整数参数并返回它们和的块。

#### 4. 使用块作为函数参数

块可以作为函数或方法的参数，这在需要回调或异步处理时非常有用。

```objc
- (void)performTaskWithCompletion:(void (^)(NSString *result))completionBlock {
    // 模拟一些任务
    NSString *result = @"Task completed";
    
    // 调用完成回调块
    if (completionBlock) {
        completionBlock(result);
    }
}

// 使用块作为参数调用方法
[self performTaskWithCompletion:^(NSString *result) {
    NSLog(@"%@", result);  // 输出：Task completed
}];
```

在这个例子中，`performTaskWithCompletion:`方法接收一个块作为参数，并在任务完成时调用该块。

#### 5. 捕获变量

块可以捕获并存储其定义时作用域中的变量，这些变量在块内部可以被访问。块捕获的变量通常是常量值（不可变），但可以通过`__block`修饰符使变量在块内部可变。

#### 示例：捕获常量值

```objc
int multiplier = 3;
int (^multiplyBlock)(int) = ^(int num) {
    return num * multiplier;  // 捕获 multiplier 变量
};

int result = multiplyBlock(4);
NSLog(@"Result: %d", result);  // 输出：Result: 12
```

在这个例子中，块捕获了外部的`multiplier`变量，并在块内部使用它。

#### 示例：使用 `__block` 修饰符

如果需要在块内修改被捕获的变量，可以使用`__block`修饰符。

```objc
__block int counter = 0;
void (^incrementBlock)(void) = ^{
    counter++;
    NSLog(@"Counter: %d", counter);
};

incrementBlock();  // 输出：Counter: 1
incrementBlock();  // 输出：Counter: 2
```

在这个例子中，`counter`变量被`__block`修饰，允许在块内部修改它的值。

#### 6. 块的内存管理

在Objective-C中，块最初是在栈上创建的，但当块需要在栈帧之外使用时（例如传递给异步函数或保存到变量中），它们会被复制到堆上。ARC（Automatic Reference Counting）会自动管理块的内存，确保块在需要时被正确保留和释放。

#### 示例：ARC管理块

```objc
typedef void (^CompletionBlock)(void);

- (CompletionBlock)createCompletionBlock {
    return ^{
        NSLog(@"Completion block executed.");
    };
}

CompletionBlock block = [self createCompletionBlock];
block();  // 输出：Completion block executed.
```

在这个例子中，ARC会确保返回的块被复制到堆上，并在不再需要时释放。

#### 7. 常见使用场景

块在Objective-C中有多种常见的使用场景：

- **回调和异步操作**：块常用于处理异步操作的回调，例如网络请求、动画完成、文件处理等。
- **集合操作**：可以使用块在`NSArray`、`NSDictionary`等集合上执行操作，如排序、过滤、映射等。
- **内联事件处理**：块可以用于处理UI事件，如按钮点击、手势识别等。

#### 示例：在集合上使用块

```objc
NSArray *numbers = @[@1, @2, @3, @4, @5];
NSArray *squaredNumbers = [numbers mapObjectsUsingBlock:^(NSNumber *num, NSUInteger idx) {
    return @(num.intValue * num.intValue);
}];

NSLog(@"%@", squaredNumbers);  // 输出：(1, 4, 9, 16, 25)
```

### 7. 变参函数

在Objective-C（以及C语言）中，变参函数（Variadic Functions）是一种可以接受可变数量参数的函数。这种函数在参数数量不确定的情况下非常有用，常见的例子包括`printf`函数。


在使用变参函数时，需要用到`<stdarg.h>`库中的几个宏来处理可变参数：

- **`va_list`**：用于声明一个变量，该变量将用于访问可变参数列表。
- **`va_start`**：初始化`va_list`变量，使其指向可变参数列表的第一个参数。这个宏接收两个参数，第一个是`va_list`变量，第二个是最后一个确定的参数。
- **`va_arg`**：用于获取可变参数列表中的下一个参数。这个宏接收两个参数，第一个是`va_list`变量，第二个是参数的类型。
- **`va_end`**：结束对可变参数的访问。必须在所有参数读取完毕后调用，以避免未定义的行为。

#### 示例：带有多个参数的变参函数

```objc
#import <Foundation/Foundation.h>
#import <stdarg.h>

// 定义一个变参函数，用于创建包含多个字符串的NSString对象
NSString *concatenateStrings(NSString *first, ...) {
    va_list args;
    va_start(args, first);
    
    NSMutableString *result = [NSMutableString stringWithString:first];
    
    NSString *arg;
    while ((arg = va_arg(args, NSString *))) {
        [result appendString:arg];
    }
    
    va_end(args);
    return result;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *result = concatenateStrings(@"Hello, ", @"Objective-C", @"! ", @"This is a variadic function.", nil);
        NSLog(@"%@", result);  // 输出：Hello, Objective-C! This is a variadic function.
    }
    return 0;
}
```

## 选择器和消息传递
在Objective-C中，**选择器（Selector）** 和 **消息传递（Message Passing）** 是两个重要的概念，它们为动态方法调用和运行时处理提供了灵活性。这些特性使得Objective-C在某些方面比静态语言更为灵活和强大。

### 1. 选择器（Selector）

**选择器**是Objective-C中用来标识方法的名称的独特标识符。选择器在运行时表示一个方法的名称，并且可以用来动态调用方法。选择器的类型是`SEL`。

#### 1.1 获取选择器

你可以使用`@selector`语法来获取方法的选择器。

```objc
SEL mySelector = @selector(methodName);
```

例如：

```objc
SEL sayHelloSelector = @selector(sayHello);
```

在这个例子中，`sayHelloSelector`是`SEL`类型，表示`sayHello`方法的选择器。

#### 1.2 使用选择器调用方法

选择器通常与`respondsToSelector:`和`performSelector:`方法结合使用。

- **`respondsToSelector:`**：检查对象是否实现了指定的选择器（方法）。

```objc
if ([object respondsToSelector:sayHelloSelector]) {
    NSLog(@"Object responds to sayHello");
}
```

- **`performSelector:`**：使用选择器动态调用方法。

```objc
[object performSelector:sayHelloSelector];
```

### 2. 消息传递（Message Passing）

**消息传递**是Objective-C中的一种动态方法调用机制。与许多静态语言不同，在Objective-C中，方法调用被视为向对象发送消息。这意味着对象接收到消息后，确定要调用哪个方法并执行它。

#### 2.1 消息传递语法

消息传递使用方括号语法`[]`，消息的接收者（对象或类）在前，选择器在方括号内。

```objc
[receiver method];
```

例如：

```objc
[myObject sayHello];
```

这表示向`myObject`发送`sayHello`消息。

#### 2.2 消息传递的工作原理

当你向一个对象发送消息时，运行时系统会根据选择器在该对象的类中查找相应的方法实现，并调用该方法。

```objc
[object performSelector:@selector(methodName)];
```

如果对象不能响应某个选择器（即没有实现相应的方法），会抛出运行时异常。为了避免这种情况，通常使用`respondsToSelector:`来确保对象能处理消息。

#### 2.3 带参数的消息传递

消息可以带参数，参数在选择器中用冒号（`:`）表示。

```objc
[myObject setGreeting:@"Hello" andName:@"World"];
```

这里，`setGreeting:andName:`方法带有两个参数。你可以通过选择器动态调用该方法：

```objc
SEL selector = @selector(setGreeting:andName:);
if ([myObject respondsToSelector:selector]) {
    [myObject performSelector:selector withObject:@"Hello" withObject:@"World"];
}
```

### 3. 使用 `performSelector:` 的限制

- `performSelector:` 只能动态调用那些不需要返回值或者返回值为对象的方法。
- 如果方法有多个参数，`performSelector:` 只能处理前两个参数（通过 `withObject:` 方法），对于更复杂的情况，需要使用更低级的运行时函数。

### 4. 动态方法解析

Objective-C运行时还允许你动态解析和添加方法，这可以与消息传递结合使用。比如，如果一个对象接收到的消息没有对应的方法实现，你可以在运行时为这个消息动态添加一个实现。

#### 示例：动态添加方法

```objc
@interface MyClass : NSObject
@end

@implementation MyClass

void dynamicMethodIMP(id self, SEL _cmd) {
    NSLog(@"Dynamic method called!");
}

+ (BOOL)resolveInstanceMethod:(SEL)sel {
    if (sel == @selector(dynamicMethod)) {
        class_addMethod([self class], sel, (IMP)dynamicMethodIMP, "v@:");
        return YES;
    }
    return [super resolveInstanceMethod:sel];
}

@end

int main() {
    MyClass *obj = [[MyClass alloc] init];
    [obj performSelector:@selector(dynamicMethod)];  // 输出：Dynamic method called!
    return 0;
}
```

在这个例子中，`MyClass`动态地为`dynamicMethod`选择器添加了实现，解决了没有找到方法实现的问题。

### 5. 消息转发（Message Forwarding）

当对象接收到一个无法处理的消息时，Objective-C允许你将该消息转发给其他对象进行处理。这是在`NSObject`类中实现的，通过覆盖`forwardInvocation:`方法来实现消息转发。

#### 示例：消息转发

```objc
@interface MyForwardingClass : NSObject
@end

@implementation MyForwardingClass

- (void)forwardInvocation:(NSInvocation *)invocation {
    SEL sel = [invocation selector];
    if ([someOtherObject respondsToSelector:sel]) {
        [invocation invokeWithTarget:someOtherObject];
    } else {
        [super forwardInvocation:invocation];
    }
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    NSMethodSignature *signature = [someOtherObject methodSignatureForSelector:aSelector];
    if (signature) {
        return signature;
    }
    return [super methodSignatureForSelector:aSelector];
}

@end
```

在这个例子中，`MyForwardingClass`会将不能处理的消息转发给`someOtherObject`处理。

## 结构体

在Objective-C中，结构体（struct）是一种用于将多个相关数据组合在一起的数据结构。结构体允许你定义一个复合数据类型，其中可以包含不同类型的成员变量。虽然Objective-C主要是面向对象编程的语言，但结构体依然在处理一些简单数据组合时非常有用。

### 1. 结构体的定义

结构体在Objective-C中使用`struct`关键字定义，语法与C语言中的结构体定义类似。

```objc
struct 结构体名 {
    数据类型 成员名1;
    数据类型 成员名2;
    // ...其他成员
};
```

### 2. 结构体变量的声明和初始化

#### 声明结构体变量

```objc
struct Point p1;
```

在这个例子中，我们声明了一个名为`p1`的`Point`结构体变量。

#### 初始化结构体变量

你可以在声明时初始化结构体变量，也可以在声明后进行初始化。

```objc
struct Point p1 = {10.5, 20.5};
```

或者：

```objc
struct Point p1;
p1.x = 10.5;
p1.y = 20.5;
```

### 3. 访问结构体成员

可以通过点运算符（`.`）访问和修改结构体的成员变量。

```objc
NSLog(@"Point p1: (%.2f, %.2f)", p1.x, p1.y);
p1.x = 15.0;
p1.y = 25.0;
NSLog(@"Updated Point p1: (%.2f, %.2f)", p1.x, p1.y);
```

### 4. 使用结构体作为函数参数或返回值

结构体可以作为函数的参数或返回值。这在需要传递多个相关数据时非常有用。

#### 结构体作为参数：

```objc
void printPoint(struct Point p) {
    NSLog(@"Point: (%.2f, %.2f)", p.x, p.y);
}

struct Point p1 = {10.5, 20.5};
printPoint(p1);
```

#### 结构体作为返回值：

```objc
struct Point createPoint(float x, float y) {
    struct Point p;
    p.x = x;
    p.y = y;
    return p;
}

struct Point p2 = createPoint(5.0, 15.0);
NSLog(@"Created Point p2: (%.2f, %.2f)", p2.x, p2.y);
```

### 5. 结构体类型定义（typedef）

使用`typedef`可以为结构体定义一个新的类型名，使得结构体的使用更加简洁。

```objc
typedef struct {
    float x;
    float y;
} Point;
```

现在你可以直接使用`Point`来声明结构体变量，而不需要每次都写`struct`关键字。

```objc
Point p3 = {30.0, 40.0};
NSLog(@"Point p3: (%.2f, %.2f)", p3.x, p3.y);
```

### 6. 结构体与对象的区别

虽然结构体在Objective-C中可以用于组合多个值，但它们与对象有一些重要的区别：

- **结构体是值类型**：这意味着在赋值、作为参数传递或作为返回值时，结构体的值会被复制。
- **结构体没有方法**：结构体只能包含数据成员，不能包含方法。对象则可以包含方法和属性。
- **内存管理**：结构体的内存管理更简单，因为它们不涉及Objective-C的引用计数机制（如ARC），而对象则需要考虑内存管理。

## 对象

在Objective-C中，对象是面向对象编程（OOP）的核心概念。对象是类的实例，代表了具有属性（数据）和方法（行为）的实体。在Objective-C中，几乎所有的开发都围绕着对象进行。

### 1. 什么是对象

对象是类的一个实例。在Objective-C中，类定义了对象的属性和方法，而对象是类的实际使用实例。通过对象，你可以访问类中定义的属性和调用方法。

### 2. 类与对象的关系

- **类**：类是一个蓝图或模板，定义了对象的属性和行为。类通常由属性（实例变量）和方法（函数）组成。
- **对象**：对象是类的具体实例。通过类可以创建多个对象，每个对象都有独立的属性值。

### 3. 定义一个类

在Objective-C中，类是通过@interface和@implementation关键字来定义的。`.h`文件用于声明类的接口，而`.m`文件用于定义类的实现。

#### 示例：定义一个简单的类

```objc
// Person.h
#import <Foundation/Foundation.h>

@interface Person : NSObject

@property NSString *name;
@property int age;

- (void)sayHello;
- (void)setName:(NSString *)name andAge:(int)age;

@end
```

在这个例子中，`Person`类有两个属性`name`和`age`，并定义了两个方法`sayHello`和`setName:andAge:`。

```objc
// Person.m
#import "Person.h"

@implementation Person

- (void)sayHello {
    NSLog(@"Hello, my name is %@ and I am %d years old.", self.name, self.age);
}

- (void)setName:(NSString *)name andAge:(int)age {
    self.name = name;
    self.age = age;
}

@end
```

在这个实现中，`sayHello`方法用于打印对象的名字和年龄，而`setName:andAge:`方法用于设置对象的名字和年龄。

### 4. 创建和使用对象

#### 创建对象

对象是在类的基础上使用`alloc`和`init`方法来创建的。

```objc
Person *person = [[Person alloc] init];
```

- `alloc`：分配内存，用于创建类的实例。
- `init`：初始化对象，通常用于设置对象的初始状态。

#### 使用对象

一旦创建了对象，你可以通过点语法访问其属性，并使用方括号语法调用其方法。

```objc
person.name = @"Alice";
person.age = 30;
[person sayHello];
```

或者通过调用方法设置属性：

```objc
[person setName:@"Bob" andAge:25];
[person sayHello];
```

### 5. 内存管理

在Objective-C中，内存管理是通过引用计数来实现的。当前，ARC（Automatic Reference Counting）自动管理对象的生命周期，所以你通常不需要手动管理内存。

- **alloc**：为对象分配内存，引用计数+1。
- **retain**：增加对象的引用计数，引用计数+1。
- **release**：减少对象的引用计数，引用计数-1。如果引用计数为0，释放对象的内存。
- **dealloc**：当对象的引用计数为0时，自动调用此方法来清理对象。

使用ARC时，不需要手动调用`retain`和`release`，它们由编译器自动处理。

### 6. 对象的属性

属性是类的实例变量，通过`@property`和`@synthesize`关键词来定义和自动生成访问器方法。

```objc
@property (nonatomic, strong) NSString *name;
```

- **nonatomic**：指定非原子性访问，不会生成线程安全的代码，因此访问速度较快。
- **strong**：表示强引用，ARC会保证对象在其生命周期内不会被释放。

### 7. 对象的继承

Objective-C支持类的继承，一个类可以从另一个类继承属性和方法。

```objc
@interface Student : Person

@property NSString *schoolName;

- (void)study;

@end
```

在这个例子中，`Student`类继承自`Person`类，因此它拥有`Person`类的所有属性和方法，同时可以增加自己的属性和方法。

```objc
@implementation Student

- (void)study {
    NSLog(@"%@ is studying at %@", self.name, self.schoolName);
}

@end
```

### 8. 多态和动态绑定

多态性是面向对象编程的一个重要概念，允许子类对象在不修改代码的情况下被当作父类对象使用。动态绑定意味着在运行时决定调用哪个方法。

```objc
Person *student = [[Student alloc] init];
[student setName:@"Alice" andAge:20];
[(Student *)student setSchoolName:@"Harvard"];
[(Student *)student study];
```

在这个例子中，虽然`student`被声明为`Person`类型，但在运行时它实际上是一个`Student`对象，可以调用`Student`类的方法。

## 拓展

在Objective-C中，扩展类的功能主要有两种方式：**类别（Category）**和**类扩展（Class Extension）**。这两种机制允许你在不修改原始类的情况下，为现有的类添加方法和属性。

### 1. 类别（Category）

**类别（Category）**是一种在不改变类的源代码的情况下为现有类添加新方法的方式。类别非常适合用于将类的功能分成多个独立的部分，或者为现有类添加新功能，而不需要继承或修改原始类。

#### 定义类别

类别的定义通过在现有类名后加上一个括号和类别名来实现。

```objc
// NSString+ReversedString.h
#import <Foundation/Foundation.h>

@interface NSString (ReversedString)

- (NSString *)reversedString;

@end
```

在这个例子中，我们为`NSString`类定义了一个名为`ReversedString`的类别，并添加了一个`reversedString`方法。

#### 实现类别

类别的实现与普通类方法的实现类似，放在`.m`文件中。

```objc
// NSString+ReversedString.m
#import "NSString+ReversedString.h"

@implementation NSString (ReversedString)

- (NSString *)reversedString {
    NSUInteger length = [self length];
    NSMutableString *reversedString = [NSMutableString stringWithCapacity:length];
    
    for (NSInteger i = length - 1; i >= 0; i--) {
        [reversedString appendFormat:@"%C", [self characterAtIndex:i]];
    }
    
    return reversedString;
}

@end
```

这个实现方法会将`NSString`对象的内容反转并返回一个新的字符串。

#### 使用类别

使用类别时，与使用普通类的方法相同：

```objc
NSString *originalString = @"Objective-C";
NSString *reversedString = [originalString reversedString];
NSLog(@"Original: %@, Reversed: %@", originalString, reversedString);
```

输出结果可能为：

```
Original: Objective-C, Reversed: C-evitcejbO
```

#### 类别的注意事项

- **类别不能添加实例变量**：类别只能添加方法，不能添加新的实例变量。
- **方法冲突**：如果类别中的方法名与类中已有方法名相同，类别中的方法将覆盖原方法。这种情况应尽量避免，因为它可能会导致意外行为。

### 2. 类扩展（Class Extension）

**类扩展（Class Extension）**是一种为类添加私有方法或属性的方式。类扩展通常用于在类的内部实现中声明私有属性或方法，这些属性或方法在类的外部不可见。

#### 定义类扩展

类扩展与类别类似，但类扩展没有名称，通常直接在实现文件中定义。

```objc
// MyClass.h
#import <Foundation/Foundation.h>

@interface MyClass : NSObject

@property (nonatomic, strong) NSString *publicProperty;

- (void)publicMethod;

@end
```

```objc
// MyClass.m
#import "MyClass.h"

@interface MyClass ()

@property (nonatomic, strong) NSString *privateProperty;  // 私有属性
- (void)privateMethod;  // 私有方法

@end

@implementation MyClass

- (void)publicMethod {
    NSLog(@"This is a public method.");
}

- (void)privateMethod {
    NSLog(@"This is a private method.");
}

@end
```

在这个例子中，`privateProperty`和`privateMethod`是在类扩展中声明的，因此它们只能在`MyClass`的实现文件中使用，外部不可访问。

#### 使用类扩展

类扩展中的私有方法和属性只能在类的实现文件中使用，不会暴露给类的外部：

```objc
MyClass *obj = [[MyClass alloc] init];
[obj publicMethod];  // 可访问

// 以下代码无法编译通过，因为私有方法和属性在类的外部不可访问
// obj.privateProperty = @"Test";
// [obj privateMethod];
```

#### 类扩展的注意事项

- **私有性**：类扩展中的属性和方法只能在类的内部实现中使用，无法在类的外部访问。
- **增强类的功能**：类扩展常用于类的私有实现部分，增强类的内部功能，而不改变类的外部接口。

### 3. 类别和类扩展的区别

- **类别（Category）**：用于为现有类添加公共方法，通常用于扩展类的功能。类别可以被广泛使用和访问，但不能添加实例变量。
- **类扩展（Class Extension）**：用于在类的实现文件中声明私有方法和属性，通常用于增强类的私有实现部分。类扩展可以添加实例变量，但这些变量和方法只在类内部使用。

## 泛型

泛型（Generics）是Objective-C的一项功能，用于在编写代码时提高类型安全性和代码的可读性。泛型允许你在编译时指定集合类（如`NSArray`、`NSDictionary`、`NSSet`）中元素的类型，从而避免了类型错误，并减少了不必要的类型转换。

### 1. 泛型的基本概念

泛型的主要目标是使代码更强类型，并减少运行时错误。通过使用泛型，你可以明确地告诉编译器集合类中的元素应该是什么类型，编译器将确保这些类型是正确的。

例如，你可以指定一个`NSArray`对象只包含`NSString`类型的元素，编译器会在编译时检查，以确保所有元素都是`NSString`类型。

### 2. 使用泛型的集合类

在Objective-C中，泛型通常用于集合类，如`NSArray`、`NSDictionary`、`NSSet`等。你可以使用尖括号语法来指定集合中元素的类型。

#### 2.1 `NSArray` 泛型

```objc
NSArray<NSString *> *stringArray = @[@"Hello", @"World"];
```

在这个例子中，`stringArray`被声明为一个只包含`NSString`对象的数组。编译器会确保数组中的所有元素都是`NSString`类型。

#### 2.2 `NSDictionary` 泛型

```objc
NSDictionary<NSString *, NSNumber *> *dictionary = @{
    @"One": @1,
    @"Two": @2,
    @"Three": @3
};
```

在这个例子中，`dictionary`被声明为一个字典，其中键为`NSString`类型，值为`NSNumber`类型。编译器会确保字典中的键和值都符合指定的类型。

#### 2.3 `NSSet` 泛型

```objc
NSSet<NSNumber *> *numberSet = [NSSet setWithObjects:@1, @2, @3, nil];
```

在这个例子中，`numberSet`被声明为一个只包含`NSNumber`对象的集合。

### 3. 泛型的优势

- **类型安全**：使用泛型后，编译器在编译时会进行类型检查，确保集合类中的元素都是指定的类型。这减少了运行时错误，并提高了代码的安全性。
- **减少类型转换**：在没有泛型的情况下，你需要频繁地进行类型转换，而使用泛型后，编译器自动识别类型，减少了显式的类型转换。

#### 示例：类型安全

```objc
NSArray<NSString *> *stringArray = @[@"Hello", @"World"];
NSString *str = stringArray[0];  // 类型安全，无需显式转换

// NSArray *genericArray = @[@"Hello", @42];
// NSString *str = genericArray[1];  // 编译时会警告或报错
```

在第一个例子中，由于数组被声明为`NSArray<NSString *>`，编译器知道数组中的元素都是`NSString`，因此不会产生警告或错误。而在第二个例子中，数组没有指定泛型，可能包含不同类型的元素，这样会导致潜在的类型错误。

### 4. 在自定义类中使用泛型

你还可以在自定义的类或方法中使用泛型。例如，创建一个泛型容器类。

#### 示例：自定义泛型类

```objc
@interface Box<__covariant ObjectType> : NSObject
@property (nonatomic, strong) ObjectType object;
@end

@implementation Box
@end
```

你可以使用这个类来存储任何类型的对象，并在使用时指定类型：

```objc
Box<NSString *> *stringBox = [Box new];
stringBox.object = @"Hello";
// stringBox.object = @42;  // 编译错误，类型不匹配

Box<NSNumber *> *numberBox = [Box new];
numberBox.object = @42;
```

### 5. 泛型的协变与逆变

Objective-C中的泛型支持协变（Covariance）和逆变（Contravariance），这允许你在继承结构中使用泛型类型。

- **协变**：使用`__covariant`修饰符，表示泛型类型可以是子类。
- **逆变**：使用`__contravariant`修饰符，表示泛型类型可以是父类。

#### 示例：协变

```objc
@interface Box<__covariant ObjectType> : NSObject
@property (nonatomic, strong) ObjectType object;
@end

Box<NSString *> *stringBox = [Box new];
Box<NSObject *> *objectBox = stringBox;  // 允许，因为NSString是NSObject的子类
```

### 6. 泛型的局限性

- **运行时特性**：泛型在Objective-C中是编译时特性，运行时并没有泛型的类型信息。因此，泛型主要用于编译时的类型检查，不会改变集合类的实际行为。
- **泛型只适用于集合类和自定义类**：泛型不能用于C语言的结构体或普通的C数组。

## 错误处理

在Objective-C中，错误处理有两种主要的机制：**NSError**模式和**异常处理（Exceptions）**。这两种方法各有用途，通常根据应用场景选择合适的错误处理方式。

### 1. NSError 模式

**NSError**是一种常见的错误处理机制，主要用于方法调用时可能出现的可预期错误。`NSError`对象封装了错误信息，可以通过这种机制将错误信息传递给调用者。

#### 1.1 定义和使用 NSError

通常情况下，使用`NSError`处理错误的方法会带有一个指向`NSError`对象的指针参数。如果发生错误，方法会返回`nil`或`NO`，并将错误信息写入`NSError`对象。

```objc
- (BOOL)performTaskWithError:(NSError **)error {
    if (/* 检查某个条件 */) {
        if (error) {
            *error = [NSError errorWithDomain:@"com.example.error"
                                         code:1001
                                     userInfo:@{NSLocalizedDescriptionKey: @"Task failed due to some condition"}];
        }
        return NO;
    }
    // 任务成功
    return YES;
}
```

#### 1.2 调用带 NSError 的方法

在调用此类方法时，可以检查返回值并处理可能的错误。

```objc
NSError *error = nil;
BOOL success = [self performTaskWithError:&error];
if (!success) {
    NSLog(@"Error: %@", error.localizedDescription);
} else {
    NSLog(@"Task completed successfully.");
}
```

在这个例子中，如果任务失败，会创建一个`NSError`对象，并将错误信息传递给调用者。调用者可以根据错误信息作出相应处理。

#### 1.3 NSError 的重要属性

`NSError`类有几个重要的属性，用于提供错误的详细信息：

- **domain**：一个标识错误类型的字符串。通常由反向域名表示，例如`com.apple.foundation`。
- **code**：一个整数值，标识特定错误类型。
- **userInfo**：一个字典，包含与错误相关的附加信息，如错误描述、可能的建议等。
- **localizedDescription**：一个描述错误的本地化字符串，通常用来展示给用户。

#### 1.4 NSError 示例

```objc
NSError *error = [NSError errorWithDomain:NSCocoaErrorDomain
                                     code:NSFileReadNoSuchFileError
                                 userInfo:@{NSLocalizedDescriptionKey: @"File not found"}];

NSLog(@"Error Domain: %@", error.domain);
NSLog(@"Error Code: %ld", (long)error.code);
NSLog(@"Error Description: %@", error.localizedDescription);
```

### 2. 异常处理（Exceptions）

异常处理是另一种错误处理机制，用于处理不可预见或严重的错误，通常是系统级别的错误。异常处理在Objective-C中通过`@try-@catch-@finally`块实现。

#### 2.1 异常处理的结构

- **@try**：包含可能引发异常的代码块。
- **@catch**：用于捕获异常，并执行处理代码。
- **@finally**：无论是否发生异常，最终都会执行的代码块，用于清理工作。

#### 2.2 示例：异常处理

```objc
@try {
    NSArray *array = @[@"One", @"Two"];
    NSLog(@"Element: %@", array[3]);  // 访问越界，可能引发异常
}
@catch (NSException *exception) {
    NSLog(@"Caught an exception: %@", exception.reason);
}
@finally {
    NSLog(@"Finally block executed.");
}
```

在这个例子中，如果访问数组越界，`@try`块中的代码会引发异常，`@catch`块会捕获异常并处理，`@finally`块无论是否发生异常都会执行。

#### 2.3 NSException 类

`NSException`是Objective-C中表示异常的类，包含了以下重要属性：

- **name**：异常的名称，用于标识异常类型。
- **reason**：异常发生的原因，描述异常的情况。
- **userInfo**：附加的用户信息字典，可以包含与异常相关的更多信息。

#### 示例：

```objc
@try {
    @throw [NSException exceptionWithName:@"CustomException"
                                   reason:@"Something went wrong"
                                 userInfo:nil];
}
@catch (NSException *exception) {
    NSLog(@"Caught %@: %@", exception.name, exception.reason);
}
@finally {
    NSLog(@"Execution reached finally block.");
}
```

### 3. NSError 与 异常处理的区别

- **NSError**：适用于处理可预见的、可能发生的错误，通常用于API或方法调用的错误处理，适合应用层级的错误处理。
- **异常处理（Exceptions）**：适用于处理不可预见的、严重的错误，通常是系统级别的错误，不建议在正常的程序流程中使用异常处理。

### 4. 选择使用的机制

- 对于常见的、预期内的错误，例如文件不存在、网络请求失败，通常使用`NSError`模式。
- 对于严重的、不可预期的错误，例如内存访问越界、非法操作，使用异常处理（`@try-@catch-@finally`）更为合适。

## 标准库

Objective-C的标准库包括一组强大的框架和库，这些库提供了丰富的功能，用于开发macOS、iOS、watchOS和tvOS应用程序。Objective-C的标准库通常指的是Foundation框架及其附带的核心库，这些库为数据管理、字符串处理、集合操作、文件系统访问、网络通信等提供了基础功能。

### 1. Foundation 框架

**Foundation**是Objective-C标准库的核心部分，提供了基本的数据类型和集合类，支持文件操作、日期处理、字符串处理等。它是几乎所有Objective-C程序的基础。

#### 1.1 基本数据类型

- **NSString**：用于表示和操作不可变的字符串。
  ```objc
  NSString *str = @"Hello, World!";
  NSString *upperStr = [str uppercaseString];
  ```
- **NSMutableString**：用于表示和操作可变字符串。
  ```objc
  NSMutableString *mutableStr = [NSMutableString stringWithString:@"Hello"];
  [mutableStr appendString:@", World!"];
  ```

- **NSNumber**：用于包装数字类型的对象，支持整数、浮点数和布尔值。
  ```objc
  NSNumber *number = @42;
  NSNumber *boolValue = @YES;
  ```

- **NSArray**：表示不可变的有序集合（数组）。
  ```objc
  NSArray *array = @[@"One", @"Two", @"Three"];
  ```

- **NSMutableArray**：表示可变的有序集合，可以动态增减元素。
  ```objc
  NSMutableArray *mutableArray = [NSMutableArray arrayWithArray:@[@"One", @"Two"]];
  [mutableArray addObject:@"Three"];
  ```

- **NSDictionary**：表示不可变的键值对集合（字典）。
  ```objc
  NSDictionary *dict = @{@"key1": @"value1", @"key2": @"value2"};
  ```

- **NSMutableDictionary**：表示可变的键值对集合，可以动态添加或移除键值对。
  ```objc
  NSMutableDictionary *mutableDict = [NSMutableDictionary dictionaryWithDictionary:@{@"key1": @"value1"}];
  [mutableDict setObject:@"value2" forKey:@"key2"];
  ```

- **NSSet**：表示不可变的无序集合。
  ```objc
  NSSet *set = [NSSet setWithObjects:@"One", @"Two", @"Three", nil];
  ```

- **NSMutableSet**：表示可变的无序集合。
  ```objc
  NSMutableSet *mutableSet = [NSMutableSet setWithObjects:@"One", @"Two", nil];
  [mutableSet addObject:@"Three"];
  ```

#### 1.2 文件操作

Foundation框架提供了处理文件和目录的类，如`NSFileManager`。

```objc
NSFileManager *fileManager = [NSFileManager defaultManager];
NSString *path = @"/path/to/file.txt";

// 检查文件是否存在
if ([fileManager fileExistsAtPath:path]) {
    NSLog(@"File exists.");
} else {
    NSLog(@"File does not exist.");
}
```

#### 1.3 日期和时间

`NSDate`和`NSCalendar`类用于日期和时间处理。

```objc
NSDate *currentDate = [NSDate date];
NSLog(@"Current date and time: %@", currentDate);

NSCalendar *calendar = [NSCalendar currentCalendar];
NSDateComponents *components = [calendar components:(NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay)
                                           fromDate:currentDate];
NSLog(@"Year: %ld, Month: %ld, Day: %ld", (long)components.year, (long)components.month, (long)components.day);
```

#### 1.4 多线程与并发

Foundation框架提供了多种多线程和并发处理的工具，如`NSThread`、`NSOperationQueue`和`GCD（Grand Central Dispatch）`。

```objc
// 使用GCD创建并发队列
dispatch_queue_t queue = dispatch_queue_create("com.example.myqueue", DISPATCH_QUEUE_CONCURRENT);
dispatch_async(queue, ^{
    NSLog(@"Task 1");
});
dispatch_async(queue, ^{
    NSLog(@"Task 2");
});
```

### 2. CoreFoundation 框架

**CoreFoundation**是C语言风格的底层框架，与Foundation框架密切相关，提供了类似的功能，但更低级。CoreFoundation中的类型通常以`CF`开头，如`CFStringRef`（对应`NSString`）和`CFArrayRef`（对应`NSArray`）。

### 3. UIKit 框架

**UIKit**是iOS应用开发的核心框架，提供了用户界面相关的类和功能，包括视图控制器、按钮、标签、表视图、滚动视图等。

#### 3.1 视图与视图控制器

- **UIView**：表示用户界面中的一个矩形区域，可以包含其他视图或控件。
  ```objc
  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
  view.backgroundColor = [UIColor redColor];
  ```

- **UIViewController**：表示视图控制器，管理一组视图和它们的交互。
  ```objc
  @interface MyViewController : UIViewController
  @end

  @implementation MyViewController
  - (void)viewDidLoad {
      [super viewDidLoad];
      self.view.backgroundColor = [UIColor whiteColor];
  }
  @end
  ```

#### 3.2 常用UI控件

- **UIButton**：按钮控件，用户点击后触发动作。
  ```objc
  UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
  [button setTitle:@"Click Me" forState:UIControlStateNormal];
  button.frame = CGRectMake(50, 50, 100, 50);
  [self.view addSubview:button];
  ```

- **UILabel**：用于显示文本的标签。
  ```objc
  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(50, 150, 200, 50)];
  label.text = @"Hello, World!";
  [self.view addSubview:label];
  ```

- **UITableView**：用于显示列表数据的表视图。
  ```objc
  UITableView *tableView = [[UITableView alloc] initWithFrame:self.view.bounds style:UITableViewStylePlain];
  tableView.dataSource = self;
  [self.view addSubview:tableView];
  ```

### 4. CoreData 框架

**CoreData**是一个对象图管理和持久化框架，允许开发者将数据模型与数据库交互进行映射，通常用于存储和管理应用数据。

#### CoreData示例

```objc
// 创建一个新的实体
NSManagedObjectContext *context = ...;  // 通常从AppDelegate中获取
NSManagedObject *newEntity = [NSEntityDescription insertNewObjectForEntityForName:@"EntityName" inManagedObjectContext:context];
[newEntity setValue:@"Sample Data" forKey:@"attributeName"];

// 保存更改
NSError *error = nil;
if (![context save:&error]) {
    NSLog(@"Failed to save - error: %@", [error localizedDescription]);
}
```

### 5. 其他常见框架

- **CoreGraphics**：用于2D绘图和图像处理。
- **QuartzCore**：提供动画和图层处理的功能。
- **AVFoundation**：用于音频和视频处理。
- **CoreLocation**：用于定位和地理信息处理。
- **MapKit**：用于地图显示和导航。

