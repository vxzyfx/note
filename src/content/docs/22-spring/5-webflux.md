---
title: WebFlux
---

Spring WebFlux 是 Spring 框架的一部分，用于构建反应式（Reactive）Web 应用程序。它在 Spring 5 中引入，旨在处理异步和非阻塞的请求，特别适合需要高度可扩展性和高效处理大量并发连接的现代 Web 应用程序。

## Spring WebFlux 的关键特性：

1. **反应式编程模型**：
   - Spring WebFlux 基于 Reactive Streams 规范定义的反应式编程原则。
   - 它支持背压（Backpressure），有助于管理应用程序中不同组件之间的数据流。

2. **异步和非阻塞**：
   - 与基于同步和阻塞 I/O 模型的传统 Spring MVC 不同，WebFlux 使用非阻塞 I/O，允许服务器以更少的资源处理更多请求。
   - 这对需要处理大量并发连接或实时提供内容的应用程序特别有利。

3. **函数式和基于注解的端点**：
   - Spring WebFlux 支持基于注解的编程（类似于 Spring MVC）和函数式编程风格。
   - 开发者可以使用函数式编程构建路由和处理器，提供了更大的灵活性并减少样板代码。

4. **可扩展性**：
   - 由于其非阻塞特性，Spring WebFlux 可以使用更少的线程处理大量并发请求，相比传统的同步 Web 框架，更具可扩展性。

5. **与反应式库的集成**：
   - WebFlux 无缝集成了流行的反应式库，如 Reactor（Spring 默认使用的反应式库）和 RxJava。
   - 这使开发者可以轻松使用各种反应式操作符，并组合复杂的数据处理管道。

6. **支持多种服务器运行时环境**：
   - WebFlux 不依赖于特定的服务器实现。它可以运行在传统的 Servlet 容器上（如 Tomcat，需使用适配器），也可以运行在完全非阻塞的服务器上（如 Netty、Undertow 等）。

7. **数据流和数据处理**：
   - WebFlux 支持流式处理大数据集，使应用程序能够在数据到达时处理并提供数据，而不必等待整个数据集可用。

8. **适用场景**：
   - 非常适合需要处理实时数据的应用程序，例如聊天应用、实时内容更新或物联网系统。
   - 适用于需要高并发和高效资源利用率的微服务架构。

示例代码：


```java
@Configuration
@EnableWebFlux
@ComponentScan
public class WebFluxConfig {
    @Bean
    public RouterFunction<ServerResponse> routerFunction() {
        return route(GET("/hello"),
                request -> ServerResponse.ok().body(Mono.just("Hello, WebFlux!"), String.class));
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(WebFluxConfig.class);
        HttpHandler httpHandler = WebHttpHandlerBuilder.applicationContext(context).build();
        HttpServer.create()
                .port(8080)
                .handle(new ReactorHttpHandlerAdapter(httpHandler))
                .bindNow()
                .onDispose()
                .block();
    }
}
```

Spring WebFlux支持`RouterFunction`和`Controller`两种路由定义方式,
- Controller: 适合大多数 Web 应用程序开发场景，尤其是与传统的 MVC 模式兼容的场景。
- RouterFunction: 更灵活且更符合函数式编程范式。可以通过组合函数来构建复杂的路由逻辑。

### HttpHandler

使用非阻塞 I/O 和 Reactive Streams 背压处理 HTTP 请求的基本接口:
```java
public interface HttpHandler {

	/**
	 * 处理HTTP请求
	 * @param request 请求
	 * @param response 响应
	 * @return 表示请求处理完成
	 */
	Mono<Void> handle(ServerHttpRequest request, ServerHttpResponse response);

}
```

### WebHandler
类似于Spring MVC中的`DispatcherHandler`提供用于请求处理的共享算法，而实际工作由可配置的委托组件执行。

```java
public interface WebHandler {

	/**
	 * @param exchange 当前服务器交换
	 * @return 表示请求处理完成
	 */
	Mono<Void> handle(ServerWebExchange exchange);
}
```

### WebHttpHandlerBuilder
用于构建 HttpHandler 的一个实用类。WebHttpHandlerBuilder可以在 Spring ApplicationContext 中自动检测或可以直接注册的组件：

