import { IsString, IsEmail, IsEnum, Length, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/db/entity/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  contactNumber: string;

  @IsString()
  @Length(2, 70)
  @IsNotEmpty()
  address: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
