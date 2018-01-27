'use strict'

import { propEq, findIndex } from 'ramda'

export default {
  ADD_PAGINATION (state, expense) {
    const { expenses } = state
    expenses.push(expense)
  },
  UPDATE_PAGES (state, pages) {
    state.page = pages.page
    state.lastPage = pages.lastPage
  },
  UPDATE (state, expense) {
    const { expenses } = state
    const { id } = expense
    const matchId = propEq('id', id)
    const index = findIndex(matchId)(expenses)
    expenses.splice(index, 1, expense)
  },
  REMOVE_ALL (state) {
    const { expenses } = state
    expenses.splice(0)
  }
}
