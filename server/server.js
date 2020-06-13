var express = require('express');
var app = express();
const cors= require('cors');
const bodyParser = require('body-parser');

const dashboard = require("./controllers/dashboard");
const charts = require("./controllers/charts");

var server = app.listen(3001, function(){
    console.log("aaaaaaaa");
})

//pi와 socket 통신
var io = require('socket.io').listen(9001);
var roomName;
var arr_counting = [];
var count = 0;
io.on('connection', function(socket){
    console.log('connect');
    var instanceId= socket.id;

    console.log(instanceId);

    socket.on('reqMsg', function (data) {
        console.log(data);
    });

    socket.on('sendValue',function(data){
        
        arr_counting.push(data);
        count = count +1;

        console.log(arr_counting);
    })
//    socket.on('joinRoom',function (data) {
//        console.log(data);
//        socket.join(data.roomName);
//        roomName = data.roomName;
//    });
})


//react와 통신할 api
app.use(bodyParser.json());
app.use(cors());
app.use('/api/dashboard', dashboard);
app.use('/api/charts', charts);
