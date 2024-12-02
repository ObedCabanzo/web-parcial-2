import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { TypeOrmTestingConfig } from '../utils/typeorm_config';
import { BonoDTO } from './bono.dto';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let claseRepository: Repository<ClaseEntity>;

  let usuario : UsuarioEntity = new UsuarioEntity();
  let clase : ClaseEntity = new ClaseEntity();



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        BonoService,
      ],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonoRepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    claseRepository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));

    await seedDatabase();

  });

  const seedDatabase = async () => {
    bonoRepository.clear();
    usuarioRepository.clear();
    claseRepository.clear();

    usuario.nombre = 'Juan';
    usuario.cedula = 123456789;
    usuario.extension = 12345678;
    usuario.rol = 'Profesor';
    usuario.grupo = 'TICSW';
    usuario.subordinados = [];

    clase.nombre = 'Clase 1';
    clase.codigo = '1234567890';
    clase.creditos = 3;
    clase.usuario = usuario;
    clase.bonos = [];
    
    usuario = await usuarioRepository.save(usuario);
    clase = await claseRepository.save(clase);
  };

  it('should create bono successfully', async () => {
    
    const bono : BonoDTO = {
      id: 0,
      monto: 100,
      calificacion: 4.5,
      clave: 1234,
      usuario: usuario.id,
      clase: clase.id
    };

    const result = await service.createBono(bono);
    expect(result.clave).toEqual(result.clave); 
  }); 

  it('should throw error for invalid bono amount', async () => {
    const bono : BonoDTO = {
      id: 0,
      monto: 0,
      calificacion: 4.5,
      clave: 1234,
      usuario: usuario.id,
      clase: clase.id
    };

    await expect(service.createBono(bono)).rejects.toThrow(new ErrorManager({
      type: 'BAD_REQUEST',
      message: 'El monto no debe ser vacio y debe ser mayor a 0',
    }));
  });
});
