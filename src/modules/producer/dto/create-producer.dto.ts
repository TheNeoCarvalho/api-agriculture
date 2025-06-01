import { IsNotEmpty, Matches, IsString } from 'class-validator';

export class CreateProducerDto {
    @IsNotEmpty()
    @Matches(/^(\d{11}|\d{14})$/, {
        message: 'Document must be CPF (11 dígitos) ou CNPJ (14 dígitos)',
    })
    document: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
