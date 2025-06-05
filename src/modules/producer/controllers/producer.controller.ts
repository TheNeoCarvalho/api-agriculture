import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { ProducerService } from '../services/producer.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';


@Controller('producers')
@ApiTags('Producers')
@ApiResponse({ status: 200, description: 'Producers criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar producer' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProducerController {
    constructor(private readonly service: ProducerService) { }

    @Post()
    @ApiResponse({ status: 200, description: 'Produtor criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar produtor' })
    create(@Body() dto: CreateProducerDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Produtores encontrados com sucesso', isArray: true })
    @ApiResponse({ status: 400, description: 'Erro ao buscar produtores' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Produtor encontrado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao buscar produtor' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Produtor atualizado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao atualizar produtor' })
    update(@Param('id') id: string, @Body() dto: UpdateProducerDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Produtor deletado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao deletar produtor' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
