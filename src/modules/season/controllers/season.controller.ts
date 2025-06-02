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
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('seasons')
@ApiTags('Seasons')
@ApiResponse({ status: 200, description: 'Seasons criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar season' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) { }

    @Post()
    create(@Body() createSeasonDto: CreateSeasonDto) {
        return this.seasonService.create(createSeasonDto);
    }

    @Get()
    findAll() {
        return this.seasonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.seasonService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
        return this.seasonService.update(id, updateSeasonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.seasonService.remove(id);
    }
}
