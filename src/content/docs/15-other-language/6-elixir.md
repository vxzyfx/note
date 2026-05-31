---
title: elixir语言
---

## 介绍

Elixir 运行在 Erlang VM（BEAM）上, 具有一下优势:

- 高并发、低延迟、可扩展（大量进程、消息传递）
- 容错强（“让它崩溃”+ Supervisor 自动拉起）
- 分布式友好（节点间通信是语言/运行时一等公民）
- Web 后端（Phoenix）是 Elixir 最主流落地方向

Elixir 主要有 3 个命令行工具:

- `iex` : 交互式命令行工具, 可以输入任意 Elixir 表达式并获得其结果.
- `elixir` : 执行 Elixir 代码文件.
- `elixirc` : 把 `.ex` 源文件编译成 BEAM 虚拟机可加载的字节码（.beam），并可选生成应用的 `.app` 描述文件.

## 注释

```elixir
1          # 注释文本
```

## elixir 类型

### 数字

#### 整型

```elixir
10 # integer类型
0b1010 # 10 二进制表示
0o777 # 511 八进制表示
0x1F # 31 十六进制表示
?a # 97 字符a的码点
```

#### 浮点数

elixir 的浮点数是 64 位精度的

```elixir
1.0 # float

1.0e-10 # 科学计数法
```

比较

| 符号 | 介绍     | 示例        | 结果  |
| ---- | -------- | ----------- | ----- |
| ==   | 等于     | `1 == 1.0`  | true  |
| ===  | 完全等于 | `1 === 1.0` | false |
| /=   | 不等     | `1 /= 1.0`  | false |
| !==  | 完全不等 | `1 !== 1.0` | true  |
| \>   | 大于     | `2 > 1`     | true  |
| \>=  | 大于等于 | `2 >= 1`    | true  |
| \<   | 小于     | `2 < 1`     | true  |
| \<=  | 小于等于 | `2 <= 1`    | true  |

### 布尔

```elixir
true # 布尔值
```

Elixir 还提供了三个布尔算子：`or`、`and`、`not`

```elixir
false and raise("This error will never be raised") # and是短路的
true or raise("This error will never be raised") # or是短路的
```

Elixir 还提供了 `nil` 的概念，表示值的缺失.

对于 `||/2`、`&&/2`、和 `!/1`。这些算符，`false` 和 `nil` 被视为“假”，其他所有值被视为“真值”：

```elixir
1 || true # 1
false || 11 # 11

nil && 13 # nil
true && 17 # 17

!true # false
```

### 原子

原子是一个常数，其值即为其自身名称.

尔值 `true` 和 `false` 还有 `nil` 也是原子, 原子通常以前导词 `:` 作为起始标志.

### 字符串

Elixir 中的字符串用双引号分隔，并用 UTF-8 编码.

```elixir
"hello"  # hello

"hello " <> "world!" # 拼接字符串, 结果为"hello world!"

"hello #{string}!"  # 字符串插值
```

`String` 模块包含许多按 Unicode 标准定义的字符串作的函数：

```elixir
String.upcase("hello") # HELLO
```

### 位串

位串是内存中连续的比特序列.

默认情况下，每个数字在位串中存储 8 位（即 1 字节），但你可以通过 `::n` 修饰符手动指定位数，表示 n 位大小.

```elixir
<<42>> == <<42::8>> # true

<<3::4>> # <<3::size(4)>>

<<0::1, 0::1, 1::1, 1::1>> == <<3::4>> # true

<<1>> == <<257>> # 超过可用配置位数存储的值都会被截断
```

`binaries` 是一种位串，其中位数可被 8 整除.

### 字符列表

charlist 是一个整数列表，其中所有整数都是有效的码点.
只有在特定场景中才会遇到，比如与不接受二进制参数的旧 Erlang 库接口.

```elixir
~c"hello" # 字符列表
```

### 列表

列表是通过链表实现的,方括号来指定数值列表。值可以是任意类型的:

```elixir
[1, 2, true, 3]

[1, 2, 3] ++ [4, 5, 6] # 列表拼接 [1, 2, 3, 4, 5, 6]
[1, true, 2, false, 3, true] -- [true, false] # [1, 2, 3, true]

```

