import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePlantingDto {
    @IsUUID()
    @ApiProperty({ description: 'O id da divisão da plantação' })
    plotId: string;

    @IsUUID()
    @ApiProperty({ description: 'O id do cultino da plantação' })
    cropId: string;

    @IsUUID()
    @ApiProperty({ description: 'O id da safra da plantação' })
    seasonId: string;

    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'A área plantada da plantação' })
    plantedArea: number;
}
