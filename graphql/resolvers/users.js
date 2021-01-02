// 0.1. Declaring all dependency imports
const bcrypt = require('bcryptjs');                     // Hashing algorithm to enhance security
const { UserInputError } = require('apollo-server');    // GraphQL built-in error handler

// 0.2. Declaring all file imports
const { validateRegisterInput, validateLoginInput} = require('../../util/validators.js');
const { generateToken } = require('../../util/generateToken.js');
const User = require('../../models/User.js')

// 1. Details to be exported
module.exports = {
  Mutation: {
    // Note: all Mutation functions follow the format
    // async funtionName(parent, input_arguments, context, info)

    // 1.1. Register
    async register(_, {registerInput: {username, email, password, confirmPassword} }) {
      const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
      
      // Check if registration data is valid
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // Check if user already exists
      const user = await User.findOne( {username} );
      if (user) {
        throw new UserInputError('Username: taken', {errors: {username: 'This username already exists'} });
      }

      // Once all tests are passed, hash the password to enhance security
      password = await bcrypt.hash(password, 12);

      // Save the new user into MongoDB
      const newUser = new User({email, username, password, createdAt: new Date().toISOString() });
      const savedUser = await newUser.save();

      // Generate a Login Token for the new user
      const token = generateToken(savedUser);

      return { ...savedUser._doc, id: savedUser._id, token };
      // Note: ...savedUser._doc means all the details of the savedUser.
      // In MongoDB, id is auto-generated and is not part of the details.
    },

    // 1.2. Login
    async login(_, { username, password } ) {
      const { errors, valid } = validateLoginInput(username, password);

      // Check if login data is valid
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // If login data is valid, find the user
      const user = await User.findOne({ username });

      // If user cannot be found, display an error message
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      // If user is found but the password doesn't match, display an error message
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong username or password', { errors });
      }

      // Once all tests are passed, generate a Login Token
      const token = generateToken(user);

      return { ...user._doc, id: user._id, token };
      // Note: ...user._doc means all the details of the user.
      // In MongoDB, id is auto-generated and is not part of the details.
    }
  }
};