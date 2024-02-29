// no-extra-properties.pipe.ts
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class NoExtraPropertiesPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const dto = plainToClass(metatype, value);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    // Filter out properties that are not defined in the DTO
    const allowedProperties = Object.keys(new metatype());
    return Object.keys(dto)
      .filter((key) => allowedProperties.includes(key))
      .reduce((obj, key) => {
        obj[key] = dto[key];
        return obj;
      }, {});
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
