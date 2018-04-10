import {
  GET_USER_PASSWORD,
  FIND_USER_PASSWORD,
  SHOW_USER_PASSWORD,
  SET_SHOW_USER_PASSWORD,
  SET_SHOW_MODAL
} from './password.actionTypes'
import axios from 'axios'

export const getUserPassword = (userid) => {
  return (dispatch) => {
    return axios({
      method: `POST`,
      url: `http://localhost:3000/api/passwords/findbyuserid`,
      data: {
        userid: userid
      }
    })
    .then((userPasswords) => {
      userPasswords.data.data.forEach(password => {
        password.show = false
      })
      dispatch(getUserPasswordSuccess(userPasswords.data.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const storePassword = (payload) => {
  return (dispatch) => {
    return axios({
      method: `POST`,
      url: `http://localhost:3000/api/passwords`,
      data: {
        url: payload.url,
        username: payload.username,
        password: payload.password,
        userid: payload.userid
      }
    })
    .then((newData) => {
      console.log(newData)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const findPassword = (payload) => {
  return (dispatch) => {
    return axios({
      method: `GET`,
      url: `http://localhost:3000/api/passwords/findbyid/${payload}`
    })
    .then((password) => {
      dispatch(findPasswordSuccess(password.data.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const updatePassword = (id, payload) => {
  return (dispatch) => {
    return axios({
      method: `PUT`,
      url: `http://localhost:3000/api/passwords/${id}`,
      data: {
        url: payload.url,
        username: payload.username,
        password: payload.password
      }
    })
    .then((resp) => {
      console.log(resp.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const deletePassword = (id) => {
  return (dispatch) => {
    return axios({
      method: `DELETE`,
      url: `http://localhost:3000/api/passwords/${id}`,
    })
    .then(() => {})
    .catch((err) => {
      console.log(err)
    })
  }
}

export const setIdPasswordToShow = (id) => {
  return (dispatch) => {
    dispatch(setIdPasswordToShowSuccess(id))
  }
}


export const showPassword = (userData, passwordId) => {
  return (dispatch) => {
    return axios({
      method: `POST`,
      url: `http://localhost:3000/api/passwords/showpassword`,
      data: {
        username_email: userData.username_email,
        password: userData.password,
        password_id: passwordId
      }
    })
    .then((password) => {
      dispatch(setPasswordToShowSuccess(password.data.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const setShowModal = (payload) => {
  return {
    type: SET_SHOW_MODAL,
    payload: payload
  }
}

const getUserPasswordSuccess = (payload) => {
  return {
    type: GET_USER_PASSWORD,
    payload: payload
  }
}

const findPasswordSuccess = (payload) => {
  return {
    type: FIND_USER_PASSWORD,
    payload: payload
  }
}

const setIdPasswordToShowSuccess = (payload) => {
  return {
    type: SHOW_USER_PASSWORD,
    payload: payload
  }
}

const setPasswordToShowSuccess = (payload) => {
  return {
    type: SET_SHOW_USER_PASSWORD,
    payload: payload
  }
}