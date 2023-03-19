import { Response } from 'src/utils/dto/global.dto';
export declare class AdminController {
    private response;
    constructor(response: Response);
    imgSync(): Promise<void>;
}
