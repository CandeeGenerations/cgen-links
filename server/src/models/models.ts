import {Click, Link, User, Settings} from './graphql.schema'

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

export interface LinkModel extends Link {
  _id: string
  _ts: string
  clicks: number
}

export interface ClickModel extends Click {
  _id: string
  _ts: string
}

export interface UserModel extends User {
  _id: string
  _ts: string
}

export interface SettingsModel extends Settings {
  _id: string
  _ts: string
}

export interface FindAllLinksModel {
  findAllLinks: {
    data: [LinkModel]
  }
}

export interface FindLinkByIdModel {
  findLinkByID: LinkModel
}

export interface FindLinkByTitleModel {
  findLinkByTitle: LinkModel
}

export interface FindLinkByDestinationModel {
  findLinkByDestination: LinkModel
}

export interface CreateLinkModel {
  createLink: LinkModel
}

export interface UpdateLinkModel {
  updateLink: LinkModel
}

export interface FindAllClicksModel {
  findAllClicks: {
    data: [ClickModel]
  }
}

export interface FindAllClicksByLinkIdModel {
  findAllClicksByLinkId: {
    data: [ClickModel]
  }
}

export interface CreateClickModel {
  createClick: ClickModel
}

export interface CreateUserModel {
  createUser: UserModel
}

export interface FindUserByGoogleIdModel {
  findUserByGoogleId: UserModel
}

export interface FindAuthorizedUserModel {
  findAuthorizedUser: UserModel
}

export interface FindSettingsByUserIdModel {
  findSettingsByUserId: SettingsModel
}

export interface CreateSettingsModel {
  createSettings: SettingsModel
}

export interface UpdateSettingsModel {
  updateSettings: SettingsModel
}
