import {
  Click,
  ClickPage,
  Link,
  LinkPage,
  Settings,
  User,
} from './graphql.schema'

export interface ReorderModel {
  ids: string[]
  owner: string
}

export interface ConfigModel {
  gClientId: string
  ipUrl: string
}

export interface LinkModel extends Link {
  clickCount: number
}

export interface LinkPageModel {
  data: LinkModel[]
  after?: string
  before?: string
}

export interface FindUserByGoogleId {
  findUserByGoogleId: User
}

export interface FindAuthorizedUser {
  findAuthorizedUser: User
}

export interface FindUserById {
  findUserByID: User
}

export interface FindSettingsBySlug {
  findSettingsBySlug: Settings
}

export interface CreateSettings {
  createSettings: Settings
}

export interface UpdateSettings {
  updateSettings: Settings
}

export interface FindLinkByID {
  findLinkByID: Link
}

export interface FindLinksByOwner {
  findLinksByOwner: LinkPage
}

export interface FindActiveLinksByOwner {
  findActiveLinksByOwner: LinkPage
}

export interface FindLinksByTitle {
  findLinksByTitle: LinkPage
}

export interface FindLinksByDestination {
  findLinksByDestination: LinkPage
}

export interface CreateLink {
  createLink: Link
}

export interface UpdateLink {
  updateLink: Link
}

export interface ToggleActiveLink {
  toggleActiveLink: Link
}

export interface SoftDeleteLink {
  softDeleteLink: Link
}

export interface FindClicksByOwner {
  findClicksByOwner: ClickPage
}

export interface CreateClick {
  createClick: Click
}

export interface ClickCountByOwner {
  clickCountByOwner: number
}
