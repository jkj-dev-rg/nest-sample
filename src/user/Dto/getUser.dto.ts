import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;
}
