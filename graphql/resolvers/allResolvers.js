// 0.1. Declaring all dependency imports
    // None

// 0.2. Declaring all file imports
const postResolvers = require('./posts.js')
const userResolvers = require('./users.js')

// 1. Details to be exported
module.exports = {
    // 1.1. Define all Query (GET methods)
    Query: {
        ...postResolvers.Query      // ... means import everything from postResolvers.Query
    },
    // 1.2. Define all Mutation (non-GET methods)
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    }
}

// [Error: "getPosts" defined in resolvers, but not in schema]
// You get this error because you typed declared your queries incorrectly, like this

// module.exports = {
//         ...postResolvers.Query
// }