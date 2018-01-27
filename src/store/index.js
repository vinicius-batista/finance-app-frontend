'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import base from './base'
import auth from './auth'
import expense from './expense'
import user from './user'

Vue.use(Vuex)

const modules = {
  base,
  auth,
  expense,
  user
}

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
