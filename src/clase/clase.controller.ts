import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity';

@Controller('clases')
export class ClaseController {
    constructor(private readonly claseService: ClaseService) {}

    @Post()
    public async crearClase(@Body() body: ClaseEntity ){
        return this.claseService.crearClase(body)
    }

    @Get(':id')
    public async findClaseById( @Param('id') id: number){
        return this.claseService.findById(id)
    }
}
