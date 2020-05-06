import axios from "axios"
import { 
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  SET_CURRENT_USER,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "./dispatchTypes"

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
  .get(`/api/profiles/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }) 
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(clearErrors());
  dispatch(clearCurrentProfile());
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profiles')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Follow user provided user handle
export const followUserByHandle = handle => dispatch => { 
  axios
  .post(`/api/profiles/follow/handle/${handle}`)
    .then(res =>
      dispatch({
        type: FOLLOW_USER,
        payload: res.data,
      }) 
    )  
};

// Unfollow user provided user handle
export const unFollowUserByHandle = handle => dispatch => { 
  axios
  .post(`/api/profiles/unfollow/handle/${handle}`)
    .then(res =>
      dispatch({
        type: UNFOLLOW_USER,
        payload: res.data,
      }) 
    )  
};
// // Clear current profiles[]
// export const clearCurrentProfiles = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILES
//   }
// }
