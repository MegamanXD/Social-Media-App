import gql from 'graphql-tag';

module.exports = {
    GET_POST = gql`
        query($postId: ID!) {
            getPost(postId: $postId) {
                id
                body
                createdAt
                username
                likeCount
                likes {
                    username 
                }
                commentCount
                comments {
                    id
                    username
                    createdAt
                    body
                }
            }
        }
    `,

    DELETE_POST = gql`
        mutation deletePost($postId: ID!) {
            deletePost(postId: $postId)
        }
    `,

    LIKE_POST = gql`
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
    `
}
