// 0.1. Declaring all dependency imports
const { AuthenticationError, UserInputError } = require('apollo-server');   // GraphQL built-in error handler

// 0.2. Declaring all file imports
const Post = require('../../models/Post.js')
const checkAuthenticated = require('../../util/check-authenticated.js');

// 1. Details to be exported
module.exports = {
    // 1.1. Define all Query (GET methods)
    Query: {
      // Get all posts
      async getPosts(){
        try{
          let posts = await Post.find()                      // Find all Posts from MongoDB
                                .sort({createdAt: -1});;     // Sort to show all newly-created posts at the top
          return posts;
        }
        catch (error) {
          throw new Error(error);
        }
      },

      // Get 1 specific post by ID
      async getPost(_, { postId }) {
        try{
          const post = await Post.findById(postId);

          if (post) { return post; }
          else      { throw new Error('Post not found'); }
        }
        catch (err){
          throw new Error(err);
        }
      }
    },

    // 1.2. Define all Mutation (non-GET methods)
    Mutation: {
      //Create post
      async createPost(_, { body }, context) {
        const user = checkAuthenticated(context);

        // Check if post body is empty
        if (body.trim() === '') { throw new Error('Post body must not be empty'); }

        // If it's not empty, save the new post in the database
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString()
        });

        const savedPost = await newPost.save();

        // Publish the new post to subscribers
        context.pubsub.publish('NEW_POST', { newPost: savedPost } );
  
        return savedPost;
      },

      // Delete post
      async deletePost(_, { postId }, context) {
        const user = checkAuthenticated(context);
  
        try {
          const post = await Post.findById(postId);

          // If post author is the current user, delete the post
          if (user.username === post.username){
            await post.delete();
            return 'Post deleted successfully';
          }
          // If post author is not the current user, block the delete request
          else { throw new AuthenticationError('Action not allowed'); }
        }
        // If the post cannot be found, inform the Developers
        catch (err) {
          throw new Error(err);
        }
      },

      // Like post
      async likePost(_, { postId }, context) {
        const { username } = checkAuthenticated(context);
  
        const post = await Post.findById(postId);
        if (post) {
          // If post is already liked, unlike it
          if (post.likes.find( (like) => like.username === username) ) {
            post.likes = post.likes.filter( (like) => like.username !== username );
          }
          // If post is not liked, like it
          else {
            post.likes.push( { username, createdAt: new Date().toISOString() } );
          }

          // Update the post
          await post.save();

          return post;
        } 
        // If the post cannot be found, inform the Developers
        else throw new UserInputError('Post not found');
      }
    },

    // 1.3. Define all Subscription
    Subscription: {
      newPost: {
        subscribe: (_, __, { pubsub } ) => pubsub.asyncIterator('NEW_POST')
      }
    }
}