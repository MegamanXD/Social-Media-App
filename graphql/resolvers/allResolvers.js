// 0.1. Declaring all dependency imports
    // None

// 0.2. Declaring all file imports
const postResolvers = require('./posts.js')
const userResolvers = require('./users.js')
const commentsResolvers = require('./comments.js');

// 1. Details to be exported
module.exports = {
    // 1.1. Define all Query (GET methods)
    Query: {
        ...postResolvers.Query      // ... means import everything from postResolvers.Query
    },
    // 1.2. Define all Mutation (non-GET methods)
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    // 1.3. Define all Subscription
    Subscription: {
      ...postResolvers.Subscription
    },
    // 1.4. Define all Other stuff
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    }
}