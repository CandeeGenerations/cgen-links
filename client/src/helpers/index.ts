import dayjs from 'dayjs'

export const authTokenKey = 'x-cgen-auth'
export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/

export const formatDate = (ts: string) => {
  const date = dayjs(parseInt(ts))

  return `${date.format('D MMM YYYY')} at ${date.format('HH:mm')}`
}
