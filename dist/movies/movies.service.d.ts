import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
export declare class MoviesProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createNewMovie(file: any, body: any, tai_khoan: number): Promise<import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    }>;
    deleteMovie(ma_phim: number): Promise<void>;
    getMovieInfo(ma_phim: any): Promise<import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    }>;
    updateMovie(file: any, body: any, ma_phim: any): Promise<import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    }>;
}
