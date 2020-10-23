import * as dayjs from 'dayjs'
import {GraphQLClient} from 'graphql-request'
import {BadRequestException, Injectable} from '@nestjs/common'

import {Link} from 'src/models/graphql.schema'
import {getGQLClient} from 'src/api/graphqlRequest'
import {
  CREATE_LINK,
  FIND_ALL_LINKS,
  UPDATE_LINK,
  FIND_LINK_BY_ID,
  FIND_LINK_BY_TITLE,
  FIND_LINK_BY_DESTINATION,
} from 'src/models/gqlRequests'
import {
  CreateLinkModel,
  FindAllLinksModel,
  FindLinkByIdModel,
  FindLinkByTitleModel,
  FindLinkByDestinationModel,
  LinkInput,
  LinkModel,
  UpdateLinkModel,
} from 'src/models/models'

@Injectable()
export class LinkService {
  private gqlClient: GraphQLClient

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findAllLinks(): Promise<[LinkModel]> {
    const response = await this.gqlClient.request<FindAllLinksModel>(
      FIND_ALL_LINKS,
    )

    return response.findAllLinks.data
  }

  async findLinkById(id: string): Promise<LinkModel> {
    const response = await this.gqlClient.request<FindLinkByIdModel>(
      FIND_LINK_BY_ID,
      {id},
    )

    return response.findLinkByID
  }

  async createLink(input: LinkInput): Promise<LinkModel> {
    const valid = await this.validateTitleAndDestination(
      input.title,
      input.destination,
    )

    if (!valid) {
      throw new BadRequestException(
        'A link with this name or URL already exists. Please use a different name.',
      )
    }

    const response = await this.gqlClient.request<CreateLinkModel>(
      CREATE_LINK,
      {
        input: {
          ...input,
          addedTs: dayjs()
            .valueOf()
            .toString(),
        },
      },
    )

    return response.createLink
  }

  async updateLink(id: string, input: Link): Promise<LinkModel> {
    const valid = await this.validateTitleAndDestination(
      input.title,
      input.destination,
      id,
    )

    if (!valid) {
      throw new BadRequestException(
        'A link with this name or URL already exists. Please use a different name.',
      )
    }

    const response = await this.gqlClient.request<UpdateLinkModel>(
      UPDATE_LINK,
      {id, input},
    )

    return response.updateLink
  }

  private async validateTitleAndDestination(
    title: string,
    destination: string,
    linkId?: string,
  ): Promise<boolean> {
    const titleResponse = await this.gqlClient.request<FindLinkByTitleModel>(
      FIND_LINK_BY_TITLE,
      {title},
    )
    const existingTitleLink = titleResponse.findLinkByTitle

    if (
      existingTitleLink &&
      (!linkId || (linkId && existingTitleLink._id !== linkId))
    ) {
      return false
    }

    const urlResponse = await this.gqlClient.request<
      FindLinkByDestinationModel
    >(FIND_LINK_BY_DESTINATION, {destination})
    const existingUrlLink = urlResponse.findLinkByDestination

    return existingUrlLink && linkId
      ? existingUrlLink._id === linkId
      : !existingUrlLink
  }
}
