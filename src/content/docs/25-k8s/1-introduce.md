---
title: Kubernetes介绍
---

## Kubernetes是什么？

Kubernetes是Google开源的容器化应用程序编排，管理平台。可以运行在虚拟机或物理机上。Kubernetes提供多个种通用接口如CNI(Container Network Interface), CSI(Container Storage Interface),CRI(Container Runtime Interface)，使得许多云平台都接入其生态系统中。

## 为什么需要容器编排？

在单机环境中使用容器Docker搭配Docker Compose已经可以完成所有工作了，但是当业务量太大时，单机环境不能满足需求时，将需要多个主机共同完成工作，此时Docker和Docker Compose的组合就不能完成任务，此时就需要容器编排了。

常见的容器编排技术主要:

1. Kubernetes
2. Mesos
3. Docker Swarm

Swarm是Docker官方推出的容器编排技术，其本身专注与容器编排，使用比较简单，但是在生产环境中大规模使用有些不足。

Mesos本身是将数据中心的所有资源进行抽象，Mesos作为一个大的资源池。

## Kubernetes的基本概念

### Node

Node是一台物理机或者使用虚拟机，是可以运行Docker等容器运行时的机器

## Kubernetes的架构

```txt
                                                      +--------+
                                             +------> | Node 1 |
                             +--------+      |        +--------+
  +---------------+          |        |      |
  |               |          |        |      |        +--------+
  |  API          |  ---->   | Master |<-----+------> | Node 2 |
  |  (kubectl,..) |          |        |      |        +--------+
  +---------------+          |        |      |
                             +--------+      |        +--------+
                                             +------> | Node 3 |
                                                      +--------+

```

API是部分是指通过API操作Kubernetes集群的工具，如常见的kubectl, 都是通过Kubernetes的API与Kubernetes通信来控制Kubernetes集群的。

Master也是Node, Master只是该Node在集群中的一个角色，通常Master上有etcd, kube-apiserver, kube-controller-manager和kube-scheduler,也可以分开安装各个组件，但是kube-apiserver会在Master上。

Master的结构

```txt
  +-------------------------------------------+
  |               API Server                  |
  +-------------------------------------------+
     ^                ^                ^
     |                |                |
     |                |                |
     v                v                v
  +-------+     +-----------+    +------------+
  | etcd  |     | scheduler |    | controller |
  +-------+     +-----------+    +------------+
```
