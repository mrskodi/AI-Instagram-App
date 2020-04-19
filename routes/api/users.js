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

// @route   POST /api/users/register
// @access  Public
// @desc    Register a New User
router.post('/register', (req, res) => {
  
  // Validate register input
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  //Check if user email exists
  User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          return res.json({email: 'User with email already exists!'});
        }

        // Check if phone number already exists
        User.findOne({phone: req.body.phone})
            .then(user => {
              if(user){
                return res.json({phone: 'Phone number already exists!'})
              }

        // Check if handle already taken
        User.findOne({handle: req.body.handle})
              .then(user => {
                if(user){
                  return res.json({handle: 'Handle already taken. Choose another handle'})
                }
        // Credentials are not yet taken. create newUser
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
                            // ----- Working till here
                            newUser.password = hash;
                            newUser.save()
                                    .then(user => {
                                      console.log(`Success creating a new user: ${newUser}`);

                                      res.json(user);
                                      // The moment a newUser is created, I want to create a new profile with the user details and upload it to the profile document in mongodb.

                                      // Before creating a profile, check whether profile exists in profile document. In fact, it is not necessary since when a user is deleted, the profile is also deleted.
                                                                           
                                      const newProfile = new Profile({
                                        user: user.id                                     
                                      });
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
            })
          });       
    });
 })

// @route   POST /api/users/login
// @access  PUBLIC
// desc     login registered users
router.post('/login', (req, res) => {

  //Validate login inputs
  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){ // validation not passed
    return res.json(errors);
  }

  // Check if user exists
  User.findOne({email: req.body.email})
      .then(user => {
        if(!user){
          return res.json({msg: 'Invalid email. Please provide valid email'});
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
              avatar: user.avatar,
              handle: user.handle
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
            return res.json({password: 'Invalid password. Please provide valid password'});
          } 
        })
      })
      .catch()
})

// @route   GET /api/users/current
// @access  Private
// @desc    Return the information of the current user
router.get(
  '/current', 
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {
      res.json({
      name: req.user.name,
      id: req.user.id,
      email: req.user.email,
      handle: req.user.handle
    })
  })

// @route   POST /api/users/delete
// @access  PRIVATE
// @desc     delete a registered user and all the posts/ profile/ setting info
router.delete(
  '/delete', 
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {
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
                      .then(() => res.json({success: 'User, user profile and user posts deleted successfully'}))
                      .catch(err => console.log(err));
                    }
          )
            .catch(err => console.log(err));
  })              

module.exports = router;
