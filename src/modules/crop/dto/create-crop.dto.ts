import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome da plantação' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Id da propriedade' })
    propertyId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Id da safra' })
    seasonId: string;
}
