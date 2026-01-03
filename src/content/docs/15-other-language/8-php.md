---
title: PHP语法基础
---

PHP（超文本预处理器）是一种广泛应用于Web开发的通用开源脚本语言。

## PHP的关键点

1. **服务器端脚本**：PHP在服务器上执行，生成HTML并发送到客户端。客户端接收脚本结果，而不会看到底层代码。
2. **语法**：PHP代码嵌入在HTML中，PHP代码以 `<?php` 开始，以 `?>` 结束。
3. **解释性语言**：PHP脚本逐行执行。
4. **跨平台**：PHP在多个平台上可用，包括Windows、Linux和macOS。
5. **开源**：PHP是免费的，拥有大量的社区支持。
6. **数据库集成**：PHP可以轻松连接各种数据库，如MySQL、PostgreSQL等。

## 注释
PHP支持三种类型的注释：单行注释、多行注释和文档注释。

### 单行注释
单行注释可以使用 `//` 或 `#` 来表示，注释内容位于符号后面，直到行末结束。

```php
<?php
// 这是一个单行注释
echo "Hello, World!"; // 这也是一个单行注释

# 这是另一个单行注释
echo "Hello again!";
?>
```

### 多行注释
多行注释使用 `/* ... */`，注释内容可以跨越多行，非常适合较长的说明。

```php
<?php
/*
  这是一个多行注释
  可以跨越多行
  用于详细的说明
*/
echo "Hello, World!";
?>
```

### 文档注释
文档注释使用 `/** ... */`，通常用于对函数、类或文件进行说明，便于自动生成文档。

```php
<?php
/**
 * 这是一个文档注释
 * 用于描述函数或类
 */
function exampleFunction() {
    echo "This is an example function.";
}

/**
 * 类示例
 *
 * 这是一个示例类，展示了文档注释的用法
 */
class ExampleClass {
    /**
     * 示例方法
     *
     * 这是一个示例方法，展示了文档注释的用法
     */
    public function exampleMethod() {
        echo "This is an example method.";
    }
}
?>
```

## 变量声明

在PHP中，变量声明非常简单，只需要使用美元符号 `$` 作为变量前缀，后面跟上变量名即可。变量名区分大小写，并且必须以字母或下划线 `_` 开头，后面可以跟字母、数字或下划线。

### 变量声明的基本语法
```php
<?php
$variableName = "变量值"; // 声明一个字符串变量
$number = 123;           // 声明一个整数变量
$float = 123.45;         // 声明一个浮点数变量
$boolean = true;         // 声明一个布尔值变量
$array = array(1, 2, 3); // 声明一个数组变量
?>
```
### 变量命名规则

1. 变量名必须以字母或下划线开头（例如：`$name` 或 `$_name`）。
2. 变量名不能以数字开头（例如：`$1name` 是非法的）。
3. 变量名只能包含字母、数字和下划线（例如：`$name_123` 是合法的）。
4. 变量名是区分大小写的（例如：`$name` 和 `$Name` 是两个不同的变量）。

### 变量的作用域

1. **局部变量**：在函数内部声明的变量，其作用域仅限于该函数内部。
2. **全局变量**：在函数外部声明的变量，可以在整个脚本中访问，但需要在函数内部使用 `global` 关键字引用。
3. **静态变量**：在函数内部使用 `static` 关键字声明的变量，其值在函数调用结束后不会消失。

#### 局部变量示例
```php
<?php
function myFunction() {
    $localVar = "I am local";
    echo $localVar;
}

myFunction();
// echo $localVar; // 这行会报错，因为 $localVar 只在函数内有效
?>
```

#### 全局变量示例
```php
<?php
$globalVar = "I am global";

function myFunction() {
    global $globalVar;
    echo $globalVar;
}

myFunction(); // 输出 "I am global"
?>
```

#### 静态变量示例
```php
<?php
function myCounter() {
    static $count = 0;
    echo $count;
    $count++;
}

myCounter(); // 输出 0
myCounter(); // 输出 1
myCounter(); // 输出 2
?>
```

## 变量类型

### 变量类型表格

| 变量类型   | 描述                                                                                       | 示例                                            |
|------------|--------------------------------------------------------------------------------------------|-------------------------------------------------|
| 字符串 (String) | 字符串是由一系列字符组成的文本。可以使用单引号或双引号来定义。                                | `$string = "Hello, World!";`                    |
| 整数 (Integer)  | 整数是没有小数部分的数字，可以是正数或负数。                                               | `$integer = 42;`                                |
| 浮点数 (Float/Double) | 浮点数是带有小数部分的数字。                                                        | `$float = 3.14;`                                |
| 布尔值 (Boolean) | 布尔值只有两个可能的值：`true` 或 `false`。                                               | `$boolean = true;`                              |
| 数组 (Array)   | 数组是一个可以存储多个值的变量。可以使用 `array()` 函数来定义。                               | `$array = array(1, 2, 3);`                      |
| 对象 (Object)  | 对象是由类的实例化而生成的。类是包含属性和方法的结构。                                        | `class MyClass { public $property = "value"; } $object = new MyClass();` |
| NULL           | NULL 是一个特殊值，表示变量没有值。                                                       | `$nullVar = NULL;`                              |
| 资源 (Resource) | 资源是由特殊函数生成并用来引用外部资源的变量，例如数据库连接。                                 | `$resource = fopen("file.txt", "r");`           |

### 示例代码

#### 字符串
```php
<?php
$string = "Hello, World!";
echo $string;
?>
```

#### 整数
```php
<?php
$integer = 42;
echo $integer;
?>
```

#### 浮点数
```php
<?php
$float = 3.14;
echo $float;
?>
```

