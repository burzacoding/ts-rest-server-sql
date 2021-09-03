import { Request, Response } from "express";
import { capitalize } from "lodash";
import { Marca, Modelo } from "../models";

export const getModelos = async (req: Request, res: Response) => {
  try {
    const modelos = await Modelo.findAll({
      where: {
        estado: true,
      },
    });
    res.status(200).json({
      results: modelos,
    });
  } catch (error) {
    console.log("Error en función getModelos:", error);
    res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};

export const getModelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const modelo = await Modelo.findByPk(id);
    if (!modelo) {
      res.status(404).json({
        message: `No existen modelos con ese id (${id})`,
      });
    }
  } catch (error) {
    console.log("Error en función getModelo:", error);
    res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};

// {
//   "marca": "Fiat",
//   "nombre" : "Duna 1.4"
// }

export const postModelo = async (req: Request, res: Response) => {
  const nombre: string = req.body.nombre;
  const marca: string = req.body.marca;
  const NOMBRE = nombre.toUpperCase();
  const MARCA = marca.toUpperCase();
  try {
    // Busca si ya existe un dato con ese nombre
    const modeloExistePromise = Modelo.findOne({ where: { nombre: NOMBRE } });
    const marcaPromise = Marca.findOne({ where: { nombre: MARCA } });

    const [modelAlreadyExists, marcaData] = await Promise.all([
      modeloExistePromise,
      marcaPromise,
    ]);

    if (modelAlreadyExists) {
      return res
        .status(404)
        .json({ message: `El modelo ${capitalize(nombre)} ya existe.` });
    }

    if (!marcaData) {
      return res
        .status(404)
        .json({
          message: `La marca ${capitalize(
            marca
          )} no existe en la base de datos.`,
        });
    }

    // Crea el modelo nuevo con nombre en uppercase
    //@ts-ignore
    const modeloNuevo = await Modelo.create({
      nombre: NOMBRE,
      //@ts-ignore
      marca_id: marcaData.id,
    });
    res.status(201).json({
      message: "Modelo " + nombre + " creado",
      results: modeloNuevo,
    });
  } catch (error) {
    console.log("Error en función postModelo:", error);
    res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};
