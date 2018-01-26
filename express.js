var express = require('express');

var app = express();

app.get('/',function(req,res){
	console.log('your request is get');
	res.json({
		message:'your request is on'
	});
});


app.post('/:name/:address/:phone',function(req,res){
	console.log('this is post');
	res.json({
		message:'your post request is on'
	});
});

app.put('/:name',function(req,res){
	console.log('this is a put ');
	res.json({
		message:'your request is put'
	});
});

app.delete('/:id',function(req,res){
	var id = req.params.id;
	console.log('this is delete');
	res.json({
		message:'your request is delete'
	});
});

app.listen('4050',function(err,done){
	if(err){
		console.log('you got an error');
	}else{
		console.log('you are in server');
	}
});