'use strict'

import http from './http'

export const store = async (expense) =>
  http.post('expenses/', expense)

export const paginate = async (page, limit) =>
  http.get(`expenses/?page=${page}&limit=${limit}`)

export const update = async (expense) =>
  http.put(`expenses/${expense.id}`, expense, {
  })

export const destroy = async (id) =>
  http.delete(`expenses/${id}`)
