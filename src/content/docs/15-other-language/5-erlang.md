---
title: erlang语言
---

## 介绍

Erlang 是一门为高并发、分布式、强可靠系统而设计的函数式编程语言，同时也是一个完整的平台（Erlang/OTP）。

Erlang 的目标

> 系统要长期运行、不中断、可自我修复

`erl` 是 Erlang/OTP 的 BEAM 虚拟机启动器 + 交互式 shell。它既能进入 REPL，也能在不进入 shell 的情况下运行一段代码并退出.

进入交互式 shell

```bash
erl
```

常用 shell 命令

- `h().` / `help().` : 显示帮助
- `f()` / `f(X)` : 移除变量绑定
- `q().` : 退出
- `c(Mod).` : 编译 Mod.erl
- `l(Mod).` : 加载/热加载模块
- `code:which(Mod).` : 看模块从哪里加载
- `code:get_path().` : 当前代码路径

编译模块

```bash
erl -compile Mod

erl -make # 类似make编译
```

## 注释与语法

Erlang 只有行注释, 以 `%` 开始到本行结束，全是注释。

```erlang
X = 10.   % 这也是注释
```

erlang 的末尾符号

`.` 结束符

- 结束函数定义
- 结束 shell 输入的一条表达式

```erlang
foo() ->
    ok.
```

`,` 顺序执行

> 先执行左边，再执行右边，返回右边的值

```erlang
foo() ->
    io:format("hello~n"),
    io:format("world~n"),
    ok.
```

`;` 或者/下一个分支

> 如果前一个分支匹配失败，尝试下一个

在 `case` 中使用

```erlang
case X of
    1 -> one;
    2 -> two;
    _ -> other
end
```

在 `在函数多子句中`

```erlang
abs(X) when X >= 0 ->
    X;
abs(X) ->
    -X.
```

在 `if` 中

```erlang
if
    X > 0 -> positive;
    X < 0 -> negative;
    true  -> zero
end
```

在 `receive` 中

```erlang
receive
    {ok, V} -> V;
    error   -> 0
end
```

## 数据类型

### Term

任意类型的数据

### Number

数字有两种类型：整数和浮点数

```erlang
X1 = 123. % 123

X2 = -1_234_567_890 % -1234567890

X3 = 2.0e3. % 2000.0

X4 = $a % 97, 字符的 ASCII 值或 Unicode 码点

X5 = 16#ff % 255, base#digits base必须是范围 2 到 36 的整数，digits为 0-9 加上字母 A-Z（大写或小写）

X6 = 16#ff.fe#e+2. % 65534.0, base#digits.digits#eexponent, digits.digits*(base*exponent)
```

数值比较

> `0.0 =:= -0.0` 结果为 `false`

|符号|介绍|示例|结果|
|---|---|---|---|
|==|等于|`1 == 1.0`|true|
|=:=|完全等于|`1 =:= 1.0`|false|
|/=|不等|`1 /= 1.0`|false|
|=/=|完全不等|`1 =/= 1.0`|true|
|\>|大于|`2 > 1`|true|
|\>=|大于等于|`2 >= 1`|true|
|\<|小于|`2 < 1`|true|
|\<=|小于等于|`2 <= 1`|true|

### Atom

Atom 是一个字面量, Atom 可以是任意字符，但是如果包含字母数字字符、下划线 ( \_ ) 或 @ 以外的字符，则应将其用单引号括起来。

```erlang
hello
phone_number
name@node
'Monday'
'phone number'
```

### Bit Strings and Binaries

位串用于存储未类型化的内存区域。

由能被 8 整除的比特数组成的 `Bit strings` 称为 `binaries`。

`is_bitstring/1` 测试一个 `term` 是否为 `bit string`，而 `is_binary/1` 测试一个 `term` 是否为 `binary`。

```erlang
is_bitstring(<<1:1>>). % true

is_binary(<<1:1>>). % false
```

### Reference

一个在连接的节点之间独特的 `term`，通过 `make_ref/0` 创建, `is_reference/1` 判断 `term` 是否为 `Reference` .

```erlang
Ref = make_ref().
is_reference(Ref). % true
```

### Fun

`Fun` 是一种函数式对象. 可以通过 `is_function/1` 和 `is_function/2` 判断 `term` 是否为函数.

```erlang
Fun1 = fun (X) -> X+1 end.
is_function(F). % true,
is_function(F, 0). % false
is_function(F, 1). % true
```

### Port Identifier

端口标识符用于标识 Erlang 端口。

`open_port/2` 返回一个端口标识符。`is_port/1` 测试一个 `term` 是否为 `Port Identifier`。

### Pid

PID 是进程标识符（Process Identifier）的缩写。每个进程都有一个 PID 来标识该进程。在连接的节点上，存活的进程的 PID 是唯一的。但是，已终止进程的 PID 可能会在一段时间后被新进程重新使用。

`self/0` 返回调用进程的 PID, `is_pid/1` 测试一个 `term` 是否为 PID。

### Tuple

元组是一种复合数据类型，包含固定数量的元素. `is_tuple/1` 判断一个 `term` 是否为 `tuple` .

```erlang
{Term1,...,TermN}
```

```erlang
P = {1,2,3,4,5, {id, 2}}. % Tuple 可以存不同类型的数据

element(1,P). % 1, element/2 返回指定位置的元素

P2 = setelement(2,P,25). % setelement/3 设置Tuple对应位置的元素,返回新的Tuple

tuple_size(P). % 6

is_tuple(P). % true
```

### Map

`Map` 是一种具有可变数量键值关联的复合数据类型

```erlang
#{Key1 => Value1, ..., KeyN => ValueN}
```

```erlang
M1 = #{name => shug, age => 18}.

maps:get(name, M1). % shug 获取map的元素

M2 = maps:update(age, 20, M1). % 更新Map并返回新Map

map_size(M1). % 2
```

### List

`List` 是一种具有可变数量的复合数据类型。

```erlang
[Term1,...,TermN]
```

```erlang
L1 = [shug,18,end].

[H|T] = L1. % H = shug, T = [ 18, end ]

length(L1). % 3

L2 = [d|T]. % [ d, 18, end ]
```

### String

字符串被双引号（"）包围，但在 Erlang 中不是数据类型。字符串 "hello" 是列表 `[$h，$e，$l，$l，$o]`` 的简写，即` [104,101,108,108,111]`,
字符串也可以写成三引号字符串，可以跨行缩进，以跟随周围代码的缩进,
通过使用更多双引号字符作为分隔符，可以在内容行开头连续写出双引号字符。

```erlang
S1 = """
  Line "1"
  Line "2"
  """.

S2 = """""
    """"
  """"".
```

### Sigil

`Sigil` 不是 Erlang 语法；这是 Elixir 的字面量前缀机制。Erlang 字符串、原子、二进制和列表应按 Erlang 词法语法分别说明。`Sigil` 主要提供两个功能：

- 简洁的方式来创建 UTF-8 编码的二进制字符串
- 编写逐字字符串（无需转义 \字符），例如正则表达式。

`Sigil` 以“波浪号”（~）开头，后跟定义符文类型的名称。紧接着是 `Sigil` 内容;一个角色序列内容分隔符。允许的分隔符是以下起始 - 端分隔符对: `() [] {} <>`，或这些既是起始分隔符又是结尾分隔符的字符：`/ | ' " #`。也可以使用三引号字符串分隔符。

- `~` 默认 `Sigil` UTF-8 编码 `binary/0` 的简写, 该符号不影响字符转义序列，因此三引号字符串分隔符与 `~B` 相同，其他字符串分隔符与 `~b` 相同.
- `~b` 二进制 `Sigil` , UTF-8 编码 `binary/0` 的简写,类似于调用 `unicode:characters_to_binary/1` ,
  转义序列与 `~s` 相同.
- `~B` 逐字二进制 `Sigil`。与 `~b` 相比，但符文内容是逐字解释的。
- `~s` 字符串 `Sigil` , `string()` 的简写, 字符转义序列和普通 `string/0` 是一样的
- `~S` 逐字字符串 `Sigil`。相比 `~s`，但 `Sigil` 内容是逐字的,在三引号字符串上使用这个符号实际上没有任何作用.

### Record

`Record` 是一种用于存储固定数量元素的数据结构。它有命名字段，类似于 C 语言中的结构体。然而，`Record` 并不是真正的数据类型。相反，`Record` 表达式在编译过程中会被翻译成元组表达式

```erlang title=person.erl
-module(person).
-export([new/2]).

-record(person, {name, age}).

new(Name, Age) ->
    #person{name=Name, age=Age}.
```

```erlang
person:new(shug, 18). % 使用Record
```

### Boolean

Erlang 中没有布尔数据类型。取而代之的是 `Atom` 的 `true` 和 `false` 用于表示布尔值
`is_boolean/1` 测试一个 `term` 是否是布尔值

