var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var morgan = require('morgan');



app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());
/*if(process.env.NODE_ENV != "test"){
	app.use(morgan('dev'));
}
*/
app.use(morgan('dev'));



app.use(function(req,res,next){
	console.log('headers',req.headers);
   
   if(req.token == 'ram'){
   	next();
   }else{
   	res.status(401);
   	res.send('invalid token');
   }

   //console.log('you are using middleware');

   //res.send('you are in middleware response');

   next();

});


//app.get('/subject',function(req,res,next){
	//if(req.query){
		//do something
	//}

    //console.log('get request check');


//	res.json({
//		message:'you are in get request'
//	});
//	next();
//});

app.post('/',function(req,res){
	
    console.log('headers',req.headers);

	//console.log('post request check',req.body);
    
    res.status(200);
	
	res.json({
		message:'you are in post request'
	});
	/*res.status(200).json({
		message: 'you are in post request'
	})
    */
});

app.put('/:name',function(req,res){
	console.log('put request check');

	res.json({
		message:'you are in put request'
	});
});

app.delete('/:id',function(req,res){
	console.log('delete request check');

	res.json({
		message:'you are in delete request'
	});
});


app.listen(8080,function(err,done){
	if(err){
		console.log('you got an error',err);
	}else{
		console.log('your server is runing fine');
	}
});


