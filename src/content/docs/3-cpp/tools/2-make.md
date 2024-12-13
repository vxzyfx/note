---
title: make
---

`make` 是一个构建自动化工具，通常用于管理和加速程序的编译过程。它根据文件的依赖关系来决定哪些部分需要重新编译，并执行相应的编译命令。`make` 使用一个称为 `Makefile` 的文件来定义这些依赖关系和规则。

## make的运行

在 `make` 工具中，参数（或选项）用于控制 `make` 的行为和操作方式。了解和使用这些参数可以帮助你更好地管理和构建项目。以下是 `make` 工具中常见的参数及其详细介绍：

### 常用参数

#### `-f file` 或 `--file=file` 或 `--makefile=file`
指定使用的 `Makefile` 文件。如果不使用该参数，`make` 默认查找 `Makefile` 或 `makefile`。

```sh
make -f MyMakefile
```

#### `-C directory` 或 `--directory=directory`
在执行之前进入指定的目录。

```sh
make -C src
```

#### `-j [jobs]` 或 `--jobs[=jobs]`
指定允许的并行任务数量。如果不指定 `jobs`，`make` 将默认选择一个适当的数量。

```sh
make -j4
```

#### `-k` 或 `--keep-going`
遇到错误时继续构建其他目标。

```sh
make -k
```

#### `-i` 或 `--ignore-errors`
忽略所有命令的错误。

```sh
make -i
```

#### `-B` 或 `--always-make`
无条件地重新构建所有目标。

```sh
make -B
```

#### `-n` 或 `--just-print` 或 `--dry-run` 或 `--recon`
仅打印将要执行的命令，但不实际执行。

```sh
make -n
```

#### `-q` 或 `--question`
检查目标是否最新。如果是最新的，则返回 0，否则返回非零值。

```sh
make -q
```

#### `-s` 或 `--silent` 或 `--quiet`
禁止显示命令执行的详细信息。

```sh
make -s
```

#### `-r` 或 `--no-builtin-rules`
禁用内置的隐含规则。

```sh
make -r
```

#### `-R` 或 `--no-builtin-variables`
禁用内置的变量。

```sh
make -R
```

#### `-e` 或 `--environment-overrides`
让环境变量覆盖 `Makefile` 中的变量定义。

```sh
make -e
```

#### `-p` 或 `--print-data-base`
打印 `make` 数据库，包括变量、规则和隐含规则。

```sh
make -p
```

#### `-v` 或 `--version`
显示 `make` 的版本信息并退出。

```sh
make -v
```

#### `-d`
启用调试输出，显示 `make` 的详细执行过程。

```sh
make -d
```

#### `--debug[=FLAGS]`
启用特定的调试信息。

```sh
make --debug
```

### 使用示例

假设我们有一个包含以下文件的项目：

`main.c`:
```c
#include "foo.h"
#include "bar.h"

int main() {
    foo();
    bar();
    return 0;
}
```

`foo.c`:
```c
#include <stdio.h>
#include "foo.h"

void foo() {
    printf("This is foo\n");
}
```

`bar.c`:
```c
#include <stdio.h>
#include "bar.h"

void bar() {
    printf("This is bar\n");
}
```

`foo.h`:
```c
#ifndef FOO_H
#define FOO_H

void foo();

#endif
```

`bar.h`:
```c
#ifndef BAR_H
#define BAR_H

void bar();

#endif
```

`Makefile`:
```makefile
# 目标文件
TARGET = myprogram

# 源文件
SRCS = main.c foo.c bar.c

# 对应的目标文件
OBJS = $(SRCS:.c=.o)

# 编译器
CC = gcc

# 编译选项
CFLAGS = -Wall -g

# 链接选项
LDFLAGS =

# 默认目标
all: $(TARGET)

# 链接可执行文件
$(TARGET): $(OBJS)
	$(CC) $(LDFLAGS) -o $@ $^

# 使用隐含规则编译每个源文件

# 清理生成的文件
clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: all clean
```

### 运行示例

#### 1. 指定使用的 Makefile 文件

```sh
make -f CustomMakefile
```

#### 2. 在指定目录中执行

```sh
make -C src
```

#### 3. 并行构建

