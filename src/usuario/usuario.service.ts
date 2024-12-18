import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BonoEntity } from '../bono/bono.entity';
import { ErrorManager } from '../utils/error.manager';
import { UsuarioDTO } from './usuario.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
  ) {}

  async crearUsuario(usuarioDTO: UsuarioDTO): Promise<UsuarioEntity> {

    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDTO);

    const usuarioExistente: UsuarioEntity = await this.usuarioRepository.findOneBy({
      cedula: usuarioDTO.cedula,
    });

    

    const grupoValido = ['TICSW', 'IMAGINE', 'COMIT'];
    try {
      if (usuarioExistente) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario ya existe',
        });
      } 
      if (usuario.rol === 'Profesor') {
        if (grupoValido.includes(usuario.grupo)) {

          
          return await this.usuarioRepository.save(usuario);
        } else if (usuario.subordinados.length !== 0) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'El usuario no puede tener subordinados',
          });
        } else {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'El usuario no está en un grupo valido',
          });
        }
      } else if (usuario.rol === 'Decana') {
        if (usuario.extension.toString().length !== 8) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'La extensión debe del usuario debe ser de 8 digitos',
          });
        } else if (usuario.jefe !== undefined) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'El usuario no puede tener un jefe',
          });
        } else {
          return await this.usuarioRepository.save(usuario);
        }
      } else {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Rol de usuario invalido',
        });
      }
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
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
        if (bonos.length !== 0) {
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
      throw  ErrorManager.createSignatureError(error.message);
    }
  }
}
