var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

    console.log("aaaaa");
    res.send(
        {"id":3}
    );
}); 


module.exports=router;