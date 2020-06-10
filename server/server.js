var express = require('express');
const mongoose = require('mongoose');
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

//db 연결
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
  camera_id: {
      type: String,
    },
  date: {
      type: String,
  },
  hour: {
      type: String,
    },
  counting: {
      type: String,
    },
})

module.exports = mongoose.model('p_data',population);//유동인구
var p_data = mongoose.model('p_data',population); //피플스키마의 모델 생성


var arr = [ 

];

var count =0
var groupBy = (arr, camera_id, date, hour) => {

var temparr = [];
var resultarr = [];
//group-by하고 group별 counting구함
arr.map((item)=>{
var pushed = false;
temparr.map((ele)=>{
if(ele===item.camera_id){
 pushed = true;
}
})
if(!pushed){
temparr.push(item.camera_id);
}     
})

  temparr.map((item)=>{
    var countarr1 = [];
    var countarr2 = [];
    

    arr.map((item1)=>{
      var pushed = false;
      countarr1.map((ele)=>{
        if(ele===item1.date){
          pushed = true;
        }
      })
      if(!pushed){
        countarr1.push(item1.date);
      } 
    })

    arr.map((item2)=>{
      var pushed = false;
      countarr2.map((ele)=>{
        if(ele===item2.hour){
          pushed = true;
        }
      })
      if(!pushed){
        countarr2.push(item2.hour);
      } 
    })

    countarr1.map((item1)=>{
      countarr2.map((item2)=>{
      var sum = 0;
      arr.map((ele)=>{
        if(ele.date===item1 && ele.camera_id===item && ele.hour===item2){
          sum += parseFloat(ele.counting)
        }
      })
      resultarr.push({
        camera_id: item,
        date: item1,
        hour: item2,
        counting: sum
       })
     })
    })
})

return resultarr
}   

var rawresult = groupBy(arr, 'camera_id', 'date','hour');

var result = rawresult.filter((arr, index, self) =>
index === self.findIndex((t) => (  t.date === arr.date && t.camera_id === arr.camera_id&& t.hour === arr.hour)))

for(var i=0; i<result.length; i++){
        var test= new p_data({ 
            camera_id: result[i].camera_id,
            date: result[i].date,
            hour : result[i].hour,
            counting: result[i].counting,
        })
        /*test.save(function(err, test){
          if(err) return console.log("에러남");
        });*/
}
    