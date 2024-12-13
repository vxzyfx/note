---
title: Ruby基础
---


Ruby 是一种动态、面向对象的编程语言，广泛用于Web开发，特别是通过Ruby on Rails框架。

## 注释

在 Ruby 中，注释是程序员在代码中添加的文本，解释代码的功能或提供额外的信息。注释不会被解释器执行。Ruby 支持单行注释和多行注释。

### 单行注释

单行注释以 `#` 开头，`#` 后面的所有内容都会被视为注释。

```ruby
# 这是一个单行注释
puts "Hello, Ruby!"  # 这也是一个单行注释
```

### 多行注释

多行注释以 `=begin` 开头，以 `=end` 结尾，适用于需要注释多行内容的情况。

```ruby
=begin
这是一个多行注释的示例。
它可以用于注释多行代码或提供详细的文档。
=end

puts "This is Ruby!"
```

### 注释的最佳实践

- **简洁明了**：注释应该清晰、简洁地说明代码的功能或逻辑。
- **保持同步**：当修改代码时，应同时更新相关注释，确保注释与代码一致。
- **避免过多注释**：注释应当有必要且有意义，过多的注释可能会使代码难以阅读。

### 示例代码

以下是一个带有注释的示例代码，演示了如何使用注释来解释代码的功能：

```ruby
# 定义一个方法，计算两个数的和
def sum(a, b)
  # 返回 a 和 b 的和
  return a + b
end

# 调用 sum 方法，并将结果输出到控制台
result = sum(3, 4)  # 3 和 4 的和是 7
puts "The sum is #{result}"  # 输出结果
```

### 文档注释

Ruby 社区通常使用 RDoc 格式编写文档注释，这样可以生成 HTML 格式的文档。

```ruby
# This is a sample class for demonstration.
#
# Example:
#   person = Person.new("Alice", 30)
#   puts person.introduce
class Person
  # Initializes a new Person object.
  #
  # @param name [String] The name of the person.
  # @param age [Integer] The age of the person.
  def initialize(name, age)
    @name = name
    @age = age
  end

  # Returns a greeting message.
  #
  # @return [String] A greeting message.
  def introduce
    "Hi, I'm #{@name} and I'm #{@age} years old."
  end
end
```

## 变量定义

在 Ruby 中，变量的定义非常灵活，不需要事先声明类型。以下是不同类型的变量及其定义方式：

### 1. 局部变量

局部变量以小写字母或下划线开头，仅在定义它们的方法或代码块中有效。

```ruby
name = "Alice"
age = 25
```

### 2. 全局变量

全局变量以 `$` 符号开头，可以在程序的任何地方访问。这种变量的使用要谨慎，因为它们可能会导致代码难以维护。

```ruby
$global_var = "I am accessible everywhere"
```

### 3. 实例变量

实例变量以 `@` 符号开头，在类的实例中定义和使用。每个实例都有自己的一组实例变量。

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def display_info
    puts "Name: #{@name}, Age: #{@age}"
  end
end

person = Person.new("Bob", 30)
person.display_info  # 输出: Name: Bob, Age: 30
```

### 4. 类变量

类变量以 `@@` 符号开头，在类的所有实例之间共享。这些变量在类定义中使用。

```ruby
class Person
  @@count = 0

  def initialize(name, age)
    @name = name
    @age = age
    @@count += 1
  end

  def self.count
    @@count
  end
end

person1 = Person.new("Alice", 25)
person2 = Person.new("Bob", 30)

puts Person.count  # 输出: 2
```

### 5. 常量

常量以大写字母开头，通常在类或模块中定义。尽管常量可以被改变，但这会触发警告。

```ruby
PI = 3.14

class MathConstants
  E = 2.71
end

puts PI  # 输出: 3.14
puts MathConstants::E  # 输出: 2.71
```

### 6. 并行赋值

Ruby 允许一次定义多个变量，并同时赋值。

```ruby
a, b, c = 1, 2, 3
puts a  # 输出: 1
puts b  # 输出: 2
puts c  # 输出: 3

# 交换变量的值
a, b = b, a
puts a  # 输出: 2
puts b  # 输出: 1
```

### 7. 变量作用域

变量的作用域取决于它们的定义位置和类型：

- 局部变量的作用域在方法、代码块或当前上下文中。
- 全局变量的作用域在整个程序中。
- 实例变量的作用域在类的实例中。
- 类变量的作用域在类的所有实例中。
- 常量的作用域在定义它们的类或模块中。

### 示例代码

```ruby
class Example
  CONST_VAR = "I am a constant"  # 常量

  def initialize
    @instance_var = "I am an instance variable"  # 实例变量
  end

  def display
    local_var = "I am a local variable"  # 局部变量
    puts local_var
    puts @instance_var
    puts CONST_VAR
    puts $global_var  # 全局变量
  end
end

$global_var = "I am accessible everywhere"  # 定义全局变量

