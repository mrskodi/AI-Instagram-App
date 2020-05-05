import { ADD_POST, GET_POST, GET_POSTS, CLER_ERRORS, POST_LOADING, GET_LIKED_USERS } from '../action/dispatchTypes';

const initialState = {
  post: {},
  postLikes: [],
  posts: [],
  loading: false
}

export default function(state = initialState, action){
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    // case GET_LIKED_USERS:
    //   return {
    //     ...state,
    //     postLikes: action.payload       
    //   }
    default:
      return state
  }
}