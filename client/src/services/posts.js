import gql from 'graphql-tag';

export const GET_ALL_POST = gql`
    query {
        getPosts {
            id
            body
            createdAt
            username

            comments {
                id
                username
                createdAt
                body
            }

            likes {
                username 
            }

            likeCount
            commentCount
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const LIKE_POST = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;