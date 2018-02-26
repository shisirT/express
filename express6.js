var express = require ('express');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressValidator = require('express-validator');
var path = require('path');

var config = require('./config');
//var indexRoute = require('./routes/index.js');
require('./db.js')(config);

var authRoute = require('./routes/auth')();
var indexRoute = require('./routes/index')(config);
var productRoute = require('./routes/products')();
var userRoute = require('./routes/user')();
var authorize = require('./middlewares/authorize')();
var authenticate = require('./middlewares/authenticate');



var app = express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');//install pug
//app.set(express.static(path.join(__dirname 'public')));
//public folder bhayo bhane public folder run huncha, likewise,image folder etc.
app.use(expressValidator());
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));



app.use('/',indexRoute);
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/product',authenticate,productRoute);
//app.use(authorize);
//app.use(authenticate);

app.use(function(req,res,next){
  next({
    status:404,
    message:'not found'
  });

});

app.use(function(err,req,res,next){
   console.log('err handling middleware called');
   res.json({
   	status:err.status || 500,
   	msg:err.message  || err
   });
});
app.listen(config.app.port,function(err,done){
  if(err){
  	console.log('you got an error',err);
  }else{
  	console.log('you are logged into server ' +config.app.port);
  }

});