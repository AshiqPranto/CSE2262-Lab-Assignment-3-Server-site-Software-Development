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
        default: '',
        required: true
    },
    price: {
        type: Number,
        min: 0,
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