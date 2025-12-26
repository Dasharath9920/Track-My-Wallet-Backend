import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateRequest, UserCreateResponse, UserUpdateRequest } from './dto/user.request';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }
  async create(createUserDto: UserCreateRequest): Promise<UserCreateResponse> {
    const users = await this.userRepository.findUserByEmail(createUserDto.email);
    if (users.length) {
      throw new NotFoundException('User already exists with this email. Please login.');
    }
    const user = await this.userRepository.createUser(createUserDto);
    return user;
  }

  async findAll() {
    return this.userRepository.findAllUsers();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findUserById(id);
    return {
      data: user
    };
  }

  update(id: number, updateUserDto: UserUpdateRequest) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
