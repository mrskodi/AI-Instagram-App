//import validatePhone from 'libphonenumber-js/mobile';
const validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data){
  errors = {};

  // Validate email
  if(isEmpty(data.email)){
    errors.email = 'Enter email id';
  }

  if(!validator.isEmail(data.email)){
    errors.email = 'Email not valid';
  }
  
  // Validate password
  if(isEmpty(data.password)){
    errors.password = 'Password cannot be empty';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}