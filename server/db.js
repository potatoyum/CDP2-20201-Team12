var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');
var userSchema = mongoose.Schema({
	userid: String,
	sex : String,
	city : String,
	age : Number
});

var User = mongoose.model('users',userSchema);

// select city from users where userid='terry'
User.findOne({'userid':'terry'}).select('city').exec(function(err,user){
	console.log("q1");
	console.log(user+"\n");
	return;
});


// select * from users where city='seoul' order by userid limit 5
User.find({'city':'seoul'}).limit(5).sort({'userid':1}).exec(function(err,users){
	console.log("q2");
	console.log(users+"\n");
	return;
});

// using JSON doc query
// select userid,age from users where city='seoul' and age > 10 and age < 29
User.find({'city':'seoul', 'age':{$gt:10 , $lt:29}})
	.sort({'age':-1})
	.select('userid age')
	.exec(function(err,users){
		console.log("q3");
		console.log(users+"\n");
		return;
});

//using querybuilder
//select userid,age from users where city='seoul' and age > 10 and age < 29
User.find({})
	.where('city').equals('seoul')
	.where('age').gt(10).lt(29)
	.sort({'age':-1})
	.select('userid age')
	.exec(function(err,users){
		console.log("q4");
		console.log(users+"\n");
		return;
});