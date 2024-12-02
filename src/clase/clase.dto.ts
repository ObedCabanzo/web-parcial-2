
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ClaseDTO {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsNumber()
    @IsNotEmpty()
    creditos: number;

    @IsNumber()
    @IsNotEmpty()
    usuario: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    bonos: number[];
}
  