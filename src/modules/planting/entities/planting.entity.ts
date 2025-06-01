// src/planting/entities/planting.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Plot } from '../../plot/entities/plot.entity';
import { Crop } from '../../crop/entities/crop.entity';
import { Season } from '../../season/entities/season.entity';

@Entity('plantings')
export class Planting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Plot, plot => plot.plantings, { eager: true })
    plot: Plot;

    @ManyToOne(() => Crop, crop => crop.plantings, { eager: true })
    crop: Crop;

    @ManyToOne(() => Season, season => season.plantings, { eager: true })
    season: Season;

    @Column({ type: 'float' })
    plantedArea: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
