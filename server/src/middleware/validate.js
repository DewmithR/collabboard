import { ValidationError } from "../utils/AppError.js";

export function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return next(new ValidationError(result.error.issues));
    }

    req[source] = result.data;
    next();
  };
}
