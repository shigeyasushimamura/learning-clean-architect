import { ITransactionContext } from "../../domain/repositories/ITransactionContext";
import { ITransactinContextFactory, TransactionContextImpl } from "./TransactionContextImpl";

export class TransactionManager {
  constructor(private readonly factory: ITransactinContextFactory) {}

  async run<T>(operation: (context: ITransactionContext) => Promise<T>): Promise<T> {
    const context = new TransactionContextImpl(this.factory);

    await context.begin();

    try {
      const result = await operation(context);
      await context.complete();
      return result;
    } catch (error) {
      await context.rollback();
      throw error;
    }
  }
}
