import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity';
import { BonoDTO } from './bono.dto';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ClaseEntity)
    private readonly claseRepository: Repository<ClaseEntity>,
  ) {}

  async createBono(bono: BonoDTO): Promise<BonoEntity> {
    try {
      // Buscar usuario
      const usuario: UsuarioEntity = await this.usuarioRepository.findOneBy({
        id: bono.usuario,
      });
      if (!usuario) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario no existe',
        });
      }
      // Buscar clase
      const clase: ClaseEntity = await this.claseRepository.findOneBy({
        id: bono.clase,
      });
      if (!clase) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'La clase no existe',
        });
      }
      if (bono.monto <= 0 || !bono.monto) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El monto no debe ser vacio y debe ser mayor a 0',
        });
      } else if (usuario.rol !== 'Profesor') {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario debe tener el rol de Profesor',
        });
      } else {
        const bonoToCreate: BonoEntity = new BonoEntity();
        bonoToCreate.usuario = usuario;
        bonoToCreate.clase = clase;
        bonoToCreate.monto = bono.monto;
        bonoToCreate.calificacion = bono.calificacion;
        bonoToCreate.clave = bono.clave;
        return await this.bonoRepository.save(bonoToCreate);
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findBonoByCodigo(cod: number): Promise<BonoEntity> {
    return await this.bonoRepository.findOne({
      where: { id: cod },
      relations: ['usuario', 'clase'],
    });
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
        relations: ['usuario', 'clase'],
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
    try {
      if (bono.calificacion > 4) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar. El bono tiene calificación mayor a 4',
        });
      } else {
        return await this.bonoRepository.delete({ id: id });
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
    
  }
}