```sh
make -j4
```

#### 4. 遇到错误时继续构建其他目标

```sh
make -k
```

#### 5. 忽略所有命令的错误

```sh
make -i
```

#### 6. 无条件地重新构建所有目标

```sh
make -B
```

#### 7. 仅打印将要执行的命令

```sh
make -n
```

#### 8. 禁用内置的隐含规则

```sh
make -r
```

#### 9. 环境变量覆盖 Makefile 中的变量定义

```sh
make -e
```

#### 10. 启用调试输出

```sh
make -d
```

## 基础

```makefile
目标 ... : 依赖项 ...
    命令
    ...
    ...
```

- 目标: 可以是一个文件, 目录或任务名
- 依赖项: 目标的依赖项，多个依赖项之间用空格分隔。
- 命令: shell 命令

如果依赖项有变化,则命令将重新执行

### Makefile主要内容

1. 显式规则: 显式规则。显式规则说明了如何生成一个或多个目标文件。这是由Makefile的书写者明显指出要生成的文件、文件的依赖文件和生成的命令。

2. 隐式规则。由于我们的make有自动推导的功能，所以隐式规则可以让我们比较简略地书写Makefile，这是由make所支持的。

3. 变量的定义。在Makefile中我们要定义一系列的变量，变量一般都是字符串，这个有点像你C语言中的宏，当Makefile被执行时，其中的变量都会被扩展到相应的引用位置上。

4. 指令。其包括了三个部分，一个是在一个Makefile中引用另一个Makefile，就像C语言中的include一样；另一个是指根据某些情况指定Makefile中的有效部分，就像C语言中的预编译#if一样；还有就是定义一个多行的命令。

5. 注释。Makefile中只有行注释，和UNIX的Shell脚本一样，其注释是用 # 字符，这个就像C/C++中的 // 一样。如果你要在你的Makefile中使用 # 字符，可以用反斜杠进行转义，如： \\# 。

### 包含其他makefile

```makefile
# 如果没找到文件将报错
include foo.make *.mk $(bar)
```
```makefile
# 如果没找到文件不会报错
-include foo.make *.mk $(bar)
```

## 规则

### 命令的执行环境

make会以UNIX的标准Shell，也就是 /bin/sh 来执行命令。如果命令太长，你可以使用反斜杠（ \ ）作为换行符。make对一行上有多少个字符没有限制。

### 通配符

- `~` 用户家目录
- `?` $?上一条命令返回的状态码
- `*` 匹配所有, `*.c`表示所有后缀为c的文件

## 文件搜寻
一些大的工程中，有大量的源文件，我们通常的做法是把这许多的源文件分类，并存放在不同的目录中。所以，当make需要去找寻文件的依赖关系时，你可以在文件前加上路径，但最好的方法是把一个路径告诉make，让make在自动去找。

### VPATH变量

```makefile
VPATH = src:../headers
```
指定两个目录，“src”和“../headers”，make会按照这个顺序进行搜索。目录由“冒号”分隔。（当前目录永远是最高优先搜索的地方）

### vpath关键字

作用与VPATH变量类似, 但是更为灵活

#### 使用方式

```
vpath <pattern> <directories>
为符合模式<pattern>的文件指定搜索目录<directories>。

vpath <pattern>
清除符合模式<pattern>的文件的搜索目录。

vpath
清除所有已被设置好了的文件搜索目录。
```

```makefile
vpath %.h ../headers
```
该语句表示，要求make在“../headers”目录下搜索所有以 .h 结尾的文件。（如果某文件在当前目录没有找到的话）

## 目标
### 伪目标

```makefile
.PHONY : clean
clean :
    rm *.o temp
```

### 多目标

```makefile
bigoutput littleoutput : text.g
    generate text.g -$(subst output,,$@) > $@
```

## 静态模式

```makefile
objects = foo.o bar.o

all: $(objects)

$(objects): %.o: %.c
    $(CC) -c $(CFLAGS) $< -o $@
```

