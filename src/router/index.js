'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import auth from '../store/auth'
import { cond, T, not, and, prop, compose } from 'ramda'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const returnToHome = () => router.push({ name: 'home' })
  const returnToDashboard = () => router.push({ name: 'dashboard' })
  const changeTitle = (meta) => {
    document.title = prop('title', meta)
    next()
  }

  const propAuth = prop('auth')
  const notAuth = compose(not, propAuth)

  const isProtectedAndIsNotLogged = (meta, logged) => and(propAuth(meta), not(logged))
  const isNotProtectedAndIsLogged = (meta, logged) => and(notAuth(meta), logged)

  const checkRoute = cond([
    [isProtectedAndIsNotLogged, returnToHome],
    [isNotProtectedAndIsLogged, returnToDashboard],
    [T, changeTitle]
  ])

  checkRoute(to.meta, auth.state.logged)
})

export default router
