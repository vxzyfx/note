---
title: Spring核心
---


## 控制反转
控制反转（Inversion of Control，简称 IoC）是软件工程中的一种设计原则，它是 Spring 框架的核心概念之一。控制反转主要解决了对象创建和依赖管理的问题，使得应用程序的各个部分可以更松散地耦合在一起，从而提高系统的灵活性和可测试性。

### 控制反转的核心思想

在传统的编程方式中，应用程序代码负责控制流程和创建依赖对象。例如，一个类 A 依赖于另一个类 B，通常是由 A 来创建或查找 B 的实例。这种方式导致了代码的紧密耦合，增加了维护和扩展的难度。

控制反转的思想是将对象的创建和依赖关系的管理交给外部容器（如 Spring 容器）来负责，而不是在代码中硬编码这些依赖。这意味着应用程序代码不再“控制”这些依赖的创建过程，而是“反转”到外部容器来控制。

### IoC 的两种常见实现方式

1. **依赖注入（Dependency Injection, DI）：**
   - **构造函数注入：** 依赖通过构造函数传递给对象。例如，当类 A 需要类 B 的实例时，A 的构造函数会接收一个 B 的实例作为参数。容器负责在创建 A 的实例时，自动传递 B 的实例。
   - **Setter 方法注入：** 依赖通过 setter 方法传递给对象。容器在创建对象后，通过调用 setter 方法将依赖对象注入。
   - **字段注入：** 直接将依赖对象注入到类的字段中，通常通过注解（如 `@Autowired`）实现。

   依赖注入是 IoC 最常用的实现方式，也是 Spring 框架中实现控制反转的主要手段。它使得类的依赖关系更加清晰和易于管理。

2. **依赖查找（Dependency Lookup）：**
   - 应用程序代码在运行时主动从容器中查找并获取所需的依赖对象。这种方式相比依赖注入使用较少，因为它仍然要求应用程序代码知道如何与容器交互，略微削弱了控制反转的效果。

### 控制反转的优点

- **松耦合：** 通过 IoC，类不再直接控制其依赖的实例化过程，减少了类之间的耦合，提高了代码的灵活性。
- **易于测试：** 由于依赖注入使得依赖关系更加透明，开发人员可以轻松替换实际依赖为 Mock 对象，从而更方便地编写单元测试。
- **可扩展性和可维护性：** 应用程序的各个模块可以独立开发和替换，而无需修改依赖的代码，提高了系统的可扩展性和可维护性。
- **配置管理集中化：** 通过容器统一管理依赖对象的创建和生命周期，应用程序的配置和管理变得更加集中化和一致性。

## 面向切面编程

面向切面编程（Aspect-Oriented Programming，简称 AOP）是一种编程范式，它旨在将横切关注点（Cross-Cutting Concerns）与业务逻辑分离，从而提高代码的模块化程度。AOP 在处理像日志记录、安全性、事务管理、异常处理等与业务逻辑无关的功能时特别有用。

### AOP 的基本概念

1. **横切关注点（Cross-Cutting Concerns）：**
   - 横切关注点是指在系统的多个模块中都需要的功能，但这些功能并不属于核心业务逻辑。比如，日志记录、安全性检查、事务管理等，往往需要在多个模块中重复实现，这些功能就称为横切关注点。

2. **切面（Aspect）：**
   - 切面是 AOP 的核心概念，指的是对横切关注点的模块化封装。一个切面通常包含定义横切关注点的代码逻辑，并指定这些逻辑应该应用到哪些地方（称为切入点）。切面可以理解为一个类或模块，用来实现横切关注点。

3. **连接点（Join Point）：**
   - 连接点是程序执行中的一个具体点，通常是方法的执行或异常的抛出。AOP 框架能够在这些连接点上插入切面的逻辑。

4. **切入点（Pointcut）：**
   - 切入点定义了一个或多个连接点，决定了切面应该在哪些地方应用。切入点通常通过表达式或模式匹配来指定。

5. **通知（Advice）：**
   - 通知是切面在特定连接点上执行的代码。通知可以在连接点的不同阶段执行，比如在方法调用之前（前置通知）、方法调用之后（后置通知）或者方法抛出异常时（异常通知）。

6. **织入（Weaving）：**
   - 织入是将切面应用到目标对象的过程。通过织入，切面的代码逻辑可以在目标对象的指定连接点上执行。织入可以在编译时、类加载时或运行时进行。

### AOP 的常见用例

1. **日志记录：**
   - AOP 常用于在方法调用前后自动记录日志，而无需在每个方法中手动添加日志记录代码。这有助于保持业务逻辑的简洁性。

2. **安全性检查：**
   - 通过 AOP，可以在方法执行前进行安全性检查，确保用户具有相应的权限。这种检查可以在不修改业务代码的情况下统一管理。

3. **事务管理：**
   - AOP 可以用来管理数据库事务，确保方法执行过程中出现的错误能够导致事务回滚，而成功执行则提交事务。

4. **性能监控：**
   - 通过 AOP，可以在方法执行前后记录时间，监控系统的性能瓶颈。

### AOP 在 Spring 中的实现

Spring 框架提供了对 AOP 的支持，允许开发人员轻松地定义切面和切入点，并将它们应用到 Spring 管理的 Bean 上。Spring 中的 AOP 实现通常通过以下方式进行：

- **声明式 AOP：** 使用注解（如 `@Aspect`、`@Before`、`@After`）来定义切面和通知，配置切入点。
- **XML 配置：** 通过 Spring 的 XML 配置文件来定义切面和切入点（较少使用）。

### AOP 的优点

- **模块化：** AOP 将横切关注点与核心业务逻辑分离，提高了代码的模块化程度。
- **代码复用：** 通过将重复的横切关注点逻辑封装在切面中，可以避免在多个模块中重复编写相同的代码。
- **维护性：** 横切关注点逻辑集中在切面中，修改这些逻辑时只需修改切面，避免了在多个地方进行修改。

## 控制反转(IoC)容器

