import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Planting } from '../../planting/entities/planting.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Plot {
    @ApiProperty({ description: 'O id do Talhão' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'O nome do Talhão' })
    @Column()
    name: string;

    @ApiProperty({ description: 'A área do Talhão' })
    @Column('float')
    area: number;

    @ManyToOne(() => Property, (property) => property.plots, { onDelete: 'CASCADE' })
    property: Property;

    @OneToMany(() => Planting, planting => planting.plot)
    plantings: Planting[];
}
