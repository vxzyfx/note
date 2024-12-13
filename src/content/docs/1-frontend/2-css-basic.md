---
title: CSS 基础
---

## 什么是CSS?

CSS (Cascading Style Sheets) 层叠样式表, 用于设置网页的外观(网页的整容医生)

## CSS 语法
```css
h1 { /* h1 是选择器 */
  color: red; /* 颜色设置成红色(字体颜色) */
  font-size: 5em; /* 字体大小5em */
}
```

HTML模版

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>开始学习 CSS</title>
  </head>

  <body>
    <h1>我是一级标题</h1>

    <p>
      这是一个段落文本。在文本中有一个 <span>span element</span> 并且还有一个
      <a href="http://example.com">链接</a>.
    </p>

    <p>这是第二段。包含了一个 <em>强调</em> 元素。</p>

    <ul>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 <em>三</em></li>
    </ul>
  </body>
</html>

```

### 如何使用CSS
1. HTML链接CSS文件

创建文件style.css
```css [style.css]
h1 {
  color: red;
  font-size: 5em;
}
```

修改html模版
```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>开始学习 CSS</title>
    <link rel="stylesheet" href="styles.css" /> <!-- 引入CSS -->
  </head>

  <body>
    <h1>我是一级标题</h1>

    <p>
      这是一个段落文本。在文本中有一个 <span>span element</span> 并且还有一个
      <a href="http://example.com">链接</a>.
    </p>

    <p>这是第二段。包含了一个 <em>强调</em> 元素。</p>

    <ul>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 <em>三</em></li>
    </ul>
  </body>
</html>

```

2. 内联CSS

```html
<div style="background: red"></div>
```
3. 嵌入

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>开始学习 CSS</title>
    <style>
        h1 {
            color: red;
            font-size: 5em;
        }
    </style>
  </head>

  <body>
    <h1>我是一级标题</h1>

    <p>
      这是一个段落文本。在文本中有一个 <span>span element</span> 并且还有一个
      <a href="http://example.com">链接</a>.
    </p>

    <p>这是第二段。包含了一个 <em>强调</em> 元素。</p>

    <ul>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 <em>三</em></li>
    </ul>
  </body>
</html>

```

4. 导入
```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>开始学习 CSS</title>
    <style>
        @import url(style.css);
    </style>
  </head>

  <body>
    <h1>我是一级标题</h1>

    <p>
      这是一个段落文本。在文本中有一个 <span>span element</span> 并且还有一个
      <a href="http://example.com">链接</a>.
    </p>

    <p>这是第二段。包含了一个 <em>强调</em> 元素。</p>

    <ul>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 <em>三</em></li>
    </ul>
  </body>
</html>
```

### 选择器

> 选择器用于标识当前规则应用于与那些HTML元素. 

1. 类型选择器
```css
h1 { /* HTML元素的标签 */
}
```

2. 类选择器

类选择器方便复用CSS的规则

```css
.box { /* box 是类名 */
}
```

使用`box`类名

```html
<div class="box"></div>
```

3. id选择器

id在一个页面只能有一个

```css
#unique { /* unique是id */  
}
```

使用`unique`id

```html
<div id="unique"></div>
```

4. 属性选择器

根据元素上的属性是否存在选择元素

```css
a[title] { /* a标签上有title属性, title的值不确定 */ 
}
a[title="user"] { /* a标签上有title属性, title的值要是user */ 
}
a[title~="u"] { /* a标签上有title属性, title的值至少包含u, 如果有多个值用空格分割 */ 
}
a[title|="u"] { /* a标签上有title属性, title的值可以是u, 或者是以u开始的后接连字符, 如u-test, title不能有多个值 */ 
}

a[title^="u"] { /* a标签上有title属性, title的值以u开头, title可以有多个值 */ 
}

a[title$="u"] { /* a标签上有title属性, title的值以u结尾, title可以有多个值 */ 
}
a[title*="u"] { /* a标签上有title属性, title的值包含至少一个u */ 
}
```
属性的匹配默认是大小写敏感的, 如果要使用大小写不敏感进行匹配, 在中括号中添加i

```css
li[class^="a" i] {
  color: red;
}
```
5. 伪类选择器

伪类用于指定元素的特殊样式

```css
a:hover {
  color: red;
}
```

