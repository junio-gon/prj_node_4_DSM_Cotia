import { Request, Response } from 'express';
import { CreateUserUseCase } from '@application/useCases/CreateUserUseCase';
import { GetAllUsersUseCase } from '@application/useCases/GetAllUsersUseCase';
import { GetUserByEmailUseCase } from '@application/useCases/GetUserByEmailUseCase';
import { UserRepository } from '@infrasctructure/repositories/UserRepository';
import { UserDTO } from '@presentation/dtos/UserDTO';
import { Logger } from 'utils/Logger';
import bcrypt from 'bcrypt';
import { generateToken } from 'utils/jwt';

export class UserController{
    private readonly createUserUseCase: CreateUserUseCase;
    private readonly getAllUsersUsecase: GetAllUsersUseCase;
    private readonly getByEmailUsecase: GetUserByEmailUseCase;

    constructor(){
        const userRepository = new UserRepository();
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.getAllUsersUsecase = new GetAllUsersUseCase(userRepository);
        this.getByEmailUsecase = new GetUserByEmailUseCase(userRepository);
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email } = req.body;
            // const user = await this.createUserUseCase.execute(name, email);
            const user = await this.createUserUseCase.execute(req.body as UserDTO);
            
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({error: (error as Error).message });
        }
    }

    async getAllUsers(req: Request, res: Response){
        try {
            Logger.info('Testando logs do tipo Info', { method: 'getAllUsers' });

            const users: UserDTO[] = await this.getAllUsersUsecase.execute();

            if (!users || users.length == 0) {
                return res.status(404).json(users);
            }

            return res.status(200).json(users);

        } catch (error) {
            return res.status(400).json({error: (error as Error).message});
        }
    }

    async getUserByEmail(req: Request, res: Response){
        try {
            const user: UserDTO | null = 
                        await this.getByEmailUsecase.execute(req.params.email);
            console.log('req.params.email', req.params.email);
            
            if (!user) {
                return res.status(404).json(user);
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({error: (error as Error).message});
        }
    }
    /*
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.getByEmailUsecase.execute(email);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password ?? '', user.password ?? '');
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = generateToken({ id: user.id, email: user.email });
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
    */
}