import * as jwt from 'jsonwebtoken';
export declare const userConfig: (obj: any) => any;
export declare const movieConfig: (obj: any) => any;
export declare const movieImgCheck: (file: any) => void;
export declare const extractToken: (token: any) => string | jwt.JwtPayload;