| 名称 | 通常适用元素 | 作用 |
| :-- | :-- | :-- |
| active | a, button | 鼠标按键按下到松开的时间(可能被后面的伪类覆盖`如link, hover, visited`, 要使用active保证顺序(`link-visited-hover-active`) ) |
| any-link | a, area | 超链接锚点的元素(有href属性的a或area标签), 匹配所有匹配`link`和`visited`的元素 |
| autofill | input | 在浏览器自动填充表单中的input元素时匹配该input, 如果用户编辑了, 将不再匹配该input(为保证兼容同时添加`-webkit-autofill`伪类) |
| blank | input, textarea | 选择用户为空的输入框 |
| buffering | audio, video | 当可播放元素正在缓冲媒体资源时, 选择可播放的元素(buffering匹配时, playing也匹配) |
| checked | input type=radio, input type=checkbox, select中的option | 选中使用的元素的选中状态 |
| current | 所有 | 表示当前正在显示的元素或元素的父元素 |
| default | button,input type=radio, input type=checkbox, select中的option | 具有默认值的元素 |
| define | 所有元素 | 任何以定义的元素,包括自定义元素 |
| dir | 所有元素 | 匹配特定的文字书写方向的元素 |
| disabled | 所有元素 | 任何被禁用的元素 |
| empty | 所有元素 | 选择不包含任何子元素的元素 |
| enabled | 所有元素 | 任何已启用的元素 |
| first | 所有元素 | 与@page一起使用选择打印的第一页, 只能修改margin, orphans, windows, 分页符, 修改margin时只能使用绝对单位 |
| first-child | 所有元素 | 选择一组兄弟元素中的第一个元素 |
| first-of-type | 所有元素 | 表示一组兄弟元素中其类型的第一个元素 |
| focus | 所有元素 | 表示获得焦点的元素 |
| focus-visible | 所有元素 | 匹配focus伪类, 并且浏览器的启发引擎决定焦点可见时 |
| focus-within | 所有元素 | 当元素或元素的后代元素聚焦时 |
| fullscreen | 所有元素 | 处于全屏模式的所有元素 |
| future | 所有元素 | 匹配完全出现在与current匹配的元素后的任何元素 |
| has | 所有元素 | 如果作为参数的相对选择器选中元素时, 至少匹配一个元素, 提供选中父元素或先前兄弟元素的方法 |
| host | 内部使用了该CSS的影子DOM的影子宿主 | 从影子DOM中选择自定义元素 |
| host-content |  |  |
| hover | 所有元素 | 指针设备与元素交互时选中 |
| in-range | input | 其值在min和max之间 |
| indeterminate | input type=radio, input type=checkbox, 不确定状态的progress | 状态不确定的表元素 |
| invalid | form, fieldset, input等表单元素 | 选中未通过验证的表单元素 |
| is | 所有元素 | 伪类函数, 选中参数列表中任意一个可以选择的元素 |
| lang | 所有元素 | 选中参数语言的元素 |
| last-child | 所有元素 | 选择一组兄弟元素中的最后元素 |
| last-of-type | 所有元素 | 父类子元素列表中, 最后一个给定类型的元素 |
| left | 无 | 与@page配合, 选中打印文档的左侧页 |
| link | a, area | 具有href属性并且已访问的a或area元素 |
| local-link | a, area | 与link类似,但是href要指向同一文档链接 |
| modal | 所有元素 | 匹配处于排除与外部元素所有交互的元素, 直到交互消除 |
| muted | audio, video | 处于静音状态 |
| not | 所有元素 | 匹配不符合一组选择器的元素 |
| nth-child | 所有元素 | 根据元素在父元素的子元素列表的索引来选择元素 |
| nth-last-child | 所有元素 | 从兄弟元素节点中从后往前的索引匹配 |
| nth-last-of-type | 所有元素 | 元素在相同标签的兄弟元素中最后一个位置的元素 |
| nth-of-type | 所有元素 | 相同标签的兄弟元素的位置 |
| only-child | 所有元素 | 没有兄弟元素的元素 |
| only-of-type | 所有元素 | 没有其他相同类型的兄弟元素 |
| optional | input, select, textarea | 任何没有设置required的input, select或textarea |
| out-of-range | input | 当前值处于min和max之外 |
| past | 所有元素 | 匹配完全出现在current匹配的元素之前的任意元素 |
| paused | audio, video | 处于暂停状态 |
| picture-in-picture | 所有元素 | 处于画中画模式的元素 |
| placeholder-shown | input, textarea | 当前显示占位文本的input或textarea |
| playing | audio, video | 处于正在播放的元素 |
| popover-open | 所有元素 | 处于显示状态的弹出框元素 |
| read-only | input, textarea | 不可编辑的元素 |
| read-write | input,textarea | 可以编辑的元素 |
| required | input,textarea,select | 设置了required属性 |
| right | 无 | 与@page一起使用, 表示打印文档的所有右页 |
| root | 根节点(html) | 与html相同, 但优先级更高 |
| scope | 所有元素 | 选择器要匹配的参考点的元素 |
| seeking | audio,video | 寻找播放位置 |
| stalled | audio, video | 表示停止播放时可播放的元素 |
| state | 自定义元素 | 选择具有直到自定义状态的自定义元素 |
| target | 唯一元素 | 其id与URL片段匹配 |
| target-within | 任意元素 | 与taget类似, 只是target选择子元素时, 该元素也被选中 |
| user-invalid | 表单元素 | 经过验证的表单元素 |
| user-valid | 表单元素 | 经过任何表单验证的元素, 在与用户交互后匹配 |
| valid | 表单元素 | 验证正确的表单元素 |
| visited | a, area | 用户访问后的链接 |
| volume-locked | audio, video | 用户锁定了声音 |
| where | 任意元素 | 接受选择器列表, 选中所有能被任意规则选中的元素 |

