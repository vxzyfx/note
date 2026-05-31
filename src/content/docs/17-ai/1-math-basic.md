---
title: 数学基础
---

## 函数

### 函数定义

> 定义量与量之间的关系

$y = f(x)$ 其中自变量是$x$, 因变量是$y$.

函数在$x_0$处的取得的函数值 $y_0 = y|_{x=x_0} = f(x_0)$.

### 函数分类

显函数

自变量和因变量有明确的对应关系.

$$
y = x + 1
$$

隐函数

没有给出自变量和因变量的对应关系.

$$
f(x,y) = 0
$$

分段函数

$$
f(x)=
\begin{cases}
\sqrt{x}, & x\ge 0\\
-x, & x<0
\end{cases}
$$

反函数

$$
h = \frac{1}{2}gt^2 \rightarrow t=\sqrt{\frac{2h}{g}}
$$

### 函数的特性

奇偶性:

- 偶函数: 关于 y 轴对称.
  $$
  f(-x) = f(x)
  $$
- 奇函数: 关于原点对称.
  $$
  f(-x) = -f(x)
  $$

周期性:

$$
f(x+T) = f(x)
$$

单调性:

- 单调递增
  $$
  f(x_0) < f(x_1), x_0 < x_1
  $$
- 单调递减
  $$
  f(x_0) < f(x_1), x_0 > x_1
  $$

### 函数的连续性

函数$y=F(x)$在点$x_0$的某个邻域内有定义，如果自变量的改变量$\Delta x$趋近于零时，相应函数的该变量$\Delta y$也趋近与零，则称 $y=f(x)$在点$x_0$处连续。

$$
\lim_{\Delta x \to 0}\Delta y = \lim_{\Delta x \to 0} [f(x_0 + \Delta x) - f(x_0)] = 0
$$

函数$f(x)$在$x_0$处连续，需要的条件：

1. 函数在该点处有定义
2. 函数在该点处极限$\lim_{x \to x_0}f(x)$存在
3. 极限值等于函数值$f(x_0)$

### 函数的间断点

函数$f(x)$在点$x=x_0$处不连续，则称为函数的间断点。

三种情况的间断点：

1. 函数$f(x)$在点$x_0$处没有定义。
2. 极限$\lim_{x \to x_0}f(x)$不存在
3. 满足前面两点，但是$\lim_{x \to x_0}f(x) \neq f(x)$

当$x \to x_0$时，$f(x)$的左右极限存在，则称$x_0$为$f(x)$的第一类间断点，否则为第二类间断点。

条约间断点: $\lim_{x \to 0^-}f(x)$与$\lim_{x \to 0^+}f(x)$均存在，但不相等。

可去间断点：$\lim_{x \to x_0}f(x)$存在但不等于$f(x_0)$.

### 导数

如果函数存在极限

$$
\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x} = \lim_{\Delta x \to 0}\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}
$$

则称此极限为函数$y=f(x)$在点$x_0$处的导数$f'(x_0)$

导数的数学表示

$$
y'|_{x=x_0}, \frac{dy}{dx}|_{x=x_0}, \frac{df(x)}{dx}|_{x=x_0}
$$

复合函数求导

$$
(x \pm v) = u' \pm v'
$$

$$
(uv)' = u'v + uv'
$$

$$
(\frac{u}{v})=\frac{u'v-uv'}{v^2}(v \neq 0)
$$

$$
(Cu)' = Cu'(C 为常数)
$$

$$
(\frac{C}{v})' = -\frac{Cv'}{v^2}(C 为常数)
$$

### 偏导数

函数$z=f(x,y)$在点$(x_0, y_0)$的某个邻域内有定义，固定$y=y_0$，则一元函数$f(x,y_0)$在点$x=x_0$处可导，则极限
$\lim_{\Delta x \to 0}\frac{f(x_0 + \Delta x,y_0)-f(x_0, y_0)}{\Delta x}=A$，则$A$为函数$z=f(x,y)$在点$(x_0, y_0)$处关于自变量$x$的偏导数。

记作

$$
f_x(x_0, y_0), \frac{\partial z}{\partial x}|_{x=x_0,y=y_0}, \frac{\partial f}{\partial x}|_{x=x_0,y=y_0}, z_x|_{x=x_0,y=y_0}
$$

