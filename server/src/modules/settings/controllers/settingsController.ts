import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common'

import {Settings, SettingsInput} from 'src/models/graphql.schema'
import {SettingsService} from '../services/settings.service'

@Controller('api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('public/:slug')
  findSettingsBySlug(@Param('slug') slug: string): Promise<Settings> {
    return this.settingsService.findSettingsBySlug(slug)
  }

  @Post()
  createSettings(@Body() input: SettingsInput): Promise<Settings> {
    return this.settingsService.createSettings(input)
  }

  @Put(':id')
  updateSettings(
    @Param('id') id: string,
    @Body() input: SettingsInput,
  ): Promise<Settings> {
    return this.settingsService.updateSettings(id, input)
  }
}
