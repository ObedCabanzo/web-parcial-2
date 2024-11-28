import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
  ) {}

  async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const grupoValido = ['TICSW', 'IMAGINE', 'COMIT'];
    if (usuario.rol === 'Profesor' && grupoValido.includes(usuario.grupo)) {
      return await this.usuarioRepository.save(usuario);
    } else if (
      usuario.rol === 'Decana' &&
      usuario.extension.toString().length === 8
    ) {
      return await this.usuarioRepository.save(usuario);
    } else {
      throw new Error(
        JSON.stringify({
          message: 'Error de negocio',
          status: '409',
        }),
      );
    }
  }

  async findUsuarioById(id: number): Promise<UsuarioEntity> {
    return await this.usuarioRepository.findOneBy({ id: id });
  }

  async eliminarUsuarioById(id: number): Promise<any> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOneBy({
      id: id,
    });
    if (usuario !== undefined) {
      const bonos: BonoEntity[] = await this.bonoRepository.findBy({
        usuario: usuario,
      });
      if (usuario.rol !== 'Decana' && bonos.length !== 0) {
        return await this.usuarioRepository.delete({ id: usuario.id });
      } else {
      }
      throw new Error(
        JSON.stringify({
          message: 'Error de negocio',
          status: '409',
        }),
      );
    }
  }
}
