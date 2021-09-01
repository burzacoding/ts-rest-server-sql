import { DataTypes, Model } from "sequelize";
import db from "../database/config";
import Marcas from "./marca";
import Modelo from "./modelo";
import Usuario from "./usuario";

class Auto extends Model {}

Auto.init(
  {
    marca_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Marcas,
        key: "id",
      },
      allowNull: false,
    },
    modelo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Modelo,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    matricula: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    propietario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Auto",
    tableName: "autos",
  }
);

export default Auto;
