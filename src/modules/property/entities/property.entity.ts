import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Producer } from '../../producer/entities/producer.entity';
import { Crop } from '../../crop/entities/crop.entity';
import { Plot } from 'src/modules/plot/entities/plot.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the property' })
    id: string;

    @Column()
    @ApiProperty({ description: 'The name of the property' })
    name: string;

    @Column()
    @ApiProperty({ description: 'The city of the property' })
    city: string;

    @Column()
    @ApiProperty({ description: 'The state of the property' })
    state: string;

    @Column('float')
    @ApiProperty({ description: 'The total area of the property' })
    totalArea: number;

    @Column('float')
    @ApiProperty({ description: 'The agriculture area of the property' })
    agricultureArea: number;

    @Column('float')
    @ApiProperty({ description: 'The vegetation area of the property' })
    vegetationArea: number;

    @ManyToOne(() => Producer, (producer) => producer.properties)
    producer: Producer;

    @OneToMany(() => Crop, (crop) => crop.property)
    crops: Crop[];

    @OneToMany(() => Plot, (plot) => plot.property, { cascade: true })
    plots: Plot[];

}
