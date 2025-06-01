import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeasonDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The name of the season' })
    name: string;
}
