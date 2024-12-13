---
title: Symbol使用
---

`Symbol` 是 ES6 (ECMAScript 2015) 中引入的一种新的原始数据类型。每个从 `Symbol` 构造函数返回的 `Symbol` 值都是唯一的。`Symbol` 的主要用途是为对象属性提供唯一的标识符，以避免属性名的冲突。

## 创建 Symbol

可以通过调用 `Symbol` 函数创建一个新的 Symbol。注意，`Symbol` 是原始类型，不是对象，所以不能使用 `new` 关键字。

```javascript
let sym1 = Symbol();
let sym2 = Symbol('description');
let sym3 = Symbol('description');

console.log(sym1); // Symbol()
console.log(sym2); // Symbol(description)
console.log(sym2 === sym3); // false
```

## Symbol 的描述

Symbol 可以有一个可选的字符串描述，这个描述仅用于调试，不影响其唯一性。

```javascript
let sym = Symbol('mySymbol');
console.log(sym.description); // 输出: 'mySymbol'
```

## 使用 Symbol 作为对象属性

Symbol 通常用于为对象定义唯一的属性，避免属性名冲突。

```javascript
let mySymbol = Symbol();

let obj = {
  [mySymbol]: 'value'
};

console.log(obj[mySymbol]); // 输出: 'value'
```

## 遍历对象中的 Symbol 属性

默认情况下，`for...in` 循环和 `Object.keys` 方法无法枚举对象的 Symbol 属性。不过，可以使用 `Object.getOwnPropertySymbols` 方法获取对象的所有 Symbol 属性。

```javascript
let mySymbol = Symbol();
let obj = {
  [mySymbol]: 'value',
  prop: 'property'
};

// 使用 for...in 不能枚举 Symbol 属性
for (let key in obj) {
  console.log(key); // 输出: 'prop'
}

// 使用 Object.keys 也不能枚举 Symbol 属性
console.log(Object.keys(obj)); // 输出: ['prop']

// 使用 Object.getOwnPropertySymbols 可以获取 Symbol 属性
console.log(Object.getOwnPropertySymbols(obj)); // 输出: [Symbol()]
```

## 内建 Symbol

内建 Symbol 是 JavaScript 中的一种特殊类型的 Symbol，提供了一些内置的行为和特性。这些内建 Symbol 可以用来改变对象的默认行为。以下是一些常见的内建 Symbol 及其用法。

### `Symbol.iterator`

用于定义对象的默认迭代器。一个对象要被 `for...of` 循环迭代，它必须实现 `Symbol.iterator` 方法。

```javascript
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        if (step <= 2) {
          return { value: step++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (let value of iterable) {
  console.log(value); // 输出: 0, 1, 2
}
```

### `Symbol.toPrimitive`

用于定义对象被转换为原始值时的行为。该方法接收一个提示参数（`hint`），表示转换的上下文，可以是 `"number"`、`"string"` 或 `"default"`。

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 10;
    }
    if (hint === 'string') {
      return 'hello';
    }
    return true;
  }
};

console.log(+obj); // 输出: 10
console.log(`${obj}`); // 输出: hello
console.log(obj + ''); // 输出: true
```

### `Symbol.toStringTag`

用于自定义对象的 `Object.prototype.toString` 方法的返回值。

```javascript
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyClass';
  }
}

const instance = new MyClass();
console.log(Object.prototype.toString.call(instance)); // 输出: [object MyClass]
```

### `Symbol.hasInstance`

用于自定义 `instanceof` 运算符的行为。

```javascript
class MyClass {
  static [Symbol.hasInstance](instance) {
    return instance instanceof Array;
  }
}

console.log([] instanceof MyClass); // 输出: true
console.log({} instanceof MyClass); // 输出: false
```

### `Symbol.species`

用于定义一个对象的构造函数，用于派生对象。

```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const myArr = new MyArray(1, 2, 3);
const mappedArr = myArr.map(x => x * x);

console.log(mappedArr instanceof MyArray); // 输出: false
console.log(mappedArr instanceof Array); // 输出: true
```

### `Symbol.match`

用于定义字符串匹配时的自定义行为。

```javascript
class MyMatcher {
  static [Symbol.match](str) {
    return str.includes('hello');
  }
}

console.log('hello world'.match(MyMatcher)); // 输出: true
console.log('goodbye'.match(MyMatcher)); // 输出: false
```

### `Symbol.replace`

用于定义字符串替换时的自定义行为。

```javascript
class MyReplacer {
  static [Symbol.replace](str, replacement) {
    return str.split('hello').join(replacement);
  }
}

console.log('hello world'.replace(MyReplacer, 'hi')); // 输出: hi world
```

### `Symbol.search`

用于定义字符串搜索时的自定义行为。

```javascript
class MySearcher {
  static [Symbol.search](str) {
    return str.indexOf('hello');
  }
}

console.log('hello world'.search(MySearcher)); // 输出: 0
console.log('goodbye'.search(MySearcher)); // 输出: -1
```

### `Symbol.split`

用于定义字符串拆分时的自定义行为。

```javascript
class MySplitter {
  static [Symbol.split](str) {
    return str.split(' ');
  }
}

console.log('hello world'.split(MySplitter)); // 输出: ['hello', 'world']
```

### `Symbol.isConcatSpreadable`

用于自定义对象在数组 `concat` 方法中的行为。

```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
arr2[Symbol.isConcatSpreadable] = false;

console.log(arr1.concat(arr2)); // 输出: [1, 2, [3, 4]]
```