var express = require('express')
var router = express.Router();


module.exports = function(){


router.get('/',function(req,res,next){

	console.log('this is home page');
	//req.headers
	//req.query
	//req.access
	//req.body
	//req.params
	//req.url
	//req.validationErrors
	//all can be done in req 


	//res.send
	//res.end
	//res.json
	//res.status
	//res.sendStatus
	//res.render
	//res.checkBody


    res.render('index',{
    	title:'welcome',
    	message:'welcome to express js'
    });
    //searches index in views


});


router.post('/',function(req,res,next){

	console.log('this is post page');
	console.log('body>>>',req.body);

	req.checkBody('username','username is required').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('password','password should be 8 characters').isLength({min:8});
    req.checkBody('password','password max 8 characters').isLength({max:12});
//try assert inplace of checkBody //req.assert
    var errors = req.validationErrors();

    if(errors){
    	console.log('error occured validating form');
    	next(errors);
    	//return next(errors); //to end if there is no place to do next
    }else{
    	console.log('login sucess',req.body);
    	res.json({
    		message:'you are logged in successfully'
    	});
    }


});


router.get('/signup',function(req,res,next){


   console.log('this is for signup');
   
    res.render('index',{
    	title:'welcome',
    	message:'welcome to express js'
    });
   
	   // res.json({
	   // 	message:'welcome to sign up page'
	   // });
   
});

return router;

}

//we can export without making module.exports = function.....
//module.exports = router; //at last