const express = require('express');
const fs = require('fs');

var app = express();

app.all('*', function (req, res, next) {             //设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/wuhan', function (req, res) {           //配置接口api
    res.status(200),
        fs.readFile('./data/wuhan_taxi.txt', function (err, data) {
            res.json(data.toString())
        })
})

//配置服务端口
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('succeed...listen at http://%s:%s', host, port)
})