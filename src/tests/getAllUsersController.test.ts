
// getAllUsersController.test.ts
import { Request, Response } from 'express';
import { UserController } from "@presentation/controllers/UserController";
import { UserDTO } from "@presentation/dtos/UserDTO";
import { UserRepository } from "@infrasctructure/repositories/UserRepository";
import { Database } from "@infrasctructure/config/Database"; // inicializar pool
// Criando mocks de Request e Response
/*
const mockRequest = (body = {}): Partial<Request> => ({ body });
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(() => {
    controller = new UserController();

    // Mockando os useCases dentro do controller
    controller['createUserUseCase'] = {
      execute: jest.fn()
    } as any;

    controller['getAllUsersUseCase'] = {
      execute: jest.fn()
    } as any;
  });

  // Teste de sucesso - createUser
  it('deve criar um usuário com sucesso', async () => {
    const req = mockRequest({ name: 'João', email: 'joao@example.com' }) as Request;
    const res = mockResponse() as Response;

    const userMock: UserDTO = { name: 'João', email: 'joao@example.com' };

    (controller['createUserUseCase'].execute as jest.Mock).mockResolvedValue(userMock);

    await controller.createUser(req, res);

    expect(controller['createUserUseCase'].execute).toHaveBeenCalledWith('João', 'joao@example.com');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(userMock);
  });

  // Teste de falha - createUser
  it('deve retornar erro ao criar usuário', async () => {
    const req = mockRequest({ name: 'João', email: 'joao@example.com' }) as Request;
    const res = mockResponse() as Response;

    const errorMsg = 'Erro ao criar usuário';

    (controller['createUserUseCase'].execute as jest.Mock).mockRejectedValue(new Error(errorMsg));

    await controller.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
  });

  // Teste de sucesso - getAllUsers
  it('deve retornar todos os usuários com sucesso', async () => {
    const req = {} as Request;
    const res = mockResponse() as Response;

    const usersMock: UserDTO[] = [
      { name: 'João', email: 'joao@example.com' },
      { name: 'Maria', email: 'maria@example.com' }
    ];

    (controller['getAllUsersUseCase'].execute as jest.Mock).mockResolvedValue(usersMock);

    await controller.getAllUsers(req, res);

    expect(controller['getAllUsersUseCase'].execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(usersMock);
  });

  // Teste de falha - getAllUsers
  it('deve retornar erro ao buscar usuários', async () => {
    const req = {} as Request;
    const res = mockResponse() as Response;

    const errorMsg = 'Erro ao buscar usuários';

    (controller['getAllUsersUseCase'].execute as jest.Mock).mockRejectedValue(new Error(errorMsg));

    await controller.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
  });
});
*/

describe('UserController (Integração)', () => {
  let controller: UserController;
  let userRepository: UserRepository;

  // beforeAll(() => {
  //   await Database.init(); // Iniciar pool
  //   controller = new UserController();
  //   userRepository = new UserRepository();
  // });

  beforeAll(async () => {
    await Database.init(); // Iniciar pool
    userRepository = new UserRepository();
    controller = new UserController();
  });

  afterAll(async () => {
    await Database.close(); // Fechar pool
  });

  // afterAll(async () => {
  //   await Database.close(); // Fechar pool
  // });

  // beforeEach(async () => {
  //   // Limpa a tabela de usuários antes de cada teste
  //   await userRepository.clear(); // ⬅️ Implementar um método "clear()" que faz TRUNCATE ou DELETE
  // });

  // Teste de criar usuário e salvar no banco
  it('deve criar um usuário e persistir no banco', async () => {
    let req = {
      body: { name: 'João', email: 'joao@example.com', password: '123' }
    } as Request;

    // Mock do res com spies
    let jsonMock = jest.fn();
    let statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    let res = { status: statusMock } as unknown as Response;

    await controller.createUser(req, res);

    // Expectativas
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'João',
        email: 'joao@example.com',
        id: expect.any(Number),
      })
    );

    // Valida que está realmente no banco
    //const usersInDb = await userRepository.findAll();
    // expect(usersInDb?.length).toBe(1);
    // expect(usersInDb?.some(user => user.name === 'João')).toBe(true);
  });

  it('deve dar erro de validação', async () => {
    let req = {
      body: { name: 'João', email: null }
    } as Request;

    // Mock do res com spies
    let jsonMock = jest.fn();
    let statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    let res = { status: statusMock } as unknown as Response;

    await controller.createUser(req, res);

    // Expectativas
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Erro ao persistir o registro (null) no bd: Error: Column 'email' cannot be null"
      })
    );

    // Valida que está realmente no banco
    //const usersInDb = await userRepository.findAll();
    // expect(usersInDb?.length).toBe(1);
    // expect(usersInDb?.some(user => user.name === 'João')).toBe(true);
  });

  // Teste de buscar usuários do banco
  it('deve retornar usuários do banco', async () => {
    const req = {} as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    await controller.getAllUsers(req, res);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'João', email: 'joao@example.com' })
      ])
    );
  });

  it('deve excluir um usuário e persistir no banco', async () => {

    const user = await userRepository.findByEmail('joao@example.com');

    expect(user).toBeDefined();

    if (!user?.id) {
        throw new Error('Usuário não encontrado ou ID ausente');
    }

    const deleted = await userRepository.deleteById(user.id);
    expect(deleted).toBe(true);
  });
});