const users = require('../routes/api/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./keys');
const isEmpty = require('../validations/isEmpty');

module.exports = function tokenGenerator(userObject, password){

  const tokenObject = {};
  // If passwords match, then sign the token
  bcrypt.compare(password, userObject.password, (err,isMatch) => {
    console.log('Comparing the 2 passwords');
    if(err) throw err;
    if(isMatch){
   
      // Create payload
      const payload = {
        id: userObject.id,
        email: userObject.email,
        avatar: userObject.avatar,
        phone: userObject.phone
      }
      // Sign token
      jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
        // create an empty token object
        // const tokenObject = {};

        if(err) throw err;
        if(token){
          console.log('Successfully created token');
          tokenObject.msg = 'Success';
          tokenObject.BearerToken = 'Bearer ' + token;
         
          console.log(`Token object within the function: ${tokenObject.msg}, ${tokenObject.BearerToken}`);
          return tokenObject;
          // return {
          //   tokenObject,
          //   isTokenEmpty: isEmpty(tokenObject)
          // }
        }
      })
    }
    // }else{
    //   return res.json({msg: 'Password did not match'});
    // }
  })
  
  console.log(`Token object in the outer most layer: ${tokenObject.msg}, ${tokenObject.BearerToken}`);
  // return {
  //   tokenObject,
  //   isTokenEmpty: isEmpty(tokenObject)
  // }
}