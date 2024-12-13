---
title: Dart 笔记
---

## Hello World

```dart
void main() {
  print('Hello, World!');
}
```
如果需要读取命令行参数
``` dart
void main(List<String> arguments) {
  print('Hello, World!');
}
```

## 变量声明

**在dart中Object是除了null所有类型的父类**

自动推断类型
```dart
var name = 'Dart' // namne的类型被推断成String
```

明确类型
```dart
String name = 'Dart'
```

也可以声明类型为父类

```dart
Object name = 'Dart'
```

对于局部变量建议使用`var`

## 类型转换

在 Dart 中，类型转换是一种将一个数据类型转换为另一个数据类型的过程。Dart 提供了多种方式来进行类型转换，以下是几种常见的方法：

1. **使用 `as` 操作符进行显式类型转换**：
   ```dart
   dynamic someValue = 'Hello Dart';
   String strValue = someValue as String;
   print(strValue);  // 输出: Hello Dart
   ```

2. **类型检查和转换**：
   使用 `is` 关键字来检查一个对象是否是某个类型，然后使用 `as` 关键字进行转换：
   ```dart
   dynamic someValue = 123;
   if (someValue is int) {
     int intValue = someValue as int;
     print(intValue);  // 输出: 123
   }
   ```

3. **使用 `toString` 方法将其他类型转换为字符串**：
   ```dart
   int intValue = 42;
   String strValue = intValue.toString();
   print(strValue);  // 输出: 42
   ```

4. **使用 `parse` 方法将字符串转换为数字**：
   ```dart
   String strValue = '123';
   int intValue = int.parse(strValue);
   print(intValue);  // 输出: 123

   String doubleValueStr = '123.45';
   double doubleValue = double.parse(doubleValueStr);
   print(doubleValue);  // 输出: 123.45
   ```

5. **使用 `tryParse` 方法进行安全转换**：
   如果转换失败，不会抛出异常，而是返回 null：
   ```dart
   String invalidStr = 'abc';
   int? intValue = int.tryParse(invalidStr);
   print(intValue);  // 输出: null
   ```

6. **列表类型转换**：
   可以将一个动态类型的列表转换为特定类型的列表：
   ```dart
   List<dynamic> dynamicList = [1, 2, 3];
   List<int> intList = dynamicList.cast<int>();
   print(intList);  // 输出: [1, 2, 3]
   ```

7. **自定义对象类型转换**：
   如果你有一个自定义类，你可以定义一个方法来进行类型转换：
   ```dart
   class Person {
     String name;
     int age;

     Person(this.name, this.age);

     // 定义一个方法来转换成字符串
     @override
     String toString() {
       return 'Name: $name, Age: $age';
     }
   }

   void main() {
     Person person = Person('Alice', 30);
     print(person);  // 输出: Name: Alice, Age: 30
   }
   ```

## 字符串格式化

在Dart中，字符串格式化有几种常见的方法，以下是每种方法的示例：

### 1. 使用字符串插值 (String Interpolation)
这是Dart中最常用和最简洁的字符串格式化方法。

```dart
void main() {
  String name = "Alice";
  int age = 30;
  print("My name is $name and I am $age years old.");
  
  // 使用表达式
  print("Next year, I will be ${age + 1} years old.");
}
```

### 2. 使用 `String` 类的 `replaceAll` 方法
可以使用 `replaceAll` 方法进行简单的字符串替换。

```dart
void main() {
  String template = "My name is {name} and I am {age} years old.";
  String name = "Alice";
  int age = 30;
  String formattedString = template.replaceAll("{name}", name).replaceAll("{age}", age.toString());
  print(formattedString);
}
```

### 3. 使用 `StringBuffer`
`StringBuffer` 提供了高效的字符串拼接方法，适用于需要大量拼接的情况。

```dart
void main() {
  String name = "Alice";
  int age = 30;
  StringBuffer sb = StringBuffer();
  sb.write("My name is ");
  sb.write(name);
  sb.write(" and I am ");
  sb.write(age);
  sb.write(" years old.");
  String formattedString = sb.toString();
  print(formattedString);
}
```

### 4. 使用 `dart:convert` 中的 `jsonEncode` 进行简单的模板替换
这种方法适用于复杂的模板替换场景，可以将变量替换逻辑和模板分开。

