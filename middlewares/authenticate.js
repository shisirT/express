
//file maynot work

module.exports = function(req,res,next){

	if (req.headers.token =='ram'){
		console.log('everything is valid')

		next();
		
	}else{
		console.log('call error handler middleware now');
		
        next({

        	status:401,
        	message:'invalid token'
        });
		
		}

}





	
    
