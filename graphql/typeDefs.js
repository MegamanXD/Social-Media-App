// 0.1. Declaring all dependency imports
const { gql } = require('apollo-server');   // GraphQL main engine

// 0.2. Declaring all file imports
    // None

// 1. Define all GraphQL Schemas and Services
module.exports = gql`
    # 1.1. Define all GraphQL schemas
    type Post{
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
        comments: [Comment]!
        likes: [Like]!

        # For statistics
        likeCount: Int!
        commentCount: Int!
    }

    type User{
        id: ID!,
        email: String!,
        token: String!,
        username: String!,
        createdAt: String!
    }

    # 1.2. Define all side schemas
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }

    input RegisterInput{
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    # 1.3. Define all Services
        # 1.3.1. Define all Query (GET methods)
        type Query{
            getPosts: [Post]
            getPost(postId: ID!): Post
        }

        # 1.3.2. Define all Mutation (non-GET methods)
        type Mutation{
            register(registerInput: RegisterInput): User!
            login(username: String!, password: String!): User!

            createPost(body: String!): Post!
            deletePost(postId: ID!): String!
            likePost(postId: ID!): Post!

            createComment(postId: String!, body: String!): Post!
            deleteComment(postId: ID!, commentId: ID!): Post!
        }

        # 1.3.3. Define all Subscription
        type Subscription {
            newPost: Post!
        }
`