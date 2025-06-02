import { Test, TestingModule } from '@nestjs/testing';
import { PlotService } from './plot.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plot } from '../entities/plot.entity';
import { Repository } from 'typeorm';

const mockPlot = { id: 1, name: 'Plot 01', area: 10.5 };

describe('PlotService', () => {
    let service: PlotService;
    let repo: Repository<Plot>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlotService,
                {
                    provide: getRepositoryToken(Plot),
                    useValue: {
                        find: jest.fn().mockResolvedValue([mockPlot]),
                        findOneBy: jest.fn().mockResolvedValue(mockPlot),
                        save: jest.fn().mockResolvedValue(mockPlot),
                    },
                },
            ],
        }).compile();

        service = module.get<PlotService>(PlotService);
        repo = module.get<Repository<Plot>>(getRepositoryToken(Plot));
    });

    it('should list all plots', async () => {
        const plots = await service.findAll();
        expect(plots).toEqual([mockPlot]);
        expect(repo.find).toHaveBeenCalled();
    });

    it('should create a plot', async () => {
        const newPlot = await service.create({ name: 'Plot 01', area: 10.5, propertyId: '123e4567-e89b-12d3-a456-426614174000' });
        expect(newPlot).toEqual(mockPlot);
        expect(repo.save).toHaveBeenCalledWith({ name: 'Plot 01', area: 10.5, propertyId: '123e4567-e89b-12d3-a456-426614174000' });
    });
});
