import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
//import { Database } from "@infrasctructure/config/Database";
import { UserDTO } from "@presentation/dtos/UserDTO";
import { plainToInstance } from "class-transformer";
import { ResultSetHeader } from "mysql2";
import { AppDataSource } from "@infrasctructure/config/Database";

export class UserRepository implements IUserRepository {
  
  private repository = AppDataSource.getRepository(User);

  async create(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findAll(): Promise<UserDTO[]| null> {
    const user = await this.repository.find();
    return plainToInstance(UserDTO, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async save(user: User): Promise<User> {
    // async save(user: User): Promise<User> {
      await this.repository.save(user);
      return user;
  }

  findById(id: number): Promise<User | null> {
      throw new Error("Method not implemented.");
  }
}

// export class UserRepository implements IUserRepository {
//     private pool = Database.getConnection();

//     async findAll(): Promise<UserDTO[] | null> {
//         try {
//             const [result]: any = await this.pool.execute(
//                 "SELECT * FROM users"
//             );

//             // CONSULTAS EM BD
//             // campos específicos
//             // Filtragem (where)
//             // distinct / limit
//             // paginação
//             /*
//             #### CONSULTA BEM FEITA ####
//             SELECT us.id, us.name, us.email
//             FROM agenda_db.users as us
//             WHERE us.email is not null 
//             order by us.id
//             limit 10
//             offset 20
//             */

//             return plainToInstance(UserDTO, result);
//         } catch (error) {
//             console.log(`Erro ao recuperar registros no bd: ${error}`);
//             throw new Error(`Erro ao recuperar registros no bd: ${error}`);
//         }
//     }

//     async save(user: User): Promise<User> {
//         /*
//         TRATAR
//         Recursos externos
//         chamadas ao BD
//         Entradas de usuário
//         conversões
//         */
//         try {
//             const [result]: any = await this.pool.execute(
//                 "INSERT into users (name, email, password) VALUES (?, ?, ?)", 
//                 [user.name, user.email, user.password]
//             );

//             user.id = result.insertId;
//             return user;
//         } catch (error) {
//             console.log(`Erro ao persistir o registro (${user.email}) no bd: ${error}`);
//             throw new Error(`Erro ao persistir o registro (${user.email}) no bd: ${error}`);
//         }
//     }

//     async findByEmail(email: string): Promise<User | null> {
//         try {
//             const [result]: any = await this.pool.execute(
//                 "SELECT * FROM users WHERE email = ?", [email]
//             );
            
//             const users = result as User[];
//             return users.length ? users[0] : null;
//         } catch (error) {
//             console.log(`Erro ao persistir ao recuperar registro (${email}) no bd: ${error}`);
//             throw new Error(`Erro ao persistir ao recuperar registro (${email}) no bd: ${error}`);
//         }
//     }

//     findById(id: number): Promise<User | null> {
//         throw new Error("Method not implemented.");
//     }

//     async deleteById(id: number): Promise<boolean | null> {
//         try {
//             const [result] = await this.pool.execute<ResultSetHeader>(
//                 "DELETE FROM users WHERE id = ?",
//                 [id]
//             );
          
//             return result.affectedRows > 0;

//         } catch (error) {
//             console.log(`Erro ao remover o registro (${id}) no bd: ${error}`);
//             throw new Error(`Erro ao remover o registro (${id}) no bd: ${error}`);
//         }
//     }

// }