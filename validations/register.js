//import validatePhone from 'libphonenumber-js/mobile';
const User = require('../models/User')
const Validator = require('validator');
const isEmpty = require('./isEmpty');
const passwordStrengthChecker = require('./passwordStrength');
//const phoneNumber = parsePhoneNumberFromString(data.phone);

module.exports = function validateRegisterInput(data){
  const errors = {};

  // VALIDATE NAME
  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters.';
  }
  if(isEmpty(data.name)){
    errors.name = 'Please provide a name.';
  }

  //Validate email
  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid. Please provide a valid email. ';
  }
  if(isEmpty(data.email)){
  errors.email = 'Please provide an email.';
  }

  //VALIDATE PHONE NUMBER
  if(!Validator.isMobilePhone(data.phone)){
      errors.phone = 'Phone number is invalid. Please provide a valid phone number.';
  }  
  if(isEmpty(data.phone)){
    errors.phone = 'Please provide a phone number.';
  }

  // VALIDATE HANDLE
  if(!Validator.isLength(data.handle, {min: 3, max: 20})){
    errors.handle = 'Handle must be between 3 and 20 characters.';
  }
  if(isEmpty(data.handle)){
    errors.handle = 'Please provide a handle.';
  }

  //Validate Password
  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'Password must be between 6 and 30 characters.';
  }
  if(isEmpty(data.password)){
    errors.password = 'Please provide a password.';
  }

  // Password strength check
  if(isEmpty(passwordStrengthChecker(data.password, /[a-z]/g))){
    errors.password = 'Provide at least 1 lowercase character';
  }

  if(isEmpty(passwordStrengthChecker(data.password, /[A-Z]/g))){
    errors.password = 'Provide at least 1 uppercase character';
  }

  if(isEmpty(passwordStrengthChecker(data.password, /[0-9]/g))){
    errors.password = 'Provide at least 1 digit';
  }

  if(isEmpty(passwordStrengthChecker(data.password, /[^A-Za-z0-9\s]/g))){
    errors.password = 'Provide at least one special character'
  }
  
  //Validate Password 2
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match.';
  }
  if(isEmpty(data.password2)){
    errors.password2 = 'Please confirm password.';
  }

  return{
    errors,
    isValid: isEmpty(errors)// If no errors, isValid true. When isValid is true, need not check for validations
  }
}