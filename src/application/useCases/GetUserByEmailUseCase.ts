import { IUserRepository } from "@domain/repositories/IUserRepository";
import { UserDTO } from "@presentation/dtos/UserDTO";

export class GetUserByEmailUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(email: string): Promise<UserDTO | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;

        return new UserDTO(user.name, user.email, user.id?.toString(), user.password);
    }
}