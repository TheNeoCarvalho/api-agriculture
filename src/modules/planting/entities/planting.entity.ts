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
import { ApiProperty } from '@nestjs/swagger';

@Entity('plantings')
export class Planting {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the planting' })
    id: string;

    @Column({ type: 'float' })
    @ApiProperty({ description: 'The area of the planting' })
    plantedArea: number;

    @CreateDateColumn()
    @ApiProperty({ description: 'The creation date of the planting' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'The update date of the planting' })
    updatedAt: Date;

    @ManyToOne(() => Plot, plot => plot.plantings, { eager: true })
    plot: Plot;

    @ManyToOne(() => Crop, crop => crop.plantings, { eager: true })
    crop: Crop;

    @ManyToOne(() => Season, season => season.plantings, { eager: true })
    season: Season;
}
