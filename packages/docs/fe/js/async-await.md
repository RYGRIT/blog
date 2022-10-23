---
title: 异步编程
author: RYGrit
date: '2022-10-23'
---

## 异步函数

:::details 回顾一下
先看看前面学到的函数写法，如下:

```js
// 普通函数
function foo() {}
const bar = function () {}
// 箭头函数
const baz = () => {}

// 生成器函数
function* gen() {}
```

:::

什么是异步函数呢？异步函数就是使用`async`关键字声明的函数。它有以下特点：

1. 在函数内部可以使用`await`关键字
2. 函数返回值是一个`Promise`对象

接下来，我们来学习一下异步函数的写法，如下:

```js
// 异步函数的写法
async function foo() {}
const bar = async function () {}
const baz = async () => {}
class Person {
  // async关键字可以放在方法名之前
  async sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }
}
```

可见，异步函数的写法和普通函数的写法几乎一样，只是在函数名前面加了`async`关键字。

### 返回值

下面我们再来说说异步函数的返回值，分为以下几种情况:

1. 返回一个普通值（用的最多）

```js
async function foo() {
  // return Promise.resolve(123)
  return 123
}

foo().then((res) => {
  console.log(123) // 123
})
```

这种情况可以等价的理解为返回一个`Promise.resolve(123)`，此时的`Promise`状态为`resolved`。

2. 返回一个新的`Promise`对象

```js
async function bar() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(456)
      // reject(456)
    }, 3000)
  })
}

bar()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

// resolve(456): 3 秒后输出 456
// reject(456): 3 秒后输出 Uncaught (in promise) 456
```

这种情况下，会根据返回的新`Promise`的状态来决定后续是执行`then`还是`catch`。

3. 返回一个`thenable`对象

```js
async function baz() {
  return {
    then: function (resolve, reject) {
      setTimeout(() => {
        resolve(789)
      }, 3000)
    }
  }
}

baz().then((res) => {
  console.log(res) // 3 秒后输出 789
})
```

这种情况下，会执行`thenable`对象的`then`方法，然后根据`then`方法的结果来决定后续是执行`then`还是`catch`。

### 异常处理

异步函数中的异常处理，也是和普通函数一样的，都是会中断函数的。只是需要注意的是，如果在异步函数中抛出异常，那么这个异常会被`Promise`捕获，所以需要使用`catch`来捕获异常。

```js
async function foo() {
  console.log('---1')
  console.log('---2')
  throw new Error('出错了')
  console.log('---3')
}

foo()
  .then((res) => {})
  .catch((err) => {
    console.log(err)
  })

// ---1
// ---2
// Error: 出错了
```

### await 操作符

`await`操作符可以用于等待一个`Promise`对象，它只能在异步函数中使用。
它的后面可以跟一个`Promise`对象、任何要等待的值或者一个普通值，在这里我将这三种情况统称为`await 表达式`。

`await 表达式`会暂停当前异步函数的执行，等待`Promise`处理完成。

若`Promise`正常处理（fulfilled），其回调函数 resolve 函数参数作为`await 表达式`的值，继续执行异步函数。
请看下面例子：

```js
function requestData(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`请求到的数据是：${name}`)
    }, 3000)
  })
}

// 1.如果 Promise 正常处理，await 会返回 Promise 的结果
async function foo() {
  const data = await requestData('grit')
  console.log(data)
}

foo() // 3秒后输出：请求到的数据是：grit
```

若`Promise`处理异常（rejected），`await 表达式`会把 Promise 的异常原因抛出。请看下面例子：

```js
function requestData(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求失败')
    }, 3000)
  })
}

// 2.如果 Promise 处理失败，await 会抛出异常
async function foo() {
  const data = await requestData('grit')
  console.log(data)
}

foo() // 3秒后，Uncaught (in promise) 请求失败
```

另外，await 操作符后面跟着一个普通值，则返回该值本身。请看下面例子：

```js
// 3. await 普通值，await 会把值转换为已正常处理的 Promise，然后返回其结果
async function foo() {
  const data = await 'grit'
  console.log(data)
}

foo() // grit
```
