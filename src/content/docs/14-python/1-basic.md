---
title: Python基础语法
---

Python是一种广泛使用的高级编程语言，具有简洁的语法和强大的功能。以下是一些Python的基础语法：

## 注释
在Python编程中，注释是非常重要的部分。注释可以帮助你和其他开发者理解代码的目的和功能。以下是Python中注释的使用方法：

### 1. 单行注释
单行注释使用`#`符号，`#`后面的内容直到行尾都是注释。
```python
# 这是一个单行注释
print("Hello, World!")  # 这是另一个单行注释
```

### 2. 多行注释
Python没有专门的多行注释语法，但是可以使用三个引号`'''`或`"""`来创建多行字符串，通常用作多行注释。
```python
"""
这是一个多行注释。
可以包含多行文字。
"""
print("Hello, World!")
```
```python
'''
这是另一个多行注释。
可以使用三个单引号。
'''
print("Hello, World!")
```

### 注释的最佳实践
- **简明扼要**：注释应该简洁且直接说明代码的作用或目的。
- **及时更新**：如果修改了代码，记得同步更新相关的注释，确保注释与代码保持一致。
- **避免过度注释**：不需要每行都加注释，尤其是那些显而易见的代码。注释应该帮助理解复杂或关键的部分。
- **使用英文**：虽然可以用任何语言写注释，但使用英文可以让更多的人理解你的代码。

### 示例
以下是一个包含多种注释的示例：
```python
# 定义一个函数，计算两个数的和
def add_numbers(a, b):
    """
    这个函数接受两个参数，并返回它们的和。

    参数:
    a -- 第一个数字
    b -- 第二个数字

    返回值:
    两个数字的和
    """
    return a + b  # 返回a和b的和

# 调用函数并打印结果
result = add_numbers(3, 5)
print(result)  # 输出结果：8
```

## 变量和数据类型

### 变量
Python中的变量不需要声明类型，赋值即定义：
```python
let singleQuoteString = 'Single quote string'
let doubleQuoteString = "Double quote string with interpolation"
let tripleQuoteString = """Triple quote
string spanning
multiple lines"""
x = 5
y = "Hello"
z = 3.14

# 在函数内部修改全局变量时，需要使用 global 关键字
global_var = "I'm global"
def my_function():
    global global_var
    global_var = "I'm modified global"

my_function()
print(global_var)  # 输出: I'm modified global

# nonlocal 关键字用于在嵌套函数中引用外层（但不是全局）作用域中的变量。它的作用是让嵌套的内部函数能够修改其外层函数中的局部变量
def outer_function():
    x = "outer"

    def inner_function():
        nonlocal x
        x = "inner"
        print("Inner:", x)

    inner_function()
    print("Outer:", x)
outer_function()
```

### 数据类型

| 数据类型 | 示例               | 描述                             |
|----------|--------------------|----------------------------------|
| `int`    | `a = 5`            | 整数类型，表示整数值。           |
| `float`  | `b = 3.14`         | 浮点数类型，表示小数值。         |
| `str`    | `c = "Hello"`      | 字符串类型，表示文本。           |
| `bool`   | `d = True`         | 布尔类型，表示真或假。           |
| `list`   | `e = [1, 2, 3]`    | 列表类型，有序可变集合。         |
| `tuple`  | `f = (1, 2, 3)`    | 元组类型，有序不可变集合。       |
| `dict`   | `g = {"a": 1}`     | 字典类型，无序键值对集合。       |
| `set`    | `h = {1, 2, 3}`    | 集合类型，无序不重复元素集合。   |
| `None`   | `i = None`         | 特殊类型，表示空值或无值。       |
| `complex`| `j = 1 + 2j`       | 复数类型，表示复数值。           |
| `bytes`  | `k = b'hello'`     | 字节类型，表示二进制数据。       |
| `bytearray`| `l = bytearray(5)`| 可变字节类型。                  |
| `range`  | `m = range(5)`     | 范围类型，表示数字序列。         |

## 类型转换

在Python中，类型转换是将一个数据类型的值转换为另一个数据类型。Python提供了多种内置函数来实现类型转换。以下是常见的类型转换及其示例：

### 基本类型转换函数

#### 转换为整数 (`int`)
将一个数值或字符串转换为整数。非数值字符串会导致 `ValueError` 异常。

```python
# 从浮点数转换为整数
x = int(3.14)
print(x)  # 输出: 3

# 从字符串转换为整数
y = int("42")
print(y)  # 输出: 42

# 非数值字符串转换为整数会抛出异常
try:
    z = int("hello")
except ValueError as e:
    print(e)  # 输出: invalid literal for int() with base 10: 'hello'
```

#### 转换为浮点数 (`float`)
将一个数值或字符串转换为浮点数。非数值字符串会导致 `ValueError` 异常。

```python
# 从整数转换为浮点数
x = float(3)
print(x)  # 输出: 3.0

# 从字符串转换为浮点数
y = float("3.14")
print(y)  # 输出: 3.14

# 非数值字符串转换为浮点数会抛出异常
try:
    z = float("hello")
except ValueError as e:
    print(e)  # 输出: could not convert string to float: 'hello'
```

#### 转换为字符串 (`str`)
将任何数据类型转换为字符串。

```python
# 从整数转换为字符串
x = str(123)
print(x)  # 输出: '123'

# 从浮点数转换为字符串
y = str(3.14)
print(y)  # 输出: '3.14'

# 从列表转换为字符串
z = str([1, 2, 3])
print(z)  # 输出: '[1, 2, 3]'
```

#### 转换为布尔值 (`bool`)
将任何数据类型转换为布尔值。空值、零值、空字符串、空容器转换为 `False`，其他值转换为 `True`。

```python
print(bool(0))         # 输出: False
print(bool(1))         # 输出: True
print(bool(""))        # 输出: False
print(bool("Hello"))   # 输出: True
print(bool([]))        # 输出: False
print(bool([1, 2, 3])) # 输出: True
```

### 容器类型转换函数

#### 转换为列表 (`list`)
将一个可迭代对象（如元组、字符串、集合等）转换为列表。

```python
# 从元组转换为列表
x = list((1, 2, 3))
print(x)  # 输出: [1, 2, 3]

# 从字符串转换为列表
y = list("hello")
print(y)  # 输出: ['h', 'e', 'l', 'l', 'o']
```

