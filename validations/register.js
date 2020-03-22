const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data){
  const errors = {};

  // Validate name field
  
  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters.';
  }

  if(isEmpty(data.name)){
    console.log(`Name is empty`);
    errors.name = 'Name cannot be empty.';
  }

  // Validate email
  if(!Validator.isEmail(data.email)){
    errors.email = 'Enter a valid email.';
  }

  if(isEmpty(data.email)){
    errors.email = 'Email cannot be empty.';
  }

  // Validate username
  if(!Validator.isLength(data.username, {min: 3, max: 20})){
    errors.username = 'Username must be between 3 and 20 characters.';
  }

  if(isEmpty(data.username)){
    errors.username = 'Username cannot be empty';
  }

  // Validate Password
  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'Password must be between 6 and 30 characters.';
  }

  if(isEmpty(data.password)){
    errors.password = 'Password cannot be empty.';
  }

  // Validate Password 2
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'passwords must match.';
  }

  if(isEmpty(data.password2)){
    errors.password2 = 'Confirm password cannot be empty.';
  }

  return{
    errors,
    isValid: isEmpty(errors)// no roors, then isValid true. When isValid is true, need not check for validations
  }
}