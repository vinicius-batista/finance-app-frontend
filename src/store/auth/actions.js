'use strict'

import { register, login, newToken, logout, resetPassword } from '@/services/auth'
import { setCookie, removeCookie } from 'tiny-cookie'
import router from '../../router'

export default {
  async register (context, user) {
    try {
      await register(user)
    } catch (error) {
      throw error.response.data
    }
  },
  async login ({ commit }, { email, password }) {
    try {
      const response = await login(email, password)
      const { token, refreshToken } = response.data
      setCookie('access_token', token, { expires: '2Y' })
      setCookie('refresh_token', refreshToken, { expires: '2Y' })
      commit('AUTHENTICATE')
    } catch (error) {
      throw error.response.data
    }
  },
  async refreshToken ({ commit }) {
    try {
      const response = await newToken()
      const { token } = response.data
      setCookie('access_token', token, { expires: '2Y' })
    } catch (error) {
      commit('UNAUTHENTICATE')
      removeCookie('access_token')
      removeCookie('refresh_token')
      router.push({ name: 'home' })
    }
  },
  async logout ({ commit }) {
    await logout()
    commit('UNAUTHENTICATE')
    removeCookie('access_token')
    removeCookie('refresh_token')
  },
  async resetPass (context, passwords) {
    return resetPassword(passwords)
  }
}