列表中标题是列表的第一个元素, 尾部是列表的其余部分.

```elixir
list = [1, 2, 3]

hd(list) # 1 标题
tl(list) [2,3] 尾部

[0 | list] # [ 0, 1, 2, 3 ]
```

#### 关键字列表

关键字列表具有三个特殊特征

- 键必须是原子
- 键按开发者指定的顺序排列
- 键可以不止一次地发放

```elixir
[parts: 3, trim: true]
# 两种方式
list = [{:parts, 3}, {:trim, true}]

list[:parts] # 访问值
```

### 元组

Elixir 使用卷括号来定义元组。像列表一样，元组可以包含任意值,
并且元组连续地存储元素在内存中.

```elixir
{:ok, "hello"}
tuple_size({:ok, "hello"}) # 2
```

### 映射

存储键值对

```elixir
map = %{:a => 1, 2 => :b}

map[:a] # 获取值
```

### 结构体

```elixir
defmodule User do
  defstruct name: "shug", age: 18
end
```

```elixir
user = %User{} # 创建结构体
user.name # 访问结构体字段

updates = [name: "big shug", age: 20] # 更新字段
struct!(user, updates)

is_map(user) # 结构体的本质是映射
```

### 函数

#### 匿名函数

匿名函数允许我们像存储整数或字符串一样存储和传递可执行代码.
Elixir 中的函数通过名称和元数来区分。函数的元数描述了该函数所接受的参数数.

```elixir
# 定义一个匿名函数
add = fn a, b -> a + b end

add.(1, 2) # 调用匿名函数
```

匿名函数还可以访问定义函数时作用域内的变量。这通常被称为闭包.

```elixir
x = 42

reset = fn -> x = 0 end

reset.() # 函数内部分配的变量不会影响原变量

x # 42
```

闭包守卫

```elixir
f = fn
  x, y when x > 0 -> x + y
  x, y -> x * y
end
```

捕获算子

```elixir
fun = &is_atom/1 # &捕获函数

is_function(fun) # true
fun.(:hello) # true

is_arity_2 = &is_function(&1, 2) # &1表示输入的第一个参数,类似还是&2,&3...

add_one = &(&1 + 1) # 创建更简单的匿名函数
```

## 模式匹配

`=` 被称为匹配算子

```elixir
x = 1 # 1

1 = x # 1

2 = x # 将出现错误

{a, b, c} = {:hello, "world", 42} # 元组匹配

[a, b, c] = [1, 2, 3] # a=1, b=2, c=3

[head | tail] = [1, 2, 3] # head = 1, tail = [2,3]
```

不希望 `=` 重新绑定新的变量

```elixir
x = 1
^x = 2 # 将报错

^x = 1 # 正常
```

## 控制流结构

### case

将一个数值与多种模式进行比较，直到找到匹配的.

```elixir
case {1, 2, 3} do

  {4, 5, 6} ->

    "不匹配"

  {1, x, 3} ->

    "将要匹配的模式, x=2"

  _ ->

    "默认值"
end
```

```elixir
case {1, 2, 3} do

  {1, x, 3} when x > 0 ->

    "带守卫的匹配"

  _ ->

    "默认值"

end
```

### if

在特定条件下进行结构和匹配可以使用 `if`

```elixir
if true do
  "This true!"
end
# 结果为: "This true!"
```

```elixir
if false do
  "这里将不会执行"
end
# 结果为: nil
```

带 `else` 块

```elixir
if nil do
  "这里将不会执行"
else
  "这里将执行"
end
# 结果为: "这里将执行"
```

### cond

在多个条件下检查, 找到第一个被判定真的条件.

```elixir
cond do
  2 + 2 == 5 ->
    "不会为true"
  2 * 2 == 3 ->
    "不会为true"
  true ->
    "默认分支"
end
```

### for

```elixir
for n <- [1, 2, 3, 4], do: n * n

# [1, 4, 9, 16]

values = [good: 1, good: 2, bad: 3, good: 4]
for {:good, n} <- values, do: n * n
# [1, 4, 16]

for n <- 0..5, rem(n, 3) == 0, do: n * n
# [0, 9]

for i <- [:a, :b, :c], j <- [1, 2], do:  {i, j}
# [a: 1, a: 2, b: 1, b: 2, c: 1, c: 2]
```

