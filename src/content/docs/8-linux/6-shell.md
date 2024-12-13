---
title: shell
---

Linux Shell 是用户与 Linux 操作系统之间进行交互的命令行接口。Shell 接受用户输入的命令并将其传递给操作系统内核进行执行。以下是对 Linux Shell 的一些基本介绍：

## Shell 的种类
在 Linux 系统中，有多种 Shell 可供选择，常见的有：
- **Bash（Bourne Again Shell）**：最流行的 Linux Shell，几乎所有的 Linux 发行版默认都提供 Bash。
- **Zsh（Z Shell）**：功能强大且灵活，具有许多用户友好的特性，如自动补全、语法高亮等。
- **Fish（Friendly Interactive Shell）**：专注于用户体验，易于使用和配置。
- **Dash**：轻量级的 POSIX 兼容 Shell，常用于启动脚本中。

### 基本功能
1. **命令执行**：用户可以输入各种命令，Shell 将其传递给操作系统执行。例如，`ls` 列出目录内容，`cd` 改变当前目录。
2. **脚本编写**：Shell 脚本是一种编程语言，用户可以编写脚本来自动化任务。脚本通常以 `.sh` 结尾。
3. **重定向和管道**：可以将命令的输出重定向到文件，或将一个命令的输出通过管道符 `|` 传递给另一个命令。例如，`ls -l > output.txt` 将 `ls -l` 的结果输出到 `output.txt` 文件中。
4. **环境变量**：Shell 使用环境变量存储系统和用户信息。例如，`PATH` 环境变量包含可执行文件的搜索路径。


## bash编程

### Shebang (`#!`)
Shebang 是一个由 `#!` 开头的字符序列，后跟解释器的路径。它出现在脚本文件的第一行，用于指定运行该脚本所需的解释器, 不仅用于shell脚本, python等脚本也可以使用。常见的 Shebang 形式有以下几种：

1. **指定具体路径的解释器**：
    ```sh
    #!/bin/bash
    ```
    这里指定使用 `/bin/bash` 解释器来运行脚本。

2. **使用 `env` 命令查找解释器**：
    ```sh
    #!/usr/bin/env bash
    ```
    这种方式利用 `env` 命令在 `PATH` 环境变量指定的路径中查找解释器。它比直接指定解释器路径更灵活，因为它不依赖解释器的固定路径。

#### `#!/usr/bin/env bash` 的优势

使用 `#!/usr/bin/env bash` 的好处在于提高了脚本的可移植性。不同的系统上 Bash 解释器的路径可能不同，而 `env` 命令可以根据环境变量自动找到正确的解释器路径。例如：

- 在一些系统上，Bash 可能位于 `/bin/bash`。
- 在另一些系统上，Bash 可能位于 `/usr/local/bin/bash`。

使用 `#!/usr/bin/env bash` 可以确保无论 Bash 安装在什么位置，只要它在 `PATH` 环境变量中，该脚本都可以正常运行。

### 脚本的执行
shell脚本执行有多种方式
+ ./cmd.sh
执行cmd.sh
+ source cmd.sh 或 . ./source.sh
+ bash cmd.sh(强制使用bash, 不会按照Shebang查找解释器)

```shell
#!/usr/bin/env bash
echo "Hello world!"
```

### 注释

1. 单行注释

```bash
#
# 这是注释内容
#
```

2. 多行注释

```bash
:<<EOF
echo "多行注释"
echo "多行注释"
EOF
```

### 简单命令

#### set
在 Bash 中，`set` 命令用于修改 shell 的行为和选项。通过使用不同的选项，set 命令可以改变 shell 的执行模式，从而帮助你更好地控制脚本的执行和调试。

常用选项
1. -e, 当一个命令返回非零退出状态时，立即退出脚本。通常用于提高脚本的健壮性，确保在命令失败时脚本不会继续运行。
2. -u, 在引用未定义变量时，立即退出脚本。可以帮助捕捉脚本中的拼写错误和未定义变量的使用。
3. -x, 在执行每个命令之前，打印命令及其参数。常用于调试，帮助你了解脚本的执行过程。
4. -o pipefail, 如果管道中的任意命令失败，则整个管道的返回值为非零。通常与 -e 选项结合使用，确保管道中的每个命令都成功。
5. + 选项, 你可以使用 + 选项来禁用某个选项。例如，set +e 将禁用 -e 选项。

#### echo

```bash
#
# echo 输出, 默认会在结尾添加换行
#

echo "普通字符串"
# "中可以直接使用'
echo "有引号的字符串' \""

# '字符串
echo '"有双引号的字符串"'

# echo 输出变量
name=shug
echo "hello, ${name}"

# echo 输出换行
echo -e "YES\nNo"

# 输出命令结果
echo `pwd`
echo $(pwd)
```

#### print

