import { BonoEntity } from "../bono/bono.entity";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number // Long autogenerado
    
    @Column()
    nombre: string;
    
    @Column()
    codigo: string;
    
    @Column({type: 'int'})
    creditos: number; // int

    @ManyToOne(()=> UsuarioEntity, usuario => usuario.clases)
    usuario: UsuarioEntity;

    @OneToMany(()=> BonoEntity, bono => bono.clase)
    bonos: BonoEntity[]

} 
