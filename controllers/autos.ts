import { Request, Response } from "express";
import Auto from "../models/auto";
import Marca from "../models/marca";
import Modelo from "../models/modelo";
import Usuario from "../models/usuario";

export const getAutos = async (req: Request, res: Response) => {
  try {
    const autos = await Auto.findAll({
      where: {
        estado: true,
      },
    });
    return res.status(200).json({
      results: autos,
    });
  } catch (error) {
    console.log("Error en función getAutos:", error);
    return res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};

export const getAuto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const auto = await Auto.findByPk(id);
    if (!auto) {
      return res.status(404).json({
        message: `No existen autos con ese id (${id})`,
      });
    }
  } catch (error) {
    console.log("Error en función getAuto:", error);
    return res.status(500).json({
      message: "Algo salió mal, por favor contacte a un administrador.",
    });
  }
};

export const postAuto = async (req: Request, res: Response) => {
  const { matricula, marca, modelo, id_propietario } = req.body;

  try {
    ////////////////////////////////////////////
    // Verifica la existencia del dueño del auto
    const dueño = await Usuario.findByPk(id_propietario);
    if (!dueño) {
      return res.status(404).json({
        message: "El propietario no existe en la base de datos.",
      });
    }
    // Verifica la existencia del dueño del auto
    ////////////////////////////////////////////

    ////////////////////////////////////////////
    // Verifica la existencia de la marca del auto
    const marcaInDb = await Marca.findOne({
      where: {
        nombre: marca.toUpperCase(),
      },
    });
    if (!marcaInDb) {
      return res.status(404).json({
        message: "La marca no existe en la base de datos.",
      });
    }
    // Verifica la existencia de la marca del auto
    ////////////////////////////////////////////

    ////////////////////////////////////////////
    // Verifica la existencia de la marca del auto
    const modelInDb = await Modelo.findOne({
      where: {
        nombre: modelo.toUpperCase(),
      },
    });
    if (!modelInDb) {
      return res.status(404).json({
        message: "El modelo no existe en la base de datos.",
      });
    }
    // Verifica la existencia de la marca del auto
    ////////////////////////////////////////////

    // Busca si ya existe un auto con esa matricula
    const [autoCreado, fueCreadoNuevoAuto] = await Auto.findOrCreate({
      where: {
        matricula,
      },
      defaults: {
        // @ts-ignore
        marca_id: marcaInDb.id,
        // @ts-ignore
        modelo_id: modelInDb.id,
        // @ts-ignore
        matricula,
        // @ts-ignore
        propietario_id: dueño.id,
      },
    });

    if (!fueCreadoNuevoAuto) {
      return res.status(400).json({
        message: "La matrícula que usted intenta ingresar ya existe.",
      });
    }

    res.status(201).json({
      message: "Auto creado con éxito",
      autoCreado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del server jeje",
      error,
    });
  }
};
