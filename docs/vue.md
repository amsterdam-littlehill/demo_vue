# Vue.js使用教程

<!-- toc -->

## Vue是什么

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架** ,它只聚焦**视图层** ，用于构建 **数据驱动** 的Web界面。

## Vue特性

1.**轻量**：体积小，不依赖其他库

2.**数据绑定**：

3.**指令**：有内置的简单指令 `v-*`，也可以自定义指令

4.**插件化**：本身不包含 `router`，`Ajax` ，`form validator` 等功能，通过按需引入插件来实现。

## Vue与其他框架对比

| 特性             | React          | Angular                                                | vUE                           |
| ---------------- | -------------- | ------------------------------------------------------ | ----------------------------- |
| 指令             | ×              | √                                                      | √                             |
| 过滤器           | ×              | √                                                      | √                             |
| 双向绑定         | ×              | √                                                      | √                             |
| 浏览器支持       | ie9+           | v1.3 ie8+ <br/>v1.2 ie8                                | Vue **不支持** IE8 及以下版本 |
| 学习成本         | 高             | 高                                                     | 较简单                        |
| 使用 Virtual DOM | √              | ×                                                      | √                             |
| 组件             | √              |                                                        | √                             |
| 语法标准         | Javascript ES6 | TypeScript                                             | Javascript ES5 或 ES6         |
| 模板             | JSX            | 用特殊的 Angular 语法（比如 ngIf 或 ngFor）来增强 HTML | .vue                          |

## 安装

1.引入script方式

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

2.npm

环境要求：

> node 版本>= 6.0.0
>
> npm 版本>= 3.0.0

```shell
# 最新稳定版
$ npm install vue
```

