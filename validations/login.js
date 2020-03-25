//import validatePhone from 'libphonenumber-js/mobile';
const validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data){
  errors = {};

  // Check if either email or phone number exists
  if(isEmpty(data.email) && isEmpty(data.phone)){
    errors.input = 'Enter either email or phone';
  }

  // If email provided, validate email
  if(!isEmpty(data.email)){
    if(!validator.isURL(data.email)){
      errors.email = 'Invalid email';
    }
  }

  // If Phone number provided, validate phone
  if(!isEmpty(data.phone)){
    if(!validatePhone.isMobilePhone(data.phone)){
      errors.phone = 'Phone number is not valid';
    };
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