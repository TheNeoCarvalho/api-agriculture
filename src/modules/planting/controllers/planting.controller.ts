import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { PlantingService } from '../services/planting.service';
import { CreatePlantingDto } from '../dto/create-planting.dto';
import { UpdatePlantingDto } from '../dto/update-planting.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('plantings')
@ApiTags('Plantings')
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
