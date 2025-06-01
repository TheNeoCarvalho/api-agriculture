import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePlotDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'The name of the plot' })
    name: string;

    @IsNumber()
    @ApiProperty({ description: 'The area of the plot' })
    area: number;

    @IsUUID()
    @ApiProperty({ description: 'The property id of the plot' })
    propertyId: string;
}
