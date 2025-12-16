---
title: nix语言
---

## 1. 数据类型

| 数据类型      | 介绍                                       | 示例          |
| ------------- | ------------------------------------------ | ------------- |
| Integer       | 有符号的 64 位整数                         | 1             |
| Float         | 64 位 IEEE 754 浮点数                      | 1.2           |
| Boolean       | 布尔值                                     | true          |
| String        | 字符串是不可变的有限长度字节序列           | "Hello"       |
| Path          | 以 / 或 . 开头的不可变、有限长度的字节序列 | /etc, ./code  |
| Null          | null 类型的值                              | null          |
| Attribute set | 属性集                                     | `{ a = 1; }`  |
| List          | 列表                                       | `["hello" 1]` |
| Function      | 函数                                       | `args: ret`   |
| External      | nix插件插件的不透明值                      |               |

## 2. 构建值

基本字面量

### 字符串

单行字符串

```nix
"hello"
```

多行行字符串

```nix
''
hello
shug
''
```

字符串插值

```nix
''
hello
${ name }
''
```

多行字符串中如果要插入`$`等字符，可以使用`''`转义

```nix
''
  ''$
  ''\n
  ''\r
  ''\t
  '''
''
```

## 3. 关键字

- assert
- else
- if
- in
- inherit
- let
- or
- rec
- then
- with

### assert 断言

```nix
assert e1 ; e2
```

其中`e1`是一个表达式，应该得到一个布尔值。如果是`true`则返回`e2`，否则将终止。

### if判断

```nix
if e1 then e2 else e3
```

如果`e1`为`true`返回`e2`，为`false`返回`e3`。

### let 绑定

```nix
let
  a = 1;
  b = a + 1;
in
  b
```

let 表达式允许定义局部变量，返回`in`后面的值`b`

### or 表达式

```nix
attrset.name or "shug"
```

访问`attrset`的`name`属性，如果`name`属性不存在，将返回`or`后面的值，如`shug`。

### inherit 继承

```nix
let
  a = 1;
in {
  a = a;
}
```

等价于

```nix
let
  a = 1;
in {
  inherit a;
}
```

```nix
let
  user = {
    name = "shug";
    age = 18;
  };
in {
  name = user.name;
  age = user.age;
}
```

等价于

```nix
let
  user = {
    name = "shug";
    age = 18;
  };
in {
  inherit(user) name age;
}
```

### rec 递归set

```nix
rec {
  a = 1;
  b = a + 1;
}
```

### with 表达式

```nix
with e1; e2
```

将集合 `e1` 引入表达式 `e2` 的范围

```nix
with { a = 1; };
a
```

## 4. 查找路径

```nix
<nixpkgs>
```

根据标识符`nixpkgs`在`builtins.nixPath`中查找路径。

```nix
<nixpkgs/nixos>
```

如果`<nixpkgs>`匹配到`/nix/var/nix/profiles/per-user/root/channels/nixpkgs`，
`<nixpkgs/nixos>`将匹配到`/nix/var/nix/profiles/per-user/root/channels/nixpkgs/nixos`

## 5. 操作符号

| 名称           | 语法                     | 结果    |
| -------------- | ------------------------ | ------- |
| 属性选择       | attrset.attrpath or expr |         |
| 函数调用       | func expr                |         |
| 负号运算       | - number                 | number  |
| 属性判断       | assert ? attrpath        | bool    |
| list拼接       | list ++ list             | list    |
| 乘法           | number \* number         | number  |
| 除法           | number / number          | number  |
| 减法           | number - number          | number  |
| 加法           | number + number          | number  |
| 字符串拼接     | string + string          | string  |
| 路径拼接       | path + path              | path    |
| 路径字符串拼接 | path + string            | path    |
| 字符串路径拼接 | string + path            | string  |
| 逻辑负         | ! bool                   | bool    |
| 更新集合       | attrset // attrset       | attrset |
| 小于           | expr < expr              | bool    |
| 小于等于       | expr <= expr             | bool    |
| 大于           | expr > expr              | bool    |
| 大于等于       | expr >= expr             | bool    |
| 等于           | expr == expr             | bool    |
| 不等           | expr != expr             | bool    |
| 与             | bool && bool             | bool    |
| 或             | bool \| \| bool          | bool    |
| 逻辑推论       | bool -> bool             | bool    |
| 管道（实验性） | expr \| > fun            |         |
| 管道（实验性） | fun < \| expr            |         |

