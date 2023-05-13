import { DataTypes } from 'sequelize';
import sequelizeCon from '../connection';

const Pack = sequelizeCon.define('packs', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  pack_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  qty: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

export default Pack;
