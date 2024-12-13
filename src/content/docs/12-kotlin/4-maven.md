---
title: Maven 构建工具
---

使用 Maven 工具涉及项目的创建、构建、依赖管理、插件使用和项目部署等方面。下面是详细的步骤和示例，帮助你更好地使用 Maven 工具。

## 安装 Maven

### 下载和配置 Maven

1. **下载 Maven**：从 [Maven 官方网站](https://maven.apache.org/download.cgi) 下载最新版本。
2. **解压并配置环境变量**：
   - 将下载的文件解压到一个目录。
   - 将 `MAVEN_HOME` 环境变量指向该目录，并将 `MAVEN_HOME/bin` 添加到 `PATH` 环境变量中。
3. **验证安装**：在命令行中运行 `mvn -v`，如果安装成功，会显示 Maven 的版本信息。

## 创建 Maven 项目

使用 Maven 原型创建一个新的项目：

```bash
mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

这将创建一个基础项目结构，包括 `src` 目录和一个 `pom.xml` 文件。

## 项目目录结构

Maven 项目的典型目录结构如下：

```
my-app
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── com
    │           └── example
    │               └── App.java
    └── test
        └── java
            └── com
                └── example
                    └── AppTest.java
```

## pom.xml介绍

下面是一个详细的 `pom.xml` 文件的示例及其各部分的解释：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <!-- 项目的坐标 -->
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- 项目描述信息 -->
    <name>My Application</name>
    <description>A simple Maven project example</description>
    <url>http://www.example.com/my-app</url>

    <!-- 依赖管理 -->
    <dependencies>
        <!-- 测试依赖 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- 构建部分 -->
    <build>
        <!-- 插件管理 -->
        <plugins>
            <!-- 编译插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <!-- 其他插件可以在此添加 -->
        </plugins>
    </build>

    <!-- 仓库管理 -->
    <repositories>
        <repository>
            <id>central</id>
            <url>https://repo.maven.apache.org/maven2</url>
        </repository>
    </repositories>

    <!-- 分发管理 -->
    <distributionManagement>
        <repository>
            <id>internal-repo</id>
            <url>http://repo.example.com/maven2</url>
        </repository>
        <snapshotRepository>
            <id>internal-snapshots</id>
            <url>http://repo.example.com/maven2-snapshots</url>
        </snapshotRepository>
    </distributionManagement>

    <!-- 项目属性 -->
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <!-- 项目依赖管理（可选） -->
    <dependencyManagement>
        <dependencies>
            <!-- 定义一个依赖版本，子项目可以继承此版本 -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>5.2.0.RELEASE</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

### 项目声明部分

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
```

- `xmlns` 和 `xsi:schemaLocation` 定义了POM文件的命名空间和XML Schema位置。
- `<modelVersion>` 定义了POM模型的版本，这里使用的是 `4.0.0`。

### 项目的坐标
```xml
<groupId>com.example</groupId>
<artifactId>my-app</artifactId>
<version>1.0-SNAPSHOT</version>
```
- `groupId`：项目的组标识，一般是公司的域名倒置。
- `artifactId`：项目的唯一标识名。
- `version`：项目的版本，`SNAPSHOT` 表示这是一个正在开发中的版本。

### 项目描述信息
```xml
<name>My Application</name>
<description>A simple Maven project example</description>
<url>http://www.example.com/my-app</url>
```
- `name`：项目的名称。
- `description`：对项目的简要描述。
- `url`：项目的主页URL。

### 依赖管理
```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```
- `dependencies`：定义项目所需的依赖库。
- `dependency`：每个依赖项的定义，包括 `groupId`, `artifactId`, `version` 和 `scope`。`scope` 可以是 `compile`, `provided`, `runtime`, `test`, 或 `system`，定义了依赖的范围。

### 构建部分
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```
- `build`：定义构建过程的配置。
- `plugins`：定义构建过程中使用的插件。
- `plugin`：每个插件的定义，包括 `groupId`, `artifactId`, `version` 和 `configuration`。这里配置了 `maven-compiler-plugin`，指定编译的Java版本为1.8。

### 仓库管理
```xml
<repositories>
    <repository>
        <id>central</id>
        <url>https://repo.maven.apache.org/maven2</url>
    </repository>
</repositories>
```
- `repositories`：定义项目依赖库的仓库。
- `repository`：每个仓库的定义，包括 `id` 和 `url`。

### 分发管理
```xml
<distributionManagement>
    <repository>
        <id>internal-repo</id>
        <url>http://repo.example.com/maven2</url>
    </repository>
    <snapshotRepository>
        <id>internal-snapshots</id>
        <url>http://repo.example.com/maven2-snapshots</url>
    </snapshotRepository>
</distributionManagement>
```
- `distributionManagement`：定义项目构建产物的分发管理。
- `repository` 和 `snapshotRepository`：分别定义正式版本和快照版本的分发仓库。

### 项目属性
```xml
<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```
- `properties`：定义项目的属性，可以在POM文件的其他部分引用。
- `maven.compiler.source` 和 `maven.compiler.target`：指定Java编译器的源版本和目标版本。

### 依赖管理（可选）
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.2.0.RELEASE</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

- `dependencyManagement`：用于管理依赖版本，子项目可以继承这些版本设置。


## 编译和构建项目

进入项目根目录，使用以下命令构建项目：

```bash
mvn clean install
```

这将清理项目并编译源代码，运行测试，最后打包项目。

### 常用 Maven 命令

- **编译项目**：`mvn compile`
- **运行测试**：`mvn test`
- **打包项目**：`mvn package`
- **安装到本地仓库**：`mvn install`
- **清理项目**：`mvn clean`

## 使用插件

Maven 插件扩展了 Maven 的功能。下面是一些常用插件及其配置示例：

#### Maven Compiler Plugin

配置编译插件以使用特定的 Java 版本：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.0</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

#### Maven Surefire Plugin

用于运行单元测试：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.22.2</version>
        </plugin>
    </plugins>
</build>
```

## 多模块项目

Maven 支持创建多模块项目，每个模块都有自己的 `pom.xml` 文件，且在父项目中管理所有模块。

### 父项目 POM 文件示例：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>my-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
        <module>module-a</module>
        <module>module-b</module>
    </modules>
</project>
```

### 子模块 POM 文件示例：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-parent</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <artifactId>module-a</artifactId>

    <dependencies>
        <!-- 子模块依赖 -->
    </dependencies>
</project>
```

## 部署项目

Maven 支持将构建的项目部署到远程仓库。配置仓库信息并使用 `mvn deploy` 命令进行部署。

#### 配置远程仓库：

```xml
<distributionManagement>
    <repository>
        <id>releases</id>
        <url>http://myrepository.com/releases</url>
    </repository>
    <snapshotRepository>
        <id>snapshots</id>
        <url>http://myrepository.com/snapshots</url>
    </snapshotRepository>
</distributionManagement>
```
