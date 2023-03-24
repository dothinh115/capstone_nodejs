import { UserDto } from 'src/auth/dto/auth.dto';

export interface ResponseInterface {
  message: string;
  data?: any;
  dateTime: Date;
}

export class Response {
  successRes(message, obj = null): ResponseInterface {
    return {
      message,
      ...(obj && { data: UserDto.plainToClass(obj) }),
      dateTime: new Date(),
    };
  }

  failRes(message): ResponseInterface {
    return {
      message,
      dateTime: new Date(),
    };
  }
}
