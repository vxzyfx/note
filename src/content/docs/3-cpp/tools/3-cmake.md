---
title: cmake
---

CMake 是一个跨平台的开源工具，用于管理软件项目的构建过程。它由 Kitware 开发，旨在简化生成原生构建系统（如 Makefiles 和 Visual Studio 项目）的复杂性。以下是对 CMake 的一些介绍：

## 基本概念

1. **CMakeLists.txt**:
   - 每个 CMake 项目包含一个或多个 `CMakeLists.txt` 文件。这个文件定义了项目的构建流程和配置选项。

2. **构建目录和源目录**:
   - 源目录是包含源代码和 `CMakeLists.txt` 文件的目录。
   - 构建目录是运行 CMake 命令的目录，用于存储生成的构建文件（如 Makefile 或项目文件）。

### 核心功能

1. **跨平台支持**:
   - CMake 支持多种平台和编译器，包括 Unix-like 系统、Windows 和 macOS。它能够生成适合这些平台的构建系统。

2. **模块和脚本**:
   - CMake 提供了许多内置模块，帮助配置常见任务，如查找库和头文件。
   - 用户可以编写自己的脚本来扩展 CMake 的功能。

3. **生成构建系统**:
   - CMake 将项目描述转换为本地构建系统，如 Unix 的 Makefile 或 Windows 的 Visual Studio 项目。


## `CMakeLists.txt`
`CMakeLists.txt` 文件中的配置选项用于定义项目的构建流程、编译选项、依赖项、目标等。以下是一些常见的配置选项和命令的介绍：

### 基本配置

1. **cmake_minimum_required**:
   指定最低版本的 CMake。

   ```cmake
   cmake_minimum_required(VERSION 3.10)
   ```

2. **project**:
   定义项目名称和版本。

   ```cmake
   project(MyProject VERSION 1.0)
   ```

### 添加源文件和可执行文件

3. **add_executable**:
   添加可执行文件目标。

   ```cmake
   add_executable(MyExecutable main.cpp)
   ```

4. **add_library**:
   添加库目标，可以是静态库或共享库。

   ```cmake
   add_library(MyLibrary STATIC mylibrary.cpp)
   ```

### 指定编译选项

5. **target_compile_options**:
   为目标指定编译选项。

   ```cmake
   target_compile_options(MyExecutable PRIVATE -Wall -Wextra)
   ```

6. **set**:
   设置变量，可以用来设置编译选项、路径等。

   ```cmake
   set(CMAKE_CXX_STANDARD 17)
   ```

### 包含目录和库路径

7. **include_directories**:
   指定包含目录。

   ```cmake
   include_directories(${PROJECT_SOURCE_DIR}/include)
   ```

8. **link_directories**:
   指定库路径。

   ```cmake
   link_directories(${PROJECT_SOURCE_DIR}/lib)
   ```

9. **target_link_libraries**:
   为目标链接库。

   ```cmake
   target_link_libraries(MyExecutable MyLibrary)
   ```

### 查找包和库

10. **find_package**:
    查找并配置外部包。

    ```cmake
    find_package(OpenCV REQUIRED)
    include_directories(${OpenCV_INCLUDE_DIRS})
    target_link_libraries(MyExecutable ${OpenCV_LIBS})
    ```

11. **find_library**:
    查找指定库。

    ```cmake
    find_library(MY_LIB NAMES mylib PATHS /usr/local/lib)
    target_link_libraries(MyExecutable ${MY_LIB})
    ```

### 自定义命令和目标

12. **add_custom_command**:
    添加自定义命令。

    ```cmake
    add_custom_command(
        OUTPUT output.txt
        COMMAND ${CMAKE_COMMAND} -E echo "Generating output.txt"
        DEPENDS input.txt
    )
    ```

13. **add_custom_target**:
    添加自定义目标。

    ```cmake
    add_custom_target(generate_output ALL DEPENDS output.txt)
    ```

### 条件判断和选项

14. **if, elseif, else, endif**:
    条件判断。

    ```cmake
    if(CMAKE_BUILD_TYPE STREQUAL "Debug")
        message("Debug build")
    elseif(CMAKE_BUILD_TYPE STREQUAL "Release")
        message("Release build")
    endif()
    ```

15. **option**:
    定义布尔选项。

    ```cmake
    option(BUILD_SHARED_LIBS "Build using shared libraries" ON)
    ```

### 子目录和外部项目

16. **add_subdirectory**:
    添加子目录。

    ```cmake
    add_subdirectory(src)
    ```

