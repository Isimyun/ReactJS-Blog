const router = require('express').Router();
const User = require("../models/User"); //importing user model from models.js
const Post = require('../models/Post'); //importing post model from models.js

//CREATE POST
router.post('/', async(req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save(); //save post to database
        res.status(200).json(savedPost); //send 200 status code and post as json to client (express)
    } catch(error) {
        res.status(500).json(error); //500 internal server error
    }
})

//UPDATE POST
router.put("/:id", async(req, res) => { //pass in req.params.id and req.body to update post in database.
    try {
        const post = await Post.findById(req.params.id); //find post with that id in database.
        if(post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body 	//pass in req.body to update post with.
                }, {new: true});

                res.status(200).json(updatedPost); //send 200 status code and updated post
            } catch (error) {
                res.status(500).json(error); //500 internal server error.
            }
        } else {
            res.status(401).json("You can only update your post!");
        }
        

    } catch (error) {
        res.status(500).json(error); //500 internal server error.
    }
}); 

//DELETE POST
router.delete("/:id", async(req, res) => { //pass in req.params.id and req.body to delete post in database.
    try {
        const post = await Post.findById(req.params.id); //find post with that id in database.
        if(post.username === req.body.username) {
            try {
                await post.deleteOne(); //delete post from database.
                res.status(200).json("Post deleted successfully!"); //send 200 status code and updated post
            } catch (error) {
                res.status(500).json(error); //500 internal server error.
            }
            
        } else {
            res.status(401).json("You can only delete your post!");
        }
        

    } catch (error) {
        res.status(500).json(error); //500 internal server error.
    }
}); 

//GET POST
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id); //find post with that id in database and make it a variable.
        res.status(200).json(post); //returns post data to client.
    } catch(error) {
        res.status(500).json(error);
    }
});

//GET ALL POSTS
router.get("/", async(req, res) => {
    const username = req.query.username; //pass in query string to find all post from that user.
    const categoryName = req.query.category; //pass in query string to find all post from that category.
    try {
        let posts;
        if(username) { //if username is given, find all post from that user.
            posts = await Post.find({username});

        } else if(categoryName) { //if there is a category pass it to the findAll function.
            posts = await Post.find({category: {
                $in: [categoryName]
            }});

        } else {
            posts = await Post.find(); //if there is no category or username pass all post to the findAll function.
        }

        res.status(200).json(posts); //returns posts data to client.
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;