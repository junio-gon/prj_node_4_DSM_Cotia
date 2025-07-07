// export class User {
//     id?: number;
//     name: string;
//     email: string;
//     password?: string;

//     constructor(_name: string, _email: string, _password?: string) {
//         this.name = _name;
//         this.email = _email;
//         this.password = _password;
//     }
// }

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users_orm")
export class User {
        constructor(_name: string, _email: string, _password?: string) {
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password?: string;
}