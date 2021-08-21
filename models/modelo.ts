import { DataTypes } from "sequelize";
import db from "../database/config";
import Marca from "./marca";

const Modelo = db.define('Modelo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Marca,
      key: 'id'
    }
  }
}, {
  tableName: 'modelos'
})

export default Modelo