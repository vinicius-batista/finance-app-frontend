'use strict'

import { info, updateInfo, storeMoneyControl, fetchMoneySpent } from '@/services/user'

export default {
  async getUser ({ commit }) {
    const response = await info()
    commit('SET_USER', response.data)
  },
  async updateUser ({ commit }, data) {
    try {
      const response = await updateInfo(data)
      commit('SET_USER', response.data)
    } catch (error) {
      throw error.response.data
    }
  },
  async moneyControl ({ commit }, data) {
    try {
      const response = await storeMoneyControl(data)
      commit('SET_USER', response.data)
    } catch (error) {
      throw error.response.data
    }
  },
  async getMoneySpent ({ commit }) {
    try {
      const response = await fetchMoneySpent()
      commit('SET_MONEY_SPENT', response.data)
    } catch (error) {
      throw error.response.data
    }
  }
}
