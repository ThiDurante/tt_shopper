import { ModelStatic } from 'sequelize';
import Pack from '../database/models/Pack';
import PackModelI from '../interfaces/PackModelI';
import PackI from '../interfaces/PackI';

export default class PackModel implements PackModelI {
  private model: ModelStatic<Pack> = Pack;
  async getAllPacks(): Promise<PackI[]> {
    const packs = await this.model.findAll();
    return packs;
  }
}
