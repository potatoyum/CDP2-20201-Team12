

var express = require('express');
var mongoose = require('mongoose');
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

var peopleSchema = mongoose.Schema({
    name:{
        type: String,
    },
    age: Number
})

module.exports = mongoose.model('people',peopleSchema);

var Person = mongoose.model('people',peopleSchema);

var pse= new Person({
    name: "pse",
    age: 21
})

pse.save(function(err,pse){
    if(err) return;

    //console.dir(pse);
})