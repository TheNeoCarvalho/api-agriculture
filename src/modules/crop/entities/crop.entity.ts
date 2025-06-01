import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Season } from '../../season/entities/season.entity';

@Entity()
export class Crop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Property, (property) => property.crops)
    property: Property;

    @ManyToOne(() => Season, (season) => season.crops)
    season: Season;
}
