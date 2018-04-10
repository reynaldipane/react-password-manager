import {
  SET_USER_DATA, 
  RESET_USER_DATA
} from './signin.actionTypes'

import axios from 'axios'

export const signInUser = (payload) => {
  return (dispatch) => {
    return axios({
      method: `POST`,
      url: `http://localhost:3000/api/users/signin`,
      data: {
        username_email: payload.username_email,
        password: payload.password
      }
    })
    .then((user) => {
      if (user.status === 200) {
        alert('Success Login !')
        localStorage.setItem('userId', user.data.data.id)
        localStorage.setItem('userToken', user.data.data.token)
        localStorage.setItem('username', user.data.data.name)
        localStorage.setItem('email', user.data.data.email)
        dispatch(signInUserSuccess(user.data.data))
      } else {
        alert('Login Failed !')
      } 
    })
    .catch((err) => {
      alert(`Login Failed ! ${err}`)
    })
  }
}

export const signUpUser = (payload) => {
  return (dispatch) => {
    return axios({
      method: `POST`,
      url: `http://localhost:3000/api/users/signup`,
      data: {
        username: payload.username,
        password: payload.password,
        name: payload.name,
        email: payload.email,
        gender: payload.gender
      }
    })
    .then((user) => {
      if (user.status === 200) {
        alert('Sign Up Success !')
        localStorage.setItem('userId', user.data.data.id)
        localStorage.setItem('userToken', user.data.data.token)
        localStorage.setItem('username', user.data.data.name)
        localStorage.setItem('email', user.data.data.email)
        dispatch(signInUserSuccess(user.data.data))
      } else {
        alert('Sign Up Failed !')
      } 
    })
    .catch((err) => {
      alert(`Failed,please check your username or email !`)
      this.history.pushState('/signup')
    })
  }
}

export const signOutUser = () => {
  return (dispatch) => {
    dispatch(signOutUserSuccess())
  }
}

const signInUserSuccess = (payload) => {
  return {
    type: SET_USER_DATA,
    payload: payload
  }
}

const signOutUserSuccess = () => {
  return {
    type: RESET_USER_DATA
  }
}