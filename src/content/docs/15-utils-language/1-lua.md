---
title: Lua语言
---

Lua是一种轻量级、嵌入式的脚本语言，设计用于嵌入到其他应用程序中，作为其扩展和配置语言。Lua的语法简洁、易学，同时也具备强大的功能。下面是Lua语法的基本介绍：

## 注释
在 Lua 中，注释用于在代码中添加解释说明，这些说明不会影响代码的执行。Lua 提供了两种注释方式：单行注释和多行注释。

### 1. 单行注释

单行注释以两个短横线（`--`）开头，从 `--` 到行尾的内容都被视为注释。

#### 示例代码

```lua
-- 这是一个单行注释
local x = 10  -- 变量 x 被赋值为 10
print(x)  -- 打印变量 x 的值
```

### 2. 多行注释

多行注释以 `--[[` 开头，以 `]]` 结尾。这种方式可以用于注释掉一整段代码或添加长段的注释。

#### 示例代码

```lua
--[[
这是一个多行注释。
它可以跨越多行。
--]]
local y = 20
print(y)

--[[
多行注释也可以用于
注释掉一整段代码：
print("This line is commented out")
print("This line is also commented out")
--]]
```

### 使用注释的建议

1. **清晰明了**：注释应简洁明了，帮助理解代码的功能和逻辑。
2. **保持最新**：注释应与代码保持一致，避免陈旧的注释误导阅读者。
3. **避免过度注释**：不必对每行代码都加注释，尤其是那些容易理解的代码。注释应主要用于解释复杂的逻辑或重要的部分。

### 示例代码

```lua
-- 定义一个函数，计算两个数的和
local function add(a, b)
    return a + b  -- 返回两个数的和
end

-- 调用函数并打印结果
local result = add(5, 3)
print(result)  -- 输出: 8

--[[
多行注释可以用于
详细解释一个复杂的代码块
或暂时注释掉一段代码
--]]

-- 定义一个表，包含一些数据
local data = {
    name = "Lua",
    version = "5.4"
}

-- 打印表中的数据
print(data.name)  -- 输出: Lua
print(data.version)  -- 输出: 5.4
```

## 变量
在Lua中，声明变量的方式相对简单，但也有一些不同的类型和作用域需要注意。以下是Lua中声明变量的几种方式：

### 1. 全局变量
默认情况下，在Lua中声明的变量是全局变量。
```lua
x = 10  -- 全局变量
print(x)  -- 输出: 10
```
**注意**：全局变量在整个程序运行期间都可访问，可能会导致命名冲突和意外的修改。

### 2. 局部变量
使用`local`关键字可以声明局部变量。局部变量的作用域仅限于声明它的代码块。
```lua
local y = 20  -- 局部变量
print(y)  -- 输出: 20

-- 在函数中声明局部变量
local function foo()
    local z = 30
    print(z)  -- 输出: 30
end
foo()
-- print(z)  -- 错误: z是局部变量，在函数外不可访问
```

### 3. 变量作用域
局部变量的作用域可以是一个代码块、一段循环或者一个函数。
```lua
local a = 100  -- 函数级局部变量

for i = 1, 3 do
    local b = i * 10  -- 循环块级局部变量
    print(b)  -- 输出: 10, 20, 30
end

-- print(b)  -- 错误: b在for循环外不可访问
```

### 4. 多变量声明
Lua允许在一行中声明多个变量，并且可以同时进行赋值。
```lua
local x, y, z = 1, 2, 3
print(x, y, z)  -- 输出: 1, 2, 3

-- 多变量赋值也可以用于交换变量值
x, y = y, x
print(x, y)  -- 输出: 2, 1
```

### 5. 避免未声明的变量
为了避免未声明变量的错误访问，可以在代码开头设置环境，以防止访问未声明的变量。
```lua
setmetatable(_G, {
    __newindex = function(_, n)
        error("attempt to write to undeclared variable " .. n, 2)
    end,
    __index = function(_, n)
        error("attempt to read undeclared variable " .. n, 2)
    end
})

local a = 10  -- 正常声明和使用局部变量
-- b = 20  -- 错误: 尝试访问未声明的全局变量
```

### 6. `const`和`<toclose>`变量（Lua 5.4 引入）
Lua 5.4引入了`const`和`<toclose>`变量，可以用于声明常量和自动管理资源。
```lua
-- const变量
local const c = 42
-- c = 43  -- 错误: 尝试修改const变量

-- <toclose>变量，用于自动关闭资源
local file = io.open("test.txt", "w")
local <toclose> f = file
```

### 7. 注意事项
- **命名规则**: 变量名应以字母或下划线开头，后续字符可以是字母、数字或下划线。
- **大小写敏感**: Lua变量名是大小写敏感的，`var`和`VAR`是不同的变量。


## 数据类型
以下是Lua中的主要数据类型及其特性：

| 数据类型    | 描述                                                                 | 示例                                   |
|-------------|----------------------------------------------------------------------|----------------------------------------|
| `nil`       | 表示一个无效值或未初始化的变量。通常用于表示“无”或“空”。                | `local var = nil`                      |
| `boolean`   | 包含两个值：`true` 和 `false`。                                      | `local flag = true`                    |
| `number`    | 双精度浮点数。可以表示整数和浮点数。                                  | `local count = 10`<br>`local pi = 3.14`|
| `string`    | 字符串。可以用单引号或双引号包裹。Lua中的字符串是不可变的。                | `local str = "Hello, Lua!"`            |
| `table`     | 唯一的复合数据类型，可以用作数组、字典、集合等。                         | `local arr = {1, 2, 3}`<br>`local dict = {name = "John", age = 30}`|
| `function`  | 函数是Lua的一等公民，可以赋值给变量、作为参数传递和返回。                   | `local function add(a, b) return a + b end`|
| `userdata`  | 表示任意用户定义的数据类型。通常用于与C库交互。                           | `local udata = some_c_function()`      |
| `thread`    | 用于实现协程，支持非抢占式多任务处理。                                 | `local co = coroutine.create(function() print("Hello") end)`|

### 示例代码

