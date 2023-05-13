import 'dotenv/config';

const config = {
  BACKEND_PORT: process.env.BACKEND_PORT,
  DB_NAME: process.env.DB_NAME,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_DIALECT: process.env.MYSQL_DIALECT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_PORT: process.env.MYSQL_PORT,
};

export default config;
