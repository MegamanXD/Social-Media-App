// 0.1. Declaring all dependency imports
const jwt = require('jsonwebtoken');        // Generate login tokens

// 0.2. Declaring all file imports
const { SECRET_KEY } = require('../config.js');

// 1. Details to be exported
module.exports.generateToken = (user) => {
    return jwt.sign(
        // Use user id, email, and username to generate Login Token
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        // The Login Token can only be read using the SECRET_KEY
        SECRET_KEY,
        
        // The Login Token is available for strictly 1h to prevent hacking
        { expiresIn: '1h' }
    );
}