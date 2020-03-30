const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  handle: {
    type: String
  },
  imageOrVideo: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  likes: [{
    user: {
      type: schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
    user: {
      type: schema.Types.ObjectId,
      ref: 'true'
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('posts', postSchema);