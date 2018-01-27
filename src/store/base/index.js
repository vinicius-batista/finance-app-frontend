'use strict'

import { lt } from 'ramda'

const isMobile = () => lt(screen.availWidth, 1264)

const state = {
  drawer: !isMobile()
}

const getters = {
  drawer: (state) => state.drawer
}

const mutations = {
  CHANGE_DRAWER (state) {
    state.drawer = !state.drawer
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
