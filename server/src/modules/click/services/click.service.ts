import * as dayjs from 'dayjs'
import {Injectable} from '@nestjs/common'
import {GraphQLClient} from 'graphql-request'

import GQL from 'src/models/gqlRequests'
import {getGQLClient} from 'src/api/graphqlRequest'
import {Click, ClickInput, ClickPage} from 'src/models/graphql.schema'
import {
  ClickCountByOwner,
  CreateClick,
  FindClicksByOwner,
} from 'src/models/override.model'

@Injectable()
export class ClickService {
  private gqlClient: GraphQLClient
  private clickGql = GQL.CLICK

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findAllClicksByOwner(owner: string): Promise<ClickPage> {
    const {findClicksByOwner: response} = await this.gqlClient.request<
      FindClicksByOwner
    >(this.clickGql.FIND_CLICKS_BY_OWNER, {owner})

    return response
  }

  async createClick(input: ClickInput): Promise<Click> {
    const {createClick: response} = await this.gqlClient.request<CreateClick>(
      this.clickGql.CREATE_CLICK,
      {
        input: {
          ...input,
          clickedTs: dayjs()
            .valueOf()
            .toString(),
        },
      },
    )

    return response
  }

  async clickCountByOwner(owner: string): Promise<number> {
    const {clickCountByOwner: response} = await this.gqlClient.request<
      ClickCountByOwner
    >(this.clickGql.CLICK_COUNT_BY_OWNER, {owner})

    return response
  }
}
