import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    year: string;
}
