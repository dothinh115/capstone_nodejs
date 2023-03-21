import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { dataProvider } from './data.service';
import { ShowTimeCreateDto } from './Dto/data.dto';
export declare class dataController {
    private model;
    private response;
    private dataService;
    constructor(model: PrismaService, response: Response, dataService: dataProvider);
    createShowTime(body: ShowTimeCreateDto): Promise<void>;
}