`org.springframework.beans`和`org.springframework.context`包是 Spring Framework 的 IoC 容器的基础。 

BeanFactory接口提供了能够管理任何类型对象的高级配置机制。 
ApplicationContext是BeanFactory的子接口。它补充了：
- 更容易与 Spring 的 AOP 功能集成
- 消息资源处理（用于国际化）
- 事件发布
- 应用程序层特定上下文，例如用于 Web 应用程序的WebApplicationContext 。

`bean`是在Spring中，构成应用程序主干并由 Spring IoC 容器管理的对象 。
bean是一个由 Spring IoC 容器实例化、组装和管理的对象。否则，bean 只是应用程序中的众多对象之一。 
Bean 以及它们之间的依赖关系反映在容器使用的配置元数据中。

`org.springframework.context.ApplicationContext`接口代表 Spring IoC 容器，负责实例化、配置和组装 bean。

ApplicationContext的实现:
- `org.springframework.context.annotation.AnnotationConfigApplicationContext`: 通过注解来配置bean
- `org.springframework.context.support.ClassPathXmlApplicationContext`: 通过XML文件来配置bean

`配置元数据(Configuration Metadata)`Spring IoC 容器使用一种形式的配置元数据。此配置元数据代表您作为应用程序开发人员如何告诉 Spring 容器实例化、配置和组装应用程序中的组件。

### `org.springframework.beans` 主要内容

`org.springframework.beans` 是 Spring 框架中用于管理和操作 JavaBean 的核心包。它提供了处理和操作 Spring Bean 的基础类和接口，主要支持 Spring 的依赖注入（Dependency Injection）和 Bean 生命周期管理。

### 

1. **核心接口和类：**

   - **`BeanFactory` 接口：** 
     - `BeanFactory` 是 Spring IoC 容器的核心接口，定义了从容器中获取 Bean 的方法。它是依赖注入机制的基础，通过 `BeanFactory` 可以获取应用程序中定义的各种 Bean 实例。
     - 常用方法：
       - `getBean(String name)`：根据名称获取 Bean 实例。
       - `getBean(Class<T> requiredType)`：根据类型获取 Bean 实例。
       - `containsBean(String name)`：检查容器中是否包含某个名称的 Bean。
       - `isSingleton(String name)`：检查指定名称的 Bean 是否为单例。
       - `isPrototype(String name)`：检查指定名称的 Bean 是否为原型。

   - **`BeanWrapper` 接口：**
     - `BeanWrapper` 是一个接口，允许以更动态的方式操作 JavaBean 的属性。它提供了设置和获取 Bean 属性值、检查属性描述符等功能。
     - 这个接口主要用于框架内部来操作 Bean 的属性，特别是在依赖注入期间。

   - **`PropertyEditor` 接口：**
     - `PropertyEditor` 用于将属性值从一种类型转换为另一种类型。Spring 使用它来处理复杂类型的属性，例如将字符串转换为日期、数字等类型。

   - **`BeanUtils` 类：**
     - `BeanUtils` 提供了大量静态方法，方便开发人员操作 JavaBean 属性，如复制属性、查找属性描述符、设置或获取属性值等。
     - 这个类在处理 JavaBean 的属性操作时非常有用，可以用于对象之间的属性复制和对象属性的动态操作。

2. **异常类：**

   - **`BeansException`：**
     - `BeansException` 是 Spring 框架中与 Bean 操作相关的异常的基类。所有在 Bean 操作过程中可能抛出的异常都继承自这个类。
     - 常见子类包括 `BeanCreationException`、`NoSuchBeanDefinitionException` 等，用于指示在创建或获取 Bean 过程中出现的问题。

   - **`NoSuchBeanDefinitionException`：**
     - 当容器中没有找到请求的 Bean 时抛出此异常。开发人员通常在获取 Bean 时可能遇到这个异常。

   - **`BeanInstantiationException`：**
     - 当无法实例化 Bean 时抛出此异常，通常是因为 Bean 类没有无参构造函数或由于其他原因无法实例化。

3. **高级功能：**

   - **`TypeConverter`：**
     - 该接口提供了类型转换的能力，允许开发人员将属性值转换为指定的目标类型。在 Bean 属性赋值过程中，如果需要将一个类型转换为另一个类型，Spring 会使用 `TypeConverter`。

   - **`BeanPostProcessor`：**
     - `BeanPostProcessor` 是 Spring 中的一个扩展点，允许在 Bean 初始化的前后执行一些自定义逻辑。可以通过实现 `BeanPostProcessor` 接口来定制 Bean 的创建过程，例如在 Bean 创建后自动设置一些属性或者执行一些初始化逻辑。

   - **`SmartInitializingSingleton`：**
     - 这是一个特殊的回调接口，当所有单例 Bean 被初始化后，Spring 容器会调用实现了该接口的类的 `afterSingletonsInstantiated` 方法。这个接口通常用于需要在所有单例 Bean 完成初始化之后执行一些操作的场景。

### `org.springframework.beans` 主要内容

`org.springframework.context` 是 Spring 框架中提供应用程序上下文（ApplicationContext）功能的核心包。它扩展了 `org.springframework.beans` 包的功能，提供了更加完整的框架支持，特别是用于构建企业级应用程序。`ApplicationContext` 是 Spring 的核心接口之一，它为 Bean 的管理提供了更多的高级功能，如事件传播、国际化支持、资源加载等。

