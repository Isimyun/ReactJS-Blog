const express = require("express");
const app = express(); //create an instance of the Express app by using the "app" variable.
const dotenv = require("dotenv"); //used to read.env file variables 
const mongoose = require("mongoose"); //used to connect to a mongodb server
const authRoute = require("./routes/authentication"); //used to add OAuth2.0 support to the app.
const usersRoute = require("./routes/users"); //used to add user-related functionality to the app.
const postsRoute = require("./routes/posts"); //used to add post-related functionality to the app.
const categoriesRoute = require("./routes/categories"); //used to add post-related functionality to the app.
const multer = require('multer');
const path = require('path');


dotenv.config(); //configure dotenv module for environment variables.
app.use(express.json()); //used to parse incoming request data.
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to MongoDB")).catch(err => console.log(err));

const storage = multer.diskStorage({ //used to store file data in memory.
    destination: (req, file, cb) => { //used to store files in the local file system.
        cb(null, "images"); //passing the destination of the file system to the cb function.
    
    }, filename: (req, file, cb) => { //used to create a unique filename for each file.
        cb(null, req.body.name); //passing the name of the file to the cb function.
    
    }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File uploaded successfully!");
});

app.use("/api/authentication", authRoute); //used to add OAuth2.0 support to the app.
app.use("/api/users", usersRoute); //used to add user-related functionality to the app.
app.use("/api/posts", postsRoute); //used to add post-related functionality to the app.
app.use("/api/categories", categoriesRoute); //used to add category-related functionality to the app.

app.listen("5000", () => { //listen for requests on port 5000
    console.log("Backend is running");
});