import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/season.entity';
import { Planting } from '../planting/entities/planting.entity';
import { SeasonService } from './services/season.service';
import { SeasonController } from './controllers/season.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Season, Planting]),
    ],
    providers: [SeasonService],
    controllers: [SeasonController],
    exports: [SeasonService],
})
export class SeasonModule { }