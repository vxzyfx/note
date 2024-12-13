---
title: Android使用笔记
---

## 安装CA证书

### Android studio的模拟器

选择手机型号时,不要选择Play Store的型号不能Root

`emulator`命令目录`~/Library/Android/sdk/emulator`, `adb`命令目录`/Library/Android/sdk/platform-tools`

启动模拟器`Pixel_6_API_33`是模拟器名称
```bash
emulator -avd Pixel_6_API_33 -writable-system
```

获取root权限
```bash
adb root
```

禁用`secure boot verification`
```bash
adb shell avbctl disable-verification
```

重新挂载分区
```bash
adb remount
```

获取CA证书hash
```bash
openssl x509 -inform PEM -subject_hash_old -in ca.crt | head -1 
```

假设CA证书的hash是`364618e0`
```bash
adb push ca.crt /system/etc/security/cacerts/364618e0.0
```

