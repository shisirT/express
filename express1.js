var express = require('express');

var app = express();

app.get('/',function(req,res){
	if(req.query){

		//do something
	}
	console.log('request');
	res.json({
		message:'your request'
	});
});

app.post('/',function(req,res){
	console.log('post');
	res.json({
		message:'your post'
	});
});

app.put('/',function(req,res){
	console.log('put');
	res.json({
		message:'your put'
	});
});


app.delete('/:name/:address',function(req,res){
	console.log('delete'req.queries);//queries?name=""&address="abcd"&phone="123"

	res.json({
		message:'your delete'
	});
});


app.listen(4030,function(err,done){
	if(err){
		console.log('your error',err);
	}else{
		console.log('you are in server');
	}
});
