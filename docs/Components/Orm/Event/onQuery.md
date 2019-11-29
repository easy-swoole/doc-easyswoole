---
title: onQuery
meta:
  - name: description
    content: Easyswoole ORM组件,
  - name: keywords
    content:  EasySwoole mysql ORM|EasySwoole ORM|Swoole mysqli协程客户端|swoole ORM|onQuery
---

# ORM onQuery

设置全局回调事件方式如下:

```php
// 注册ORM时, 调用回调函数
public static function mainServerCreate(EventRegister $register)
{
    ...

    DbManager::getInstance()->addConnection(new Connection($config));
    DbManager::getInstance()->onQuery(function ($res, $builder, $start) {
        // 打印参数 OR 写入日志
    });
}
```

onQuery回调会注入三个参数

- `res`查询结果对象, 类名为`EasySwoole\ORM\Db\Result`

可以参考 [执行结果](../lastResult.md) 文档, 以获取更多的结果内容

- `builder`查询语句对象, 类名为`EasySwoole\Mysqli\QueryBuilder`

- `start`开始查询时间戳, 单位为`s`, 类型为`float`

::: tip
如果查询过程中调用`withTotalCount()`方法, 那么还会产生第二个回调结果
:::

::: warning
需要注意的是, 此回调方法务必在注册ORM时调用, 否则不会产生任何结果
:::

# 记录慢日志

我们可以通过手动判断执行时间, 来实现一个记录慢日志的功能
```php
public static function mainServerCreate(EventRegister $register)
{
    ...

    DbManager::getInstance()->addConnection(new Connection($config));
    DbManager::getInstance()->onQuery(function ($res, $builder, $start) {
        $queryTime = 查询时间阈值;
        if (bcsub(time(), $start, 3) > $queryTime) {
            // 写入日志
        }
    });
}
```