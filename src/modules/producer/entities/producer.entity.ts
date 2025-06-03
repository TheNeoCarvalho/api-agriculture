import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producer {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'O id do Produtor' })
    id: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'O documento do Produtor' })
    document: string;

    @Column()
    @ApiProperty({ description: 'O nome do Produtor' })
    name: string;

    @OneToMany(() => Property, (property) => property.producer)
    properties: Property[];
}
