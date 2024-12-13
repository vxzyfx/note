---
title: Spring MVC
---

## Jakarta EE

原来的名字是JavaEE是Java Platform Enterprise Edition的缩写，即Java企业平台。完全基于JavaSE，只是多了一大堆服务器相关的库以及API接口。

依赖项`jakarta.servlet:jakarta.servlet-api`

### Servlet

Servlet是JavaEE平台上处理HTTP的类.

```java
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * 所有Servlet都继承HttpServlet
 * urlPatterns表示访问路径
 */
@WebServlet(urlPatterns = "/")
public class HelloServlet extends HttpServlet {
    /**
     * 
     * @param req HTTP 请求
     * @param resp HTTP 返回
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter writer = resp.getWriter();
        writer.write("<html><body>");
        writer.write("<h1>Hello World!</h1>");
        writer.write("</body></html>");
        writer.flush();
        writer.close();
    }
}

```

通过嵌入式Tomcat运行Servlet, 依赖项`org.apache.tomcat.embed:tomcat-embed-core`

直接运行servlet
```java

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.connector.Connector;
import org.apache.catalina.startup.Tomcat;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class Main {

    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        // 手动创建Connector, 如果要tomcat创建默认Connector, 需要调用tomcat.getConnector()才会创建
        Connector connector = new Connector();
        connector.setPort(8080);
        tomcat.setConnector(connector);

        Context context = tomcat.addContext("", new File("mvc/src/main/webapp").getAbsolutePath());
        Tomcat.addServlet(context, "MVC", new HttpServlet() {
            @Override
            protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                PrintWriter writer = resp.getWriter();
                writer.write("<html><body>");
                writer.write("<h1>Hello World!</h1>");
                writer.write("</body></html>");
                writer.flush();
                writer.close();
            }
        });
        context.addServletMappingDecoded("/*", "MVC");
        tomcat.start();
        tomcat.getServer().await();
    }
}
```

运行war包, 添加war包的构建插件
```kotlin
plugins {
    id("war")
}
```
打代码成war包

```java
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.connector.Connector;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

public class Main {

    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        // 手动创建Connector, 如果要tomcat创建默认Connector, 需要调用tomcat.getConnector()才会创建
        Connector connector = new Connector();
        connector.setPort(8080);
        tomcat.setConnector(connector);

        Context context = tomcat.addWebapp("", new File("mvc/build/libs/mvc-1.0-SNAPSHOT.war").getAbsolutePath());
        tomcat.start();
        tomcat.getServer().await();
    }
}
```

### JSP

添加依赖`org.apache.tomcat.embed:tomcat-embed-jasper`, JSP的本质还是一个Servlet, 是通过`org.apache.tomcat.embed:tomcat-embed-jasper`在访问时动态生成的Sevlet实现.

JSP的语法, 与HTML没有太大区别, 在需要插入值的地方使用`<% ... %>`

`<%-- 注释 --%>`: 注释语法
`<% Java代码 %>`: 插入Java代码
`<%=  变量 %>`: 快捷输出变量

内置变量:
- out: HttpServletResponse的PrintWriter
- session: 表示当前HttpSession对象
- equest: 表示HttpServletRequest对象

高级功能:
`<%@ page import="java.io.File" %>`: 导入Java类
`<%@ include file="header.jsp"%>`: 引入其他JSP文件

### 结合Servlet和JSP

User类的定义
```java
public class User {
    public long id;
    public String name;
    public String picture;
}
```

```java
@WebServlet(urlPatterns = "/user")
public class UserServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 创建User类
        User user = new User(123, "Bob", "https://example.com/1.png");
        // 放入Request中
        req.setAttribute("user", user);
        // WEB-INF是一个特殊目录，Web Server会阻止浏览器对WEB-INF目录下任何资源的访问，这样就防止用户通过/user.jsp路径直接访问到JSP页面
        // forward给user.jsp
        req.getRequestDispatcher("/WEB-INF/user.jsp").forward(req, resp);
    }
}

```

```xml
<%@ page import="User"%>
<%
    User user = (User) request.getAttribute("user");
%>
<html>
<head>
    <title>Hello World - JSP</title>
</head>
<body>
    <h1>Hello <%= user.name %>!</h1>
</body>
</html>
```

### Filter

```java
/**
 * Filter 拦截请求和修改请求
 */
@WebFilter("/user")
public class UserFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("UserFilter HostName: " + servletRequest.getRemoteHost());
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String userName = request.getHeader("user");
        if (Objects.equals(userName, "shug")) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter writer = response.getWriter();
            writer.write("<html>");
            writer.write("<head>");
            writer.write("</head>");
            writer.write("<body>");
            writer.write("无效用户");
            writer.write("</body>");
            writer.write("</html>");
        }
    }
}
```

### Listener
使用WebListener注解, 并实现特定接口的类, 才能监听事件.

- ServletContextListener: 整个Web应用程序初始化完成后，以及Web应用程序关闭后获得回调通知
- HttpSessionListener: 监听HttpSession的创建和销毁事件；
- ServletRequestListener: 监听ServletRequest请求的创建和销毁事件；
- ServletRequestAttributeListener: 监听ServletRequest请求的属性变化事件（即调用ServletRequest.setAttribute()方法）；
- ServletContextAttributeListener: 监听ServletContext的属性变化事件（即调用ServletContext.setAttribute()方法）；


## Spring

Java有许多MVC框架, Spring MVC只是其中的一种.

### 开启Spring MVC

```java
public class Main {
    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        // 手动创建Connector, 如果要tomcat创建默认Connector, 需要调用tomcat.getConnector()才会创建
        Connector connector = new Connector();
        connector.setPort(8080);
        tomcat.setConnector(connector);
        Context context = tomcat.addWebapp("", new File("mvc/src/main/webapp").getAbsolutePath());
        // 创建 DispatcherServlet
        DispatcherServlet servlet = new DispatcherServlet();
        // 配置Spring容器
        servlet.setContextClass(org.springframework.web.context.support.AnnotationConfigWebApplicationContext.class);
        servlet.setContextConfigLocation("site.shug.spring.mvc.config.WebConfig"); // 配置类
        Tomcat.addServlet(context, "MVC", servlet);
        context.addServletMappingDecoded("/*", "MVC");
        tomcat.start();
        tomcat.getServer().await();
    }
}
```

```java
@Configuration
@ComponentScan(basePackages = "site.shug.spring.mvc")
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
}

```

