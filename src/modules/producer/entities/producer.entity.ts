import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producer {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the producer' })
    id: string;

    @Column({ unique: true })
    @ApiProperty({ description: 'The document of the producer' })
    document: string;

    @Column()
    @ApiProperty({ description: 'The name of the producer' })
    name: string;

    @OneToMany(() => Property, (property) => property.producer)
    properties: Property[];
}
