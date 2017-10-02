//加载相应的模块，这儿使用的是postgresql数据库，因此加载的模块是pg。使用不同的数据库可以加载相应的模块  
//var pg = require('pg');  
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
var app = express();

//加载内部模块   
var server = require("./server");
var router = require("./router");
var func = require("./function");

let a = 0;

let b = 0;

//将url路径对应到相应的函数   
var handle = {};
handle["/"] = func.select;
handle["/select"] = func.select;


db.serialize(function () {

    db.run('CREATE TABLE lorem (info TEXT)');
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

    for (var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i);
    }

    stmt.finalize();

    db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
        a = row.id;
        b = row.info;
        console.log(row.id + ': ' + row.info);
    });
});

db.close();

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

app.get('/', function (req, res) {
    res.send('Hello World  '+ a + ': ' + b);
    //res.send(a + ': ' + b);
})


