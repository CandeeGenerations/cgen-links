import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common'

import {asyncForEach, sortLinks} from 'src/helpers'
import {LinkService} from '../services/link.service'
import {LinkModel, LinkPageModel, ReorderModel} from 'src/models/override.model'
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

    const sortedLinks = links.sort(sortLinks)

    delete linksByOwner.data

    return {
      ...linksByOwner,
      data: sortedLinks,
    }
  }

  @Get('public/:owner')
  async findActiveLinksByOwner(
    @Param('owner') owner: string,
  ): Promise<LinkPage> {
    const linksByOwner = await this.linkService.findActiveLinksByOwner(owner)
    const sortedLinks = linksByOwner.data.sort(sortLinks)

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

  @Post('reorder')
  async reorderLinks(@Body() input: ReorderModel) {
    for (let i = 0; i < input.ids.length; i++) {
      const link = await this.linkService.findLinkById(input.ids[i])

      await this.linkService.updateLink(link._id, {
        deleted: link.deleted,
        active: link.active,
        destination: link.destination,
        description: link.description,
        addedTs: link.addedTs,
        title: link.title,
        order: i + 1,
        owner: {
          connect: link.owner._id,
        },
      })
    }
  }
}
