---
title: JavaScript基础语法
---

## **变量**
   - **声明**
```javascript
let singleQuoteString = 'Single quote string'
let doubleQuoteString = "Double quote string with interpolation"
let tripleQuoteString = `Triple quote
string spanning
multiple lines ${name}`
var name = 'John'; // ES5
let age = 30; // ES6
const isStudent = true; // ES6
```
    
JavaScript 中声明变量主要有三种方式：`var`、`let` 和 `const`。每种方式都有其特定的使用场景和特点。

### 1. **var**
- **特点**：
  - 可以重新声明和赋值。
  - 函数作用域：`var` 声明的变量在其所在函数内是可见的。
  - 存在变量提升（Hoisting）：声明会被提升到作用域顶部，但赋值不会。
  
- **例子**：
  ```javascript
  function example() {
    console.log(x); // 输出：undefined
    var x = 10;
    console.log(x); // 输出：10
  }

  example();
  ```

### 2. **let**
- **特点**：
  - 可以重新赋值，但不能重新声明。
  - 块级作用域：`let` 声明的变量在其所在的代码块内是可见的。
  - 没有变量提升，但会存在暂时性死区（Temporal Dead Zone，TDZ）。
  
- **例子**：
  ```javascript
  function example() {
    console.log(y); // ReferenceError: y is not defined
    let y = 20;
    console.log(y); // 输出：20
  }

  example();
  ```

### 3. **const**
- **特点**：
  - 不能重新赋值或重新声明。
  - 必须在声明时初始化。
  - 块级作用域。
  - 常用于声明常量，但对于对象和数组，虽然不能重新赋值，但可以修改其内容。
  
###  **数据类型**

| 数据类型      | 描述                                             | 示例                                                |
|---------------|--------------------------------------------------|-----------------------------------------------------|
| **原始类型**  | **Primitive Types**                              |                                                     |
| **String**    | 表示文本数据，用单引号或双引号包围的字符序列。    | `"Hello, World!"`                                    |
| **Number**    | 表示数字，可以是整数或浮点数。                    | `42`, `3.14`                                         |
| **Boolean**   | 表示逻辑值，只有两个值：`true` 或 `false`。       | `true`, `false`                                      |
| **Undefined** | 表示未定义的值，变量声明但未赋值时的默认值。      | `let a; // a 是 undefined`                           |
| **Null**      | 表示空值，表示变量没有值。                        | `let b = null;`                                      |
| **Symbol**    | 表示唯一的、不可变的数据类型，用于对象属性标识。  | `let sym = Symbol('desc');`                          |
| **BigInt**    | 表示任意精度的整数，用于处理大整数。              | `let bigInt = 12345678901234567890n;`                |
| **对象类型**  | **Object Types**                                 |                                                     |
| **Object**    | 集合键值对，所有复杂数据结构的基础。              | `let obj = { name: 'John', age: 30 };`               |
| **Array**     | 有序集合，元素可以是任何类型。                    | `let arr = [1, 'two', 3];`                           |
| **Function**  | 可执行的代码块，定义了特定任务。                  | `function greet() { return 'Hello'; }`               |
| **Date**      | 表示日期和时间。                                  | `let date = new Date();`                             |
| **RegExp**    | 正则表达式，用于匹配字符串。                      | `let re = /ab+c/;`                                   |
| **其他类型**  | **Other Types**                                  |                                                     |
| **Null**      | 表示故意没有值的对象。                            | `let empty = null;`                                  |

#### 1. **String**
```javascript
let greeting = "Hello, World!";
console.log(typeof greeting); // "string"
```

#### 2. **Number**
```javascript
let age = 25;
let pi = 3.14;
console.log(typeof age); // "number"
console.log(typeof pi);  // "number"
```

#### 3. **Boolean**
```javascript
let isActive = true;
console.log(typeof isActive); // "boolean"
```

#### 4. **Undefined**
```javascript
let x;
console.log(typeof x); // "undefined"
```

