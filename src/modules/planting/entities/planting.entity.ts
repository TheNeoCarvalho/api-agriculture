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
    @ApiProperty({ description: 'O Id da plantaçãeo' })
    id: string;

    @Column({ type: 'float' })
    @ApiProperty({ description: 'A área plantada' })
    plantedArea: number;

    @CreateDateColumn()
    @ApiProperty({ description: 'A data da criação da plantação' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: 'A data da atualiza~ção da plantação' })
    updatedAt: Date;

    @ManyToOne(() => Plot, plot => plot.plantings, { eager: true })
    plot: Plot;

    @ManyToOne(() => Crop, crop => crop.plantings, { eager: true })
    crop: Crop;

    @ManyToOne(() => Season, season => season.plantings, { eager: true })
    season: Season;
}
