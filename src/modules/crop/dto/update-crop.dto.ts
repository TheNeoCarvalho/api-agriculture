import { PartialType } from '@nestjs/mapped-types';
import { CreateCropDto } from './create-crop.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCropDto extends PartialType(CreateCropDto) {
    @ApiProperty({ description: 'O nome do cultivo' })
    name: string;

    @ApiProperty({ description: 'A descrição do cultivo' })
    description: string;
}