#### 转换为元组 (`tuple`)
将一个可迭代对象转换为元组。

```python
# 从列表转换为元组
x = tuple([1, 2, 3])
print(x)  # 输出: (1, 2, 3)

# 从字符串转换为元组
y = tuple("hello")
print(y)  # 输出: ('h', 'e', 'l', 'l', 'o')
```

#### 转换为集合 (`set`)
将一个可迭代对象转换为集合（集合中的元素是唯一的）。

```python
# 从列表转换为集合
x = set([1, 2, 3, 2])
print(x)  # 输出: {1, 2, 3}

# 从字符串转换为集合
y = set("hello")
print(y)  # 输出: {'o', 'e', 'l', 'h'}
```

#### 转换为字典 (`dict`)
将一个包含键值对的可迭代对象转换为字典。

```python
# 从列表转换为字典
x = dict([('name', 'Alice'), ('age', 25)])
print(x)  # 输出: {'name': 'Alice', 'age': 25}

# 从元组列表转换为字典
y = dict((('name', 'Bob'), ('age', 30)))
print(y)  # 输出: {'name': 'Bob', 'age': 30}
```

### 使用 `eval` 进行类型转换

`eval` 函数可以将字符串转换为表达式并求值，但由于安全性问题，建议谨慎使用。

```python
x = "42"
y = eval(x)
print(y)  # 输出: 42
print(type(y))  # 输出: <class 'int'>
```

### 示例代码汇总

```python
# 转换为整数
print(int(3.14))        # 输出: 3
print(int("42"))        # 输出: 42

# 转换为浮点数
print(float(3))         # 输出: 3.0
print(float("3.14"))    # 输出: 3.14

# 转换为字符串
print(str(123))         # 输出: '123'
print(str(3.14))        # 输出: '3.14'
print(str([1, 2, 3]))   # 输出: '[1, 2, 3]'

# 转换为布尔值
print(bool(0))          # 输出: False
print(bool(1))          # 输出: True
print(bool(""))         # 输出: False
print(bool("Hello"))    # 输出: True
print(bool([]))         # 输出: False
print(bool([1, 2, 3]))  # 输出: True

# 转换为列表
print(list((1, 2, 3)))  # 输出: [1, 2, 3]
print(list("hello"))    # 输出: ['h', 'e', 'l', 'l', 'o']

# 转换为元组
print(tuple([1, 2, 3])) # 输出: (1, 2, 3)
print(tuple("hello"))   # 输出: ('h', 'e', 'l', 'l', 'o')

# 转换为集合
print(set([1, 2, 3, 2])) # 输出: {1, 2, 3}
print(set("hello"))      # 输出: {'o', 'e', 'l', 'h'}

# 转换为字典
print(dict([('name', 'Alice'), ('age', 25)])) # 输出: {'name': 'Alice', 'age': 25}
print(dict((('name', 'Bob'), ('age', 30))))   # 输出: {'name': 'Bob', 'age': 30}

# 使用 eval 进行类型转换
x = "42"
y = eval(x)
print(y)  # 输出: 42
print(type(y))  # 输出: <class 'int'>
```

## 字符串格式化

Python字符串格式化有几种常见的方法，下面是每种方法的示例：

### 1. 使用百分号 (`%`)
这种方法类似于C语言中的字符串格式化。

```python
name = "Alice"
age = 30
print("My name is %s and I am %d years old." % (name, age))
```

### 2. 使用 `str.format()`
这种方法提供了更强大和灵活的字符串格式化功能。

```python
name = "Alice"
age = 30
print("My name is {} and I am {} years old.".format(name, age))

# 也可以使用索引
print("My name is {0} and I am {1} years old. {0} is my name.".format(name, age))

# 或者使用关键字参数
print("My name is {name} and I am {age} years old.".format(name=name, age=age))
```

### 3. 使用 f-字符串 (Python 3.6+)
这种方法是最简洁和现代的字符串格式化方式。

```python
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old.")
```

### 4. 使用 `Template` 类
`Template` 类提供了一种替换变量的方式，适合需要高度安全的模板替换。

```python
from string import Template

template = Template("My name is $name and I am $age years old.")
print(template.substitute(name="Alice", age=30))
```

## 列表
在Python中，列表（list）是一种常用的数据结构，用于存储有序的元素集合。列表是可变的，可以包含不同类型的元素。以下是关于列表的详细说明和示例：

### 创建列表
你可以使用方括号 `[]` 创建一个列表，并用逗号分隔元素：
```python
my_list = [1, 2, 3, 4, 5]
print(my_list)  # 输出: [1, 2, 3, 4, 5]
```

### 访问列表元素
使用索引来访问列表中的元素，索引从0开始：
```python
print(my_list[0])  # 输出: 1
print(my_list[2])  # 输出: 3
```

### 修改列表元素
你可以通过索引来修改列表中的元素：
```python
my_list[1] = 20
print(my_list)  # 输出: [1, 20, 3, 4, 5]
```

### 添加元素
你可以使用 `append()` 方法在列表末尾添加元素，或者使用 `insert()` 方法在指定位置插入元素：
```python
my_list.append(6)
print(my_list)  # 输出: [1, 20, 3, 4, 5, 6]

my_list.insert(2, 30)
print(my_list)  # 输出: [1, 20, 30, 3, 4, 5, 6]
```

### 删除元素
你可以使用 `remove()` 方法删除指定元素，或者使用 `pop()` 方法删除指定索引处的元素：
```python
my_list.remove(20)
print(my_list)  # 输出: [1, 30, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)  # 输出: [1, 30, 4, 5, 6]
```

### 列表方法
Python 提供了许多操作列表的方法，以下是一些常用的方法：

- `append(x)`：在列表末尾添加一个元素 x。
- `extend(iterable)`：用一个可迭代对象扩展列表。
- `insert(i, x)`：在索引 i 处插入元素 x。
- `remove(x)`：删除列表中第一个值为 x 的元素。
- `pop([i])`：删除并返回索引 i 处的元素，默认删除最后一个元素。
- `clear()`：删除列表中的所有元素。
- `index(x, [start, [end]])`：返回列表中第一个值为 x 的元素的索引。
- `count(x)`：返回 x 在列表中出现的次数。
- `sort(key=None, reverse=False)`：对列表进行排序。
- `reverse()`：反转列表中的元素。
- `copy()`：返回列表的浅复制。