目标从`$object`中获取， `%.o` 表明要所有以 `.o` 结尾的目标，也就是 `foo.o bar.o` ，也就是变量 `$object` 集合的模式，而依赖模式 `%.c` 则取模式 `%.o` 的 `%` ，也就是 `foo bar` ，并为其加下 `.c` 的后缀，于是，我们的依赖目标就是 `foo.c bar.c` 。而命令中的 `$<` 和 `$@` 则是自动化变量， `$<` 表示第一个依赖文件， `$@` 表示目标集（也就是“foo.o bar.o”）

## 自动生成依赖性

由编译器自动生成的依赖关系，这样一来，你就不必再手动书写若干文件的依赖关系，而由编译器自动生成, GNU组织建议把编译器为每一个源文件的自动生成的依赖关系放到一个文件中，为每一个 name.c 的文件都生成一个 name.d 的Makefile文件， .d 文件中就存放对应 .c 文件的依赖关系。

### 通过模式规则来产生.d文件

```makefile
%.d: %.c
    @set -e; rm -f $@; \
    $(CC) -M $(CPPFLAGS) $< > $@.$$$$; \
    sed 's,\($*\)\.o[ :]*,\1.o $@ : ,g' < $@.$$$$ > $@; \
    rm -f $@.$$$$
```

所有的 `.d` 文件依赖于 `.c` 文件， `rm -f $@` 的意思是删除所有的目标，也就是 `.d` 文件，第二行的意思是，为每个依赖文件 `$<` ，也就是 `.c` 文件生成依赖文件， `$@` 表示模式 `%.d` 文件，如果有一个C文件是`name.c`，那么 `%` 就是 `name` ， `$$$$` 意为一个随机编号，第二行生成的文件有可能是“name.d.12345”，第三行使用sed命令做了一个替换。第四行就是删除临时文件。

## 命令

### 显示命令

make会把其要执行的命令行在命令执行前输出到屏幕上。当我们用 @ 字符在命令行前，那么，这个命令将不被make显示出来

```makefile
all:
    echo "show me"
    @echo "not show me"
```

### 命令执行

make的每一条命令都是由不同的shell进程运行的, 即一条命令运行介绍, 运行该条命令的shell将退出, 下一条命令由新运行的shell执行

```makefile
aa:
    cd /tmp
    pwd
bb:
    cd /tmp; pwd
```

### 命令出错

如果命令出错, make将停止后面命令的执行, 如果需要命令出错不退出, 在执行的命令前面加上`-`

```makefile
clean:
    -rm -f *.o
```

### 嵌套make

例如，我们有一个子目录叫subdir，这个目录下有个Makefile文件，来指明了这个目录下文件的编译规则。那么我们总控的Makefile可以这样书写：

```makefile
subsystem:
    cd subdir && $(MAKE)
```

```makefile
subsystem:
    $(MAKE) -C subdir
```

两种方式是一样的

把主目录中Makefile的变量不会覆盖下一层Makefile的变量, 除非使用了`-e`参数

如果想传递到下一级Makefile

```makefile
export <variable ...>;
```

`SHELL`和`MAKEFLAGS`总是要传递到下层 Makefile中

### 定义命令包

```makefile
define echo2
echo "1"
echo "2"
endef

all :
    $(echo2)
```

## 变量

变量在声明时需要给予初值，而在使用时，需要给在变量名前加上 `$` 符号，但最好用小括号 () 或是大括号 {} 把变量给包括起来。如果你要使用真实的 `$` 字符，那么你需要用 `$$` 来表示。

### 变量定义变量

使用 `=` 号，在 `=` 左侧是变量，右侧是变量的值，右侧变量的值可以定义在文件的任何一处，也就是说，右侧中的变量不一定非要是已定义好的值，其也可以使用后面定义的值。

```makefile
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:
    echo $(foo)
```

使用的是 `:=` 操作符, 变量不能使用后面的变量，只能使用前面已定义好了的变量。

```makefile
y := $(x) bar
x := foo

all:
    echo $(y)
```

### 变量高级用法

1. 变量值的替换

替换变量中的共有的部分，其格式是 `$(var:a=b)` 或是 `${var:a=b}` ，其意思是，把变量`var`中所有以`a`字串结尾的`a`替换成`b`字串。这里的“结尾”意思是“空格”或是“结束符”。

```
foo := a.o b.o c.o
bar := $(foo:.o=.c)

all:
    echo $(bar)
```

