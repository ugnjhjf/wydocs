---
title: "匿名函数语法设计（GPT 转录）"
---

# 匿名函数（Unnamed Function）

## 动机

现在的函数声明**实在太长了**，想要个更短的写法。

### 现在的语法

```text
t=(LOCAL_DECLARE_OP|ASYNC_DECLARE_OP) INT_NUM FUNCTION_TYPE
NAMING YUE IDENTIFIER

(FUNCTION_ARGS_START FUNCTION_ARGS_GET
(args+=INT_NUM t+=(NUM_TYPE|LIST_TYPE|STRING_TYPE|BOOL_TYPE|OBJECT_TYPE|FUNCTION_TYPE)
(YUE id+=IDENTIFIER)+)+)?

FUNCTION_BODY_START

statements 

DEFINE_CLOSURE IDENTIFIER FUNCTION_DEFINE_END ;
```

光看这一坨就知道多啰嗦——要写函数名、要 `DEFINE_CLOSURE`、要以分号收尾……

### 更想要的写法

**方案一**：保留声明类型，但把声明简化：

```text
t=(LOCAL_DECLARE_OP|ASYNC_DECLARE_OP) INT_NUM FUNCTION_TYPE

(NEED (t+=(NUM_TYPE|LIST_TYPE|STRING_TYPE|BOOL_TYPE|OBJECT_TYPE|FUNCTION_TYPE) 
YUE id+=IDENTIFIER)+)?

statements
FUNCTION_DEFINE_END
```

**方案二**：连类型声明都省了，直接用关键字开头：

```text
DECLARE_HAVE FUNCTION_TYPE

(NEED (t+=(NUM_TYPE|LIST_TYPE|STRING_TYPE|BOOL_TYPE|OBJECT_TYPE|FUNCTION_TYPE) 
YUE id+=IDENTIFIER)+)?

statements
FUNCTION_DEFINE_END
```

两种方案的核心变化：

- 用 **`NEED`**（需）关键字来引入参数列表，取代原来的 `FUNCTION_ARGS_START` / `FUNCTION_ARGS_GET` 那套。
- 去掉 `NAMING YUE IDENTIFIER`（命名）和 `DEFINE_CLOSURE`（闭包定义），让函数可以「无名」地写出来。

### 配套的 lexer 改动

需要新增一个 token：

```text
NEED: '需';
```

## 总结

匿名函数语法旨在缩短函数声明，并移除名称和 `DEFINE_CLOSURE` 环节。两个候选方案的主要区别是：方案一保留 `LOCAL_DECLARE_OP|ASYNC_DECLARE_OP INT_NUM` 声明头，方案二改用更简洁的 `DECLARE_HAVE` 开头。
