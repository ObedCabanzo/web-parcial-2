
import { ClaseEntity } from 'src/clase/clase.entity';
import { JefeEntity } from 'src/jefe/jefe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @Column({type: 'int'})
    cedula: number;

    @Column({type: 'int'})
    extension: number;

    @Column()
    nombre: string;

    @Column()
    grupo: string;
    
    @Column()
    rol: string; // Profesor || Decano

    @ManyToOne(( ) => JefeEntity, jefe => jefe.subordinados)
    jefe : JefeEntity;
    
    @OneToMany(( ) => JefeEntity, jefe => jefe.subordinados)
    bonos : JefeEntity[];

    @OneToMany( ()=> ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];


    



}