## 6. 定义函数

```txt
pattern: body
```

```nix
let
  fn = name: "hi " + name;
in
  fn "shug"
```

返回值`hi shug`

多个参数的函数

```nix
let
  fn = gretting: name: gretting + name;
in
  fn "hello" "shug"
```

返回值`helloshug`

使用集合作为参数

```nix
let
  fn = { name }: name;
in
  fn { name = "shug"; }
```

返回值`shug`

接受额外的参数

```nix
let
  fn = {name, ...}: name;
in
  fn {name = "shug"; age = 18;}
```

返回值`shug`

带默认值的函数

```nix
{ gretting, name ? "shug" }: gretting + name;
```

匹配的全部值

```nix
args@{ gretting, name ? "shug" }: gretting + name;
```

或

```nix
{ gretting, name ? "shug" }@args: gretting + name;
```

特殊函数`__functor`，带有`__functor`属性的集合，可以像函数一样应用。

```nix
{
  __functor = self: args: args;
}
```

## 7. 字符串上下文

在 Nix 中，字符串值不仅仅是“字符序列”，它还可以携带一份上下文（context）：一组与该字符串相关联的 store path 依赖。

比如字符串插值

```nix
"${pkgs.coreutils}/bin/ls"
```

表达式结果

```txt
"/nix/store/xs8scz9w9jp4hpqycx3n3bah5y07ymgj-coreutils-9.8/bin/ls"
```

表面上只是一个字符串，但是它还包含了上下文(context)，带有`pkgs.coreutils` 对应的 store path。
当把这个字符串写进 derivation、脚本、systemd unit 等地方时，Nix 会知道它依赖 coreutils，并把它加入闭包（closure）

字符串上下文的作用：让“字符串里提到的 store 路径”成为真实依赖。

`builtins.hasContext` 判断字符串是否具有上下文

```nix
builtins.hasContext "${pkgs.coreutils}/bin/ls"
```

`builtins.getContext` 获取字符串上下文

```nix
builtins.getContext "${pkgs.coreutils}/bin/ls"
```

`builtins.unsafeDiscardStringContext` 复制字符串，但字符串上下文为空

```nix
builtins.getContext (builtins.unsafeDiscardStringContext "${pkgs.coreutils}/bin/ls")
```

`builtins.appendContext` 复制字符串，带有额外的字符串上下文元素

```nix
builtins.appendContext "" (builtins.getContext "${pkgs.coreutils}/bin/ls")
```

### 常数字符串上下文元素

```nix
builtins.storePath "/nix/store/xs8scz9w9jp4hpqycx3n3bah5y07ymgj-coreutils-9.8"
```

获取上下文

```nix
builtins.getContext (builtins.storePath "/nix/store/xs8scz9w9jp4hpqycx3n3bah5y07ymgj-coreutils-9.8")
```

结果

```nix
{
  "/nix/store/xs8scz9w9jp4hpqycx3n3bah5y07ymgj-coreutils-9.8" = {
    path = true;
  };
}
```

### 输出字符串上下文元素

```nix
builtins.storePath "/nix/store/qabf8kc1wl566y6vqgys523359nshnv3-coreutils-9.8.drv"
```

获取上下文

```nix
builtins.getContext(
  builtins.outputOf (builtins.storePath "/nix/store/qabf8kc1wl566y6vqgys523359nshnv3-coreutils-9.8.drv")
  "out")
```

结果

```nix
{
  "/nix/store/qabf8kc1wl566y6vqgys523359nshnv3-coreutils-9.8.drv" = {
    outputs = [ "out" ];
  }
}
```

### 派生深度(derivation deep)

派生深度是一个高级功能，旨在与 exportReferencesGraph 派生属性 。
派生深字符串上下文元素是一个派生路径，指其输出以及该派生的整个构建闭包：所有输出、所有派生依赖的其他派生，以及这些派生的所有输出。

获取上下文

```nix
builtins.getContext(
  builtins.addDrvOutputDependencies (builtins.storePath "/nix/store/qabf8kc1wl566y6vqgys523359nshnv3-coreutils-9.8.drv"))
```

结果

```nix
{
  "/nix/store/qabf8kc1wl566y6vqgys523359nshnv3-coreutils-9.8.drv" = {
    allOutputs = true;
  }
}
```

## 8. derivation (派生)

