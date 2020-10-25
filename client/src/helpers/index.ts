import dayjs from 'dayjs'

import {User} from '../models'

export const authTokenKey = 'x-cgen-auth'
export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/

export const formatDate = (ts: string) => {
  const date = dayjs(parseInt(ts))

  return `${date.format('D MMM YYYY')} at ${date.format('HH:mm')}`
}

export const getUserData = (): User => {
  const authToken = localStorage.getItem(authTokenKey)

  return JSON.parse(atob(authToken as string))
}