以下是一个展示各种数据类型的Lua代码示例：
```lua
-- nil
local n = nil
print(type(n))  -- 输出: nil

-- boolean
local is_active = true
print(type(is_active))  -- 输出: boolean

-- number
local count = 10
local pi = 3.14
print(type(count))  -- 输出: number
print(type(pi))  -- 输出: number

-- string
local greeting = "Hello, Lua!"
print(type(greeting))  -- 输出: string

-- table
local array = {1, 2, 3}
local dict = {name = "John", age = 30}
print(type(array))  -- 输出: table
print(type(dict))  -- 输出: table

-- function
local function add(a, b)
    return a + b
end
print(type(add))  -- 输出: function

-- userdata
-- 示例需依赖特定的C库，此处仅作说明
-- local udata = some_c_function()
-- print(type(udata))  -- 输出: userdata

-- thread
local co = coroutine.create(function()
    print("Hello from coroutine")
end)
print(type(co))  -- 输出: thread
```
## 类型转换

在 Lua 中，类型转换主要是通过显式转换函数来完成的。Lua 提供了一些基本的类型转换函数，如 `tonumber` 和 `tostring`。以下是 Lua 中常见的类型转换方法和示例：

### 1. 转换为数字（`tonumber`）

`tonumber` 函数用于将字符串或其他类型的值转换为数字。如果转换失败，返回 `nil`。

#### 语法

```lua
local num = tonumber(value)
```

#### 示例代码

```lua
local str = "123"
local num = tonumber(str)
print(num)  -- 输出: 123

local invalid_str = "abc"
local num_invalid = tonumber(invalid_str)
print(num_invalid)  -- 输出: nil
```

`tonumber` 还可以接受一个可选的基数参数，用于将指定基数的字符串转换为数字。

#### 示例代码

```lua
local hex_str = "1A"
local num_hex = tonumber(hex_str, 16)
print(num_hex)  -- 输出: 26
```

### 2. 转换为字符串（`tostring`）

`tostring` 函数用于将数字或其他类型的值转换为字符串。

#### 语法

```lua
local str = tostring(value)
```

#### 示例代码

```lua
local num = 456
local str_num = tostring(num)
print(str_num)  -- 输出: "456"

local tbl = {1, 2, 3}
local str_tbl = tostring(tbl)
print(str_tbl)  -- 输出: "table: 0x..."（表示表的内存地址）
```

### 3. 类型检查和转换示例

在进行类型转换前，通常需要检查值的类型。Lua 提供了 `type` 函数来获取值的类型。

#### 语法

```lua
local t = type(value)
```

#### 示例代码

```lua
local value = "123"

if type(value) == "string" then
    local num = tonumber(value)
    if num then
        print("Converted to number: " .. num)  -- 输出: Converted to number: 123
    else
        print("Conversion failed")
    end
end

local another_value = 789
if type(another_value) == "number" then
    local str = tostring(another_value)
    print("Converted to string: " .. str)  -- 输出: Converted to string: 789
end
```

### 4. 表的类型转换

虽然 Lua 没有内置的函数将表转换为字符串，但可以通过编写自定义函数来实现。例如，可以使用递归来序列化表。

#### 示例代码

```lua
local function table_to_string(tbl)
    local result = "{"
    local first = true
    for k, v in pairs(tbl) do
        if not first then
            result = result .. ", "
        end
        first = false
        if type(k) == "string" then
            result = result .. k .. " = "
        end
        if type(v) == "table" then
            result = result .. table_to_string(v)
        elseif type(v) == "string" then
            result = result .. '"' .. v .. '"'
        else
            result = result .. tostring(v)
        end
    end
    result = result .. "}"
    return result
end

local tbl = {name = "Lua", version = 5.4, features = {"lightweight", "embeddable"}}
local str_tbl = table_to_string(tbl)
print(str_tbl)  -- 输出: {name = Lua, version = 5.4, features = {lightweight, embeddable}}
```

## 字符串格式化
在Lua中，字符串格式化有几种常见的方法，以下是每种方法的示例：

### 1. 使用 `string.format`
这是Lua中最常用的字符串格式化方法，类似于C语言中的 `printf` 函数。

```lua
local name = "Alice"
local age = 30
local formattedString = string.format("My name is %s and I am %d years old.", name, age)
print(formattedString)
```

### 2. 使用字符串连接运算符 `..`
对于简单的字符串拼接，可以使用 `..` 运算符。

```lua
local name = "Alice"
local age = 30
local formattedString = "My name is " .. name .. " and I am " .. age .. " years old."
print(formattedString)
```

### 3. 使用 `table.concat`
这种方法适用于需要高效拼接大量字符串的情况。

```lua
local name = "Alice"
local age = 30
local parts = {"My name is ", name, " and I am ", tostring(age), " years old."}
local formattedString = table.concat(parts)
print(formattedString)
```

### 4. 使用自定义格式化函数
可以创建一个通用的格式化函数来处理更复杂的格式化需求。

```lua
function formatString(template, replacements)
    return (template:gsub("{(%w+)}", replacements))
end

local template = "My name is {name} and I am {age} years old."
local replacements = { name = "Alice", age = 30 }
local formattedString = formatString(template, replacements)
print(formattedString)
```

## 运算符

### 算术运算符

| 运算符 | 描述            | 示例            | 结果          |
|--------|-----------------|-----------------|---------------|
| `+`    | 加法            | `a + b`         | 两数之和      |
| `-`    | 减法            | `a - b`         | 两数之差      |
| `*`    | 乘法            | `a * b`         | 两数之积      |
| `/`    | 除法            | `a / b`         | 两数之商      |
| `%`    | 取模（取余）    | `a % b`         | `a` 除以 `b` 的余数 |
| `^`    | 幂运算          | `a ^ b`         | `a` 的 `b` 次方 |
| `-`    | 取负            | `-a`            | `a` 的相反数  |

### 关系运算符

