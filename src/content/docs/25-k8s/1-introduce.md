---
title: Kubernetes介绍
description: Kubernetes 容器编排平台的基本概念、节点角色和控制平面结构。
---
<!-- cspell:words Mesos dockershim apiserver -->

## Kubernetes 是什么？

Kubernetes 是用于管理容器化工作负载和服务的开源平台，提供声明式配置和自动化能力。它可以运行在虚拟机或物理机上，并通过 CNI（Container Network Interface）、CSI（Container Storage Interface）、CRI（Container Runtime Interface）等接口接入网络、存储和容器运行时生态。

## 为什么需要容器编排？

单机环境中，Docker 与 Docker Compose 适合本机开发或较小规模部署；当应用需要跨多台主机调度、滚动发布、服务发现、自动恢复和统一资源管理时，就需要容器编排平台。

常见的容器编排技术主要:

1. Kubernetes
1. Mesos
1. Docker Swarm

Docker Swarm 是 Docker 生态中的编排技术，使用门槛较低；是否适合生产环境取决于团队规模、生态需求和运维能力。

Mesos 本身是将数据中心的所有资源进行抽象，Mesos 作为一个大的资源池。

## Kubernetes 的基本概念

### Node.js

Node.js 是 Kubernetes 中运行 Pod 的工作机器，可以是物理机或虚拟机；当前 Kubernetes 通过 CRI 接入 containerd、CRI-O 等容器运行时，不再内置 dockershim。

## Kubernetes 的架构

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

API 是部分是指通过 API 操作 Kubernetes 集群的工具，如常见的 kubectl, 都是通过 Kubernetes 的 API 与 Kubernetes 通信来控制 Kubernetes 集群的。

旧资料常把控制平面节点称为 Master；Kubernetes 官方文档现在使用 Control Plane 表述。控制平面通常包含 kube-apiserver、etcd、kube-scheduler、kube-controller-manager 等组件，这些组件可以集中部署，也可以按高可用方案分散部署。

控制平面的结构

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

## 参考资料

1. [Kubernetes Overview](https://kubernetes.io/docs/concepts/overview/)（访问日期：2026-05-31）
1. [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)（访问日期：2026-05-31）
1. [Container runtimes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)（访问日期：2026-05-31）
