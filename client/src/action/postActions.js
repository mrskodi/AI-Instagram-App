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

// Get all posts in the db
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
  axios.get(`/api/posts/id/${id}`)
      .then(res => {
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

export const postLoading = () => dispatch => {
  return {
    type: POST_LOADING
  }
}

export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
}