example = Example.new
example.display
```

## 变量类型

| 类型       | 描述                              | 示例                                  |
|------------|-----------------------------------|---------------------------------------|
| Integer    | 整数，无小数部分的数字            | `a = 42`, `b = -7`, `c = 0`           |
| Float      | 浮点数，有小数部分的数字          | `x = 3.14`, `y = -2.718`, `z = 0.0`   |
| String     | 字符串，一系列字符                | `str1 = "Hello, world!"`, `str2 = 'Ruby is fun.'` |
| Symbol     | 符号，唯一的标识符                | `sym1 = :my_symbol`, `sym2 = :"another symbol"` |
| Boolean    | 布尔值，表示真或假                | `is_ruby_fun = true`, `is_python_fun = false` |
| Array      | 数组，有序的元素集合              | `arr = [1, 2, 3, "four", 5.0]`        |
| Hash       | 哈希，键值对集合                  | `hash = {name: "Alice", age: 30}`, `hash2 = {"name" => "Bob", "age" => 25}` |
| Range      | 范围，一个区间                    | `range1 = 1..5`, `range2 = 'a'..'z'`, `range3 = 1...5` |
| Nil        | 表示无或没有值                    | `nothing = nil`                       |
| Time       | 时间，表示日期和时间              | `current_time = Time.now`, `past_time = Time.new(2000, 1, 1)` |
| Regexp     | 正则表达式，表示匹配模式          | `regex = /[a-z]+/`                    |
| File       | 文件对象，用于文件操作            | `file = File.open("example.txt", "r")`|
| Class      | 类对象                            | `my_class = String`                   |
| Module     | 模块对象                          | `my_module = Enumerable`              |
| Proc       | 可调用的代码块                    | `proc_example = Proc.new { \|x\| x * 2 }`|
| Lambda     | Lambda，可调用的代码块            | `lambda_example = -> (x) { x * 2 }`   |


## 运算符

### 算术运算符

| 运算符 | 描述     | 示例         |
| ------ | -------- | ------------ |
| `+`    | 加       | `2 + 3`      |
| `-`    | 减       | `5 - 2`      |
| `*`    | 乘       | `3 * 4`      |
| `/`    | 除       | `10 / 2`     |
| `%`    | 取模     | `10 % 3`     |
| `**`   | 幂       | `2 ** 3`     |

### 比较运算符

| 运算符 | 描述               | 示例         |
| ------ | ------------------ | ------------ |
| `==`   | 相等               | `5 == 5`     |
| `!=`   | 不相等             | `5 != 3`     |
| `>`    | 大于               | `5 > 3`      |
| `<`    | 小于               | `3 < 5`      |
| `>=`   | 大于或等于         | `5 >= 5`     |
| `<=`   | 小于或等于         | `3 <= 5`     |
| `<=>`  | 比较（组合比较符） | `5 <=> 3`    |
| `===`  | 相同（case 语句中）| `(1..5) === 3` |

### 赋值运算符

| 运算符 | 描述     | 示例         |
| ------ | -------- | ------------ |
| `=`    | 赋值     | `a = 5`      |
| `+=`   | 加并赋值 | `a += 3`     |
| `-=`   | 减并赋值 | `a -= 2`     |
| `*=`   | 乘并赋值 | `a *= 4`     |
| `/=`   | 除并赋值 | `a /= 2`     |
| `%=`   | 取模并赋值 | `a %= 3`   |
| `**=`  | 幂并赋值 | `a **= 2`    |

### 逻辑运算符

| 运算符 | 描述       | 示例         |
| ------ | ---------- | ------------ |
| `&&`   | 逻辑与     | `true && false` |
| `\|\|` | 逻辑或     | `true \|\| false` |
| `!`    | 逻辑非     | `!true`      |
| `and`  | 逻辑与（低优先级）| `true and false` |
| `or`   | 逻辑或（低优先级）| `true or false` |
| `not`  | 逻辑非（低优先级）| `not true`      |

### 位运算符

| 运算符 | 描述       | 示例         |
| ------ | ---------- | ------------ |
| `&`    | 位与       | `5 & 3`      |
| `\|`   | 位或       | `5 \| 3`     |
| `^`    | 位异或     | `5 ^ 3`      |
| `~`    | 位非       | `~5`         |
| `<<`   | 左移       | `5 << 1`     |
| `>>`   | 右移       | `5 >> 1`     |

### 其他运算符

| 运算符 | 描述       | 示例         |
| ------ | ---------- | ------------ |
| `..`   | 范围（包含结束值） | `(1..5).to_a` |
| `...`  | 范围（不包含结束值）| `(1...5).to_a` |
| `? :`  | 三元条件运算符   | `true ? 'yes' : 'no'` |
| `defined?` | 检查变量是否已定义 | `defined? a` |
| `=~`   | 正则表达式匹配 | `/abc/ =~ 'abcdef'` |
| `!~`   | 正则表达式不匹配 | `/abc/ !~ 'defghi'` |

## 类型转换

### 数字转换

- `to_i`：转换为整数
- `to_f`：转换为浮点数

```ruby
str = "123"
str.to_i  # 123

str = "45.67"
str.to_f  # 45.67

num = 123.45
num.to_i  # 123
```

### 字符串转换

- `to_s`：转换为字符串

```ruby
num = 123
num.to_s  # "123"

float_num = 45.67
float_num.to_s  # "45.67"
```

### 符号转换

- `to_sym` 或 `intern`：转换为符号
- `to_s`：符号转换为字符串

```ruby
str = "hello"
str.to_sym  # :hello

sym = :world
sym.to_s  # "world"
```

### 数组转换

- `to_a`：转换为数组

```ruby
range = (1..5)
range.to_a  # [1, 2, 3, 4, 5]

hash = {a: 1, b: 2}
hash.to_a  # [[:a, 1], [:b, 2]]
```

### 哈希转换

- `to_h`：转换为哈希

```ruby
arr = [[:a, 1], [:b, 2]]
arr.to_h  # {:a=>1, :b=>2}
```

### 布尔值转换

- `!!`：将值转换为布尔值

```ruby
value = "hello"
!!value  # true

value = nil
!!value  # false
```

### 示例代码

以下是一个综合示例，展示了不同类型之间的转换：

```ruby
# 数字到字符串
num = 123
str = num.to_s  # "123"

# 字符串到整数和浮点数
str_num = "456"
int_num = str_num.to_i  # 456
float_num = str_num.to_f  # 456.0

# 字符串到符号
str_sym = "ruby"
sym = str_sym.to_sym  # :ruby

# 符号到字符串
sym_str = sym.to_s  # "ruby"

# 数组到哈希
arr = [[:a, 1], [:b, 2]]
hash = arr.to_h  # {:a=>1, :b=>2}

# 范围到数组
range = (1..5)
arr_from_range = range.to_a  # [1, 2, 3, 4, 5]

# 哈希到数组
hash_to_arr = hash.to_a  # [[:a, 1], [:b, 2]]

# 任意值到布尔值
value = "something"
bool_value = !!value  # true

value = nil
bool_value = !!value  # false
```

## 字符串格式化

在 Ruby 中，有多种方法可以对字符串进行格式化，以便将变量或表达式的值插入到字符串中。以下是一些常见的字符串格式化方法：

### 1. 插值（Interpolation）

插值是 Ruby 中最常用的字符串格式化方法。它允许在双引号字符串或反引号字符串中插入变量或表达式的值。插值使用 `#{}` 语法。

```ruby
name = "Alice"
age = 30

puts "My name is #{name} and I am #{age} years old."  # 输出: My name is Alice and I am 30 years old.
```

### 2. `printf` 和 `sprintf`

`printf` 和 `sprintf` 函数类似于 C 语言中的格式化输出函数。`printf` 直接输出格式化后的字符串，而 `sprintf` 则返回格式化后的字符串。

```ruby
name = "Alice"
age = 30
height = 1.75

# printf 直接输出格式化后的字符串
printf("Name: %s, Age: %d, Height: %.2f meters\n", name, age, height)

# sprintf 返回格式化后的字符串
formatted_string = sprintf("Name: %s, Age: %d, Height: %.2f meters", name, age, height)
puts formatted_string
```

