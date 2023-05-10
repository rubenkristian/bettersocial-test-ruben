import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretKeyList } from './common/secret';
import { User } from './registration/model/user.entity';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    RegistrationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: SecretKeyList.POSTGRE_HOST,
      port: Number(SecretKeyList.POSTGRES_PORT),
      username: SecretKeyList.POSTGRES_USER,
      password: SecretKeyList.POSTGRES_PASSWORD,
      database: SecretKeyList.POSTGRES_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