| 运算符 | 描述            | 示例            | 结果          |
|--------|-----------------|-----------------|---------------|
| `==`   | 等于            | `a == b`        | 如果 `a` 等于 `b`，则为 `true`，否则为 `false` |
| `~=`   | 不等于          | `a ~= b`        | 如果 `a` 不等于 `b`，则为 `true`，否则为 `false` |
| `>`    | 大于            | `a > b`         | 如果 `a` 大于 `b`，则为 `true`，否则为 `false` |
| `<`    | 小于            | `a < b`         | 如果 `a` 小于 `b`，则为 `true`，否则为 `false` |
| `>=`   | 大于等于        | `a >= b`        | 如果 `a` 大于或等于 `b`，则为 `true`，否则为 `false` |
| `<=`   | 小于等于        | `a <= b`        | 如果 `a` 小于或等于 `b`，则为 `true`，否则为 `false` |

### 逻辑运算符

| 运算符 | 描述            | 示例            | 结果          |
|--------|-----------------|-----------------|---------------|
| `and`  | 逻辑与          | `a and b`       | 如果 `a` 和 `b` 都为 `true`，则为 `true`，否则为 `false` |
| `or`   | 逻辑或          | `a or b`        | 如果 `a` 或 `b` 为 `true`，则为 `true`，否则为 `false` |
| `not`  | 逻辑非          | `not a`         | 如果 `a` 为 `false`，则为 `true`，否则为 `false` |

### 字符串运算符

| 运算符 | 描述            | 示例            | 结果          |
|--------|-----------------|-----------------|---------------|
| `..`   | 连接            | `"Hello" .. " World"` | `"Hello World"` |

### 其他运算符

| 运算符 | 描述            | 示例            | 结果          |
|--------|-----------------|-----------------|---------------|
| `#`    | 长度运算符          | `#s`              | 返回字符串或表的长度 |
| `.`    | 访问表的字段或方法   | `mytable.name`    | 获取mytable表的name属性         |
| `:`    | 调用表的方法(会将表作为第一个参数传入)   | `myTable:greet()` | 调用myTable表的greet方法并将表作为第一个参数传入 |

### 运算符优先级

Lua 运算符的优先级从高到低如下：

1. `^`（幂运算）
2. `not`（逻辑非），`#`（长度），`-`（取负）
3. `*`（乘法），`/`（除法），`%`（取模）
4. `+`（加法），`-`（减法）
5. `..`（字符串连接）
6. `<`（小于），`>`（大于），`<=`（小于等于），`>=`（大于等于），`~=`（不等于），`==`（等于）
7. `and`（逻辑与）
8. `or`（逻辑或）

### 示例代码

```lua
local a = 10
local b = 20

-- 算术运算符
print(a + b)  -- 输出: 30
print(a - b)  -- 输出: -10
print(a * b)  -- 输出: 200
print(a / b)  -- 输出: 0.5
print(a % b)  -- 输出: 10
print(a ^ 2)  -- 输出: 100
print(-a)     -- 输出: -10

-- 关系运算符
print(a == b)  -- 输出: false
print(a ~= b)  -- 输出: true
print(a > b)   -- 输出: false
print(a < b)   -- 输出: true
print(a >= b)  -- 输出: false
print(a <= b)  -- 输出: true

-- 逻辑运算符
print(a > 0 and b > 0)  -- 输出: true
print(a > 0 or b < 0)   -- 输出: true
print(not (a > 0))      -- 输出: false

-- 字符串运算符
local s1 = "Hello"
local s2 = "World"
print(s1 .. " " .. s2)  -- 输出: Hello World

-- 其他运算符
local t = {1, 2, 3}
print(#t)  -- 输出: 3
local str = "Hello"
print(#str)  -- 输出: 5

local myTable1 = {
    name = "Lua",
    greet = function()
        print("Hello from Lua!")
    end
}
-- 访问表的字段
print(myTable1.name)  -- 输出: Lua
-- 调用表的函数
myTable1.greet()  -- 输出: Hello from Lua!

local myTable2 = {
    name = "Lua",
    greet = function(self)
        print("Hello from " .. self.name .. "!")
    end
}
-- 访问表的字段
print(myTable2.name)  -- 输出: Lua
-- 调用表的方法，隐式传递 self 参数
myTable2:greet()  -- 输出: Hello from Lua!
```

## 表（Table）
表（table）是Lua中唯一的复合数据类型，可以用来实现数组、字典、集合等数据结构。表是Lua编程中的重要组成部分。以下是表在Lua中的使用方法和相关操作：

### 1. 创建表

```lua
-- 创建一个空表
local myTable = {}

-- 创建并初始化一个表
local fruits = {"apple", "banana", "cherry"}
local person = {name = "John", age = 30}
```

### 2. 访问表元素

```lua
-- 数组形式访问
print(fruits[1])  -- 输出: apple

-- 字典形式访问
print(person["name"])  -- 输出: John

-- 使用点操作符访问
print(person.age)  -- 输出: 30
```

### 3. 修改表元素

```lua
-- 修改数组元素
fruits[1] = "orange"
print(fruits[1])  -- 输出: orange

-- 修改字典元素
person["age"] = 31
print(person.age)  -- 输出: 31
```

### 4. 插入和删除元素

```lua
-- 插入数组元素
table.insert(fruits, "mango")
print(fruits[4])  -- 输出: mango

-- 删除数组元素
table.remove(fruits, 2)
print(fruits[2])  -- 输出: cherry

-- 插入和删除字典元素
person["gender"] = "male"
print(person.gender)  -- 输出: male

person["gender"] = nil
print(person.gender)  -- 输出: nil
```

### 5. 遍历表

```lua
-- 遍历数组
for i, v in ipairs(fruits) do
    print(i, v)
end

-- 输出:
-- 1 orange
-- 2 cherry
-- 3 mango

-- 遍历字典
for k, v in pairs(person) do
    print(k, v)
end

-- 输出:
-- name John
-- age 31
```

### 6. 嵌套表

```lua
local company = {
    name = "TechCorp",
    employees = {
        {name = "Alice", position = "Developer"},
        {name = "Bob", position = "Manager"}
    }
}

print(company.employees[1].name)  -- 输出: Alice
```

