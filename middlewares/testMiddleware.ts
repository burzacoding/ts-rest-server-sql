import { NextFunction, Request, Response } from "express";
import { MyRequiredStringSchema } from "./validators/validators";

import {
  emailValidator,
  nombreValidator,
  passwordValidator,
} from "./validators/validators";

interface requestBodyInterface {
  nombre?: string;
  password?: string;
  email?: string;
  [key: string]: any;
}

export const destruct = (obj: requestBodyInterface, ...keys: string[]) => keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {} as requestBodyInterface);

type ValidatorValue = "nombre" | "email" | "password";

type ValidatorArrayInterface =
  | [ValidatorValue]
  | [ValidatorValue, ValidatorValue]
  | [ValidatorValue, ValidatorValue, ValidatorValue];

export const validateFields = (campos: ValidatorArrayInterface) => {
  const validators: MyRequiredStringSchema[] = [];

  if (campos.includes("nombre")) {
    validators.push(nombreValidator);
  }
  if (campos.includes("email")) {
    validators.push(emailValidator);
  }
  if (campos.includes("password")) {
    validators.push(passwordValidator);
  }

  const myFunction = (req: Request, res: Response, next: NextFunction) => {
    for (let i = 0; i < campos.length; i++) {
      try {
        validators[i].validateSync(req.body[campos[i]], { abortEarly: false });
      } catch (err) {
        res.locals.errors = {
          ...res.locals.errors,
          [campos[i]]: err,
        };
      }
    }
    next();
  };
  return myFunction;
};
