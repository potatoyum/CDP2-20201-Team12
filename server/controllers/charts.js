var express = require('express');
var router = express.Router();
const curpop = require('../server');
router.post('/', function(req,res){
    const selected = req.body;
    var id = selected["place"];
    var date = selected["date"];
    var hour = selected["hour"];



    //1. id와 date, hour별로 count값 가져오기
    
          curpop.aggregate([
            { $match: { camera_id: id}},
            { $match: { date: date}},
            { $match: { hour: hour}},
          ], function (err, result) {
            if (err) return console.log(err);
            console.log(i+1,'번째로 선택된 id=', result.camera_id, 'date = ', result.date, 'hour = ',result.hour, 
            '에 따른 counting = ',result.counting);
          } )


    
        //2. id별로 최근 시간의 count값 가져오기

          curpop.aggregate([
            { $match: { camera_id: id}},
            { $sort: { date: 1, hour: 1}},
          ], function (err, res) {
            if (err) return console.log(err);
              //console.log(res);
              real = [res.slice(-1)[0].camera_id, res.slice(-1)[0].counting];
              console.log('id=', res.slice(-1)[0].camera_id,'의 최신 counting 값 = ', res.slice(-1)[0].counting); 
          } )
        

    //select
    res.send(
    );
}); 

module.exports=router;