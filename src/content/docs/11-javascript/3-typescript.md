---
title: TypeScript
---

TypeScript 增加了一些 JavaScript 没有的语法特性，以提高代码的可维护性和可读性。下面是 TypeScript 的一些主要语法特性：

## 基本类型


| 类型             | 描述                                                        | 示例代码                                         |
|------------------|-------------------------------------------------------------|--------------------------------------------------|
| `boolean`        | 布尔值类型，只有 `true` 和 `false`                          | `let isDone: boolean = false;`                   |
| `number`         | 数值类型，包括整数和浮点数                                    | `let count: number = 10;`                        |
| `string`         | 字符串类型                                                  | `let name: string = "John";`                     |
| `Array`          | 数组类型，可以指定元素类型                                   | `let list: number[] = [1, 2, 3];`                |
| `Tuple`          | 元组类型，表示固定数量和类型的数组                           | `let tuple: [string, number] = ["hello", 10];`   |
| `Enum`           | 枚举类型，用于定义一组命名常量                               | `enum Color { Red, Green, Blue }`                |
| `any`            | 任意类型，可用于绕过类型检查                                 | `let notSure: any = 4; notSure = "maybe a string";` |
| `void`           | 无返回值类型，通常用于函数的返回值类型                        | `function warnUser(): void { console.log("Warning!"); }` |
| `null`           | 表示值为 `null`                                              | `let n: null = null;`                            |
| `undefined`      | 表示值为 `undefined`                                         | `let u: undefined = undefined;`                  |
| `never`          | 表示不会出现的值类型，通常用于抛出异常或无限循环的函数        | `function error(message: string): never { throw new Error(message); }` |
| `object`         | 非原始类型，包括对象、数组、函数等                            | `let obj: object = { name: "John" };`            |
| `unknown`        | 未知类型，需要进行类型检查后才能使用                          | `let notSure: unknown = 4; if (typeof notSure === "number") { let value: number = notSure; }` |
| `Function`       | 函数类型，用于定义函数的参数和返回值类型                      | `let myAdd: (x: number, y: number) => number = function(x, y) { return x + y; };` |
| `Interface`      | 接口类型，用于定义对象的结构                                   | `interface Person { firstName: string; lastName: string; }` |
| `Type Alias`     | 类型别名，用于给类型起一个新名字                              | `type Name = string;`                            |
| `Union`          | 联合类型，表示可以是多种类型之一                              | `let value: string | number; value = "hello"; value = 42;` |
| `Intersection`   | 交叉类型，将多个类型合并为一个类型                             | `type Pet = Bird & Fish;`                        |
| `Literal`        | 字面量类型，使用具体的值作为类型                               | `let literal: "hello" | "world"; literal = "hello";` |
| `Type Assertion` | 类型断言，用于手动指定一个值的类型                             | `let someValue: any = "this is a string"; let strLength: number = (someValue as string).length;` |
| `Generics`       | 泛型，允许定义时不指定具体类型，而在使用时再指定               | `function identity<T>(arg: T): T { return arg; }` |
| `Readonly`       | 只读属性，用于防止属性被修改                                  | `interface Person { readonly id: number; name: string; }` |
| `Optional`       | 可选属性，用于定义可选的属性                                   | `interface Person { firstName: string; lastName?: string; }` |
| `Namespace`      | 命名空间，用于组织代码，避免命名冲突                          | `namespace Validation { export function validate() { /* ... */ } }` |
| `Module`         | 模块，用于将代码分割成独立的文件和块                          | `import { add } from "./math";`                  |

## 空安全
在 TypeScript 中，空安全（null safety）是一种用于处理 `null` 和 `undefined` 值的机制，确保代码在运行时不会因为访问 `null` 或 `undefined` 值而抛出错误。TypeScript 提供了多种方法来处理可能为空的值，包括可选链、空值合并运算符、类型守卫等。

### 可选属性

在接口或类型中，可以使用 `?` 表示属性是可选的，意味着它可能不存在或为 `undefined`。

```typescript
interface Person {
  name: string;
  age?: number; // age 是可选属性
}

let john: Person = { name: "John" };
```

### 可选链（Optional Chaining）

可选链运算符（`?.`）允许安全地访问对象的属性，即使该属性可能为 `null` 或 `undefined`。如果属性不存在，表达式会短路并返回 `undefined`。

```typescript
let user: { address?: { street?: string } } = {};

// 使用可选链访问 address 和 street 属性
let street = user?.address?.street; // street 为 undefined
console.log(street); // 输出: undefined
```

### 空值合并运算符（Nullish Coalescing）

空值合并运算符（`??`）用于提供默认值，当左侧的操作数为 `null` 或 `undefined` 时，返回右侧的操作数。

```typescript
let userInput: string | null = null;
let defaultValue = "default";

let value = userInput ?? defaultValue; // userInput 为 null，返回 defaultValue
console.log(value); // 输出: default
```

### 类型守卫（Type Guards）

类型守卫用于检查和处理 `null` 和 `undefined` 值，确保类型安全。

#### 使用 `typeof`

```typescript
function printLength(value: string | null) {
  if (typeof value === "string") {
    console.log(value.length);
  } else {
    console.log("Value is null");
  }
}

printLength("Hello"); // 输出: 5
printLength(null);    // 输出: Value is null
```

#### 使用 `==` 或 `===`

```typescript
function greet(name: string | null) {
  if (name != null) {
    console.log(`Hello, ${name}`);
  } else {
    console.log("Hello, Guest");
  }
}

greet("John"); // 输出: Hello, John
greet(null);   // 输出: Hello, Guest
```

### 非空断言操作符（Non-null Assertion Operator）

非空断言操作符（`!`）用于断言一个值不为 `null` 或 `undefined`，告诉 TypeScript 编译器跳过类型检查。请谨慎使用，因为错误的断言可能导致运行时错误。

```typescript
function processValue(value: string | null) {
  // 使用非空断言操作符
  console.log(value!.toUpperCase());
}

processValue("hello"); // 输出: HELLO
// processValue(null); // 运行时错误
```

### 严格的空检查模式

在 `tsconfig.json` 中启用 `strictNullChecks` 选项，使得所有未明确指定为可选的类型默认不接受 `null` 或 `undefined`。启用该选项后，TypeScript 会在编译时检查所有可能为空的情况。

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

