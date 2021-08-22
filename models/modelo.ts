import { capitalize } from "lodash";
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
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'modelos'
})

Modelo.prototype.toJSON = function () {
  const { nombre, marca_id } = this.get()
  return { nombre: capitalize(nombre), marca_id }
}

export default Modelo