'use strict'

import { store, paginate, update, destroy } from '@/services/expenses'

export default {
  async create ({ commit, dispatch }, expense) {
    try {
      await store(expense)
      commit('REMOVE_ALL')
      commit('UPDATE_PAGES', { page: 0, lastPage: 1 })
    } catch (error) {
      throw error.response.data
    }
  },
  async getPage ({ commit }, page) {
    try {
      const response = await paginate(page, 10)
      const { data, lastPage } = response.data

      commit('UPDATE_PAGES', { page, lastPage })
      commit('ADD_PAGINATION', data)
    } catch (error) {
      throw error.response.data
    }
  },
  async update ({ commit }, expense) {
    try {
      const response = await update(expense)
      commit('UPDATE', response.data)
    } catch (error) {
      throw error.response.data
    }
  },
  async remove ({ commit }, id) {
    try {
      await destroy(id)
      commit('REMOVE_ALL')
      commit('UPDATE_PAGES', { page: 0, lastPage: 1 })
    } catch (error) {
      throw error.response.data
    }
  }
}