1. **核心接口和类：**

   - **`ApplicationContext` 接口：**
     - `ApplicationContext` 是 Spring IoC 容器的高级接口，扩展了 `BeanFactory` 的功能。除了管理 Bean 的生命周期外，它还提供了以下功能：
       - **国际化支持（MessageSource）：** 可以方便地处理消息资源，通过国际化（i18n）机制来支持多语言。
       - **事件传播（ApplicationEvent）：** 支持应用程序事件的发布和订阅机制，允许组件之间进行解耦的事件驱动交互。
       - **资源访问（ResourceLoader）：** 统一的资源访问方式，可以加载各种类型的资源文件（如文件、URL 等）。
       - **生命周期管理（Lifecycle）：** 管理应用程序组件的生命周期，支持在容器启动和关闭时执行特定的回调方法。

   - **`ConfigurableApplicationContext` 接口：**
     - `ConfigurableApplicationContext` 是 `ApplicationContext` 的子接口，提供了更加灵活的上下文配置功能。它允许在运行时刷新上下文、关闭上下文，并注册 `ShutdownHook` 来确保在 JVM 关闭时优雅地关闭容器。
     - 常用的方法包括：
       - `refresh()`：刷新应用上下文，使其重新加载配置和重新创建所有 Bean。
       - `close()`：关闭应用上下文，释放资源。
       - `registerShutdownHook()`：注册一个 JVM 钩子，以便在 JVM 关闭时自动调用 `close()` 方法。

   - **`GenericApplicationContext` 类：**
     - `GenericApplicationContext` 是一个通用的 `ApplicationContext` 实现，它允许在不依赖具体 XML 或注解配置的情况下，动态注册 Bean 和资源。

2. **事件机制：**

   - **`ApplicationEvent` 类：**
     - `ApplicationEvent` 是 Spring 中所有事件的基类，任何事件都可以继承自该类。Spring 提供了事件发布和监听机制，允许应用程序中的不同组件之间以松耦合的方式进行通信。
     - 常见的事件包括 `ContextRefreshedEvent`（上下文刷新事件）、`ContextClosedEvent`（上下文关闭事件）等。

   - **`ApplicationEventPublisher` 接口：**
     - `ApplicationEventPublisher` 用于在 Spring 应用程序中发布事件。通过 `ApplicationContext` 可以轻松发布事件，所有注册的事件监听器都可以接收到事件并进行处理。

   - **`ApplicationListener` 接口：**
     - `ApplicationListener` 是 Spring 的事件监听器接口，任何实现了该接口的 Bean 都可以监听到特定的事件。当事件发生时，`ApplicationListener` 的 `onApplicationEvent` 方法会被调用。

3. **国际化支持：**

   - **`MessageSource` 接口：**
     - `MessageSource` 用于处理国际化消息的解析。通过此接口，可以根据不同的区域设置返回对应的消息文本。Spring 提供了 `ResourceBundleMessageSource` 等实现来读取国际化资源文件。

   - **`LocaleResolver` 接口：**
     - `LocaleResolver` 用于解析和设置区域设置（Locale）。在 Web 应用程序中，`LocaleResolver` 通常用于确定用户的语言偏好，并据此选择合适的国际化资源。

4. **资源管理：**

   - **`ResourceLoader` 接口：**
     - `ResourceLoader` 提供了统一的资源加载策略，可以从不同的资源源（如文件系统、类路径、URL）加载资源。`ApplicationContext` 本身就是一个 `ResourceLoader` 实现。

   - **`Resource` 接口：**
     - `Resource` 是 Spring 资源抽象的核心接口，代表了任何一种资源的句柄。`Resource` 接口的实现类有很多，比如 `ClassPathResource`、`FileSystemResource` 等，分别用于从类路径、文件系统等加载资源。

5. **其他重要类：**

   - **`Environment` 接口：**
     - `Environment` 接口表示当前应用程序运行的环境，它封装了环境变量、系统属性以及配置文件等信息。通过 `Environment` 可以轻松获取应用程序所依赖的环境信息。

   - **`ApplicationContextAware` 接口：**
     - 实现了 `ApplicationContextAware` 接口的 Bean 在初始化时会被注入 `ApplicationContext` 实例，这样 Bean 就可以直接访问容器中的其他 Bean 或资源。


## XML配置Spring容器
在容器本身内，这些 bean 定义表示为BeanDefinition对象，其中包含（以及其他信息）以下元数据：
- 包限定的类名：通常是所定义的 bean 的实际实现类。
- Bean 行为配置元素，说明 Bean 在容器中的行为方式（范围、生命周期回调等）。
- 对 Bean 完成其工作所需的其他 Bean 的引用。这些引用也称为协作者或依赖项。
- 在新创建的对象中设置的其他配置设置 — 例如，池的大小限制或管理连接池的 bean 中使用的连接数。

除了包含有关如何创建特定 bean 的信息的 bean 定义之外， ApplicationContext实现还允许注册在容器外部（由用户）创建的现有对象。这是通过`getBeanFactory()`方法访问 ApplicationContext 的`BeanFactory`来完成的，该方法返回`DefaultListableBeanFactory`实现。 `DefaultListableBeanFactory`通过`registerSingleton(..)`和`registerBeanDefinition(..)`方法支持这种注册。然而，典型的应用程序仅使用通过常规 bean 定义元数据定义的 bean。

添加依赖
```kotlin
implementation("org.springframework:spring-beans:6.1.12")
implementation("org.springframework:spring-context:6.1.12")
```

测试bean

```java
package site.shug.spring.core;

public class BaseExampleFactory {
    public BeanExample createBeanExample() {
        System.out.println("createBeanExample");
        return new BeanExample();
    }
}

```

```java
package site.shug.spring.core;

public class BeanExampleDep {
}
```

