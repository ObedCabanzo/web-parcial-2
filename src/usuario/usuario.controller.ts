import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  public async register(@Body() body: UsuarioEntity) {
    return this.usuarioService.crearUsuario(body);
  }

  @Get(':id')
  public async findUsuarioById(@Param('id') id: number) {
    return this.usuarioService.findUsuarioById(id);
  }

  @Delete(':id')
  public async eliminarUsuarioById(@Param('id') id: number) {
    return this.usuarioService.eliminarUsuarioById(id);
  }
}
