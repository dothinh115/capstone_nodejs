import { Response } from 'src/utils/dto/global.dto';
import { AdminProvider } from './admin.service';
export declare class AdminController {
    private response;
    private adminProvider;
    constructor(response: Response, adminProvider: AdminProvider);
    imgSync(): Promise<void>;
}
