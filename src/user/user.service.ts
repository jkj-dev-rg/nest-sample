import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entity/user.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/util/response.util';
import { ResponseDto } from './Dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly responseUtil: ResponseService,
  ) {}

  async create(bodyData): Promise<ResponseDto> {
    const data = await this.userRepository.create(bodyData);
    const newUser = this.userRepository.create(bodyData); // Create a new instance of the UserEntity
    const savedUser = await this.userRepository.save(newUser); // Save the new user to the database
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'User created successfully',
      savedUser,
    );
  }

  async getAll(query): Promise<ResponseDto> {
    const { page, limit: take } = query;
    const userData = await this.userRepository.findAndCount({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'createdAt',
        'updatedAt',
      ], // Specify only the fields you want to include
      skip: (page - 1) * take,
      take,
    });
    return this.responseUtil.createStructuredResponse(
      HttpStatus.OK,
      'All user fetched',
      userData,
    );
  }

  getById() {
    return 'get user by Id';
  }

  update() {
    return 'update user by id';
  }

  remove() {
    return 'user removed';
  }
}
