require('dotenv').config()

export const isProduction = process.argv.filter(el => el.includes('env=prod'))[0] ? true : false
export const needsForcedData = process.argv.filter(el => el.includes('mode=force'))[0] ? true : false

import Server from "./server";

const App = new Server();

App.listen();
