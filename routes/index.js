//routes/index
var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');
var jwt = require('jsonwebtoken');
//var MongoClient = mongodb.MongoClient;
//var dbUrl = 'mongodb://127.0.0.1:27017'
var UserModel = require('./../models/users');
var passwordHash = require('password-hash');

function createToken(data,config){
  var token = jwt.sign({
    user:data
  },config.app.secret,
  /*{
    expiresIn: '2h'}
  */
  );
  return token;

}

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

function map_user_req(user,userDetails){
  //userDetails is req.body
  if(userDetails.firstName)
    user.firstName = userDetails.firstName
  if(userDetails.lastName)
    user.lastName = userDetails.lastName
  if(userDetails.phoneNumber)
    user.phoneNumber = userDetails.phoneNumber
  if(userDetails.email)
    user.email = userDetails.email
  if(userDetails.linkedIn_id)
    user.linkedIn_id = userDetails.linkedIn_id
  if(userDetails.address)
    user.address = userDetails.address
  if(userDetails.username)
    user.username = userDetails.username
  if(userDetails.password)
    user.password = passwordHash.generate(userDetails.password);
  if(userDetails.activeStatus)
    user.activeStatus = true
  if(userDetails.inActiveStatus)
    user.activeStatus = false
  
  return user;

}

module.exports = function(config){
  router.get('/',function(req,res,next){
    console.log('welcome to hamro app!');
    res.json({
      message:'welcome to hamro app'
    });
  });
 
 router.post('/login',function(req,res,next){
    console.log('this is post page');
    console.log('body>>>',req.body);
    
    var error = validate(req);
    if(error){
        return next(error)
    }



    UserModel.findOne({
    //username: req.body.username,
    //we can put $or,and etc
    $or: [{
      username:req.body.username
    },{
      email:req.body.username,
    }]

},function(err,user){
    if(err){
        return next(err);
    }
    if(user){
        var passMatch = passwordHash.verify(req.body.password,user.password);
        if(passMatch){
          var token = createToken(user,config);
            res.status(200).json({
              user: user,
              token: token
            });
        }else{
            next({
                status:403,
                message:'User authentication failed'
            });
        }
    }else {
        res.json({
            message: 'user not found'
        });
    }
});

});


router.post('/signup',function(req,res,next){
  var error = validate(req);
    if(error){
        return next(error)
    }

  var newUser = new UserModel();
  var newMappedUser = map_user_req(newUser,req.body);
  newMappedUser.save(function(err,savedUser){
    if(err){
        return next(err);
    }else{
        console.log('successful saved to db');
        res.json(savedUser);
    }
  });
});

router.post('/forgotpassword',function(req,res,next){

});


router.post('/resetpassword',function(req,res,next){

});


return router;

}