### 7. 表作为函数参数和返回值

```lua
local function printPerson(p)
    print(p.name, p.age)
end

printPerson(person)  -- 输出: John 31

local function createPerson(name, age)
    return {name = name, age = age}
end

local newPerson = createPerson("Eve", 28)
print(newPerson.name, newPerson.age)  -- 输出: Eve 28
```

### 8. 元表与元方法

元表允许修改表的行为，例如定义算术运算、比较操作等。

```lua
local t1 = {1, 2, 3}
local t2 = {4, 5, 6}

-- 定义加法元方法
local mt = {
    __add = function(t1, t2)
        local result = {}
        for i = 1, #t1 do
            result[i] = t1[i] + t2[i]
        end
        return result
    end
}

-- 设置元表
setmetatable(t1, mt)
setmetatable(t2, mt)

-- 使用加法元方法
local t3 = t1 + t2
for i, v in ipairs(t3) do
    print(v)  -- 输出: 5, 7, 9
end
```

## 控制结构
Lua 的控制结构包括条件语句和循环语句，用于控制程序的执行流程。下面是 Lua 中常见的控制结构及其用法：

### 条件语句

#### if 语句
`if` 语句用于根据条件执行代码块。

```lua
local x = 10
if x > 0 then
    print("x is positive")
end
```

#### if-else 语句
`if-else` 语句用于在条件不满足时执行另一代码块。

```lua
local x = -5
if x > 0 then
    print("x is positive")
else
    print("x is non-positive")
end
```

#### if-elseif-else 语句
`if-elseif-else` 语句用于检查多个条件。

```lua
local x = 0
if x > 0 then
    print("x is positive")
elseif x < 0 then
    print("x is negative")
else
    print("x is zero")
end
```

### 循环语句

#### while 循环
`while` 循环在条件为真时重复执行代码块。

```lua
local i = 1
while i <= 5 do
    print(i)
    i = i + 1
end
```

#### repeat-until 循环
`repeat-until` 循环至少执行一次代码块，然后在条件为假时继续执行。

```lua
local i = 1
repeat
    print(i)
    i = i + 1
until i > 5
```

#### for 数字循环
`for` 数字循环在特定次数内重复执行代码块。

```lua
for i = 1, 5 do
    print(i)
end

-- 使用步长
for i = 1, 10, 2 do
    print(i)  -- 输出: 1, 3, 5, 7, 9
end
```

#### 泛型 for 循环
`for` 泛型循环用于遍历表或其他集合。

```lua
-- 遍历数组
local fruits = {"apple", "banana", "cherry"}
for index, value in ipairs(fruits) do
    print(index, value)
end

-- 遍历字典
local person = {name = "John", age = 30}
for key, value in pairs(person) do
    print(key, value)
end
```

### break 语句
`break` 语句用于退出循环。

```lua
for i = 1, 10 do
    if i > 5 then
        break
    end
    print(i)  -- 输出: 1, 2, 3, 4, 5
end
```

### goto 语句
`goto` 语句用于无条件跳转到指定标签。标签用双冒号表示。

```lua
local x = 1
if x == 1 then
    goto skip
end
print("This line will be skipped")

::skip::
print("This line will be executed")
```

## 函数
Lua中的函数是第一类对象，可以赋值给变量、作为参数传递和返回。Lua函数具有灵活性和强大的功能，以下是Lua中函数的定义、调用、参数、返回值及高级用法。

### 1. 函数定义和调用

#### 基本函数定义

```lua
-- 定义一个函数
function greet(name)
    return "Hello, " .. name
end

-- 调用函数
local message = greet("Lua")
print(message)  -- 输出: Hello, Lua
```

#### 使用局部函数

```lua
-- 定义一个局部函数
local function add(a, b)
    return a + b
end

-- 调用局部函数
local sum = add(5, 3)
print(sum)  -- 输出: 8
```

#### 匿名函数

```lua
-- 定义并调用匿名函数
local multiply = function(a, b)
    return a * b
end

print(multiply(4, 2))  -- 输出: 8
```

### 2. 函数参数

#### 多个参数

```lua
function power(base, exponent)
    return base ^ exponent
end

print(power(2, 3))  -- 输出: 8
```

#### 可变参数

```lua
-- 使用`...`接收可变数量的参数
function sum(...)
    local s = 0
    for _, v in ipairs({...}) do
        s = s + v
    end
    return s
end

print(sum(1, 2, 3, 4))  -- 输出: 10
```

### 3. 返回值

#### 单个返回值

```lua
function square(x)
    return x * x
end

print(square(5))  -- 输出: 25
```

#### 多个返回值

```lua
function divide(a, b)
    local quotient = a // b
    local remainder = a % b
    return quotient, remainder
end

local q, r = divide(10, 3)
print(q, r)  -- 输出: 3 1
```

### 4. 高阶函数

#### 函数作为参数

```lua
function apply(func, value)
    return func(value)
end

local result = apply(function(x) return x * 2 end, 5)
print(result)  -- 输出: 10
```

#### 函数作为返回值

```lua
function create_multiplier(multiplier)
    return function(x)
        return x * multiplier
    end
end

local double = create_multiplier(2)
print(double(5))  -- 输出: 10
```

### 5. 闭包

闭包是函数及其引用环境的组合，允许函数在外部作用域访问变量。

```lua
function counter()
    local count = 0
    return function()
        count = count + 1
        return count
    end
end

local c = counter()
print(c())  -- 输出: 1
print(c())  -- 输出: 2
```

### 6. 元方法中的函数

元表允许定义表的行为，通过定义元方法可以改变表的默认行为。

```lua
local t1 = {1, 2, 3}
local t2 = {4, 5, 6}

-- 定义加法元方法
local mt = {
    __add = function(a, b)
        local result = {}
        for i = 1, #a do
            result[i] = a[i] + b[i]
        end
        return result
    end
}

setmetatable(t1, mt)
setmetatable(t2, mt)

local t3 = t1 + t2
for i, v in ipairs(t3) do
    print(v)  -- 输出: 5, 7, 9
end
```

