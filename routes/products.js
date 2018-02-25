var express = require('express');
var router = express.Router();
var productModel = require('./../models/products');


function mapProductRequest (product,productDetails){
	if(productDetails.category)
		product.category = productDetails.category;
	if(productDetails.name)
		product.name = productDetails.name;
	if(productDetails.description)
		product.description = productDetails.description;
	if(productDetails.brand)
		product.brand = productDetails.brand;
	if(productDetails.measurementUnit)
		product.measurementUnit = productDetails.measurementUnit;
	if(productDetails.price)
		product.price = productDetails.price;
	if(productDetails.color)
		product.color = productDetails.color;
	if(productDetails.status)
		product.status = productDetails.status;
	if(productDetails.manuDate)
		product.manuDate = productDetails.manuDate;
	if(productDetails.attributes)
	    product.attributes = productDetails.attributes;
	if(productDetails.rating)
		product.rating = productDetails.rating;
	if(productDetails.imageName)
		product.imageName = productDeatails.imageName;
	if(productDetails.feedbacks)
		product.feedbacks = productDetails.feedbacks;
	if(productDetails.address)
		product.address = productDetails.address;
	if(productDetails.tags)
		product.tags = productDetails.tags;
	
   
	return product;
}


module.exports = function(){
	//get all products
	router.get('/',function(req,res,next){
       productModel.find({}).exec(function(err,products){
		   if(err){
			   return next(err);
		   }
		   if(products){
			   res.status(200).json(products);
		   }
		   else{
			   res.json({
				   message:'products not found'
			   });
				
		   }
	   });
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