import * as moment from 'moment';
import { UserDto } from 'src/auth/dto/auth.dto';

export interface ResponseInterface {
  message: string;
  data?: any;
  dateTime: string;
}

export class Response {
  successRes(message, obj = null): ResponseInterface {
    return {
      message,
      ...(obj && { data: UserDto.plainToClass(obj) }),
      dateTime: moment().format(),
    };
  }

  failRes(message): ResponseInterface {
    return {
      message,
      dateTime: moment().format(),
    };
  }
}