位串中的使用

```elixir
pixels = <<213, 45, 132, 64, 76, 32, 76, 0, 0, 234, 32, 15>>
for <<r::8, g::8, b::8 <- pixels>>, do: {r, g, b}
# [{213, 45, 132}, {64, 76, 32}, {76, 0, 0}, {234, 32, 15}]
```

使用 `:into` 转换类型

```elixir
for <<c <- " hello world ">>, c != ?\s, into: "head", do: <<c>>

# "headhelloworld"
```

## 模块

定义模块

```elixir
defmodule Math do
  def sum(a, b) do
    a + b
  end
end
```

使用 `do:`

```elixir
defmodule Math do
  def zero?(0), do: true
  def zero?(x) when is_integer(x), do: false
end
```

函数带默认参数

```elixir
defmodule Concat do
  def join(a, b, sep \\ " ") do
    a <> sep <> b
  end
end
```

### 别名

别名是一个大写标识符, 如 `String` 和 `Keyword` 在编译过程中会被转换为原子,
`String` 将转换成原子 `Elixir.String` .

```elixir
is_atom(String) # true
to_string(String) # "Elixir.String"
```

```elixir
alias String, as: Keyword1 # Keyword1 将转换成原子String
alias(String, [as: Keyword1]) # 一样的作用
```

### require

宏（macro）是编译期展开的代码。调用宏需要先 `require` 该模块,
除非用 `import` 把宏导入进来，或宏来自当前模块.

```elixir
Integer.is_odd(3) # 将报错

require Integer

Integer.is_odd(3)
```

### import

把函数/宏直接导入当前模块

```elixir
defmodule Demo do
  import String
  def up(s), do: trim(s) |> upcase()
end
```

```elixir
import List, only: [duplicate: 2] # 只导入`duplicate/2`
```

### use

`use` 模块时, 允许该模块在当前模块中注入任何代码.

```elixir
defmodule MyMod do
  use SomeLib, foo: 1
end

# 概念上类似
defmodule MyMod do
  require SomeLib
  SomeLib.__using__(foo: 1) # __using__/1 必须是宏
end
```

### 模块属性

常用属性:

- `@moduledoc` : 当前模块提供文档
- `@doc` : 函数或宏提供文档
- `@spec` : 函数提供类型规范
- `@behaviour` : 指定 OTP 或用户定义的行为

示例

```elixir
defmodule Math do
  @moduledoc """
  Provides math-related functions.

  ## Examples

      iex> Math.sum(1, 2)
      3

  """

  @doc """
  Calculates the sum of two numbers.
  """
  def sum(a, b), do: a + b
end
```

属性作为临时储存

```elixir
defmodule MyServer do
  @service URI.parse("https://example.com")
  IO.inspect(@service)
end
```

```elixir
defmodule MyApp.Status do
  @service URI.parse("https://example.com")
  def status(email) do
    SomeHttpClient.get(@service)
  end
end
```

模块属性在编译时定义，属性将被替换为其返回值

```elixir
defmodule MyApp.Status do
  def status(email) do
    SomeHttpClient.get(%URI{
      authority: "example.com",
      host: "example.com",
      port: 443,
      scheme: "https"
    })
  end
end
```

编译时常量

```elixir
@hours_in_a_day 24
```

但是更推荐使用

```elixir
defp hours_in_a_day(), do: 24
```

## 可枚举与流

对集合的操作

### 可枚举

`Enum` 模块提供了大量功能，用于从枚举中转换、排序、分组、过滤和检索项.

```elixir
Enum.map(1..3, fn x -> x * 2 end)
# [2, 4, 6]
```

管道运算符 `|>` 左侧表达式的输出作为右侧函数调用的第一个参数传递.

### 流

流是懒惰的、可组合的可枚举.

```elixir
1..100_000 |> Stream.map(&(&1 * 3))
#Stream<[enum: 1..100000, funs: [#Function<49.70938898/1 in Stream.map/2>]]>
```

## 协议

协议是 Elixir 中实现多态性的一种机制.

```elixir
defprotocol Utility do
  @spec type(t) :: String.t()
  def type(value)
end

defimpl Utility, for: BitString do
  def type(_value), do: "string"
end

defimpl Utility, for: Integer do
  def type(_value), do: "integer"
end
```

