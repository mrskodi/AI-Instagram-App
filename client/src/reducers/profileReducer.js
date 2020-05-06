import { 
  GET_PROFILE, 
  GET_PROFILES,
  GET_PROFILES_BY_LIKES, 
  PROFILE_LOADING, 

  CLEAR_CURRENT_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CLEAR_CURRENT_PROFILES,
  CLEAR_ERRORS

} from "../action/dispatchTypes";

const initialState = {
  // profile: {},
  // profiles: [],
  // loading: false

  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action){
  switch(action.type){
    case PROFILE_LOADING:
      return{
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return{
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    // case GET_PROFILES_BY_LIKES:
    //   return {
    //     // add action.payload to the profiles[] in state.
    //     ...state,
        
    //   };
    case CLEAR_CURRENT_PROFILE:
     return {
       ...state,
       profile: null
     };
     case FOLLOW_USER:
      return{
        ...state,       
        loading: false
      };
      case UNFOLLOW_USER:
      return{
        ...state,       
        loading: false
      };     
     case CLEAR_CURRENT_PROFILES:
       return {
         ...state,
         profiles: null
       }
     default:
       return state;
  }
}