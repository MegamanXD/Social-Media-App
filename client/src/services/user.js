import gql from 'graphql-tag';

module.exports = {
    LOGIN = gql`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                id
                email
                username
                createdAt
                token
            }
        }
    `,

    REGISTER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
            ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                }
            ) {
                id
                email
                username
                createdAt
                token
            }
        }
    `
}
