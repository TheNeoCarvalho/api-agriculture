import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            ...dto,
            password: hashedPassword
        });
        Logger.log(`Usuário ${user.username} criado com sucesso`);
        return this.userRepository.save(user);
    }

    findAll() {
        Logger.log('Buscando todos os usuários');
        return this.userRepository.find();
    }

    findOne(id: string) {
        Logger.log(`Buscando usuário com id ${id}`);
        return this.userRepository.findOneBy({ id });
    }

    async findByEmail(email: string) {
        Logger.log(`Buscando usuário com email ${email}`);
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }

    async update(id: string, dto: UpdateUserDto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        await this.userRepository.update(id, dto);
        Logger.log(`Usuário com id ${id} atualizado com sucesso`);
        return this.findOne(id);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        Logger.log(`Usuário com id ${id} removido com sucesso`);
        return this.userRepository.remove(user);
    }
}