### 实际案例

以下是一个实际案例，展示了如何使用空安全特性来处理可能为空的值：

```typescript
interface User {
  id: number;
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

function printUserInfo(user: User) {
  console.log(`User ID: ${user.id}`);
  console.log(`User Name: ${user.name}`);
  
  // 使用可选链访问 address 属性
  console.log(`User Street: ${user.address?.street ?? "N/A"}`);
  console.log(`User City: ${user.address?.city ?? "N/A"}`);
}

const user1: User = { id: 1, name: "Alice" };
const user2: User = { id: 2, name: "Bob", address: { street: "123 Main St", city: "Wonderland" } };

printUserInfo(user1);
// 输出:
// User ID: 1
// User Name: Alice
// User Street: N/A
// User City: N/A

printUserInfo(user2);
// 输出:
// User ID: 2
// User Name: Bob
// User Street: 123 Main St
// User City: Wonderland
```

## 枚举

在 TypeScript 中，枚举（Enum）是一种特殊的数据类型，允许开发者为一组相关值赋予友好的名称。枚举使代码更具可读性和可维护性。

### 枚举的定义

可以通过 `enum` 关键字定义枚举，枚举成员默认从 0 开始自动递增编号。

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
console.log(c); // 输出: 1
```

### 指定枚举成员的值

可以为枚举成员手动指定值：

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}

let c: Color = Color.Green;
console.log(c); // 输出: 2
```

### 反向映射

枚举还支持从值到名称的反向映射：

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}

let colorName: string = Color[2];
console.log(colorName); // 输出: Green
```

### 常量枚举

常量枚举通过 `const enum` 定义，它在编译时会被内联进生成的代码中，不会生成实际的枚举对象，提升性能：

```typescript
const enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
console.log(c); // 输出: 1
```

### 异构枚举

枚举成员可以是不同类型的值（字符串或数字）：

```typescript
enum Result {
  Success = "SUCCESS",
  Error = 1,
  Pending,
}

console.log(Result.Success); // 输出: SUCCESS
console.log(Result.Error); // 输出: 1
console.log(Result.Pending); // 输出: 2
```

### 枚举用法示例

以下是枚举在实际应用中的一些示例：

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    case Direction.Left:
      console.log("Moving left");
      break;
    case Direction.Right:
      console.log("Moving right");
      break;
  }
}

move(Direction.Up); // 输出: Moving up

enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      console.log("Request was successful");
      break;
    case HttpStatus.BadRequest:
      console.log("Bad Request");
      break;
    case HttpStatus.Unauthorized:
      console.log("Unauthorized");
      break;
    case HttpStatus.NotFound:
      console.log("Not Found");
      break;
  }
}

handleResponse(HttpStatus.OK); // 输出: Request was successful
```

## 接口

在 TypeScript 中，接口（Interface）是一种强类型约束，用于定义对象的结构。接口可以用于定义对象的属性、方法以及函数的形状。接口在 TypeScript 中是一个非常重要的特性，可以帮助你更好地组织代码和确保类型安全。

### 定义接口

下面是一个基本的接口定义示例：

```typescript
interface Person {
  firstName: string;
  lastName: string;
}

function greet(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

let user = { firstName: "John", lastName: "Doe" };
console.log(greet(user)); // 输出: Hello, John Doe
```

### 可选属性

接口中的属性可以是可选的，使用 `?` 来表示：

```typescript
interface Person {
  firstName: string;
  lastName?: string;
}

function greet(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName ?? ""}`;
}

let user1 = { firstName: "John" };
let user2 = { firstName: "Jane", lastName: "Doe" };
console.log(greet(user1)); // 输出: Hello, John
console.log(greet(user2)); // 输出: Hello, Jane Doe
```

### 只读属性

接口中的属性可以是只读的，使用 `readonly` 关键字来表示：

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 10, y: 20 };
// point.x = 5; // 错误: Cannot assign to 'x' because it is a read-only property.
```

### 函数类型

接口可以用于定义函数类型：

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string): boolean {
  return source.indexOf(subString) > -1;
};
```

### 可索引类型

接口可以用于描述那些可以通过索引获取的类型：

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

### 类类型

接口可以用于强制一个类去符合某种契约：

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();

  setTime(d: Date) {
    this.currentTime = d;
  }

  constructor(h: number, m: number) {}
}
```

### 继承接口

接口可以继承其他接口，从而可以将多个接口合并为一个接口：

```typescript
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square: Square = {
  color: "blue",
  penWidth: 5,
  sideLength: 10,
};
```

### 混合类型

接口还可以描述那些既是函数又具有某些属性的对象：

```typescript
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = (function (start: number) {}) as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 接口扩展类

接口也可以扩展类：

```typescript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  // 没有 select 方法
}

// 错误: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//   select() {}
// }
```

## 类

在 TypeScript 中，类（Class）是面向对象编程的核心概念。类提供了一种将数据和功能封装在一起的方式。下面详细介绍 TypeScript 中类的使用方法。

### 类的基本定义

以下是一个简单的类定义示例：

```typescript
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return `Hello, ${this.greeting}`;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet()); // 输出: Hello, world
```

### 继承

TypeScript 支持类的继承，通过 `extends` 关键字可以创建一个继承另一个类的新类：

```typescript
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark(); // 输出: Woof! Woof!
dog.move(10); // 输出: Animal moved 10m.
dog.bark(); // 输出: Woof! Woof!
```

### 公共、私有与受保护的修饰符

TypeScript 提供了 `public`、`private` 和 `protected` 三种访问修饰符，用于控制类成员的可见性。

#### 公共成员（public）

默认情况下，类的成员是公共的。

```typescript
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

#### 私有成员（private）

私有成员只能在类的内部访问。

```typescript
class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

const animal = new Animal("Cat");
// animal.name; // 错误: 'name' 是私有的
```

#### 受保护的成员（protected）

受保护的成员可以在类及其子类中访问。

```typescript
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

const howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch()); // 输出: Hello, my name is Howard and I work in Sales.
// console.log(howard.name); // 错误: 'name' 是受保护的
```

### Readonly 修饰符

`readonly` 修饰符用于将属性设置为只读，只能在初始化或构造函数中赋值。

```typescript
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误: name 是只读属性
```

### 存取器

