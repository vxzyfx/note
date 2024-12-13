---
title: Xcode使用
---

## 开发中的权限配置

### Target共享文件

打开文件后, 根据导航栏打开`/View/Inspectors/File`, 可以在右边打开一个窗口, 在`Target Membership`中将要共用该文件的Target勾上

### 开启权限

点击项目, 再选择对应的Target, 在`Info`页面中`Custom macOS Appliaction Target Properties`中添加权限

1. 蓝牙权限

添加键`Privacy - Bluetooth Always Usage Description`, 值是字符串类型写明为什么需要蓝牙权限

2. 开启灵动岛动态权限

添加键`Supports Live Activities`, 值是布尔类型, 选择`YES`

