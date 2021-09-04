import { capitalize } from "lodash";
import { DataTypes, Model } from "sequelize";
import db from "../database/config";

class Modelo extends Model {
  toJSON() {
    const { nombre, createdAt, updatedAt, estado, ...rest } = this.get();
    return { nombre: capitalize(nombre), ...rest };
  }
}

Modelo.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