```erlang
true or false. % true

is_boolean(true). % true
```

### 转义序列

|序列|介绍|
|---|---|
|`\b`|退格(ASCII 代码 8)|
|`\d`|删除(ASCII 代码 127)|
|`\e`|ESC(ASCII 代码 27)|
|`\f`|换页(ASCII 代码 12)|
|`\n`|换行(ASCII 代码 10)|
|`\r`|回车(ASCII 代码 13)|
|`\s`|空格(ASCII 代码 32)|
|`\t`|水平 Tab(ASCII 代码 9)|
|`\v`|垂直 Tab(ASCII 代码 11)|
|`\ABC`|带有八进制表示的字符 A,B,C 的范围是 0-7|
|`\xABC`|带有十六进制表示的字符 A,B,C 的范围是 0-f|
|`\x{X...}`|带有十六进制表示的字符, `X...` 是一个或多个十六进制字符|
|`\^a...\^z \^A...\^Z`|控制字符形式|
|`\^@`|NUL (ASCII 代码 0)|
|`\^[`|ESC (ASCII 代码 27)|
|`\^\`|文件分隔符 (ASCII 代码 28)|
|`\^]`|组分隔符 (ASCII 代码 29)|
|`\^^`|记录分隔符 (ASCII 代码 30)|
|`\^_`|单元分隔符 (ASCII 代码 31)|
|`\^?`|删除 (ASCII 代码 127)|
|`\‘`|单引号|
|`\"`|双引号|
|`\\`|反斜线|

### 类型转换

```erlang
atom_to_list(hello). % "hello"

list_to_atom("hello"). % hello

binary_to_list(<<"hello">>). % "hello"

binary_to_list(<<104,101,108,108,111>>). % "hello"

list_to_binary("hello"). % <<104,101,108,108,111>>

float_to_list(7.0). % "7.00000000000000000000e+00"

list_to_float("7.000e+00"). % 7.0

integer_to_list(77). % "77"

list_to_integer("77"). % 77

tuple_to_list({a,b,c}). % [a,b,c]

list_to_tuple([a,b,c]). % {a,b,c}

term_to_binary({a,b,c}). % <<131,104,3,100,0,1,97,100,0,1,98,100,0,1,99>>

binary_to_term(<<131,104,3,100,0,1,97,100,0,1,98,100,0,1,99>>). % {a,b,c}

binary_to_integer(<<"77">>). % 77

integer_to_binary(77). % <<"77">>

float_to_binary(7.0). % <<"7.00000000000000000000e+00">>

binary_to_float(<<"7.000e+00">>). % 7.0
```

## 模式匹配

变量通过模式匹配机制绑定到数值。模式匹配发生在评估 `case`、`receive`、`try` 和匹配算子 `=` 表达式时。

在模式匹配中，左侧模式与右侧项进行匹配。如果匹配成功，模式中所有未绑定的变量都将被绑定。如果匹配失败，则会提出异常。

```erlang
X = 1.
X = 2. % 将报错, 因为X已经是1, 1和2不匹配

{X, Y} = {1, 2}. % X的值是1,匹配的,Y没有绑定值,Y将绑定值2
```

## 模块

一个模块由一系列属性和函数声明组成，每个声明以一个句号（.）结束。

一个示例模块

```erlang
-module(m).          % 模块属性 模块名称, 与文件名称一致,文件名称应该为`m.erl`
-export([fact/1]).   % 模块属性 导出函数, 使函数模块外部可见

fact(N) when N>0 ->  % 函数定义
    N * fact(N-1);
fact(0) ->
    1.
```

### 模块属性

模块属性由一个标签和一个值组成：

```erlang
-Tag(Value).
```

`Tag` 必须是一个原子, `Value` 必须是一个字面意义上的 `term` .
如果字面意义上的 `Value` 具有语法 `Name/Arity`（其中 `Name` 是一个原子，`Arity` 是正整数），则 `Name/Arity`。翻译为 `{Name， Arity}`。

任何模块属性都可以被指定。属性存储在编译后的代码中，可以通过调用 `Module:module_info(attributes)` 或使用 `STDLIB` 中的模块 `beam_lib` 来检索。

### 预定义模块属性

> 预定义的模块属性应置在任何函数声明之前

- `-module(Module).` 模块声明，定义模块名称。`Module` 这个原子名应与文件名相同，但去除扩展名 `.erl`
- `-export(Functions).` 导出函数。指定模块内定义的函数中，哪些从模块外部可见。`Functions` 是一个列表 `[Name1/Arity1, ..., NameN/ArityN]`
- `-import(Module, Functions).` 导入函数。可以与局部函数一样称为，即不包含任何模前缀
- `-moduledoc(Documentation).` 或 `-moduledoc Documentation.` 该模块的用户文档。文档的允许值与 `-doc` 相同。
- `-compile(Options).` 编译器选项。选项是一个选项，也可以是选项列表。该属性在编译模块时被添加到选项列表中。
- `-vsn(Vsn).` 模块版本。Vsn 是任何字面意义上的 `term` .
- `-on_load(Function).` 该属性指定将要运行的函数模块加载时自动触发。
- `-nifs(Functions).` 指定(Native Implemented Functions)，在模块内定义，并且需要添加到 `-export` 导出.
  在 `-on_load` 中使用 `erlang:load_nif/2` 模块加载.

### Behaviour 模块属性

可以指定该模块是某个函数的回调模块

```erlang
-behaviour(Behaviour).
```

原子 `Behaviour` 给出了行为的名称，它可以是用户定义的行为，也可以是以下 OTP 标准行为

模块的回调函数可以直接通过导出的函数 `behaviour_info/1` 来指定：

```erlang
behaviour_info(callbacks) -> Callbacks.
```

也可以使用 `-callback` 属性

```erlang
-callback Name(Arguments) -> Result.
```

`Arguments` 是一个包含零个或多个参数的列表。建议使用 `-callback` 属性，因为额外的类型信息可供工具用于生成文档或查找差异。

### 其他属性

记录定义

```erlang
-record(Record, Fields).
```

预处理器

```erlang
-include("SomeFile.hrl").
-define(Macro, Replacement).
```

修改预定义宏 `?FILE` 和 `?LINE`

```erlang
-file(File, Line).
```

指定类型和函数规范

```erlang
-type my_type() :: atom() | integer().
-spec my_function(integer()) -> integer().
```

文档属性

```erlang
-doc("Example documentation").
example() -> ok.
```

特性指令

```erlang
-feature(FeatureName, enable | disable).
```

模块编译时会生成两个导出函数

- Module:module_info/0
- Module:module_info/1

用于返回模块信息

## 函数

函数声明是由分号分隔的函数子句序列，以句点（.）结尾。函数体由一系列用逗号（,）分隔的表达式组成

参数个数 N 称为函数的元数。一个函数由模块名、函数名和元数唯一确定。也就是说，即使两个函数名称相同且位于同一模块中，但元数不同，它们也是两个不同的函数。

```erlang
Name(Pattern11,...,Pattern1N) [when GuardSeq1] ->
    Body1;
...;
Name(PatternK1,...,PatternKN) [when GuardSeqK] ->
    BodyK.
```

如果函数体的最后一个表达式是函数调用，则执行尾递归调用。这样做是为了确保不会消耗系统资源，例如调用栈。这意味着使用尾递归调用的无限循环不会耗尽调用栈，并且（理论上）可以无限运行下去。

## 类型与函数规范

> 类型和函数规范不是给编译器用的，是给“人 + Dialyzer + 工具链”用的

```erlang
Type :: any()      %% 任意类型
      | none()     %% 不包含任何类型
      | dynamic()  %% 静态未知的类型
      | pid()
      | port()
      | reference()
      | []                    %% nil
      | Atom
      | Bitstring
      | float()
      | Fun
      | Integer
      | List
      | Map
      | Tuple
      | Union
      | UserDefined           %% 用户自定义类型

Atom :: atom()                %% 所有原子类型
      | Erlang_Atom           %% 'foo', 'bar', ...

Bitstring :: <<>>
           | <<_:M>>          %% M 是一个 Integer_Value 计算结果是一个正整数
           | <<_:_*N>>        %% N 是一个 Integer_Value 计算结果是一个正整数
           | <<_:M, _:_*N>>

Fun :: fun()                  %% 任意函数
     | fun((...) -> Type)     %% 任意元数, 返回值要匹配
     | fun(() -> Type)
     | fun((TList) -> Type)

Integer :: integer()          %% 任意整数
         | Integer_Value
         | Integer_Value..Integer_Value      %% 整数的范围, 包括边界

Integer_Value :: Erlang_Integer              %% ..., -1, 0, 1, ... 42 ...
               | Erlang_Character            %% $a, $b ...
               | Integer_Value BinaryOp Integer_Value %% 1 + 1
               | UnaryOp Integer_Value       %% -1

BinaryOp :: '*' | 'div' | 'rem' | 'band' | '+' | '-' | 'bor' | 'bxor' | 'bsl' | 'bsr'

UnaryOp :: '+' | '-' | 'bnot'

List :: list(Type)                           %% 元素是Type类型的列表
      | maybe_improper_list(Type1, Type2)    %% Type1=内容，Type2=终止
      | nonempty_improper_list(Type1, Type2) %% Type1=内容，Type2=终止
      | nonempty_list(Type)                  %% 元素是Type类型的非空列表

Map :: map()                                 %% 任意Map
     | #{}                                   %% 表示空Map
     | #{AssociationList}

Tuple :: tuple()                             %% 任意Tuple
       | {}                                  %% 表示空的Tuple
       | {TList}

AssociationList :: Association
                 | Association, AssociationList

Association :: Type := Type                  %% 表示强制关联
             | Type => Type                  %% 表示可选关联

TList :: Type
       | Type, TList

Union :: Type1 | Type2
```

