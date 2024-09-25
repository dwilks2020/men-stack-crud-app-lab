// server.js

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (optional)
app.use(express.static('public'));

// Middleware to parse incoming request bodies (for form submissions, etc.)
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Example route to render an EJS page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
