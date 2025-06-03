import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @ApiProperty({ description: 'O nome do Usuário', required: true })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'O username do Usuário', required: true })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'O email do Usuário', required: true })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'A senha do Usuário', required: true })
    password: string;

}