Derivation 是 Nix 中“如何构建某个结果”的完整、可哈希、可重现的构建说明书。

- 不是构建结果
- 不是 Nix 源码
- 是 Nix evaluator 输出给构建系统的中间产物

### derivation（具体内容）

1. Builder
   - 用什么程序来构建
   - 通常是 `/nix/store/…/bash` 或 `stdenv` 的 `builder`

2. Arguments
   - 传给 builder 的参数（脚本、flags）

3. Environment variables
   - `PATH`
   - `src`
   - `buildInputs`
   - 以及所有构建期所需信息

4. Inputs（依赖）
   - 其它 derivation 的 `outputs`

5. Outputs
   - 通常至少有一个：`out`
   - 也可以有：`dev`, `lib`, `doc` 等

### derivation 函数的参数集合

#### 必要参数

- name (String)

`derivation`的名称

- system (String)

声明要基于特定系统类型构建派生，常用值

- x86_64-linux
- x86_64-darwin
- i686-linux
- aarch64-linux
- aarch64-darwin
- armv6l-linux
- armv7l-linux

- builder (Path | String)

构建者，常使用`bash`

#### 可选参数

- args (List of String)
  Default: \[ \]
  传递给`builder`的参数

- outputs (List of String)
  Default: \[ "out" \]
  输出路径

- 其他属性作为环境变量传递给`builder`

1. 字符串不变
2. 整数转换为十进制
3. 浮点数被转换为简单的十进制或科学记数法
4. 路径会将引用的文件复制到`store`
5. 派生使得该派生在当前派生之前被构建。环境变量设置为派生默认输出的存储路径
6. `true` 作为字符串 1 传递，`false` 和 `null` 作为空字符串传递

#### 高级参数

- `exportReferencesGraph`
  参数 `[ name1 path1 name2 path2 ... ]`

  ```nix
  derivation {
    exportReferencesGraph = [ "bash-graph" pkgs.bash ];
  };
  ```

  将在构建目录下创建一个名为`bash-graph`的文件，文件中是`bash`的引用图。

- `passAsFile`
  通过文件而非环境变量传递的属性名称列表

  ```nix
  derivation {
    passAsFile = [ "file" ];
    file = "string in file";
  };
  ```

- `__structuredAttrs`

  如果属性 `__structuredAttrs` 设置为`true` ，其他派生属性会序列化成 JSON 格式的文件。
  并将环境变量`NIX_ATTRS_JSON_FILE`指向该JSON文件。
  JSON文件在构建目录下`.attrs.json`,
  还有一个添加环境变量的`.attrs.sh`，环境变量`NIX_ATTRS_SH_FILE`指向该文件。

- `allowedReferences`

  指定了构建者输出的引用（依赖）列表

- `allowedRequisites`

  该属性类似于 `allowedReferences`，但它指定了整个闭包的合法要求。

- `disallowedReferences`

  构建器输出的非法引用（依赖）列表

- `disallowedRequisites`

  该属性类似于 `disallowedReferences`，但它为整个闭包指定了非法的必要条件，因此所有依赖关系都是递归的。

- `outputChecks`

  使用结构化属性时，`outputChecks` 属性允许定义每个输出的检查。
  可以使用`allowedReferences`, `allowedRequisites`, `disallowedReferences`,
  `disallowedRequisites`, `maxSize`,`maxClosureSize` 和`ignoreSelfRefs`。
  - `maxSize` 定义了生成存储对象的最大大小。
  - `maxClosureSize` 定义输出闭包的最大大小。
  - `ignoreSelfRefs` 控制在检查允许引用/要求时是否应考虑自指。

- `unsafeDiscardReferences`

  使用结构化属性时，`unsafeDiscardReferences` 属性是一个属性集，
  每个输出名称都有布尔值。如果设置为 `true`，则会禁用扫描输出以查找运行时依赖。

- `preferLocalBuild`

  如果该属性设置为 `true` 且启用分布式构建 ，那么如果可能，派生会在本地构建，而不是转发到远程机器。这对于本地构建成本最低的派生非常有用。

- `allowSubstitutes`

  如果该属性设置为 `false`，则 Nix 总是会构建该派生（本地或远程）;它不会尝试替代自己的输出。这对于构建成本低于替代的派生非常有用。

- `requiredSystemFeatures`

  如果推导带有所需的 `SystemFeatures` 属性，那么 Nix 只会在其 `System-features` 配置中设置相应特征的机器上构建该算法。