### 预定义别名

|内置类型|预定义别名|
|---|---|
|`term/0`|`any/0`|
|`binary/0`|`<<_:_*8>>`|
|`nonempty_binary/0`|`<<_:8, _:_*8>>`|
|`bitstring/0`|`<<_:_*1>>`|
|`nonempty_bitstring/0`|`<<_:1, _:_*1>>`|
|`boolean/0`|`'false' \ 'true'`|
|`byte/0`|`0..255`|
|`char/0`|`0..16#10ffff`|
|`nil/0`|`[]`|
|`number/0`|`integer/0 \ float/0`|
|`list/0`|`[any()]`|
|`maybe_improper_list/0`|`maybe_improper_list(any(), any())`|
|`nonempty_list/0`|`nonempty_list(any())`|
|`string/0`|`[char()]`|
|`nonempty_string/0`|`[char(), ...]`|
|`iodata/0`|`iolist() \ binary()`|
|`iolist/0`|`maybe_improper_list(byte() \ binary() \ iolist(), binary() \ [])`|
|`map/0`|`#{any() => any()}`|
|`function/0`|`fun()`|
|`module/0`|`atom/0`|
|`mfa/0`|`{module(),atom(),arity()}`|
|`arity/0`|`0..255`|
|`identifier/0`|`pid() \ port() \ reference()`|
|`node/0`|`atom/0`|
|`timeout/0`|`'infinity' \ non_neg_integer()`|
|`no_return/0`|`none/0`|
|`non_neg_integer/0`|`0..`|
|`pos_integer/0`|`1..`|
|`neg_integer/0`|`..-1`|

### 用户自定义类型的类型声明

```erlang
-type my_struct_type() :: Type.
-opaque my_opaq_type() :: Type.
-nominal my_nominal_type() :: Type.
```

- `type` 根据结构进行类型检查, `-type t1() :: integer()` 和 `-type t1() :: integer()` 是一种类型
- `nominal` 根据用户定义的名称进行类型检查, `-nominal t1() :: integer()` 和 `-nominal t1() :: integer()` 不是一种类型
- `opaque` 其结构不应从定义它们的模块外部可见

类型声明也可以通过在括号内包含类型变量来进行参数化。类型变量的语法与 Erlang 变量相同，即以大写字母开头。

```erlang
-type orddict(Key, Val) :: [{Key, Val}].
```

模块可以导出某些类型，以声明其他模块可以将其作为远程类型引用。

```erlang
-export_type([T1/A1, ..., Tk/Ak]).
```

这里 `Ti` 是类型名称，`Ai` 是类型的参数数量。

可以在记录的声明中指定记录字段的类型

```erlang
-record(rec, {field1 :: Type1, field2, field3 :: Type3}). %% field2 有默认类型 any()
-record(rec, {field1 = [] :: Type1, field2, field3 = 42 :: Type3}). %% 如果字段存在初始值，则必须在初始化之后声明类型
```

### 函数规范

使用 `-spec` 参数可以给出函数的规范

```erlang
-spec Function(ArgType1, ..., ArgTypeN) -> ReturnType.
```

函数规范可以重载

```erlang
-spec foo(T1, T2) -> T3;
         (T4, T5) -> T6.
```

函数规范类似守卫的子类型约束进行约束

```erlang
-spec id(X) -> X when X :: tuple().
```

## 表达式

### 表达式评估

除非另有明确说明，否则所有子表达式都会在表达式本身求值之前进行求值。

`Expr1` 和 `Expr2` 也是表达式，它们会先被求值（顺序不限），然后再执行加法运算。

最简单的表达形式是 `term` , 即其中之一 `integer/0`，`float/0`，`atom/0`，`string/0`，`list/0`，`map/0` 或 `tuple/0`。返回值是 `term` 本身。

### 变量

变量是一种表达式。如果变量绑定到一个值，则返回值就是该值。未绑定的变量仅允许用于模式中。

变量以大写字母或下划线（\_）开头。变量可以包含字母数字字符、下划线和 @。

匿名变量用下划线 (\_) 表示，当需要变量但其值可以忽略时可以使用匿名变量。

变量名示例

```erlang
X
Name1
PhoneNumber
Phone_number
_
_Height
name@node
```

### 模式

模式与 `term` 具有相同的结构，但可以包含未绑定变量。

如果 `Pattern1` 和 `Pattern2` 是有效模式

```erlang
Pattern1 = Pattern2
```

模式在函数参数中的使用

```erlang
f({connect,_,To,_,_} = Signal, To) ->
    ...;
f(Signal, To) ->
    ignore.
```

模式中的字符串前缀

```erlang
f("prefix" ++ Str) -> ...
%% 两种方式作用一样
f([$p,$r,$e,$f,$i,$x | Str]) -> ...
```

如果算术表达式满足以下两个条件，则可以在模式中使用

- 仅使用数值运算符或位运算符。
- 经过验证后，其值可以评估为一个常数

```erlang
case {Value, Result} of
    {?THRESHOLD+1, ok} -> ...
```

匹配操作符(=)

```erlang
Pattern = Expr
```

如果匹配成功，则模式中任何未绑定的变量都会被绑定，并返回 `Expr` 的值。

```erlang
{A, B} = T = {answer, 42}.
A. %% answer
B. %% 42
T. %% {answer,42}
```

复合模式运算符(=)

`=` 具体指哪个运算符取决于上下文.

复合模式运算符用于从两个模式构造复合模式。复合模式在所有接受模式的地方都适用。如果复合模式的所有组成模式都匹配，则该复合模式匹配。

复合模式中的某个模式不能使用同一复合模式的其他子模式中绑定的变量（例如映射模式中的键或二进制模式中的大小）

```erlang
fun(#{Key := Value} = #{key := Key}) -> Value end. %% 复用了Key, 运行失败

F = fun({A, B} = E) -> {E, A + B} end, F({1,2}). %% {{1,2},3}
G = fun(<<A:8,B:8>> = <<C:16>>) -> {A, B, C} end, G(<<42,43>>). %% {42,43,10795}
```

匹配运算符可以在任何允许使用表达式的地方使用。它用于将表达式的值与模式进行匹配。如果按顺序应用多个匹配运算符，它们将从右到左依次进行计算。

```erlang
M = #{key => key2, key2 => value}.

f(Key), #{Key := Value} = #{key := Key} = M, Value. %% value, 从右到左匹配
```

### 函数调用

```erlang
ExprF(Expr1,...,ExprN) %% ExprF 必须是一个原子或求值为一个函数
ExprM:ExprF(Expr1,...,ExprN) %% 远程函数调用或外部函数调用
```

`ExprF` 是一个原子

```erlang
handle(Msg, State)
spawn(m, init, [])
```

`ExprF` 是一个函数

```erlang
Fun1 = fun(X) -> X+1 end, Fun1(3). %% 4

fun lists:append/2([1,2], [3,4]). %% [1,2,3,4],
%% fun lists:append/2 先获取函数lists:append/2, 再调用
```

本地函数名称与自动导入的 BIF 冲突

在 Erlang/OTP R14A（ERTS 版本 5.8）之前，如果隐式限定函数调用的函数名与自动导入的 BIF 同名，则总是调用该 BIF。在较新版本的编译器中，则会调用本地函数。

```erlang
-export([length/1,f/1]).

-compile({no_auto_import,[length/1]}). % erlang:length/1 不再自动导入

length([]) ->
    0;
length([H|T]) ->
    1 + length(T). %% 调用本地函数 length/1

f(X) when erlang:length(X) > 3 -> %% 调用 erlang:length/1,
    long.
```

### If

```erlang
if
    GuardSeq1 ->
        Body1;
    ...;
    GuardSeqN ->
        BodyN
end
```

`if` 表达式的各个分支会按顺序扫描，直到找到一个计算结果为真的守卫序列 `GuardSeq`。然后执行相应的操作。对 Body（由 , 分隔的表达式序列）进行求值。

