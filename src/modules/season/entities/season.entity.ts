import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Crop } from '../../crop/entities/crop.entity';
import { Planting } from '../../planting/entities/planting.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('seasons')
export class Season {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'O id da Safra' })
    id: string;

    @Column()
    @ApiProperty({ description: 'O nome da Safra' })
    name: string;

    @OneToMany(() => Crop, (crop) => crop.season)
    crops: Crop[];

    @OneToMany(() => Planting, planting => planting.season)
    plantings: Planting[];
}
