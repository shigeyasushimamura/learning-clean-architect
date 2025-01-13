export interface ITransactionContext {
  begin(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
}
