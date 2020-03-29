const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
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

  
  
});

module.exports = Profile = mongoose.model('profiles', profileSchema);