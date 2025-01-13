import { User } from "../models/article/user/User";
import { EmailAddress } from "../models/article/user/EmailAddress";

export interface IUserRepository {
  save(user: User): Promise<User>;
  findByUser(id: number): Promise<User | null>;
  findByEmail(email: EmailAddress): Promise<User | null>;
  delete(id: number): Promise<void>;
}
