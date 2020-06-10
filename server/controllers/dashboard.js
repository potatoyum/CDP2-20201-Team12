var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

    console.log("doughnut api");
    
    res.send(
        {"id":3}
    );
}); 


module.exports=router;