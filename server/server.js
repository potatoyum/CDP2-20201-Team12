

var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("aaaaaaa");
})

app.get('/', function(req,res){
    res.send("hellooooooooo");
})