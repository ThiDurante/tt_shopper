import { Dialect, Sequelize } from 'sequelize';
import config from '../env/config';

const sequelizeCon = new Sequelize({
  database: config.DB_NAME || 'db',
  host: config.MYSQL_HOST || 'db',
  dialect: (config.MYSQL_DIALECT as Dialect) || 'mysql',
  username: config.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  port: Number(config.MYSQL_PORT) || 3306,
  logging: false,
});

export default sequelizeCon;
