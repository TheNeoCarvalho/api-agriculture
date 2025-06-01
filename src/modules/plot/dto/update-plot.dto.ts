import { PartialType } from '@nestjs/mapped-types';
import { CreatePlotDto } from './create-plot.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlotDto extends PartialType(CreatePlotDto) {
    @ApiProperty({ description: 'The name of the plot' })
    name: string;

    @ApiProperty({ description: 'The area of the plot' })
    area: number;
}