`EnableWebMvc`开启Spring MVC的功能, 实际导入的是`DelegatingWebMvcConfiguration`这个`WebMvcConfigurationSupport`的默认子类, 实现`WebMvcConfigurer`可以完成以下自定义功能, 如果不使用`EnableWebMvc`, 可以继承`WebMvcConfigurationSupport`或`DelegatingWebMvcConfiguration`.


```java
/**
 * Controller 主要用于返回视图（通常是HTML、JSP等）或处理请求并返回模型数据。
 * ResponseBody 返回纯数据而不是视图
 * RestController = Controller + ResponseBody
 */
@Controller
public class HelloController {
    @GetMapping("/hello")
    public String sayHello() {
        return "hello";
    }
}
```

要支持Json需要加入依赖`com.fasterxml.jackson.core:jackson-databind`.

### 结合Spring和Servlet

在Filter中使用Spring的Bean

```java
@Configuration
@ComponentScan(basePackages = "site.shug.spring.mvc")
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer, WebApplicationInitializer {
    /**
     * DelegatingFilterProxy可以将Spring容器的Bean在Filter中使用
     */
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        System.out.println("OnStartup");
        DelegatingFilterProxy proxy = new DelegatingFilterProxy();
        // 代理Bean的名称
        proxy.setTargetBeanName("myResponseFilter");
        FilterRegistration.Dynamic filter = servletContext.addFilter("MyFilter", proxy);
        filter.addMappingForUrlPatterns(null, false, "/*");
    }
}

```

### Interceptor

在Spring MVC中可以使用`Interceptor`, 代替`Filter`,两者的不同是`Filter`在`DispatcherServlet`之前工作, `Interceptor`在`DispatcherServlet`和`DispatcherServlet`之间.

使用`Interceptor`由Spring容器管理, 注入Bean十分简单. 并且多个`Interceptor`可以通过`@Order`指定顺序.

```java
@Component
public class SayByeHandlerInterceptor implements HandlerInterceptor {
    /**
     * Controller方法调用前执行
     * @param request 当前请求
     * @param response 响应
     * @param handler chosen handler to execute, for type and/or instance evaluation
     * @return false表示不再调用Controller, true表示继续执行
     * @throws Exception 异常信息
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 在Controller处理前, 才能修改HttpServletResponse的Header
        response.setHeader("say", "bye");
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    /**
     * Controller方法正常返回后
     * @param request 当前请求
     * @param response 响应
     * @param handler Controller的方法
     * @param modelAndView Controller返回的ModelAndView, 如果Controller不是返回的ModelAndView, 则为null
     * @throws Exception 异常信息
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 无论Controller方法是否抛异常都会执行
     * @param request 当前请求
     * @param response Controller的方法
     * @param handler Controller的方法
     * @param ex Controller返回的异常
     * @throws Exception 异常信息
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

注册HandlerInterceptor

```java
    /**
     * 注册所有HandlerInterceptor
     */
    @Bean
    public WebMvcConfigurer createWebMvcConfigurer(HandlerInterceptor[] handlerInterceptors) {
        return new WebMvcConfigurer() {
            public void addInterceptors(InterceptorRegistry registry) {
                for (HandlerInterceptor interceptor : handlerInterceptors) {
                    registry.addInterceptor(interceptor);
                }
            }
        };
    }
```

`ExceptionHandler`异常处理方法

```java
@RestController
public class UserController {
    @GetMapping("/ex")
    public void ex() {
        throw new RuntimeException("产生异常");
    }
    /**
     * 仅可以捕获当前Controller的异常
     * @param e 没有固定参数可以传入Exception, HttpServletRequest等,
     * 返回值可以是void, ModelAndView
     */
    @ExceptionHandler(RuntimeException.class)
    public void handlerException(Exception e) {
        System.out.println("catch RuntimeException: " + e.getMessage());
    }
}

```

捕获其他Controller的异常
```java
@RestControllerAdvice
public class MyControllerAdvice {
    @ExceptionHandler(value = Exception.class)
    Map<String, String> handler(Exception e) {
        Map<String, String> map = new HashMap<>();
        map.put("msg", e.getMessage());
        return map;
    }
}

```

### CORS

使用`CrossOrigin`处理Controller级别的跨域请求
```java
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ApiController {
}
```

全局CORS配置

```java
    @Bean
    public WebMvcConfigurer createWebMvcConfigurer(HandlerInterceptor[] handlerInterceptors) {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .maxAge(3600);
            }
        };
    }
```

### 国际化

Spring MVC通过`LocaleResolver`来自动从`HttpServletRequest`中获取`Locale`。有多种LocaleResolver的实现类，其中最常用的是`CookieLocaleResolver`

```java
@Primary
@Bean
LocaleResolver createLocaleResolver() {
    var clr = new CookieLocaleResolver();
    clr.setDefaultLocale(Locale.ENGLISH);
    clr.setDefaultTimeZone(TimeZone.getDefault());
    return clr;
}
```

创建`MessageSource`
```java
    @Bean("i18n")
    MessageSource createMessageSource() {
        var messageSource = new ResourceBundleMessageSource();
        // 指定文件是UTF-8编码:
        messageSource.setDefaultEncoding("UTF-8");
        // 指定主文件名:
        messageSource.setBasename("messages");
        return messageSource;
    }
```

使用国际化
```java
@RestController("/")
public class UserController {
    @Autowired
    LocaleResolver localeResolver;

    @Autowired
    @Qualifier("i18n")
    MessageSource messageSource;

    @GetMapping("/say")
    public String sayHello(HttpServletRequest request) {
        Locale locale = localeResolver.resolveLocale(request);
        return messageSource.getMessage("say", null, locale);
    }

}

```

### WebSocket

WebSocket是一种基于HTTP的长链接技术。依赖项`org.springframework:spring-websocket`和`org.apache.tomcat.embed:tomcat-embed-websocket`,
通过`EnableWebSocket`开启WebSockets.

```java
    @Bean
    WebSocketConfigurer createWebSocketConfigurer(
            @Autowired ChatHandler chatHandler,
            @Autowired ChatHandshakeInterceptor chatInterceptor)
    {
        return new WebSocketConfigurer() {
            public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
                // 把URL与指定的WebSocketHandler关联，可关联多个:
                registry.addHandler(chatHandler, "/chat").addInterceptors(chatInterceptor);
            }
        };
    }
```

`ChatHandler`和`ChatHandshakeInterceptor`的代码

```java
@Component
public class ChatHandler extends TextWebSocketHandler {
    private Map<String, WebSocketSession> clients = new ConcurrentHashMap<>();