可以通过 `get` 和 `set` 关键字定义访问器来控制对属性的访问。

```typescript
class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
console.log(employee.fullName); // 输出: Bob Smith
```

### 静态属性

静态属性是类的属性，而不是实例的属性。使用 `static` 关键字定义。

```typescript
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }
}

let grid1 = new Grid();
console.log(Grid.origin); // 输出: { x: 0, y: 0 }
```

### 抽象类

抽象类是不能被实例化的类，只能被继承。抽象类使用 `abstract` 关键字定义，可以包含抽象方法，这些方法必须在派生类中实现。

```typescript
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing");
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建抽象类的实例
department = new AccountingDepartment();
department.printName();
department.printMeeting();
```

## 函数

在 TypeScript 中，函数是最基本的构建模块之一。TypeScript 允许定义多种类型的函数，以满足不同的需求。下面详细介绍 TypeScript 中函数的分类和使用方法。

### 函数声明

通过 `function` 关键字声明一个函数，这是最常见的函数定义方式。

```typescript
function add(x: number, y: number): number {
  return x + y;
}

console.log(add(2, 3)); // 输出: 5
```

### 函数表达式

通过将函数赋值给一个变量来定义函数，这种方式也很常见。

```typescript
const multiply = function (x: number, y: number): number {
  return x * y;
};

console.log(multiply(2, 3)); // 输出: 6
```

### 箭头函数

箭头函数提供了一种简洁的语法来定义函数，特别适用于回调函数和内联函数。

```typescript
const subtract = (x: number, y: number): number => x - y;

console.log(subtract(5, 3)); // 输出: 2
```

### 可选参数和默认参数

函数的参数可以是可选的，也可以有默认值。

#### 可选参数
使用 `?` 表示参数是可选的。

```typescript
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

console.log(buildName("John")); // 输出: John
console.log(buildName("John", "Doe")); // 输出: John Doe
```

#### 默认参数
给参数提供默认值，如果调用时未提供该参数，则使用默认值。

```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("John")); // 输出: Hello, John!
console.log(greet("John", "Hi")); // 输出: Hi, John!
```

### 剩余参数

使用 `...` 语法可以定义剩余参数，表示函数可以接受任意数量的参数。

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4)); // 输出: 10
```

### 函数重载

TypeScript 支持函数重载，即可以为同一个函数定义多个类型签名。

```typescript
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  if (typeof x === "object") {
    return Math.floor(Math.random() * x.length);
  } else if (typeof x === "number") {
    return { suit: "hearts", card: x % 13 };
  }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log(pickedCard1);

let pickedCard2 = pickCard(15);
console.log(pickedCard2);
```

### this 参数

在 TypeScript 中，可以使用 `this` 参数来明确指定 `this` 的类型。

```typescript
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

### 函数类型

可以定义函数的类型，包括参数类型和返回值类型。

```typescript
let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

console.log(myAdd(10, 20)); // 输出: 30
```

## 泛型

在 TypeScript 中，泛型（Generics）是一个强大的特性，允许开发者创建可重用的组件。这些组件不仅能处理一种数据类型，而是能处理多种数据类型，从而增强代码的灵活性和可重用性。泛型使得类型可以作为参数传递给类、接口和函数。

### 泛型函数

定义泛型函数时，使用尖括号 `<>` 来指定泛型类型变量。下面是一个简单的泛型函数示例：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString"); // 手动指定类型参数
let output2 = identity("myString"); // 类型推断
```

### 泛型接口

可以使用泛型定义接口，从而使接口中的某些成员具有通用类型：

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### 泛型类

泛型可以用于类的定义，使类中的成员具有通用类型：

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

console.log(myGenericNumber.add(1, 2)); // 输出: 3
```

### 泛型约束

可以对泛型类型变量进行约束，限制其类型范围：

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // 现在可以访问 length 属性
  return arg;
}

loggingIdentity({ length: 10, value: 3 }); // 输出: 10
```

### 使用类型参数在泛型约束中

在泛型约束中使用其他类型参数：

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
console.log(getProperty(x, "a")); // 输出: 1
```

### 泛型默认类型

可以为泛型指定默认类型：

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

console.log(createArray(3, "x")); // 输出: ['x', 'x', 'x']
```

### 高级用法

#### 泛型条件类型

TypeScript 还支持条件类型，可以基于类型做判断：

```typescript
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>; // string
type DogMessageContents = MessageOf<Dog>; // never
```

#### 映射类型

映射类型允许将一个类型的属性转换为另一个类型的属性：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  title: string;
  description: string;
}

const todo: Readonly<Todo> = {
  title: "Learn TypeScript",
  description: "Understand generics"
};

// todo.title = "Learn JavaScript"; // 错误: title 是只读属性
```

## 类型断言

类型断言可以手动指定一个值的类型（类似于类型转换）：

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 模块和命名空间

在 TypeScript 中，模块和命名空间是用于组织代码的两种方式。它们都能帮助开发者避免命名冲突，提高代码的可维护性和可读性。下面详细介绍 TypeScript 中的模块和命名空间。

### 模块

模块是外部模块的实现方式，文件是模块的自然单元。每个模块都有自己的作用域，默认情况下文件中的所有内容都在模块的作用域内，其他模块无法访问。模块通过 `import` 和 `export` 关键字进行导入和导出。

#### 导出模块

使用 `export` 关键字导出变量、函数、类或接口：

```typescript
// math.ts
export function add(x: number, y: number): number {
  return x + y;
}

export const PI = 3.14;

export class Circle {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }

  getArea(): number {
    return PI * this.radius ** 2;
  }
}
```

#### 导入模块

使用 `import` 关键字从其他模块导入变量、函数、类或接口：

```typescript
// app.ts
import { add, PI, Circle } from './math';

console.log(add(2, 3)); // 输出: 5
console.log(PI); // 输出: 3.14

const circle = new Circle(10);
console.log(circle.getArea()); // 输出: 314
```

#### 默认导出

一个模块可以有一个默认导出，使用 `export default` 语法：

```typescript
// logger.ts
export default function log(message: string): void {
  console.log(message);
}
```

导入默认导出时，可以使用任意名称：

```typescript
// app.ts
import log from './logger';

log('Hello, TypeScript'); // 输出: Hello, TypeScript
```

### 命名空间

