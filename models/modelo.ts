import { capitalize } from "lodash";
import { DataTypes, Model } from "sequelize";
import db from "../database/config";
import Marca from "./marca";

class Modelo extends Model {
  toJSON() {
    const { nombre, marca_id } = this.get();
    return { nombre: capitalize(nombre), marca_id };
  }
}

Modelo.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Marca,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: "modelos",
    modelName: "Modelo",
  }
);

export default Modelo;
