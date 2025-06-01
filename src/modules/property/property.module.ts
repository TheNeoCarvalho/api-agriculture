import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Producer } from '../producer/entities/producer.entity';
import { PropertyService } from './services/property.service';
import { PropertyController } from './controllers/property.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Property, Producer]),
    ],
    providers: [PropertyService],
    controllers: [PropertyController],
    exports: [PropertyService],
})
export class PropertyModule { }