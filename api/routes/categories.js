const router = require('express').Router();
const Category = require("../models/Category"); //importing user model from models.js

//CREATE CATEGORY
router.post("/", async(req, res) => {
    const newCategory = new Category(req.body) //instantiate new category object with user's input data as attributes.

    try {
        const savedCategory = await newCategory.save(); //save the new category object to the database.
        res.status(200).json(savedCategory); //send back a 200 status code and the savedCategory as JSON to the client.
    } catch (error) {
        res.status(500).json(error); //500 internal server error
    }

});

//GET CATEGORY
router.get("/", async(req, res) => {
    try {
        const categories = await Category.find(); //find all categories in the database.
        res.status(200).json(categories); //send back a 200 status code and the categories as JSON to the client.
    } catch (error) {
        res.status(500).json(error); //500 internal server error
    }

});

module.exports = router;