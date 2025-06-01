import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Planting } from 'src/modules/planting/entities/planting.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Plot {
    @ApiProperty({ description: 'The unique identifier of the plot' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'The name of the plot' })
    @Column()
    name: string;

    @ApiProperty({ description: 'The area of the plot' })
    @Column('float')
    area: number;

    @ManyToOne(() => Property, (property) => property.plots, { onDelete: 'CASCADE' })
    property: Property;

    @OneToMany(() => Planting, planting => planting.plot)
    plantings: Planting[];
}
