import { ClaseEntity } from "src/clase/clase.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BonoEntity {
    
    @PrimaryGeneratedColumn({type: 'bigint'})
    id : number;
    
    @Column({type: 'int'})
    monto : number;
    
    @Column({type: 'double'})
    calificacion : number;
    
    @Column()
    clave : number;

    @Column()
    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos )
    usuario: UsuarioEntity;

    @Column()
    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;
    
}
