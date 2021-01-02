// 0.1. Declaring all dependency imports
const { model, Schema } = require('mongoose');

// 0.2. Declaring all file imports
    // None

// 1. Define Post schema for MongoDB
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    // MongoDB can still have relationships like this
    user: [
        {
            type: Schema.Types.ObjectId,
            refs: 'users'
        }
    ]
});

// 2. Export Post schema
// Note: This is MongoDB Schema, not GraphQL Schema
module.exports = model('Post', postSchema)