const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'users'
  }, 
  website: {
    type: String,
  },
  bio: {
    type: String,
    max: 300
  },
  gender: {
    type: String
  },
  hobbies: {
    type: [String]
  },
  favorites: {
    books:[String],
    movies: [String],
    outdoorActivities: [String]
  },

  following: [{
    user: {
      type: schema.Types.ObjectId,
      ref: 'users'
    },
    handle: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    dateCreated: {
      type: Date,
      default: Date.now()
    }
  }],

  followers: [{
    user: {
      type: schema.Types.ObjectId,
      ref: 'users'
    },
    handle: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    dateCreated: {
      type: Date,
      default: Date.now()
    }
  }]
  
});

module.exports = Profile = mongoose.model('profiles', profileSchema);