const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePostInput = data => {
  const errors = {};

  if(isEmpty(data.imageOrVideo)){
    errors.imageOrVideo = 'Cannot post without image or video.';
  }

  if(!isEmpty(data.imageOrVideo)){
    // Check if data.imageOrVideo is a valid URL
    if(!validator.isURL(data.imageOrVideo)){
      errors.imageOrVideo = ' Not a valid URL.';
    }
  }

  if(isEmpty(data.text)){
    errors.text = 'Text cannot be empty.';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}