### 列表的切片操作
切片操作可以用于获取列表的一个子列表：
```python
my_list = [1, 2, 3, 4, 5]
sub_list = my_list[1:4]
print(sub_list)  # 输出: [2, 3, 4]
```

### 列表的遍历
你可以使用`for`循环遍历列表中的元素：
```python
for item in my_list:
    print(item)
```

### 示例代码
以下是展示列表常用操作的示例代码：
```python
# 创建列表
my_list = [1, 2, 3, 4, 5]

# 访问元素
print(my_list[0])  # 输出: 1
print(my_list[2])  # 输出: 3

# 修改元素
my_list[1] = 20
print(my_list)  # 输出: [1, 20, 3, 4, 5]

# 添加元素
my_list.append(6)
print(my_list)  # 输出: [1, 20, 3, 4, 5, 6]

my_list.insert(2, 30)
print(my_list)  # 输出: [1, 20, 30, 3, 4, 5, 6]

# 删除元素
my_list.remove(20)
print(my_list)  # 输出: [1, 30, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)  # 输出: [1, 30, 4, 5, 6]

# 列表方法示例
my_list.sort()
print(my_list)  # 输出: [1, 4, 5, 6, 30]

my_list.reverse()
print(my_list)  # 输出: [30, 6, 5, 4, 1]

copy_list = my_list.copy()
print(copy_list)  # 输出: [30, 6, 5, 4, 1]

my_list.clear()
print(my_list)  # 输出: []

# 切片操作
my_list = [1, 2, 3, 4, 5]
sub_list = my_list[1:4]
print(sub_list)  # 输出: [2, 3, 4]

# 遍历列表
for item in my_list:
    print(item)
```

## 字典
在Python中，字典（`dict`）是一种用于存储键值对的数据结构。每个键都唯一对应一个值。字典是无序的、可变的，并且可以用任何不可变的类型作为键。以下是关于字典的详细说明和示例：

### 创建字典
你可以使用花括号 `{}` 创建一个字典，并用冒号 `:` 分隔键和值，用逗号 `,` 分隔键值对：
```python
my_dict = {"name": "Alice", "age": 25, "city": "New York"}
print(my_dict)  # 输出: {'name': 'Alice', 'age': 25, 'city': 'New York'}
```

### 访问字典元素
使用键来访问字典中的值：
```python
print(my_dict["name"])  # 输出: Alice
print(my_dict["age"])   # 输出: 25
```

### 修改字典元素
你可以通过键来修改字典中的值：
```python
my_dict["age"] = 26
print(my_dict)  # 输出: {'name': 'Alice', 'age': 26, 'city': 'New York'}
```

### 添加和删除元素
你可以通过赋值的方式添加新的键值对，使用 `del` 语句或 `pop()` 方法删除指定的键值对：
```python
# 添加元素
my_dict["country"] = "USA"
print(my_dict)  # 输出: {'name': 'Alice', 'age': 26, 'city': 'New York', 'country': 'USA'}

# 删除元素
del my_dict["city"]
print(my_dict)  # 输出: {'name': 'Alice', 'age': 26, 'country': 'USA'}

# 使用pop()方法删除元素
age = my_dict.pop("age")
print(age)  # 输出: 26
print(my_dict)  # 输出: {'name': 'Alice', 'country': 'USA'}
```

### 字典的方法
Python 提供了许多操作字典的方法，以下是一些常用的方法：

- `clear()`：删除字典中的所有元素。
- `copy()`：返回字典的浅复制。
- `fromkeys(seq[, value])`：创建一个新字典，以序列 `seq` 中的元素作为键，`value` 为所有键对应的初始值。
- `get(key[, default])`：返回键对应的值，如果键不存在则返回默认值 `default`。
- `items()`：返回一个包含字典键值对的视图对象。
- `keys()`：返回一个包含字典键的视图对象。
- `values()`：返回一个包含字典值的视图对象。
- `pop(key[, default])`：删除并返回键对应的值，如果键不存在则返回默认值 `default`。
- `popitem()`：删除并返回字典中的最后一个键值对。
- `setdefault(key[, default])`：返回键对应的值，如果键不存在则插入键并将其值设为默认值 `default`。
- `update([other])`：更新字典，添加其他字典或可迭代对象中的键值对。

### 示例代码
以下是展示字典常用操作的示例代码：
```python
# 创建字典
my_dict = {"name": "Alice", "age": 25, "city": "New York"}

# 访问元素
print(my_dict["name"])  # 输出: Alice
print(my_dict["age"])   # 输出: 25

# 修改元素
my_dict["age"] = 26
print(my_dict)  # 输出: {'name': 'Alice', 'age': 26, 'city': 'New York'}

# 添加元素
my_dict["country"] = "USA"
print(my_dict)  # 输出: {'name': 'Alice', 'age': 26, 'city': 'New York', 'country': 'USA'}

# 删除元素
del my_dict["city"]
print(my_dict)  # 输出: {'name': 'Alice', 'age': 26, 'country': 'USA'}

# 使用pop()方法删除元素
age = my_dict.pop("age")
print(age)  # 输出: 26
print(my_dict)  # 输出: {'name': 'Alice', 'country': 'USA'}

# 字典方法示例
my_dict.clear()
print(my_dict)  # 输出: {}

# 使用fromkeys创建新字典
keys = ['a', 'b', 'c']
new_dict = dict.fromkeys(keys, 0)
print(new_dict)  # 输出: {'a': 0, 'b': 0, 'c': 0}

# 使用get方法获取值
value = new_dict.get('a')
print(value)  # 输出: 0

# 使用items方法遍历字典
for key, value in new_dict.items():
    print(f"{key}: {value}")

# 使用keys方法获取所有键
keys = new_dict.keys()
print(keys)  # 输出: dict_keys(['a', 'b', 'c'])

# 使用values方法获取所有值
values = new_dict.values()
print(values)  # 输出: dict_values([0, 0, 0])

# 使用update方法更新字典
new_dict.update({'d': 1, 'e': 2})
print(new_dict)  # 输出: {'a': 0, 'b': 0, 'c': 0, 'd': 1, 'e': 2}
```

