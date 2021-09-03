import { DataTypes, Model } from "sequelize";
import db from "../database/config";

class Auto extends Model {}

Auto.init(
  {
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    matricula: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Auto",
    tableName: "autos",
  }
);

export default Auto;