## 元表与元方法
元表（metatable）和元方法（metamethods）是Lua中用于改变表行为的高级功能。它们允许程序员定义表的算术操作、比较操作、访问操作等行为。以下是元表和元方法的详细介绍：

### 1. 设置和获取元表

#### `setmetatable`
`setmetatable` 函数用于为表设置元表。

```lua
local t = {}
local mt = {}
setmetatable(t, mt)
```

#### `getmetatable`
`getmetatable` 函数用于获取表的元表。

```lua
local mt = getmetatable(t)
```

### 2. 元方法

元方法是元表中的特定字段，这些字段定义了当相应事件发生时的行为。例如，元方法 `__add` 可以定义两个表相加的行为。

#### 常见元方法

- `__index`
- `__newindex`
- `__add`
- `__sub`
- `__mul`
- `__div`
- `__mod`
- `__pow`
- `__unm`
- `__len`
- `__eq`
- `__lt`
- `__le`
- `__concat`
- `__call`
- `__tostring`
- `__metatable`

### 3. 示例

#### `__index` 和 `__newindex`

`__index` 元方法用于表在查找键时未找到该键的情况。`__newindex` 元方法用于表在赋值时未找到该键的情况。

```lua
local t = {}
local mt = {
    __index = function(table, key)
        return "Key " .. key .. " not found!"
    end,
    __newindex = function(table, key, value)
        print("Setting key " .. key .. " to value " .. value)
        rawset(table, key, value)
    end
}
setmetatable(t, mt)

print(t.foo)  -- 输出: Key foo not found!
t.bar = "baz"  -- 输出: Setting key bar to value baz
print(t.bar)  -- 输出: baz
```

#### 算术运算元方法

定义表的加法行为：

```lua
local t1 = {1, 2, 3}
local t2 = {4, 5, 6}

local mt = {
    __add = function(a, b)
        local result = {}
        for i = 1, #a do
            result[i] = a[i] + b[i]
        end
        return result
    end
}

setmetatable(t1, mt)
setmetatable(t2, mt)

local t3 = t1 + t2
for i, v in ipairs(t3) do
    print(v)  -- 输出: 5, 7, 9
end
```

#### 比较运算元方法

定义表的相等性：

```lua
local t1 = {1, 2, 3}
local t2 = {1, 2, 3}

local mt = {
    __eq = function(a, b)
        for i = 1, #a do
            if a[i] ~= b[i] then
                return false
            end
        end
        return true
    end
}

setmetatable(t1, mt)
setmetatable(t2, mt)

print(t1 == t2)  -- 输出: true
```

#### 连接操作元方法

定义表的连接行为：

```lua
local t1 = {1, 2}
local t2 = {3, 4}

local mt = {
    __concat = function(a, b)
        local result = {}
        for i = 1, #a do
            table.insert(result, a[i])
        end
        for i = 1, #b do
            table.insert(result, b[i])
        end
        return result
    end
}

setmetatable(t1, mt)
setmetatable(t2, mt)

local t3 = t1 .. t2
for i, v in ipairs(t3) do
    print(v)  -- 输出: 1, 2, 3, 4
end
```

#### 调用元方法

定义表作为函数调用的行为：

```lua
local t = {}

local mt = {
    __call = function(table, arg)
        print("Table called with argument: " .. arg)
    end
}

setmetatable(t, mt)

t("Hello, Lua!")  -- 输出: Table called with argument: Hello, Lua!
```

### 4. 保护元表

为了防止元表被修改，可以使用 `__metatable` 字段：

```lua
local t = {}
local mt = {}
setmetatable(t, mt)

mt.__metatable = "Not allowed to access metatable"
print(getmetatable(t))  -- 输出: Not allowed to access metatable

-- 尝试设置新的元表将失败
-- setmetatable(t, {})  -- 错误: cannot change a protected metatable
```

## 错误处理

在 Lua 中，错误处理主要通过 `pcall`（保护调用）和 `xpcall`（扩展保护调用）函数来实现。这些函数提供了一种捕获和处理运行时错误的方法，从而使程序能够优雅地处理异常情况。

### 1. `pcall`（保护调用）

`pcall` 函数用于调用一个函数，并捕获该函数执行过程中发生的任何错误。它返回一个布尔值，表示函数是否成功执行，以及函数的返回值或错误信息。

#### 语法

```lua
local status, result = pcall(function_to_call, arg1, arg2, ...)
```

- `status`：布尔值，表示函数是否成功执行。
- `result`：如果执行成功，则为函数的返回值；如果执行失败，则为错误信息。

#### 示例代码

```lua
local function divide(a, b)
    return a / b
end

local status, result = pcall(divide, 10, 0)
if status then
    print("Result: ", result)
else
    print("Error: ", result)
end
```

### 2. `xpcall`（扩展保护调用）

`xpcall` 函数与 `pcall` 类似，但允许你指定一个错误处理函数。当被调用的函数发生错误时，错误处理函数会被调用。

#### 语法

```lua
local status = xpcall(function_to_call, error_handler)
```

- `status`：布尔值，表示函数是否成功执行。
- `function_to_call`：要执行的函数。
- `error_handler`：错误处理函数。

#### 示例代码

```lua
local function error_handler(err)
    return "Error: " .. tostring(err)
end

local function risky_function()
    error("Something went wrong!")
end

local status, result = xpcall(risky_function, error_handler)
if status then
    print("Success: ", result)
else
    print(result)  -- 输出: Error: Something went wrong!
end
```

### 3. 自定义错误处理

Lua 提供了 `error` 函数，用于生成自定义错误信息。

#### 示例代码

```lua
local function validate_age(age)
    if age < 0 then
        error("Age cannot be negative")
    end
    return age
end

local status, result = pcall(validate_age, -1)
if status then
    print("Age: ", result)
else
    print("Error: ", result)  -- 输出: Error: Age cannot be negative
end
```

### 4. 使用 `assert`

`assert` 函数用于在条件不满足时抛出错误。它是一个简单的错误处理机制，适用于条件检查。

#### 示例代码

