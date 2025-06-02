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
import { ApiProperty } from '@nestjs/swagger';

@Entity('crops')
export class Crop {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'O Id da plantação' })
    id: string;

    @Column()
    @ApiProperty({ description: 'O nome da plantação' })
    name: string;

    @ManyToOne(() => Property, (property) => property.crops)
    property: Property;

    @ManyToOne(() => Season, (season) => season.crops)
    season: Season;

    @OneToMany(() => Planting, planting => planting.crop)
    plantings: Planting[];
}
