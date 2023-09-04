import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository
  ){}

  async create(createUserDto: CreateUserDto) {

    const userCreated = await this.usersRepository.findUserByEmail(createUserDto);
    if(userCreated){
      throw new ConflictException();
    }

    return await this.usersRepository.createUser(createUserDto);
  }

  async login(loginUser: CreateUserDto) {
    const user = await this.usersRepository.findUserByEmail(loginUser);
    if(!user){
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(loginUser.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    const token = await this.createToken(user)
    return token;
  }

  private async createToken(user: Users) {
    const { id, email } = user;

    const token = this.jwtService.sign({ email }, {
      expiresIn: "7 days",
      subject: String(id),
      issuer: "users",
      audience: "Driven"
    });

    return { token }
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: "Driven",
      issuer: "users"
    });
    return data;
  }

  async getUserById(id: number){
    const user = await this.usersRepository.getUserById(id);
    return user;
  }
}
