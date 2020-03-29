const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
  },
  avatar: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },

  
  // New schema items
  // Set user privacy settings
  // isPrivate: {
  //   type: Boolean,
  //   default: false
  // },
  // Members the user is following.
  // following: [{
    
  // }],
  // // Followers of user
  // followers: [{

  // }],

});

module.exports = User = mongoose.model('users', userSchema);