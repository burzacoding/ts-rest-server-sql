import { DataTypes } from "sequelize";
import db from "../database/config";
import Marcas from "./marca";
import Modelo from "./modelo";
import Usuario from "./usuario";

const Autos = db.define("Auto", {
  marca_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Marcas,
      key: "id",
    },
    allowNull: false
  },
  modelo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Modelo,
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    },
    allowNull: false
  }
});

export default Autos;
