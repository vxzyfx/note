---
title: 服务器安全
description: 服务器入侵和挖矿程序排查时的只读检查、安全处置边界和参考来源。
---

## 挖矿程序

挖矿程序通常会长期占用 CPU、内存和网络资源；云厂商还可能在检测到挖矿行为后限制或关停实例。排查时先做只读取证，确认异常来源后再决定隔离、备份、重装或恢复。

### 排查挖矿程序

1. 检查 CPU 和内存占用。可以先用 `top` 或 `ps` 观察异常进程，找到 PID 后再查看 `/proc/<pid>/` 下的命令行、工作目录和打开文件。
2. 检查网络连接。`ss -tulnp` 可查看监听端口，`lsof -i` 可查看进程关联的网络连接。
3. 排查定时任务。

   查看 systemd timer 是只读操作，适合先确认是否存在异常定时器：

   ```shell
   systemctl list-timers --all
   ```

   查看所有用户的 crontab 会读取系统账户信息，不会修改任务；需要 root 权限时再加 `sudo`：

   ```shell
   cut -f 1 -d : /etc/passwd | xargs -I {} crontab -l -u {}
   ```

   > 警告：`crontab -e -u 用户名` 会直接编辑指定用户的定时任务，误删可能导致业务任务停止。编辑前先备份当前输出，并确认用户名正确。

   ```shell
   crontab -e -u 用户名
   ```

4. 检查是否存在异常代理、异常 SSH 登录、未知系统服务或未知自启动项。
5. 如果无法确认入侵面，优先隔离实例、备份业务数据和证据，再重装系统或从可信快照恢复。不要在未确认证据前直接删除文件。

> 注意：某些挖矿程序会修改 `hosts`、crontab、systemd timer、SSH authorized_keys 或防火墙规则；处置时应同时检查持久化入口。

## 参考资料

1. [proc(5) - Linux manual page](https://man7.org/linux/man-pages/man5/proc.5.html)（访问日期：2026-05-31）
2. [systemd.timer(5)](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html)（访问日期：2026-05-31）
3. [crontab(1) - Linux manual page](https://man7.org/linux/man-pages/man1/crontab.1.html)（访问日期：2026-05-31）
4. [ss(8) - Linux manual page](https://man7.org/linux/man-pages/man8/ss.8.html)（访问日期：2026-05-31）
