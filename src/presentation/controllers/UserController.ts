import { Request, Response } from 'express';
import { CreateUserUseCase } from '@application/useCases/CreateUserUseCase';
import { GetAllUsersUseCase } from '@application/useCases/GetAllUsersUseCase';
import { UserRepository } from 'infrasctructure/repositories/UserRepository';
import { UserDTO } from '@presentation/dtos/UserDTO';

export class UserController{
    private createUserUseCase: CreateUserUseCase;
    private getAllUsersUsecase: GetAllUsersUseCase;

    constructor(){
        const userRepository = new UserRepository();
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.getAllUsersUsecase = new GetAllUsersUseCase(userRepository);
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email } = req.body;
            const user = await this.createUserUseCase.execute(name, email);
            
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({error: (error as Error).message });
        }
    }

    async getAllUsers(req: Request, res: Response){
        try {
            const users: UserDTO[] = await this.getAllUsersUsecase.execute();

            if (!users || users.length == 0) {
                return res.status(404).json(users);
            }

            return res.status(200).json(users);

        } catch (error) {
            return res.status(400).json({error: (error as Error).message});
        }
    }
}