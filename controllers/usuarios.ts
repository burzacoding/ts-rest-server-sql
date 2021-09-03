import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { destruct } from "../middlewares/testMiddleware";
import { Usuario } from "../models";

interface UserLogin {
  email: string;
  password: string;
}

export const getUsuarios = async (req: Request, res: Response) => {
  const page = Math.abs(Number(req.query.page)) || 1;
  const limit = Math.abs(Number(req.query.limit)) || 100;

  const { count, rows: usuarios } = await Usuario.findAndCountAll({
    where: {
      estado: 1,
    },
    offset: page * limit - limit,
    limit: limit,
  });
  res.json({
    message: "getUsuarios",
    results: usuarios,
    count,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ where: { id, estado: true } });
  if (usuario) {
    res.json({
      message: "getUsuario",
      results: usuario,
    });
  } else {
    res.status(404).json({
      message: "No existe el usuario con el id " + req.params.id,
    });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        message: "No existe el usuario con el id " + req.params.id,
      });
    }

    await usuario.update(body);

    res.status(200).json({
      message: "Usuario actualizado",
      results: usuario,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        message: "No existe el usuario con el id " + req.params.id,
      });
    }
    await usuario.update({
      estado: 0,
    });
    res.status(202).json({
      //@ts-ignore
      message: "Usuario " + usuario.nombre + " ha sido eliminado.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const user = destruct(body, "email", "password", "nombre");
  const extendedUser = {
    ...user,
    emailUserEntered: user.email,
    email: user.email?.toUpperCase(),
  };
  try {
    const [usuario, creado] = await Usuario.findOrCreate({
      where: { email: extendedUser.email },
      defaults: extendedUser,
    });

    if (!creado) {
      console.log("Se intentó registrar un usuario que ya existe.");
      return res.status(400).json({
        code: "error/email-already-in-use",
        message: "Este email ya se encuentra registrado",
      });
    }
    res.status(201).json({
      message: "Usuario creado",
      results: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLogin;
  const usuario = await Usuario.findOne({
    where: { email: email.toUpperCase() },
  });
  //@ts-ignore
  if (!usuario || !usuario.estado) {
    return res.status(404).json({
      message: `Usuario con email (${email}) no se encuentra`,
    });
  }
  //@ts-ignore
  const isValid = bcrypt.compareSync(password, usuario.password);
  if (!isValid) {
    return res.status(403).json({
      message: "Contraseña incorrecta.",
      code: "password/not-valid",
    });
  }
  res.status(200).json({
    //@ts-ignore
    message: `Usuario Validado, bienvenido ${usuario.nombre}`,
  });
};

export const userMiddlewareTest = async (req: Request, res: Response) => {
  if (res.locals.errors) {
    const errorCodes: any[] = [];
    for (let error in res.locals.errors) {
      errorCodes.push(res.locals.errors[error].message);
    }
    return res.status(400).json({
      errors: errorCodes,
    });
  }
  res.json({
    message: "Todo OK",
  });
};
