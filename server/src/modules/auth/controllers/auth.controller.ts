import {Body, Controller, Get, Param, Post} from '@nestjs/common'

import {AuthService} from '../services/auth.service'
import {User, UserInput} from 'src/models/graphql.schema'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  findOrCreateUser(@Body() input: UserInput): Promise<User> {
    return this.authService.findOrCreateUser(input)
  }

  @Get(':googleId')
  findAuthorizedUser(@Param('googleId') googleId: string): Promise<User> {
    return this.authService.findAuthorizedUser(googleId)
  }

  @Get('id/:id')
  findUserById(@Param('id') id: string): Promise<User> {
    return this.authService.findUserById(id)
  }
}
