import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioService } from './usuario/usuario.service';
import { BonoService } from './bono/bono.service';
import { ClaseService } from './clase/clase.service';
import { JefeService } from './jefe/jefe.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UsuarioService, BonoService, ClaseService, JefeService],
})
export class AppModule {}
