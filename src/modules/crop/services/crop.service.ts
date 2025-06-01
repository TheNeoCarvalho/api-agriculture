import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../entities/crop.entity';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';

@Injectable()
export class CropService {
    constructor(
        @InjectRepository(Crop)
        private readonly cropRepository: Repository<Crop>,
    ) { }

    async create(createCropDto: CreateCropDto): Promise<Crop> {
        const crop = this.cropRepository.create(createCropDto);
        return this.cropRepository.save(crop);
    }

    async findAll(): Promise<Crop[]> {
        return this.cropRepository.find();
    }

    async findOne(id: string): Promise<Crop> {
        const crop = await this.cropRepository.findOne({ where: { id } });
        if (!crop) {
            throw new NotFoundException(`Crop with ID ${id} not found`);
        }
        return crop;
    }

    async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
        const crop = await this.findOne(id);
        const updated = Object.assign(crop, updateCropDto);
        return this.cropRepository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const crop = await this.findOne(id);
        await this.cropRepository.remove(crop);
    }
}
