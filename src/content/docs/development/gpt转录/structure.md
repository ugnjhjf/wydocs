---
title: "项目结构（GPT 转录）"
---

# 项目结构

简单来说，项目被拆成了几个大的模块：
- 模组主体（`src`）
- 文言解释器（`judou`）
- 注解处理器（`language_processor`）


下面按说明各模块的职责。

## 总览

```text
WenyanNature/
├── src/                  # 模组主体源码（Forge 环境）
├── judou/                # 文言语言的解释器 / 编译器实现
└── language_processor/   # 注解处理器（编译期代码生成）
```

## 模组主体：`src/`

### `src/main/` —— 通用 / 服务端代码

核心逻辑几乎都在这里，按功能再细分为：

```text
src/main/java/indi/wenyan/
├── content/          # 游戏内容：方块、实体、物品、配方
│   ├── block/        # 方块实现
│   │   ├── additional_module/   # 附加功能方块（阵眼这类）
│   │   ├── crafting_block/      # 带合成界面的方块
│   │   ├── pedestal/            # 底座方块
│   │   ├── power/               # 能源系统方块
│   │   ├── runner/              # 代码执行器方块（符）
│   │   └── writing_block/       # 代码刻印方块
│   ├── entity/       # 实体定义
│   ├── item/         # 自定义物品
│   ├── recipe/       # 合成配方
│   └── gui_impl/     # 服务端 GUI 逻辑
├── interpreter_impl/ # 文言运行时在 Minecraft 侧的集成
│   └── value/        # Minecraft 专属的值类型
└── setup/            # 注册、初始化相关
    ├── datagen/      # 数据生成
    │   ├── Language/ # 语言文件生成
    │   ├── loot/     # 战利品表生成
    │   ├── model/    # 模型生成
    │   ├── recipe/   # 配方生成
    │   └── tags/     # 标签生成
    ├── definitions/  # 注册表定义
    ├── event/        # 事件处理器
    ├── language/     # 本地化
    └── network/      # 网络数据包处理
```

要点：

- **`setup/datagen`**：负责批量生成配方、模型、语言文件
- **`interpreter_impl`**：把文言解释器「接」进 Minecraft，值类型在这里转换。

### `src/client/` —— 客户端专用代码

只跑在客户端的东西，主要是 UI 和渲染：

```text
src/client/java/indi/wenyan/client/
├── gui/              # 各种 GUI
│   ├── behaviour/    # GUI 行为处理器（按键、交互）
│   ├── code_editor/  # 代码编辑器相关
│   │   ├── _generator_py/  # Python 代码生成工具
│   │   ├── backend/         # 编辑器后端逻辑
│   │   └── widget/          # GUI 控件
│   └── float_note/   # 悬浮笔记 UI
└── renderer/         # 渲染器
    ├── block/        # 方块渲染（含 utils 工具）
    └── entity/       # 实体渲染
```

## 文言解释器：`judou/`

这是整套系统的「语言引擎」，和 Minecraft 解耦，可以独立演进：

```text
judou/src/main/java/indi/wenyan/judou/
├── antlr/            # ANTLR 语法定义与错误处理
├── compiler/         # 字节码生成与编译
├── runtime/          # 核心运行时与线程管理
├── structure/        # 数据结构与值表示
├── exec_interface/   # 执行接口（非线程安全）
└── utils/            # 各类工具
    ├── config/       # 配置工具
    ├── function/     # 函数工具
    └── language/     # 语言翻译工具
```

## 注解处理器：`language_processor/`

这个模块在编译期使用，用来生成一些重复性代码，减少手写样板。


## 实用建议

- 想改**方块逻辑**，去 `content/block/` 对应子目录找。
- 想改**语法或运行时**，去 `judou/`。
- 想改**游戏内文本 / 本地化**，去 `setup/language/`。
