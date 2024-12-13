---
title: Gradle 构建工具
---

Gradle是一种现代化的构建工具，主要用于Java项目，但也支持其他语言的项目构建。它提供了灵活性和强大的依赖管理功能。以下是Gradle的一些关键特性和使用指南：

## 关键特性
1. **声明性构建脚本**：使用Groovy或Kotlin DSL编写，简洁且可读性强。
2. **依赖管理**：支持Maven和Ivy仓库，可以方便地管理项目依赖。
3. **多项目构建**：适用于大型项目，能有效地处理多模块的依赖和构建。
4. **任务自动化**：可以自定义任务，自动化构建、测试、部署等流程。
5. **性能优化**：包括增量构建和缓存，极大提高构建速度。

## 基本使用
### 安装
1. **通过包管理工具安装**：
   - **Mac**：使用Homebrew
     ```bash
     brew install gradle
     ```
   - **Windows**：使用Chocolatey
     ```bash
     choco install gradle
     ```
   - **Linux**：使用SDKMAN
     ```bash
     sdk install gradle
     ```

2. **手动安装**：
   - 从[Gradle官网](https://gradle.org/releases/)下载最新版本的二进制包。
   - 解压到所需目录，并将`bin`目录添加到系统路径中。

### 创建项目

1. 创建项目目录

```bash
mkdir my-gradle-project
cd my-gradle-project
```


2. 初始化 Gradle 项目
```bash
gradle init
```

## kotlin项目结构

```plaintext
my-gradle-project
├── app
│   ├── build.gradle.kts
│   └── src
│       ├── main
│       │   ├── kotlin
│       │   │   └── org
│       │   │       └── example
│       │   │           └── App.kt
│       │   └── resources
│       └── test
│           ├── kotlin
│           │   └── org
│           │       └── example
│           │           └── AppTest.kt
│           └── resources
├── gradle
│   ├── libs.versions.toml
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradle.properties
├── gradlew
├── gradlew.bat
└── settings.gradle.kts
```

这个项目结构看起来是一个使用 Gradle Kotlin DSL 构建的 Kotlin 项目。让我们详细说明一下各个文件和目录的用途，以及如何编写和运行项目。

### 项目结构说明

1. **app/build.gradle.kts**：这是 `app` 模块的 Gradle 构建脚本文件，用于定义项目的构建配置、依赖等。

2. **app/src/main/kotlin**：这个目录包含项目的主 Kotlin 源代码。

3. **app/src/main/resources**：这个目录用于存放项目的资源文件，如配置文件、静态资源等。

4. **app/src/test/kotlin**：这个目录包含项目的测试代码。

5. **app/src/test/resources**：这个目录用于存放测试资源文件。

6. **gradle/libs.versions.toml**：用于管理项目依赖的版本信息，可以集中管理所有依赖的版本。

7. **gradle/wrapper**：包含 Gradle 包装器文件，用于确保项目使用的 Gradle 版本一致。

8. **gradle.properties**：用于定义 Gradle 构建属性。

9. **gradlew 和 gradlew.bat**：用于在各个操作系统上运行 Gradle 包装器脚本。

10. **settings.gradle.kts**：用于配置多项目构建和包括哪些模块。

### 配置示例

#### app/build.gradle.kts

这是一个简单的 Kotlin 项目的 `build.gradle.kts` 文件示例：

```kotlin
plugins {
    // Apply the org.jetbrains.kotlin.jvm Plugin to add support for Kotlin.
    alias(libs.plugins.jvm)

    // Apply the application plugin to add support for building a CLI application in Java.
    application
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    // This dependency is used by the application.
    implementation(libs.guava)
}

testing {
    suites {
        // Configure the built-in test suite
        val test by getting(JvmTestSuite::class) {
            // Use Kotlin Test test framework
            useKotlinTest("1.9.23")
        }
    }
}

// Apply a specific Java toolchain to ease working on different environments.
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

application {
    // Define the main class for the application.
    mainClass = "org.example.AppKt"
}
```

#### settings.gradle.kts

配置多模块构建：

```kotlin
plugins {
    // Apply the foojay-resolver plugin to allow automatic download of JDKs
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"
}

rootProject.name = "my-gradle-project"
include("app")
```

#### app/src/main/kotlin/org/example/App.kt

示例 Kotlin 主程序：

```kotlin
package org.example

class App {
    val greeting: String
        get() {
            return "Hello World!"
        }
}

fun main() {
    println(App().greeting)
}
```

#### app/src/test/kotlin/org/example/AppTest.kt

示例测试代码：

```kotlin
package org.example

import kotlin.test.Test
import kotlin.test.assertNotNull

class AppTest {
    @Test fun appHasAGreeting() {
        val classUnderTest = App()
        assertNotNull(classUnderTest.greeting, "app should have a greeting")
    }
}
```

### 运行和构建项目

1. **构建项目**：
   ```sh
   ./gradlew build
   ```
   这将编译代码、运行测试并生成构建输出。

2. **运行应用程序**：
   ```sh
   ./gradlew run
   ```
   确保 `build.gradle.kts` 文件中正确配置了 `mainClass.set("org.example.AppKt")`。

3. **清理项目**：
   ```sh
   ./gradlew clean
   ```

## 使用插件

### alias

`alias` 是 Gradle 7.0 引入的一个特性，用于在版本目录（Version Catalog）中定义插件和依赖项的别名。这样可以集中管理依赖和插件的版本，并在项目中引用这些别名。

#### 使用 alias 管理插件和依赖

1. **定义版本目录**：
   
   在 `gradle/libs.versions.toml` 文件中定义插件和依赖的别名和版本。

   ```toml
   [versions]
   kotlin = "1.8.10"
   springBoot = "2.5.4"

   [plugins]
   kotlinJvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }
   springBoot = { id = "org.springframework.boot", version.ref = "springBoot" }

   [libraries]
   springBootStarter = { group = "org.springframework.boot", name = "spring-boot-starter", version.ref = "springBoot" }
   ```

2. **引用别名**：

   在 `build.gradle.kts` 文件中使用这些别名。

   ```kotlin
   plugins {
       alias(libs.plugins.kotlinJvm)
       alias(libs.plugins.springBoot)
   }

   dependencies {
       implementation(libs.springBootStarter)
   }
   ```

### kotlin

`kotlin` 是 Kotlin DSL 的一部分，用于引用 Kotlin 插件或库。它通常用于在 `plugins` 和 `dependencies` 块中引用 Kotlin 相关的内容。

#### 使用 kotlin 管理 Kotlin 插件和库

1. **应用 Kotlin 插件**：

   在 `build.gradle.kts` 文件中使用 `kotlin` 方法应用 Kotlin 插件。

   ```kotlin
   plugins {
       kotlin("jvm") version "1.8.10"
   }
   ```

2. **引用 Kotlin 标准库**：

   在 `dependencies` 块中使用 `kotlin` 方法引用 Kotlin 标准库。

   ```kotlin
   dependencies {
       implementation(kotlin("stdlib"))
   }
   ```

### id

`id` 用于在 `plugins` 块中应用插件。它是应用插件的基本方式，尤其是在不使用版本目录的情况下。

#### 使用 id 应用插件

1. **应用插件**：

   在 `build.gradle.kts` 文件中使用 `id` 方法应用插件。

   ```kotlin
   plugins {
       id("org.jetbrains.kotlin.jvm") version "1.8.10"
       id("org.springframework.boot") version "2.5.4"
   }
   ```

## 依赖管理

在 Gradle 中，`dependencies` 块用于声明项目的依赖项。依赖项可以是库、框架、插件等，它们通常存储在公共或私有的依赖仓库中，如 Maven Central、jcenter 或自定义仓库。以下是 `dependencies` 块中常见的选项和用法：

### 常见的依赖配置选项

1. **implementation**：这是最常用的配置，用于添加在编译时和运行时都需要的依赖项。依赖项不会暴露给依赖这个模块的其他模块。

   ```kotlin
   dependencies {
       implementation("org.springframework.boot:spring-boot-starter")
   }
   ```

2. **api**：用于库项目中，添加的依赖项不仅在编译时和运行时可用，而且会暴露给依赖这个模块的其他模块。

   ```kotlin
   dependencies {
       api("com.google.guava:guava:30.1-jre")
   }
   ```

3. **compileOnly**：只在编译时可用，运行时不可用。通常用于注解处理器等只在编译时需要的库。

   ```kotlin
   dependencies {
       compileOnly("org.projectlombok:lombok:1.18.20")
   }
   ```

4. **runtimeOnly**：只在运行时可用，编译时不可用。通常用于数据库驱动等在运行时需要的库。

   ```kotlin
   dependencies {
       runtimeOnly("mysql:mysql-connector-java:8.0.23")
   }
   ```

5. **testImplementation**：用于添加测试代码的依赖项，只在测试编译时和测试运行时可用。

   ```kotlin
   dependencies {
       testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.1")
       testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.7.1")
   }
   ```

6. **testCompileOnly**：只在测试代码编译时可用。

   ```kotlin
   dependencies {
       testCompileOnly("org.mockito:mockito-core:3.9.0")
   }
   ```

7. **testRuntimeOnly**：只在测试代码运行时可用。

   ```kotlin
   dependencies {
       testRuntimeOnly("org.junit.vintage:junit-vintage-engine:5.7.1")
   }
   ```

8. **annotationProcessor**：用于注解处理器，只在编译时运行注解处理器。

   ```kotlin
   dependencies {
       annotationProcessor("org.projectlombok:lombok:1.18.20")
   }
   ```

9. **kapt**：Kotlin 注解处理器插件，用于支持 Kotlin 的注解处理。

   ```kotlin
   dependencies {
       kapt("com.google.dagger:dagger-compiler:2.35")
   }
   ```

### 使用版本目录中的依赖项

如果你使用 Gradle 版本目录 (`version catalogs`) 来集中管理依赖项，你可以在 `gradle/libs.versions.toml` 文件中定义依赖项的别名，然后在 `build.gradle.kts` 文件中引用这些别名。

#### `gradle/libs.versions.toml`

```toml
[versions]
junit = "5.7.1"
springBoot = "2.5.4"

[libraries]
junitApi = { group = "org.junit.jupiter", name = "junit-jupiter-api", version.ref = "junit" }
junitEngine = { group = "org.junit.jupiter", name = "junit-jupiter-engine", version.ref = "junit" }
springBootStarter = { group = "org.springframework.boot", name = "spring-boot-starter", version.ref = "springBoot" }
```

#### `build.gradle.kts`

```kotlin
dependencies {
    implementation(libs.springBootStarter)
    testImplementation(libs.junitApi)
    testRuntimeOnly(libs.junitEngine)
}
```

### 示例项目配置

以下是一个完整的示例项目配置，展示了如何使用各种依赖配置选项：

#### 项目结构

```
my-gradle-project
├── app
│   ├── build.gradle.kts
│   └── src
│       ├── main
│       │   ├── kotlin
│       │   │   └── org
│       │   │       └── example
│       │   │           └── App.kt
│       │   └── resources
│       └── test
│           ├── kotlin
│           │   └── org
│           │       └── example
│           │           └── AppTest.kt
│           └── resources
├── gradle
│   ├── libs.versions.toml
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradle.properties
├── gradlew
├── gradlew.bat
└── settings.gradle.kts
```

#### `gradle/libs.versions.toml`

```toml
[versions]
kotlin = "1.8.10"
springBoot = "2.5.4"
junit = "5.7.1"

[plugins]
kotlinJvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }
springBoot = { id = "org.springframework.boot", version.ref = "springBoot" }

[libraries]
springBootStarter = { group = "org.springframework.boot", name = "spring-boot-starter", version.ref = "springBoot" }
junitApi = { group = "org.junit.jupiter", name = "junit-jupiter-api", version.ref = "junit" }
junitEngine = { group = "org.junit.jupiter", name = "junit-jupiter-engine", version.ref = "junit" }
```

#### `app/build.gradle.kts`

```kotlin
plugins {
    alias(libs.plugins.kotlinJvm)
    alias(libs.plugins.springBoot)
}

group = "com.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.springBootStarter)
    testImplementation(libs.junitApi)
    testRuntimeOnly(libs.junitEngine)
}

tasks.withType<Test> {
    useJUnitPlatform()
}
```

#### `settings.gradle.kts`

```kotlin
rootProject.name = "my-gradle-project"
include("app")

dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            from(files("gradle/libs.versions.toml"))
        }
    }
}
```

## 自定义任务
在 Gradle 中，自定义任务可以帮助你在构建过程中执行特定的操作。下面是如何在 `build.gradle.kts` 文件中定义和使用自定义任务的示例。

### 定义自定义任务

我们可以在 `build.gradle.kts` 文件中使用 Kotlin DSL 来定义自定义任务。以下是一个简单的示例，其中定义了一个名为 `hello` 的任务，该任务在执行时会打印 "Hello, Gradle!"。

```kotlin
tasks.register("hello") {
    doLast {
        println("Hello, Gradle!")
    }
}
```

### 运行自定义任务

定义了自定义任务后，可以通过命令行运行它：

```sh
./gradlew hello
```

### 更多复杂的自定义任务

你可以创建更复杂的自定义任务，例如，读取文件、处理数据、生成报告等。下面是一些示例：

#### 读取文件内容并打印

```kotlin
tasks.register("readFile") {
    doLast {
        val file = file("src/main/resources/sample.txt")
        if (file.exists()) {
            println(file.readText())
        } else {
            println("File not found")
        }
    }
}
```

#### 创建一个目录并生成文件

```kotlin
tasks.register("generateFile") {
    doLast {
        val dir = file("generated")
        if (!dir.exists()) {
            dir.mkdirs()
        }
        val file = file("generated/output.txt")
        file.writeText("This is a generated file.")
        println("File generated at: ${file.absolutePath}")
    }
}
```

### 配置任务的依赖关系

可以设置任务的执行顺序，让一个任务在另一个任务之后执行。使用 `dependsOn` 方法可以定义任务之间的依赖关系。例如：

```kotlin
tasks.register("taskA") {
    doLast {
        println("Executing task A")
    }
}

tasks.register("taskB") {
    dependsOn("taskA")
    doLast {
        println("Executing task B after task A")
    }
}
```

运行 `taskB` 时，Gradle 会确保 `taskA` 在 `taskB` 之前执行。

```sh
./gradlew taskB
```

### 结合使用输入和输出

自定义任务可以声明输入和输出，以便 Gradle 能够正确处理增量构建。这有助于提高构建效率。以下是一个示例：

```kotlin
tasks.register<Copy>("copyFiles") {
    from("src/main/resources")
    into("build/resources")
}

tasks.register("processFiles") {
    dependsOn("copyFiles")
    inputs.dir("build/resources")
    outputs.dir("build/processed")

    doLast {
        val inputDir = file("build/resources")
        val outputDir = file("build/processed")
        if (!outputDir.exists()) {
            outputDir.mkdirs()
        }
        inputDir.listFiles()?.forEach { file ->
            file.copyTo(file(outputDir, file.name), overwrite = true)
        }
        println("Files processed and copied to ${outputDir.absolutePath}")
    }
}
```