### 3. `format` 方法

`format` 方法是 `sprintf` 的别名，用于返回格式化后的字符串。

```ruby
name = "Alice"
age = 30
height = 1.75

formatted_string = format("Name: %s, Age: %d, Height: %.2f meters", name, age, height)
puts formatted_string  # 输出: Name: Alice, Age: 30, Height: 1.75 meters
```

### 4. `String#%` 运算符

`String#%` 运算符可以用于格式化字符串。它与 `printf` 和 `sprintf` 类似，但语法更加简洁。

```ruby
name = "Alice"
age = 30
height = 1.75

formatted_string = "Name: %s, Age: %d, Height: %.2f meters" % [name, age, height]
puts formatted_string  # 输出: Name: Alice, Age: 30, Height: 1.75 meters
```

### 5. `String#rjust`, `String#ljust`, `String#center`

这些方法用于对字符串进行对齐。

```ruby
str = "Ruby"

puts str.rjust(10)  # 输出: "      Ruby"
puts str.ljust(10)  # 输出: "Ruby      "
puts str.center(10) # 输出: "   Ruby   "
```

### 6. 使用 `String#concat`

`String#concat` 方法用于将多个字符串拼接在一起。

```ruby
str1 = "Hello"
str2 = "World"
str1.concat(", ", str2, "!")

puts str1  # 输出: Hello, World!
```

### 综合示例

以下是一个综合示例，展示了上述不同方法的使用：

```ruby
name = "Bob"
age = 25
balance = 1234.56

# 插值
puts "Name: #{name}, Age: #{age}, Balance: $#{balance}"

# printf
printf("Name: %s, Age: %d, Balance: $%.2f\n", name, age, balance)

# sprintf 和 format
formatted_str = sprintf("Name: %s, Age: %d, Balance: $%.2f", name, age, balance)
puts formatted_str

formatted_str2 = format("Name: %s, Age: %d, Balance: $%.2f", name, age, balance)
puts formatted_str2

# % 运算符
formatted_str3 = "Name: %s, Age: %d, Balance: $%.2f" % [name, age, balance]
puts formatted_str3

# rjust, ljust, center
puts name.rjust(10)
puts name.ljust(10)
puts name.center(10)
```

## 数组

在 Ruby 中，数组是一种用于存储有序元素集合的对象。数组可以包含任意类型的元素，包括数字、字符串、符号、其他数组，甚至是哈希。以下是有关 Ruby 数组的详细介绍，包括创建数组、访问元素、常用方法和操作等。

### 创建数组

可以使用方括号 `[]` 或 `Array.new` 方法来创建数组。

```ruby
# 使用方括号创建数组
arr1 = [1, 2, 3, 4, 5]

# 使用 Array.new 创建数组
arr2 = Array.new  # 创建一个空数组
arr3 = Array.new(3)  # 创建一个包含3个 nil 元素的数组
arr4 = Array.new(3, "default")  # 创建一个包含3个 "default" 元素的数组
```

### 访问元素

可以使用索引来访问数组中的元素，索引从 0 开始。

```ruby
arr = [10, 20, 30, 40, 50]

puts arr[0]  # 输出: 10
puts arr[2]  # 输出: 30
puts arr[-1]  # 输出: 50 (最后一个元素)
puts arr[1..3]  # 输出: [20, 30, 40] (索引从1到3的子数组)
```

### 修改元素

可以通过索引来修改数组中的元素。

```ruby
arr = [1, 2, 3, 4, 5]

arr[0] = 10
puts arr  # 输出: [10, 2, 3, 4, 5]

arr[1..3] = [20, 30]
puts arr  # 输出: [10, 20, 30, 5]
```

### 添加和删除元素

可以使用多种方法来添加和删除数组中的元素。

```ruby
arr = [1, 2, 3]

# 添加元素
arr.push(4)  # 或 arr << 4
puts arr  # 输出: [1, 2, 3, 4]

arr.unshift(0)
puts arr  # 输出: [0, 1, 2, 3, 4]

arr.insert(2, "new")
puts arr  # 输出: [0, 1, "new", 2, 3, 4]

# 删除元素
arr.pop
puts arr  # 输出: [0, 1, "new", 2, 3]

arr.shift
puts arr  # 输出: [1, "new", 2, 3]

arr.delete_at(1)
puts arr  # 输出: [1, 2, 3]
```

### 常用方法

Ruby 提供了许多数组方法，可以方便地对数组进行操作。

```ruby
arr = [5, 3, 8, 2, 4]

# 长度
puts arr.length  # 输出: 5

# 反转
puts arr.reverse  # 输出: [4, 2, 8, 3, 5]

# 排序
puts arr.sort  # 输出: [2, 3, 4, 5, 8]

# 唯一元素
arr2 = [1, 2, 2, 3, 4, 4]
puts arr2.uniq  # 输出: [1, 2, 3, 4]

# 合并数组
arr3 = [9, 10]
puts arr + arr3  # 输出: [5, 3, 8, 2, 4, 9, 10]

# 数组包含元素
puts arr.include?(3)  # 输出: true

# 转换为字符串
puts arr.join(", ")  # 输出: "5, 3, 8, 2, 4"
```

### 迭代

可以使用 `each` 方法来遍历数组中的元素。

```ruby
arr = [1, 2, 3, 4, 5]

arr.each do |element|
  puts element
end
```

### 多维数组

数组可以包含其他数组，从而形成多维数组。

```ruby
multi_arr = [[1, 2], [3, 4], [5, 6]]

puts multi_arr[0][1]  # 输出: 2
puts multi_arr[2][0]  # 输出: 5
```

### 示例代码

以下是一个综合示例，展示了数组的创建、修改和常用方法：

```ruby
# 创建数组
arr = [1, 2, 3, 4, 5]

# 访问和修改元素
puts arr[0]  # 输出: 1
arr[1] = 10
puts arr  # 输出: [1, 10, 3, 4, 5]

# 添加和删除元素
arr.push(6)
puts arr  # 输出: [1, 10, 3, 4, 5, 6]
arr.pop
puts arr  # 输出: [1, 10, 3, 4, 5]

# 常用方法
puts arr.length  # 输出: 5
puts arr.sort  # 输出: [1, 3, 4, 5, 10]
puts arr.include?(3)  # 输出: true

# 迭代
arr.each do |element|
  puts element
end
```

## 哈希

