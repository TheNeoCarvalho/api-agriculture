import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/season.entity';
import { SeasonService } from './services/season.service';
import { SeasonController } from './controllers/season.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Season]),
    ],
    providers: [SeasonService],
    controllers: [SeasonController],
    exports: [SeasonService],
})
export class SeasonModule { }