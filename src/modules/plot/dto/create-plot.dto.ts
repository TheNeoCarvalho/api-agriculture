import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePlotDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    area: number;

    @IsUUID()
    propertyId: string;
}
