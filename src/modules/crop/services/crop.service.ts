import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../entities/crop.entity';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { Property } from 'src/modules/property/entities/property.entity';
import { Season } from 'src/modules/season/entities/season.entity';

@Injectable()
export class CropService {

    private readonly logger = new Logger(CropService.name);

    constructor(
        @InjectRepository(Crop)
        private readonly cropRepository: Repository<Crop>,
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
    ) { }

    async create(createCropDto: CreateCropDto): Promise<Crop> {
        const { name, propertyId, seasonId } = createCropDto;

        const property = await this.propertyRepository.findOneBy({ id: propertyId });
        if (!property) throw new NotFoundException('Propriedade não encontrada');

        const season = await this.seasonRepository.findOneBy({ id: seasonId });
        if (!season) throw new NotFoundException('Safra não encontrada');

        const crop = this.cropRepository.create({
            name,
            property,
            season,
        });

        this.logger.log('Criando plantação');
        this.logger.log(JSON.stringify(crop));

        return this.cropRepository.save(crop);
    }

    async findAll(): Promise<Crop[]> {
        this.logger.log('Encontrando todas as plantações')
        return this.cropRepository.find();
    }

    async findOne(id: string): Promise<Crop> {
        const crop = await this.cropRepository.findOne({ where: { id } });
        if (!crop) {
            this.logger.log('plantação com id: ${id} não encontrado')
            throw new NotFoundException(`plantação com id: ${id} não encontrado`);
        }
        this.logger.log('plantação com id: ${id} encontrado')
        return crop;
    }

    async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
        const crop = await this.findOne(id);
        const updated = Object.assign(crop, updateCropDto);
        this.logger.log('Atualizando plantação: ${JSON.stringify(updated)}')
        return this.cropRepository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const crop = await this.findOne(id);
        await this.cropRepository.remove(crop);
        this.logger.log('plantação removida com sucesso')
    }
}
