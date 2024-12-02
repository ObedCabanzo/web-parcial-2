import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { BonoEntity } from 'src/bono/bono.entity';

@Module({
  providers: [UsuarioService],
  imports: [TypeOrmModule.forFeature([ UsuarioEntity, BonoEntity ])],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
