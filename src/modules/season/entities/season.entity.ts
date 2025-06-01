import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Crop } from '../../crop/entities/crop.entity';

@Entity()
export class Season {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    year: string;

    @OneToMany(() => Crop, (crop) => crop.season)
    crops: Crop[];
}
