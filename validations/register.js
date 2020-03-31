//import validatePhone from 'libphonenumber-js/mobile';

const Validator = require('validator');
const isEmpty = require('./isEmpty');
//const phoneNumber = parsePhoneNumberFromString(data.phone);

module.exports = function validateRegisterInput(data){
  const errors = {};

  // Validate name field
  
  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters.';
  }

  if(isEmpty(data.name)){
    errors.name = 'Name cannot be empty.';
  }

//Validate Email
  if(!Validator.isEmail(data.email)){
    errors.email = 'Email not valid';
}

if(isEmpty(data.email)){
  errors.email = 'Email cannot be empty';
}

  //Validate phone number
  if(!Validator.isMobilePhone(data.phone)){
      errors.phone = 'Phone number is not valid';
  }
  
  if(isEmpty(data.phone)){
    errors.phone = 'Phone number cannot be empty';
  }

  // Validate handle
  if(!Validator.isLength(data.handle, {min: 3, max: 20})){
    errors.handle = 'Handle must be between 3 and 20 characters.';
  }

  if(isEmpty(data.handle)){
    errors.handle = 'Handle cannot be empty';
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
    errors.password2 = 'Passwords must match.';
  }

  if(isEmpty(data.password2)){
    errors.password2 = 'Confirm password cannot be empty.';
  }

  return{
    errors,
    isValid: isEmpty(errors)// no roors, then isValid true. When isValid is true, need not check for validations
  }
}