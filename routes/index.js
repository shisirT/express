
var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
//var dbUrl = 'mongodb://127.0.0.1:27017'
var UserModel = require('./../models/users');
var passwordHash = require('password-hash');



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
  if(userDetails.phone)
    user.phone = userDetails.phone
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

module.exports = function(){
 router.get('/',function(req,res,next){
    UserModel.find({},function(err,result){
        if(err){
            return next(err);
        }
        res.status(200).json(result);
    });

 });
 /*
 if you want to do by Promise

 router.get('/',function(req,res,next){
    
    UserModel.find({}.then(function(data){
        res.status(200).json(data);
        }).catch(function(err){
        return next(err);        
    });

 });

 */

  /*
  if we want to do in monggose exec way

router.get('/',function(req,res,next){
    UserModel.find({}
    .limit(2)
    .exec(function(err,result){
        if(err){
            return next(err);
        }
        res.status(200).json(result);
    });

 }); 

 */




router.post('/login',function(req,res,next){
    console.log('this is post page');
    console.log('body>>>',req.body);
    
    var error = validate(req);
    if(error){
        return next(error)
    }



    UserModel.findOne({
    username: req.body.username,

},function(err,user){
    if(err){
        return next(err);
    }
    if(user){
        var passMatch = passwordHash.verify(req.body.password,user.password);
        if(passMatch){
            res.status(200).json(user);
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

router.get('/:id',function(req,res,next){
  var id = req.params.id;
  UserModel.find({
    _id: id
  })
    .exec(function(err,result){
        if(err){
            return next(err);
        }
        res.status(200).json(result);
    });
});

/*
router.get('/:id',function(req,res,next){
  var id = req.params.id;
  UserModel.findById(id)
    .exec(function(err,result){
        if(err){
            return next(err);
        }
        res.status(200).json(result);
    });
});
*/

router.put('/:id',function(req,res,next){
 //validation
var error = validate(req);
    if(error){
        return next(error)
    }

 var id = req.params.id;

 UserModel.findByIdAndUpdate(id,req.body)
    .exec(function(err,user){
        if(err){
            return next(err);
        }
        res.status(200).json(user);       
    });  
});


/*

router.put('/:id',function(req,res,next){
 //validation
var error = validate(req);
    if(error){
        return next(error)
    }

 var id = req.params.id;
 UserModel.findById(id)
    .exec(function(err,user){
        if(err){
            return next(err);
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.save(function(err,done){
            if(err){
                return next(err);
            }
            res.status(200).json(done);
        });

        
    });  



});
*/
/*
router.put('/:id',function(req,res,next){
 //validation
var error = validate(req);
    if(error){
        return next(error)
    }

 var id = req.params.id;
 UserModel.findById(id)
    .exec(function(err,user){
        if(err){
            return next(err);
        }
        var updateUser = map_user_req(user,req.body);
        updateUser.save(function(err,done){
            if(err){
                return next(err);
            }
            res.status(200).json(done);
        });

        
    });  



});

*/
router.delete('/:id',function(req,res,next){
    UserModel.remove({
        _id:req.params.id
    },function(err,done){
        if(err){
            return next(err);
        }else{
            res.status(200).json(done);
        }
    });

});
return router;

}
