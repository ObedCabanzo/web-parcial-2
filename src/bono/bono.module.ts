import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity';
import { BonoController } from './bono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity';

@Module({
  providers: [BonoService],
  imports: [TypeOrmModule.forFeature([BonoEntity, UsuarioEntity, ClaseEntity])],
  controllers: [BonoController],
})
export class BonoModule {}
