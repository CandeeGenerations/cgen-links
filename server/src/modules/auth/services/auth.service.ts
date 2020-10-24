import {GraphQLClient} from 'graphql-request'
import {Injectable, UnauthorizedException} from '@nestjs/common'

import GQL from 'src/models/gqlRequests'
import {getGQLClient} from 'src/api/graphqlRequest'
import {User, UserInput} from 'src/models/graphql.schema'
import {FindAuthorizedUser, FindUserByGoogleId} from 'src/models/override.model'

@Injectable()
export class AuthService {
  private gqlClient: GraphQLClient
  private userGql = GQL.USER

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findOrCreateUser(user: UserInput): Promise<User> {
    const {findUserByGoogleId: response} = await this.gqlClient.request<
      FindUserByGoogleId
    >(this.userGql.FIND_USER_BY_GOOGLE_ID, {
      googleId: user.googleId,
    })

    if (!response) {
      await this.gqlClient.request(this.userGql.CREATE_USER, {
        input: {...user, authorized: false},
      })

      throw new UnauthorizedException('You are not authorized to log in.')
    }

    if (!response.authorized) {
      throw new UnauthorizedException('You are not authorized to log in.')
    }

    return response
  }

  async findAuthorizedUser(googleId: string): Promise<User> {
    const {findAuthorizedUser: response} = await this.gqlClient.request<
      FindAuthorizedUser
    >(this.userGql.FIND_AUTHORIZED_USER, {
      googleId,
    })

    if (!response) {
      throw new UnauthorizedException('You are not authorized to log in.')
    }

    return response
  }
}
