const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'name is required']
    },
    price:{
        type: Number,
        required: true,
    }
    
})

const Tour = new mongoose.model('Tour',tourSchema)

module.exports = Tour