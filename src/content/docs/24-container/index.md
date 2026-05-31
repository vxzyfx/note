---
title: 容器技术合集
description: 汇总容器、镜像、运行时、网络、存储与安全边界的基础笔记。
---

容器是一种把应用进程、依赖和运行环境打包并隔离运行的方式。它依赖 Linux namespace、cgroup、文件系统层和运行时工具链，并不等同于完整虚拟机；容器共享宿主机内核，因此安全边界要按运行时配置和宿主机策略一起评估。

## 核心概念

- 镜像（image）：只读模板，通常由多层文件系统和配置组成。OCI Image Specification 定义了镜像格式、清单和配置结构。
- 容器（container）：从镜像创建出来的运行实例，包含进程、挂载、网络、环境变量和资源限制等运行状态。
- 仓库/注册表（registry）：保存和分发镜像的位置，推送前应确认命名空间、标签和访问权限。
- 运行时（runtime）：负责创建和管理容器进程。Docker Engine 面向开发者提供构建、运行和镜像管理体验；containerd 负责镜像、快照和容器生命周期；runc 是实现 OCI Runtime Specification 的低层运行时之一。

## 镜像与供应链

容器镜像标签不是安全边界，`latest` 也不是稳定版本承诺。生产环境应优先使用明确版本标签或 digest，记录基础镜像来源，并在发布前扫描已知漏洞。构建镜像时不要把私钥、token、`.env`、kubeconfig 或云凭据复制进镜像层；即使后续 `rm` 删除，历史层也可能保留敏感内容。

## 网络、存储与资源

默认桥接网络适合本机开发，但生产环境应明确端口暴露范围、入站来源和网络策略。卷和 bind mount 会把宿主机路径暴露给容器，挂载 Docker socket、根目录或敏感配置目录会显著扩大容器逃逸后的影响范围。CPU、内存、进程数和文件描述符限制应按服务容量设置，避免单个容器耗尽宿主机资源。

## 安全基线

- 默认不要使用 `--privileged`，也不要随意添加 Linux capabilities；确需提权时写清影响范围和回滚方式。
- 优先使用非 root 用户运行应用，并只挂载必要目录。
- 对外暴露端口前先确认监听地址、防火墙和反向代理策略。
- 定期更新基础镜像和运行时组件，尤其是 Docker Engine、containerd、runc 与发行版安全更新。
- Kubernetes 中的容器运行还需要结合 Pod Security、RuntimeClass、镜像拉取策略和集群准入控制单独审查。

## 后续页面规划

当前页先作为容器合集概览。后续如果继续扩展，建议按“镜像构建与发布”“Docker/Compose 本地开发”“containerd/runc 运行时”“容器安全与供应链”拆成独立页面，避免把命令、安全策略和运行时内部机制混在同一页。

## 参考资料

1. [Docker Docs: What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)（访问日期：2026-05-31）
2. [Docker Docs: Images](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)（访问日期：2026-05-31）
3. [Docker Docs: Docker security](https://docs.docker.com/engine/security/)（访问日期：2026-05-31）
4. [Open Container Initiative Specifications](https://opencontainers.org/release-notices/overview/)（访问日期：2026-05-31）
5. [OCI Runtime Specification](https://github.com/opencontainers/runtime-spec)（访问日期：2026-05-31）
6. [containerd Getting Started](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)（访问日期：2026-05-31）