```java
package site.shug.spring.core;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class BeanExample {
    private String name;
    public Integer age;
    public BeanExampleDep dep;
    public List<Integer> list;
    public Set<Integer> set;
    public Map<String,Integer> map;

    public List<Integer> getList() {
        return list;
    }
    public void setList(List<Integer> list) {
        this.list = list;
    }
    public Set<Integer> getSet() {
        return set;
    }
    public void setSet(Set<Integer> set) {
        this.set = set;
    }
    public Map<String, Integer> getMap() {
        return map;
    }
    public void setMap(Map<String, Integer> map) {
        this.map = map;
    }
    public BeanExampleDep getDep() {
        return dep;
    }
    public void setDep(BeanExampleDep dep) {
        this.dep = dep;
    }
    public Integer getAge() {
        System.out.println("getAge");
        return age;
    }
    public void setAge(Integer age) {
        System.out.println("setAge");
        this.age = age;
    }
    public String getName() {
        System.out.println("getName");
        return name;
    }
    public void setName(String name) {
        this.name = name;
        System.out.println("setName");
    }
    public BeanExample(String name, Integer age) {
        this.name = name;
        this.age = age;
        System.out.println("site.shug.sping.core.BeanExample(String name, Integer age)");
    }
    public BeanExample(String name, Integer age, BeanExampleDep dep, List<Integer> list, Set<Integer> set, Map<String,Integer> map) {
        this.name = name;
        this.age = age;
        this.dep = dep;
        this.list = list;
        this.set = set;
        this.map = map;
        System.out.println("site.shug.sping.core.BeanExample(String name, Integer age, BeanExampleDep dep, List<Integer> list, Set<Integer> set, Map<String,Integer> map)");
    }
    public BeanExample() {
        System.out.println("site.shug.sping.core.BeanExample");
    }
    public static BeanExample createInstance() {
        System.out.println("createInstance");
        return new BeanExample();
    }
    public static BeanExample createInstance1(String name, Integer age) {
        System.out.println("createInstance1");
        return new BeanExample(name, age);
    }

    @Override
    public String toString() {
        return "My name is " + name + " and age is " + age + " and dep is " + dep + " and list is " + list + " and set is " + set + " and map is " + map;
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="beanExample" class="site.shug.spring.core.BeanExample"/>
</beans>
```

### 命名Bean
每个 bean 都有一个或多个标识符。这些标识符在托管 bean 的容器中必须是唯一的。一个 bean 通常只有一个标识符。但是，如果需要多个别名，则多余的可以被视为别名。

在基于 XML 的配置元数据中，您可以使用id属性、 name属性或两者来指定 bean 标识符。 
- id属性允许您指定一个id 。按照惯例，这些名称是字母数字的（“myBean”、“someService”等），但它们也可以包含特殊字符。
- name属性可以指定多个名称，并用逗号 ( , )、分号 ( ; ) 或空格分隔。

### 别名Bean

```xml
<alias name="fromName" alias="toName"/>
```

在这种情况下，在使用此别名定义之后，名为fromName的 bean（在同一容器中）也可以称为toName 。


### 实例化Bean
作为值的每个属性或构造函数参数都会从其指定格式转换为该属性或构造函数参数的实际类型。默认情况下，
Spring 可以将以字符串格式提供的值转换为所有内置类型，例如int 、 long 、 String 、 boolean等。

1. 无参数构造

```xml
<bean id="beanExample" class="site.shug.spring.core.BeanExample"/>
```

2. 工厂模式

静态工厂

```xml
<bean id="beanExample" class="site.shug.spring.core.BeanExample" factory-method="createInstance"/>
```

带参数
```xml
    <bean id="beanExample11" class="site.shug.spring.core.BeanExample" factory-method="createInstance1">
        <constructor-arg value="createInstance1"/>
        <constructor-arg value="1"/>
    </bean>
```

动态工厂

```xml
    <bean id="factory" class="site.shug.spring.core.BaseExampleFactory"/>
    <bean id="beanExample2" factory-bean="factory" factory-method="createBeanExample"/>
```

3. 构造函数注入

```xml
    <bean id="beanExample3" class="site.shug.spring.core.BeanExample">
        <constructor-arg value="shug"/>
        <constructor-arg value="18"/>
        <constructor-arg ref="dep"/>
        <constructor-arg>
            <list value-type="java.lang.Integer">
                <value>1</value>
            </list>
        </constructor-arg>
        <constructor-arg>
            <set value-type="java.lang.Integer">
                <value>1</value>
            </set>
        </constructor-arg>
        <constructor-arg>
            <map key-type="java.lang.String" value-type="java.lang.Integer">
                <entry key="user" value="1">
                </entry>
            </map>
        </constructor-arg>
    </bean>
```

4. set方法

```xml
    <bean id="beanExample4" class="site.shug.spring.core.BeanExample">
        <property name="name" value="shug"/>
        <property name="age" value="18"/>
        <property name="dep" ref="dep"/>
        <property name="list">
            <list value-type="java.lang.Integer">
                <value>1</value>
            </list>
        </property>
        <property name="set">
            <set value-type="java.lang.Integer">
                <value>1</value>
            </set>
        </property>
        <property name="map">
            <map key-type="java.lang.String" value-type="java.lang.Integer">
                <entry key="user" value="1">
                </entry>
            </map>
        </property>
    </bean>
```

5. set嵌套方法

```xml
    <bean id="beanExample5" class="site.shug.spring.core.BeanExample">
        <property name="dep">
            <bean class="site.shug.spring.core.BeanExampleDep"/>
        </property>
    </bean>
```

6. c名称空间

构造函数注入的简写
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="beanExamplep1" class="site.shug.spring.core.BeanExample" c:name="c" c:age="1" />
</beans>
```

6. p名称空间

set函数注入的简写
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="dep" class="site.shug.spring.core.BeanExampleDep"/>
    <bean id="beanExamplep1" class="site.shug.spring.core.BeanExample" p:name="user" p:dep-ref="dep" />
</beans>
```

7. depends-on依赖

先创建dep2

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean name="dep1" class="site.shug.spring.core.BeanDep1" depends-on="dep2" />
    <bean name="dep2" class="site.shug.spring.core.BeanDep2" />
</beans>
```


8. lazy-init

默认情况下ApplicationContext会在初始化过程中创建所有Bean, 通过`lazy-init="true"`可以修改在第一次需要时创建Bean
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="lazy" class="site.shug.spring.core.Lazy" lazy-init="true"/>
</beans>
```

设置xml文件的默认`lazy-init`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd"
       default-lazy-init="true"
>
    <bean id="lazy" class="site.shug.spring.core.Lazy"/>
