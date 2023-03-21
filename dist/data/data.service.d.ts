import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { ShowTimeCreateDto } from './Dto/data.dto';
export declare class dataProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createShowTime(body: ShowTimeCreateDto): Promise<any>;
}
