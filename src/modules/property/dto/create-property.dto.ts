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
    name: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    totalArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    agricultureArea: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    vegetationArea: number;

    @IsNotEmpty()
    @IsUUID()
    producerId: string;
}
