import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';
import { TypeOrmTestingConfig } from '../utils/typeorm_config';
import { UsuarioDTO } from './usuario.dto';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
  });

  it('should create a user successfully', async () => {
    const usuario: UsuarioDTO = {
      cedula: 123456789,
      extension: 101,
      nombre: 'Juan Pérez',
      grupo: 'TICSW',
      rol: 'Profesor',
      jefe: null,
      subordinados: [],
      bonos: [],
      clases: [],
    };

  

    const result = await service.crearUsuario(usuario);
    expect(result.cedula).toEqual(usuario.cedula);
  });

  it('should throw error for invalid user group', async () => {
    const usuario: UsuarioDTO = {

      cedula: 123456789,
      extension: 101,
      nombre: 'Juan Pérez',
      grupo: 'INVALID',
      rol: 'Profesor',
      jefe: null,
      subordinados: [],
      bonos: [],
      clases: [],
    };

    await expect(service.crearUsuario(usuario)).rejects.toThrow(
      new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'El usuario no está en un grupo valido',
      }),
    );
  });
});
