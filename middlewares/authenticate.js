var jwt = require('jsonwebtoken');
var config = require('./../config');



module.exports = function(req,res,next){

    var token;

    if(req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if(req.headers['Authorization'])
        token= req.headers['Authorization']
    if(req.query.token)
        token = req.query.token;

    if(token){
      var validUser = jwt.verify(token,config.app.secret,function(err,done){
         if(validUser){
            req.user = validUser.user,
            next();
         }else{
            return next({
                status: 401,
                message:'Invalid Token'
            });
         }

      });

    }else {
       return next({
            status:403,
            message:'Token Not Provided'
        });
    }
}



