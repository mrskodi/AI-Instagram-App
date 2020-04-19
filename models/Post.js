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
    type: String    
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
  dilikes: [{
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
    handle: {
      type: String
    },
    avatar: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    }
  }],
  postDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('posts', postSchema);