#### 布尔值
```php
<?php
$boolean = true;
if ($boolean) {
    echo "This is true.";
}
?>
```

#### 数组
```php
<?php
$array = array(1, 2, 3, 4, 5);
echo $array[0]; // 输出 1
?>
```

#### 对象
```php
<?php
class MyClass {
    public $property = "I am a property";
}

$object = new MyClass();
echo $object->property;
?>
```

#### NULL
```php
<?php
$nullVar = NULL;
var_dump($nullVar); // 输出 NULL
?>
```

#### 资源
```php
<?php
$resource = fopen("file.txt", "r");
if ($resource) {
    echo "File opened successfully.";
    fclose($resource);
}
?>
```

## 运算符

以下是PHP中常见的运算符及其描述的表格：

| 运算符类型      | 运算符    | 描述                                                                                     | 示例                               |
|-----------------|-----------|------------------------------------------------------------------------------------------|------------------------------------|
| 赋值运算符      | `=`       | 将右边的值赋给左边的变量。                                                               | `$x = 10;`                         |
| 算术运算符      | `+`       | 加法，将两个操作数相加。                                                                 | `$x + $y`                          |
|                 | `-`       | 减法，从第一个操作数中减去第二个操作数。                                                 | `$x - $y`                          |
|                 | `*`       | 乘法，将两个操作数相乘。                                                                 | `$x * $y`                          |
|                 | `/`       | 除法，将第一个操作数除以第二个操作数。                                                   | `$x / $y`                          |
|                 | `%`       | 取模，返回除法的余数。                                                                   | `$x % $y`                          |
|                 | `**`      | 幂运算，返回第一个操作数的第二个操作数次方。                                             | `$x ** $y`                         |
| 递增/递减运算符 | `++`      | 递增，将变量的值加1。                                                                    | `++$x` 或 `$x++`                   |
|                 | `--`      | 递减，将变量的值减1。                                                                    | `--$x` 或 `$x--`                   |
| 比较运算符      | `==`      | 等于，如果两个操作数相等，则返回true。                                                   | `$x == $y`                         |
|                 | `===`     | 全等，如果两个操作数相等，且类型相同，则返回true。                                       | `$x === $y`                        |
|                 | `!=`      | 不等，如果两个操作数不相等，则返回true。                                                 | `$x != $y`                         |
|                 | `<>`      | 不等，同`!=`。                                                                           | `$x <> $y`                         |
|                 | `!==`     | 不全等，如果两个操作数不相等，或类型不同，则返回true。                                   | `$x !== $y`                        |
|                 | `>`       | 大于，如果第一个操作数大于第二个操作数，则返回true。                                     | `$x > $y`                          |
|                 | `<`       | 小于，如果第一个操作数小于第二个操作数，则返回true。                                     | `$x < $y`                          |
|                 | `>=`      | 大于等于，如果第一个操作数大于或等于第二个操作数，则返回true。                           | `$x >= $y`                         |
|                 | `<=`      | 小于等于，如果第一个操作数小于或等于第二个操作数，则返回true。                           | `$x <= $y`                         |
| 逻辑运算符      | `&&`      | 逻辑与，两个操作数都为true，则返回true。                                                 | `$x && $y`                         |
|                 | `\|\|`    | 逻辑或，两个操作数中至少有一个为true，则返回true。                                      | `$x \|\| $y`                       |
|                 | `!`       | 逻辑非，取反，如果操作数为true，则返回false；反之亦然。                                   | `!$x`                              |
| 字符串运算符    | `.`       | 连接，将两个字符串连接。                                                                 | `$x . $y`                          |
| 数组运算符      | `+`       | 联合，将两个数组合并。                                                                   | `$x + $y`                          |
|                 | `==`      | 相等，如果两个数组具有相同的键/值对，则返回true。                                        | `$x == $y`                         |
|                 | `===`     | 全等，如果两个数组具有相同的键/值对，且顺序和类型相同，则返回true。                      | `$x === $y`                        |
|                 | `!=`      | 不等，如果两个数组不相等，则返回true。                                                   | `$x != $y`                         |
|                 | `<>`      | 不等，同`!=`。                                                                           | `$x <> $y`                         |
|                 | `!==`     | 不全等，如果两个数组不全等，则返回true。                                                 | `$x !== $y`                        |
| 三元运算符      | `?:`      | 三元条件运算符，简写的条件语句。                                                         | `$x = (条件) ? true : false;`      |
| null合并运算符  | `??`      | 如果第一个操作数存在且不为null，则返回其值；否则返回第二个操作数的值。                   | `$x = $y ?? 'default';`            |
| 位运算符        | `&`       | 按位与，将两个数的每个位进行AND运算。                                                     | `$x & $y`                          |
|                 | `\|`      | 按位或，将两个数的每个位进行OR运算。                                                      | `$x \| $y`                         |
|                 | `^`       | 按位异或，将两个数的每个位进行XOR运算。                                                   | `$x ^ $y`                          |
|                 | `~`       | 按位取反，对数的每个位进行取反操作。                                                     | `~$x`                              |
|                 | `<<`      | 左移，将数的位向左移指定的位数。                                                          | `$x << 1`                          |
|                 | `>>`      | 右移，将数的位向右移指定的位数。                                                          | `$x >> 1`                          |

### 示例代码

#### 算术运算符
```php
<?php
$x = 10;
$y = 2;
echo $x + $y; // 输出 12
echo $x - $y; // 输出 8
echo $x * $y; // 输出 20
echo $x / $y; // 输出 5
echo $x % $y; // 输出 0
echo $x ** $y; // 输出 100
?>
```

