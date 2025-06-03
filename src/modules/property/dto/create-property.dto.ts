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
    @ApiProperty({ description: 'O nome da Propriedade' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'A cidade da Propriedade' })
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'O estad da Propriedade' })
    state: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'O total da área da Propriedade' })
    totalArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'A área agrícola da propriedade' })
    agricultureArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'A área de vegetação da propriedade' })
    vegetationArea: number;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ description: 'O ID do produtor da propriedade' })
    producerId: string;
}