#### 5. **Null**
```javascript
let y = null;
console.log(typeof y); // "object" (这是一个历史遗留问题)
```

#### 6. **Symbol**
```javascript
let sym = Symbol("description");
console.log(typeof sym); // "symbol"
```

#### 7. **BigInt**
```javascript
let bigInt = 12345678901234567890n;
console.log(typeof bigInt); // "bigint"
```

#### 8. **Object**
```javascript
let person = {
  name: "John",
  age: 30
};
console.log(typeof person); // "object"
```

#### 9. **Array**
```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(typeof numbers); // "object"
```

#### 10. **Function**
```javascript
function greet() {
  return "Hello";
}
console.log(typeof greet); // "function"
```

#### 11. **Date**
```javascript
let now = new Date();
console.log(typeof now); // "object"
```

#### 12. **RegExp**
```javascript
let regex = /ab+c/;
console.log(typeof regex); // "object"
```

## 类型转换

在 JavaScript 中，类型转换是将一种数据类型转换为另一种数据类型的过程。类型转换可以分为两类：显式转换（Explicit Conversion）和隐式转换（Implicit Conversion）。

### 1. 显式类型转换

显式类型转换是通过调用函数或使用操作符来强制转换数据类型。

- **字符串转换**：使用 `String()` 函数或 `toString()` 方法。

  ```javascript
  let num = 123;
  let str = String(num); // "123"
  let str2 = num.toString(); // "123"

  let bool = true;
  let str3 = String(bool); // "true"
  ```

- **数字转换**：使用 `Number()` 函数或 `parseInt()` 和 `parseFloat()`。

  ```javascript
  let str = "123";
  let num = Number(str); // 123

  let str2 = "123.45";
  let num2 = parseInt(str2); // 123
  let num3 = parseFloat(str2); // 123.45

  let bool = true;
  let num4 = Number(bool); // 1
  ```

- **布尔转换**：使用 `Boolean()` 函数。

  ```javascript
  let str = "hello";
  let bool = Boolean(str); // true

  let num = 0;
  let bool2 = Boolean(num); // false
  ```

### 2. 隐式类型转换

隐式类型转换是 JavaScript 在需要时自动进行的类型转换，也称为类型强制（Type Coercion）。

- **字符串转换**：当使用 `+` 运算符时，如果有一个操作数是字符串，另一个操作数会被转换为字符串。

  ```javascript
  let num = 123;
  let str = "hello";
  let result = num + str; // "123hello"
  ```

- **数字转换**：当使用算术运算符（`-`、`*`、`/`）时，操作数会被转换为数字。

  ```javascript
  let str = "123";
  let num = str - 0; // 123
  let result = "10" * "2"; // 20
  let result2 = "10" / "2"; // 5
  ```

- **布尔转换**：在逻辑运算中（`&&`、`||`、`!`），操作数会被转换为布尔值。

  ```javascript
  let str = "hello";
  let result = !str; // false
  let result2 = !!str; // true
  let result3 = str && "world"; // "world"
  ```

### 3. 特殊值转换

一些特殊值的转换结果如下：

- **`null` 转换为数字**：`0`
- **`undefined` 转换为数字**：`NaN`
- **`null` 转换为布尔值**：`false`
- **`undefined` 转换为布尔值**：`false`
- **空字符串 `""` 转换为数字**：`0`
- **非空字符串转换为数字**：字符串内容解析为数字（如果可能），否则为 `NaN`
- **空字符串 `""` 转换为布尔值**：`false`
- **非空字符串转换为布尔值**：`true`

```javascript
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Number("")); // 0
console.log(Number("123abc")); // NaN
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true
```

## 字符串格式化

JavaScript字符串格式化可以通过多种方式实现，以下是几种常见的方法：

### 1. 使用模板字符串 (Template Literals)
这种方法是最简洁和现代的方式，适用于 ES6 及更高版本。

