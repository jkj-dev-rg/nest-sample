import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() bodyData) {
    return this.userService.create();
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':userId')
  getById(@Param() param) {
    return this.userService.getById();
  }

  @Patch(':userId')
  update() {
    return this.userService.update();
  }

  @Delete(':userId')
  remove() {
    return this.userService.remove();
  }
}
