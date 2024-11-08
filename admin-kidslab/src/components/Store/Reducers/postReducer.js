import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    POST_LOADING,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT
  } from '../../../action/type';
  
  const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: {}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case POST_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case UPDATE_LIKES:
        return {
          ...state,
          posts: state.posts.map(post => post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post),
          loading: false
        };
      case POST_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          loading: false
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          loading:false
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
        case ADD_COMMENT:
          return {
            ...state,
            post:{...state.post,comment:action.payload},
            loading:false
          };
          case REMOVE_COMMENT:
            return {
              ...state,
              post: {...state.post,
                comment:state.post.comment.filter(comments=>comments._id!==action.payload)},
              loading:false
            };
      default:
        return state;
    }
  }
  