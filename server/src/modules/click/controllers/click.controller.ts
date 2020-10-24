import {Body, Controller, Get, Param, Post} from '@nestjs/common'

import {ClickService} from '../services/click.service'
import {Click, ClickInput, ClickPage} from 'src/models/graphql.schema'

@Controller('api/click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Get(':owner')
  async findAllClicksByOwner(
    @Param('owner') owner: string,
  ): Promise<ClickPage> {
    const clicks = await this.clickService.findAllClicksByOwner(owner)

    return {
      ...clicks,
      data: clicks.data.sort(
        (a, b) => Number(b.clickedTs) - Number(a.clickedTs),
      ),
    }
  }

  @Post()
  createClick(@Body() input: ClickInput): Promise<Click> {
    return this.clickService.createClick(input)
  }
}
