import { BonoEntity } from "src/bono/bono.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class ClaseEntity {
    
    @PrimaryGeneratedColumn({type: 'bigint'})
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