```lua
local function divide(a, b)
    assert(b ~= 0, "Division by zero!")
    return a / b
end

local status, result = pcall(divide, 10, 0)
if status then
    print("Result: ", result)
else
    print("Error: ", result)  -- 输出: Error: Division by zero!
end
```

## 模块
在Lua中，模块（module）是用来组织和重用代码的机制。模块允许将代码分割成独立的部分，每个部分负责特定的功能。Lua使用`require`函数来加载模块，并使用`module`函数或返回一个表来定义模块。下面是关于Lua模块的详细介绍：

### 1. 创建模块

#### 使用返回表的方式

最常见的创建模块的方法是返回一个包含模块函数和变量的表。

```lua
-- mymodule.lua
local mymodule = {}

function mymodule.greet(name)
    return "Hello, " .. name
end

function mymodule.add(a, b)
    return a + b
end

return mymodule
```

#### 使用`module`函数（已弃用）

`module`函数在Lua 5.2及之后版本中已被弃用，但在Lua 5.1中仍然使用。

```lua
-- mymodule.lua
module(..., package.seeall)

function greet(name)
    return "Hello, " .. name
end

function add(a, b)
    return a + b
end
```

### 2. 加载模块

使用`require`函数加载模块。`require`函数会自动查找并加载指定的模块文件，并返回模块表。

```lua
-- main.lua
local mymodule = require("mymodule")

local message = mymodule.greet("Lua")
print(message)  -- 输出: Hello, Lua

local sum = mymodule.add(5, 3)
print(sum)  -- 输出: 8
```

### 3. 模块的文件结构

通常情况下，模块文件应该放在Lua路径（package.path）指定的目录中。Lua默认的模块文件扩展名是`.lua`，也可以是C库的动态链接库（`.so`或`.dll`）。

```lua
-- 目录结构
-- main.lua
-- mymodule.lua
```

### 4. 使用`package.loaded`

Lua使用`package.loaded`表来缓存已经加载的模块。你可以手动检查或操作这个表。

```lua
local mymodule = require("mymodule")

if package.loaded["mymodule"] then
    print("mymodule is loaded")
end
```

### 5. 使用`package.path`和`package.cpath`

`package.path`和`package.cpath`是用于指定Lua模块和C模块搜索路径的全局变量。

```lua
print(package.path)  -- 打印Lua模块搜索路径
print(package.cpath)  -- 打印C模块搜索路径

-- 添加新的路径
package.path = package.path .. ";/path/to/?.lua"
```

### 6. 示例模块

下面是一个更复杂的示例模块，包含初始化代码和私有函数。

```lua
-- mymath.lua
local mymath = {}

local function private_function()
    print("This is a private function")
end

function mymath.add(a, b)
    private_function()
    return a + b
end

function mymath.sub(a, b)
    return a - b
end

return mymath
```

在主文件中加载并使用该模块：

```lua
-- main.lua
local mymath = require("mymath")

local sum = mymath.add(10, 5)
print(sum)  -- 输出: 15

local difference = mymath.sub(10, 5)
print(difference)  -- 输出: 5
```

### 7. 面向对象的模块

Lua本身不直接支持面向对象编程，但可以通过一些约定来实现。以下是一个简单的类实现：

```lua
-- person.lua
local Person = {}
Person.__index = Person

function Person:new(name, age)
    local self = setmetatable({}, Person)
    self.name = name
    self.age = age
    return self
end

function Person:greet()
    return "Hello, my name is " .. self.name
end

return Person
```

在主文件中使用该类：

```lua
-- main.lua
local Person = require("person")

local john = Person:new("John", 30)
print(john:greet())  -- 输出: Hello, my name is John
```

## 版本区别
Lua 的不同版本引入了许多新特性、改进和修复。以下是 Lua 各主要版本的详细区别：

### Lua 5.0

**主要特性：**
- **闭包**：引入了闭包，使得函数可以捕获和访问其创建时的外部局部变量。
- **协程**：引入了协程，支持非抢占式多任务处理。
- **垃圾回收**：改进了垃圾回收机制，使用了增量标记-清除算法。
- **标准库增强**：丰富了标准库，增加了诸如 `table.sort` 等实用函数。
- **多返回值**：函数可以返回多个值。

### Lua 5.1

**主要特性：**
- **模块系统**：引入了 `require` 函数和模块系统，用于加载和管理代码模块。
- **环境表**：全局环境存储在一个特殊的全局变量 `_G` 中。
- **元表**：支持新的元方法，例如 `__ipairs`。
- **改进的垃圾回收**：进一步优化垃圾回收机制，提高了性能。
- **弱表**：支持弱引用表（弱键和弱值），用于实现缓存等应用。
- **词法作用域**：更严格地遵循词法作用域规则。

### Lua 5.2

**主要特性：**
- **去除全局环境**：移除了 `setfenv` 和 `getfenv` 函数，引入了 `_ENV` 来替代。
- **位操作库**：引入了 `bit32` 库，提供了位操作函数。
- **元方法**：支持新的元方法，例如 `__len`。
- **goto语句**：新增了 `goto` 语句，支持代码跳转。
- **协程改进**：改进了协程的错误处理机制。
- **紧凑库**：标准库函数从基本库移到了各自的子库，例如 `table` 和 `string`。

### Lua 5.3

**主要特性：**
- **整数支持**：引入了整数类型，支持64位整数运算。
- **原生位操作**：内置支持位操作，不再需要 `bit32` 库。
- **浮点数和整数的自动转换**：根据需要自动在整数和浮点数之间进行转换。
- **字符串缓冲区**：引入了 `table.move` 和 `string.pack`/`unpack` 函数，用于更高效的字符串处理。
- **环境变量**：`_ENV` 继续改进和优化，增强了灵活性。

### Lua 5.4

**主要特性：**
- **垃圾回收**：引入了增量垃圾回收和紧凑垃圾回收，提升内存管理性能。
- **`const`变量**：支持声明常量变量，使用 `const` 关键字。
- **`<toclose>`变量**：引入了 `<toclose>` 标记，用于资源管理和自动关闭资源。
- **新迭代器**：引入了新的迭代器机制，使迭代更高效。
- **快速关闭**：允许在退出块时自动调用某些函数，类似于 C++ 的 RAII。

