import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create() {
    return 'user created';
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
