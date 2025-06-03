import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PlotService } from '../services/plot.service';
import { CreatePlotDto } from '../dto/create-plot.dto';
import { UpdatePlotDto } from '../dto/update-plot.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('plots')
@ApiTags('Plots')
@ApiResponse({ status: 200, description: 'Plots criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar plot' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlotController {
    constructor(private readonly plotService: PlotService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Talhão criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar plot' })
    create(@Body() dto: CreatePlotDto) {
        return this.plotService.create(dto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de talhões recuperada com sucesso' })
    @ApiResponse({ status: 404, description: 'Nenhum talhão encontrado' })
    findAll() {
        return this.plotService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Talhão encontrado com sucesso' })
    @ApiResponse({ status: 404, description: 'Talhão não encontrado' })
    findOne(@Param('id') id: string) {
        return this.plotService.findOne(id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Talhão atualizado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao atualizar plot' })
    update(@Param('id') id: string, @Body() dto: UpdatePlotDto) {
        return this.plotService.update(id, dto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Talhão removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Talhão não encontrado' })
    remove(@Param('id') id: string) {
        return this.plotService.remove(id);
    }
}
