// We need to be able to access the Service 
//that we just created so let's pull that in

var DrinkService = require('../services/drink.service.js');

// Make sure to save the context of 
//this module inside the _this variable
_this = this
//This file manipulates the data recieved from the database to determine how it is 
//presented to the user
exports.getDrinks = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
    // if no params are present we set to 1 and 10
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var drinks = await DrinkService.getDrinks({}, page, limit)
            
    // Return the drinks list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: drinks, message: "Succesfully Recieved Drinks"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

exports.createDrink = async function(req, res, next){

        // Note: Req.Body contains the form submit values.

    var drink = {
        type: req.body.type,
        flavor: req.body.flavor,
        brand: req.body.brand
    
    }
   
    try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
        var createdDrink = await DrinkService.createDrink(drink)
        return res.status(201).json({status: 201, data: createdDrink, message: "Succesfully Created Drink"})
    }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
        return res.status(400).json({status: 400, message: "Drink Creation was Unsuccesfull, I am sorry :( "})
        }
    }

exports.updateDrink = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)
    var drink = {
        id,
        type: req.body.type? req.body.type : null,
        flavor: req.body.flavor ? req.body.flavor : null,
        brand: req.body.brand ? req.body.brand : null
        
    }

    try{
        var updatedDrink = await DrinkService.updateDrink(drink)
        return res.status(200).json({status: 200, data: updatedDrink, message: "Succesfully Updated Drink"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}
exports.removeDrink = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await DrinkService.deleteDrink(id)
        return res.status(204).json({status:204, message: "Succesfully Drink Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}