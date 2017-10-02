//express_demo.js 文件
var express = require('express');
var pg = require('pg');  
var app = express();
 
app.get('/', function (req, res) {
   res.send('Hello World');
})

////////////////////////////用户名：密码/服务器名/数据库名  
var conString = "postgres://postgres:123456d@localhost/test";  
var client = new pg.Client(conString);  
client.connect();  
client.query('INSERT INTO t_user(id, name) VALUES($1, $2)', [3, 'laoyang']);  
  
app.get('/', function(req, res){  
  query = client.query('SELECT COUNT(id) AS n FROM t_user');  
  query.on('row', function(result) {  
    console.log(result);  
  
    if (!result) {  
      return res.send('No data found');  
    } else {  
      res.send('Visits today: ' + result.n);  
    }  
  });  
});  
//app.listen(3000);  
//console.log('Listening on port 3000');  


 
var server = app.listen(8081, function () {
    
     var host = server.address().address
     var port = server.address().port
    
     console.log("应用实例，访问地址为 http://%s:%s", host, port)
    
   })