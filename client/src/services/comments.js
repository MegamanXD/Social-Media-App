import gql from 'graphql-tag';

module.exports = {
    CREATE_COMMENT = gql`
        mutation($postId: String!, $body: String!) {
            createComment(postId: $postId, body: $body) {
                id
                comments {
                    id
                    body
                    createdAt
                    username
                }
                commentCount
            }
        }
    `,

    DELETE_COMMENT = gql`
        mutation deleteComment($postId: ID!, $commentId: ID!) {
            deleteComment(postId: $postId, commentId: $commentId) {
                id
                comments {
                    id
                    username
                    createdAt
                    body
                }
                commentCount
            }
        }
    `
}
