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
    }
})

var Promotions = mongoose.model('Promotion',promotionsSchema);
module.exports = Promotions;