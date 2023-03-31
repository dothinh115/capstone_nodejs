export const so_dt_pattern =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

export const movieImgResponse = `http://dothinh.info/public/img/`;

export const systemImgResponse = `http://dothinh.info/public/img/cinemas/`;
//message
export const alreadyExistedEmailMessage = 'Email đã tồn tại';

export const loginErrorMessage = 'Email hoặc mật khẩu không đúng!';

export const successMessage = 'Thành công!';

export const invalidTokenMessage = 'Token không hợp lệ!';

export const notAllowedMessage = 'Không đủ quyền!';

export const notExistedUserMessage = 'Không tìm ra user này!';

export const notExistedMovieMessage = 'Không tìm thấy phim này!';

export const movieImgPath = `${process.cwd()}/public/img/`;

export const adminOnlyMessage =
  'Chỉ có Administrators mới có quyền thực hiện thao tác này!';

export const userInfoUpdateNotAllowed =
  'Chỉ được chỉnh sửa nội dung của bản thân!';

export const imgRequiredMessage = 'Thiếu ảnh!';

export const maxSize = 6000000; //6Mb

export const cinemaImgPath = `${process.cwd()}/public/img/cinemas/`;

export const cinemaComplexNotFoundMessage = 'Không tìm thấy cụm rạp này';
export const cinemaSystemNotFoundMessage = 'Không tìm thấy hệ thống rạp này';
export const cinemaNotFoundMessage = 'Không tìm thấy rạp phim này';
export const alreadyExistedshowTimeMessage = 'Lịch chiếu này đã tồn tại!';
export const showTimeNotFoundMessage = 'Lịch chiếu này không tồn tại!';
export const seatNotFoundMessage = 'Không tìm thấy ghế này!';
export const orderNotFoundMessage = 'Không tìm thấy mã đặt vé này!';
export const bannedUserMessage =
  'Banned user không thể thực hiện hành động này ';
export const notEnoughRightsBanMessage = 'Không thể ban người có quyền cao hơn';
export const notBannedMessage = 'User này chưa bị ban';
export const alreadyBannedMessage = 'User này đã bị ban';
export const higherPermissionSetNotAllowedMessage =
  'Không thể set quyền cao hơn quyền của bản thân!';
export const notEnoughRightsPermissionMessage =
  'Không thể set quyền cho người có quyền cao hơn mình!';
export const selfSetPermissionNotAllowedMessage =
  'Không thể phân quyền cho bản thân!';

export const selfBanNotAllowed = 'Không được ban bản thân!';
export const selfDeteleNotAllowed = 'Không thể xóa bản thân!';
export const phoneNumberRequired = 'Điền sdt VN, 10 số, ví dụ 0901234567!';
export const imgSyncDecription = 'Đồng bộ hình anh giữa database và folder';
export const keywordsRequiredMessage = 'Phải có keywords';
export const pageOrLimitRequiredMessage = 'Phải có đủ page và limit';
export const makeSenseInfoMessage = 'Điền thông tin cho hợp lý!';
export const alreadyOrderedMessage = 'Ghế không trống!';
