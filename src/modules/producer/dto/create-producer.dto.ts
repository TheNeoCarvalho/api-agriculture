import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsString } from 'class-validator';

export class CreateProducerDto {
    @IsNotEmpty()
    @Matches(/^(\d{11}|\d{14})$/, {
        message: 'O documento CPF deve conter 11 dígitos ou CNPJ 14 dígitos',
    })
    @ApiProperty({ description: 'O documento do produtor' })
    document: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome do produtor' })
    name: string;
}
