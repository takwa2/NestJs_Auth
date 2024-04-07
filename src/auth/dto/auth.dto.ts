import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  isString,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  public password: string;
}