</beans>
```

9. 自动依赖注入

使用`<bean/>`元素的autowire属性指定 `bean` 定义的自动装配模式

|   值   | 介绍          |
|-------|------------|
| no | (默认值)没有自动装配 |
| byName | 按属性名称自动装配 |
| byType | 如果容器中恰好存在一个属性类型的 bean，则允许自动装配该属性。如果存在多个，则会抛出致命异常，这表明您不能对该 bean 使用byType自动装配。如果没有匹配的 bean，则不会发生任何事情（未设置该属性）。 |
| constructor | 如果容器中恰好存在一个属性类型的 bean，则允许自动装配该属性。如果存在多个，则会抛出致命异常，这表明您不能对该 bean 使用byType自动装配。如果没有匹配的 bean，则不会发生任何事情（未设置该属性）。 |

设置xml中的所有bean
``xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd"
       default-autowire="byName"
        >
    <bean class="site.shug.spring.autowire.AutoWire2" id="autoWire2" />
    <bean class="site.shug.spring.autowire.AutoWire1" id="autoWire1" />
</beans>
```

关闭依赖注入 `<bean class="site.shug.spring.autowire.AutoWire1" id="autoWire1" autowire-candidate="false" />`


### 方法注入

在大多数应用场景中，容器中的大部分bean都是单例的。当一个单例 bean 需要与另一个单例 bean 协作或一个非单例 bean 需要与另一个非单例 bean 协作时，通常可以通过将一个 bean 定义为另一个 bean 的属性来处理依赖关系。当 bean 生命周期不同时就会出现问题。假设单例 bean A 需要使用非单例（原型）bean B，可能是在 A 上的每次方法调用上。容器仅创建单例 bean A 一次，因此只有一次设置属性的机会。每次需要 bean B 时，容器无法为 bean A 提供新的 bean B 实例。

要解决这个问题是实现`ApplicationContextAware`, 并在每次 bean A 需要时对容器进行getBean("B")调用来请求（通常是新的）bean B 实例，从而使 bean A 知道容器。

```xml
    <bean class="site.shug.spring.method.NoSingleBeanLook" id="noSingleBeanLook" scope="prototype" />
    <bean class="site.shug.spring.method.SingleBeanLook" id="singleBeanLook">
        <lookup-method name="getNoSingleBean" bean="noSingleBeanLook" />
    </bean>
```

SingleBeanLook要求:
- 为了使这种动态子类化工作，Spring bean 容器子类化的类不能是final ，并且要重写的方法也不能是final 。
- 对具有abstract方法的类进行单元测试需要您自己对该类进行子类化并提供abstract方法的存根实现。
- 组件扫描也需要具体的方法，这需要选取具体的类。
- 另一个关键限制是查找方法不能与工厂方法一起使用，特别是不能与配置类中的@Bean方法一起使用，因为在这种情况下，容器不负责创建实例，因此无法创建运行时生成的实例。动态子类。

替换托管 bean 中的任意方法。
```xml
    <bean class="site.shug.spring.method.ReplaceMethod" id="replaceMethod" />
    <bean class="site.shug.spring.method.Replacer" id="replacer" >
        <replaced-method name="sayHello" replacer="replaceMethod">
            <arg-type>String</arg-type>
        </replaced-method>
    </bean>
```

`ReplaceMethod`要实现`org.springframework.beans.factory.support.MethodReplacer`

### Bean Scopes

控制从特定 bean 定义创建的对象的范围。Spring 框架支持六个范围，其中四个仅在您使用 Web 感知的ApplicationContext时才可用。您还可以创建自定义范围。

| 范围 | 介绍 |
|-----|------|
| singleton | 将单个 bean 定义范围限定为每个 Spring IoC 容器的单个对象实例。 |
| prototype | 将单个 bean 定义的范围限定为任意数量的对象实例。 |
| request | 将单个 bean 定义的范围限定为单个 HTTP 请求的生命周期。仅在 Web 感知的 Spring ApplicationContext上下文中有效。 |
| session | 将单个 bean 定义的范围限定为 HTTP Session的生命周期。仅在 Web 感知的 Spring ApplicationContext上下文中有效。 |
| application | 将单个 bean 定义的范围限定为ServletContext的生命周期。仅在 Web 感知的 Spring ApplicationContext上下文中有效。 |
| websocket | 将单个 bean 定义的范围限定为WebSocket的生命周期。仅在 Web 感知的 Spring ApplicationContext上下文中有效。 |

自定义Scope
1. 实现`org.springframework.beans.factory.config.Scope`
2. 使用`void registerScope(String scopeName, Scope scope);`注册Scope

### 生命周期回调

| 回掉接口 | 介绍 |
|---------|-----|
| `org.springframework.beans.factory.config.BeanPostProcessor` |  实现回调方法来提供您自己的（或覆盖容器的默认值）实例化逻辑、依赖项解析逻辑等 |
| `org.springframework.beans.factory.InitializingBean` |  bean 在容器设置 bean 的所有必要属性后执行初始化工作 |
| `org.springframework.beans.factory.DisposableBean` |  bean 在包含它的容器被销毁时获得回调。 |
| `org.springframework.beans.factory.BeanNameAware` |  该类将获得对其关联对象定义中定义的名称的引用 |
| `org.springframework.beans.factory.BeanClassLoaderAware` |  类加载器用于加载 bean 类 |
| `org.springframework.beans.factory.BeanFactoryAware` |  声明BeanFactory |
| `org.springframework.context.Lifecycle` |  当ApplicationContext本身收到启动和停止信号时（例如，对于运行时的停止/重新启动场景），它将这些调用级联到该上下文中定义的所有Lifecycle实现 |
| `org.springframework.context.SmartLifecycle` |  继承并扩展了 Lifecycle 接口 |
| `org.springframework.context.ApplicationContextAware` |  以编程方式操作创建它们的ApplicationContext |
| `org.springframework.context.ApplicationEventPublisherAware` |  获取 ApplicationEventPublisher 实例，从而能够在应用程序上下文中发布事件 |
| `org.springframework.context.weaving.LoadTimeWeaverAware` |  在加载时处理类定义。 |
| `org.springframework.context.ResourceLoaderAware` |  配置加载程序以进行低级资源访问 |
| `org.springframework.context.MessageSourceAware` |  配置解析消息的策略（支持参数化和国际化） |
| `org.springframework.jmx.export.notification.NotificationPublisherAware` |  Spring JMX 通知发布者 |
| `org.springframework.web.context.ServletConfigAware` |  容器运行的当前ServletConfig仅在支持。Web 的 Spring ApplicationContext中有效 |
| `org.springframework.web.context.ServletContextAware` |  容器运行的当前ServletContext。仅在支持 Web 的 Spring ApplicationContext中有效 |

