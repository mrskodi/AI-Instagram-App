import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE
  } from '../action/dispatchTypes';
  
  const initialState = {
    loading: false,
    profile: null,
    profiles: null
}

export default function (state= initialState, action){
switch(action.type){
    case PROFILE_LOADING: 
        return{
            ...state,
            loading:true
        };
    case GET_PROFILE:
        return{
            ...state,
            loading: false,
            profile: action.payload

        };
    case GET_PROFILES:
        return{
            ...state,
            loading: false,
            profiles: action.payload
        };
     case CLEAR_CURRENT_PROFILE:
         return{
             ...state,
             profile:null
         };
     default:
         return state;
}
}