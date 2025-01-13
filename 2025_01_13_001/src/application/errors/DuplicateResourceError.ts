import { DomainError } from "./DomainError";

export class DuplicateResourceError extends DomainError {
  constructor(
    public readonly resourceType: string,
    public readonly field: string,
    public readonly value: string,
  ) {
    super(`${resourceType} with ${field} '${value}' already exists`);
  }
}
