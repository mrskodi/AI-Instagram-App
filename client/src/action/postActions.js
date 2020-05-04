import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING, CLEAR_ERRORS, GET_ERRORS } from './dispatchTypes';
import axios from 'axios';
import store from '../store';
import isEmpty from '../utils/isEmpty';

// Add Post
export const addPost = (postData, history) => dispatch => {
  axios.post('/api/posts', postData)
      .then(res => {
        const state = store.getState();
        if(!isEmpty(state.errors)){
          // clearErrors
          dispatch(clearErrors());
        }
        
        // add post data to redux store
        dispatch({
          type: ADD_POST,
          payload: res.data
        });
        // Post successful. Send user to dashboard page
        history.push('/dashboard');
      })
      .catch(err => {
        // postData addition to mongodb unsuccessful
        // add err.response.data into store
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

// Get all posts
export const getPosts = () => dispatch => {
  axios.get('/api/posts')
      .then(res => {
        // add posts to redux store
        dispatch({
          type: GET_POSTS,
          payload: res.data
        });

      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

// Get a single Post
export const getPost = id => dispatch => {
  dispatch(clearErrors());
  axios.get(`/api/posts/id/${id}`)
      .then(res => {
        console.log(res.data);
          dispatch({
            type: GET_POST,
            payload: res.data
          })
      })
      .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
      });
}

// Add likes - adds a user to the likes array of a post and get the updated posts list
export const addLike = id => dispatch => {
  axios.post(`/api/posts/like/${id}`)
      .then(res => {
        console.log(res.data);
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

// // Get liked post - write to redux
// export const getLikedPost = postId => dispatch => {
//   axios.post(`api/posts/id/${postId}`)
//       .then(res => {

//       })
//       .catch(err => {
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         });
//       })
// }

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/posts/comment/${postId}`, commentData)
      .then(res => {
        console.log(res.data);
          dispatch({
            type: GET_POST,
            payload: res.data
          })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: null
        })
      });
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res => dispatch({
        type: GET_POST,
        payload: res.data
      }))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
}

// Delete a post
export const deletePost = (postId) => dispatch => {
  axios.delete(`/api/posts/id/${postId}`)
      .then(res => {
        console.log(res.data);
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
}

export const postLoading = () => dispatch => {
  return {
    type: POST_LOADING
  };
}

export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
}