| Bean名称 | Bean类型 | 数量 | 介绍 |
|-----|------|-----|-----|
| `<any>` | WebExceptionHandler | 0..N | 提供对WebFilter实例链和目标WebHandler异常的处理。 |
| `<any>` | WebFilter | 0..N | 将拦截样式逻辑应用于过滤器链的其余部分和目标WebHandler前后。 |
| `webHandler` | WebHandler | 1 | 请求的处理程序。 |
| `webSessionManager` | WebSessionManager | 0..1 | 通过ServerWebExchange上的方法公开的WebSession实例的管理器。默认情况下为DefaultWebSessionManager 。 |
| `serverCodecConfigurer` | ServerCodecConfigurer | 0..1 | 用于访问HttpMessageReader实例以解析表单数据和多部分数据，然后通过ServerWebExchange上的方法公开这些数据。默认情况下ServerCodecConfigurer.create() 。 |
| `localeContextResolver` | LocaleContextResolver | 0..1 | 通过ServerWebExchange上的方法公开的LocaleContext解析器。默认情况下AcceptHeaderLocaleContextResolver 。 |
| `forwardedHeaderTransformer` | ForwardedHeaderTransformer | 0..1 | 用于处理转发的类型标头，通过提取并删除它们或仅删除它们。默认情况下不使用。 |


### Filters

在WebHandler API中，可以使用WebFilter在过滤器处理链的其余部分和目标WebHandler之前和之后应用拦截式逻辑。使用WebFlux Config时，注册WebFilter就像将其声明为 Spring bean 并（可选）通过在 bean 声明上使用@Order或实现Ordered来表达优先级一样简单。

### CORS 跨域资源共享

Spring WebFlux 通过控制器上的注释为 CORS 配置提供细粒度的支持。但是，当您与 `Spring Security` 一起使用时，建议依赖内置的`CorsFilter` ，它必须在 Spring Security 的过滤器链之前排序。

### WebExceptionHandler

使用WebExceptionHandler来处理来自WebFilter实例链和目标WebHandler的异常。使用WebFlux Config时，注册WebExceptionHandler非常简单，只需将其声明为 Spring bean 并（可选）通过在 bean 声明上使用@Order或实现Ordered来表达优先级。

可用的WebExceptionHandler实现:
| 类 | 介绍 |
|---|---|
| `ResponseStatusExceptionHandler` | 通过将响应设置为异常的 HTTP 状态代码，提供对ResponseStatusException类型的异常的处理。 |
| `WebFluxResponseStatusExceptionHandler` | ResponseStatusExceptionHandler的扩展，还可以确定任何异常上的@ResponseStatus注释的 HTTP 状态代码。 |

### Codecs 编解码器
`spring-web`和`spring-core`模块通过具有反应流背压的非阻塞 I/O，支持对更高级别对象之间的字节内容进行序列化和反序列化。下面描述了这种支持：
- `Encoder`和`Decoder`是独立于 HTTP 的低级合约，用于对内容进行编码和解码。
- `HttpMessageReader`和`HttpMessageWriter`是对 HTTP 消息内容进行编码和解码的合约。
- `Encoder`可以使用`EncoderHttpMessageWriter`进行包装，以使其适合在 Web 应用程序中使用，而`Decoder`可以使用`DecoderHttpMessageReader`进行包装。

## Spring Security

添加依赖`org.springframework.security:spring-security-web`和`org.springframework.security:spring-security-config`

启用Security的注解`EnableWebFluxSecurity`, 开启方法授权`EnableReactiveMethodSecurity`.


```java
@Bean
public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
   http
            .authorizeExchange(exchanges -> exchanges
                  .pathMatchers("/login").permitAll() // 放行 /login
                  .anyExchange().denyAll() // 阻止其他
            );
   return http.build();
}

@Bean
public ReactiveAuthenticationManager authenticationManager(ReactiveUserDetailsService userDetailsService) {
   return new UserDetailsRepositoryReactiveAuthenticationManager(userDetailsService);
}

@Bean
public MapReactiveUserDetailsService userDetailsService() {
   UserDetails user = new User("user", "{noop}user", new ArrayList<>());
   return new MapReactiveUserDetailsService(user);
}

@Bean
public PasswordEncoder passwordEncoder() {
   return PasswordEncoderFactories.createDelegatingPasswordEncoder();
}
```