```dart
import 'dart:convert';

void main() {
  String template = 'My name is {name} and I am {age} years old.';
  Map<String, dynamic> values = {
    'name': 'Alice',
    'age': 30,
  };
  String formattedString = template.replaceAllMapped(RegExp(r'{(\w+)}'), (match) {
    String key = match.group(1);
    return values[key].toString();
  });
  print(formattedString);
}
```

### 5. 使用 `intl` 包中的 `NumberFormat` 和 `DateFormat`
`intl` 包提供了强大的国际化和格式化功能，适用于处理日期和数字格式。

```dart
import 'package:intl/intl.dart';

void main() {
  double amount = 1234.56;
  DateTime now = DateTime.now();
  
  // 格式化数字
  String formattedAmount = NumberFormat.currency(symbol: '\$').format(amount);
  print("Amount: $formattedAmount");
  
  // 格式化日期
  String formattedDate = DateFormat('yyyy-MM-dd').format(now);
  print("Date: $formattedDate");
}
```

## 空安全
dart的类型默认是非null的, 如果要使变量能接收null, 需要使用可null类型, 在类型声明后面加上?

```dart
String? name
```

在使用变量前需要先初始化变量, 对于可null类型, 默认有默认值null初始化, 对于非null类型, dart不会设置默认值, 强制需要初始化, 不能访问可null类型除了hashCode和toString之外的属性和方法。

不强制要求在声明局部的位置进行初始化, 但是要在其使用前分配一个值。

```dart
int lineCount;

if (weLikeToCount) {
  lineCount = countLines();
} else {
  lineCount = 0;
}

print(lineCount);
```

## 惰性变量

在dart中使用`late`声明惰性变量, 惰性变量可以延迟初始化
```dart
late String description;

void main() {
  description = 'Feijoada!';
  print(description);
}
```

如果在读取读去变量时还没有初始化, 程序将发生运行时错误

惰性初始化多用于
1. 变量可能不需要, 并且初始化变量的成本很高
2. 正在初始化实例变量, 其初始化设定项需要访问this

```dart
late String temperature = readThermometer(); 
```
如果未使用temperature, readThermometer将不会运行

## final和const

如果不修改声明的变量, 使用`final`或`const`代替`var`, const变量是编译时常量(const 是隐式的 final)


***实力变量可以是final, 但不能是const***

任何变量都可以具有常量的值
```dart
var foo = const [];
final bar = const [];
const baz = []; // Equivalent to `const []`

```

可以修改非final和const的值, 即使之前是const值

```dart
foo = [1, 2, 3];
```
可以使用类型检查(`is` 和 `as`), 集合(`if`), 拓展运算(`...` 和 `...?`)

```dart
const Object i = 3; // 常量对象, 值是3
const list = [i as int]; // 将i转换为int类型转换
const map = {if (i is int) i: 'int'}; // 如果i是可以转换成int类型, 则map中包含该字段
const set = {if (list is List<int>) ...list}; 

```

***final无法修改对象, 但是对象的属性是可以修改的, const对象及其字段都无法修改***

## 运算符


|   描述   |      操作符                                    |  关联    |
| -------  | -------------------------------------------- | -------- |
| 一元后缀  |  expr++  expr--  ()  []  ?[]  .  ?.  !        | 无       |
| 一元前缀  |  -expr !expr ~expr ++expr --expr await expr   | 无       |
| 乘法级    |  * / % ～/                                    | 左       |
| 加法级    |  + -                                          | 左       |
| 移位      |  <<  >>  >>>                                  | 左       |
| 位与      |  &                                            | 左       |
| 位异或    |  ^                                            | 左       |
| 位或      |  \|                                           | 左       |
| 关系判断   |  >=  > <= as is !is                           | 无       |
| 相等      |  == ！=                                       | 无       |
| 逻辑与     |  &&                                          | 左       |
| 逻辑或     |  \|\|                                        | 左       |
| 空判断     |  ??                                          | 左       |
| 三元      |  expr1 ? expr2 : expr3                        | 右       |
| 级联      |  .. ?..                                       | 左       |
| 赋值      |  = *= /= += 等                                 | 右       |

> dart有两种除法 `/`和`～/`, `/`计算结果是浮点数, `～/`计算结果是整数

***is和!is用于判断值和类型的关系***

```dart
var i = 1
(i is int)  // true
(i !is int) // false
(obj is Object?) // 不论obj是什么类型都是true
```

***??=赋值***

```dart
var a = 1
a ??= 2   // 当a为null时才发生赋值操作
```

级联操作

