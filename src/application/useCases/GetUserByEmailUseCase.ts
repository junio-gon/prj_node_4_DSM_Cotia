import { IUserRepository } from "@domain/repositories/IUserRepository";
import { UserDTO } from "@presentation/dtos/UserDTO";

export class GetUserByEmailUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(email: string): Promise<UserDTO | null> {
        return await this.userRepository.findByEmail(email);
    }
}