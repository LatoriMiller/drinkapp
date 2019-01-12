var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var DrinkSchema = new mongoose.Schema({
    type: String,
    flavor: String,
    brand: String
})

DrinkSchema.plugin(mongoosePaginate)
const Drink = mongoose.model('Drink', DrinkSchema)

module.exports = Drink;