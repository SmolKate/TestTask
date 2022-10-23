
let preloadedState;
const persistedUsers = localStorage.getItem('redux_store')

if (persistedUsers && JSON.parse(persistedUsers).users) {
  preloadedState = {
    auth: JSON.parse(persistedUsers).auth,
    error: JSON.parse(persistedUsers).error,
    error_text: JSON.parse(persistedUsers).error_text,
    users: JSON.parse(persistedUsers).users
  }
}else{
  preloadedState = {
    users: [],
    auth: null,
    error: false,
    error_text: '',
  }
}

export default function rootReducer(state = preloadedState, action) {
  switch (action.type) {
    case 'ADD_USER':{
      return {
        ...state,
        users: [...state.users, {
          username: action.payload.username,
          password: action.payload.password,
          email: action.payload.email
          
        }],
        auth: null,
        error: false,
        error_text: '',
      }
    }
    case 'LOG_IN' : {
      return {
        ...state,
        auth: action.payload,
        error: false,
        error_text: ''
      }
    }
    case 'FAILURE' : {
      return {
        ...state,
        error: action.payload.error,
        error_text: action.payload.text
      }
    }
    case 'LOG_OUT' : {
      return {
        ...state,
        auth: null,
        error: false,
        error_text: '',
      }
    }
    default:
      return state
  }
}
