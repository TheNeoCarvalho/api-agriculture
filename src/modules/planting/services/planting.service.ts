import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planting } from '../entities/planting.entity';
import { CreatePlantingDto } from '../dto/create-planting.dto';
import { UpdatePlantingDto } from '../dto/update-planting.dto';
import { Crop } from '../../crop/entities/crop.entity';
import { Season } from '../../season/entities/season.entity';

@Injectable()
export class PlantingService {

    private readonly logger = new Logger(PlantingService.name);

    constructor(
        @InjectRepository(Planting)
        private readonly plantingRepository: Repository<Planting>,

        @InjectRepository(Crop)
        private readonly cropRepository: Repository<Crop>,

        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
    ) { }

    async create(dto: CreatePlantingDto): Promise<Planting> {

        const crop = await this.cropRepository.findOne({ where: { id: dto.cropId } });
        if (!crop) throw new NotFoundException('Cultivo não encontrado');
        this.logger.log('Cultivo com id: ${dto.cropId} encontrado')


        const season = await this.seasonRepository.findOne({ where: { id: dto.seasonId } });
        if (!season) throw new NotFoundException('Safra não encontrada');
        this.logger.log('Safra com id: ${dto.seasonId} encontrada')

        const planting = this.plantingRepository.create({

            crop,
            season,
            plantedArea: dto.plantedArea,
        });

        this.logger.log('Plantação criada com sucesso')
        return this.plantingRepository.save(planting);
    }

    findAll(): Promise<Planting[]> {
        this.logger.log('Encontrando todas as plantações')
        return this.plantingRepository.find();
    }

    async findOne(id: string): Promise<Planting> {
        const planting = await this.plantingRepository.findOne({ where: { id } });
        if (!planting) throw new NotFoundException('Plantação não encontrada');
        this.logger.log('Plantação com id: ${id} encontrado')
        return planting;
    }

    async update(id: string, dto: UpdatePlantingDto): Promise<Planting> {
        const planting = await this.findOne(id);

        if (dto.cropId) {
            const crop = await this.cropRepository.findOne({ where: { id: dto.cropId } });
            if (!crop) throw new NotFoundException('Cultivo não encontrado');
            planting.crop = crop;
        }

        if (dto.seasonId) {
            const season = await this.seasonRepository.findOne({ where: { id: dto.seasonId } });
            if (!season) throw new NotFoundException('Safra não encontrado');
            planting.season = season;
        }

        if (dto.plantedArea !== undefined) {
            planting.plantedArea = dto.plantedArea;
        }

        this.logger.log('Plantação atualizada')
        return this.plantingRepository.save(planting);
    }

    async remove(id: string): Promise<void> {
        const planting = await this.findOne(id);
        await this.plantingRepository.remove(planting);
        this.logger.log('Plantação removida com sucesso')
    }
}
