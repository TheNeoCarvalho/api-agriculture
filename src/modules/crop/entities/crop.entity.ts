import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Season } from '../../season/entities/season.entity';
import { Planting } from '../../planting/entities/planting.entity';

@Entity('crops')
export class Crop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Property, (property) => property.crops)
    property: Property;

    @ManyToOne(() => Season, (season) => season.crops)
    season: Season;

    @OneToMany(() => Planting, planting => planting.crop)
    plantings: Planting[];
}
