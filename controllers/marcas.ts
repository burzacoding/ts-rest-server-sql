import { Request, Response } from "express";
import { capitalize } from "lodash";
import { Marca } from "../models";

export const getMarcas = async (req: Request, res: Response) => {
  try {
    const marcas = await Marca.findAll({
      where: {
        estado: true,
      },
    });
    res.status(200).json({
      results: marcas,
    });
  } catch (error) {
    console.log("Error en función getMarcas:", error);
    res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};

export const getMarca = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const marca = await Marca.findByPk(id);
    if (!marca) {
      res.status(404).json({
        message: `No existen marcas con ese id (${id})`,
      });
    }
  } catch (error) {
    console.log("Error en función getMarca:", error);
    res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};

export const postMarca = async (req: Request, res: Response) => {
  const nombre: string = req.body.nombre;
  const NOMBRE = nombre.toUpperCase();
  try {
    // Busca si ya existe un dato con ese nombre
    const alreadyExists = await Marca.findOne({ where: { nombre: NOMBRE } });

    if (alreadyExists) {
      return res
        .status(404)
        .json({ message: `La marca ${capitalize(nombre)} ya existe.` });
    }

    // Crea la marca nueva con nombre en uppercase
    const marcaNueva = await Marca.create({ nombre: NOMBRE });
    res.status(201).json({
      message: "Marca " + nombre + " creada",
      results: marcaNueva,
    });
  } catch (error) {
    console.log("Error en función postMarca:", error);
    res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};
