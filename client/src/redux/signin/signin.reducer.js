import {
  SET_USER_DATA
} from './signin.actionTypes'

const initialState = {
  userData: {
    userId: `` || localStorage.getItem('userId'),
    userToken: `` || localStorage.getItem('userToken'),
    username: `` || localStorage.getItem('username')
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
          username: action.payload.name
        }
      }
    default:
      return state
  }
}

export default reducer