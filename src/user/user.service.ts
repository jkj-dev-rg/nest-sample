import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entity/user.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/util/response.util';
import { ResponseDto } from './Dto/response.dto';
import { GetUserDto } from './Dto/getUser.dto';
import { CreateUserDto } from './Dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly responseUtil: ResponseService,
  ) {}

  async create(bodyData): Promise<CreateUserDto[]> {
    console.log({ bodyData });

    const newUser = this.userRepository.create(bodyData); // Create a new instance of the UserEntity
    const savedUser = await this.userRepository.save(newUser); // Save the new user to the database
    return savedUser;
  }

  async getAll(query): Promise<[CreateUserDto[], number]> {
    const { page, limit: take } = query;
    const userData = await this.userRepository.findAndCount({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'createdAt',
        'updatedAt',
      ],
      skip: (page - 1) * take,
      take,
    });
    return userData;
  }

  async getById(getUserDto: GetUserDto): Promise<CreateUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: getUserDto.userId,
      },
    });

    if (!user)
      throw new NotFoundException(
        `User with ID ${getUserDto.userId} not found`,
      );
    return user;
  }

  async update(userId: number, updateBody: Partial<CreateUserDto>) {
    const updateUserRes = await this.userRepository.update(
      { id: userId },
      updateBody,
    );
    if (updateUserRes.affected !== 1)
      throw new NotFoundException(`User with ID ${userId} not found`);
    return updateUserRes;
  }

  async remove(userId: number) {
    const updateUserRes = await this.userRepository.update(
      { id: userId, isDeleted: false },
      { isDeleted: true },
    );
    if (updateUserRes.affected !== 1)
      throw new NotFoundException(`User with ID ${userId} not found`);
    return updateUserRes;
  }
}
