import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @ApiProperty({ description: 'O nome do Usuário' })
    name: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'O username do Usuário' })
    username: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'O email do Usuário' })
    email: string;

    @Column()
    @ApiProperty({ description: 'A senha do Usuário' })
    password: string;
}
