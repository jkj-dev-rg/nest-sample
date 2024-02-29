import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { ResponseDto } from './Dto/response.dto';
import { GetAllUserDto } from './Dto/getAllUser.dto';
import { GetUserDto } from './Dto/getUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // CreateUserDto it will be automatically validated
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  getAll(@Query() getAllUserDto: GetAllUserDto): Promise<ResponseDto> {
    return this.userService.getAll(getAllUserDto);
  }

  @Get(':userId')
  getById(@Param() getUserDto: GetUserDto): Promise<ResponseDto> {
    return this.userService.getById(getUserDto);
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
