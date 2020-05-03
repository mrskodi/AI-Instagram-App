const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePostInput = data => {
  const errors = {};

// <<<<<<< HEAD
//   if(isEmpty(data.imageOrVideo)){
//     errors.imageOrVideo = 'Cannot post without image or video.';
//   }

//   if(!isEmpty(data.imageOrVideo)){
//     // Check if data.imageOrVideo is a valid URL
//     if(!validator.isURL(data.imageOrVideo)){
//       errors.imageOrVideo = ' Not a valid URL.';
// =======
  if(isEmpty(data.isImageOrVideo)){
    errors.isImageOrVideo = 'Please choose one from the list.'
  }

  if(isEmpty(data.imageOrVideoLink)){
    errors.imageOrVideoLink = 'Cannot post without image or video';
  }

  if(!isEmpty(data.imageOrVideoLink)){
    // Check if data.imageOrVideoLink is a valid URL
    if(!validator.isURL(data.imageOrVideoLink)){
      errors.imageOrVideoLink = ' Not a valid URL';

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