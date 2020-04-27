import { SET_CURRENT_USER, GET_ERRORS } from './dispatchTypes';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => 
dispatch => {
  axios
    .post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
} 

//Login user
export const loginUser = (userData) => dispatch => {
  // Make axios call /api/users/login
  axios
      .post('/api/users/login', userData)
      .then( res => {
        // Login successful
        // Get token as response back from api
        const {token} = res.data;
        // save the token to local storage
        localStorage.setItem('jwtToken', token);
        // set the token to axios auth header
        setAuthToken(token);
        // decode the token to get user id, name and avatar
        const decoded = jwt_decode(token);
        // Dispatch SET_CURRENT_USER with payload = decoded user information
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        })
       }
      )
      .catch(err => {
        // errors received as response from api call
        // dispatch GET-ERRORS
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }); 
      })
}

//Logout user action - gets called when user clicks on logout on the UI and when token is expired
export const logoutUser = () => 
  dispatch => {
    //Redirect user login
    window.location.href = '/login';
    //Remove from localstorage
    localStorage.removeItem('jwtToken');
    //Remove from auth header
    setAuthToken(false);
    //Clean up from redux store
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  }

