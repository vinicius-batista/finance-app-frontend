'use strict'

import http from './http'

export const info = async () =>
  http.get('users')

export const updateInfo = async (data) =>
  http.put('users', data)

export const storeMoneyControl = async (data) =>
  http.post('users/money-control', data)

export const fetchMoneySpent = async () =>
  http.get('users/money-spent')