#### 比较运算符
```php
<?php
$x = 10;
$y = 20;
var_dump($x == $y);  // bool(false)
var_dump($x != $y);  // bool(true)
var_dump($x < $y);   // bool(true)
var_dump($x > $y);   // bool(false)
var_dump($x <= $y);  // bool(true)
var_dump($x >= $y);  // bool(false)
?>
```

#### 逻辑运算符
```php
<?php
$x = true;
$y = false;
var_dump($x && $y);  // bool(false)
var_dump($x || $y);  // bool(true)
var_dump(!$x);       // bool(false)
?>
```

#### 三元运算符
```php
<?php
$age = 18;
$status = ($age >= 18) ? "成年人" : "未成年人";
echo $status; // 输出 "成年人"
?>
```

#### null合并运算符
```php
<?php
$username = $_GET['user'] ?? '匿名用户';
echo $username; // 如果没有传递 'user' 参数，则输出 '匿名用户'
?>
```

#### 字符串运算符
```php
<?php
$firstName = "John";
$lastName = "Doe";
echo $firstName . " " . $lastName; // 输出 "John Doe"
?>
```

## 字符串格式化

### 1. 插值
插值是指直接在双引号字符串中嵌入变量。

```php
<?php
$name = "Alice";
echo "Hello, $name!"; // 输出: Hello, Alice!
?>
```

### 2. 拼接
使用 `.` 运算符将多个字符串拼接在一起。

```php
<?php
$firstName = "John";
$lastName = "Doe";
echo $firstName . " " . $lastName; // 输出: John Doe
?>
```

### 3. sprintf()
`sprintf()` 函数是一个功能强大的字符串格式化函数，类似于C语言中的 `printf()` 函数。它返回一个格式化的字符串。

```php
<?php
$number = 123;
$float = 3.14159;
$formatString = sprintf("Integer: %d, Float: %.2f", $number, $float);
echo $formatString; // 输出: Integer: 123, Float: 3.14
?>
```

#### 常用的格式说明符
- `%s` - 字符串
- `%d` - 整数
- `%f` - 浮点数
- `%x` - 十六进制整数（小写）
- `%X` - 十六进制整数（大写）
- `%b` - 二进制数
- `%e` - 科学计数法
- `%%` - 百分号

### 4. printf()
`printf()` 函数类似于 `sprintf()`，但它直接输出格式化后的字符串，而不是返回它。

```php
<?php
$price = 9.99;
$quantity = 3;
printf("Price: $%.2f, Quantity: %d", $price, $quantity); // 输出: Price: $9.99, Quantity: 3
?>
```

### 5. 使用花括号（{}）和 `str_replace`
通过使用花括号和 `str_replace` 函数，可以创建模板字符串，并将变量插入其中。

```php
<?php
$template = "Hello, {name}!";
$name = "Alice";
$message = str_replace("{name}", $name, $template);
echo $message; // 输出: Hello, Alice!
?>
```

### 6. 使用命名占位符和 `strtr`
`strtr()` 函数允许你使用命名占位符进行字符串替换。

```php
<?php
$template = "Hello, {name}! You have {count} new messages.";
$data = array('{name}' => 'Alice', '{count}' => 5);
$message = strtr($template, $data);
echo $message; // 输出: Hello, Alice! You have 5 new messages.
?>
```

### 7. heredoc 语法
heredoc 是另一种定义字符串的方式，允许多行字符串并且可以直接嵌入变量。

```php
<?php
$name = "Alice";
$message = <<<EOD
Hello, $name!
This is a multi-line string.
EOD;
echo $message; // 输出多行字符串
?>
```

### 8. nowdoc 语法
nowdoc 类似于 heredoc，但不会解析其中的变量。它使用单引号定义。

```php
<?php
$name = "Alice";
$message = <<<'EOD'
Hello, $name!
This will not parse the variable.
EOD;
echo $message; // 输出: Hello, $name!
?>
```

### 9. vsprintf() 和 vprintf()
`vsprintf()` 和 `vprintf()` 类似于 `sprintf()` 和 `printf()`，但它们接受数组作为参数。

```php
<?php
$data = array(9.99, 3);
$format = "Price: $%.2f, Quantity: %d";
$message = vsprintf($format, $data);
echo $message; // 输出: Price: $9.99, Quantity: 3
?>
```

```php
<?php
$data = array(9.99, 3);
$format = "Price: $%.2f, Quantity: %d";
vprintf($format, $data); // 输出: Price: $9.99, Quantity: 3
?>
```

## 类型转换

### 自动类型转换

PHP是一种弱类型语言，这意味着它会在必要时自动转换变量的类型。例如，在算术运算中，如果一个操作数是字符串，PHP会自动将其转换为数字。

```php
<?php
$number = "123"; // 这是一个字符串
$sum = $number + 10; // 自动将字符串 "123" 转换为整数 123
echo $sum; // 输出: 133
?>
```

### 显式类型转换

你可以使用显式类型转换来强制转换变量的类型。以下是一些常见的类型转换：

#### 转换为整数（int）
```php
<?php
$var = "123.45";
$intVar = (int)$var;
echo $intVar; // 输出: 123
?>
```

#### 转换为浮点数（float/double）
```php
<?php
$var = "123.45";
$floatVar = (float)$var;
echo $floatVar; // 输出: 123.45
?>
```

#### 转换为字符串（string）
```php
<?php
$var = 12345;
$stringVar = (string)$var;
echo $stringVar; // 输出: "12345"
?>
```

#### 转换为布尔值（boolean/bool）
```php
<?php
$var = 1;
$boolVar = (bool)$var;
echo $boolVar; // 输出: 1 (true)
?>
```

#### 转换为数组（array）
```php
<?php
$var = "Hello";
$arrayVar = (array)$var;
print_r($arrayVar); // 输出: Array ( [0] => Hello )
?>
```

