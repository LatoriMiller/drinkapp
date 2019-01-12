var express = require('express')
var router = express.Router()
var DrinkController = require('../../controllers/drink.controller.js');

// connect the controller
// Map each API to the Controller Functions

router.get('/', DrinkController.getDrinks)

router.post('/', DrinkController.createDrink)

router.put('/', DrinkController.updateDrink)

router.delete('/:id',DrinkController.removeDrink)


// Export the Router

module.exports = router;