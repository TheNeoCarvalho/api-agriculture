import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { Producer } from './modules/producer/entities/producer.entity';
import { Crop } from './modules/crop/entities/crop.entity';
import { Season } from './modules/season/entities/season.entity';
import { Property } from './modules/property/entities/property.entity';
import { Planting } from './modules/planting/entities/planting.entity';
import { CropModule } from './modules/crop/crop.module';
import { SeasonModule } from './modules/season/season.module';
import { PlantingModule } from './modules/planting/planting.module';
import { ProducerModule } from './modules/producer/producer.module';
import { PropertyModule } from './modules/property/property.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Producer, Crop, Season, Planting, Property, User]
    }),
    AuthModule,
    UserModule,
    ProducerModule,
    PropertyModule,
    SeasonModule,
    CropModule,
    PlantingModule
  ],
})

export class AppModule { }