### LuaJIT

LuaJIT 是 Lua 语言的一个即时编译器（Just-In-Time Compiler），旨在提升 Lua 代码的执行效率。LuaJIT 兼容 Lua 5.1，并引入了一些扩展功能：

**主要特性：**
- **高性能**：通过即时编译技术，显著提升 Lua 代码的执行速度。
- **FFI 库**：提供了强大的外部函数接口（FFI），可以方便地调用 C 函数和使用 C 数据结构。
- **64 位支持**：完全支持 64 位平台，包括整数运算和内存访问。
- **扩展语法**：引入了某些 Lua 5.2 和 Lua 5.3 的特性，例如 `_ENV`。

### 具体差异示例

#### 位操作

**Lua 5.1**：

```lua
local bit = require("bit")
local result = bit.bor(1, 2)  -- 位或操作
```

**Lua 5.3**：

```lua
local result = 1 | 2  -- 位或操作，原生支持
```

#### 整数和浮点数

**Lua 5.2**：

```lua
local x = 5 / 2  -- 结果为浮点数 2.5
```

**Lua 5.3**：

```lua
local x = 5 // 2  -- 结果为整数 2
```

#### 模块系统

**Lua 5.1**：

```lua
module(..., package.seeall)
function greet(name)
    return "Hello, " .. name
end
```

**Lua 5.2+**：

```lua
local mymodule = {}
function mymodule.greet(name)
    return "Hello, " .. name
end
return mymodule
```

## 多进程与多线程

Lua 本身不直接支持多进程，但可以通过结合 C 库或外部工具来实现多进程。通常，Lua 程序会使用协程（coroutines）来处理并发任务，因为协程轻量且易于使用。然而，如果确实需要多进程，可以采用以下几种方法：

### 1. 使用 `luaposix` 库

`luaposix` 是一个 Lua 的 POSIX 接口库，提供了创建进程和进程间通信的功能。

#### 安装 `luaposix`
你可以通过 LuaRocks 安装 `luaposix`：

```sh
luarocks install luaposix
```

#### 示例代码

```lua
local posix = require("posix")

-- 创建子进程
local pid = posix.fork()

if pid == 0 then
    -- 子进程
    print("This is the child process.")
    posix._exit(0)
else
    -- 父进程
    print("This is the parent process. Child PID: " .. pid)
    posix.wait(pid)
end
```

### 2. 使用 `lspawn` 库

`lspawn` 是一个 Lua 库，提供了一些简单的进程管理功能。

#### 安装 `lspawn`
你可以通过 LuaRocks 安装 `lspawn`：

```sh
luarocks install lspawn
```

#### 示例代码

```lua
local lspawn = require("lspawn")

local proc = lspawn.spawn({
    file = "/bin/echo",
    args = {"Hello from Lua"},
})

proc:wait()
```

### 3. 使用 `os.execute`

使用 Lua 内置的 `os.execute` 函数执行外部进程。

#### 示例代码

```lua
os.execute("echo 'Hello from Lua'")
```

### 4. 使用 Luvit

Luvit 是基于 Lua 的事件驱动 I/O 库，类似于 Node.js，支持异步操作和多进程。

#### 安装 Luvit

Luvit 有自己的包管理器 `lit`：

```sh
lit install luvit/luvit
```

#### 示例代码

```lua
local luv = require('luv')

-- 创建子进程
local handle = luv.spawn("echo", {
  args = {"Hello from Lua"},
  stdio = {nil, 1, 2}
}, function(code, signal)
  print("Process exited with code " .. code .. " and signal " .. signal)
end)

luv.read_start(handle, function(err, data)
  if err then
    print("Error: " .. err)
  else
    print(data)
  end
end)

-- 运行事件循环
luv.run()
```

### 5. 使用 `lua-resty-shell`

如果你在 OpenResty（一个基于 Nginx 和 LuaJIT 的高性能 Web 平台）上运行 Lua 脚本，可以使用 `lua-resty-shell` 库来执行子进程。

#### 安装 `lua-resty-shell`

你可以通过 `opm`（OpenResty Package Manager）安装：

```sh
opm get ledgetech/lua-resty-shell
```

#### 示例代码

```lua
local shell = require "resty.shell"
local status, out, err = shell.run("echo 'Hello from Lua'")

if status == 0 then
    ngx.say("Output: ", out)
else
    ngx.say("Error: ", err)
end
```

### 6. 使用 `lua-llthreads2`

`lua-llthreads2` 提供了多线程支持，可以用于并发任务。

#### 安装 `lua-llthreads2`

你可以通过 LuaRocks 安装：

```sh
luarocks install lua-llthreads2
```

#### 示例代码

```lua
local llthreads = require "llthreads2.ex"

local thread_code = [[
    print("Hello from thread!")
]]

local thread = llthreads.new(thread_code)
thread:start()
thread:join()
```

## 协程

协程（coroutine）是 Lua 中用于实现并发操作的强大工具。与线程不同，协程是用户级别的，具有轻量级和高效的特点。协程允许在多个函数之间切换，从而实现非阻塞操作和协作式多任务处理。

### 1. 创建和使用协程

Lua 提供了一组标准库函数来创建和操作协程。

#### 基本操作

- `coroutine.create`：创建一个新的协程。
- `coroutine.resume`：恢复协程的运行。
- `coroutine.yield`：暂停协程的运行。
- `coroutine.status`：查询协程的状态。
- `coroutine.running`：获取当前正在运行的协程。

#### 示例代码

```lua
-- 创建协程
local co = coroutine.create(function()
    for i = 1, 5 do
        print("co", i)
        coroutine.yield()
    end
end)

-- 恢复协程
for i = 1, 5 do
    coroutine.resume(co)
end
```

### 2. 协程状态

协程可以有以下几种状态：

- `suspended`：协程已创建或已被暂停。
- `running`：协程正在运行。
- `normal`：协程在另一个协程内部运行。
- `dead`：协程运行结束。