```javascript
let name = "Alice";
let age = 30;
console.log(`My name is ${name} and I am ${age} years old.`);
```

### 2. 使用 `String.prototype.replace()`
可以通过使用 `replace()` 方法结合正则表达式来实现简单的字符串替换。

```javascript
let template = "My name is {name} and I am {age} years old.";
let name = "Alice";
let age = 30;
let result = template.replace("{name}", name).replace("{age}", age);
console.log(result);
```

### 3. 使用数组的 `join()` 方法
这种方法适用于简单的字符串拼接。

```javascript
let name = "Alice";
let age = 30;
console.log(["My name is ", name, " and I am ", age, " years old."].join(''));
```

### 4. 自定义格式化函数
可以创建一个通用的格式化函数来处理更复杂的格式化需求。

```javascript
function formatString(template, replacements) {
    return template.replace(/{(\w+)}/g, function(match, key) {
        return typeof replacements[key] !== 'undefined' ? replacements[key] : match;
    });
}

let template = "My name is {name} and I am {age} years old.";
let replacements = { name: "Alice", age: 30 };
console.log(formatString(template, replacements));
```

### 5. 使用第三方库（如 `sprintf-js`）
如果需要更多功能，可以使用第三方库。`sprintf-js` 是一个流行的库，类似于 C 语言中的 `sprintf` 函数。

首先需要安装该库：

```sh
npm install sprintf-js
```

然后可以这样使用：

```javascript
const sprintf = require('sprintf-js').sprintf;

let name = "Alice";
let age = 30;
console.log(sprintf("My name is %s and I am %d years old.", name, age));
```

### 6. 使用 `String.prototype.concat()`
这是一个简单的字符串拼接方法。

```javascript
let name = "Alice";
let age = 30;
console.log("My name is ".concat(name, " and I am ", age, " years old."));
```

## **运算符**

以下是 JavaScript 中常见的运算符及其说明和示例：

