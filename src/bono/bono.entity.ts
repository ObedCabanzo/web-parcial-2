import { ClaseEntity } from "../clase/clase.entity";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BonoEntity {
    
  @PrimaryGeneratedColumn('increment')
    id : number;
    
    @Column({type: 'int'})
    monto : number;
    
    @Column({type: 'double'})
    calificacion : number;
    
    @Column()
    clave : number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos )
    usuario: UsuarioEntity;

    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;
    
}
