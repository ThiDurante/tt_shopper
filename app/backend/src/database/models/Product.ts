import { DataTypes } from 'sequelize';
import sequelizeCon from '../connection';

const Product = sequelizeCon.define('products', {
  code: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cost_price: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },
  sales_price: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },
});

export default Product;
