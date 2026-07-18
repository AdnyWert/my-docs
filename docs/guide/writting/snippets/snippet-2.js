// JavaScript (JS) 是一种广泛用于网页开发的编程语言，同时也是许多其他应用程序和服务的后端脚本语言。在开发过程中，有一些常用的代码片段和模式，可以极大地提高开发效率。以下是一些最常用的JS代码片段：

// 1. 变量声明

let name = "Alice"; // ES6引入，用于声明变量
const age = 30; // 用于声明常量
var message = "Hello, World!"; // 传统方式，但不建议在现代JS中使用

// 2. 条件判断

if (age > 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// 3. 循环

// For循环

for (let i = 0; i < 5; i++) {
    console.log(i);
}
// ```

// For...Of循环（用于数组或其他可迭代对象）

const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
    console.log(fruit);
}

// While循环

let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// 4. 函数定义

function sayHello(name) {
    console.log("Hello, " + name);
}
sayHello("Alice"); // 输出: Hello, Alice


// 5. 箭头函数（ES6）

const sayHello = (name) => {
    console.log("Hello, " + name);
};
sayHello("Alice"); // 输出: Hello, Alice

// 或者更简洁的形式：
const sayHello = name => console.log("Hello, " + name);

// 6. 数组操作

// 创建数组

const numbers = [1, 2, 3, 4, 5];

// 添加元素到数组末尾
numbers.push(6); // numbers现在是[1, 2, 3, 4, 5, 6]

// 移除数组末尾元素

numbers.pop(); // numbers现在是[1, 2, 3, 4, 5]

// 遍历数组元素（使用map）
const doubled = numbers.map(num => num * 2); // doubled是[2, 4, 6, 8, 10]

// 7. DOM操作（例如，修改页面内容）
document.getElementById("myElement").innerHTML = "Hello, World!"; // 获取元素并修改其内容

// 或者使用`querySelector`：
document.querySelector(".myClass").textContent = "Hello, World!"; // 通过CSS选择器获取元素并修改其文本内容

// 8. AJAX请求（使用Fetch API）

fetch('https://api.example.com/data')
  .then(response => response.json()) // 将响应转换为JSON格式的Promise对象。返回一个Promise对象。
  .then(data => console.log(data)) // 处理JSON数据。返回一个Promise对象。再次处理返回的数据。

