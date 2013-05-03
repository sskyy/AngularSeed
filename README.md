AngularSeed
===========

# 目录结构

删掉了不必要的细节。

<pre>
├─server.js  /\*nodeJS server.用来提供异步请求的数据\*/
├─css        /\*css文件夹\*/ 
├─data
│      data.json   /\*异步数据\*/
├─img
├─js
│      app.js
│      directives.js
│      filters.js
│      services.js
├─lib
│  ├─angular
│  └─ng-grid  
├─pages  
│      directive-swiftList.html  /\*调试页面\*/  
├─partials   /\*模板\*  
│      partial1.html  
│      partial2.html  
└─test  
    ├─conf  /\*karma的config文件\*/
    │      swift-conf.js  
    │      
    └─unit  /\*单元测试文件\*/
            directive-swiftlist.js  
</pre>