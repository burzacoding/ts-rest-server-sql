import { Request, Response } from "express";
import { capitalize } from "lodash";
import { Op } from "sequelize";
import { Auto, Marca, Modelo } from "../models";

interface reqBodyPostModelo {
  nombre: string;
  marca: string;
}

export const getModelos = async (req: Request, res: Response) => {
  const nombre = req.query.nombre as string | undefined;
  if (!nombre) {
    const marcas = await Marca.findAll({
      where: { estado: true },
      include: [Modelo]
    });
    
    return res.json({
      results: marcas,
    });
  }
  const { rows: marcas, count: cantidad } = await Modelo.findAndCountAll({
    where: {
      nombre: {
        [Op.substring]: nombre.toUpperCase(),
      },
      estado: true,
    },
  });
  res.json({
    results: marcas,
    cantidad,
  });
};

export const getModelo = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const modelo = await Modelo.findByPk(id);
  if (!modelo) {
    return res.status(404).json({ message: `El modelo ${id} no existe` });
  }
  return res.json({
    results: modelo,
  });
};

export const postModelo = async (req: Request, res: Response) => {
  const { nombre, marca } = req.body as reqBodyPostModelo;
  const marcaInDb = await Marca.findOne({
    where: { nombre: marca.toUpperCase() },
  });
  if (!marcaInDb) {
    return res
      .status(400)
      .json({ message: `No existe la marca ${marca}.`, received: req.body });
  }
  const [modelo, creado] = await Modelo.findOrCreate({
    where: {
      nombre,
    },
    defaults: {
      nombre: nombre.toUpperCase(),
      marcaId: marcaInDb.id,
    },
  });
  if (!creado) {
    return res.status(400).json({
      message: `Se intentó crear un modelo que ya existe`,
      received: req.body,
    });
  }
  res.status(201).json({
    results: [modelo],
    message: `Modelo creado`,
    received: {
      nombre,
      marca,
    },
  });
};