### 方向导数

如果函数的增量，与这两点距离的比例存在，则称此为在$P$点沿者$L$的方向导数。

$$
\frac{\partial f}{\partial l}=\lim_{p \to 0}\frac{f(x+\Delta x, y+\Delta y) - f(x,y)}{p}
$$

如果函数$z=f(x,y)$在点$P(x,y)$是可微分的，那么在改点沿任意方向$L$的方向导数都存在。

$$
\frac{\partial f}{\partial l} = \frac{\partial f}{\partial x}\cos \varphi + \frac{\partial f}{\partial y}\sin \varphi
$$

$\varphi$为$x$轴到$L$的角度

### 梯度

$z=f(x,y)$在平面域内具有连续的一阶偏导数，对于其中每一个点$P(x,y)$都有向量$\frac{\partial f}{\partial x}\vec{i}+\frac{\partial f}{\partial y}\vec{j}$,
则称为函数在点$P$的梯度。

$$
gradf(x,y)=\frac{\partial f}{\partial x}\vec{i}+\frac{\partial f}{\partial y}\vec{j}
$$

$$
\vec{e} = \cos \varphi \vec{i}+\sin \varphi \vec{j}
$$

$$
\frac{\partial f}{\partial l} = \frac{\partial f}{\partial x}\cos\varphi +
\frac{\partial f}{\partial y}\sin \varphi = gradf(x,y)\cdot\vec{e}
$$

## 极限

符号表示:

- $x \to \infty$ 当$|x|$无限增大时;
- $x \to +\infty$ 当$x$无限增大时;
- $x \to -\infty$ 当$x$无限减小时;
- $x \to x_0$ 当$|x|$从$x_0$的左右两侧无限接近于$x_0$时;
- $x \to x_0^+$ 当$|x|$从$x_0$的右侧无限接近于$x_0$时;
- $x \to x_0^-$ 当$|x|$从$x_0$的左侧无限接近于$x_0$时;

### 数列

> 按照一定次数排列的一列数

$u_1,u_2,u_3,\cdots,u_n,\cdots$, 其中$u_n$叫做通项.

对于数列$\{u_n\}$如果$n$无限增大时,其通项无限接近于常数$A$,
则称该数列以$A$为极限或数列收敛于$A$,否则称数列发散.

$$
\lim_{n \to \infty}u_n=A 或 u_n \to A (n \to \infty)
$$

示例

$$
\lim_{n \to \infty}\frac{1}{3^n} = 0,
\lim_{n \to \infty}\frac{n}{n+1} = 1,
\lim_{n \to \infty}2^n 不存在
$$

### 极限定义

> 函数在$x_0$的邻域内有定义$\lim_{x \to x_0}f(x)=A$或$f(x) \to A(x \to x_0)$

$$
\lim_{x \to 1}\frac{x^2-1}{x-1}=\lim_{x \to 1}\frac{(x-1)(x+1)}{x-1}=2
$$

`左右极限` : 函数在左半邻域和右半邻域都有定义

$$
\lim_{x \to x_0^+}f(x) = A, 或 f(x) \to A (x \to x_0^+), 或 f(x_0 + 0) = A
$$

$$
\lim_{x \to x_0^-}f(x) = A, 或 f(x) \to A (x \to x_0^-), 或 f(x_0 - 0) = A
$$

$\lim_{x \to x_0}f(x) = A$ 的充要条件是
$\lim_{x \to x_0^-}f(x) = \lim_{x \to x_0^+}f(x) = A$

$y=e^{-x}$ 图像

```echarts
{
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    name: 'x',
    min: -3,
    max: 3,
    minorTick: {
        show: true
    },
  },
  yAxis: {
    type: 'value',
    name: 'y',
    min: 0,
    max: 5
  },
  series: [
    {
      name: 'y = e^-x',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: (function(start, end, setup){
        const fn = (x) => Math.exp(-x);
        data = [];
        while (start < end) {
          data.push([start, fn(start)]);
          start += setup;
        }
        return data;
      })(-4, 4, 0.1),
      lineStyle: {
        width: 3
      }
    }
  ]
}
```

