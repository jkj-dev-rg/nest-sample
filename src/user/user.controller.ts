import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/db/entity/user.entity';
import { CreateUserDto } from './Dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // CreateUserDto it will be automatically validated
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity[]> {
    return await this.userService.create(createUserDto);
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
