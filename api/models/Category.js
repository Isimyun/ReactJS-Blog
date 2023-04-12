const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type:String, //Type will be String
        required:true, //This field is required.
    }
}, {timestamps:true});

module.exports = mongoose.model('Category', CategorySchema); //This will export this module