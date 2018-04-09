# WebSocket控制器

EasySwoole 2.x支持以控制器模式来开发你的代码。

首先，修改项目根目录下配置文件Config.php，修改SERVER_TYPE为:
```php
\EasySwoole\Core\Swoole\ServerManager::TYPE_WEB_SOCKET_SERVER
```

## 新人帮助

* 本文遵循PSR-4自动加载类规范，如果你还不了解这个规范，请先学习相关规则。
* 本节基础命名空间App 默认指项目根目录下Application文件夹，如果你的App指向不同，请自行替换。
* 只要遵循PSR-4规范，无论你怎么组织文件结构都没问题，本节只做简单示例。

## 实现命令解析

**新人提示**
> 这里的命令解析，其意思为根据请求信息解析为具体的执行命令;
>
> 在easyswoole中，可以让WebSocket像传统框架那样按照控制器->方法这样去解析请求;
>
> 需要实现EasySwoole\Core\Socket\AbstractInterface\ParserInterface接口中的decode 和encode方法;

**创建Application/Parser.php文件，写入以下代码**

```php
namespace App;


use EasySwoole\Core\Socket\AbstractInterface\ParserInterface;
use EasySwoole\Core\Socket\Common\CommandBean;

class Parser implements ParserInterface
{

    public function decode($raw, $client)
    {
        // TODO: Implement decode() method.
        $command = new CommandBean();
        $json = json_decode($raw,1);
        $command->setControllerClass(\App\WebSocket\Test::class);
        $command->setAction($json['action']);
        $command->setArg('content',$json['content']);
        return $command;

    }

    public function encode(string $raw, $client, $commandBean): ?string
    {
        // TODO: Implement encode() method.
        return $raw;
    }
}
```
> *注意，请按照你实际的规则实现，本测试代码与前端代码对应。*

## 注册服务

**新人提示**
> 如果你尚未明白easyswoole运行机制，那么这里你简单理解为，当easyswoole运行到一定时刻，会执行以下方法。
> 
> 这里是指注册你上面实现的解析器。

**在根目录下EasySwooleEvent.php文件mainServerCreate方法下加入以下代码**

```php
//注意：在此文件引入以下命名空间
use \EasySwoole\Core\Swoole\EventHelper;

public function mainServerCreate(ServerManager $server,EventRegister $register): void
{
    // TODO: Implement mainServerCreate() method.
    EventHelper::registerDefaultOnMessage($register,new \App\Parser());
}
```

> 在EasySwooleEvent中注册该服务。

## 测试前端代码

**友情提示**
> easyswoole 提供了更强大的WebSocket调试工具，[foo]: http://www.evalor.cn/websocket.html  'WEBSOCKET CLIENT'；

**创建Application/HttpController/websocket.html文件，写入以下代码**

```Html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<div>
    <div>
        <p>info below</p>
        <ul  id="line">

        </ul>
    </div>
    <div>
        <select id="action">
            <option value="who">who</option>
            <option value="hello">hello</option>
            <option value="delay">delay</option>
            <option value="404">404</option>
        </select>
        <input type="text" id="says">
        <button onclick="say()">发送</button>
    </div>
</div>
</body>
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
    var wsServer = 'ws://127.0.0.1:9501';
    var websocket = new WebSocket(wsServer);
    window.onload = function () {
        websocket.onopen = function (evt) {
            addLine("Connected to WebSocket server.");
        };

        websocket.onclose = function (evt) {
            addLine("Disconnected");
        };

        websocket.onmessage = function (evt) {
            addLine('Retrieved data from server: ' + evt.data);
        };

        websocket.onerror = function (evt, e) {
            addLine('Error occured: ' + evt.data);
        };
    };
    function addLine(data) {
        $("#line").append("<li>"+data+"</li>");
    }
    function say() {
        var content = $("#says").val();
        var action = $("#action").val();
        $("#says").val('');
        websocket.send(JSON.stringify({
            action:action,
            content:content
        }));
    }
</script>
</html>
```

## 测试用HttpController 视图控制器

**新人提示**
> 这里仅提供了前端基本的示例代码，更多需求根据自己业务逻辑设计

**创建Application/HttpController/Index.php文件，写入以下代码**

```php
namespace App\HttpController;


use EasySwoole\Core\Http\AbstractInterface\Controller;
use EasySwoole\Core\Swoole\ServerManager;

class Index extends Controller
{

    function index()
    {
        // TODO: Implement index() method.
        $content = file_get_contents(__DIR__.'/websocket.html');
        $this->response()->write($content);
    }

    /*
     * 请调用who，获取fd
     * http://ip:9501/push/index.html?fd=xxxx
     */
    function push()
    {
        $fd = intval($this->request()->getRequestParam('fd'));
        $info = ServerManager::getInstance()->getServer()->connection_info($fd);
        if(is_array($info)){
            ServerManager::getInstance()->getServer()->push($fd,'push in http at '.time());
        }else{
            $this->response()->write("fd {$fd} not exist");
        }
    }

}
```
> 本控制器主要为方便你获得前端页面和从HTTP请求中对websocket 做推送。

## WebSocket 控制器

**新人提示**
> WebSocket控制器必须继承EasySwoole\Core\Socket\AbstractInterface\WebSocketController;
>
> actionNotFound方法提供了当找不到该方法时的返回信息，默认会传入本次请求的actionName。

**创建Application/WebSocket/Test.php文件，写入以下内容**

```php
namespace App\WebSocket;


use EasySwoole\Core\Socket\Response;
use EasySwoole\Core\Socket\AbstractInterface\WebSocketController;
use EasySwoole\Core\Swoole\Task\TaskManager;

class Test extends WebSocketController
{
    function actionNotFound(?string $actionName)
    {
        $this->response()->write("action call {$actionName} not found");
    }

    function hello()
    {
        $this->response()->write('call hello with arg:'.$this->request()->getArg('content'));

    }

    public function who(){
        $this->response()->write('your fd is '.$this->client()->getFd());
    }

    function delay()
    {
        $this->response()->write('this is delay action');
        $client = $this->client();
        //测试异步推送
        TaskManager::async(function ()use($client){
            sleep(1);
            Response::response($client,'this is async task res'.time());
        });
    }
}
```
##测试

*如果你按照本文配置，那么你的文件结构应该是以下形式*

Application  
|---|HttpController  
|---|---|Index.php  
|---|---|websocket.html  
|---|WebSocket  
|---|---|Test.php  
|---|Parser.php  

> 首先在根目录运行easyswoole
>
> > *php easyswoole start*
> 
> 如果没有错误此时已经启动了easyswoole服务;  
> 访问127.0.0.1:9501/Index/index 可以看到之前写的测试html文件;
> *新人提示：这种访问方式会请求HttpController控制器下Index.php中的index方法*  

##扩展
*鸽一下，2018年4月11日前完成*