    /**
     * 成功建立连接后执行
     * @param session WebSocket的会话
     * @throws Exception 异常
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        clients.put(session.getId(), session);
        System.out.println("afterConnectionEstablished");
        session.getAttributes().put("client", "Guest1");
    }

    /**
     * 连接关闭后执行
     * @param session WebSocket的会话
     * @param status 关闭状态
     * @throws Exception 异常
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("afterConnectionClosed");
        clients.remove(session.getId());
    }
}

```

```java
@Component
public class ChatHandshakeInterceptor implements HandshakeInterceptor {

    /**
     * WebSocket连接前执行
     * @return 返回false将不再继续执行
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        System.out.println("beforeHandshake");
        return true;
    }

    /**
     * WebSocket连接后执行
     */
    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        System.out.println("afterHandshake");
    }
}

```

## Security

Spring Security 是一个强大且高度可定制的框架，用于为 Java 应用程序提供身份验证、授权和防护功能。它是 Spring 框架的一个子项目，最初名为 Acegi Security，后更名为 Spring Security。Spring Security 被广泛应用于企业级应用程序中，以确保应用程序的安全性。

### 关键特性

1. **身份验证（Authentication）**:
   - Spring Security 提供多种身份验证方式，包括基于表单的登录、HTTP Basic 认证、OAuth2、JWT 等。它支持多种身份验证机制的组合，允许开发者自定义身份验证逻辑。
   - 内置支持用户存储在内存、数据库、LDAP 等多种数据源中的方式。

2. **授权（Authorization）**:
   - 授权是指确定用户是否有权访问特定资源或执行某项操作。Spring Security 提供基于角色、权限（Authority）和表达式的细粒度访问控制。
   - 可以通过注解（如 `@PreAuthorize`、`@Secured` 等）或配置类的方式定义访问控制规则。

3. **防护（Protection）**:
   - Spring Security 提供了许多安全防护功能，例如防止跨站请求伪造（CSRF）、点击劫持（Clickjacking）、会话固定攻击（Session Fixation）、跨站脚本攻击（XSS）等。
   - 内置的过滤器链能够拦截和处理绝大多数常见的 Web 安全威胁。

4. **集成与扩展性**:
   - Spring Security 无缝集成了 Spring 生态系统中的其他组件，如 Spring Boot、Spring MVC、Spring Data 等。
   - 提供了良好的扩展点，允许开发者根据需求自定义身份验证和授权的行为。

5. **安全表达式**:
   - Spring Security 提供了丰富的表达式语言（SpEL）用于定义安全规则。例如，可以在方法上使用 `@PreAuthorize` 注解来控制方法调用的访问权限。

6. **单点登录（SSO）和 OAuth2 支持**:
   - Spring Security 提供了对单点登录（SSO）的支持，并且集成了对 OAuth2 和 OpenID Connect 的支持，使得基于社交登录和企业身份提供商的认证变得更加简单。

### 典型工作流程

1. **请求过滤链**:
   - 当一个请求到达时，Spring Security 通过一系列的过滤器来处理请求。这些过滤器负责处理身份验证、授权以及其他安全相关的任务。
   - 例如，`UsernamePasswordAuthenticationFilter` 处理基于表单的登录请求，`BasicAuthenticationFilter` 处理 HTTP Basic 认证。

2. **身份验证过程**:
   - 用户提交凭证（例如用户名和密码）后，Spring Security 会通过 `AuthenticationManager` 对这些凭证进行验证。如果验证成功，用户信息会被存储在 `SecurityContext` 中，供后续使用。
   - `AuthenticationManager` 可以通过不同的 `AuthenticationProvider` 进行身份验证，每个 `AuthenticationProvider` 可以针对不同类型的身份验证（例如数据库、LDAP、OAuth2 等）。

3. **授权过程**:
   - 在用户身份验证成功后，每次请求时，Spring Security 都会检查用户的权限是否匹配所请求的资源或操作。如果用户没有足够的权限，将会返回 `403 Forbidden` 错误。
   - 授权可以基于用户角色、权限或使用自定义逻辑来实现。

4. **安全上下文**:
   - Spring Security 通过 `SecurityContextHolder` 管理安全上下文，该上下文存储了当前用户的认证信息。通过 `SecurityContextHolder.getContext().getAuthentication()` 可以获取当前认证用户的信息。

### 手动接入

依赖项`org.springframework.security:spring-security-config`和`org.springframework.security:spring-security-web`, 开启注解`EnableWebSecurity`.

```java
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(new AntPathRequestMatcher("/blog/**")).permitAll() // 允许/blog/*的路径
                        .anyRequest().authenticated() // 其他路径全部需要授权
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("/login") // 放行login为登录路径
                        .permitAll()
                )
                .rememberMe(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService createUserDetailsService() {
        UserDetails user = new User("user", "user", new ArrayList<>());
        return new InMemoryUserDetailsManager(user);
    }
```

```java
public class WebConfig implements WebApplicationInitializer {
    /**
     * 将springSecurityFilter的Filter注入Servlet容器
     */
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        DelegatingFilterProxy springSecurityFilterChain = new DelegatingFilterProxy("springSecurityFilterChain");
        // 代理Spring SecurityW 的Filter
        FilterRegistration.Dynamic springSecurityFilter = servletContext.addFilter("springSecurityFilter", springSecurityFilterChain);
        springSecurityFilter.addMappingForUrlPatterns(null, false, "/*");
    }
}
```

### Servlet Security使用

- SecurityContextHolder: 是 Spring Security 存储经过身份验证的详细信息的地方。
- SecurityContextHolder: 从SecurityContextHolder获取并包含当前经过身份验证的用户的Authentication 。
- Authentication: 可以是AuthenticationManager的输入，以提供用户提供的用于身份验证的凭据或来自SecurityContext当前用户。
- GrantedAuthority:  授予Authentication主体的权限（即角色、范围等）
- AuthenticationManager: 定义 Spring Security 的过滤器如何执行身份验证的API。
- ProviderManager: AuthenticationManager最常见的实现。
- AuthenticationProvider: ProviderManager使用它来执行特定类型的身份验证。
- AuthenticationEntryPoint: 用于从客户端请求凭证（即重定向到登录页面、发送WWW-Authenticate响应等）
- AbstractAuthenticationProcessingFilter: 用于身份验证的基本Filter 。这也很好地了解了身份验证的高级流程以及各部分如何协同工作。

测试Authentication的存储过程, 默认情况下`SecurityContextHolder`使用`ThreadLocal`保存`SecurityContext`.
```java
// 创建一个空的SecurityContext
SecurityContext context = SecurityContextHolder.createEmptyContext();
// 创建一个新的Authentication对象
Authentication authentication =
        new TestingAuthenticationToken("username", "password", "ROLE_USER");
