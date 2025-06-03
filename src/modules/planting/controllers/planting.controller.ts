import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { PlantingService } from '../services/planting.service';
import { CreatePlantingDto } from '../dto/create-planting.dto';
import { UpdatePlantingDto } from '../dto/update-planting.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('plantings')
@ApiTags('Plantings')
@ApiResponse({ status: 200, description: 'Platação criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar platação' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlantingController {
    constructor(private readonly service: PlantingService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Platação criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar platação' })
    create(@Body() dto: CreatePlantingDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Plantações encontradas com sucesso', type: CreatePlantingDto, isArray: true })
    @ApiResponse({ status: 404, description: 'Nenhuma plantação encontrada' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Platação encontrada com sucesso', type: CreatePlantingDto })
    @ApiResponse({ status: 404, description: 'Platação não encontrada' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Platação atualizada com sucesso', type: CreatePlantingDto })
    @ApiResponse({ status: 404, description: 'Platação não encontrada' })
    update(@Param('id') id: string, @Body() dto: UpdatePlantingDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Platação removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Platação não encontrada' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
