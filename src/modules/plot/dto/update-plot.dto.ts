import { PartialType } from '@nestjs/mapped-types';
import { CreatePlotDto } from './create-plot.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlotDto extends PartialType(CreatePlotDto) {
    @ApiProperty({ description: 'O nome do Tahão' })
    name: string;

    @ApiProperty({ description: 'The area of the plot' })
    area: number;
}