// 将Authentication保存到SecurityContext
context.setAuthentication(authentication);
// 将SecurityContext保存到SecurityContextHolder
SecurityContextHolder.setContext(context);

// 获取SecurityContext
SecurityContext context1 = SecurityContextHolder.getContext();
// 获取Authentication
Authentication authentication1 = context1.getAuthentication();
String username = authentication1.getName();
// credentials 通常是密码。在许多情况下，在用户通过身份验证后会清除该信息，以确保其不被泄露。
Object credentials = authentication1.getCredentials();
// principal 标识用户。当使用用户名/密码进行身份验证时，这通常是UserDetails的实例。
Object principal = authentication1.getPrincipal();
// authorities GrantedAuthority实例是授予用户的高级权限
Collection<? extends GrantedAuthority> authorities = authentication1.getAuthorities();
System.out.println(username);
System.out.println(credentials);
System.out.println(principal);
System.out.println(authorities);
```

`Authentication`有两个用途, 作为AuthenticationManager的输入, 用于提供用户用于身份验证的凭据。二是代表当前经过身份验证的用户。可以从SecurityContext获取当前的Authentication 。

### 用户认证

`ProviderManager`是`AuthenticationManager`最常用的实现。 `ProviderManager`委托给`AuthenticationProvider`实例 。每个`AuthenticationProvider`都有机会指示身份验证应该成功、失败，或指示它无法做出决定并允许下游`AuthenticationProvider`做出决定。如果配置的`AuthenticationProvider`实例均无法进行身份验证，则身份验证将失败并出现`ProviderNotFoundException` ，这是一个特殊的`AuthenticationException` ，指示`ProviderManager`未配置为支持传递给它的`Authentication`类型。

`ProviderManager`还允许配置一个可选的父`AuthenticationManager` ，在没有`AuthenticationProvider`可以执行身份验证的情况下会参考该父级 `AuthenticationManager` 。父级可以是任何类型的`AuthenticationManager `，但它通常是`ProviderManager`的实例。

默认情况下， `ProviderManager`尝试从成功的身份验证请求返回的`Authentication`对象中清除任何敏感凭据信息。

可以将多个`AuthenticationProvider`实例注入`ProviderManager`中。每个`AuthenticationProvider`执行特定类型的身份验证。

`AbstractAuthenticationProcessingFilter` 用作验证用户凭据的基本`Filter` 。在对凭证进行身份验证之前，Spring Security 通常使用`AuthenticationEntryPoint`请求凭证。

### 授权

**编程方式设置授权**:

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .securityMatcher(antMatcher("/api/**"))  // 使用AntPathRequestMatcher将HttpSecurity配置为仅应用于以/api/开头的 URL
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers(antMatcher("/user/**")).hasRole("USER")  // 使用AntPathRequestMatcher允许具有USER角色的用户访问以/user/开头的 URL
            .requestMatchers(regexMatcher("/admin/.*")).hasRole("ADMIN") // 使用RegexRequestMatcher允许具有ADMIN角色的用户访问以/admin/开头的 URL
            .requestMatchers(new MyCustomRequestMatcher()).hasRole("SUPERVISOR")  // 使用自定义RequestMatcher允许具有SUPERVISOR角色的用户访问与MyCustomRequestMatcher匹配的 URL
            .anyRequest().authenticated()
        )
        .formLogin(withDefaults());
    return http.build();
}
```

**注解配置授权**:

默认情况下不会激活方法级授权, 需要`EnableMethodSecurity`启用.

| 注解 | 授权管理 | 介绍 | 示例 |
|----|----|----|---|
| `PreAuthorize` | `PreAuthorizeAuthorizationManager` | 调用前认证 | `@PreAuthorize("hasRole('ADMIN')")` |
| `PostAuthorize` | `PostAuthorizeAuthorizationManager` | 调用后认证 | `@PostAuthorize("returnObject.owner == authentication.name")` |
| `PreFilter` | `PreFilterAuthorizationMethodInterceptor` | 过滤输入 | `@PreFilter("filterObject.owner == authentication.name")` |
| `PostFilter` | `PostFilterAuthorizationMethodInterceptor` | 过滤输出 | `@PostFilter("filterObject.owner == authentication.name")` |
| `Secured` | `SecuredAuthorizationManager` | 授权调用的遗留选项 | `@Secured是用于授权调用的遗留选项。 @PreAuthorize取代它并推荐使用` |


### JWT

JSON Web Token (JWT) 是一种用于在各方之间作为 JSON 对象安全传输信息的紧凑且自包含的方式。由于其紧凑性和基于标准的格式，JWT 常用于身份验证和信息交换。

**JWT 的结构**：

JWT 是由三部分组成的，分别是：
1. **Header（头部）**：
   - 头部通常包含两个部分：令牌的类型（即 "JWT"）和所使用的签名算法（如 HMAC SHA256 或 RSA）。
   - 例如：
     ```json
     {
       "alg": "HS256",
       "typ": "JWT"
     }
     ```
   - 这个 JSON 对象会被 Base64Url 编码以形成 JWT 的第一部分。

2. **Payload（负载）**：
   - 负载部分包含声明（claims），声明是关于实体（通常是用户）和附加数据的信息。JWT 定义了几种标准的声明，例如：
     - `iss` (issuer)：签发者
     - `sub` (subject)：面向的用户
     - `aud` (audience)：接收方
     - `exp` (expiration time)：过期时间
     - `iat` (issued at)：签发时间
     - `nbf` (not before)：有效时间起点
   - 自定义声明也可以包含在负载中。
   - 例如：
     ```json
     {
       "sub": "1234567890",
       "name": "John Doe",
       "admin": true
     }
     ```
   - 这个 JSON 对象也会被 Base64Url 编码以形成 JWT 的第二部分。

3. **Signature（签名）**：
   - 签名部分是为了确保 JWT 没有被篡改。签名是通过将编码后的头部、编码后的负载和一个秘密（或 RSA 私钥）结合起来，并通过所指定的算法进行签名生成的。
   - 例如：
     ```plaintext
     HMACSHA256(
       base64UrlEncode(header) + "." +
       base64UrlEncode(payload),
       secret)
     ```
   - 生成的签名会被附加到 JWT 的最后一部分。

**JWT 的工作原理**：