#### 示例代码

```lua
local co = coroutine.create(function()
    print("Hello from coroutine")
end)

print(coroutine.status(co))  -- 输出: suspended
coroutine.resume(co)
print(coroutine.status(co))  -- 输出: dead
```

### 3. 复杂示例

下面是一个更复杂的例子，展示如何在多个协程之间进行协作。

#### 示例代码

```lua
local function producer()
    return coroutine.create(function()
        while true do
            local x = io.read() -- 从标准输入读取数据
            coroutine.yield(x)
        end
    end)
end

local function filter(prod)
    return coroutine.create(function()
        for line = 1, 5 do
            local x = coroutine.resume(prod)
            x = string.upper(x)
            coroutine.yield(x)
        end
    end)
end

local function consumer(filt)
    for i = 1, 5 do
        local _, x = coroutine.resume(filt)
        print(x)
    end
end

local p = producer()
local f = filter(p)
consumer(f)
```

### 4. 使用 `copas` 库进行异步 I/O

`copas` 是一个基于协程的事件驱动框架，适合用于网络服务器和客户端的开发。

#### 安装 `copas`

通过 LuaRocks 安装：

```sh
luarocks install copas
```

#### 示例代码

```lua
local copas = require("copas")
local socket = require("socket")

-- 创建一个简单的服务器
local server = socket.bind("*", 12345)
copas.addserver(server, function(c)
    copas.setsocketname(c, "echo_server")
    while true do
        local data = copas.receive(c, "*l")
        if not data then break end
        copas.send(c, data .. "\n")
    end
end)

-- 运行事件循环
copas.loop()
```

### 5. 使用 `cqueues` 库进行高级控制

`cqueues` 是一个高级的协程库，提供了更细粒度的控制和更强大的功能。

#### 安装 `cqueues`

通过 LuaRocks 安装：

```sh
luarocks install cqueues
```

#### 示例代码

```lua
local cqueues = require("cqueues")

local cq = cqueues.new()

cq:wrap(function()
    for i = 1, 5 do
        print("Task 1 - Step " .. i)
        cqueues.sleep(1)
    end
end)

cq:wrap(function()
    for i = 1, 5 do
        print("Task 2 - Step " .. i)
        cqueues.sleep(1.5)
    end
end)

cq:loop()
```

## 标准库

Lua 标准库提供了一组实用的函数和模块，用于处理常见的编程任务。以下是 Lua 标准库的详细介绍：

### 1. 基础库（Basic Library）

基础库提供了一些基本的函数和全局变量，所有 Lua 程序都可以直接使用。

```lua
print("Hello, world!")  -- 输出: Hello, world!

local t = type("hello")
print(t)  -- 输出: string

assert(1 == 1)  -- 如果条件为假，抛出错误

error("Something went wrong")  -- 抛出错误

local f = loadstring("return 2 + 2")
print(f())  -- 输出: 4

local x = tonumber("10")  -- 字符串转数字
print(x)  -- 输出: 10

local s = tostring(123)  -- 数字转字符串
print(s)  -- 输出: "123"
```

### 2. 字符串库（String Library）

字符串库提供了一组函数用于字符串处理。

```lua
local s = "hello"
print(#s)  -- 输出: 5 (字符串长度)

local s2 = string.upper(s)
print(s2)  -- 输出: "HELLO"

local s3 = string.sub(s, 2, 4)
print(s3)  -- 输出: "ell"

local s4 = string.format("Value: %d", 42)
print(s4)  -- 输出: "Value: 42"

local i, j = string.find("hello Lua", "Lua")
print(i, j)  -- 输出: 7 9

local s5 = string.gsub("hello world", "world", "Lua")
print(s5)  -- 输出: "hello Lua"
```

### 3. 表库（Table Library）

表库提供了一组函数用于操作表。

```lua
local t = {1, 2, 3}
table.insert(t, 4)
print(table.concat(t, ", "))  -- 输出: "1, 2, 3, 4"

table.remove(t, 2)
print(table.concat(t, ", "))  -- 输出: "1, 3, 4"

local t2 = {a = 1, b = 2, c = 3}
for k, v in pairs(t2) do
    print(k, v)
end

local t3 = {5, 2, 9, 1}
table.sort(t3)
print(table.concat(t3, ", "))  -- 输出: "1, 2, 5, 9"
```

### 4. 数学库（Math Library）

数学库提供了一组函数用于数学运算。

```lua
print(math.abs(-10))  -- 输出: 10

print(math.max(1, 5, 3))  -- 输出: 5

print(math.min(1, 5, 3))  -- 输出: 1

print(math.floor(3.7))  -- 输出: 3

print(math.ceil(3.1))  -- 输出: 4

print(math.sqrt(16))  -- 输出: 4

print(math.random(1, 100))  -- 输出: 1 到 100 之间的随机数

math.randomseed(os.time())  -- 设置随机数种子
```

### 5. IO 库（IO Library）

IO 库提供了一组函数用于文件输入输出操作。

```lua
local file = io.open("test.txt", "w")
file:write("Hello, Lua!")
file:close()

file = io.open("test.txt", "r")
local content = file:read("*all")
file:close()
print(content)  -- 输出: "Hello, Lua!"
```

### 6. 操作系统库（OS Library）

操作系统库提供了一组函数用于与操作系统交互。

```lua
print(os.time())  -- 输出当前时间的时间戳

print(os.date("%Y-%m-%d %H:%M:%S"))  -- 输出格式化的日期时间

os.execute("echo Hello from Lua")  -- 执行操作系统命令

local env_var = os.getenv("PATH")  -- 获取环境变量
print(env_var)
```

### 7. 调试库（Debug Library）

调试库提供了一组函数用于调试 Lua 程序。

```lua
local function my_function()
    print(debug.traceback("Stack trace"))
end

my_function()
```

### 8. 包库（Package Library）

包库提供了一组函数用于加载和管理 Lua 模块。

```lua
local mymodule = require("mymodule")

package.path = package.path .. ";/path/to/?.lua"
package.cpath = package.cpath .. ";/path/to/?.so"
```
