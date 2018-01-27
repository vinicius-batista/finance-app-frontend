'use strict'

import { split, join, ifElse, map } from 'ramda'

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

export const parseDate = (date) => {
  const splitAndJoin = (date) => {
    const dateSplited = split('/', date)
    const [month, day, year] = map((e) => e.padStart(2, '0'), dateSplited)

    return join('-', [year, month, day])
  }

  const parseCond = ifElse(
    (date) => !date,
    (date) => date,
    splitAndJoin
  )
  return parseCond(date)
}
