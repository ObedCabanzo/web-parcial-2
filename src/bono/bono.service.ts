import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
  ) {}

  async createBono(bono: BonoEntity): Promise<BonoEntity> {
    if (bono.monto > 0 && bono.monto !== null && bono.usuario.rol === "Profesor") {
      return await this.bonoRepository.save(bono);
    } else {
      throw new Error(
        JSON.stringify({
          message: 'Error de negocio',
          status: '409',
        }),
      );
    }
  }

  async findBonoByCodigo(id: number): Promise<BonoEntity> {
    return await this.bonoRepository.findOneBy({id:id})
  }

  async findBonoByUsuario(idUser: number): Promise<BonoEntity> {

    
    //return await this.bonoRepository.findOneBy({usuario:idUser})
  }
}
