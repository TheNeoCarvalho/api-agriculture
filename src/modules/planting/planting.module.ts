import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planting } from './entities/planting.entity';
import { PlantingService } from './services/planting.service';
import { PlantingController } from './controllers/planting.controller';
import { CropModule } from '../crop/crop.module';
import { SeasonModule } from '../season/season.module';
import { Crop } from '../crop/entities/crop.entity';
import { Season } from '../season/entities/season.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Planting, Crop, Season]),
        CropModule,
        SeasonModule,
    ],
    controllers: [PlantingController],
    providers: [PlantingService],
})
export class PlantingModule { }
