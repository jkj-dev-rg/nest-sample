import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(bodyData) : Promise<UserEntity[]> {
    const data = await this.userRepository.create(bodyData)
    console.log(data);
    const newUser = this.userRepository.create(bodyData); // Create a new instance of the UserEntity
    const savedUser = await this.userRepository.save(newUser); // Save the new user to the database
    return savedUser;
  }

  getAll() {
    return 'all user retrived';
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
