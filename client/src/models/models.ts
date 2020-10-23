export interface ConfigModel {
  routingUrl: string
  gClientId: string
}

export interface LinkInput {
  title: string
  destination: string
  description?: string
}

export interface SettingsInput {
  userId: string
  slug: string
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
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

export interface SettingsModel extends SettingsInput {
  _id: string
  _ts: string
}

export interface UserModel extends User {
  _id: string
  _ts: string
}

export interface ErrorModel {
  error?: string
  message: string
  statusCode: number
}

export interface User {
  googleId: string
  email: string
  firstName: string
  lastName: string
}