## 集合

在Python中，集合（`set`）是一种无序且不重复的元素集合。集合主要用于去除重复元素和成员关系测试。以下是关于集合的详细说明和示例：

### 创建集合
你可以使用花括号 `{}` 或者 `set()` 函数创建一个集合：
```python
my_set = {1, 2, 3, 4, 5}
print(my_set)  # 输出: {1, 2, 3, 4, 5}

another_set = set([1, 2, 2, 3, 4])
print(another_set)  # 输出: {1, 2, 3, 4}
```

### 添加和删除元素
你可以使用 `add()` 方法添加单个元素，使用 `update()` 方法添加多个元素，使用 `remove()` 或 `discard()` 方法删除元素：
```python
my_set.add(6)
print(my_set)  # 输出: {1, 2, 3, 4, 5, 6}

my_set.update([7, 8])
print(my_set)  # 输出: {1, 2, 3, 4, 5, 6, 7, 8}

my_set.remove(3)
print(my_set)  # 输出: {1, 2, 4, 5, 6, 7, 8}

my_set.discard(4)
print(my_set)  # 输出: {1, 2, 5, 6, 7, 8}

# remove() 方法删除不存在的元素会报错，而 discard() 方法不会
# my_set.remove(10)  # KeyError
my_set.discard(10)  # 不报错
```

### 集合操作
集合支持多种数学运算，例如并集、交集、差集和对称差集：

- 并集 `union()`
- 交集 `intersection()`
- 差集 `difference()`
- 对称差集 `symmetric_difference()`

```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# 并集
print(set1.union(set2))  # 输出: {1, 2, 3, 4, 5, 6, 7, 8}

# 交集
print(set1.intersection(set2))  # 输出: {4, 5}

# 差集
print(set1.difference(set2))  # 输出: {1, 2, 3}

# 对称差集
print(set1.symmetric_difference(set2))  # 输出: {1, 2, 3, 6, 7, 8}
```

### 集合的其他方法
- `copy()`：返回集合的浅复制。
- `clear()`：移除集合中的所有元素。
- `isdisjoint(other)`：如果两个集合没有交集，返回 True。
- `issubset(other)`：如果当前集合是另一个集合的子集，返回 True。
- `issuperset(other)`：如果当前集合是另一个集合的超集，返回 True。

```python
# 浅复制
set3 = set1.copy()
print(set3)  # 输出: {1, 2, 3, 4, 5}

# 清空集合
set3.clear()
print(set3)  # 输出: set()

# 判断交集
print(set1.isdisjoint(set2))  # 输出: False

# 判断子集
subset = {1, 2}
print(subset.issubset(set1))  # 输出: True

# 判断超集
print(set1.issuperset(subset))  # 输出: True
```

### 示例代码
以下是展示集合常用操作的示例代码：
```python
# 创建集合
my_set = {1, 2, 3, 4, 5}
print(my_set)  # 输出: {1, 2, 3, 4, 5}

# 添加元素
my_set.add(6)
print(my_set)  # 输出: {1, 2, 3, 4, 5, 6}

# 添加多个元素
my_set.update([7, 8])
print(my_set)  # 输出: {1, 2, 3, 4, 5, 6, 7, 8}

# 删除元素
my_set.remove(3)
print(my_set)  # 输出: {1, 2, 4, 5, 6, 7, 8}

# 删除不存在的元素不会报错
my_set.discard(10)  # 不报错

# 并集
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
print(set1.union(set2))  # 输出: {1, 2, 3, 4, 5, 6, 7, 8}

# 交集
print(set1.intersection(set2))  # 输出: {4, 5}

# 差集
print(set1.difference(set2))  # 输出: {1, 2, 3}

# 对称差集
print(set1.symmetric_difference(set2))  # 输出: {1, 2, 3, 6, 7, 8}

# 浅复制
set3 = set1.copy()
print(set3)  # 输出: {1, 2, 3, 4, 5}

# 清空集合
set3.clear()
print(set3)  # 输出: set()

# 判断交集
print(set1.isdisjoint(set2))  # 输出: False

# 判断子集
subset = {1, 2}
print(subset.issubset(set1))  # 输出: True

# 判断超集
print(set1.issuperset(subset))  # 输出: True
```

## 条件语句
条件语句是编程中用来根据不同的条件执行不同代码块的一种方式。Python中的条件语句包括`if`、`elif`和`else`。以下是详细说明和示例：

### if 语句
`if`语句用于判断条件是否为真，如果为真则执行对应的代码块：
```python
x = 10
if x > 5:
    print("x is greater than 5")
```

### if-else 语句
`if-else`语句用于在条件为假时执行另一段代码：
```python
x = 3
if x > 5:
    print("x is greater than 5")
else:
    print("x is not greater than 5")
```

### if-elif-else 语句
`if-elif-else`语句用于检查多个条件，依次判断直到找到第一个为真的条件：
```python
x = 7
if x > 10:
    print("x is greater than 10")
elif x > 5:
    print("x is greater than 5 but less than or equal to 10")
else:
    print("x is 5 or less")
```

### 嵌套条件语句
可以在条件语句中嵌套其他条件语句，以处理更复杂的逻辑：
```python
x = 15
if x > 10:
    print("x is greater than 10")
    if x > 20:
        print("x is also greater than 20")
    else:
        print("x is not greater than 20")
else:
    print("x is 10 or less")
```

### 条件表达式（条件运算符）
Python支持条件表达式，也称为三元运算符，允许在一行中进行简单的条件判断：
```python
x = 20
result = "x is even" if x % 2 == 0 else "x is odd"
print(result)  # 输出: x is even
```

### 示例代码
以下是展示条件语句的示例代码：
```python
# 简单的 if 语句
x = 10
if x > 5:
    print("x is greater than 5")  # 输出: x is greater than 5

# if-else 语句
x = 3
if x > 5:
    print("x is greater than 5")
else:
    print("x is not greater than 5")  # 输出: x is not greater than 5

# if-elif-else 语句
x = 7
if x > 10:
    print("x is greater than 10")
elif x > 5:
    print("x is greater than 5 but less than or equal to 10")  # 输出: x is greater than 5 but less than or equal to 10
else:
    print("x is 5 or less")

# 嵌套条件语句
x = 15
if x > 10:
    print("x is greater than 10")  # 输出: x is greater than 10
    if x > 20:
        print("x is also greater than 20")
    else:
        print("x is not greater than 20")  # 输出: x is not greater than 20
else:
    print("x is 10 or less")

# 条件表达式
x = 20
result = "x is even" if x % 2 == 0 else "x is odd"
print(result)  # 输出: x is even
```

