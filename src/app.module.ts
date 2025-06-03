import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PlotModule } from './modules/plot/plot.module';
import { Producer } from './modules/producer/entities/producer.entity';
import { Crop } from './modules/crop/entities/crop.entity';
import { Season } from './modules/season/entities/season.entity';
import { Property } from './modules/property/entities/property.entity';
import { Planting } from './modules/planting/entities/planting.entity';
import { Plot } from './modules/plot/entities/plot.entity';
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
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        url: 'postgresql://neondb_owner:npg_HkFUZs80ORIl@ep-nameless-mountain-a47x5nd6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true,
        entities: [Producer, Crop, Season, Property, Plot, Planting, User]
      }),
    AuthModule,
    UserModule,
    ProducerModule,
    PropertyModule,
    SeasonModule,
    PlantingModule,
    PlotModule,
    CropModule,
  ],
})

export class AppModule { }
