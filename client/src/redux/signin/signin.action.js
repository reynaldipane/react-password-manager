import {
  SET_USER_DATA
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
        dispatch(signInUserSuccess(user.data.data))
      } else {
        alert('Gagal Login !')
      } 
    })
    .catch((err) => {
      alert(`Gagal Login ! ${err}`)
    })
  }
}

const signInUserSuccess = (payload) => {
  console.log('Masuk Sini ', payload)
  return {
    type: SET_USER_DATA,
    payload: payload
  }
}