# ReactJS Blog Application

<p>
  A simple blog application built with ReactJS, Express, and MongoDB that allows users to create, view, update, and delete posts. 
  This application includes features like user authentication, and creating posts with images.
</p>

<br>

## Table of Contents
- Features
- Installation
- Usage
- Folder Structure
- Dependencies
- API Endpoints
- Contribution

<br>

## Features
- User Authentication: Register and login to access personalized blog posts.
- CRUD Functionality: Users can create, read, update, and delete blog posts.
- Image Upload: Upload images for blog posts.
- Responsive Design: Fully responsive layout for optimal user experience on any device.
- Date and Author Display: Each post shows the date of creation and the author's name.

<br>

## Installation
1. Install dependencies for the client and api:

``` 
# Install api dependencies
cd ../api
npm install

# Install client dependencies
cd ../client
npm install
```
<br>

2. Set up environment variables:
- Create a ```.env``` file in the ```api``` folder with the following variables:

```MONGO_URL = "mongodb+srv://immanuelsy2112:thooweijia0924@cluster0.xfhswcm.mongodb.net/blog?retryWrites=true&w=majority"```

<br>

3. Starting the server:
- Note: Split the terminal
  
   ```
   cd api
   npm start

   cd client
   npm start
   ```

## Usage
1. Register a New Account: Click on "Register" to create a new account.
2. Create a New Post: After logging in, click on "Write" to create a new post. You can add an image, a title, and content.
3. View All Posts: Visit the homepage to view all posts.
4. View specific post: Clicking on a post in the homepage
5. Edit or Delete Posts: Access your own posts to edit or delete them.

<br>

## Folder Structure
```
Blod_App
│
├── api                   # Backend code (Node.js, Express)
|   ├── images            # Images
│   ├── models            # Database models
│   ├── routes            # API routes
│   └── index.js          # Entry point for the server
│
├── client                # Frontend code (React.js)
│   ├── public            # Static files
│   ├── src               # Main source folder
│   │   ├── components    # React components
│   │   ├── context       # Context API for state management
│   │   ├── pages         # Pages of the application
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Sets up context provider
│   └── package.json      # Client dependencies
│
└── README.md             # Project documentation
```

<br>

## Dependencies
- Client-side:

- React
   - React Router
   - Axios
   - Server-side:

- Express
   - Mongoose
   - Multer (for file uploads)
   - dotenv (for environment variables)

<br>

##  API Endpoints
- POST /api/posts - Create a new post
- GET /api/posts/:id - Get a specific post by ID
- GET /api/posts - Get all posts
- PUT /api/posts/:id - Update a post by ID
- DELETE /api/posts/:id - Delete a post by ID
- POST /api/categories - Create a new category
- GET /api/categories - Get all categories

<br>

## Contribution
Contributions are welcome!
