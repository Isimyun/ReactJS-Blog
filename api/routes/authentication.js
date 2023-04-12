const router = require('express').Router();
const User = require("../models/User"); //importing user model from models.js
const bcrypt = require('bcrypt');


//REGISTER
router.post("/register", async(req, res) => {    
    try {
        const salt = await bcrypt.genSalt(10); //generating salt using bcrypt.genSalt(10) function.
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //hashing password using bcrypt.hash

        const newUser = new User({
            username: req.body.username, //Username must be unique and non-empty string.
            email: req.body.email, //Email must be unique and non-empty string.
            password: hashedPassword //Password must be at least 8 characters long and non-empty string.
        });

        const user = await newUser.save(); //Save the user to the database.
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(error); //Internal server error
    }
});

//LOGIN
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username}); //finds user with the specified username.
        if(!user) {
            return res.status(400).json("User does not exist!") //returns 400 if user does not exist.
        }

        const validated = await bcrypt.compare(req.body.password, user.password); //compares password with hashed password stored in database.

        if(!validated) {
            return res.status(400).json("User does not exist!"); //Return error when wrong password 

        }

        const { password, ...others } = user._doc; //get the user data from database and store it in 'others' variable.

        res.status(200).json(others); //returns all user data to the client.
    
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;