const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const isEmpty = require('../../validations/isEmpty');

// @route   POST /api/users/register
// @access  Public
// @desc    Register a New User
router.post('/register', (req, res) => {
  
  // Validate Input
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  // Validate if the data entered by user is already taken - query mongodb
  User.find({$or: [{email: req.body.email}, {handle: req.body.handle}, {phone: req.body.phone}]})
      .then(users => {
        if(users.length > 0){
          
          users.forEach(user => {
            if(user.email === req.body.email){
              errors.email = 'Email already taken';
            }
            if(user.handle === req.body.handle){
              errors.handle = 'Handle already taken';
            }
            if(user.phone === req.body.phone){
              errors.phone = 'Phone number already taken';
            }
            console.log(errors);
            return res.status(400).json(errors);
          })
        }
        else{
          // User with the details does not exist yet
          // Create an avatar
          
          const avatar = gravatar.url(req.body.email, {
            s: '100',
            r: 'g',
            d: 'robohash'
          });
        
        // Create a newUser object and populate it with data from html form
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          handle: req.body.handle,
          password: req.body.password,
          avatar: avatar
        });
  
        // Gen a key for hashing the password
        bcrypt.genSalt(5)
              .then(salt => {
                if(salt){
                  bcrypt.hash(newUser.password, salt)
                        .then(hash => {
                          if(hash){
                            newUser.password = hash;
                            newUser.save()
                                   .then(user => {
                                    
                                      // The moment a newUser is saved in mongodb, create a profile with the user details and upload it to the profile document in mongodb.
  
                                      const newProfile = new Profile({
                                        user: user.id,
                                        name: user.name,                                        
                                        email: user.email,
                                        handle: user.handle,
                                        phone: user.phone
                                      })
                                      newProfile.save()
                                                .then(profile => {
                                                  return res.status(200).json({
                                                    msg: 'User and profile created successfully',
                                                    userDetails: user,
                                                    profileDetails: profile
                                                  });
                                                })
                                                .catch()
                                    })
                                    .catch(err => console.log(err));
                          }
                        })
                        .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
 })

// @route   POST /api/users/login
// @access  PUBLIC
// desc     login registered users
router.post('/login', (req, res) => {

  // Validate login input
  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){ // validation not passed  
    return res.status(400).json(errors);   
  }

  // Check if user exists
  User.findOne({email: req.body.email})
      .then(user => {
        if(!user){
          return res.status(400).json({msg: 'User does not exist'});
        }
        // User exists
        // compare passwords
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){  // Passwords matched
            // Create a payload
            const payload = {
              id: user.id,
              email: user.email,
              avatar: user.avatar
            }
            // Sign the token and generate a bearer token
            jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
              if (err) throw err;
              if(token){
                res.status(200).json({
                  msg: 'Success generating token',
                  token: 'Bearer ' + token
                })
              }else{
                res.status(400).json({msg: 'Error generating token'});
              }
            })

          }else{
            return res.status(400).json({password: 'Password did not match'});            
          } 
        })
      })
      .catch()
})

// @route   GET /api/users/current
// @access  Private
// @desc    Return the information of the current user
router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
      name: req.user.name,
      id: req.user.id,
      email: req.user.email,
      handle: req.body.handle
    })
  })

// @route   POST /api/users/delete
// @access  PRIVATE
// @desc     delete a registered user and all the posts/ profile/ setting info
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // Authentication performed
  
  // Delete all user posts
  Post.deleteMany({user: req.user.id})
      .then(post => {
        post.length = 0
      })
      .catch(err => console.log(err))
  // Then delete profile and at last delete user
  Profile.findOneAndRemove({user: req.user.id})
         .then(() => {
                User.findOneAndRemove({_id: req.user.id})
                    .then(() => res.json({success: 'User, his profile and all posts deleted successfully'}))
                    .catch(err => console.log(err));
                  }
         )
          .catch(err => console.log(err));
  })              

module.exports = router;
