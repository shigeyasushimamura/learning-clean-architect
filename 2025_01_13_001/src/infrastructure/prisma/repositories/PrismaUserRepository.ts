import { User } from "../../domain/models/user/User.js";
import { EmailAddress } from "../../domain/models/user/EmailAddress.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}
}