3.脚手架-快速搭建 （请自行阅读vue cli [文档](https://cli.vuejs.org/guide/)）

## 插件 Vue.js devtools

 **Vue.js devtools** 是一款调试vue应用的浏览器插件。

![](https://raw.githubusercontent.com/vuejs/vue-devtools/master/media/screenshot-shadow.png)

![](https://raw.githubusercontent.com/vuejs/vue-devtools/master/media/demo.gif)

[Chrome插件](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) （chrome插件安装需翻墙，如无法翻墙请前往此处[下载](http://eip.teamshub.com/t/3621081)）

[Firefox插件下载](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Hello World 

> 本教程代码大多使用script方式引入vue.js实现

```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            {{message}}
        </div>
    </body>
    <script>
        // vue实例
        new Vue({ 
            el: '#app',
            data: {
                message: 'Hello world'
            }
        });
    </script>
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }
    </style>
</html>
```

[Try it](https://codepen.io/amsterdam0626/pen/jKjBWo) [Hello_world2](https://scrimba.com/c/cWDDLhJ)

## vue实例

!> **待补充**

## 指令

指令 (Directives) 是带有 `v-` 前缀的特殊特性。指令特性的值预期是**单个 JavaScript 表达式**(`v-for` 是例外情况，稍后我们再讨论)。指令的作用是，当表达式的值发生变化时，将这个变化也反应到dom上。例如：`<div v-if="show">ddd</div>` ，当`show` 为 **true** 时，展示 `ddd`，否则不展示。还有一些语法稍有不同。

一些指令能够接收一个“参数”，在指令名称之后以冒号表示 ，如`v-bind`指令 

```vue
<a v-bind:href="url">百度一下</a>
```

修饰符 (Modifiers) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`： 

```vue
<a v-on:click.prevent="doSomething">...</a>
```

Vue.js 为 `v-bind` 和 `v-on` 这两个最常用的指令，提供了特定简写： 

```vue
<!-- 完整语法 -->
<a v-bind:href="url">...</a>
<!-- 缩写 -->
<a :href="url">...</a>

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>
<!-- 缩写 -->
<a @click="doSomething">...</a>
```

### 内部指令

![内部指令](http://on-img.com/chart_image/5b3f2010e4b054aa54aa4cd7.png?_=1530863703209)

#### v-if & v-else-if & v-else & v-show

**v-if** 指令可以根据表达式的值在DOM中 **生成或移除** 一个元素。如果表达式的值为**false** ,那么对应的元素就会从DOM中移除；否则，对应元素的一个克隆将被重新插入DOM中。

示例代码：

```vue
<div id="app">   
    <p v-if="show">Hello</p>
    <p v-if="notshow">You cant`t see</p>
</div>
<script>
    let vm=new Vue({
       el:"#app",
       data(){
           return {
               show:true,
               notshow:false
           }   
        }
    });
</script>
```

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上 。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。 **最终的渲染结果将不包含它**。

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

**v-else-if** 顾名思义，就是Javascript中的 else-if ，它必须跟着 **v-if**,**v-else**,充当else if 功能，可以连续使用 ;v-else 即为 else。必须紧跟在 **v-if** 或者 **v-else-if** 元素的后面 。

```vue
<div id="app">
    <p v-if="score < 60">不及格</p>
	<p v-else-if="score === 60">及格</p>
	<p v-else-if="score === 70">中等</p>
    <p v-else-if="score === 80">良好</p>
	<p v-else>优秀</p>
</div>
<script>
    let vm=new Vue({
       el:"#app",
       data(){
           return {
               score:60
           }   
        }
    });
</script>
```

[Try it](https://codepen.io/amsterdam0626/pen/ParOGp)

**v-show** 根据表达式的值来 **显示或隐藏** HTML元素。当表达式的值为 **false** 时，元素将被隐藏，该元素将增加CSS 属性`style="display:none"`。

示例代码：

```vue
<div id="app">
    <p v-show="flag">Hello</p>
    <button @click="toggleDisplay">切换显示隐藏</button>
</div>
<script>
    let vm=new Vue({
       el:"#app",
       data(){
           return {
               flag:true
           }   
        },
        methods:{
            toggleDisplay(){
                this.flag=!this.flag
            }
        }
    });
</script>
```

> v-show 不支持  `<template>` 语法

[Try it](https://codepen.io/amsterdam0626/pen/GGbyZd)

**v-if** vs **v-show**

|                          | v-if                                                         | v-show                                  |
| ------------------------ | ------------------------------------------------------------ | --------------------------------------- |
| **控制元素显示隐藏方式** | 添加或者删除DOM元素                                          | 设置DOM元素的display样式属性            |
| **编译过程**             | 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件 | 基于css切换                             |
| **编译条件**             | 惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存。编译被缓存后，然后再切换的时候进行局部卸载) | 始终被编译，然后被缓存，而且DOM元素保留 |
| **性能消耗**             | 切换消耗高                                                   | 初始渲染消耗高                          |
| **使用场景**             | 运行时条件不大可能变化                                       | 需要频繁切换时                          |


#### v-model

用来在 input，select,text,checkbox,radio 等表单控件上创建双向数据岗顶。根据控件类型v-model自动选项正确的方法来更新元素。

实例代码：

```vue
<div id="app">
    <form>
  姓名：
  <input type="text" v-model="data.name"> {{ data.name }}
  <br>
  性别：
  <input type="radio" id="man" value="男" v-model="data.sex"><label for="man">男</label>
  <input type="radio" id="nv" value="女" v-model="data.sex"><label for="nv">女</label>{{ data.sex }}
  <br>
  兴趣：
  <input type="checkbox" id="a" value="book" v-model="data.interest"><label for="a">阅读</label>
  <input type="checkbox" id="b" value="swim" v-model="data.interest"><label for="b">游泳</label>
  <input type="checkbox" id="c" value="game" v-model="data.interest"><label for="c">打游戏</label>
  <input type="checkbox" id="d" value="song" v-model="data.interest"><label for="d">唱K</label>
  {{ data.interest }}
  <br>
  身份：
  <select v-model="data.identity">
    <option value="teacher">老师</option>
    <option value="doctor">医生</option>
    <option value="lawyer">律师</option>
  </select>
  {{ data.identity }}
</form>
<script>
  var Main = {
    data () {
      return {
        data:{
          name:'',
          sex:'',
          interest:[],
          identity:''
        }
      }
    }
  }
  var Ctor = Vue.extend(Main)
  new Ctor().$mount('#app')
</script>
</div>
```

[Try it](https://codepen.io/amsterdam0626/pen/ERBoMv)

1.添加 **number**特性可以将用户的输入自动转换为 **Number** （如果转换后为 **NaN** ，则返回原值）`<input v-model.lazy="name">`

2.在默认情况下，**v-model** 在 input 事件中同步输入框的值与数据，我们可以添加一个lazy特性，从而将数据改到在change事件中发生。**相当于双向绑定失效** 
 
 [Try it](https://codepen.io/amsterdam0626/pen/jKjKPq)

 ```vue
<div id="app">
  <input type="text" v-model.lazy="msg"> <br>
  {{ msg }}
  <script>
    let vm=new Vue({
      el:'#app',
      data(){
        return {
          msg:'内容是在change事件后改变的'
        }
      }
    })
  </script>
</div>
 ```
 
 
#### 插值 （v-text）

文本插值是最基本的形式，使用双大括号 `{{}}` （类似于Mustache）书写。双大括号会把里面的值全部当做 **字符串** 来处理。

```vue
<span>{{message}}</span>
```
例子中的标签 `message` 与数据对象`message` 属性的值相对应，数据与dom已经关联，修改 `message`的值，插值处的内容也将更新。

在浏览器控制台输入 ，观察页面插值处是否发生变化：

```javascript
vm.$data.message="Changed!"
```

注意：**此处为单向绑定，数据对象上的值改变，插值会发生变化；但是当插值发生变化并不会影响数据对象的值。其中：``v-text``可以简写为``{{}}``,并且支持逻辑运算。** 

> `{{}}`只会将数据当做 **字符串** 处理，HTML渲染 请使用指令 `v-html`
> 使用`{{ msg }}`插值有一个弊端，网速慢或者页面语法错误的时候，页面会出现`{{ msg }}`的文字.

指令 `v-once` 可以通过v-once与v-text结合，实现仅执行一次性的插值 。

```vue
<span v-once>这个将不会随msg属性的改变而改变: {{ msg }}</span>
```

`{{}}` 支持 **JavaScript 表达式** ，如`{{ number + 1 }}`表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析 。有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效。 **千万不要写`{{number ++}}`**

```vue
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

类似于Linux中的管道，Vue.js 允许在表达式后面添加过滤符 `|` 

```vue
<span>{{filterStr | capitalize}}</span>

<script>
let vm = new Vue({
  el: "#app",
  data: {
    filterStr:"abcdefg"
  },
  // 过滤器
  filters: {
  /**
   * 首字母大写
   * @param value
   * @returns {string}
   */
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
});
</script>
```

Vue.js提供了许多内置的过滤器，对此之后会详细介绍。

[Try it](https://codepen.io/amsterdam0626/pen/MXMmNX)

### 未完待续
