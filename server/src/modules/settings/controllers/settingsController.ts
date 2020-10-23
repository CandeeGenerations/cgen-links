import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common'

import {SettingsService} from '../services/settings.service'
import {SettingsInput, SettingsModel} from 'src/models/models'

@Controller('api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':userId')
  findLinkById(@Param('userId') userId: string): Promise<SettingsModel> {
    return this.settingsService.findSettingsByUserId(userId)
  }

  @Post()
  createSettings(@Body() input: SettingsInput): Promise<SettingsModel> {
    console.log(input)
    return this.settingsService.createSettings(input)
  }

  @Put(':id')
  updateLink(
    @Param('id') id: string,
    @Body() input: SettingsInput,
  ): Promise<SettingsModel> {
    return this.settingsService.updateSettings(id, input)
  }
}
