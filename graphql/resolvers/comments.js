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

      // Check if comment body is empty
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", { errors: {body: "Comment must not empty" }});
      }

      // If comment body is not empty, add it to the top of the comments
      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift( {body, username, createdAt: new Date().toISOString()} );
        await post.save();
        return post;
      }
      // If the post cannot be found, inform the Developers
      else { throw new UserInputError("Post not found"); }
    },

    // Delete comment
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuthenticated(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex( (c) => c.id === commentId );

        // If comment author is current user, delete the comment
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        }
        // If comment author is not current user, block the deletion
        else { throw new AuthenticationError("Action not allowed"); }
      }
      // If the post cannot be found, inform the Developers
      else { throw new UserInputError("Post not found"); }
    }
  }
};