#### 转换为对象（object）
```php
<?php
$var = "Hello";
$objectVar = (object)$var;
echo $objectVar->scalar; // 输出: Hello
?>
```

### 使用 `settype()` 函数进行类型转换

PHP还提供了一个 `settype()` 函数，可以用来在运行时设置变量的类型。

```php
<?php
$var = "123.45";
settype($var, "integer");
echo $var; // 输出: 123
?>
```

#### `settype()` 函数支持的类型
- `boolean`
- `integer`
- `float` (或 `double`)
- `string`
- `array`
- `object`
- `null`

### 使用 `intval()`、`floatval()`、`strval()` 等函数进行类型转换

PHP提供了一些函数用于转换特定类型的值。

#### `intval()` - 转换为整数
```php
<?php
$var = "123.45";
$intVar = intval($var);
echo $intVar; // 输出: 123
?>
```

#### `floatval()` - 转换为浮点数
```php
<?php
$var = "123.45";
$floatVar = floatval($var);
echo $floatVar; // 输出: 123.45
?>
```

#### `strval()` - 转换为字符串
```php
<?php
$var = 12345;
$stringVar = strval($var);
echo $stringVar; // 输出: "12345"
?>
```

## 数组

在PHP中，数组是一种非常强大和灵活的数据结构。它们可以存储多个值，并且每个值都可以通过一个键（索引）来访问。PHP中的数组有两种主要类型：索引数组和关联数组。以下是关于PHP数组的详细介绍及其使用示例。

### 索引数组

索引数组是使用数字索引来访问元素的数组。

#### 创建索引数组
```php
<?php
// 使用 array() 函数创建
$colors = array("Red", "Green", "Blue");

// 使用短数组语法创建（PHP 5.4+）
$colors = ["Red", "Green", "Blue"];
?>
```

#### 访问索引数组元素
```php
<?php
$colors = ["Red", "Green", "Blue"];
echo $colors[0]; // 输出: Red
?>
```

#### 添加元素到索引数组
```php
<?php
$colors = ["Red", "Green"];
$colors[] = "Blue"; // 添加 "Blue" 到数组末尾
?>
```

#### 循环遍历索引数组
```php
<?php
$colors = ["Red", "Green", "Blue"];
foreach ($colors as $color) {
    echo $color . "<br>";
}
?>
```

### 关联数组

关联数组使用字符串键来访问元素。

#### 创建关联数组
```php
<?php
$ages = array("Peter" => 35, "Ben" => 37, "Joe" => 43);

// 使用短数组语法创建（PHP 5.4+）
$ages = ["Peter" => 35, "Ben" => 37, "Joe" => 43];
?>
```

#### 访问关联数组元素
```php
<?php
$ages = ["Peter" => 35, "Ben" => 37, "Joe" => 43];
echo $ages["Peter"]; // 输出: 35
?>
```

#### 添加元素到关联数组
```php
<?php
$ages = ["Peter" => 35, "Ben" => 37];
$ages["Joe"] = 43; // 添加 "Joe" => 43 到数组
?>
```

#### 循环遍历关联数组
```php
<?php
$ages = ["Peter" => 35, "Ben" => 37, "Joe" => 43];
foreach ($ages as $name => $age) {
    echo "$name is $age years old.<br>";
}
?>
```

### 多维数组

多维数组是包含一个或多个数组的数组。最常见的是二维数组。

#### 创建多维数组
```php
<?php
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
?>
```

#### 访问多维数组元素
```php
<?php
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
echo $matrix[1][2]; // 输出: 6
?>
```

#### 循环遍历多维数组
```php
<?php
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

foreach ($matrix as $row) {
    foreach ($row as $element) {
        echo $element . " ";
    }
    echo "<br>";
}
?>
```

### 常用数组函数

PHP提供了许多内置函数来处理数组，以下是一些常用的数组函数：

- `count($array)`：返回数组中的元素数量。
- `array_merge($array1, $array2)`：合并两个或多个数组。
- `array_push($array, $value)`：将一个或多个元素压入数组的末尾。
- `array_pop($array)`：弹出数组末尾的元素。
- `array_keys($array)`：返回数组中所有的键名。
- `array_values($array)`：返回数组中所有的值。
- `in_array($value, $array)`：检查某个值是否在数组中。

#### 示例
```php
<?php
$colors = ["Red", "Green", "Blue"];
echo count($colors); // 输出: 3

$more_colors = ["Yellow", "Purple"];
$all_colors = array_merge($colors, $more_colors);
print_r($all_colors); // 输出: Array ( [0] => Red [1] => Green [2] => Blue [3] => Yellow [4] => Purple )

array_push($colors, "Black");
print_r($colors); // 输出: Array ( [0] => Red [1] => Green [2] => Blue [3] => Black )

$last_color = array_pop($colors);
echo $last_color; // 输出: Black

$keys = array_keys($ages);
print_r($keys); // 输出: Array ( [0] => Peter [1] => Ben [2] => Joe )

$values = array_values($ages);
print_r($values); // 输出: Array ( [0] => 35 [1] => 37 [2] => 43 )

if (in_array("Red", $colors)) {
    echo "Red is in the array.";
}
?>
```

## 条件语句

### 1. if 语句

`if` 语句用于在条件为真时执行一段代码。

```php
<?php
$age = 20;

if ($age >= 18) {
    echo "你已经成年了。";
}
?>
```

### 2. if...else 语句

`if...else` 语句在条件为真时执行一段代码，否则执行另一段代码。

```php
<?php
$age = 16;

if ($age >= 18) {
    echo "你已经成年了。";
} else {
    echo "你还未成年。";
}
?>
```

