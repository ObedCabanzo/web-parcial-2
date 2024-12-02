import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';

export class UsuarioDTO {
  @IsNumber()
  @IsNotEmpty()
  cedula: number;

  @IsNumber()
  @IsNotEmpty()
  extension: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  grupo: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Profesor', 'Estudiante'])
  rol: string;

  @IsOptional()
  @IsNumber()
  jefe: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  subordinados: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  bonos: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  clases: number[];


}
