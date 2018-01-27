'use strict'

import http from './http'

export const login = async (email, password) =>
  http.post('auth/login', { email, password })

export const register = async (user) =>
  http.post('auth/register', user)

export const newToken = async () =>
  http.get('auth/refresh-token')

export const logout = async () =>
  http.post('auth/logout')

export const resetPassword = async (passwords) =>
  http.post('auth/reset-password', passwords)