```bash
#
# printf 打印, 不会自动在末尾添加换行
#

printf '%d %s\n' 1 test
printf "%d %s\n" 1 test

printf %s abc
echo "不换行"


printf "%s\n" "匹配" "没匹配"
printf "%s %s %s\n" a b c d e f g

# 如果没有参数, %s用空字符串填充, %d用0代替
printf "%s 和 %d \n"

printf "%-10s %-8s %-4s\n" 姓名 性别 体重
printf "%-10s %-8s %-4.2f\n" 张三 男 66
printf "%-10s %-8s %-4.2f\n" 李四 男 55.412312
```

### 变量

变量没有数据类型, 也不需要提前声明, 给变量赋值会直接创建变量

变量命名规则
 1. 只能使用英文字母, 数字和下划线, 不能以数字开头
 2. 中间不能有空格
 3. 不能使用关键字
 4. 给变量赋值时,=两边不能有空格

```bash
name=shug
echo $name
echo ${name}

# 只读变量
readonly name
#name=new #取消注释将报错

# 删除变量
new=new
unset new
echo ${new}
```
变量类型
 1. 局部变量 - 仅在脚步范围内有效(使用local声明的局部变量, 作用域仅限于函数内部, local只能在函数内部使用)
 2. 环境变量 - 在当前shell回话内所有程序和脚本都有效, 使用export创建

|常见环境变量     |         描述                               |
|---------------| ------------------------------------------ |
| `HOME`          |            当前用户的家目录                   |
| `PATH`          |            用分号分割的目录列表, shell在执行外部命令时,会依次到这些目录里面查询 |
| `PWD`           |            当前工作目录                         |
| `RANDOM`        |            0-32767之间的整数                   |
| `UID`           |            数值类型, 当前用户的用户ID            |
| `PS1`           |            主要系统输入提示符                   |
| `PS2`           |            次要系统输入提示符                   |
| `$0`     | 当前脚本或命令的名称 |
| `$1, $2, ..., $N` | 传递给脚本或函数的参数，`$1` 是第一个参数，`$2` 是第二个参数，依此类推 |
| `$#`     | 传递给脚本或函数的参数个数 |
| `$@`     | 传递给脚本或函数的所有参数（分开显示） |
| `$*`     | 传递给脚本或函数的所有参数（作为单个字符串） |
| `$?`     | 前一个命令的退出状态，成功返回 `0`，失败返回非零值 |
| `$$`     | 当前脚本或命令的进程ID |
| `$!`     | 最后一个后台命令的进程ID |
| `$_`     | 最后执行的命令的最后一个参数，或者在交互模式下表示最后一个命令 |

### 字符串

shell字符串可以使用单引号, 双引号, 也可以不加引号

```bash
#  - 双引号
#    字符串识别变量
echo "单双引号, ${PATH}"
#  - 单引号
#    不识别变量, 字符串内不能出现单独的单引号, 但可以成对出现
echo 'hello, 'world''
#   hello, world

echo "字符串拼接"
name=shug

h1='hello, '${name}''
h2='hello, ${name}'

echo ${h1} ${h2}

h1="hello, "${name}""
h2="hello, ${name}"
echo ${h1} ${h2}

echo "获取字符串长度"
name=shug
echo "name的值是: ${name}, 长度是: ${#name}"

echo "截取字符串"
# 从第二个字符开始截取后面的字符串
echo "${name:1}"
# 从第二个字符开始截取后面一个字符
echo "${name:1:1}"

echo "使用expr命令查找子字符串"
echo `expr index "${name}" h`
```

### 数组

```bash
# 创建数组
nums=([2]=2 [0]=0 [1]=1)
gender=(male female)

# 访问单个元素
echo ${nums[1]}
echo ${gender[1]}

# 访问所有元素
#

echo ${nums[*]}
echo ${gender[@]}

# * 和@ 的区别
#
nums=("one" "twe" "one one")

printf " %s\n" ${nums[*]}
echo "---------------"
printf " %s\n" ${nums[@]}

echo "+++++++++++++++"
printf " %s\n" "${nums[*]}"
echo "---------------"
printf " %s\n" "${nums[@]}"

echo "数组切片"
# 从0开始取两个元素
echo ${nums[@]:0:2}

# 数组长度
echo ${#nums[*]}

# 向数组添加元素
nums=("zero" "${nums[@]}")

echo ${nums[@]}

# 删除元素
unset nums[0]
echo ${nums[@]}
```

### 运算符

1. 算数运算符

| 运算符 | 说明 | 举例 |
| :-- | :-- | :-- |
| + | 加 | expr $x + $y |
| - | 减 | expr $x - $y |
| * | 乘 | expr $x * $y |
| / | 除 | expr $x / $y |
| % | 取余 | expr $x % $y |
| = | 赋值 | x = $y |
| == | 等于 | [ $x == $y ] |
| != | 不等 | [ $x != $y ] |

2. 关系运算符