### 3. if...elseif...else 语句

`if...elseif...else` 语句用于检查多个条件。

```php
<?php
$score = 85;

if ($score >= 90) {
    echo "成绩优异！";
} elseif ($score >= 80) {
    echo "成绩良好。";
} elseif ($score >= 70) {
    echo "成绩一般。";
} else {
    echo "需要努力。";
}
?>
```

### 4. switch 语句

`switch` 语句用于在多个可能的条件块中执行一个。

```php
<?php
$day = "Wednesday";

switch ($day) {
    case "Monday":
        echo "今天是星期一";
        break;
    case "Tuesday":
        echo "今天是星期二";
        break;
    case "Wednesday":
        echo "今天是星期三";
        break;
    case "Thursday":
        echo "今天是星期四";
        break;
    case "Friday":
        echo "今天是星期五";
        break;
    case "Saturday":
        echo "今天是星期六";
        break;
    case "Sunday":
        echo "今天是星期日";
        break;
    default:
        echo "无效的日期";
}
?>
```

### 5. 三元运算符（Ternary Operator）

三元运算符是 `if...else` 语句的简写形式，用于简化代码。

```php
<?php
$age = 18;

$status = ($age >= 18) ? "成年" : "未成年";
echo $status; // 输出: 成年
?>
```

### 6. Null 合并运算符

Null 合并运算符用于检查变量是否存在且不为 null。

```php
<?php
$username = $_GET['user'] ?? '匿名用户';
echo $username; // 如果没有传递 'user' 参数，则输出 '匿名用户'
?>
```

### 综合示例

以下示例结合了多种条件语句的使用。

```php
<?php
$age = 20;
$gender = "female";

if ($age >= 18 && $gender == "female") {
    echo "你是成年女性。";
} elseif ($age >= 18 && $gender == "male") {
    echo "你是成年男性。";
} else {
    echo "你未成年。";
}

$day = "Monday";

switch ($day) {
    case "Monday":
    case "Wednesday":
    case "Friday":
        echo "今天有课。";
        break;
    case "Tuesday":
    case "Thursday":
        echo "今天没有课。";
        break;
    default:
        echo "无效的日期";
}

$is_member = true;
$discount = $is_member ? 0.1 : 0.05;
echo "你的折扣是 " . ($discount * 100) . "%。";

$nickname = $_GET['nickname'] ?? '游客';
echo "你好，" . $nickname;
?>
```

## 循环语句

### 1. while 循环

`while` 循环在给定条件为真时重复执行代码块。

#### 语法
```php
while (condition) {
    // code to be executed
}
```

#### 示例
```php
<?php
$x = 1;

while ($x <= 5) {
    echo "数字是: $x <br>";
    $x++;
}
?>
```

### 2. do...while 循环

`do...while` 循环先执行一次代码块，然后在条件为真时继续重复执行。

#### 语法
```php
do {
    // code to be executed
} while (condition);
```

#### 示例
```php
<?php
$x = 1;

do {
    echo "数字是: $x <br>";
    $x++;
} while ($x <= 5);
?>
```

### 3. for 循环

`for` 循环用于执行指定次数的代码块。

#### 语法
```php
for (initialization; condition; increment) {
    // code to be executed
}
```

#### 示例
```php
<?php
for ($x = 0; $x <= 10; $x++) {
    echo "数字是: $x <br>";
}
?>
```

### 4. foreach 循环

`foreach` 循环用于遍历数组中的每个元素。

#### 语法
```php
foreach ($array as $value) {
    // code to be executed
}
```
或
```php
foreach ($array as $key => $value) {
    // code to be executed
}
```

#### 示例
```php
<?php
$colors = ["红色", "绿色", "蓝色"];

foreach ($colors as $color) {
    echo "颜色是: $color <br>";
}
?>
```

#### 关联数组示例
```php
<?php
$age = ["Peter" => 35, "Ben" => 37, "Joe" => 43];

foreach ($age as $name => $value) {
    echo "$name 年龄是: $value <br>";
}
?>
```

### 使用循环的综合示例

以下是一个结合多种循环语句的示例。

```php
<?php
// while 循环示例
$i = 1;
while ($i <= 5) {
    echo "while 循环: 计数 $i <br>";
    $i++;
}

// do...while 循环示例
$j = 1;
do {
    echo "do...while 循环: 计数 $j <br>";
    $j++;
} while ($j <= 5);

// for 循环示例
for ($k = 1; $k <= 5; $k++) {
    echo "for 循环: 计数 $k <br>";
}

// foreach 循环示例（索引数组）
$colors = ["红色", "绿色", "蓝色"];
foreach ($colors as $color) {
    echo "foreach 循环（索引数组）: 颜色 $color <br>";
}

// foreach 循环示例（关联数组）
$ages = ["Peter" => 35, "Ben" => 37, "Joe" => 43];
foreach ($ages as $name => $age) {
    echo "foreach 循环（关联数组）: $name 年龄 $age <br>";
}
?>
```

### 控制循环

在循环中，可以使用 `break` 和 `continue` 语句来控制循环的执行。

#### break 语句
`break` 语句用于终止循环。

```php
<?php
for ($x = 0; $x < 10; $x++) {
    if ($x == 5) {
        break;
    }
    echo "数字是: $x <br>";
}
?>
```

#### continue 语句
`continue` 语句用于跳过当前迭代，继续下一次迭代。

```php
<?php
for ($x = 0; $x < 10; $x++) {
    if ($x == 5) {
        continue;
    }
    echo "数字是: $x <br>";
}
?>
```

## 函数

### 1. 用户定义函数

用户定义函数是由开发者创建的函数，用于封装重复使用的代码片段。

