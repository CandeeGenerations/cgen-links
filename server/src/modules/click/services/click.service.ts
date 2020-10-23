import {Injectable} from '@nestjs/common'
import {GraphQLClient} from 'graphql-request'

import {Click} from 'src/models/graphql.schema'
import {getGQLClient} from 'src/api/graphqlRequest'
import {
  CREATE_CLICK,
  FIND_ALL_CLICKS,
  FIND_ALL_CLICKS_BY_LINK_ID
} from 'src/models/gqlRequests'
import {
  ClickModel,
  CreateClickModel,
  FindAllClicksByLinkIdModel,
  FindAllClicksModel,
} from 'src/models/models'

@Injectable()
export class ClickService {
  private gqlClient: GraphQLClient

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findAllClicks(): Promise<[ClickModel]> {
    const response = await this.gqlClient.request<FindAllClicksModel>(
      FIND_ALL_CLICKS,
    )

    return response.findAllClicks.data
  }

  async findAllClicksByLinkId(linkId: string): Promise<[ClickModel]> {
    const response = await this.gqlClient.request<FindAllClicksByLinkIdModel>(
      FIND_ALL_CLICKS_BY_LINK_ID,
      {linkId},
    )

    return response.findAllClicksByLinkId.data
  }

  async createClick(input: Click): Promise<ClickModel> {
    const response = await this.gqlClient.request<CreateClickModel>(
      CREATE_CLICK,
      {input},
    )

    return response.createClick
  }
}
