import {
  SET_USER_DATA,
  RESET_USER_DATA
} from './signin.actionTypes'

const initialState = {
  userData: {
    userId: `` || localStorage.getItem('userId'),
    userToken: `` || localStorage.getItem('userToken'),
    username: `` || localStorage.getItem('username'),
    email: `` || localStorage.getItem('email')
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: {
          userId: action.payload.id,
          userToken: action.payload.token,
          username: action.payload.name,
          email: action.payload.email
        }
      }
    case RESET_USER_DATA:
      return {
        ...state,
        userData: {
          userId: ``,
          userToken: ``,
          username: ``
        }
      }
    default:
      return state
  }
}

export default reducer