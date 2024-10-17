import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  access_token?: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
