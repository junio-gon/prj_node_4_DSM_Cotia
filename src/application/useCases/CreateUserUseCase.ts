import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
import { UserDTO } from "@presentation/dtos/UserDTO";
import bcrypt from 'bcrypt';

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(userDTO: UserDTO): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(userDTO.email);

        if (existingUser) {
            throw new Error("Já existe um usuário registrado com este e-mail.");
        }
        
        const hashedPassword = await bcrypt.hash(userDTO.password ?? '', 10);
        const user = new User(userDTO.name, userDTO.email, hashedPassword);

        return await this.userRepository.save(user);
    }
}