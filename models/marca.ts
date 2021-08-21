import { DataTypes } from "sequelize";
import db from "../database/config";

const Marca = db.define(
  "Marca",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "marcas",
  }
);

export default Marca;
