---
title: Spring AOP
---


**面向方面编程 (Aspect Oriented Programming, AOP)** 是一种编程范式，用于在软件开发过程中分离关注点。它的主要目标是将那些通常横切多个模块的行为（如日志记录、事务管理、安全性等）从业务逻辑代码中分离出来，以提高代码的模块化和可维护性。

## 核心概念

1. **切面 (Aspect):** 切面是AOP的核心概念，它封装了横切关注点的行为。一个切面通常包括一个或多个切入点和相应的增强（advice）。

2. **切入点 (Pointcut):** 切入点定义了在哪些位置插入切面逻辑。它是一组规则或表达式，用于匹配程序执行中的某些点，例如方法调用或字段访问。

3. **增强 (Advice):** 增强是在特定切入点上执行的动作。增强可以在方法执行之前（前置增强），之后（后置增强），或在方法抛出异常时执行。

4. **织入 (Weaving):** 织入是将切面应用到目标代码的过程。织入可以在编译时、类加载时或运行时进行。

### AOP的优势

1. **提高代码模块化：** 通过将横切关注点独立出来，AOP使得业务逻辑代码更清晰、更聚焦，从而提高了代码的可读性和可维护性。

2. **降低代码耦合：** 由于横切关注点被分离，核心业务逻辑与这些关注点的实现解耦，减少了代码的复杂性。

3. **增强可复用性：** 切面可以在不同的模块或应用程序中复用，而无需重复编写相同的横切逻辑。

### 实现AOP的方式

1. **编译时织入 (Compile-time Weaving):** 在编译期间，编译器根据切面定义将增强逻辑织入到目标代码中。

2. **类加载时织入 (Load-time Weaving):** 在类被加载到JVM时，织入过程发生，此时增强逻辑被注入到目标类中。

3. **运行时织入 (Runtime Weaving):** 使用代理模式在运行时动态地将增强逻辑织入目标对象中。

### AOP的应用场景

1. **日志记录：** 自动为应用程序的各个部分添加日志记录，而无需手动在每个方法中添加日志代码。

2. **性能监控：** 监控方法的执行时间，识别性能瓶颈。

3. **事务管理：** 在业务操作前后自动管理事务，无需手动控制事务的开启和提交。

4. **安全性：** 在特定方法调用前执行安全检查，以确保只有授权的用户可以执行某些操作。

## 实现方式

java中的AOP时通过动态代理实现

动态代理的实现:
- JDK动态代理: 目标有接口时才可以使用, 生成接口实现类进行代理
- cglib动态代理: 目标没有接口, 通过继承目标, 实现代理

`AspectJ`是一个AOP框架, Spring借用类AspectJ的注解

## 通知的分类

- 前置通知: `@Before`
- 后置通知: `@After`
- 后置返回通知: `@AfterReturning`
- 后置异常通知: `@AfterThrowing`
- 环绕通知: `@Around`

## 注解使用AOP

`@EnableAspectJAutoProxy`开启AOP动态代理


## xml使用AOP

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- 启用自动代理 -->
    <aop:aspectj-autoproxy/>
    <bean class="site.shug.spring.aop.xml.LogAspect" name="logAspect" />
    <bean class="site.shug.spring.aop.xml.XmlCalculatorImpl" name="calculator" />
    <aop:config>
        <aop:aspect ref="logAspect" >
            <aop:pointcut id="pointcutAdd" expression="execution(public int site.shug.spring.aop.xml.XmlCalculatorImpl.add(..))"/>
            <aop:before method="before" pointcut-ref="pointcutAdd" />
            <aop:after method="after" pointcut-ref="pointcutAdd" />
            <aop:after-returning method="afterReturningMut" returning="result" pointcut-ref="pointcutAdd" />
            <aop:after-throwing method="afterThrowingMultiply" pointcut="execution(public int site.shug.spring.aop.xml.XmlCalculatorImpl.multiply(..))" throwing="ex" />
            <aop:around method="around" pointcut="execution(public int site.shug.spring.aop.xml.XmlCalculatorImpl.divide(..))" />
        </aop:aspect>
    </aop:config>
</beans>

```



