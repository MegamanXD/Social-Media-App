// 0.1. Declaring all dependency imports
const { model, Schema } = require('mongoose');

// 0.2. Declaring all file imports
    // None

// 1. Define User schema for MongoDB
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
});

// 2. Export User schema
// Note: This is MongoDB Schema, not GraphQL Schema
module.exports = model('User', userSchema)