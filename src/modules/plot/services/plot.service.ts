import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plot } from '../entities/plot.entity';
import { CreatePlotDto } from '../dto/create-plot.dto';
import { UpdatePlotDto } from '../dto/update-plot.dto';
import { Property } from '../../property/entities/property.entity';

@Injectable()
export class PlotService {
    constructor(
        @InjectRepository(Plot) private plotRepo: Repository<Plot>,
        @InjectRepository(Property) private propertyRepo: Repository<Property>,
    ) { }

    async create(createPlotDto: CreatePlotDto): Promise<Plot> {
        const property = await this.propertyRepo.findOne({
            where: { id: createPlotDto.propertyId },
            relations: ['plots'],
        });

        if (!property) throw new NotFoundException('Propriedade não encontrada');

        const plot = this.plotRepo.create({
            name: createPlotDto.name,
            area: createPlotDto.area,
            property,
        });

        return this.plotRepo.save(plot);
    }

    findAll() {
        return this.plotRepo.find({ relations: ['property'] });
    }

    findOne(id: string) {
        return this.plotRepo.findOne({ where: { id }, relations: ['property'] });
    }

    async update(id: string, dto: UpdatePlotDto) {
        const plot = await this.plotRepo.preload({ id, ...dto });
        if (!plot) throw new NotFoundException('Talhão não encontrado');
        return this.plotRepo.save(plot);
    }

    async remove(id: string) {
        const plot = await this.findOne(id);
        if (!plot) throw new NotFoundException('Talhão não encontrado');
        return this.plotRepo.remove(plot);
    }
}
