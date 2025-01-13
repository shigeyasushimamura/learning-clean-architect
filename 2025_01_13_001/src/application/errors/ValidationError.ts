import { DomainError } from "./DomainError";
import { ValidationError as ExpressValidationError } from "express-validator";

interface ValidationErrorDetail {
  field: string;
  message: string;
  value?: any;
}

interface ExpressValidatorError {
  type: string;
  value: any;
  msg: string;
  path: string;
  location: string;
}

export class ValidationError extends DomainError {
  constructor(public readonly errors: ValidationErrorDetail[]) {
    super("Validation failed");
  }

  static fromExpressValidationErrors(expressErrors: ExpressValidationError[]): ValidationError {
    const validationErrors = expressErrors.map((error) => {
      const validateError = error as ExpressValidatorError;
      return {
        field: validateError.path,
        message: validateError.msg,
        value: validateError.value,
      };
    });
    return new ValidationError(validationErrors);
  }
}
