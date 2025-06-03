import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeasonDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'O nome da Safra' })
    name: string;
}