#### 语法
```php
function functionName($parameter1, $parameter2, ...) {
    // 函数体
    return $result;
}
```

#### 示例
```php
<?php
function add($a, $b) {
    return $a + $b;
}

echo add(2, 3); // 输出: 5
?>
```

### 2. 内置函数

PHP提供了许多内置函数来完成各种任务，如字符串操作、数组处理、数学计算等。

#### 示例
```php
<?php
// 字符串函数
echo strlen("Hello World!"); // 输出: 12

// 数组函数
$array = array(1, 2, 3, 4, 5);
echo array_sum($array); // 输出: 15

// 数学函数
echo sqrt(16); // 输出: 4
?>
```

### 3. 匿名函数（闭包）

匿名函数（Closure）没有函数名，可以作为变量值传递或作为参数传递给其他函数。

#### 语法
```php
$variable = function($parameter1, $parameter2, ...) {
    // 函数体
    return $result;
};
```

#### 示例
```php
<?php
$greet = function($name) {
    return "Hello, $name";
};

echo $greet("World"); // 输出: Hello, World
?>
```

### 4. 递归函数

递归函数是调用自身的函数，通常用于处理分层数据结构或执行重复任务。

#### 示例
```php
<?php
function factorial($n) {
    if ($n <= 1) {
        return 1;
    } else {
        return $n * factorial($n - 1);
    }
}

echo factorial(5); // 输出: 120
?>
```

### 5. 可变函数

在PHP中，函数名可以存储在变量中，并通过这个变量调用函数。

#### 示例
```php
<?php
function sayHello() {
    echo "Hello!";
}

$functionName = "sayHello";
$functionName(); // 输出: Hello!
?>
```

### 6. 参数默认值

在定义函数时，可以为参数指定默认值，如果调用函数时没有提供参数，则使用默认值。

#### 示例
```php
<?php
function greet($name = "Guest") {
    return "Hello, $name!";
}

echo greet(); // 输出: Hello, Guest!
echo greet("Alice"); // 输出: Hello, Alice!
?>
```

### 7. 可变数量的参数

使用 `...` 语法，可以定义一个函数接受可变数量的参数。

#### 示例
```php
<?php
function sum(...$numbers) {
    return array_sum($numbers);
}

echo sum(1, 2, 3, 4); // 输出: 10
?>
```

### 8. 传引用参数

在函数定义中使用 `&` 符号，可以让函数参数通过引用传递，这样函数内部对参数的修改会影响到函数外部的变量。

#### 示例
```php
<?php
function addFive(&$number) {
    $number += 5;
}

$num = 10;
addFive($num);
echo $num; // 输出: 15
?>
```

### 综合示例

以下是一个结合多种函数类型的综合示例：

```php
<?php
// 用户定义函数
function multiply($a, $b) {
    return $a * $b;
}

// 匿名函数
$divide = function($a, $b) {
    if ($b == 0) {
        return "Division by zero error!";
    }
    return $a / $b;
};

// 递归函数
function fibonacci($n) {
    if ($n <= 1) {
        return $n;
    } else {
        return fibonacci($n - 1) + fibonacci($n - 2);
    }
}

// 参数默认值
function greet($name = "Guest") {
    return "Hello, $name!";
}

// 可变数量的参数
function sum(...$numbers) {
    return array_sum($numbers);
}

// 传引用参数
function increment(&$number) {
    $number++;
}

// 调用函数
echo multiply(4, 5) . "<br>"; // 输出: 20
echo $divide(10, 2) . "<br>"; // 输出: 5
echo fibonacci(6) . "<br>"; // 输出: 8
echo greet() . "<br>"; // 输出: Hello, Guest!
echo greet("Alice") . "<br>"; // 输出: Hello, Alice!
echo sum(1, 2, 3, 4, 5) . "<br>"; // 输出: 15

$num = 10;
increment($num);
echo $num; // 输出: 11
?>
```

## 类

在PHP中，类（Class）是面向对象编程（OOP）的基本构建块。类定义了对象的属性和方法，并可以通过实例化类来创建对象。

### 定义类

一个简单的类包含属性和方法。类中的属性用于存储数据，而方法用于定义行为。

```php
<?php
class Person {
    // 属性
    public $name;
    public $age;

    // 构造函数
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    // 方法
    public function introduce() {
        echo "你好，我是 $this->name，我今年 $this->age 岁。";
    }
}
?>
```

### 实例化类

使用 `new` 关键字来创建类的实例。

```php
<?php
// 创建对象
$person1 = new Person("小明", 25);

// 调用对象的方法
$person1->introduce(); // 输出: 你好，我是 小明，我今年 25 岁。
?>
```

### 访问和修改属性

可以通过对象来访问和修改类的属性。

```php
<?php
// 创建对象
$person1 = new Person("小明", 25);

// 访问属性
echo $person1->name; // 输出: 小明

// 修改属性
$person1->age = 26;
$person1->introduce(); // 输出: 你好，我是 小明，我今年 26 岁。
?>
```

### 类的继承

PHP支持类的继承，可以通过 `extends` 关键字来实现。

```php
<?php
class Person {
    public $name;
    public $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function introduce() {
        echo "你好，我是 $this->name，我今年 $this->age 岁。";
    }
}

// 子类
class Student extends Person {
    public $school;

    public function __construct($name, $age, $school) {
        parent::__construct($name, $age);
        $this->school = $school;
    }

    public function introduce() {
        echo "你好，我是 $this->name，我今年 $this->age 岁，我在 $this->school 上学。";
    }
}

// 创建子类对象
$student1 = new Student("小红", 20, "北京大学");
$student1->introduce(); // 输出: 你好，我是 小红，我今年 20 岁，我在 北京大学 上学。
?>
```

