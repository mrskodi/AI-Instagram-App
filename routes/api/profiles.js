const express = require('express');
const Profile = require('../../models/Profile');
const passport = require('passport');
const validateProfileInput = require('../../validations/profile');

const router = express.Router();

// @router  api/profiles/
// @access  Private
// @desc    get the profile details of a single user
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  // Find the user from the database
  Profile.findOne({user: req.user.id})
        .then(profile => {
          if(!profile){
            errors. noProfile = 'There is no profile for this user';
            return res.json(errors)
          }
          return res.json(profile);
        }
        )
        .catch(err => console.log(err));
});

// @router api/profiles/handle: userhandle
// @access PRIVATE
// @desc   get the profile details based on handle name
router.get('/handle/:userhandle', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({handle: req.params.userhandle})
        .then(profile => {
          if(!profile){
            errors.noProfile = 'There is no profile with that handle';
            return res.json(errors);
          }
          return res.json(profile);
        })
        .catch(err => console.log(err));
})

// @router api/profiles/name: username
// @access PRIVATE
// @desc   get the profile details based on name
router.get('/name/:username', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({name: req.params.username})
        .then(profile => {
          if(!profile){
            errors.noProfile = 'There is no profile with that name';
            return res.json(errors);
          }
          return res.json(profile);
        })
        .catch(err => console.log(err));
})

// @router api/profiles/email: useremail
// @access PRIVATE
// @desc   get the profile details based on email
router.get('/email/:useremail', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({email: req.params.useremail})
        .then(profile => {
          if(!profile){
            errors.noProfile = 'There is no profile with that email';
            return res.json(errors);
          }
          return res.json(profile);
        })
        .catch(err => console.log(err));
})


// @router  api/profiles/all
// @access  Private
// @desc    get the profile details of a single user
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  // Find the user from the database
  console.log(req.user);
  Profile.find()
        .then(profile => {
          if(!profile){
            errors. noProfile = 'There are no profiles';
            return res.json(errors)
          }
          return res.json(profile);
        }
        )
        .catch(err => console.log(err));
});

// @router  api/profiles/edit
// @access  Private
// @desc    edit the profile page
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // Validations here.
  const {errors, isValid} = validateProfileInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.gender) profileFields.gender = req.body.gender;
  // Split hobbies into an array
  if(typeof req.body.hobbies!== 'undefined'){
    profileFields.hobbies = req.body.hobbies.split(',');
  }
  profileFields.favorites = {};
  if(typeof req.body.books !== 'undefined') profileFields.favorites.books = req.body.books.split(',');
  if(typeof req.body.movies !== 'undefined') profileFields.favorites.movies = req.body.movies.split(',');
  if(typeof req.body.outdoorActivities !== 'undefined') profileFields.favorites.outdoorActivities = req.body.outdoorActivities.split(',');

  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(profile){
             // Profile exists, update profile
              Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
              )
                    .then(profile => res.json(profile))
                    .catch(err => console.log(err));
           }
         })
         .catch(err => console.log(err));
})

module.exports = router;