命名空间用于组织在一个全局作用域下的代码。与模块不同，命名空间主要用于在同一文件或多个文件中的逻辑分组，使用 `namespace` 关键字定义。

#### 定义命名空间

```typescript
namespace Utils {
  export function log(message: string): void {
    console.log(message);
  }

  export function error(message: string): void {
    console.error(message);
  }
}

Utils.log('This is a log message'); // 输出: This is a log message
Utils.error('This is an error message'); // 输出: This is an error message
```

#### 嵌套命名空间

命名空间可以嵌套，用于更细粒度地组织代码：

```typescript
namespace App {
  export namespace Utils {
    export function log(message: string): void {
      console.log(message);
    }

    export function error(message: string): void {
      console.error(message);
    }
  }
}

App.Utils.log('This is a log message'); // 输出: This is a log message
App.Utils.error('This is an error message'); // 输出: This is an error message
```

#### 命名空间合并

命名空间可以跨多个文件进行合并，通过 `/// <reference path="..." />` 指令引入。

```typescript
// shapes.ts
namespace Shapes {
  export class Circle {
    constructor(public radius: number) {}
  }
}

// moreShapes.ts
/// <reference path="shapes.ts" />
namespace Shapes {
  export class Square {
    constructor(public sideLength: number) {}
  }
}

// app.ts
/// <reference path="shapes.ts" />
/// <reference path="moreShapes.ts" />

let circle = new Shapes.Circle(10);
let square = new Shapes.Square(5);

console.log(circle.radius); // 输出: 10
console.log(square.sideLength); // 输出: 5
```

### 区别和使用场景

- **模块**：适用于将代码组织到独立的文件中，促进代码的可维护性和重用性。模块是 ES6 的标准，在现代 JavaScript 项目中更为推荐使用。
- **命名空间**：适用于在一个全局作用域下组织代码，主要用于大型项目中的逻辑分组。命名空间更类似于传统的编程语言中的包或库，但在现代 TypeScript 开发中，建议尽量使用模块代替命名空间。


## 类型别名

类型别名（Type Aliases）是 TypeScript 中一种方便的方式，用于为复杂类型赋予一个简单的名称。类型别名可以用于基本类型、对象类型、联合类型、交叉类型等。类型别名使用 `type` 关键字来定义。

### 定义类型别名

类型别名可以用于简单类型：

```typescript
type Name = string;
type Age = number;

let myName: Name = "John";
let myAge: Age = 30;
```

### 对象类型别名

类型别名可以用于定义对象类型：

```typescript
type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

let person: Person = {
  firstName: "John",
  lastName: "Doe",
  age: 25
};
```

### 联合类型别名

类型别名可以用于定义联合类型：

```typescript
type ID = number | string;

let userId: ID;
userId = 123;  // 合法
userId = "abc";  // 合法
```

### 交叉类型别名

类型别名可以用于定义交叉类型：

```typescript
type Name = {
  firstName: string;
  lastName: string;
};

type Contact = {
  phone: string;
  email: string;
};

type Person = Name & Contact;

let person: Person = {
  firstName: "John",
  lastName: "Doe",
  phone: "123-456-7890",
  email: "john.doe@example.com"
};
```

### 泛型类型别名

类型别名可以使用泛型来创建灵活的类型：

```typescript
type Container<T> = {
  value: T;
};

let numberContainer: Container<number> = { value: 123 };
let stringContainer: Container<string> = { value: "Hello" };
```

### 函数类型别名

类型别名可以用于定义函数类型：

```typescript
type Add = (x: number, y: number) => number;

let add: Add = (x, y) => x + y;

console.log(add(2, 3)); // 输出: 5
```

### 可索引类型别名

类型别名可以用于定义可索引类型：

```typescript
type StringArray = {
  [index: number]: string;
};

let myArray: StringArray = ["Hello", "World"];
console.log(myArray[0]); // 输出: Hello
```

### 类型别名与接口的区别

类型别名和接口在某些情况下可以互换使用，但也有一些不同之处：

1. **接口扩展**：
   接口可以通过 `extends` 关键字扩展其他接口或类型别名，而类型别名需要通过交叉类型来实现扩展。

   ```typescript
   interface Name {
     firstName: string;
     lastName: string;
   }

   interface Contact extends Name {
     phone: string;
     email: string;
   }

   let contact: Contact = {
     firstName: "John",
     lastName: "Doe",
     phone: "123-456-7890",
     email: "john.doe@example.com"
   };
   ```

2. **实现类**：
   类可以实现接口，但不能实现类型别名。

   ```typescript
   interface Greetable {
     greet(): void;
   }

   class Greeter implements Greetable {
     greet() {
       console.log("Hello!");
     }
   }
   ```

3. **联合类型和交叉类型**：
   类型别名可以定义联合类型和交叉类型，而接口不能直接定义这些类型。

## 交叉类型与联合类型

交叉类型（Intersection Types）和联合类型（Union Types）是 TypeScript 中的两个重要特性，它们可以用于构建更复杂的类型系统，提供更强大的类型检查能力。

### 交叉类型（Intersection Types）

交叉类型将多个类型合并为一个类型。新类型具有所有合并类型的成员。交叉类型使用 `&` 符号定义。

#### 示例

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type Manager = Person & Employee;

let manager: Manager = {
  name: "Alice",
  age: 30,
  employeeId: 123,
  department: "HR"
};
```

在上述示例中，`Manager` 类型同时包含 `Person` 和 `Employee` 的所有属性。

### 联合类型（Union Types）

联合类型表示一个值可以是几种类型之一。联合类型使用 `|` 符号定义。

#### 示例

```typescript
type ID = number | string;

let userId: ID;
userId = 123; // 合法
userId = "abc"; // 合法
```

在上述示例中，`userId` 可以是 `number` 或 `string` 类型。

### 交叉类型与联合类型的使用场景

#### 交叉类型的使用场景

交叉类型通常用于将多个类型合并为一个类型，当一个对象需要具有多个类型的所有属性时很有用。

```typescript
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIElement = Draggable & Resizable;

let button: UIElement = {
  drag: () => console.log("Dragging..."),
  resize: () => console.log("Resizing...")
};
```

#### 联合类型的使用场景

联合类型常用于一个值可以是几种类型之一的情况，尤其是在函数参数和返回值类型中。

```typescript
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}

