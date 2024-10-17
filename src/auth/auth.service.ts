import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  async signIn(loginUserDTO: LoginUserDTO): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: loginUserDTO.email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await this.verifyPassword(
      loginUserDTO.password,
      user.password,
    );
    if (!match) {
      throw new UnauthorizedException('Incorrect Password');
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: user.email,
      name: user.name,
      id: user.id,
    };
  }
  async signUp(createuserDto: CreateUserDTO): Promise<any> {
    const hashedPassword = await bcrypt.hash(createuserDto?.password, 10);
    const userExists = await this.databaseService.user.findUnique({
      where: {
        email: createuserDto.email,
      },
    });
    if (userExists) {
      throw new BadRequestException('User Exists');
    }
    await this.databaseService.user.create({
      data: {
        email: createuserDto?.email,
        password: hashedPassword,
        name: createuserDto?.name,
      },
    });
    return { message: 'User created successfully' };
  }
}
