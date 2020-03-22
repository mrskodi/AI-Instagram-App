const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

// Home page route for users
router.get('/', (req, res) => res.send({msg: 'User Works!'}));

// Write a test route for users page
router.get('/test', (req, res) => res.send({msg: 'Test route works!'}));

// Write a post route and test in postman
router.post('/test', (req, res) => res.json({msg: 'post route of users works!'}));

// @route   POST /api/users/register
// @access  Public
// @desc    Register a New User
router.post('/register', (req, res) => {
  // Validate Input
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  
  User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          res.json({email: 'User already exists'});
        }else{
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
            username: req.body.username,
            password: req.body.password,
            avatar: avatar
          });

          console.log(`Success creating a new user: ${newUser}`);

          // Check if the username is already taken
          User.findOne({username: req.body.username})
              .then(user => {
                if(user){
                  res.json({username: 'Username already taken. Choose another username'})
                }else{
                    // Gen a key for hashing the password
                    bcrypt.genSalt(5)
                          .then(salt => {
                            if(salt){
                              bcrypt.hash(newUser.password, salt)
                                    .then(hash => {
                                      if(hash){
                                        console.log(`Hashed password: ${hash}`);
                                        newUser.password = hash;
                                        newUser.save()
                                                .then(user => res.status(200).json(user))
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
        }
      })
      .catch(err => console.log(err));
})

// @route   POST /api/users/login
// @access  PUBLIC
// desc     login registered users
router.post('/login', (req, res) => {
  // Validate whether username and password are provided
  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  
  User.findOne({email: req.body.email})
      .then(user => {
        if(!user){
          res.status(400).json({message: 'User does not exist'});
        }else{
          // there is a user with the entered email in the database
          // Check whether the hashed passwords match using bcryptjs.compare function
          bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                  if(isMatch){
                    // Paswords matched
                    console.log('Passwords matched!');
                    
                    // Create a payload
                    const payload = {
                      email: req.body.email,
                      id: user.id,
                      avatar: user.avatar
                    }
                    // Working till here
                    // Generate jwt using payload
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      });
                    });
                    
                  }else{
                    res.json({msg: 'Password incorrect'});
                  }
                })
                .catch(err => console.log(err));
          
          // take the user to the posts page
        }
      })
      .catch(err => console.log(err));
})

// @route   GET /api/users/current
// @access  Private
// @desc    Return the information of the current user
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      name: req.user.name,
      id: req.user.id,
      email: req.user.email,
      username: req.user.username
    })
  });

module.exports = router;
