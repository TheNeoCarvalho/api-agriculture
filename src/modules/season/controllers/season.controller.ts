import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { SeasonService } from '../services/season.service';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('seasons')
@ApiTags('Seasons')
@ApiResponse({ status: 200, description: 'Safra criada com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar Safra' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Safra criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar safra' })
    create(@Body() createSeasonDto: CreateSeasonDto) {
        return this.seasonService.create(createSeasonDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Safras encontradas com sucesso' })
    @ApiResponse({ status: 404, description: 'Nenhuma safra encontrada' })
    findAll() {
        return this.seasonService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Safra encontrada com sucesso' })
    @ApiResponse({ status: 404, description: 'Safra não encontrada' })
    findOne(@Param('id') id: string) {
        return this.seasonService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Safra atualizada com sucesso' })
    @ApiResponse({ status: 404, description: 'Safra não encontrada' })
    update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
        return this.seasonService.update(id, updateSeasonDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Safra removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Safra não encontrada' })
    remove(@Param('id') id: string) {
        return this.seasonService.remove(id);
    }
}