- `impureEnvVars`

  该属性允许你指定环境变量列表 该数据应从调用用户的环境传递至 构建者

- `outputHashMode`

  规定了内容寻址派生输出的文件如何被消化生成内容地址。

- `outputHashAlgo`

  文件系统对象数据的哈希算法。
  - `blake3`
  - `sha1`
  - `sha256`
  - `sha512`
  - `null`

- `outputHash`

  须是包含哈希的字符串，采用十六进制或“nix32” 编码，或遵循 SRI 定义的完整性元数据格式。

- `__contentAddressed`

  是否为内容寻址

## 9. builtins 内置功能

暴露到全局的内置功能

- derivation
- derivationStrict
- abort
- baseNameOf
- break
- dirOf
- false
- fetchGit
- fetchMercurial
- fetchTarball
- fetchTree
- fromTOML
- import
- isNull
- map
- null
- placeholder
- removeAttrs
- scopedImport
- throw
- toString
- true

### derivation attrs

接受一个集合，返回一个集合，并产生存储derivation 。

### abort s

中止 Nix 表达式评估并打印错误消息。

### add e1 e2

返回数字 e1 和 e2 的和。

### addDrvOutputDependencies s

创建一个给定字符串的副本，其中单个 常数 字符串上下文元素被转换成 推导深度 字符串上下文元素。

### all pred list

如果函数 pred 对列表的所有元素返回`true` ，则返回`true` ;否则返回 `false`。

### any pred list

如果函数 pred 至少对列表中的一个元素返回为`true` ，则返回 `true`;否则返回 `false`。

### attrNames set

返回集合中属性的名称，按字母顺序排序

### attrValues set

返回集合中属性的值，顺序对应已排序的属性名称。

### baseNameOf x

根据传递的类型，返回路径值 `x` 或字符串 `x` 的基名。

### bitAnd e1 e2

返回整数 e1 和 e2 的位和。

### bitOr e1 e2

返回整数 e1 和 e2 的逐位或值。

### bitXor e1 e2

返回整数 e1 和 e2 的位数异或值。

### break v

在调试模式下（使用 --debugger 启用），暂停 Nix 表达式的评估并输入 REPL。否则返回参数 `v`。

### builtins (set)

包含所有内置功能和数值。

### catAttrs attr list

从属性集列表中收集每个名为 `attr` 的属性。不包含该命名属性的集合会被忽略。

### ceil number

向上取整数

### compareVersions s1 s2

比较代表版本的两个字符串，如果版本 `s1` 比版本 `s2` 更早，返回 `-1`;
如果相同，返回 `0`;如果 `s1` 比 `s2` 更新，返回 `1`。

### concatLists lists

将多个列表串接成一个单一列表。

### concatMap f list

该函数等价于 `builtins.concatLists (map f list)` 但效率更高。

### concatStringsSep separator list

将字符串串接，每个元素之间有分隔符

### convertHash args

`args`参数

- `hash` 需要转换的哈希值
- `hashAlgo` 用于创建哈希的算法
  - "md5"
  - "sha1"
  - "sha256"
  - "sha512"
- `toHashFormat` 得到的哈希格式
  - "base16"
  - "nix32"
  - "base32"
  - "base64"
  - "sri"

### currentSystem (string)

`纯评估模式下无法获得` 获取当前系统

### currentTime (string)

`纯评估模式下无法获得` 第一次评估时就把 Unix 时间归还。反复引用该名称会重复使用最初获得的值。

### deepSeq e1 e2

这类似于序列 `seq e1 e2`，但 e1 是深度计算的：如果是列表或集合，其元素或属性也会递归地计算。

### dirOf s

返回字符串 `s` 的目录部分。

### div e1 e2

返回数 e1 和 e2 的商。

### elem x xs

如果列表 `xs` 中出现等于 `x` 的值，则返回 `true`， 否则就是`fasle`。

### elemAt xs n

从列表 xs 返回元素 n。元素从 0 开始计数。

### false (Boolean)

bool值false

### fetchClosure args

需要`fetch-closure` 的`extra-experimental-features`

从二进制缓存中获取存储路径闭包 ，并将存储路径作为带有上下文的字符串返回。

```nix
builtins.fetchClosure {
  fromStore = "https://cache.nixos.org";
  fromPath = /nix/store/ldbhlwhh39wha58rm61bkiiwm6j7211j-git-2.33.1;
}
```