### 访问控制

PHP中的属性和方法可以有三种访问控制修饰符：`public`、`protected` 和 `private`。

- `public`：公共的，可以在任何地方访问。
- `protected`：受保护的，可以在类内部及其子类中访问。
- `private`：私有的，只能在类内部访问。

```php
<?php
class Person {
    public $name;      // 公共属性
    protected $age;    // 受保护属性
    private $salary;   // 私有属性

    public function __construct($name, $age, $salary) {
        $this->name = $name;
        $this->age = $age;
        $this->salary = $salary;
    }

    public function introduce() {
        echo "你好，我是 $this->name，我今年 $this->age 岁。";
    }

    protected function getAge() {
        return $this->age;
    }

    private function getSalary() {
        return $this->salary;
    }
}
?>
```

### 静态属性和方法

使用 `static` 关键字定义静态属性和方法，可以直接通过类名来访问。

```php
<?php
class Math {
    public static $pi = 3.14159;

    public static function add($a, $b) {
        return $a + $b;
    }
}

// 访问静态属性
echo Math::$pi; // 输出: 3.14159

// 调用静态方法
echo Math::add(5, 10); // 输出: 15
?>
```

### 接口

接口使用 `interface` 关键字定义，接口中的方法在实现类中必须被定义。

```php
<?php
interface Animal {
    public function makeSound();
}

class Dog implements Animal {
    public function makeSound() {
        echo "汪汪";
    }
}

class Cat implements Animal {
    public function makeSound() {
        echo "喵喵";
    }
}

// 创建对象
$dog = new Dog();
$cat = new Cat();

$dog->makeSound(); // 输出: 汪汪
$cat->makeSound(); // 输出: 喵喵
?>
```

### 抽象类

抽象类使用 `abstract` 关键字定义，不能实例化，必须由子类继承并实现抽象方法。

```php
<?php
abstract class Vehicle {
    protected $color;

    public function __construct($color) {
        $this->color = $color;
    }

    abstract public function drive();
}

class Car extends Vehicle {
    public function drive() {
        echo "开车，颜色是 $this->color";
    }
}

// 创建对象
$car = new Car("红色");
$car->drive(); // 输出: 开车，颜色是 红色
?>
```

### 综合示例

以下是一个综合示例，展示了类、继承、访问控制、静态方法和属性、接口和抽象类的使用。

```php
<?php
// 接口
interface Animal {
    public function makeSound();
}

// 抽象类
abstract class Vehicle {
    protected $color;

    public function __construct($color) {
        $this->color = $color;
    }

    abstract public function drive();
}

// 实现接口的类
class Dog implements Animal {
    public function makeSound() {
        echo "汪汪<br>";
    }
}

// 继承抽象类的类
class Car extends Vehicle {
    public function drive() {
        echo "开车，颜色是 $this->color<br>";
    }
}

// 带有静态属性和方法的类
class Math {
    public static $pi = 3.14159;

    public static function add($a, $b) {
        return $a + $b;
    }
}

// 创建对象并调用方法
$dog = new Dog();
$dog->makeSound(); // 输出: 汪汪

$car = new Car("红色");
$car->drive(); // 输出: 开车，颜色是 红色

echo "圆周率: " . Math::$pi . "<br>"; // 输出: 圆周率: 3.14159
echo "5 + 10 = " . Math::add(5, 10); // 输出: 5 + 10 = 15
?>
```

## 标准库

### 1. 字符串函数

#### 示例
```php
<?php
// 获取字符串长度
echo strlen("Hello World!"); // 输出: 12

// 查找子字符串
echo strpos("Hello World!", "World"); // 输出: 6

// 字符串替换
echo str_replace("World", "PHP", "Hello World!"); // 输出: Hello PHP!

// 转换为小写
echo strtolower("Hello World!"); // 输出: hello world!

// 转换为大写
echo strtoupper("Hello World!"); // 输出: HELLO WORLD!
?>
```

### 2. 数组函数

#### 示例
```php
<?php
$array = [1, 2, 3, 4, 5];

// 数组合并
$merged = array_merge([1, 2], [3, 4, 5]);
print_r($merged); // 输出: Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 )

// 数组元素个数
echo count($array); // 输出: 5

// 数组求和
echo array_sum($array); // 输出: 15

// 数组反转
$reversed = array_reverse($array);
print_r($reversed); // 输出: Array ( [0] => 5 [1] => 4 [2] => 3 [3] => 2 [4] => 1 )

// 检查元素是否在数组中
echo in_array(3, $array); // 输出: 1 (true)
?>
```

### 3. 文件处理函数

#### 示例
```php
<?php
// 读取文件内容
$content = file_get_contents("example.txt");
echo $content;

// 写入文件内容
file_put_contents("example.txt", "Hello World!");

// 检查文件是否存在
if (file_exists("example.txt")) {
    echo "文件存在";
}

// 删除文件
unlink("example.txt");
?>
```

### 4. 日期和时间函数

#### 示例
```php
<?php
// 获取当前日期和时间
echo date("Y-m-d H:i:s"); // 输出格式: 2023-08-07 12:34:56

// 创建日期时间对象
$date = new DateTime();
echo $date->format('Y-m-d H:i:s');

// 日期加减
$date->modify('+1 day');
echo $date->format('Y-m-d H:i:s'); // 输出明天的日期

// 获取时间戳
echo time(); // 输出当前时间戳

// 将时间戳转换为日期
echo date("Y-m-d H:i:s", 1609459200); // 输出: 2021-01-01 00:00:00
?>
```

### 5. 数学函数

