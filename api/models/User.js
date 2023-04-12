const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String, //Type will be String
        required:true, //Field is required
        unique:true //Must be unique
    },
    email: {
        type:String, //Type will be String
        required:true, //Field is required
        unique:true //Must be unique
    },
    password: {
        type:String, //Type will be String
        required:true //Field is required
    },
    profilePicture: {
        type:String, //Type will be String
        default:"" //Default value is empty string.
    }
}, {timestamps:true});

module.exports = mongoose.model('User', UserSchema); //This will export this module