# Social Media App

## 1. Brief description
This app consists of 2 main components: GraphQL backend, and ReactJS frontend. <br>
1. GraphQL backend is in the 'graphql' folder
2. ReactJS frontend is in the 'client' folder

## 2. GraphQL backend
This is how it works: <br>
- index.js <br>
    - config.js                (Sensitive info) <br>
    - typeDefs.js              (GraphQL schemas) <br><br>
    - allResolvers.js          (GraphQL services) <br>
        - users.js <br>
            - validators.js    (check register & login info) <br>
            - generateToken.js (create login token) <br>
            - User.js          (MongoDB schema to load data from MongoDB Atlas) <br><br>
        - posts.js <br>
            - check-authenticated.js <br>
            - Post.js          (MongoDB schema to load data from MongoDB Atlas) <br><br>
        - comments.js <br>
            - check-authenticated.js <br>
            - Post.js          (MongoDB schema to load data from MongoDB Atlas) <br><br>

## 3. ReactJS frontend

## 4. Notable errors
- [Error: "getPosts" defined in resolvers, but not in schema]
    - You declared your queries incorrectly
        - Wrong: module.exports = { ...postResolvers.Query }
        - Correct: module.exports = { Query: {...postResolvers.Query} }

- POST http://localhost:5000/ 400 (Bad Request)
    - This means the Query declared in your Service has a typo

