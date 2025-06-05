import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome do usuário' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'O username do usuário' })
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'O email do usuário' })
    email: string;

    @MinLength(6)
    @IsNotEmpty()
    @ApiProperty({ description: 'A senha do usuário' })
    password: string;
}