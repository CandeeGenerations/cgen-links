import {Body, Controller, Get, Param, Post} from '@nestjs/common'

import {ClickModel} from 'src/models/models'
import {Click} from 'src/models/graphql.schema'
import {ClickService} from '../services/click.service'

@Controller('api/click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Get()
  async findAllClicks(): Promise<ClickModel[]> {
    const clicks = await this.clickService.findAllClicks()

    return clicks.sort((a, b) => Number(b.clickedTs) - Number(a.clickedTs))
  }

  @Get(':linkId')
  async findAllClicksByLinkId(
    @Param('linkId') linkId: string,
  ): Promise<ClickModel[]> {
    const clicks = await this.clickService.findAllClicksByLinkId(linkId)

    return clicks.sort((a, b) => Number(b.clickedTs) - Number(a.clickedTs))
  }

  @Post()
  createClick(@Body() input: Click): Promise<ClickModel> {
    return this.clickService.createClick(input)
  }
}
