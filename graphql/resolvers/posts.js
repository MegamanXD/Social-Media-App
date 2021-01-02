// 0.1. Declaring all dependency imports
    // None

// 0.2. Declaring all file imports
const Post = require('../../models/Post.js')        // Import Post schema for MongoDB

// 1. Details to be exported
module.exports = {
    Query: {
        // GET method for Posts
        async getPosts(){
            try{
                const posts = await Post.find();    // Find all Posts from MongoDB
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}