import express, { Application } from "express";
import cors from "cors";
import routerUsuarios from "./routes/usuarios";
import routerMarcas from "./routes/marcas";
import routerModelos from "./routes/modelos";
import routerAutos from "./routes/autos";
import db from "./database/config";
import Usuario from "./models/usuario";
import Marca from "./models/marca";
import { needsForcedData } from ".";

const data = [
  {
    nombre: "Cesar Pintos",
    email: "Pintos@gmail.com",
    password: "123456",
  },
  {
    nombre: "Lucas Cardozo",
    email: "cArdoZo@gmail.com",
    password: "654321",
  },
  { nombre: "VOLKSWAGEN" },
  { nombre: "RENAULT" },
  { nombre: "FORD" },
];

class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3030;

    //Inicialización de funciones
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/marcas", routerMarcas);
    this.app.use("/modelos", routerModelos);
    this.app.use("/usuarios", routerUsuarios);
    this.app.use("/autos", routerAutos);
  }

  async database() {
    try {
      console.log("Conectando a base de datos...");
      await db.authenticate();
      console.log("Base de datos conectada");
      if (needsForcedData) {
        await db.sync({ force: true });
        await Promise.all([
          Usuario.create(data[0]),
          Usuario.create(data[1]),
          Marca.create(data[2]),
          Marca.create(data[3]),
          Marca.create(data[4]),
        ]);
      }
    } catch (err) {
      throw new Error(err as any);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto: " + this.port);
    });
  }
}

export default Server;
