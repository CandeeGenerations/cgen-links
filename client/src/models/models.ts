import {Settings} from 'http2'

export interface ConfigModel {
  routingUrl: string
  gClientId: string
}

export interface LinkInput {
  title: string
  destination: string
  description?: string
}

export interface ColorsInput {
  primary?: string
  secondary?: string
}

export interface SocialLinksInput {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
}

export interface SettingsInput {
  slug: string
  logoUrl?: string
  colors?: ColorsInput
  socialLinks?: SocialLinksInput
}

export interface Link extends LinkInput {
  addedTs: string
}

export interface Click {
  linkId: string
  clickedTs: string
  ipAddress?: string
  language?: string
  userAgent?: string
  country?: string
  region?: string
  city?: string
}

export interface LinkModel extends Link {
  _id: string
  _ts: string
}

export interface ClickModel extends Click {
  _id: string
  _ts: string
}

export interface SettingsModel extends Settings {
  _id: string
  _ts: string
}

export interface ErrorModel {
  error: string
  message: string
  statusCode: number
}

export interface User {
  googleId: string
  email: string
  firstName: string
  lastName: string
}
