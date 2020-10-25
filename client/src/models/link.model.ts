import {Link} from './index'

export interface LinkModel extends Link {
  clickCount: number
}

export interface LinkPageModel {
  data: LinkModel[]
  after?: string
  before?: string
}