### Bean 继承

bean 定义可以包含大量配置信息，包括构造函数参数、属性值和特定于容器的信息，例如初始化方法、静态工厂方法名称等。子 bean 定义从父定义继承配置数据。子定义可以覆盖某些值或根据需要添加其他值。使用父 bean 和子 bean 定义可以节省大量的打字工作。

```xml
<bean id="inheritedTestBean" abstract="true"
		class="site.shug.spring.beans.ParentBean">
	<property name="name" value="parent"/>
	<property name="age" value="1"/>
</bean>

<bean id="inheritsWithDifferentClass"
		class="site.shug.spring.beans.ChildBean"
		parent="inheritedTestBean" init-method="initialize">  
	<property name="name" value="override"/>
</bean>
```

抽象父类可以不指定class, 父bean将无法自行实例化，因为它不完整，并且它也被显式标记为abstract。获取父Bean的实例将报错. 
```xml
<bean id="inheritedTestBean" abstract="true">
	<property name="name" value="parent"/>
	<property name="age" value="1"/>
</bean>

<bean id="inheritsWithDifferentClass"
		class="site.shug.spring.beans.ChildBean"
		parent="inheritedTestBean" init-method="initialize">  
	<property name="name" value="override"/>
</bean>
```

### 自动扫描包
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context
		https://www.springframework.org/schema/context/spring-context.xsd">

	<context:component-scan base-package="site.shug"/>

</beans>
```

忽略所有@Repository注释并使用“stub”存储库的配置：
```xml
<beans>
	<context:component-scan base-package="org.example">
		<context:include-filter type="regex"
				expression=".*Stub.*Repository"/>
		<context:exclude-filter type="annotation"
				expression="org.springframework.stereotype.Repository"/>
	</context:component-scan>
</beans>
```


## 注解配置Spring容器

注解注入在外部属性注入之前执行。因此，当通过混合方法连接时，外部配置（例如 XML 指定的 bean 属性）将覆盖属性的注释。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
		https://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context
		https://www.springframework.org/schema/context/spring-context.xsd">

	<context:annotation-config/>

</beans>
```

`<context:annotation-config/>`将注册:
- ConfigurationClassPostProcessor
- AutowiredAnnotationBeanPostProcessor
- CommonAnnotationBeanPostProcessor
- PersistenceAnnotationBeanPostProcessor
- EventListenerMethodProcessor

### Autowired

可以使用 JSR 330 的`@Inject`注解来代替 Spring 的`@Autowired`注解。

`@Autowired`可以作用于构造函数, 属性, set方法上, 将Spring容器中的Bean注入

默认情况下，当给定注入点没有匹配的候选 bean 时，自动装配会失败。对于声明的数组、集合或映射，至少需要一个匹配元素。`@Autowired(required = false)`可以跳过不可满足的注入点. 

### Primary

由于按类型自动装配可能会产生多个候选者，因此通常需要对选择过程进行更多控制。实现此目的的一种方法是使用 Spring 的@Primary注释。 @Primary指示当多个 bean 是自动装配到单值依赖项的候选者时，应优先考虑特定 bean。如果候选者中恰好存在一个主 bean，则它将成为自动装配值。


### Qualifier

您可以将限定符值与特定参数相关联，从而缩小类型匹配集的范围，以便为每个参数选择特定的 bean。

```java
public class QualifierTest {

	@Autowired
	@Qualifier("main")
	private QualifierItem item;
}
```

### Resource

按名称注入, 请使用JSR-250 `@Resource`注解, `@Resource`仅支持具有单个参数的字段和 bean 属性 setter 方法

### Value

通常用于注入外部化属性

### PostConstruct

在Bean的构造方法后执行的回掉函数

### PreDestroy

在Bean释放时的回掉函数

### Component

任何满足存储库角色或构造型（也称为数据访问对象或 DAO）的类的标记

### Repository
持久层

### Service

服务层

### Controller

表示层

### Configuration
配置Bean

### ComponentScan
自动检测这些类并注册相应的bean
```java
@Configuration
@ComponentScan(basePackages = "site.shug")
public class AppConfig  {
}
```
basePackages属性是这两个类的公共父包。 （或者，您可以指定一个逗号或分号或空格分隔的列表，其中包括每个类的父包。）

使用@Component 、 @Repository 、 @Service 、 @Controller 、 @Configuration注释的类或本身使用@Component注释的自定义注释是唯一检测到的候选组件。但是，您可以通过应用自定义过滤器来修改和扩展此行为。将它们添加为@ComponentScan注释的includeFilters或excludeFilters属性

| Type | 示例 | 介绍 |
|-----|-----|----|
| annotation | org.example.SomeAnnotation | 在目标组件上存在注解。 |
| assignable | org.example.SomeClass| 目标组件可分配给（扩展或实现）的类（或接口）。 |
| aspectj | org.example.SomeAnnotation | 与目标组件匹配的 AspectJ 类型表达式。 |
| regex | org\.example\.Default.* | 与目标组件的类名匹配的正则表达式。 |
| custom | org.example.MyTypeFilter | org.springframework.core.type.TypeFilter接口的自定义实现。 |

### Bean
@Configuration注解的类中定义 bean 元数据的相同@Bean注解来向容器提供 bean 定义元数据

### Scope
配置Bean的Scope

### Lazy

配置Bean的懒加载

### `@jakarta.inject.Named`

代替@Component

### Import

导入其他Configuration

