import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
    @ApiProperty({ description: 'O nome da Propriedade' })
    name: string;
}
