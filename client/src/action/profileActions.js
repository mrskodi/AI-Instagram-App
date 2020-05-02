// import { GET_ERRORS, GET_PROFILE } from './dispatchTypes';
// import axios from 'axios';

// export const getCurrentProfile = () => dispatch => {
//   axios.get('/api/profiles')
//       .then(res => {
//         console.log(`User Profile: ${res}`);
//         dispatch({
//           type: GET_PROFILE,
//           payload: res.data
//         })
//       })
//       .catch(err => {
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       })
// }

// export const getProfileByHandle = handle => dispatch => {
//   axios.get(`/api/profiles/handle/${handle}`)
//       .then(res => {
//         console.log(`User Profile: ${res}`);
//         dispatch({
//           type: GET_PROFILE,
//           payload: res.data
//         })
//       })
//       .catch(err => {
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       })
// }