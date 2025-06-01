import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planting } from '../entities/planting.entity';
import { CreatePlantingDto } from '../dto/create-planting.dto';
import { UpdatePlantingDto } from '../dto/update-planting.dto';
import { Plot } from '../../plot/entities/plot.entity';
import { Crop } from '../../crop/entities/crop.entity';
import { Season } from '../../season/entities/season.entity';

@Injectable()
export class PlantingService {
    constructor(
        @InjectRepository(Planting)
        private readonly plantingRepository: Repository<Planting>,

        @InjectRepository(Plot)
        private readonly plotRepository: Repository<Plot>,

        @InjectRepository(Crop)
        private readonly cropRepository: Repository<Crop>,

        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
    ) { }

    async create(dto: CreatePlantingDto): Promise<Planting> {
        const plot = await this.plotRepository.findOne({ where: { id: dto.plotId } });
        if (!plot) throw new NotFoundException('Plot não encontrado');

        const crop = await this.cropRepository.findOne({ where: { id: dto.cropId } });
        if (!crop) throw new NotFoundException('Crop não encontrado');

        const season = await this.seasonRepository.findOne({ where: { id: dto.seasonId } });
        if (!season) throw new NotFoundException('Season não encontrado');

        const planting = this.plantingRepository.create({
            plot,
            crop,
            season,
            plantedArea: dto.plantedArea,
        });

        return this.plantingRepository.save(planting);
    }

    findAll(): Promise<Planting[]> {
        return this.plantingRepository.find();
    }

    async findOne(id: string): Promise<Planting> {
        const planting = await this.plantingRepository.findOne({ where: { id } });
        if (!planting) throw new NotFoundException('Planting não encontrado');
        return planting;
    }

    async update(id: string, dto: UpdatePlantingDto): Promise<Planting> {
        const planting = await this.findOne(id);

        if (dto.plotId) {
            const plot = await this.plotRepository.findOne({ where: { id: dto.plotId } });
            if (!plot) throw new NotFoundException('Plot não encontrado');
            planting.plot = plot;
        }

        if (dto.cropId) {
            const crop = await this.cropRepository.findOne({ where: { id: dto.cropId } });
            if (!crop) throw new NotFoundException('Crop não encontrado');
            planting.crop = crop;
        }

        if (dto.seasonId) {
            const season = await this.seasonRepository.findOne({ where: { id: dto.seasonId } });
            if (!season) throw new NotFoundException('Season não encontrado');
            planting.season = season;
        }

        if (dto.plantedArea !== undefined) {
            planting.plantedArea = dto.plantedArea;
        }

        return this.plantingRepository.save(planting);
    }

    async remove(id: string): Promise<void> {
        const planting = await this.findOne(id);
        await this.plantingRepository.remove(planting);
    }
}
