var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  category:{
  	type:String

  },
  name:{
  	type:String
  },
  brand:{
  	type:String
  },
  


});


module.exports= mongoose.model('product',productSchema);
