import {Module} from '@nestjs/common'

import {LinkService} from './services/link.service'
import {ClickService} from '../click/services/click.service'
import {LinkController} from './controllers/linkController'

@Module({
  controllers: [LinkController],
  providers: [LinkService, ClickService],
})
export class LinkModule {}
