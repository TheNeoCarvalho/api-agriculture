import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/season.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Season])],
    exports: [TypeOrmModule],
})
export class SeasonModule { }
