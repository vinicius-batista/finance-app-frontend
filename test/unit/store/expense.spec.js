import { assert } from 'chai'
import mutations from '@/store/expense/mutations'
import getters from '@/store/expense/getters'
const { ADD_PAGINATION, UPDATE_PAGES, UPDATE, REMOVE_ALL } = mutations
const { categoryIcon } = getters

describe('Expense module in store', () => {
  const state = {
    expenses: [],
    page: 0,
    lastPage: 1,
    categories: [
      { icon: 'fa-cube', name: 'General' },
      { icon: 'fa-cutlery', name: 'Food' },
      { icon: 'fa-home', name: 'House' }
    ]
  }
  test('ADD_PAGINATION mutation', () => {
    const newExpenses = [
      {
        id: 1,
        date: '2018-12-1',
        details: 'test',
        category: 'food',
        amount: 22.22
      },
      {
        id: 2,
        date: '2017-12-1',
        details: 'test 2',
        category: 'food',
        amount: 22.22
      },
      {
        id: 3,
        date: '2018-12-1',
        details: 'test 3',
        category: 'food',
        amount: 22.22
      }
    ]

    ADD_PAGINATION(state, newExpenses)
    assert.deepEqual(state.expenses, newExpenses)
  })

  test('UPDATE_PAGES mutation', () => {
    const pages = {
      page: 1,
      lastPage: 10
    }
    UPDATE_PAGES(state, pages)
    assert.equal(state.page, 1)
    assert.equal(state.lastPage, 10)
  })

  test('UPDATE expenses mutation', () => {
    const expense = {
      id: 1,
      date: '2018-12-1',
      details: 'test 123',
      category: 'home',
      amount: 22.22
    }
    UPDATE(state, expense)
    assert.deepEqual(state.expenses[0], expense)
  })

  test('REMOVE_ALL mutation', () => {
    REMOVE_ALL(state)
    assert.deepEqual(state.expenses, [])
  })

  test('categoryIcon getter', () => {
    const icon = categoryIcon(state)('Food')
    assert.equal(icon, 'fa-cutlery')
  })
})