| 运算符类型          | 运算符 | 描述                                              | 示例                                          | 结果            |
|---------------------|--------|---------------------------------------------------|-----------------------------------------------|-----------------|
| **算术运算符**      | `+`    | 加法                                              | `5 + 2`                                       | `7`             |
|                     | `-`    | 减法                                              | `5 - 2`                                       | `3`             |
|                     | `*`    | 乘法                                              | `5 * 2`                                       | `10`            |
|                     | `/`    | 除法                                              | `5 / 2`                                       | `2.5`           |
|                     | `%`    | 取余                                              | `5 % 2`                                       | `1`             |
|                     | `**`   | 幂运算                                            | `5 ** 2`                                      | `25`            |
|                     | `++`   | 自增                                              | `let a = 5; a++`                              | `6`             |
|                     | `--`   | 自减                                              | `let a = 5; a--`                              | `4`             |
| **赋值运算符**      | `=`    | 赋值                                              | `let a = 5`                                   | `a = 5`         |
|                     | `+=`   | 加法赋值                                          | `let a = 5; a += 2`                           | `a = 7`         |
|                     | `-=`   | 减法赋值                                          | `let a = 5; a -= 2`                           | `a = 3`         |
|                     | `*=`   | 乘法赋值                                          | `let a = 5; a *= 2`                           | `a = 10`        |
|                     | `/=`   | 除法赋值                                          | `let a = 5; a /= 2`                           | `a = 2.5`       |
|                     | `%=`   | 取余赋值                                          | `let a = 5; a %= 2`                           | `a = 1`         |
|                     | `**=`  | 幂赋值                                            | `let a = 5; a **= 2`                          | `a = 25`        |
| **比较运算符**      | `==`   | 等于                                              | `5 == '5'`                                    | `true`          |
|                     | `===`  | 全等                                              | `5 === '5'`                                   | `false`         |
|                     | `!=`   | 不等于                                            | `5 != '5'`                                    | `false`         |
|                     | `!==`  | 不全等                                            | `5 !== '5'`                                   | `true`          |
|                     | `>`    | 大于                                              | `5 > 2`                                       | `true`          |
|                     | `<`    | 小于                                              | `5 < 2`                                       | `false`         |
|                     | `>=`   | 大于等于                                          | `5 >= 2`                                      | `true`          |
|                     | `<=`   | 小于等于                                          | `5 <= 2`                                      | `false`         |
| **逻辑运算符**      | `&&`   | 逻辑与                                            | `true && false`                               | `false`         |
|                     | `\|\|`   | 逻辑或                                            | `true \|\| false`                               | `true`          |
|                     | `!`    | 逻辑非                                            | `!true`                                       | `false`         |
| **位运算符**        | `&`    | 按位与                                            | `5 & 1`                                       | `1`             |
|                     | `\|`    | 按位或                                            | `5 \| 1`                                       | `5`             |
|                     | `^`    | 按位异或                                          | `5 ^ 1`                                       | `4`             |
|                     | `~`    | 按位非                                            | `~5`                                          | `-6`            |
|                     | `<<`   | 左移                                              | `5 << 1`                                      | `10`            |
|                     | `>>`   | 右移                                              | `5 >> 1`                                      | `2`             |
|                     | `>>>`  | 无符号右移                                        | `5 >>> 1`                                     | `2`             |
| **其他运算符**      | `typeof`| 返回变量的数据类型                               | `typeof 5`                                    | `"number"`      |
|                     | `instanceof` | 检查对象是否是某个类的实例                  | `obj instanceof Object`                       | `true`          |
|                     | `in`   | 检查对象中是否存在某个属性                       | `'name' in obj`                               | `true`          |
|                     | `new`  | 创建一个对象实例                                 | `let obj = new Object()`                      | `obj`           |
|                     | `this` | 引用当前对象                                     | `this.name`                                   | 当前对象的 `name`|
|                     | `void` | 计算表达式但不返回值                             | `void(0)`                                     | `undefined`     |
|                     | `,`    | 计算多个表达式并返回最后一个表达式的值           | `(1, 2, 3)`                                   | `3`             |
|                     | `? :`  | 三元运算符（条件运算符）                         | `let result = (a > b) ? 'a is greater' : 'b is greater';` | 取决于条件      |


### 算术运算符
```javascript
let sum = 5 + 2; // 7
let diff = 5 - 2; // 3
let product = 5 * 2; // 10
let quotient = 5 / 2; // 2.5
let remainder = 5 % 2; // 1
let exponent = 5 ** 2; // 25
let a = 5;
a++; // 6
a--; // 5
```

### 赋值运算符
```javascript
let a = 5;
a += 2; // 7
a -= 2; // 5
a *= 2; // 10
a /= 2; // 5
a %= 2; // 1
a **= 2; // 25
```

### 比较运算符
```javascript
console.log(5 == '5'); // true
console.log(5 === '5'); // false
console.log(5 != '5'); // false
console.log(5 !== '5'); // true
console.log(5 > 2); // true
console.log(5 < 2); // false
console.log(5 >= 2); // true
console.log(5 <= 2); // false
```

### 逻辑运算符
```javascript
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
```

### 位运算符
```javascript
console.log(5 & 1); // 1
console.log(5 | 1); // 5
console.log(5 ^ 1); // 4
console.log(~5); // -6
console.log(5 << 1); // 10
console.log(5 >> 1); // 2
console.log(5 >>> 1); // 2
```

### 其他运算符
```javascript
console.log(typeof 5); // "number"
console.log(obj instanceof Object); // true
console.log('name' in obj); // true
let obj = new Object();
console.log(this.name); // 当前对象的 name 属性
console.log(void(0)); // undefined
console.log((1, 2, 3)); // 3
let result = (a > b) ? 'a is greater' : 'b is greater';
```

## **控制结构**

