"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const moment = require("moment");
const auth_dto_1 = require("../../auth/dto/auth.dto");
class Response {
    successRes(message, obj = null) {
        return Object.assign(Object.assign({ message }, (obj && { data: auth_dto_1.UserDto.plainToClass(obj) })), { dateTime: moment().format() });
    }
    failRes(message) {
        return {
            message,
            dateTime: moment().format(),
        };
    }
}
exports.Response = Response;
//# sourceMappingURL=global.dto.js.map