#### 示例
```php
<?php
// 绝对值
echo abs(-5); // 输出: 5

// 向上取整
echo ceil(4.3); // 输出: 5

// 向下取整
echo floor(4.7); // 输出: 4

// 随机数
echo rand(1, 10); // 输出: 1到10之间的随机数

// 平方根
echo sqrt(16); // 输出: 4
?>
```

### 6. 会话和Cookie

#### 示例
```php
<?php
// 开启会话
session_start();

// 设置会话变量
$_SESSION["username"] = "admin";

// 获取会话变量
echo $_SESSION["username"]; // 输出: admin

// 设置Cookie
setcookie("user", "admin", time() + (86400 * 30), "/"); // 86400 = 1 天

// 获取Cookie
if (isset($_COOKIE["user"])) {
    echo $_COOKIE["user"]; // 输出: admin
}
?>
```

### 7. cURL（用于HTTP请求）

#### 示例
```php
<?php
// 初始化cURL会话
$ch = curl_init();

// 设置cURL选项
curl_setopt($ch, CURLOPT_URL, "https://www.example.com/");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// 执行cURL会话
$output = curl_exec($ch);

// 关闭cURL会话
curl_close($ch);

// 输出结果
echo $output;
?>
```

### 8. JSON处理

#### 示例
```php
<?php
// 将数组转换为JSON字符串
$array = ["name" => "John", "age" => 30];
$json = json_encode($array);
echo $json; // 输出: {"name":"John","age":30}

// 将JSON字符串转换为数组
$json = '{"name":"John","age":30}';
$array = json_decode($json, true);
print_r($array); // 输出: Array ( [name] => John [age] => 30 )
?>
```

### 9. 数据库操作（MySQLi）

#### 示例
```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 执行查询
$sql = "SELECT id, name FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
    }
} else {
    echo "0 结果";
}

// 关闭连接
$conn->close();
?>
```

## 异常处理

在PHP中，错误和异常处理是确保程序健壮性的重要组成部分。PHP提供了几种处理错误和异常的方法，包括使用 `try...catch` 块捕获异常、使用自定义错误处理函数以及日志记录错误。以下是有关PHP错误和异常处理的详细介绍和示例。

### 异常处理

#### 1. `try...catch` 语句

`try...catch` 块用于捕获和处理异常。当 `try` 块中的代码抛出异常时，程序控制会立即跳转到对应的 `catch` 块。

```php
<?php
try {
    // 可能抛出异常的代码
    $result = 10 / 0;
} catch (Exception $e) {
    // 处理异常
    echo '捕获异常: ',  $e->getMessage(), "\n";
}
?>
```

#### 2. `throw` 关键字

可以使用 `throw` 关键字手动抛出异常。

```php
<?php
function divide($a, $b) {
    if ($b == 0) {
        throw new Exception("除数不能为零");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (Exception $e) {
    echo '捕获异常: ',  $e->getMessage(), "\n";
}
?>
```

#### 3. 自定义异常类

可以创建自定义异常类以处理特定类型的错误。

```php
<?php
class CustomException extends Exception {}

function test($num) {
    if ($num > 1) {
        throw new CustomException("值必须小于或等于1");
    }
    return true;
}

try {
    test(2);
} catch (CustomException $e) {
    echo '捕获自定义异常: ',  $e->getMessage(), "\n";
} catch (Exception $e) {
    echo '捕获常规异常: ',  $e->getMessage(), "\n";
}
?>
```

### 错误处理

#### 1. 使用 `set_error_handler()` 设置自定义错误处理函数

可以定义自定义错误处理函数，并使用 `set_error_handler()` 函数进行设置。

```php
<?php
function customError($errno, $errstr) {
    echo "错误: [$errno] $errstr\n";
}

// 设置错误处理函数
set_error_handler("customError");

// 触发错误
echo($test);
?>
```

#### 2. 使用 `error_log()` 记录错误

`error_log()` 函数可以将错误记录到服务器日志或指定文件中。

```php
<?php
$test = 2;
if ($test > 1) {
    error_log("变量值必须小于等于1", 3, "/var/tmp/my-errors.log");
}
?>
```

#### 3. 使用 `register_shutdown_function()` 处理致命错误

可以使用 `register_shutdown_function()` 注册一个在脚本执行完成或退出之前运行的函数，以捕获致命错误。

```php
<?php
function shutdownHandler() {
    $error = error_get_last();
    if ($error) {
        echo "致命错误: {$error['message']} 在 {$error['file']} 第 {$error['line']} 行\n";
    }
}

// 注册关闭函数
register_shutdown_function("shutdownHandler");

// 触发致命错误
nonExistingFunction();
?>
```

### 综合示例

以下是一个结合异常处理和错误处理的综合示例：

```php
<?php
// 自定义错误处理函数
function customError($errno, $errstr, $errfile, $errline) {
    echo "错误: [$errno] $errstr - 在 $errfile 第 $errline 行\n";
    error_log("错误: [$errno] $errstr - 在 $errfile 第 $errline 行", 3, "/var/tmp/my-errors.log");
}

// 设置错误处理函数
set_error_handler("customError");

// 自定义异常类
class CustomException extends Exception {}

function divide($a, $b) {
    if ($b == 0) {
        throw new CustomException("除数不能为零");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (CustomException $e) {
    echo '捕获自定义异常: ',  $e->getMessage(), "\n";
} catch (Exception $e) {
    echo '捕获常规异常: ',  $e->getMessage(), "\n";
}

// 注册关闭函数
register_shutdown_function("shutdownHandler");

function shutdownHandler() {
    $error = error_get_last();
    if ($error) {
        echo "致命错误: {$error['message']} 在 {$error['file']} 第 {$error['line']} 行\n";
    }
}

// 触发致命错误
nonExistingFunction();
?>
```

