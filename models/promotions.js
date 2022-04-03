const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var promotionsSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        type: String,
        rquired: true
    },
    label: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
})

var Promotions = mongoose.model('Promotion',promotionsSchema);
module.exports = Promotions;