---
title: 响应
meta:
  - name: description
    content: EasySwoole 协程HTTPClient组件
  - name: keywords
    content: swoole|swoole 拓展|swoole 框架|easyswoole|协程HTTPClient|curl组件|协程curl|响应
---

## 响应
```php
<?php
include "./vendor/autoload.php";
\EasySwoole\EasySwoole\Core::getInstance()->initialize();
go(function () {
    $client = new \EasySwoole\HttpClient\HttpClient();
    $client->setUrl('http://www.baidu.com');//设置url,注意需要http和https,https
    $client->addCookie('a','1');
    $response = $client->get();
    var_dump($response->getBody());//获取响应主体
    var_dump($response->getErrCode());//获取错误码
    var_dump($response->getErrMsg());//获取错误信息
    var_dump($response->getStatusCode());//获取响应状态码
    var_dump($response->getSetCookieHeaders());//获取响应头想要设置的cookie
    var_dump($response->getCookies());//获取自己发送的cookie,以及响应头想要设置的cookie
});

```
