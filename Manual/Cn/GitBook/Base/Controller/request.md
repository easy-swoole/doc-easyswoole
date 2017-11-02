#
Request对象

## 生命周期
Request对象在系统中以单例模式存在，自收到客户端HTTP请求时自动创建，直至请求结束自动销毁。Request对象完全符合[PSR7](psr-7.md)中的所有规范。
## 方法列表
### getInstance()
用于获取当前请求实例。
```
$request = Request::getInstance()
```
### getRequestParam()
用于获取用户通过POST或者GET提交的参数（注意：若POST与GET存在同键名参数，则以POST为准）。

示例：
```
$data = $request->getRequestParam();
var_dump($data);

$orderId = $request->getRequestParam('orderId');
var_dump($orderId);

$keys = array(
"orderId","type"
);
$mixData = $request->getRequestParam($keys);
var_dump($mixData);
```
### getSwooleRequest()
该方法用于获取当前的swoole_http_request对象。

## PSR-7规范ServerRequest对象中常用方法
### getCookieParams()
该方法用于获取HTTP请求中的cookie信息
```
$all = $request->getCookieParams();
var_dump($all);
$who = $request->getCookieParams('who');
var_dump($who);
```
### getUploadedFiles()
该方法用于获取客户端上传的全部文件。
```
$data = $request->getUploadFiles();
var_dump($data);
```
> 注意，getUploadedFiles为返回所有的文件全部为Core\Http\Message\UploadFile实例。其中键名为上传文件时的表单名。

### getUploadedFile($name)
该方法用于获取客户端上传的某个文件。若该文件存在时，则返回对应的Core\Http\Message\UploadFile对象
#### 关于 Core\Http\Message\UploadFile对象,详见[PSR7规范](Base/Controller/psr-7.md)

### getBody()
该方法用于获取以非form-data或x-www-form-urlenceded编码格式POST提交的原始数据，相当于PHP中的$HTTP_RAW_POST_DATA。
> 注意,该方法返回的是Core\Http\Message\Stream实例，具体请见[PSR7规范](Base/Controller/psr-7.md)

### Session()
该方法用于返回当前SessionRequest实例。注意，返回该实例的时候，不会自动执行session start。若有执行get方法，则会自动调用session start
```
$request()->session()->get("test");
```
## 示例
### 获得get内容
```
$get = \Core\Http\Request::getInstance()->getQueryParams();
```
### 获得post内容
```
$post = \Core\Http\Request::getInstance()->getParsedBody();
```
### 获得raw内容
```
$content = \Core\Http\Request::getInstance()->getBody()->__toString();
$raw_array = json_decode($content, true);
```

### 获得头部
```
$header = \Core\Http\Request::getInstance()->getHeaders();
$content_type = \Core\Http\Request::getInstance()->getHeader('content-type'); // 这里是数组 我一般是取$content_type[0]
```
### 获得server
```
$server = \Core\Http\Request::getInstance()->getServerParams();

```
### 获得cookie
```
$cookie = \Core\Http\Request::getInstance()->getCookieParams();

```
### 获得file
```
$files = \Core\Http\Request::getInstance()->getUploadedFiles();
$image = $files['image'];
```
假如你提交的字段叫image
$image是个\Core\Http\Message\UploadFile对象
和传统的 `php` $_FILES['image']是不一样的，打印一下看看吧，当然如果你想用传统的写法可以利用\Core\Http\Request::getInstance()->getSwooleRequest() 里的files

<script>
var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?4c8d895ff3b25bddb6fa4185c8651cc3";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);
})();
</script>
<script>
(function(){
var bp = document.createElement('script');
var curProtocol = window.location.protocol.split(':')[0];
if (curProtocol === 'https') {
bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
}
else {
bp.src = 'http://push.zhanzhang.baidu.com/push.js';
}
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(bp, s);
})();
</script>