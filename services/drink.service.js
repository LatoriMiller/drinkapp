var Drink = require('../models/drink.model.js');

// Saving the context of this module inside the _the variable
_this = this
//THIS FILE EXTENDS CRUD FUNCTIONALITY TO THE DATABASE 
// We are adding the Read functionality here
// Let's use an Async function to get the Drink List
// define and export  
// getDrink is an async function allows you to use the keyword await from E6
// it takes the parameters(query, page, limit)
exports.getDrinks = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate
    // Formatting options to pass later

    var options = {
        page,
        limit
    }

//Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
    try {
        var drinks = await Drink.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the Drink List it has produced 

        return drinks;

    } catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have
        throw Error('Oh No! We got an error while Paginating our Drink List, so sorry!' )
        }
}

//Creating the Create Function
exports.createDrink = async function(drink){ 
    // Creating a new Mongoose Object by using the new keyword
     var newDrink = new Drink({
        type: drink.type,
        flavor: drink.flavor,
        brand: drink.brand
    })
  
    try{
    
        // Let's go ahead and save the Drink 
    
        var savedDrink = await newDrink.save()
    
        return savedDrink;

    }catch(e){
          
            //if we can't create a Drink we want to throw an error 
    
            throw Error("Error while Creating Drink List")
        }
}

//Update Functionality 
//You must pass all of the fields it will fail and wipe out empty fields
exports.updateDrink = async function(drink){
    var id = drink.id

    try{
        //Find the old Drink Object by the Id
    
        var oldDrink = await Drink.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Drink")
    }

    // If no old Drink Object exists return false

    if(!oldDrink){
        return false;
    }

    console.log(oldDrink)

    //Edit the Drink Object
    oldDrink.type = drink.type
    oldDrink.flavor = drink.flavor
    oldDrink.brand = drink.brand
    

    console.log(oldDrink)

    try{
        var savedDrink = await oldDrink.save()
        return savedDrink;
    }catch(e){
        throw Error("And Error occured while updating the Drink");
    }
}

//Delete Functionality
exports.deleteDrink = async function(id){
    // Delete the Drink
    try{
        var deleted = await Drink.deleteOne({_id: id})
        if(deleted.n === 0){
            throw Error("Drink Could not be deleted")
        }
        //the return object from the delete property has n and w?  
        //checks n to determine if something was actually deleted
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Drink")
    }
}