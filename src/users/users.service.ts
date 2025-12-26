import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserRequest, UserCreateRequest, UserCreateResponse, UserUpdateRequest } from './dto/user.request';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }
  async create(createUserDto: UserCreateRequest): Promise<UserCreateResponse> {
    const user = await this.userRepository.findUserByEmail(createUserDto.email);
    if (user) {
      throw new NotFoundException('User already exists with this email. Please login.');
    }
    return await this.userRepository.createUser(createUserDto);
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

  async loginUser(req: LoginUserRequest) {
    const { email, password } = req;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`No user found with the email ${email}`);
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }
    return user;
  }

  update(id: number, updateUserDto: UserUpdateRequest) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
