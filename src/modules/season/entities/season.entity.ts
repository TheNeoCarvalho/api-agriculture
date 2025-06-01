import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Crop } from '../../crop/entities/crop.entity';
import { Planting } from '../../planting/entities/planting.entity';

@Entity('seasons')
export class Season {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Crop, (crop) => crop.season)
    crops: Crop[];

    @OneToMany(() => Planting, planting => planting.season)
    plantings: Planting[];
}
