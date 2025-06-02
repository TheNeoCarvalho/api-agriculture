import { PartialType } from '@nestjs/mapped-types';
import { CreateCropDto } from './create-crop.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCropDto extends PartialType(CreateCropDto) {
    @ApiProperty({ description: 'O nome da plantação' })
    name: string;

    @ApiProperty({ description: 'A descrição da plantação' })
    description: string;
}