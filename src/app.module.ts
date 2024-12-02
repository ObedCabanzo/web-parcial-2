import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BonoModule } from './bono/bono.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ClaseModule } from './clase/clase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono/bono.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { ClaseEntity } from './clase/clase.entity';

@Module({
  imports: [
    BonoModule,
    UsuarioModule,
    ClaseModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [
        BonoEntity,
        UsuarioEntity,
        ClaseEntity,
      ],
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