1. **生成 JWT**：
   - 服务器在用户登录成功后生成一个 JWT，并将用户信息（通常是用户 ID 或权限信息）放入负载部分，然后使用服务器的私钥或秘密密钥进行签名，生成最终的 JWT。

2. **传递 JWT**：
   - 生成的 JWT 可以通过 HTTP 头部、URL 参数或浏览器的存储机制（如 localStorage）传递给客户端。客户端通常将这个 JWT 保存在本地，并在后续请求中将其附加到 HTTP 头部中，通常是 `Authorization: Bearer <token>`。

3. **验证 JWT**：
   - 每次客户端请求访问受保护资源时，服务器都会验证 JWT 的签名，确保令牌未被篡改。验证通过后，服务器可以从负载部分解析出用户的信息，从而允许访问相关资源。

4. **过期与续签**：
   - JWT 通常设置了一个过期时间 (`exp` 声明)，一旦过期，服务器将拒绝该 JWT。为实现更好的用户体验，通常会在令牌过期前通过刷新令牌机制为用户发放新的 JWT。


### Oauth2

OAuth 2.0 是一种广泛使用的授权框架，用于允许第三方应用程序在用户的同意下，安全地访问用户的资源，而无需共享用户的登录凭据。它通过提供授权令牌的方式，控制对用户数据的访问。

**OAuth 2.0 的核心流程**：
1. **授权请求**：
   - 用户尝试访问第三方应用程序，应用程序将用户重定向到授权服务器。
   - 授权服务器通常会要求用户登录，并展示一个授权页面，询问用户是否同意授予第三方应用程序访问权限。

2. **用户授权**：
   - 用户同意授权后，授权服务器会生成一个授权码或直接生成一个访问令牌，并将其返回给第三方应用程序。
   - 如果返回的是授权码，第三方应用程序需要将其发送到授权服务器以换取访问令牌。

3. **获取访问令牌**：
   - 第三方应用程序使用授权码向授权服务器请求访问令牌。成功后，授权服务器返回一个短期有效的访问令牌，有时还包括一个长期有效的刷新令牌。

4. **访问资源**：
   - 第三方应用程序使用访问令牌访问用户的受保护资源，资源服务器会验证令牌的有效性并提供相应的数据。

5. **刷新令牌**：
   - 访问令牌过期后，应用程序可以使用刷新令牌向授权服务器请求新的访问令牌，无需再次经过用户授权。

#### **授权码模式（Authorization Code Grant）**：

OAuth 2.0 的授权码模式（Authorization Code Grant）是最常用的一种授权方式，尤其适用于服务器端的 Web 应用程序。这种模式通过在用户和应用程序之间进行安全的授权码交换，使得应用程序可以代表用户安全地访问资源服务器上的受保护资源。

**授权码模式的基本流程**：

1. **用户访问客户端应用程序**：
   - 用户尝试访问客户端应用程序（通常是一个 Web 应用）。客户端应用程序需要访问资源服务器上的受保护资源，比如用户的个人信息。

2. **客户端应用程序重定向用户到授权服务器**：
   - 客户端应用程序将用户重定向到授权服务器，并附带一些参数，比如 `client_id`（客户端标识符）、`redirect_uri`（授权码返回的 URI）、 `state=rand`(跟一个随机数,增加安全性), `response_type=code`（表示要求授权码）、以及 `scope`（请求的权限范围）。
   - 用户需要在授权服务器上进行登录并确认授权请求。

3. **用户授权并返回授权码**：
   - 用户登录并同意授权后，授权服务器会生成一个授权码，并将用户重定向回客户端应用程序指定的 `redirect_uri`，同时在 URL 中附加授权码作为参数。
   - 例如：`https://client.example.com/cb?code=AUTH_CODE`

4. **客户端应用程序使用授权码换取访问令牌**：
   - 客户端应用程序从 URL 中提取授权码，并将其与客户端的 `client_id`、`client_secret`（客户端密钥）一起发送到授权服务器的令牌端点，请求访问令牌。
   - 请求示例：
     ```
     POST /token
     Host: authorization-server.com
     Authorization: Basic BASE64_ENCODE(client_id:client_secret)
     Content-Type: application/x-www-form-urlencoded

     grant_type=authorization_code&code=AUTH_CODE&redirect_uri=REDIRECT_URI
     ```

5. **授权服务器验证并返回访问令牌**：
   - 授权服务器验证授权码的有效性、`client_id` 和 `client_secret` 的正确性。如果验证通过，授权服务器将返回一个访问令牌（`access_token`），有时还会返回一个刷新令牌（`refresh_token`）。
   - 返回示例：
     ```json
     {
       "access_token": "ACCESS_TOKEN",
       "token_type": "Bearer",
       "expires_in": 3600,
       "refresh_token": "REFRESH_TOKEN"
     }
     ```

6. **客户端使用访问令牌访问受保护资源**：
   - 客户端应用程序使用访问令牌向资源服务器请求受保护的资源。通常，这个访问令牌会放在 HTTP 请求的 `Authorization` 头中。
   - 请求示例：
     ```
     GET /resource
     Host: resource-server.com
     Authorization: Bearer ACCESS_TOKEN
     ```


#### **隐式授权模式（Implicit Grant）**：
OAuth 2.0 的隐式授权模式（Implicit Grant）是一种更简单但安全性较低的授权方式，主要用于单页应用程序（SPA）或其他无法安全地存储客户端密钥的纯前端应用。这种模式的核心特点是访问令牌直接在浏览器中生成，并返回给客户端应用程序，而不需要通过服务器端交换授权码。

**隐式授权模式的基本流程**：

1. **用户访问客户端应用程序**：
   - 用户尝试访问一个单页应用程序或其他前端应用。应用程序需要访问资源服务器上的受保护资源（例如，用户的个人信息）。

2. **客户端应用程序重定向用户到授权服务器**：
   - 应用程序将用户重定向到授权服务器，并附带一些参数，比如 `client_id`（客户端标识符）、`redirect_uri`（令牌返回的 URI）、`response_type=token`（表示请求访问令牌）、以及 `scope`（请求的权限范围）。
   - 例如：
     ```
     https://authorization-server.com/auth
       ?response_type=token
       &client_id=CLIENT_ID
       &redirect_uri=REDIRECT_URI
       &scope=SCOPE
     ```

3. **用户授权**：
   - 用户在授权服务器上登录并同意授权请求。授权服务器确认用户的身份和授权请求的合法性。