| 运算符 | 说明 | 举例 |
| :-- | :-- | :-- |
| -eq | 等 | [ $x -eq $y ] |
| -ne | 不等 | [ $x -ne $y ] |
| -gt | 大于 | [ $x -gt $y ] |
| -lt | 小于 | [ $x -lt $y ] |
| -ge | 大于等于 | [ $x -ge $y ] |
| -le | 小于等于 | [ $x -le $y ] |
| = | 字符串相等 | [[ $a == $b ]] |
| != | 字符串不相等 | [[ $a != $b ]] |
| -z | 字符串长度为0 | [[ -z $a ]] |
| -n | 字符串长度不为0 | [[ -n $a ]] |
|  | 字符串为空 | [[ $a ]] |

3. 布尔运算符

| 运算符 | 说明 | 举例 |
| :-- | :-- | :-- |
| ! | 非 | [ !false ] |
| -o | 或 | [ $x -lt 1 -o $y -eq 2 ] |
| -a | 与 | [ $x -lt 1 -a $y -eq 2 ] |

4. 逻辑运算符

| 运算符 | 说明 | 举例 |
| :-- | :-- | :-- |
| && | 与 | [[ $x -lt 100 && $y -gt 100 ]] |
| \|\| | 或 | [[ $x -lt 100 \|\| $y -gt 100  ]]  |

5. 文件测试运算符

| 运算符 | 说明 | 举例 |
| :-- | :-- | :-- |
| -b | 块设备文件 | [[ -b $file ]] |
| -c | 字符设备文件 | [[ -c $file ]] |
| -d | 目录 | [[ -d $file ]] |
| -f | 非设备文件和目录的文件 | [[ -f $file ]] |
| -g | 文件设置SGID | [[ -g $file ]] |
| -k | 文件设备Sticky | [[ -k $file ]] |
| -p | 管道文件 | [[ -p $file ]] |
| -u | 文件设置SUID | [[ -u $file ]] |
| -r | 文件可读 | [[ -r $file ]] |
| -w | 文件可写 | [[ -w $file ]] |
| -x | 块文件可执行 | [[ -x $file ]] |
| -s | 空文件 | [[ -s $file ]] |
| -e | 文件或目录存在 | [[ -e $file ]] |

### 条件判断

```bash
if [[ 1 -eq 1 ]];
then
	echo "1 -eq 1"
else
	echo "1 -ne 1"
fi
```

```bash
a=2

if [[ $a -eq 1 ]];
then
	echo "a == 1"
elif [[ $a -eq 2 ]];
then
	echo "a == 2"
else
	echo "else ${a}"
fi
```

```bash
case ${a} in
	0)
		echo "a=0"
		;;
	1)
		echo "a=1"
		;;
	2)
		echo "a=2"
		;;
	3)
		echo "a=3"
		;;
	*)
		echo "a=${a}"
		;;
esac
```

### 循环语句

```bash
for arg in 1 2 3
do
	echo ${arg}
done
```

```bash
for arg in {1..3};
do
	echo ${arg}
done
```

```bash
for (( i=0; i<3; i++ ));
do
	echo ${i}
done
```

```bash
for file in ./*.sh;
do
	echo "file: ${file}"
done
```

```bash
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

```bash
while [[ ${a} -lt 4 ]];
do
	echo "a=${a}"
	a=$(( a+1 ))
done
```

```bash
select i in 1 2 3 4 5 6;
do
	echo $i
	if [[ $i -eq 2 ]]; then break; fi 
done
```

### 函数

```bash
calc() {
	echo "call calc"
	echo "\$*: $*"
	echo "\$@: $@"
	echo "\$\#: $#"
	echo "\$0: $0"
	echo "\$FUNCNAME: $FUNCNAME"
}

calc
echo "res: $?"
echo "pid: $!"
echo "set: $-"
```

### 读取输入

在 Bash 脚本中，可以使用多种方式读取输入，包括 `read` 命令、命令行参数、重定向等。以下是几种常用方法的示例：

#### 使用 `read` 命令读取用户输入

```bash
#!/bin/bash

echo "请输入你的名字:"
read name
echo "你好, $name!"
```

#### 从命令行参数读取输入

```bash
#!/bin/bash

if [ $# -lt 1 ]; then
    echo "请提供一个参数"
    exit 1
fi

name=$1
echo "你好, $name!"
```

#### 使用 `read` 命令从文件读取输入

假设有一个文件 `input.txt`，内容如下：

```
Alice
Bob
Charlie
```

读取文件内容并逐行处理：

```bash
#!/bin/bash

while IFS= read -r line
do
    echo "你好, $line!"
done < input.txt
```

#### 使用重定向读取输入

可以使用输入重定向将文件内容传递给脚本：

```bash
#!/bin/bash

while IFS= read -r line
do
    echo "你好, $line!"
done
```

运行脚本时将文件内容重定向到脚本：

```bash
./script.sh < input.txt
```

#### 从命令管道读取输入

通过管道将命令的输出传递给脚本：

```bash
#!/bin/bash

while IFS= read -r line
do
    echo "你好, $line!"
done
```

使用管道运行脚本：

```bash
echo -e "Alice\nBob\nCharlie" | ./script.sh
```