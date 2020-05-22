var express = require('express');
const mongoose = require('mongoose');
var app = express();
const cors= require('cors');
const bodyParser = require('body-parser');
var server = app.listen(3001, function(){
    console.log("aaaaaaa");
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

var moment = require('moment-timezone');
moment().tz("Asia/Seoul").format();
var datee = moment().format('YYYY-MM-DD HH'); //년 월 일 시간만! 나타난다.

var population = mongoose.Schema({ //보드에서 들어오는 유동인구 측정 데이터를 위한 스키마 생성
    id: {
        type: Number,
        required: true,
      },
    count: {
        type: Number,
        required: true,
      },
    date: {
        type: String,
      },
    sign: {
        type: String,
    }
})


module.exports = mongoose.model('p_data',population);//유동인구

var curpop = mongoose.model('p_data',population); //피플스키마의 모델 생성

<<<<<<< Updated upstream
var test= new curpop({ 
    id: 1,
    count: 10
=======
//그냥 아무 값으로 설정 client에서 값 받아오면 여기에 저장해서 갖다가 사용할 예정...
//보드에서 받아온값 저장할때 게속 사용하면됨 다 저장하고 나면 주석처리하든 맨마지막에서 저장을 막든
var board_id = 1;
var board_countt =30;

var test= new curpop({ 
    id: board_id,
    count: board_countt,
    date : datee,
    sign : null
>>>>>>> Stashed changes
})
//////////////////////////////////////////////////

var sum1 = 0, sum2=0, hourlyid1 = 0, hourlyid2 = 0;
//한시간 마다 원하는 시간을 입력해 주면 됨,,,
// 같은 id끼리 그룹을 만들어서 count들을 다 합쳐줬음
curpop.aggregate([
    { $match: { date : "2020-05-23 05" } },
    { $match: { sign : null }},
    { $group: {_id: "$id", total: {$sum: "$count"}}}
], function (err, result) {
    if (err) return handleError(err);
    console.log(result);
    sum1=result[0].total;
    sum2 = result[1].total;
    hourlyid1 = result[0]._id;
    hourlyid2 = result[1]._id;
    //console.log(sum1); 
    //console.log(sum2);  

    /*1시간마다 같은 id의 인식 갯수 count가 모두 더해져서 id, 계산된 count값, 시간, 
    sign(나중에 웹에서 원하는 시간대 정보를 가져갈때 디비에서 1시간마다 계산된 결과 값만을 대상으로 검색하기 위해서 구분용)*/
    //모듈의 갯수만큼 저장해줍니당
    curpop.create({
        id: hourlyid1,
        count: sum1,
        date : datee,
        sign : "hour"
    },function(err){
        if(err) return console.log("결과값 저장에러");
    })

    curpop.create({
        id: hourlyid2,
        count: sum2,
        date : datee,
        sign : "hour"
    },function(err){
        if(err) return console.log("결과값 저장에러");
    })
//////////////////////////////////////////////////////////
});

var choiceid = 0, choicecount = 0;
//hour즉 1시간자리 통계인것만 db에서 들고와서 var에 저장 밑 콘솔 출력 (원하는 시간 입력해야함..)
curpop.aggregate([
    { $match: { sign: "hour" } },
    { $match: { date: "2020-05-23 05" }},
 ], function (err, result) {
    if (err) return console.log(err);
    choiceid = result[result.length-2].id;
    choicecount = result[result.length-2].count;
    console.log("선택된 시간대의 첫번째 id = ",choiceid); 
    console.log("선택된 시간대의 첫번째 count = ",choicecount); 
} )

test.save(function(err, test){ //DB에 저장 이걸 막아놔도 create는 못막지만 사용시 접근을 id갯수만큼만 하니까 그닥 상관 없음
    if(err) return console.log("디비에 저장에러");
    //console.dir(test)
})

//값을 넣으면서 바로 그 값을 반영할수는 없음 DB에 왔다 갔다 해야 정보를 알 수 있으니까....

<<<<<<< Updated upstream
    //console.dir(pse);
})

=======
>>>>>>> Stashed changes
