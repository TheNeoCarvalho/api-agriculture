import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Crop } from '../../crop/entities/crop.entity';
import { Planting } from '../../planting/entities/planting.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('seasons')
export class Season {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the season' })
    id: string;

    @Column()
    @ApiProperty({ description: 'The name of the season' })
    name: string;

    @OneToMany(() => Crop, (crop) => crop.season)
    crops: Crop[];

    @OneToMany(() => Planting, planting => planting.season)
    plantings: Planting[];
}
