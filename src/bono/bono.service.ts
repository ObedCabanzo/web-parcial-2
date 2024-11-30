import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async createBono(bono: BonoEntity): Promise<BonoEntity> {
    try {
      if (bono.monto <= 0 || !bono.monto) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El monto no debe ser vacio y debe ser mayor a 0',
        });
      } else if (bono.usuario.rol !== 'Profesor') {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario debe tener el rol de Profesor',
        });
      } else {
        return await this.bonoRepository.save(bono);
      }
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async findBonoByCodigo(cod: number): Promise<BonoEntity> {
    return await this.bonoRepository.findOneBy({ id: cod });
  }

  async findAllBonosByUsuario(userId: number): Promise<BonoEntity[]> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOneBy({
      id: userId,
    });

    try {
      if (!usuario) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario no existe',
        });
      }
      const bonos: BonoEntity[] = await this.bonoRepository.find({
        where: {
          usuario: { id: userId },
        },
      });

      if (bonos.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario no tiene bonos',
        });
      } else {
        return bonos;
      }
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteBono(id: number): Promise<DeleteResult | undefined> {
    const bono: BonoEntity = await this.bonoRepository.findOneBy({ id: id });
    if (bono.calificacion > 4) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No se pudo eliminar. El bono tiene calificación mayor a 4',
      });
    } else {
      return await this.bonoRepository.delete({ id: id });
    }
  }
}
