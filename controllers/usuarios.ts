import { Request, Response } from "express";
import Usuario from "../models/usuario";

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
  const body = req.body;
  try {
    const [usuario, creado] = await Usuario.findOrCreate({
      where: { email: body.email },
      defaults: {
        email: body.email,
        nombre: body.nombre,
      },
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
