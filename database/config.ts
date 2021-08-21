import { Sequelize } from "sequelize"

const DB_NAME = process.env.DB_NAME || "db"
const DB_PASSWORD = process.env.DB_PASS || "123456"

const db = new Sequelize(DB_NAME, DB_PASSWORD, 'TS.ilovu', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false
})

export default db;