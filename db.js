var mongoose = require ('mongoose');

/* first step to do is:
module.exports = function(){
	mongoose.connect(db_url,function(err,done){
		if(err){
			console.log('error occured connecting to db');
		}else{
			console.log('successfully connect db');
			}
});

mongoose.connection.on('error',function(err){
	console.log('error occured');
});

mongoose.connection.once('open',function(done){
	console.log('success connected');
});

}
*/

module.exports =  function(config){
  mongoose.connect(config.mongodb.url);


mongoose.connection.on('error',function(err){
	console.log('error occured connecting to db');
});

mongoose.connection.once('open',function(done){
	console.log('success connected to database');
});

}
