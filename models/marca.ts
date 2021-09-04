import { DataTypes, Model } from "sequelize";
import db from "../database/config";
import { capitalize } from "lodash";

class Marca extends Model {
  id: any;
  toJSON() {
    const { nombre, createdAt, updatedAt, estado, ...rest } = this.get();
    return {
      nombre: capitalize(nombre),
      ...rest,
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
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: "marcas",
    modelName: "Marca",
  }
);

// (async () => {
//   await Marca.sync({alter: true})
// })()

export default Marca;
