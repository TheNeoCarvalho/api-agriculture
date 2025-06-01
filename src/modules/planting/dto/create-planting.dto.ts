import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePlantingDto {
    @IsUUID()
    plotId: string;

    @IsUUID()
    cropId: string;

    @IsUUID()
    seasonId: string;

    @IsNumber()
    @Min(0)
    plantedArea: number;
}
