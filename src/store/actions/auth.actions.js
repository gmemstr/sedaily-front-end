import axios from 'axios'
import { apiConfig } from '../../../config/apiConfig'
const BASE_URL = apiConfig.BASE_URL

export default {
  login: ({ commit, state }, { username, password }) => {
    return axios.post(`${BASE_URL}/auth/login`,
      {
        username,
        password
      })
      .then((response) => {
        commit('setToken', { token: response.data.token })
        return response
      })
      .catch((error) => {
        // @TODO: Add pretty pop up here
        console.log(error)
        alert(error.response.data.message)
        return error
      })
  },

  logout: ({ commit }) => {
    commit('setToken', { token: '' })
  },

  register: ({ commit, state }, { password, username, bio, website, name, email, newsletter }) => {
    return axios.post(`${BASE_URL}/auth/register`, {
      username,
      bio,
      password,
      website,
      name,
      email,
      newsletter
    })
      .then((response) => {
        commit('setToken', { token: response.data.token })
        return response
      })
      .catch((error) => {
      // @TODO: Add pretty pop up here
        console.log(error.response)
        alert(error.response.data.message)
        return error
      })
  },

  sendForgotPasswordEmail: ({ commit, state }, { email }) => {
    return axios.post(`${BASE_URL}/users/request-password-reset`,
      {
        email
      })
  },

  regainAccount: ({ commit, state }, { newPassword, resetUID, secretKey }) => {
    return axios.post(`${BASE_URL}/users/regain-password`,
      {
        newPassword,
        resetUID,
        secretKey
      })
  }
}
