var express = require('express');
var router = express.Router();

var UserModel = require('./../models/users');

}
module.exports = function(){
	router.get('/',function(req,res,next){
		UserModel.find({})
		.exec(function(err,result){
			if(err){
				return next(err);
			}else{
				res.status(200).json(result);
			}
		});
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