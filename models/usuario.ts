import bcrypt from "bcryptjs";
import { DataTypes, Model } from "sequelize";

import db from "../database/config";
import { Salt } from "../config/bcrypt";

export interface UserAttributes {
  id: number;
  uuid: string;
  nombre: string;
  email: string;
  emailUserEntered: string;
  password: string;
  estado: boolean;
}

// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// const Usuario = db.define<UserAttributes, UserCreationAttributes>(

class Usuario extends Model {
  toJSON() {
    const {
      id,
      createdAt,
      updatedAt,
      estado,
      emailUserEntered,
      password,
      ...rest
    } = this.get();
    return { ...rest };
  }
}

Usuario.init(
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
      get() {
        return this.getDataValue("emailUserEntered");
      },
    },
    emailUserEntered: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val: string) {
        const encrypted = bcrypt.hashSync(val, Salt);
        this.setDataValue("password", encrypted);
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "usuarios",
    sequelize: db,
    modelName: "Usuario",
  }
);

export default Usuario;
