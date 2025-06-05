import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'O email do usuário' })
    email: string;

    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty({ description: 'A senha do usuário' })
    password: string;
}
