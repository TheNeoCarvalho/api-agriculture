import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../property/entities/property.entity';

@Entity()
export class Producer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    document: string;

    @Column()
    name: string;

    @OneToMany(() => Property, (property) => property.producer)
    properties: Property[];
}
