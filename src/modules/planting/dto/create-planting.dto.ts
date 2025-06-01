import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePlantingDto {
    @IsUUID()
    @ApiProperty({ description: 'The plot id of the planting' })
    plotId: string;

    @IsUUID()
    @ApiProperty({ description: 'The crop id of the planting' })
    cropId: string;

    @IsUUID()
    @ApiProperty({ description: 'The season id of the planting' })
    seasonId: string;

    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'The area planted in the planting' })
    plantedArea: number;
}
