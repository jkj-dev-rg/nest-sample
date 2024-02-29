import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  userId: number;
}
