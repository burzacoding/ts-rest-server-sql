import { DataTypes } from "sequelize";
import db from "../database/config";
import { capitalize } from "lodash"

const Marca = db.define(
  "Marca",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  },
  {
    tableName: "marcas",
  }
);

Marca.prototype.toJSON = function() {
  const { nombre, id } = this.get()
  return {
    nombre: capitalize(nombre),
    id
  }
}

export default Marca;