```erlang
is_greater_than(X, Y) ->
    if
        X > Y ->
            true;
        true -> % 'else' 分支
            false
    end
```

### Case

```erlang
case Expr of
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
end
```

表达式 `Expr` 被求值，模式 `Pattern` 被依次处理。与结果进行匹配。如果匹配成功，并且满足可选的保护序列。如果 `GuardSeq` 为真，则对相应的 Body 进行评估。

```erlang
is_valid_signal(Signal) ->
    case Signal of
        {signal, _What, _From, _To} ->
            true;
        {signal, _What, _To} ->
            true;
        _Else ->
            false
    end.
```

### Maybe

`maybe` 代码块中的表达式按顺序求值。如果所有表达式都成功求值，则 `maybe` 代码块的返回值为 0。

```erlang
maybe
    Expr1,
    ...,
    ExprN
end
```

`maybe` 可以通过条件匹配表达式来中断执行

```erlang
Expr1 ?= Expr2
```

如果 `Expr1` 和 `Expr2` 不匹配, `maybe` 将返回 `Expr2` 的值

`maybe` 代码块可以添加 `else` 子句, 如果条件匹配运算符失败,则将失败的表达式与 `else` 和 `end` 关键字之间所有子句中的模式进行匹配。如果匹配成功且可选的保护序列 `GuardSeq` 为真，则执行相应的操作。对响应 `Body` 进行求值。响应体返回的值即为返回值。

```erlang
maybe
    Expr1,
    ...,
    ExprN
else
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
end
```

### Send

```erlang
Expr1 ! Expr2
```

将 `Expr2` 的值作为消息发送给 `Expr1` 指定的进程。`Expr2` 的值也是该 `Expr2` 的返回值。

`Expr1` 必须解析为进程 ID、别名（引用）、端口、已注册名称（原子）或元组 `{Name,Node}`。Name 是一个原子，Node.js 是节点名称，也是一个原子。

- 如果 `Expr1` 计算结果是一个名称，但该名称尚未注册，则为 badarg 运行时发生错误。
- 向引用发送消息永远不会失败，即使该引用不再是（或从来都不是）别名。
- 即使 pid 指向一个不存在的进程，向 pid 发送消息也永远不会失败。
- 分布式消息发送，也就是说，如果 Expr1 计算结果为元组 `{Name,Node}`（或位于另一个节点的 pid），也永远不会失败。

### Receive

```erlang
receive
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
end
```

`receive` 表达式会在消息队列中查找与 `receive` 表达式子句中某个模式匹配的消息。这些模式在这些子句会从上到下与消息进行匹配。

> receive 永远不会失败。执行过程会被暂停，可能无限期暂停，直到收到符合某种模式且包含正确保护序列的消息为止。

receive 表达式添加超时设置

```erlang
receive
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
after
    ExprT ->
        BodyT
end
```

表达式 `ExprT` 值应为整数，或原子 `infinity` .

`ExprT` 毫秒内没有匹配的消息到达，则会计算 `BodyT` , `BodyT` 的返回值随后成为 `receive...after` 的返回值

使用不带分支的 `receive...after` 表达式是合法的

```erlang
receive
after
    ExprT ->
        BodyT
end
```

这种构造方式不会消耗任何消息，只会暂停进程执行 `ExprT` 毫秒

### Comparisons

```erlang
Expr1 op Expr2
```

|op|描述|
|---|---|
|==|等于|
|/=|不等|
|=<|小于等于|
|<|小于|
|>=|大于等于|
|>|大于|
|=:=|完全等于|
|=/=|完全不等|

参数顺序

```erlang
number < atom < reference < fun < port < pid < tuple < map < nil < list < bit string
```

### 算术表达式

```erlang
op Expr
Expr1 op Expr2
```

|op|描述|参数类型|
|---|---|---|
|+|一元 +|Number|
|-|一元 -|Number|
|+|加|Number|
|-|减|Number|
|\*|乘|Number|
|/|除|Number|
|bnot|一元按位非|Integer|
|div|整数除法|Integer|
|rem|整数余数|Integer|
|band|按位与|Integer|
|bor|按位或|Integer|
|bxor|按位异或|Integer|
|bsl|左移位|Integer|
|bsr|算术右移|Integer|

### 布尔表达式

```erlang
op Expr
Expr1 op Expr2
```

|op|描述|
|---|---|
|not|非|
|and|与|
|or|或|
|xor|异或|

### 短路表达式

```erlang
Expr1 orelse Expr2 %% Expr1 值为 false, 才会对 Expr2 进行求值
Expr1 andalso Expr2 %% Expr1 值为 true, 才会对 Expr2 进行求值
```

```erlang
(3 > 2) orelse (1 / 0). %% 不会报错
```

### 列表操作

```erlang
Expr1 ++ Expr2 %% 将其第二个参数附加到第一个参数，并返回结果列表
Expr1 -- Expr2 %% 删除第二个参数中的每个元素, 首次出现的位置（如果有）
```

```erlang
[1,2,3] ++ [4,5] %% [1,2,3,4,5

[1,2,3,2,1,2] -- [2,1,2]. %% [3,1,2]
```

### 映射表达式

#### 创建映射

将表达式 K 与另一个表达式 V 关联起来

```erlang
#{K => V}

#{K1 => V1, ..., Kn => Vn} %% 包含多个关联关系

#{} %% 空的Map

#{{"w", 1} => f()} %% 复杂键
```

#### 更新映射

```erlang
M#{K => V}
```

```erlang
M = #{1 => a}.
M#{1.0 => b}. %% #{1 => a, 1.0 => b}. => 如果键不存在将新添加
M#{1.0 := b}. %% 将报错 := 只能更新
```

#### 映射模式匹配

```erlang
M = #{"tuple" => {1,2}}.
#{"tuple" := {1,B}} = M.
B. %% 2

#{} = M %% #{} 匹配任何映射
```

### 位语法表达式

```erlang
<<>>  % 空的位字符串
<<E1>>
<<E1,...,En>>
```

每个元素 `Ei` 指定比特串的一个片段。这些片段从左到右按比特串的最高有效位到最低有效位的顺序排列。

```erlang
Ei = Value |
     Value:Size |
     Value/TypeSpecifierList |
     Value:Size/TypeSpecifierList

TypeSpecifierList :: Type
                    | Signedness
                    | Endianness
                    | Unit

Type :: integer | float | binary | bytes | bitstring | bits | utf8 | utf16 | utf32
Signedness :: signed | unsigned
Endianness :: big | little | native
Unit :: unit:IntegerLiteral
```

`IntegerLiteral` 默认值

- `integer` , `float` 和 `bitstring` 为 1.
- `binary` , 为 8.
- `bitstring` , `bits` 和 `bytes` 类型，不允许指定与默认值不同的单位值.
- `utf8` , `utf16` 和 `utf32` 无需指定单位说明符.

`Size` 是一个表达式，其计算结果应为整数。

`Size` 默认值取决于类型

- `integer` 8
- `float` 64
- `binary` 和 `bitstring` 指的是整个二进制数据或比特串

`Binaries` 长度为 8 位的倍数的比特串称为二进制数

```erlang
<<1, 2, 3, 4, 5, 6, 7, 8, 9, 10>>.

<<A:3/binary, B/binary>> = <<"abcde">>.

A. %% <<"abc">>
B. %% <<"de">>
```

#### 整数段

`Size` 值乘以单位即可得到段的大小（以比特为单位）。

如果整数段的大小 `N` 太小而无法容纳给定的整数，则该整数的最高有效位将被默默丢弃，只有最低的 N 位才会被放入位串中。例如，`<<16#ff:4>>` 将生成位串 `<<15:4>>`。

#### 浮点段

`Size` 值乘以单位即可得到段的大小（以位为单位）。浮点段的大小（以位为单位）必须是 16、32 或 64 位之一。

#### 二进制段

“二进制段”一词指的是 binary、bitstring、bytes 和 bits 这几种段类型中的任何一种。

构造二进制数据时，如果未指定二进制段的大小，则会将整个二进制值插值到正在构造的二进制数据中。但是，被插值的二进制数据的大小（以位数为单位）必须能被该段的单位值整除；否则，将引发异常。

```erlang
<<(<<"abc">>)/bitstring>>. %% <<"abc">> 的长度为3*8, bitstring的单位值是1, 可以整除

<<(<<1:1>>)/binary>>. %% <<1:1>> 的长度为 1*1, binary的单位值是1, 不能整除, 将引发异常

<<_/binary-unit:16>> = <<"abc">>.
%% <<"abc">> 的长度为 3*8, binary-unit:16 指定单位长度16, 不能整除
```

#### Unicode 段

