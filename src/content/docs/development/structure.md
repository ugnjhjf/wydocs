---
title: "项目结构"
---

## 目录结构

```
WenyanNature/
├── src/                                # 源码根目录
│   ├── main/                           # 通用/服务端代码
│   │   └── java/indi/wenyan/           # 模组主源码
│   │       ├── content/
│   │       │   ├── block/                      # 方块实现
│   │       │   │   ├── additional_module/      # 附加功能方块
│   │       │   │   ├── crafting_block/         # 合成界面方块
│   │       │   │   ├── pedestal/               # 底座方块
│   │       │   │   ├── power/                  # 能源系统方块
│   │       │   │   ├── runner/                 # 代码执行器方块
│   │       │   │   └── writing_block/          # 代码刻印方块
│   │       │   ├── entity/                     # 实体定义
│   │       │   ├── item/                       # 自定义物品
│   │       │   ├── recipe/                     # 合成配方
│   │       │   └── gui_impl/                   # 服务端 GUI 实现
│   │       ├── interpreter_impl/       # 文言运行时集成
│   │       │   └── value/              # Minecraft 专属值类型
│   │       └── setup/
│   │           ├── datagen/            # 数据生成
│   │           │   ├── Language/       # 语言文件生成
│   │           │   ├── loot/           # 战利品表生成
│   │           │   ├── model/          # 模型生成
│   │           │   ├── recipe/         # 配方生成
│   │           │   └── tags/           # 标签生成
│   │           ├── definitions/        # 注册表定义
│   │           ├── event/              # 事件处理器
│   │           ├── language/           # 本地化
│   │           └── network/            # 网络数据包处理
│   └── client/
│       └── java/indi/wenyan/client/
│           ├── gui/
│           │   ├── behaviour/          # GUI 行为处理器
│           │   ├── code_editor/        # 代码编辑器 GUI 组件
│           │   │   ├── _generator_py/          # Python 代码生成工具
│           │   │   ├── backend/                # 代码编辑后端逻辑
│           │   │   └── widget/                 # GUI 控件
│           │   └── float_note/         # 悬浮笔记 UI
│           └── renderer/
│               ├── block/              # 方块渲染器
│               │   └── utils/          # 渲染工具
│               └── entity/             # 实体渲染器
├── judou/src/main/java/indi/wenyan/judou/
│   ├── antlr/                          # ANTLR 语法与错误处理
│   ├── compiler/                       # 字节码生成与编译
│   ├── runtime/                        # 核心运行时与线程管理
│   ├── structure/                      # 数据结构与值表示
│   ├── exec_interface/                 # 执行接口（非线程安全）
│   └── utils/                          # 语言处理工具
│       ├── config/                     # 配置工具
│       ├── function/                   # 函数工具
│       └── language/                   # 语言翻译工具
├── language_processor/                 # 注解处理器
└── docs/                               # 项目文档
    ├── mkdocs/docs/                    # MkDocs 文档站点
    │   ├── development/                # 开发指南
    │   ├── modules/                    # 模块文档
    │   ├── patchouli/                  # 游戏内手册文档
    │   ├── usage/                      # 使用指南
    │   └── css/                        # 自定义 CSS 样式
    ├── README.zh_CHS.md                # 简体中文 README
    ├── README.zh_CHT.md                # 繁体中文 README
    └── requirements.txt                # Python 依赖
```
