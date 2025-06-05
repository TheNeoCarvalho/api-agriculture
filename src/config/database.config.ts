import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const configService = new ConfigService();

const isCompiled = path.extname(fileURLToPath(import.meta.url)) === '.js';

export default new DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
    entities: [isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
    migrations: [isCompiled ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],
});
