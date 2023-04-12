const router = require('express').Router();
const User = require("../models/User"); //importing user model from models.js
const Post = require('../models/Post'); //importing post model from models.js
const bcrypt = require('bcrypt');

//UPDATE
router.put("/:id", async(req, res) => {    
    if(req.body.userId === req.params.id) { //compare userId ids of body and url
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10); //generate salt
            req.body.password = await bcrypt.hash(req.body.password, salt); //hash password with salt
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body //update only what is specified in body and update it in database with that data.
            }, {new: true});

            res.status(200).json(updatedUser);
        } catch(error) {
            res.status(500).json(error); //Internal server error
        }
    } else {
        res.status(401).json("You can only edit your own account!")
    }
    
});

//DELETE
router.delete("/:id", async(req, res) => {    
    if(req.body.userId === req.params.id) { //compare userId ids of body and url
        try {
            const user = await User.findById(req.params.id); //find user with that id in database and make it a variable.

            try {
                await Post.deleteMany({username: user.username}); //delete all post of that user.
                
                await User.findByIdAndDelete(req.params.id); //delete user from database. 
    
                res.status(200).json("User deleted successfully!");
            } catch(error) {
                res.status(500).json(error); //Internal server error
            }
        } catch(error) {
            res.status(404).json("User not found!"); //user not found error.
        }       
        
    } else {
        res.status(401).json("You can only delete your own account!")
    }
    
});

//GET USER
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id); //find user with that id in database and make it a variable.
        const {password, ...others} = user._doc;
        res.status(200).json(others); //returns user data to client.
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;