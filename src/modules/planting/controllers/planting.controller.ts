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
@ApiResponse({ status: 200, description: 'Plantings criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar planting' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlantingController {
    constructor(private readonly service: PlantingService) { }

    @Post()
    create(@Body() dto: CreatePlantingDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePlantingDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
