import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
    let service: UserService;
    let repo: Repository<User>;

    const mockUserRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    const mockUser: User = {
        id: 'uuid-mock',
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        password: 'hashedpassword',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    afterEach(() => jest.clearAllMocks());

    describe('create', () => {
        it('should hash password and save the user', async () => {
            const dto: CreateUserDto = {
                name: 'John Doe',
                email: 'john@example.com',
                username: 'john',
                password: '123456',
            };

            const hashed = await bcrypt.hash(dto.password, 10);

            mockUserRepository.create.mockReturnValue({ ...dto, password: hashed });
            mockUserRepository.save.mockResolvedValue(mockUser);

            const result = await service.create(dto);

            expect(mockUserRepository.create).toHaveBeenCalledWith({
                ...dto,
                password: expect.any(String),
            });

            expect(result).toEqual(mockUser);
        });
    });

    describe('findAll', () => {
        it('should return array of users', async () => {
            mockUserRepository.find.mockResolvedValue([mockUser]);
            const users = await service.findAll();
            expect(users).toEqual([mockUser]);
        });
    });

    describe('findOne', () => {
        it('should return user by id', async () => {
            mockUserRepository.findOneBy.mockResolvedValue(mockUser);
            const user = await service.findOne('uuid-mock');
            expect(user).toEqual(mockUser);
        });
    });

    describe('findByEmail', () => {
        it('should return user by email', async () => {
            mockUserRepository.findOneBy.mockResolvedValue(mockUser);
            const user = await service.findByEmail('john@example.com');
            expect(user).toEqual(mockUser);
        });
    });

    describe('update', () => {
        it('should update and return updated user', async () => {
            const updateDto = { name: 'Updated', password: '123456' };
            mockUserRepository.update.mockResolvedValue(undefined);
            mockUserRepository.findOneBy.mockResolvedValue({ ...mockUser, ...updateDto });

            const result = await service.update('uuid-mock', updateDto);
            expect(result).not.toBeNull();
            expect(result!.name).toBe('Updated');
        });
    });

    describe('remove', () => {
        it('should remove the user', async () => {
            mockUserRepository.findOneBy.mockResolvedValue(mockUser);
            mockUserRepository.remove.mockResolvedValue(mockUser);

            const result = await service.remove('uuid-mock');
            expect(result).toEqual(mockUser);
        });
    });
});
