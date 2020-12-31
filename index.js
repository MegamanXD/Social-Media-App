// 0.1. Declaring all dependency imports
const { ApolloServer} = require('apollo-server');   // GraphQL UI
                                                    // Ctrl + Spacebar for Windows
                                                    // Shift + Spacebar for Macbook
                                                    
const gql = require('graphql-tag');                 // GraphQL main engine
const mongoose = require('mongoose');               // MongoDB connection

// 0.2. Declaring all file imports
const { DATABASE_URL } = require('./config.js')     // Hides sensitive data in another file to improve security
const Post = require('./models/Post.js')

// 1. Define all Services/Queries
const typeDefs = gql`
    type Query{
        getPosts: [Post]
    },
    # Define the Post type that never existed before
    type Post{
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
    }
`

// 2. Define how each Service/Querie operates behind the scene
const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();    // Find all posts
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

//3. Connect to MongoDB Atlas Server
const MongoClientSettings = {
    useNewUrlParser: true,      // Always use the latest URL reader
    useUnifiedTopology: true    // Always use the latest Server engine
}

mongoose
    .connect(DATABASE_URL, MongoClientSettings)
    .then( () => {
        console.log('MongoDB Connected');
        return server.listen( {port: 5000} );
    })
    .then(response => {
        console.log(`Server running at ${response.url}`);
    });
