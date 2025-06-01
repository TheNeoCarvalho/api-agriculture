import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planting } from './entities/planting.entity';
import { PlantingService } from './services/planting.service';
import { PlantingController } from './controllers/planting.controller';
import { PlotModule } from '../plot/plot.module';
import { CropModule } from '../crop/crop.module';
import { SeasonModule } from '../season/season.module';
import { Plot } from '../plot/entities/plot.entity';
import { Crop } from '../crop/entities/crop.entity';
import { Season } from '../season/entities/season.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Planting, Plot, Crop, Season]),
        PlotModule,
        CropModule,
        SeasonModule,
    ],
    controllers: [PlantingController],
    providers: [PlantingService],
})
export class PlantingModule { }
