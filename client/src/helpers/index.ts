import dayjs from 'dayjs'
import tinycolor from 'tinycolor2'

export const authTokenKey = 'x-cgen-auth'
export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/

export const formatDate = (ts: string) => {
  const date = dayjs(parseInt(ts))

  return `${date.format('D MMM YYYY')} at ${date.format('HH:mm')}`
}

export const hexToRgba = (hex: string, opacity = 1): string => {
  const color = tinycolor(hex)

  color.setAlpha(opacity)

  return color.toRgbString()
}

export const colorForHover = (hex: string): string => {
  const color = tinycolor(hex)

  return color.isLight()
    ? color
        .clone()
        .darken(8)
        .toHexString()
    : color
        .clone()
        .lighten(8)
        .toHexString()
}