5. 伪元素选择器

选择元素的一部分

```css
a::first-line { /* 选择a标签的第一行 */
  color: red;
}
```

| 名称 | 作用 |
| :-- | :-- |
| after | 在子元素列表末尾插入一个子元素, 可以通过content添加内容, 添加的子元素默认时行内元素 |
| backdrop | 任何处于全屏模式的元素下的即刻渲染的盒子 |
| before | 在子元素列表开始插入一个子元素, 可以通过content添加内容, 添加的子元素默认时行内元素 |
| cue | 选中元素中的WebVTT提示 |
| cue-region | 与所选元素内的WebVTT提示相匹配, 用于设置带有VTT轨道的媒体的字幕和其他样式 |
| file-selector-button | 表示type=file的input |
| first-letter | 选中块级元素的第一行的第一个字母 |
| first-line | 选中块级元素的第一行 |
| grammar-error | 用于浏览器标识为语法错误的文本段 |
| highlight | 用于自定义高亮 |
| marker | 选择列表项的标记框 |
| part | 表示影子树中具有part属性的任意元素 |
| placehoder | 表示input或textarea中的占位文本 |
| selection | 文档中被用户高亮的部分(选中的部分) |
| slotted | 被放在HTML模版中的元素 |
| spelling-error | 被浏览器标记为不正确拼写的文本段 |
| target-text | 浏览器在支持文本片段技术时滚到的文字 |
| view-transition | 表示视图过度叠加层的根元素 |
| view-transition-group | 单个视图过度组 |
| view-transition-image-pair | 视图过度的旧视图状态和新视图状态的容器 |
| view-transition-new | 视图过度新视图的状态 |
| view-transition-old | 视图过度旧视图的状态 |

6. 关系选择器

+ 后代选择器

用空格组合两个选择器`body div`, 选择body中的div元素(可以是子元素的子元素的子元素...)
+ 子代选择器

  用`>`连接两个选择器`body>div`, 选择body的子元素div
+ 兄弟选择器

  用`+`连接`div+img`选择div后面相邻的img
+ 通用兄弟选择器
  
  用`~`连接`div~img`选择div后面的img


7. 全局选择器

`*`选中文档中所有内容, 或者父元素中的所有元素

### @规则

