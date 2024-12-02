import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BonoEntity } from './bono.entity';

export class BonoDTO {
  @IsNumber()
  @IsOptional()
  id: number;
  
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsNumber()
  @IsNotEmpty()
  calificacion: number;

  @IsNumber()
  @IsNotEmpty()
  clave: number;

  @IsNumber()
  @IsNotEmpty()
  usuario: number;

  @IsNumber()
  @IsNotEmpty()
  clase: number;
}
