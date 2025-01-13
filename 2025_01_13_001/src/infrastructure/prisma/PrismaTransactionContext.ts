import { PrismaClient as PrismaClientType } from "@prisma/client";
import { ITransactionContext } from "../../domain/repositories/ITransactionContext";
import { prisma as PrismaClient } from "./prismaClient";

export class PrismaTransactionContext implements ITransactionContext {
  private prismaTransaction: any = null;
  private prisma = PrismaClient;

  async begin(): Promise<void> {
    this.prismaTransaction = await this.prisma.$transaction(async (transactionPrisma: any) => {
      this.prismaTransaction = transactionPrisma;
    });
  }

  async complete(): Promise<void> {
    if (this.prismaTransaction) {
      // Prisma のトランザクションは `$transaction` 内で自動的にコミットされるため、明示的な操作は不要
      this.prismaTransaction = null; // 明示的にリセット
    }
  }

  async rollback(): Promise<void> {
    // Prisma の `$transaction` は自動的にロールバックするため、特別な処理は不要
    this.prismaTransaction = null;
  }

  getPrismaTransaction() {
    return this.prismaTransaction;
  }
}