在 Ruby 中，哈希（Hash）是一种用于存储键值对的集合。哈希中的每个键（key）都是唯一的，而每个键对应的值（value）可以是任何对象类型。以下是有关 Ruby 哈希的详细介绍，包括创建哈希、访问和修改元素、常用方法等。

### 创建哈希

可以使用大括号 `{}` 或 `Hash.new` 方法来创建哈希。

```ruby
# 使用大括号创建哈希
hash1 = { "name" => "Alice", "age" => 30, "city" => "Wonderland" }

# 使用符号作为键
hash2 = { name: "Bob", age: 25, city: "Paris" }

# 使用 Hash.new 创建哈希
hash3 = Hash.new  # 创建一个空哈希
hash4 = Hash.new("default_value")  # 创建一个默认值为 "default_value" 的哈希
```

### 访问和修改元素

可以通过键来访问和修改哈希中的元素。

```ruby
hash = { name: "Alice", age: 30, city: "Wonderland" }

# 访问元素
puts hash[:name]  # 输出: Alice
puts hash[:age]  # 输出: 30

# 修改元素
hash[:age] = 31
puts hash[:age]  # 输出: 31

# 添加新元素
hash[:country] = "Wonderland"
puts hash  # 输出: {:name=>"Alice", :age=>31, :city=>"Wonderland", :country=>"Wonderland"}
```

### 删除元素

可以使用 `delete` 方法删除哈希中的元素。

```ruby
hash = { name: "Alice", age: 30, city: "Wonderland" }

# 删除元素
hash.delete(:age)
puts hash  # 输出: {:name=>"Alice", :city=>"Wonderland"}
```

### 常用方法

Ruby 提供了许多哈希方法，可以方便地对哈希进行操作。

```ruby
hash = { name: "Alice", age: 30, city: "Wonderland" }

# 获取所有键
puts hash.keys  # 输出: [:name, :age, :city]

# 获取所有值
puts hash.values  # 输出: ["Alice", 30, "Wonderland"]

# 合并两个哈希
hash2 = { country: "Wonderland", occupation: "Developer" }
merged_hash = hash.merge(hash2)
puts merged_hash  # 输出: {:name=>"Alice", :age=>30, :city=>"Wonderland", :country=>"Wonderland", :occupation=>"Developer"}

# 检查键是否存在
puts hash.key?(:name)  # 输出: true
puts hash.key?(:country)  # 输出: false

# 检查值是否存在
puts hash.value?("Alice")  # 输出: true
puts hash.value?("Developer")  # 输出: false

# 反转键值对
puts hash.invert  # 输出: {"Alice"=>:name, 30=>:age, "Wonderland"=>:city}

# 清空哈希
hash.clear
puts hash  # 输出: {}
```

### 迭代

可以使用 `each` 方法遍历哈希中的键值对。

```ruby
hash = { name: "Alice", age: 30, city: "Wonderland" }

hash.each do |key, value|
  puts "#{key}: #{value}"
end
```

### 默认值

可以在创建哈希时指定默认值，当访问不存在的键时返回该默认值。

```ruby
hash = Hash.new("Not Found")

puts hash[:name]  # 输出: Not Found

# 可以为特定键设置默认值
hash.default = "Unknown"
puts hash[:age]  # 输出: Unknown
```

### 多维哈希

哈希可以包含其他哈希，从而形成多维哈希。

```ruby
multi_hash = {
  person1: { name: "Alice", age: 30 },
  person2: { name: "Bob", age: 25 }
}

puts multi_hash[:person1][:name]  # 输出: Alice
puts multi_hash[:person2][:age]   # 输出: 25
```

### 示例代码

以下是一个综合示例，展示了哈希的创建、修改和常用方法：

```ruby
# 创建哈希
person = { name: "Alice", age: 30, city: "Wonderland" }

# 访问和修改元素
puts person[:name]  # 输出: Alice
person[:age] = 31
puts person[:age]  # 输出: 31

# 添加新元素
person[:country] = "Wonderland"
puts person  # 输出: {:name=>"Alice", :age=>31, :city=>"Wonderland", :country=>"Wonderland"}

# 删除元素
person.delete(:city)
puts person  # 输出: {:name=>"Alice", :age=>31, :country=>"Wonderland"}

# 获取所有键和值
puts person.keys  # 输出: [:name, :age, :country]
puts person.values  # 输出: ["Alice", 31, "Wonderland"]

# 合并哈希
person2 = { occupation: "Developer", hobby: "Reading" }
puts person.merge(person2)  # 输出: {:name=>"Alice", :age=>31, :country=>"Wonderland", :occupation=>"Developer", :hobby=>"Reading"}

# 迭代
person.each do |key, value|
  puts "#{key}: #{value}"
end
```

## 条件语句

在 Ruby 中，条件语句用于根据不同的条件执行不同的代码块。以下是一些常见的条件语句，包括 `if`、`unless`、`case` 等。

### `if` 语句

`if` 语句用于在条件为真时执行代码块。

```ruby
# 基本 if 语句
if condition
  # 执行代码
end

# 带有 else 的 if 语句
if condition
  # 条件为真时执行
else
  # 条件为假时执行
end

# 带有 elsif 的 if 语句
if condition1
  # 条件1为真时执行
elsif condition2
  # 条件2为真时执行
else
  # 条件都为假时执行
end
```

#### 示例

```ruby
age = 25

if age < 18
  puts "You are a minor."
elsif age >= 18 && age <= 65
  puts "You are an adult."
else
  puts "You are a senior."
end
```

### `unless` 语句

`unless` 语句用于在条件为假时执行代码块。

```ruby
# 基本 unless 语句
unless condition
  # 条件为假时执行
end

# 带有 else 的 unless 语句
unless condition
  # 条件为假时执行
else
  # 条件为真时执行
end
```

#### 示例

```ruby
status = "inactive"

unless status == "active"
  puts "The status is not active."
else
  puts "The status is active."
end
```

### `case` 语句

`case` 语句用于基于不同的值执行不同的代码块，类似于其他语言中的 `switch` 语句。

```ruby
# 基本 case 语句
case expression
when value1
  # 当 expression == value1 时执行
when value2
  # 当 expression == value2 时执行
else
  # 当所有条件都不满足时执行
end
```

#### 示例

```ruby
grade = "B"

case grade
when "A"
  puts "Excellent!"
when "B"
  puts "Good!"
when "C"
  puts "Fair!"
when "D"
  puts "Poor!"
else
  puts "Failing!"
end
```

### 单行条件语句

Ruby 支持将条件语句写成单行形式，用于简单的条件判断。

