var express = require('express');
var router = express.Router();


module.exports = function(){
	//get all products
	router.get('/',function(req,res,next){

	});
	//get product by id
	router.get('/:id',function(req,res,next){
		
	});
	//insert new product
	router.post('/:id',function(req,res,next){
		
	});
	//update product by id
	router.put('/:id',function(req,res,next){
		
	});
	//delete product by id
	router.delete('/:id',function(req,res,next){
		
	});
	//search product
	router.get('/search',function(req,res,next){
		
	});
	return router;
}