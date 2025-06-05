import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Producer } from '../../producer/entities/producer.entity';
import { Crop } from '../../crop/entities/crop.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'O id da Propriedade' })
    id: string;

    @Column()
    @ApiProperty({ description: 'O nome da Propriedade' })
    name: string;

    @Column()
    @ApiProperty({ description: 'A cidade da Propriedade' })
    city: string;

    @Column()
    @ApiProperty({ description: 'O estatdo da Propriedade' })
    state: string;

    @Column('float')
    @ApiProperty({ description: 'O total da área da Propriedade' })
    totalArea: number;

    @Column('float')
    @ApiProperty({ description: 'A área agrícola da propriedade' })
    agricultureArea: number;

    @Column('float')
    @ApiProperty({ description: 'A área de vegetação da propriedade' })
    vegetationArea: number;

    @ManyToOne(() => Producer, (producer) => producer.properties)
    producer: Producer;

    @OneToMany(() => Crop, (crop) => crop.property)
    crops: Crop[];

}