```dart
class User {
   String name;
   int age;
   User(this.name, this.age);
   @override
  String toString() {
    return 'name: $name, age: $age';
  }
}

void main(List<String> args) {
  var user = User("name", 2)
  ..name = "new"
  ..age = 22;
  print(user); // name: new, age: 22
}
```

## 注释

```dart
// 单行注释

/*
 多行注释
 */

 /**
 文档注释
  */

/// 文档注释, 连续使用和 /** */作用一样
```

## 元数据

元数据提供有关代码的信息, 元数据以`@`开头, 后跟编译时常量的引用或常量构造函数的调用

所有dart代码都有的四个注释`@Deprecated`, `@deprecated`, `@override`, 和 `@pragma`

`@Deprecated`和`@deprecated`都表示将要废弃, `@Deprecated`可以自定义提示信息, `@deprecated`不能自定义提示信息

## 库

在库中以`_`开始的标识符仅在库内可见

导入库

```dart
import 'dart:html'; // dart表示内置库
import 'package:test/test.dart'; // pakage 表示游包管理器提供的库
```

如果两个库的标识符冲突, 可以使用指定库的前缀

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

Element element1 = Element();

lib2.Element element2 = lib2.Element();
```

```dart
// 只导入foo
import 'package:lib1/lib1.dart' show foo;

// 导入除了doo的所有标识符
import 'package:lib2/lib2.dart' hide foo;
```

延迟加载库(仅适用于Web)
```dart
import 'package:greetings/hello.dart' deferred as hello;

Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

`library`指令, 指定库级的文档注释或元数据

```dart
@TestOn('browser')
library;
```

## 数据类型

### 内置类型

#### 数字类型
dart包含两种数字类型`int`和`double`

> int是不大于64位的有符号整数类型, 在javascript中用64位浮点数的的整数部分表示(相当于53位的有符号整数)
> double 是64位双精度浮点数

int和double是num的子类

#### 字符串
dart字符串是utf-16编码的, 可以使用单引号和双引号创建字符串

```dart
var s1 = "s1 string";
var s2 = "s2 string";

var s3 = "${s1} --- s3"; // 模板字符串, 相当于 var s3 = "s1 string --- s3"

var s4 = """
多行字符串
""";

var s5 = '''
这也是多行字符串
''';

var s6 = r'原始字符串 \n \r';
```

#### Bool

布尔类型只有两种值, true和false, 并且都是编译时常量
dart是强类型语言, 在if中不会隐式转换为bool


#### 符文
对应Unicode码位, 如果要读取或写入单个Unicode字符, 使用`characters`包

```dart
import 'package:characters/characters.dart';

void main() {
  var hi = 'Hi \u2665';
  print(hi);
  print('字符串截取: ${hi.substring(hi.length - 1)}');
  print('字符: ${hi.characters.last}');
}
```

#### 符号

获取符号

```dart
var s = #bar;
```

#### 记录(Records)
记录是只读的, 记录可以有名称, 名称不同或类型不同, 记录的类型不同

```dart
({int a, int b}) recordAB = (a: 1, b: 2);
({int x, int y}) recordXY = (x: 3, y: 4); // 由于记录名称不一样, recordAB和recordXY是不同类型

(int a, int b) recordAB1 = (1, 2);
(int x, int y) recordXY2 = (3, 4); // recordAB1和recordXY1是同一类型

// 命名字段可以通过字段名称读取, 未命名字段可以通过在未命名字段中的顺序读取字段(从1开始)
var a = recordAB1.a;
var a1 = recordAB1.$1;
```

#### 集合类型

```dart
var list = [1,2,3]; // List<int>
var setType = { 1,2,3 }; // Set<int>
var emptySet = <int>{}; // 创建空Set

var gifts = {
  // 键:    值
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
// 键和值可以是任意的类型
var gifts = Map<String, String>(); // 创建一个空的Map
gifts['first'] = 'partridge'; // 给Map添加值
```

展开运算符
```dart
var list = [1, 2, 3];
var list2 = [0, ...list]; // list2 = [0, 1, 2, 3];

List<int>? list = null;
var list2 = [0, ...?list]; // list2 = [0];
```

控制流在集合中的使用

```dart
// 如果 promoActive == true, nav包含 Outlet
var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];

// 如果 login == ‘Manager’, nav包含 Inventory
var nav = ['Home', 'Furniture', 'Plants', if (login case 'Manager') 'Inventory'];


// 循环
var listOfInts = [1, 2, 3];
// listOfStrings = [ '#0', '#1', '#2', '#3'];
var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
```

