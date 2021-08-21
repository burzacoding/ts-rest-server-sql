import express, { Application } from "express";
import cors from "cors";
import routerUsuarios from "./routes/usuarios"
import db from "./database/config";

class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3030

    //Inicialización de funciones
    this.middlewares()
    this.database()
    this.routes()
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes () {
    this.app.use('/usuarios', routerUsuarios)
  }

  async database() {
    try {
      console.log("Conectando a base de datos...");
      await db.authenticate();
      console.log("Base de datos conectada");
      

    } catch (err) {
      throw new Error(err.message);
    }
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto: " + this.port);
    })
  }
}

export default Server;