import { ModelStatic } from 'sequelize';
import Pack from '../database/models/Pack';
import PackModelI from '../interfaces/Pack/PackModelI';
import PackI from '../interfaces/Pack/PackI';
import Product from '../database/models/Product';

export default class PackModel implements PackModelI {
  private model: ModelStatic<Pack> = Pack;
  async getAllPacks(): Promise<PackI[]> {
    const packs = await this.model.findAll({ include: Product });
    const packsClean = packs.map((pack) => pack.dataValues);
    return packsClean;
  }
  // find by packid
  async findByPackId(id: number): Promise<PackI> {
    const pack = await this.model.findByPk(id);
    return pack?.dataValues;
  }
}
