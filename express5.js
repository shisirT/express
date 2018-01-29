//this is error handling middleware
//the file maynot work
//its for info.


var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require('morgan');

app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req,res,next){
	if(req.headers.token=='ram'){
		next();
	}else{
		res.json({
			status:404,
			message:'not found'
		});
	}
});

app.use(function(req,res,next){
  
  if(req.headers.access=="admin"){
  	res.json({
  		message:'you are admin,welcome'
  	});
  	next();
  }else{
  	var err = {
  		status: 403,
  		message:'restricted area'
  	}
  	next(err);
  
  }
});
	


app.use(function(req,res,next){
	var errmsg ={
		status:404,
		message:'not found'
	}
	next(errmsg);
});


app.use(function(err,req,res,next){

  res.json({
  	status:err.status || 500,
  	message: err.message
  });

});

//these are error handling middlewares
//next arguments goes to next funtion
//the end point is function params with err.


app.listen(3333,function(err,done){

	if(err){
		console.log('you got an error',err);
	}else{
		console.log('you are in server');
	}
});