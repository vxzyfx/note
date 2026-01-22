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
-x,  & x<0
\end{cases}
$$

反函数

$$
h = \frac{1}{2}gt^2 \rightarrow t=\sqrt{\frac{2h}{g}}
$$

### 函数的特性

奇偶性:

- 偶函数: 关于y轴对称.
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

`左右极限`: 函数在左半邻域和右半邻域都有定义

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
      name: 'y = x^2',
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