#### `if` 单行形式

```ruby
puts "You are an adult." if age >= 18
```

#### `unless` 单行形式

```ruby
puts "You are a minor." unless age >= 18
```

### 三元操作符

三元操作符是一种简洁的条件判断方式，类似于其他语言中的三元运算符 `?:`。

```ruby
# 三元操作符
condition ? expression_if_true : expression_if_false
```

#### 示例

```ruby
age = 20
status = age >= 18 ? "adult" : "minor"
puts status  # 输出: "adult"
```

### 逻辑运算符

可以使用逻辑运算符 `&&`（与）、`||`（或）和 `!`（非）来组合条件。

```ruby
age = 25
country = "USA"

if age >= 18 && country == "USA"
  puts "You are eligible to vote in the USA."
end

if age < 18 || country != "USA"
  puts "You are not eligible to vote."
end

if !age.nil?
  puts "Age is provided."
end
```

### 综合示例

以下是一个综合示例，展示了各种条件语句的用法：

```ruby
# if 语句
age = 20
if age >= 18
  puts "You are an adult."
else
  puts "You are a minor."
end

# unless 语句
status = "inactive"
unless status == "active"
  puts "The status is not active."
else
  puts "The status is active."
end

# case 语句
grade = "B"
case grade
when "A"
  puts "Excellent!"
when "B"
  puts "Good!"
when "C"
  puts "Fair!"
when "D"
  puts "Poor!"
else
  puts "Failing!"
end

# 单行条件语句
puts "You are an adult." if age >= 18
puts "You are a minor." unless age >= 18

# 三元操作符
status = age >= 18 ? "adult" : "minor"
puts status  # 输出: "adult"

# 逻辑运算符
if age >= 18 && status == "adult"
  puts "You are eligible to vote."
end
```

## 循环

在 Ruby 中，循环用于重复执行一段代码，直到满足某个条件。以下是 Ruby 中常见的循环结构，包括 `while`、`until`、`for`、`each` 等。

### `while` 循环

`while` 循环在条件为真时重复执行代码块。

```ruby
# 基本 while 循环
while condition
  # 执行代码
end
```

#### 示例

```ruby
i = 0
while i < 5
  puts i
  i += 1
end
```

### `until` 循环

`until` 循环在条件为假时重复执行代码块。

```ruby
# 基本 until 循环
until condition
  # 执行代码
end
```

#### 示例

```ruby
i = 0
until i >= 5
  puts i
  i += 1
end
```

### `for` 循环

`for` 循环用于遍历一个范围或一个集合中的元素。

```ruby
# 基本 for 循环
for variable in collection
  # 执行代码
end
```

#### 示例

```ruby
for i in 0..4
  puts i
end
```

### `each` 循环

`each` 方法用于遍历集合（如数组、哈希）中的元素。

```ruby
# 数组的 each 循环
array = [1, 2, 3, 4, 5]
array.each do |element|
  puts element
end

# 哈希的 each 循环
hash = { name: "Alice", age: 30, city: "Wonderland" }
hash.each do |key, value|
  puts "#{key}: #{value}"
end
```

### `times` 循环

`times` 方法用于指定代码块执行的次数。

```ruby
# 基本 times 循环
n.times do
  # 执行代码
end
```

#### 示例

```ruby
5.times do |i|
  puts i
end
```

### `loop` 循环

`loop` 方法用于创建一个无限循环，可以通过 `break` 语句退出循环。

```ruby
loop do
  # 执行代码
  break if condition
end
```

#### 示例

```ruby
i = 0
loop do
  puts i
  i += 1
  break if i >= 5
end
```

### 循环控制

可以使用 `break`、`next` 和 `redo` 控制循环的执行。

- `break`：退出循环
- `next`：跳过当前迭代，进入下一次迭代
- `redo`：重新执行当前迭代

#### 示例

```ruby
# 使用 break
i = 0
while i < 10
  puts i
  i += 1
  break if i == 5
end

# 使用 next
(0..10).each do |i|
  next if i % 2 == 0
  puts i
end

# 使用 redo
i = 0
while i < 5
  puts i
  i += 1
  redo if i == 3
end
```

### 综合示例

以下是一个综合示例，展示了各种循环的用法：

```ruby
# while 循环
i = 0
while i < 5
  puts "while: #{i}"
  i += 1
end

# until 循环
i = 0
until i >= 5
  puts "until: #{i}"
  i += 1
end

# for 循环
for i in 0..4
  puts "for: #{i}"
end

# each 循环
array = [1, 2, 3, 4, 5]
array.each do |element|
  puts "each: #{element}"
end

# 哈希的 each 循环
hash = { name: "Alice", age: 30, city: "Wonderland" }
hash.each do |key, value|
  puts "hash each: #{key}: #{value}"
end

# times 循环
5.times do |i|
  puts "times: #{i}"
end

# loop 循环
i = 0
loop do
  puts "loop: #{i}"
  i += 1
  break if i >= 5
end

# 循环控制示例
# 使用 break
i = 0
while i < 10
  puts "break example: #{i}"
  i += 1
  break if i == 5
end

# 使用 next
(0..10).each do |i|
  next if i % 2 == 0
  puts "next example: #{i}"
end

# 使用 redo
i = 0
while i < 5
  puts "redo example: #{i}"
  i += 1
  redo if i == 3
end
```

## do,redo

在 Ruby 中，`do` 关键字用于定义代码块，`redo` 关键字用于重新执行当前迭代。这两者在循环和代码块中有着重要的应用。以下是对 `do` 和 `redo` 的详细介绍及其用法。

### `do` 关键字

`do` 关键字用于定义一个代码块，通常与迭代方法（如 `each`、`times` 等）或循环结构（如 `while`、`until` 等）一起使用。代码块以 `end` 关键字结束。

#### 示例

```ruby
# 使用 do...end 定义代码块
5.times do |i|
  puts "This is iteration #{i}"
end

# 使用 {} 定义单行代码块（等效于 do...end）
5.times { |i| puts "This is iteration #{i}" }

# 与 each 方法一起使用
[1, 2, 3].each do |num|
  puts num * 2
end

# 与 while 循环一起使用
i = 0
while i < 3 do
  puts "i is #{i}"
  i += 1
end
```

### `redo` 关键字

`redo` 关键字用于重新执行当前的迭代，而不进行条件检查或移动到下一个迭代。它通常在迭代器或循环结构中使用，用于重新尝试当前的迭代。

#### 示例

