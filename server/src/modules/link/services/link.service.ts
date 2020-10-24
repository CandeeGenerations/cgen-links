import * as dayjs from 'dayjs'
import {GraphQLClient} from 'graphql-request'
import {BadRequestException, Injectable} from '@nestjs/common'

import GQL from 'src/models/gqlRequests'
import {getGQLClient} from 'src/api/graphqlRequest'
import {Link, LinkInput, LinkPage} from 'src/models/graphql.schema'
import {
  CreateLink,
  FindLinkByID,
  FindLinksByDestination,
  FindLinksByOwner,
  FindLinksByTitle,
  SoftDeleteLink,
  ToggleActiveLink,
  UpdateLink,
} from 'src/models/override.model'

@Injectable()
export class LinkService {
  private gqlClient: GraphQLClient
  private linkGql = GQL.LINK

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findLinkById(id: string): Promise<Link> {
    const {findLinkByID: response} = await this.gqlClient.request<FindLinkByID>(
      this.linkGql.FIND_LINK_BY_ID,
      {
        id,
      },
    )

    return response
  }

  async findLinksByOwner(owner: string): Promise<LinkPage> {
    const {findLinksByOwner: response} = await this.gqlClient.request<
      FindLinksByOwner
    >(this.linkGql.FIND_LINKS_BY_OWNER, {
      owner,
    })

    return response
  }

  async createLink(input: LinkInput): Promise<Link> {
    await this.validateTitleAndDestination(
      input.owner.connect,
      input.title,
      input.destination,
    )

    const {createLink: response} = await this.gqlClient.request<CreateLink>(
      this.linkGql.CREATE_LINK,
      {
        input: {
          ...input,
          active: true,
          deleted: false,
          addedTs: dayjs()
            .valueOf()
            .toString(),
        },
      },
    )

    return response
  }

  async updateLink(id: string, input: LinkInput): Promise<Link> {
    await this.validateTitleAndDestination(
      input.owner.connect,
      input.title,
      input.destination,
      id,
    )

    const {updateLink: response} = await this.gqlClient.request<UpdateLink>(
      this.linkGql.UPDATE_LINK,
      {
        id,
        input,
      },
    )

    return response
  }

  async toggleActiveLink(id: string, active: boolean): Promise<Link> {
    const {toggleActiveLink: response} = await this.gqlClient.request<
      ToggleActiveLink
    >(this.linkGql.TOGGLE_ACTIVE_LINK, {
      id,
      active,
    })

    return response
  }

  async softDeleteLink(id: string): Promise<Link> {
    const {softDeleteLink: response} = await this.gqlClient.request<
      SoftDeleteLink
    >(this.linkGql.SOFT_DELETE_LINK, {
      id,
    })

    return response
  }

  private async validateTitleAndDestination(
    owner: string,
    title: string,
    destination: string,
    linkId?: string,
  ): Promise<void> {
    const {findLinksByTitle} = await this.gqlClient.request<FindLinksByTitle>(
      this.linkGql.FIND_LINKS_BY_TITLE,
      {owner, title},
    )

    if (
      findLinksByTitle.data.length > 0 &&
      (!linkId || (linkId && findLinksByTitle.data[0]._id !== linkId))
    ) {
      throw new BadRequestException(
        'A link with this title already exists. Please use a different name.',
      )
    }

    const {findLinksByDestination} = await this.gqlClient.request<
      FindLinksByDestination
    >(this.linkGql.FIND_LINKS_BY_DESTINATION, {owner, destination})

    if (
      findLinksByDestination.data.length > 0 &&
      (!linkId || (linkId && findLinksByDestination.data[0]._id !== linkId))
    ) {
      throw new BadRequestException(
        'A link with this URL already exists. Please use a different name.',
      )
    }
  }
}
