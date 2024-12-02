
    import { BonoEntity } from '../bono/bono.entity';
    import { ClaseEntity } from '../clase/clase.entity';
    import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

    @Entity()
    export class UsuarioEntity {

        @PrimaryGeneratedColumn('increment')
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

        @ManyToOne(() => UsuarioEntity, (usuario) => usuario.subordinados, { nullable: true })
        jefe: UsuarioEntity;
        
        @OneToMany(() => UsuarioEntity, (usuario) => usuario.jefe)
        subordinados: UsuarioEntity[];
        
        @OneToMany(( ) => BonoEntity, bono => bono.usuario)
        bonos : BonoEntity[];

        @OneToMany( ()=> ClaseEntity, clase => clase.usuario)
        clases: ClaseEntity[];


        



    }