```ruby
# 使用 redo 重新执行当前迭代
i = 0
while i < 5 do
  puts "i is #{i}"
  i += 1
  redo if i == 3  # 在 i 等于 3 时重新执行当前迭代
end
```

在这个示例中，当 `i` 等于 3 时，`redo` 关键字会导致循环重新执行当前迭代，使得 `i` 再次等于 3，可能导致无限循环。为了避免这种情况，可以使用其他条件或计数器来控制 `redo` 的执行。

#### 另一个示例

```ruby
# 使用 redo 重新尝试输入有效的数字
attempts = 0
begin
  puts "Enter a number greater than 10:"
  num = gets.to_i
  attempts += 1
  redo if num <= 10 && attempts < 3  # 重试最多三次
rescue
  puts "Invalid input. Please try again."
  retry
end
```

### 综合示例

以下是一个综合示例，展示了 `do` 和 `redo` 的结合使用：

```ruby
# 使用 do 和 redo 进行用户输入验证
attempts = 0

3.times do
  puts "Enter a number greater than 10:"
  num = gets.to_i
  attempts += 1
  if num > 10
    puts "Thank you! You entered #{num}."
    break
  elsif attempts < 3
    puts "Invalid number. Try again."
    redo  # 重新尝试当前迭代
  else
    puts "Too many invalid attempts."
  end
end
```

## 函数

### 按定义方式分类

#### 1. 实例方法

实例方法是在类中定义的方法，可以由类的实例调用。

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce
    "Hi, I'm #{@name} and I'm #{@age} years old."
  end
end

person = Person.new("Alice", 30)
puts person.introduce  # 输出: Hi, I'm Alice and I'm 30 years old.
```

#### 2. 类方法

类方法是使用 `self` 关键字或类名定义的方法，可以直接由类调用。

```ruby
class MathHelper
  def self.square(x)
    x * x
  end

  # 或者
  def MathHelper.cube(x)
    x * x * x
  end
end

puts MathHelper.square(4)  # 输出: 16
puts MathHelper.cube(3)    # 输出: 27
```

### 按参数类型分类

#### 1. 无参数方法

无参数方法不接受任何参数。

```ruby
def greet
  "Hello!"
end

puts greet  # 输出: Hello!
```

#### 2. 有参数方法

有参数方法接受一个或多个参数。

```ruby
def add(a, b)
  a + b
end

puts add(2, 3)  # 输出: 5
```

#### 3. 默认参数方法

默认参数方法为参数提供默认值。

```ruby
def greet(name = "stranger")
  "Hello, #{name}!"
end

puts greet       # 输出: Hello, stranger!
puts greet("Alice")  # 输出: Hello, Alice!
```

#### 4. 可变参数方法

可变参数方法可以接受不定数量的参数。

```ruby
def sum(*numbers)
  numbers.reduce(0) { |sum, num| sum + num }
end

puts sum(1, 2, 3)    # 输出: 6
puts sum(4, 5, 6, 7) # 输出: 22
```

### 按作用域分类

#### 1. 私有方法

私有方法只能在类的内部调用，不能被类的实例直接调用。使用 `private` 关键字定义。

```ruby
class Person
  def initialize(name)
    @name = name
  end

  def show_name
    display_name
  end

  private

  def display_name
    "Name: #{@name}"
  end
end

person = Person.new("Alice")
puts person.show_name  # 输出: Name: Alice
# puts person.display_name  # 报错: private method `display_name' called
```

#### 2. 保护方法

保护方法只能在类的内部或子类中调用，不能被类的实例直接调用。使用 `protected` 关键字定义。

```ruby
class Parent
  def initialize(name)
    @name = name
  end

  protected

  def display_name
    "Name: #{@name}"
  end
end

class Child < Parent
  def show_name
    display_name
  end
end

child = Child.new("Alice")
puts child.show_name  # 输出: Name: Alice
# puts child.display_name  # 报错: protected method `display_name' called
```

### 按功能分类

#### 1. 访问器方法

访问器方法用于读取和设置实例变量的值。可以使用 `attr_reader`、`attr_writer` 和 `attr_accessor` 自动生成访问器方法。

```ruby
class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

person = Person.new("Alice", 30)
puts person.name  # 输出: Alice
person.age = 31
puts person.age  # 输出: 31
```

#### 2. 转换方法

转换方法用于将对象转换为其他类型。常见的方法有 `to_s`、`to_i`、`to_f` 等。

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def to_s
    "Name: #{@name}, Age: #{@age}"
  end
end

person = Person.new("Alice", 30)
puts person.to_s  # 输出: Name: Alice, Age: 30
```

#### 3. 操作方法

操作方法执行特定的操作或计算。

```ruby
class MathHelper
  def self.factorial(n)
    return 1 if n == 0
    n * factorial(n - 1)
  end
end

puts MathHelper.factorial(5)  # 输出: 120
```

## 代码块

在 Ruby 中，代码块（Block）是将一组代码封装在一起并传递给方法的一种方式。代码块可以用于迭代、资源管理、延迟执行等场景。代码块可以使用 `do...end` 或 `{}` 定义，并且可以作为方法的参数传递。

### 基本语法

#### 使用 `do...end` 定义代码块

```ruby
3.times do
  puts "Hello, Ruby!"
end
```

#### 使用 `{}` 定义代码块

```ruby
3.times { puts "Hello, Ruby!" }
```

### 代码块与方法

许多 Ruby 方法接受代码块作为参数，并在方法内部使用 `yield` 关键字来调用代码块。

#### 示例：使用 `yield` 调用代码块

```ruby
def greet
  puts "Hello!"
  yield if block_given?  # 检查是否传递了代码块
  puts "Goodbye!"
end

greet { puts "How are you?" }
```

输出：
```
Hello!
How are you?
Goodbye!
```

#### 示例：使用代码块传递参数

```ruby
def greet
  yield("Alice") if block_given?
end

greet { |name| puts "Hello, #{name}!" }
```

输出：
```
Hello, Alice!
```

### 块变量

代码块可以接受一个或多个参数，这些参数在块变量中指定。

#### 示例：块变量

```ruby
[1, 2, 3, 4, 5].each do |number|
  puts number * 2
end
```

输出：
```
2
4
6
8
10
```

### `Proc` 和 `Lambda`

`Proc` 和 `Lambda` 是代码块的对象化形式，允许将代码块存储在变量中，并在以后调用。

#### 创建 `Proc` 对象

```ruby
my_proc = Proc.new { |x| puts x * 2 }
my_proc.call(5)  # 输出: 10
```

#### 创建 `Lambda` 对象

