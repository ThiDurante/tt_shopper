import { DataTypes, Model } from 'sequelize';
import sequelizeCon from '../connection';
import Product from './Product';

export default class Pack extends Model {
  public id!: number;
  public pack_id!: number;
  public product_id!: number;
  public qty!: number;
}
Pack.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    pack_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Product,
        key: 'code',
      },
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Product,
        key: 'code',
      },
    },
    qty: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeCon,
    tableName: 'packs',
    timestamps: false,
  }
);

Pack.belongsTo(Product, { foreignKey: 'pack_id' });
Pack.belongsTo(Product, { foreignKey: 'product_id' });