```elixir
Utility.type("foo") # "string"
```

可以实现协议的数据类型:

- `Atom`
- `BitString`
- `Float`
- `Function`
- `Integer`
- `List`
- `Map`
- `PID`
- `Port`
- `Reference`
- `Tuple`

> 虽然结构体是映射, 但是结构体与映射不共享协议实现

```elixir
defmodule User do
  defstruct [:name, :age]
end

defimpl Utility, for: User do
  def type(_value), do: "User"
end
```

通过 `Any` 为类型推导协议实现和自动为所有类型实现协议.

为 `Any` 实现协议

```elixir
defimpl Utility, for: Any do
  def type(_value), do: "Any"
end
```

通过 `derive` 推导实现

```elixir
defmodule OtherUser do
  @derive [Utility]
  defstruct [:name, :age]
end
```

自动为所有类型实现协议

```elixir
defprotocol Utility do
  @fallback_to_any true
  @spec type(t) :: String.t()
  def type(value)
end
```

## 符号

符号以波浪号（~）开头，后面跟一个小写字母或一个或多个大写字母，然后是分隔符。最终分隔符后添加可选修饰符.

以用于创建正则表达式的 `~r` 为例:

```elixir
regex = ~r/foo|bar/

"foo" =~ regex # true
```

符号支持 8 种不同的分隔符

```elixir
~r/hello/
~r|hello|
~r"hello"
~r'hello'
~r(hello)
~r[hello]
~r{hello}
~r<hello>
```

### 内置符号

- `~r` : 创建正则表达式.
- `~s` : 用于生成字符串, 与 `""` 作用一样.
- `~c` : 创建字符列表.
- `~w` : 生成单词列表, `~w(foo bar bat)` 结果为 `["foo", "bar", "bat"]` ,
  支持 `c`、`s` 和 `a` 修饰符, 分别代表字符、字符串和原子.
- `~D` : 创建一个 `%Date{}` 结构体,包括字段 `year` , `month` , `day` , 和 `calendar` , `~D[2019-10-31]` .
- `~T` : 创建一个 `%Time{}` 结构体,包括字段 `hour` , `minute` , `second` , `microsecond` ,
  和 `calendar` , `~T[23:00:07.0]` .
- `~N` : 创建一个 `%NaiveDateTime{}` 结构体,包括 `Date` 和 `Time` 的字段, `~N[2019-10-31 23:00:07]` .
- `~U` : 创建一个 `%DateTime{}` 结构体, 字段和 `%NaiveDateTime{}` 类似,但是添加了时区字段, `~U[2019-10-31 19:59:03Z]` ,
- 大写变体: 如 `~S` 与 `~s` 相比不支持转义字符.

### 自定义符号

使用符号 `~r/foo/i` 等同于用二进制和字符列表作为参数调用 `sigil_r` .

```elixir
sigil_r(<<"foo">>, [?i])
# ~r"foo"i
```

```elixir
defmodule MySigils do
  def sigil_i(string, []), do: String.to_integer(string)
  def sigil_i(string, [?n]), do: -String.to_integer(string)
end
```

使用自定义符号

```elixir
mport MySigils

~i(13) # 13
```

## 异常处理

### 错误

运行时错误可以通过使用 `raise/1` 产生 `RuntimeError` .

```elixir
raise "oops"
```

使用 `raise/2` , 产生其他错误.

```elixir
raise ArgumentError, message: "invalid argument foo"
```

自定义错误

```elixir
defmodule MyError do
  defexception message: "default message"
end
```

产生自定义错误.

```elixir
raise MyError, message: "custom message"
```

挽救错误.

需要错误内容

```elixir
try do
  raise "oops"
rescue
  e in RuntimeError -> e
end
```

不需要错误内容

```elixir
try do
  raise "oops"
rescue
  RuntimeError -> "Error!"
end
```

### 抛出与捕获

> 实际使用非常少.

```elixir
try do
  Enum.each(-50..50, fn x ->
    if rem(x, 13) == 0, do: throw(x)
  end)
  "Got nothing"
catch
  x -> "Got #{x}"
end
```

### 退出

