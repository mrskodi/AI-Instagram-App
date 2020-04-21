//import validatePhone from 'libphonenumber-js/mobile';
const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data){
  const errors = {};

  // Validate email
  if(!validator.isEmail(data.email)){
    errors.email = 'Email is invalid. Please provide valid email';
  }

  if(isEmpty(data.email)){
    errors.email = 'Please provide email';
  } 
  
  // Validate password
  if(isEmpty(data.password)){
    errors.password = 'Please provide password';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}