4. **授权服务器直接返回访问令牌**：
   - 如果用户同意授权，授权服务器会立即生成一个访问令牌，并将用户重定向回客户端应用程序指定的 `redirect_uri`。访问令牌会直接作为 URL 片段（Fragment）的一部分附加在 `redirect_uri` 上。
   - 例如：
     ```
     https://client.example.com/cb#access_token=ACCESS_TOKEN&token_type=Bearer&expires_in=3600
     ```
   - 由于 URL 片段不会被发送到服务器，因此访问令牌只会被客户端应用程序接收到。

5. **客户端应用程序使用访问令牌访问受保护资源**：
   - 客户端应用程序提取访问令牌，并使用它来向资源服务器请求受保护的资源。访问令牌通常会放在 HTTP 请求的 `Authorization` 头中。
   - 请求示例：
     ```
     GET /resource
     Host: resource-server.com
     Authorization: Bearer ACCESS_TOKEN
     ```

#### **密码凭证模式（Resource Owner Password Credentials Grant）**：
OAuth 2.0 的密码凭证模式（Resource Owner Password Credentials Grant）是一种直接使用用户的用户名和密码来获取访问令牌的授权方式。此模式适用于用户高度信任的客户端应用，通常在客户端应用与资源服务器之间的通信中使用，但它的使用场景相对有限，因为它需要用户直接提供其登录凭证。

**密码凭证模式的基本流程**：

1. **用户提供凭证**：
   - 用户在客户端应用中输入他们的用户名和密码。这些凭证通常通过登录表单提交。

2. **客户端应用程序向授权服务器请求访问令牌**：
   - 客户端应用程序将用户的用户名和密码发送给授权服务器，同时还要包括 `client_id`（客户端标识符）、`client_secret`（客户端密钥）、以及 `grant_type=password`，并且可以选择性地包含 `scope`（请求的权限范围）。
   - 请求示例：
     ```
     POST /token
     Host: authorization-server.com
     Content-Type: application/x-www-form-urlencoded

     grant_type=password&username=USER&password=PASS&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&scope=SCOPE
     ```

3. **授权服务器验证凭证**：
   - 授权服务器验证用户的凭证（用户名和密码）是否正确。如果验证成功，授权服务器会生成一个访问令牌，有时还会生成一个刷新令牌，并将其返回给客户端应用程序。

4. **客户端应用程序使用访问令牌访问受保护资源**：
   - 客户端应用程序使用获取到的访问令牌来访问资源服务器上的受保护资源。访问令牌通常会放在 HTTP 请求的 `Authorization` 头中。
   - 请求示例：
     ```
     GET /resource
     Host: resource-server.com
     Authorization: Bearer ACCESS_TOKEN
     ```

#### **客户端凭证模式（Client Credentials Grant）**：
OAuth 2.0 的客户端凭证模式（Client Credentials Grant）是一种授权方式，专门用于服务器到服务器（server-to-server）之间的通信。这种模式不涉及用户的参与，适用于需要访问其自身资源或代表自身进行操作的客户端应用程序。

**客户端凭证模式的基本流程**：

1. **客户端向授权服务器请求访问令牌**：
   - 客户端应用程序使用自己的凭证（`client_id` 和 `client_secret`）向授权服务器请求访问令牌。
   - 请求中包括 `grant_type=client_credentials`，表明这是客户端凭证模式的请求。
   - 请求示例：
     ```
     POST /token
     Host: authorization-server.com
     Content-Type: application/x-www-form-urlencoded

     grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
     ```

2. **授权服务器验证客户端凭证**：
   - 授权服务器验证客户端的凭证（`client_id` 和 `client_secret`）是否正确。如果验证成功，授权服务器会生成一个访问令牌，并将其返回给客户端应用程序。

3. **客户端使用访问令牌访问受保护资源**：
   - 客户端应用程序使用获取到的访问令牌向资源服务器请求受保护的资源。访问令牌通常会放在 HTTP 请求的 `Authorization` 头中。
   - 请求示例：
     ```
     GET /resource
     Host: resource-server.com
     Authorization: Bearer ACCESS_TOKEN
     ```

#### oauth2.1

OAuth 2.1 是对 OAuth 2.0 的更新版本，旨在简化开发者的工作流程，增强安全性，并减少配置和实施中的复杂性。OAuth 2.1 的设计基于 OAuth 2.0 的成功经验，同时引入了一些改进和变化。以下是 OAuth 2.1 和 OAuth 2.0 之间的主要区别：

1. 移除了隐式授权模式
- **OAuth 2.0**：支持隐式授权模式，允许直接在浏览器中返回访问令牌。
- **OAuth 2.1**：完全移除了隐式授权模式，因为这种模式存在安全隐患（如令牌暴露在浏览器中，易被截获），不再推荐使用。OAuth 2.1 强调使用授权码模式（带 PKCE）来替代隐式授权。

2. 强制使用授权码模式时的 PKCE
- **OAuth 2.0**：授权码模式中 PKCE（Proof Key for Code Exchange）是可选的，主要用于原生应用（如移动应用）来防止授权码拦截攻击。
- **OAuth 2.1**：强制要求在所有授权码模式中使用 PKCE，不再只是针对原生应用。PKCE 可以显著提高安全性，防止授权码拦截和交换时的攻击。

3. 移除了密码凭证模式
- **OAuth 2.0**：支持密码凭证模式，允许用户直接向客户端提供用户名和密码以换取访问令牌。
- **OAuth 2.1**：移除了密码凭证模式，因其安全性较低（用户凭证直接暴露给客户端）且不推荐在现代应用中使用。OAuth 2.1 鼓励使用更安全的授权方式，如授权码模式。

4. 简化的重定向 URI 处理
- **OAuth 2.0**：开发者必须严格配置重定向 URI，可能会出现匹配问题。
- **OAuth 2.1**：提供了更简化和一致的重定向 URI 处理机制，减少了配置错误的风险。

5. 强制使用 HTTPS
- **OAuth 2.0**：虽然建议使用 HTTPS，但没有强制要求。
- **OAuth 2.1**：强制要求所有通信使用 HTTPS，确保通信的安全性。

6. 改进的令牌安全和处理
- **OAuth 2.1**：强化了对访问令牌和刷新令牌的管理，包括更强的建议和标准化处理流程，以减少令牌泄露和滥用的风险。

7. 明确弃用某些 OAuth 2.0 功能
- **OAuth 2.1**：不仅移除了某些不安全的模式，还对不推荐使用的功能做了明确弃用说明，帮助开发者更容易理解和遵循最佳实践。

### OpenID Connect

