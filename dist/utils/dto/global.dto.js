"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConfig = void 0;
const userConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { loai_nguoi_dung: obj.permission.permission_name });
    delete obj['permission'];
    return obj;
};
exports.userConfig = userConfig;
//# sourceMappingURL=global.dto.js.map