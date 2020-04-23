var express = require('express');
const mongoose = require('mongoose');
var app = express();
var server = app.listen(3000, function(){
    console.log("aaaaaaa");
})

app.get('/', function(req,res){
    res.send("hellooooooooo");
})

var database;
var db = mongoose.connection;
db.on('error', console.error);

db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb+srv://cdp12:cdp12@cdp12-eqgsf.mongodb.net/test?retryWrites=true&w=majority',function(err,database){

    if(err){
        console.error("연결 실패",err);
        return;
    }
    database= database;
    
});

var peopleSchema = mongoose.Schema({ //스키마 생성
    id: {
        type: Number,
        required: true,
      },
    count: {
        type: Number,
        required: true,
      },
    date: {
        type: Date,
        default: Date.now,//나중에 
      },
})

module.exports = mongoose.model('people',peopleSchema);

var Person = mongoose.model('people',peopleSchema); //피플스키마의 모델 생성

var pse= new Person({ 
    id: 2,
    count: 30
})
pse.save(function(err,pse){ //디비에 저장
    if(err) return;

    //console.dir(pse);
})

