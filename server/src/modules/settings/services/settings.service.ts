import {Injectable} from '@nestjs/common'
import {GraphQLClient} from 'graphql-request'

import {getGQLClient} from 'src/api/graphqlRequest'
import {
  CREATE_SETTINGS,
  FIND_SETTINGS_BY_USER_ID,
  UPDATE_SETTINGS,
} from 'src/models/gqlRequests'
import {
  CreateSettingsModel,
  FindSettingsByUserIdModel,
  SettingsInput,
  SettingsModel,
  UpdateSettingsModel,
} from 'src/models/models'

@Injectable()
export class SettingsService {
  private gqlClient: GraphQLClient

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findSettingsByUserId(userId: string): Promise<SettingsModel> {
    const response = await this.gqlClient.request<FindSettingsByUserIdModel>(
      FIND_SETTINGS_BY_USER_ID,
      {userId},
    )

    return response.findSettingsByUserId
  }

  async createSettings(input: SettingsInput): Promise<SettingsModel> {
    const response = await this.gqlClient.request<CreateSettingsModel>(
      CREATE_SETTINGS,
      {input},
    )

    return response.createSettings
  }

  async updateSettings(
    id: string,
    input: SettingsInput,
  ): Promise<SettingsModel> {
    const response = await this.gqlClient.request<UpdateSettingsModel>(
      UPDATE_SETTINGS,
      {id, input},
    )

    return response.updateSettings
  }
}
