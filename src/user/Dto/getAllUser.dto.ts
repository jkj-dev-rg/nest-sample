import { IsNumber, IsNotEmpty, IsNumberString } from 'class-validator';

export class GetAllUserDto {
  @IsNumberString()
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  limit: number;
}
