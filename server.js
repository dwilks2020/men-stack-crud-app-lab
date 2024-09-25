// Import required packages
// =============================================================
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const BlogPost = require('./models/BlogPost'); // Your Mongoose model
const methodOverride = require('method-override');

// Initialize Express app
// ============================================================
const app = express();

// Connect to MongoDB using Mongoose
// ============================================================
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// Set EJS as the view engine
// ============================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
// ============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method')); // Moved this line after initializing `app`

// Routes
// ============================================================
app.get('/', async (req, res) => {
    try {
        const blogs = await BlogPost.find(); // Fetch the blogs from the database
        res.render('index', { title: 'Home Page', blogs }); // Pass the blogs to the view
    } catch (error) {
        console.error(error);
        res.send('Error occurred while fetching blogs');
    }
});

// Route to create a new blog post
app.get('/blogs/new', (req, res) => {
    res.render('blogs/new', { title: 'Create New Blog Post' });
});

// Route for saving the new blog post
app.post('/blogs/post', async (req, res) => {
    try {
        const newBlog = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });
        await newBlog.save();
        res.redirect('/blogs'); // Redirect to the list of blogs after creation
    } catch (error) {
        console.error(error);
        res.send('Error occurred while creating the blog post');
    }
});

// Route to display all blog posts
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await BlogPost.find();
        res.render('index', { blogs });
    } catch (error) {
        console.error(error);
        res.send('Error occurred while fetching blog posts');
    }
});

// Route to display a specific blog post
app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        res.render('post', { blog });
    } catch (error) {
        console.error(error);
        res.send('Error occurred while fetching the blog post');
    }
});

// Route to edit a blog post
app.get('/blogs/:id/edit', async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        res.render('edit', { blog });
    } catch (error) {
        console.error(error);
        res.send('Error occurred while fetching the blog post for editing');
    }
});

// Route to update a blog post
app.put('/blogs/:id', async (req, res) => {
    try {
        const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/blogs/${blog._id}`); // Redirect to the updated blog post
    } catch (error) {
        console.error(error);
        res.send('Error occurred while updating the blog post');
    }
});

// Route to delete a blog post
app.delete('/blogs/:id', async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.redirect('/blogs'); // Redirect to the list of blogs after deletion
    } catch (error) {
        console.error(error);
        res.send('Error occurred while deleting the blog post');
    }
});

// Start the server
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