OpenID Connect 是一个基于 OAuth 2.0 协议的身份验证层，用于让客户端（通常是一个 Web 应用或移动应用）可以安全地验证用户的身份，并获取关于用户的基本信息（如用户名、电子邮件地址）。它由 OpenID 基金会开发，是对之前的 OpenID 协议的一个重要扩展，结合了 OAuth 2.0 的授权功能和 OpenID 的身份验证功能。

#### OpenID Connect 的基本概念：

1. **身份提供者（Identity Provider, IdP）**：
   - 身份提供者是负责验证用户身份并颁发 ID 令牌的实体。常见的身份提供者包括 Google、Facebook、Microsoft 等。

2. **依赖方（Relying Party, RP）**：
   - 依赖方是需要验证用户身份的应用程序或网站。依赖方通过与身份提供者通信，获取用户的身份信息。

3. **ID 令牌（ID Token）**：
   - ID 令牌是一种 JSON Web Token (JWT)，它包含用户的身份信息和签发此令牌的身份提供者的信息。ID 令牌用于让依赖方验证用户的身份。

4. **授权码（Authorization Code）**：
   - 在授权码流程中，用户通过身份提供者验证身份后，身份提供者会返回一个授权码给依赖方。依赖方使用这个授权码向身份提供者请求访问令牌和 ID 令牌。

5. **用户信息端点（UserInfo Endpoint）**：
   - 这是一个保护资源端点，依赖方可以使用访问令牌访问该端点以获取用户的附加信息，如名字、电子邮件等。

#### OpenID Connect 的工作流程：

1. **用户向依赖方应用程序发出身份验证请求**：
   - 用户尝试登录或访问依赖方应用程序。应用程序将用户重定向到身份提供者的登录页面。

2. **用户在身份提供者处验证身份**：
   - 用户在身份提供者（如 Google）处输入凭据并登录。登录成功后，身份提供者会生成一个授权码，并将用户重定向回依赖方应用程序，同时附带该授权码。

3. **依赖方向身份提供者请求令牌**：
   - 依赖方应用程序使用授权码向身份提供者请求访问令牌和 ID 令牌。这个请求通常包含 `client_id`、`client_secret` 和授权码。

4. **身份提供者返回令牌**：
   - 身份提供者验证授权码的有效性后，返回访问令牌和 ID 令牌给依赖方。ID 令牌中包含用户的身份信息，如用户 ID、用户名等。

5. **依赖方验证 ID 令牌**：
   - 依赖方验证 ID 令牌的签名和内容，以确保令牌是由可信的身份提供者签发的，并且没有被篡改。

6. **用户成功登录**：
   - 验证通过后，用户便成功登录依赖方应用程序，应用程序可以使用 ID 令牌中的信息来识别和验证用户。

7. **可选的用户信息请求**：
   - 依赖方可以使用访问令牌向身份提供者的用户信息端点发起请求，以获取更多关于用户的信息。


### 作为Oauth的服务端

依赖项`org.springframework.security:spring-security-oauth2-authorization-server`

配置解析Form表单
```java
public class InitAbstractAnnotationConfigDispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        // 配置类
        return new Class[] { WebConfig.class };
    }

    @Override
    protected void customizeRegistration(@NonNull ServletRegistration.Dynamic registration) {
        super.customizeRegistration(registration);
        registration.setMultipartConfig(new MultipartConfigElement("/tmp"));
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[0];
    }

    @Override
    @NonNull
    protected String[] getServletMappings() {
        // Servlet的映射
        return new String[] { "/*" };
    }
}

```

添加Bean

```java
@Bean
public MultipartResolver multipartResolver() {
    return new StandardServletMultipartResolver();
}
```

配置认证链
```java
    @Bean
    @Order(1)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http)
            throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .oidc(Customizer.withDefaults());	// 启用 OpenID Connect 1.0
        http
                // 跳转到登录页面
                .exceptionHandling((exceptions) -> exceptions
                        .defaultAuthenticationEntryPointFor(
                                new LoginUrlAuthenticationEntryPoint("/login"),
                                new MediaTypeRequestMatcher(MediaType.TEXT_HTML)
                        )
                )
                //接受用户信息和/或客户注册的访问令牌
                .oauth2ResourceServer((resourceServer) -> resourceServer
                        .jwt(Customizer.withDefaults()));

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(HttpSecurity http, UserDetailsService userDetailsService,
                                           PasswordEncoder passwordEncoder) throws Exception {
        http
                .exceptionHandling(ex -> ex.accessDeniedHandler(new CustomAccessDeniedHandler())) // 认证失败的处理器
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().authenticated() // 其他路径全部需要授权
                )
               .formLogin(Customizer.withDefaults()) // 启用一种登录方式, 用于认证用户
                .csrf(AbstractHttpConfigurer::disable) // 禁用csrf
                .rememberMe(Customizer.withDefaults());

        return http.build();
    }
```

设置必要Bean

```java
    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient oidcClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("oidc-client")
                .clientSecret("{noop}secret")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("http://127.0.0.1:8080/callback")
                .postLogoutRedirectUri("http://127.0.0.1:8080/")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
                .build();

        return new InMemoryRegisteredClientRepository(oidcClient);
    }

    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        KeyPair keyPair = generateRsaKey();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        RSAKey rsaKey = new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID(UUID.randomUUID().toString())
                .build();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return new ImmutableJWKSet<>(jwkSet);
    }

    private static KeyPair generateRsaKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        }
        catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
        return keyPair;
    }

    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder().build();
    }
    @Bean
    public UserDetailsService createUserDetailsService() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ADMIN"));
        authorities.add(new SimpleGrantedAuthority("COMMON"));

        UserDetails user = new User("user", "{noop}user", authorities);
        return new InMemoryUserDetailsManager(user);
    }
```

授权码模式:

1. 请求`http://localhost:8080/oauth2/authorize?response_type=code&client_id=oidc-client&redirect_uri=http://127.0.0.1:8080/callback&scope=openid&state=12334`, 回重定向到`http://localhost:8080/login`登录用户, 后点击授权.
2. 授权完成后会跳转到重定向地址`http://127.0.0.1:8080/callback?code=Ijh4Re4Ai7Vk5VdhrdBX5kKKcjhO56xM5udAWQKRxtaEpIAQmOFYRPFjyVRp3PrpvA_gc8D5d8jMw0FBbTP6vTSPqzvCTQQMgxWAJZY35bOm4hGjMezSAc5ob5X51o4e`.
2. 获取到code后发送form表单到`http://127.0.0.1:8080/oauth2/token`
```text
redirect_uri=http://127.0.0.1:8080/callback
code=Ijh4Re4Ai7Vk5VdhrdBX5kKKcjhO56xM5udAWQKRxtaEpIAQmOFYRPFjyVRp3PrpvA_gc8D5d8jMw0FBbTP6vTSPqzvCTQQMgxWAJZY35bOm4hGjMezSAc5ob5X51o4e
grant_type=authorization_code
scope=openid
```
3. 获取到`access_token`

