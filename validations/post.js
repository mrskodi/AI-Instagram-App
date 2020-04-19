const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePostInput = data => {
  const errors = {};

  if(isEmpty(data.text)){
    errors.text = 'Text cannot be empty';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}