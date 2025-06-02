import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async register(dto: RegisterDto) {
        const user = await this.userService.create(dto);
        this.logger.log('Usuário registrado com sucesso!!.');
        return this.generateToken(user.id, user.email);
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);

        if (!user) {
            this.logger.error('Usuário não encontrado');
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);

        if (!isMatch) {
            this.logger.error('Credenciais inválidas');
            throw new UnauthorizedException('Credenciais inválidas');
        }

        this.logger.log('Usuário logado com sucesso!!.');
        return this.generateToken(user.id, user.email);
    }

    generateToken(userId: string, email: string) {
        const payload = { sub: userId, email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}