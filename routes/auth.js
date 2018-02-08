var express = require('express');

var router = express.Router();

module.exports =function(){

  router.get('/',function(req,res,next){

    
  });


  router.get('/:id',function(req,res,next){
    

  });

  router.post('/register',function(req,res,next){
    
  
  });

  router.post('/login',function(req,res,next){
    console.log('body>>>',req.body);
  
  });

  router.post('/forgotpassword',function(req,res,next){
  
  
  });

  router.post('/resetpassword',function(req,res,next){
  
  
  });

  router.put('/:id',function(req,res,next){


  });
  router.delete('/:id',function(req,res,next){


  });
return router;
}

  