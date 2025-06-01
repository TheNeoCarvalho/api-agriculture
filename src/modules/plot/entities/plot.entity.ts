import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Planting } from 'src/modules/planting/entities/planting.entity';

@Entity()
export class Plot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('float')
    area: number;

    @ManyToOne(() => Property, (property) => property.plots, { onDelete: 'CASCADE' })
    property: Property;

    @OneToMany(() => Planting, planting => planting.plot)
    plantings: Planting[];
}
