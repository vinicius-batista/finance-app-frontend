'use strict'

import { getCookie } from 'tiny-cookie'
import { compose, not, equals } from 'ramda'

const isLogged = compose(not, equals(null))

export default {
  logged: isLogged(getCookie('refresh_token'))
}
