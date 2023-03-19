"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorAuthorization = exports.AdminAuthorization = exports.TokenAuthorization = void 0;
const passport_1 = require("@nestjs/passport");
class TokenAuthorization extends (0, passport_1.AuthGuard)('jwt') {
}
exports.TokenAuthorization = TokenAuthorization;
class AdminAuthorization extends (0, passport_1.AuthGuard)('admin') {
}
exports.AdminAuthorization = AdminAuthorization;
class EditorAuthorization extends (0, passport_1.AuthGuard)('editor') {
}
exports.EditorAuthorization = EditorAuthorization;
//# sourceMappingURL=index.js.map