`utf8` , `utf16` 和 `utf32` 类型指定了编码/解码方式
构造 `utf` 类型段时，`Value` 必须是 `0` 到 `16#D7FF` 或 `16#E000` 到 `16#10FFFF` 范围内的整数

编码值的大小

- `utf8` `Value` 编码成 1-4 字节.
- `utf16` `Value` 编码成 2-4 字节.
- `utf32` `Value` 编码成 4 字节.

可以给出一个字面字符串，后跟一个 `UTF` 类型，例如：`<<"abc"/utf8>>` 这是的语法糖。`<<$a/utf8,$b/utf8,$c/utf8>>` .

### 函数表达式

```erlang
fun
    [Name](Pattern11,...,Pattern1N) [when GuardSeq1] ->
              Body1;
    ...;
    [Name](PatternK1,...,PatternKN) [when GuardSeqK] ->
              BodyK
end
```

```erlang
Fun1 = fun (X) -> X+1 end.
Fun2 = fun (X) when X>=5 -> gt; (X) -> lt end.
```

### 捕获和抛出

```erlang
catch Expr
```

如果引发异常，则会捕获该异常。返回值取决于异常的类别：

- `error` 运行时错误或名为 `error(Term)` 代码, 返回 `{'EXIT',{Reason,Stack}}` .
- `exit` 调用 `exit(Term)` 的代码, 返回 `{'EXIT',Term}` .
- `throw` 调用 `throw(Term)` 的代码, 返回 `Term` .

`Reason` 取决于发生的错误类型，而 `Stack` 是最近的函数调用堆栈

`Reason` 的错误类型

- `badarg` 参数错误。参数的数据类型错误，或者格式不正确.
- `badarith` 算术表达式的参数不是数值型的，或者该表达式的计算结果不是有限的.
- `{badmatch,V}` 匹配表达式求值失败。值 V 不匹配.
- `function_clause` 执行函数调用时未找到匹配的函数子句.
- `{case_clause,V}` 计算 case 表达式时未找到匹配的分支。值 V 不匹配.
- `if_clause` 执行 if 语句时未找到正确的分支表达.
- `{try_clause,V}` 计算 try 表达式的 of 部分时，未找到匹配的分支。值 V 不匹配.
- `undef` 执行函数调用时找不到该函数
- `{badfun,F}` F 原本应该是函数，但实际上并非如此.
- `{badarity,{Fun,Args}}` 函数被应用于错误数量的参数.
- `timeout_value` `receive...after` 表达式的计算结果不是整数，或者 infinity.
- `noproc` 尝试创建链接或监视不存在的进程或端口.
- `noconnection` 与远程进程的链接或监视器断开，因为无法建立节点之间的连接或连接已断开.
- `{nocatch,V}` 尝试评估在禁区外的 throw catch V 是抛出的术语.
- `system_limit` 已达到系统限制.

```erlang
catch 1+2. %% 3

catch 1+a. %% {'EXIT',{badarith,[...]}}

catch throw(hello). %% hello
```

### Try

```erlang
try Exprs
catch
    Class1:ExceptionPattern1[:Stacktrace] [when ExceptionGuardSeq1] ->
        ExceptionBody1;
    ClassN:ExceptionPatternN[:Stacktrace] [when ExceptionGuardSeqN] ->
        ExceptionBodyN
end
```

对 `catch` 的增强,提供了以下可能性:

- 区分不同的异常类型
- 选择只处理你想要处理的对象
- 将其他错误传递给外部的 `try` 或 `catch` 语句，或者传递给默认错误处理语句

在 `Exprs` 求值过程中不发生异常返回 `Exprs` 的值, 如果发送异常,则捕获该异常,
`Class` 为异常类型 `error` , `exit` , `throw` .
`ExceptionPattern` 异常模式匹配, 用于匹配到正确的 `ExceptionBody` ,
`Stacktrace` 可选的堆栈跟踪

```erlang
try throw(he)
catch
    throw:Value:S -> {Value,S}
end.
%% {he,[...]}
```

```erlang
try Exprs of
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
catch
    Class1:ExceptionPattern1[:Stacktrace] [when ExceptionGuardSeq1] ->
        ExceptionBody1;
    ...;
    ClassN:ExceptionPatternN[:Stacktrace] [when ExceptionGuardSeqN] ->
        ExceptionBodyN
after
    AfterBody
end
```

`of` 正常返回值的匹配分支
`after` 一定会执行（类似 finally）

### 块表达式

```erlang
begin
   Expr1,
   ...,
   ExprN
end
```

块表达式提供了一种将一系列表达式分组的方法，类似于子句主体。返回值是最后一个表达式 ExprN 的值。

### 推导式

列表推导式

```erlang
[Expr || Qualifier1, . . ., QualifierN]
```

`Expr` 是一个任意表达式，每个 `Qualifier` 是生成器或过滤器。

列表生成器语法

```erlang
Pattern <- ListExpr %% 宽松模式
Pattern <:- ListExpr %% 严格模式
```

```erlang
[ X || X <:- [1,2] ]. %% [1,2]
```

位串推导式用于构造位串或二进制数

```erlang
<< BitStringExpr || Qualifier1, . . ., QualifierN >>
```

位串生成器语法

```erlang
BitstringPattern <= BitStringExpr %% 宽松模式
BitstringPattern <:= BitStringExpr %% 严格模式
```

映射推导式用于构建映射

```erlang
#{KeyExpr => ValueExpr || Qualifier1, . . ., QualifierN}
```

映射生成器语法

```erlang
KeyPattern := ValuePattern <- MapExpression %% 宽松模式
KeyPattern := ValuePattern <:- MapExpression %% 严格模式
```

`zip` 生成器

```erlang
Generator_1 && ... && Generator_n
```

过滤器是一个计算结果为 true 或 false 表达式。

```erlang
[X*2 || X <:- [1,2,3]]. %% [2,4,6]

[X*2 || <<X>> <:= <<1,2,3>>]. %% [2,4,6]

#{X => X*X || X <:- [1,2,3]}. %% #{1 => 1,2 => 4,3 => 9}

[X || X <:- [1,2,3,4,5], X rem 2 =:= 1]. %% [1,3,5]

[X || {_,_}=X <- [{a,b}, [a], {x,y,z}, {1,2}]]. %% [{a,b},{1,2}]

[X || X <- [1,2,3,5] && X <- [1,4,3,6]]. %% [1,3]
```

## 预处理器

直接将文件内容插入当前位置

```erlang
-include(File).
-include_lib(File). %% 假定路径的第一个组成部分是应用程序的名称
```

定义和使用宏

```erlang
-define(Const, Replacement).
-define(Func(Var1,...,VarN), Replacement).
```

使用宏

```erlang
?Const
?Func(Arg1,...,ArgN)
```

示例

```erlang
-define(TIMEOUT, 200).
...
call(Request) ->
    server:call(refserver, Request, ?TIMEOUT).
```

预定义宏

- `?MODULE` 当前模块的名称，以原子形式表示.
- `?MODULE_STRING` 当前模块的名称，以字符串形式表示.
- `?FILE` 当前模块的文件名，以字符串形式表示.
- `?LINE` 当前行号，以整数形式表示.
- `?MACHINE` 机器名称为 'BEAM'
- `?FUNCTION_NAME` 当前函数的名称，以原子形式表示
- `?FUNCTION_ARITY` 当前函数的参数个数（arity），以整数形式表示.
- `?OTP_RELEASE` 运行时系统运行编译器的 OTP 版本，以整数形式返回.
- `?FEATURE_AVAILABLE(Feature)` 该 Feature 可用返回 true。该功能可能已启用，也可能未启用.
- `?FEATURE_ENABLED(Feature)` 为 true 时 Feature 启用.

删除宏定义

```erlang
-undef(Macro).
```

条件编译的宏指令

- `-ifdef(Macro).` 仅当 Macro 已定义时才执行以下代码行.
- `-ifndef(Macro).` 仅当 Macro 未定义时才执行以下代码行.
- `-else.` 仅允许在 ifdef、ifndef、if 和 elif 之后使用。指令。如果前面的指令结果为 false，则会执行 else 指令后面的指令.
- `-if(Condition).` 仅当 Condition 时才执行以下代码行。计算结果为真.
- `-elif(Condition).` 仅允许在 if 或另一个 elif 之后使用。指令。如果前面的 if 或 elif 指令的计算结果不为真，而 Condition 计算结果为真，则执行 elif 指令后面的行.
- `-endif.` 指定一系列控制流指令的结束.

## 记录

定义记录

```erlang
-record(Name, {Field1 [= Expr1],
               ...
               FieldN [= ExprN]}).
```

创建记录

```erlang
#Name{Field1=Expr1, ..., FieldK=ExprK}
```

访问记录的字段

```erlang
Expr#Name.Field
```

更新记录

```erlang
Expr#Name{Field1=Expr1, ..., FieldK=ExprK}
```

嵌套记录