### fetchGit args

`args`参数

- `url` 代码仓库的 URL
- `name (default: source)` 仓库应该导出到的目录名称
- `rev` 要获取的 Git 版本 。这通常是一个提交哈希值
- `ref (default: HEAD)` 要查找所需版本的 Git 参考代码 。这通常是分支名称或标签名称
- `submodules (default: false)` 是否应该检出子模块
- `exportIgnore (default: true)` 是否应用来自 .gitattributes 的 export-ignore 规则
- `shallow (default: false)` 获取 Git 仓库时执行浅克隆。启用此选项后， `ref` 和 `allRefs` 选项将不再生效
- `lfs (default: false)` 是否获取 Git LFS 文件
- `allRefs` 是否获取仓库的所有引用（例如分支和标签）
- `verifyCommit (default: true)` 是否检查 `rev` 是否与 `publicKey` 或 `publicKeys` 匹配
- `publicKey` 公钥
- `keytype (default: "ssh-ed25519")` `publicKey` 的密钥类型
  - "ssh-dsa"
  - "ssh-ecdsa"
  - "ssh-ecdsa-sk"
  - "ssh-ed25519"
  - "ssh-ed25519-sk"
  - "ssh-rsa"
- `publicKeys` 以属性集列表的形式提供公钥

  ```nix
  [
    {
      key = "<public key>";
      type = "<key type>"; # optional, default: "ssh-ed25519"
    }
  ]
  ```

### fetchTarball args

下载指定的 URL，解压缩并返回解压缩后的文件路径。
该文件必须是使用 gzip 、 bzip2 或 xz 压缩的磁带归档文件（ .tar ）

### fetchTree input

需要`fetch-tree` 的`extra-experimental-features`

使用支持的后端之一获取文件系统树或纯文件

### fetchurl args

下载指定 URL 并返回下载文件的路径

`args`参数

- `url` 要下载的文件的 URL
- `name` 文件在存储中的名称

### filter f list

返回一个列表，其中包含函数 `f` 返回 `true` 列表元素

### filterSource e1 e2

将源文件复制到 Nix 存储中，同时筛选特定文件

### findFile search-path lookup-path

在搜索路径中查找查找路径

### flakeRefToString attrs

需要`flakes` 的`extra-experimental-features`

将 flake 引用从属性集格式转换为 URL 格式

### floor number

数字向下取整数

### foldl' op nul list

从左到右应用二元运算符来缩减列表

### fromJSON e

将 JSON 字符串转换为 Nix 值

### fromTOML e

将 TOML 字符串转换为 Nix 值

### functionArgs f

返回一个集合，其中包含函数 f 所需的形参名称。每个属性的值是一个布尔值，表示相应的参数是否有默认值

### genList generator length

生成长度为 `length` 的列表，其中每个元素 `i` 等于生成器 `i` 返回的值。

### genericClosure attrset

迭代地计算由函数定义的任意关系的传递闭包

- `startSet` : 属性集的初始列表
- `operator` : 一个接受属性集并返回属性集列表的函数

列表 `startSet` 和 `operator` 返回的列表中的每个属性集都必须有一个属性 key ，该属性键必须支持相等性比较。

```nix
builtins.genericClosure {
  startSet = [ {key = 5;} ];
  operator = item: [{
    key = if (item.key / 2 ) * 2 == item.key
         then item.key / 2
         else 3 * item.key + 1;
  }];
}

# [ { key = 5; } { key = 16; } { key = 8; } { key = 4; } { key = 2; } { key = 1; } ]
```

### getAttr s set

返回集合中名为 `s` 的属性

### getContext s

返回字符串 `s` 的上下文

### getEnv s

返回环境变量 `s` 的值，如果该变量不存在，则返回空字符串

### getFlake args

需要`flakes` 的`extra-experimental-features`

### groupBy f list

将列表中的元素按函数 f 对每个元素调用后返回的字符串进行分组

### hasAttr s set

如果集合中有一个名为 s 的属性, 返回 true , 否则 false

### hasContext s

如果字符串 s 具有非空上下文，则返回 `true`

### hashFile type p

返回路径 `p` 处文件的加密哈希值的 base-16 表示,
型指定的哈希算法必须是 "md5" 、 "sha1" 、 "sha256" 或 "sha512" 之一