console.log(format("hello")); // 输出: HELLO
console.log(format(123.456)); // 输出: 123.46
```

### 类型保护

在使用联合类型时，通常需要进行类型检查以确保安全地使用值。TypeScript 提供了几种类型保护机制。

#### 使用 `typeof`

`typeof` 运算符可以用来检查基本类型。

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${typeof padding}'.`);
}
```

#### 使用 `instanceof`

`instanceof` 运算符可以用来检查对象的类型。

```typescript
class Dog {
  bark() {
    console.log("Woof! Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow! Meow!");
  }
}

type Pet = Dog | Cat;

function makeNoise(pet: Pet) {
  if (pet instanceof Dog) {
    pet.bark();
  } else if (pet instanceof Cat) {
    pet.meow();
  }
}

let myPet: Pet = new Dog();
makeNoise(myPet); // 输出: Woof! Woof!
```

#### 使用自定义类型保护

可以定义类型谓词（type predicate）来创建自定义的类型保护。

```typescript
type Fish = {
  swim: () => void;
};

type Bird = {
  fly: () => void;
};

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getPet(): Fish | Bird {
  // 生成随机宠物
  return Math.random() > 0.5 ? { swim: () => console.log("Swimming") } : { fly: () => console.log("Flying") };
}

let pet = getPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

## 工具泛型类

在 TypeScript 中，工具泛型类（Utility Types）是一些内置的类型，用于帮助开发者在类型系统中进行变换和处理。它们可以简化常见的类型操作，提高代码的可读性和维护性。

### 常见的工具泛型类

以下是 TypeScript 中一些常用的工具泛型类：

### 1. `Partial<T>`

将类型 `T` 的所有属性变为可选。
```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

- `type Partial<T>`：这是在定义一个泛型类型 `Partial`，它接受一个类型参数 `T`。
- `{ [P in keyof T]?: T[P]; }`：这是一个映射类型，用于将 `T` 的所有属性变为可选属性。
  - `keyof T`：提取类型 `T` 的所有键，返回一个联合类型。
  - `[P in keyof T]`：通过遍历 `T` 的所有键 `P`，构建一个新的类型。
  - `T[P]`：获取类型 `T` 中键 `P` 对应的属性类型。
  - `?`：将属性 `P` 变为可选属性。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = Partial<User>;

let user: PartialUser = { id: 1 }; // 合法
```

### 2. `Required<T>`

将类型 `T` 的所有属性变为必选。

```typescript
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```
- `type Required<T>`：这是在定义一个泛型类型 `Required`，它接受一个类型参数 `T`。
- `{ [P in keyof T]-?: T[P]; }`：这是一个映射类型，用于将 `T` 的所有属性变为必选属性。
  - `keyof T`：提取类型 `T` 的所有键，返回一个联合类型。
  - `[P in keyof T]`：通过遍历 `T` 的所有键 `P`，构建一个新的类型。
  - `T[P]`：获取类型 `T` 中键 `P` 对应的属性类型。
  - `-?`：移除属性 `P` 上的可选标记，使其成为必选属性。

```typescript
interface User {
  id: number;
  name?: string;
  age?: number;
}

type RequiredUser = Required<User>;

let user: RequiredUser = { id: 1, name: "Alice", age: 30 }; // 合法
```

### 3. `Readonly<T>`

将类型 `T` 的所有属性变为只读。
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```
- `type Readonly<T>`：这是在定义一个泛型类型 `Readonly`，它接受一个类型参数 `T`。
- `{ readonly [P in keyof T]: T[P]; }`：这是一个映射类型，用于将 `T` 的所有属性变为只读属性。
  - `keyof T`：提取类型 `T` 的所有键，返回一个联合类型。
  - `[P in keyof T]`：通过遍历 `T` 的所有键 `P`，构建一个新的类型。
  - `T[P]`：获取类型 `T` 中键 `P` 对应的属性类型。
  - `readonly`：将属性 `P` 标记为只读属性。

```typescript
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;

let user: ReadonlyUser = { id: 1, name: "Alice" };
// user.id = 2; // 错误: id 是只读属性
```

### 4. `Record<K, T>`

将类型 `K` 的所有属性的值变为类型 `T`。
```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```
- `type Record<K extends keyof any, T>`：这是在定义一个泛型类型 `Record`，它接受两个类型参数 `K` 和 `T`。
  - `K` 代表对象的键的类型。
  - `T` 代表对象的值的类型。
  - `K extends keyof any` 约束 `K` 必须是 `string`、`number` 或 `symbol` 类型，因为对象的键只能是这三种类型之一。
- `{ [P in K]: T; }`：这是一个映射类型，用于构建一个新的对象类型。
  - `[P in K]`：遍历联合类型 `K` 中的所有键 `P`。
  - `T`：将键 `P` 的值类型设置为 `T`。

```typescript
type UserRoles = "admin" | "user" | "guest";

type UserRoleMap = Record<UserRoles, string>;

let roles: UserRoleMap = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User"
};
```

### 5. `Pick<T, K>`

从类型 `T` 中选择一组属性 `K`。
```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
- `type Pick<T, K extends keyof T>`：这是在定义一个泛型类型 `Pick`，它接受两个类型参数 `T` 和 `K`。
  - `T` 代表源类型。
  - `K` 代表从 `T` 中选择的一组属性。
  - `K extends keyof T` 确保 `K` 是 `T` 中属性键的联合类型。
- `{ [P in K]: T[P]; }`：这是一个映射类型，用于构建一个新的对象类型，只包含 `T` 中键为 `K` 的属性。
  - `[P in K]`：遍历联合类型 `K` 中的所有键 `P`。
  - `T[P]`：获取类型 `T` 中键 `P` 对应的属性类型。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserInfo = Pick<User, "id" | "name">;

