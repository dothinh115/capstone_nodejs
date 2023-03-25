"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateAsUTC = exports.movieImgCheck = void 0;
const variables_1 = require("./variables");
const movieImgCheck = (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const fileTypeCheck = filetypes.test(variables_1.movieImgPath + file.originalname);
    if (!fileTypeCheck)
        req.imgValidationErrorMessage = 'Chỉ được up ảnh!';
    if (file.size > variables_1.maxSize)
        req.imgValidationErrorMessage = `Tối đa ${variables_1.maxSize / 1000000}Mb!`;
    if (req.imgValidationErrorMessage)
        return callback(null, false, req.imgValidationErrorMessage);
    callback(null, true);
};
exports.movieImgCheck = movieImgCheck;
const createDateAsUTC = (date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
exports.createDateAsUTC = createDateAsUTC;
//# sourceMappingURL=function.js.map