- **条件语句**
    ```javascript
    if (age > 18) {
    console.log('Adult');
    } else if (age > 12) {
    console.log('Teenager');
    } else {
    console.log('Child');
    }

    // switch
    let day = 3;
    let dayName;

    switch (day) {
    case 1:
        dayName = 'Monday';
        break;
    case 2:
        dayName = 'Tuesday';
        break;
    case 3:
        dayName = 'Wednesday';
        break;
    case 4:
        dayName = 'Thursday';
        break;
    case 5:
        dayName = 'Friday';
        break;
    case 6:
        dayName = 'Saturday';
        break;
    case 7:
        dayName = 'Sunday';
        break;
    default:
        dayName = 'Invalid day';
    }
    // 三元运算符
    let message = age > 18 ? 'Adult' : 'Not an adult';
    ```

- **循环**
```javascript
// For 循环
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// While 循环
let i = 0;
while (i < 5) {
    console.log(i);
i++;
}

// Do-While 循环
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);

// for...in 循环用于遍历对象的可枚举属性
let obj = { name: 'John', age: 30 };
for (let key in obj) {
    console.log(key + ": " + obj[key]);
}

// for...of 循环用于遍历可迭代对象（如数组、字符串、Map、Set 等）
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
  console.log(value);
}
```

### 手动实现for..of

javascript的迭代器是一种具有 next() 方法的对象，每次调用该方法都会返回一个包含 value 和 done 属性的对象。

1. 使用迭代器手动实现 for...of

```javascript
// 定义一个数组
const arr = [1, 2, 3, 4, 5];

// 获取数组的迭代器
const iterator = arr[Symbol.iterator]();

let result = iterator.next();
while (!result.done) {
  console.log(result.value); // 输出当前值
  result = iterator.next();  // 获取下一个值
}
```

2. 使用生成器手动实现 for...of

```javascript
// 定义一个生成器函数
function* generator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

// 定义一个数组
const arr = [1, 2, 3, 4, 5];

// 获取生成器的迭代器
const iterator = generator(arr);

let result = iterator.next();
while (!result.done) {
  console.log(result.value); // 输出当前值
  result = iterator.next();  // 获取下一个值
}
```

自定义可迭代对象

```javascript
const myIterable = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    let data = this.data;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (const value of myIterable) {
  console.log(value); // 输出值
}

```


## **函数**
   - **函数声明**
     ```javascript
     function greet(name) {
       return 'Hello ' + name;
     }
     ```

   - **函数表达式**
     ```javascript
     const greet = function(name) {
       return 'Hello ' + name;
     };
     ```

   - **箭头函数 (ES6)**
     ```javascript
     const greet = (name) => 'Hello ' + name;
     ```

   - **默认参数函数 (ES6)**
     ```javascript
     function greet(name = 'Guest') {
        console.log(`Hello, ${name}!`);
     }
     ```

## **数组**
   - **声明和方法**
     ```javascript
     let arr = [1, 2, 3, 4, 5];
     arr.push(6); // 添加 6 到末尾
     arr.pop(); // 移除最后一个元素
     arr.shift(); // 移除第一个元素
     arr.unshift(0); // 添加 0 到开头
     arr.splice(2, 1, 99); // 移除索引2处的1个元素，添加99
     arr.slice(1, 3); // 返回索引1到3之间的一个新数组（不包括3）
     ```

## **对象**
   - **访问和修改属性**
     ```javascript
     let person = {
       name: 'John',
       age: 30
     };

     console.log(person.name); // John
     console.log(person['age']); // 30

     person.name = 'Jane';
     person['age'] = 25;
     ```

## **解构赋值 (ES6)**
   - **数组**
     ```javascript
     let [a, b] = [1, 2];
     ```
   - **对象**
     ```javascript
     let { name, age } = { name: 'John', age: 30 };
     ```

