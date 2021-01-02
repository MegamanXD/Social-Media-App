// 0.1. Declaring all dependency imports
const { AuthenticationError, UserInputError } = require("apollo-server"); // GraphQL built-in error handler

// 0.2. Declaring all file imports
const checkAuthenticated = require("../../util/check-authenticated.js");
const Post = require("../../models/Post");

// 1. Details to be exported
module.exports = {
  // 1.1. Define all Query (GET methods)
    // None

  // 1.2. Define all Mutation (non-GET methods)
  Mutation: {
    // Create comment
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuthenticated(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", { errors: {body: "Comment must not empty" }});
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift( {body, username, createdAt: new Date().toISOString()} );
        await post.save();
        return post;
      }
      else { throw new UserInputError("Post not found"); }
    },

    // Delete comment
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuthenticated(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex( (c) => c.id === commentId );

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        }
        else { throw new AuthenticationError("Action not allowed"); }
      } 
      else { throw new UserInputError("Post not found"); }
    }
  }
};
