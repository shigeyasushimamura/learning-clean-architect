import { PrismaClient } from "@prisma/client";
import { ITransactionContext } from "../../domain/repositories/ITransactionContext";
import { PrismaTransactionContext } from "../../infrastructure/prisma/PrismaTransactionContext";

export interface ITransactinContextFactory {
  create(): ITransactionContext;
}

export class PrismaTransactionContextFactory implements ITransactinContextFactory {
  create(): ITransactionContext {
    return new PrismaTransactionContext();
  }
}

export class TransactionContextImpl implements ITransactionContext {
  private transaction: ITransactionContext | null = null;

  constructor(private readonly factory: ITransactinContextFactory) {}

  async begin(): Promise<void> {
    if (!this.transaction) {
      this.transaction = this.factory.create();
    }
    this.transaction.begin();
  }

  async complete(): Promise<void> {
    if (this.transaction) {
      await this.transaction.complete();
      this.transaction = null; // 完了後にリセット
    } else {
      throw new Error("Transaction has not been started");
    }
  }

  async rollback(): Promise<void> {
    if (this.transaction) {
      await this.transaction.rollback();
      this.transaction = null; // ロールバック後にリセット
    } else {
      throw new Error("Transaction has not been started");
    }
  }
}