## **扩展运算符和剩余参数 (ES6)**
   - **扩展运算符**
     ```javascript
     let arr1 = [1, 2, 3];
     let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

     let obj1 = { name: 'John', age: 30 };
     let obj2 = { ...obj1, gender: 'male' }; // { name: 'John', age: 30, gender: 'male' }
     ```

   - **剩余参数**
     ```javascript
     function sum(...args) {
       return args.reduce((acc, val) => acc + val, 0);
     }
     ```

## **类 (ES6)**
   - **声明和继承**
     ```javascript
     class Person {
       constructor(name, age) {
         this.name = name;
         this.age = age;
       }

       greet() {
         return `Hello, my name is ${this.name}`;
       }
     }

     class Student extends Person {
       constructor(name, age, grade) {
         super(name, age);
         this.grade = grade;
       }

       study() {
         return `${this.name} is studying`;
       }
     }
     ```

## 原型链

在 JavaScript 中，每个对象都有一个原型（prototype），对象可以通过原型继承属性和方法。原型链（prototype chain）是实现继承的一种方式，它是一系列对象的链接，这些对象通过原型属性相互连接。

### 基本概念

1. **原型对象 (Prototype Object)**：
   - 每个 JavaScript 对象（除了 `null`）都有一个关联的对象，称为原型对象。
   - 对象可以通过原型对象继承属性和方法。

2. **`__proto__` 属性**：
   - 每个对象都有一个 `__proto__` 属性，指向其原型对象。
   - 这个属性是访问内部 `[[Prototype]]` 的方法。

3. **`prototype` 属性**：
   - 每个函数（包括构造函数）都有一个 `prototype` 属性，这个属性指向一个对象，即该构造函数创建的实例的原型。

### 示例代码

```javascript
// 定义一个构造函数
function Person(name) {
  this.name = name;
}

// 在 Person 的原型上添加方法
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

// 创建一个实例
const alice = new Person('Alice');

// 访问实例属性和原型方法
console.log(alice.name); // 输出：Alice
alice.sayHello(); // 输出：Hello, my name is Alice

// 检查实例的原型
console.log(alice.__proto__ === Person.prototype); // 输出：true
```

### 原型链的工作原理

当访问一个对象的属性或方法时，JavaScript 引擎会首先在该对象本身查找。如果找不到，它会沿着原型链向上查找，直到找到该属性或到达原型链的末尾（即 `null`）。

```javascript
// 定义一个构造函数
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

// 定义另一个构造函数
function Dog(name, breed) {
  Animal.call(this, name); // 继承属性
  this.breed = breed;
}

// 继承方法
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} is barking`);
};

// 创建一个实例
const rover = new Dog('Rover', 'Labrador');

// 访问属性和方法
console.log(rover.name); // 输出：Rover
console.log(rover.breed); // 输出：Labrador
rover.eat(); // 输出：Rover is eating
rover.bark(); // 输出：Rover is barking

// 检查实例的原型链
console.log(rover.__proto__ === Dog.prototype); // 输出：true
console.log(rover.__proto__.__proto__ === Animal.prototype); // 输出：true
console.log(rover.__proto__.__proto__.__proto__ === Object.prototype); // 输出：true
console.log(rover.__proto__.__proto__.__proto__.__proto__ === null); // 输出：true
```

## **模块 (ES6)**
   - **导出和导入**
     ```javascript
     // 导出
     export const name = 'John';
     export function greet() {
       return 'Hello';
     }

     // 导入
     import { name, greet } from './module';
     ```

## **Promise (ES6)**
   ```javascript
   let promise = new Promise((resolve, reject) => {
     let success = true;
     if (success) {
       resolve('Success');
     } else {
       reject('Error');
     }
   });

   promise
     .then(result => console.log(result))
     .catch(error => console.log(error));
   ```

## **异步函数 (ES8)**
   ```javascript
   async function fetchData() {
     try {
       let response = await fetch('https://api.example.com/data');
       let data = await response.json();
       console.log(data);
     } catch (error) {
       console.log(error);
     }
   }
   ```
