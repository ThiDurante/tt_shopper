import { DataTypes, Model } from 'sequelize';
import sequelizeCon from '../connection';

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
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
