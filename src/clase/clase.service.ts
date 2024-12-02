import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity';
import { ErrorManager } from '../utils/error.manager';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseEntity)
    private readonly claseRepository: Repository<ClaseEntity>,
  ) {}

  async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
    try {
      if (clase.codigo.length !== 10) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El codigo debe tener 10 caracteres',
        });
      } else {
        return await this.claseRepository.save(clase);
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findById(id: number): Promise<ClaseEntity> {
    return await this.claseRepository.findOneBy({ id: id });
  }
}
