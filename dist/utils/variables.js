"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfBanNotAllowed = exports.selfSetPermissionNotAllowedMessage = exports.notEnoughRightsPermissionMessage = exports.higherPermissionSetNotAllowedMessage = exports.alreadyBannedMessage = exports.notBannedMessage = exports.notEnoughRightsBanMessage = exports.bannedUserMessage = exports.orderNotFoundMessage = exports.seatNotFoundMessage = exports.showTimeNotFoundMessage = exports.alreadyExistedshowTimeMessage = exports.cinemaNotFoundMessage = exports.cinemaSystemNotFoundMessage = exports.cinemaComplexNotFoundMessage = exports.cinemaImgPath = exports.maxSize = exports.imgRequiredMessage = exports.userInfoUpdateNotAllowed = exports.adminOnlyMessage = exports.movieImgPath = exports.notExistedMovieMessage = exports.notExistedUserMessage = exports.notAllowedMessage = exports.invalidTokenMessage = exports.successMessage = exports.loginErrorMessage = exports.alreadyExistedEmailMessage = exports.so_dt_pattern = void 0;
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
exports.maxSize = 6000000;
exports.cinemaImgPath = `${process.cwd()}/public/img/cinemas/`;
exports.cinemaComplexNotFoundMessage = 'Không tìm thấy cụm rạp này';
exports.cinemaSystemNotFoundMessage = 'Không tìm thấy hệ thống rạp này';
exports.cinemaNotFoundMessage = 'Không tìm thấy rạp phim này';
exports.alreadyExistedshowTimeMessage = 'Lịch chiếu này đã tồn tại!';
exports.showTimeNotFoundMessage = 'Lịch chiếu này không tồn tại!';
exports.seatNotFoundMessage = 'Không tìm thấy ghế này!';
exports.orderNotFoundMessage = 'Không tìm thấy mã đặt vé này!';
exports.bannedUserMessage = 'Banned user không thể thực hiện hành động này ';
exports.notEnoughRightsBanMessage = 'Không thể ban người có quyền cao hơn';
exports.notBannedMessage = 'User này chưa bị ban';
exports.alreadyBannedMessage = 'User này đã bị ban';
exports.higherPermissionSetNotAllowedMessage = 'Không thể set quyền cao hơn quyền của bản thân!';
exports.notEnoughRightsPermissionMessage = 'Không thể set quyền cho người có quyền cao hơn mình!';
exports.selfSetPermissionNotAllowedMessage = 'Không thể phân quyền cho bản thân!';
exports.selfBanNotAllowed = 'Không được ban bản thân!';
//# sourceMappingURL=variables.js.map