### PropertySource

提供了一种方便的声明性机制，用于将PropertySource添加到 Spring 的Environment中。

### ImportResource
指示包含要导入的 Bean 定义的一个或多个资源。

### Profile
在一个或多个指定的配置文件处于活动状态时指示组件有资格注册。

### EnableLoadTimeWeaving
启用类加载到 Java 虚拟机 (JVM) 时动态转换类。

## ApplicationContext的附加功能

### 使用MessageSource进行国际化

ApplicationContext接口扩展了一个名为MessageSource的接口，因此提供了国际化（“i18n”）功能。当加载ApplicationContext时，它会自动搜索上下文中定义的MessageSource bean。该 bean 必须具有名称messageSource 。

### 标准和自定义事件

ApplicationContext中的事件处理是通过ApplicationEvent类和ApplicationListener接口提供的。如果将实现ApplicationListener接口的 bean 部署到上下文中，则每次将ApplicationEvent发布到ApplicationContext时，都会通知该 bean。本质上，这是标准的观察者设计模式。

### ResourceLoader

通过ResourceLoader接口访问资源，例如 URL 和文件。
实现接口ResourceLoaderAware的 bean ，在初始化时自动回调，并将应用程序上下文本身作为ResourceLoader传入。

## Resources(资源)

Spring的Resource接口位于org.springframework.core.io.包旨在成为一个更强大的接口，用于抽象对低级资源的访问。

```java
public interface Resource extends InputStreamSource {
    // 指示该资源是否实际以物理形式存在。
	boolean exists();
    // 资源是否可读
	boolean isReadable();
    // 指示该资源是否表示具有打开流的句柄。
	boolean isOpen();
    // 是否是文件
	boolean isFile();

	URL getURL() throws IOException;

	URI getURI() throws IOException;

	File getFile() throws IOException;

	ReadableByteChannel readableChannel() throws IOException;

	long contentLength() throws IOException;

	long lastModified() throws IOException;

	Resource createRelative(String relativePath) throws IOException;

	String getFilename();
    // 返回此资源的描述，用于使用资源时的错误输出。
	String getDescription();
}
```

### UrlResource

`UrlResource`包装了java.net.URL ，可用于访问通常可通过 URL 访问的任何对象，例如文件、HTTPS 目标、FTP 目标等。所有 URL 都有标准化的String表示形式，以便使用适当的标准化前缀来指示一种 URL 类型和另一种 URL 类型。这包括file:用于访问文件系统路径、 https:用于通过 HTTPS 协议访问资源、 ftp:用于通过 FTP 访问资源等。

### ClassPathResource

表示应从类路径获取的资源。它使用线程上下文类加载器、给定的类加载器或给定的类来加载资源。

### FileSystemResource

这是java.io.File句柄的Resource实现。它还支持java.nio.file.Path句柄，应用 Spring 标准的基于字符串的路径转换，但通过java.nio.file.Files API 执行所有操作。对于纯粹的基于java.nio.path.Path支持，请使用PathResource代替。 

### PathResource

这是java.nio.file.Path句柄的Resource实现，通过Path API 执行所有操作和转换。它支持解析为File和URL ，并且还实现了扩展的WritableResource接口。 

### ServletContextResource
ServletContext资源的Resource实现，它解释相关 Web 应用程序根目录中的相对路径。

### InputStreamResource

InputStreamResource是给定InputStream的Resource实现。仅当没有适用的特定Resource实现时才应使用它。特别是，尽可能首选ByteArrayResource或任何基于文件的Resource实现。

### ByteArrayResource

它对于从任何给定的字节数组加载内容非常有用，而无需求助于一次性的InputStreamResource 。

### 资源字符串

| 前缀 | 例子 | 介绍 |
|--- |--- |--- |
| classpath | classpath:com/myapp/config.xml | 从类路径加载。 |
| file | file:///com/myapp/config.xml | 从文件系统作为URL加载。 |
| https, https | https://myserver/logo.png | 作为URL加载。 |
| none |  /data/config.xml | 取决于底层的ApplicationContext  |

### ResourceLoaderAware

当一个类实现ResourceLoaderAware并部署到应用程序上下文（作为 Spring 管理的 bean）时，应用程序上下文将其识别为ResourceLoaderAware 。然后，应用程序上下文调用setResourceLoader(ResourceLoader) ，将自身作为参数提供（请记住，Spring 中的所有应用程序上下文都实现ResourceLoader接口）。

## Validator接口进行验证

Validator接口通过使用Errors对象来工作，以便在验证时，验证器可以向Errors对象报告验证失败。

```java
public interface Validator {
    // 判断此Validator是否可以验证提供的Class的实例
    boolean supports(Class<?> clazz);
    // 验证给定的对象，如果出现验证错误，则将其注册到给定的Errors对象中。
    void validate(Object target, Errors errors);
}
```


## BeanWrapper

 JavaBean 是一个具有默认无参数构造函数的类，并且遵循命名约定，其中（例如）名为bingoMadness的属性将具有 setter 方法setBingoMadness(..)和 getter 方法getBingoMadness() 。

 ```java

public class Person {
    private String name;
    private int age;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
}

BeanWrapper bw = new BeanWrapperImpl(new Person());
bw.setPropertyValue("name", "John");
bw.setPropertyValue("age", "25"); // 自动将字符串转换为整数

```

设置和获取属性可以通过BeanWrapper的setPropertyValue和getPropertyValue重载方法变体完成的。

## PropertyEditor

### 内置PropertyEditor