#### 泛型

泛型可以生成更好的代码, 减少重复代码
默认约束
```dart
// 默认泛型都继承 Object?
class Foo<T extends Object> {
}
```

#### 类型别名

```dart
typedef IntList = List<int>;
typedef Compare<T> = int Function(T a, T b);
```

### 模式
模式可以用来匹配值或解构值

```dart
switch (number) {
  case 1:
    print('one');
}
```

```dart
// 解构一个双元素的列表, 第一个值是'a'或'b'
switch (list) {
  case ['a' || 'b', var c]:
    print(c);
}
```

交换两个变量

```dart
var (a, b) = ('left', 'right');
(b, a) = (a, b);
```

守卫

```dart
switch (obj) {
  case 1:
    print('one');

  // last >= obj >= first
  case >= first && <= last:
    print('in range');
  // 如果obj是两个值的记录
  case (var a, var b):
    print('a = $a, b = $b');

  default:
}

```

共享变量并使用守卫

```dart
switch (shape) {
  case Square(size: var s) || Circle(size: var s) when s > 0:
    print('Non-empty symmetric shape');
}
```

### 函数
函数是对象且具有Function类型。

```dart
// 实现一个函数
int add(int i, int j) {
  return i + j;
}

// 函数的类型可以省略
add(i, j) {
  return i + j;
}

// 箭头函数
int add(int i, int j) => i+ j;
```

命名参数
```dart
// bold, hidden默认是null
void enableFlags({bool? bold, bool? hidden}) {
  print("$bold, $hidden");
}

// 如果将bold, hidden设置为非空, 则需要添加required或设置默认值
void enableFlags({required bool bold, bool hidden = true}) {
  print("$bold, $hidden");
}
```

可选位置参数

```dart
// device是可选的
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

函数相等

```dart
void foo() {} // 顶层函数

class A {
  static void bar() {} // A的静态方法
  void baz() {} // 示例方法
}

void main() {
  Function x;

  x = foo;
  assert(foo == x);

  x = A.bar;
  assert(A.bar == x);

  var v = A(); // Instance #1 of A
  var w = A(); // Instance #2 of A
  var y = w;
  x = w.baz;

  assert(y.baz == x);

  assert(v.baz != w.baz);
}
```

> dart的所有函数都有一个返回值, 如果未指定返回值则默认返回null

dart有两种生成器, 同步生成器Iterable和异步生成器Stream

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

外部函数

`external`是函数体和声明分开的函数。在函数声明前加external, 通常用于函数实现在另外的dart库, 或者函数的实现来自另外的语言, 引入外部的函数或值。外部函数可以是顶级函数, 实例方法, getter，setter或非重定向构造函数, 实例变量使用`external`相当于外部的getter和setter(变量不是final)。

```dart
external void someFunc(int i);
```

## 控制流

### 循环

```dart
// for 循环
var message = [];
for (var i = 0; i < 5; i++) {
  message.add('!');
}

// for in 循环Iterable
for (final m in message) {
  print(m);
}

// while 循环 先判断 !isDone() 是不是为true
while (!isDone()) {
  doSomething();
}

// do-while 循环 先执行doSomething(), 后判断 !isDone() 是不是为true
do {
  doSomething();
} while (!isDone());
```

### 分支

```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
// if-case pair是两个元素的列表时执行
if (pair case [int x, int y]) return Point(x, y);

```

```dart
// 如case中没有代码, 则将继续向下匹配case
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
  case 'PENDING':
    executePending();
  case 'APPROVED':
    executeApproved();
  case 'DENIED':
    executeDenied();
  case 'OPEN':
    executeOpen();
  default:
    executeUnknown();
}
```

```dart
// switch表达式
token = switch (charCode) {
  slash || star || plus || minus => operator(charCode),
  comma || semicolon => punctuation(charCode),
  >= digit0 && <= digit9 => number(),
  _ => throw FormatException('Invalid')
};
```
## 异常
在dart中如果抛出的异常没有被捕获则将导致`isolate`挂起, 通常会导致`isolate`及其程序被终止。
dart提供了`Exception`和`Error`类型, 但是dart中可以使用thow抛出任意的非null对象, 不要求必须是`Exception`和`Error`类型的对象作为异常, 通常还是使用`Exception`和`Error`类型的异常。

通过thow抛出的异常可以通过catch捕获到。

```dart
// 不需要异常的信息
try {
  throw Exception("Exception");
} on Exception {
  print("e");
}

