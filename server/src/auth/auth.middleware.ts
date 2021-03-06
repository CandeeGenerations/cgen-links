import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common'

import {User} from '../models/graphql.schema'
import {AuthService} from 'src/modules/auth/services/auth.service'

interface Req extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  params: {}
  baseUrl: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Req, res: Response, next: () => void): Promise<void> {
    if (
      !req.baseUrl.includes('api') ||
      req.baseUrl.includes('auth') ||
      req.baseUrl.includes('config') ||
      req.baseUrl.includes('public')
    ) {
      next()
      return
    }

    try {
      const authToken = req.headers['x-cgen-auth']
      const buff = Buffer.from(authToken, 'base64')
      const str = buff.toString('utf-8')
      const authData: User = JSON.parse(str)

      await this.authService.findAuthorizedUser(authData.googleId)

      next()
    } catch {
      throw new UnauthorizedException(
        'You are not authorized. Please log in first.',
      )
    }
  }
}