| 类 | 介绍 |
|--- |--- |
| ByteArrayPropertyEditor | 字节数组的编辑器。将字符串转换为其相应的字节表示形式。 |
| ClassEditor | 将表示类的字符串解析为实际类。 |
| CustomBooleanEditor | Boolean属性的可定制属性编辑器。 |
| CustomCollectionEditor | 集合的属性编辑器，将任何源Collection转换为给定的目标Collection类型。 |
| CustomDateEditor | java.util.Date的可自定义属性编辑器，支持自定义DateFormat 。默认情况下未注册。 |
| CustomNumberEditor | 适用于任何Number子类的可自定义属性编辑器，例如Integer 、 Long 、 Float或Double 。 |
| FileEditor | 将字符串解析为java.io.File对象。 |
| InputStreamEditor | 一种单向属性编辑器，可以接受字符串并生成（通过中间ResourceEditor和Resource ）一个InputStream ，以便可以将InputStream属性直接设置为字符串。请注意，默认用法不会为您关闭InputStream 。 |
| LocaleEditor | 可以将字符串解析为Locale对象。 |
| PatternEditor | 可以将字符串解析为java.util.regex.Pattern对象。 |
| PropertiesEditor | 可以将字符串（按照java.util.Properties类的 javadoc 中定义的格式格式化）转换为Properties对象。 |
| StringTrimmerEditor | 修剪字符串的属性编辑器。 （可选）允许将空字符串转换为null值。默认情况下未注册 - 必须由用户注册。 |
| URLEditor | 可以将 URL 的字符串表示形式解析为实际的URL对象。 |

### 自定义

```java
public class ExoticType {

	private String name;

	public ExoticType(String name) {
		this.name = name;
	}
}
```

```java
public class ExoticTypeEditor extends PropertyEditorSupport {

	public void setAsText(String text) {
		setValue(new ExoticType(text.toUpperCase()));
	}
}
```

注册自定义PropertyEditor

使用xml配置
```xml
<bean class="org.springframework.beans.factory.config.CustomEditorConfigurer">
	<property name="customEditors">
		<map>
			<entry key="example.ExoticType" value="example.ExoticTypeEditor"/>
		</map>
	</property>
</bean>
```

使用PropertyEditorRegistrar

```java

public final class CustomPropertyEditorRegistrar implements PropertyEditorRegistrar {

	public void registerCustomEditors(PropertyEditorRegistry registry) {

		registry.registerCustomEditor(ExoticType.class, new ExoticTypeEditor());

	}
}
```

```xml
<bean class="org.springframework.beans.factory.config.CustomEditorConfigurer">
	<property name="propertyEditorRegistrars">
		<list>
			<ref bean="customPropertyEditorRegistrar"/>
		</list>
	</property>
</bean>

<bean id="customPropertyEditorRegistrar"
	class="com.foo.editors.spring.CustomPropertyEditorRegistrar"/>
```

## 类型转换

core.convert包提供了一个通用的类型转换系统。系统定义了一个SPI来实现类型转换逻辑和一个API来在运行时执行类型转换。在 Spring 容器中，您可以使用该系统作为PropertyEditor实现的替代方案，将外部化 bean 属性值字符串转换为所需的属性类型。您还可以在应用程序中需要类型转换的任何位置使用公共 API。


实现`org.springframework.core.convert.converter.Converter`

```java
package org.springframework.core.convert.converter;

public interface Converter<S, T> {

	T convert(S source);
}
```

要创建您自己的转换器，请实现Converter接口并将S参数化为要转换的类型，将T参数化为要转换的目标类型。如果需要将S的集合或数组转换为T的数组或集合，您还可以透明地应用此类转换器，前提是委托数组或集合转换器也已注册（默认情况下DefaultConversionService会注册）。

为了方便起见， core.convert.support包中提供了几种转换器实现。

### ConverterFactory

您需要集中整个类层次结构的转换逻辑时（例如，从String转换为Enum对象时），您可以实现ConverterFactory

```java
package org.springframework.core.convert.converter;

public interface ConverterFactory<S, R> {

	<T extends R> Converter<S, T> getConverter(Class<T> targetType);
}
```

### GenericConverter

```java
package org.springframework.core.convert.converter;

public interface GenericConverter {

	public Set<ConvertiblePair> getConvertibleTypes();

	Object convert(Object source, TypeDescriptor sourceType, TypeDescriptor targetType);
}
```
当您需要复杂的Converter实现时，请考虑使用GenericConverter接口。 GenericConverter具有比Converter更灵活但类型不太强的签名，支持在多个源类型和目标类型之间进行转换。此外， GenericConverter提供了可用的源和目标字段上下文，您可以在实现转换逻辑时使用它们。这样的上下文允许类型转换由字段注释或字段签名上声明的通用信息驱动。

### ConditionalGenericConverter

希望Converter仅在特定条件成立时运行。例如，您可能希望仅当目标字段上存在特定注释时才运行Converter ，或者仅当目标类上定义了特定方法（例如static valueOf方法）时您可能希望运行Converter 。 ConditionalGenericConverter是GenericConverter和ConditionalConverter接口的联合。

```java
public interface ConditionalConverter {

	boolean matches(TypeDescriptor sourceType, TypeDescriptor targetType);
}

public interface ConditionalGenericConverter extends GenericConverter, ConditionalConverter {
}
```

### ConversionService

```java
package org.springframework.core.convert;

public interface ConversionService {

	boolean canConvert(Class<?> sourceType, Class<?> targetType);

	<T> T convert(Object source, Class<T> targetType);

	boolean canConvert(TypeDescriptor sourceType, TypeDescriptor targetType);

	Object convert(Object source, TypeDescriptor sourceType, TypeDescriptor targetType);
}
```
定义了统一的 API，用于在运行时执行类型转换逻辑。


## Spring单元调试

将Junit5和Spring整合

条件依赖

```kotlin
    implementation("org.springframework:spring-test:6.1.12")
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
```

根据junit.xml创建Spring容器

```java
@SpringJUnitConfig(locations = "classpath:junit.xml")
public class SpringJunitTest {
    @Resource
    private XmlUser xmlUser;
    @Test
    void testXmlUser() {
        System.out.println(xmlUser);
    }
}
```

根据配置类创建Spring容器

```java
@SpringJUnitConfig(classes = AnnoUser.class)
public class SpringJunitAnnoTest {
    @Resource
    private AnnoUser annoUser;
    @Test
    void testXmlUser() {
        System.out.println(annoUser);
    }
}
```