---
title: "远程执行函数 exec（GPT 转录）"
---

# 执行函数 exec

## 概述

`exec` 允许阵眼（`FormationCoreModuleEntity`）在目标符（`RunnerBlockEntity`）上异步执行函数，并向调用方返回可等待的结果。

## 用户侧 API

```text
fu = import("otherFu")       // → WenyanCodeWithExecutor（新类型，表示「别的符」）
result = 眼.exec(fu, "func")  // → IWenyanValue（future）
await(result)                 // 等待执行完成
```

拆开讲：

- `import("otherFu")` 返回的不再是「包」，而是一个 **`WenyanCodeWithExecutor`**（可以理解成「远处那个符的化身」）。
- `眼.exec(fu, "func")` 在目标符上启动函数，返回一个 future。
- `await(result)` 等它跑完。

## 设计要求

1. 要能**引用其他符**——最好复用现在已经实现的 `import`：`import(fu) → obj fu`。
2. 提供 `exec(fu, function) → future` 来运行。
3. 要**能等待 future** 完成。

## 实现思路

### 关键改动一览

1. **调整 import 行为**：导入符时返回符对象，而不是直接返回 package。符对象通过 `getAttr` 延迟解析目标能力，并保存定位目标所需的信息。对外 API 应尽量保持兼容。
2. **远程执行**：要执行，就得拿到对方的方块实体。需要 `IWenyanScheduler.create()`（还带 `isRemoved()`），以及用于通信请求的 `blockPos`。
3. **future**：可以直接复用现有的 future 机制。

### 详细改动清单

#### 符对象（fu's object）

`WenyanCodeWithExecutor` 是 `IWenyanXxx super RunnerBlockEntity` 的一个包装器。它的 `getAttr` 会**懒调用**当前的 import 行为。

#### import 重构

现在的流程是：`import xxx` → `getPackage: Either<Package, String>` → 导入函数。
重构后：`getPackage` 返回 `IWenyanObject`（由 `WenyanPackage` / `WenyanCodeWithExecutor` 实现），现有的 import 处理器可能就不需要了。

#### RunnerBlockEntity

只改一处：新增一个 `newThread(IWenyanBytecode)` 重载，逻辑跟现有 `newThread(String)` 相同，但**跳过编译步骤**：

```java
public void newThread(IWenyanBytecode bytecode) {
    try {
        RunnerCreator.createThread(lazyProgram, bytecode, this.initEnvironment());
    } catch (WenyanException e) {
        handleError(e.getMessage());
    }
}
```

#### FormationCoreModuleEntity

在 `execPackage` 构建链里（`CORE_JOIN` 处理器之后）新增 `exec` 处理器：

```java
.description(FunctionMetaText.CoreExec.string())
.handler(WenyanSymbol.CORE_EXEC, (_, request, onReturn) -> {
    // args: [fu_obj (WenyanCodeWithExecutor), functionName (WenyanString)]
    // 1. 校验参数（size == 2）
    // 2. 取出 WenyanCodeWithExecutor 和函数名
    // 3. 从存的 BlockPos 找到 RunnerBlockEntity
    // 4. 拿到符的代码、编译函数、创建线程
})
```

#### 符号与文案

新增符号与对应文案：

```java
public static final String CORE_EXEC = "「執」";
```

并在 `FunctionMetaText` 枚举里加上 `CoreExec`。

## 涉及的文件

| 文件 | 改动 |
| --- | --- |
| `IWenyanPackageable.java` | 新增 `newThread(IWenyanBytecode)` 方法 |
| `WenyanCodeWithExecutor.java` | 实现符对象包装 |
| `RunnerBlockEntity.java` | 新增 `newThread(IWenyanBytecode)` 重载 |
| `FormationCoreModuleEntity.java` | 新增 `exec` 处理器 |
| `WenyanSymbol.java` | 新增 `CORE_EXEC = "「執」"` |
| `FunctionMetaText.java` | 新增 `CoreExec` 枚举 |

## 总结

`exec` = 阵眼的远程执行能力。通过把 `import` 返回「符对象」、提供 `exec(fu, func) → future`、并复用现有线程机制，让一个符能异步驱动另一个符跑函数。核心改动集中在 import 行为、符对象包装、Runner 的 newThread 重载和阵眼的 exec 处理器上。
