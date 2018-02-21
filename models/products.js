var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  city:String,
  zone:String,
  zipCode:String,
  streetAddress:String,
  houseNo: String
});


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
  measurementUnit: {
  	type: String
  },
  price: {
  	type: Number
  },
  color: {
  	type: String
  },
  quantity: {
  	type: Number
  },
  origin: {
  	type: String
  },
  description: {
  	type: String
  },
  attributes: {
  	type: String
  },
  rating: {
  	ENUM: ['1','2','3','4','5'],
  	default:3
  },
  manuDate: {
  	type: Date,
  	default: Date.now()
  },
  dimensions: {
  	type: String
  },
  imageName: [String],
  distributors: [String],
  discount: {
  	type: String
  },
  delivery : {
  	type: Boolean,
  	default:false
  },
  feedbacks: {
  	type: String
  },
  offers: {
  	type: String
  },
  address: {
  	type: String
  },
  tags: {
  	type:String
  }
});


module.exports= mongoose.model('product',productSchema);