静态模式

```
foo := a.o b.o c.o
bar := $(foo:%.o=%.c)

all:
    echo $(bar)
```

2. 把变量的值再当成变量

```makefile
name := shug
n1 := name

all:
	echo $($(n1))
```

### 追加变量值

```makefile
objects = main.o foo.o bar.o utils.o
objects += another.o

all:
	echo $(objects)
```

### override 指令

如果有变量是通过make的命令行参数设置的，那么Makefile文件中对这个变量的赋值会被忽略。如果你想在Makefile文件中设置这类参数的值，那么，你可以使用“override”指令。

```makefile
override <variable>; = <value>;
override <variable>; := <value>;
override <variable>; += <more text>;
```

### 多行变量

还有一种设置变量值的方法是使用define关键字。使用define关键字设置变量的值可以有换行，这有利于定义一系列的命令（前面我们讲过“命令包”的技术就是利用这个关键字）。所以如果你用define定义的命令变量中没有以 Tab 键开头，那么make 就不会把其认为是命令。

```makefile
define two-lines
echo foo
echo $(bar)
endef
```

### 环境变量

make运行时的系统环境变量可以在make开始运行时被载入到Makefile文件中，但是如果Makefile中已定义了这个变量，或是这个变量由make命令行带入，那么系统的环境变量的值将被覆盖。（如果make指定了“-e”参数，那么，系统环境变量将覆盖Makefile中定义的变量）

### 目标变量

也同样可以为某个目标设置局部变量，这种变量被称为“Target-specific Variable”，它可以和“全局变量”同名，因为它的作用范围只在这条规则以及连带规则中，所以其值也只在作用范围内有效。而不会影响规则链以外的全局变量的值。

```makefile
<target ...> : <variable-assignment>;
<target ...> : overide <variable-assignment>
```

示例

```makefile
prog : CFLAGS = -g
prog : prog.o foo.o bar.o
    $(CC) $(CFLAGS) prog.o foo.o bar.o

prog.o : prog.c
    $(CC) $(CFLAGS) prog.c

foo.o : foo.c
    $(CC) $(CFLAGS) foo.c

bar.o : bar.c
    $(CC) $(CFLAGS) bar.c
```

### 模式变量

变量可以定义在某个目标上。模式变量的好处就是，我们可以给定一种“模式”，可以把变量定义在符合这种模式的所有目标上。

```makefile
%.o : CFLAGS = -O
```

## 条件判断

使用条件判断，可以让make根据运行时的不同情况选择不同的执行分支。条件表达式可以是比较变量的值，或是比较变量和常量的值。

```makefile
libs_for_gcc = -lgnu
normal_libs =

foo: $(objects)
ifeq ($(CC),gcc)
    $(CC) -o foo $(objects) $(libs_for_gcc)
else
    $(CC) -o foo $(objects) $(normal_libs)
endif
```

目标 foo 可以根据变量 $(CC) 值来选取不同的函数库来编译程序。

## 函数

函数调用，很像变量的使用，也是以 `$` 来标识的，其语法：`$(<function> <arguments>)`

### 文本操作函数

#### `$(subst from,to,text)`
将 `text` 中的所有 `from` 替换为 `to`。

```makefile
OBJS = $(subst .c,.o,foo.c bar.c)
# 结果：OBJS = foo.o bar.o
```

#### `$(patsubst pattern,replacement,text)`
将 `text` 中所有匹配 `pattern` 的部分替换为 `replacement`。

```makefile
OBJS = $(patsubst %.c,%.o,foo.c bar.c)
# 结果：OBJS = foo.o bar.o
```

#### `$(strip string)`
移除 `string` 中的所有前导和尾随空白符。

```makefile
STR = $(strip a b c )
# 结果：STR = a b c
```

#### `$(findstring find,in)`
在 `in` 中查找 `find`，如果找到则返回 `find`，否则返回空。

```makefile
FIND = $(findstring a,a b c)
# 结果：FIND = a
```

#### `$(filter pattern...,text)`
返回 `text` 中匹配 `pattern` 的部分。

```makefile
FIL = $(filter %.c,foo.c bar.c baz.h)
# 结果：FIL = foo.c bar.c
```

