const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type:String, //Type will be String
        required:true, //It's a required field
        unique:true //It's unique
    },
    description: {
        type:String, //Type will be String
        required:true //It's a required field
    },
    photo: {
        type:String //Type will be String
    },
    username: {
        type:String, //Type will be String
        required:true //It's a required field
    },
    categories: {
        type:Array, //Type will be Array
    },
}, {timestamps:true});

module.exports = mongoose.model('Post', PostSchema); //This will export this module