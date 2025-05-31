import { Request, Response } from 'express';
import { GetUserByEmailUseCase } from '@application/useCases/GetUserByEmailUseCase';
import { UserRepository } from '@infrasctructure/repositories/UserRepository';
import bcrypt from 'bcrypt';
import { generateToken } from '@utils/jwt';

export class AuthController{
    private readonly getByEmailUsecase: GetUserByEmailUseCase;

    constructor(){
        const userRepository = new UserRepository();
        this.getByEmailUsecase = new GetUserByEmailUseCase(userRepository);
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.getByEmailUsecase.execute(email);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password ?? '', user.password ?? '');
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials'});
            }

            const token = generateToken({ id: user.id, email: user.email });
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}