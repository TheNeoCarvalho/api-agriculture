import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePlotDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome do Tahão' })
    name: string;

    @IsNumber()
    @ApiProperty({ description: 'A área do Talhão' })
    area: number;

    @IsUUID()
    @ApiProperty({ description: 'O id da propriedade do Talhão' })
    propertyId: string;
}