### hashString type s

返回字符串的加密哈希的十六进制表示。 哈希算法必须是 "md5" 之一， "sha1" 、 "sha256" 或 "sha512"

### head list

返回列表的第一个元素

### import path

加载、解析并返回文件路径中的 Nix 表达式

### intersectAttrs e1 e2

返回一个集合，该集合由集合 `e2` 中与 `e1` 中的某个属性同名的属性组成

### isAttrs e

如果 `e` 的值为集合，则返回 `true` ，否则返回 `false`

### isBool e

如果 `e` 的值为布尔值，则返回 `true` ，否则返回 `false`

### isFloat e

如果 `e` 的值为浮点数，则返回 `true` ，否则返回 `false`

### isFunction e

如果 `e` 的值为函数，则返回 `true` ，否则返回 `false`

### isInt e

如果 `e` 的值为整数，则返回 `true` ，否则返回 `false`

### isList e

如果 `e` 的值为列表，则返回 `true` ，否则返回 `false`

### isNull e

如果 `e` 的值为`null`，则返回 `true` ，否则返回 `false`

### isPath e

如果 `e` 的值为路径，则返回 `true` ，否则返回 `false`

### isString e

如果 `e` 的值为字符串，则返回 `true` ，否则返回 `false`

### langVersion (integer)

Nix 语言的当前版本。

### length e

返回列表 e 的长度

### lessThan e1 e2

如果值 `e1` 小于值 `e2` ，则返回 `true` ，否则返回 `false`

### listToAttrs e

根据列表中的属性名称和值构建一个集合。列表中的每个元素都应该是一个集合，
该集合包含一个字符串类型的属性 `name` （指定属性名称）和一个属性 `value` 。

### map f list

将函数 `f` 应用于列表 `list` 中的每个元素

### mapAttrs f attrset

对属性集中的每个元素应用函数 `f`

### match regex str

`regex` 与字符串 `str` 完全匹配，则返回一个列表；否则返回 `null`

### mul e1 e2

返回数字 `e1` 和 `e2` 的乘积

### nixPath (list)

用于解析查找路径的搜索路径条目列表

### nixVersion (string)

Nix 的版本

### null (null)

null值

### outputOf derivation-reference output-name

需要`dynamic-derivations` 的`extra-experimental-features`

如果派生过程具有静态已知的输出路径（即派生过程的输出是输入寻址的，或固定内容寻址的），则返回该输出路径。
但如果派生过程是内容寻址的，或者派生过程本身并非静态生成（即它是另一个派生过程的输出），则返回一个输入占位符。

### parseDrvName s

将字符串 s 拆分为包名和版本

### parseFlakeRef flake-ref

需要`flakes` 的`extra-experimental-features`

解析 flake 引用，并返回其展开形式

### partition pred list

给定一个谓词函数 pred ，此函数返回一个属性集，其中包含一个名为 right 列表，
该列表包含 `pred` 返回 `true` list 中的元素，以及一个名为 的列表。 `wrong` 包含它返回的元素 `false`

### path args

基于参数中存在的属性，对内置路径类型进行扩展, 除 path 外，所有属性均为可选

`args`参数

- `path` 底层路径
- `name` 添加到商店时路径的名称
- `filter` 符合 `builtins.filterSource` 预期类型的函数，语义相同。
- `recursive` 如果设置为 `false` ，则添加到存储中的 `path` 将使用扁平哈希值，而不是文件 NAR 序列化的哈希值。
  `path` 必须指向一个普通文件，而不是一个目录。这使得它的行为与 `fetchurl` 类似。默认值为 `true` 。
- `sha256` 如果提供，这是该文件的预期哈希值

### pathExists path

如果路径 `path` 在评估时存在，则返回 `true` 否则为 `false`

### placeholder output

返回 输出占位符字符串 对于指定的输出

### readDir path

返回目录路径的内容

### readFile path

返回文件路径的内容（字符串形式）

### readFileType p

确定文件系统节点的目录项类型

### removeAttrs set list

从集合中移除列表中列出的属性

### replaceStrings from to s

给定字符串 `s` ，将字符串 `from` 中出现的所有值替换为 `to` 中对应位置的字符串

### seq e1 e2

先计算 `e1` ，然后计算并返回 `e2`

### sort comparator list

返回排序后的列表 。它会重复调用该函数

### split regex str

