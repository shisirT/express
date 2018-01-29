var express = require ('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require('morgan');


app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req,res,next){
	
    console.log('headers',req.headers);

	if(req.headers.token =='ram'){
		next();
		
	}else{
		res.status(401);
		res.send('invalid token');
	}
	next();
	
});


app.post('/',function(req,res){
	
	console.log('post request try',req.body);

	res.status(200);
   
    /*res.json({
    	message:'you are on post request body'
    });
*/
});


app.put('/',function(req,res){

	console.log('put request try');

	res.json({
		message:'you are on put request body'
	});
});


app.delete('/',function(req,res){

	console.log('delete request try');

	res.json({
		message:'you are on delete request'
	});
});


app.listen(7070,function(err,done){
  if(err){
  	console.log('you got an error',err);
  }else{
  	console.log('you are logged into server');
  }

});