#### `$(filter-out pattern...,text)`
返回 `text` 中不匹配 `pattern` 的部分。

```makefile
FIL_OUT = $(filter-out %.h,foo.c bar.c baz.h)
# 结果：FIL_OUT = foo.c bar.c
```

#### `$(sort list)`
对 `list` 进行排序并去重。

```makefile
SORTED = $(sort b a c b)
# 结果：SORTED = a b c
```

#### `$(word n,text)`
返回 `text` 中的第 `n` 个单词（从1开始计数）。

```makefile
WORD = $(word 2, a b c)
# 结果：WORD = b
```

#### `$(wordlist s,e,text)`
返回 `text` 中从第 `s` 个到第 `e` 个单词。

```makefile
WORDL = $(wordlist 2, 3, a b c d)
# 结果：WORDL = b c
```

#### `$(words text)`
返回 `text` 中的单词数。

```makefile
WORDS = $(words a b c)
# 结果：WORDS = 3
```

#### `$(firstword text)`
返回 `text` 中的第一个单词。

```makefile
FIRST = $(firstword a b c)
# 结果：FIRST = a
```

#### `$(lastword text)`
返回 `text` 中的最后一个单词。

```makefile
LAST = $(lastword a b c)
# 结果：LAST = c
```

#### `$(dir names)`
返回 `names` 中每个文件名的目录部分。

```makefile
DIRS = $(dir src/foo.c src/bar.c)
# 结果：DIRS = src/ src/
```

#### `$(notdir names)`
返回 `names` 中每个文件名的文件名部分。

```makefile
NAMES = $(notdir src/foo.c src/bar.c)
# 结果：NAMES = foo.c bar.c
```

#### `$(suffix names)`
返回 `names` 中每个文件名的后缀部分。

```makefile
SUFF = $(suffix foo.c bar.o)
# 结果：SUFF = .c .o
```

#### `$(basename names)`
返回 `names` 中每个文件名去掉后缀的部分。

```makefile
BASE = $(basename foo.c bar.o)
# 结果：BASE = foo bar
```

#### `$(addsuffix suffix,names)`
给 `names` 中的每个词添加后缀 `suffix`。

```makefile
SUFF = $(addsuffix .c,foo bar)
# 结果：SUFF = foo.c bar.c
```

#### `$(addprefix prefix,names)`
给 `names` 中的每个词添加前缀 `prefix`。

```makefile
PREF = $(addprefix src/,foo bar)
# 结果：PREF = src/foo src/bar
```

#### `$(join list1,list2)`
将 `list1` 和 `list2` 中的元素一一对应地连接起来。

```makefile
JOIN = $(join a b,c d)
# 结果：JOIN = ac bd
```

### 文件操作函数

#### `$(wildcard pattern)`
返回匹配 `pattern` 的文件列表。

```makefile
SRCS = $(wildcard *.c)
# 结果：SRCS = 列出所有 .c 文件
```

#### `$(realpath names)`
返回 `names` 中每个文件的绝对路径。

```makefile
REAL = $(realpath ./foo/../bar.c)
# 结果：REAL = /绝对路径/bar.c
```

#### `$(abspath names)`
返回 `names` 中每个文件的绝对路径。

```makefile
ABS = $(abspath foo bar)
# 结果：ABS = /当前路径/foo /当前路径/bar
```

### 条件函数

#### `$(if condition,then-part[,else-part])`
根据 `condition` 的真假选择执行 `then-part` 或 `else-part`。

```makefile
COND = $(if $(CC),gcc present,gcc not present)
# 如果 CC 变量被定义，则结果为 "gcc present"，否则为 "gcc not present"
```

#### `$(or condition1, condition2, ...)`
返回第一个非空的条件。

```makefile
OR = $(or $(CC),$(CXX),gcc)
# 如果 CC 或 CXX 被定义，则返回第一个被定义的值，否则返回 "gcc"
```

#### `$(and condition1, condition2, ...)`
返回最后一个非空的条件，如果有一个条件为空，则返回空。

```makefile
AND = $(and $(CC),$(CXX))
# 如果 CC 和 CXX 都被定义，则返回 CXX 的值，否则返回空
```

### Shell 函数