// 捕获异常信息
try {
  throw Exception("Exception");
} on Exception catch (e) {
  print(e);
}

// 捕获异常信息和堆栈跟踪对象
try {
  throw Exception("Exception");
} on Exception catch (e, s) {
  print(e);
  print(s);
}

// rethrow将再次抛出异常
try {
  throw Exception("Exception");
} on Exception catch (e, s) {
  print(e);
  print(s);
  rethrow;
}

// finally 不论是否捕获异常都会执行
try {
  throw Exception("Exception");
} on Exception catch (e, s) {
  print(e);
  print(s);
  rethrow;
} finally {
  print("finally");
}
```

## 类
每个实例都是类的对象, 除了Null之外的所有类都源于Object, 除了顶层类`Object?`都只有一个超类。拓展方法可以在不更改类和创建子类的情况下向类添加功能。

常量构造函数
```dart
class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);
  final double x, y;

  // 常量构造函数
  const ImmutablePoint(this.x, this.y);
}

// a和b是相等的
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);
```

实例变量

```dart
class Point {
  double? x; // 声明一个变量, 默认是null
  double? y;
  double z = 0; // 声明变量z, 默认值是0
}

```
所有实例变量都会有隐式getter, 非final变量和没有初始化的late final 还会生成隐式的setter方法

> 声明非late的实例变量会在实例创建时, 构造函数及其初始化列表执行之前设置值, 因此非late实例变量的初始化表达式不能访问`this`

隐式接口

```dart
// 一个类会创建一个同名的隐式接口, 该接口包含了该类及其实现接口的任意实例成员(实例变量和实例函数)
class Person {
  final String _name;
  Person(this._name);
  String greet(String who) => 'Hello, $who. I am $_name.';
}

class Impostor implements Person {
  String get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```

类变量
```dart
// 类变量要使用时才会初始化
class Person {
  static String s = (() { print("init"); return "ok"; })();
}

void main() {
  print("start");
  print(Person.s);
}
```

```dart
class Point {
  final double x;
  final double y;

  // 初始化形参, 可以初始化不为null的变量和final实例变量
  Point(this.x, this.y);
}
```

默认构造函数

> 如果没有声明默认构造函数, 将生成一个无参构造函数, 并会调用父类的无参构造函数

命名构造函数

```dart
class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  // 名名构造函数
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

超类参数

```dart
class Vector2d {
  final double x;
  final double y;

  Vector2d(this.x, this.y);
}

class Vector3d extends Vector2d {
  final double z;

  // 和不使用super相同
  // Vector3d(final double x, final double y, this.z) : super(x, y);
  Vector3d(super.x, super.y, this.z);
}

```

从定向构造函数

```dart
class Point {
  double x, y;

  Point(this.x, this.y);

  Point.alongXAxis(double x) : this(x, 0);
}

```

工厂构造函数

```dart
class Logger {
  final String name;
  bool mute = false;

  static final Map<String, Logger> _cache = <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}

// 调用
var logger = Logger('UI');
logger.log('Button clicked');

var logMap = {'name': 'UI'};
var loggerJson = Logger.fromJson(logMap);
```


运算符重载

支持的运算符

|      <        |      +        |        \|        |     >>>     |
| ------------- | ------------- | ---------------- |-------------|
|      >        |      /        |        ^         |     \[]     |
|      <==      |      ~/       |        &         |     \[]=    |
|      >=       |      *        |        <<        |     ~       |
|      -        |      %        |        >>        |     ==      |

```dart
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);
  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  @override
  bool operator ==(Object other) =>
      other is Vector && x == other.x && y == other.y;

  @override
  int get hashCode => Object.hash(x, y);
}

void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  assert(v + w == Vector(4, 5));
  assert(v - w == Vector(0, 1));
}
```

显式getter和setter

```dart
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  double get right => left + width;
  set right(double value) => left = value - width;
  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

继承
```dart
class Television {
  void turnOn() {
  }
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
  }
}
```

noSuchMethod函数

```dart
class A {
  // 重写 noSuchMethod
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: '
        '${invocation.memberName}');
  }
}

void main() {
  // 要调用noSuchMethod方法, a必须声明为dynamic, 并且noSuchMethod方法被重写
  dynamic a = A();
  a.aaa();
}
```

mixin

mixin不能有extends, 并且不能声明构造函数

```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}

// with使用mixin
class Musician with Musical {
}


