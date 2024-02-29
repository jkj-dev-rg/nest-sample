import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/user/Dto/response.dto';

@Injectable()
export class ResponseService {
  createStructuredResponse(
    statusCode: number,
    message: string,
    data?: any,
    error?: any,
  ): ResponseDto {
    return new ResponseDto(statusCode, message, data, error);
  }
}
