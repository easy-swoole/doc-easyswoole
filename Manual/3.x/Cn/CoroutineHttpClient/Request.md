## 请求
```php
<?php
include "./vendor/autoload.php";
\EasySwoole\EasySwoole\Core::getInstance()->initialize();
go(function () {
    $client = new \EasySwoole\HttpClient\HttpClient();
    $client->setUrl('http://a.cn');//设置url,注意需要http和https,https 需要swoole扩展开启ssl
    $client->setTimeout(0.1);//设置超时时间
    $client->setConnectTimeout(0.1);//设置连接超时时间
    $client->setClientSettings(['timeout' => 0.1, 'connect_timeout' => 0.1]);//配置客户端的配置(将覆盖原有配置),可参考https://wiki.swoole.com/wiki/page/726.html
    $client->setClientSetting('timeout', 0.1);//配置单个配置
    $client->setHeaders([
        "User-Agent"      => 'EasySwooleHttpClient/0.1',
        'Accept'          => 'text/html,application/xhtml+xml,application/xml',
        'Accept-Encoding' => 'gzip',
        'Pragma'          => 'no-cache',
        'Cache-Control'   => 'no-cache'
    ]);//配置请求头(将覆盖原有配置)
//    $client->setHeader('User-Agent','EasySwooleHttpClient/1');//设置一个请求头
//    $client->post(['name','这是post的内容']);//发送一段post内容
//    $client->postJSON(json_encode(['name2','这是post的内容']));//发送一段post json内容
//    $client->postXML("<name2>这是post的内容</name2>");//发送一段post xml内容
//    $client->addFile("./1.txt",'file1','txt','1.txt','0',strlen(file_get_contents('./1.txt')));//发送一个文件,注意需要文件大小
//    $client->addData('这是文件的内容','data1','txt','1.txt');//发送一段内容转换成文件发送
    $client->addCookies(['aa'=>'a','bb'=>'b']);//设置cookie(将覆盖原有配置)
    $client->addCookie('a','a');//设置一个cookie
    $response = $client->exec();//执行请求
    echo ($response->getBody());
//    var_dump($client->getSwooleHttpClient()->headers);//获取swoole 原始http client

    //并发请求
    $multi = new \EasySwoole\HttpClient\Multi();
    $multi->addTask('tast1',$client);
    $multi->addTask('tast2',$client);
    $multi->addTask('tast3',$client);
    var_dump($multi->exec());//执行并发请求


});
```


