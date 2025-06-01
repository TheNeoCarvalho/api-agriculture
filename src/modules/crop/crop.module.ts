import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Crop])],
    exports: [TypeOrmModule],
})
export class CropModule { }
