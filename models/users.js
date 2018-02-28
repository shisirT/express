//models/users
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: String,
	lastName: {
		type: String
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	email: {
		type:String,
		unique:true,
		required: true
	},
	phoneNumber: Number,
	activeStatus: {
	  type:Boolean,
	  default:true
	},
	address: String,
	linkedIn_id: String
},{
	timestamps: true
});

var userModel = mongoose.model('user',userSchema);
module.exports = userModel;