```ruby
my_lambda = ->(x) { puts x * 2 }
my_lambda.call(5)  # 输出: 10
```

#### 区别 `Proc` 和 `Lambda`

- `Lambda` 检查参数数量，`Proc` 不检查。
- `Lambda` 返回时从 `lambda` 返回，`Proc` 返回时从方法返回。

```ruby
def test_lambda
  my_lambda = -> { return "Lambda" }
  my_lambda.call
  "End of method"
end

def test_proc
  my_proc = Proc.new { return "Proc" }
  my_proc.call
  "End of method"
end

puts test_lambda  # 输出: End of method
puts test_proc    # 输出: Proc
```

### `yield` 和 `block_given?`

可以使用 `yield` 关键字在方法内部调用传递的代码块。使用 `block_given?` 可以检查是否提供了代码块。

#### 示例：`yield` 和 `block_given?`

```ruby
def display_message
  puts "Start of method"
  yield if block_given?
  puts "End of method"
end

display_message { puts "Inside the block" }
```

输出：
```
Start of method
Inside the block
End of method
```

### 综合示例

以下是一个综合示例，展示了代码块、`Proc` 和 `Lambda` 的用法：

```ruby
# 使用代码块进行迭代
def custom_each(array)
  for element in array
    yield(element)
  end
end

custom_each([1, 2, 3, 4, 5]) { |num| puts num * 2 }

# 使用 Proc 和 Lambda
my_proc = Proc.new { |x| puts "Proc: #{x * 2}" }
my_lambda = ->(x) { puts "Lambda: #{x * 2}" }

[1, 2, 3].each(&my_proc)
[1, 2, 3].each(&my_lambda)

# 方法中使用 yield 和 block_given?
def execute_block
  if block_given?
    puts "Block is given!"
    yield
  else
    puts "No block provided."
  end
end

execute_block { puts "Hello from block!" }
execute_block
```

## 类

在 Ruby 中，类（Class）是面向对象编程的基础。类是对象的蓝图或模板，它定义了对象的属性（变量）和行为（方法）。以下是关于 Ruby 类的详细介绍，包括定义类、创建对象、实例变量和方法、类变量和方法、继承和模块等。

### 定义类

可以使用 `class` 关键字定义一个类。

```ruby
class Person
  # 类的内容
end
```

### 创建对象

使用 `new` 方法创建类的实例（对象）。

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def display_info
    "Name: #{@name}, Age: #{@age}"
  end
end

person = Person.new("Alice", 30)
puts person.display_info  # 输出: Name: Alice, Age: 30
```

### 实例变量和方法

实例变量以 `@` 开头，用于存储对象的属性。实例方法用于定义对象的行为。

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def display_info
    "Name: #{@name}, Age: #{@age}"
  end
end
```

### 访问器方法

可以使用 `attr_reader`、`attr_writer` 和 `attr_accessor` 自动生成访问器方法。

```ruby
class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

person = Person.new("Alice", 30)
puts person.name  # 输出: Alice
person.age = 31
puts person.age  # 输出: 31
```

### 类变量和方法

类变量以 `@@` 开头，类方法使用 `self` 或类名定义。

```ruby
class Person
  @@count = 0

  def initialize(name, age)
    @name = name
    @age = age
    @@count += 1
  end

  def self.count
    @@count
  end
end

person1 = Person.new("Alice", 30)
person2 = Person.new("Bob", 25)
puts Person.count  # 输出: 2
```

### 继承

使用 `<` 关键字实现继承，子类可以继承父类的属性和方法。

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def display_info
    "Name: #{@name}, Age: #{@age}"
  end
end

class Student < Person
  def initialize(name, age, grade)
    super(name, age)
    @grade = grade
  end

  def display_info
    "#{super}, Grade: #{@grade}"
  end
end

student = Student.new("Charlie", 20, "A")
puts student.display_info  # 输出: Name: Charlie, Age: 20, Grade: A
```

### 模块

模块用于组织方法和常量，可以作为命名空间或混入类中以增加功能。

```ruby
module Greetable
  def greet
    "Hello!"
  end
end

class Person
  include Greetable

  def initialize(name)
    @name = name
  end

  def display_name
    "Name: #{@name}"
  end
end

person = Person.new("Alice")
puts person.greet  # 输出: Hello!
puts person.display_name  # 输出: Name: Alice
```

### 综合示例

以下是一个综合示例，展示了类的定义、实例变量和方法、类变量和方法、继承和模块的使用：

```ruby
# 模块定义
module Describable
  def describe
    "This is a #{self.class.name}."
  end
end

# 父类定义
class Person
  include Describable  # 混入模块

  attr_accessor :name, :age
  @@count = 0

  def initialize(name, age)
    @name = name
    @age = age
    @@count += 1
  end

  def display_info
    "Name: #{@name}, Age: #{@age}"
  end

  def self.count
    @@count
  end
end

# 子类定义
class Student < Person
  attr_accessor :grade

  def initialize(name, age, grade)
    super(name, age)
    @grade = grade
  end

  def display_info
    "#{super}, Grade: #{@grade}"
  end
end

# 创建对象并调用方法
person = Person.new("Alice", 30)
student = Student.new("Charlie", 20, "A")

puts person.display_info  # 输出: Name: Alice, Age: 30
puts person.describe      # 输出: This is a Person.
puts Student.count        # 输出: 2
puts student.display_info # 输出: Name: Charlie, Age: 20, Grade: A
puts student.describe     # 输出: This is a Student.
```

## 异常处理

在 Ruby 中，异常处理用于处理程序执行过程中可能发生的错误或异常情况。通过使用异常处理机制，可以在捕获异常时执行特定的代码，而不让程序崩溃。Ruby 提供了 `begin-rescue-end` 块、`ensure` 块、`else` 块和自定义异常等功能来实现异常处理。

### 基本异常处理

#### `begin-rescue-end` 块

使用 `begin-rescue-end` 块来捕获和处理异常。

```ruby
begin
  # 可能引发异常的代码
  result = 10 / 0
rescue ZeroDivisionError => e
  # 处理 ZeroDivisionError 异常
  puts "Error: #{e.message}"
end
```

#### 示例

```ruby
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Cannot divide by zero: #{e.message}"
end
```

### `ensure` 块

`ensure` 块中的代码无论是否发生异常都会执行，通常用于清理资源或执行收尾工作。

```ruby
begin
  # 可能引发异常的代码
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
ensure
  puts "This will always be executed."
