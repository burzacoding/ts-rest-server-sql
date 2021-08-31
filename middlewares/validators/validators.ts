import * as Yup from "yup";

import { RequiredStringSchema } from "yup/lib/string";
import { errorCodes } from "../../config/errors";

export const nombreValidator = Yup.string()
  .typeError(errorCodes.nombre.typeError.code)
  .min(4, errorCodes.nombre.min.code)
  .max(255, errorCodes.nombre.max.code)
  .trim()
  .required(errorCodes.nombre.required.code);

export const emailValidator = Yup.string()
  .typeError(errorCodes.email.typeError.code)
  .email(errorCodes.email.email.code)
  .trim()
  .required(errorCodes.email.required.code);

export const passwordValidator = Yup.string()
  .typeError(errorCodes.password.typeError.code)
  .min(6, errorCodes.password.min.code)
  .max(18, errorCodes.password.max.code)
  .required(errorCodes.password.required.code);


export type MyRequiredStringSchema = RequiredStringSchema<string | undefined, Record<string, any>>