---
title: "符引用设计（GPT 转录）"
---

# 符引用（Fu Ref）

## 动机

给文言加一个新的 import 语句：**把「符」作为变量导入**，用于更好的分布式计算通信。

为什么要异步？因为用户**可能一次性要导入很多个符**，同步等着不现实，所以这个 import 得是**异步**的。

## 用户故事

1. **想要远程跑**：玩家想通过另一台设备（符）来运行程序。但现在没有任何好办法能拿到一个「远程的符」——只能用**字符串**去碰运气。可符的行为更像一个**对象**（跟其他模块一样），所以用**变量**来导入会自然得多。
2. **保留旧方式？**：现在这种「用字符串 import」的方式还要不要保留？——这是个待定的设计问题。
3. **远程优先，本地也要**：玩家想**远程执行**多过本地执行，因为远程高效得多。但**本地执行**也很重要，它可以减少代码重复。所以**两种导入方式最好都保留**。

### 导入方式汇总

| 目标 | 方式 |
| --- | --- |
| `device`（设备） | 不变 |
| `runner0`（尚未实现） | 现在的 `import(String)` |
| `runner n`（任意符） | 作为设备导入：`WenyanCodeWithExecutor` |

## 类设计

### 新建 `IWenyanPackageable.java`

新增一个接口，表示「可被打包执行」的符。

### 新建 `WenyanCodeWithExecutor.java`

关键结构：

```java
public record WenyanCodeWithExecutor(IWenyanPackageable packageable)
        implements IWenyanObject {
    public static final WenyanType<WenyanCodeWithExecutor> TYPE = ...;

    @Override
    public WenyanType<?> type() {
        return TYPE;
    }

    @Override
    public IWenyanValue getAttribute(String name) throws WenyanException {
        // 本设计中暂未实现
    }
}
```

### 修改 `BlockPackageGetter.java`

调整包的获取逻辑，让它能返回符对象。

## 总结

符引用 = 把「符」变成可 import 的对象。新增 `IWenyanPackageable` 接口和 `WenyanCodeWithExecutor`（符的包装器），用**异步 + 变量导入**的方式支持分布式执行；同时保留字符串 import 的旧路径，覆盖 device / runner0 / runner n 三种场景。
