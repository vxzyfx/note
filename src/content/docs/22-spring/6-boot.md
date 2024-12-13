---
title: Spring Boot
---

Spring Boot 是由 Pivotal 团队开发的一个基于 Spring 框架的框架，用于简化 Spring 应用程序的开发。它以约定优于配置（Convention over Configuration）为理念，提供了开箱即用的功能，大大减少了项目配置的复杂性。Spring Boot 通过自动配置、内嵌服务器、独立运行的 JAR 文件等特性，使得开发者能够快速创建生产级别的 Spring 应用。

## Spring Boot 的主要特性

1. **自动配置（Auto-Configuration）**：
   - Spring Boot 提供了自动配置功能，它会根据项目中的依赖和配置自动设置应用程序的各种配置。这意味着你可以减少大量的 XML 或 Java 配置代码。

2. **独立运行的 JAR 文件**：
   - Spring Boot 应用可以打包为一个独立运行的 JAR 文件，内嵌 Tomcat、Jetty 或 Undertow 服务器。这使得应用程序可以像普通的 Java 程序一样，通过 `java -jar` 命令启动，无需依赖外部应用服务器。

3. **起步依赖（Starter Dependencies）**：
   - Spring Boot 提供了一系列“起步依赖”（Starter），这些依赖封装了常用的功能模块。例如，`spring-boot-starter-web` 提供了构建 Web 应用程序所需的所有依赖。使用起步依赖，可以大大简化依赖管理。

4. **嵌入式服务器**：
   - Spring Boot 应用内嵌了 Tomcat、Jetty 或 Undertow 服务器，你不需要单独配置或安装服务器。内嵌服务器可以使应用更容易部署和维护。

5. **生产级别的准备（Production-Ready Features）**：
   - Spring Boot 提供了多种生产级别的功能，包括监控、度量（Metrics）、健康检查（Health Checks）、外部化配置、日志管理等，这些功能可以通过 Actuator 实现，帮助你在生产环境中更好地管理和监控应用。

6. **外部化配置**：
   - Spring Boot 支持使用属性文件（`application.properties` 或 `application.yml`）、环境变量、命令行参数等多种方式进行配置。它还支持配置文件的分层和优先级，使得配置更灵活。

7. **Spring Boot CLI**：
   - Spring Boot 提供了一个命令行工具（CLI），允许你用 Groovy 语言编写 Spring Boot 应用。CLI 工具非常适合快速原型开发。

8. **简化的测试支持**：
   - Spring Boot 集成了 JUnit 和其他测试框架，提供了简单的注解和工具来快速编写和运行测试。通过 `@SpringBootTest` 注解，你可以轻松启动一个 Spring 应用的完整上下文进行测试。


```java
// @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class}) 排除配置类
@SpringBootApplication
public class BootmvcApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootmvcApplication.class, args);
    }

}
```

## 使用

### 自定义banner

1. `banner.txt`
变量:

| 变量 | 介绍 |
|----|----|
| `${application.version}` | 应用程序的版本号 |
| `${application.formatted-version}` | 应用程序的版本号，在MANIFEST.MF中声明并格式化为显示（用方括号括起来并以v为前缀） |
| `${spring-boot.version}` | 您正在使用的 Spring Boot 版本 |
| `${spring-boot.formatted-version}` | 您正在使用的 Spring Boot 版本，已格式化以供显示（用方括号括起来并以v为前缀） |
| `${Ansi.NAME}` (or `${AnsiColor.NAME}`, `${AnsiBackground.NAME}`, `${AnsiStyle.NAME}`) | 其中NAME是 ANSI 转义码的名称 |
| `${application.title}` | 应用程序的标题 |

2. `SpringApplication.setBanner`
实现`org.springframework.boot.Banner`编程设置Banner.

### 加载外部属性

`@Value`可以直接注入字符串, 通过 Spring 的Environment抽象访问，或者通过@ConfigurationProperties.

