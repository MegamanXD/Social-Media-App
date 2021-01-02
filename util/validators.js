
// 1. Check the validity of registration inputs
module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {};
    
    // Check if username is empty
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }

    // Check if password is empty
    if (password === '') {
        errors.password = 'Password must not empty';
    } 
    // Check if password and confirmPassword matches each other
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    // Check if email is empty
    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } 
    // Check if email follows the correct format
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    
    // If there is less than 1 error, then the registration is valid
    valid = Object.keys(errors).length < 1

    // Return all errors & whether the registration is valid
    return {errors, valid};
};
  
// 2. Check the validity of login inputs
module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    // Check if username is empty
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }

    // Check if password is empty
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
  
    // If there is less than 1 error, then the registration is valid
    valid = Object.keys(errors).length < 1

    // Return all errors & whether the registration is valid
    return {errors, valid};
};