#### `$(shell command)`
执行 `command` 并返回其输出。

```makefile
FILES = $(shell ls)
# 结果：FILES 为当前目录下的文件列表
```

### 其他函数

#### `$(foreach var,list,text)`
对 `list` 中的每个元素执行 `text`，`var` 依次取值为 `list` 中的每个元素。

```makefile
FOREACH = $(foreach f,foo bar,$(f).o)
# 结果：FOREACH = foo.o bar.o
```

#### `$(call func,args...)`
调用 `func` 函数并传递参数 `args`。

```makefile
reverse = $(2) $(1)
CALL = $(call reverse,a,b)
# 结果：CALL = b a
```

#### `$(eval text)`
对 `text` 进行求值并执行。

```makefile
EVAL = $(eval foo = bar)
# 执行后，定义了变量 foo，其值为 bar
```

#### `$(value var)`
返回 `var` 的值而不展开其中的变量。

```makefile
VAR = foo
VALUE = $(value VAR)
# 结果：VALUE = foo
```

#### `$(origin var)`

返回值:
- undefined: var 从来没有定义过，origin函数返回这个值 undefined
- default: var 是一个默认的定义，比如“CC”这个变量，这种变量我们将在后面讲述。
- environment: var 是一个环境变量，并且当Makefile被执行时， -e 参数没有被打开。
- file: var 这个变量被定义在Makefile中。
- command line: 如果 var 这个变量是被命令行定义的。
- override: var 是被override指示符重新定义的。
- automatic: var 是一个命令运行中的自动化变量。

```makefile
VAR = foo
VALUE = $(origin VAR)
# 结果：VALUE = file
```

## 隐含规则

隐含规则也就是一种惯例，make会按照这种“惯例”心照不宣地来运行，那怕我们的Makefile中没有书写这样的规则。例如，把 .c 文件编译成 .o 文件这一规则，你根本就不用写出来，make会自动推导出这种规则，并生成我们需要的 .o 文件。

隐含规则会使用一些我们系统变量，我们可以改变这些系统变量的值来定制隐含规则的运行时的参数。如系统变量 CFLAGS 可以控制编译时的编译器参数。


### 使用隐含规则

如果要使用隐含规则生成你需要的目标，就不要写出这个目标的规则。那么，make会试图去自动推导产生这个目标的规则和命令，如果 make可以自动推导生成这个目标的规则和命令，那么这个行为就是隐含规则的自动推导。当然，隐含规则是make事先约定好的一些东西。例如，我们有下面的一个Makefile：

```makefile
foo : foo.o bar.o
    cc –o foo foo.o bar.o $(CFLAGS) $(LDFLAGS)
```

我们可以注意到，这个Makefile中并没有写下如何生成 foo.o 和 bar.o 这两目标的规则和命令。因为make的“隐含规则”功能会自动为我们自动去推导这两个目标的依赖目标和生成命令。

### 隐含规则一览

`make` 工具中的隐含规则（Implicit Rules）是预定义的一组规则，用于简化常见的构建任务，如编译源文件和生成目标文件。通过使用隐含规则，开发者可以减少在 `Makefile` 中显式定义的规则数量，从而使构建过程更加简洁和高效。以下是对 `make` 隐含规则的详细介绍。

### 常见的隐含规则

#### 编译 C 文件为目标文件

```makefile
%.o: %.c
    $(CC) -c $(CPPFLAGS) $(CFLAGS) -o $@ $<
```

#### 编译 C++ 文件为目标文件

```makefile
%.o: %.cpp
    $(CXX) -c $(CPPFLAGS) $(CXXFLAGS) -o $@ $<
```

#### 编译 Fortran 文件为目标文件

```makefile
%.o: %.f
    $(FC) -c $(FFLAGS) -o $@ $<
```

#### 链接目标文件生成可执行文件

```makefile
%: %.o
    $(CC) $(LDFLAGS) -o $@ $^
```

### 隐含规则的变量

隐含规则使用一些特殊变量，这些变量在规则执行时自动替换为相应的值：
- `$@`：表示目标文件名。
- `$<`：表示第一个依赖项的名称（通常是源文件）。
- `$^`：表示所有依赖项的名称（去重）。
- `$?`：表示所有比目标文件新的依赖项的名称。
- `$*`：表示不包括扩展名的目标文件名称。

