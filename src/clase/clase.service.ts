import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity';
import { ErrorManager } from '../utils/error.manager';
import { ClaseDTO } from './clase.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseEntity)
    private readonly claseRepository: Repository<ClaseEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async crearClase(claseDTO: ClaseDTO): Promise<ClaseEntity> {
    const usuario = await this.usuarioRepository.findOneBy({
      id: claseDTO.usuario,
    });
    try {
      if (!usuario) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario no existe',
        });
      }
      if (claseDTO.codigo.length !== 10) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El codigo debe tener 10 caracteres',
        });
      } else {
        const clase: ClaseEntity = new ClaseEntity();
        clase.codigo = claseDTO.codigo;
        clase.usuario = usuario;
        clase.creditos = claseDTO.creditos;
        clase.nombre = claseDTO.nombre;
        return await this.claseRepository.save(clase);
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findById(id: number): Promise<ClaseEntity> {
    return await this.claseRepository.findOne({ where: { id: id }, relations: ['usuario'] });
  }
}
