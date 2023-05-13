import PackI from '../interfaces/Pack/PackI';
import PackModelI from '../interfaces/Pack/PackModelI';
import PackServiceI from '../interfaces/Pack/PackServiceI';

export default class PackService implements PackServiceI {
  constructor(private packModel: PackModelI) {
    this.packModel = packModel;
  }

  async getAllPacks(): Promise<PackI[]> {
    const packs = await this.packModel.getAllPacks();
    return packs;
  }
}
