'use strict'

import { split, join, ifElse } from 'ramda'

export const formatDate = (date) => {
  const splitAndJoin = (date) => {
    const [year, month, day] = split('-', date)
    return join('/', [month, day, year])
  }
  const formatCond = ifElse(
    (date) => !date,
    (date) => date,
    splitAndJoin
  )

  return formatCond(date)
}
