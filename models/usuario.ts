import { DataTypes } from "sequelize";
import db from "../database/config";

const Usuario = db.define(
  "Usuario",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
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
    tableName: "usuarios",
  }
);

// (async function () {
//   await Usuario.sync({ alter: true });
// })();

Usuario.prototype.toJSON = function () {
  const { id, ...rest } = this.get();
  return { ...rest };
};

export default Usuario;
