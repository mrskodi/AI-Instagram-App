import axios from 'axios';

const setAuthToken = (token) => {
  if(token){
    // Attach the token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else{
    // Delete token from request
    delete axios.defaults.headers.common['Authorization']
  }
};

export default setAuthToken;