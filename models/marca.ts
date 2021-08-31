import { DataTypes, Model } from "sequelize";
import db from "../database/config";
import { capitalize } from "lodash";

class Marca extends Model {
  toJSON() {
    const { nombre, id } = this.get();
    return {
      nombre: capitalize(nombre),
      id,
    };
  }
}

Marca.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
    tableName: "marcas",
    modelName: "Marca",
  }
);

export default Marca;
