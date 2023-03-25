"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const auth_dto_1 = require("../../auth/dto/auth.dto");
class Response {
    successRes(message, obj = null) {
        return Object.assign(Object.assign({ message }, (obj && { data: auth_dto_1.UserDto.plainToClass(obj) })), { dateTime: new Date() });
    }
    failRes(message) {
        return {
            message,
            dateTime: new Date(),
        };
    }
}
exports.Response = Response;
//# sourceMappingURL=global.dto.js.map