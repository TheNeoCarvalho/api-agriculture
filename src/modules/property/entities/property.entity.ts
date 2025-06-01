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

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column('float')
    totalArea: number;

    @Column('float')
    agricultureArea: number;

    @Column('float')
    vegetationArea: number;

    @ManyToOne(() => Producer, (producer) => producer.properties)
    producer: Producer;

    @OneToMany(() => Crop, (crop) => crop.property)
    crops: Crop[];

    @OneToMany(() => Plot, (plot) => plot.property, { cascade: true })
    plots: Plot[];

}
