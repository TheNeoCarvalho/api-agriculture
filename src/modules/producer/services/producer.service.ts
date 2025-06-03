import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';

@Injectable()
export class ProducerService {

    private readonly logger = new Logger(ProducerService.name);

    constructor(
        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ) { }

    async create(dto: CreateProducerDto): Promise<Producer> {
        const existingProducer = await this.producerRepository.findOne({ where: { document: dto.document } });
        if (existingProducer) {
            throw new BadRequestException('Produtor já cadastrado');
        }

        const producer = this.producerRepository.create(dto);
        this.logger.log('Produtor criado com sucesso');
        return this.producerRepository.save(producer);
    }

    findAll(): Promise<Producer[]> {
        this.logger.log('Buscando todos os produtores');
        return this.producerRepository.find();
    }

    async findOne(id: string): Promise<Producer> {
        const producer = await this.producerRepository.findOne({ where: { id } });
        if (!producer) throw new NotFoundException('Produtor não encontrado');
        this.logger.log('Produtor com id: ${id} encontrado');
        return producer;
    }

    async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
        const producer = await this.findOne(id);
        Object.assign(producer, dto);
        this.logger.log('Produtor atualizado com sucesso');
        return this.producerRepository.save(producer);
    }

    async remove(id: string): Promise<void> {
        const producer = await this.findOne(id);
        await this.producerRepository.remove(producer);
        this.logger.log('Produtor removido com sucesso');
    }
}
