import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity';
import { ClaseController } from './clase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    providers: [ClaseService],
    imports: [TypeOrmModule.forFeature([ClaseEntity])],
    controllers: [ClaseController],

})
export class ClaseModule {}
