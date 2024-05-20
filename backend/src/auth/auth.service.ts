import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private iwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('user not found');
    }

    if (user.password !== pass) {
      throw new BadRequestException('wrong password');
    }
    const { password, ...result } = user;
    return result;
  }

  async signIn({
    email,
    password,
  }: CredentialsDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );
    if (!bcrypt.compareSync(password, hashPassword)) {
      throw new BadRequestException('wrong password');
    }
    const payload = {
      username: user.firstName,
      lastName: user.lastName,
      sub: user.id,
    };

    return { access_token: this.iwtService.sign(payload) };
  }

  async signUp(userDto: CreateUserDto): Promise<{ id: number }> {
    const hashedPassword = await bcrypt.hash(
      userDto.password,
      Number(process.env.SALT_ROUNDS),
    );
    const user = await this.usersService.addUser({
      ...userDto,
      password: hashedPassword,
    });

    return { id: user.id };
  }

  async updateUser(
    id: number,
    userDto: UpdateUserDto,
  ): Promise<{ id: number }> {
    const user = await this.usersService.updateUser(id, userDto);
    return { id: user.id };
  }
}
