import dotenv from "dotenv";

import Server from "./server";

dotenv.config();

const App = new Server();

App.listen();
