export interface ResponseInterface {
    message: string;
    data?: any;
    dateTime: string;
}
export declare class Response {
    successRes(message: any, obj?: any): ResponseInterface;
    failRes(message: any): ResponseInterface;
}
