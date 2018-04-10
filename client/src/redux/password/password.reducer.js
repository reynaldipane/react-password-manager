import {
  GET_USER_PASSWORD,
  FIND_USER_PASSWORD,
  SHOW_USER_PASSWORD,
  SET_SHOW_USER_PASSWORD,
  SET_SHOW_MODAL
} from './password.actionTypes'

const initialState = {
  userPasswords: [],
  passwordToUpdate: {},
  passwordIdToShow: ``,
  passwordToShow: ``,
  showModal: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PASSWORD:
      return {
        ...state,
        userPasswords: action.payload
      };
    case FIND_USER_PASSWORD:
      return {
        ...state,
        passwordToUpdate: action.payload
      }
    case SHOW_USER_PASSWORD:
      return {
        ...state,
        passwordIdToShow: action.payload
      }
    case SET_SHOW_USER_PASSWORD:
      return {
        ...state,
        passwordToShow: action.payload
      }
    case SET_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      }
    default:
      return state
  }
}

export default reducer;