import Auto from "./auto";
import Usuario from "./usuario";
import Modelo from "./modelo";
import Marca from "./marca";

Marca.hasMany(Modelo, {
  foreignKey: {
    name: "marcaId",
    allowNull: false,
  },
});
Modelo.belongsTo(Marca, {
  foreignKey: {
    name: "marcaId",
    allowNull: false,
  },
});
Modelo.hasMany(Auto, {
  foreignKey: {
    name: "modeloId",
    allowNull: false,
  },
});
Auto.belongsTo(Modelo, {
  foreignKey: {
    name: "modeloId",
    allowNull: false,
  },
});
Usuario.hasMany(Auto, {
  foreignKey: {
    name: 'propietarioId',
    allowNull: false
  }
})


export { Auto, Usuario, Modelo, Marca };
