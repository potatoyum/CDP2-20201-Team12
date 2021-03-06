var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

var DB = mongoose.connection;
DB.on('error', console.error);

DB.once('open', function () {
// CONNECTED TO MONGODB SERVER
console.log("Connected to mongod server");
});

mongoose.connect('mongodb+srv://cdp12:cdp12@cdp12-eqgsf.mongodb.net/test?retryWrites=true&w=majority', function (err, database) {

if (err) {
    console.error("연결 실패", err);
    return;
}
database = database;

});

var pop = mongoose.Schema({ //보드에서 들어오는 유동인구 측정 데이터를 위한 스키마 생성
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


var curpop = mongoose.model('c_data', pop); //피플스키마의 모델 생성

var arr = [];

var groupBy = (arr, camera_id, date, hour) => {

    var temparr = [];
    var resultarr = [];
    //group-by하고 group별 counting구함
    arr.map((item) => {
        var pushed = false;
        temparr.map((ele) => {
            if (ele === item.camera_id) {
                pushed = true;
            }
        })
        if (!pushed) {
            temparr.push(item.camera_id);
        }
    })

    temparr.map((item) => {
        var countarr1 = [];
        var countarr2 = [];


        arr.map((item1) => {
            var pushed = false;
            countarr1.map((ele) => {
                if (ele === item1.date) {
                    pushed = true;
                }
            })
            if (!pushed) {
                countarr1.push(item1.date);
            }
        })

        arr.map((item2) => {
            var pushed = false;
            countarr2.map((ele) => {
                if (ele === item2.hour) {
                    pushed = true;
                }
            })
            if (!pushed) {
                countarr2.push(item2.hour);
            }
        })

        countarr1.map((item1) => {
            countarr2.map((item2) => {
                var sum = 0;
                arr.map((ele) => {
                    if (ele.date === item1 && ele.camera_id === item && ele.hour === item2) {
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

var rawresult = groupBy(arr, 'camera_id', 'date', 'hour');

var result = rawresult.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.date === arr.date && t.camera_id === arr.camera_id && t.hour === arr.hour)))

    
for (var i = 0; i < result.length; i++) {
    var test = new curpop({
        camera_id: result[i].camera_id,
        date: result[i].date,
        hour: result[i].hour,
        counting: result[i].counting,
    })
    /*test.save(function(err, test){
    if(err) return console.log("에러남");
    });*/
}


router.get('/', function(req,res){

    console.log("doughnut api");
    var del =[];

curpop.aggregate([
    { $group :{ _id : '$counting'}},
    { $sort : { _id : 1}}
    ], function (err, rres) {
    if (err) return console.log(err);
        var len = rres.length;
        for(var i=0;i<len;i++){
            del[i] = rres[i]._id;
        }
       res.send({"one":del[5],"two":del[3], "three":del[4], "past_one":del[1], "past_two":del[2], "past_three": del[0]});
    } )
}); 


module.exports=router;