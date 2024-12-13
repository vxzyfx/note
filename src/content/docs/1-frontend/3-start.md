---
title: 项目搭建
---

## eslint

eslint是一款代码规范估计,用于规范代码格式
[eslint官网](https://eslint.org/docs/latest/use/getting-started)

### 安装eslint
  ```bash
  npm init @eslint/config
  ```

## husky
husky是一款git的hook工具, 可以更方便的设置git hook
[husky官网](https://typicode.github.io/husky/)

### 安装husky
::code-group
  ```bash [NPM]
  npm install --save-dev husky
  ```
  ```bash [PNPM]
  pnpm add --save-dev husky
  ```
  ```shell [YARM]
  yarn add --dev husky
  # Add pinst ONLY if your package is not private
  yarn add --dev pinst
  ```
  ```shell [BUN]
  bun add --dev husky
  ```
::
### 配置husky

::code-group
  ```bash [NPM]
  npx husky init
  ```
  ```bash [PNPM]
  pnpm exec husky init
  ```
  ```shell [YARM]
  # 不支持
  ```
  ```shell [BUN]
  bunx husky init
  ```
::

## commitlint
commitlint 是一个提交信息规范的插件
[commitlint 官网](https://commitlint.js.org/)

### commitlint安装

::code-group
  ```bash [NPM]
  npm install --save-dev @commitlint/config-conventional @commitlint/cli
  ```
  ```bash [PNPM]
  pnpm add --save-dev @commitlint/config-conventional @commitlint/cli
  ```
  ```shell [YARM]
  yarn add --dev @commitlint/config-conventional @commitlint/cli
  ```
  ```shell [BUN]
  bun add --dev @commitlint/config-conventional @commitlint/cli
  ```
::

### commitlint配置

在项目根目录下创建配置文件`commitlint.config.mjs`

```typescript [commitlint.config.mjs]
export default {
    extends: ['@commitlint/config-conventional']
}
```

添加钩子
```shell
cat > .husky/commit-msg  << 'EOF'
npx --no -- commitlint --edit ${1}
EOF
```

### 安装prompt-cli

prompt-cli 可以根据 commitlint.config快速生成提交信息
::code-group
  ```bash [NPM]
  npm install --save-dev @commitlint/prompt-cli
  ```
  ```bash [PNPM]
  pnpm add --save-dev @commitlint/prompt-cli
  ```
  ```shell [YARM]
  yarn add --dev @commitlint/prompt-cli
  ```
  ```shell [BUN]
  bun add --dev @commitlint/prompt-cli
  ```
::

### prompt-cli使用
::code-group
  ```bash [NPM]
  npx commit
  ```
  ```bash [PNPM]
  pnpm exec commit
  ```
  ```shell [YARM]
  # 不支持
  ```
  ```shell [BUN]
  bunx commit
  ```
::

可以将commit添加到`package.json`
```json [package.json]
{
  "scripts": {
    "commit": "commit"
  }
}
```

## lint-staged

lint-staged是针对暂存区的git文件运行linter的工具
[lint-staged官网](https://github.com/lint-staged/lint-staged)
### lint-staged安装

::code-group
  ```bash [NPM]
  npm install --save-dev lint-staged
  ```
  ```bash [PNPM]
  pnpm add --save-dev lint-staged
  ```
  ```shell [YARM]
  yarn add --dev lint-staged
  ```
  ```shell [BUN]
  bun add --dev lint-staged
  ```
::

### lint-staged配置
lint-staged配置可以放在`package.json`

```json5 [package.json]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [ // 需要检查的文件
        "prettier --write", // 使用prettier格式化
        "eslint --fix"      // eslint 检查代码规范
      ]
  }
}
```

添加钩子
```shell
cat > .husky/pre-commit  << EOF
npx lint-staged
EOF
```

## prettier
prettier是一款支持多语言的代码格式化工具
[prettier官网](https://prettier.io/)

### prettier 安装
::code-group
  ```bash [NPM]
  npm install --save-dev prettier
  ```
  ```bash [PNPM]
  pnpm add --save-dev prettier
  ```
  ```shell [YARM]
  yarn add --dev --exact prettier
  ```
  ```shell [BUN]
  bun add --dev prettier
  ```
::
### prettier 配置

创建`.prettierignore`文件, 排除运行prettier的目录

```text
# Ignore artifacts:
build
coverage
```

创建配置文件`prettier.config.mjs`

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

### 兼容eslint
安装兼容插件

::code-group
  ```bash [NPM]
  npm install --save-dev eslint-config-prettier eslint-plugin-prettier
  ```
  ```bash [PNPM]
  pnpm add --save-dev eslint-config-prettier eslint-plugin-prettier
  ```
  ```shell [YARM]
  yarn add --dev eslint-config-prettier eslint-plugin-prettier
  ```
  ```shell [BUN]
  bun add --dev eslint-config-prettier eslint-plugin-prettier
  ```
::

修改eslint配置文件
```json
{
  "extends": [
    "prettier"
  ],
  "plugins": ["prettier"]
}
```

## stylelint

### stylelint 安装
stylelint是对css等样式表进行检查的工具[stylelint官网](https://stylelint.io/user-guide/get-started)

```shell
npm init stylelint
```

### 支持scss

::code-group
  ```bash [NPM]
  npm install --save-dev stylelint stylelint-config-standard-scss
  ```
  ```bash [PNPM]
  pnpm add --save-dev stylelint stylelint-config-standard-scss
  ```
  ```shell [YARM]
  yarn add --dev stylelint stylelint-config-standard-scss
  ```
  ```shell [BUN]
  bun add --dev stylelint stylelint-config-standard-scss
  ```
::

修改stylelint配置文件 
```javascript
/** @type {import('stylelint').Config} */
export default {
    extends: "stylelint-config-standard-scss"
};
```

### 设置stylelint顺序插件

::code-group
  ```bash [NPM]
  npm install --save-dev stylelint-order
  ```
  ```bash [PNPM]
  pnpm add --save-dev stylelint-order
  ```
  ```shell [YARM]
  yarn add --dev stylelint-order
  ```
  ```shell [BUN]
  bun add --dev stylelint-order
  ```
::

修改stylelint配置文件
```javascript
/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-standard"],
    plugins: ["stylelint-order"],
    rules: {
       "order/properties-alphabetical-order": true
    }
}
```

### 设置stylelint支持vue

::code-group
  ```bash [NPM]
  npm install --save-dev postcss-html stylelint-config-html
  ```
  ```bash [PNPM]
  pnpm add --save-dev postcss-html stylelint-config-html
  ```
  ```shell [YARM]
  yarn add --dev postcss-html stylelint-config-html
  ```
  ```shell [BUN]
  bun add --dev postcss-html stylelint-config-html
  ```
::

修改stylelint配置文件
```javascript
/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-html"]
}
```

## Tailwind CSS
Tailwind CSS是一款现代css库, 通过类名引用样式 [Tailwind CSS的安装](https://tailwindcss.com/docs/installation)