import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();

export const typeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
});
