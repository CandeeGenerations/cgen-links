import {Injectable} from '@nestjs/common'
import {GraphQLClient} from 'graphql-request'

import GQL from 'src/models/gqlRequests'
import {getGQLClient} from 'src/api/graphqlRequest'
import {Settings, SettingsInput} from 'src/models/graphql.schema'
import {
  CreateSettings,
  FindSettingsBySlug,
  UpdateSettings,
} from 'src/models/override.model'

@Injectable()
export class SettingsService {
  private gqlClient: GraphQLClient
  private settingsGql = GQL.SETTINGS

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findSettingsBySlug(slug: string): Promise<Settings> {
    const {findSettingsBySlug: response} = await this.gqlClient.request<
      FindSettingsBySlug
    >(this.settingsGql.FIND_SETTINGS_BY_SLUG, {slug})

    return response
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
