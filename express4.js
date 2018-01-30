

note:this file is a middleware info only
     all codes maynot work in node.js.


var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require ('morgan');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(morgan('dev'));

app.use(function(req,res,next){
  if(req.headers.token=='ram'){
  	
    console.log('every thing is valid call next middleware',req.headers);
  	next();
  }else{
  	//console.log('call error handler middleware now');
  	//res.status(401);
  	
  	//res.send('unidentified token');
  
   return next({
   	status: 401,
   	message:'invalid token or unauthorized'
   }); //if found ram,do next
   //if not found send direct to last middleware
  }
  

});

/*
app.use('/about',function(req,res,next){
  if(req.headers.token=='ram'){
  	
    console.log('every thing is valid call next middleware',req.headers);
  	next();
  }else{
  	//console.log('call error handler middleware now');
  	res.status(401);
  	
  	res.send('unidentified token');
  }
  next();

});

app.use('/contact',function(req,res,next){
  if(req.headers.token=='ram'){
  	
    console.log('every thing is valid call next middleware',req.headers);
  	next();
  }else{
  	//console.log('call error handler middleware now');
  	res.status(401);
  	
  	res.send('unidentified token');
  }
  next();

});

*/



/*app.get('/',function(req,res){

	console.log('this is get request');

});
*/
app.post('/',function(req,res){

  console.log('this is post request',req.body);
    
    res.status(500);

    res.json({
      message: 'welcome to broadway infosys'
    });

});


app.put('/:id',function(req,res){

	console.log('this is put request');

	res.json({
		message: 'welcome to broadway'
	});
});

app.delete('/:id',function(req,res){

	console.log('request parameters',req.params);

	console.log('request parameters', req.queries);

	res.json({
		message:'welcome to broadway'
	});
});
///case (next() //audaina)


app.use(function(req,res,next){
     ///404 
    if (req.headers.access =="admin"){
     	res.json({
     		message:'you are admin,welcome'
     	});
     	next();
    } else {

    var err = {
     	status:403,
     	message: 'restricted area'
     }
     next(err);  // res.json(err); //paile gareko
    }
});


app.use(function(req,res,next){

  var errmsg = {
  	status:404,
  	message: 'not found'
  }

   next(errmsg);
});

//error handler in express:
app.use(function(err,req,res,next){

  res.json ({
  	status:err.status || 500,
  	stack: err.message //stack means msg
  });
});



app.listen(6060,function(err,done){

	if(err){

		console.log('error',err);

	}else{

		console.log('your server runing');
	}
});

