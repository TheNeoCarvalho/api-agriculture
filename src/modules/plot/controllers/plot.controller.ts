import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PlotService } from '../services/plot.service';
import { CreatePlotDto } from '../dto/create-plot.dto';
import { UpdatePlotDto } from '../dto/update-plot.dto';

@Controller('plots')
export class PlotController {
    constructor(private readonly plotService: PlotService) { }

    @Post()
    create(@Body() dto: CreatePlotDto) {
        return this.plotService.create(dto);
    }

    @Get()
    findAll() {
        return this.plotService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.plotService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePlotDto) {
        return this.plotService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.plotService.remove(id);
    }
}
