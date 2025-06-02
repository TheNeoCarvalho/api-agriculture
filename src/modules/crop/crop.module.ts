import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { CropController } from './controllers/crop.controller';
import { CropService } from './services/crop.service';
import { Property } from '../property/entities/property.entity';
import { Season } from '../season/entities/season.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Crop, Property, Season])],
    exports: [TypeOrmModule],
    controllers: [CropController],
    providers: [CropService],
})

export class CropModule { }