end
```

### `else` 块

`else` 块中的代码在没有发生异常时执行。

```ruby
begin
  # 可能引发异常的代码
  result = 10 / 2
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
else
  puts "No errors occurred. Result is #{result}"
ensure
  puts "This will always be executed."
end
```

### 自定义异常

可以定义自定义异常类，通过继承 `StandardError` 类来实现。

```ruby
class CustomError < StandardError
end

def risky_method
  raise CustomError, "Something went wrong!"
end

begin
  risky_method
rescue CustomError => e
  puts "Caught a custom error: #{e.message}"
end
```

### 多个 `rescue` 子句

可以在 `begin-rescue-end` 块中使用多个 `rescue` 子句来捕获不同类型的异常。

```ruby
begin
  # 可能引发异常的代码
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "ZeroDivisionError: #{e.message}"
rescue StandardError => e
  puts "StandardError: #{e.message}"
end
```

### 重试

可以使用 `retry` 关键字在捕获异常后重新执行 `begin` 块。

```ruby
attempts = 0

begin
  attempts += 1
  puts "Attempt #{attempts}"
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
  retry if attempts < 3
ensure
  puts "This will always be executed."
end
```

### 综合示例

以下是一个综合示例，展示了各种异常处理的用法：

```ruby
class CustomError < StandardError
end

def divide(a, b)
  raise CustomError, "Custom error: b cannot be zero!" if b == 0
  a / b
end

begin
  puts "Result: #{divide(10, 2)}"
  puts "Result: #{divide(10, 0)}"
rescue CustomError => e
  puts "Caught a custom error: #{e.message}"
rescue ZeroDivisionError => e
  puts "Caught a division error: #{e.message}"
else
  puts "No errors occurred."
ensure
  puts "This will always be executed."
end
```

## 标准库

Ruby 的标准库（Standard Library）包含了大量有用的类和模块，用于各种常见的编程任务。标准库随 Ruby 一起分发，无需额外安装。以下是一些常用的标准库及其功能简介和示例代码。

### 1. `File` 和 `Dir`

用于文件和目录操作。

#### 示例

```ruby
# 读取文件内容
content = File.read("example.txt")
puts content

# 写入文件内容
File.write("example.txt", "Hello, Ruby!")

# 列出目录中的文件
Dir.entries(".").each do |entry|
  puts entry
end
```

### 2. `JSON`

用于处理 JSON 数据。

#### 示例

```ruby
require 'json'

# 将哈希转换为 JSON 字符串
hash = { name: "Alice", age: 30 }
json_str = JSON.generate(hash)
puts json_str  # 输出: {"name":"Alice","age":30}

# 将 JSON 字符串转换为哈希
parsed_hash = JSON.parse(json_str)
puts parsed_hash["name"]  # 输出: Alice
```

### 3. `Net::HTTP`

用于进行 HTTP 请求。

#### 示例

```ruby
require 'net/http'
require 'uri'

uri = URI("http://example.com")
response = Net::HTTP.get(uri)
puts response
```

### 4. `Time` 和 `Date`

用于处理日期和时间。

#### 示例

```ruby
require 'time'
require 'date'

# 获取当前时间
current_time = Time.now
puts current_time

# 解析时间字符串
parsed_time = Time.parse("2023-08-07 12:34:56")
puts parsed_time

# 创建日期对象
date = Date.new(2023, 8, 7)
puts date

# 日期计算
next_week = date + 7
puts next_week
```

### 5. `Set`

用于存储不重复的元素集合。

#### 示例

```ruby
require 'set'

# 创建一个集合
set = Set.new([1, 2, 3, 4, 5])
puts set.include?(3)  # 输出: true

# 添加和删除元素
set.add(6)
set.delete(2)
puts set.to_a  # 输出: [1, 3, 4, 5, 6]
```

### 6. `Math`

提供基本的数学方法和常量。

#### 示例

```ruby
# 计算平方根
puts Math.sqrt(16)  # 输出: 4.0

# 计算三角函数
puts Math.sin(Math::PI / 2)  # 输出: 1.0
```

### 7. `Digest`

用于计算字符串的哈希值。

#### 示例

```ruby
require 'digest'

# 计算 MD5 哈希
md5 = Digest::MD5.hexdigest("Hello, world!")
puts md5  # 输出: fc3ff98e8c6a0d3087d515c0473f8677

# 计算 SHA256 哈希
sha256 = Digest::SHA256.hexdigest("Hello, world!")
puts sha256  # 输出: 64ec88ca00b268e5ba1a35678a1b5316d212f4f36631a3f62de1fac2016a4c41
```

### 8. `OpenURI`

用于简化打开 URI 的操作，通常用于下载文件或读取网络资源。

#### 示例

```ruby
require 'open-uri'

# 从 URL 读取内容
content = URI.open("http://example.com").read
puts content
```

### 9. `ERB`

用于嵌入 Ruby 代码到文本中，通常用于生成动态内容。

#### 示例

```ruby
require 'erb'

# 定义模板
template = "Hello, <%= name %>!"
name = "Alice"

# 渲染模板
erb = ERB.new(template)
result = erb.result(binding)
puts result  # 输出: Hello, Alice!
```

### 10. `CSV`

用于处理 CSV 文件。

#### 示例

```ruby
require 'csv'

# 读取 CSV 文件
CSV.foreach("example.csv") do |row|
  puts row.inspect
end

# 写入 CSV 文件
CSV.open("example.csv", "wb") do |csv|
  csv << ["Name", "Age", "City"]
  csv << ["Alice", 30, "Wonderland"]
end
```

### 综合示例

以下是一个综合示例，展示了如何使用多个标准库来完成一些常见任务：

```ruby
require 'json'
require 'net/http'
require 'uri'
require 'digest'
require 'csv'

# 下载 JSON 数据
uri = URI("https://jsonplaceholder.typicode.com/posts")
response = Net::HTTP.get(uri)
posts = JSON.parse(response)

# 处理数据并计算哈希值
posts.each do |post|
  title = post["title"]
  body = post["body"]
  hash = Digest::SHA256.hexdigest(body)

  puts "Title: #{title}"
  puts "Body: #{body}"
  puts "Hash: #{hash}"
  puts "-" * 40
end

# 保存数据到 CSV 文件
CSV.open("posts.csv", "wb") do |csv|
  csv << ["ID", "Title", "Body", "Hash"]
  posts.each do |post|
    title = post["title"]
    body = post["body"]
    hash = Digest::SHA256.hexdigest(body)
    csv << [post["id"], title, body, hash]
  end
end
```
