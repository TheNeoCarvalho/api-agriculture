import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CropService } from '../services/crop.service';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Crop } from '../entities/crop.entity';

@Controller('crops')
@ApiTags('Crops')
@ApiResponse({ status: 200, description: 'Cultivo criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar Cultivo' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CropController {
    constructor(private readonly cropService: CropService) { }

    @Post()
    create(@Body() createCropDto: CreateCropDto) {
        return this.cropService.create(createCropDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Cultivos encontrados com sucesso', type: Crop, isArray: true })
    @ApiResponse({ status: 404, description: 'Nenhum cultivo encontrado' })
    findAll() {
        return this.cropService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Cultivo encontrado com sucesso', type: Crop })
    @ApiResponse({ status: 404, description: 'Cultivo não encontrado' })
    findOne(@Param('id') id: string) {
        return this.cropService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Cultivo atualizado com sucesso', type: Crop })
    @ApiResponse({ status: 404, description: 'Cultivo não encontrado' })
    update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
        return this.cropService.update(id, updateCropDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Cultivo removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Cultivo não encontrado' })
    remove(@Param('id') id: string) {
        return this.cropService.remove(id);
    }
}