```erlang
-record(nrec0, {name = "nested0"}).
-record(nrec1, {name = "nested1", nrec0=#nrec0{}}).
-record(nrec2, {name = "nested2", nrec1=#nrec1{}}).

N2 = #nrec2{},
```

## 进程

Erlang 专为大规模并发而设计。Erlang 进程轻量级（可动态增长和收缩），内存占用小，创建和终止速度快，调度开销低.

### 进程创建

调用 `spawn()` 函数即可创建一个进程

```erlang
spawn(Module, Name, Args) -> pid()
  Module = Name = atom()
  Args = [Arg1,...,ArgN]
    ArgI = term()
```

`spawn(Fun)` 通过函数创建进程

```erlang
Pid = spawn(fun() ->
    io:format("hello~n")
end).
```

`spawn(Node, Fun)` 在指定节点 `Node` 上创建一个新进程，并在该进程里执行 `Fun` .

```erlang
Pid = spawn('b@yourhost', fun() ->
    io:format("hello~n")
end).
```

`spawn(Module, Function, Args)` 用模块函数.
`spawn(Node, Module, Function, Args)` 在指定节点上用模块函数.

|函数|子进程崩溃的后果|返回结果|
|---|---|---|
|spawn|调用者默认无感知|`Pid`|
|spawn_link|可能把调用者也带崩（除非 trap_exit）|`Pid`|
|spawn_monitor|不会影响调用者，只通知|`{Pid, Ref}`|

`spawn_opt` 是 `spawn` 的“可配置增强版”, 用来控制链接/监控、调度优先级、初始堆大小、消息队列行为等.

`spawn_opt` 参数和 `spawn` 类似,只是最后多了一个 `Options` 参数

- `spawn_opt(Mod, Fun, [link])` 等价于 `spawn_link`
- `spawn_opt(Mod, Fun, [monitor])` 等价于 `spawn_monitor` , 返回值是 `{Pid, Ref}`
- `spawn_opt(Mod, Fun, [{priority, high}])` 调度优先级可选常见值：`low | normal | high | max`
- `spawn_opt(Mod, Fun, [{fullsweep_after, 10}])` 控制 GC 行为
- `spawn_opt(Mod, Fun, [{min_heap_size, 233}, {min_bin_vheap_size, 46422}])` 初始堆/二进制堆

`spawn_request` 是 Erlang/OTP（自 OTP 23 起）引入的一组 "异步 spawn",先返回一个请求标识 ReqId（reference）,
随后由系统向调用者发送一条 `spawn_reply` 消息告知成功/失败。

- `spawn_request(Fun)`
- `spawn_request(FunOrNode, OptionsOrFun)`
- `spawn_request(NodeOrModule, FunOrFunction, OptionsOrArgs)`
- `spawn_request(NodeOrModule, ModuleOrFunction, FunctionOrArgs, ArgsOrOptions)`
- `spawn_request(Node, Module, Function, Args, Options)`

`Options` 选项

- `monitor` 和 `{monitor, MonitorOpts}` : 请求成功后建立监控
- `link` : 请求成功后建立链接
- `{reply_tag, ReplyTag}` : 自定义回复消息 tag
- `{reply, ReplyMode}` : 控制是否发回复 `yes | no | error_only | success_only`
- `spawn_opt` 的选项集合（例如优先级、堆大小等）

`spawn_request` 调用成功后会向调用者发送一条格式为 `{ReplyTag, ReqId, ok, Pid}` 的消息,
如果调用失败,调用者会收到一条格式为 `{ReplyTag, ReqId, error, Reason}` 的消息.

`link/1` 连接到指定进程, `unlink/1` 断开连接.

```erlang
-spec monitor(process, monitor_process_identifier()) -> MonitorRef when MonitorRef :: reference();
             (port, monitor_port_identifier()) -> MonitorRef when MonitorRef :: reference();
             (time_offset, clock_service) -> MonitorRef when MonitorRef :: reference().
monitor(Type, Item, Opts)
```

`monitor` 的 `Type` , 参数决定了 `Item` 参数的类型.

- 监控 `process` : `Item` 是 `pid` , `atom` , `{RegisteredName, Node}` .
- 监控 `port` : `Item` 是 `port` , `atom` , `{RegisteredName, Node}` .
- 监控 `time_offset` : `Item` 是 `clock_service` .

监控 `time_offset` 的消息格式:

```erlang
{'CHANGE', MonitorRef, Type, Item, NewTimeOffset}
```

当 `process` 或 `port` 监视器被触发时会发送一条 'DOWN' 消息其格式如下:

```erlang
{'DOWN', MonitorRef, Type, Object, Info}
```

可选的 `Opts` 设置:

- `{alias, UnaliasOpt}` : 返回的监视器引用也将成为调用进程的别名,
  - `explicit_unalias` : 只有显式调用 `unalias/1` 才能停用别名.
  - `demonitor` : 当监控器被移除时，别名将自动停用.
  - `reply_demonitor`：当监控器被移除，或收到通过别名发送的回复消息时，别名将自动停用。
- `{tag, UserDefinedTag}` : 将默认 `Tag` 替换为 `UserDefinedTag` 在监控触发时发送的监控消息中.
- `priority` : `OTP 28.0` 启用优先消息接收.

### 注册进程

除了使用进程 ID (PID) 来寻址进程外，用名称注册进程。名称必须是一个原子，并且如果进程终止，则会自动注销

```erlang
register(Name, Pid) %% 注册进程
registered/0 %% 返回使用注册的名称列表
whereis(Name) %% 返回在 Name 下注册的进程 ID，如果名称未注册，则 undefined
```

### 进程别名

进程别名是 PID 之外的一种“可失效的地址”，用于把消息精确路由到“当前有效实例”，并在进程生命周期变化时自动失效.

```erlang
Alias = erlang:alias(). %% 返回一个 alias reference, 绑定到当前进程
```

`alias(Opts)` 可以为 `alias` 添加设置,

- `explicit_unalias` 默认行为, 别名只能通过调用 `unalias/1` 停用.
- `reply` 当收到通过别名发送的回复消息时，别名将自动停用。也可以通过调用 `unalias/1` 来停用别名.
- `priority` `OTP 28.0` 新设置项,别名可用于发送向创建此别名的进程发送优先级消息.

```erlang
server() ->
    receive
        {request, AliasReqId, Request} ->
            Result = perform_request(Request),
            AliasReqId ! {reply, AliasReqId, Result}
    end,
    server().

client(ServerPid, Request) ->
    AliasReqId = alias([reply]),
    ServerPid ! {request, AliasReqId, Request},
    %% 如果我们收到回复，别名将会自动停用。
    receive
        {reply, AliasReqId, Result} -> Result
    after 5000 ->
            unalias(AliasReqId),
            receive {reply, AliasReqId, Result} -> Result
            after 0 -> exit(timeout)
            end
    end.
```

### 进程终止

进程正常终止将返回原子 `normal` .
进程可以通过调用以下 BIF 之一来终止自身：

- `exit(Reason)`
- `error(Reason)`
- `error(Reason, Args)`

将退出信号会被转换为 `{'EXIT', From, Reason}` 消息，这些消息可以像普通消息一样接收.

```erlang
process_flag(trap_exit, true).
```

### 信号

`Erlang Signal` 是 `BEAM VM` 在进程之间传递的"控制级事件",用于

- 进程退出传播
- 链接/监控通知
- 系统控制（kill、shutdown 等）

||消息|信号|
|---|---|---|
|发送方式|`Pid ! Msg`|VM 内部|
|是否进邮箱|是|否|
|是否能忽略|可以|不可以|
|主要用途|业务通信|生命周期/容错|

信号的种类:

- `message` : 使用 `send` 操作符时发送 `!` 或调用 `erlang:send/2,3` 或 `erlang:send_nosuspend/2,3` .
- `link` : 调用 `link/1` 时发送.
- `unlink` : 调用 `unlink/1` 时发送.
- `exit` : 可以通过调用 `exit/2` 显式发送 `exit` 信号, 或者当链接进程终止.
- `monitor` : 调用 `monitor/2,3` 时发送.
- `demonitor` : 调用 `demonitor/1,2` 时发送,或者当监视另一个进程的进程终止时.
- `down` : 被监控的进程或端口终止.
- `change` : 本地运行时系统上的 `clock service` 在当时间偏移量发生变化时发送.
- `group_leader` : 调用 `group_leader/2` 时发送.
- `spawn_request/spawn_reply, open_port_request/open_port_reply`：由于调用了 `spawn_link/1,2,3,4`、`spawn_monitor/1,2,3,4`、`spawn_opt/2,3,4,5`、`spawn_request/1,2,3,4,5` 或 `erlang:open_port/2`，将发送信号，请求信号被发送到 `spawn service`，以回复信号进行响应。
- `alive_request/alive_reply` : 调用 `is_process_alive/1` 时发送.
- `garbage_collect_request/garbage_collect_reply, check_process_code_request/check_process_code_reply, process_info_request/process_info_reply` :
  由于调用了 `garbage_collect/1,2` , `erlang:check_process_code/2,3` , 或 `process_info/1,2` .
