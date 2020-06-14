var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

    console.log("doughnut api");
    
    res.send(
        {"one":3,"two":10, "three":20}
    );
}); 


module.exports=router;