返回一个列表，该列表由未匹配的字符串与字符串 `str` 的扩展 POSIX 正则表达式 `regex` 匹配列表交错组成

### splitVersion s

将表示版本的字符串拆分成其组成部分

### storeDir (string)

当前正在使用的 Nix 存储的逻辑文件系统位置

### storePath path

此函数允许您定义对已存在存储路径的依赖关系

### stringLength e

返回字符串 e 的字节数

### sub e1 e2

返回数字 `e1` 和 `e2` 之间的差值

### substring start len s

返回字符串 `s` 从字节位置 `start` 开始的子字符串, 直到但不包含 `start + len`

### tail list

返回不包含第一个元素的列表

### throw s

抛出错误消息 `s`

### toFile name s

将字符串 s 存储在 Nix 存储区的一个文件中，并返回其路径

### toJSON e

返回一个包含 e 的 JSON 表示形式的字符串

### toPath s

`已弃用` 请使用 `/. + "/path"` 将字符串转换为绝对路径, 对于相对路径，请使用 `./. + "/path"`

### toString e

将表达式 e 转换为字符串 。e 可以是：

- 一个字符串（在这种情况下，字符串将原样返回）。
- 路径 例如， `toString /foo/bar 产生 "/foo/bar"`
- 包含 `{ __toString = self: ...; }` 或`{ outPath = ...; }` 的集合。
- 整数
- 列表，其中元素的字符串表示形式用空格连接
- 布尔值（ `false` 表示 "" ， `true` 表示 `"1"` ）
- `nill` ，即返回空字符串。

### toXML e

返回一个包含 `e` 的 XML 表示形式的字符串

### trace e1 e2

计算 `e1` 的值，并将其抽象语法表示形式打印到标准错误输出。然后返回 `e2` 。

### traceVerbose e1 e2

如果启用了 `--trace-verbose` 参数，则对 `e1` 进行求值，并将其抽象语法表示形式打印到标准错误输出。然后返回 `e2`

### true (Boolean)

true的值

### tryEval e

尝试对 `e` 进行浅求值。返回一个包含属性 `success` 集合（如果 `e` 求值成功，则返回 `true` ）

### typeOf e

返回一个表示值 `e` 类型的字符串，即 "int" , "bool" , "string" ,
"path" , "null" , "set" , "list" 、 "lambda" 或 "float" 。

### unsafeDiscardOutputDependency s

创建给定字符串的副本，其中每个 深度推导 字符串上下文元素被转换为 持续的 字符串上下文元素。

### unsafeDiscardStringContext s

从可强制转换为字符串的值中丢弃字符串上下文。

### unsafeGetAttrPos s set

返回名为 s 的属性的位置。 来自集合

### warn e1 e2

计算 `e1` （必须为字符串），并将其作为警告输出到标准错误流。然后返回 `e2` 。

### zipAttrsWith f list

将属性集列表转置为列表的属性集

## 10. Store (存储)

Nix 存储是一种抽象，用于存储不可变的文件系统数据（例如软件包），这些数据可能依赖于其他此类数据。

### 文件系统对象(File System Object)

Nix 使用简化的文件系统模型，只有三种文件类型

1. 普通文件：内容可能为空的字节序列并包含一个表示可执行权限的布尔值
2. 目录: 将名称映射到子文件系统对象
3. 符号: 符号文件

为了消除不确定性，nix有以下行为

1. 权限模型的归一化: 仅保留可执行位
2. 时间的冻结: 将所有文件的时间戳强制设置为 Unix Epoch + 1 秒（即 1970年1月1日 00:00:01 UTC）
3. 所有权的统一: Nix Store 中的所有文件，在逻辑上都属于 root:root (UID 0: GID 0)
   (在多用户构建环境中，实际的构建进程可能由 nixbld1、nixbld2 等用户运行。)

### 寻址机制

- 输入寻址 (Input-Addressed)
  这是 Nix 的默认和传统模式。存储路径的哈希值不是源自构建产物（输出）的内容，而是源自构建指令（Derivation，即 .drv 文件）的哈希
- 内容寻址 (Content-Addressed, CA)
  Nix 的实验性特性
  先构建，计算产物的 NAR 哈希，然后将最终路径基于这个 NAR 哈希生成。

### 固定输出衍生物 (FOD)

预先声明其输出哈希（使用属性 outputHash, outputHashAlgo, outputHashMode）

`FOD 可以连接网络下载文件`
