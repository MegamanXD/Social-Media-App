// 0.1. Declaring all dependency imports
const { AuthenticationError } = require('apollo-server');   // GraphQL built-in error handler
const jwt = require('jsonwebtoken');                        // Verify login tokens

// 0.2. Declaring all file imports
const { SECRET_KEY } = require('../config');

// 1. Details to be exported
module.exports = (context) => {
  //Extract the Authorization header
  const request = context.req;
  const authHeader = request.headers.authorization;

  if (authHeader) {
    // Authorization header is in the form of: Bearer [token]
    // We need to extract token out
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      // If the token is valid, find the user
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      }
      // If user cannot be found, that means the token expired or is invalid
      catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }

  // If the Authorization header is invalid, show the valid format to the developer
  throw new Error("Authentication token must be 'Bearer [token]");
  }

  // If the Authorization header is blank, warn the developer
  throw new Error('Authorization header must be provided');
};