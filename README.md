# 吾有一术 · 文档站（Wydocs）

> 方块之间，吾有一术 —— 面向 **Wenyan Programming（吾有一术）** 与 **Wenyan Addon（吾有一术：新秩序）** 的官方文档站。

本站基于 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建，为玩家提供快速入门教程、文言语法参考、功能方块与功能符（模块）索引，以及面向开发者的机制与技术文档。

线上地址（GitHub Pages）：<https://ugnjhjf.github.io/wydocs/>

## 内容栏目

| 栏目 | 目录 | 内容 |
| --- | --- | --- |
| 首页 | `index.mdx` | 站点首页（splash 模板） |
| 演示广场 | `demos/` | 可直接抄入符咒运行的示例法术 |
| 快速入门 | `tutorial/` | 面向零基础玩家的 5 步教程 |
| 文言语法 | `usage/` | 变量、运算、控制流、函数、对象、导入等语法参考 |
| 功能方块 | `in_game/` | 符咒、运行方块、合成方块、能量方块等游戏内容 |
| 功能符（模块） | `modules/` | 文言标准库模块（「算經」「世界」等）的函数说明 |
| 进阶内容 | `development/` | 机制原理、judou 编译器内部结构与技术文档 |

侧边栏结构与站点标题在 [`astro.config.mjs`](astro.config.mjs) 中维护；新增栏目或页面后需要同步更新其中的 `sidebar`。

## 环境要求

与 CI（`.github/workflows/astro.yml`）保持一致：

- **Node.js 24+**
- **pnpm 11.20.0+**（仓库含 `pnpm-lock.yaml`，使用 `pnpm install` 安装依赖）

## 常用命令

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动本地开发服务器（默认 http://localhost:4321）
pnpm build     # 构建生产站点到 ./dist/
pnpm preview   # 本地预览构建产物
pnpm astro check   # 类型与内容检查
```

> 在代理/工具环境中，建议以后台模式启动开发服务器：`astro dev --background`，并通过 `astro dev stop` / `astro dev status` / `astro dev logs` 管理（见 [AGENTS.md](AGENTS.md)）。

## 项目结构

```
Wydocs/
├── astro.config.mjs        # Astro + Starlight 配置（标题、侧边栏、主题）
├── package.json
├── pnpm-lock.yaml
├── public/                 # 静态资源（favicon 等）
└── src/
    ├── components/
    │   └── Recipe.astro    # 合成配方展示组件
    ├── content/
    │   └── docs/           # ★ 文档正文（markdown / mdx）
    │       ├── demos/      # 演示广场
    │       ├── tutorial/   # 快速入门
    │       ├── usage/      # 文言语法
    │       ├── in_game/    # 功能方块
    │       ├── modules/    # 功能符 / 模块
    │       ├── development/# 进阶内容（机制、judou 内部）
    │       └── img/        # 文档配图（按栏目分子目录存放）
    ├── content.config.ts   # Starlight 内容集合配置
    └── styles/
        └── landing.css     # 首页自定义样式
```

## 编写文档

1. 在 `src/content/docs/` 下对应的栏目目录新建 `.md` 或 `.mdx` 文件。
2. frontmatter 至少包含 `title`：

   ```md
   ---
   title: "符咒"
   ---
   ```

3. 支持 Starlight 的提示与选项卡语法：

   ```md
   :::note
   提示内容
   :::

   :::tip
   小贴士内容
   :::
   ```

4. 展示合成配方时可使用 `Recipe.astro` 组件（见 `src/components/Recipe.astro`）。
5. 图片统一放入 `src/content/docs/img/` 对应栏目目录，以相对路径引用。
6. 侧边栏默认按 `astro.config.mjs` 的 `sidebar` 与 `autogenerate` 规则生成；新页面若不在自动生成范围内，请手动登记。

### 维护约定

- 由 AI 学习源码生成、尚未人工校对的文档，请在正文开头标注：

  ```md
  :::note
  由 AI 学习源码后生成（未检查）
  :::
  ```

- `development/gpt转录/` 是旧文档的转录存档，正式内容以 `development/` 下对应文档为准，避免双份维护。
- 本站内容同时涉及 **WenyanProgramming（本体）** 与 **WenyanAddon（附属）**；写功能方块/模块文档时请注明所属模组。

## 部署

- 平台：**GitHub Pages**
- 触发：推送 `main` 分支即自动构建并部署（见 [`.github/workflows/astro.yml`](.github/workflows/astro.yml)）
- 流程：pnpm 安装依赖 → `astro build`（`--base` 由 Pages 自动注入）→ 上传 `dist/` 产物 → 部署
- 也可在 Actions 页面手动触发 `workflow_dispatch`

## 相关项目

- [Wenyan Programming（吾有一术 · 本体）](https://github.com/gyxx-xc/WenyanNature)：文言编程模组本体，含编译器（judou）与运行时。
- [Wenyan Addon（吾有一术：新秩序）](https://github.com/gyxx-xc/WenyanAddon)：实验性附属模组，新功能的测试场，稳定功能会并入本体。

## 贡献

欢迎提交内容修正、翻译校对与新文档：

1. Fork 本仓库。
2. 新建分支：`git checkout -b feature/your-doc-change`。
3. 修改或新增 `src/content/docs/` 下的文档。
4. 提交并推送，向 `main` 分支发起 Pull Request。

