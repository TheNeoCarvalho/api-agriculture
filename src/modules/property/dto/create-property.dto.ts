import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    IsUUID,
} from 'class-validator';

export class CreatePropertyDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The name of the property' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The city of the property' })
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The state of the property' })
    state: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'The total area of the property' })
    totalArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'The agriculture area of the property' })
    agricultureArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'The vegetation area of the property' })
    vegetationArea: number;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'The producer id of the property' })
    producerId: string;
}
