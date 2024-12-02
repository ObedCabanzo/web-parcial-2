import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity';
import { ClaseController } from './clase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';


@Module({
    providers: [ClaseService],
    imports: [TypeOrmModule.forFeature([ClaseEntity, UsuarioEntity])],
    controllers: [ClaseController],

})
export class ClaseModule {}
