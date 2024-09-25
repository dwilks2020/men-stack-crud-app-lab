// server.js

// Import required packages//=============================================================
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const BlogPost = require('./models/BlogPost');


// Initialize Express app//==================================================
const app = express();


// Connect to MongoDB using Mongoose//=================================================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Mongo DB connection error: ${err}`);
});
//================ Set EJS as the view engine//////================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//============ Middleware /=======================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());

//============== Routes///======================================================================================
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});


// Start the server ///=======================================================================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
