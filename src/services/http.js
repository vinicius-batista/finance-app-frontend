'use strict'

import axios from 'axios'
import { getCookie, setCookie } from 'tiny-cookie'
import { ifElse, equals, compose, and, assocPath, not } from 'ramda'
import store from '../main'

const http = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/'
})

const requestSuccess = (config) => ({
  ...config,
  headers: {
    'Accept': 'application/json',
    authorization: `Bearer ${getCookie('access_token')}`,
    'x-refresh-token': getCookie('refresh_token'),
    'x-retry': getCookie('retry')
  }
})

http.interceptors.request.use(requestSuccess, (error) => Promise.reject(error))

const responseSuccess = (response) => {
  setCookie('retry', false, { expires: '2Y' })
  return response
}

const dealWithRefreshToken = async (status, request) => {
  setCookie('retry', true, { expires: '2Y' })
  await store.dispatch('auth/refreshToken')

  const newToken = `Bearer ${getCookie('access_token')}`
  const newRequest = assocPath(['headers', 'authorization'], newToken, request)

  return http.request(newRequest)
}

const responseError = (error) => {
  const originalRequest = error.config
  const { baseURL, url } = originalRequest

  const isLogin = equals(url, `${baseURL}auth/login`)
  const notRetry = equals('false', originalRequest.headers['x-retry'])
  const notLoginAndNotRetry = and(not(isLogin), notRetry)
  const andStatus401 = compose(and(notLoginAndNotRetry), equals(401))

  const isError401 = ifElse(
    andStatus401,
    dealWithRefreshToken,
    async () => Promise.reject(error)
  )
  return isError401(error.response.status, originalRequest)
}

http.interceptors.response.use(responseSuccess, responseError)

export default http
