const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateLoginEmailOrPhoneInput = data => {
  const errors = {};

  // Only one input text is available for the user to enter the data
  // Either email or phone is entered by the user
  // Name the input textbox as emailOrPhone  

  // Check whether emailOrPhone has value
  if(isEmpty(data.emailOrPhone)){
    errors.emailOrPhone = 'Cannot be blank';
  }

  // Check whether the input entered is valid or not
  // If email, check valid email
  // If phone, check valid phone 
  if(!validator.isEmail(data.emailOrPhone) && !validator.isMobilePhone(data.emailOrPhone)){
    errors.emailOrPhone = 'Invalid entry. please enter a valid email or mobile number';
  }

  // Check whether password is empty
  if(isEmpty(data.password)){
    errors.password = 'Password cannot be empty';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }

}