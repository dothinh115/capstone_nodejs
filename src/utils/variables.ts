export const so_dt_pattern =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

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
