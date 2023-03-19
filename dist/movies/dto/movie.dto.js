"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDto = exports.Permission = exports.NguoiDung = void 0;
const class_transformer_1 = require("class-transformer");
class NguoiDung {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { exposeUnsetFields: true });
    }
}
exports.NguoiDung = NguoiDung;
class Permission {
}
exports.Permission = Permission;
class MovieDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { exposeUnsetFields: true });
    }
}
exports.MovieDto = MovieDto;
//# sourceMappingURL=movie.dto.js.map