获取数据的顺序:
1. 默认属性（通过设置指定 `SpringApplication.setDefaultProperties` ）
2. `@Configuration`类上的`@PropertySource`注释。请注意，在刷新应用程序上下文之前，此类属性源不会添加到`Environment`中
3. 配置数据（例如`application.properties`文件）
4. 仅在`random.*`中具有属性的`RandomValuePropertySource`
5. 操作系统环境变量
6. Java 系统属性 ( `System.getProperties()` )
7. 来自`java:comp/env JNDI` 属性
8. `ServletContext`初始化参数
9. `ServletConfig`初始化参数
10. 来自`SPRING_APPLICATION_JSON`的属性
11. 命令行参数
12. 测试中的`properties`属性
13. 测试中的`@DynamicPropertySource`注释
14. 测试上的`@TestPropertySource`注释
15. 当 devtools 处于活动状态时`$HOME/.config/spring-boot`目录中的Devtools 全局设置属性

配置数据文件按以下顺序考虑:
1. 打包在 jar 内的应用程序属性（ `application.properties`和 YAML 变体）
2. 打包在 jar 内的特定于配置文件的应用程序属性(`application-{profile}.properties` 和 YAML 变体)
3. 打包的 jar 之外的应用程序属性（ `application.properties`和 YAML 变体）
4. 打包的 jar 之外的特定于配置文件的应用程序属性( `application-{profile}.properties` 和 YAML 变体)

`@ConfigurationProperties`配置

```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private int timeout;

    // getter和setter方法
}
```

```java
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

```yaml
app:
  name: MyApp
  timeout: 30
```

可以直接注入`AppProperties`的Bean

### 国际化

当配置的资源包的默认属性文件可用时（默认为`messages.properties` ），自动配置将适用。如果您的资源包仅包含特定于语言的属性文件，则需要添加默认值。如果没有找到与任何配置的基本名称匹配的属性文件，则不会有自动配置的`MessageSource` 。

自定义国际化文件
```yaml
spring:
  messages:
    basename: "messages,config.i18n.messages"
    fallback-to-system-locale: false
```

### 面向切面

默认情况下，Spring Boot 的自动配置将 Spring AOP 配置为使用 CGLib 代理。要改用 JDK 代理，请设置 `configprop:spring.aop.proxy-target-class` 为`false` 。
如果 AspectJ 在类路径上，Spring Boot 的自动配置将自动启用 AspectJ 自动代理，这样就不需要`@EnableAspectJAutoProxy`。

### Json

Spring Boot 提供与三个 JSON 映射库的集成: `Gson`, `Jackson`和`JSON-B`。Jackson 是首选和默认库。
Jackson 是`spring-boot-starter-json`的一部分。当 Jackson 位于类路径上时，会自动配置ObjectMapper bean。

### 调度

如果上下文中缺少`Executor` bean，Spring Boot 会自动配置`AsyncTaskExecutor` 。当启用虚拟线程时（使用 Java 21+ 和 `spring.threads.virtual.enabled` 设置为true ）这将是一个使用虚拟线程的`SimpleAsyncTaskExecutor` 。否则，它将是一个具有合理默认值的`ThreadPoolTaskExecutor` 。在任何一种情况下，自动配置的执行器将自动用于:

1. 异步任务执行（ `@EnableAsync` ）
2. `Spring for GraphQL` 对来自控制器方法的Callable返回值的异步处理
3. `Spring MVC`的异步请求处理
4. `Spring WebFlux` 的阻塞执行支持

配置默认的`ThreadPoolTaskExecutor`

```yaml
spring:
  task:
    execution:
      pool:
        max-size: 16
        queue-capacity: 100
        keep-alive: "10s"
```
这会将线程池更改为使用有界队列，以便当队列已满（100 个任务）时，线程池会增加到最多 16 个线程。池的收缩更加积极，因为线程空闲 10 秒（而不是默认情况下 60 秒）时就会被回收。


## 模块

### `spring-boot-devtools`

依赖`developmentOnly("org.springframework.boot:spring-boot-devtools")`

作用: 开启热启动.

### `spring-boot-starter-actuator`

依赖`implementation("org.springframework.boot:spring-boot-starter-actuator")`

作用: 监控和管理应用程序。它提供了许多端点，如检查应用健康状态、收集性能指标、查看环境属性等.


