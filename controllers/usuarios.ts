import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: 1,
    },
  });
  res.json({
    message: "getUsuarios",
    results: usuarios,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  //@ts-ignore
  if (usuario && usuario.estado) {
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
    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
      return res.status(404).json({
        message: "No existe el usuario con el id " + req.params.id
      })
    }

    await usuario.update(body)

    res.status(200).json({
      message: "Usuario actualizado",
      results: usuario
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    })
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(404).json({
        message: "No existe el usuario con el id " + req.params.id
      })
    }
    await usuario.update({
      estado: 0
    })
    res.status(202).json({
      //@ts-ignore
      message: "Usuario " + usuario.nombre + " ha sido eliminado.",
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    })
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const usuario = await Usuario.create(body);
    res.status(201).json({
      message: "Usuario creado",
      results: usuario,
    });
  } catch (error) {
    if (error.original.code === "ER_DUP_ENTRY") {
      console.log("Se intentó registrar un usuario que ya existe.");
      return res.status(400).json({
        message: "Ese usuario ya existe",
      });
    }
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    // res.json(error)
  }
};
