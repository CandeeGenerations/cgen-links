import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common'

import {asyncForEach} from 'src/helpers'
import {Link} from 'src/models/graphql.schema'
import {LinkService} from '../services/link.service'
import {LinkInput, LinkModel} from 'src/models/models'
import {ClickService} from 'src/modules/click/services/click.service'

@Controller('api/link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly clickService: ClickService,
  ) {}

  @Get()
  async findAllLinks(): Promise<LinkModel[]> {
    const links = await this.linkService.findAllLinks()

    await asyncForEach(links, async url => {
      const clicks = await this.clickService.findAllClicksByLinkId(url._id)

      url.clicks = clicks.length
    })

    return links.sort((a, b) => Number(b.addedTs) - Number(a.addedTs))
  }

  @Get('/id/:id')
  findLinkById(@Param('id') id: string): Promise<LinkModel> {
    return this.linkService.findLinkById(id)
  }

  @Post()
  createLink(@Body() input: LinkInput): Promise<LinkModel> {
    return this.linkService.createLink(input)
  }

  @Put(':id')
  updateLink(@Param('id') id: string, @Body() input: Link): Promise<LinkModel> {
    return this.linkService.updateLink(id, input)
  }
}
