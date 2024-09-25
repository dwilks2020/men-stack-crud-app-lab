// models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,       
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Sports', 'Lifestyle', 'Education', 'Health', 'Travel'], 
    default: 'Lifestyle',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },
  tags: [String], // Array of strings for tags
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
