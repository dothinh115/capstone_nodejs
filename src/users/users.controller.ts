import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersProvider } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private user: UsersProvider) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/getAllUsers')
  async getAllUsers(@Req() req: Request) {
    return this.user.getAllUsers();
  }
}
