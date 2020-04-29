---
title: 验证码
meta:
  - name: description
    content: EasySwoole验证码组件,可自定义生成二维码图形或者base64等编码.
  - name: keywords
    content: swoole|swoole 拓展|swoole 框架|easyswoole|验证码|swoole验证码
---
# EasySwoole 验证码组件  

::: warning 
仓库地址: [验证码组件](https://github.com/easy-swoole/verifyCode)
:::


EasySwoole提供了独立的 `验证码组件` ,几行代码即可实现输出一个验证码

## composer 安装
```php
composer require easyswoole/verifycode=3.x
```

### 示例:  
```php
<?php
/**
 * Created by PhpStorm.
 * User: Apple
 * Date: 2018/11/12 0012
 * Time: 16:30
 */

namespace App\HttpController;
use EasySwoole\Http\AbstractInterface\Controller;
use EasySwoole\VerifyCode\Conf;

class VerifyCode extends Controller
{
    function index()
    {
        $config = new Conf();
        $code = new \EasySwoole\VerifyCode\VerifyCode($config);
        $this->response()->withHeader('Content-Type','image/png');
        $this->response()->write($code->DrawCode()->getImageByte());
    }

    function getBase64(){
        $config = new Conf();
        $code = new \EasySwoole\VerifyCode\VerifyCode($config);
        $this->response()->write($code->DrawCode()->getImageBase64());
    }
}
```