let user: UserInfo = { id: 1, name: "Alice" };
```

### 6. `Omit<T, K>`

从类型 `T` 中剔除一组属性 `K`。
```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```
- `type Omit<T, K extends keyof any>`：这是在定义一个泛型类型 `Omit`，它接受两个类型参数 `T` 和 `K`。
  - `T` 代表源类型。
  - `K` 代表要剔除的一组属性。
  - `K extends keyof any` 确保 `K` 是可以作为键的类型，即 `string`、`number` 或 `symbol`。
- `Pick<T, Exclude<keyof T, K>>`：这是类型构造的一部分，它通过以下步骤构建出新的类型：
  - `keyof T`：提取类型 `T` 的所有键，形成一个联合类型。
  - `Exclude<keyof T, K>`：从 `keyof T` 中剔除类型 `K`，得到剩下的键的联合类型。
  - `Pick<T, Exclude<keyof T, K>>`：从类型 `T` 中选择剩下的键，构建一个新的类型。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserContactInfo = Omit<User, "age" | "email">;

let user: UserContactInfo = { id: 1, name: "Alice" };
```

### 7. `Exclude<T, U>`

从类型 `T` 中剔除可以赋值给类型 `U` 的类型。

```typescript
type Exclude<T, U> = T extends U ? never : T;
```
- `type Exclude<T, U>`：这是在定义一个泛型类型 `Exclude`，它接受两个类型参数 `T` 和 `U`。
  - `T` 代表源类型。
  - `U` 代表要剔除的类型。
- `T extends U ? never : T`：这是一个条件类型，用于剔除 `T` 中可以赋值给 `U` 的类型。
  - `T extends U`：如果 `T` 可以赋值给 `U`，则结果为 `never`。
  - `never`：表示不包含任何值的类型，用于剔除 `T` 中可以赋值给 `U` 的部分。
  - `: T`：如果 `T` 不能赋值给 `U`，则结果为 `T`。

```typescript
type T = string | number | boolean;
type U = Exclude<T, boolean>;

let value: U = "hello"; // 合法
value = 42; // 合法
// value = true; // 错误
```

### 8. `Extract<T, U>`

从类型 `T` 中提取可以赋值给类型 `U` 的类型。

```typescript
type Extract<T, U> = T extends U ? T : never;
```
- `type Extract<T, U>`：这是在定义一个泛型类型 `Extract`，它接受两个类型参数 `T` 和 `U`。
  - `T` 代表源类型。
  - `U` 代表要提取的类型。
- `T extends U ? T : never`：这是一个条件类型，用于提取 `T` 中可以赋值给 `U` 的类型。
  - `T extends U`：如果 `T` 可以赋值给 `U`，则结果为 `T`。
  - `: never`：如果 `T` 不能赋值给 `U`，则结果为 `never`。

```typescript
type T = string | number | boolean;
type U = Extract<T, boolean | number>;

let value: U = 42; // 合法
value = true; // 合法
// value = "hello"; // 错误
```

### 9. `NonNullable<T>`

从类型 `T` 中剔除 `null` 和 `undefined`。

```typescript
type NonNullable<T> = T & {}; // 新版
type NonNullable<T> = T extends null | undefined ? never : T;
```
- `type NonNullable<T>`：这是在定义一个泛型类型 `NonNullable`，它接受一个类型参数 `T`。
- `T extends null | undefined ? never : T`：这是一个条件类型，用于剔除 `T` 中的 `null` 和 `undefined` 类型。
  - `T extends null | undefined`：如果 `T` 是 `null` 或 `undefined`，则结果为 `never`。
  - `: T`：如果 `T` 不是 `null` 或 `undefined`，则结果为 `T`。

```typescript
type T = string | number | null | undefined;
type U = NonNullable<T>;

let value: U = "hello"; // 合法
value = 42; // 合法
// value = null; // 错误
// value = undefined; // 错误
```

### 10. `Parameters<T>`

获取函数类型 `T` 的参数类型组成的元组类型。
```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```
- `type Parameters<T extends (...args: any) => any>`：这是在定义一个泛型类型 `Parameters`，它接受一个类型参数 `T`，并且约束 `T` 必须是一个函数类型。
  - `T extends (...args: any) => any`：确保 `T` 是一个函数类型，接受任意参数并返回任意类型的值。
- `T extends (...args: infer P) => any ? P : never`：这是一个条件类型，用于提取 `T` 的参数类型。
  - `T extends (...args: infer P) => any`：如果 `T` 是一个函数类型，并且它的参数类型可以被推断为 `P`，则结果为 `P`。
  - `? P`：如果 `T` 符合条件，返回参数类型 `P`（即参数类型的元组）。
  - `: never`：如果 `T` 不符合条件，返回 `never`。

```typescript
type Fn = (a: string, b: number) => void;
type Params = Parameters<Fn>;

let args: Params = ["hello", 42]; // 合法
```

### 11. `ConstructorParameters<T>`

获取构造函数类型 `T` 的参数类型组成的元组类型。
```typescript
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```
- `type ConstructorParameters<T extends abstract new (...args: any) => any>`：这是在定义一个泛型类型 `ConstructorParameters`，它接受一个类型参数 `T`，并且约束 `T` 必须是一个构造函数类型。
  - `T extends abstract new (...args: any) => any`：确保 `T` 是一个构造函数类型，接受任意参数并返回任意类型的实例。
- `T extends abstract new (...args: infer P) => any ? P : never`：这是一个条件类型，用于提取 `T` 的参数类型。
  - `T extends abstract new (...args: infer P) => any`：如果 `T` 是一个构造函数类型，并且它的参数类型可以被推断为 `P`，则结果为 `P`。
  - `? P`：如果 `T` 符合条件，返回参数类型 `P`（即参数类型的元组）。
  - `: never`：如果 `T` 不符合条件，返回 `never`。

```typescript
class User {
  constructor(public name: string, public age: number) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;

let args: UserConstructorParams = ["Alice", 30]; // 合法
```

### 12. `ReturnType<T>`

获取函数类型 `T` 的返回值类型。
```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

- `T extends (...args: any) => any`：这是一个泛型约束，确保 `T` 是一个函数类型。`(...args: any) => any` 表示一个接受任意参数并返回任意类型值的函数。
- `T extends (...args: any) => infer R ? R : any`：这是一个条件类型，用于提取函数类型 `T` 的返回值类型。
  - `T extends (...args: any) => infer R`：如果 `T` 是一个函数类型，那么 `infer R` 会推断出该函数的返回值类型，并将其赋给类型变量 `R`。
  - `? R`：如果 `T` 是一个函数类型，则返回 `R`，即函数的返回值类型。
  - `: any`：如果 `T` 不是一个函数类型，则返回 `any`。

```typescript
type Fn = () => string;
type Return = ReturnType<Fn>;

