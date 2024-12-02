import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { TypeOrmTestingConfig } from '../utils/typeorm_config';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let claseRepository: Repository<ClaseEntity>;

  let usuario : UsuarioEntity = {
    id:1,
    cedula: 123456789,
    extension: 101,
    nombre: 'Juan Pérez',
    grupo: 'TICSW',
    rol: 'Profesor',
    jefe: null,
    subordinados: [],
    bonos: [],
    clases: []
  }

  let clase : ClaseEntity = {
    codigo: '1234567890',
    nombre: 'Clase de prueba',
    bonos: [],
    usuario: null,
    creditos: 3,
    id: 1
  };

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

    await usuarioRepository.save(usuario);
    await claseRepository.save(clase);
  };

  it('should create bono successfully', async () => {
    
    const bono : BonoEntity = {
      id: 0,
      monto: 100,
      calificacion: 4.5,
      clave: 1234,
      usuario: usuario,
      clase: clase
    };

    const result = await service.createBono(bono);
    expect(result).toEqual(bono);
  });

  it('should throw error for invalid bono amount', async () => {
    const bono : BonoEntity = {
      id: 0,
      monto: 0,
      calificacion: 4.5,
      clave: 1234,
      usuario: usuario,
      clase: clase
    };

    await expect(service.createBono(bono)).rejects.toThrow(new ErrorManager({
      type: 'BAD_REQUEST',
      message: 'El monto no debe ser vacio y debe ser mayor a 0',
    }));
  });
});
