export default function userReducer(state = defaultState, action) {
  let newUser, user, resp;
  switch (action.type) {
    case "LOADING_QUERY":
      return {
        ...state,
        loading: true
      }
    case "SIGN_IN":
      resp = action.payload;
      user = {
        id: resp.id,
        username: resp.username,
        email: resp.email,
        image: resp.image
      }
      return {
        ...state,
        user: user,
        error: false,
        loading: false
      }
    case "REGISTER_NEW_USER":
      resp = action.payload;
      user = {
        id: resp.id,
        username: resp.username,
        email: resp.email,
        image: resp.image
      }
      return {
        ...state,
        user: user,
        error: false,
        loading: false
      }
    case "GET_CURRENT_USER":
      resp = action.payload;
      user = {
        id: resp.id,
        username: resp.username,
        email: resp.email,
        image: resp.image
      }
      return {
        ...state,
        user: user,
        error: false,
        loading: false
      }
    case "UPDATE_USER_ACCOUNT":
      resp = action.payload;
      newUser = {
        id: resp.id,
        username: resp.username,
        email: resp.email,
        image: resp.image
      }
      return {
        ...state,
        user: newUser,
        error: false,
        loading: false
      };
    case "SIGN_OUT":
      return defaultState
    case "SIGN_IN_ERROR":
      return {
        ...state,
        error: true
      }
    case 'RESET_ERROR':
      return {
        ...state,
        error: false
      }
    default:
      return state;
  }
}

const defaultState = {
  user: {},
  error: false,
  loading: false
}