由图像可观察到$
\lim_{x \to +\infty}e^{-x} = 0
$

### 无穷

> 无穷小: 以零为极限(不是一个数, 是相对于变换过程的)

- $\lim_{x \to \infty}\frac{1}{x}=0$, 则$\frac{1}{x}$是$x \to \infty$时的无穷小
- $\lim_{x \to 2}(3x-6)=0$, 则$3x-6$是$x \to 2$时的无穷小

基本性质

1. 有限个无穷小的代数和仍是无穷小
2. 有限个无穷小的积仍是无穷小
3. 有界变量与无穷小的积仍是无穷小
4. 无限个无穷小之和不一定是无穷小
5. 无穷小的商不一定是无穷小

极限与无穷小的关系: $\lim_{x \to x_0} f(x) = A$的充要条件
$f(x) = A + \alpha(x)$其中$\alpha(x)$是$x \to x_0$时的无穷小

无穷大与无穷小的关系: 在自变量的同一变换过程中,如果$f(x)$为无穷大,那么$\frac{1}{f(x)}$为无穷小

无穷小的比较($\alpha$和$\beta$都是$x \to x_0$时的无穷小):

- $\lim_{x \to x_0}\frac{\beta}{\alpha} = 0$: $\beta$是比$\alpha$高阶无穷小
- $\lim_{x \to x_0}\frac{\beta}{\alpha} = \infty$: $\beta$是比$\alpha$低阶无穷小
- $\lim_{x \to x_0}\frac{\beta}{\alpha} = C \neq 0$: $\beta$是比$\alpha$同阶无穷小

## 微积分

- 微分: 研究瞬时变化
- 积分: 研究连续累积

### 微分(导数)

> 当自变量发生极小变化时，函数如何响应？

$$
f'(x) = \lim_{\Delta x \to 0}\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}
$$

几何含义

- 导数 = 切线斜率
- 导数大 $\to$ 变化快
- 导数为 0 $\to$ 可能极值点

### 积分

> 无数个“极小量”加起来，总共是多少？

$$
\int_{a}^{b} f(x)\, dx = 曲线下面积
$$

### 微积分基本定理

第一基本定理: 累积的变化率 = 原函数

$$
F(x) = \int_{a}^{x} f(t)\, dt \Rightarrow F'(x) = f(x)
$$

第二基本定理: 面积不用加无穷多项，直接算端点差

$$
\int_{a}^{b} f(x)\, dx = F(b) - F(a)
$$

积分中值定理

设函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，则存在至少一个点 $\xi \in (a,b)$，使得

$$
\int_{a}^{b} f(x)\, dx = f(\xi)(b - a)
$$

> 连续函数在区间内，至少有一个点的函数值 = 平均值

微分中值定理(拉格朗日中值定理)

设函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，在开区间$(a,b)$上可导,则存在至少一个点 $\xi \in (a,b)$，使得

$$
f'(\xi) = \frac{f(b)-f(a)}{b-a}
$$

> 总能找到一个点，其切线斜率等于整体平均斜率

### 泰勒公式

> 使用简单多项式代替复杂函数

$$
f(x) \approx f(x_0) + f'(x_0)(x-x_0)
$$

在值$x$与$x_0$越接近误差越小

```echarts
{
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    name: 'x',
    min: -3,
    max: 3,
    minorTick: {
        show: true
    },
  },
  yAxis: {
    type: 'value',
    name: 'y',
    min: 0,
    max: 5
  },
  series: [
    {
      name: 'y = e^x',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: (function(start, end, setup){
        const fn = (x) => Math.exp(x);
        data = [];
        while (start < end) {
          data.push([start, fn(start)]);
          start += setup;
        }
        return data;
      })(-4, 4, 0.1),
      lineStyle: {
        width: 3
      }
    },
    {
      name: 'y = x + 1',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: (function(start, end, setup){
        const fn = (x) => 1 + x;
        data = [];
        while (start < end) {
          data.push([start, fn(start)]);
          start += setup;
        }
        return data;
      })(-4, 4, 0.1),
      lineStyle: {
        width: 3
      }
    }
  ]
}
```

在$x_0=0$时, $x$离 0 越小,误差越小

$$
f(x) = e^x \approx x + 1
$$
