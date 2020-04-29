---
title: waitGroup
meta:
  - name: description
    content: waitGroup
  - name: keywords
    content: swoole|swoole 拓展|swoole 框架|easyswoole|waitGroup|swoole waitGroup
---

# waitgroup

示例代码：

```php
go(function (){
    $ret = [];

    $wait = new \EasySwoole\Component\WaitGroup();

    $wait->add();
    go(function ()use($wait,&$ret){
        \co::sleep(0.1);
        $ret[] = time();
        $wait->done();
    });

    $wait->add();
    go(function ()use($wait,&$ret){
        \co::sleep(2);
        $ret[] = time();
        $wait->done();
    });

    $wait->wait();

    var_dump($ret);
});
```
