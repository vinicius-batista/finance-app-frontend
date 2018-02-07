'use strict'

import { propEq, findIndex, concat, update } from 'ramda'

export default {
  ADD_PAGINATION (state, newExpenses) {
    const { expenses } = state
    state.expenses = concat(newExpenses, expenses)
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
    state.expenses = update(index, expense, expenses)
  },
  REMOVE_ALL (state) {
    state.expenses = []
  }
}
