import { SET_CURRENT_USER } from '../action/dispatchTypes';
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  userFollowers: null,
};

export default function(state=initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    // case FOLLOW_USER:
    //     return{
    //       ...state,     
    //       userFollowers: action.payload,  
    //       loading: false
    //     };
    // case UNFOLLOW_USER:
    //     return{
    //       ...state,
    //       userFollowers: action.payload,
    //       loading: false
    //     };  
    default:
      return state
  }
}