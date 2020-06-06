var express = require('express');
const mongoose = require('mongoose');
var app = express();
const cors= require('cors');
const bodyParser = require('body-parser');
var server = app.listen(3001, function(){
    console.log("aaaaaaaa");
})
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

app.get('/', function(req,res){
    res.send("hello");
})

app.use(cors());
app.use('/api', (req,res)=>  res.json({username:'aaaaa'}));


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

var population = mongoose.Schema({ //보드에서 들어오는 유동인구 측정 데이터를 위한 스키마 생성
    id: {
        type: String,
      },
    date: {
        type: String,
    },
    time: {
        type: String,
      },
    count: {
        type: String,
      }
})

module.exports = mongoose.model('p_data',population);//유동인구

var curpop = mongoose.model('p_data',population); //피플스키마의 모델 생성

var arr = [ 
    { time: "22", id: "1", count: "5" , date: "200606"},
    { time: "22", id: "1", count: "10", date: "200607"},
    { time: "22", id: "2", count: "15" , date: "200606"},
    { time: "22", id: "2", count: "20", date: "200607"},
    { time: "23", id: "1", count: "25" , date: "200606"},
    { time: "23", id: "1", count: "30" , date: "200607"},
    { time: "23", id: "2", count: "35",  date: "200606"},
    { time: "23", id: "2", count: "40" , date: "200607"}
];

var groupBy = (arr, time, id='', date='') => {

var timeArr = [];
var resultArr = [];

arr.map((item)=>{
 var pushed = false;
 timeArr.map((ele)=>{
   if(ele===item.time){
     pushed = true;
   }
 })
 if(!pushed){
   timeArr.push(item.time);
 }     
})

timeArr.map((item)=>{
  var sum = 0;
  arr.map((ele)=>{
    if(ele.time===item){
      sum += parseFloat(ele.count)
    }
  })
  resultArr.push({
    time: item,
    count: sum
  })
})

if(id!=''){
 var resultArr = [];


 timeArr.map((item)=>{
     var idArr = [];

     arr.map((item2)=>{
       var pushed = false;
       idArr.map((ele)=>{
         if(ele===item2.id){
           pushed = true;
         }
       })
       if(!pushed){
         idArr.push(item2.id);
       } 
     })

     idArr.map((item1)=>{
        var sum = 0;
        arr.map((ele)=>{
          if(ele.id===item1 && ele.time===item){
            sum += parseFloat(ele.count)
          }
        })
        resultArr.push({
          time: item,
          id: item1,
          count: sum,
        })
     })

 })
 return resultArr;
} 
/*if(date!=''){
    var resultArr = [];
   
   
    timeArr.map((item)=>{
        var idArr = [];
   
        arr.map((item3)=>{
          var pushed = false;
          idArr.map((ele)=>{
            if(ele===item3.date){
              pushed = true;
            }
          })
          if(!pushed){
            idArr.push(item3.date);
          } 
        })
   
        idArr.map((item1)=>{
           var sum = 0;
           arr.map((ele)=>{
             if(ele.date===item1 && ele.time===item){
                resultArr.push({
                    time: item,
                    id: item1,
                    count: sum,
                  })
            }
           })
        })
   
    })
    return resultArr;
   }*/
return resultArr;
}

var result = groupBy(arr, 'Phase', 'Step');
console.log(result[0].id);


 for(var i=0; i<result.length; i++){
        var test= new curpop({ 
            id: result[i].id,
            time : result[i].time,
            count: result[i].count,
        })
        console.log(test);
        /*test.save(function(err, test){ //DB에 저장 이걸 막아놔도 create는 못막지만 사용시 접근을 id갯수만큼만 하니까 그닥 상관 없음
            if(err) return console.log("디비에 저장에러");
            //console.dir(test)
        })*/
    }