```json
{
	"access_token": "eyJraWQiOiJmZTI4ZTRiYy01OGZmLTQ0MDItYmMyNi01OTJkMDZlODkyOTgiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiYXVkIjoib2lkYy1jbGllbnQiLCJuYmYiOjE3MjQ5MTU3NTcsInNjb3BlIjpbIm9wZW5pZCJdLCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwODAiLCJleHAiOjE3MjQ5MTYwNTcsImlhdCI6MTcyNDkxNTc1NywianRpIjoiZTIyNWJlNDAtNTRhYi00ZTJhLWFhYjQtNWQxOTFmZDQ5OWY5In0.NnTVMPsogMR4C0dCg9Dk-F1Iy2O58UeK3va4U34UrXKj1vQPUtxUsLEZc43inmHMqgn--8AVoR6FiIkScnMPoDXDhan8xVgNi_n-ptaHbWw_PYsOnasGL_cojDz28rEdJTM78PcTjJgsZHGRQyoavEbbaglQFXvjKDaPs5F3_rh-tLdQ2_BLQYTGVuR3LQeLidBEe78D2k8kmNNEjIvrONOmSAIhic-SUbbyfhNyIKZJeIbBVC8CrAGsZ0uNagPTCl0qVmpWsVzLx8hoc77-Cb2GbiFnDKY3vYlU0YAJlqujURT9OE_u971Q8c4gGuDKj3QBqfsK5RfCfiwUiJVhRQ",
	"refresh_token": "5PlFqKaZgnT0wU9BUl13QW6-keQ-XLLgn6jdbMXr5devQdlFwAgKrnccCJhenfOR85-rKHk7m3WCQeXmcnch8jGMxQ7IUEOlg0y6Wx2cLssF8dX3d1jzdYSxvJFKnZMq",
	"scope": "openid",
	"id_token": "eyJraWQiOiJmZTI4ZTRiYy01OGZmLTQ0MDItYmMyNi01OTJkMDZlODkyOTgiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiYXVkIjoib2lkYy1jbGllbnQiLCJhenAiOiJvaWRjLWNsaWVudCIsImF1dGhfdGltZSI6MTcyNDkxNTc0NSwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwIiwiZXhwIjoxNzI0OTE3NTU3LCJpYXQiOjE3MjQ5MTU3NTcsImp0aSI6ImI2MGYyOGE5LTc4YzAtNDViNi04MjNhLWMxZDE3ZTVjN2I3MCIsInNpZCI6Ik80VHhHaE9UYmVVbEl4eHRkOVNrY2hFVWxDeHFwQlBONEo5M2NobngxencifQ.O-YZ2pq9E294UIS-TG11otyoC7nc3VPXH4N6NCICmPeMz9_QNpzouR9PePZsN5OEPXpFxI7La0zLaNPjc9ERhjK5DFgLv3rpphdI7JZXzF73keePy_uLqNp6lQU-6pLQ2QN39T0bOKyL1SYJwNvyQPiw_7-Odg-w0LPVRaUWRTb4JGLM0N97LLi4-doVvO17uQ4o6cSECGbNVvUMDrIlCfElseDgECK-r-pm-DuRiLaHjs6j7k0avuek8Pcz8cm8WAgYQSJD1ewQTXwG8NwonXU-zVq7hPy-Yw-QrQ5SkU3Dq_pDVqhnDFJTu8vqYiHX_1LqMD6CMoyePnh5ptsAcg",
	"token_type": "Bearer",
	"expires_in": 299
}
```

OAuth2 Authorization Endpoint：申请授权端点，默认为`/oauth2/authorize`
OAuth2 Token Endpoint：获取访问令牌端点，默认为`/oauth2/token`
OAuth2 Token Introspection Endpoint：令牌自省端点，默认为`/oauth2/introspect`
OAuth2 Token Revocation Endpoint：令牌撤销端点，默认为`/oauth2/revoke`
OAuth2 Authorization Server Metadata Endpoint：获取授权服务器元信息的端点，默认为`/.well-known/oauth-authorization-server`
WK Set Endpoint：JWK信息端点，默认为`/oauth2/jwks`
OpenID Connect 1.0 Provider Configuration Endpoint：查询提供者配置端点，默认为`/.well-known/openid-configuration`
OpenID Connect 1.0 UserInfo Endpoint：用户信息端点，默认为`/userinfo`
OpenID Connect 1.0 Client Registration Endpoint：客户端注册端点，默认为`/connect/registe`

### 使用oauth client

依赖`org.springframework.security:spring-security-oauth2-client`

```java
public SecurityFilterChain filterChain(HttpSecurity http, UserDetailsService userDetailsService,
                                        PasswordEncoder passwordEncoder) throws Exception {
    http
            .oauth2Login(Customizer.withDefaults()) // 开启oauth2登录
            .formLogin(Customizer.withDefaults())
            .rememberMe(Customizer.withDefaults());

    return http.build();
}

@Bean
public ClientRegistrationRepository clientRegistrationRepository() {
    ClientRegistration build = ClientRegistration.withRegistrationId("local") // 登录路径 /oauth2/authorization/local
            .clientId("oidc-client")
            .clientSecret("secret")
            .scope("openid")
            .authorizationUri("http://127.0.0.1:8080/oauth2/authorize")
            .tokenUri("http://127.0.0.1:8080/oauth2/token")
            .userInfoUri("http://127.0.0.1:8080/userinfo")
            .redirectUri("http://127.0.0.1:8080/callback")
            .userNameAttributeName("sub")
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .build();
    return new InMemoryClientRegistrationRepository(build);
}
```

### 使用oauth 资源服务器

依赖项`org.springframework.security:spring-security-oauth2-resource-server`

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((authorize) -> authorize
				.anyRequest().authenticated()
			)
			.oauth2ResourceServer((oauth2) -> oauth2
				.jwt(Customizer.withDefaults())
			);
		return http.build();
	}

	@Bean
	public JwtDecoder jwtDecoder() {
		return JwtDecoders.fromIssuerLocation("https://my-auth-server.com"); // oauth服务器的地址
	}
}
```