| 名称 | 作用 |
| :-- | :-- |
| charset | 指定样式表中的字符编码, 必须是样式表第一个元素 |
| color-profile | 命名一个颜色配置文件, 可以在color()函数中使用 |
| container | 条件组规则如果条件为真, 则应用规则 |
| counter-style | 自定义counter的样式 |
| document | 根据文档URL现在样式规则 |
| font-face | 指定显示文本的自定义字体 |
| font-feature-values | 允许在`font-variant-alternates`使用通用名称 |
| font-palette-values | 允许自定义有字体创作者创建的字体调色板的默认值 |
| import | 导入其他样式表 |
| keyframes | 创建动画的关键帧 |
| layer | 声明一个级联层, 同一层的规则将级联在一起 |
| media | 创建媒体查询, 根据结果应用样式表 |
| namespace | 定义CSS样式表中的XML命名空间, 用于把通配, 元素和属性选择器限制在指定命名空间 |
| page | 修改打印页面的不同方面 |
| property | 允许开发者显示定义CSS自定义属性 |
| scope | 选择特定DOM子树的元素 |
| starting-style | 用于定义元素上设置的属性的起始值 |
| supports | 指定依赖于浏览器中的一个或多个特定的CSS功能的支持声明 |

### CSS函数

| 名称 | 介绍 | 示例 |
| :-- | :-- | :--  |
| abs | 返回参数的绝对值, 与输入类型相同 | width: abs(20% - 100px); |
| acos | 反余弦,输入-1到1的参数,返回0-180度的弧度数  | transform: rotate(acos(-0.2)); |
| asin | 反正弦,输入-1到1的参数, 返回-90到90之间的弧度数 | transform: rotate(asin(-0.2)); |
| atan | 反正切, 输入任意数字, 返回-90到90之间的弧度数 | transform: rotate(atan(1)); |
| atan2 | 反正切, 输入任意两个数字, 返回两个输入的反正切值-180到180之间的弧度数 | transform: rotate(atan2(1, 2)) |
| attr | 获取CSS属性, 若属性不合法, 则使用后面的默认值 | content: attr(data-foo) " "; |
| calc | 在声明CSS属性时执行一些计算 | width: calc(100% - 80px) |
| clamp | 把一个值限制在一个范围 | clamp(MIN, VAL, MAX) |
| cos | 余弦函数 | width: calc( 100px * cos(45deg)) |
| counter | 返回一个代表计数器的当前值的字符串 | counter(countername, upper-roman) |
| counters | 返回表示指定计数器当前值的连接字符串 | counters(countername, '-'); |
| cross-fade | 定义透明度混合两个或多个图像 | cross-fade(url(white.png) 0%, url(black.png) 100%); |
| element | 从任意的 HTML 元素中生成的图像 | background: element(id); |
| env | 类似var引用CSS变量 | env(safe-area-inset-top, 20px); |
| exp | 以e为底数的指数函数 | width: calc(100px * exp(-1)); |
| fit-content | 将给定大小, 缩放成可用大小 | fit-content(300px) |
| hypot | 返回参数平方和的平方根 | hypot(3em, 4em) |
| log | 对数函数, 默认以e为底 | log(2); |
| max | 求参数的最大值 | max(10vw, 4em, 80px) |
| min | 求参数的最小值 | min(10vw, 4em, 80px) |
| minmax | 定义一个长范围的闭区间, 通常与网格布局一起使用 | minmax(200px, 1fr) |
| mod | 取模 | mod(10, 3) |
| path | 接收SVG的路径字符串 | path("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"); |
| pow | 指数函数 | pow(5, 2) |
| ray | 定义动画元素遵循的offset-path线段 | ray(50deg closest-corner contain at 100px 20px); |
| rem | 取余函数 | rem(14, 5) |
| repeat | 表示轨迹列表的重复片段 | repeat(4, 1fr) |
| round | 根据选定的舍入策略选择数字 | round(117px, 25px); |
| sign | 返回参数的正负 | sign(20vh-100px) |
| sin | 正弦函数 | sin(45deg) |
| sqrt | 平方根 | sqrt(9) |
| symbols | 用于计算list-style的值 | symbols(cyclic "*" "†" "‡"); |
| tan | 正切函数 | tan(20deg); |
| url | 指向资源 | url("http://mysite.example.com/mycursor.png") |
| var | 引用CSS变量 | color: var(--color-a); |

### 层叠

层叠(覆盖)如果两条规则的优先级一样, 那么后面的规则将覆盖前面的规则
```html
<html>
    <head>
        <style>
            h1 {
                color: red;
            }
            h1 {
                color: blue;
            }
        </style>
    </head>
    <body>
        <h1>This is my heading.</h1>
    </body>
</html>
```

最终`This is my heading.`是蓝色的

### 优先级

CSS的计算中, 最后每一个元素的每一个CSS属性都会有值

1. 