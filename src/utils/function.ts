import { maxSize, movieImgPath } from './variables';

export const movieImgCheck = (req, file, callback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const fileTypeCheck = filetypes.test(
    movieImgPath + file.originalname.toLocaleLowerCase(),
  );
  if (!fileTypeCheck) req.imgValidationErrorMessage = 'Chỉ được up ảnh!';
  if (file.size > maxSize)
    req.imgValidationErrorMessage = `Tối đa ${maxSize / 1000000}Mb!`;
  if (req.imgValidationErrorMessage)
    return callback(null, false, req.imgValidationErrorMessage);

  callback(null, true);
};

export const createDateAsUTC = (date: Date): Date => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ),
  );
};
