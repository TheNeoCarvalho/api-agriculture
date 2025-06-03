import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { User } from '../entities/user.entity';

@Controller('users')
@ApiTags('Users')
@ApiResponse({ status: 200, description: 'Usuário criado com sucesso' })
@ApiResponse({ status: 400, description: 'Erro ao criar usuário' })
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiResponse({ status: 200, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao criar usuário' })
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Usuários encontrados com sucesso', type: User, isArray: true, example: [{ id: 'e736e5cb-12d5-48a8-b407-163c0d557a93', name: 'John Doe', email: 'john.doe@example.com' }] })
    @ApiResponse({ status: 400, description: 'Erro ao buscar usuários' })
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao buscar usuário' })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao atualizar usuário' })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao deletar usuário' })
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
