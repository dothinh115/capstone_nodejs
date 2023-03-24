export interface ResponseInterface {
    message: string;
    data?: any;
    dateTime: Date;
}
export declare class Response {
    successRes(message: any, obj?: any): ResponseInterface;
    failRes(message: any): ResponseInterface;
}
