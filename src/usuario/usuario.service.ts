import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity';
import { ErrorManager } from 'src/utils/error.manager';

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
    try {
      if (usuario.rol === 'Profesor') {
        if (grupoValido.includes(usuario.grupo)) {
          return await this.usuarioRepository.save(usuario);
        } else {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'El usuario no está en un grupo valido',
          });
        }
      } else if (usuario.rol === 'Decana') {
        if (usuario.extension.toString().length === 8) {
          return await this.usuarioRepository.save(usuario);
        } else {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'La extensión debe del usuario debe ser de 8 digitos',
          });
        }
      } else {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Rol de usuario invalido',
        });
      }
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async findUsuarioById(id: number): Promise<UsuarioEntity> {
    return await this.usuarioRepository.findOneBy({ id: id });
  }

  async eliminarUsuarioById(id: number): Promise<DeleteResult | undefined> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOneBy({
      id: id,
    });

    try {
      if (usuario) {
        const bonos: BonoEntity[] = await this.bonoRepository.findBy({
          usuario: usuario,
        });
        if (bonos.length === 0) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'El usuario tiene bonos asociados',
          });
        } else if (usuario.rol === 'Decana') {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'El usuario es de tipo Decana',
          });
        } else {
          return await this.usuarioRepository.delete({ id: usuario.id });
        }
      } else {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario no existe',
        });
      }
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
}