let value: Return = "hello"; // 合法
```

### 13. `InstanceType<T>`

获取构造函数类型 `T` 的实例类型。
```typescript
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```
- `type InstanceType<T extends abstract new (...args: any) => any>`：这是在定义一个泛型类型 `InstanceType`，它接受一个类型参数 `T`，并且约束 `T` 必须是一个构造函数类型。
  - `T extends abstract new (...args: any) => any`：确保 `T` 是一个构造函数类型，接受任意参数并返回任意类型的实例。
- `T extends abstract new (...args: any) => infer R ? R : any`：这是一个条件类型，用于提取构造函数 `T` 的实例类型。
  - `T extends abstract new (...args: any) => infer R`：如果 `T` 是一个构造函数类型，并且它的返回类型可以被推断为 `R`，则结果为 `R`。
  - `? R`：如果 `T` 符合条件，返回实例类型 `R`。
  - `: any`：如果 `T` 不符合条件，返回 `any`。

```typescript
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

type UserInstance = InstanceType<typeof User>;

let user: UserInstance = new User("Alice");
```

### 14. `ThisType<T>`

用于指定上下文对象的类型。
```typescript
interface ThisType<T> {}
```
- `interface ThisType<T>`：定义了一个泛型接口 `ThisType`，它接受一个类型参数 `T`。
- `{}`：这个接口没有任何具体的结构或成员。

`ThisType<T>` 是一个特殊的标记接口，用于告诉 TypeScript 在某些对象字面量的上下文中，`this` 应该被视为类型 `T`。它通常与对象字面量的 `contextual typing` 结合使用，通过对象字面量中的 `this` 来实现更精确的类型检查。

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    }
  }
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
console.log(obj); // 输出: { x: 15, y: 25, moveBy: [Function: moveBy] }
```

### 15. `Uppercase<T>, Lowercase<T>, Capitalize<T>, Uncapitalize<T>`

```typescript
// 将字符串类型的所有字符转换为大写。
type Uppercase<S extends string> = intrinsic;

// 将字符串类型的所有字符转换为小写。
type Lowercase<S extends string> = intrinsic;

// 将字符串类型的首字母转换为大写。
type Capitalize<S extends string> = intrinsic;

// 将字符串类型的首字母转换为小写。
type Uncapitalize<S extends string> = intrinsic;
```

### 16. `Awaited<T>`

获取 Promise 的解析值类型的工具类型

```typescript
type Awaited<T> = T extends null | undefined ? T : 
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any; } ? 
        F extends ((value: infer V, ...args: infer _) => any) ? 
            Awaited<V> :
        never : 
    T;
```
- `T extends null | undefined ? T`：处理 `null` 和 `undefined` 类型。如果 `T` 是 `null` 或 `undefined`，则返回 `T`。
- `T extends object & { then(onfulfilled: infer F, ...args: infer _): any; }`：检查 `T` 是否是一个对象，并且具有一个 `then` 方法。`then` 方法用于表示 thenable 对象，如 `Promise`。
  - `F extends ((value: infer V, ...args: infer _) => any)`：提取 `then` 方法的第一个参数类型 `F`，并检查 `F` 是否是一个接受参数 `V` 的函数。
    - `Awaited<V>`：递归地解包 `V`，即如果 `V` 本身也是一个 `Promise` 或 thenable 对象，继续解包。
  - `never`：如果 `then` 方法的第一个参数不是一个可调用函数，返回 `never`。
- `T`：如果 `T` 既不是 `null` 或 `undefined`，也不是一个 thenable 对象，则返回 `T`。

## 关键字

### infer
在 TypeScript 中，`infer` 关键字用于在条件类型中推断类型变量。它允许我们在条件类型中提取和使用某个类型的部分信息，是一个非常强大的特性。

#### `infer` 的用法

`infer` 关键字通常在条件类型中与 `extends` 关键字一起使用，以推断某个类型的一部分。如果类型符合某个模式，那么我们可以提取出这个模式的一部分作为类型变量。

#### 示例

以下是一些使用 `infer` 关键字的示例：

##### 示例 1：推断函数返回类型

我们可以创建一个工具类型 `ReturnType`，用于提取函数的返回类型：

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function exampleFunction(): string {
    return "hello";
}

type ExampleFunctionReturnType = MyReturnType<typeof exampleFunction>;
// ExampleFunctionReturnType 类型为 string
```

在这个例子中，`MyReturnType` 类型通过 `infer` 关键字提取出函数 `exampleFunction` 的返回类型 `string`。

##### 示例 2：推断数组元素类型

我们可以创建一个工具类型 `ElementType`，用于提取数组的元素类型：

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;

type StringArray = string[];
type NumberArray = number[];

type StringArrayElement = ElementType<StringArray>;
// StringArrayElement 类型为 string

type NumberArrayElement = ElementType<NumberArray>;
// NumberArrayElement 类型为 number
```

在这个例子中，`ElementType` 类型通过 `infer` 关键字提取出数组的元素类型。

#### 深入理解

为了更好地理解 `infer`，我们可以逐步拆解其用法：

1. **定义条件类型**：条件类型使用 `extends` 关键字来检查一个类型是否符合某个模式。
2. **使用 `infer` 关键字**：在条件类型中使用 `infer` 关键字来推断类型变量。
3. **返回推断的类型**：如果类型符合条件，则返回推断的类型；否则，返回其他类型（例如 `never`）。

##### 示例 3：推断 Promise 的解析类型

我们可以创建一个工具类型 `Awaited`，用于提取 `Promise` 的解析类型：

```typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;

type StringPromise = Promise<string>;
type NumberPromise = Promise<number>;

type StringPromiseResult = Awaited<StringPromise>;
// StringPromiseResult 类型为 string

type NumberPromiseResult = Awaited<NumberPromise>;
// NumberPromiseResult 类型为 number
```

在这个例子中，`Awaited` 类型通过 `infer` 关键字提取出 `Promise` 的解析类型。

#### 实际应用

`infer` 关键字在实际开发中非常有用，特别是在构建复杂的类型系统时。例如，处理函数类型、数组类型或 `Promise` 类型时，可以使用 `infer` 来提取和操作类型信息。

#### 例子：推断元组类型中的第一个元素类型