取得文件的目录名或是在当前目录下的符合模式的文件名，只需要搭配上 D 或 F 字样
- `$(@D)` 表示 $@ 的目录部分（不以斜杠作为结尾），如果 $@ 值是 dir/foo.o ，那么 $(@D) 就是 dir ，而如果 $@ 中没有包含斜杠的话，其值就是 . （当前目录）。
- `$(@F)` 表示 $@ 的文件部分，如果 $@ 值是 dir/foo.o ，那么 $(@F) 就是 foo.o ， $(@F) 相当于函数 $(notdir $@) 。
- `$(*D), $(*F)` 和上面所述的同理，也是取文件的目录部分和文件部分。对于上面的那个例子， $(*D) 返回 dir ，而 $(*F) 返回 foo
- `$(%D), $(%F)` 分别表示了函数包文件成员的目录部分和文件部分。这对于形同 archive(member) 形式的目标中的 member 中包含了不同的目录很有用。
- `$(<D), $(<F)` 分别表示依赖文件的目录部分和文件部分。
- `$(^D), $(^F)` 分别表示所有依赖文件的目录部分和文件部分。（无相同的）
- `$(+D), $(+F)` 分别表示所有依赖文件的目录部分和文件部分。（可以有相同的）
- `$(?D), $(?F)` 分别表示被更新的依赖文件的目录部分和文件部分。

### 命令的变量
- AR : 函数库打包程序。默认命令是 ar
- AS : 汇编语言编译程序。默认命令是 as
- CC : C语言编译程序。默认命令是 cc
- CXX : C++语言编译程序。默认命令是 g++
- CO : 从 RCS文件中扩展文件程序。默认命令是 co
- CPP : C程序的预处理器（输出是标准输出设备）。默认命令是 $(CC) –E
- FC : Fortran 和 Ratfor 的编译器和预处理程序。默认命令是 f77
- GET : 从SCCS文件中扩展文件的程序。默认命令是 get
- LEX : Lex方法分析器程序（针对于C或Ratfor）。默认命令是 lex
- PC : Pascal语言编译程序。默认命令是 pc
- YACC : Yacc文法分析器（针对于C程序）。默认命令是 yacc
- YACCR : Yacc文法分析器（针对于Ratfor程序）。默认命令是 yacc –r
- MAKEINFO : 转换Texinfo源文件（.texi）到Info文件程序。默认命令是 makeinfo
- TEX : 从TeX源文件创建TeX DVI文件的程序。默认命令是 tex
- TEXI2DVI : 从Texinfo源文件创建军TeX DVI 文件的程序。默认命令是 texi2dvi
- WEAVE : 转换Web到TeX的程序。默认命令是 weave
- CWEAVE : 转换C Web 到 TeX的程序。默认命令是 cweave
- TANGLE : 转换Web到Pascal语言的程序。默认命令是 tangle
- CTANGLE : 转换C Web 到 C。默认命令是 ctangle
- RM : 删除文件命令。默认命令是 rm –f

### 命令参数的变量
- ARFLAGS : 函数库打包程序AR命令的参数。默认值是 rv
- ASFLAGS : 汇编语言编译器参数。（当明显地调用 .s 或 .S 文件时）
- CFLAGS : C语言编译器参数。
- CXXFLAGS : C++语言编译器参数。
- COFLAGS : RCS命令参数。
- CPPFLAGS : C预处理器参数。（ C 和 Fortran 编译器也会用到）。
- FFLAGS : Fortran语言编译器参数。
- GFLAGS : SCCS “get”程序参数。
- LDFLAGS : 链接器参数。（如： ld ）
- LFLAGS : Lex文法分析器参数。
- PFLAGS : Pascal语言编译器参数。
- RFLAGS : Ratfor 程序的Fortran 编译器参数。
- YFLAGS : Yacc文法分析器参数。

## 技巧

### 接收所有目标

```make
.PHONY: $(MAKECMDGOALS)

$(MAKECMDGOALS):
	@echo "Processing target: $@"
```

```make

% :
	@echo "Processing target: $@"
```