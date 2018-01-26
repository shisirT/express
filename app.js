var express = require ('express');

var app = express();

app.get('/',function(req,res){
	/*if(req.query){
		do something
	}
	*/
	console.log('this is get request');
   res.json({
     message:'your got a get request'

   });
 	
   
   //res.end('welcome to our page');
   //res.send('welcome to our page');//textual format
   //res.json({message:'welcome to our page'});//in json
});

app.post('/auth/login',function(req,res){
	//console.log('this is post request');
   res.json({
   	message:'you got a post request'
   });

 
});

app.put('/:name/:address/:phone',function(req,res){
	//console.log('this is put request');
	res.json({
		message:'you got a put request'
	});
	
 
});
app.delete('/:id',function(req,res){
	//var id = req.params.id;
	//console.log('id is now>>',id);
	//console.log('request parameters',req.params);//params comes :/name:/address
    //console.log('request params',req.queries);	
	res.json({
		message:'you got a delete request'
	});
	
 
});



app.listen(4040,'127.0.0.1',function(err,done){
	if(err){
		console.log('error while listening',err);
	}else{
		console.log('server listening');
	}
});