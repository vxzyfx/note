---
title: 标准库
---

Java 标准库（Java Standard Library）是 Java 编程语言的重要组成部分，提供了丰富的类和接口，用于实现各种功能，如数据结构、网络编程、文件 I/O、并发编程等。以下是 Java 标准库中一些常用的包和类的概述：

### `java.lang` 包

`java.lang` 包是 Java 标准库的核心，自动导入到每个 Java 程序中，包含基础的类和接口。

- **`Object`**：所有类的超类，提供基础方法如 `equals()`、`hashCode()`、`toString()` 等。
- **`String`**：不可变的字符串类，用于存储和操作字符串。
- **`Math`**：提供基本的数学运算方法，如 `abs()`、`sqrt()`、`pow()`、`sin()` 等。
- **`System`**：包含系统级别的功能和属性，如标准输入输出、垃圾回收等。
- **`Thread`**：用于创建和控制线程。
- **`Runnable`**：用于实现多线程的接口。

### `java.util` 包

`java.util` 包包含集合框架、日期和时间操作、随机数生成等实用工具类。

- **集合框架**：
  - `List`：有序集合接口，如 `ArrayList`、`LinkedList`。
  - `Set`：无序唯一集合接口，如 `HashSet`、`TreeSet`。
  - `Map`：键值对集合接口，如 `HashMap`、`TreeMap`。
  - `Queue`：队列接口，如 `LinkedList`、`PriorityQueue`。
  - `Deque`：双端队列接口，如 `ArrayDeque`。
- **日期和时间**：
  - `Date`：日期和时间类（已过时，推荐使用 `java.time` 中的类）。
  - `Calendar`：日期和时间操作类（部分过时，推荐使用 `java.time` 中的类）。
  - `TimeZone`：时区类。
- **其他实用类**：
  - `Random`：随机数生成类。
  - `Scanner`：输入解析器，用于读取输入。
  - `Collections`：包含操作集合的静态方法。

### `java.io` 包

`java.io` 包提供文件和流操作的类和接口。

- **输入输出流**：
  - `InputStream`：字节输入流的超类，如 `FileInputStream`、`ByteArrayInputStream`。
  - `OutputStream`：字节输出流的超类，如 `FileOutputStream`、`ByteArrayOutputStream`。
  - `Reader`：字符输入流的超类，如 `FileReader`、`StringReader`。
  - `Writer`：字符输出流的超类，如 `FileWriter`、`StringWriter`。
- **文件操作**：
  - `File`：文件和目录操作类。
  - `BufferedReader`：缓冲字符输入流，提高读取效率。
  - `BufferedWriter`：缓冲字符输出流，提高写入效率。

### `java.nio` 包

`java.nio` 包提供非阻塞 I/O 操作，适用于高性能 I/O 操作。

- **缓冲区**：
  - `ByteBuffer`、`CharBuffer`、`IntBuffer` 等：用于存储不同类型的数据。
- **通道**：
  - `FileChannel`：文件通道。
  - `SocketChannel`：网络通道。
  - `DatagramChannel`：数据报通道。

### `java.net` 包

`java.net` 包提供网络编程的类和接口。

- **网络编程**：
  - `URL`：统一资源定位符类。
  - `URLConnection`：表示与 URL 引用的远程对象的通信连接。
  - `Socket`：实现客户端和服务器端的套接字通信。
  - `ServerSocket`：实现服务器端套接字。

### `java.time` 包

`java.time` 包是 Java 8 引入的新日期和时间 API，用于替代 `java.util.Date` 和 `java.util.Calendar`。

- **日期和时间**：
  - `LocalDate`：表示日期（无时间部分）。
  - `LocalTime`：表示时间（无日期部分）。
  - `LocalDateTime`：表示日期和时间。
  - `ZonedDateTime`：表示带时区的日期和时间。
- **时区**：
  - `ZoneId`：表示时区标识符。
  - `ZoneOffset`：表示时区偏移量。

### `java.util.concurrent` 包

`java.util.concurrent` 包提供并发编程的类和接口。

- **线程池**：
  - `ExecutorService`：线程池接口。
  - `Executors`：包含创建线程池的工厂方法。
- **同步工具**：
  - `CountDownLatch`：计数器，用于等待一组线程完成。
  - `CyclicBarrier`：屏障，所有线程都到达屏障时继续执行。
  - `Semaphore`：信号量，控制访问资源的线程数。
  - `ReentrantLock`：可重入锁。
- **并发集合**：
  - `ConcurrentHashMap`：线程安全的哈希表。
  - `CopyOnWriteArrayList`：线程安全的列表。

### `java.security` 包

`java.security` 包提供安全框架和实现，如加密、签名和密钥管理。

- **加密和解密**：
  - `MessageDigest`：消息摘要算法，如 MD5、SHA-1。
  - `Cipher`：加密和解密算法。
- **密钥管理**：
  - `KeyFactory`：密钥工厂类。
  - `KeyPairGenerator`：密钥对生成器。
- **数字签名**：
  - `Signature`：数字签名算法。

### `javax.swing` 包

`javax.swing` 包提供用于创建图形用户界面（GUI）的类和接口。

- **基本组件**：
  - `JFrame`：顶层窗口。
  - `JPanel`：容器面板。
  - `JButton`：按钮。
  - `JLabel`：标签。
  - `JTextField`：文本框。
  - `JTextArea`：文本区域。
- **布局管理器**：
  - `FlowLayout`：流式布局。
  - `BorderLayout`：边界布局。
  - `GridLayout`：网格布局。

### `java.sql` 包

`java.sql` 包提供访问和操作数据库的类和接口。

- **数据库连接**：
  - `DriverManager`：驱动管理器，用于管理 JDBC 驱动程序。
  - `Connection`：表示与数据库的连接。
- **执行 SQL 语句**：
  - `Statement`：用于执行 SQL 语句的接口。
  - `PreparedStatement`：预编译的 SQL 语句。
  - `ResultSet`：表示查询结果集。
  
