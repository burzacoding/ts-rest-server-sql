require('dotenv').config()

import Server from "./server";

const App = new Server();

App.listen();
