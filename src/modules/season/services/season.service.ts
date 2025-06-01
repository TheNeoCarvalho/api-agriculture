import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from '../entities/season.entity';

@Injectable()
export class SeasonService {
    constructor(
        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
    ) { }

    async create(createSeasonDto: CreateSeasonDto): Promise<Season> {
        const season = this.seasonRepository.create(createSeasonDto);
        return this.seasonRepository.save(season);
    }

    async findAll(): Promise<Season[]> {
        return this.seasonRepository.find();
    }

    async findOne(id: string): Promise<Season> {
        const season = await this.seasonRepository.findOneBy({ id });
        if (!season) {
            throw new NotFoundException(`Season with ID ${id} not found`);
        }
        return season;
    }

    async update(id: string, updateSeasonDto: UpdateSeasonDto): Promise<Season> {
        const season = await this.findOne(id);
        const updated = this.seasonRepository.merge(season, updateSeasonDto);
        return this.seasonRepository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const season = await this.findOne(id);
        await this.seasonRepository.remove(season);
    }
}
