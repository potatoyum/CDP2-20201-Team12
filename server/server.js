var express = require('express');
const mongoose = require('mongoose');
var app = express();
const cors= require('cors');
const bodyParser = require('body-parser');
var server = app.listen(3001, function(){
    console.log("aaaaaaaa");
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
        unique : true
      },
    date: {
        type: String,
    },
    time: {
        type: String,
      },
    count: {
        type: String,
      },
})

module.exports = mongoose.model('p_data',population);//유동인구

var curpop = mongoose.model('p_data',population); //피플스키마의 모델 생성


var arr = [ 
  { Phase: "Phase 1", Step: "Step 1", Task: "Task 1", Value: "5" },
  { Phase: "Phase 1", Step: "Step 1", Task: "Task 1", Value: "5" },
  { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
  { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
  { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
  { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
  { Phase: "Phase 1", Step: "Step 2", Task: "Task 2", Value: "20" },
  { Phase: "Phase 1", Step: "Step 2", Task: "Task 2", Value: "20" },
  { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
  { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
  { Phase: "Phase 2", Step: "Step 1", Task: "Task 2", Value: "30" },
  { Phase: "Phase 2", Step: "Step 1", Task: "Task 2", Value: "30" },
  { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
  { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
  { Phase: "Phase 2", Step: "Step 2", Task: "Task 2", Value: "40" },
  { Phase: "Phase 2", Step: "Step 2", Task: "Task 2", Value: "40" }
];

var count =0
var groupBy = (arr, pahse, step,task) => {

var pahseArr = [];
var resultArr = [];

arr.map((item)=>{
var pushed = false;
pahseArr.map((ele)=>{
 if(ele===item.Phase){
   pushed = true;
 }
})
if(!pushed){
 pahseArr.push(item.Phase);
}     
})

    pahseArr.map((item)=>{
      var countarr1 = [];
      var countarr2 = [];
      

      arr.map((item1)=>{
        var pushed = false;
        countarr1.map((ele)=>{
          if(ele===item1.Step){
            pushed = true;
          }
        })
        if(!pushed){
          countarr1.push(item1.Step);
        } 
      })

      arr.map((item2)=>{
        var pushed = false;
        countarr2.map((ele)=>{
          if(ele===item2.task){
            pushed = true;
          }
        })
        if(!pushed){
          countarr2.push(item2.Task);
        } 
      })

      countarr1.map((item1)=>{
        countarr2.map((item2)=>{
        var Taskarr=[];
        var sum = 0;
        arr.map((ele)=>{
          if(ele.Step===item1 && ele.Phase===item && ele.Task===item2){
            sum += parseFloat(ele.Value)
            count++
            console.log(count)
          }
        })
        resultArr.push({
          Phase: item,
          Step: item1,
          Value: sum,
          Task: item2
         })
       })
      })
  })

return resultArr
}   

var result = groupBy(arr, 'Phase', 'Step','Task');
var count1 =0;


//console.log(result);
  
  for(var i=0; i<result.length; i++){
          var test= new curpop({ 
              id: result[i].Phase,
              date: result[i].Step,
              time : result[i].Task,
              count: result[i].Value,
          })
          console.log(test);
          /*test.save(function(err, test){ //DB에 저장 이걸 막아놔도 create는 못막지만 사용시 접근을 id갯수만큼만 하니까 그닥 상관 없음
              if(err) return console.log("디비에 저장에러");
              //console.dir(test)*/
  }
                     