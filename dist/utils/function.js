"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieImgCheck = void 0;
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
//# sourceMappingURL=function.js.map