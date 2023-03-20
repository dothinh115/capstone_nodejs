"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgRequiredMessage = exports.userInfoUpdateNotAllowed = exports.adminOnlyMessage = exports.movieImgPath = exports.notExistedMovieMessage = exports.notExistedUserMessage = exports.notAllowedMessage = exports.invalidTokenMessage = exports.successMessage = exports.loginErrorMessage = exports.alreadyExistedEmailMessage = exports.so_dt_pattern = void 0;
exports.so_dt_pattern = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
exports.alreadyExistedEmailMessage = 'Email đã tồn tại';
exports.loginErrorMessage = 'Email hoặc mật khẩu không đúng!';
exports.successMessage = 'Thành công!';
exports.invalidTokenMessage = 'Token không hợp lệ!';
exports.notAllowedMessage = 'Không đủ quyền!';
exports.notExistedUserMessage = 'Không tìm ra user này!';
exports.notExistedMovieMessage = 'Không tìm thấy phim này!';
exports.movieImgPath = `${process.cwd()}/public/img/`;
exports.adminOnlyMessage = 'Chỉ có Administrators mới có quyền thực hiện thao tác này!';
exports.userInfoUpdateNotAllowed = 'Chỉ được chỉnh sửa nội dung của bản thân!';
exports.imgRequiredMessage = 'Thiếu ảnh!';
//# sourceMappingURL=variables.js.map