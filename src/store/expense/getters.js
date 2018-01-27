'use strict'

import { find, propEq, add } from 'ramda'

export default {
  expenses: (state) => state.expenses,
  expensesById: (state) => (id) => {
    const matchId = propEq('id', id)
    return find(matchId)(state.expenses)
  },
  currentPage: (state) => state.page,
  lastPage: (state) => state.lastPage,
  nextPage: (state) => add(state.page, 1),
  categories: (state) => state.categories,
  categoryIcon: (state) => (name) => {
    const matchName = propEq('name', name)
    const { icon } = find(matchName)(state.categories)
    return icon
  }
}
