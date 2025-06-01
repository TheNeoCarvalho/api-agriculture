import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsString } from 'class-validator';

export class CreateProducerDto {
    @IsNotEmpty()
    @Matches(/^(\d{11}|\d{14})$/, {
        message: 'Document must be CPF (11 dígitos) ou CNPJ (14 dígitos)',
    })
    @ApiProperty({ description: 'The document of the producer' })
    document: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The name of the producer' })
    name: string;
}
