import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome do Usuário' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'O username do Usuário' })
    username: string;

    @IsEmail()
    @ApiProperty({ description: 'O email do Usuário' })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ description: 'A senha do Usuário' })
    password: string;
}
