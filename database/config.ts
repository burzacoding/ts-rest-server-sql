import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME || "db";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASS || "123456";
const DB_HOST = process.env.DB_HOST || "localhost";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  // logging: false,
});

export default db;
