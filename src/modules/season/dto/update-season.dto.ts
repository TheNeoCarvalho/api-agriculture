import { PartialType } from '@nestjs/mapped-types';
import { CreateSeasonDto } from './create-season.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {
    @ApiProperty({ description: 'O nome da Safra' })
    name: string;
}
