import {Injectable} from '@nestjs/common'
import {GraphQLClient} from 'graphql-request'

import GQL from 'src/models/gqlRequests'
import {getGQLClient} from 'src/api/graphqlRequest'
import {Settings, SettingsInput} from 'src/models/graphql.schema'
import {CreateSettings, UpdateSettings} from 'src/models/override.model'

@Injectable()
export class SettingsService {
  private gqlClient: GraphQLClient
  private settingsGql = GQL.SETTINGS

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async createSettings(input: SettingsInput): Promise<Settings> {
    const {createSettings: response} = await this.gqlClient.request<
      CreateSettings
    >(this.settingsGql.CREATE_SETTINGS, {input})

    return response
  }

  async updateSettings(id: string, input: SettingsInput): Promise<Settings> {
    const {updateSettings: response} = await this.gqlClient.request<
      UpdateSettings
    >(this.settingsGql.UPDATE_SETTINGS, {id, input})

    return response
  }
}
