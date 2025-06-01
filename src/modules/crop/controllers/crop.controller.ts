import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CropService } from '../services/crop.service';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('crops')
@ApiTags('Crops')
export class CropController {
    constructor(private readonly cropService: CropService) { }

    @Post()
    create(@Body() createCropDto: CreateCropDto) {
        return this.cropService.create(createCropDto);
    }

    @Get()
    findAll() {
        return this.cropService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cropService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
        return this.cropService.update(id, updateCropDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cropService.remove(id);
    }
}
