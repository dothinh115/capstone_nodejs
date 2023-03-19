"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuthorization = void 0;
const passport_1 = require("@nestjs/passport");
class TokenAuthorization extends (0, passport_1.AuthGuard)('jwt') {
}
exports.TokenAuthorization = TokenAuthorization;
//# sourceMappingURL=index.js.map