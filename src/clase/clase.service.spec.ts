import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../utils/typeorm_config';
import { ClaseEntity } from './clase.entity';
import { ClaseService } from './clase.service';
import { ErrorManager } from '../utils/error.manager';

describe('ClaseService', () => {
  let service: ClaseService;
  let repository: Repository<ClaseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get<Repository<ClaseEntity>>(
      getRepositoryToken(ClaseEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
   
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createClase should successfully create a class', async () => {
    const newClase : ClaseEntity = {
      codigo: '1234567890',
      nombre: 'Clase de prueba',
      bonos: [],
      usuario: null,
      creditos: 3,
      id: 0
    };

    const result = await service.crearClase(newClase);
    expect(result).toEqual(newClase);

    const storedClase = await repository.findOne({
      where: { codigo: newClase.codigo },
    });
    expect(storedClase).not.toBeNull();
    expect(storedClase.codigo).toEqual(newClase.codigo);
  });

  it('createClase should throw error for invalid class code', async () => {
    const invalidClase : ClaseEntity = {
      codigo: '1234',
      nombre: 'Clase de prueba',
      bonos: [],
      usuario: null,
      creditos: 3,
      id: 0
    };

    await expect(service.crearClase(invalidClase)).rejects.toThrow(
      new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El codigo debe tener 10 caracteres',
      }),
    );
  });
});
