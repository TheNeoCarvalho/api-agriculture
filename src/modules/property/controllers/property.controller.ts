import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PropertyService } from '../services/property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('properties')
@ApiTags('Properties')
@ApiResponse({ status: 200, description: 'Properties criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar property' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Propriedade criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar propriedade' })
    async create(@Body() dto: CreatePropertyDto): Promise<Property> {
        return this.propertyService.create(dto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de propriedades retornada com sucesso' })
    @ApiResponse({ status: 404, description: 'Nenhuma propriedade encontrada' })
    async findAll(): Promise<Property[]> {
        return this.propertyService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Propriedade encontrada com sucesso' })
    @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
    async findOne(@Param('id') id: string): Promise<Property> {
        return this.propertyService.findOne(id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Propriedade atualizada com sucesso' })
    @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
    async update(@Param('id') id: string, @Body() dto: UpdatePropertyDto): Promise<Property> {
        return this.propertyService.update(id, dto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Propriedade removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.propertyService.remove(id);
    }
}
