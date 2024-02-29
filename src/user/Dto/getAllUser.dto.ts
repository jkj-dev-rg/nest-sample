import { IsNumber, IsNotEmpty } from 'class-validator';
 
export class GetAllUserDto {
    @IsNumber()
    @IsNotEmpty()
  page: number;

    @IsNotEmpty()
    @IsNumber()
  limit:number;
}