假设我们有一个元组类型，我们可以创建一个工具类型 `FirstElement`，用于提取元组的第一个元素类型：

```typescript
type FirstElement<T> = T extends [infer U, ...any[]] ? U : never;

type Tuple1 = [string, number, boolean];
type Tuple2 = [number, boolean, string];

type FirstElementOfTuple1 = FirstElement<Tuple1>;
// FirstElementOfTuple1 类型为 string

type FirstElementOfTuple2 = FirstElement<Tuple2>;
// FirstElementOfTuple2 类型为 number
```

在这个例子中，`FirstElement` 类型通过 `infer` 关键字提取出元组的第一个元素类型。

### intrinsic

在 TypeScript 中，`intrinsic` 是一个关键字，用于定义内置工具类型的行为。内置工具类型（例如 `Uppercase`、`Lowercase`、`Capitalize` 和 `Uncapitalize`）是由 TypeScript 编译器直接支持的，并且它们的实现是内置在编译器中的。

虽然你在定义类型时可能会看到 `intrinsic` 关键字，但它并不是 TypeScript 用户需要直接使用或定义的东西。它是 TypeScript 编译器的一部分，用于实现复杂的类型变换。

### typeof

`typeof` 是 TypeScript 中的一个关键字，用于获取变量或表达式的类型。它有两种主要用法：一种是用于类型查询，另一种是用于类型保护。

#### 用法 1：类型查询

在 TypeScript 中，`typeof` 关键字可以用来获取变量的类型，并将其用作其他类型声明的一部分。这对于在类型系统中重用类型非常有用。

##### 示例

```typescript
let s = "hello";
let n = 42;

type StringType = typeof s; // StringType 类型为 string
type NumberType = typeof n; // NumberType 类型为 number
```

在这个例子中，`StringType` 被赋值为 `string` 类型，而 `NumberType` 被赋值为 `number` 类型。`typeof` 用于获取变量 `s` 和 `n` 的类型。

##### 用于函数返回类型

你还可以使用 `typeof` 来获取函数的返回类型：

```typescript
function getUser() {
    return { name: "Alice", age: 25 };
}

type UserType = ReturnType<typeof getUser>;
// UserType 类型为 { name: string; age: number; }
```

在这个例子中，`UserType` 被赋值为 `getUser` 函数的返回类型 `{ name: string; age: number; }`。

#### 用法 2：类型保护

`typeof` 关键字也可以用来在运行时检查变量的类型，从而实现类型保护。这在编写需要处理多种类型的函数时非常有用。

##### 示例

```typescript
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log(`ID in string format: ${id.toUpperCase()}`);
    } else {
        console.log(`ID in number format: ${id.toFixed(2)}`);
    }
}

printId(101); // 输出: ID in number format: 101.00
printId("202"); // 输出: ID in string format: 202
```

在这个例子中，`typeof id === "string"` 用于检查 `id` 是否为字符串类型。如果是，则调用字符串的方法；否则，假定它是数字类型并调用数字的方法。

#### 实际应用

##### 类型查询的实际应用

类型查询在定义与现有变量或函数一致的类型时特别有用。例如，当你需要定义与函数返回类型一致的变量类型时：

```typescript
function fetchData() {
    return { id: 1, data: "sample data" };
}

type FetchDataType = ReturnType<typeof fetchData>;

let data: FetchDataType = fetchData();
console.log(data.id); // 输出: 1
console.log(data.data); // 输出: sample data
```

##### 类型保护的实际应用

类型保护在处理联合类型时非常有用。例如，处理多种输入类型：

```typescript
function processValue(value: string | number | boolean) {
    if (typeof value === "string") {
        console.log(`String value: ${value}`);
    } else if (typeof value === "number") {
        console.log(`Number value: ${value}`);
    } else {
        console.log(`Boolean value: ${value}`);
    }
}

processValue("hello"); // 输出: String value: hello
processValue(123); // 输出: Number value: 123
processValue(true); // 输出: Boolean value: true
```

### type

在 TypeScript 中，`type` 关键字用于定义类型别名。类型别名为复杂的类型赋予一个新的名称，使代码更加清晰和易读。类型别名可以用于基本类型、对象类型、联合类型、交叉类型、函数类型、泛型等。

#### 基本用法

##### 定义基本类型的别名

```typescript
type Name = string;
type Age = number;

let myName: Name = "Alice";
let myAge: Age = 30;
```

##### 定义对象类型的别名

```typescript
type Person = {
    name: string;
    age: number;
};

let person: Person = {
    name: "Alice",
    age: 30
};
```

##### 定义联合类型的别名

```typescript
type ID = number | string;

let userId: ID;
userId = 123;  // 合法
userId = "abc";  // 合法
```

##### 定义交叉类型的别名

```typescript
type Name = {
    firstName: string;
    lastName: string;
};

type Contact = {
    phone: string;
    email: string;
};

type Person = Name & Contact;

let person: Person = {
    firstName: "Alice",
    lastName: "Doe",
    phone: "123-456-7890",
    email: "alice@example.com"
};
```

##### 定义函数类型的别名

```typescript
type Add = (a: number, b: number) => number;

const add: Add = (x, y) => x + y;

console.log(add(2, 3)); // 输出: 5
```

##### 定义泛型类型的别名

```typescript
type Container<T> = {
    value: T;
};

let numberContainer: Container<number> = { value: 123 };
let stringContainer: Container<string> = { value: "Hello" };
```

对于交叉类型或联合类型的泛型参数
```typescript
// 直接将交叉类型看作一个类型
type A1 = Readonly<{a: string } & { b: number}>
// 将联合类型的每个单独的类型进行计算, 再将所有结果生成一个联合类型
type A2 = Readonly<{a: string } | { b: number}>
```

#### 进阶用法

##### 可索引类型

```typescript
type StringArray = {
    [index: number]: string;
};

let myArray: StringArray = ["Hello", "World"];
console.log(myArray[0]); // 输出: Hello
```

##### 映射类型

```typescript
type ReadonlyPerson = {
    readonly [K in keyof Person]: Person[K];
};

let readonlyPerson: ReadonlyPerson = {
    name: "Alice",
    age: 30
};

// readonlyPerson.age = 31; // 错误: Cannot assign to 'age' because it is a read-only property
```

##### 条件类型

```typescript
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"
```

## 常用技巧

