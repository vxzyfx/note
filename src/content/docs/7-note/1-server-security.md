---
title: 服务器安全
---

## 挖矿程序

玩矿软件会占用服务器CPU和内存(对于阿里云等服务器提供商还会在检查到挖矿程序后关停服务器)

### 排查挖矿程序
+ 检查cpu和内存占用(可以使用`top`命令观察异常进程, 找到异常程序的pid后可以在`/proc/<pid>`目录先获取更详细的信息)
+ 检查网络异常网络连接(`ss -tulnp`检查监听的端口, `lsof -i`检查网络连接)
+ 排查定时任务
  + 检查system timer
  查看所有定时器`systemctl list-timers --all`
  + 检查crontab
  查看所有crontab任务
  ```shell
  cat /etc/passwd | cut -f 1 -d : |xargs -I {} crontab -l -u {}
    ```
  编辑crontab
  ```shell
  crontab -e -u 用户名
    ```  
+ 检查是否有网络代理
+ 如果都没找到(备份数据, 重新安装系统)

> 某些挖矿程序还会修改hosts文件