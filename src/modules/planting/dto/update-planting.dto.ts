import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantingDto } from './create-planting.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlantingDto extends PartialType(CreatePlantingDto) {
    @ApiProperty({ description: 'The plot id of the planting' })
    plotId: string;

    @ApiProperty({ description: 'The crop id of the planting' })
    cropId: string;
}