## match匹配

在Python 3.10及更高版本中，引入了`match`语句，这是一个强大的结构化模式匹配机制，类似于其他编程语言中的`switch`语句。`match`语句使得处理复杂的条件分支更加简洁和直观。

### 基本语法

```python
def http_status(status):
    match status:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case _:
            return "Unknown Status"
```

### 示例

#### 基本模式匹配

```python
def get_status_message(status_code):
    match status_code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case _:
            return "Unknown Status"

print(get_status_message(200))  # 输出: OK
print(get_status_message(404))  # 输出: Not Found
print(get_status_message(123))  # 输出: Unknown Status
```

#### 匹配多个值

```python
def get_status_message(status_code):
    match status_code:
        case 200 | 201:
            return "Success"
        case 400 | 401 | 403:
            return "Client Error"
        case 500 | 502 | 503:
            return "Server Error"
        case _:
            return "Unknown Status"

print(get_status_message(200))  # 输出: Success
print(get_status_message(401))  # 输出: Client Error
print(get_status_message(503))  # 输出: Server Error
```

#### 匹配序列模式

```python
def process_point(point):
    match point:
        case (0, 0):
            return "Origin"
        case (0, y):
            return f"Y-axis at {y}"
        case (x, 0):
            return f"X-axis at {x}"
        case (x, y):
            return f"Point at ({x}, {y})"
        case _:
            return "Unknown Point"

print(process_point((0, 0)))  # 输出: Origin
print(process_point((0, 5)))  # 输出: Y-axis at 5
print(process_point((3, 0)))  # 输出: X-axis at 3
print(process_point((3, 4)))  # 输出: Point at (3, 4)
```

#### 匹配字典模式

```python
def process_http_response(response):
    match response:
        case {"status": 200, "data": data}:
            return f"Success with data: {data}"
        case {"status": 404}:
            return "Not Found"
        case {"status": 500, "error": error}:
            return f"Server Error: {error}"
        case _:
            return "Unknown Response"

response = {"status": 200, "data": "some data"}
print(process_http_response(response))  # 输出: Success with data: some data

response = {"status": 404}
print(process_http_response(response))  # 输出: Not Found

response = {"status": 500, "error": "internal server error"}
print(process_http_response(response))  # 输出: Server Error: internal server error
```

#### 匹配类模式

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def process_shape(shape):
    match shape:
        case Point(0, 0):
            return "Origin"
        case Point(0, y):
            return f"Y-axis at {y}"
        case Point(x, 0):
            return f"X-axis at {x}"
        case Point(x, y):
            return f"Point at ({x}, {y})"
        case _:
            return "Unknown Shape"

p1 = Point(0, 0)
p2 = Point(0, 5)
p3 = Point(3, 0)
p4 = Point(3, 4)

print(process_shape(p1))  # 输出: Origin
print(process_shape(p2))  # 输出: Y-axis at 5
print(process_shape(p3))  # 输出: X-axis at 3
print(process_shape(p4))  # 输出: Point at (3, 4)
```

### 使用守卫（条件）模式

在模式匹配中，可以使用守卫（条件）来进一步限定匹配条件：

```python
def classify_number(n):
    match n:
        case x if x < 0:
            return "Negative"
        case x if x == 0:
            return "Zero"
        case x if x > 0:
            return "Positive"
        case _:
            return "Unknown"

print(classify_number(-5))  # 输出: Negative
print(classify_number(0))   # 输出: Zero
print(classify_number(10))  # 输出: Positive
```

## 循环
在Python中，循环用于重复执行某段代码。主要有两种循环结构：`for` 循环和 `while` 循环。以下是详细说明和示例：

### `for` 循环
`for` 循环用于遍历一个序列（如列表、元组、字符串、字典等）中的每个元素。

#### 遍历列表
```python
my_list = [1, 2, 3, 4, 5]
for item in my_list:
    print(item)
```

#### 遍历字符串
```python
my_string = "Hello"
for char in my_string:
    print(char)
```

#### 遍历字典
```python
my_dict = {"name": "Alice", "age": 25}
for key, value in my_dict.items():
    print(f"{key}: {value}")
```

#### 使用 `range()`
`range()` 函数生成一个数值序列，常用于 `for` 循环：
```python
for i in range(5):
    print(i)  # 输出 0 到 4
```

### `for`循环的实现
在Python中，你可以通过定义一个类来实现对`for`循环的支持。这通常涉及实现两个特殊方法：`__iter__` 和 `__next__`。

- `__iter__(self)`：返回迭代器对象本身。在通常情况下，`__iter__`方法返回 `self`。
- `__next__(self)`：返回容器的下一个值。如果没有更多的值可供返回，则应该引发 `StopIteration` 异常。

以下是一个实现简单迭代器的示例。这个迭代器会返回从 0 到指定最大值之间的所有整数：

#### 示例代码

```python
class MyRange:
    def __init__(self, max_value):
        self.max_value = max_value
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current < self.max_value:
            result = self.current
            self.current += 1
            return result
        else:
            raise StopIteration

# 使用 MyRange 类在 for 循环中迭代
for num in MyRange(5):
    print(num)  # 输出: 0 1 2 3 4
```

#### 解释

1. **类的定义**：
    - `__init__(self, max_value)`：初始化迭代器，设置最大值 `max_value`，并初始化当前值 `current` 为 0。
    - `__iter__(self)`：返回迭代器对象本身，通常是 `self`。
    - `__next__(self)`：返回当前值并将 `current` 增加 1。当 `current` 达到 `max_value` 时，抛出 `StopIteration` 异常以终止迭代。

2. **使用`for`循环**：
    - `for num in MyRange(5)`：创建一个 `MyRange` 对象并在 `for` 循环中使用它。循环将自动调用迭代器的 `__iter__` 和 `__next__` 方法，直到遇到 `StopIteration` 异常。


### `while` 循环
`while` 循环在给定条件为真时重复执行代码块。注意避免无限循环。

#### 简单示例
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

#### 无限循环示例
```python
# 避免运行此代码，它会导致无限循环
# while True:
#     print("This is an infinite loop")
```

### 循环控制语句
- `break`：立即终止循环
- `continue`：跳过当前循环的剩余部分并进入下一次循环

#### 使用 `break`
```python
for i in range(10):
    if i == 5:
        break
    print(i)  # 输出 0 到 4
