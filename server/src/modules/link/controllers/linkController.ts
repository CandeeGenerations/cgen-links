import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common'

import {asyncForEach} from 'src/helpers'
import {LinkService} from '../services/link.service'
import {LinkModel, LinkPageModel} from 'src/models/override.model'
import {Link, LinkInput, LinkPage} from 'src/models/graphql.schema'
import {ClickService} from 'src/modules/click/services/click.service'

@Controller('api/link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly clickService: ClickService,
  ) {}

  @Get(':owner')
  async findLinksByOwner(
    @Param('owner') owner: string,
  ): Promise<LinkPageModel> {
    const linksByOwner = await this.linkService.findLinksByOwner(owner)
    const links: LinkModel[] = []

    await asyncForEach(linksByOwner.data, async link => {
      const clickCount = await this.clickService.clickCountByOwner(link._id)

      links.push({
        ...link,
        clickCount,
      })
    })

    const sortedLinks = links.sort(
      (a, b) => Number(b.addedTs) - Number(a.addedTs),
    )

    delete linksByOwner.data

    return {
      ...linksByOwner,
      data: sortedLinks,
    }
  }

  @Get('id/:id')
  findLinkById(@Param('id') id: string): Promise<Link> {
    return this.linkService.findLinkById(id)
  }

  @Post()
  createLink(@Body() input: LinkInput): Promise<Link> {
    return this.linkService.createLink(input)
  }

  @Put(':id')
  updateLink(@Param('id') id: string, @Body() input: LinkInput): Promise<Link> {
    return this.linkService.updateLink(id, input)
  }

  @Post(':id/toggle-active')
  toggleActiveLink(
    @Param('id') id: string,
    @Query('active') active: string,
  ): Promise<Link> {
    return this.linkService.toggleActiveLink(id, active === 'true')
  }

  @Post(':id/delete')
  softDeleteLink(@Param('id') id: string): Promise<Link> {
    return this.linkService.softDeleteLink(id)
  }
}
