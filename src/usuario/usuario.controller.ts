import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  public async register(@Body() body: UsuarioDTO) {
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