```

#### 使用 `continue`
```python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 输出奇数 1, 3, 5, 7, 9
```

### 嵌套循环
你可以在一个循环中嵌套另一个循环。

#### 示例
```python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")
```

### 示例代码
以下是展示各种循环的示例代码：

```python
# for 循环遍历列表
my_list = [1, 2, 3, 4, 5]
for item in my_list:
    print(item)  # 输出: 1 2 3 4 5

# for 循环遍历字符串
my_string = "Hello"
for char in my_string:
    print(char)  # 输出: H e l l o

# for 循环遍历字典
my_dict = {"name": "Alice", "age": 25}
for key, value in my_dict.items():
    print(f"{key}: {value}")  # 输出: name: Alice  age: 25

# 使用 range() 的 for 循环
for i in range(5):
    print(i)  # 输出: 0 1 2 3 4

# while 循环
count = 0
while count < 5:
    print(count)  # 输出: 0 1 2 3 4
    count += 1

# 使用 break 终止循环
for i in range(10):
    if i == 5:
        break
    print(i)  # 输出: 0 1 2 3 4

# 使用 continue 跳过当前循环
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 输出: 1 3 5 7 9

# 嵌套循环
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")  # 输出: i=0, j=0  i=0, j=1  i=1, j=0  i=1, j=1  i=2, j=0  i=2, j=1
```

## 函数

在Python中，函数可以根据其功能和使用方式进行不同的分类。以下是几种常见的函数分类及其示例：

### 1. 内置函数
Python 提供了许多内置函数，这些函数可以直接使用，无需导入任何模块。例如：
- `print()`
- `len()`
- `type()`
- `int()`

示例：
```python
print("Hello, World!")  # 输出: Hello, World!
print(len("Hello"))     # 输出: 5
print(type(123))        # 输出: <class 'int'>
print(int("123"))       # 输出: 123
```

### 2. 用户自定义函数
用户可以根据需要定义自己的函数。使用 `def` 关键字定义函数。

示例：
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # 输出: Hello, Alice!
```

### 3. 匿名函数（Lambda 函数）
匿名函数是使用 `lambda` 关键字定义的函数，通常用于需要一个简单函数的场合。

示例：
```python
add = lambda x, y: x + y
print(add(3, 5))  # 输出: 8
```

### 4. 高阶函数
高阶函数是指接收函数作为参数或返回一个函数的函数。常见的高阶函数有 `map()`, `filter()`, `reduce()` 等。

示例：
```python
# map() 示例
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x**2, numbers)
print(list(squared))  # 输出: [1, 4, 9, 16, 25]

# filter() 示例
even_numbers = filter(lambda x: x % 2 == 0, numbers)
print(list(even_numbers))  # 输出: [2, 4]

# reduce() 示例
from functools import reduce
sum = reduce(lambda x, y: x + y, numbers)
print(sum)  # 输出: 15
```

### 5. 递归函数
递归函数是指在函数内部调用函数自身的函数，通常用于解决递归问题，如计算阶乘或斐波那契数列。

示例：
```python
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))  # 输出: 120
```

### 6. 闭包（Closure）
闭包是指函数内部的函数可以访问其外部函数的变量，甚至在外部函数结束后仍然可以访问这些变量。

示例：
```python
def outer_function(msg):
    def inner_function():
        print(msg)
    return inner_function

hello_func = outer_function("Hello, World!")
hello_func()  # 输出: Hello, World!
```

### 7. 装饰器（Decorator）
装饰器是用于在不修改原函数的情况下，扩展函数功能的一种设计模式。装饰器本质上是一个高阶函数。

示例：
```python
def decorator_function(original_function):
    def wrapper_function():
        print("Wrapper executed this before {}".format(original_function.__name__))
        return original_function()
    return wrapper_function

@decorator_function
def display():
    print("Display function ran")

display()
# 输出:
# Wrapper executed this before display
# Display function ran

def repeat(n):
    """
    装饰器工厂函数，它接受一个参数 n，表示函数调用的次数。
    """
    def decorator_function(original_function):
        """
        装饰器函数，实际接收要装饰的函数。
        """
        def wrapper_function(*args, **kwargs):
            """
            包装函数，负责在装饰器逻辑中调用原始函数。
            """
            for _ in range(n):
                original_function(*args, **kwargs)
        return wrapper_function
    return decorator_function

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# 输出:
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!
```

### 8. 内置特殊函数
一些内置的特殊函数在特定的上下文中自动调用，例如类中的 `__init__` 构造函数，或者 `__str__` 函数用于打印对象的字符串表示。

示例：
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name}, {self.age} years old"

person = Person("Alice", 25)
print(person)  # 输出: Alice, 25 years old
```

## 类
在Python中，类的分类可以根据不同的用途和特性来进行分类。以下是几种常见的分类及其示例：

### 1. 基本类和对象
基本类是直接定义的类，用于创建对象的模板。对象是类的实例。

示例：
```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} is barking."

dog1 = Dog("Buddy", 3)
print(dog1.bark())  # 输出: Buddy is barking.
```

### 2. 抽象类
抽象类是不能直接实例化的类，通常用于定义接口或基本行为。Python通过`abc`模块提供了抽象类的支持。

示例：
```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass

class Dog(Animal):
    def sound(self):
        return "Woof"