17. **ExternalProject_Add**:
    添加外部项目。

    ```cmake
    include(ExternalProject)
    ExternalProject_Add(
        external_project
        GIT_REPOSITORY https://github.com/user/repo.git
        CMAKE_ARGS -DCMAKE_INSTALL_PREFIX=<INSTALL_DIR>
    )
    ```

### 配置输出

18. **configure_file**:
    配置文件，将变量替换为具体值。

    ```cmake
    configure_file(config.h.in config.h)
    ```

## 预定义变量

`CMakeLists.txt` 中的变量在项目配置和构建过程中扮演重要角色。它们可以用来控制编译选项、指定路径、管理项目设置等。以下是一些常见的变量和它们的用法：

### 常见预定义变量

1. **CMAKE_SOURCE_DIR**:
   项目根目录的路径（即包含顶层 `CMakeLists.txt` 的目录）。

   ```cmake
   message(STATUS "Source directory: ${CMAKE_SOURCE_DIR}")
   ```

2. **CMAKE_BINARY_DIR**:
   当前构建目录的路径。

   ```cmake
   message(STATUS "Binary directory: ${CMAKE_BINARY_DIR}")
   ```

3. **CMAKE_CURRENT_SOURCE_DIR**:
   当前处理的 `CMakeLists.txt` 文件所在目录。

   ```cmake
   message(STATUS "Current source directory: ${CMAKE_CURRENT_SOURCE_DIR}")
   ```

4. **CMAKE_CURRENT_BINARY_DIR**:
   当前处理的 `CMakeLists.txt` 文件的构建目录。

   ```cmake
   message(STATUS "Current binary directory: ${CMAKE_CURRENT_BINARY_DIR}")
   ```

5. **CMAKE_BUILD_TYPE**:
   构建类型，可以是 `Debug`, `Release`, `RelWithDebInfo`, `MinSizeRel` 等。

   ```cmake
   set(CMAKE_BUILD_TYPE Debug)
   ```

6. **CMAKE_CXX_COMPILER**:
   C++ 编译器的路径。

   ```cmake
   set(CMAKE_CXX_COMPILER /usr/bin/g++)
   ```

7. **CMAKE_CXX_FLAGS**:
   传递给 C++ 编译器的标志。

   ```cmake
   set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")
   ```

8. **CMAKE_INSTALL_PREFIX**:
   安装目录的前缀。

   ```cmake
   set(CMAKE_INSTALL_PREFIX /usr/local)
   ```

### 自定义变量

1. **设置变量**:
   使用 `set` 命令定义和初始化变量。

   ```cmake
   set(MY_VARIABLE "Hello, World!")
   message(STATUS "My variable: ${MY_VARIABLE}")
   ```

2. **缓存变量**:
   使用 `CACHE` 关键字设置缓存变量，这些变量在配置过程中会保留，并可以通过 CMake GUI 或命令行参数进行修改。

   ```cmake
   set(MY_CACHE_VARIABLE "DefaultValue" CACHE STRING "Description of the variable")
   message(STATUS "My cache variable: ${MY_CACHE_VARIABLE}")
   ```

3. **选项变量**:
   使用 `option` 命令定义布尔选项变量。

   ```cmake
   option(MY_OPTION "Enable my option" ON)
   message(STATUS "My option: ${MY_OPTION}")
   ```

### 内置路径变量

1. **CMAKE_INCLUDE_PATH**:
   查找头文件时使用的路径。

   ```cmake
   set(CMAKE_INCLUDE_PATH "/path/to/include")
   ```

2. **CMAKE_LIBRARY_PATH**:
   查找库文件时使用的路径。

   ```cmake
   set(CMAKE_LIBRARY_PATH "/path/to/lib")
   ```

3. **CMAKE_MODULE_PATH**:
   查找 CMake 模块时使用的路径。

   ```cmake
   set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")
   ```

### 获取系统信息的变量

1. **CMAKE_SYSTEM_NAME**:
   操作系统的名称。

   ```cmake
   message(STATUS "System name: ${CMAKE_SYSTEM_NAME}")
   ```

2. **CMAKE_SYSTEM_PROCESSOR**:
   处理器架构。

   ```cmake
   message(STATUS "System processor: ${CMAKE_SYSTEM_PROCESSOR}")
   ```


## 使用笔记

## 修改中间文件后缀

```cmake
# .c.o为.o
set(CMAKE_C_OUTPUT_EXTENSION_REPLACE 1)
# .cpp.o为.o
set(CMAKE_CXX_OUTPUT_EXTENSION_REPLACE 1)
```