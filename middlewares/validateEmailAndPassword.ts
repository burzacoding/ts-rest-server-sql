import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";
import { emailValidator, nombreValidator, passwordValidator } from "./validators/validators";
import { getErrors } from "../config/errors";


const EmailAndPasswordValidator = Yup.object({
  email: emailValidator,
  password: passwordValidator,
});

const NameEmailAndPasswordValidator = Yup.object({
  nombre: nombreValidator,
  email: emailValidator,
  password: passwordValidator,
});


interface reqBody {
  nombre: string;
  email: string;
  password: string;
}

export const emailAndPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as reqBody;
  try {
    await EmailAndPasswordValidator.validate(
      { email, password },
      {
        abortEarly: false,
      }
    );
    res.locals.user = { 
      email,
      password
    };
    // Pasa al siguiente middleware
    next();
  } catch (error) {
    const errorObject = getErrors(error.errors[0])
    return res.status(400).json({
      code: errorObject.code,
      message: errorObject.message,
    });
  }
};
export const nameEmailAndPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombre, email, password } = req.body as reqBody;
  try {
    await NameEmailAndPasswordValidator.validate(
      { nombre, email, password },
      {
        abortEarly: false,
      }
    );
    res.locals.user = { 
      nombre,
      emailUserEntered: email,
      email: email.toUpperCase(),
      password
    };
    // Pasa al siguiente middleware
    next();
  } catch (error) {
    const errorObject = getErrors(error.errors[0])
    return res.status(400).json({
      code: errorObject.code,
      message: errorObject.message,
    });
  }
};
