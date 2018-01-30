//file maynot work,need some edits


var express = require('express');

var router = express.Router();



module.exports =function(){


  router.post('/register',function(req,res,next){
    console.log('this is post route login',req.body);
  
  });


  router.post('/login',function(req,res,next){
  
  
  });


  router.post('/forgotpassword',function(req,res,next){
  
  
  });



  router.post('/resetpassword',function(req,res,next){
  
  
  });

  router.get('/',function(req,res,next){


  });


  router.get('/:id',function(req,res,next){


  });


  router.put('/:id',function(req,res,next){


  });


  router.delete('/:id',function(req,res,next){


  });
return router;
}

  