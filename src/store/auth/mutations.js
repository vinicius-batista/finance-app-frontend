'use strict'

export default {
  AUTHENTICATE (state) {
    state.logged = true
  },
  UNAUTHENTICATE (state) {
    state.logged = false
  }
}
