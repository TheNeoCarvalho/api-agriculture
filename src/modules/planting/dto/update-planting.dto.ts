import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantingDto } from './create-planting.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlantingDto extends PartialType(CreatePlantingDto) {
    @ApiProperty({ description: 'O id da divisão da plantação' })
    plotId: string;

    @ApiProperty({ description: 'O id do cultino da plantação' })
    cropId: string;
}