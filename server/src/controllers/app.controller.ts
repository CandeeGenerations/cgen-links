import {ConfigService} from '@nestjs/config'
import {Controller, Get} from '@nestjs/common'

import {ConfigModel} from '../models/override.model'

@Controller('api/config')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getConfig(): ConfigModel {
    return {
      gClientId: this.configService.get<string>('G_CLIENT_ID'),
      ipUrl: `${this.configService.get<string>(
        'IP_URL',
      )}?auth=${this.configService.get<string>('IP_KEY')}`,
    }
  }
}
