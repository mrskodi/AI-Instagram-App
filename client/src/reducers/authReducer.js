import { SET_CURRENT_USER, GET_USER_PROFILE } from '../action/dispatchTypes';
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  userProfile: {}
};

export default function(state=initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    default:
      return state
  }
}