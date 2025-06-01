import { PartialType } from '@nestjs/mapped-types';
import { CreateCropDto } from './create-crop.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCropDto extends PartialType(CreateCropDto) {
    @ApiProperty({ description: 'The name of the crop' })
    name: string;

    @ApiProperty({ description: 'The description of the crop' })
    description: string;
}