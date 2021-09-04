import { Request, Response } from "express";
import { Auto, Marca, Modelo, Usuario } from "../models";

export const getAutos = async (req: Request, res: Response) => {
  const marca = (req.query.marca as string) || undefined;
  if (marca) {
    const results = await Auto.findAll({
      where: {
        estado: true,
      },
      include: [
        {
          model: Modelo,
          required: true,
          include: [
            {
              model: Marca,
              required: true,
              where: { nombre: marca.toUpperCase() },
            },
          ],
        },
        {
          model: Usuario,
          attributes: ["nombre", "uuid", ["emailUserEntered", "email"]],
        },
      ],
    });
    return res.json({
      results,
    });
  } else {
    const results = await Auto.findAll({
      where: {
        estado: true,
      },
      include: [Modelo, Usuario],
    });
    return res.json({
      results,
    });
  }
};

export const getAuto = async (req: Request, res: Response) => {};

export const postAuto = async (req: Request, res: Response) => {};