当进程因“自然原因”（例如未处理的异常）而终止时，它会发送退出信号。进程也可能通过显式发送退出信号而终止.

```elixir
spawn_link(fn -> exit(1) end)
```

`try/catch` 拦截 `exit` .

```elixir
try do
  exit("I am exiting")
catch
  :exit, _ -> "not really"
end
```

`catch` 也可以在函数体中使用

```elixir
defmodule Example do
  def matched_catch do
    exit(:timeout)
  catch
    :exit, :timeout ->
      {:error, :timeout}
  end

  def mismatched_catch do
    exit(:timeout)
  catch
    :exit, :explosion ->
      {:error, :explosion}
  end
end
```

### After

需要确保资源在某些可能引发错误的作后被清理.

```elixir
{:ok, file} = File.open("sample", [:utf8, :write])

try do
  IO.write(file, "olá")
  raise "oops, something went wrong"
after
  File.close(file)
end
```

### Else

```elixir
x = 2

try do
  1 / x
rescue
  ArithmeticError ->
    :infinity
else
  y when y < 1 and y > -1 ->
    :small
  _ ->
    :large
end
```

## 进程

在 Elixir 中，所有代码都运行在进程内部。进程彼此隔离，并发运行，并通过消息传递进行通信。进程不仅是 Elixir 并发的基础，还为构建分布式且容错程序提供了手段.

### 创建进程

```elixir
spawn(fn -> 1 + 2 end)
```

获取当前 Pid

```elixir
self()
```

### 发送和接收消息

`send/2` 发送消息给进程, `receive/1` 接收消息.

```elixir
send(self(), {:hello, "world"})

receive do
  {:hello, msg} -> msg
  {:world, _msg} -> "won't match"
end
```

设置超时

```elixir
receive do
  {:hello, msg}  -> msg
after
  1_000 -> "nothing after 1s"
end
```

### 连接进程

`spawn/1` 进程失败只是记录了一个错误, 但父进程仍在运行.
`spawn_link/1` 一个进程的失败传播到另一个进程.

也可以通过 `Process.link/1` 手动连接.

### 任务

任务是在 `spawn` 函数基础上构建，以提供更好的错误报告和内省.

```elixir
Task.start(fn -> raise "oops" end)
```

使用 `Task.spawn/1` 和 `Task.spawn_link/1` 代替 `spawn/1` 和 `spawn_link/1` .

### 状态

构建一个需要状态来保持应用配置的应用, 或者需要解析文件并将其存储在内存中.

```elixir
defmodule KV do
  def start_link do
    Task.start_link(fn -> loop(%{}) end)
  end

  defp loop(map) do
    receive do
      {:get, key, caller} ->
        send(caller, Map.get(map, key))
        loop(map)
      {:put, key, value} ->
        loop(Map.put(map, key, value))
    end
  end
end
```

使用

```elixir
{:ok, pid} = KV.start_link()

send(pid, {:get, :hello, self()})
```

通过 `Agents` 简化.

```elixir
{:ok, pid} = Agent.start_link(fn -> %{} end)

Agent.update(pid, fn map -> Map.put(map, :hello, :world) end)

Agent.get(pid, fn map -> Map.get(map, :hello) end)
```

## IO 与文件系统

### IO 模块

IO 模块是 Elixir 中读写标准输入/输出(:stdio)、标准错误(:stderr)、文件及其他 IO 设备的主要机制.

```elixir
IO.puts("hello world") # 输出到标准输出

IO.gets("yes or no? ") # 读取标准输入

IO.puts(:stderr, "hello world") # 输出到标准错误输出
```

### File 模块

包含作为 IO 设备打开文件的功能, 默认情况下，文件以二进制模式打开,
需要使用 IO 模块中的 `IO.binread/2` 和 `IO.binwrite/2` 函数

```elixir
{:ok, file} = File.open("path/to/file/hello", [:write])

IO.binwrite(file, "world")

File.close(file)
```

### Path 模块

`Path` 模块提供了处理路径的工具.

```elixir
Path.join("foo", "bar") # "foo/bar"
```

## Erlang 库

Elixir 与 Erlang 库提供了极佳的互作性,

Erlang 的模块名称都是原子.

```elixir
# 访问binary模块
:binary.bin_to_list("Ø")
```
