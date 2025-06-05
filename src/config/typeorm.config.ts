import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../modules/user/entities/user.entity';
import { Crop } from '../modules/crop/entities/crop.entity';
import { Property } from '../modules/property/entities/property.entity';
import { Season } from '../modules/season/entities/season.entity';
import { Planting } from '../modules/planting/entities/planting.entity';

export const typeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [User, Crop, Property, Season, Planting],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    synchronize: configService.get('NODE_ENV') !== 'production',
});
