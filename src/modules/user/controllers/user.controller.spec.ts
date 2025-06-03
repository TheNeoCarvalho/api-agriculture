import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mockUser: User = {
        id: 'uuid-mock',
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        password: 'hashedpassword',
    };

    const mockUserService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    afterEach(() => jest.clearAllMocks());

    describe('create', () => {
        it('should create and return a user', async () => {
            const dto: CreateUserDto = {
                name: 'John Doe',
                username: 'john',
                email: 'john@example.com',
                password: '123456',
            };

            mockUserService.create.mockResolvedValue(mockUser);
            const result = await controller.create(dto);
            expect(result).toEqual(mockUser);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            mockUserService.findAll.mockResolvedValue([mockUser]);
            const result = await controller.findAll();
            expect(result).toEqual([mockUser]);
        });
    });

    describe('findOne', () => {
        it('should return a single user by id', async () => {
            mockUserService.findOne.mockResolvedValue(mockUser);
            const result = await controller.findOne('uuid-mock');
            expect(result).toEqual(mockUser);
        });
    });

    describe('update', () => {
        it('should update and return the user', async () => {
            const updateDto: UpdateUserDto = {
                name: 'Updated Name',
            };

            const updatedUser = { ...mockUser, ...updateDto };

            mockUserService.update.mockResolvedValue(updatedUser);
            const result = await controller.update('uuid-mock', updateDto);
            expect(result).toEqual(updatedUser);
        });
    });

    describe('remove', () => {
        it('should remove and return the user', async () => {
            mockUserService.remove.mockResolvedValue(mockUser);
            const result = await controller.remove('uuid-mock');
            expect(result).toEqual(mockUser);
        });
    });
});
