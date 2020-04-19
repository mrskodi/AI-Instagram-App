const express = require('express');
const Post = require('../../models/Post');
const passport = require('passport');
const validatePostInput = require('../../validations/post');
const validateComment = require('../../validations/comment');
const isEmpty = require('../../validations/isEmpty');

const router = express.Router();

// @route   POST /api/posts
// @access  PRIVATE
// @desc    Create and upload a new audio/video post
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // Validation
  const {errors, isValid} = validatePostInput(req.body);
  
  if(!isValid){
    return res.json(errors);
  }

  const newPost = new Post({
    user: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar,
    handle: req.user.handle,
    text: req.body.text,
    imageOrVideo: req.body.imageOrVideo
  });
  
  newPost.save()
         .then(post => res.json(post))
         .catch(err => console.log(err));
})

// @route   GET /api/posts
// @access  PRIVATE
// @desc    Get all posts
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.find()
      .sort({date: -1})
      .then(posts => res.json(posts))
      .catch(err => res.json({msg: 'No posts found'}));
})

// @route   GET /api/posts/id/:id
// @access  PRIVATE
// @desc    Get single post details based on postid
router.get('/id/:postid', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.postid)
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post with that id found'}));
})

// @route   GET /api/posts/handle/:handle
// @access  PRIVATE
// @desc    Get posts made by a user(unique handle)
router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.find({handle: req.params.handle})
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post made by that user'}));
})

// @route   DELETE /api/posts/id/:id
// @access  PRIVATE
// @desc    Delete a post made by a user based on postid
router.delete('/id/:postid', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findOne({_id: req.params.postid})
      .then(post => {
        // check if the user is the author of the post
        if(post.user.toString() != req.user.id){
          return res.json({unAuthorizedUser: 'Not authorized to delete post'});
        }
        post.remove()
            .then(() => res.json({msg: 'The requested post has been deleted successfully'}))
            .catch(err => res.json({msg: 'Post not found'}));
      })
      .catch(err => console.log(err));
})

// @route   DELETE /api/posts/handle/:handle
// @access  PRIVATE
// @desc    Delete all posts made by the user(unique handle)
router.delete('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findOne({handle: req.params.handle})
      .then(post => {        
        if(post.handle != req.user.handle){
          return res.json({unAuthorizedUser: 'Not authorized to delete posts'})
        }
        post.remove()
            .then(() => res.json({msg: 'Your post has been successfully deleted.'}))
            .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
})

// @router    POST /api/posts/like/:id
// @desc      Like a post based on postId
// @access    Private
router.post('/like/:postId', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.postId)
  .then(post => {
      if(post){
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: 'User already liked this post' });
            }  
             //Check if used alreday disliked the post. If yes, remove user from dislikes array
            if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
                // Get remove index
                const removeIndex = post.dislikes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

                // Splice out of array
                post.dislikes.splice(removeIndex, 1);
            }        
            //Add user id to likes array
            post.likes.unshift({ user: req.user.id });
            //Save post
            post.save().then(post => res.json(post));
        }
     })
     .catch(err => console.log(err)); 
})

// @route   POST api/posts/unlike/:postId
// @desc    Dislike post for given postId
// @access  Private
router.post(
  '/dislike/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {     
      Post.findById(req.params.postId)
        .then(post => {        
            if(post){
                //Check if user alreday disliked the post.
               if (post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {
                  return res.status(400).json({ alreadydisliked: 'User already disliked this post' });
               }
               //Check if used alreday liked the post. If yes, remove user from likes array
               if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                   // Get remove index
                  const removeIndex = post.likes
                  .map(item => item.user.toString())
                  .indexOf(req.user.id);

                  // Splice out of array
                  post.likes.splice(removeIndex, 1);
               }  
               
               //Put user in dislikes array
               post.dislikes.unshift({ user: req.user.id });

              // Save
              post.save().then(post => res.json(post));
          }   
        })
        .catch(err => console.log(err));    
  }
);

// @router    POST /api/posts/comment/:id
// @desc      Comment on a post based on postId
// @access    Private
router.post(
  '/comment/:id', 
  passport.authenticate('jwt', {session: false}), 
  (req, res) => {  
    const {errors, isValid} = validateComment(req.body);
    if(!isValid){
      return res.json(errors);
    }
    Post.findOne({_id: req.params.id})
        .then(post => {
          if(!post){
            return res.json({msg: 'Post not found. Check the post id.'})
          }
          
          // Create a new comment object
          const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: req.user.name,
            handle: req.user.handle,
            avatar: req.user.avatar
          }
          
          // Append this comment to the comments array
          post.comments.unshift(newComment);
          
          // Save
          post.save()
              .then(post => res.json(post))
              .catch(err => console.log(arr));
        })
        .catch(err => console.log(err));
})

// @router    DELETE /api/posts/comment/:post_id/:comment_id
// @desc      Delete a comment from a post
// @access    Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  // Identify the post using post_id
  Post.findById(req.params.post_id)
      .then(post => {
        // identify the comment to be deleted from the comments array in the post - use filter
        if(post.comments
          .filter(comment => comment._id.toString() === req.params.comment_id)
          .length === 0){
            return res.json({commentUnavailable: 'No comment to be deleted'});
        }
        // Comment exists, identify the index of the comment to be deleted 
        const removeIndex = post.comments
                                .map(comment => comment._id.toString())
                                .indexOf(req.params.comment_id);
        // Splice the array
        post.comments.splice(removeIndex, 1);
        // Save
        post.save()
            .then(post => res.json(post))
            .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
})
module.exports = router;