- `port_command, port_connect, port_close` : 由进程使用发送运算符(!) 或调用 `send()` 函数之一发送到本地节点上的端口,
  该信号通过传递一个格式为 `{Owner, {command, Data}}` 项来发送.
  消息内容为: `{Owner, {connect, Pid}}` 或 `{Owner, close}` .
- `port_command_request/port_command_reply, port_connect_request/port_connect_reply, port_close_request/port_close_reply, port_control_request/port_control_reply, port_call_request/port_call_reply, port_info_request/port_info_reply` :
  由于调用了以下任一端口而发送 `erlang:port_command/2,3`，`erlang:port_connect/2`，`erlang:port_close/1`、`erlang:port_control/3`、`erlang:port_call/3 erlang:port_info/1,2`
  请求信号发送到本地节点上的一个端口，该端口会以回复信号进行响应.
- `register_name_request/register_name_reply, unregister_name_request/unregister_name_reply, whereis_name_request/whereis_name_reply` :
  由于调用了 `register/2` , `unregister/1` , 或 `whereis/1` . 请求信号被发送到 `name service`，以回复信号进行响应.
- `timer_start_request/timer_start_reply, timer_cancel_request/timer_cancel_reply` :
  由于调用了 `erlang:send_after/3,4` , `erlang:start_timer/3,4` , 或 `erlang:cancel_timer/1,2` ,
  请求信号被发送到 `timer service`，`timer service` 会以回复信号进行响应.

### 进程字典

> 进程字典是每个进程私有的隐式 Key-Value 存储, 不推荐使用

- `put(Key, Value)`
- `get(Key)`
- `get()`
- `get_keys(Value)`
- `erase(Key)`
- `erase()`

## 分布式 Erlang

一个分布式 Erlang 系统由多个彼此通信的 Erlang 运行时系统组成。每一个这样的运行时系统称为一个节点（node）。

当使用 pid 时，不同节点上的进程之间进行消息传递，以及建立链接（link）和监控（monitor），都是透明的。然而，注册名（registered name）是节点本地的。

这意味着，当使用注册名发送消息或进行相关操作时，必须同时指定节点。

### 节点

节点是一个正在执行的 Erlang 运行时系统,
使用命令行标志 -name（长名称）或 -sname（简称）赋予一个名称,
也可以在运行时通过调用 net_kernel:start/1 来指定节点名称.

函数 `node()` 返回节点的名称。

### 节点连接

分布式 Erlang 系统中的节点是松散连接的, 第一次使用另一个节点,
调用 `spawn(Node, M, F, A)` 或 `net_adm:ping(Node)`，则会尝试连接到该节点.

默认情况下，连接是传递的。如果节点 A 连接到节点 B，而节点 B 又连接到节点 C，那么节点 A 也会尝试连接到节点 C。可以使用命令行标志 -connect_all false 关闭此功能.

调用 `erlang:disconnect_node(Node)` 强制断开节点连接,
`nodes/0` 返回当前连接的（可见）节点列表.

在分布式 Erlang 系统中，有时需要连接到某个节点，而无需连接到所有其他节点,
可以使用隐藏节点,隐藏节点是指使用命令行标志 `-hidden` 启动的节点, 隐藏节点与其他节点之间的连接不具有传递性，必须显式连接,
隐藏节点不会出现在 nodes/0 返回的节点列表中。应该使用 `nodes(hidden)` 或 `nodes(connected)` 查看.

### 节点常用函数

- `disconnect_node(Node)` : 强制断开节点的连接.
- `erlang:get_cookie/0` : 返回当前节点的 cookie.
- `is_alive/0` : 如果运行时系统是一个节点并且可以连接到其他节点，则返回 true，否则返回 false.
- `monitor_node(Node, Bool)` : 监视 Node.js 的状态。如果与节点的连接丢失，则会收到消息 `{nodedown, Node}` .
- `node/0` : 返回当前节点的名称.
- `node(Arg)` : 返回参数 Arg（进程 ID、引用或端口）所在的节点.
- `nodes/0` : 返回与此节点连接的所有可见节点的列表
- `nodes(Arg)` : 根据 Arg，此函数不仅可以返回可见节点的列表，还可以返回隐藏节点和先前已知的节点的列表.
- `erlang:set_cookie(Cookie)` : 设置连接 Node.js 时使用的魔法 cookie.
- `spawn_link(Node, Fun)` : 在远程节点上创建一个进程.
- `spawn_opt(Node, Fun, Opts)` : 在远程节点上创建一个进程.
- `spawn_link(Node, Module, Name, Args)` : 在远程节点上创建一个进程.
- `spawn_opt(Node, Module, Name, Args, Opts)` : 在远程节点上创建一个进程.

## 端口

> Port 是 Erlang 与外部 OS 进程通信的受控通道

创建端口的 Erlang 进程被称为端口所有者，或者说是端口的连接进程。所有进出该端口的通信都必须通过端口所有者进行。如果端口所有者终止，端口也会终止（如果外部程序编写正确，则外部程序也会终止）。

调用 `open_port(PortName, PortSettings)` 创建端口.

`PortName` 的设置:

- `{spawn, Command}` : 启动一个外部程序, `Command` 是要运行的外部程序的名称, 除非找到名为 Command 的 Erlang 驱动程序，否则 Command 会运行在 Erlang 工作空间之外.
  对于外部程序，会搜索 `PATH` ,这是通过 `shell` 程序完成的.
- `{spawn_driver, Command}` : 加载驱动.
- `{spawn_executable, FileName}` : 类似 `{spawn， FileName}` 但只运行外部可执行文件.
- `{fd, In, Out}` : 允许 Erlang 进程访问 Erlang 当前打开的任何文件描述符。文件描述符 In 可用于标准输入，文件描述符 Out 可用于标准输出.

`PortSettings` 的设置:

- `{packet, N}` : 每个消息前面都有一个长度头,长度用 N 个字节表示 `N = 1 | 2 | 4` .
- `stream` : 输出消息发送时没有数据包长度。Erlang 进程与外部对象之间必须使用用户自定义协议.
- `{line, L}` : 消息按行递送, 消息数据格式为 `{Flag， Line}` , Flag 表示 `eol` 或 `noeol` , L 指定最大行长.
- `{cd, Dir}` : 仅适用于 `{spawn, Command}` 和 `{spawn_executable, FileName}` ,设置外部程序的工作目录.
- `{env, Env}` : 仅适用于 `{spawn, Command}` 和 `{spawn_executable, FileName}` ,设置外部程序的环境变量.
- `{args, [ string() | binary() ]}` : 仅适用于 `{spawn_executable，FileName} 并指定可执行文件的参数.
- `{arg0, string() | binary()}` : 运行可执行文件时明确指定程序名参数.
- `exit_status` : 仅适用于 `{spawn, Command}` 和 `{spawn_executable, FileName}` ,
  当连接到端口的外部进程退出时，会收到如下形式的消息 `{Port，{exit_status，Status}}` .
- `use_stdio` : 仅适用于 `{spawn, Command}` 和 `{spawn_executable, FileName}` ,
  标准输入和输出（文件描述符 0 和 1）与 Erlang 通信.
- `nouse_stdio` : 和 `use_stdio` 相反。它使用文件描述符 3 和 4 与 Erlang 通信.
- `stderr_to_stdout` : 标准错误文件会被重定向到其标准输出文件.
- `overlapped_io` : 仅影响 Windows 上的外部程序端口.
- `in` : 端口只能用于输入.
- `out` : 端口只能用于输出.
- `binary` : 端口的所有输入输出都是二进制数据对象.
- `eof` : 当端口读到 EOF 时：端口不会自动关闭，也不会触发退出信号；而是向持有该端口的进程发送一条 {Port, eof} 消息.
- `hide` : 在 Windows 上运行时，会在生成端口程序时抑制创建新的控制台窗口.
- `{parallelism, Boolean}` : 调度端口任务.
- `{busy_limits_port, {Low, High} | disabled}` : 设定用于控制端口繁忙状态的限制.
- `{busy_limits_msgq, {Low, High} | disabled}` : 设置用于控制端口消息队列忙碌状态的限制.

默认是所有端口将设置 `[stream, use_stdio]` .

### 驱动驱动

> 过度设计, 可以使用 nifs 或 port 代替

可以根据某些原则用 C 编写驱动程序，并动态链接到 Erlang 运行时系统。从 Erlang 程序员的角度看，连接驱动看起来像是一个端口，称为端口驱动。

### 端口通信

发送给端口数据格式:

- `{Pid,{command,Data}}` : 发送数据到端口.
- `{Pid,close}` : 关闭端口.
- `{Pid,{connect,NewPid}}` : 将 Port 的端口所有者设置为 `NewPid` .

端口发送的数据格式:

- `{Port,{data,Data}}` : 接收到端口的数据.
- `{Port,closed}` : 响应 `Port ! {Pid,close}` .
- `{Port,connected}` : 响应 `Port ! {Pid,{connect,NewPid}}` .
- `{'EXIT',Port,Reason}` : 端口因某种原因终止.

## 行为

> behaviour 是 Erlang 用来定义“模块必须实现哪些回调函数”的接口机制.

### 常见 OTP behaviours

|Behaviour|用途|
|---|---|
|`gen_server`|通用服务进程|
|`gen_statem`|状态机|
|`gen_event`|事件处理|
|`supervisor`|监督/重启策略|
|`application`|应用生命周期|

### gen_server

为服务器提供客户端 - 服务器关系

```text
gen_server module            Callback module
-----------------            ---------------
gen_server:start
gen_server:start_monitor
gen_server:start_link -----> Module:init/1

