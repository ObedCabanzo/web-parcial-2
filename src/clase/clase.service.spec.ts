import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../utils/typeorm_config';
import { ClaseEntity } from './clase.entity';
import { ClaseService } from './clase.service';
import { ErrorManager } from '../utils/error.manager';
import { ClaseDTO } from './clase.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';

describe('ClaseService', () => {
  let service: ClaseService;
  let repository: Repository<ClaseEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let usuario: UsuarioEntity = new UsuarioEntity();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get<Repository<ClaseEntity>>(
      getRepositoryToken(ClaseEntity),
    );
    usuarioRepository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    const newUsuario = new UsuarioEntity();
    newUsuario.nombre = 'Juan';
    newUsuario.cedula = 123456789;
    newUsuario.extension = 12345678;
    newUsuario.rol = 'Profesor';
    newUsuario.grupo = 'TICSW';
    newUsuario.subordinados = [];
    usuario = await usuarioRepository.save(newUsuario);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createClase should successfully create a class', async () => {
    const newClase : ClaseDTO = {
      codigo: '1234567890',
      nombre: 'Clase de prueba',
      bonos: [],
      usuario: usuario.id,
      creditos: 3,
    };

    const result = await service.crearClase(newClase);
    expect(result.codigo).toEqual(newClase.codigo);

    const storedClase = await repository.findOne({
      where: { codigo: newClase.codigo },
    });
    expect(storedClase).not.toBeNull();
    expect(storedClase.codigo).toEqual(newClase.codigo);
  });

  it('createClase should throw error for invalid class code', async () => {
    const invalidClase : ClaseDTO = {
      codigo: '1234',
      nombre: 'Clase de prueba',
      bonos: [],
      usuario: null,
      creditos: 3,
    };

    await expect(service.crearClase(invalidClase)).rejects.toThrow(
      new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El codigo debe tener 10 caracteres',
      }),
    );
  });
});
