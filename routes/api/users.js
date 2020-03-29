const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const validateLoginEmailOrPhoneInput = require('../../validations/loginemailOrPhone');
const tokenGenerator = require('../../config/tokengenerator');

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

  //Check if user with email or phone exists
  User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          return res.json({email: 'User with email already exists!'});
        }

        // Check if phone number already exists
        User.findOne({phone: req.body.phone})
            .then(user => {
              if(user){
                return res.json({phone: 'Phone number already taken!'})
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

        console.log(`Success creating a new user: ${newUser}`);

        // Gen a key for hashing the password
        bcrypt.genSalt(5)
              .then(salt => {
                if(salt){
                  bcrypt.hash(newUser.password, salt)
                        .then(hash => {
                          if(hash){
                            console.log(`Hashed password: ${hash}`);
                            // ----- Working till here
                            newUser.password = hash;
                            newUser.save()
                                    .then(user => {
                                      
                                      // The moment a newUser is created, I want to create a new profile with the user details and upload it to the profile document in mongodb.

                                      // Before creating a profile, check whether profile exists in profile document. In fact, it is not necessary since when a user is deleted, the profile is also deleted.
                                      //populate('user', ['name', 'email', 'phone', 'avatar'])
                                      // If not, then create profile
                                      
                                      const newProfile = new Profile({
                                        user: user.id,
                                        name: user.name,                                        email: user.email,
                                        handle: user.handle,
                                        phone: user.phone
                                      })
                                      newProfile.save()
                                                .then(profile => {
                                                  return res.status(200).json({
                                                    msg: 'User created successfully',
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
      //.catch(err => console.log(err));
  
    });
//       .catch(err => console.log(err));
 })

// @route   POST /api/users/login
// @access  PUBLIC
// desc     login registered users
router.post('/login', (req, res) => {
  // Validate emailid and password 
  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){ // validation not passed
    return res.json(errors);
  }

  // Check if user exists
  User.findOne({email: req.body.email})
      .then(user => {
        if(!user){
          return res.json({msg: 'user does not exist'});
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
            return res.json({password: 'Password did not match'});
          } 
        })
      })
      .catch()
})

// @route   GET /api/users/current
// @access  Private
// @desc    Return the information of the current user
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
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
  console.log('In delete a user route')
  // Ask for password one more time to verify it is the correct user
  // Ask reason for deleting - provide the options in a drop down list
  // First delete profile and then delete user
  Profile.findOneAndRemove({user: req.user.id})
         .then(
           // Profile successfully deleted
           // Delete user
           User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({msg: 'Successfully deleted user and their profile from mongodb.'}))
                .catch(err => console.log(err))
         )
         .catch(err => console.log(err))
})


// @route   POST /api/users/login/emailOrPhone
// @access  PUBLIC
// desc     login registered users
router.post('/login/emailOrPhone', (req, res) => {
  // Validate emailid and password 
  const {errors, isValid} = validateLoginEmailOrPhoneInput(req.body);
  if(!isValid){ // Did not clear validation
    return res.json({errors});
  }

  // Cleared validation. Get user based on email or Phone
  User.findOne({email: req.body.emailOrPhone})
      .then(user => {

        console.log('Checking if user exists based on input === email id');
        if(!user){ // User with the input === email does not exist
          console.log('Could not find an email with the entered input');
          User.findOne({phone: req.body.emailOrPhone})
              .then(user => {
                console.log('Checking if user exists based on input === phone');
                if(!user){ // User with input === phone does not exist
                  return res.json({msg: 'User does not exist'});
                }
                // User exists
                console.log(`user credentials based on input === phone: 
                            username=${user.name}, 
                            phone=${user.phone}, 
                            email=${user.email}`);
                            tokenGenerator(user,req.body.password);
                // const {token, isTokenEmpty} = tokenGenerator(user, req.body.password);
                // if(!isTokenEmpty){
                //   return res.json({token});
                // }
                // call function to hash password and generate bearer token. Pass the bearer token back here to be printed to console
              })
              .catch(err=> console.log(err));
        }  
          // User exists
          console.log(`user credentials based on input === email: 
                      username=${user.name}, 
                      phone=${user.phone}, 
                      email=${user.email}`);
          tokenGenerator(user,req.body.password);
                // const {token, isTokenEmpty} = tokenGenerator(user, req.body.password);
                // if(!isTokenEmpty){
                //   return res.json({token});
                // }
      })
      .catch(err => console.log(err));
})

module.exports = router;