void main() {
  var m = Musician();
  m.entertainMe();
}
```

通过`on`限制使用mixin的超类

```dart
class Musician {
}
mixin MusicalPerformer on Musician {
}
class SingerDancer extends Musician with MusicalPerformer {
}
```

mixin class


```dart
// mixin class同时有class和mixin的限制
// mixin不能有extends或with
// class不能有on
mixin class Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

abstract mixin class

```dart
abstract mixin class Musician {
  void playInstrument(String instrumentName);

  void playPiano() {
    playInstrument('Piano');
  }
  void playFlute() {
    playInstrument('Flute');
  }
}

class Virtuoso with Musician { // Musician 作为mixin
  void playInstrument(String instrumentName) {
    print('Plays the $instrumentName beautifully');
  }  
} 

class Novice extends Musician { // Musician 作为class
  void playInstrument(String instrumentName) {
    print('Plays the $instrumentName poorly');
  }  
} 

```

枚举
枚举都会自动拓展Enum类, 他们都是密封的, 不能显示实例化

简单枚举
```dart
enum Color { red, green, blue }
```

增强枚举

```dart
enum Vehicle implements Comparable<Vehicle> {
  car(tires: 4, passengers: 5, carbonPerKilometer: 400),
  bus(tires: 6, passengers: 50, carbonPerKilometer: 800),
  bicycle(tires: 2, passengers: 1, carbonPerKilometer: 0);

  const Vehicle({
    required this.tires,
    required this.passengers,
    required this.carbonPerKilometer,
  });

  final int tires;
  final int passengers;
  final int carbonPerKilometer;

  int get carbonFootprint => (carbonPerKilometer / passengers).round();

  bool get isTwoWheeled => this == Vehicle.bicycle;

  @override
  int compareTo(Vehicle other) => carbonFootprint - other.carbonFootprint;
}

void main() {
  // 使用枚举
  final favoriteColor = Color.blue;
  if (favoriteColor == Color.blue) {
    print('Your favorite color is blue!');
  }
  // 每个枚举值都有一个index字段表示枚举的索引, 从0开始增加
  // Vehicle.values 可以获取所有的枚举变量
}

```

拓展方法

```dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }
}

void main() {
  print('42'.parseInt());

  dynamic d = '2';
  print(d.parseInt()); // 由于拓展方法是静态解析的所以不能用在dynamic上面
}

```

未命名的拓展
```dart
extension on String {
  bool get isBlank => trim().isEmpty;
}
```

可调用对象

```dart
class WannabeFunction {
  String call(String a, String b, String c) => '$a $b $c!';
}

var wf = WannabeFunction();
var out = wf('Hi', 'there,', 'gang');

void main() {
  print(out);
}
```

### 类修饰符

类修饰符用于控制class或mixin的使用方式

+ abstract
+ base
+ final
+ interface
+ sealed
+ mixin

使用`base`可以用在mixin前面

如果允许从任何库或子类型不受限制的使用, 使用不带修饰符的class或mixin

#### abstract

定义不完整的类, 抽象类不能构造, 抽象类通常有抽象方法

```dart
abstract class Vehicle {
  // 抽象方法
  void moveForward(int meters);
}
```

#### base
强制继承类或mixin的实现, 基类不能在自己库之外实现

```dart   [Library a.dart]
base class Vehicle {
  void moveForward(int meters) {
  }
}
```

```dart   [Library b.dart]
import 'a.dart';

Vehicle myVehicle = Vehicle();

base class Car extends Vehicle {
  int passengers = 4;
}

// 报错
base class MockVehicle implements Vehicle {
  @override
  void moveForward() {
  }
}
```

#### interface

```dart
// 可以使用implements， 不能使用extends
interface class Vehicle {
  void moveForward(int meters) {
  }
}
```

#### abstract interface 

不但无法extends, 还可以包含抽象方法

#### final

```dart
// Vehicle子类必须是base, final, sealed
final class Vehicle {
  void moveForward(int meters) {
  }
}
```

#### sealed

sealed类是隐式抽象的, 但是sealed的子类不是隐式抽象的

## 并发

dart的运行时是基于事件循环的

### Futures

Future表示异步操作的结果, 该操作最终会带有一个值或一个错误
```dart
Future<void> checkVersion() async {
  var version = await lookUpVersion();
}
```

### Streams

```dart
Stream<int> stream = Stream.periodic(const Duration(seconds: 1), (i) => i * i);
```
