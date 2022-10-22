---
title: 生成器（Generator）
author: RYGrit
date: '2022-10-22'
---

## 什么是生成器

:::tip
回顾：平时的普通函数，通常是使用 `return` 或者 `throw` 来结束函数的执行。
:::

生成器是 ES6 中新增的一个特性，它是一种新的**函数控制**的方式，可以在**函数内部暂停执行**，然后在需要的时候再**恢复执行**。
生成器是一种特殊的函数，它可以返回多个值。生成器函数会返回一个生成器对象，该对象可以通过 `next()` 方法来获取值。

## 生成器函数和普通函数的区别

1. 生成器函数需要在 `function` 关键字后面加上 `*`
2. 生成器函数可以通过 `yield` 关键字来控制函数的执行，`yield` 关键字可以返回一个值，也可以不返回值
3. 生成器函数的返回值是一个生成器对象，生成器实际上是一种特殊的迭代器 [查阅 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

## 语法

```js
function* name([param[, param[, ... param]]]) {statements}
```

- `name` - 函数名
- `param` - 要传递给函数的一个参数名称，一个函数最多可以有 255 个参数
- `statements` - 普通的 JS 语句

## 执行过程

调用一个生成器函数并不会马上执行函数体中的语句，而是返回一个生成器的迭代器对象。当这个迭代器的 `next()` 方法被首次（后续）调用时，其内的语句会执行到一个（后续）出现 `yield` 的位置为止，`yield` 后紧跟迭代器要返回的值。

`next()`方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 `yield` 表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有 `yield` 语句，即生成器函数是否已经执行完毕并返回。

```js
function* foo() {
  console.log('1111')
  console.log('2222')
  yield
  console.log('3333')
  console.log('4444')
  yield
  console.log('5555')
  console.log('6666')
}

const generator = foo() // 不会马上执行函数，没有打印任何东西
generator.next() // 1111 2222
generator.next() // 1111 2222 3333 4444
generator.next() // 1111 2222 3333 4444 5555 6666
```

## 参数和返回值

生成器函数的参数，是在调用其迭代器对象的`next()`方法传入的，通过 `yield` 语句左边的变量接收。需要注意的是，如果需要给第一个 `yield` 语句之前的代码传参，就需要将参数传给生成器函数，而不是迭代器对象的 `next()` 方法。请看下面的例子：

```js
function* foo(first) {
  console.log('函数内部: 1111', first)
  console.log('函数内部: 2222', first)
  const second = yield 'ok'

  console.log('函数内部: 3333', second)
  console.log('函数内部: 4444', second)
  const third = yield 'again ok'
  console.log('函数内部: 5555', third)
  console.log('函数内部: 6666', third)
  return '函数内部: 7777'
}

const generator = foo('first arg')

generator.next()
generator.next('second arg')
generator.next('third arg')

// 函数内部: 1111 first arg
// 函数内部: 2222 first arg
// 函数内部: 3333 second arg
// 函数内部: 4444 second arg
// 函数内部: 5555 third arg
// 函数内部: 6666 third arg
```

生成器函数的返回值，是通过调用其迭代器对象的 `next()`方法，遇到一个`yield`语句时，返回的对象的 `value` 属性的值。
当在生成器函数中显式 `return` 时，会导致生成器立即变成完成状态，即调用`next()`方法返回的对象的 done 属性为 true。如果`return`后面跟了一个值，那么这个值会作为当前调用`next()`方法返回的 value 值。请看下面的例子：

```js
function* foo() {
  console.log('函数内部: 1111')
  console.log('函数内部: 2222')
  yield 'ok'
  console.log('函数内部: 3333')
  console.log('函数内部: 4444')
  return 'again ok'
  console.log('函数内部: 5555')
  console.log('函数内部: 6666')
  return '函数内部: 7777'
}

const generator = foo()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())

// 函数内部: 1111
// 函数内部: 2222
// { value: 'ok', done: false }
// 函数内部: 3333
// 函数内部: 4444
// { value: 'again ok', done: true }
// { value: undefined, done: true }
```

## return 和 throw 方法

```js
function* foo() {
  console.log('1111')
  yield
  console.log('2222')
  yield
  console.log('3333')
  return undefined
}
const generator = foo()
```

:::warning 思考一下
上面函数需要执行几次才能结束？
:::

:::details 浅看一下
以上函数需要调用三次`next()`方法才能结束

```js
console.log(generator.next()) // 1111 { value: undefined, done: false }
console.log(generator.next()) // 2222 { value: undefined, done: false }
console.log(generator.next()) // 3333 { value: undefined, done: true }
```

:::

:::warning 提问
那么如何中断生成器函数执行呢？
:::

:::details 瞄一眼

1. 通过`return()`方法，`return()`方法也可以传入一个参数，作为`yield`表达式的返回值

```js
function* foo() {
  console.log('1111')
  const res = yield
  console.log('2222', res)
  yield
  console.log('3333')
  return undefined
}

const generator = foo()
console.log(generator.next())
console.log(generator.return('return'))

// 1111 { value: undefined, done: false }
// { value: return, done: true }
```

2. 通过`throw()`方法，`throw()`方法可以抛出一个错误，然后在`yield`表达式处捕获

```js
function foo() {
  console.log('1111')
  const res = yield
  console.log('2222', res)
  yield
  console.log('3333')
  return undefined
}

const gengerator = foo()
console.log(gengerator.next())
console.log(gengerator.throw('throw'))

// 1111 { value: undefined, done: false }
// Uncaught throw
```

:::

## 生成器替换迭代器

通过工厂函数自定义生成迭代器对象，是一种常见的模式。
下面是一个生成迭代器对象的工厂函数，另一个是一个生成器函数，它们的功能是一样的。

```js
// 不采用生成器的原始方式
function createIterator1(arr) {
  let index = 0
  const iterator = {
    next: function () {
      if (index < arr.length) {
        return { value: arr[index++], done: false }
      } else {
        return { done: true }
      }
    }
  }
  return iterator
}

// 采用生成器的方式
function* createIterator2(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}
```

在一个自定义类中，定义一个生成器函数，可以让这个类的实例对象变成可迭代对象。下面 Person1 是通过原始方式实现的，Person2 是通过生成器函数实现的。

```js
// 给一个自定义类添加迭代器，不采用生成器的原始方式
class Person1 {
  constructor(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
  }

  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if (index < this.friends.length) {
          return { value: this.friends[index++], done: false }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}

// 采用生成器的方式
class Person2 {
  constructor(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.friends.length; i++) {
      yield this.friends[i]
    }
  }
}
```

从上面的代码可以看出，使用生成器函数，可以让代码更加简洁。
:::warning 注意
在没有函数签名的方法中，需要将`*`放在`[Symbol.iterator]`前面，否则会报错
:::

## yield\* 语句

`yield*` 后面只能跟一个**可迭代对象**，它会调用这个可迭代对象的迭代器对象的`next()`方法，将返回值返回给生成器函数。参考下面的例子，加深理解

```js
// 使用 yield 语法糖
class Person {
  constructor(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
  }

  *[Symbol.iterator]() {
    yield* this.friends
  }
}

const person = new Person('grit', 18, ['jack', 'rose', 'tom'])
const pIterator = person[Symbol.iterator]()
console.log(pIterator.next())
console.log(pIterator.next())
console.log(pIterator.next())

// for (const friend of person) {
//   console.log(friend)
// }

// { value: 'jack', done: false }
// { value: 'rose', done: false }
// { value: 'tom', done: false }
```
