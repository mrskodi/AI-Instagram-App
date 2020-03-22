const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data){
  errors = {};

  // Validate username
  if(isEmpty(data.username)){
    errors.username = 'UserName cannot be empty';
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