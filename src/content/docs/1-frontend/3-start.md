---
title: 项目搭建
description: 前端项目初始化和常用工具配置速查
---

## ESLint

ESLint 是一款代码规范工具，用于检查和统一代码格式。

> [eslint 官网](https://eslint.org/docs/latest/use/getting-started)

### 安装 ESLint

```bash
npm init @eslint/config@latest
```

## husky

husky 是一款 Git hook 工具，可以更方便地设置 git hook。[husky 官网](https://typicode.github.io/husky/)

### 安装 husky

```bash [NPM]
npm install --save-dev husky
```

```bash [PNPM]
pnpm add --save-dev husky
```

```shell [YARN]
yarn add --dev husky
# Add pinst ONLY if your package is not private
yarn add --dev pinst
```

```shell [BUN]
bun add --dev husky
```

### 配置 husky

```bash [NPM]
npx husky init
```

```bash [PNPM]
pnpm exec husky init
```

```shell [YARN]
# 不支持
```

```shell [BUN]
bunx husky init
```

## commitlint

commitlint 是一个提交信息规范的插件
[commitlint 官网](https://commitlint.js.org/)

### commitlint 安装

```bash [NPM]
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

```bash [PNPM]
pnpm add --save-dev @commitlint/config-conventional @commitlint/cli
```

```shell [YARN]
yarn add --dev @commitlint/config-conventional @commitlint/cli
```

```shell [BUN]
bun add --dev @commitlint/config-conventional @commitlint/cli
```

### commitlint 配置

在项目根目录下创建配置文件 `commitlint.config.mjs`

```typescript [commitlint.config.mjs]
export default {
  extends: ["@commitlint/config-conventional"],
};
```

添加钩子

```shell
cat > .husky/commit-msg  << 'EOF'
npx --no -- commitlint --edit ${1}
EOF
```

### 安装 prompt-cli

prompt-cli 可以根据 commitlint.config 快速生成提交信息

```bash [NPM]
npm install --save-dev @commitlint/prompt-cli
```

```bash [PNPM]
pnpm add --save-dev @commitlint/prompt-cli
```

```shell [YARN]
yarn add --dev @commitlint/prompt-cli
```

```shell [BUN]
bun add --dev @commitlint/prompt-cli
```

### prompt-cli 使用

```bash [NPM]
npx commit
```

```bash [PNPM]
pnpm exec commit
```

```shell [YARN]
# 不支持
```

```shell [BUN]
bunx commit
```

可以将 commit 添加到 `package.json`

```json [package.json]
{
  "scripts": {
    "commit": "commit"
  }
}
```

## lint-staged

lint-staged 是针对暂存区的 git 文件运行 linter 的工具
[lint-staged 官网](https://github.com/lint-staged/lint-staged)

### lint-staged 安装

```bash [NPM]
npm install --save-dev lint-staged
```

```bash [PNPM]
pnpm add --save-dev lint-staged
```

```shell [YARN]
yarn add --dev lint-staged
```

```shell [BUN]
bun add --dev lint-staged
```

### lint-staged 配置

lint-staged 配置可以放在 `package.json`

```json5 [package.json]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      // 需要检查的文件
      "prettier --write", // 使用prettier格式化
      "eslint --fix", // eslint 检查代码规范
    ],
  },
}
```

添加钩子

```shell
cat > .husky/pre-commit  << EOF
npx lint-staged
EOF
```

## prettier

prettier 是一款支持多语言的代码格式化工具。[prettier 官网](https://prettier.io/)

### prettier 安装

```bash [NPM]
npm install --save-dev prettier
```

```bash [PNPM]
pnpm add --save-dev prettier
```

```shell [YARN]
yarn add --dev --exact prettier
```

```shell [BUN]
bun add --dev prettier
```

### prettier 配置

创建 `.prettierignore` 文件, 排除运行 prettier 的目录

```text
# Ignore artifacts:
build
coverage
```

创建配置文件 `prettier.config.mjs`

```javascript
// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
};

export default config;
```

### 兼容 ESLint

安装兼容插件

```bash [NPM]
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

```bash [PNPM]
pnpm add --save-dev eslint-config-prettier eslint-plugin-prettier
```

```shell [YARN]
yarn add --dev eslint-config-prettier eslint-plugin-prettier
```

```shell [BUN]
bun add --dev eslint-config-prettier eslint-plugin-prettier
```

修改 ESLint 配置文件

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"]
}
```

## stylelint

### stylelint 安装

stylelint 是对 CSS 等样式表进行检查的工具 [stylelint 官网](https://stylelint.io/user-guide/get-started)

```shell
npm create stylelint@latest
```

### 支持 scss

```bash [NPM]
npm install --save-dev stylelint stylelint-config-standard-scss
```

```bash [PNPM]
pnpm add --save-dev stylelint stylelint-config-standard-scss
```

```shell [YARN]
yarn add --dev stylelint stylelint-config-standard-scss
```

```shell [BUN]
bun add --dev stylelint stylelint-config-standard-scss
```

修改 stylelint 配置文件

```javascript
/** @type {import('stylelint').Config} */
export default {
  extends: "stylelint-config-standard-scss",
};
```

### 设置 stylelint 顺序插件

```bash [NPM]
npm install --save-dev stylelint-order
```

```bash [PNPM]
pnpm add --save-dev stylelint-order
```

```shell [YARN]
yarn add --dev stylelint-order
```

```shell [BUN]
bun add --dev stylelint-order
```

修改 stylelint 配置文件

```javascript
/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-alphabetical-order": true,
  },
};
```

### 设置 stylelint 支持 vue

```bash [NPM]
npm install --save-dev postcss-html stylelint-config-html
```

```bash [PNPM]
pnpm add --save-dev postcss-html stylelint-config-html
```

```shell [YARN]
yarn add --dev postcss-html stylelint-config-html
```

```shell [BUN]
bun add --dev postcss-html stylelint-config-html
```

修改 stylelint 配置文件

```javascript
/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-html"],
};
```

## Tailwind CSS

Tailwind CSS 是一个实用类优先的 CSS 框架，通过类名组合样式。[Tailwind CSS 的安装](https://tailwindcss.com/docs/installation)

## 参考资料

1. [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)（访问日期：2026-05-31）
2. [Get started | Husky](https://typicode.github.io/husky/get-started.html)（访问日期：2026-05-31）
3. [Getting started | stylelint](https://stylelint.io/user-guide/get-started)（访问日期：2026-05-31）
4. [Install - Prettier](https://prettier.io/docs/install)（访问日期：2026-05-31）
5. [Installing Tailwind CSS](https://tailwindcss.com/docs)（访问日期：2026-05-31）
