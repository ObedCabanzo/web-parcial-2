import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity';
import { BonoDTO } from './bono.dto';

@Controller('bonos')
export class BonoController {
    constructor(
        private readonly bonoService: BonoService 
    ){}

    @Post()
    public async register(@Body() body: BonoDTO ){
        return this.bonoService.createBono(body)
    }

    @Get(':id')
    public async findBonoByCodigo( @Param('id') id: number){
        return this.bonoService.findBonoByCodigo(id)
    }

    @Get('usuario/:id')
    public async findAllBonosByUsuario( @Param('id') id: number){
        return this.bonoService.findAllBonosByUsuario(id)
    }

    @Delete(':id')
    public async deleteBono( @Param('id') id: number){
        return this.bonoService.deleteBono(id)
    }





}
