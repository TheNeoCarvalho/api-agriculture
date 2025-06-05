import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@Controller('auth')
@ApiTags('Auth', 'Autenticação e Registro de Usuários')
@ApiResponse({ status: 500, description: 'Erro interno do servidor' })
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Post('register')
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro ao registrar usuário' })
    register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }
}
