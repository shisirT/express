var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');


var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017'

var UserModel = require('./../models/users');

function validate(req){
    req.checkBody('username','username is required').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('password','password should be 8 characters').isLength({min:8});
    req.checkBody('password','password max 8 characters').isLength({max:12});
//try assert inplace of checkBody //req.assert
    var errors = req.validationErrors();

    if(errors){
        console.log('error occured validating form');
        return (errors);
        //return next(errors); //to end if there is no place to do next
    }else{

       return null;   
    }
}
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
    
    var error = validate(req);
    if(error){
        return next(error)
    }
/*	
    MongoClient.connect(dbUrl,function(err,dbClient){
        if(err){
            console.log('cannot connect to db');
            return next(err);
        }else{
            
            console.log('successfully connected to db');
            
            var db = dbClient.db('abc');
            db.collection('users').insert({
                name:req.body.name,
                email:req.body.email,
                username: req.body.username,
                password: req.body.password
            },function(err,done){
                if(err){
                   return next(err);
                }else{
                    console.log('successful');
                    res.redirect('/');
                }
            });
            
        }
    });
*/

var newUser = new UserModel();
newUser.name = req.body.name,
newUser.email = req.body.email,
newUser.username = req.body.username,
newUser.passsword = req.body.passsword
newUser.save(function(err,savedUser){
    if(err){
        return next(err);
    }else{
        console.log('saved database');
        res.json(savedUser);
    }
});
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