gen_server:stop       -----> Module:terminate/2

gen_server:call
gen_server:send_request
gen_server:multi_call -----> Module:handle_call/3

gen_server:cast
gen_server:abcast     -----> Module:handle_cast/2

-                     -----> Module:handle_info/2

-                     -----> Module:handle_continue/2

-                     -----> Module:terminate/2

-                     -----> Module:code_change/3
```

```erlang
-module(ch3).
-behaviour(gen_server).

-export([start_link/0]).
-export([alloc/0, free/1]).
-export([init/1, handle_call/3, handle_cast/2]).

start_link() ->
    gen_server:start_link({local, ch3}, ch3, [], []).

alloc() ->
    gen_server:call(ch3, alloc).

free(Ch) ->
    gen_server:cast(ch3, {free, Ch}).

init(_Args) ->
    {ok, channels()}.

handle_call(alloc, _From, Chs) ->
    {Ch, Chs2} = alloc(Chs),
    {reply, Ch, Chs2}.

handle_cast({free, Ch}, Chs) ->
    Chs2 = free(Ch, Chs),
    {noreply, Chs2}.
```

### gen_statem

提供了一种通用的状态机行为

```text
gen_statem module            Callback module
-----------------            ---------------
gen_statem:start
gen_statem:start_monitor
gen_statem:start_link -----> Module:init/1

Server start or code change
                      -----> Module:callback_mode/0
                      selects callback mode

gen_statem:stop
Supervisor exit
Callback failure      -----> Module:terminate/3

gen_statem:call
gen_statem:cast
gen_statem:send_request
erlang:send
erlang:'!'            -----> Module:StateName/3
                   or -----> Module:handle_event/4
                   depending on callback mode

Release upgrade/downgrade
(code change)
                      -----> Module:code_change/4
```

示例

```erlang
-module(door_fsm).
-behaviour(gen_statem).

%% API
-export([start_link/1, unlock/2, lock/1, status/1]).

%% gen_statem callbacks
-export([init/1, callback_mode/0, terminate/3, code_change/4]).
-export([locked/3, unlocked/3]).

-define(AUTO_LOCK_MS, 5000).

%% =========
%% Public API
%% =========

start_link(PinCode) ->
    gen_statem:start_link(?MODULE, #{pin => PinCode}, []).

unlock(Pid, Pin) ->
    gen_statem:call(Pid, {unlock, Pin}).

lock(Pid) ->
    gen_statem:call(Pid, lock).

status(Pid) ->
    gen_statem:call(Pid, status).

%% =========
%% gen_statem
%% =========

callback_mode() ->
    state_functions.

init(Data0 = #{pin := _}) ->
    %% 初始状态：locked
    {ok, locked, Data0}.

terminate(_Reason, _State, _Data) ->
    ok.

code_change(_OldVsn, State, Data, _Extra) ->
    {ok, State, Data}.

%% =========
%% State: locked
%% =========
locked({call, From}, {unlock, Pin}, Data = #{pin := Pin0}) ->
    case Pin =:= Pin0 of
        true ->
            %% 转到 unlocked，并设置 state_timeout 自动上锁
            Actions = [{reply, From, ok}, {state_timeout, ?AUTO_LOCK_MS, auto_lock}],
            {next_state, unlocked, Data, Actions};
        false ->
            {keep_state_and_data, [{reply, From, {error, bad_pin}}]}
    end;

locked({call, From}, lock, _Data) ->
    %% 已经是 locked
    {keep_state_and_data, [{reply, From, ok}]};

locked({call, From}, status, _Data) ->
    {keep_state_and_data, [{reply, From, locked}]};

locked(_EventType, _EventContent, _Data) ->
    %% 其他事件忽略
    keep_state_and_data.

%% =========
%% State: unlocked
%% =========
unlocked({call, From}, lock, Data) ->
    %% 手动上锁：转回 locked（不再设置 state_timeout）
    {next_state, locked, Data, [{reply, From, ok}]};

unlocked({call, From}, {unlock, _Pin}, _Data) ->
    %% 已解锁时重复 unlock：按需求可选择刷新计时或直接 ok
    %% 这里选择：直接 ok（不刷新自动上锁计时）
    {keep_state_and_data, [{reply, From, ok}]};

unlocked({call, From}, status, _Data) ->
    {keep_state_and_data, [{reply, From, unlocked}]};

unlocked(state_timeout, auto_lock, Data) ->
    %% 自动上锁触发
    {next_state, locked, Data};

unlocked(_EventType, _EventContent, _Data) ->
    keep_state_and_data.
```

### gen_event

通用事件处理行为

```text
gen_event module                   Callback module
----------------                   ---------------
gen_event:start
gen_event:start_monitor
gen_event:start_link       ----->  -

gen_event:add_handler
gen_event:add_sup_handler  ----->  Module:init/1

gen_event:notify
gen_event:sync_notify      ----->  Module:handle_event/2

gen_event:send_request
gen_event:call             ----->  Module:handle_call/2

-                          ----->  Module:handle_info/2

gen_event:delete_handler   ----->  Module:terminate/2

gen_event:swap_handler
gen_event:swap_sup_handler ----->  Module1:terminate/2
                                   Module2:init/1

gen_event:which_handlers   ----->  -

gen_event:stop             ----->  Module:terminate/2

-                          ----->  Module:code_change/3
```

示例(向终端写入错误消息的事件处理)

```erlang
-module(terminal_logger).
-behaviour(gen_event).

-export([init/1, handle_event/2, terminate/2]).

init(_Args) ->
    {ok, []}.

handle_event(ErrorMsg, State) ->
    io:format("***Error*** ~p~n", [ErrorMsg]),
    {ok, State}.

terminate(_Args, _State) ->
    ok.
```

### supervisor

启动子进程、监控子进程退出、按策略重启。不写业务逻辑，只管生命周期和容错。

示例

```erlang
-module(my_worker).
-behaviour(gen_server).

-export([start_link/1, ping/1]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start_link(Name) ->
    gen_server:start_link({local, Name}, ?MODULE, #{name => Name}, []).

ping(Name) ->
    gen_server:call(Name, ping).

init(State) ->
    {ok, State}.

handle_call(ping, _From, State) ->
    {reply, pong, State};
handle_call(_Req, _From, State) ->
    {reply, ok, State}.

handle_cast(_Msg, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, _State) ->
    ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.
```

```erlang
-module(my_sup).
-behaviour(supervisor).

-export([start_link/0]).
-export([init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    SupFlags = #{
        strategy => one_for_one,
        intensity => 3,
        period => 10
    },

    %% ChildSpec 使用“map 规格”（现代 OTP 写法）
    Child1 = #{
        id => w1,
        start => {my_worker, start_link, [w1]},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [my_worker]
    },
    Child2 = #{
        id => w2,
        start => {my_worker, start_link, [w2]},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [my_worker]
    },

    {ok, {SupFlags, [Child1, Child2]}}.
```

### application

应用指的是一个实现某些特定功能的组件，可以作为一个单元启动和停止，并且可以在其他系统中重复使用.

```erlang
-module(myapp_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    myapp_sup:start_link().

stop(_State) ->
    ok.
```

### 自定义 behaviour

```erlang
-module(my_worker).

%% 回调规范（类型 + 函数签名）
-callback init(Args :: term()) ->
    {ok, State :: term()} | {stop, Reason :: term()}.

-callback handle(Task :: term(), State :: term()) ->
    {ok, Result :: term(), NewState :: term()}
  | {error, Reason :: term(), NewState :: term()}
  | {stop, Reason :: term(), NewState :: term()}.

%% 可选回调（不实现也不会编译告警）
-optional_callbacks([terminate/2]).

-callback terminate(Reason :: term(), State :: term()) ->
    ok.

%% behaviour 模块本身通常不需要导出任何函数
```
