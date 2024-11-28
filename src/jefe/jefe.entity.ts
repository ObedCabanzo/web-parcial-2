import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, OneToMany } from "typeorm";
 
@Entity()
export class JefeEntity {

    @Column()
    usuario: UsuarioEntity

    @Column()
    @OneToMany(() => UsuarioEntity, usuario => usuario.jefe)
    subordinados : UsuarioEntity[];
    
}
