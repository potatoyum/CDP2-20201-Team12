var express = require('express');
var router = express.Router();

router.post('/', function(req,res){
    const selected = req.body;

    console.log(selected["date"]);
    console.log(selected["place"]);


    //select

    
    res.send(

    );
}); 


module.exports=router;