dog1 = Dog()
print(dog1.sound())  # 输出: Woof
```

### 3. 内置类
Python提供了一些内置类，如`list`、`dict`、`str`等，这些类用于基本数据结构和类型。

示例：
```python
my_list = list([1, 2, 3])
print(type(my_list))  # 输出: <class 'list'>
```

### 4. 数据类
数据类是用于存储数据的类，Python 3.7引入了`dataclasses`模块来简化数据类的定义。

示例：
```python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p = Point(10, 20)
print(p)  # 输出: Point(x=10, y=20)
```

### 5. 元类
元类是用于创建类的类。通过定义元类，可以控制类的创建和行为。通常通过继承`type`类来定义元类。

示例：
```python
class Meta(type):
    """
    cls：当前正在创建的类，即 Meta。
    name：正在创建的类的名称，例如 'MyClass'。
    bases：正在创建的类的基类(tuple), 可以多继承。
    dct：正在创建的类的属性和方法的字典。
    """
    def __new__(cls, name, bases, dct):
        dct['class_name'] = name
        return super().__new__(cls, name, bases, dct)

class MyClass(metaclass=Meta):
    pass

print(MyClass.class_name)  # 输出: MyClass
```

### 6. 单继承类
单继承类是指从一个父类继承的类。

示例：
```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def bark(self):
        return f"{self.name} is barking."

dog1 = Dog("Buddy")
print(dog1.bark())  # 输出: Buddy is barking.
```

### 7. 多继承类
多继承类是指从多个父类继承的类。Python支持多继承，但需要注意潜在的复杂性，如菱形继承问题。

示例：
```python
class Animal:
    def __init__(self, name):
        self.name = name

class Walker:
    def walk(self):
        return f"{self.name} is walking."

class Dog(Animal, Walker):
    def bark(self):
        return f"{self.name} is barking."

dog1 = Dog("Buddy")
print(dog1.bark())  # 输出: Buddy is barking.
print(dog1.walk())  # 输出: Buddy is walking.
```

### 8. 混入类
混入类（Mixin）是一种用于提供方法的类，通常不包含数据属性，专注于增加功能。混入类通常用于多重继承中，为其他类添加特定的功能。

示例：
```python
class LoggerMixin:
    def log(self, message):
        print(f"[LOG] {message}")

class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal, LoggerMixin):
    def bark(self):
        self.log(f"{self.name} is barking.")
        return f"{self.name} is barking."

dog1 = Dog("Buddy")
print(dog1.bark())  # 输出: [LOG] Buddy is barking.  Buddy is barking.
```

### 9. 静态方法和类方法
静态方法和类方法是类中的特殊方法，分别使用`@staticmethod`和`@classmethod`装饰器定义。

示例：
```python
class Utility:
    @staticmethod
    def add(a, b):
        return a + b

    @classmethod
    def info(cls):
        return f"This is {cls.__name__} class."

print(Utility.add(3, 5))  # 输出: 8
print(Utility.info())     # 输出: This is Utility class.
```

## with资源管理
`with` 语句在Python中用于简化资源管理，尤其是文件操作和线程锁等上下文管理操作。它确保在代码块执行结束后，自动清理资源，无论代码块是否正常退出（例如通过异常）。`with` 语句依赖于上下文管理器实现。上下文管理器是一个实现了 `__enter__` 和 `__exit__` 方法的对象。

### 使用 `with` 语句操作文件

#### 打开和读取文件
```python
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
# 在这里，文件会在with块结束时自动关闭
```

#### 写入文件
```python
with open('example.txt', 'w') as file:
    file.write('Hello, World!')
# 文件会在with块结束时自动关闭
```

### 使用 `with` 语句处理异常
`with` 语句可以简化异常处理，确保资源在异常发生时仍能正确释放。

```python
try:
    with open('example.txt', 'r') as file:
        content = file.read()
        print(content)
except IOError as e:
    print(f"An error occurred: {e}")
# 即使发生异常，文件也会正确关闭
```

### 自定义上下文管理器

你可以创建自己的上下文管理器，通过实现 `__enter__` 和 `__exit__` 方法。

#### 示例：自定义上下文管理器
```python
class MyContext:
    def __enter__(self):
        print("Entering the context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting the context")
        if exc_type is not None:
            print(f"An exception occurred: {exc_value}")
        return True  # 如果返回 True，异常会被忽略

# 使用自定义上下文管理器
with MyContext() as ctx:
    print("Inside the context")
    raise ValueError("Something went wrong")
# 输出:
# Entering the context
# Inside the context
# Exiting the context
# An exception occurred: Something went wrong
```

### 使用 `with` 语句管理锁
在多线程编程中，可以使用 `with` 语句管理线程锁。

#### 示例：使用线程锁
```python
import threading

lock = threading.Lock()

# 使用with语句管理锁
with lock:
    # 这里是临界区代码
    print("Lock is acquired")
# 锁会在with块结束时自动释放
```

### 使用 `with` 语句管理数据库连接

#### 示例：管理数据库连接
```python
import sqlite3

class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name

    def __enter__(self):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is not None:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.cursor.close()
        self.conn.close()

# 使用自定义数据库连接上下文管理器
with DatabaseConnection('example.db') as cursor:
    cursor.execute('SELECT * FROM users')
    for row in cursor.fetchall():
        print(row)
# 数据库连接会在with块结束时自动关闭
```

## 异常处理

在Python中，异常处理是一种处理程序运行时错误的方法，使程序能够优雅地应对异常情况，而不会因错误而崩溃。主要通过使用`try`、`except`、`else` 和 `finally` 关键字来实现异常处理。

### 异常处理的基本语法

```python
try:
    # 可能会引发异常的代码
    pass
except ExceptionType as e:
    # 处理特定异常的代码
    pass
else:
    # 如果没有异常发生，执行的代码
    pass
finally:
    # 无论是否发生异常，都会执行的代码
    pass
```

### 示例

#### 基本异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error occurred: {e}")
```

输出：
```python
Error occurred: division by zero
```

#### 捕获多个异常

```python
try:
    result = 10 / 0
except (ZeroDivisionError, TypeError) as e:
    print(f"Error occurred: {e}")
```

#### 捕获所有异常

```python
try:
    result = 10 / 0
except Exception as e:
    print(f"An error occurred: {e}")
```

### 使用 `else`

`else` 块在没有发生异常时执行：

```python
try:
    result = 10 / 2
except ZeroDivisionError as e:
    print(f"Error occurred: {e}")
else:
    print("Division successful:", result)
```

输出：
```python
Division successful: 5.0
```

### 使用 `finally`

`finally` 块无论是否发生异常，都会执行，通常用于清理资源：

