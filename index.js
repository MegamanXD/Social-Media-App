// 0.1. Declaring all dependency imports
const { ApolloServer } = require('apollo-server');  // Self-documenting GraphQL API
const mongoose = require('mongoose');               // MongoDB connection
const { PubSub } = require('apollo-server');        // Publish-Subscribe built-in functionalities


// 0.2. Declaring all file imports
const { DATABASE_URL } = require('./config.js')     // Hides sensitive data in another file to improve security
const typeDefs = require('./graphql/typeDefs.js')   // Load all Schemas for GraphQL
const resolvers = require('./graphql/resolvers/allResolvers.js')    // Load all Resolvers for GraphQL

// 1. Define how GraphQL Apollo server works
const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Forward the ExpressJS request & Pub-Sub functions to GraphQL Context
    // GraphQL Context can be accessed from anywhere else in the GraphQL Server
    context: ( {req} ) => ( {req, pubsub} )
})

// 2. Connect to MongoDB Atlas Server
const MongoClientSettings = {
    useNewUrlParser: true,      // Always use the latest URL reader
    useUnifiedTopology: true    // Always use the latest Server engine
}

mongoose
    .connect(DATABASE_URL, MongoClientSettings)
    .then( () => {
        // Show the developers that MongoDB is connected
        console.log('MongoDB Connected');
        return server.listen( {port: 5000} );
    })
    .then(response => {
        // Show the developers which port the server is listening on
        console.log(`Server running at ${response.url}`);
    });
