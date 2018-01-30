//file maynot work,need some edits
//express6.js,auth.js,authenticate.js,index.js of config


var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressValidators = require('express-validator');
var path = require('path');


var indexRoute = require('/routes/auth');
var authRoute = require('./routes/auth.js');
var config = require('./config/index.js');
var authenticate = require('./middlewares/authenticate.js')();
var port = '7070';


app.set('views',path,join(__dirname,'views'));
app.set('view engine','pug');//install pug
//app.set(express.static(path.join(__dirname 'public')));
//public folder bhayo bhane public folder run huncha, likewise,image folder etc.

app.use(expressValidators());


app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

//app.use(authorize); also can be done
//or app.use('/login',authorize,authRoute);
//also can be done
app.use('/',authenticate);
app.use('/auth',authenticate,authRoute);
//app.use('/auth',authRoute);

//app.use('/comment',authorize,commentRoute);
//app.use('/comment',commentRoute);
//app.use('/user',authorize,authenticate,userRoute);


/*

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

*/

app.use(function(err,req,res,next){

   console.log('err handling middleware called');
   res.json({
   	status:err.status || 500,
   	msg:err.message
   });
});


app.listen(config.app.port,function(err,done){
  if(err){
  	console.log('you got an error',err);
  }else{
  	console.log('you are logged into server');
  }

});