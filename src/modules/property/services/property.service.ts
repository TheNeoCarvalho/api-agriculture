import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Producer } from '../../producer/entities/producer.entity';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class PropertyService {

    private readonly logger = new Logger(PropertyService.name);

    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,

        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ) { }

    async create(dto: CreatePropertyDto): Promise<Property> {
        this.logger.log('Criando propriedade: ${JSON.stringify(dto)}');

        const sum = dto.agricultureArea + dto.vegetationArea;
        if (sum > dto.totalArea) {
            throw new BadRequestException(
                'A soma das áreas agricultável e de vegetação não pode exceder a área total da fazenda.',
            );
        }


        const producer = await this.producerRepository.findOne({
            where: { id: dto.producerId },
        });

        if (!producer) {
            throw new NotFoundException('Produtor não encontrado');
        }

        const property = this.propertyRepository.create({
            ...dto,
            producer,
        });

        this.logger.log('Propriedade criada: ${JSON.stringify(property)}');
        return this.propertyRepository.save(property);
    }

    async findAll(): Promise<Property[]> {
        this.logger.log('Buscando todas as propriedades');
        return this.propertyRepository.find({ relations: ['producer'] });
    }

    async findOne(id: string): Promise<Property> {
        const property = await this.propertyRepository.findOne({
            where: { id },
            relations: ['producer'],
        });

        if (!property) throw new NotFoundException('Propriedade não encontrada');

        this.logger.log('Propriedade encontrada: ${JSON.stringify(property)}');

        return property;
    }

    async update(id: string, dto: UpdatePropertyDto): Promise<Property> {
        const property = await this.findOne(id);

        if (dto.agricultureArea !== undefined && dto.vegetationArea !== undefined && dto.totalArea !== undefined) {
            const sum = dto.agricultureArea + dto.vegetationArea;
            if (sum > dto.totalArea) {
                throw new BadRequestException(
                    'A soma das áreas agricultável e de vegetação não pode exceder a área total da fazenda.',
                );
            }
        }

        Object.assign(property, dto);
        this.logger.log('Propriedade atualizada: ${JSON.stringify(property)}');
        return this.propertyRepository.save(property);
    }
    async remove(id: string): Promise<void> {
        const property = await this.findOne(id);
        await this.propertyRepository.remove(property);
        this.logger.log('Propriedade removida com sucesso');
    }
}
