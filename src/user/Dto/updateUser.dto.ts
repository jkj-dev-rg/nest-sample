import {
  IsString,
  IsEmail,
  IsEnum,
  Length,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  firstName: string;

  @IsString()
  @Length(2, 30)
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(10, 10)
  @IsOptional()
  contactNumber: string;

  @IsString()
  @Length(2, 70)
  @IsOptional()
  address: string;
  // Exclude any additional properties not defined in the DTO
  @Exclude()
  extraProperties: any;

  @ValidateIf((obj, value) => value !== undefined) // Validate only if the property is provided
  @Exclude() // Exclude from serialization
  name: any; // Define a dummy property to exclude "name" if passed
}