```python
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError as e:
    print(f"Error occurred: {e}")
else:
    print("File content:", content)
finally:
    file.close()
    print("File closed.")
```

### 自定义异常

你可以创建自己的异常类，通过继承内置的 `Exception` 类：

```python
class MyCustomError(Exception):
    pass

def risky_function():
    raise MyCustomError("Something went wrong!")

try:
    risky_function()
except MyCustomError as e:
    print(f"Caught custom error: {e}")
```

### 使用 `raise` 重新引发异常

在异常处理代码中，可以使用 `raise` 重新引发异常，以便进一步处理或传播异常：

```python
def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError as e:
        print("Caught a division error")
        raise  # 重新引发异常

try:
    divide(10, 0)
except ZeroDivisionError as e:
    print(f"Handled in main: {e}")
```

### 上下文管理与异常处理

上下文管理器结合异常处理可以简化资源管理，确保资源在使用完毕后正确释放：

```python
class ManagedResource:
    def __enter__(self):
        print("Acquiring resource")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Releasing resource")
        if exc_type is not None:
            print(f"An error occurred: {exc_val}")
        return False  # 如果返回 True，异常会被忽略

# 使用上下文管理器
with ManagedResource():
    print("Using resource")
    raise ValueError("Something went wrong!")
```

输出：
```python
Acquiring resource
Using resource
Releasing resource
An error occurred: Something went wrong!
```

### 示例代码汇总

以下是一个综合示例，展示了上述异常处理机制：

```python
class MyCustomError(Exception):
    pass

def risky_function():
    raise MyCustomError("Something went wrong!")

def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError as e:
        print("Caught a division error")
        raise  # 重新引发异常

try:
    with open("example.txt", "r") as file:
        content = file.read()
        print("File content:", content)
except FileNotFoundError as e:
    print(f"File not found: {e}")
except MyCustomError as e:
    print(f"Caught custom error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No exceptions occurred")
finally:
    print("This block will always execute")

try:
    divide(10, 0)
except ZeroDivisionError as e:
    print(f"Handled in main: {e}")

try:
    risky_function()
except MyCustomError as e:
    print(f"Caught custom error: {e}")
```

## 魔法方法

Python中的魔法方法（Magic Methods），也称为特殊方法或双下划线方法（Dunder Methods），是以双下划线开头和结尾的方法。这些方法在特定的情况下会被Python自动调用，可以用于定义对象的行为，例如初始化、表示、运算符重载等。

### 初始化和表示

- `__new__(cls, *args, **kwargs)`：在对象创建时首先被调用的，比__init__方法更早。__new__方法通常用于不变对象（如元组和字符串）的创建，也用于实现自定义类的元类。
- `__init__(self, ...)`：构造函数，在创建对象时调用。
- `__str__(self)`：定义对象的字符串表示，`str()` 和 `print()` 函数调用。
- `__repr__(self)`：定义对象的官方字符串表示，`repr()` 函数调用，通常用于调试。

示例：
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"Person(name={self.name}, age={self.age})"

    def __repr__(self):
        return f"Person(name={self.name!r}, age={self.age!r})"

p = Person("Alice", 30)
print(str(p))   # 输出: Person(name=Alice, age=30)
print(repr(p))  # 输出: Person(name='Alice', age=30)
```

### 算术运算符重载

- `__add__(self, other)`：加法运算 `+`。
- `__sub__(self, other)`：减法运算 `-`。
- `__mul__(self, other)`：乘法运算 `*`。
- `__truediv__(self, other)`：除法运算 `/`。

示例：
```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
print(v1 + v2)  # 输出: Vector(6, 8)
```

### 比较运算符重载

- `__eq__(self, other)`：等于 `==`。
- `__ne__(self, other)`：不等于 `!=`。
- `__lt__(self, other)`：小于 `<`。
- `__le__(self, other)`：小于等于 `<=`。
- `__gt__(self, other)`：大于 `>`。
- `__ge__(self, other)`：大于等于 `>=`。

示例：
```python
class Product:
    def __init__(self, price):
        self.price = price

    def __eq__(self, other):
        return self.price == other.price

    def __lt__(self, other):
        return self.price < other.price

p1 = Product(50)
p2 = Product(50)
p3 = Product(100)

print(p1 == p2)  # 输出: True
print(p1 < p3)   # 输出: True
print(p1 > p3)   # 输出: False
```

### 容器相关的魔法方法

- `__len__(self)`：返回容器长度，`len()` 函数调用。
- `__getitem__(self, key)`：获取指定键值的元素，`self[key]`。
- `__setitem__(self, key, value)`：设置指定键值的元素，`self[key] = value`。
- `__delitem__(self, key)`：删除指定键值的元素，`del self[key]`。
- `__contains__(self, item)`：判断容器是否包含某元素，`item in self`。

示例：
```python
class CustomList:
    def __init__(self, items):
        self.items = items

    def __len__(self):
        return len(self.items)

    def __getitem__(self, index):
        return self.items[index]

    def __setitem__(self, index, value):
        self.items[index] = value

    def __delitem__(self, index):
        del self.items[index]

    def __contains__(self, item):
        return item in self.items

clist = CustomList([1, 2, 3, 4])
print(len(clist))   # 输出: 4
print(clist[2])     # 输出: 3
clist[2] = 10
print(clist[2])     # 输出: 10
del clist[2]
print(len(clist))   # 输出: 3
print(4 in clist)   # 输出: True
```

### 其他常见魔法方法

- `__call__(self, *args, **kwargs)`：使对象可以像函数一样被调用。
- `__iter__(self)`：返回容器的迭代器，通常返回 `self`。
- `__next__(self)`：返回容器的下一个值，与 `__iter__` 一起使用。
- `__enter__(self)` 和 `__exit__(self, exc_type, exc_value, traceback)`：实现上下文管理器，支持 `with` 语句。

示例：
```python
class Counter:
    def __init__(self, start=0):
        self.count = start

    def __call__(self):
        self.count += 1
        return self.count

counter = Counter()
print(counter())  # 输出: 1
print(counter())  # 输出: 2

class MyContext:
    def __enter__(self):
        print("Entering context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting context")
        return False

with MyContext():
    print("Inside context")
# 输出:
# Entering context
# Inside context
# Exiting context
```
