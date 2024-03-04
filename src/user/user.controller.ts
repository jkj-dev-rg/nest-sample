import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { UpdateUserDto } from './Dto/updateUser.dto';
import { ResponseService } from 'src/util/response.util';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseUtil: ResponseService,
  ) {}

  @Post()
  // CreateUserDto it will be automatically validated
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto> {
    const savedUser = await this.userService.create(createUserDto);
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'User created successfully',
      savedUser,
    );
  }

  @Get()
  async getAll(@Query() getAllUserDto: GetAllUserDto): Promise<ResponseDto> {
    const userData = await this.userService.getAll(getAllUserDto);
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'All user fetched',
      userData,
    );
  }

  @Get(':userId')
  async getById(@Param() getUserDto: GetUserDto): Promise<ResponseDto> {
    const user = await this.userService.getById(getUserDto);
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'User data fetched',
      user,
    );
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateBody: UpdateUserDto,
  ): Promise<ResponseDto> {
    const updateUser = await this.userService.update(userId, updateBody);
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'User data updated',
      updateUser,
    );
  }

  @Delete(':userId')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseDto> {
    const deleteUser = await this.userService.remove(userId);
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'User deleted',
      deleteUser,
    );
  }
}
